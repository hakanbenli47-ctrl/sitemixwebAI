export type BolumTuru =
  | "hero"
  | "metin"
  | "hizmetler"
  | "urunler"
  | "galeri"
  | "istatistik"
  | "neden-biz"
  | "yorumlar"
  | "ekip"
  | "fiyatlar"
  | "sss"
  | "iletisim"
  | "harita"
  | "form"
  | "video"
  | "ozel";

export type AnimasyonTuru =
  | "asagidan"
  | "soldan"
  | "sagdan"
  | "soluklasarak"
  | "maskeli"
  | "yok";

export interface ButonVerisi {
  id: string;
  metin: string;
  baglanti: string;
}

export interface ListeElemani {
  id: string;
  baslik: string;
  aciklama: string;
  gorsel: string;
  baglanti: string;
}

export interface SiteBolumu {
  id: string;
  tur: BolumTuru;
  varyasyon: string;
  aktif: boolean;
  sira: number;
  ustBaslik: string;
  baslik: string;
  aciklama: string;
  gorsel: string;
  arkaPlanGorseli: string;
  animasyon: AnimasyonTuru;
  butonlar: ButonVerisi[];
  listeElemanlari: ListeElemani[];
}

export interface SiteSayfasi {
  id: string;
  ad: string;
  slug: string;
  menuBasligi: string;
  menuGoster: boolean;
  anaSayfa: boolean;
  sira: number;
  bolumler: SiteBolumu[];
}

export interface SablonBilgileri {
  firmaAdi: string;
  sektor: string;
  sektorAdi: string;
  telefon: string;
  whatsapp: string;
  eposta: string;
  adres: string;
  sehir?: string;
  ilce?: string;
  hizmetBolgesi?: string;
}

function idOlustur() {
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    typeof window.crypto.randomUUID === "function"
  ) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function buton(metin: string, baglanti: string): ButonVerisi {
  return { id: idOlustur(), metin, baglanti };
}

function listeElemani(baslik = "", aciklama = ""): ListeElemani {
  return {
    id: idOlustur(),
    baslik,
    aciklama,
    gorsel: "",
    baglanti: "",
  };
}

function bolum(
  tur: BolumTuru,
  sira: number,
  veriler: Partial<SiteBolumu> = {},
): SiteBolumu {
  return {
    id: idOlustur(),
    tur,
    varyasyon: "standart",
    aktif: true,
    sira,
    ustBaslik: "",
    baslik: "",
    aciklama: "",
    gorsel: "",
    arkaPlanGorseli: "",
    animasyon: "asagidan",
    butonlar: [],
    listeElemanlari: [],
    ...veriler,
  };
}

function sayfa(
  ad: string,
  slug: string,
  sira: number,
  bolumler: SiteBolumu[],
  anaSayfa = false,
): SiteSayfasi {
  return {
    id: idOlustur(),
    ad,
    slug,
    menuBasligi: ad,
    menuGoster: true,
    anaSayfa,
    sira,
    bolumler,
  };
}

function konumMetni(bilgi: SablonBilgileri) {
  return [bilgi.ilce?.trim(), bilgi.sehir?.trim()].filter(Boolean).join(", ");
}

function hizmetBolgesiMetni(bilgi: SablonBilgileri) {
  return bilgi.hizmetBolgesi?.trim() || konumMetni(bilgi) || bilgi.adres.trim();
}

function kucukHarf(metin: unknown) {
  return String(metin ?? "").toLocaleLowerCase("tr-TR");
}

function whatsappNumarasi(telefon: unknown) {
  let numara = String(telefon ?? "").replace(/\D/g, "");

  if (numara.startsWith("0")) {
    numara = `90${numara.slice(1)}`;
  }

  return numara;
}

