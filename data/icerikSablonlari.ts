import { sektorler } from "@/data/sektorler";
import {
  hizmetDetayiniGetir,
  sektorIcerikProfiliniGetir,
  type SektorIcerikProfili,
} from "@/data/sektorIcerikProfilleri";
import { sektorDonusumProfiliniGetir } from "@/data/sektorDonusumProfilleri";
import { sektorOperasyonProfiliniGetir } from "@/data/sektorGorselDili";
import {
  sektorSunumProfiliniGetir,
  type SayfaRolu,
} from "@/data/sektorSunumProfilleri";
import { sektorTasariminiGetir } from "@/data/sektorTasarimlari";
import type {
  ButonVerisi,
  ListeElemani,
  SiteBolumu,
  SiteSayfasi,
} from "@/data/sektorSablonlari";
import {
  GUNCEL_SABLON_SURUMU,
  sektorHizmetleriniGetir,
  sektorSayfalariOlustur,
} from "@/data/sektorSablonlari";
import {
  telefonBaglantisi,
  whatsappBaglantisi,
} from "@/lib/iletisim";
import type { ProjeVerisi } from "@/types/proje";

type HazirButon = Pick<ButonVerisi, "metin" | "baglanti">;
type HazirListeElemani = Pick<
  ListeElemani,
  "baslik" | "aciklama" | "baglanti"
>;

interface HazirBolumIcerigi {
  ustBaslik: string;
  baslik: string;
  aciklama: string;
  butonlar: HazirButon[];
  listeElemanlari: HazirListeElemani[];
}

interface KategoriTonu {
  anaBaslik: string;
  anaAciklama: string;
  hizmetAciklamasi: string;
  hizmetDetayi: string;
  hakkimizdaBaslik: string;
  hakkimizdaMetni: string;
}

