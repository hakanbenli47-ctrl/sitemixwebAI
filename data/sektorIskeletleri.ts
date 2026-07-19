import type { BolumTuru } from "@/data/sektorSablonlari";

export type IskeletNavigasyonu =
  | "klasik"
  | "kompakt"
  | "editorial"
  | "bant"
  | "numarali"
  | "merkez"
  | "yerel"
  | "aksiyon"
  | "sol-ray"
  | "minimal"
  | "servis"
  | "kurumsal";

export type IskeletHeroDuruşu =
  | "iki-kolon"
  | "aksiyon"
  | "editorial"
  | "kompakt"
  | "dikey"
  | "guven"
  | "adres"
  | "form"
  | "asimetrik"
  | "merkez"
  | "acil"
  | "bolunmus";

export type IskeletAkisi =
  | "serit"
  | "yan-ray"
  | "editorial"
  | "katalog"
  | "rota"
  | "mozaik"
  | "yerel"
  | "rezervasyon"
  | "atolye"
  | "premium"
  | "konsol"
  | "kurumsal";

export interface SektorIskeletSecenegi {
  id: string;
  kimlik: string;
  ad: string;
  etiket: string;
  aciklama: string;
  navigasyon: IskeletNavigasyonu;
  hero: IskeletHeroDuruşu;
  akis: IskeletAkisi;
  bolumOnceligi: BolumTuru[];
  ozellikler: [string, string, string];
}

interface IskeletArketipi
  extends Omit<SektorIskeletSecenegi, "id" | "ad" | "aciklama"> {
  senaryo: string;
}

