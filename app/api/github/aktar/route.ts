import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { gorselsizSunumuHazirla } from "@/data/sektorGorselDoldurma";
import type { ProjeVerisi } from "@/types/proje";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface GitHubRepo {
  name: string;
  html_url: string;
  default_branch: string;
}

interface GitHubReferans {
  object: {
    sha: string;
  };
}

interface GitHubCommit {
  sha: string;
  html_url?: string;
  tree: {
    sha: string;
  };
}

interface GitHubBlob {
  sha: string;
}

interface GitHubTree {
  sha: string;
}

interface DosyaIcerigi {
  content: string;
  encoding: "utf-8" | "base64";
}

type AktarilacakDosya = string | DosyaIcerigi;

interface GitHubHataCevabi {
  message?: string;
}

class GitHubApiHatasi extends Error {
  status: number;

  constructor(status: number, mesaj: string) {
    super(mesaj);
    this.name = "GitHubApiHatasi";
    this.status = status;
  }
}

function bekle(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function slugParcasiOlustur(metin: unknown) {
  return String(metin ?? "")
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-_]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function turkceSlugOlustur(metin: unknown) {
  const slug = slugParcasiOlustur(metin);

  return slug || `sitemix-site-${Date.now()}`;
}

function guvenliIsoTarihiOlustur(deger: unknown) {
  const tarih = new Date(String(deger ?? ""));

  return Number.isNaN(tarih.getTime())
    ? new Date().toISOString()
    : tarih.toISOString();
}

function yayinProjesiniNormalizeEt(proje: ProjeVerisi): ProjeVerisi {
  const kopya = JSON.parse(JSON.stringify(proje)) as ProjeVerisi;
  const siraliSayfalar = [...kopya.sayfalar].sort((a, b) => {
    if (a.anaSayfa !== b.anaSayfa) {
      return a.anaSayfa ? -1 : 1;
    }

    return a.sira - b.sira;
  });
  const anaSayfa =
    siraliSayfalar.find((sayfa) => sayfa.anaSayfa) ??
    siraliSayfalar.find((sayfa) => !sayfa.slug.trim()) ??
    siraliSayfalar[0];
  const kullanilanSluglar = new Set<string>();

  kopya.sayfalar = siraliSayfalar.map((sayfa, index) => {
    const anaSayfaMi = sayfa.id === anaSayfa?.id;
    let slug = "";

    if (!anaSayfaMi) {
      const temelSlug =
        slugParcasiOlustur(sayfa.slug) ||
        slugParcasiOlustur(sayfa.ad) ||
        `sayfa-${index + 1}`;
      let adaySlug = temelSlug;
      let tekrar = 2;

      while (kullanilanSluglar.has(adaySlug)) {
        adaySlug = `${temelSlug}-${tekrar}`;
        tekrar += 1;
      }

      slug = adaySlug;
      kullanilanSluglar.add(slug);
    }

    return {
      ...sayfa,
      ad: sayfa.ad.trim() || (anaSayfaMi ? "Ana Sayfa" : `Sayfa ${index + 1}`),
      menuBasligi:
        sayfa.menuBasligi.trim() ||
        sayfa.ad.trim() ||
        (anaSayfaMi ? "Ana Sayfa" : `Sayfa ${index + 1}`),
      slug,
      anaSayfa: anaSayfaMi,
      sira: index,
      bolumler: [...sayfa.bolumler]
        .sort((a, b) => a.sira - b.sira)
        .map((bolum, bolumIndex) => ({
          ...bolum,
          sira: bolumIndex,
        })),
    };
  });
  if (kopya.siteTipi === "tek-sayfa") {
    kopya.sayfalar = kopya.sayfalar.slice(0, 1).map((sayfa) => ({
      ...sayfa,
      slug: "",
      anaSayfa: true,
      menuGoster: true,
      sira: 0,
    }));
  } else {
    kopya.siteTipi = "cok-sayfa";
  }
  kopya.guncellenmeTarihi = guvenliIsoTarihiOlustur(
    kopya.guncellenmeTarihi,
  );

  return kopya;
}

function adresiTemizle(deger?: string) {
  return (deger ?? "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/g, "");
}

function siteAdresiniOlustur(proje: ProjeVerisi, repoAdi: string) {
  const domain = adresiTemizle(proje.domain);
  const vercelUrl = adresiTemizle(proje.vercelUrl);

  if (domain) {
    return `https://${domain}`;
  }

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return `https://${repoAdi}.vercel.app`;
}

function projeAciklamasiOlustur(proje: ProjeVerisi) {
  const anaSayfa =
    proje.sayfalar.find((sayfa) => sayfa.anaSayfa) ?? proje.sayfalar[0];

  const heroBolumu = anaSayfa?.bolumler.find(
    (bolum) => bolum.aktif && bolum.tur === "hero",
  );

  return (
    proje.seoAciklama?.trim() ||
    proje.siteIcerigi?.heroAciklama.trim() ||
    heroBolumu?.aciklama.trim() ||
    `${proje.firmaAdi}; hizmetleri, çalışmaları ve iletişim bilgileriyle yanınızda.`
  );
}

function seoBasligiOlustur(proje: ProjeVerisi) {
  const kayitliBaslik = proje.seoBaslik?.trim();
  const sektorIceriyor = kayitliBaslik
    ?.toLocaleLowerCase("tr-TR")
    .includes(proje.sektorAdi.toLocaleLowerCase("tr-TR"));

  return kayitliBaslik && !sektorIceriyor
    ? kayitliBaslik
    : `${proje.firmaAdi} | Resmî Web Sitesi`;
}

function seoKelimeleriOlustur(proje: ProjeVerisi) {
  const varsayilanKelimeler = [
    proje.firmaAdi,
    proje.sektorAdi,
    proje.sektor,
    proje.adres,
  ].filter(Boolean);

  return Array.from(
    new Set([...(proje.seoKelimeler ?? []), ...varsayilanKelimeler]),
  );
}

async function githubIstek<T>(
  apiYolu: string,
  token: string,
  init: RequestInit = {},
): Promise<T> {
  const cevap = await fetch(`https://api.github.com${apiYolu}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  const cevapMetni = await cevap.text();
  let veri: unknown = null;

  if (cevapMetni) {
    try {
      veri = JSON.parse(cevapMetni);
    } catch {
      veri = cevapMetni;
    }
  }

  if (!cevap.ok) {
    const hataVerisi =
      typeof veri === "object" && veri !== null
        ? (veri as GitHubHataCevabi)
        : null;

    throw new GitHubApiHatasi(
      cevap.status,
      hataVerisi?.message ?? `GitHub isteği başarısız oldu: ${cevap.status}`,
    );
  }

  return veri as T;
}

async function repoBulVeyaOlustur({
  token,
  owner,
  repoAdi,
  proje,
}: {
  token: string;
  owner: string;
  repoAdi: string;
  proje: ProjeVerisi;
}) {
  try {
    const mevcutRepo = await githubIstek<GitHubRepo>(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repoAdi)}`,
      token,
    );

    return {
      repo: mevcutRepo,
      yeniOlusturuldu: false,
    };
  } catch (error) {
    if (!(error instanceof GitHubApiHatasi) || error.status !== 404) {
      throw error;
    }
  }

  const yeniRepo = await githubIstek<GitHubRepo>("/user/repos", token, {
    method: "POST",
    body: JSON.stringify({
      name: repoAdi,
      description: projeAciklamasiOlustur(proje),
      private: true,
      auto_init: true,
      has_issues: false,
      has_projects: false,
      has_wiki: false,
      has_discussions: false,
    }),
  });

  return {
    repo: yeniRepo,
    yeniOlusturuldu: true,
  };
}

async function branchReferansiniBekle({
  token,
  owner,
  repoAdi,
  branch,
}: {
  token: string;
  owner: string;
  repoAdi: string;
  branch: string;
}) {
  let sonHata: unknown = null;

  for (let deneme = 0; deneme < 8; deneme += 1) {
    try {
      return await githubIstek<GitHubReferans>(
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
          repoAdi,
        )}/git/ref/heads/${encodeURIComponent(branch)}`,
        token,
      );
    } catch (error) {
      sonHata = error;

      const tekrarDenenebilir =
        error instanceof GitHubApiHatasi &&
        (error.status === 404 || error.status === 409);

      if (!tekrarDenenebilir) {
        throw error;
      }

      await bekle(750);
    }
  }

  throw sonHata;
}

async function kaynakDosyalariOku() {
  const kokDizin = process.cwd();
  const kaynakOkuyuculari: Record<string, () => Promise<string>> = {
    "components/site/SiteGorunumu.tsx": () =>
      readFile(
        path.join(kokDizin, "components", "site", "SiteGorunumu.tsx"),
        "utf8",
      ),
    "components/site/SektorSiteleri.tsx": () =>
      readFile(
        path.join(kokDizin, "components", "site", "SektorSiteleri.tsx"),
        "utf8",
      ),
    "components/site/sektorSiteleri.module.css": () =>
      readFile(
        path.join(
          kokDizin,
          "components",
          "site",
          "sektorSiteleri.module.css",
        ),
        "utf8",
      ),
    "data/sektorSablonlari.ts": () =>
      readFile(path.join(kokDizin, "data", "sektorSablonlari.ts"), "utf8"),
    "data/yeniSektorler.ts": () =>
      readFile(path.join(kokDizin, "data", "yeniSektorler.ts"), "utf8"),
    "data/sektorDerinIcerikleri.ts": () =>
      readFile(
        path.join(kokDizin, "data", "sektorDerinIcerikleri.ts"),
        "utf8",
      ),
    "data/sektorSunumProfilleri.ts": () =>
      readFile(
        path.join(kokDizin, "data", "sektorSunumProfilleri.ts"),
        "utf8",
      ),
    "data/sektorIcerikProfilleri.ts": () =>
      readFile(
        path.join(kokDizin, "data", "sektorIcerikProfilleri.ts"),
        "utf8",
      ),
    "data/sektorFormProfilleri.ts": () =>
      readFile(
        path.join(kokDizin, "data", "sektorFormProfilleri.ts"),
        "utf8",
      ),
    "data/sektorTasarimlari.ts": () =>
      readFile(path.join(kokDizin, "data", "sektorTasarimlari.ts"), "utf8"),
    "data/sektorIskeletleri.ts": () =>
      readFile(path.join(kokDizin, "data", "sektorIskeletleri.ts"), "utf8"),
    "data/sektorDonusumProfilleri.ts": () =>
      readFile(
        path.join(kokDizin, "data", "sektorDonusumProfilleri.ts"),
        "utf8",
      ),
    "data/sektorGorselDili.ts": () =>
      readFile(path.join(kokDizin, "data", "sektorGorselDili.ts"), "utf8"),
    "lib/iletisim.ts": () =>
      readFile(path.join(kokDizin, "lib", "iletisim.ts"), "utf8"),
    "types/proje.ts": () =>
      readFile(path.join(kokDizin, "types", "proje.ts"), "utf8"),
  };
  const icerikler = await Promise.all(
    Object.entries(kaynakOkuyuculari).map(async ([dosyaYolu, oku]) => [
      dosyaYolu,
      await oku(),
    ]),
  );

  return Object.fromEntries(icerikler) as Record<string, string>;
}


function mimeUzantisi(mime: string) {
  const temizMime = mime.toLowerCase().split(";")[0].trim();

  const uzantilar: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
  };

  return uzantilar[temizMime] ?? "jpg";
}

function gorselDosyaAdiOlustur(
  repoAdi: string,
  kaynak: string,
  uzanti: string,
) {
  const hash = createHash("sha1").update(kaynak).digest("hex").slice(0, 12);
  return `${turkceSlugOlustur(repoAdi)}-${hash}.${uzanti}`;
}

async function gorseliIndir(gorsel: string) {
  const dataUrlEslesmesi = gorsel.match(
  /^data:(image\/[a-zA-Z0-9.+-]+);base64,([\s\S]+)$/,
);

  if (dataUrlEslesmesi) {
    const [, mime, base64] = dataUrlEslesmesi;
    return {
      mime,
      base64,
    };
  }

  if (gorsel.startsWith("/site-assets/")) {
    const publicDizini = path.resolve(process.cwd(), "public");
    const dosyaYolu = path.resolve(publicDizini, gorsel.replace(/^\/+/, ""));
    const publicOnEki = `${publicDizini}${path.sep}`;
    if (!dosyaYolu.startsWith(publicOnEki)) {
      throw new Error("Public görsel yolu güvenli değil.");
    }
    const tampon = await readFile(dosyaYolu);
    if (tampon.byteLength > 12 * 1024 * 1024) {
      throw new Error("Görsel 12 MB sınırını aşıyor.");
    }
    const uzanti = path.extname(dosyaYolu).toLowerCase();
    const mime = uzanti === ".png" ? "image/png" : uzanti === ".avif" ? "image/avif" : uzanti === ".gif" ? "image/gif" : uzanti === ".jpg" || uzanti === ".jpeg" ? "image/jpeg" : "image/webp";
    return { mime, base64: tampon.toString("base64") };
  }

  if (!/^https?:\/\//i.test(gorsel)) {
    return null;
  }

  const cevap = await fetch(gorsel, {
    headers: {
      "User-Agent": "Sitemix-Studio/1.0",
    },
    cache: "no-store",
  });

  if (!cevap.ok) {
    throw new Error(`Görsel indirilemedi: ${cevap.status}`);
  }

  const mime = cevap.headers.get("content-type") || "image/jpeg";

  if (!mime.toLowerCase().startsWith("image/")) {
    throw new Error("İndirilen bağlantı geçerli bir görsel değil.");
  }

  const tampon = Buffer.from(await cevap.arrayBuffer());

  if (tampon.byteLength > 12 * 1024 * 1024) {
    throw new Error("Görsel 12 MB sınırını aşıyor.");
  }

  return {
    mime,
    base64: tampon.toString("base64"),
  };
}

async function gorselleriYerellestir(
  proje: ProjeVerisi,
  repoAdi: string,
) {
  const yayinProjesi = JSON.parse(JSON.stringify(proje)) as ProjeVerisi;
  const gorselDosyalari: Record<string, DosyaIcerigi> = {};
  const onbellek = new Map<string, string>();

  async function gorseliYerellestir(gorsel: string) {
    const temizGorsel = gorsel.trim();

    if (!temizGorsel || temizGorsel.startsWith("/images/")) {
      return temizGorsel;
    }

    const dahaOnceOlusturulan = onbellek.get(temizGorsel);

    if (dahaOnceOlusturulan) {
      return dahaOnceOlusturulan;
    }

    try {
      const indirilen = await gorseliIndir(temizGorsel);

      if (!indirilen) {
        return temizGorsel;
      }

      const uzanti = mimeUzantisi(indirilen.mime);
      const dosyaAdi = gorselDosyaAdiOlustur(
        repoAdi,
        temizGorsel,
        uzanti,
      );
      const repoYolu = `public/images/${dosyaAdi}`;
      const siteYolu = `/images/${dosyaAdi}`;

      gorselDosyalari[repoYolu] = {
        content: indirilen.base64,
        encoding: "base64",
      };
      onbellek.set(temizGorsel, siteYolu);

      return siteYolu;
    } catch (error) {
      console.warn("Görsel repoya alınamadı, mevcut bağlantı korunuyor:", error);
      return temizGorsel;
    }
  }

  for (const sayfa of yayinProjesi.sayfalar) {
    for (const bolum of sayfa.bolumler) {
      bolum.gorsel = await gorseliYerellestir(bolum.gorsel);
      bolum.arkaPlanGorseli = await gorseliYerellestir(
        bolum.arkaPlanGorseli,
      );

      for (const eleman of bolum.listeElemanlari) {
        eleman.gorsel = await gorseliYerellestir(eleman.gorsel);
      }
    }
  }

  if (Array.isArray(yayinProjesi.medyalar)) {
    for (const medya of yayinProjesi.medyalar) {
      medya.url = await gorseliYerellestir(medya.url);
    }
  }

  return {
    proje: yayinProjesi,
    gorselDosyalari,
  };
}

export async function aktarilacakDosyalariOlustur(
  proje: ProjeVerisi,
  repoAdi: string,
) {
  const kaynaklar = await kaynakDosyalariOku();
  const yerelGorselSonucu = await gorselleriYerellestir(
    gorselsizSunumuHazirla(proje),
    repoAdi,
  );
  const yayinProjesi = yayinProjesiniNormalizeEt(
    yerelGorselSonucu.proje,
  );
  const siteUrl = siteAdresiniOlustur(yayinProjesi, repoAdi);
  const seoBasligi = seoBasligiOlustur(yayinProjesi);
  const seoAciklama = projeAciklamasiOlustur(yayinProjesi);
  const seoKelimeleri = seoKelimeleriOlustur(yayinProjesi);
  const sitemapYollari = yayinProjesi.sayfalar.map((sayfa) =>
    sayfa.anaSayfa ? "" : sayfa.slug,
  );
  const sitemapTarihi = guvenliIsoTarihiOlustur(
    yayinProjesi.guncellenmeTarihi,
  );

  const guvenliProjeJson = JSON.stringify(yayinProjesi, null, 2).replace(
    /</g,
    "\\u003c",
  );

  const packageJson = JSON.stringify(
    {
      name: repoAdi,
      version: "1.0.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        "lucide-react": "1.17.0",
        motion: "12.40.0",
        next: "16.2.9",
        react: "19.2.4",
        "react-dom": "19.2.4",
      },
      devDependencies: {
        "@types/node": "20.19.43",
        "@types/react": "19.2.17",
        "@types/react-dom": "19.2.3",
        typescript: "5.9.3",
      },
      engines: {
        node: ">=20.9.0",
      },
    },
    null,
    2,
  );

  const layoutTsx = `import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = ${JSON.stringify(siteUrl)};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: ${JSON.stringify(seoBasligi)},
    template: ${JSON.stringify(`%s | ${yayinProjesi.firmaAdi}`)},
  },
  description: ${JSON.stringify(seoAciklama)},
  keywords: ${JSON.stringify(seoKelimeleri)},
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: ${JSON.stringify(yayinProjesi.firmaAdi)},
    title: ${JSON.stringify(seoBasligi)},
    description: ${JSON.stringify(seoAciklama)},
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
`;

  const pageTsx = `import SiteGorunumu from "@/components/site/SiteGorunumu";
import { proje } from "@/data/proje";

export default function AnaSayfa() {
  return (
    <SiteGorunumu
      proje={proje}
      baslangicSlug=""
      gercekRotaKullan
    />
  );
}
`;

  const dinamikSayfaTsx = `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteGorunumu from "@/components/site/SiteGorunumu";
import { proje } from "@/data/proje";

interface DinamikSayfaProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

function sayfayiBul(slug: string) {
  return proje.sayfalar.find(
    (sayfa) => !sayfa.anaSayfa && sayfa.slug === slug,
  );
}

export function generateStaticParams() {
  return proje.sayfalar
    .filter((sayfa) => !sayfa.anaSayfa && sayfa.slug.trim())
    .map((sayfa) => ({
      slug: sayfa.slug,
    }));
}

export async function generateMetadata({
  params,
}: DinamikSayfaProps): Promise<Metadata> {
  const { slug } = await params;
  const sayfa = sayfayiBul(slug);

  if (!sayfa) {
    return {};
  }

  const hero = sayfa.bolumler.find(
    (bolum) => bolum.aktif && bolum.tur === "hero",
  );

  const aciklama =
    hero?.aciklama ||
    sayfa.ad + " hakkında bilgi almak için " + proje.firmaAdi + " web sitesini inceleyin.";

  return {
    title: sayfa.ad,
    description: aciklama,
    alternates: {
      canonical: "/" + sayfa.slug,
    },
    openGraph: {
      title: sayfa.ad + " | " + proje.firmaAdi,
      description: aciklama,
      url: "/" + sayfa.slug,
    },
  };
}

export default async function DinamikSayfa({
  params,
}: DinamikSayfaProps) {
  const { slug } = await params;
  const sayfa = sayfayiBul(slug);

  if (!sayfa) {
    notFound();
  }

  return (
    <SiteGorunumu
      proje={proje}
      baslangicSlug={sayfa.slug}
      gercekRotaKullan
    />
  );
}
`;

  const sitemapTs = `import type { MetadataRoute } from "next";
const siteUrl = ${JSON.stringify(siteUrl)};
const sayfaYollari = ${JSON.stringify(sitemapYollari)} as const;
const sonGuncelleme = new Date(${JSON.stringify(sitemapTarihi)});

export default function sitemap(): MetadataRoute.Sitemap {
  return sayfaYollari.map((sayfaYolu) => ({
      url: sayfaYolu ? siteUrl + "/" + sayfaYolu : siteUrl,
      lastModified: sonGuncelleme,
      changeFrequency: sayfaYolu ? "monthly" : "weekly",
      priority: sayfaYolu ? 0.8 : 1,
    }));
}
`;

  const robotsTs = `import type { MetadataRoute } from "next";

const siteUrl = ${JSON.stringify(siteUrl)};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: siteUrl + "/sitemap.xml",
    host: siteUrl,
  };
}
`;

  const projeTs = `import type { ProjeVerisi } from "@/types/proje";