const kategoriTonlari: Record<string, KategoriTonu> = {
  "Güzellik ve Bakım": {
    anaBaslik: "Kendinizi iyi hissettiren özenli bakım",
    anaAciklama:
      "İhtiyacınıza uygun uygulamaları, rahat bir deneyim ve kolay randevu süreciyle bir araya getiriyoruz.",
    hizmetAciklamasi:
      "Bakım hedefinize uygun hizmetleri inceleyin; size uygun uygulama ve randevu zamanı için bilgi alın.",
    hizmetDetayi:
      "İhtiyaç ve beklentiler değerlendirilerek uygun uygulama hakkında açık bilgi verilir.",
    hakkimizdaBaslik: "Özenli hizmet, rahat iletişim, size uygun planlama",
    hakkimizdaMetni:
      "Her müşterinin ihtiyacını ayrı değerlendiriyor, hizmet öncesinde beklentiyi netleştiriyor ve süreci anlaşılır biçimde planlıyoruz.",
  },
  "Yerel Hizmetler": {
    anaBaslik: "İhtiyacınız olduğunda ulaşabileceğiniz düzenli hizmet",
    anaAciklama:
      "Talebinizi dinliyor, işin kapsamını netleştiriyor ve bulunduğunuz bölgeye uygun bir çalışma planı oluşturuyoruz.",
    hizmetAciklamasi:
      "İhtiyacınıza uygun hizmeti seçin; kapsam, konum ve uygun zaman bilgilerini paylaşarak teklif alın.",
    hizmetDetayi:
      "İşin kapsamı ve alanın koşulları değerlendirilerek uygun çalışma planı oluşturulur.",
    hakkimizdaBaslik: "Her işi kendi koşullarına göre planlıyoruz",
    hakkimizdaMetni:
      "Talebi doğru anlamaya, yapılacak işi önceden netleştirmeye ve süreç boyunca ulaşılabilir olmaya önem veriyoruz.",
  },
  Otomotiv: {
    anaBaslik: "Aracınız için doğru hizmet, açık ve kolay iletişim",
    anaAciklama:
      "Aracınızın ihtiyacını netleştiriyor, uygun hizmet seçeneği ve süreç hakkında anlaşılır bilgi sunuyoruz.",
    hizmetAciklamasi:
      "Aracınız için sunulan hizmetleri inceleyin; güncel uygunluk ve detaylar için bizimle iletişime geçin.",
    hizmetDetayi:
      "Araç ve ihtiyaç bilgileri değerlendirilerek uygun işlem kapsamı hakkında bilgi verilir.",
    hakkimizdaBaslik: "Aracınıza gösterdiğimiz özeni iletişimimize de yansıtıyoruz",
    hakkimizdaMetni:
      "İhtiyacı doğru belirlemeye, uygulanacak işlemleri açık biçimde anlatmaya ve süreci düzenli yürütmeye önem veriyoruz.",
  },
  "Yeme ve İçme": {
    anaBaslik: "Özenle hazırlanan lezzetler, keyifli bir deneyim",
    anaAciklama:
      "Öne çıkan lezzetleri, güncel seçenekleri ve işletmemiz hakkında merak ettiğiniz bilgileri bir arada keşfedin.",
    hizmetAciklamasi:
      "Menümüzden öne çıkan seçenekleri inceleyin; güncel bilgi ve rezervasyon için bize ulaşın.",
    hizmetDetayi:
      "İçerik ve güncel sunum bilgisi için işletmemizle iletişime geçebilirsiniz.",
    hakkimizdaBaslik: "Her ziyareti güzel bir deneyime dönüştürmek için çalışıyoruz",
    hakkimizdaMetni:
      "Hazırlıktan sunuma kadar her aşamada özenli olmaya, misafirlerimizi rahat ettirmeye ve sıcak bir iletişim kurmaya önem veriyoruz.",
  },
  Sağlık: {
    anaBaslik: "Bilgi alabileceğiniz, güvenle iletişim kurabileceğiniz sağlık hizmeti",
    anaAciklama:
      "Hizmet alanlarımız, uzman yaklaşımımız ve randevu süreci hakkında açık bilgiye kolayca ulaşın.",
    hizmetAciklamasi:
      "Hizmet alanlarımızı inceleyin; kişisel değerlendirme ve uygun randevu zamanı için bizimle iletişime geçin.",
    hizmetDetayi:
      "Uygun yaklaşım kişisel değerlendirme sonrasında belirlenir; ayrıntılı bilgi için randevu oluşturabilirsiniz.",
    hakkimizdaBaslik: "Açık bilgilendirme ve dikkatli değerlendirme",
    hakkimizdaMetni:
      "Her başvuruyu kendi koşulları içinde değerlendiriyor, süreç hakkında anlaşılır bilgi vermeye ve doğru yönlendirme yapmaya önem veriyoruz.",
  },
  "İnşaat ve Üretim": {
    anaBaslik: "İhtiyaca göre planlanan, detayları düşünülmüş uygulamalar",
    anaAciklama:
      "Talebinizi, alanın koşullarını ve beklentinizi birlikte değerlendirerek uygulanabilir bir çalışma planı oluşturuyoruz.",
    hizmetAciklamasi:
      "Uygulama alanlarımızı inceleyin; ölçü, konum ve beklentilerinizi paylaşarak projeniz için bilgi alın.",
    hizmetDetayi:
      "Alan, ölçü ve uygulama beklentisi değerlendirilerek işe uygun çözüm ve süreç planlanır.",
    hakkimizdaBaslik: "Planlamadan uygulamaya kadar ayrıntılara önem veriyoruz",
    hakkimizdaMetni:
      "İhtiyacı doğru analiz ediyor, kapsamı işe başlamadan netleştiriyor ve uygulama sürecini düzenli iletişimle yürütüyoruz.",
  },
  Gayrimenkul: {
    anaBaslik: "Aradığınız gayrimenkule daha bilinçli adımlarla ulaşın",
    anaAciklama:
      "Satılık ve kiralık seçenekleri ihtiyaçlarınız doğrultusunda değerlendirmenize yardımcı oluyor, süreç boyunca açık bilgi sunuyoruz.",
    hizmetAciklamasi:
      "Gayrimenkul hizmetlerimizi ve güncel seçenekleri inceleyin; aradığınız özellikleri paylaşarak destek alın.",
    hizmetDetayi:
      "Konum, bütçe ve kullanım amacı dikkate alınarak uygun seçenekler hakkında bilgi sunulur.",
    hakkimizdaBaslik: "İhtiyacınızı anlayan, süreci anlaşılır kılan yaklaşım",
    hakkimizdaMetni:
      "Beklentinizi ve önceliklerinizi dinliyor, seçenekleri açık bilgilerle değerlendirmenize ve doğru adımı planlamanıza yardımcı oluyoruz.",
  },
  Turizm: {
    anaBaslik: "Yolculuğunuzu kolaylaştıran planlı ve rahat hizmet",
    anaAciklama:
      "Seyahat veya konaklama ihtiyacınıza uygun seçenekleri inceleyin, ayrıntıları kolayca öğrenin ve planınızı güvenle oluşturun.",
    hizmetAciklamasi:
      "Sunulan seçenekleri inceleyin; tarih, kişi sayısı ve beklentilerinizi paylaşarak güncel bilgi alın.",
    hizmetDetayi:
      "Tarih, kişi sayısı ve ihtiyaçlar değerlendirilerek uygun seçenekler hakkında bilgi verilir.",
    hakkimizdaBaslik: "Planınızın her adımında kolay iletişim",
    hakkimizdaMetni:
      "İhtiyaçları önceden netleştirmeye, güncel bilgileri açıkça paylaşmaya ve misafirlerimizin süreci rahatça planlamasına önem veriyoruz.",
  },
  Eğitim: {
    anaBaslik: "Hedefe uygun, düzenli ve anlaşılır bir öğrenme süreci",
    anaAciklama:
      "Eğitim seçeneklerini, yaklaşımımızı ve kayıt sürecini inceleyerek sizin için uygun program hakkında bilgi alın.",
    hizmetAciklamasi:
      "Eğitim programlarını inceleyin; seviye, hedef ve uygun zaman bilgilerinizi paylaşarak yönlendirme alın.",
    hizmetDetayi:
      "Seviye ve hedefler değerlendirilerek uygun program ve çalışma düzeni hakkında bilgi verilir.",
    hakkimizdaBaslik: "Her öğrencinin ihtiyacını dikkate alan planlama",
    hakkimizdaMetni:
      "Öğrenme hedefini ve mevcut seviyeyi anlamaya, uygun programı açıkça anlatmaya ve gelişimi düzenli biçimde desteklemeye önem veriyoruz.",
  },
  "Profesyonel Hizmetler": {
    anaBaslik: "Karar süreçlerinizi kolaylaştıran profesyonel destek",
    anaAciklama:
      "İhtiyacınızı dikkatle değerlendiriyor, kapsamı anlaşılır biçimde açıklıyor ve uygulanabilir bir yol haritası sunuyoruz.",
    hizmetAciklamasi:
      "Uzmanlık alanlarımızı inceleyin; ihtiyacınızın kapsamını paylaşarak ilk değerlendirme için iletişime geçin.",
    hizmetDetayi:
      "Talebin kapsamı değerlendirildikten sonra izlenebilecek süreç ve gerekli adımlar hakkında bilgi verilir.",
    hakkimizdaBaslik: "Karmaşık süreçleri anlaşılır adımlara dönüştürüyoruz",
    hakkimizdaMetni:
      "Her talebi kendi koşullarında ele alıyor, seçenekleri açık biçimde paylaşıyor ve süreç boyunca düzenli iletişim kuruyoruz.",
  },
  Spor: {
    anaBaslik: "Hedefinize uygun, sürdürülebilir bir çalışma düzeni",
    anaAciklama:
      "Seviyenizi ve hedefinizi dikkate alan seçenekleri inceleyin, size uygun program ve ders düzeni hakkında bilgi alın.",
    hizmetAciklamasi:
      "Antrenman seçeneklerini inceleyin; hedef, seviye ve uygun zaman bilgilerinizi paylaşarak programınızı planlayın.",
    hizmetDetayi:
      "Hedef ve mevcut seviye değerlendirilerek uygun çalışma seçeneği hakkında bilgi verilir.",
    hakkimizdaBaslik: "Her seviyeye uygun, düzenli ve motive edici yaklaşım",
    hakkimizdaMetni:
      "Kişisel hedefleri anlamaya, uygulanabilir bir çalışma düzeni kurmaya ve ilerlemeyi sürdürülebilir biçimde desteklemeye önem veriyoruz.",
  },
  Organizasyon: {
    anaBaslik: "Özel anlarınız için ayrıntıları düşünülmüş organizasyon",
    anaAciklama:
      "Etkinliğinizin türünü, tarzını ve ihtiyaçlarını birlikte netleştiriyor; planlamayı başından sonuna düzenli biçimde yürütüyoruz.",
    hizmetAciklamasi:
      "Organizasyon seçeneklerini inceleyin; tarih, konum ve davetli bilgilerini paylaşarak planlama desteği alın.",
    hizmetDetayi:
      "Etkinliğin tarihi, kapsamı ve beklentiler değerlendirilerek uygun planlama seçenekleri sunulur.",
    hakkimizdaBaslik: "Fikrinizi düzenli bir plana dönüştürüyoruz",
    hakkimizdaMetni:
      "Beklentiyi doğru anlamaya, ayrıntıları önceden netleştirmeye ve etkinlik sürecinde kolay iletişim kurmaya önem veriyoruz.",
  },
  "Dijital Hizmetler": {
    anaBaslik: "İşletmenizin hedeflerine uygun dijital çözümler",
    anaAciklama:
      "İhtiyacı ve hedefi birlikte netleştiriyor, anlaşılır bir planla uygulanabilir ve sürdürülebilir çözümler geliştiriyoruz.",
    hizmetAciklamasi:
      "Hizmet alanlarını inceleyin; hedefinizi ve mevcut ihtiyacınızı paylaşarak proje kapsamını birlikte belirleyin.",
    hizmetDetayi:
      "Hedef, kapsam ve mevcut yapı değerlendirilerek projeye uygun çözüm ve çalışma planı oluşturulur.",
    hakkimizdaBaslik: "Teknik ayrıntıları anlaşılır bir iş planına dönüştürüyoruz",
    hakkimizdaMetni:
      "Önce ihtiyacı ve başarı ölçütünü netleştiriyor, ardından projeyi açık adımlar ve düzenli iletişimle yürütüyoruz.",
  },
  Diğer: {
    anaBaslik: "İhtiyacınıza göre şekillenen güvenilir hizmet",
    anaAciklama:
      "Talebinizi dikkatle değerlendiriyor, kapsamı netleştiriyor ve uygulanabilir bir çalışma planı sunuyoruz.",
    hizmetAciklamasi:
      "Hizmet seçeneklerini inceleyin; ihtiyacınızın ayrıntılarını paylaşarak bilgi ve teklif alın.",
    hizmetDetayi:
      "Talebin kapsamı değerlendirilerek ihtiyaca uygun hizmet ve süreç hakkında bilgi verilir.",
    hakkimizdaBaslik: "İhtiyacı doğru anlayan, süreci açıkça anlatan yaklaşım",
    hakkimizdaMetni:
      "Her talebi kendi koşulları içinde değerlendiriyor, yapılacak işi önceden netleştiriyor ve süreç boyunca ulaşılabilir olmaya önem veriyoruz.",
  },
};