const hizmetHaritasi: Record<string, string[]> = {
  kuafor: ["Saç kesimi", "Saç boyama", "Saç bakımı", "Özel gün hazırlığı"],
  berber: ["Saç kesimi", "Sakal tıraşı", "Cilt bakımı", "Damat tıraşı"],
  "guzellik-salonu": ["Cilt bakımı", "Kalıcı makyaj", "Lazer uygulamaları", "Bölgesel bakım"],
  "estetik-merkezi": ["Cilt uygulamaları", "Medikal estetik", "Bölgesel uygulamalar", "Kişiye özel bakım planı"],
  temizlik: ["Ev temizliği", "Ofis temizliği", "İnşaat sonrası temizlik", "Koltuk ve yatak temizliği"],
  nakliyat: ["Evden eve nakliyat", "Ofis taşıma", "Paketleme", "Şehirler arası taşıma"],
  "teknik-servis": ["Arıza tespiti", "Bakım", "Onarım", "Kurulum"],
  "oto-yikama": ["İç dış yıkama", "Detaylı temizlik", "Seramik kaplama", "Koltuk temizliği"],
  "oto-servis": ["Periyodik bakım", "Arıza tespiti", "Mekanik onarım", "Elektrik ve elektronik"],
  "arac-kiralama": ["Günlük araç kiralama", "Uzun dönem kiralama", "Havalimanı teslimi", "Kurumsal filo çözümleri"],
  restoran: ["Öne çıkan lezzetler", "Ana yemekler", "Tatlılar", "İçecekler"],
  kafe: ["Kahve çeşitleri", "Kahvaltı", "Tatlılar", "Soğuk içecekler"],
  pastane: ["Yaş pasta", "Kuru pasta", "Özel gün pastaları", "Tatlı çeşitleri"],
  catering: ["Kurumsal yemek", "Davet menüsü", "Toplu yemek", "Özel organizasyon menüsü"],
  klinik: ["Muayene", "Tedavi planlaması", "Kontrol", "Danışmanlık"],
  "dis-klinigi": ["Diş muayenesi", "İmplant", "Estetik diş hekimliği", "Ortodonti"],
  veteriner: ["Muayene", "Aşılama", "Cerrahi işlemler", "Pet bakım danışmanlığı"],
  psikolog: ["Bireysel terapi", "Çift terapisi", "Çocuk ve ergen danışmanlığı", "Online görüşme"],
  diyetisyen: ["Kişiye özel beslenme", "Kilo yönetimi", "Sporcu beslenmesi", "Online danışmanlık"],
  mermer: ["Mutfak tezgâhı", "Mermer uygulama", "Granit uygulama", "Kuvars yüzey"],
  mobilya: ["Özel üretim mobilya", "Mutfak dolabı", "Yatak odası", "İç mekân çözümleri"],
  dekorasyon: ["İç dekorasyon", "Tadilat", "Anahtar teslim uygulama", "Mekân yenileme"],
  insaat: ["Anahtar teslim proje", "Tadilat", "İç dekorasyon", "Dış cephe"],
  mimarlik: ["Mimari proje", "İç mimari", "Proje danışmanlığı", "Uygulama takibi"],
  emlak: ["Satılık gayrimenkuller", "Kiralık gayrimenkuller", "Değerleme", "Yatırım danışmanlığı"],
  otel: ["Oda seçenekleri", "Konaklama", "Kahvaltı", "Otel olanakları"],
  pansiyon: ["Oda seçenekleri", "Konaklama", "Kahvaltı", "Yerel deneyimler"],
  turizm: ["Tur paketleri", "Konaklama planlama", "Rehberlik", "Özel gezi programı"],
  transfer: ["Havalimanı transferi", "Şehir içi transfer", "VIP transfer", "Grup transferi"],
  kurs: ["Birebir eğitim", "Grup eğitimi", "Sınav hazırlığı", "Online eğitim"],
  kres: ["Tam gün eğitim", "Oyun grubu", "Okul öncesi gelişim", "Etkinlik programı"],
  "ozel-okul": ["Akademik eğitim", "Yabancı dil", "Kulüp çalışmaları", "Rehberlik"],
  avukat: ["Hukuki danışmanlık", "Dava takibi", "Sözleşme", "Arabuluculuk"],
  muhasebe: ["Muhasebe hizmeti", "Vergi danışmanlığı", "Bordro", "Şirket kuruluşu"],
  danismanlik: ["Strateji danışmanlığı", "Süreç analizi", "Kurumsal gelişim", "Proje danışmanlığı"],
  sigorta: ["Trafik sigortası", "Kasko", "Sağlık sigortası", "İşyeri sigortası"],
  "spor-salonu": ["Fitness", "Kişisel antrenman", "Grup dersleri", "Beslenme desteği"],
  pilates: ["Reformer pilates", "Mat pilates", "Birebir ders", "Grup dersi"],
  fotografci: ["Düğün çekimi", "Ürün çekimi", "Portre", "Etkinlik çekimi"],
  "dugun-salonu": ["Düğün organizasyonu", "Nişan", "Kına gecesi", "Davet ve yemek"],
  organizasyon: ["Düğün organizasyonu", "Kurumsal etkinlik", "Doğum günü", "Konsept tasarım"],
  yazilim: ["Web yazılım", "Mobil uygulama", "Özel yazılım", "Teknik destek"],
  ajans: ["Web tasarım", "Sosyal medya", "Reklam yönetimi", "Marka tasarımı"],
  portfolyo: ["Uzmanlık alanları", "Seçili çalışmalar", "Hizmetler", "İş birliği"],
};

