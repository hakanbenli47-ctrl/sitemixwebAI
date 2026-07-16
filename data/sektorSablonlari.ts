import { sektorIcerikProfiliniGetir } from "@/data/sektorIcerikProfilleri";
import {
  sektorSunumProfiliniGetir,
  type SayfaRolu,
} from "@/data/sektorSunumProfilleri";

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
  "arac-kaplama": ["Tam araç renk değişim kaplama", "Şeffaf boya koruma filmi (PPF)", "Cam filmi uygulaması", "Bölgesel araç kaplama", "Krom karartma", "Ticari araç reklam kaplama"],
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
  otel: ["Standart oda", "Geniş oda", "Aile odası", "Otel olanakları"],
  pansiyon: ["Standart oda", "Geniş oda", "Aile odası", "Yerel deneyimler"],
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
  const icerik = sektorIcerikProfiliniGetir(bilgi.sektor);
  const sunum = sektorSunumProfiliniGetir(bilgi.sektor);
  const aksiyonHedefi = sunum.aksiyonSayfasi
    ? `/${sunum.aksiyonSayfasi.slug}`
    : "/iletisim";

  const bolumler: Record<string, SiteBolumu> = {
    hero: bolum("hero", 0, {
      varyasyon: sunum.heroVaryasyonu,
      ustBaslik: konum ? `${bilgi.sektorAdi} · ${konum}` : bilgi.sektorAdi,
      baslik: icerik.heroBaslik,
      aciklama: icerik.odakMetni,
      butonlar: [
        buton(icerik.ctaMetni, aksiyonHedefi),
        buton(sunum.hizmetSayfasiAdi, `/${sunum.hizmetSayfasiSlug}`),
      ],
    }),
    guven: bolum("istatistik", 0, {
      varyasyon: "kartli",
      ustBaslik: "Karar desteği",
      baslik: sunum.guvenBasligi,
      aciklama: "İyi bir hizmet deneyimi, beklentinin ve kapsamın işe başlamadan önce anlaşılmasıyla başlar.",
      listeElemanlari: [
        listeElemani("Doğru ön değerlendirme", icerik.kararOlcutleri),
        listeElemani("Açık çalışma kapsamı", icerik.kisaYaklasim),
        listeElemani("Kontrollü tamamlama", icerik.sonKontrol),
      ],
    }),
    hizmetler: bolum("hizmetler", 0, {
      varyasyon: sunum.listeVaryasyonu,
      ustBaslik: sunum.hizmetUstBasligi,
      baslik: sunum.hizmetSayfasiAdi,
      aciklama: icerik.kararOlcutleri,
      listeElemanlari: hizmetAdlari.map((ad) =>
        listeElemani(ad, `${ad} için kapsam, mevcut durum ve beklenti birlikte değerlendirilir.`),
      ),
      butonlar: [buton(`Tüm ${kucukHarf(sunum.hizmetSayfasiAdi)}`, `/${sunum.hizmetSayfasiSlug}`)],
    }),
    surec: bolum("neden-biz", 0, {
      varyasyon: "adimlar",
      ustBaslik: "Çalışma süreci",
      baslik: sunum.surecBasligi,
      aciklama: "Her adımın amacı, kapsamı ve sonraki aşaması açık biçimde ilerletilir.",
      listeElemanlari: [
        listeElemani("İhtiyacı anlayalım", icerik.iletisimIstegi),
        listeElemani("Kapsamı netleştirelim", icerik.kararOlcutleri),
        listeElemani("Planlı biçimde ilerleyelim", icerik.detayliYaklasim),
        listeElemani("Birlikte kontrol edelim", icerik.sonKontrol),
      ],
    }),
    hikaye: bolum("metin", 0, {
      varyasyon: sunum.metinVaryasyonu,
      ustBaslik: "Yaklaşımımız",
      baslik: icerik.yaklasimBaslik,
      aciklama: icerik.detayliYaklasim,
      butonlar: [buton("Bizi daha yakından tanıyın", "/hakkimizda")],
    }),
    galeri: bolum("galeri", 0, {
      varyasyon: sunum.galeriVaryasyonu,
      ustBaslik: sunum.galeriSayfasiAdi,
      baslik: "İşi yalnızca sonuçla değil, ayrıntılarıyla inceleyin",
      aciklama: "Görseller, hizmetin kapsamını ve uygulama yaklaşımını daha doğru değerlendirmenize yardımcı olur.",
      listeElemanlari: hizmetAdlari.slice(0, 4).map((ad) =>
        listeElemani(ad, `${ad} kapsamında öne çıkan uygulama ayrıntısı.`),
      ),
      butonlar: [buton(sunum.galeriSayfasiAdi, `/${sunum.galeriSayfasiSlug}`)],
    }),
    sss: bolum("sss", 0, {
      varyasyon: "akordeon",
      ustBaslik: "Sık sorulan sorular",
      baslik: sunum.sssBasligi,
      aciklama: "İlk görüşme öncesinde en çok merak edilen başlıkları açık ve kısa yanıtlarla inceleyin.",
      listeElemanlari: [
        listeElemani("Başlamak için hangi bilgileri paylaşmalıyım?", icerik.iletisimIstegi),
        listeElemani("Hizmet kapsamı nasıl belirleniyor?", icerik.kararOlcutleri),
        listeElemani("Süreç nasıl ilerliyor?", icerik.kisaYaklasim),
        listeElemani("Tamamlanırken nelere dikkat ediliyor?", icerik.sonKontrol),
      ],
    }),
    iletisim: bolum("iletisim", 0, {
      varyasyon: "iletisim-paneli",
      ustBaslik: "Bilgi ve planlama",
      baslik: icerik.ctaMetni,
      aciklama: `${icerik.iletisimIstegi} Telefon veya WhatsApp üzerinden kısa bilgi paylaşmanız yeterlidir.`,
      butonlar: [
        ...(bilgi.telefon
          ? [buton(`Telefon: ${bilgi.telefon}`, `tel:${bilgi.telefon.replace(/\s/g, "")}`)]
          : []),
        ...(bilgi.whatsapp
          ? [buton("WhatsApp’tan yazın", `https://wa.me/${whatsappNumarasi(bilgi.whatsapp)}`)]
          : []),
      ],
    }),
  };

  const anaSayfaSirasi = [...sunum.anaSayfaSirasi];

  if (sunum.galeriKullan && !anaSayfaSirasi.includes("galeri")) {
    const sssSirasi = anaSayfaSirasi.indexOf("sss");
    anaSayfaSirasi.splice(sssSirasi === -1 ? anaSayfaSirasi.length : sssSirasi, 0, "galeri");
  }

  return anaSayfaSirasi
    .filter((anahtar) => anahtar !== "galeri" || sunum.galeriKullan)
    .map((anahtar, index) => ({
      ...bolumler[anahtar],
      sira: index,
      animasyon: sunum.animasyonAkisi[index % sunum.animasyonAkisi.length],
    }));
}

