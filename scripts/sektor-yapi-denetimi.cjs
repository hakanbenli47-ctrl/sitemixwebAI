/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const kok = path.resolve(__dirname, "..");
const sorunlar = [];

function rgb(renk) {
  const hex = renk.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null;
  return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((deger) => Number.parseInt(deger, 16));
}

function parlaklik(renk) {
  const degerler = rgb(renk);
  if (!degerler) return 0;
  const kanallar = degerler.map((deger) => {
    const kanal = deger / 255;
    return kanal <= 0.04045 ? kanal / 12.92 : ((kanal + 0.055) / 1.055) ** 2.4;
  });
  return kanallar[0] * 0.2126 + kanallar[1] * 0.7152 + kanallar[2] * 0.0722;
}

function kontrast(ilk, ikinci) {
  const ilkParlaklik = parlaklik(ilk);
  const ikinciParlaklik = parlaklik(ikinci);
  return (Math.max(ilkParlaklik, ikinciParlaklik) + 0.05) / (Math.min(ilkParlaklik, ikinciParlaklik) + 0.05);
}

function karistir(ilk, ikinci, ilkOrani) {
  const ilkRgb = rgb(ilk);
  const ikinciRgb = rgb(ikinci);
  if (!ilkRgb || !ikinciRgb) return ikinci;
  return `#${ilkRgb.map((deger, index) => Math.round(deger * ilkOrani + ikinciRgb[index] * (1 - ilkOrani)).toString(16).padStart(2, "0")).join("")}`;
}

function zeminYazisi(arkaPlan, tercih) {
  if (tercih && kontrast(tercih, arkaPlan) >= 4.8) return tercih;
  return kontrast("#101312", arkaPlan) >= kontrast("#ffffff", arkaPlan) ? "#101312" : "#ffffff";
}

function vurguZemini(vurgu) {
  const ilkYazi = zeminYazisi(vurgu);
  if (kontrast(ilkYazi, vurgu) >= 4.8) return vurgu;
  const hedef = ilkYazi === "#101312" ? "#ffffff" : "#000000";
  for (let oran = 0.9; oran >= 0.1; oran -= 0.1) {
    const aday = karistir(vurgu, hedef, oran);
    if (kontrast(zeminYazisi(aday), aday) >= 4.8) return aday;
  }
  return hedef;
}

function vurguYazisi(vurgu, arkaPlan, guvenliYazi) {
  if (kontrast(vurgu, arkaPlan) >= 4.8) return vurgu;
  for (let oran = 0.9; oran >= 0.1; oran -= 0.1) {
    const aday = karistir(vurgu, guvenliYazi, oran);
    if (kontrast(aday, arkaPlan) >= 4.8) return aday;
  }
  return guvenliYazi;
}

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
const derinKatalog = tsModulunuYukle(path.join(kok, "data/sektorDerinIcerikleri.ts"));
const sektorler = katalog.YENI_SEKTORLER;
const beklenenSektorler = [
  "kuafor", "berber", "guzellik-salonu", "nail-artist", "nakliye",
  "hali-yikama", "oto-yikama",
];

if (!Array.isArray(sektorler) || sektorler.length !== 7) {
  sorunlar.push(`Sektor sayisi 7 olmali; bulunan: ${sektorler?.length ?? 0}`);
}

