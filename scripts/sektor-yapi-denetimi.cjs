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
const gorselDilleri = tsModulunuYukle(
  path.join(kok, "data/sektorGorselDili.ts"),
);
const profiller = tsModulunuYukle(
  path.join(kok, "data/sektorIcerikProfilleri.ts"),
);
const donusumler = tsModulunuYukle(
  path.join(kok, "data/sektorDonusumProfilleri.ts"),
);
const sunumlar = tsModulunuYukle(
  path.join(kok, "data/sektorSunumProfilleri.ts"),
);
const tasarimlar = tsModulunuYukle(
  path.join(kok, "data/sektorTasarimlari.ts"),
);
const sablonlar = tsModulunuYukle(
  path.join(kok, "data/sektorSablonlari.ts"),
  {
    "@/data/sektorDonusumProfilleri": donusumler,
    "@/data/sektorGorselDili": gorselDilleri,
    "@/data/sektorIcerikProfilleri": profiller,
    "@/data/sektorSunumProfilleri": sunumlar,
    "@/data/sektorTasarimlari": tasarimlar,
    "@/lib/iletisim": iletisim,
  },
);
const formlar = tsModulunuYukle(
  path.join(kok, "data/sektorFormProfilleri.ts"),
);
const gorseller = tsModulunuYukle(
  path.join(kok, "data/sektorStokGorselleri.ts"),
);
const gorselDoldurma = tsModulunuYukle(
  path.join(kok, "data/sektorGorselDoldurma.ts"),
  {
    "@/data/sektorStokGorselleri": gorseller,
  },
);
const icerikler = tsModulunuYukle(
  path.join(kok, "data/icerikSablonlari.ts"),
  {
    "@/data/sektorler": sektorler,
    "@/data/sektorDonusumProfilleri": donusumler,
    "@/data/sektorGorselDili": gorselDilleri,
    "@/data/sektorIcerikProfilleri": profiller,
    "@/data/sektorSunumProfilleri": sunumlar,
    "@/data/sektorTasarimlari": tasarimlar,
    "@/data/sektorSablonlari": sablonlar,
    "@/lib/iletisim": iletisim,
  },
);
const studyoPaketleri = tsModulunuYukle(
  path.join(kok, "data/studyoPaketleri.ts"),
);

const beklenenSektorler = [
  "kuafor",
  "nakliyat",
  "tesisatci",
  "elektrikci",
  "oto-yikama",
  "hali-yikama",
  "temizlik",
  "arac-kiralama",
  "transfer",
  "mobilya",
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
  "pearl",
  "hygiene",
  "torque",
  "signal",
  "cargo",
]);
const hedefSektorMimarisi = {
  "oto-yikama": ["otomotiv-atolye", "torque"],
  "oto-detaylandirma": ["otomotiv-atolye", "torque"],
  "arac-kaplama": ["otomotiv-atolye", "torque"],
  temizlik: ["temizlik-servisi", "hygiene"],
  "koltuk-yikama": ["temizlik-servisi", "hygiene"],
  "hali-yikama": ["temizlik-servisi", "hygiene"],
  ilaclama: ["hijyen-kontrol", "signal"],
  "guzellik-salonu": ["butik-bakim", "pearl"],
  kuafor: ["butik-bakim", "pearl"],
  berber: ["butik-bakim", "artisan"],
  elektrikci: ["teknik-servis-saha", "signal"],
  tesisatci: ["teknik-servis-saha", "signal"],
  "kombi-servisi": ["teknik-servis-saha", "signal"],
  nakliyat: ["lojistik-rota", "cargo"],
  transfer: ["seyahat-rezervasyonu", "royal"],
  "arac-kiralama": ["seyahat-rezervasyonu", "skyline"],
};
const hedefOperasyonAileleri = {
  "oto-yikama": "otomotiv",
  "oto-detaylandirma": "otomotiv",
  "arac-kaplama": "otomotiv",
  temizlik: "temizlik",
  "koltuk-yikama": "temizlik",
  "hali-yikama": "temizlik",
  ilaclama: "hijyen",
  "guzellik-salonu": "bakim",
  kuafor: "bakim",
  berber: "bakim",
  elektrikci: "teknik",
  tesisatci: "teknik",
  "kombi-servisi": "teknik",
  nakliyat: "lojistik",
  transfer: "ulasim",
  "arac-kiralama": "ulasim",
};
const sorunlar = [];
let sayfaSayisi = 0;
let bolumSayisi = 0;
const donusumAciklamalari = new Map();

