import {
  hizmetDetayiniGetir,
  sektorIcerikProfiliniGetir,
} from "@/data/sektorIcerikProfilleri";
import { sektorDonusumProfiliniGetir } from "@/data/sektorDonusumProfilleri";
import { sektorOperasyonProfiliniGetir } from "@/data/sektorGorselDili";
import {
  sektorSunumProfiliniGetir,
  type SayfaRolu,
} from "@/data/sektorSunumProfilleri";
import { sektorAnaSayfaAkisiniGetir } from "@/data/sektorTasarimlari";
import {
  telefonBaglantisi,
  whatsappBaglantisi,
} from "@/lib/iletisim";

export const GUNCEL_SABLON_SURUMU = 9;

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
  gorselAlaniAcikMi?: boolean;
  animasyon: AnimasyonTuru;
  butonlar: ButonVerisi[];
  listeElemanlari: ListeElemani[];
}

export interface SiteSayfasi {
  id: string;
  rol: SayfaRolu;
  ad: string;
  slug: string;
  menuBasligi: string;
  menuGoster: boolean;
  anaSayfa: boolean;
  sira: number;
  ozelBolumSirasi?: boolean;
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
  hizmetler?: string[];
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
    gorselAlaniAcikMi: false,
    animasyon: "asagidan",
    butonlar: [],
    listeElemanlari: [],
    ...veriler,
  };
}

