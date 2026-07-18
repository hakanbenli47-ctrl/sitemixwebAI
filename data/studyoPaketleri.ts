import type { SiteBolumu } from "@/data/sektorSablonlari";
import type {
  IcerikPaketiKimligi,
  ProjeVerisi,
  SiteStilAyarlari,
} from "@/types/proje";

export interface IcerikPaketiTanimi {
  id: IcerikPaketiKimligi;
  ad: string;
  etiket: string;
  aciklama: string;
}

interface PaketMetni {
  heroBaslik: string;
  heroAciklama: string;
  hizmetBaslik: string;
  guvenBaslik: string;
  aksiyonBaslik: string;
  cta: string;
}

export const icerikPaketleri: IcerikPaketiTanimi[] = [
  {
    id: "hizli",
    ad: "Hızlı talep",
    etiket: "Dönüşüm odaklı",
    aciklama:
      "Ziyaretçiyi hizmet, uygunluk ve iletişim adımlarına kısa yoldan taşır.",
  },
  {
    id: "guven",
    ad: "Güven ve süreç",
    etiket: "En dengeli",
    aciklama:
      "Hizmet kapsamını, çalışma biçimini ve karar sürecini ayrıntılı açıklar.",
  },
  {
    id: "vitrin",
    ad: "Marka vitrini",
    etiket: "Seçici sunum",
    aciklama:
      "Uzmanlığı ve hizmet karakterini daha geniş, sakin ve marka odaklı anlatır.",
  },
];

const sektorMetinleri: Record<
  string,
  Record<IcerikPaketiKimligi, PaketMetni>