if (
  JSON.stringify(sektorler.sektorler.map((sektor) => sektor.id)) !==
  JSON.stringify(beklenenSektorler)
) {
  sorunlar.push("Sektör listesi Sitemix'in odak kapsamı ve sırasıyla eşleşmiyor");
}

for (const sektor of sektorler.sektorler) {
  const sunum = sunumlar.sektorSunumProfiliniGetir(sektor.id);
  const profil = profiller.sektorIcerikProfiliniGetir(sektor.id);
  const donusum = donusumler.sektorDonusumProfiliniGetir(sektor.id);
  const formProfili = formlar.sektorFormProfiliniGetir(sektor.id);
  const stokGorseller = gorseller.sektorStokGorselleriniGetir(sektor.id);
  const tasarimProfili = tasarimlar.sektorTasarimProfiliniGetir(sektor.id);
  const tasarimSecenekleri = tasarimProfili.secenekler;
  const kararNoktalari = gorselDilleri.sektorKararNoktalariniGetir(sektor.id);
  const operasyonProfili = gorselDilleri.sektorOperasyonProfiliniGetir(sektor.id);

  if (profil === profiller.sektorIcerikProfiliniGetir("__bilinmeyen__")) {
    sorunlar.push(`${sektor.id}: özel içerik profili bulunamadı`);
  }

  if (
    donusum === donusumler.sektorDonusumProfiliniGetir("__bilinmeyen__")
  ) {
    sorunlar.push(`${sektor.id}: özel dönüşüm profili bulunamadı`);
  }

  if (
    donusum.guvenUnsurlari.length < 3 ||
    donusum.surecAdimlari.length < 4 ||
    donusum.sorular.length < 4 ||
    donusum.galeriBasliklari.length < 6
  ) {
    sorunlar.push(`${sektor.id}: dönüşüm içeriği yüzeysel kaldı`);
  }

  for (const baslik of [
    donusum.heroBaslik,
    donusum.hakkimizdaBaslik,
    donusum.hizmetlerBaslik,
    donusum.guvenBaslik,
    donusum.surecBaslik,
    donusum.sssBaslik,
    donusum.galeriBaslik,
    donusum.iletisimBaslik,
  ]) {
    if (baslik.trim().split(/\s+/).length > 6) {
      sorunlar.push(`${sektor.id}: uzun bölüm başlığı: ${baslik}`);
    }

    if (baslik.trim().length > 48) {
      sorunlar.push(`${sektor.id}: başlık mobil görünüm için fazla uzun: ${baslik}`);
    }

    const uzunKelime = baslik
      .trim()
      .split(/\s+/)
      .find((kelime) => kelime.length > 20);

    if (uzunKelime) {
      sorunlar.push(`${sektor.id}: başlıkta taşma riski taşıyan kelime: ${uzunKelime}`);
    }
  }

  for (const oge of [
    ...donusum.guvenUnsurlari,
    ...donusum.surecAdimlari,
    ...donusum.sorular,
  ]) {
    const anahtar = oge.aciklama.toLocaleLowerCase("tr-TR").replace(/\s+/g, " ").trim();
    const onceki = donusumAciklamalari.get(anahtar);

    if (onceki && onceki !== sektor.id) {
      sorunlar.push(`${sektor.id}: başka sektörle aynı açıklama: ${oge.aciklama}`);
    } else {
      donusumAciklamalari.set(anahtar, sektor.id);
    }
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

  if (!tasarimlar.sektorTasarimKaydiVarMi(sektor.id)) {
    sorunlar.push(`${sektor.id}: sektöre özel tasarım kaydı bulunamadı`);
  }

  if (!gorselDilleri.sektorSahneDiliKaydiVarMi(sektor.id)) {
    sorunlar.push(`${sektor.id}: sektörel tipografik sahne dili bulunamadı`);
  }

  if (
    kararNoktalari ===
    gorselDilleri.sektorKararNoktalariniGetir("__bilinmeyen__")
  ) {
    sorunlar.push(`${sektor.id}: sektöre özel karar mimarisi bulunamadı`);
  }

  if (
    kararNoktalari.length !== 3 ||
    new Set(kararNoktalari.map((karar) => karar.etiket)).size !== 3 ||
    new Set(kararNoktalari.map((karar) => karar.deger)).size !== 3
  ) {
    sorunlar.push(`${sektor.id}: karar noktaları eksik veya tekrarlı`);
  }

  for (const karar of kararNoktalari) {
    if (
      karar.etiket.trim().length < 3 ||
      karar.etiket.length > 28 ||
      karar.deger.trim().length < 8 ||
      karar.deger.length > 52
    ) {
      sorunlar.push(`${sektor.id}: karar noktası mobil sunuma uygun değil`);
    }
  }

  if (tasarimSecenekleri.length !== 3) {
    sorunlar.push(`${sektor.id}: tam üç tasarım seçeneği bulunmalı`);
  }

  if (tasarimSecenekleri[0]?.tema !== sunum.varsayilanTema) {
    sorunlar.push(`${sektor.id}: öncelikli tasarım varsayılan temayla eşleşmiyor`);
  }

  const hedefMimari = hedefSektorMimarisi[sektor.id];
  const hedefOperasyonAilesi = hedefOperasyonAileleri[sektor.id];

  if (
    hedefMimari &&
    (tasarimProfili.aile !== hedefMimari[0] ||
      tasarimSecenekleri[0]?.tema !== hedefMimari[1])
  ) {
    sorunlar.push(`${sektor.id}: hedef iş ailesine özel tema mimarisi uygulanmadı`);
  }

  if (
    hedefOperasyonAilesi &&
    (!operasyonProfili ||
      operasyonProfili.aile !== hedefOperasyonAilesi ||
      operasyonProfili.adimlar.length !== 3 ||
      operasyonProfili.metrikler.length !== 2 ||
      operasyonProfili.alanlar.length !== 3 ||
      operasyonProfili.secenekler.length !== 3 ||
      !operasyonProfili.panelTuru ||
      !operasyonProfili.icerikSemasi?.heroBasligi ||
      !operasyonProfili.icerikSemasi?.heroAciklamasi ||
      !operasyonProfili.icerikSemasi?.hikayeEtiketi ||
      operasyonProfili.icerikSemasi?.anaSayfaAkisi?.[0] !== "hero" ||
      operasyonProfili.icerikSemasi?.anaSayfaAkisi?.at(-1) !== "iletisim" ||
      !operasyonProfili.icerikSemasi?.anaSayfaAkisi?.includes("hikaye") ||
      new Set(operasyonProfili.icerikSemasi?.anaSayfaAkisi).size !==
        operasyonProfili.icerikSemasi?.anaSayfaAkisi?.length)
  ) {
    sorunlar.push(`${sektor.id}: operasyon sahnesi veya içerik şeması eksik`);
  }

  if (new Set(tasarimSecenekleri.map((secenek) => secenek.id)).size !== 3) {
    sorunlar.push(`${sektor.id}: tasarım kimlikleri benzersiz değil`);
  }

  if (new Set(tasarimSecenekleri.map((secenek) => secenek.duzen)).size !== 3) {
    sorunlar.push(`${sektor.id}: tasarım seçeneklerinin sayfa kurguları farklı değil`);
  }

  for (const secenek of tasarimSecenekleri) {
    if (!temaKimlikleri.has(secenek.tema)) {
      sorunlar.push(`${sektor.id}: tasarımda geçersiz renk teması var`);
    }

    if (secenek.ozellikler.length < 3 || secenek.aciklama.length < 100) {
      sorunlar.push(`${sektor.id}: tasarım açıklaması veya özellikleri yüzeysel`);
    }

    if (
      secenek.medyaStratejisi !== "metin-odakli" ||
      secenek.gorselLimiti !== gorselDilleri.SECILI_IS_GORSEL_LIMITI
    ) {
      sorunlar.push(`${sektor.id}: görselsiz medya stratejisi uygulanmadı`);
    }
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
    const anaSayfaBolumleri = anaSayfa?.bolumler || [];
    const anaSayfaTurleri = new Set(
      anaSayfaBolumleri.map((bolum) => bolum.tur),
    );

    const profesyonelAkis = operasyonProfili?.icerikSemasi?.anaSayfaAkisi;

    if (siteTipi === "cok-sayfa") {
      const paketBasliklari = new Set();

      for (const paketId of ["hizli", "guven", "vitrin"]) {
        const paketliProje = studyoPaketleri.hazirIcerikPaketiniUygula(
          sonuc,
          paketId,
        );
        const paketHero = paketliProje.sayfalar
          .find((sayfa) => sayfa.anaSayfa)
          ?.bolumler.find((bolum) => bolum.tur === "hero");

        if (paketliProje.icerikPaketi !== paketId || !paketHero?.baslik.trim()) {
          sorunlar.push(`${sektor.id}: ${paketId} içerik paketi uygulanmadı`);
        }

        paketBasliklari.add(paketHero?.baslik.trim());
      }

      if (paketBasliklari.size !== 3) {
        sorunlar.push(`${sektor.id}: hazır içerik paketleri birbirinden ayrışmıyor`);
      }

      const stil = studyoPaketleri.sektorVarsayilanStiliniGetir(sektor.id);

      if (
        !stil?.genislik ||
        !stil?.bosluk ||
        !stil?.kose ||
        !stil?.tipografi ||
        !stil?.hareket
      ) {
        sorunlar.push(`${sektor.id}: görsel stüdyo varsayılanları eksik`);
      }
    }

    if (
      profesyonelAkis
        ? anaSayfaBolumleri.length !== profesyonelAkis.length
        : anaSayfaBolumleri.length < 6 || anaSayfaBolumleri.length > 8
    ) {
      sorunlar.push(`${sektor.id}/${siteTipi}: ana sayfa bölüm sayısı dengesiz`);
    }

    if (anaSayfaBolumleri[0]?.tur !== "hero") {
      sorunlar.push(`${sektor.id}/${siteTipi}: ana sayfa açılış bölümüyle başlamıyor`);
    }

    if (anaSayfaBolumleri.at(-1)?.tur !== "iletisim") {
      sorunlar.push(`${sektor.id}/${siteTipi}: iletişim bölümü ana sayfanın sonunda değil`);
    }

    if (profesyonelAkis) {
      const akisTurleri = {
        hero: "hero",
        guven: "istatistik",
        hizmetler: "hizmetler",
        surec: "neden-biz",
        hikaye: "metin",
        sss: "sss",
        iletisim: "iletisim",
      };
      const beklenenTurler = profesyonelAkis.map(
        (anahtar) => akisTurleri[anahtar],
      );
      const gercekTurler = anaSayfaBolumleri.map((bolum) => bolum.tur);
      const hero = anaSayfaBolumleri[0];

      if (JSON.stringify(beklenenTurler) !== JSON.stringify(gercekTurler)) {
        sorunlar.push(`${sektor.id}/${siteTipi}: içerik şeması bölüm sırasına uygulanmadı`);
      }

      if (
        hero?.baslik !== operasyonProfili.icerikSemasi.heroBasligi ||
        hero?.aciklama !== operasyonProfili.icerikSemasi.heroAciklamasi ||
        hero?.butonlar[0]?.metin !== operasyonProfili.icerikSemasi.anaAksiyon ||
        hero?.butonlar[1]?.metin !== operasyonProfili.icerikSemasi.ikincilAksiyon
      ) {
        sorunlar.push(`${sektor.id}/${siteTipi}: sektörel hero içerik şeması korunmadı`);
      }

      for (const [tur, etiket] of [
        ["istatistik", operasyonProfili.icerikSemasi.guvenEtiketi],
        ["hizmetler", operasyonProfili.icerikSemasi.hizmetEtiketi],
        ["neden-biz", operasyonProfili.icerikSemasi.surecEtiketi],
        ["metin", operasyonProfili.icerikSemasi.hikayeEtiketi],
        ["sss", operasyonProfili.icerikSemasi.sssEtiketi],
        ["iletisim", operasyonProfili.icerikSemasi.iletisimEtiketi],
      ]) {
        const semaBolumu = anaSayfaBolumleri.find((bolum) => bolum.tur === tur);

        if (semaBolumu?.ustBaslik !== etiket) {
          sorunlar.push(`${sektor.id}/${siteTipi}: ${tur} içerik etiketi uygulanmadı`);
        }
      }
    }

    const besinciBolum = anaSayfaBolumleri[4];
    const besinciBolumDolu = Boolean(
      besinciBolum &&
        (besinciBolum.baslik.trim() ||
          besinciBolum.aciklama.trim() ||
          besinciBolum.gorsel.trim() ||
          besinciBolum.arkaPlanGorseli.trim() ||
          besinciBolum.listeElemanlari.some(
            (eleman) => eleman.baslik.trim() || eleman.aciklama.trim(),
          )),
    );

    if (!besinciBolumDolu) {
      sorunlar.push(`${sektor.id}/${siteTipi}: beşinci bölüm görünür içerik taşımıyor`);
    }

    const heroBolumu = anaSayfaBolumleri[0];
    if (
      heroBolumu?.aciklama &&
      (heroBolumu.aciklama.trim().length < 60 ||
        heroBolumu.aciklama.trim().length > 190)
    ) {
      sorunlar.push(`${sektor.id}/${siteTipi}: hero açıklama yoğunluğu dengesiz`);
    }

    for (const bolum of anaSayfaBolumleri) {
      const baslikKelimeLimiti =
        operasyonProfili && bolum.tur === "hero" ? 12 : 6;

      if (bolum.baslik.trim().split(/\s+/).length > baslikKelimeLimiti) {
        sorunlar.push(`${sektor.id}/${siteTipi}: uzun ana sayfa başlığı: ${bolum.baslik}`);
      }

      if (bolum.tur !== "hero" && bolum.aciklama.trim().length > 210) {
        sorunlar.push(`${sektor.id}/${siteTipi}: bölüm açıklaması fazla yoğun: ${bolum.baslik}`);
      }

      for (const eleman of bolum.listeElemanlari) {
        if (eleman.baslik.trim().length > 52) {
          sorunlar.push(
            `${sektor.id}/${siteTipi}: kart başlığı dar görünüm için fazla uzun: ${eleman.baslik}`,
          );
        }
      }
    }

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

    if (
      anaSayfaTurleri.has("galeri") ||
      sonuc.sayfalar.some(
        (sayfa) =>
          sayfa.rol === "galeri" ||
          sayfa.bolumler.some((bolum) => bolum.tur === "galeri"),
      )
    ) {
      sorunlar.push(`${sektor.id}/${siteTipi}: görselsiz yapıda galeri üretildi`);
    }

    if (siteTipi === "tek-sayfa" && sonuc.sayfalar.length !== 1) {
      sorunlar.push(`${sektor.id}: tek sayfa yapısı hatalı`);
    }

    if (siteTipi === "cok-sayfa" && sonuc.sayfalar.length < 4) {
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

      for (let index = 1; index < sayfa.bolumler.length; index += 1) {
        const oncekiBaslik = sayfa.bolumler[index - 1].baslik
          .toLocaleLowerCase("tr-TR")
          .replace(/\s+/g, " ")
          .trim();
        const mevcutBaslik = sayfa.bolumler[index].baslik
          .toLocaleLowerCase("tr-TR")
          .replace(/\s+/g, " ")
          .trim();

        if (oncekiBaslik && oncekiBaslik === mevcutBaslik) {
          sorunlar.push(
            `${sektor.id}/${siteTipi}: ${sayfa.ad} sayfasında art arda aynı başlık kullanıldı: ${sayfa.bolumler[index].baslik}`,
          );
        }
      }
    }

    if (sonuc.sablonSurumu !== sablonlar.GUNCEL_SABLON_SURUMU) {
      sorunlar.push(`${sektor.id}/${siteTipi}: şablon sürümü güncel değil`);
    }

    if (sonuc.tema !== sunum.varsayilanTema) {
      sorunlar.push(`${sektor.id}/${siteTipi}: varsayılan tema uygulanmadı`);
    }

    if (!tasarimSecenekleri.some((secenek) => secenek.id === sonuc.tasarim)) {
      sorunlar.push(`${sektor.id}/${siteTipi}: sektöre özel tasarım uygulanmadı`);
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
    const aciklamaKullanimlari = new Map();

    for (const aciklama of sonuc.sayfalar.flatMap((sayfa) =>
      sayfa.bolumler.flatMap((bolum) => [
        bolum.aciklama,
        ...bolum.listeElemanlari.map((eleman) => eleman.aciklama),
      ]),
    )) {
      const anahtar = String(aciklama ?? "")
        .toLocaleLowerCase("tr-TR")
        .replace(/\s+/g, " ")
        .trim();

      if (anahtar.length < 50) continue;
      aciklamaKullanimlari.set(
        anahtar,
        (aciklamaKullanimlari.get(anahtar) ?? 0) + 1,
      );
    }

    const yinelenenAciklama = [...aciklamaKullanimlari.entries()].find(
      ([, adet]) => adet > 1,
    );

    if (yinelenenAciklama) {
      sorunlar.push(
        `${sektor.id}/${siteTipi}: aynı açıklama birden fazla yerde kullanıldı: ${yinelenenAciklama[0].slice(0, 80)}`,
      );
    }

    for (const eskiKalip of [
      "İhtiyacı anlayalım",
      "Kapsamı netleştirelim",
      "Planlı biçimde ilerleyelim",
      "Tamamlanırken nelere dikkat ediliyor?",
    ]) {
      if (tumIcerik.includes(eskiKalip)) {
        sorunlar.push(`${sektor.id}/${siteTipi}: yinelenen eski kalıp kaldı: ${eskiKalip}`);
      }
    }

    if (tumIcerik.includes("Uzman bilgisi")) {
      sorunlar.push(`${sektor.id}/${siteTipi}: yer tutucu içerik kaldı`);
    }

    if (!tumIcerik.includes("https://wa.me/905325550000")) {
      sorunlar.push(`${sektor.id}/${siteTipi}: WhatsApp bağlantısı eksik`);
    }

    const gorselliSonuc = gorselDoldurma.gorselsizSunumuHazirla(sonuc);

    if (
      process.env.DETAY_SEKTOR === sektor.id &&
      (process.env.DETAY_SITE_TIPI || "cok-sayfa") === siteTipi
    ) {
      console.log(
        JSON.stringify(
          {
            sektor: sektor.id,
            siteTipi,
            tasarim: gorselliSonuc.tasarim,
            tema: gorselliSonuc.tema,
            sayfalar: gorselliSonuc.sayfalar.map((sayfa) => ({
              ad: sayfa.ad,
              rol: sayfa.rol,
              bolumler: sayfa.bolumler.map((bolum) => ({
                tur: bolum.tur,
                baslik: bolum.baslik,
                aciklama: bolum.aciklama,
              })),
            })),
            anaSayfa: gorselliSonuc.sayfalar
              .find((sayfa) => sayfa.anaSayfa)
              ?.bolumler.map((bolum, index) => ({
                sira: index + 1,
                tur: bolum.tur,
                varyasyon: bolum.varyasyon,
                baslik: bolum.baslik,
                aciklamaUzunlugu: bolum.aciklama.trim().length,
                gorsel: Boolean(bolum.gorsel || bolum.arkaPlanGorseli),
                kart: bolum.listeElemanlari.length,
              })),
          },
          null,
          2,
        ),
      );
    }

    const eklenenGorselSayisi = gorselliSonuc.sayfalar
      .flatMap((sayfa) => sayfa.bolumler)
      .reduce(
        (toplam, bolum) =>
          toplam +
          Number(Boolean(bolum.gorsel)) +
          Number(Boolean(bolum.arkaPlanGorseli)) +
          bolum.listeElemanlari.filter((eleman) => eleman.gorsel).length,
        0,
      );

    if (eklenenGorselSayisi !== 0) {
      sorunlar.push(`${sektor.id}/${siteTipi}: görselsiz hazırlık stok görsel ekledi`);
    }

    if (!gorselliSonuc.gorselsizSunumHazirlandiMi) {
      sorunlar.push(`${sektor.id}/${siteTipi}: görselsiz sunum işareti eksik`);
    }
  }
}

const siteCss = fs.readFileSync(
  path.join(kok, "components/site/siteGorunumu.module.css"),
  "utf8",
);
const metinTemaCss = fs.readFileSync(
  path.join(kok, "components/site/metinTemalari.module.css"),
  "utf8",
);
const temaSecimCss = fs.readFileSync(
  path.join(kok, "app/studio/tema/tema.module.css"),
  "utf8",
);
const otomatikOlusturmaKaynagi = fs.readFileSync(
  path.join(kok, "data/sektorGorselDoldurma.ts"),
  "utf8",
);

if (!otomatikOlusturmaKaynagi.includes("gorselsizSunumuHazirla")) {
  sorunlar.push("görselsiz sunum hazırlayıcısı eksik");
}

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

for (const [aile, metin, zemin, vurgu] of [
  ["varsayılan", "#171a18", "#f7f6f2", "#225f49"],
  ["otomotiv", "#191b1d", "#f4f3f0", "#8a4308"],
  ["bakım", "#34272d", "#faf6f3", "#8b3658"],
  ["temizlik", "#15251f", "#f3f8f5", "#0b6b50"],
  ["hijyen", "#24231e", "#f7f5ed", "#705b00"],
  ["teknik", "#152235", "#f2f5f8", "#165a9f"],
  ["lojistik", "#16231a", "#f2f5f1", "#1b693e"],
  ["ulaşım", "#152831", "#f2f6f7", "#146976"],
]) {
  if (kontrastOrani(metin, zemin) < 7) {
    sorunlar.push(`${aile}: ana metin kontrastı 7 altında`);
  }

  if (kontrastOrani(vurgu, zemin) < 4.5) {
    sorunlar.push(`${aile}: vurgu kontrastı 4.5 altında`);
  }

  if (kontrastOrani("#ffffff", vurgu) < 4.5) {
    sorunlar.push(`${aile}: vurgu düğmesi kontrastı 4.5 altında`);
  }
}

const siteBileseni = fs.readFileSync(
  path.join(kok, "components/site/SiteGorunumu.tsx"),
  "utf8",
);
const temaPaletiKaynagi = fs.readFileSync(
  path.join(kok, "data/temaPaletleri.ts"),
  "utf8",
);
const temaSayfasiKaynagi = fs.readFileSync(
  path.join(kok, "app/studio/tema/page.tsx"),
  "utf8",
);

if (
  !temaSayfasiKaynagi.includes('from "@/data/temaPaletleri"') ||
  !temaSayfasiKaynagi.includes("temaPaletiniGetir(tema.id)")
) {
  sorunlar.push("Studio tema seçimi merkezi ve kontrast güvenli paleti kullanmıyor");
}

if (
  siteBileseni.includes("SektorSahnesi") ||
  /<(?:img|Image)\b/.test(siteBileseni) ||
  siteBileseni.includes('data-site-parcasi="hero-gorsel"') ||
  siteBileseni.includes('data-site-parcasi="galeri"') ||
  !siteBileseni.includes('bolum.tur === "galeri"') ||
  !siteBileseni.includes("metinTemalari.module.css")
) {
  sorunlar.push("site görünümünde görsel, galeri veya sahne yer tutucusu kaldı");
}

if (/initial="gizli"[\s\S]{0,120}whileInView=/.test(siteBileseni)) {
  sorunlar.push("görünürlük viewport animasyonuna bağımlı; bölüm boş kalabilir");
}

if (
  !siteBileseni.includes('"--site-ters-zemin": renkler.yazi') ||
  !siteBileseni.includes('"--site-ters-yazi": renkler.arkaPlan') ||
  !siteBileseni.includes('"--site-aksiyon-zemin": renkler.vurgu') ||
  !siteBileseni.includes('"--site-aksiyon-yazi": renkler.butonYazi') ||
  !siteBileseni.includes('"--site-form-zemin": renkler.ikinciArkaPlan') ||
  !siteBileseni.includes('"--site-form-yazi": renkler.yazi') ||
  !siteBileseni.includes('data-hareket-stili={sektorSahneDili.hareket}')
) {
  sorunlar.push("ters, randevu, iletişim veya hareket rolleri gerçek tema değerleriyle sabitlenmemiş");
}
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

  if (temaKimlikleri.has(eslesme[1])) {
    const merkezBlok = temaPaletiKaynagi.match(
      new RegExp(`\\b${eslesme[1]}: \\{([^}]*)\\}`),
    )?.[1];

    for (const alan of [
      "arkaPlan",
      "ikinciArkaPlan",
      "yazi",
      "solukYazi",
      "vurgu",
      "cizgi",
      "butonYazi",
    ]) {
      const siteDegeri = eslesme[2].match(
        new RegExp(`${alan}: "([^"]+)"`),
      )?.[1];
      const merkezDegeri = merkezBlok?.match(
        new RegExp(`${alan}: "([^"]+)"`),
      )?.[1];

      if (!siteDegeri || siteDegeri !== merkezDegeri) {
        sorunlar.push(`${eslesme[1]}: ${alan} merkezi tema paletiyle eşleşmiyor`);
      }
    }
  }

  for (const [alan, onPlan, zemin] of [
    ["yazı", yazi, arkaPlan],
    ["soluk yazı", solukYazi, arkaPlan],
    ["randevu form yazısı", yazi, ikinciArkaPlan],
    ["randevu form alt yazısı", solukYazi, ikinciArkaPlan],
    ["soluk yazı / ikinci zemin", solukYazi, ikinciArkaPlan],
    ["vurgu", vurgu, arkaPlan],
    ["vurgu / ikinci zemin", vurgu, ikinciArkaPlan],
    ["iletişim aksiyon yazısı", butonYazi, vurgu],
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
  ".heroBilgiListesi",
  '[data-bolum-turu="hizmetler"]',
  '[data-bolum-turu="istatistik"]',
  '[data-bolum-turu="sss"]',
  "@media (max-width: 650px)",
  "@media (prefers-reduced-motion: reduce)",
  '[data-tasarim-aile="otomotiv-atolye"]',
  '[data-tasarim-aile="temizlik-servisi"]',
  '[data-tasarim-aile="hijyen-kontrol"]',
  '[data-tasarim-aile="teknik-servis-saha"]',
  '[data-tasarim-aile="klinik-guven"]',
  '[data-tasarim-aile="emlak-portfoyu"]',
  '[data-tasarim-aile="seyahat-rezervasyonu"]',
]) {
  if (!siteCss.includes(gerekliSinif)) {
    sorunlar.push(`sunum CSS'i eksik: ${gerekliSinif}`);
  }
}

for (const metinTemaKurali of [
  ".sadeSite",
  ".heroSadeceMetin",
  ".metinSadeceMetin",
  'data-profesyonel-aile="otomotiv"',
  'data-profesyonel-aile="bakim"',
  'data-profesyonel-aile="temizlik"',
  'data-profesyonel-aile="hijyen"',
  'data-profesyonel-aile="teknik"',
  'data-profesyonel-aile="lojistik"',
  'data-profesyonel-aile="ulasim"',
  'data-site-alani="hero"',
  'data-site-parcasi="hero-metin"',
  'data-site-parcasi="hero-bilgi"',
  'data-site-parcasi="liste"',
  'data-site-parcasi="kart"',
  'section[data-bolum-turu="iletisim"]',
  'section[data-bolum-turu="form"]',
  "@media (max-width: 650px)",
  "@media (prefers-reduced-motion: reduce)",
]) {
  if (!metinTemaCss.includes(metinTemaKurali)) {
    sorunlar.push(`görselsiz metin teması eksik: ${metinTemaKurali}`);
  }
}

if (/url\(|(?:linear|radial)-gradient\(/.test(metinTemaCss)) {
  sorunlar.push("metin temasında görsel veya dekoratif gradyan kaldı");
}

for (const semantikRenk of [
  "--site-panel-yazi",
  "--site-ters-zemin",
  "--site-ters-yazi",
  "--site-vurgu-zemin",
  "--site-vurgu-yazi",
  "--site-aksiyon-zemin",
  "--site-aksiyon-yazi",
  "--site-form-zemin",
  "--site-form-yazi",
  "--site-form-soluk",
  "--site-form-cizgi",
  "--site-alan-yazi",
  "--site-alan-soluk",
  "--site-kutu-zemin",
  "--site-kutu-yazi",
  "--site-kutu-soluk",
]) {
  if (!siteCss.includes(semantikRenk)) {
    sorunlar.push(`semantik kontrast rengi eksik: ${semantikRenk}`);
  }
}

for (const hareketKurali of [
  'data-hareket-stili="akiskan"',
  'data-hareket-stili="nabiz"',
  'data-hareket-stili="salinan"',
  'data-hareket-stili="donen"',
  "@supports (animation-timeline: view())",
  "@keyframes heroMetniNetlesir",
  "@keyframes gorunurMetinGecisi",
]) {
  if (!siteCss.includes(hareketKurali)) {
    sorunlar.push(`sektörel hareket kuralı eksik: ${hareketKurali}`);
  }
}

for (const guvenliYerlesimKurali of [
  "contain: paint",
  "z-index: 4",
  "var(--site-kutu-yazi)",
  "var(--site-kutu-soluk)",
  ".talepFormu select option",
  ".talepFormu :is(input, textarea):-webkit-autofill",
  '.standartBolum[data-bolum-turu="iletisim"] :is(h2, h3, strong, a, svg)',
]) {
  if (!siteCss.includes(guvenliYerlesimKurali)) {
    sorunlar.push(`görsel/metin güvenlik kuralı eksik: ${guvenliYerlesimKurali}`);
  }
}

for (const semaParcasi of [
  "data-site-alani=\"hero\"",
  "data-site-parcasi=\"hero-metin\"",
  "data-site-parcasi=\"liste\"",
  "data-site-parcasi=\"kart\"",
  "data-site-parcasi=\"bolum-icerigi\"",
]) {
  if (!siteBileseni.includes(semaParcasi)) {
    sorunlar.push(`sektör şeması bağlantısı eksik: ${semaParcasi}`);
  }
}

for (const veriNiteligi of [
  "data-tasarim-aile",
  "data-tasarim-duzen",
  "data-kart-stili",
  "data-yogunluk",
  "data-gorsel-orani",
  "data-medya-stratejisi",
  "data-gorsel-limiti",
  "data-bolum-turu",
  "data-ana-sayfa",
  "data-sektor",
]) {
  if (!siteBileseni.includes(veriNiteligi)) {
    sorunlar.push(`site görünümünde tasarım niteliği eksik: ${veriNiteligi}`);
  }
}

if (!temaSecimCss.includes("grid-template-columns: repeat(3, minmax(0, 1fr))")) {
  sorunlar.push("tema seçimindeki üçlü sektör düzeni eksik; boş hücre oluşabilir");
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
