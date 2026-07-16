import type { AnimasyonTuru, BolumTuru } from "@/data/sektorSablonlari";

export type AnaSayfaBolumAnahtari =
  | "hero"
  | "guven"
  | "hizmetler"
  | "surec"
  | "hikaye"
  | "galeri"
  | "sss"
  | "iletisim";

export type SayfaRolu =
  | "ana"
  | "hizmet"
  | "galeri"
  | "hakkimizda"
  | "aksiyon"
  | "iletisim";

export interface AksiyonSayfasiProfili {
  ad: string;
  slug: string;
  ustBaslik: string;
  baslik: string;
}

export interface SektorSunumProfili {
  deneyim: string;
  varsayilanTema: string;
  temaOnerileri: string[];
  heroVaryasyonu: "bolunmus" | "kapak" | "editoryal" | "odakli" | "vitrin";
  metinVaryasyonu: "sol-gorsel" | "sag-gorsel";
  listeVaryasyonu: "cizgili-liste" | "kartli" | "iki-kolon";
  galeriVaryasyonu: "mozaik" | "vitrin" | "dergi";
  galeriKullan: boolean;
  galeriSayfasiAdi: string;
  galeriSayfasiSlug: string;
  hizmetSayfasiAdi: string;
  hizmetSayfasiSlug: string;
  hizmetBolumTuru: Extract<BolumTuru, "hizmetler" | "urunler">;
  hizmetUstBasligi: string;
  guvenBasligi: string;
  surecBasligi: string;
  sssBasligi: string;
  anaSayfaSirasi: AnaSayfaBolumAnahtari[];
  sayfaSirasi: SayfaRolu[];
  animasyonAkisi: AnimasyonTuru[];
  aksiyonSayfasi?: AksiyonSayfasiProfili;
}

const standartAnaSayfa: AnaSayfaBolumAnahtari[] = [
  "hero",
  "guven",
  "hizmetler",
  "surec",
  "hikaye",
  "galeri",
  "sss",
  "iletisim",
];

const standartSayfaSirasi: SayfaRolu[] = [
  "ana",
  "hizmet",
  "hakkimizda",
  "galeri",
  "aksiyon",
  "iletisim",
];

const bakim: SektorSunumProfili = {
  deneyim: "kişisel bakım ve randevu",
  varsayilanTema: "studio",
  temaOnerileri: ["studio", "ruby", "artisan", "noir"],
  heroVaryasyonu: "vitrin",
  metinVaryasyonu: "sol-gorsel",
  listeVaryasyonu: "kartli",
  galeriVaryasyonu: "dergi",
  galeriKullan: true,
  galeriSayfasiAdi: "Çalışmalar",
  galeriSayfasiSlug: "calismalar",
  hizmetSayfasiAdi: "Uygulamalar",
  hizmetSayfasiSlug: "uygulamalar",
  hizmetBolumTuru: "hizmetler",
  hizmetUstBasligi: "Bakım seçenekleri",
  guvenBasligi: "Karar vermeden önce bilmeniz gerekenler",
  surecBasligi: "Beklentiden son dokunuşa",
  sssBasligi: "Randevu öncesi merak edilenler",
  anaSayfaSirasi: ["hero", "hizmetler", "galeri", "surec", "hikaye", "guven", "sss", "iletisim"],
  sayfaSirasi: ["ana", "hizmet", "galeri", "hakkimizda", "aksiyon", "iletisim"],
  animasyonAkisi: ["soluklasarak", "asagidan", "sagdan", "soldan", "maskeli"],
  aksiyonSayfasi: {
    ad: "Randevu",
    slug: "randevu",
    ustBaslik: "Randevu planlama",
    baslik: "Uygun gün ve işlemi birlikte netleştirelim",
  },
};