const temizlikHizmetAciklamalari: Record<string, string> = {
  "ev temizliği":
    "Evin kullanım durumu, oda sayısı ve öncelikli alanlar konuşularak ihtiyaca uygun bir temizlik planı oluşturulur.",
  "ofis temizliği":
    "Çalışma düzenini mümkün olduğunca aksatmayacak zamanlama ve alan öncelikleri belirlenerek planlı temizlik yapılır.",
  "inşaat sonrası temizlik":
    "İnce tozun ve uygulama kalıntılarının yoğun olduğu alanlar değerlendirilerek aşamalı bir çalışma kapsamı belirlenir.",
  "koltuk ve yatak temizliği":
    "Kumaşın ve yüzeyin durumu gözden geçirilerek uygun işlem kapsamı hakkında önceden bilgi verilir.",
};

const temizlikHizmetOzetleri: Record<string, string> = {
  "ev temizliği":
    "Yaşam alanları, oda sayısı ve öncelikli bölümler dikkate alınarak planlanır.",
  "ofis temizliği":
    "Çalışma alanının kullanım düzenine uygun kapsam ve zamanlama belirlenir.",
  "inşaat sonrası temizlik":
    "Yoğun toz ve uygulama kalıntıları için aşamalı çalışma kapsamı oluşturulur.",
  "koltuk ve yatak temizliği":
    "Kumaş ve yüzey durumu değerlendirilerek uygun işlem hakkında bilgi verilir.",
};

function metniKucult(metin: unknown) {
  return String(metin ?? "").trim().toLocaleLowerCase("tr-TR");
}

function ilkCumleyiAl(metin: string) {
  const temizMetin = metin.replace(/\s+/g, " ").trim();
  const ilkCumle = temizMetin.match(/^.*?[.!?](?=\s|$)/)?.[0];

  return ilkCumle || temizMetin;
}

function heroOzetiniGetir(profil: SektorIcerikProfili) {
  const ilkCumle = ilkCumleyiAl(profil.odakMetni);

  if (ilkCumle.length > 190) {
    const ilkParca = ilkCumle.split(/[;:]/)[0]?.trim();

    if (ilkParca && ilkParca.length >= 60) {
      return `${ilkParca.replace(/[.!?]+$/, "")}.`;
    }
  }

  return ilkCumle.length >= 60 && ilkCumle.length <= 190
    ? ilkCumle
    : profil.kisaYaklasim;
}

function sayfaBasliginiAyir(sayfaAdi: string, bolumBasligi: string) {
  return metniKucult(sayfaAdi) === metniKucult(bolumBasligi)
    ? `${sayfaAdi} Rehberi`
    : sayfaAdi;
}

function projeKategorisi(proje: ProjeVerisi) {
  return sektorler.find((sektor) => sektor.id === proje.sektor)?.kategori ?? "Diğer";
}

function kategoriTonunuGetir(proje: ProjeVerisi) {
  return kategoriTonlari[projeKategorisi(proje)] ?? kategoriTonlari.Diğer;
}

function konumMetni(proje: ProjeVerisi) {
  return [proje.ilce, proje.sehir]
    .map((deger) => String(deger ?? "").trim())
    .filter(Boolean)
    .join(", ");
}

function hizmetBolgesiMetni(proje: ProjeVerisi) {
  return String(proje.hizmetBolgesi ?? "").trim() || konumMetni(proje);
}

function sayfaRolunuGetir(sayfa: SiteSayfasi): SayfaRolu {
  if (sayfa.rol) return sayfa.rol;
  if (sayfa.anaSayfa || !String(sayfa.slug ?? "").trim()) return "ana";

  const anahtar = metniKucult(sayfa.slug || sayfa.ad);
  if (anahtar.includes("hakk")) return "hakkimizda";
  if (anahtar.includes("iletisim")) return "iletisim";
  if (sayfa.bolumler.some((bolum) => bolum.tur === "form")) return "aksiyon";
  if (sayfa.bolumler.some((bolum) => bolum.tur === "galeri")) return "galeri";
  return "hizmet";
}

function iletisimHedefi(proje: ProjeVerisi) {
  return proje.siteTipi === "tek-sayfa" ? "#iletisim" : "/iletisim";
}

function aksiyonHedefi(proje: ProjeVerisi) {
  const sunum = sektorSunumProfiliniGetir(proje.sektor);

  if (proje.siteTipi === "tek-sayfa" || !sunum.aksiyonSayfasi) {
    return iletisimHedefi(proje);
  }

  return `/${sunum.aksiyonSayfasi.slug}`;
}

function hizmetHedefi(proje: ProjeVerisi) {
  const sunum = sektorSunumProfiliniGetir(proje.sektor);

  return proje.siteTipi === "tek-sayfa"
    ? "#hizmetler"
    : `/${sunum.hizmetSayfasiSlug}`;
}