const iskeletArketipleri: IskeletArketipi[] = [
  {
    kimlik: "marka-vitrini",
    etiket: "01 · Marka vitrini",
    senaryo: "işletmenin imzasını ve ana hizmetlerini dengeli bir vitrin akışında öne çıkarır",
    navigasyon: "klasik",
    hero: "iki-kolon",
    akis: "serit",
    bolumOnceligi: ["hero", "istatistik", "hizmetler", "metin", "neden-biz", "sss", "iletisim", "form"],
    ozellikler: ["Geniş açılış sahnesi", "Ardışık tam genişlik bölümleri", "Marka ve hizmet dengesi"],
  },
  {
    kimlik: "hizli-talep",
    etiket: "02 · Hızlı talep",
    senaryo: "ziyaretçiyi ilk ekrandan teklif, randevu veya servis talebine taşıyan dönüşüm iskeleti kurar",
    navigasyon: "kompakt",
    hero: "aksiyon",
    akis: "yan-ray",
    bolumOnceligi: ["hero", "form", "iletisim", "hizmetler", "istatistik", "neden-biz", "sss", "metin"],
    ozellikler: ["Sabit talep rayı", "İletişim öncelikli akış", "Kısa karar yolu"],
  },
  {
    kimlik: "uzman-dosyasi",
    etiket: "03 · Uzman dosyası",
    senaryo: "uzmanlık yaklaşımını, iş hikâyesini ve hizmet kararlarını editoryal bir dosya gibi anlatır",
    navigasyon: "editorial",
    hero: "editorial",
    akis: "editorial",
    bolumOnceligi: ["hero", "metin", "hizmetler", "istatistik", "neden-biz", "sss", "iletisim", "form"],
    ozellikler: ["Dergi tipi açılış", "Asimetrik içerik satırları", "Hikâye önce gelir"],
  },
  {
    kimlik: "hizmet-katalogu",
    etiket: "04 · Hizmet kataloğu",
    senaryo: "çok sayıdaki hizmeti veya ürünü karşılaştırılabilir bir katalog ve karar rehberi halinde sunar",
    navigasyon: "bant",
    hero: "kompakt",
    akis: "katalog",
    bolumOnceligi: ["hero", "hizmetler", "urunler", "fiyatlar", "istatistik", "sss", "neden-biz", "iletisim", "form", "metin"],
    ozellikler: ["Kategori odaklı açılış", "Yoğun katalog ızgarası", "Karşılaştırma kolaylığı"],
  },
  {
    kimlik: "surec-rotasi",
    etiket: "05 · Süreç rotası",
    senaryo: "işin nasıl ilerlediğini ilk sıraya alır ve ziyaretçiyi adım adım teslim noktasına götürür",
    navigasyon: "numarali",
    hero: "dikey",
    akis: "rota",
    bolumOnceligi: ["hero", "neden-biz", "hizmetler", "istatistik", "metin", "sss", "iletisim", "form"],
    ozellikler: ["Dikey rota omurgası", "Süreç ilk sırada", "Numaralı bölüm ritmi"],
  },
  {
    kimlik: "guven-merkezi",
    etiket: "06 · Güven merkezi",
    senaryo: "kanıtları, çalışma ilkelerini ve sık sorulan soruları merkezde tutan güven odaklı bir yapı kurar",
    navigasyon: "merkez",
    hero: "guven",
    akis: "mozaik",
    bolumOnceligi: ["hero", "istatistik", "yorumlar", "hizmetler", "sss", "neden-biz", "metin", "iletisim", "form"],
    ozellikler: ["Kanıt panosu", "Mozaik bölüm geometrisi", "SSS ve ilkeler öncelikli"],
  },
  {
    kimlik: "yerel-servis",
    etiket: "07 · Yerel servis",
    senaryo: "hizmet bölgesini, ulaşılabilirliği ve yakın çevre güvenini ilk bakışta görünür kılar",
    navigasyon: "yerel",
    hero: "adres",
    akis: "yerel",
    bolumOnceligi: ["hero", "iletisim", "hizmetler", "istatistik", "neden-biz", "sss", "form", "metin"],
    ozellikler: ["Konum bilgi bandı", "Bölgesel hizmet rayı", "Mobil iletişim önceliği"],
  },
  {
    kimlik: "rezervasyon-masasi",
    etiket: "08 · Rezervasyon masası",
    senaryo: "tarih, uygunluk ve iletişim kararını sayfanın ana merkezi haline getirir",
    navigasyon: "aksiyon",
    hero: "form",
    akis: "rezervasyon",
    bolumOnceligi: ["hero", "form", "hizmetler", "istatistik", "neden-biz", "sss", "metin", "iletisim"],
    ozellikler: ["Formla birleşen açılış", "Uygunluk odaklı akış", "Rezervasyon adaları"],
  },
  {
    kimlik: "proje-atolyesi",
    etiket: "09 · Proje atölyesi",
    senaryo: "keşif, üretim veya uygulama kararlarını çalışma masası mantığında katmanlara ayırır",
    navigasyon: "sol-ray",
    hero: "asimetrik",
    akis: "atolye",
    bolumOnceligi: ["hero", "metin", "neden-biz", "hizmetler", "urunler", "istatistik", "sss", "iletisim", "form"],
    ozellikler: ["Masaüstünde sol navigasyon", "Atölye çalışma panosu", "Proje ve süreç birlikteliği"],
  },
  {
    kimlik: "premium-sunum",
    etiket: "10 · Premium sunum",
    senaryo: "az öğe, geniş boşluk ve güçlü tipografiyle seçkin bir marka duruşu oluşturur",
    navigasyon: "minimal",
    hero: "merkez",
    akis: "premium",
    bolumOnceligi: ["hero", "hizmetler", "metin", "istatistik", "neden-biz", "sss", "iletisim", "form"],
    ozellikler: ["Ortalanmış anıtsal açılış", "Geniş nefes alan bölümler", "Az ve güçlü içerik"],
  },
  {
    kimlik: "acil-destek",
    etiket: "11 · Acil destek",
    senaryo: "aciliyet, hizmet kapsamı ve doğrudan iletişimi teknik bir servis konsolunda birleştirir",
    navigasyon: "servis",
    hero: "acil",
    akis: "konsol",
    bolumOnceligi: ["hero", "iletisim", "hizmetler", "form", "neden-biz", "istatistik", "sss", "metin"],
    ozellikler: ["Servis durum çubuğu", "Konsol tipi bölüm panelleri", "Tek dokunuşla iletişim"],
  },
  {
    kimlik: "kurumsal-teklif",
    etiket: "12 · Kurumsal teklif",
    senaryo: "kapsam, operasyon, güven ve teklif kararlarını satın alma ekiplerine uygun bir düzende toplar",
    navigasyon: "kurumsal",
    hero: "bolunmus",
    akis: "kurumsal",
    bolumOnceligi: ["hero", "hizmetler", "istatistik", "neden-biz", "metin", "sss", "form", "iletisim"],
    ozellikler: ["Bölünmüş kurumsal açılış", "İkili karar panelleri", "Teklif formuyla kapanış"],
  },
  {
    kimlik: "teklif-rotasi",
    etiket: "13 · Teklif rotası",
    senaryo: "talebi güçlü bir açılıştan alıp kapsam, süreç ve teklif adımlarına bağlayan çizgisel bir karar yolu kurar",
    navigasyon: "klasik",
    hero: "acil",
    akis: "rota",
    bolumOnceligi: ["hero", "hizmetler", "neden-biz", "form", "istatistik", "sss", "metin", "iletisim"],
    ozellikler: ["Yüksek etkili açılış", "Teklife ilerleyen rota", "Süreç ve form bağlantısı"],
  },
  {
    kimlik: "karsilastirmali-uzmanlik",
    etiket: "14 · Karşılaştırmalı uzmanlık",
    senaryo: "uzman anlatımını yoğun seçenek kartlarıyla birleştirerek ziyaretçinin doğru hizmeti karşılaştırmasını sağlar",
    navigasyon: "kompakt",
    hero: "editorial",
    akis: "katalog",
    bolumOnceligi: ["hero", "metin", "hizmetler", "urunler", "istatistik", "sss", "form", "iletisim"],
    ozellikler: ["Editoryal uzman açılışı", "Karşılaştırma ızgarası", "Yoğun fakat düzenli tarama"],
  },
  {
    kimlik: "hikaye-ve-guven",
    etiket: "15 · Hikâye ve güven",
    senaryo: "işletme hikâyesini rezervasyon veya teklif alanıyla birleştirip kanıtları mozaik bir düzende dağıtır",
    navigasyon: "editorial",
    hero: "form",
    akis: "mozaik",
    bolumOnceligi: ["hero", "metin", "istatistik", "hizmetler", "yorumlar", "sss", "form", "iletisim"],
    ozellikler: ["Hikâye odaklı marka girişi", "Mozaik güven alanları", "Yumuşak talep geçişi"],
  },
  {
    kimlik: "katalog-rayi",
    etiket: "16 · Katalog rayı",
    senaryo: "hizmet kataloğunu sabit kalan iletişim rayıyla yan yana çalıştıran taranabilir bir satış yapısı kurar",
    navigasyon: "bant",
    hero: "guven",
    akis: "yan-ray",
    bolumOnceligi: ["hero", "hizmetler", "urunler", "fiyatlar", "istatistik", "sss", "form", "iletisim", "metin"],
    ozellikler: ["İki katlı navigasyon", "Katalog ve iletişim rayı", "Karşılaştırırken talep oluşturma"],
  },
  {
    kimlik: "saha-plani",
    etiket: "17 · Saha planı",
    senaryo: "konum ve operasyon bilgisini bölünmüş kurumsal panellerle birleştirerek saha planını görünür kılar",
    navigasyon: "numarali",
    hero: "adres",
    akis: "kurumsal",
    bolumOnceligi: ["hero", "iletisim", "hizmetler", "neden-biz", "istatistik", "form", "sss", "metin"],
    ozellikler: ["Konum odaklı açılış", "İkili saha panelleri", "Operasyon ve iletişim dengesi"],
  },
  {
    kimlik: "teknik-portfoy",
    etiket: "18 · Teknik portföy",
    senaryo: "asimetrik proje açılışını teknik konsol bölümleriyle tamamlayarak yapılan işi ve yöntemi birlikte sergiler",
    navigasyon: "merkez",
    hero: "asimetrik",
    akis: "konsol",
    bolumOnceligi: ["hero", "hizmetler", "metin", "neden-biz", "istatistik", "form", "sss", "iletisim"],
    ozellikler: ["Asimetrik portföy sahnesi", "Teknik konsol ızgarası", "İş ve yöntem birlikteliği"],
  },
  {
    kimlik: "sessiz-vitrin",
    etiket: "19 · Sessiz vitrin",
    senaryo: "yerel güveni minimal navigasyon ve geniş boşluklarla birleştiren sakin, seçkin bir vitrin oluşturur",
    navigasyon: "yerel",
    hero: "merkez",
    akis: "premium",
    bolumOnceligi: ["hero", "hizmetler", "metin", "istatistik", "neden-biz", "sss", "iletisim", "form"],
    ozellikler: ["Yerel güven işareti", "Sessiz premium açılış", "Geniş bölüm aralıkları"],
  },
  {
    kimlik: "yerel-kurumsal",
    etiket: "20 · Yerel kurumsal",
    senaryo: "kurumsal marka duruşunu bölge ve iletişim verileriyle birleştiren çift merkezli bir yapı kurar",
    navigasyon: "aksiyon",
    hero: "bolunmus",
    akis: "yerel",
    bolumOnceligi: ["hero", "istatistik", "iletisim", "hizmetler", "neden-biz", "metin", "sss", "form"],
    ozellikler: ["Bölünmüş marka açılışı", "Yerel bilgi bandı", "Kurumsal aksiyon navigasyonu"],
  },
  {
    kimlik: "hizli-planlama",
    etiket: "21 · Hızlı planlama",
    senaryo: "kompakt hizmet özetini rezervasyon çekirdeği ve sol çalışma rayıyla birleştirerek hızlı planlama sağlar",
    navigasyon: "sol-ray",
    hero: "kompakt",
    akis: "rezervasyon",
    bolumOnceligi: ["hero", "form", "hizmetler", "neden-biz", "istatistik", "sss", "metin", "iletisim"],
    ozellikler: ["Sol çalışma navigasyonu", "Kompakt bilgi özeti", "Rezervasyon çekirdeği"],
  },
  {
    kimlik: "usta-gunlugu",
    etiket: "22 · Usta günlüğü",
    senaryo: "işin ilerleyişini dikey anlatı ve atölye panolarıyla birleştiren üretim günlüğü karakteri taşır",
    navigasyon: "minimal",
    hero: "dikey",
    akis: "atolye",
    bolumOnceligi: ["hero", "metin", "neden-biz", "hizmetler", "urunler", "istatistik", "sss", "iletisim", "form"],
    ozellikler: ["Dikey anlatı girişi", "Atölye panoları", "İşçilik günlüğü ritmi"],
  },
  {
    kimlik: "dogrudan-cozum",
    etiket: "23 · Doğrudan çözüm",
    senaryo: "servis navigasyonunu dengeli bir açılış ve düz bölüm sırasıyla birleştirerek gereksiz adımları kaldırır",
    navigasyon: "servis",
    hero: "iki-kolon",
    akis: "serit",
    bolumOnceligi: ["hero", "iletisim", "hizmetler", "form", "neden-biz", "istatistik", "sss", "metin"],
    ozellikler: ["Servis durum navigasyonu", "İki kolonlu net açılış", "Doğrudan bölüm sırası"],
  },
  {
    kimlik: "karar-katalogu",
    etiket: "24 · Karar kataloğu",
    senaryo: "güçlü aksiyon açılışını kurumsal navigasyon ve katalog ızgarasıyla birleştiren kapsamlı karar sistemi kurar",
    navigasyon: "kurumsal",
    hero: "aksiyon",
    akis: "katalog",
    bolumOnceligi: ["hero", "hizmetler", "urunler", "istatistik", "neden-biz", "sss", "form", "iletisim", "metin"],
    ozellikler: ["Kurumsal karar navigasyonu", "Aksiyon odaklı açılış", "Kapsamlı katalog omurgası"],
  },
];