const sahaHizmeti: SektorSunumProfili = {
  deneyim: "yerinde hizmet ve teklif",
  varsayilanTema: "aurora",
  temaOnerileri: ["aurora", "copper", "sand", "skyline"],
  heroVaryasyonu: "bolunmus",
  metinVaryasyonu: "sag-gorsel",
  listeVaryasyonu: "cizgili-liste",
  galeriVaryasyonu: "mozaik",
  galeriKullan: true,
  galeriSayfasiAdi: "Uygulamalar",
  galeriSayfasiSlug: "uygulamalar",
  hizmetSayfasiAdi: "Hizmetler",
  hizmetSayfasiSlug: "hizmetler",
  hizmetBolumTuru: "hizmetler",
  hizmetUstBasligi: "Hizmet kapsamı",
  guvenBasligi: "Tekliften önce kapsamı netleştiren düzen",
  surecBasligi: "Talebiniz nasıl ilerler?",
  sssBasligi: "Hizmet öncesi sık sorulanlar",
  anaSayfaSirasi: standartAnaSayfa,
  sayfaSirasi: standartSayfaSirasi,
  animasyonAkisi: ["asagidan", "soldan", "sagdan", "soluklasarak"],
  aksiyonSayfasi: {
    ad: "Teklif Al",
    slug: "teklif-al",
    ustBaslik: "Hızlı ön değerlendirme",
    baslik: "İhtiyacınızı birkaç bilgiyle anlatın",
  },
};

const otomotiv: SektorSunumProfili = {
  ...sahaHizmeti,
  deneyim: "araç hizmeti ve uygulama",
  varsayilanTema: "obsidian",
  temaOnerileri: ["obsidian", "copper", "skyline", "mono"],
  heroVaryasyonu: "kapak",
  metinVaryasyonu: "sol-gorsel",
  listeVaryasyonu: "iki-kolon",
  galeriVaryasyonu: "vitrin",
  galeriSayfasiAdi: "Araçlar ve Uygulamalar",
  guvenBasligi: "Aracınızı teslim etmeden önce net olması gerekenler",
  surecBasligi: "Kontrolden teslimata planlı süreç",
  sssBasligi: "Araç sahiplerinin sık sorduğu sorular",
  anaSayfaSirasi: ["hero", "guven", "hizmetler", "galeri", "surec", "hikaye", "sss", "iletisim"],
  animasyonAkisi: ["maskeli", "soldan", "sagdan", "asagidan"],
};

const yemeIcme: SektorSunumProfili = {
  deneyim: "menü ve rezervasyon",
  varsayilanTema: "bistro",
  temaOnerileri: ["bistro", "ruby", "sand", "terra"],
  heroVaryasyonu: "kapak",
  metinVaryasyonu: "sag-gorsel",
  listeVaryasyonu: "iki-kolon",
  galeriVaryasyonu: "vitrin",
  galeriKullan: true,
  galeriSayfasiAdi: "Lezzetler ve Mekân",
  galeriSayfasiSlug: "galeri",
  hizmetSayfasiAdi: "Menü",
  hizmetSayfasiSlug: "menu",
  hizmetBolumTuru: "urunler",
  hizmetUstBasligi: "Menüden seçkiler",
  guvenBasligi: "Masa seçiminizi kolaylaştıran bilgiler",
  surecBasligi: "Hazırlıktan servise özenli akış",
  sssBasligi: "Menü ve rezervasyon hakkında",
  anaSayfaSirasi: ["hero", "hizmetler", "galeri", "hikaye", "guven", "surec", "sss", "iletisim"],
  sayfaSirasi: ["ana", "hizmet", "galeri", "hakkimizda", "aksiyon", "iletisim"],
  animasyonAkisi: ["soluklasarak", "asagidan", "maskeli", "soldan"],
  aksiyonSayfasi: {
    ad: "Rezervasyon",
    slug: "rezervasyon",
    ustBaslik: "Masa planlama",
    baslik: "Tarih, saat ve kişi sayısını paylaşın",
  },
};

