/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

function tsModulunuYukle(dosya, bagimliliklar = {}) {
  const kaynak = fs.readFileSync(dosya, "utf8");
  const cikti = ts.transpileModule(kaynak, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const modul = { exports: {} };
  const yerelRequire = (istek) => bagimliliklar[istek] || require(istek);

  new Function(
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
    cikti,
  )(
    modul.exports,
    yerelRequire,
    modul,
    dosya,
    path.dirname(dosya),
  );

  return modul.exports;
}

const kok = path.resolve(__dirname, "..");
const iletisim = tsModulunuYukle(path.join(kok, "lib/iletisim.ts"));
const sektorler = tsModulunuYukle(path.join(kok, "data/sektorler.ts"));
const profiller = tsModulunuYukle(
  path.join(kok, "data/sektorIcerikProfilleri.ts"),
);
const sunumlar = tsModulunuYukle(
  path.join(kok, "data/sektorSunumProfilleri.ts"),
);
const sablonlar = tsModulunuYukle(
  path.join(kok, "data/sektorSablonlari.ts"),
  {
    "@/data/sektorIcerikProfilleri": profiller,
    "@/data/sektorSunumProfilleri": sunumlar,
    "@/lib/iletisim": iletisim,
  },
);
const formlar = tsModulunuYukle(
  path.join(kok, "data/sektorFormProfilleri.ts"),
);
const gorseller = tsModulunuYukle(
  path.join(kok, "data/sektorStokGorselleri.ts"),
);
const icerikler = tsModulunuYukle(
  path.join(kok, "data/icerikSablonlari.ts"),
  {
    "@/data/sektorler": sektorler,
    "@/data/sektorIcerikProfilleri": profiller,
    "@/data/sektorSunumProfilleri": sunumlar,
    "@/data/sektorSablonlari": sablonlar,
    "@/lib/iletisim": iletisim,
  },
);

const beklenenSektorler = [
  "oto-yikama", "oto-detaylandirma", "arac-kaplama", "cam-balkon", "tente",
  "tadilat", "dekorasyon", "temizlik", "koltuk-yikama", "hali-yikama",
  "ilaclama", "guzellik-salonu", "kuafor", "berber", "diyetisyen",
  "psikolog", "fizyoterapist", "dis-klinigi", "veteriner", "emlak",
  "mimarlik", "fotografci", "dugun-salonu", "spor-salonu", "anaokulu",
  "ozel-egitim-kursu", "matbaa", "cicekci", "pastane", "mobilya",
  "elektrikci", "tesisatci", "kombi-servisi", "nakliyat", "transfer",
  "arac-kiralama",
];

const temaKimlikleri = new Set([
  "aurora",
  "obsidian",
  "ivory",
  "terra",
  "noir",
  "lagoon",
  "ruby",
  "sage",
  "copper",
  "neon",
  "mono",
  "royal",
  "sand",
  "clinic",
  "bistro",
  "artisan",
  "skyline",
  "forest",
  "studio",
  "marble",
]);
const sorunlar = [];
let sayfaSayisi = 0;
let bolumSayisi = 0;

if (
  JSON.stringify(sektorler.sektorler.map((sektor) => sektor.id)) !==
  JSON.stringify(beklenenSektorler)
) {
  sorunlar.push("Sektör listesi İşletme Bulucu sırası ve kapsamıyla eşleşmiyor");
}

for (const sektor of sektorler.sektorler) {
  const sunum = sunumlar.sektorSunumProfiliniGetir(sektor.id);
  const profil = profiller.sektorIcerikProfiliniGetir(sektor.id);
  const formProfili = formlar.sektorFormProfiliniGetir(sektor.id);
  const stokGorseller = gorseller.sektorStokGorselleriniGetir(sektor.id);

  if (profil === profiller.sektorIcerikProfiliniGetir("__bilinmeyen__")) {
    sorunlar.push(`${sektor.id}: özel içerik profili bulunamadı`);
  }

  if (sunum === sunumlar.sektorSunumProfiliniGetir("__bilinmeyen__")) {
    sorunlar.push(`${sektor.id}: özel sunum profili bulunamadı`);
  }

  if (formProfili === formlar.sektorFormProfiliniGetir("__bilinmeyen__")) {
    sorunlar.push(`${sektor.id}: özel talep formu bulunamadı`);
  }

  if (formProfili.alanlar.length < 3) {
    sorunlar.push(`${sektor.id}: talep formu sektöre göre yetersiz`);
  }

  if (stokGorseller.length < 6 || new Set(stokGorseller).size !== stokGorseller.length) {
    sorunlar.push(`${sektor.id}: görsel havuzu yetersiz veya tekrarlı`);
  }

  if (!temaKimlikleri.has(sunum.varsayilanTema)) {
    sorunlar.push(`${sektor.id}: geçersiz varsayılan tema`);
  }

  if (!sunum.temaOnerileri.includes(sunum.varsayilanTema)) {
    sorunlar.push(`${sektor.id}: varsayılan tema önerilerde yok`);
  }

  if (sunumlar.temaKarakterleriniGetir(sunum.varsayilanTema).length === 0) {
    sorunlar.push(`${sektor.id}: tema karakteri bulunamadı`);
  }

  for (const hizmet of sablonlar.sektorHizmetleriniGetir(sektor.id)) {
    const detay = profiller.hizmetDetayiniGetir(profil, hizmet, true);

    if (detay.startsWith(`${hizmet} için ihtiyaç`)) {
      sorunlar.push(`${sektor.id}: hizmet detayı eksik: ${hizmet}`);
    }
  }

  for (const siteTipi of ["tek-sayfa", "cok-sayfa"]) {
    let sayfalar = sablonlar.sektorSayfalariOlustur({
      firmaAdi: "Test İşletmesi",
      sektor: sektor.id,
      sektorAdi: sektor.ad,
      telefon: "0242 555 00 00",
      whatsapp: "0532 555 00 00",
      eposta: "bilgi@example.com",
      adres: "Muratpaşa, Antalya",
      sehir: "Antalya",
      ilce: "Muratpaşa",
      hizmetBolgesi: "Antalya",
    });

    if (siteTipi === "tek-sayfa") {
      sayfalar = sayfalar.length > 0 ? [sayfalar[0]] : [];
    }

    const tarih = new Date().toISOString();
    const sonuc = icerikler.projeyeOzelIcerigiUygula({
      id: "test",
      firmaAdi: "Test İşletmesi",
      sektor: sektor.id,
      sektorAdi: sektor.ad,
      siteTipi,
      telefon: "0242 555 00 00",
      whatsapp: "0532 555 00 00",
      eposta: "bilgi@example.com",
      adres: "Muratpaşa, Antalya",
      sehir: "Antalya",
      ilce: "Muratpaşa",
      hizmetBolgesi: "Antalya",
      slug: "test",
      tema: "",
      sayfalar,
      seoBaslik: "",
      seoAciklama: "",
      seoKelimeler: [],
      olusturulmaTarihi: tarih,
      guncellenmeTarihi: tarih,
    });

    sayfaSayisi += sonuc.sayfalar.length;
    bolumSayisi += sonuc.sayfalar.flatMap((sayfa) => sayfa.bolumler).length;

    const anaSayfa = sonuc.sayfalar.find((sayfa) => sayfa.anaSayfa);
    const anaSayfaTurleri = new Set(
      (anaSayfa?.bolumler || []).map((bolum) => bolum.tur),
    );

    for (const tur of [
      "hero",
      "hizmetler",
      "neden-biz",
      "istatistik",
      "sss",
      "iletisim",
    ]) {
      if (!anaSayfaTurleri.has(tur)) {
        sorunlar.push(`${sektor.id}/${siteTipi}: ana sayfada ${tur} eksik`);
      }
    }

    if (sunum.galeriKullan !== anaSayfaTurleri.has("galeri")) {
      sorunlar.push(`${sektor.id}/${siteTipi}: galeri tercihi uygulanmadı`);
    }

    if (siteTipi === "tek-sayfa" && sonuc.sayfalar.length !== 1) {
      sorunlar.push(`${sektor.id}: tek sayfa yapısı hatalı`);
    }

    if (siteTipi === "cok-sayfa" && sonuc.sayfalar.length < 5) {
      sorunlar.push(`${sektor.id}: çok sayfa yapısı yetersiz`);
    }

    const roller = new Set();
    const sluglar = new Set();

    for (const sayfa of sonuc.sayfalar) {
      if (!sayfa.rol) {
        sorunlar.push(`${sektor.id}/${siteTipi}: sayfa rolü eksik: ${sayfa.ad}`);
      }

      if (roller.has(sayfa.rol)) {
        sorunlar.push(`${sektor.id}/${siteTipi}: yinelenen sayfa rolü: ${sayfa.rol}`);
      }
      roller.add(sayfa.rol);

      const slug = sayfa.slug.trim();
      if (slug && sluglar.has(slug)) {
        sorunlar.push(`${sektor.id}/${siteTipi}: yinelenen slug: ${slug}`);
      }
      if (slug) sluglar.add(slug);
    }

    if (sonuc.sablonSurumu !== sablonlar.GUNCEL_SABLON_SURUMU) {
      sorunlar.push(`${sektor.id}/${siteTipi}: şablon sürümü güncel değil`);
    }

    if (sonuc.tema !== sunum.varsayilanTema) {
      sorunlar.push(`${sektor.id}/${siteTipi}: varsayılan tema uygulanmadı`);
    }

    const sayfaYollari = new Set([
      "/",
      ...sonuc.sayfalar
        .filter((sayfa) => sayfa.slug)
        .map((sayfa) => `/${sayfa.slug}`),
    ]);

    for (const buton of sonuc.sayfalar
      .flatMap((sayfa) => sayfa.bolumler)
      .flatMap((bolum) => bolum.butonlar)) {
      if (buton.baglanti.startsWith("/") && !sayfaYollari.has(buton.baglanti)) {
        sorunlar.push(
          `${sektor.id}/${siteTipi}: bozuk iç bağlantı ${buton.baglanti}`,
        );
      }
    }

    const tumIcerik = JSON.stringify(sonuc);

    if (tumIcerik.includes("Uzman bilgisi")) {
      sorunlar.push(`${sektor.id}/${siteTipi}: yer tutucu içerik kaldı`);
    }

    if (!tumIcerik.includes("https://wa.me/905325550000")) {
      sorunlar.push(`${sektor.id}/${siteTipi}: WhatsApp bağlantısı eksik`);
    }
  }
}

const siteCss = fs.readFileSync(
  path.join(kok, "components/site/siteGorunumu.module.css"),
  "utf8",
);

function renkAydinligi(hex) {
  const sayi = Number.parseInt(hex.slice(1), 16);
  const kanallar = [sayi >> 16, (sayi >> 8) & 255, sayi & 255].map(
    (kanal) => {
      const deger = kanal / 255;
      return deger <= 0.04045
        ? deger / 12.92
        : ((deger + 0.055) / 1.055) ** 2.4;
    },
  );

  return 0.2126 * kanallar[0] + 0.7152 * kanallar[1] + 0.0722 * kanallar[2];
}

function kontrastOrani(birinci, ikinci) {
  const a = renkAydinligi(birinci);
  const b = renkAydinligi(ikinci);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const siteBileseni = fs.readFileSync(
  path.join(kok, "components/site/SiteGorunumu.tsx"),
  "utf8",
);
const temaBlogu = siteBileseni
  .split("const temaRenkleri")[1]
  .split("const bolumGecisi")[0];

for (const eslesme of temaBlogu.matchAll(/^  (\w+): \{([\s\S]*?)^  \},/gm)) {
  const renk = (anahtar) =>
    eslesme[2].match(new RegExp(`${anahtar}: "(#[0-9A-Fa-f]{6})"`))?.[1];
  const arkaPlan = renk("arkaPlan");
  const ikinciArkaPlan = renk("ikinciArkaPlan");
  const yazi = renk("yazi");
  const solukYazi = renk("solukYazi");
  const vurgu = renk("vurgu");
  const butonYazi = renk("butonYazi");

  for (const [alan, onPlan, zemin] of [
    ["yazı", yazi, arkaPlan],
    ["soluk yazı", solukYazi, arkaPlan],
    ["soluk yazı / ikinci zemin", solukYazi, ikinciArkaPlan],
    ["buton", butonYazi, vurgu],
  ]) {
    if (onPlan && zemin && kontrastOrani(onPlan, zemin) < 4.5) {
      sorunlar.push(`${eslesme[1]}: ${alan} kontrastı 4.5 altında`);
    }
  }
}

for (const gerekliSinif of [
  ".varyasyon_kartli",
  ".varyasyon_adimlar",
  ".sssOgesi",
  ".formYerlesimi",
  "@media (max-width: 650px)",
  "@media (prefers-reduced-motion: reduce)",
]) {
  if (!siteCss.includes(gerekliSinif)) {
    sorunlar.push(`sunum CSS'i eksik: ${gerekliSinif}`);
  }
}

console.log(`Sektör: ${sektorler.sektorler.length}`);
console.log(`Kontrol edilen yapı: ${sektorler.sektorler.length * 2}`);
console.log(`Sayfa: ${sayfaSayisi}`);
console.log(`Bölüm: ${bolumSayisi}`);
console.log(`Sorun: ${sorunlar.length}`);

if (sorunlar.length > 0) {
  console.log(sorunlar.join("\n"));
  process.exitCode = 1;
}
