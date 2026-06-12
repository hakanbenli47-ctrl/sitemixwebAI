import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
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

function turkceSlugOlustur(metin: string) {
  const slug = metin
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

  return slug || `sitemix-site-${Date.now()}`;
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
    heroBolumu?.aciklama.trim() ||
    `${proje.firmaAdi}, ${proje.sektorAdi} alanında profesyonel hizmet sunar.`
  );
}

function seoBasligiOlustur(proje: ProjeVerisi) {
  return proje.seoBaslik?.trim() || `${proje.firmaAdi} | ${proje.sektorAdi}`;
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

  const [siteGorunumu, siteStilleri, sektorSablonlari, projeTipi] =
    await Promise.all([
      readFile(
        path.join(kokDizin, "components", "site", "SiteGorunumu.tsx"),
        "utf8",
      ),
      readFile(
        path.join(kokDizin, "components", "site", "siteGorunumu.module.css"),
        "utf8",
      ),
      readFile(path.join(kokDizin, "data", "sektorSablonlari.ts"), "utf8"),
      readFile(path.join(kokDizin, "types", "proje.ts"), "utf8"),
    ]);

  return {
    siteGorunumu,
    siteStilleri,
    sektorSablonlari,
    projeTipi,
  };
}

async function aktarilacakDosyalariOlustur(
  proje: ProjeVerisi,
  repoAdi: string,
) {
  const kaynaklar = await kaynakDosyalariOku();
  const siteUrl = siteAdresiniOlustur(proje, repoAdi);
  const seoBasligi = seoBasligiOlustur(proje);
  const seoAciklama = projeAciklamasiOlustur(proje);
  const seoKelimeleri = seoKelimeleriOlustur(proje);

  const guvenliProjeJson = JSON.stringify(proje, null, 2).replace(
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
        "lucide-react": "^1.17.0",
        motion: "^12.40.0",
        next: "16.2.9",
        react: "19.2.4",
        "react-dom": "19.2.4",
      },
      devDependencies: {
        "@types/node": "^20",
        "@types/react": "^19",
        "@types/react-dom": "^19",
        typescript: "^5",
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
    template: ${JSON.stringify(`%s | ${proje.firmaAdi}`)},
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
    siteName: ${JSON.stringify(proje.firmaAdi)},
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
import { proje } from "@/data/proje";

const siteUrl = ${JSON.stringify(siteUrl)};

export default function sitemap(): MetadataRoute.Sitemap {
  return proje.sayfalar
    .filter((sayfa) => sayfa.anaSayfa || sayfa.slug.trim())
    .map((sayfa) => ({
      url: sayfa.anaSayfa
        ? siteUrl
        : siteUrl + "/" + sayfa.slug,
      lastModified: new Date(proje.guncellenmeTarihi),
      changeFrequency: sayfa.anaSayfa ? "weekly" : "monthly",
      priority: sayfa.anaSayfa ? 1 : 0.8,
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
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
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
};

export default nextConfig;
`;

  const gitignore = `.next
node_modules
.env
.env.local
.env*.local
.vercel
*.log
`;

  const readme = `# ${proje.firmaAdi}

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
    ".gitignore": gitignore,
    "README.md": readme,

    "app/layout.tsx": layoutTsx,
    "app/page.tsx": pageTsx,
    "app/[slug]/page.tsx": dinamikSayfaTsx,
    "app/sitemap.ts": sitemapTs,
    "app/robots.ts": robotsTs,
    "app/globals.css": globalCss,

    "components/site/SiteGorunumu.tsx": kaynaklar.siteGorunumu,
    "components/site/siteGorunumu.module.css": kaynaklar.siteStilleri,
    "data/sektorSablonlari.ts": kaynaklar.sektorSablonlari,
    "data/proje.ts": projeTs,
    "types/proje.ts": kaynaklar.projeTipi,
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
  dosyalar: Record<string, string>;
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
    Object.entries(dosyalar).map(async ([dosyaYolu, icerik]) => {
      const blob = await githubIstek<GitHubBlob>(
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
          repoAdi,
        )}/git/blobs`,
        token,
        {
          method: "POST",
          body: JSON.stringify({
            content: icerik,
            encoding: "utf-8",
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
    !Array.isArray(proje.sayfalar)
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