const saglik: SektorSunumProfili = {
  deneyim: "değerlendirme ve randevu",
  varsayilanTema: "clinic",
  temaOnerileri: ["clinic", "lagoon", "sage", "ivory"],
  heroVaryasyonu: "odakli",
  metinVaryasyonu: "sag-gorsel",
  listeVaryasyonu: "cizgili-liste",
  galeriVaryasyonu: "mozaik",
  galeriKullan: false,
  galeriSayfasiAdi: "Merkezimiz",
  galeriSayfasiSlug: "merkezimiz",
  hizmetSayfasiAdi: "Hizmetler",
  hizmetSayfasiSlug: "hizmetler",
  hizmetBolumTuru: "hizmetler",
  hizmetUstBasligi: "Değerlendirme alanları",
  guvenBasligi: "Güvenli karar için açık bilgilendirme",
  surecBasligi: "Başvurudan takibe anlaşılır süreç",
  sssBasligi: "Görüşme öncesi merak edilenler",
  anaSayfaSirasi: ["hero", "guven", "hizmetler", "surec", "hikaye", "sss", "iletisim"],
  sayfaSirasi: ["ana", "hizmet", "hakkimizda", "aksiyon", "iletisim"],
  animasyonAkisi: ["soluklasarak", "asagidan", "soldan"],
  aksiyonSayfasi: {
    ad: "Randevu",
    slug: "randevu",
    ustBaslik: "Randevu talebi",
    baslik: "Uygun değerlendirme zamanını planlayalım",
  },
};

const projeUretim: SektorSunumProfili = {
  deneyim: "proje, üretim ve uygulama",
  varsayilanTema: "marble",
  temaOnerileri: ["marble", "artisan", "mono", "copper"],
  heroVaryasyonu: "editoryal",
  metinVaryasyonu: "sol-gorsel",
  listeVaryasyonu: "iki-kolon",
  galeriVaryasyonu: "dergi",
  galeriKullan: true,
  galeriSayfasiAdi: "Projeler",
  galeriSayfasiSlug: "projeler",
  hizmetSayfasiAdi: "Çözümler",
  hizmetSayfasiSlug: "cozumler",
  hizmetBolumTuru: "hizmetler",
  hizmetUstBasligi: "Uygulama alanları",
  guvenBasligi: "Proje kararını güçlendiren teknik açıklık",
  surecBasligi: "Keşiften uygulamaya kontrollü ilerleyiş",
  sssBasligi: "Proje öncesi sık sorulanlar",
  anaSayfaSirasi: ["hero", "galeri", "hizmetler", "surec", "guven", "hikaye", "sss", "iletisim"],
  sayfaSirasi: ["ana", "galeri", "hizmet", "hakkimizda", "aksiyon", "iletisim"],
  animasyonAkisi: ["maskeli", "soldan", "sagdan", "asagidan"],
  aksiyonSayfasi: {
    ad: "Proje Talebi",
    slug: "proje-talebi",
    ustBaslik: "Ön keşif ve planlama",
    baslik: "Alanı, ölçüyü ve beklentinizi paylaşın",
  },
};

const emlak: SektorSunumProfili = {
  deneyim: "ilan inceleme ve danışmanlık",
  varsayilanTema: "skyline",
  temaOnerileri: ["skyline", "ivory", "royal", "mono"],
  heroVaryasyonu: "editoryal",
  metinVaryasyonu: "sag-gorsel",
  listeVaryasyonu: "kartli",
  galeriVaryasyonu: "vitrin",
  galeriKullan: false,
  galeriSayfasiAdi: "Portföy",
  galeriSayfasiSlug: "portfoy",
  hizmetSayfasiAdi: "İlanlar",
  hizmetSayfasiSlug: "ilanlar",
  hizmetBolumTuru: "urunler",
  hizmetUstBasligi: "Portföy seçkisi",
  guvenBasligi: "Doğru gayrimenkul kararının temel bilgileri",
  surecBasligi: "Arayıştan gösterime düzenli süreç",
  sssBasligi: "Alım, satım ve kiralama hakkında",
  anaSayfaSirasi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"],
  sayfaSirasi: ["ana", "hizmet", "hakkimizda", "aksiyon", "iletisim"],
  animasyonAkisi: ["soluklasarak", "soldan", "asagidan"],
  aksiyonSayfasi: {
    ad: "Arayışınızı İletin",
    slug: "portfoy-talebi",
    ustBaslik: "Portföy talebi",
    baslik: "Bütçenizi ve önceliklerinizi paylaşın",
  },
};