export const proje: ProjeVerisi = ${guvenliProjeJson};
`;

  const globalCss = `:root {
  color-scheme: light;
}

html {
  scroll-behavior: smooth;
}

html,
body {
  min-height: 100%;
}

body {
  margin: 0;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

img {
  max-width: 100%;
}
`;

  const tsconfig = JSON.stringify(
    {
      compilerOptions: {
        target: "ES2017",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: false,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "react-jsx",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: {
          "@/*": ["./*"],
        },
      },
      include: [
        "next-env.d.ts",
        "**/*.ts",
        "**/*.tsx",
        ".next/types/**/*.ts",
        ".next/dev/types/**/*.ts",
      ],
      exclude: ["node_modules"],
    },
    null,
    2,
  );

  const nextEnv = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Bu dosya Next.js tarafından kullanılır.
`;

  const nextConfig = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
`;

  const vercelJson = JSON.stringify(
    {
      framework: "nextjs",
      buildCommand: "npm run build",
      installCommand: "npm install",
    },
    null,
    2,
  );

  const gitignore = `.next
node_modules
.env
.env.local
.env*.local
.vercel
*.log
`;

  const readme = `# ${yayinProjesi.firmaAdi}

Bu proje Sitemix Studio tarafından oluşturulmuştur.

## Canlı adres

${siteUrl}

## Çalıştırma

\`\`\`bash
npm install
npm run dev
\`\`\`

## SEO adresleri

- ${siteUrl}/sitemap.xml
- ${siteUrl}/robots.txt
`;

  return {
    "package.json": packageJson,
    "tsconfig.json": tsconfig,
    "next-env.d.ts": nextEnv,
    "next.config.ts": nextConfig,
    "vercel.json": vercelJson,
    ".gitignore": gitignore,
    "README.md": readme,

    "app/layout.tsx": layoutTsx,
    "app/page.tsx": pageTsx,
    "app/sitemap.ts": sitemapTs,
    "app/robots.ts": robotsTs,
    "app/globals.css": globalCss,

    "data/proje.ts": projeTs,
    "data/proje.json": guvenliProjeJson,
    ...(yayinProjesi.siteTipi === "cok-sayfa" ? { "app/[slug]/page.tsx": dinamikSayfaTsx } : {}),
    ...kaynaklar,
    ...yerelGorselSonucu.gorselDosyalari,
  };
}