> = {
  kuafor: {
    hizli: {
      heroBaslik: "Saçınıza uygun işlemi ve randevuyu kolayca planlayın.",
      heroAciklama:
        "Kesim, renk ve bakım ihtiyacınızı paylaşın; uygun hizmeti, işlem süresini ve randevu seçeneğini birlikte netleştirelim.",
      hizmetBaslik: "Saç Hizmetleri",
      guvenBaslik: "İşlem Öncesi Net Danışmanlık",
      aksiyonBaslik: "Randevunuzu Oluşturalım",
      cta: "Randevu talebi oluşturun",
    },
    guven: {
      heroBaslik: "Kesimden renge, saç geçmişinize uygun bir plan.",
      heroAciklama:
        "Saç yapısı, önceki işlemler, hedef görünüm ve günlük bakım alışkanlığı birlikte değerlendirilerek uygulanabilir bir reçete hazırlanır.",
      hizmetBaslik: "Kesim, Renk ve Bakım Rehberi",
      guvenBaslik: "Danışmanlıktan Evde Bakıma Açık Süreç",
      aksiyonBaslik: "Size Uygun Zamanı Planlayalım",
      cta: "Saç danışmanlığı alın",
    },
    vitrin: {
      heroBaslik: "Stilinizi taşıyan kesim, renk ve bakım seçkisi.",
      heroAciklama:
        "Kişisel stilinizi, saçın teknik ihtiyaçlarıyla buluşturan seçici uygulamalar ve sakin bir salon deneyimi.",
      hizmetBaslik: "Stil ve Bakım Seçkisi",
      guvenBaslik: "Kişiye Özel Teknik Yaklaşım",
      aksiyonBaslik: "Yeni Görünümünüzü Konuşalım",
      cta: "Ön görüşme planlayın",
    },
  },
  nakliyat: {
    hizli: {
      heroBaslik: "Taşınacak alanı paylaşın, hızlıca taşıma planı çıkaralım.",
      heroAciklama:
        "Konum, kat, eşya yoğunluğu ve tarih bilgisini iletin; ekip, araç ve paketleme ihtiyacını netleştirip teklif hazırlayalım.",
      hizmetBaslik: "Nakliyat Seçenekleri",
      guvenBaslik: "Hızlı Ekspertiz ve Açık Kapsam",
      aksiyonBaslik: "Taşıma Teklifi Alın",
      cta: "Hızlı taşıma talebi oluşturun",
    },
    guven: {
      heroBaslik: "Envanterden teslime kayıtlı ve kontrollü nakliyat.",
      heroAciklama:
        "Eşya envanteri, paketleme sorumlulukları, bina koşulları ve teslim planı taşıma başlamadan önce açıkça belirlenir.",
      hizmetBaslik: "Planlı Taşıma Hizmetleri",
      guvenBaslik: "Ekspertiz, Envanter ve Teslim Kontrolü",
      aksiyonBaslik: "Taşıma Planınızı Netleştirelim",
      cta: "Ekspertiz talebi oluşturun",
    },
    vitrin: {
      heroBaslik: "Şehir içinde ve şehirler arasında özenli taşıma sistemi.",
      heroAciklama:
        "Konut, ofis ve özel eşya taşımalarını doğru ekipman, düzenli paketleme ve takip edilebilir teslim akışıyla yönetiyoruz.",
      hizmetBaslik: "Taşıma Çözümleri",
      guvenBaslik: "Her Aşamayı Görünür Kılan Operasyon",
      aksiyonBaslik: "Taşınma Projenizi Konuşalım",
      cta: "Taşıma danışmanlığı alın",
    },
  },
  tesisatci: {
    hizli: {
      heroBaslik: "Tesisat sorununu ve konumu gönderin, servis kaydı açılsın.",
      heroAciklama:
        "Kaçak, tıkanıklık veya montaj ihtiyacını kısa bilgilerle iletin; aciliyet ve uygun servis zamanı hızla belirlensin.",
      hizmetBaslik: "Tesisat Servisleri",
      guvenBaslik: "Hızlı Kayıt, Doğru Müdahale",
      aksiyonBaslik: "Tesisatçı Çağırın",
      cta: "Servis kaydı oluşturun",
    },
    guven: {
      heroBaslik: "Kaynağı ölçerek bulan, işlemi açıklayarak ilerleyen tesisat servisi.",
      heroAciklama:
        "Belirti, tesisat noktası ve alan koşulları incelenir; müdahale kapsamı onaydan sonra uygulanır ve sızdırmazlık kontrolüyle tamamlanır.",
      hizmetBaslik: "Tespit ve Onarım Hizmetleri",
      guvenBaslik: "Kaynak Tespiti ve Sızdırmazlık Kontrolü",
      aksiyonBaslik: "Sorunu Birlikte Değerlendirelim",
      cta: "Tesisat talebi oluşturun",
    },
    vitrin: {
      heroBaslik: "Ev ve iş yerleri için düzenli tesisat çözümleri.",
      heroAciklama:
        "Arıza müdahalesinden yenileme ve montaja kadar tesisat işlerini açık kapsam, temiz çalışma ve kontrollü teslimle yürütüyoruz.",
      hizmetBaslik: "Tesisat Çözümleri",
      guvenBaslik: "Temiz İşçilik ve Kontrollü Teslim",
      aksiyonBaslik: "Tesisat İhtiyacınızı Anlatalım",
      cta: "Hizmet bilgisi alın",
    },
  },
  elektrikci: {
    hizli: {
      heroBaslik: "Elektrik arızasını ve konumu paylaşın, servis kaydı açılsın.",
      heroAciklama:
        "Arıza belirtisini, pano veya hattı ve aciliyet durumunu iletin; güvenli müdahale için uygun servis zamanı belirlensin.",
      hizmetBaslik: "Elektrik Servisleri",
      guvenBaslik: "Hızlı Kayıt ve Güvenli İzolasyon",
      aksiyonBaslik: "Elektrik Servisi Çağırın",
      cta: "Servis kaydı oluşturun",
    },
    guven: {
      heroBaslik: "Ölçümle teşhis, onaylı müdahale ve güvenlik testi.",
      heroAciklama:
        "Enerji güvenli biçimde izole edilir, arıza ölçümle doğrulanır ve işlem sonrası hat, koruma ve çalışma kontrolleri tamamlanır.",
      hizmetBaslik: "Elektrik ve Pano Hizmetleri",
      guvenBaslik: "İzolasyondan Koruma Testine Güvenli Süreç",
      aksiyonBaslik: "Arızayı Birlikte Değerlendirelim",
      cta: "Elektrik servis talebi oluşturun",
    },
    vitrin: {
      heroBaslik: "Yaşam ve çalışma alanları için güvenli elektrik çözümleri.",
      heroAciklama:
        "Arıza, yenileme, aydınlatma ve pano işlerini teknik gerekçesi açıklanan, düzenli ve ölçümlü bir servis yaklaşımıyla yürütüyoruz.",
      hizmetBaslik: "Elektrik Çözümleri",
      guvenBaslik: "Teknik Standart ve Düzenli Teslim",
      aksiyonBaslik: "Elektrik İhtiyacınızı Konuşalım",
      cta: "Hizmet bilgisi alın",
    },
  },
  "oto-yikama": {
    hizli: {
      heroBaslik: "Aracınızı ve istediğiniz paketi seçin, uygun zamanı ayıralım.",
      heroAciklama:
        "Araç sınıfını, iç-dış temizlik ihtiyacını ve teslim beklentinizi paylaşın; uygun uygulama ve süre netleşsin.",
      hizmetBaslik: "Yıkama ve Bakım Paketleri",
      guvenBaslik: "Hızlı Kabul ve Kontrollü Teslim",
      aksiyonBaslik: "Araç Bakım Zamanı Ayırın",
      cta: "Araç kabulü oluşturun",
    },
    guven: {
      heroBaslik: "Yüzeye uygun ürün, kayıtlı işlem ve kontrollü araç teslimi.",
      heroAciklama:
        "Boya, jant, iç trim ve kumaş yüzeyleri ayrı değerlendirilir; uygulama kapsamı başlamadan açıklanır ve teslimde birlikte kontrol edilir.",
      hizmetBaslik: "Yüzey ve İç Mekân Bakımı",
      guvenBaslik: "Araç Kabulünden Son Kontrole Açık Süreç",
      aksiyonBaslik: "Aracınız İçin Doğru Paketi Seçelim",
      cta: "Bakım bilgisi alın",
    },
    vitrin: {
      heroBaslik: "Aracın her yüzeyi için seçici bakım ve koruma.",
      heroAciklama:
        "Günlük yıkamadan detaylı iç temizliğe ve boya korumaya uzanan uygulamaları düzenli bir bakım seçkisinde sunuyoruz.",
      hizmetBaslik: "Araç Bakım Seçkisi",
      guvenBaslik: "Detaylara Odaklanan Uygulama Standardı",
      aksiyonBaslik: "Aracınızın İhtiyacını Konuşalım",
      cta: "Bakım planı oluşturun",
    },
  },
  "hali-yikama": {
    hizli: {
      heroBaslik: "Halı türünü ve adedi paylaşın, alım planı oluşturalım.",
      heroAciklama:
        "Halı ölçüsü, dokuma türü, leke durumu ve adres bilgisini iletin; uygun yıkama ve teslim zamanı netleşsin.",
      hizmetBaslik: "Halı Yıkama Seçenekleri",
      guvenBaslik: "Hızlı Alım ve Kayıtlı Kabul",
      aksiyonBaslik: "Halı Alım Talebi Oluşturun",
      cta: "Adresten alım isteyin",
    },
    guven: {
      heroBaslik: "Dokumaya uygun yıkama, kontrollü kurutma ve kayıtlı teslim.",
      heroAciklama:
        "Halı türü ve lekeler kabulde kaydedilir; uygun yöntem seçilir, durulama ve kurutma kontrollerinden sonra teslim edilir.",
      hizmetBaslik: "Dokumaya Uygun Yıkama Hizmetleri",
      guvenBaslik: "Kabulden Teslime İzlenebilir Yıkama",
      aksiyonBaslik: "Halılarınız İçin Süreci Planlayalım",
      cta: "Yıkama talebi oluşturun",
    },
    vitrin: {
      heroBaslik: "Halı ve kilimler için özenli temizlik sistemi.",
      heroAciklama:
        "Makine halısından hassas dokumalara kadar her ürünü malzeme, renk ve leke yapısına göre ayrı bir bakım yaklaşımıyla ele alıyoruz.",
      hizmetBaslik: "Halı Bakım Seçkisi",
      guvenBaslik: "Dokumayı Koruyan Uygulama Disiplini",
      aksiyonBaslik: "Halı Türünü Birlikte Değerlendirelim",
      cta: "Yıkama bilgisi alın",
    },
  },
  temizlik: {
    hizli: {
      heroBaslik: "Alanı ve tarihi paylaşın, temizlik planını hızla çıkaralım.",
      heroAciklama:
        "Metrekare, alan türü, öncelikli işler ve uygun zamanı iletin; ekip, süre ve kapsam bilgisi netleşsin.",
      hizmetBaslik: "Temizlik Hizmetleri",
      guvenBaslik: "Hızlı Keşif ve Açık Görev Listesi",
      aksiyonBaslik: "Temizlik Teklifi Alın",
      cta: "Hızlı talep oluşturun",
    },
    guven: {
      heroBaslik: "Alan, yüzey ve görev bazlı planlanan profesyonel temizlik.",
      heroAciklama:
        "Her alan için yüzeyler, öncelikler, ekip sorumlulukları ve son kontrol maddeleri işe başlamadan belirlenir.",
      hizmetBaslik: "Planlı Temizlik Çözümleri",
      guvenBaslik: "Keşiften Kontrol Listeli Teslime",
      aksiyonBaslik: "Alanınız İçin Plan Oluşturalım",
      cta: "Keşif talebi oluşturun",
    },
    vitrin: {
      heroBaslik: "Yaşam ve çalışma alanları için düzenli hijyen hizmeti.",
      heroAciklama:
        "Tek seferlik ve periyodik temizlik ihtiyaçlarını yüzeye uygun ürünler, planlı ekip ve görünür kalite kontrolüyle yönetiyoruz.",
      hizmetBaslik: "Hijyen ve Temizlik Seçkisi",
      guvenBaslik: "Düzenli Ekip, Doğru Yöntem, Temiz Teslim",
      aksiyonBaslik: "Temizlik İhtiyacınızı Konuşalım",
      cta: "Hizmet planı oluşturun",
    },
  },
  "arac-kiralama": {
    hizli: {
      heroBaslik: "Tarih ve araç sınıfını seçin, uygunluğu hemen öğrenin.",
      heroAciklama:
        "Alış-teslim yeri, tarih, sürücü ve araç tercihini paylaşın; müsait araçlar ve kiralama koşulları netleşsin.",
      hizmetBaslik: "Kiralama Seçenekleri",
      guvenBaslik: "Hızlı Uygunluk ve Açık Koşullar",
      aksiyonBaslik: "Araç Uygunluğunu Sorun",
      cta: "Kiralama talebi oluşturun",
    },
    guven: {
      heroBaslik: "Araç, teslim ve kiralama koşulları baştan net.",
      heroAciklama:
        "Araç sınıfı, kullanım süresi, kilometre, teslim noktası ve gerekli belgeler rezervasyon öncesinde açıkça paylaşılır.",
      hizmetBaslik: "Araç ve Kiralama Rehberi",
      guvenBaslik: "Rezervasyondan Teslime Açık Kiralama Süreci",
      aksiyonBaslik: "Size Uygun Aracı Planlayalım",
      cta: "Araç seçeneklerini sorun",
    },
    vitrin: {
      heroBaslik: "Şehir içi ve uzun yol için seçili araç alternatifleri.",
      heroAciklama:
        "Günlük kullanımdan uzun dönem çözümlere kadar farklı yolculuk ihtiyaçlarına uygun araç sınıflarını bir arada sunuyoruz.",
      hizmetBaslik: "Araç Filosu ve Seçenekler",
      guvenBaslik: "Yolculuğa Uygun Araç Seçimi",
      aksiyonBaslik: "Yolculuğunuzu Birlikte Planlayalım",
      cta: "Filo uygunluğunu görün",
    },
  },
  transfer: {
    hizli: {
      heroBaslik: "Uçuşu ve rotayı paylaşın, VIP transferiniz planlansın.",
      heroAciklama:
        "Alış-bırakış noktası, tarih, uçuş kodu, yolcu ve bagaj sayısını iletin; uygun araç ve karşılama bilgisi netleşsin.",
      hizmetBaslik: "VIP Transfer Seçenekleri",
      guvenBaslik: "Hızlı Rezervasyon ve Uçuş Takibi",
      aksiyonBaslik: "Transfer Rezervasyonu Oluşturun",
      cta: "Rotanızı paylaşın",
    },
    guven: {
      heroBaslik: "Karşılama noktasından varışa kadar planlı VIP transfer.",
      heroAciklama:
        "Uçuş takibi, sürücü iletişimi, araç kapasitesi, bagaj ve buluşma bilgileri yolculuk öncesinde açıkça paylaşılır.",
      hizmetBaslik: "Planlı Transfer Hizmetleri",
      guvenBaslik: "Uçuş Takibi ve Kayıtlı Karşılama Planı",
      aksiyonBaslik: "Transferinizi Birlikte Planlayalım",
      cta: "Rezervasyon bilgisi alın",
    },
    vitrin: {
      heroBaslik: "Havalimanı ve özel rotalar için seçkin yolculuk deneyimi.",
      heroAciklama:
        "Konforlu araç seçeneklerini zamanında karşılama, sakin iletişim ve rota ayrıntılarına gösterilen özenle birleştiriyoruz.",
      hizmetBaslik: "Premium Transfer Seçkisi",
      guvenBaslik: "Konforu Ayrıntılarla Tamamlayan Hizmet",
      aksiyonBaslik: "Yolculuğunuzu Tasarlayalım",
      cta: "VIP araç planlayın",
    },
  },
  mobilya: {
    hizli: {
      heroBaslik: "Ölçüyü ve ihtiyacı paylaşın, proje görüşmesini başlatalım.",
      heroAciklama:
        "Mekân türü, yaklaşık ölçüler, kullanım beklentisi ve teslim hedefini iletin; keşif ve teklif süreci planlansın.",
      hizmetBaslik: "Mobilya ve Uygulama Hizmetleri",
      guvenBaslik: "Hızlı Keşif ve Açık Proje Kapsamı",
      aksiyonBaslik: "Proje Teklifi Alın",
      cta: "Ölçü ve talep gönderin",
    },
    guven: {
      heroBaslik: "Ölçüden montaja kontrollü özel üretim mobilya.",
      heroAciklama:
        "Mekân ölçüsü, malzeme, kullanım, donanım ve teslim kararları üretim başlamadan netleştirilir; montaj son kontrolle tamamlanır.",
      hizmetBaslik: "Özel Üretim Çözümleri",
      guvenBaslik: "Projelendirmeden Montaja Görünür Süreç",
      aksiyonBaslik: "Mekânınız İçin Proje Oluşturalım",
      cta: "Keşif görüşmesi planlayın",
    },
    vitrin: {
      heroBaslik: "Mekâna ve yaşama göre tasarlanan mobilya koleksiyonu.",
      heroAciklama:
        "Mutfak, yaşam alanı ve depolama çözümlerini malzeme karakteri, işlev ve detay işçiliğiyle birlikte tasarlıyoruz.",
      hizmetBaslik: "Mobilya ve Mekân Seçkisi",
      guvenBaslik: "Malzeme, İşlev ve Usta İşçiliği",
      aksiyonBaslik: "Mekân Fikrinizi Konuşalım",
      cta: "Tasarım görüşmesi planlayın",
    },
  },
};