export function sektorHizmetleriniGetir(sektor: string) {
  return hizmetHaritasi[sektor] ?? [
    "Profesyonel hizmet",
    "Yerinde çözüm",
    "Danışmanlık",
    "Satış sonrası destek",
  ];
}

function anaSayfaBolumleri(
  bilgi: SablonBilgileri,
  hizmetAdlari: string[],
): SiteBolumu[] {
  const konum = hizmetBolgesiMetni(bilgi);
  const konumVurgusu = konum ? `${konum} bölgesinde ` : "";

  return [
    bolum("hero", 0, {
      varyasyon: "buyuk-baslik",
      ustBaslik: konum ? `${bilgi.sektorAdi} · ${konum}` : bilgi.sektorAdi,
      baslik: bilgi.firmaAdi,
      aciklama: `${bilgi.firmaAdi}, ${konumVurgusu}${kucukHarf(bilgi.sektorAdi)} alanında güvenilir, ulaşılabilir ve ihtiyaca uygun çözümler sunar.`,
      butonlar: [
        buton(
          bilgi.whatsapp ? "WhatsApp’tan ulaşın" : "İletişime geçin",
          bilgi.whatsapp
            ? `https://wa.me/${whatsappNumarasi(bilgi.whatsapp)}`
            : "/iletisim",
        ),
        buton("Hizmetleri inceleyin", "/hizmetler"),
      ],
    }),
    bolum("metin", 1, {
      varyasyon: "sag-gorsel",
      ustBaslik: "Hakkımızda",
      baslik: `${bilgi.firmaAdi} ile güvenli ve düzenli hizmet`,
      aciklama: `${bilgi.firmaAdi}, müşterilerinin ihtiyacını doğru anlamaya, süreci açık biçimde yönetmeye ve her işte özenli sonuç sunmaya odaklanır.${konum ? ` ${konum} ve çevresinde hızlı iletişim ve yerel hizmet avantajı sağlar.` : ""}`,
    }),
    bolum("hizmetler", 2, {
      varyasyon: "cizgili-liste",
      ustBaslik: "Hizmetler",
      baslik: "İhtiyacınıza uygun çözümler",
      aciklama: `${bilgi.firmaAdi} tarafından sunulan temel hizmetleri inceleyin; detay ve teklif için doğrudan iletişime geçin.`,
      listeElemanlari: hizmetAdlari.map((ad) =>
        listeElemani(
          ad,
          `${ad} ihtiyacınız için planlı, şeffaf ve işletmenizin beklentilerine uygun hizmet sunulur.`,
        ),
      ),
    }),
    bolum("neden-biz", 3, {
      varyasyon: "cizgili-liste",
      ustBaslik: "Neden biz",
      baslik: "Doğru iletişim, özenli çalışma, güvenilir sonuç",
      listeElemanlari: [
        listeElemani("İhtiyaca özel yaklaşım", "Her talep kendi koşullarıyla değerlendirilir ve uygun çözüm net biçimde planlanır."),
        listeElemani("Şeffaf süreç", "İşin kapsamı, uygulanacak adımlar ve iletişim süreci müşteriye açık biçimde aktarılır."),
        listeElemani("Kolay ulaşım", "Telefon ve WhatsApp üzerinden hızlı bilgi, planlama ve teklif desteği sağlanır."),
      ],
    }),
    bolum("galeri", 4, {
      varyasyon: "tam-genislik",
      ustBaslik: "Galeri",
      baslik: "Hizmetlerimizden görüntüler",
      aciklama: `${bilgi.firmaAdi} hizmetlerini, çalışma yaklaşımını ve öne çıkan detayları görseller üzerinden inceleyin.`,
      listeElemanlari: hizmetAdlari.slice(0, 4).map((ad) =>
        listeElemani(ad, `${ad} çalışmalarından örnek görünüm.`),
      ),
    }),
    bolum("iletisim", 5, {
      ustBaslik: "İletişim",
      baslik: `${bilgi.firmaAdi} ile iletişime geçin`,
      aciklama: bilgi.adres || (konum ? `${konum} ve çevresinde hizmet veriyoruz.` : "Detaylı bilgi ve teklif için bize ulaşın."),
      butonlar: [
        ...(bilgi.telefon
          ? [buton("Telefonla arayın", `tel:${bilgi.telefon.replace(/\s/g, "")}`)]
          : []),
        ...(bilgi.whatsapp
          ? [buton("WhatsApp’tan yazın", `https://wa.me/${whatsappNumarasi(bilgi.whatsapp)}`)]
          : []),
      ],
    }),
  ];
}

