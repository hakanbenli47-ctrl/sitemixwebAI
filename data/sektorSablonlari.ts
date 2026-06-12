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

function buton(
  metin: string,
  baglanti: string,
): ButonVerisi {
  return {
    id: idOlustur(),
    metin,
    baglanti,
  };
}

function listeElemani(
  baslik = "",
  aciklama = "",
): ListeElemani {
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

function anaSayfaBolumleri(
  bilgi: SablonBilgileri,
  hizmetAdlari: string[],
): SiteBolumu[] {
  return [
    bolum("hero", 0, {
      varyasyon: "buyuk-baslik",
      ustBaslik: bilgi.sektorAdi,
      baslik: bilgi.firmaAdi,
      aciklama: `${bilgi.firmaAdi} hakkında kısa ve etkileyici tanıtım metninizi buraya yazın.`,
      butonlar: [
        buton(
          bilgi.whatsapp ? "WhatsApp’tan ulaşın" : "İletişime geçin",
          bilgi.whatsapp
            ? `https://wa.me/${bilgi.whatsapp.replace(/\D/g, "")}`
            : "/iletisim",
        ),
        buton("Hizmetleri inceleyin", "/hizmetler"),
      ],
    }),

    bolum("metin", 1, {
      varyasyon: "sag-gorsel",
      ustBaslik: "Hakkımızda",
      baslik: `${bilgi.firmaAdi} ile tanışın`,
      aciklama:
        "İşletmenizin hikâyesini, çalışma anlayışını ve müşterilerinize sunduğunuz değeri buraya yazın.",
    }),

    bolum("hizmetler", 2, {
      varyasyon: "cizgili-liste",
      ustBaslik: "Hizmetler",
      baslik: "Sunduğumuz hizmetler",
      aciklama:
        "Hizmet başlıklarını ve açıklamalarını dilediğiniz gibi düzenleyebilirsiniz.",
      listeElemanlari: hizmetAdlari.map((ad) =>
        listeElemani(
          ad,
          `${ad} hakkında kısa açıklamanızı buraya yazın.`,
        ),
      ),
    }),

    bolum("neden-biz", 3, {
      varyasyon: "cizgili-liste",
      ustBaslik: "Neden biz",
      baslik: "Bizi tercih etmeniz için nedenler",
      listeElemanlari: [
        listeElemani(
          "Güvenilir hizmet",
          "Müşterilerinize güven veren yönünüzü açıklayın.",
        ),
        listeElemani(
          "Profesyonel yaklaşım",
          "Çalışma kalitenizi ve sürecinizi açıklayın.",
        ),
        listeElemani(
          "Kolay iletişim",
          "Müşterilerin size nasıl hızlı ulaşabileceğini açıklayın.",
        ),
      ],
    }),

    bolum("galeri", 4, {
      varyasyon: "tam-genislik",
      ustBaslik: "Galeri",
      baslik: "Çalışmalarımız",
      aciklama:
        "İşletmenize, ürünlerinize veya çalışmalarınıza ait görselleri yükleyin.",
      listeElemanlari: [
        listeElemani(),
        listeElemani(),
        listeElemani(),
        listeElemani(),
      ],
    }),

    bolum("iletisim", 5, {
      ustBaslik: "İletişim",
      baslik: `${bilgi.firmaAdi} ile iletişime geçin`,
      aciklama: bilgi.adres,
      butonlar: [
        ...(bilgi.telefon
          ? [
              buton(
                "Telefonla arayın",
                `tel:${bilgi.telefon.replace(/\s/g, "")}`,
              ),
            ]
          : []),

        ...(bilgi.whatsapp
          ? [
              buton(
                "WhatsApp’tan yazın",
                `https://wa.me/${bilgi.whatsapp.replace(/\D/g, "")}`,
              ),
            ]
          : []),
      ],
    }),
  ];
}

function standartSayfalar(
  bilgi: SablonBilgileri,
  hizmetAdlari: string[],
): SiteSayfasi[] {
  return [
    sayfa(
      "Ana Sayfa",
      "",
      0,
      anaSayfaBolumleri(bilgi, hizmetAdlari),
      true,
    ),

    sayfa("Hakkımızda", "hakkimizda", 1, [
      bolum("hero", 0, {
        ustBaslik: "Hakkımızda",
        baslik: bilgi.firmaAdi,
        aciklama:
          "İşletmenizin kuruluş hikâyesini ve çalışma anlayışını buraya yazın.",
      }),

      bolum("metin", 1, {
        varyasyon: "sag-gorsel",
        baslik: "Biz kimiz?",
        aciklama:
          "Firma geçmişiniz, deneyiminiz ve müşterilerinize sunduğunuz değer burada yer alacak.",
      }),

      bolum("neden-biz", 2, {
        baslik: "Çalışma anlayışımız",
        listeElemanlari: [
          listeElemani("Kalite", "Kalite anlayışınızı yazın."),
          listeElemani("Güven", "Güven yaklaşımınızı yazın."),
          listeElemani(
            "Müşteri memnuniyeti",
            "Müşteri memnuniyetine verdiğiniz önemi yazın.",
          ),
        ],
      }),
    ]),

    sayfa("Hizmetler", "hizmetler", 2, [
      bolum("hero", 0, {
        ustBaslik: "Hizmetler",
        baslik: "Size nasıl yardımcı olabiliriz?",
        aciklama:
          "Tüm hizmetlerinizi bu sayfadan düzenleyebilirsiniz.",
      }),

      bolum("hizmetler", 1, {
        varyasyon: "cizgili-liste",
        baslik: "Hizmetlerimiz",
        listeElemanlari: hizmetAdlari.map((ad) =>
          listeElemani(
            ad,
            `${ad} hizmetiniz hakkında detaylı açıklama yazın.`,
          ),
        ),
      }),
    ]),

    sayfa("Galeri", "galeri", 3, [
      bolum("hero", 0, {
        ustBaslik: "Galeri",
        baslik: "Çalışmalarımızdan görüntüler",
      }),

      bolum("galeri", 1, {
        varyasyon: "tam-genislik",
        listeElemanlari: [
          listeElemani(),
          listeElemani(),
          listeElemani(),
          listeElemani(),
          listeElemani(),
          listeElemani(),
        ],
      }),
    ]),

    sayfa("İletişim", "iletisim", 4, [
      bolum("iletisim", 0, {
        ustBaslik: "İletişim",
        baslik: `${bilgi.firmaAdi} ile iletişime geçin`,
        aciklama: bilgi.adres,
        butonlar: [
          ...(bilgi.telefon
            ? [
                buton(
                  "Telefonla arayın",
                  `tel:${bilgi.telefon.replace(/\s/g, "")}`,
                ),
              ]
            : []),

          ...(bilgi.whatsapp
            ? [
                buton(
                  "WhatsApp’tan yazın",
                  `https://wa.me/${bilgi.whatsapp.replace(/\D/g, "")}`,
                ),
              ]
            : []),

          ...(bilgi.eposta
            ? [buton("E-posta gönderin", `mailto:${bilgi.eposta}`)]
            : []),
        ],
      }),

      bolum("harita", 1, {
        baslik: "Konumumuz",
        aciklama: bilgi.adres,
      }),

      bolum("form", 2, {
        baslik: "Bize mesaj gönderin",
        aciklama:
          "İletişim formundan alınacak bilgiler daha sonra düzenlenecek.",
      }),
    ]),
  ];
}

function restoranSayfalari(
  bilgi: SablonBilgileri,
): SiteSayfasi[] {
  const hizmetler = [
    "Öne çıkan lezzet",
    "Ana yemek",
    "Tatlı",
    "İçecek",
  ];

  const sayfalar = standartSayfalar(bilgi, hizmetler);

  sayfalar.splice(
    2,
    1,
    sayfa("Menü", "menu", 2, [
      bolum("hero", 0, {
        ustBaslik: "Menü",
        baslik: `${bilgi.firmaAdi} menüsü`,
        aciklama:
          "Menü kategorilerinizi ve ürünlerinizi aşağıdan düzenleyin.",
      }),

      bolum("urunler", 1, {
        varyasyon: "cizgili-liste",
        baslik: "Menümüz",
        listeElemanlari: hizmetler.map((ad) =>
          listeElemani(ad, "Ürün açıklaması ve fiyatı."),
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
        aciklama:
          "Rezervasyon bilgileri ve iletişim seçenekleri burada yer alacak.",
      }),
    ]),
  );

  return sayfalar.map((sayfaVerisi, index) => ({
    ...sayfaVerisi,
    sira: index,
  }));
}

function saglikSayfalari(
  bilgi: SablonBilgileri,
): SiteSayfasi[] {
  const hizmetler = [
    "Muayene",
    "Tedavi",
    "Kontrol",
    "Danışmanlık",
  ];

  const sayfalar = standartSayfalar(bilgi, hizmetler);

  sayfalar.splice(
    3,
    0,
    sayfa("Uzmanlarımız", "uzmanlarimiz", 3, [
      bolum("hero", 0, {
        ustBaslik: "Ekibimiz",
        baslik: "Uzmanlarımızla tanışın",
      }),

      bolum("ekip", 1, {
        listeElemanlari: [
          listeElemani(
            "Uzman adı",
            "Uzmanlık alanı ve kısa tanıtım.",
          ),
          listeElemani(
            "Uzman adı",
            "Uzmanlık alanı ve kısa tanıtım.",
          ),
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
      }),
    ]),
  );

  return sayfalar.map((sayfaVerisi, index) => ({
    ...sayfaVerisi,
    sira: index,
  }));
}

function emlakSayfalari(
  bilgi: SablonBilgileri,
): SiteSayfasi[] {
  const sayfalar = standartSayfalar(bilgi, [
    "Satılık gayrimenkuller",
    "Kiralık gayrimenkuller",
    "Değerleme",
    "Danışmanlık",
  ]);

  sayfalar.splice(
    2,
    1,
    sayfa("İlanlar", "ilanlar", 2, [
      bolum("hero", 0, {
        ustBaslik: "İlanlar",
        baslik: "Gayrimenkul ilanlarımız",
      }),

      bolum("urunler", 1, {
        listeElemanlari: [
          listeElemani(
            "İlan başlığı",
            "Konum, özellikler ve fiyat bilgisi.",
          ),
          listeElemani(
            "İlan başlığı",
            "Konum, özellikler ve fiyat bilgisi.",
          ),
          listeElemani(
            "İlan başlığı",
            "Konum, özellikler ve fiyat bilgisi.",
          ),
        ],
      }),
    ]),
  );

  return sayfalar;
}

function otelSayfalari(
  bilgi: SablonBilgileri,
): SiteSayfasi[] {
  const sayfalar = standartSayfalar(bilgi, [
    "Oda seçeneği",
    "Konaklama",
    "Kahvaltı",
    "Olanaklar",
  ]);

  sayfalar.splice(
    2,
    1,
    sayfa("Odalar", "odalar", 2, [
      bolum("hero", 0, {
        ustBaslik: "Odalar",
        baslik: "Konaklama seçeneklerimiz",
      }),

      bolum("urunler", 1, {
        listeElemanlari: [
          listeElemani(
            "Oda adı",
            "Oda özellikleri ve konaklama bilgisi.",
          ),
          listeElemani(
            "Oda adı",
            "Oda özellikleri ve konaklama bilgisi.",
          ),
          listeElemani(
            "Oda adı",
            "Oda özellikleri ve konaklama bilgisi.",
          ),
        ],
      }),
    ]),
  );

  sayfalar.splice(
    4,
    0,
    sayfa("Rezervasyon", "rezervasyon", 4, [
      bolum("form", 0, {
        üstBaslik: "Rezervasyon",
        baslik: "Konaklama talebi oluşturun",
      } as Partial<SiteBolumu>),
    ]),
  );

  return sayfalar.map((sayfaVerisi, index) => ({
    ...sayfaVerisi,
    sira: index,
  }));
}

function sektorHizmetleri(sektor: string): string[] {
  const hizmetler: Record<string, string[]> = {
    kuafor: [
      "Saç kesimi",
      "Saç boyama",
      "Saç bakımı",
      "Özel gün hazırlığı",
    ],
    berber: [
      "Saç kesimi",
      "Sakal tıraşı",
      "Cilt bakımı",
      "Damat tıraşı",
    ],
    "guzellik-salonu": [
      "Cilt bakımı",
      "Kalıcı makyaj",
      "Lazer uygulaması",
      "Bölgesel bakım",
    ],
    temizlik: [
      "Ev temizliği",
      "Ofis temizliği",
      "İnşaat sonrası temizlik",
      "Koltuk temizliği",
    ],
    nakliyat: [
      "Evden eve nakliyat",
      "Ofis taşıma",
      "Paketleme",
      "Şehirler arası taşıma",
    ],
    "teknik-servis": [
      "Arıza tespiti",
      "Bakım",
      "Onarım",
      "Kurulum",
    ],
    "oto-yikama": [
      "İç dış yıkama",
      "Detaylı temizlik",
      "Seramik kaplama",
      "Koltuk temizliği",
    ],
    "oto-servis": [
      "Periyodik bakım",
      "Arıza tespiti",
      "Mekanik onarım",
      "Elektrik sistemi",
    ],
    mermer: [
      "Mutfak tezgâhı",
      "Mermer uygulama",
      "Granit uygulama",
      "Kuvars yüzey",
    ],
    mobilya: [
      "Özel üretim mobilya",
      "Mutfak dolabı",
      "Yatak odası",
      "Dekorasyon",
    ],
    insaat: [
      "Anahtar teslim proje",
      "Tadilat",
      "İç dekorasyon",
      "Dış cephe",
    ],
    mimarlik: [
      "Mimari proje",
      "İç mimari",
      "Proje danışmanlığı",
      "Uygulama takibi",
    ],
    avukat: [
      "Hukuki danışmanlık",
      "Dava takibi",
      "Sözleşme",
      "Arabuluculuk",
    ],
    muhasebe: [
      "Muhasebe hizmeti",
      "Vergi danışmanlığı",
      "Bordro",
      "Şirket kuruluşu",
    ],
    kurs: [
      "Birebir eğitim",
      "Grup eğitimi",
      "Sınav hazırlığı",
      "Online eğitim",
    ],
    "spor-salonu": [
      "Fitness",
      "Kişisel antrenman",
      "Grup dersleri",
      "Beslenme desteği",
    ],
    pilates: [
      "Reformer pilates",
      "Mat pilates",
      "Birebir ders",
      "Grup dersi",
    ],
    fotografci: [
      "Düğün çekimi",
      "Ürün çekimi",
      "Portre",
      "Etkinlik çekimi",
    ],
    ajans: [
      "Web tasarım",
      "Sosyal medya",
      "Reklam yönetimi",
      "Marka tasarımı",
    ],
    yazilim: [
      "Web yazılım",
      "Mobil uygulama",
      "Özel yazılım",
      "Teknik destek",
    ],
  };

  return (
    hizmetler[sektor] ?? [
      "Hizmet 1",
      "Hizmet 2",
      "Hizmet 3",
      "Hizmet 4",
    ]
  );
}

export function sektorSayfalariOlustur(
  bilgi: SablonBilgileri,
): SiteSayfasi[] {
  const restoranSektorleri = [
    "restoran",
    "kafe",
    "pastane",
    "catering",
  ];

  const saglikSektorleri = [
    "klinik",
    "dis-klinigi",
    "veteriner",
    "psikolog",
    "diyetisyen",
    "estetik-merkezi",
  ];

  const otelSektorleri = [
    "otel",
    "pansiyon",
    "turizm",
  ];

  if (restoranSektorleri.includes(bilgi.sektor)) {
    return restoranSayfalari(bilgi);
  }

  if (saglikSektorleri.includes(bilgi.sektor)) {
    return saglikSayfalari(bilgi);
  }

  if (otelSektorleri.includes(bilgi.sektor)) {
    return otelSayfalari(bilgi);
  }

  if (bilgi.sektor === "emlak") {
    return emlakSayfalari(bilgi);
  }

  return standartSayfalar(
    bilgi,
    sektorHizmetleri(bilgi.sektor),
  );
}