function galeriHedefi(proje: ProjeVerisi) {
  const sunum = sektorSunumProfiliniGetir(proje.sektor);

  return proje.siteTipi === "tek-sayfa"
    ? "#galeri"
    : `/${sunum.galeriSayfasiSlug}`;
}

function anaSayfaButonlari(proje: ProjeVerisi): HazirButon[] {
  const butonlar: HazirButon[] = [];
  const whatsapp = whatsappBaglantisi(proje.whatsapp);
  const telefon = telefonBaglantisi(proje.telefon);
  const sunum = sektorSunumProfiliniGetir(proje.sektor);
  const profesyonelSema = sektorOperasyonProfiliniGetir(
    proje.sektor,
  )?.icerikSemasi;

  if (profesyonelSema) {
    return [
      {
        metin: profesyonelSema.anaAksiyon,
        baglanti: aksiyonHedefi(proje),
      },
      {
        metin: profesyonelSema.ikincilAksiyon,
        baglanti: hizmetHedefi(proje),
      },
    ];
  }

  if (whatsapp) {
    butonlar.push({
      metin:
        proje.sektor === "temizlik"
          ? "WhatsApp’tan teklif alın"
          : "WhatsApp’tan bilgi alın",
      baglanti: whatsapp,
    });
  } else if (telefon) {
    butonlar.push({
      metin: "Telefonla bilgi alın",
      baglanti: telefon,
    });
  } else {
    butonlar.push({
      metin: "Bilgi alın",
      baglanti: aksiyonHedefi(proje),
    });
  }

  butonlar.push({
    metin: `${sunum.hizmetSayfasiAdi} sayfasını inceleyin`,
    baglanti: hizmetHedefi(proje),
  });

  return butonlar.slice(0, 2);
}

function iletisimButonlari(proje: ProjeVerisi): HazirButon[] {
  const butonlar: HazirButon[] = [];
  const telefon = telefonBaglantisi(proje.telefon);
  const whatsapp = whatsappBaglantisi(proje.whatsapp);

  if (telefon) {
    butonlar.push({
      metin: proje.telefon.trim()
        ? `Telefon: ${proje.telefon.trim()}`
        : "Telefonla arayın",
      baglanti: telefon,
    });
  }

  if (whatsapp) {
    butonlar.push({
      metin: "WhatsApp’tan yazın",
      baglanti: whatsapp,
    });
  }

  if (proje.eposta.trim()) {
    butonlar.push({
      metin: "E-posta gönderin",
      baglanti: `mailto:${proje.eposta.trim()}`,
    });
  }

  return butonlar;
}