const varsayilanStiller: Record<string, SiteStilAyarlari> = {
  kuafor: { genislik: "genis", bosluk: "ferah", kose: "yuvarlak", tipografi: "editorial", hareket: "canli" },
  nakliyat: { genislik: "genis", bosluk: "dengeli", kose: "keskin", tipografi: "kurumsal", hareket: "dengeli" },
  tesisatci: { genislik: "genis", bosluk: "kompakt", kose: "yumusak", tipografi: "kurumsal", hareket: "dengeli" },
  elektrikci: { genislik: "genis", bosluk: "kompakt", kose: "keskin", tipografi: "kurumsal", hareket: "canli" },
  "oto-yikama": { genislik: "genis", bosluk: "dengeli", kose: "keskin", tipografi: "modern", hareket: "canli" },
  "hali-yikama": { genislik: "dengeli", bosluk: "dengeli", kose: "yumusak", tipografi: "modern", hareket: "dengeli" },
  temizlik: { genislik: "dengeli", bosluk: "ferah", kose: "yumusak", tipografi: "modern", hareket: "sakin" },
  "arac-kiralama": { genislik: "genis", bosluk: "dengeli", kose: "yumusak", tipografi: "modern", hareket: "dengeli" },
  transfer: { genislik: "genis", bosluk: "ferah", kose: "yumusak", tipografi: "kurumsal", hareket: "sakin" },
  mobilya: { genislik: "genis", bosluk: "ferah", kose: "yumusak", tipografi: "editorial", hareket: "sakin" },
};