const konaklama: SektorSunumProfili = {
  deneyim: "konaklama ve rezervasyon",
  varsayilanTema: "forest",
  temaOnerileri: ["forest", "terra", "noir", "bistro"],
  heroVaryasyonu: "kapak",
  metinVaryasyonu: "sol-gorsel",
  listeVaryasyonu: "kartli",
  galeriVaryasyonu: "vitrin",
  galeriKullan: true,
  galeriSayfasiAdi: "Tesis ve Deneyim",
  galeriSayfasiSlug: "tesis",
  hizmetSayfasiAdi: "Odalar",
  hizmetSayfasiSlug: "odalar",
  hizmetBolumTuru: "urunler",
  hizmetUstBasligi: "Konaklama seçenekleri",
  guvenBasligi: "Rezervasyondan önce net olması gerekenler",
  surecBasligi: "Oda seçiminden girişe kolay planlama",
  sssBasligi: "Konaklama hakkında sık sorulanlar",
  anaSayfaSirasi: ["hero", "hizmetler", "galeri", "guven", "surec", "hikaye", "sss", "iletisim"],
  sayfaSirasi: ["ana", "hizmet", "galeri", "hakkimizda", "aksiyon", "iletisim"],
  animasyonAkisi: ["soluklasarak", "maskeli", "asagidan", "soldan"],
  aksiyonSayfasi: {
    ad: "Rezervasyon",
    slug: "rezervasyon",
    ustBaslik: "Müsaitlik sorgulama",
    baslik: "Tarihleri ve kişi sayısını paylaşın",
  },
};

const seyahat: SektorSunumProfili = {
  ...sahaHizmeti,
  deneyim: "seyahat ve rezervasyon",
  varsayilanTema: "skyline",
  temaOnerileri: ["skyline", "forest", "terra", "royal"],
  heroVaryasyonu: "kapak",
  listeVaryasyonu: "kartli",
  galeriVaryasyonu: "vitrin",
  galeriSayfasiAdi: "Rotalar ve Deneyimler",
  hizmetSayfasiAdi: "Seçenekler",
  hizmetSayfasiSlug: "secenekler",
  hizmetUstBasligi: "Seyahat seçenekleri",
  guvenBasligi: "Yola çıkmadan önce netleşen ayrıntılar",
  surecBasligi: "Bilgiden rezervasyona kolay akış",
  sssBasligi: "Planlama öncesi sık sorulanlar",
  aksiyonSayfasi: {
    ad: "Rezervasyon Talebi",
    slug: "rezervasyon-talebi",
    ustBaslik: "Uygunluk ve planlama",
    baslik: "Tarih ve yolculuk bilgilerinizi paylaşın",
  },
};

const egitim: SektorSunumProfili = {
  deneyim: "eğitim programı ve ön görüşme",
  varsayilanTema: "aurora",
  temaOnerileri: ["aurora", "sage", "skyline", "terra"],
  heroVaryasyonu: "odakli",
  metinVaryasyonu: "sag-gorsel",
  listeVaryasyonu: "kartli",
  galeriVaryasyonu: "mozaik",
  galeriKullan: false,
  galeriSayfasiAdi: "Eğitim Ortamı",
  galeriSayfasiSlug: "egitim-ortami",
  hizmetSayfasiAdi: "Programlar",
  hizmetSayfasiSlug: "programlar",
  hizmetBolumTuru: "hizmetler",
  hizmetUstBasligi: "Eğitim seçenekleri",
  guvenBasligi: "Doğru programı seçmeye yardımcı bilgiler",
  surecBasligi: "Seviye ve hedeften düzenli takibe",
  sssBasligi: "Kayıt öncesi merak edilenler",
  anaSayfaSirasi: ["hero", "guven", "hizmetler", "surec", "hikaye", "sss", "iletisim"],
  sayfaSirasi: ["ana", "hizmet", "hakkimizda", "aksiyon", "iletisim"],
  animasyonAkisi: ["soluklasarak", "asagidan", "sagdan"],
  aksiyonSayfasi: {
    ad: "Ön Görüşme",
    slug: "on-gorusme",
    ustBaslik: "Program danışmanlığı",
    baslik: "Seviyeyi ve hedefi birlikte değerlendirelim",
  },
};