function temizlikIcerigi(
  proje: ProjeVerisi,
  sayfa: SiteSayfasi,
  bolum: SiteBolumu,
): Partial<HazirBolumIcerigi> | null {
  if (
    proje.sablonSurumu === GUNCEL_SABLON_SURUMU ||
    proje.sektor === "temizlik"
  ) {
    return genelIcerik(proje, sayfa, bolum);
  }

  const bolge = hizmetBolgesiMetni(proje);
  const yerVurgusu = bolge ? `${bolge} ve çevresinde` : "Hizmet bölgenizde";
  const sayfaRolu = sayfaRolunuGetir(sayfa);
  const anaSayfaMi = sayfaRolu === "ana";

  if (bolum.tur === "hero" && anaSayfaMi) {
    return {
      ustBaslik: bolge ? `Temizlik hizmetleri · ${bolge}` : "Temizlik hizmetleri",
      baslik: "Temiz ve ferah alanlar için planlı temizlik desteği",
      aciklama: `${proje.firmaAdi}, ${yerVurgusu.toLocaleLowerCase("tr-TR")} ev, ofis ve farklı kullanım alanları için ihtiyaca göre planlanan temizlik hizmetleri sunar. Alanın durumunu ve önceliklerinizi paylaşın; yapılacak işi birlikte netleştirelim.`,
      butonlar: anaSayfaButonlari(proje),
    };
  }

  if (bolum.tur === "hero") {
    if (sayfaRolu === "hakkimizda") {
      return {
        ustBaslik: "Hakkımızda",
        baslik: `${proje.firmaAdi} ile düzenli ve özenli temizlik`,
        aciklama: `${yerVurgusu} temizlik ihtiyacını, alanın koşullarını ve öncelikleri dikkate alarak planlıyoruz. Sürecin başında kapsamı netleştiriyor, iletişimi açık ve kolay tutuyoruz.`,
      };
    }

    if (sayfaRolu === "hizmet") {
      return {
        ustBaslik: "Temizlik hizmetleri",
        baslik: "Her alan için ihtiyaca uygun çalışma planı",
        aciklama:
          "Evden ofise, düzenli temizlikten inşaat sonrası yoğun çalışmaya kadar hizmet kapsamını alanın durumuna göre belirliyoruz.",
      };
    }

    if (sayfaRolu === "galeri") {
      return {
        ustBaslik: "Çalışmalarımız",
        baslik: "Temizlik uygulamalarından gerçek detaylar",
        aciklama:
          "Farklı alanlardaki çalışma düzenimizi ve özen gösterdiğimiz ayrıntıları galeri üzerinden inceleyin.",
      };
    }

  }

  if (bolum.tur === "metin") {
    return {
      ustBaslik: anaSayfaMi ? "Bizi tanıyın" : "Çalışma yaklaşımımız",
      baslik: anaSayfaMi
        ? "Temizlik sürecini baştan anlaşılır hâle getiriyoruz"
        : "Her alanı aynı kalıba göre değil, ihtiyacına göre ele alıyoruz",
      aciklama: anaSayfaMi
        ? `${proje.firmaAdi}, alanın büyüklüğünü, kullanım yoğunluğunu ve öncelikli bölümleri dikkate alarak çalışma kapsamını belirler. Yapılacak işleri ve uygun zamanı önceden konuşarak süreci düzenli ve kolay takip edilir hâle getiririz.`
        : `Temizlik ihtiyacı; alanın büyüklüğüne, kullanım yoğunluğuna ve istenen kapsama göre değişir. ${proje.firmaAdi} olarak önce beklentinizi dinliyor, öncelikli alanları belirliyor ve çalışma planını buna göre oluşturuyoruz. Böylece ne yapılacağı baştan anlaşılır olur, siz de süreci kolayca takip edebilirsiniz.`,
      butonlar: anaSayfaMi
        ? proje.siteTipi === "cok-sayfa"
          ? [{ metin: "Bizi daha yakından tanıyın", baglanti: "/hakkimizda" }]
          : []
        : [{ metin: "Hizmetleri inceleyin", baglanti: hizmetHedefi(proje) }],
    };
  }

  if (bolum.tur === "hizmetler") {
    return {
      ustBaslik: "Hizmetlerimiz",
      baslik: anaSayfaMi
        ? "Temizliğe ihtiyaç duyduğunuz alanı seçin"
        : "İhtiyacınıza uygun temizlik hizmetini birlikte planlayalım",
      aciklama: anaSayfaMi
        ? "Ev, ofis, inşaat sonrası alanlar ve kumaş yüzeyler için sunduğumuz temel hizmetleri inceleyin. Ayrıntılı kapsam, alanın durumuna göre netleştirilir."
        : "Hizmetin kapsamı; alanın büyüklüğü, mevcut durumu ve talep edilen ayrıntılara göre belirlenir. Size uygun çalışma için temizlik türünü, konumu ve yaklaşık alan bilgisini paylaşmanız yeterlidir.",
      listeElemanlari: bolum.listeElemanlari.map((eleman) => ({
        baslik: eleman.baslik,
        aciklama:
          (anaSayfaMi
            ? temizlikHizmetOzetleri[metniKucult(eleman.baslik)]
            : temizlikHizmetAciklamalari[metniKucult(eleman.baslik)]) ??
          "Alanın durumu ve öncelikler değerlendirildikten sonra ihtiyaca uygun temizlik kapsamı planlanır.",
        baglanti: eleman.baglanti,
      })),
      butonlar: anaSayfaMi
        ? [{ metin: "Tüm hizmetleri inceleyin", baglanti: hizmetHedefi(proje) }]
        : [{ metin: "Fiyat ve uygunluk sorun", baglanti: aksiyonHedefi(proje) }],
    };
  }

  if (bolum.tur === "neden-biz") {
    if (bolum.varyasyon === "adimlar") {
      return {
        ustBaslik: "Temizlik süreci",
        baslik: "Talebinizden son kontrole dört açık adım",
        aciklama: "Alan ve öncelikler netleştirilir; ekip, zaman ve çalışma sırası buna göre planlanır.",
        listeElemanlari: [
          { baslik: "Alanı anlayalım", aciklama: "Alan türü, büyüklük, kullanım durumu ve öncelikli bölümler konuşulur.", baglanti: "" },
          { baslik: "Kapsamı yazalım", aciklama: "Yapılacak işler, ekip ihtiyacı, süre ve kullanılacak ürünler açıklanır.", baglanti: "" },
          { baslik: "Planlı çalışalım", aciklama: "Belirlenen sırayla, alanın kullanımını gözeterek temizlik uygulanır.", baglanti: "" },
          { baslik: "Birlikte kontrol edelim", aciklama: "Öncelikli alanlar ve belirlenen kapsam iş sonunda gözden geçirilir.", baglanti: "" },
        ],
      };
    }

    return {
      ustBaslik: anaSayfaMi ? "Neden bizi tercih etmelisiniz?" : "Çalışma anlayışımız",
      baslik: anaSayfaMi
        ? "Başından sonuna anlaşılır bir temizlik süreci"
        : "Sade, planlı ve ulaşılabilir hizmet",
      aciklama: anaSayfaMi
        ? "İyi bir sonuç kadar, işin nasıl ilerleyeceğinin baştan bilinmesi de önemlidir."
        : "Müşterinin neye ihtiyaç duyduğunu doğru anlamaya ve yapılacak işi açık biçimde anlatmaya önem veriyoruz.",
      listeElemanlari: anaSayfaMi
        ? [
            {
              baslik: "İhtiyaca göre kapsam",
              aciklama: "Alanı ve beklentinizi dinleyerek gerekli çalışma başlıklarını birlikte netleştiririz.",
              baglanti: "",
            },
            {
              baslik: "Planlı çalışma",
              aciklama: "Öncelikli alanları ve uygun zamanı belirleyerek düzenli bir iş akışı oluştururuz.",
              baglanti: "",
            },
            {
              baslik: "Açık iletişim",
              aciklama: "Kapsam, konum ve zamanlama hakkındaki ayrıntıları işe başlamadan konuşuruz.",
              baglanti: "",
            },
            {
              baslik: "Son kontrol",
              aciklama: "Çalışma tamamlandığında belirlenen alanları gözden geçirerek süreci kapatırız.",
              baglanti: "",
            },
          ]
        : [
            {
              baslik: "Doğru ihtiyaç tespiti",
              aciklama: "Alanın durumu ve öncelikli bölümler konuşularak hizmet kapsamı belirlenir.",
              baglanti: "",
            },
            {
              baslik: "Düzenli planlama",
              aciklama: "Çalışma sırası ve uygun zaman işe başlamadan önce netleştirilir.",
              baglanti: "",
            },
            {
              baslik: "Kolay iletişim",
              aciklama: "Hizmet öncesinde ve süreç sırasında merak edilen konular açıkça yanıtlanır.",
              baglanti: "",
            },
            {
              baslik: "Alanlara uygun yaklaşım",
              aciklama: "Farklı kullanım alanlarının ihtiyaçları ayrı ayrı değerlendirilir.",
              baglanti: "",
            },
          ],
    };
  }

  if (bolum.tur === "galeri") {
    return {
      ustBaslik: anaSayfaMi ? "Çalışmalarımız" : "Uygulama örnekleri",
      baslik: anaSayfaMi
        ? "Temizlik uygulamalarından öne çıkan detaylar"
        : "Farklı alanlardan çalışma görüntüleri",
      aciklama: anaSayfaMi
        ? "Farklı kullanım alanlarındaki çalışma düzenimizi ve özen gösterdiğimiz ayrıntıları inceleyin."
        : "Ev, ofis, inşaat sonrası alanlar ve farklı yüzeylerde gerçekleştirilen çalışmalardan öne çıkan görüntüler.",
      listeElemanlari: bolum.listeElemanlari.map((eleman) => ({
        baslik: eleman.baslik,
        aciklama: eleman.baslik
          ? `${eleman.baslik} çalışmasından öne çıkan uygulama detayı.`
          : "Tamamlanan temizlik çalışmasından uygulama detayı.",
        baglanti: eleman.baglanti,
      })),
      butonlar: anaSayfaMi
        ? [{ metin: "Çalışmaları inceleyin", baglanti: galeriHedefi(proje) }]
        : [{ metin: "Kendi alanınız için bilgi alın", baglanti: aksiyonHedefi(proje) }],
    };
  }

  if (bolum.tur === "iletisim") {
    return {
      ustBaslik: anaSayfaMi ? "Teklif ve planlama" : "İletişim",
      baslik: anaSayfaMi
        ? "Temizlik ihtiyacınızı birlikte netleştirelim"
        : "Temizlik ihtiyacınızı bize anlatın",
      aciklama: anaSayfaMi
        ? "Temizlik türünü, yaklaşık alanı, konumu ve uygun olduğunuz zamanı paylaşın; kapsam ve uygunluk hakkında size bilgi verelim."
        : `Temizlik türünü, yaklaşık alanı, bulunduğunuz konumu ve tercih ettiğiniz zamanı paylaşın. ${proje.firmaAdi} olarak talebinizi inceleyip hizmet kapsamı ve uygunluk hakkında size bilgi verelim.`,
      butonlar: iletisimButonlari(proje),
    };
  }

  if (bolum.tur === "harita") {
    return {
      ustBaslik: "Hizmet bölgesi",
      baslik: bolge ? `${bolge} temizlik hizmeti` : "Hizmet verdiğimiz bölge",
      aciklama: proje.adres || `${yerVurgusu} hizmet veriyoruz. Konum ve uygunluk bilgisi için bize ulaşabilirsiniz.`,
    };
  }

  if (bolum.tur === "form") {
    return {
      ustBaslik: "Teklif talebi",
      baslik: "Kısa bilgi bırakın, size dönüş yapalım",
      aciklama:
        "Temizlik türünü, konumu, yaklaşık alanı ve tercih ettiğiniz zamanı yazarak talebinizi iletebilirsiniz.",
    };
  }

  return null;
}