const sektorSenaryolari: Record<string, string[]> = {
  kuafor: [
    "Salon İmza Vitrini", "Hızlı Randevu Akışı", "Stil Danışmanı Dosyası", "Kesim ve Bakım Menüsü",
    "Saç Dönüşüm Rotası", "Uzmanlık ve Hijyen Merkezi", "Mahalle Kuaförü", "Randevu Masası",
    "Gelin Hazırlık Atölyesi", "Premium Salon", "Son Dakika Bakım", "Kurumsal Bakım Kulübü",
    "Düğün Saçı Teklif Rotası", "Stil Karşılaştırma Rehberi", "Salon Hikâyesi ve Güven", "Bakım Katalog Rayı",
    "Mobil Stil Ekibi Planı", "Renk Portföy Konsolu", "Sessiz Butik Salon", "Şube ve Kurum Bakımı",
    "Ekspres Randevu Planı", "Ustanın Stil Günlüğü", "Doğrudan Kuaför Desteği", "Saç Bakım Karar Kataloğu",
  ],
  nakliyat: [
    "Taşıma Güven Vitrini", "Hızlı Teklif Akışı", "Ekspertiz Dosyası", "Taşıma Paketleri Kataloğu",
    "Evden Eve Operasyon Rotası", "Hasarsız Teslim Merkezi", "Şehir İçi Nakliyat", "Taşınma Tarihi Masası",
    "Paketleme Atölyesi", "Premium Taşıma", "Acil Araç ve Ekip", "Kurumsal Lojistik Teklifi",
    "Taşınma Teklif Rotası", "Paket Karşılaştırma Rehberi", "Taşıma Hikâyesi ve Güven", "Nakliyat Katalog Rayı",
    "Saha ve Erişim Planı", "Operasyon Portföy Konsolu", "Sessiz Premium Taşıma", "Yerel Kurumsal Nakliyat",
    "Hızlı Taşınma Planı", "Paketleme Ustası Günlüğü", "Doğrudan Araç Desteği", "Taşıma Karar Kataloğu",
  ],
  tesisatci: [
    "Usta Servis Vitrini", "Hızlı Arıza Kaydı", "Tesisat Teşhis Dosyası", "Müdahale Kataloğu",
    "Kaçak Tespit Rotası", "Güvenli İşçilik Merkezi", "Yakın Tesisatçı", "Servis Planlama Masası",
    "Hat ve Basınç Atölyesi", "Seçkin Usta Sunumu", "Acil Su Kaçağı", "Site ve İşletme Teklifi",
    "Müdahale Teklif Rotası", "Arıza Karşılaştırma Rehberi", "Usta Hikâyesi ve Güven", "Tesisat Katalog Rayı",
    "Bina Tesisatı Saha Planı", "Teknik İşler Portföyü", "Sessiz Usta Vitrini", "Yerel Kurumsal Tesisat",
    "Hızlı Servis Planı", "Tesisat Ustası Günlüğü", "Doğrudan Kaçak Çözümü", "Tesisat Karar Kataloğu",
  ],
  elektrikci: [
    "Elektrik Servis Vitrini", "Hızlı Arıza Talebi", "Ölçüm ve Teşhis Dosyası", "Elektrik Hizmetleri Kataloğu",
    "Güvenli Müdahale Rotası", "Test ve Koruma Merkezi", "Yakın Elektrikçi", "Servis Randevu Masası",
    "Enerji Sistemleri Atölyesi", "Premium Teknik Servis", "Acil Elektrik Desteği", "Kurumsal Bakım Teklifi",
    "Elektrik Teklif Rotası", "Arıza Karşılaştırma Rehberi", "Elektrik Ustası ve Güven", "Hizmet Katalog Rayı",
    "Enerji Saha Planı", "Teknik Uygulama Portföyü", "Sessiz Teknik Vitrin", "Yerel Kurumsal Elektrik",
    "Hızlı Müdahale Planı", "Elektrik Ustası Günlüğü", "Doğrudan Enerji Çözümü", "Elektrik Karar Kataloğu",
  ],
  "oto-yikama": [
    "Araç Bakım Vitrini", "Hızlı Yıkama Talebi", "Detaylı Bakım Dosyası", "Uygulama Paketleri",
    "Araç Kabul Rotası", "Yüzey Güven Merkezi", "Yakındaki Araç Yıkama", "Yıkama Randevu Masası",
    "Detaylandırma Atölyesi", "Premium Oto Spa", "Aynı Gün Araç Bakımı", "Filo Bakım Teklifi",
    "Araç Bakım Teklif Rotası", "Paket Karşılaştırma Rehberi", "Bakım Hikâyesi ve Güven", "Oto Bakım Katalog Rayı",
    "Filo Saha Planı", "Sonuç Portföy Konsolu", "Sessiz Oto Spa", "Yerel Kurumsal Araç Bakımı",
    "Hızlı Yıkama Planı", "Detay Ustası Günlüğü", "Doğrudan Araç Bakımı", "Uygulama Karar Kataloğu",
  ],
  "hali-yikama": [
    "Temiz Sonuç Vitrini", "Hızlı Alım Talebi", "Dokuma Bakım Dosyası", "Yıkama Hizmetleri Kataloğu",
    "Barkodlu Yıkama Rotası", "Leke ve Hijyen Merkezi", "Mahalleden Alım Servisi", "Teslim Tarihi Masası",
    "Dokuma Bakım Atölyesi", "Premium Halı Bakımı", "Acil Alım Planı", "Site ve Otel Teklifi",
    "Yıkama Teklif Rotası", "Halı Türü Karşılaştırma", "Temizlik Hikâyesi ve Güven", "Halı Katalog Rayı",
    "Toplama Dağıtım Planı", "Sonuç Portföy Konsolu", "Sessiz Dokuma Vitrini", "Yerel Kurumsal Halı Bakımı",
    "Hızlı Alım Planlaması", "Dokuma Ustası Günlüğü", "Doğrudan Leke Çözümü", "Halı Bakım Karar Kataloğu",
  ],
  temizlik: [
    "Hijyen Hizmet Vitrini", "Hızlı Keşif Talebi", "Operasyon Uzmanı Dosyası", "Temizlik Paketleri",
    "Alan Kontrol Rotası", "Kalite Güvence Merkezi", "Bölgesel Temizlik Ekibi", "Ekip Planlama Masası",
    "Yüzey ve Alan Atölyesi", "Premium Temizlik", "Acil Ekip Desteği", "Kurumsal Periyodik Teklif",
    "Temizlik Teklif Rotası", "Paket Karşılaştırma Rehberi", "Ekip Hikâyesi ve Güven", "Temizlik Katalog Rayı",
    "Tesis Saha Planı", "Operasyon Portföy Konsolu", "Sessiz Hijyen Vitrini", "Yerel Kurumsal Temizlik",
    "Hızlı Ekip Planı", "Temizlik Ekibi Günlüğü", "Doğrudan Hijyen Çözümü", "Temizlik Karar Kataloğu",
  ],
  "arac-kiralama": [
    "Filo Vitrini", "Hızlı Araç Talebi", "Kiralama Danışmanı", "Araç Sınıfları Kataloğu",
    "Teslim ve İade Rotası", "Güvenli Kiralama Merkezi", "Yerel Araç Kiralama", "Uygunluk Masası",
    "Filo Seçim Atölyesi", "Premium Araç Seçkisi", "Aynı Gün Araç", "Kurumsal Filo Teklifi",
    "Kiralama Teklif Rotası", "Araç Karşılaştırma Rehberi", "Filo Hikâyesi ve Güven", "Araç Katalog Rayı",
    "Teslim Saha Planı", "Filo Portföy Konsolu", "Sessiz Premium Filo", "Yerel Kurumsal Kiralama",
    "Hızlı Kiralama Planı", "Filo Günlüğü", "Doğrudan Araç Çözümü", "Kiralama Karar Kataloğu",
  ],
  transfer: [
    "VIP Yolculuk Vitrini", "Hızlı Transfer Talebi", "Konsiyerj Dosyası", "Araç ve Rota Kataloğu",
    "Havalimanı Karşılama Rotası", "Yolculuk Güven Merkezi", "Bölgesel Transfer", "Rezervasyon Masası",
    "Rota Planlama Atölyesi", "Premium VIP Transfer", "Son Dakika Transfer", "Kurumsal Ulaşım Teklifi",
    "Transfer Teklif Rotası", "Araç ve Rota Karşılaştırma", "Yolculuk Hikâyesi ve Güven", "Transfer Katalog Rayı",
    "Karşılama Saha Planı", "VIP Yolculuk Portföyü", "Sessiz Premium Transfer", "Yerel Kurumsal Ulaşım",
    "Hızlı Rota Planı", "Şoför Yolculuk Günlüğü", "Doğrudan Transfer Çözümü", "Ulaşım Karar Kataloğu",
  ],
  mobilya: [
    "Usta İşçilik Vitrini", "Hızlı Ölçü Talebi", "Tasarımcı Proje Dosyası", "Üretim Kataloğu",
    "Ölçüden Montaja Rota", "Malzeme Güven Merkezi", "Yerel Mobilya Atölyesi", "Keşif Planlama Masası",
    "Özel Üretim Atölyesi", "Premium Mekân Tasarımı", "Hızlı Usta Desteği", "Kurumsal Proje Teklifi",
    "Mobilya Teklif Rotası", "Malzeme Karşılaştırma Rehberi", "Atölye Hikâyesi ve Güven", "Üretim Katalog Rayı",
    "Montaj Saha Planı", "Mekân Proje Portföyü", "Sessiz Tasarım Vitrini", "Yerel Kurumsal Mobilya",
    "Hızlı Keşif Planı", "Ustanın Üretim Günlüğü", "Doğrudan Özel Üretim", "Mobilya Karar Kataloğu",
  ],
};