const kurumsal: SektorSunumProfili = {
  deneyim: "uzmanlık ve ön görüşme",
  varsayilanTema: "ivory",
  temaOnerileri: ["ivory", "royal", "skyline", "mono"],
  heroVaryasyonu: "editoryal",
  metinVaryasyonu: "sag-gorsel",
  listeVaryasyonu: "cizgili-liste",
  galeriVaryasyonu: "mozaik",
  galeriKullan: false,
  galeriSayfasiAdi: "Çalışmalar",
  galeriSayfasiSlug: "calismalar",
  hizmetSayfasiAdi: "Çalışma Alanları",
  hizmetSayfasiSlug: "calisma-alanlari",
  hizmetBolumTuru: "hizmetler",
  hizmetUstBasligi: "Uzmanlık kapsamı",
  guvenBasligi: "Sağlıklı karar için açık kapsam ve sorumluluk",
  surecBasligi: "İlk görüşmeden sonuca düzenli çalışma",
  sssBasligi: "Hizmet süreci hakkında sık sorulanlar",
  anaSayfaSirasi: ["hero", "guven", "hizmetler", "surec", "hikaye", "sss", "iletisim"],
  sayfaSirasi: ["ana", "hizmet", "hakkimizda", "aksiyon", "iletisim"],
  animasyonAkisi: ["soluklasarak", "soldan", "asagidan"],
  aksiyonSayfasi: {
    ad: "Ön Görüşme",
    slug: "on-gorusme",
    ustBaslik: "İlk değerlendirme",
    baslik: "Konuyu ve beklentinizi kısaca paylaşın",
  },
};

const spor: SektorSunumProfili = {
  ...bakim,
  deneyim: "program ve ders planlama",
  varsayilanTema: "obsidian",
  temaOnerileri: ["obsidian", "forest", "sage", "neon"],
  heroVaryasyonu: "vitrin",
  hizmetSayfasiAdi: "Programlar",
  hizmetSayfasiSlug: "programlar",
  hizmetUstBasligi: "Antrenman seçenekleri",
  guvenBasligi: "Doğru program için başlangıç bilgileri",
  surecBasligi: "Değerlendirmeden sürdürülebilir programa",
  sssBasligi: "Ders ve üyelik öncesi merak edilenler",
  aksiyonSayfasi: {
    ad: "Deneme ve Görüşme",
    slug: "deneme-gorusmesi",
    ustBaslik: "Program planlama",
    baslik: "Hedefinizi ve uygun zamanınızı paylaşın",
  },
};

const etkinlik: SektorSunumProfili = {
  ...projeUretim,
  deneyim: "etkinlik ve teklif planlama",
  varsayilanTema: "noir",
  temaOnerileri: ["noir", "studio", "ruby", "bistro"],
  heroVaryasyonu: "kapak",
  hizmetSayfasiAdi: "Organizasyonlar",
  hizmetSayfasiSlug: "organizasyonlar",
  hizmetUstBasligi: "Etkinlik seçenekleri",
  galeriSayfasiAdi: "Etkinlikler",
  galeriSayfasiSlug: "etkinlikler",
  guvenBasligi: "Etkinlik gününden önce netleşen ayrıntılar",
  surecBasligi: "Fikirden etkinlik gününe planlı akış",
  sssBasligi: "Organizasyon öncesi sık sorulanlar",
  aksiyonSayfasi: {
    ad: "Teklif ve Planlama",
    slug: "teklif-planlama",
    ustBaslik: "Etkinlik talebi",
    baslik: "Tarih, mekân ve kişi sayısını paylaşın",
  },
};

const dijital: SektorSunumProfili = {
  ...projeUretim,
  deneyim: "dijital proje ve iş birliği",
  varsayilanTema: "neon",
  temaOnerileri: ["neon", "studio", "mono", "skyline"],
  heroVaryasyonu: "editoryal",
  hizmetSayfasiAdi: "Hizmetler",
  hizmetSayfasiSlug: "hizmetler",
  hizmetUstBasligi: "Dijital çözümler",
  galeriSayfasiAdi: "Projeler",
  galeriSayfasiSlug: "projeler",
  guvenBasligi: "Doğru proje kapsamını kuran temel kararlar",
  surecBasligi: "Brief'ten yayına şeffaf üretim süreci",
  sssBasligi: "Proje başlamadan önce merak edilenler",
  aksiyonSayfasi: {
    ad: "Proje Görüşmesi",
    slug: "proje-gorusmesi",
    ustBaslik: "İş birliği talebi",
    baslik: "Hedefi, kapsamı ve takvimi paylaşın",
  },
};