function genelIcerik(
  proje: ProjeVerisi,
  sayfa: SiteSayfasi,
  bolum: SiteBolumu,
): Partial<HazirBolumIcerigi> {
  const ton = kategoriTonunuGetir(proje);
  const bolge = hizmetBolgesiMetni(proje);
  const sayfaRolu = sayfaRolunuGetir(sayfa);
  const anaSayfaMi = sayfaRolu === "ana";
  const mevcutIcerik = proje.sayfalar
    .flatMap((sayfaVerisi) =>
      sayfaVerisi.bolumler.flatMap((bolumVerisi) => [
        bolumVerisi.ustBaslik,
        bolumVerisi.baslik,
        bolumVerisi.aciklama,
        ...bolumVerisi.listeElemanlari.map((eleman) => eleman.baslik),
      ]),
    )
    .join(" ");
  const profil = sektorIcerikProfiliniGetir(proje.sektor, mevcutIcerik);
  const donusum = sektorDonusumProfiliniGetir(proje.sektor);
  const profesyonelSema = sektorOperasyonProfiliniGetir(
    proje.sektor,
  )?.icerikSemasi;
  const hizmetler = sektorHizmetleriniGetir(proje.sektor);
  const yerMetni = bolge ? `${bolge} ve çevresinde` : "hizmet bölgenizde";

  if (bolum.tur === "hero" && anaSayfaMi) {
    return {
      ustBaslik: profesyonelSema
        ? bolge
          ? `${profesyonelSema.heroEtiketi} · ${bolge}`
          : profesyonelSema.heroEtiketi
        : bolge
          ? `${proje.sektorAdi} · ${bolge}`
          : proje.sektorAdi,
      baslik:
        profesyonelSema?.heroBasligi ??
        donusum.heroBaslik ??
        profil.heroBaslik ??
        ton.anaBaslik,
      aciklama:
        profesyonelSema?.heroAciklamasi ?? heroOzetiniGetir(profil),
      butonlar: anaSayfaButonlari(proje),
    };
  }

  if (bolum.tur === "hero") {
    if (sayfaRolu === "hakkimizda") {
      return {
        ustBaslik: "Hakkımızda",
        baslik: proje.firmaAdi,
        aciklama: profil.kisaYaklasim,
      };
    }

    if (sayfaRolu === "hizmet") {
      return {
        ustBaslik: bolum.ustBaslik || sayfa.ad,
        baslik: sayfaBasliginiAyir(
          sayfa.ad || donusum.hizmetlerBaslik,
          donusum.hizmetlerBaslik,
        ),
        aciklama: `${profil.kararOlcutleri} Uygun seçeneği birlikte netleştirebiliriz.`,
      };
    }

    if (sayfaRolu === "galeri") {
      return {
        ustBaslik: "Çalışmalarımız",
        baslik: sayfaBasliginiAyir(
          sayfa.ad || donusum.galeriBaslik,
          donusum.galeriBaslik,
        ),
        aciklama: ilkCumleyiAl(profil.sonKontrol),
      };
    }

    if (sayfaRolu === "aksiyon") {
      return {
        ustBaslik: bolum.ustBaslik || sayfa.ad,
        baslik: sayfa.ad || donusum.iletisimBaslik,
        aciklama: `${profil.iletisimIstegi} Formu doldurarak talebinizi doğrudan iletebilirsiniz.`,
      };
    }

    return {
      ustBaslik: bolum.ustBaslik || sayfa.ad,
      baslik: bolum.baslik || donusum.heroBaslik,
      aciklama: bolum.aciklama || profil.odakMetni,
    };
  }

  if (bolum.tur === "metin") {
    return {
      ustBaslik: anaSayfaMi
        ? profesyonelSema?.guvenEtiketi ?? "Çalışma yaklaşımımız"
        : "Nasıl çalışıyoruz?",
      baslik: donusum.hakkimizdaBaslik || profil.yaklasimBaslik || ton.hakkimizdaBaslik,
      aciklama: anaSayfaMi
        ? ilkCumleyiAl(profil.detayliYaklasim)
        : profil.detayliYaklasim,
      butonlar: anaSayfaMi
        ? proje.siteTipi === "cok-sayfa"
          ? [{ metin: "Bizi daha yakından tanıyın", baglanti: "/hakkimizda" }]
          : []
        : [{ metin: "Hizmetleri inceleyin", baglanti: hizmetHedefi(proje) }],
    };
  }

  if (bolum.tur === "hizmetler" || bolum.tur === "urunler") {
    const sunum = sektorSunumProfiliniGetir(proje.sektor);

    return {
      ustBaslik: bolum.ustBaslik || sunum.hizmetUstBasligi,
      baslik: donusum.hizmetlerBaslik,
      aciklama: anaSayfaMi
        ? profil.kararOlcutleri
        : `${profil.kararOlcutleri} Kapsam ve süreç başlamadan netleştirilir.`,
      listeElemanlari: bolum.listeElemanlari.map((eleman) => ({
        baslik: eleman.baslik,
        aciklama: hizmetDetayiniGetir(profil, eleman.baslik, !anaSayfaMi),
        baglanti: eleman.baglanti,
      })),
      butonlar: anaSayfaMi && proje.siteTipi === "cok-sayfa"
        ? [{ metin: `${sunum.hizmetSayfasiAdi} sayfasını inceleyin`, baglanti: hizmetHedefi(proje) }]
        : [{ metin: profil.ctaMetni, baglanti: aksiyonHedefi(proje) }],
    };
  }

  if (bolum.tur === "neden-biz") {
    const surecBolumuMu = bolum.varyasyon === "adimlar";

    if (surecBolumuMu) {
      return {
        ustBaslik:
          profesyonelSema?.surecEtiketi ||
          bolum.ustBaslik ||
          "Çalışma süreci",
        baslik: donusum.surecBaslik,
        aciklama: "",
        listeElemanlari: donusum.surecAdimlari.map((oge, index) => ({
          baslik: oge.baslik,
          aciklama:
            sayfaRolu === "hizmet"
              ? `${oge.aciklama} ${hizmetDetayiniGetir(
                  profil,
                  hizmetler[index % hizmetler.length],
                  false,
                )}`
              : oge.aciklama,
          baglanti: "",
        })),
      };
    }

    return {
      ustBaslik: anaSayfaMi
        ? profesyonelSema?.guvenEtiketi ?? "Neden bizi tercih etmelisiniz?"
        : "Çalışma ilkelerimiz",
      baslik: donusum.guvenBaslik,
      aciklama: "",
      listeElemanlari: donusum.guvenUnsurlari.map((oge) => ({
        baslik: oge.baslik,
        aciklama: oge.aciklama,
        baglanti: "",
      })),
    };
  }

  if (bolum.tur === "galeri") {
    const sunum = sektorSunumProfiliniGetir(proje.sektor);

    return {
      ustBaslik: bolum.ustBaslik || sunum.galeriSayfasiAdi,
      baslik: donusum.galeriBaslik,
      aciklama: anaSayfaMi
        ? `${donusum.galeriBasliklari.slice(0, 2).join(" ve ")} örneklerini yakından inceleyin.`
        : `${donusum.galeriBasliklari.slice(2, 4).join(" ve ")} ayrıntılarını tamamlanan çalışmalar üzerinden inceleyin.`,
      listeElemanlari: bolum.listeElemanlari.map((eleman, index) => ({
        baslik: donusum.galeriBasliklari[index % donusum.galeriBasliklari.length],
        aciklama: "",
        baglanti: eleman.baglanti,
      })),
      butonlar: anaSayfaMi && proje.siteTipi === "cok-sayfa"
        ? [{ metin: `${sunum.galeriSayfasiAdi} sayfasını inceleyin`, baglanti: galeriHedefi(proje) }]
        : [{ metin: profil.ctaMetni, baglanti: aksiyonHedefi(proje) }],
    };
  }

  if (bolum.tur === "sss") {
    return {
      ustBaslik:
        profesyonelSema?.sssEtiketi ||
        bolum.ustBaslik ||
        "Sık sorulan sorular",
      baslik: donusum.sssBaslik,
      aciklama: "",
      listeElemanlari: donusum.sorular.map((oge, index) => ({
        baslik: oge.baslik,
        aciklama:
          sayfaRolu === "hizmet"
            ? `${oge.aciklama} ${hizmetler[index % hizmetler.length]} değerlendirilirken bu nokta hizmet kapsamına göre ayrıca açıklanır.`
            : oge.aciklama,
        baglanti: "",
      })),
    };
  }

  if (bolum.tur === "iletisim") {
    return {
      ustBaslik: anaSayfaMi
        ? profesyonelSema?.iletisimEtiketi ?? "Bilgi ve planlama"
        : "İletişim",
      baslik: donusum.iletisimBaslik,
      aciklama: anaSayfaMi
        ? profil.iletisimIstegi
        : `${profil.iletisimIstegi} Güncel uygunluk ve sonraki adımları doğrudan sorabilirsiniz.`,
      butonlar: iletisimButonlari(proje),
    };
  }

  if (bolum.tur === "harita") {
    return {
      ustBaslik: "Konum ve hizmet bölgesi",
      baslik: bolge ? `${bolge} bölgesinde hizmet` : "Bizi nerede bulabilirsiniz?",
      aciklama: proje.adres
        ? `${proje.adres}. Ziyaret veya hizmet uygunluğu için gelmeden önce telefon ya da WhatsApp üzerinden kısa bilgi alabilirsiniz.`
        : `${yerMetni} hizmet veriyoruz. Konum ve uygunluk bilgisi için bize ulaşabilirsiniz.`,
    };
  }

  if (bolum.tur === "form") {
    const randevuSayfasiMi = sayfaRolu === "aksiyon";

    return {
      ustBaslik:
        profesyonelSema?.iletisimEtiketi ??
        (randevuSayfasiMi ? "Talep oluşturun" : "Kısa bilgi bırakın"),
      baslik: randevuSayfasiMi
        ? donusum.iletisimBaslik
        : "İhtiyacınızı birkaç bilgiyle anlatın",
      aciklama: `${profil.iletisimIstegi} Paylaştığınız bilgiler yalnızca talebinize dönüş yapmak için kullanılır.`,
    };
  }

  if (bolum.tur === "ekip") {
    return {
      ustBaslik: "Ekip yaklaşımı ve sorumluluklar",
      baslik: "Değerlendirmeden takibe düzenli ekip çalışması",
      aciklama: "Her başvurunun doğru anlaşılması, uygun hizmet planının oluşturulması ve gerekli takip adımlarının açıklanması için görevler belirli bir sorumluluk düzeniyle yürütülür.",
      listeElemanlari: [
        {
          baslik: "Değerlendirme ve planlama",
          aciklama: `${profil.kararOlcutleri} Başvuru bilgileri değerlendirilerek uygun hizmet ve sonraki adımlar açıklanır.`,
          baglanti: "",
        },
        {
          baslik: "Uygulama ve takip",
          aciklama: `${profil.sonKontrol} Süreçle ilgili sorular için iletişim kanalları açık tutulur.`,
          baglanti: "",
        },
      ],
    };
  }

  return {};
}

