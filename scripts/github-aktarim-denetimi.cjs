/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const kok = path.resolve(__dirname, "..");
const kaynakYollari = require(path.join(kok, "data/yayinKaynaklari.json"));
const kaynakKumesi = new Set(kaynakYollari);
const sorunlar = [];

function yerelModuluCoz(dosyaYolu, istek) {
  let tabanYol;

  if (istek.startsWith("@/")) {
    tabanYol = istek.slice(2);
  } else if (istek.startsWith(".")) {
    tabanYol = path.posix.normalize(
      path.posix.join(path.posix.dirname(dosyaYolu), istek),
    );
  } else {
    return null;
  }

  const adaylar = [
    tabanYol,
    `${tabanYol}.ts`,
    `${tabanYol}.tsx`,
    `${tabanYol}.js`,
    `${tabanYol}.jsx`,
    `${tabanYol}.json`,
    path.posix.join(tabanYol, "index.ts"),
    path.posix.join(tabanYol, "index.tsx"),
  ];

  return (
    adaylar.find((aday) => fs.existsSync(path.join(kok, ...aday.split("/")))) ??
    tabanYol
  );
}

if (kaynakKumesi.size !== kaynakYollari.length) {
  sorunlar.push("Yayın kaynak listesinde yinelenen dosya var.");
}

for (const dosyaYolu of kaynakYollari) {
  const mutlakYol = path.join(kok, ...dosyaYolu.split("/"));

  if (!fs.existsSync(mutlakYol)) {
    sorunlar.push(`Yayın kaynağı bulunamadı: ${dosyaYolu}`);
    continue;
  }

  if (!/\.[cm]?[jt]sx?$/.test(dosyaYolu)) {
    continue;
  }

  const kaynak = fs.readFileSync(mutlakYol, "utf8");
  const kaynakDosyasi = ts.createSourceFile(
    dosyaYolu,
    kaynak,
    ts.ScriptTarget.Latest,
    true,
  );

  for (const ifade of kaynakDosyasi.statements) {
    if (
      !ts.isImportDeclaration(ifade) &&
      !ts.isExportDeclaration(ifade)
    ) {
      continue;
    }

    const istek = ifade.moduleSpecifier;

    if (!istek || !ts.isStringLiteral(istek)) {
      continue;
    }

    const yerelYol = yerelModuluCoz(dosyaYolu, istek.text);

    if (yerelYol && !kaynakKumesi.has(yerelYol)) {
      sorunlar.push(
        `${dosyaYolu}: GitHub aktarımında eksik bağımlılık ${yerelYol}`,
      );
    }
  }
}

const routeKaynagi = fs.readFileSync(
  path.join(kok, "app/api/github/aktar/route.ts"),
  "utf8",
);

for (const guvence of [
  "const kaynakOkuyuculari",
  "...kaynaklar",
  'node: ">=20.9.0"',
  "root: process.cwd()",
  "yayinProjesiniNormalizeEt",
  "guvenliIsoTarihiOlustur",
  "export const dynamicParams = false",
  "const sayfaYollari =",
  "guvenliProjeJson",
  'yayinProjesi.siteTipi === "cok-sayfa"',
  'gorsel.startsWith("/site-assets/")',
  'Hazır görsel bulunamadı:',
  "const dosyalar = await aktarilacakDosyalariOlustur(proje, repoAdi)",
  '\"app/sitemap.ts\": sitemapTs',
  '\"app/robots.ts\": robotsTs',
  '\"vercel.json\": vercelJson',
]) {
  if (!routeKaynagi.includes(guvence)) {
    sorunlar.push(`GitHub/Vercel aktarım güvencesi eksik: ${guvence}`);
  }
}

const icerikRotasi = fs.readFileSync(
  path.join(kok, "app/api/studio/otomatik-olustur/route.ts"),
  "utf8",
);

if (/OPENAI|api\.openai\.com|from ["']openai["']/i.test(icerikRotasi)) {
  sorunlar.push("Hazır içerik rotasında yapay zekâ bağımlılığı kaldı.");
}

for (const dosyaYolu of kaynakYollari) {
  if (!routeKaynagi.includes(JSON.stringify(dosyaYolu))) {
    sorunlar.push(`Aktarım rotasında yayın kaynağı eksik: ${dosyaYolu}`);
  }
}

const siteKaynagi = fs.readFileSync(
  path.join(kok, "components/site/SiteGorunumu.tsx"),
  "utf8",
);

const sektorSiteleriKaynagi = fs.readFileSync(
  path.join(kok, "components/site/SektorSiteleri.tsx"),
  "utf8",
);

if (
  !siteKaynagi.includes("SektorSiteleri") ||
  !sektorSiteleriKaynagi.includes("medya?.acik") ||
  !sektorSiteleriKaynagi.includes("!medya.url.trim()") ||
  !sektorSiteleriKaynagi.includes("BarberPole")
) {
  sorunlar.push("Yayın görünümünde iskelet veya isteğe bağlı görsel altyapısı eksik.");
}

for (const motorGuvence of [
  "function Kuafor(",
  "function Berber(",
  "function Guzellik(",
  "function Nail(",
  "function Nakliye(",
  "function Vip(",
  "function Hali(",
  "function Dovme(",
  "function Elektrik(",
  "function Tesisat(",
  "function Organizasyon(",
  "function Duvar(",
  "function OtoYikama(",
  "function OtoKurtarma(",
  "function OtoServis(",
  "Iletisim",
]) {
  if (!sektorSiteleriKaynagi.includes(motorGuvence)) {
    sorunlar.push(`Bagimsiz site motoru guvencesi eksik: ${motorGuvence}`);
  }
}

console.log(`Yayın kaynağı: ${kaynakYollari.length}`);
console.log(`Aktarım sorunu: ${sorunlar.length}`);

if (sorunlar.length > 0) {
  console.log(sorunlar.join("\n"));
  process.exitCode = 1;
}