const sektorProfilleri: Record<string, SektorSunumProfili> = {
  kuafor: { ...bakim, varsayilanTema: "studio", hizmetSayfasiAdi: "Saç ve Bakım" },
  berber: { ...bakim, varsayilanTema: "artisan", hizmetSayfasiAdi: "Saç ve Sakal" },
  "guzellik-salonu": { ...bakim, varsayilanTema: "ruby", hizmetSayfasiAdi: "Bakım Uygulamaları" },
  "estetik-merkezi": { ...saglik, varsayilanTema: "lagoon", galeriKullan: true, galeriSayfasiAdi: "Merkez ve Uygulamalar", hizmetSayfasiAdi: "Estetik Uygulamalar" },
  temizlik: { ...sahaHizmeti, varsayilanTema: "aurora", hizmetSayfasiAdi: "Temizlik Hizmetleri" },
  nakliyat: { ...sahaHizmeti, varsayilanTema: "sand", hizmetSayfasiAdi: "Taşıma Hizmetleri" },
  "teknik-servis": { ...sahaHizmeti, varsayilanTema: "copper", hizmetSayfasiAdi: "Servis Hizmetleri" },
  "oto-yikama": { ...otomotiv, varsayilanTema: "obsidian", hizmetSayfasiAdi: "Bakım ve Koruma" },
  "oto-servis": { ...otomotiv, varsayilanTema: "copper", hizmetSayfasiAdi: "Servis ve Bakım" },
  "arac-kaplama": { ...otomotiv, varsayilanTema: "obsidian", hizmetSayfasiAdi: "Kaplama ve Koruma", galeriSayfasiAdi: "Uygulama Detayları" },
  "arac-kiralama": { ...seyahat, varsayilanTema: "skyline", galeriKullan: true, galeriSayfasiAdi: "Araç Filosu", hizmetSayfasiAdi: "Araç Seçenekleri", hizmetBolumTuru: "urunler" },
  restoran: { ...yemeIcme, varsayilanTema: "bistro" },
  kafe: { ...yemeIcme, varsayilanTema: "terra" },
  pastane: { ...yemeIcme, varsayilanTema: "ruby", hizmetSayfasiAdi: "Ürünler", hizmetSayfasiSlug: "urunler" },
  catering: { ...yemeIcme, varsayilanTema: "sand", hizmetSayfasiAdi: "Menü ve Organizasyon", hizmetSayfasiSlug: "menu-organizasyon", aksiyonSayfasi: { ad: "Teklif Al", slug: "teklif-al", ustBaslik: "Organizasyon menüsü", baslik: "Kişi sayısını ve etkinlik ayrıntılarını paylaşın" } },
  klinik: { ...saglik, varsayilanTema: "clinic", hizmetSayfasiAdi: "Sağlık Hizmetleri" },
  "dis-klinigi": { ...saglik, varsayilanTema: "lagoon", hizmetSayfasiAdi: "Tedaviler" },
  veteriner: { ...saglik, varsayilanTema: "sage", galeriKullan: true, galeriSayfasiAdi: "Kliniğimiz", hizmetSayfasiAdi: "Veteriner Hizmetleri" },
  psikolog: { ...saglik, varsayilanTema: "sage", hizmetSayfasiAdi: "Görüşme Alanları" },
  diyetisyen: { ...saglik, varsayilanTema: "lagoon", hizmetSayfasiAdi: "Beslenme Programları" },
  mermer: { ...projeUretim, varsayilanTema: "marble", hizmetSayfasiAdi: "Taş ve Yüzeyler" },
  mobilya: { ...projeUretim, varsayilanTema: "artisan", hizmetSayfasiAdi: "Özel Üretim" },
  dekorasyon: { ...projeUretim, varsayilanTema: "terra", hizmetSayfasiAdi: "Dekorasyon Çözümleri" },
  insaat: { ...projeUretim, varsayilanTema: "copper", hizmetSayfasiAdi: "İnşaat ve Tadilat" },
  mimarlik: { ...projeUretim, varsayilanTema: "mono", hizmetSayfasiAdi: "Mimari Hizmetler" },
  emlak,
  otel: { ...konaklama, varsayilanTema: "noir" },
  pansiyon: { ...konaklama, varsayilanTema: "terra" },
  turizm: { ...seyahat, varsayilanTema: "forest", hizmetSayfasiAdi: "Turlar", hizmetSayfasiSlug: "turlar" },
  transfer: { ...seyahat, varsayilanTema: "royal", galeriKullan: false, hizmetSayfasiAdi: "Transfer Seçenekleri", hizmetSayfasiSlug: "transferler" },
  kurs: { ...egitim, varsayilanTema: "aurora", hizmetSayfasiAdi: "Eğitim Programları" },
  kres: { ...egitim, varsayilanTema: "terra", galeriKullan: true, galeriSayfasiAdi: "Yaşam ve Etkinlik", hizmetSayfasiAdi: "Gelişim Programları" },
  "ozel-okul": { ...egitim, varsayilanTema: "royal", galeriKullan: true, galeriSayfasiAdi: "Kampüs ve Yaşam", hizmetSayfasiAdi: "Eğitim Programı" },
  avukat: { ...kurumsal, varsayilanTema: "ivory", hizmetSayfasiAdi: "Çalışma Alanları" },
  muhasebe: { ...kurumsal, varsayilanTema: "royal", hizmetSayfasiAdi: "Mali Hizmetler" },
  danismanlik: { ...kurumsal, varsayilanTema: "skyline", hizmetSayfasiAdi: "Danışmanlık Çözümleri" },
  sigorta: { ...kurumsal, varsayilanTema: "royal", hizmetSayfasiAdi: "Sigorta Ürünleri", hizmetBolumTuru: "urunler" },
  "spor-salonu": { ...spor, varsayilanTema: "obsidian", hizmetSayfasiAdi: "Antrenman Programları" },
  pilates: { ...spor, varsayilanTema: "sage", hizmetSayfasiAdi: "Pilates Dersleri" },
  fotografci: { ...projeUretim, varsayilanTema: "studio", hizmetSayfasiAdi: "Çekim Hizmetleri", galeriSayfasiAdi: "Portfolyo", galeriSayfasiSlug: "portfolyo" },
  "dugun-salonu": { ...etkinlik, varsayilanTema: "noir", hizmetSayfasiAdi: "Davet Seçenekleri" },
  organizasyon: { ...etkinlik, varsayilanTema: "studio" },
  yazilim: { ...dijital, varsayilanTema: "neon", hizmetSayfasiAdi: "Yazılım Çözümleri" },
  ajans: { ...dijital, varsayilanTema: "studio", hizmetSayfasiAdi: "Ajans Hizmetleri" },
  portfolyo: { ...dijital, varsayilanTema: "mono", hizmetSayfasiAdi: "Uzmanlıklar", galeriSayfasiAdi: "Seçili Çalışmalar" },
  ozel: { ...sahaHizmeti, varsayilanTema: "aurora", galeriKullan: false },
};