function hazirBolumIcerigiOlustur(
  proje: ProjeVerisi,
  sayfa: SiteSayfasi,
  bolum: SiteBolumu,
): HazirBolumIcerigi {
  const varsayilan: HazirBolumIcerigi = {
    ustBaslik: bolum.ustBaslik,
    baslik: bolum.baslik,
    aciklama: bolum.aciklama,
    butonlar: bolum.butonlar.map(({ metin, baglanti }) => ({ metin, baglanti })),
    listeElemanlari: bolum.listeElemanlari.map(
      ({ baslik, aciklama, baglanti }) => ({ baslik, aciklama, baglanti }),
    ),
  };

  const ozelIcerik =
    proje.sektor === "temizlik"
      ? temizlikIcerigi(proje, sayfa, bolum)
      : genelIcerik(proje, sayfa, bolum);

  return {
    ...varsayilan,
    ...(ozelIcerik ?? {}),
  };
}

function satirEkle(satirlar: string[], etiket: string, deger: string) {
  const temizDeger = String(deger ?? "").replace(/\s+/g, " ").trim();

  if (temizDeger) {
    satirlar.push(`${etiket}: ${temizDeger}`);
  }
}

export function projeyeOzelIcerigiUygula(proje: ProjeVerisi): ProjeVerisi {
  const anaSayfa = proje.sayfalar.find(
    (sayfa) => sayfa.anaSayfa || !sayfa.slug.trim(),
  );
  const profesyonelYapiVar = Boolean(
    proje.sablonSurumu === GUNCEL_SABLON_SURUMU &&
      proje.sayfalar.every((sayfa) => Boolean(sayfa.rol)) &&
      anaSayfa?.bolumler.some((bolum) => bolum.tur === "sss") &&
      anaSayfa.bolumler.some((bolum) => bolum.tur === "istatistik") &&
      anaSayfa.bolumler.some(
        (bolum) =>
          bolum.tur === "neden-biz" && bolum.varyasyon === "adimlar",
      ),
  );

  let kaynakProje = proje;

  if (!profesyonelYapiVar) {
    let yeniSayfalar = sektorSayfalariOlustur({
      firmaAdi: proje.firmaAdi,
      sektor: proje.sektor,
      sektorAdi: proje.sektorAdi,
      telefon: proje.telefon,
      whatsapp: proje.whatsapp,
      eposta: proje.eposta,
      adres: proje.adres,
      sehir: proje.sehir,
      ilce: proje.ilce,
      hizmetBolgesi: proje.hizmetBolgesi,
    });

    if (proje.siteTipi === "tek-sayfa") {
      yeniSayfalar = yeniSayfalar.length > 0 ? [yeniSayfalar[0]] : [];
    }

    const eskiSayfaHaritasi = new Map(
      proje.sayfalar.map((sayfa) => [
        sayfa.anaSayfa ? "__ana__" : metniKucult(sayfa.slug || sayfa.ad),
        sayfa,
      ]),
    );

    yeniSayfalar = yeniSayfalar.map((sayfa) => {
      const sayfaAnahtari = sayfa.anaSayfa
        ? "__ana__"
        : metniKucult(sayfa.slug || sayfa.ad);
      const eskiSayfa =
        proje.sayfalar.find(
          (aday) => sayfaRolunuGetir(aday) === sayfa.rol,
        ) ?? eskiSayfaHaritasi.get(sayfaAnahtari);

      if (!eskiSayfa) {
        return sayfa;
      }

      const kullanilanBolumler = new Set<string>();

      return {
        ...sayfa,
        bolumler: sayfa.bolumler.map((bolum) => {
          const eskiBolum = eskiSayfa.bolumler.find(
            (aday) => aday.tur === bolum.tur && !kullanilanBolumler.has(aday.id),
          );

          if (!eskiBolum) {
            return bolum;
          }

          kullanilanBolumler.add(eskiBolum.id);

          return {
            ...bolum,
            gorsel: eskiBolum.gorsel || bolum.gorsel,
            arkaPlanGorseli:
              eskiBolum.arkaPlanGorseli || bolum.arkaPlanGorseli,
            listeElemanlari: bolum.listeElemanlari.map((eleman, index) => {
              const eskiEleman =
                eskiBolum.listeElemanlari.find(
                  (aday) =>
                    metniKucult(aday.baslik) === metniKucult(eleman.baslik),
                ) ?? eskiBolum.listeElemanlari[index];

              return {
                ...eleman,
                gorsel: eskiEleman?.gorsel || eleman.gorsel,
              };
            }),
          };
        }),
      };
    });

    kaynakProje = {
      ...proje,
      sayfalar: yeniSayfalar,
      sablonSurumu: GUNCEL_SABLON_SURUMU,
    };
  }

  const sunum = sektorSunumProfiliniGetir(kaynakProje.sektor);
  const tasarim = sektorTasariminiGetir(
    kaynakProje.sektor,
    kaynakProje.tasarim,
    kaynakProje.tema,
  );

  return {
    ...kaynakProje,
    sablonSurumu: GUNCEL_SABLON_SURUMU,
    tema: tasarim?.tema || kaynakProje.tema || sunum.varsayilanTema,
    tasarim: tasarim?.id,
    sayfalar: kaynakProje.sayfalar.map((sayfa) => ({
      ...sayfa,
      rol: sayfaRolunuGetir(sayfa),
      bolumler: sayfa.bolumler.map((bolum) => {
        const icerik = hazirBolumIcerigiOlustur(
          kaynakProje,
          sayfa,
          bolum,
        );

        return {
          ...bolum,
          ustBaslik: icerik.ustBaslik,
          baslik: icerik.baslik,
          aciklama: icerik.aciklama,
          butonlar: icerik.butonlar.map((buton, index) => ({
            id: bolum.butonlar[index]?.id ?? `${bolum.id}-buton-${index + 1}`,
            metin: buton.metin,
            baglanti: buton.baglanti,
          })),
          listeElemanlari: icerik.listeElemanlari.map((eleman, index) => ({
            id:
              bolum.listeElemanlari[index]?.id ??
              `${bolum.id}-icerik-${index + 1}`,
            baslik: eleman.baslik,
            aciklama: eleman.aciklama,
            baglanti: eleman.baglanti,
            gorsel: bolum.listeElemanlari[index]?.gorsel ?? "",
          })),
        };
      }),
    })),
    guncellenmeTarihi: new Date().toISOString(),
  };
}