function standartSayfalar(
  bilgi: SablonBilgileri,
  hizmetAdlari: string[],
): SiteSayfasi[] {
  const konum = hizmetBolgesiMetni(bilgi);

  return [
    sayfa("Ana Sayfa", "", 0, anaSayfaBolumleri(bilgi, hizmetAdlari), true),
    sayfa("Hakkımızda", "hakkimizda", 1, [
      bolum("hero", 0, {
        ustBaslik: "Hakkımızda",
        baslik: bilgi.firmaAdi,
        aciklama: `${bilgi.firmaAdi}, ${kucukHarf(bilgi.sektorAdi)} alanında güven, düzenli iletişim ve kaliteli sonuç odaklı çalışır.${konum ? ` ${konum} bölgesindeki müşterilerine ulaşılabilir hizmet sunar.` : ""}`,
      }),
      bolum("metin", 1, {
        varyasyon: "sag-gorsel",
        baslik: "İşimize gösterdiğimiz özeni müşterimize yansıtıyoruz",
        aciklama: "Her talebi dikkatle değerlendiriyor, ihtiyacı doğru belirliyor ve uygulanabilir çözümü açık bir çalışma planıyla sunuyoruz.",
      }),
      bolum("neden-biz", 2, {
        baslik: "Çalışma anlayışımız",
        listeElemanlari: [
          listeElemani("Kalite", "Sunulan hizmetin her aşamasında özenli ve tutarlı standartları koruruz."),
          listeElemani("Güven", "Süreç, kapsam ve iletişim konularında açık davranırız."),
          listeElemani("Müşteri memnuniyeti", "Beklentiyi doğru anlamaya ve ihtiyaç halinde hızlı destek vermeye önem veririz."),
        ],
      }),
    ]),
    sayfa("Hizmetler", "hizmetler", 2, [
      bolum("hero", 0, {
        ustBaslik: "Hizmetler",
        baslik: `${bilgi.firmaAdi} hizmetleri`,
        aciklama: `${bilgi.sektorAdi} alanındaki ihtiyaçlarınıza uygun hizmet seçeneklerini inceleyin.`,
      }),
      bolum("hizmetler", 1, {
        varyasyon: "cizgili-liste",
        baslik: "Hizmetlerimiz",
        listeElemanlari: hizmetAdlari.map((ad) =>
          listeElemani(ad, `${ad} için ihtiyaca uygun planlama, açık iletişim ve özenli uygulama sunulur.`),
        ),
      }),
    ]),
    sayfa("Galeri", "galeri", 3, [
      bolum("hero", 0, {
        ustBaslik: "Galeri",
        baslik: "Çalışmalarımızdan görüntüler",
        aciklama: `${bilgi.firmaAdi} hizmetlerini ve çalışma alanlarını yakından inceleyin.`,
      }),
      bolum("galeri", 1, {
        varyasyon: "tam-genislik",
        listeElemanlari: [...hizmetAdlari, ...hizmetAdlari.slice(0, 2)].map((ad) =>
          listeElemani(ad, `${ad} için örnek çalışma görünümü.`),
        ),
      }),
    ]),
    sayfa("İletişim", "iletisim", 4, [
      bolum("iletisim", 0, {
        ustBaslik: "İletişim",
        baslik: `${bilgi.firmaAdi} ile iletişime geçin`,
        aciklama: bilgi.adres || (konum ? `${konum} ve çevresinde hizmet veriyoruz.` : "Bilgi ve teklif için bize ulaşın."),
        butonlar: [
          ...(bilgi.telefon ? [buton("Telefonla arayın", `tel:${bilgi.telefon.replace(/\s/g, "")}`)] : []),
          ...(bilgi.whatsapp ? [buton("WhatsApp’tan yazın", `https://wa.me/${whatsappNumarasi(bilgi.whatsapp)}`)] : []),
          ...(bilgi.eposta ? [buton("E-posta gönderin", `mailto:${bilgi.eposta}`)] : []),
        ],
      }),
      bolum("harita", 1, {
        baslik: "Konumumuz",
        aciklama: bilgi.adres || konum,
      }),
      bolum("form", 2, {
        baslik: "Bize mesaj gönderin",
        aciklama: "Hizmet, fiyat ve uygunluk bilgisi için iletişim bilgilerinizi bırakarak bize ulaşabilirsiniz.",
      }),
    ]),
  ];
}

