/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const kok = path.resolve(__dirname, "..");
const sorunlar = [];

function tsModulunuYukle(dosya) {
  const kaynak = fs.readFileSync(dosya, "utf8");
  const cikti = ts.transpileModule(kaynak, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const modul = { exports: {} };
  new Function("exports", "require", "module", "__filename", "__dirname", cikti)(
    modul.exports,
    require,
    modul,
    dosya,
    path.dirname(dosya),
  );
  return modul.exports;
}

const katalog = tsModulunuYukle(path.join(kok, "data/yeniSektorler.ts"));
const sektorler = katalog.YENI_SEKTORLER;
const beklenenSektorler = [
  "kuafor", "berber", "guzellik-salonu", "nail-artist", "nakliye",
  "vip-tasimacilik", "hali-yikama", "dovmeci", "elektrikci", "tesisatci",
  "organizasyon", "duvar-isleri", "oto-yikama", "oto-kurtarma", "oto-servis",
];

if (!Array.isArray(sektorler) || sektorler.length !== 15) {
  sorunlar.push(`Sektor sayisi 15 olmali; bulunan: ${sektorler?.length ?? 0}`);
}

const kimlikler = new Set(sektorler.map((sektor) => sektor.id));
const iskeletler = new Set(sektorler.map((sektor) => sektor.iskeletAdi));
for (const id of beklenenSektorler) {
  if (!kimlikler.has(id)) sorunlar.push(`Eksik sektor: ${id}`);
}
if (iskeletler.size !== 15) sorunlar.push("Her sektorun iskelet adi benzersiz olmali.");

for (const sektor of sektorler) {
  if (sektor.temalar.length !== 3) sorunlar.push(`${sektor.id}: uc tema yok.`);
  if (sektor.sayfalar.length < 5) sorunlar.push(`${sektor.id}: en az bes sayfa olmali.`);
  if (!sektor.sayfalar.some((sayfa) => sayfa.slug === "")) sorunlar.push(`${sektor.id}: ana sayfa yok.`);
  if (sektor.icerik.hizmetler.length < 6) sorunlar.push(`${sektor.id}: hizmet kutuphanesi eksik.`);
  if (sektor.icerik.ozellikler.length < 3) sorunlar.push(`${sektor.id}: guven ozellikleri eksik.`);
  if (sektor.icerik.surec.length < 4) sorunlar.push(`${sektor.id}: surec akisi eksik.`);
  if (sektor.icerik.sss.length < 3) sorunlar.push(`${sektor.id}: SSS icerigi eksik.`);
  if (!sektor.alanlar.some((alan) => alan.zorunlu)) sorunlar.push(`${sektor.id}: zorunlu sektor alani yok.`);
  if (sektor.temalar.some((tema) => tema.renkler.length !== 4)) sorunlar.push(`${sektor.id}: tema renk rolleri eksik.`);
  const sayfalar = katalog.siteSayfalariOlustur(sektor.id);
  if (sayfalar.length !== sektor.sayfalar.length || !sayfalar[0].anaSayfa) sorunlar.push(`${sektor.id}: cok sayfali cikti bozuk.`);
  const medyalar = katalog.medyaAlanlariOlustur(sektor.id);
  if (medyalar.some((medya) => medya.acik || medya.url)) sorunlar.push(`${sektor.id}: gorsel alanlari kapali baslamali.`);
}

const renderer = fs.readFileSync(path.join(kok, "components/site/SektorSiteleri.tsx"), "utf8");
const css = fs.readFileSync(path.join(kok, "components/site/sektorSiteleri.module.css"), "utf8");
const editor = fs.readFileSync(path.join(kok, "app/studio/duzenle/page.tsx"), "utf8");
const wizard = fs.readFileSync(path.join(kok, "app/studio/yeni/page.tsx"), "utf8");

for (const islev of ["Kuafor", "Berber", "Guzellik", "Nail", "Nakliye", "Vip", "Hali", "Dovme", "Elektrik", "Tesisat", "Organizasyon", "Duvar", "OtoYikama", "OtoKurtarma", "OtoServis"]) {
  if (!renderer.includes(`function ${islev}(`)) sorunlar.push(`Renderer eksik: ${islev}`);
}

for (const guvence of ["BarberPole", "medya?.acik", "!medya.url.trim()", "Iletisim", "AltSayfa", "prefers-reduced-motion"]) {
  const kaynak = guvence === "prefers-reduced-motion" ? css : renderer;
  if (!kaynak.includes(guvence)) sorunlar.push(`Sunum guvencesi eksik: ${guvence}`);
}

for (const kirilim of ["@media (max-width: 1100px)", "@media (max-width: 820px)", "@media (max-width: 560px)"]) {
  if (!css.includes(kirilim)) sorunlar.push(`Mobil kirilim eksik: ${kirilim}`);
}

for (const islem of ["Görsel yükle", "Değiştir", "Görseli kaldır", "Sıfırla", "hizmetleriGuncelle", "ozellikleriGuncelle"]) {
  if (!editor.includes(islem)) sorunlar.push(`Duzenleme islemi eksik: ${islem}`);
}

for (const guvence of ["siteTipi: \"cok-sayfa\"", "medyaAlanlariOlustur", "siteSayfalariOlustur", "varsayilanIcerikOlustur"]) {
  if (!wizard.includes(guvence)) sorunlar.push(`Proje olusturma guvencesi eksik: ${guvence}`);
}

console.log(`Sektor: ${sektorler.length}`);
console.log(`Tema: ${sektorler.reduce((toplam, sektor) => toplam + sektor.temalar.length, 0)}`);
console.log(`Sayfa: ${sektorler.reduce((toplam, sektor) => toplam + sektor.sayfalar.length, 0)}`);
console.log(`Sektor yapisi sorunu: ${sorunlar.length}`);
if (sorunlar.length) {
  console.log(sorunlar.join("\n"));
  process.exitCode = 1;
}