export function sektorVarsayilanIcerikPaketiniGetir(
  sektor: string,
): IcerikPaketiKimligi {
  if (["kuafor", "transfer", "mobilya"].includes(sektor)) {
    return "vitrin";
  }

  if (["elektrikci", "tesisatci"].includes(sektor)) {
    return "hizli";
  }

  return "guven";
}

export function sektorVarsayilanStiliniGetir(
  sektor: string,
): SiteStilAyarlari {
  return (
    varsayilanStiller[sektor] ?? {
      genislik: "dengeli",
      bosluk: "dengeli",
      kose: "yumusak",
      tipografi: "modern",
      hareket: "dengeli",
    }
  );
}

function bolumePaketiUygula(
  bolum: SiteBolumu,
  anaSayfa: boolean,
  metin: PaketMetni,
) {
  if (anaSayfa && bolum.tur === "hero") {
    return {
      ...bolum,
      baslik: metin.heroBaslik,
      aciklama: metin.heroAciklama,
      butonlar: bolum.butonlar.map((buton, index) =>
        index === 0 ? { ...buton, metin: metin.cta } : buton,
      ),
    };
  }

  if (anaSayfa && ["hizmetler", "urunler"].includes(bolum.tur)) {
    return { ...bolum, baslik: metin.hizmetBaslik };
  }

  if (anaSayfa && bolum.tur === "neden-biz") {
    return { ...bolum, baslik: metin.guvenBaslik };
  }

  if (["iletisim", "form"].includes(bolum.tur)) {
    return { ...bolum, baslik: metin.aksiyonBaslik };
  }

  return bolum;
}

export function hazirIcerikPaketiniUygula(
  proje: ProjeVerisi,
  paketId: IcerikPaketiKimligi =
    proje.icerikPaketi ?? sektorVarsayilanIcerikPaketiniGetir(proje.sektor),
): ProjeVerisi {
  const sektorPaketleri = sektorMetinleri[proje.sektor];
  const metin = sektorPaketleri?.[paketId];

  if (!metin) {
    return { ...proje, icerikPaketi: paketId };
  }

  return {
    ...proje,
    icerikPaketi: paketId,
    sayfalar: proje.sayfalar.map((sayfa) => ({
      ...sayfa,
      bolumler: sayfa.bolumler.map((bolum) =>
        bolumePaketiUygula(bolum, sayfa.anaSayfa, metin),
      ),
    })),
    guncellenmeTarihi: new Date().toISOString(),
  };
}