function restoranSayfalari(bilgi: SablonBilgileri): SiteSayfasi[] {
  const hizmetler = sektorHizmetleriniGetir(bilgi.sektor);
  const sayfalar = standartSayfalar(bilgi, hizmetler);

  sayfalar.splice(
    2,
    1,
    sayfa("Menü", "menu", 2, [
      bolum("hero", 0, {
        ustBaslik: "Menü",
        baslik: `${bilgi.firmaAdi} menüsü`,
        aciklama: "Özenle hazırlanan lezzetleri ve öne çıkan menü seçeneklerini keşfedin.",
      }),
      bolum("urunler", 1, {
        varyasyon: "cizgili-liste",
        baslik: "Menümüz",
        listeElemanlari: hizmetler.map((ad) =>
          listeElemani(ad, `${ad} seçenekleri ve güncel bilgi için işletmemizle iletişime geçebilirsiniz.`),
        ),
      }),
    ]),
  );

  sayfalar.splice(
    4,
    0,
    sayfa("Rezervasyon", "rezervasyon", 4, [
      bolum("form", 0, {
        ustBaslik: "Rezervasyon",
        baslik: "Masanızı ayırtın",
        aciklama: "Tarih, saat ve kişi sayısını paylaşarak rezervasyon talebinizi iletin.",
      }),
    ]),
  );

  return sayfalar.map((sayfaVerisi, index) => ({ ...sayfaVerisi, sira: index }));
}