const varsayilanSenaryolar = iskeletArketipleri.map((iskelet) => iskelet.etiket.split(" · ")[1]);

export function sektorIskeletSecenekleriniGetir(sektor: string): SektorIskeletSecenegi[] {
  const senaryolar = sektorSenaryolari[sektor] ?? varsayilanSenaryolar;

  return iskeletArketipleri.map((iskelet, index) => ({
    id: `${sektor}-iskelet-${index + 1}`,
    kimlik: iskelet.kimlik,
    ad: senaryolar[index] ?? varsayilanSenaryolar[index],
    etiket: iskelet.etiket,
    aciklama: `${senaryolar[index] ?? varsayilanSenaryolar[index]}, ${iskelet.senaryo}. Bu seçim renk paletini değil, sitenin gerçek sayfa omurgasını değiştirir.`,
    navigasyon: iskelet.navigasyon,
    hero: iskelet.hero,
    akis: iskelet.akis,
    bolumOnceligi: [...iskelet.bolumOnceligi],
    ozellikler: [...iskelet.ozellikler] as [string, string, string],
  }));
}

export function sektorIskeletiniGetir(sektor: string, iskeletId?: string) {
  const secenekler = sektorIskeletSecenekleriniGetir(sektor);

  return (
    secenekler.find((secenek) => secenek.id === iskeletId) ??
    secenekler.find((secenek) => secenek.kimlik === iskeletId) ??
    secenekler[0]
  );
}

export function sektorVarsayilanIskeletiniGetir(sektor: string) {
  return sektorIskeletSecenekleriniGetir(sektor)[0]?.id;
}

export const SEKTOR_BASINA_ISKELET_SAYISI = iskeletArketipleri.length;