const kimlikler = new Set(sektorler.map((sektor) => sektor.id));
const iskeletler = new Set(sektorler.map((sektor) => sektor.iskeletAdi));
for (const id of beklenenSektorler) {
  if (!kimlikler.has(id)) sorunlar.push(`Eksik sektor: ${id}`);
}
if (iskeletler.size !== 7) sorunlar.push("Her sektorun iskelet adi benzersiz olmali.");

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
  if (new Set(sektor.temalar.map((tema) => tema.yerlesim)).size !== 3) sorunlar.push(`${sektor.id}: uc ayri site yerlesimi yok.`);
  for (const tema of sektor.temalar) {
    const [arkaPlan, anaYazi, vurgu, yuzey] = tema.renkler;
    const yuzeyYazisi = zeminYazisi(yuzey, anaYazi);
    const guvenliVurguZemini = vurguZemini(vurgu);
    const kontroller = [
      ["ana zemin", anaYazi, arkaPlan],
      ["yuzey", yuzeyYazisi, yuzey],
      ["vurgu zemini", zeminYazisi(guvenliVurguZemini), guvenliVurguZemini],
      ["ana zemin vurgusu", vurguYazisi(vurgu, arkaPlan, anaYazi), arkaPlan],
      ["ters zemin vurgusu", vurguYazisi(vurgu, anaYazi, arkaPlan), anaYazi],
      ["yuzey vurgusu", vurguYazisi(vurgu, yuzey, yuzeyYazisi), yuzey],
    ];
    for (const [rol, yazi, zemin] of kontroller) {
      const oran = kontrast(yazi, zemin);
      if (oran < 4.8) sorunlar.push(`${sektor.id}/${tema.id}: ${rol} kontrasti yetersiz (${oran.toFixed(2)}).`);
    }
  }
  const sayfalar = katalog.siteSayfalariOlustur(sektor.id);
  if (sayfalar.length !== sektor.sayfalar.length || !sayfalar[0].anaSayfa) sorunlar.push(`${sektor.id}: cok sayfali cikti bozuk.`);
  const tekSayfa = katalog.siteSayfalariOlustur(sektor.id, "tek-sayfa");
  if (tekSayfa.length !== 1 || !tekSayfa[0].anaSayfa || tekSayfa[0].slug) sorunlar.push(`${sektor.id}: tek sayfali cikti bozuk.`);
  const zenginIcerik = katalog.varsayilanIcerikOlustur(sektor.id);
  if (zenginIcerik.hizmetler.length < 8) sorunlar.push(`${sektor.id}: ayrintili hizmet sayisi sekizden az.`);
  if (!zenginIcerik.bolumGorunurlugu?.gorselAnlati || !zenginIcerik.bolumGorunurlugu?.detayliIcerik) sorunlar.push(`${sektor.id}: yeni dolu bolumler varsayilan acik degil.`);
  const medyalar = katalog.medyaAlanlariOlustur(sektor.id);
  if (medyalar.some((medya) => !medya.acik || medya.url !== `/site-assets/${sektor.id}/${medya.slot}.webp`)) sorunlar.push(`${sektor.id}: otomatik hazir gorsel yolu bozuk.`);
  const gorselListesiYolu = path.join(kok, "public", "site-assets", sektor.id, "GORSEL-LISTESI.txt");
  if (!fs.existsSync(gorselListesiYolu)) {
    sorunlar.push(`${sektor.id}: hazir gorsel klasoru veya listesi yok.`);
  } else {
    const gorselListesi = fs.readFileSync(gorselListesiYolu, "utf8");
    if (medyalar.some((medya) => !gorselListesi.includes(`${medya.slot}.webp`))) sorunlar.push(`${sektor.id}: klasor dosya listesi eksik.`);
  }
  const galeriSlotlari = medyalar.filter((medya) => medya.slot.startsWith("galeri-"));
  if (galeriSlotlari.length !== 4) sorunlar.push(`${sektor.id}: dort hareketli galeri alani olmali.`);
  const derin = derinKatalog.sektorDerinIcerigiGetir(sektor.id);
  if (derin.paketler.length < 3) sorunlar.push(`${sektor.id}: hizmet paketleri eksik.`);
  if (derin.senaryolar.length < 4) sorunlar.push(`${sektor.id}: karar senaryolari eksik.`);
  if (derin.calismaAlanlari.length < 6) sorunlar.push(`${sektor.id}: calisma alanlari eksik.`);
  if (derin.kaliteNotlari.length < 4) sorunlar.push(`${sektor.id}: kalite notlari eksik.`);
  if (derin.kayanKelimeler.length < 8) sorunlar.push(`${sektor.id}: kayan yazi icerigi eksik.`);
}

const renderer = fs.readFileSync(path.join(kok, "components/site/SektorSiteleri.tsx"), "utf8");
const css = fs.readFileSync(path.join(kok, "components/site/sektorSiteleri.module.css"), "utf8");
const editor = fs.readFileSync(path.join(kok, "app/studio/duzenle/page.tsx"), "utf8");
const wizard = fs.readFileSync(path.join(kok, "app/studio/yeni/page.tsx"), "utf8");

for (const islev of ["Kuafor", "Berber", "Guzellik", "Nail", "Nakliye", "Hali", "OtoYikama"]) {
  if (!renderer.includes(`function ${islev}(`)) sorunlar.push(`Renderer eksik: ${islev}`);
}

for (const guvence of ["BarberPole", "medya?.acik", "!medya.url.trim()", "Iletisim", "AltSayfa", "AltDetayliIcerik", "SssBolumu", "ZenginIcerik", "KayanSerit", "GorselAnlati", "GorselVitrini", "HareketKatmani", "AnimatePresence", "SosyalBaglantilar", "data-yerlesim", "prefers-reduced-motion"]) {
  const kaynak = guvence === "prefers-reduced-motion" ? css : renderer;
  if (!kaynak.includes(guvence)) sorunlar.push(`Sunum guvencesi eksik: ${guvence}`);
}