function standartSayfalar(
  bilgi: SablonBilgileri,
  hizmetAdlari: string[],
): SiteSayfasi[] {
  const konum = hizmetBolgesiMetni(bilgi);
  const icerik = sektorIcerikProfiliniGetir(bilgi.sektor);
  const sunum = sektorSunumProfiliniGetir(bilgi.sektor);
  const icHeroVaryasyonu = sunum.heroVaryasyonu === "kapak" ? "odakli" : sunum.heroVaryasyonu;

  const surecBolumu = () =>
    bolum("neden-biz", 2, {
      varyasyon: "adimlar",
      ustBaslik: "Nasıl ilerliyoruz?",
      baslik: sunum.surecBasligi,
      aciklama: "İşin kapsamı ve sonraki adımlar baştan itibaren anlaşılır tutulur.",
      listeElemanlari: [
        listeElemani("Ön değerlendirme", icerik.iletisimIstegi),
        listeElemani("Kapsam ve plan", icerik.kararOlcutleri),
        listeElemani("Uygulama veya hizmet", icerik.kisaYaklasim),
        listeElemani("Kontrol ve takip", icerik.sonKontrol),
      ],
      animasyon: "soldan",
    });

  const sssBolumu = (sira: number) =>
    bolum("sss", sira, {
      varyasyon: "akordeon",
      ustBaslik: "Sık sorulan sorular",
      baslik: sunum.sssBasligi,
      listeElemanlari: [
        listeElemani("Hangi bilgiler gerekli?", icerik.iletisimIstegi),
        listeElemani("Kapsam nasıl belirlenir?", icerik.kararOlcutleri),
        listeElemani("Süreç nasıl yürütülür?", icerik.detayliYaklasim),
        listeElemani("Son kontrol nasıl yapılır?", icerik.sonKontrol),
      ],
      animasyon: "asagidan",
    });

  const sayfalar: Partial<Record<SayfaRolu, SiteSayfasi>> = {
    ana: sayfa("Ana Sayfa", "", 0, anaSayfaBolumleri(bilgi, hizmetAdlari), true),
    hakkimizda: sayfa("Hakkımızda", "hakkimizda", 0, [
      bolum("hero", 0, {
        varyasyon: icHeroVaryasyonu,
        ustBaslik: "Hakkımızda",
        baslik: icerik.yaklasimBaslik,
        aciklama: icerik.kisaYaklasim,
        animasyon: "soluklasarak",
      }),
      bolum("metin", 1, {
        varyasyon: sunum.metinVaryasyonu,
        ustBaslik: `${bilgi.firmaAdi} yaklaşımı`,
        baslik: "İyi hizmet, doğru beklenti ve düzenli iletişimle başlar",
        aciklama: icerik.detayliYaklasim,
        animasyon: "asagidan",
      }),
      bolum("istatistik", 2, {
        varyasyon: "kartli",
        ustBaslik: "Çalışma ilkeleri",
        baslik: sunum.guvenBasligi,
        listeElemanlari: [
          listeElemani("Açık kapsam", icerik.kararOlcutleri),
          listeElemani("Ulaşılabilir iletişim", icerik.iletisimIstegi),
          listeElemani("Kontrollü tamamlama", icerik.sonKontrol),
        ],
        animasyon: "sagdan",
      }),
    ]),
    hizmet: sayfa(sunum.hizmetSayfasiAdi, sunum.hizmetSayfasiSlug, 0, [
      bolum("hero", 0, {
        varyasyon: icHeroVaryasyonu,
        ustBaslik: sunum.hizmetUstBasligi,
        baslik: sunum.hizmetSayfasiAdi,
        aciklama: icerik.kararOlcutleri,
        animasyon: "soluklasarak",
      }),
      bolum(sunum.hizmetBolumTuru, 1, {
        varyasyon: sunum.listeVaryasyonu,
        ustBaslik: "Ayrıntılı kapsam",
        baslik: "İhtiyacınıza uygun seçeneği karşılaştırın",
        aciklama: "Her seçeneğin kapsamı mevcut durum ve beklentiye göre netleştirilir.",
        listeElemanlari: hizmetAdlari.map((ad) =>
          listeElemani(ad, `${ad} için kapsam, hazırlık ve sonraki adımlar açık biçimde planlanır.`),
        ),
        butonlar: [buton(icerik.ctaMetni, sunum.aksiyonSayfasi ? `/${sunum.aksiyonSayfasi.slug}` : "/iletisim")],
        animasyon: "asagidan",
      }),
      surecBolumu(),
      sssBolumu(3),
    ]),
    galeri: sunum.galeriKullan
      ? sayfa(sunum.galeriSayfasiAdi, sunum.galeriSayfasiSlug, 0, [
          bolum("hero", 0, {
            varyasyon: icHeroVaryasyonu,
            ustBaslik: sunum.galeriSayfasiAdi,
            baslik: "Çalışmaları ve ayrıntıları yakından inceleyin",
            aciklama: "Görselleri, hizmetin uygulama biçimini ve öne çıkan ayrıntılarını anlamak için inceleyebilirsiniz.",
            animasyon: "soluklasarak",
          }),
          bolum("galeri", 1, {
            varyasyon: sunum.galeriVaryasyonu,
            ustBaslik: "Seçili örnekler",
            baslik: sunum.galeriSayfasiAdi,
            listeElemanlari: [...hizmetAdlari, ...hizmetAdlari.slice(0, 2)].map((ad) =>
              listeElemani(ad, `${ad} kapsamında öne çıkan çalışma ayrıntısı.`),
            ),
            animasyon: "maskeli",
          }),
        ])
      : undefined,
    aksiyon: sunum.aksiyonSayfasi
      ? sayfa(sunum.aksiyonSayfasi.ad, sunum.aksiyonSayfasi.slug, 0, [
          bolum("hero", 0, {
            varyasyon: "odakli",
            ustBaslik: sunum.aksiyonSayfasi.ustBaslik,
            baslik: sunum.aksiyonSayfasi.baslik,
            aciklama: icerik.iletisimIstegi,
            animasyon: "soluklasarak",
          }),
          bolum("form", 1, {
            varyasyon: "talep-formu",
            ustBaslik: "Kısa talep formu",
            baslik: icerik.ctaMetni,
            aciklama: icerik.iletisimIstegi,
            animasyon: "asagidan",
          }),
        ])
      : undefined,
    iletisim: sayfa("İletişim", "iletisim", 0, [
      bolum("iletisim", 0, {
        varyasyon: "iletisim-paneli",
        ustBaslik: "İletişim",
        baslik: `${bilgi.firmaAdi} ile iletişime geçin`,
        aciklama: `${icerik.iletisimIstegi}${konum ? ` ${konum} için güncel uygunluğu doğrudan sorabilirsiniz.` : ""}`,
        butonlar: [
          ...(bilgi.telefon ? [buton(`Telefon: ${bilgi.telefon}`, `tel:${bilgi.telefon.replace(/\s/g, "")}`)] : []),
          ...(bilgi.whatsapp ? [buton("WhatsApp’tan yazın", `https://wa.me/${whatsappNumarasi(bilgi.whatsapp)}`)] : []),
          ...(bilgi.eposta ? [buton("E-posta gönderin", `mailto:${bilgi.eposta}`)] : []),
        ],
        animasyon: "soluklasarak",
      }),
      bolum("harita", 1, {
        varyasyon: "harita-paneli",
        ustBaslik: "Konum ve hizmet bölgesi",
        baslik: bilgi.adres ? "Bizi haritada bulun" : "Hizmet verdiğimiz bölge",
        aciklama: bilgi.adres || konum,
        animasyon: "asagidan",
      }),
    ]),
  };

  const sayfaSirasi = [...sunum.sayfaSirasi];

  if (sunum.galeriKullan && !sayfaSirasi.includes("galeri")) {
    const hakkimizdaSirasi = sayfaSirasi.indexOf("hakkimizda");
    sayfaSirasi.splice(
      hakkimizdaSirasi === -1 ? sayfaSirasi.length : hakkimizdaSirasi,
      0,
      "galeri",
    );
  }

  return sayfaSirasi
    .map((rol) => sayfalar[rol])
    .filter((sayfaVerisi): sayfaVerisi is SiteSayfasi => Boolean(sayfaVerisi))
    .map((sayfaVerisi, index) => ({ ...sayfaVerisi, sira: index }));
}

function restoranSayfalari(bilgi: SablonBilgileri): SiteSayfasi[] {
  return standartSayfalar(bilgi, sektorHizmetleriniGetir(bilgi.sektor));
}

function saglikSayfalari(bilgi: SablonBilgileri): SiteSayfasi[] {
  return standartSayfalar(bilgi, sektorHizmetleriniGetir(bilgi.sektor));
}

function emlakSayfalari(bilgi: SablonBilgileri): SiteSayfasi[] {
  return standartSayfalar(bilgi, sektorHizmetleriniGetir("emlak"));
}

function otelSayfalari(bilgi: SablonBilgileri): SiteSayfasi[] {
  return standartSayfalar(bilgi, sektorHizmetleriniGetir(bilgi.sektor));
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