const temaKarakterleri: Record<string, string[]> = {
  aurora: ["local"],
  obsidian: ["dark", "industrial"],
  ivory: ["editorial"],
  terra: ["nature", "local"],
  noir: ["luxury", "dark"],
  lagoon: ["medical"],
  ruby: ["visual"],
  sage: ["nature"],
  copper: ["industrial"],
  neon: ["dark", "portfolio"],
  mono: ["line", "editorial"],
  royal: ["luxury", "dark"],
  sand: ["local"],
  clinic: ["medical"],
  bistro: ["food", "local"],
  artisan: ["editorial", "local"],
  skyline: ["line"],
  forest: ["nature", "dark"],
  studio: ["visual", "portfolio"],
  marble: ["luxury", "line"],
};

export function sektorSunumProfiliniGetir(sektor: string) {
  const profil = sektorProfilleri[sektor] ?? sektorProfilleri.ozel;

  if (profil.temaOnerileri.includes(profil.varsayilanTema)) {
    return profil;
  }

  return {
    ...profil,
    temaOnerileri: [profil.varsayilanTema, ...profil.temaOnerileri],
  };
}

export function sektorVarsayilanTemasiniGetir(sektor: string) {
  return sektorSunumProfiliniGetir(sektor).varsayilanTema;
}

export function sektorTemaOnerileriniGetir(sektor: string) {
  return sektorSunumProfiliniGetir(sektor).temaOnerileri;
}

export function temaKarakterleriniGetir(tema: string) {
  return temaKarakterleri[tema] ?? [];
}