for (const berberGuvencesi of ["BerberKimlikBandi", "BerberGorselDosyasi", "altBerberImza"]) {
  if (!renderer.includes(berberGuvencesi)) sorunlar.push(`Berber sunum guvencesi eksik: ${berberGuvencesi}`);
}
for (const berberRenkGuvencesi of ["--barber-red", "--barber-white", "--barber-blue", "--barber-stripe", "data-alt-tur=\"barber\""]) {
  if (!css.includes(berberRenkGuvencesi)) sorunlar.push(`Berber renk guvencesi eksik: ${berberRenkGuvencesi}`);
}

const berberTanimi = sektorler.find((sektor) => sektor.id === "berber");
if (berberTanimi) {
  const berberIcerigi = katalog.varsayilanIcerikOlustur("berber");
  const gorunenBerberMetinleri = [
    ...berberTanimi.sayfalar.map((sayfa) => sayfa.ad),
    ...katalog.medyaAlanlariOlustur("berber").map((medya) => `${medya.baslik} ${medya.alternatifMetin}`),
    berberIcerigi.rozet, berberIcerigi.slogan, berberIcerigi.heroBaslik, berberIcerigi.heroAciklama,
    berberIcerigi.hakkimizdaBaslik, berberIcerigi.hakkimizdaMetni, berberIcerigi.guvenBasligi, berberIcerigi.guvenMetni,
    berberIcerigi.ctaBaslik, berberIcerigi.ctaMetni,
    ...berberIcerigi.hizmetler.flatMap((hizmet) => [hizmet.baslik, hizmet.aciklama]),
    ...berberIcerigi.ozellikler.flatMap((ozellik) => [ozellik.baslik, ozellik.aciklama]),
    ...berberIcerigi.sss.flatMap((kayit) => [kayit.soru, kayit.cevap]),
  ].join(" ");
  if (/\bberber\b|\bbarber\b/i.test(gorunenBerberMetinleri) || renderer.includes("BARBER<br")) {
    sorunlar.push("Berber musteri sitesinde sektor adi gorunuyor.");
  }
}

if (renderer.includes("{proje.sektorAdi}") || renderer.includes("|| proje.sektorAdi")) {
  sorunlar.push("Musteri sitesinde sektor adi gorunur olmamali.");
}

if (renderer.includes("vurgu=") || /function SiteBasligi\([^)]*vurgu/.test(renderer)) {
  sorunlar.push("Site basliginda isletme adi yaninda sektor isareti gorunmemeli.");
}

for (const kontrastGuvencesi of ["--site-on-surface", "--site-action-bg", "--site-accent-copy", "--site-accent-copy-reverse", "--site-accent-copy-surface", "--site-readable-accent"]) {
  if (!renderer.includes(kontrastGuvencesi) && !css.includes(kontrastGuvencesi)) sorunlar.push(`Kontrast guvencesi eksik: ${kontrastGuvencesi}`);
}

if (!/\.sssBolumu\s*\{[^}]*--site-current-copy:\s*var\(--site-text\)[^}]*color:\s*var\(--site-text\)/s.test(css)) {
  sorunlar.push("Merak edilenler bolumu tema metin rengini guvenli bicimde sabitlemiyor.");
}
if (!/\.site\[data-sektor="berber"\]\s+\.sssBolumu\s*\{[^}]*--site-current-copy:\s*var\(--site-bg\)[^}]*color:\s*var\(--site-bg\)/s.test(css)) {
  sorunlar.push("Berber merak edilenler bolumu koyu tema baglamina uyarlanmamis.");
}

for (const kirilim of ["@media (max-width: 1100px)", "@media (max-width: 820px)", "@media (max-width: 560px)"]) {
  if (!css.includes(kirilim)) sorunlar.push(`Mobil kirilim eksik: ${kirilim}`);
}

for (const islem of ["Müşteri görseli yükle", "Hazır görsele dön", "GORSEL_PAKET_SURUMU", "SEKTOR_ICERIK_SURUMU", "bolumGorunurlugunuDegistir", "hizmetleriGuncelle", "ozellikleriGuncelle", "temaDegistir"]) {
  if (!editor.includes(islem)) sorunlar.push(`Duzenleme islemi eksik: ${islem}`);
}

for (const guvence of ["setSiteTipi", "benzersizProjeSlug", "medyaAlanlariOlustur", "siteSayfalariOlustur", "varsayilanIcerikOlustur"]) {
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