async function dosyalariCommitEt({
  token,
  owner,
  repoAdi,
  branch,
  dosyalar,
  yeniOlusturuldu,
}: {
  token: string;
  owner: string;
  repoAdi: string;
  branch: string;
  dosyalar: Record<string, AktarilacakDosya>;
  yeniOlusturuldu: boolean;
}) {
  const referans = await branchReferansiniBekle({
    token,
    owner,
    repoAdi,
    branch,
  });

  const mevcutCommitSha = referans.object.sha;

  const mevcutCommit = await githubIstek<GitHubCommit>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
      repoAdi,
    )}/git/commits/${mevcutCommitSha}`,
    token,
  );

  const treeElemanlari = await Promise.all(
    Object.entries(dosyalar).map(async ([dosyaYolu, dosya]) => {
      const icerik =
        typeof dosya === "string"
          ? { content: dosya, encoding: "utf-8" as const }
          : dosya;

      const blob = await githubIstek<GitHubBlob>(
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
          repoAdi,
        )}/git/blobs`,
        token,
        {
          method: "POST",
          body: JSON.stringify({
            content: icerik.content,
            encoding: icerik.encoding,
          }),
        },
      );

      return {
        path: dosyaYolu,
        mode: "100644",
        type: "blob",
        sha: blob.sha,
      };
    }),
  );

  const yeniTree = await githubIstek<GitHubTree>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
      repoAdi,
    )}/git/trees`,
    token,
    {
      method: "POST",
      body: JSON.stringify({
        base_tree: mevcutCommit.tree.sha,
        tree: treeElemanlari,
      }),
    },
  );

  const yeniCommit = await githubIstek<GitHubCommit>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
      repoAdi,
    )}/git/commits`,
    token,
    {
      method: "POST",
      body: JSON.stringify({
        message: yeniOlusturuldu
          ? "Sitemix sitesi oluşturuldu"
          : "Sitemix sitesi ve yayın ayarları güncellendi",
        tree: yeniTree.sha,
        parents: [mevcutCommitSha],
      }),
    },
  );

  await githubIstek(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
      repoAdi,
    )}/git/refs/heads/${encodeURIComponent(branch)}`,
    token,
    {
      method: "PATCH",
      body: JSON.stringify({
        sha: yeniCommit.sha,
        force: false,
      }),
    },
  );

  return yeniCommit;
}

export async function POST(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;

  if (!token || !owner) {
    return NextResponse.json(
      {
        basarili: false,
        mesaj: ".env.local içindeki GITHUB_TOKEN veya GITHUB_OWNER eksik.",
      },
      { status: 500 },
    );
  }

  let proje: ProjeVerisi;

  try {
    proje = (await request.json()) as ProjeVerisi;
  } catch {
    return NextResponse.json(
      {
        basarili: false,
        mesaj: "Gönderilen proje verisi okunamadı.",
      },
      { status: 400 },
    );
  }

  if (
    !proje ||
    !proje.id ||
    !proje.firmaAdi?.trim() ||
    !Array.isArray(proje.sayfalar) ||
    proje.sayfalar.length === 0
  ) {
    return NextResponse.json(
      {
        basarili: false,
        mesaj: "Proje bilgileri eksik veya geçersiz.",
      },
      { status: 400 },
    );
  }

  const repoAdi =
    proje.githubRepoAdi?.trim() ||
    turkceSlugOlustur(proje.slug || proje.firmaAdi);

  try {
    const { repo, yeniOlusturuldu } = await repoBulVeyaOlustur({
      token,
      owner,
      repoAdi,
      proje,
    });

    const branch =
      repo.default_branch || process.env.GITHUB_DEFAULT_BRANCH || "main";

    const dosyalar = await aktarilacakDosyalariOlustur(proje, repoAdi);

    const commit = await dosyalariCommitEt({
      token,
      owner,
      repoAdi,
      branch,
      dosyalar,
      yeniOlusturuldu,
    });

    return NextResponse.json({
      basarili: true,
      yeniOlusturuldu,
      repoAdi,
      branch,
      githubUrl: repo.html_url,
      commitUrl: commit.html_url ?? null,
      siteUrl: siteAdresiniOlustur(proje, repoAdi),
      mesaj: yeniOlusturuldu
        ? "Site GitHub'a başarıyla aktarıldı."
        : "Site, domain ve SEO ayarları GitHub'da güncellendi.",
    });
  } catch (error) {
    console.error("GitHub aktarım hatası:", error);

    const durumKodu = error instanceof GitHubApiHatasi ? error.status : 500;

    const mesaj =
      error instanceof Error
        ? error.message
        : "GitHub aktarımı sırasında bilinmeyen bir hata oluştu.";

    return NextResponse.json(
      {
        basarili: false,
        mesaj,
      },
      {
        status: durumKodu >= 400 && durumKodu < 600 ? durumKodu : 500,
      },
    );
  }
}
