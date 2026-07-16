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
  },
);
const icerikler = tsModulunuYukle(
  path.join(kok, "data/icerikSablonlari.ts"),
  {
    "@/data/sektorler": sektorler,
    "@/data/sektorIcerikProfilleri": profiller,
    "@/data/sektorSunumProfilleri": sunumlar,
    "@/data/sektorSablonlari": sablonlar,
  },
);

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

for (const sektor of sektorler.sektorler) {
  const sunum = sunumlar.sektorSunumProfiliniGetir(sektor.id);
  const profil = profiller.sektorIcerikProfiliniGetir(sektor.id);

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