export function projeyeOzelTopluIcerikOlustur(proje: ProjeVerisi) {
  const bloklar = proje.sayfalar
    .slice()
    .sort((a, b) => a.sira - b.sira)
    .flatMap((sayfa) =>
      sayfa.bolumler
        .filter((bolum) => bolum.aktif)
        .slice()
        .sort((a, b) => a.sira - b.sira)
        .map((bolum) => {
          const icerik = hazirBolumIcerigiOlustur(proje, sayfa, bolum);
          const satirlar = [`Sayfa: ${sayfa.ad}`, `Bölüm: ${bolum.tur}`];

          satirEkle(satirlar, "Küçük başlık", icerik.ustBaslik);
          satirEkle(satirlar, "Ana başlık", icerik.baslik);
          satirEkle(satirlar, "Açıklama", icerik.aciklama);

          icerik.butonlar
            .filter((buton) => buton.metin.trim() && buton.baglanti.trim())
            .forEach((buton) => {
              satirlar.push(`Buton: ${buton.metin} | ${buton.baglanti}`);
            });

          const liste = icerik.listeElemanlari.filter(
            (eleman) => eleman.baslik.trim() || eleman.aciklama.trim(),
          );

          if (liste.length > 0) {
            satirlar.push("İçerikler:");
            liste.forEach((eleman) => {
              const parcalar = [eleman.baslik, eleman.aciklama, eleman.baglanti]
                .map((parca) => String(parca ?? "").replace(/\s+/g, " ").trim())
                .filter(Boolean);

              satirlar.push(`- ${parcalar.join(" | ")}`);
            });
          }

          return satirlar.join("\n");
        }),
    );

  return bloklar.join("\n\n");
}