function saglikSayfalari(bilgi: SablonBilgileri): SiteSayfasi[] {
  const hizmetler = sektorHizmetleriniGetir(bilgi.sektor);
  const sayfalar = standartSayfalar(bilgi, hizmetler);

  sayfalar.splice(
    3,
    0,
    sayfa("Uzmanlarımız", "uzmanlarimiz", 3, [
      bolum("hero", 0, {
        ustBaslik: "Ekibimiz",
        baslik: "Uzmanlarımızla tanışın",
        aciklama: "Alanında deneyimli ekibimiz ve yaklaşımımız hakkında bilgi alın.",
      }),
      bolum("ekip", 1, {
        listeElemanlari: [
          listeElemani("Uzman bilgisi", "Uzmanlık alanı, eğitim ve deneyim bilgileri."),
          listeElemani("Uzman bilgisi", "Uzmanlık alanı, eğitim ve deneyim bilgileri."),
        ],
      }),
    ]),
  );

  sayfalar.splice(
    5,
    0,
    sayfa("Randevu", "randevu", 5, [
      bolum("form", 0, {
        ustBaslik: "Randevu",
        baslik: "Randevu talebi oluşturun",
        aciklama: "Uygun gün ve saat için iletişim bilgilerinizi paylaşın.",
      }),
    ]),
  );

  return sayfalar.map((sayfaVerisi, index) => ({ ...sayfaVerisi, sira: index }));
}

function emlakSayfalari(bilgi: SablonBilgileri): SiteSayfasi[] {
  const sayfalar = standartSayfalar(bilgi, sektorHizmetleriniGetir("emlak"));

  sayfalar.splice(
    2,
    1,
    sayfa("İlanlar", "ilanlar", 2, [
      bolum("hero", 0, {
        ustBaslik: "İlanlar",
        baslik: "Gayrimenkul seçeneklerimiz",
        aciklama: "Satılık ve kiralık gayrimenkulleri, konum ve özellik bilgileriyle inceleyin.",
      }),
      bolum("urunler", 1, {
        listeElemanlari: [
          listeElemani("Öne çıkan ilan", "Konum, temel özellikler ve fiyat bilgisi."),
          listeElemani("Yeni ilan", "Konum, temel özellikler ve fiyat bilgisi."),
          listeElemani("Yatırım fırsatı", "Konum, temel özellikler ve fiyat bilgisi."),
        ],
      }),
    ]),
  );

  return sayfalar;
}

function otelSayfalari(bilgi: SablonBilgileri): SiteSayfasi[] {
  const hizmetler = sektorHizmetleriniGetir(bilgi.sektor);
  const sayfalar = standartSayfalar(bilgi, hizmetler);

  sayfalar.splice(
    2,
    1,
    sayfa("Odalar", "odalar", 2, [
      bolum("hero", 0, {
        ustBaslik: "Odalar",
        baslik: "Konaklama seçeneklerimiz",
        aciklama: "Konforlu oda seçeneklerini, olanakları ve konaklama detaylarını inceleyin.",
      }),
      bolum("urunler", 1, {
        listeElemanlari: [
          listeElemani("Standart oda", "Oda özellikleri ve konaklama bilgisi."),
          listeElemani("Geniş oda", "Oda özellikleri ve konaklama bilgisi."),
          listeElemani("Aile odası", "Oda özellikleri ve konaklama bilgisi."),
        ],
      }),
    ]),
  );

  sayfalar.splice(
    4,
    0,
    sayfa("Rezervasyon", "rezervasyon", 4, [
      bolum("form", 0, {
        ustBaslik: "Rezervasyon",
        baslik: "Konaklama talebi oluşturun",
        aciklama: "Giriş-çıkış tarihlerini ve kişi sayısını paylaşarak rezervasyon talebi oluşturun.",
      }),
    ]),
  );

  return sayfalar.map((sayfaVerisi, index) => ({ ...sayfaVerisi, sira: index }));
}

export function sektorSayfalariOlustur(bilgi: SablonBilgileri): SiteSayfasi[] {
  if (["restoran", "kafe", "pastane", "catering"].includes(bilgi.sektor)) {
    return restoranSayfalari(bilgi);
  }

  if (["klinik", "dis-klinigi", "veteriner", "psikolog", "diyetisyen", "estetik-merkezi"].includes(bilgi.sektor)) {
    return saglikSayfalari(bilgi);
  }

  if (["otel", "pansiyon", "turizm"].includes(bilgi.sektor)) {
    return otelSayfalari(bilgi);
  }

  if (bilgi.sektor === "emlak") {
    return emlakSayfalari(bilgi);
  }

  return standartSayfalar(bilgi, sektorHizmetleriniGetir(bilgi.sektor));
}