function sayfa(
  rol: SayfaRolu,
  ad: string,
  slug: string,
  sira: number,
  bolumler: SiteBolumu[],
  anaSayfa = false,
): SiteSayfasi {
  return {
    id: idOlustur(),
    rol,
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

const hizmetHaritasi: Record<string, string[]> = {
  kuafor: ["Saç kesimi", "Saç boyama", "Saç bakımı", "Özel gün hazırlığı"],
  berber: ["Saç kesimi", "Sakal tıraşı", "Cilt bakımı", "Damat tıraşı"],
  "guzellik-salonu": ["Cilt bakımı", "Kalıcı makyaj", "Lazer uygulamaları", "Bölgesel bakım"],
  "estetik-merkezi": ["Cilt uygulamaları", "Medikal estetik", "Bölgesel uygulamalar", "Kişiye özel bakım planı"],
  temizlik: ["Ev temizliği", "Ofis temizliği", "İnşaat sonrası temizlik", "Koltuk ve yatak temizliği"],
  nakliyat: ["Evden eve nakliyat", "Ofis taşıma", "Paketleme", "Şehirler arası taşıma"],
  "teknik-servis": ["Arıza tespiti", "Bakım", "Onarım", "Kurulum"],
  "oto-yikama": ["İç dış yıkama", "Detaylı temizlik", "Seramik kaplama", "Koltuk temizliği"],
  "oto-detaylandirma": ["Detaylı iç temizlik", "Pasta cila ve boya düzeltme", "Seramik kaplama", "Motor ve detay temizliği"],
  "oto-servis": ["Periyodik bakım", "Arıza tespiti", "Mekanik onarım", "Elektrik ve elektronik"],
  "arac-kaplama": ["Tam araç renk değişim kaplama", "Şeffaf boya koruma filmi (PPF)", "Cam filmi uygulaması", "Bölgesel araç kaplama", "Krom karartma", "Ticari araç reklam kaplama"],
  "arac-kiralama": ["Günlük araç kiralama", "Uzun dönem kiralama", "Havalimanı teslimi", "Kurumsal filo çözümleri"],
  "cam-balkon": ["Katlanır cam balkon", "Sürme cam sistemi", "Isıcamlı cam balkon", "Cam balkon bakım ve onarım"],
  tente: ["Mafsallı tente", "Pergola tente", "Körüklü tente", "Tente bakım ve kumaş değişimi"],
  tadilat: ["Daire tadilatı", "Banyo ve mutfak yenileme", "Ofis ve işyeri tadilatı", "Boya ve yüzey uygulamaları"],
  restoran: ["Öne çıkan lezzetler", "Ana yemekler", "Tatlılar", "İçecekler"],
  kafe: ["Kahve çeşitleri", "Kahvaltı", "Tatlılar", "Soğuk içecekler"],
  pastane: ["Yaş pasta", "Kuru pasta", "Özel gün pastaları", "Tatlı çeşitleri"],
  "koltuk-yikama": ["Koltuk takımı yıkama", "Köşe koltuk yıkama", "Sandalye yıkama", "Yatak temizliği"],
  "hali-yikama": ["Makine halısı yıkama", "Yün ve hassas halı yıkama", "Yerinde halı yıkama", "Leke ve koku işlemi"],
  ilaclama: ["Haşere ilaçlama", "Tahtakurusu mücadelesi", "Kemirgen kontrolü", "İşyeri periyodik ilaçlama"],
  catering: ["Kurumsal yemek", "Davet menüsü", "Toplu yemek", "Özel organizasyon menüsü"],
  klinik: ["Muayene", "Tedavi planlaması", "Kontrol", "Danışmanlık"],
  "dis-klinigi": ["Diş muayenesi", "İmplant", "Estetik diş hekimliği", "Ortodonti"],
  veteriner: ["Muayene", "Aşılama", "Cerrahi işlemler", "Pet bakım danışmanlığı"],
  psikolog: ["Bireysel terapi", "Çift terapisi", "Çocuk ve ergen danışmanlığı", "Online görüşme"],
  diyetisyen: ["Kişiye özel beslenme", "Kilo yönetimi", "Sporcu beslenmesi", "Online danışmanlık"],
  fizyoterapist: ["Ortopedik rehabilitasyon", "Manuel terapi", "Sporcu rehabilitasyonu", "Klinik pilates"],
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
  anaokulu: ["Tam gün program", "Yarım gün program", "Oyun grubu", "Atölye ve etkinlikler"],
  "ozel-egitim-kursu": ["Birebir eğitim", "Grup eğitimi", "Sınav hazırlığı", "Online eğitim"],
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
  matbaa: ["Kartvizit ve kurumsal baskı", "Broşür ve katalog", "Etiket ve ambalaj baskısı", "Dijital baskı ve tabela"],
  cicekci: ["Buket ve aranjman", "Özel gün çiçekleri", "Açılış ve kurumsal çiçek", "Düğün ve etkinlik çiçekleri"],
  elektrikci: ["Elektrik arıza tespiti", "Tesisat yenileme", "Aydınlatma ve priz montajı", "Pano ve sigorta işlemleri"],
  tesisatci: ["Su kaçağı tespiti", "Tıkanıklık açma", "Armatür ve vitrifiye montajı", "Tesisat yenileme"],
  "kombi-servisi": ["Kombi arıza tespiti", "Kombi bakımı", "Petek temizliği", "Termostat ve kontrol montajı"],
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
  const donusum = sektorDonusumProfiliniGetir(bilgi.sektor);
  const sunum = sektorSunumProfiliniGetir(bilgi.sektor);
  const profesyonelSema = sektorOperasyonProfiliniGetir(
    bilgi.sektor,
  )?.icerikSemasi;
  const aksiyonHedefi = sunum.aksiyonSayfasi
    ? `/${sunum.aksiyonSayfasi.slug}`
    : "/iletisim";

  const bolumler: Record<string, SiteBolumu> = {
    hero: bolum("hero", 0, {
      varyasyon: sunum.heroVaryasyonu,
      ustBaslik: profesyonelSema
        ? konum
          ? `${profesyonelSema.heroEtiketi} · ${konum}`
          : profesyonelSema.heroEtiketi
        : konum
          ? `${bilgi.sektorAdi} · ${konum}`
          : bilgi.sektorAdi,
      baslik: profesyonelSema?.heroBasligi ?? donusum.heroBaslik,
      aciklama: profesyonelSema?.heroAciklamasi ?? icerik.odakMetni,
      butonlar: [
        buton(profesyonelSema?.anaAksiyon ?? icerik.ctaMetni, aksiyonHedefi),
        buton(
          profesyonelSema?.ikincilAksiyon ?? sunum.hizmetSayfasiAdi,
          `/${sunum.hizmetSayfasiSlug}`,
        ),
      ],
    }),
    guven: bolum("istatistik", 0, {
      varyasyon: "kartli",
      ustBaslik: profesyonelSema?.guvenEtiketi ?? "Karar desteği",
      baslik: donusum.guvenBaslik,
      aciklama: "",
      listeElemanlari: donusum.guvenUnsurlari.map((oge) =>
        listeElemani(oge.baslik, oge.aciklama),
      ),
    }),
    hizmetler: bolum("hizmetler", 0, {
      varyasyon: sunum.listeVaryasyonu,
      ustBaslik: profesyonelSema?.hizmetEtiketi ?? sunum.hizmetUstBasligi,
      baslik: donusum.hizmetlerBaslik,
      aciklama: icerik.kararOlcutleri,
      listeElemanlari: hizmetAdlari.map((ad) =>
        listeElemani(ad, hizmetDetayiniGetir(icerik, ad, false)),
      ),
      butonlar: [buton(`Tüm ${kucukHarf(sunum.hizmetSayfasiAdi)}`, `/${sunum.hizmetSayfasiSlug}`)],
    }),
    surec: bolum("neden-biz", 0, {
      varyasyon: "adimlar",
      ustBaslik: profesyonelSema?.surecEtiketi ?? "Çalışma süreci",
      baslik: donusum.surecBaslik,
      aciklama: "",
      listeElemanlari: donusum.surecAdimlari.map((oge) =>
        listeElemani(oge.baslik, oge.aciklama),
      ),
    }),
    hikaye: bolum("metin", 0, {
      varyasyon: sunum.metinVaryasyonu,
      ustBaslik: profesyonelSema?.hikayeEtiketi ?? "Yaklaşımımız",
      baslik: donusum.hakkimizdaBaslik,
      aciklama: icerik.detayliYaklasim,
      butonlar: [buton("Bizi daha yakından tanıyın", "/hakkimizda")],
    }),
    galeri: bolum("galeri", 0, {
      varyasyon: sunum.galeriVaryasyonu,
      ustBaslik: sunum.galeriSayfasiAdi,
      baslik: donusum.galeriBaslik,
      aciklama: icerik.sonKontrol,
      listeElemanlari: donusum.galeriBasliklari.slice(0, 4).map((ad, index) =>
        listeElemani(
          ad,
          hizmetDetayiniGetir(icerik, hizmetAdlari[index % hizmetAdlari.length], false),
        ),
      ),
      butonlar: [buton(sunum.galeriSayfasiAdi, `/${sunum.galeriSayfasiSlug}`)],
    }),
    sss: bolum("sss", 0, {
      varyasyon: "akordeon",
      ustBaslik: profesyonelSema?.sssEtiketi ?? "Sık sorulan sorular",
      baslik: donusum.sssBaslik,
      aciklama: "",
      listeElemanlari: donusum.sorular.map((oge) =>
        listeElemani(oge.baslik, oge.aciklama),
      ),
    }),
    iletisim: bolum("iletisim", 0, {
      varyasyon: "iletisim-paneli",
      ustBaslik: profesyonelSema?.iletisimEtiketi ?? "Bilgi ve planlama",
      baslik: donusum.iletisimBaslik,
      aciklama: `${icerik.iletisimIstegi} Telefon veya WhatsApp üzerinden kısa bilgi paylaşmanız yeterlidir.`,
      butonlar: [
        ...(telefonBaglantisi(bilgi.telefon)
          ? [buton(`Telefon: ${bilgi.telefon}`, telefonBaglantisi(bilgi.telefon))]
          : []),
        ...(whatsappBaglantisi(bilgi.whatsapp)
          ? [buton("WhatsApp’tan yazın", whatsappBaglantisi(bilgi.whatsapp))]
          : []),
      ],
    }),
  };

  const anaSayfaSirasi = [
    ...(profesyonelSema?.anaSayfaAkisi ??
      sektorAnaSayfaAkisiniGetir(bilgi.sektor)),
  ].filter((anahtar) => anahtar !== "galeri");

  return anaSayfaSirasi
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
  const donusum = sektorDonusumProfiliniGetir(bilgi.sektor);
  const sunum = sektorSunumProfiliniGetir(bilgi.sektor);
  const profesyonelSema = sektorOperasyonProfiliniGetir(
    bilgi.sektor,
  )?.icerikSemasi;
  const icHeroVaryasyonu = sunum.heroVaryasyonu === "kapak" ? "odakli" : sunum.heroVaryasyonu;

  const surecBolumu = () =>
    bolum("neden-biz", 2, {
      varyasyon: "adimlar",
      ustBaslik: profesyonelSema?.surecEtiketi ?? "Nasıl ilerliyoruz?",
      baslik: donusum.surecBaslik,
      aciklama: "",
      listeElemanlari: donusum.surecAdimlari.map((oge) =>
        listeElemani(oge.baslik, oge.aciklama),
      ),
      animasyon: "soldan",
    });

  const sssBolumu = (sira: number) =>
    bolum("sss", sira, {
      varyasyon: "akordeon",
      ustBaslik: profesyonelSema?.sssEtiketi ?? "Sık sorulan sorular",
      baslik: donusum.sssBaslik,
      listeElemanlari: donusum.sorular.map((oge) =>
        listeElemani(oge.baslik, oge.aciklama),
      ),
      animasyon: "asagidan",
    });

  const sayfalar: Partial<Record<SayfaRolu, SiteSayfasi>> = {
    ana: sayfa("ana", "Ana Sayfa", "", 0, anaSayfaBolumleri(bilgi, hizmetAdlari), true),
    hakkimizda: sayfa("hakkimizda", "Hakkımızda", "hakkimizda", 0, [
      bolum("hero", 0, {
        varyasyon: icHeroVaryasyonu,
        ustBaslik: "Hakkımızda",
        baslik: donusum.hakkimizdaBaslik,
        aciklama: icerik.kisaYaklasim,
        animasyon: "soluklasarak",
      }),
      bolum("metin", 1, {
        varyasyon: sunum.metinVaryasyonu,
        ustBaslik: `${bilgi.firmaAdi} yaklaşımı`,
        baslik: donusum.hakkimizdaBaslik,
        aciklama: icerik.detayliYaklasim,
        animasyon: "asagidan",
      }),
      bolum("istatistik", 2, {
        varyasyon: "kartli",
        ustBaslik: "Çalışma ilkeleri",
        baslik: donusum.guvenBaslik,
        listeElemanlari: [
          listeElemani(
            donusum.guvenUnsurlari[0].baslik,
            `${icerik.kisaYaklasim} Bu yaklaşım, hizmetin ilk temasından itibaren korunur.`,
          ),
          listeElemani(
            donusum.guvenUnsurlari[1].baslik,
            `${icerik.detayliYaklasim} Kararlar, işin kendi koşulları içinde açıklanır.`,
          ),
          listeElemani(
            donusum.guvenUnsurlari[2].baslik,
            `${icerik.sonKontrol} Böylece tamamlanan kapsam görünür hâle gelir.`,
          ),
        ],
        animasyon: "sagdan",
      }),
    ]),
    hizmet: sayfa("hizmet", sunum.hizmetSayfasiAdi, sunum.hizmetSayfasiSlug, 0, [
      bolum("hero", 0, {
        varyasyon: icHeroVaryasyonu,
        ustBaslik: profesyonelSema?.hizmetEtiketi ?? sunum.hizmetUstBasligi,
        baslik: donusum.hizmetlerBaslik,
        aciklama: icerik.kararOlcutleri,
        animasyon: "soluklasarak",
      }),
      bolum(sunum.hizmetBolumTuru, 1, {
        varyasyon: sunum.listeVaryasyonu,
        ustBaslik: profesyonelSema?.hizmetEtiketi ?? "Ayrıntılı kapsam",
        baslik: donusum.hizmetlerBaslik,
        aciklama: `${icerik.kararOlcutleri} Her seçeneğin hazırlığı, uygulama biçimi ve takip ihtiyacı başlamadan önce açıklanır.`,
        listeElemanlari: hizmetAdlari.map((ad) =>
          listeElemani(ad, hizmetDetayiniGetir(icerik, ad, true)),
        ),
        butonlar: [buton(icerik.ctaMetni, sunum.aksiyonSayfasi ? `/${sunum.aksiyonSayfasi.slug}` : "/iletisim")],
        animasyon: "asagidan",
      }),
      surecBolumu(),
      sssBolumu(3),
    ]),
    galeri: sunum.galeriKullan
      ? sayfa("galeri", sunum.galeriSayfasiAdi, sunum.galeriSayfasiSlug, 0, [
          bolum("hero", 0, {
            varyasyon: icHeroVaryasyonu,
            ustBaslik: sunum.galeriSayfasiAdi,
            baslik: donusum.galeriBaslik,
            aciklama: `${icerik.sonKontrol} Çalışma örneklerini sonuç, uygulama biçimi ve öne çıkan ayrıntılarıyla inceleyebilirsiniz.`,
            animasyon: "soluklasarak",
          }),
          bolum("galeri", 1, {
            varyasyon: sunum.galeriVaryasyonu,
            ustBaslik: "Seçili örnekler",
            baslik: donusum.galeriBaslik,
            listeElemanlari: donusum.galeriBasliklari.map((ad, index) =>
              listeElemani(
                ad,
                hizmetDetayiniGetir(icerik, hizmetAdlari[index % hizmetAdlari.length], false),
              ),
            ),
            animasyon: "maskeli",
          }),
        ])
      : undefined,
    aksiyon: sunum.aksiyonSayfasi
      ? sayfa("aksiyon", sunum.aksiyonSayfasi.ad, sunum.aksiyonSayfasi.slug, 0, [
          bolum("hero", 0, {
            varyasyon: "odakli",
            ustBaslik:
              profesyonelSema?.iletisimEtiketi ??
              sunum.aksiyonSayfasi.ustBaslik,
            baslik: donusum.iletisimBaslik,
            aciklama: icerik.iletisimIstegi,
            animasyon: "soluklasarak",
          }),
          bolum("form", 1, {
            varyasyon: "talep-formu",
            ustBaslik:
              profesyonelSema?.iletisimEtiketi ?? "Kısa talep formu",
            baslik: donusum.iletisimBaslik,
            aciklama: icerik.iletisimIstegi,
            animasyon: "asagidan",
          }),
        ])
      : undefined,
    iletisim: sayfa("iletisim", "İletişim", "iletisim", 0, [
      bolum("iletisim", 0, {
        varyasyon: "iletisim-paneli",
        ustBaslik: profesyonelSema?.iletisimEtiketi ?? "İletişim",
        baslik: donusum.iletisimBaslik,
        aciklama: `${icerik.iletisimIstegi}${konum ? ` ${konum} için güncel uygunluğu doğrudan sorabilirsiniz.` : ""}`,
        butonlar: [
          ...(telefonBaglantisi(bilgi.telefon) ? [buton(`Telefon: ${bilgi.telefon}`, telefonBaglantisi(bilgi.telefon))] : []),
          ...(whatsappBaglantisi(bilgi.whatsapp) ? [buton("WhatsApp’tan yazın", whatsappBaglantisi(bilgi.whatsapp))] : []),
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

  const sayfaSirasi = [...sunum.sayfaSirasi].filter(
    (rol) => rol !== "galeri",
  );

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
  const seciliHizmetler = (bilgi.hizmetler ?? [])
    .map((hizmet) => hizmet.trim())
    .filter(Boolean);

  if (seciliHizmetler.length > 0) {
    return standartSayfalar(bilgi, seciliHizmetler);
  }

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
