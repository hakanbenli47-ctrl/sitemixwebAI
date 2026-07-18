export type SektorHareketi = "akiskan" | "donen" | "nabiz" | "salinan";

export interface SektorSahneDili {
  hareket: SektorHareketi;
  etiket: string;
  motif: string;
}

export interface SektorKararNoktasi {
  etiket: string;
  deger: string;
}

export type SektorOperasyonAilesi =
  | "otomotiv"
  | "bakim"
  | "temizlik"
  | "hijyen"
  | "teknik"
  | "lojistik"
  | "ulasim";

export type SektorKararPaneliTuru =
  | "yikama-paketi"
  | "yuzey-analizi"
  | "kaplama-plani"
  | "bakim-randevusu"
  | "sac-randevusu"
  | "berber-randevusu"
  | "temizlik-kapsami"
  | "kumas-analizi"
  | "hali-takibi"
  | "risk-protokolu"
  | "elektrik-teshisi"
  | "tesisat-teshisi"
  | "kombi-teshisi"
  | "tasima-teklifi"
  | "transfer-rezervasyonu"
  | "arac-kiralama";

export type ProfesyonelAnaSayfaBolumu =
  | "hero"
  | "guven"
  | "hizmetler"
  | "surec"
  | "hikaye"
  | "galeri"
  | "sss"
  | "iletisim";

export interface SektorIcerikSemasi {
  heroEtiketi: string;
  heroBasligi: string;
  heroAciklamasi: string;
  anaAksiyon: string;
  ikincilAksiyon: string;
  guvenEtiketi: string;
  hizmetEtiketi: string;
  surecEtiketi: string;
  hikayeEtiketi: string;
  sssEtiketi: string;
  iletisimEtiketi: string;
  anaSayfaAkisi: ProfesyonelAnaSayfaBolumu[];
}

export interface SektorOperasyonProfili {
  aile: SektorOperasyonAilesi;
  panelTuru: SektorKararPaneliTuru;
  kod: string;
  ustEtiket: string;
  durum: string;
  adimlar: [string, string, string];
  metrikler: [SektorKararNoktasi, SektorKararNoktasi];
  alanlar: [SektorKararNoktasi, SektorKararNoktasi, SektorKararNoktasi];
  secimEtiketi: string;
  secenekler: [string, string, string];
  sonuc: SektorKararNoktasi;
  icerikSemasi: SektorIcerikSemasi;
}

export const SECILI_IS_GORSEL_LIMITI = 4;

const sektorDilleri: Record<string, SektorSahneDili> = {
  "oto-yikama": { hareket: "akiskan", etiket: "Temiz yüzey", motif: "akış, koruma ve parlaklık" },
  "oto-detaylandirma": { hareket: "salinan", etiket: "Detay işçiliği", motif: "hassas yüzey ve kusursuz sonuç" },
  "arac-kaplama": { hareket: "donen", etiket: "Katmanlı koruma", motif: "film, yüzey ve uygulama" },
  "cam-balkon": { hareket: "salinan", etiket: "Şeffaf mekân", motif: "mimari çizgi ve ölçü" },
  tente: { hareket: "donen", etiket: "Akıllı gölge", motif: "ışık, gölge ve konfor" },
  tadilat: { hareket: "nabiz", etiket: "Planlı dönüşüm", motif: "ölçü, uygulama ve teslim" },
  dekorasyon: { hareket: "salinan", etiket: "Mekân karakteri", motif: "form, doku ve denge" },
  temizlik: { hareket: "akiskan", etiket: "Hijyen standardı", motif: "temiz ritim ve güven" },
  "koltuk-yikama": { hareket: "akiskan", etiket: "Kumaş bakımı", motif: "lif, leke ve temizlik" },
  "hali-yikama": { hareket: "akiskan", etiket: "Kontrollü yıkama", motif: "doku, süreç ve teslim" },
  ilaclama: { hareket: "nabiz", etiket: "Güvenli müdahale", motif: "koruma, kontrol ve takip" },
  "guzellik-salonu": { hareket: "salinan", etiket: "Bakım ritüeli", motif: "zarafet, bakım ve sonuç" },
  kuafor: { hareket: "salinan", etiket: "Stil imzası", motif: "kesim, renk ve hareket" },
  berber: { hareket: "nabiz", etiket: "Usta dokunuşu", motif: "keskin çizgi ve gelenek" },
  diyetisyen: { hareket: "akiskan", etiket: "Dengeli yaşam", motif: "denge, takip ve gelişim" },
  psikolog: { hareket: "nabiz", etiket: "Güvenli görüşme", motif: "sakinlik, mahremiyet ve güven" },
  fizyoterapist: { hareket: "akiskan", etiket: "Hareket planı", motif: "ilerleme, denge ve takip" },
  "dis-klinigi": { hareket: "nabiz", etiket: "Klinik güven", motif: "temiz, ölçülü ve uzman" },
  veteriner: { hareket: "salinan", etiket: "Dost sağlığı", motif: "şefkat, bakım ve erişim" },
  emlak: { hareket: "salinan", etiket: "Doğru portföy", motif: "konum, değer ve güven" },
  mimarlik: { hareket: "donen", etiket: "Mimari yaklaşım", motif: "ızgara, oran ve bağlam" },
  fotografci: { hareket: "donen", etiket: "Görsel hikâye", motif: "odak, kadraj ve anlatı" },
  "dugun-salonu": { hareket: "salinan", etiket: "Davet atmosferi", motif: "kutlama, ritim ve plan" },
  "spor-salonu": { hareket: "nabiz", etiket: "Performans alanı", motif: "enerji, tempo ve gelişim" },
  anaokulu: { hareket: "salinan", etiket: "Güvenli gelişim", motif: "oyun, keşif ve güven" },
  "ozel-egitim-kursu": { hareket: "akiskan", etiket: "Öğrenme yolu", motif: "seviye, kazanım ve ilerleme" },
  matbaa: { hareket: "donen", etiket: "Baskı sistemi", motif: "renk, katman ve üretim" },
  cicekci: { hareket: "salinan", etiket: "Taze aranjman", motif: "doğal form ve teslim" },
  pastane: { hareket: "salinan", etiket: "Butik lezzet", motif: "katman, tat ve kutlama" },
  mobilya: { hareket: "salinan", etiket: "Usta üretim", motif: "malzeme, ölçü ve işçilik" },
  elektrikci: { hareket: "nabiz", etiket: "Güvenli enerji", motif: "akım, kontrol ve müdahale" },
  tesisatci: { hareket: "akiskan", etiket: "Yerinde çözüm", motif: "akış, tespit ve onarım" },
  "kombi-servisi": { hareket: "nabiz", etiket: "Teknik ısı", motif: "ısı, bakım ve kontrol" },
  nakliyat: { hareket: "akiskan", etiket: "Planlı taşıma", motif: "rota, güven ve teslim" },
  transfer: { hareket: "akiskan", etiket: "Kesintisiz rota", motif: "konum, zaman ve konfor" },
  "arac-kiralama": { hareket: "salinan", etiket: "Kolay kiralama", motif: "araç, erişim ve rota" },
};

const sektorKararNoktalari: Record<
  string,
  [SektorKararNoktasi, SektorKararNoktasi, SektorKararNoktasi]
> = {
  "oto-yikama": [
    { etiket: "Araç kabul formu", deger: "Mevcut durum ve yüzey kaydı" },
    { etiket: "Yıkama reçetesi", deger: "Yüzeye uygun ürün ve yöntem" },
    { etiket: "Teslim kontrolü", deger: "Kuruluk, yüzey ve son tur" },
  ],
  "oto-detaylandirma": [
    { etiket: "Yüzey ölçümü", deger: "Boya geçmişi ve kusur haritası" },
    { etiket: "İşlem reçetesi", deger: "Düzeltme, parlatma ve koruma" },
    { etiket: "Kalite kontrolü", deger: "Işık altında panel panel teslim" },
  ],
  "arac-kaplama": [
    { etiket: "Yüzey kabulü", deger: "Boya geçmişi ve risk kaydı" },
    { etiket: "Film ve kesim planı", deger: "Malzeme, lot ve parça yöntemi" },
    { etiket: "Kürlenme teslimi", deger: "Kenar, kabarcık ve bakım kontrolü" },
  ],
  "cam-balkon": [
    { etiket: "Keşif", deger: "Net ölçü ve kullanım" },
    { etiket: "Sistem", deger: "Cam ve taşıyıcı seçimi" },
    { etiket: "Montaj", deger: "Ayar ve sızdırmazlık" },
  ],
  tente: [
    { etiket: "Alan analizi", deger: "Güneş ve kullanım yönü" },
    { etiket: "Sistem seçimi", deger: "Kumaş ve taşıyıcı" },
    { etiket: "Montaj kontrolü", deger: "Gergi, eğim ve hareket" },
  ],
  tadilat: [
    { etiket: "Keşif", deger: "İş kalemleri ve ölçü" },
    { etiket: "İş programı", deger: "Sıra, ekip ve takvim" },
    { etiket: "Teslim", deger: "Kontrol ve eksik listesi" },
  ],
  dekorasyon: [
    { etiket: "Mekân okuması", deger: "İhtiyaç ve kullanım" },
    { etiket: "Malzeme dili", deger: "Doku, renk ve dayanım" },
    { etiket: "Uygulama dengesi", deger: "Bütünlük ve son kontrol" },
  ],
  temizlik: [
    { etiket: "Keşif kontrol listesi", deger: "Alan, görev ve kritik noktalar" },
    { etiket: "Yüzey matrisi", deger: "Ürün, ekipman ve uygulama planı" },
    { etiket: "Hijyen teslimi", deger: "Kontrol listesi ve sorumlu onayı" },
  ],
  "koltuk-yikama": [
    { etiket: "Etiket ve renk testi", deger: "Kumaş yapısı ve dayanım kaydı" },
    { etiket: "Leke protokolü", deger: "Bölgesel ürün ve ekstraksiyon" },
    { etiket: "Nem takibi", deger: "Kuruma koşulu ve kullanım zamanı" },
  ],
  "hali-yikama": [
    { etiket: "Barkodlu kabul", deger: "Dokuma, leke ve hasar kaydı" },
    { etiket: "Yıkama reçetesi", deger: "Dokuya uygun hat ve ürün" },
    { etiket: "Kontrollü iade", deger: "Kurutma, son kontrol ve paketleme" },
  ],
  ilaclama: [
    { etiket: "Risk keşif kaydı", deger: "Tür, yoğunluk ve giriş noktaları" },
    { etiket: "Uygulama protokolü", deger: "Ürün, yöntem ve güvenli bekleme" },
    { etiket: "Takip raporu", deger: "Kontrol tarihi ve koruyucu önlem" },
  ],
  "guzellik-salonu": [
    { etiket: "Ön görüşme", deger: "Cilt geçmişi, hedef ve uygunluk" },
    { etiket: "Hijyen protokolü", deger: "Hazırlık, ekipman ve tek kullanımlıklar" },
    { etiket: "Bakım sonrası", deger: "Ev rutini, uyarılar ve takip" },
  ],
  kuafor: [
    { etiket: "Saç geçmişi", deger: "Yapı, işlem ve renk kaydı" },
    { etiket: "Teknik reçete", deger: "Kesim, renk formülü ve süre" },
    { etiket: "Ev bakım planı", deger: "Kalıcılık, ürün ve kullanım" },
  ],
  berber: [
    { etiket: "Yüz ve saç analizi", deger: "Form, yoğunluk ve kesim çizgisi" },
    { etiket: "Hijyenli ekipman", deger: "Dezenfeksiyon ve kişisel hazırlık" },
    { etiket: "Bakım periyodu", deger: "Kesim formu ve sakal devamlılığı" },
  ],
  diyetisyen: [
    { etiket: "İlk değerlendirme", deger: "Yaşam düzeni ve hedef" },
    { etiket: "Kişisel plan", deger: "Uygulanabilir beslenme" },
    { etiket: "Düzenli takip", deger: "Ölçüm ve sürdürülebilirlik" },
  ],
  psikolog: [
    { etiket: "Görüşme çerçevesi", deger: "İhtiyaç ve beklenti" },
    { etiket: "Mahremiyet", deger: "Güvenli iletişim alanı" },
    { etiket: "Süreç uyumu", deger: "Düzenli değerlendirme" },
  ],
  fizyoterapist: [
    { etiket: "Hareket değerlendirmesi", deger: "İşlev ve kısıtlılık" },
    { etiket: "Kişisel program", deger: "Uygulama ve egzersiz" },
    { etiket: "İlerleme takibi", deger: "Hareket ve yük kontrolü" },
  ],
  "dis-klinigi": [
    { etiket: "Muayene", deger: "Ağız ve diş değerlendirmesi" },
    { etiket: "Tedavi planı", deger: "Seçenek, sıra ve kapsam" },
    { etiket: "Klinik takip", deger: "Kontrol ve bakım" },
  ],
  veteriner: [
    { etiket: "Ön değerlendirme", deger: "Belirti ve sağlık geçmişi" },
    { etiket: "Tanı ve destek", deger: "Uygun bakım yaklaşımı" },
    { etiket: "Kontrol", deger: "İyileşme ve koruyucu bakım" },
  ],
  emlak: [
    { etiket: "İhtiyaç profili", deger: "Bütçe, tip ve beklenti" },
    { etiket: "Bölge analizi", deger: "Konum ve değer dengesi" },
    { etiket: "İşlem takibi", deger: "Belge, teklif ve sonuç" },
  ],
  mimarlik: [
    { etiket: "Bağlam", deger: "Mekân, ihtiyaç ve çevre" },
    { etiket: "Tasarım kararı", deger: "İşlev, oran ve malzeme" },
    { etiket: "Uygulama kontrolü", deger: "Detay ve saha uyumu" },
  ],
  fotografci: [
    { etiket: "Brief", deger: "Amaç, an ve kullanım" },
    { etiket: "Çekim dili", deger: "Işık, kadraj ve atmosfer" },
    { etiket: "Teslim seçkisi", deger: "Düzenleme ve format" },
  ],
  "dugun-salonu": [
    { etiket: "Tarih ve kapasite", deger: "Uygun salon düzeni" },
    { etiket: "Paket planı", deger: "Menü, hizmet ve kapsam" },
    { etiket: "Etkinlik akışı", deger: "Karşılama ve zamanlama" },
  ],
  "spor-salonu": [
    { etiket: "Hedef analizi", deger: "Seviye ve performans" },
    { etiket: "Program", deger: "Ders, yük ve süre" },
    { etiket: "Performans takibi", deger: "Ölçüm ve gelişim" },
  ],
  anaokulu: [
    { etiket: "Yaş ve gelişim", deger: "Uygun program grubu" },
    { etiket: "Güvenli ortam", deger: "Rutin, alan ve ekip" },
    { etiket: "Veli iletişimi", deger: "Günlük paylaşım ve takip" },
  ],
  "ozel-egitim-kursu": [
    { etiket: "Seviye", deger: "Başlangıç ve hedef analizi" },
    { etiket: "Program kazanımı", deger: "İçerik ve yöntem" },
    { etiket: "Gelişim takibi", deger: "Ölçme ve geri bildirim" },
  ],
  matbaa: [
    { etiket: "Ürün ve malzeme", deger: "Kullanıma uygun seçim" },
    { etiket: "Renk ve baskı", deger: "Dosya ve üretim kontrolü" },
    { etiket: "Termin", deger: "Adet, prova ve teslim" },
  ],
  cicekci: [
    { etiket: "Gönderim amacı", deger: "Duygu ve ortam uyumu" },
    { etiket: "Aranjman", deger: "Çiçek, renk ve form" },
    { etiket: "Teslim", deger: "Saat ve tazelik kontrolü" },
  ],
  pastane: [
    { etiket: "Etkinlik", deger: "Tema ve sunum dili" },
    { etiket: "Porsiyon ve tasarım", deger: "Kişi sayısına uygun plan" },
    { etiket: "Üretim ve teslim", deger: "Tazelik ve zamanlama" },
  ],
  mobilya: [
    { etiket: "Ölçü", deger: "Mekân ve kullanım analizi" },
    { etiket: "Malzeme ve detay", deger: "Dayanım ve görünüm" },
    { etiket: "Üretim ve montaj", deger: "Atölyeden yerleşime" },
  ],
  elektrikci: [
    { etiket: "Güvenli izolasyon", deger: "Enerjiyi kesme ve risk kontrolü" },
    { etiket: "Ölçümlü teşhis", deger: "Hat, yük ve arıza bulgusu" },
    { etiket: "Koruma testi", deger: "Çalışma, kaçak ve servis raporu" },
  ],
  tesisatci: [
    { etiket: "Kaynak tespiti", deger: "Kaçak, tıkanıklık ve aciliyet" },
    { etiket: "Müdahale onayı", deger: "Yöntem, kapsam ve parça bilgisi" },
    { etiket: "Sızdırmazlık testi", deger: "Basınç, akış ve teslim raporu" },
  ],
  "kombi-servisi": [
    { etiket: "Cihaz servis kaydı", deger: "Marka, model, hata ve geçmiş" },
    { etiket: "Bakım ve onay", deger: "Ölçüm, işlem ve parça gerekçesi" },
    { etiket: "Güvenlik testi", deger: "Yanma, baca ve sızdırmazlık raporu" },
  ],
  nakliyat: [
    { etiket: "Ekspertiz ve envanter", deger: "Kat, erişim, hacim ve özel parçalar" },
    { etiket: "Kodlu paketleme", deger: "Oda, koli ve yükleme sırası" },
    { etiket: "Teslim tutanağı", deger: "Yerleşim, kontrol ve tamamlanma kaydı" },
  ],
  transfer: [
    { etiket: "Konum ve zaman", deger: "Alış ve bırakış planı" },
    { etiket: "Yolcu ve bagaj", deger: "Kapasiteye uygun seçim" },
    { etiket: "Araç ve konfor", deger: "Sınıf ve rota uyumu" },
  ],
  "arac-kiralama": [
    { etiket: "Tarih", deger: "Alış ve iade aralığı" },
    { etiket: "Araç sınıfı", deger: "Kişi, rota ve bagaj" },
    { etiket: "Teslim koşulları", deger: "Belge, güvence ve kontrol" },
  ],
};

const varsayilanDil: SektorSahneDili = {
  hareket: "akiskan",
  etiket: "Profesyonel hizmet",
  motif: "güven, süreç ve hareket",
};

const sektorOperasyonProfilleri: Record<string, SektorOperasyonProfili> = {
  "oto-yikama": {
    aile: "otomotiv",
    panelTuru: "yikama-paketi",
    kod: "İş emri 01",
    ustEtiket: "ARAÇ KABUL VE İŞ EMRİ",
    durum: "Aynı gün uygunluk",
    adimlar: ["Kabul kaydı", "Yıkama reçetesi", "Son kontrol"],
    metrikler: [
      { etiket: "Tahmini süre", deger: "45–120 dk" },
      { etiket: "Teslim", deger: "Kontrol listeli" },
    ],
    alanlar: [
      { etiket: "Araç sınıfı", deger: "Binek / SUV" },
      { etiket: "Öncelik", deger: "İç mekân + dış yüzey" },
      { etiket: "Teslim zamanı", deger: "Bugün" },
    ],
    secimEtiketi: "Yıkama kapsamı",
    secenekler: ["İç–dış", "Detaylı", "Koruma"],
    sonuc: { etiket: "Önerilen başlangıç", deger: "Araç kabulü ve paket seçimi" },
    icerikSemasi: {
      heroEtiketi: "Paket seçimi ve araç kabulü",
      heroBasligi: "Aracınız için doğru yıkama kapsamını baştan netleştirin.",
      heroAciklamasi: "Araç sınıfını, yüzey durumunu ve teslim beklentinizi birlikte değerlendirerek gereksiz işlemlerden uzak, açık bir bakım planı oluşturuyoruz.",
      anaAksiyon: "Yıkama planını oluşturun",
      ikincilAksiyon: "Paketleri karşılaştırın",
      guvenEtiketi: "Teslim standardı",
      hizmetEtiketi: "Kapsama göre paketler",
      surecEtiketi: "Kabulden teslim kontrolüne",
      hikayeEtiketi: "Yıkama standardımız",
      sssEtiketi: "Aracınızı getirmeden önce",
      iletisimEtiketi: "Araç ve zaman bilgisi",
      anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"],
    },
  },
  "oto-detaylandirma": {
    aile: "otomotiv",
    panelTuru: "yuzey-analizi",
    kod: "Analiz dosyası 02",
    ustEtiket: "YÜZEY ANALİZ DOSYASI",
    durum: "Ön analiz gerekli",
    adimlar: ["Kusur haritası", "İşlem reçetesi", "Panel teslimi"],
    metrikler: [
      { etiket: "Kontrol", deger: "Panel bazlı" },
      { etiket: "Teslim", deger: "Işık altında" },
    ],
    alanlar: [
      { etiket: "Boya durumu", deger: "İnce çizik / matlık" },
      { etiket: "Hedef", deger: "Düzeltme + parlaklık" },
      { etiket: "Koruma", deger: "Seramik seçenekli" },
    ],
    secimEtiketi: "Uygulama seviyesi",
    secenekler: ["Yüzey analizi", "Boya düzeltme", "Uzun koruma"],
    sonuc: { etiket: "Doğru sonraki adım", deger: "Işık altında yüzey değerlendirmesi" },
    icerikSemasi: {
      heroEtiketi: "Boya düzeltme ve yüzey koruma",
      heroBasligi: "Yüzeyi analiz edin; uygulamayı kanıta göre seçin.",
      heroAciklamasi: "Parlaklık vaadiyle değil, boya geçmişi, kusur seviyesi ve beklenen koruma süresiyle karar veren profesyonel bir detaylandırma akışı sunuyoruz.",
      anaAksiyon: "Yüzey analizi isteyin",
      ikincilAksiyon: "Uygulamaları inceleyin",
      guvenEtiketi: "Ölçümlü işçilik",
      hizmetEtiketi: "İhtiyaca göre uygulamalar",
      surecEtiketi: "Analizden kontrollü teslime",
      hikayeEtiketi: "Detay atölyesi yaklaşımımız",
      sssEtiketi: "Uygulama kararı öncesi",
      iletisimEtiketi: "Araç yüzeyini değerlendirelim",
      anaSayfaAkisi: ["hero", "guven", "hizmetler", "surec", "hikaye", "sss", "iletisim"],
    },
  },
  "arac-kaplama": {
    aile: "otomotiv",
    panelTuru: "kaplama-plani",
    kod: "Uygulama dosyası 03",
    ustEtiket: "FİLM VE YÜZEY DOSYASI",
    durum: "Film seçimi bekleniyor",
    adimlar: ["Yüzey kabulü", "Kesim planı", "Kenar kontrolü"],
    metrikler: [
      { etiket: "Uygulama", deger: "Parça bazlı" },
      { etiket: "Teslim", deger: "Kürlenme sonrası" },
    ],
    alanlar: [
      { etiket: "Kaplama alanı", deger: "Tam araç / bölgesel" },
      { etiket: "Film amacı", deger: "Koruma / renk değişimi" },
      { etiket: "Yüzey geçmişi", deger: "Kontrol edilecek" },
    ],
    secimEtiketi: "Film yaklaşımı",
    secenekler: ["PPF", "Renk değişimi", "Cam filmi"],
    sonuc: { etiket: "Teklif için gereken", deger: "Model, kapsam ve film tercihi" },
    icerikSemasi: {
      heroEtiketi: "Film, kapsam ve işçilik planı",
      heroBasligi: "Kaplama kararını yalnız renge değil, yüzeye ve işçiliğe göre verin.",
      heroAciklamasi: "Film türünü, uygulanacak parçaları, kenar dönüşlerini ve bakım koşullarını tekliften önce görünür hâle getiriyoruz.",
      anaAksiyon: "Kaplama kapsamını belirleyin",
      ikincilAksiyon: "Film seçeneklerini görün",
      guvenEtiketi: "Malzeme ve işçilik şeffaflığı",
      hizmetEtiketi: "Kaplama çözümleri",
      surecEtiketi: "Yüzey kabulünden kürlenmeye",
      hikayeEtiketi: "Malzeme ve işçilik yaklaşımımız",
      sssEtiketi: "Film seçmeden önce",
      iletisimEtiketi: "Araç modelini ve kapsamı paylaşın",
      anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"],
    },
  },
  "guzellik-salonu": {
    aile: "bakim",
    panelTuru: "bakim-randevusu",
    kod: "Danışan kaydı 01",
    ustEtiket: "KİŞİSEL BAKIM DOSYASI",
    durum: "Yeni randevu",
    adimlar: ["Ön görüşme", "Hijyen hazırlığı", "Bakım sonrası"],
    metrikler: [
      { etiket: "Seans", deger: "45–90 dk" },
      { etiket: "Takip", deger: "Kişiye özel" },
    ],
    alanlar: [
      { etiket: "Bakım alanı", deger: "Cilt / kaş / bölgesel" },
      { etiket: "Tercih", deger: "İlk görüşme" },
      { etiket: "Uygun zaman", deger: "Bu hafta" },
    ],
    secimEtiketi: "Randevu adımı",
    secenekler: ["Hizmet", "Uzman", "Saat"],
    sonuc: { etiket: "İlk görüşmede", deger: "Uygunluk, süre ve bakım planı" },
    icerikSemasi: {
      heroEtiketi: "Hizmet, süre ve randevu",
      heroBasligi: "Bakımınızı güzel görünen bir listeden değil, size uygun bir plandan seçin.",
      heroAciklamasi: "Uygulama kapsamını, tahmini süreyi, hijyen yaklaşımını ve bakım sonrası beklentiyi randevudan önce açıkça paylaşıyoruz.",
      anaAksiyon: "Randevunuzu planlayın",
      ikincilAksiyon: "Bakım menüsünü görün",
      guvenEtiketi: "Uygunluk ve hijyen",
      hizmetEtiketi: "Bakım menüsü",
      surecEtiketi: "Görüşmeden bakım sonrasına",
      hikayeEtiketi: "Uzman bakım yaklaşımımız",
      sssEtiketi: "Randevu öncesi bilmeniz gerekenler",
      iletisimEtiketi: "Size uygun zamanı bulalım",
      anaSayfaAkisi: ["hero", "hizmetler", "hikaye", "guven", "surec", "sss", "iletisim"],
    },
  },
  kuafor: {
    aile: "bakim",
    panelTuru: "sac-randevusu",
    kod: "Randevu dosyası 02",
    ustEtiket: "SAÇ TEKNİK DOSYASI",
    durum: "Danışmanlıkla başlar",
    adimlar: ["Saç geçmişi", "Teknik reçete", "Ev bakım planı"],
    metrikler: [
      { etiket: "Süre", deger: "İşleme göre" },
      { etiket: "Reçete", deger: "Kayıtlı" },
    ],
    alanlar: [
      { etiket: "Hizmet", deger: "Kesim / renk / bakım" },
      { etiket: "Saç geçmişi", deger: "İlk görüşmede" },
      { etiket: "Stil hedefi", deger: "Birlikte netleşir" },
    ],
    secimEtiketi: "Randevu akışı",
    secenekler: ["Hizmet seç", "Süreyi gör", "Saati ayır"],
    sonuc: { etiket: "Teknik yaklaşım", deger: "Form, renk ve ev bakım notu" },
    icerikSemasi: {
      heroEtiketi: "Saç danışmanlığı ve randevu",
      heroBasligi: "Kesimden renge, saçınıza özel net bir plan oluşturun.",
      heroAciklamasi: "Saç geçmişini, istediğiniz görünümü ve günlük bakım rutininizi birlikte değerlendirerek hizmeti ve süreyi baştan anlaşılır hâle getiriyoruz.",
      anaAksiyon: "Saç randevusu oluşturun",
      ikincilAksiyon: "Hizmet ve süreleri görün",
      guvenEtiketi: "Teknik reçete",
      hizmetEtiketi: "Saç hizmetleri",
      surecEtiketi: "Danışmanlıktan son şekle",
      hikayeEtiketi: "Stil ve teknik yaklaşımımız",
      sssEtiketi: "Saç işlemi öncesi",
      iletisimEtiketi: "İstediğiniz görünümü anlatın",
      anaSayfaAkisi: ["hero", "hizmetler", "hikaye", "guven", "surec", "sss", "iletisim"],
    },
  },
  berber: {
    aile: "bakim",
    panelTuru: "berber-randevusu",
    kod: "Hizmet kartı 03",
    ustEtiket: "USTA KABUL KARTI",
    durum: "Bugün uygun saatler",
    adimlar: ["Yüz-saç analizi", "Ekipman hijyeni", "Bakım periyodu"],
    metrikler: [
      { etiket: "Hizmet", deger: "30–60 dk" },
      { etiket: "Usta", deger: "Seçilebilir" },
    ],
    alanlar: [
      { etiket: "Hizmet", deger: "Saç + sakal" },
      { etiket: "Usta tercihi", deger: "Seçilebilir" },
      { etiket: "Saat", deger: "Bugün / yarın" },
    ],
    secimEtiketi: "Hızlı randevu",
    secenekler: ["Kesim", "Sakal", "Bakım paketi"],
    sonuc: { etiket: "Net hizmet", deger: "Usta, süre ve ücret bilgisi" },
    icerikSemasi: {
      heroEtiketi: "Usta, hizmet ve saat seçimi",
      heroBasligi: "Bakımınızı bekleyerek değil, saatini bilerek planlayın.",
      heroAciklamasi: "Kesim, sakal ve bakım hizmetlerini süreleriyle birlikte görün; yüz ve saç formunuza uygun hizmet için kolayca randevu oluşturun.",
      anaAksiyon: "Uygun saatleri görün",
      ikincilAksiyon: "Hizmet menüsünü açın",
      guvenEtiketi: "Hijyen ve usta standardı",
      hizmetEtiketi: "Berber hizmetleri",
      surecEtiketi: "Kabulden son kontrole",
      hikayeEtiketi: "Ustalık ve bakım anlayışımız",
      sssEtiketi: "Randevu ve bakım soruları",
      iletisimEtiketi: "Saatinizi ayırın",
      anaSayfaAkisi: ["hero", "hizmetler", "hikaye", "guven", "surec", "sss", "iletisim"],
    },
  },
  temizlik: {
    aile: "temizlik",
    panelTuru: "temizlik-kapsami",
    kod: "Operasyon planı 01",
    ustEtiket: "HİJYEN OPERASYON PLANI",
    durum: "Ücretsiz ön değerlendirme",
    adimlar: ["Alan keşfi", "Yüzey matrisi", "Teslim onayı"],
    metrikler: [
      { etiket: "Ekip", deger: "Kapsama göre" },
      { etiket: "Teslim", deger: "Kontrol listeli" },
    ],
    alanlar: [
      { etiket: "Alan türü", deger: "Ev / ofis / inşaat sonrası" },
      { etiket: "Yaklaşık alan", deger: "Metrekare ve bölüm" },
      { etiket: "Periyot", deger: "Tek sefer / düzenli" },
    ],
    secimEtiketi: "Hizmet kapsamı",
    secenekler: ["Bireysel", "Kurumsal", "Periyodik"],
    sonuc: { etiket: "Teklifin temeli", deger: "Alan, görev listesi ve çalışma saati" },
    icerikSemasi: {
      heroEtiketi: "Alan, kapsam ve periyot planı",
      heroBasligi: "Temizlik hizmetini metrekareden önce yapılacak işler üzerinden planlayın.",
      heroAciklamasi: "Alan türünü, kritik yüzeyleri, çalışma saatini ve görev sıklığını netleştirerek karşılaştırılabilir bir hizmet kapsamı hazırlıyoruz.",
      anaAksiyon: "Temizlik kapsamını oluşturun",
      ikincilAksiyon: "Hizmet alanlarını görün",
      guvenEtiketi: "Kontrol listeli teslim",
      hizmetEtiketi: "Alan bazlı çözümler",
      surecEtiketi: "Keşiften kalite kontrolüne",
      hikayeEtiketi: "Hijyen operasyon yaklaşımımız",
      sssEtiketi: "Teklif istemeden önce",
      iletisimEtiketi: "Alan bilgilerini paylaşın",
      anaSayfaAkisi: ["hero", "guven", "hizmetler", "surec", "hikaye", "sss", "iletisim"],
    },
  },
  "koltuk-yikama": {
    aile: "temizlik",
    panelTuru: "kumas-analizi",
    kod: "Kabul kaydı 02",
    ustEtiket: "KUMAŞ KABUL PROTOKOLÜ",
    durum: "Fotoğraflı ön analiz",
    adimlar: ["Etiket testi", "Leke protokolü", "Kuruma kontrolü"],
    metrikler: [
      { etiket: "Kuruma", deger: "Koşula bağlı" },
      { etiket: "Test", deger: "Kumaş bazlı" },
    ],
    alanlar: [
      { etiket: "Döşeme", deger: "Koltuk / köşe / yatak" },
      { etiket: "Kumaş", deger: "Etiket veya fotoğraf" },
      { etiket: "Leke durumu", deger: "Bölgesel / yoğun" },
    ],
    secimEtiketi: "Ön değerlendirme",
    secenekler: ["Kumaşı tanı", "Lekeyi kaydet", "Kuruma planla"],
    sonuc: { etiket: "Doğru yöntem", deger: "Renk testi ve kontrollü ekstraksiyon" },
    icerikSemasi: {
      heroEtiketi: "Kumaş analizi ve kuruma planı",
      heroBasligi: "Kumaşı tanımadan yıkamaya başlamıyoruz.",
      heroAciklamasi: "Kumaş etiketini, renk dayanımını, leke türünü ve ortamın kuruma koşullarını inceleyerek güvenli uygulama yöntemini belirliyoruz.",
      anaAksiyon: "Fotoğrafla ön analiz isteyin",
      ikincilAksiyon: "Yıkama kapsamını görün",
      guvenEtiketi: "Kumaş güvenliği",
      hizmetEtiketi: "Döşeme türüne göre hizmet",
      surecEtiketi: "Testten kontrollü kurumaya",
      hikayeEtiketi: "Kumaş güvenliği yaklaşımımız",
      sssEtiketi: "Yıkama ve kuruma hakkında",
      iletisimEtiketi: "Koltuk fotoğrafını gönderin",
      anaSayfaAkisi: ["hero", "guven", "hizmetler", "surec", "hikaye", "sss", "iletisim"],
    },
  },
  "hali-yikama": {
    aile: "temizlik",
    panelTuru: "hali-takibi",
    kod: "Takip kaydı 03",
    ustEtiket: "BARKODLU HALI KABULÜ",
    durum: "Adım adım takip",
    adimlar: ["Dokuma kaydı", "Yıkama reçetesi", "Paketli iade"],
    metrikler: [
      { etiket: "Kabul", deger: "Barkodlu" },
      { etiket: "İade", deger: "Planlı rota" },
    ],
    alanlar: [
      { etiket: "Halı türü", deger: "Makine / yün / hassas" },
      { etiket: "Durum", deger: "Leke ve hasar kaydı" },
      { etiket: "Teslimat", deger: "Adresten alım" },
    ],
    secimEtiketi: "Takip hattı",
    secenekler: ["Kabul", "Yıkama", "Kurutma ve iade"],
    sonuc: { etiket: "Kayıt standardı", deger: "Dokuma, leke, adet ve teslim bilgisi" },
    icerikSemasi: {
      heroEtiketi: "Barkodlu kabul ve teslim takibi",
      heroBasligi: "Halınız kabulden teslime kayıt altında ilerlesin.",
      heroAciklamasi: "Dokuma türünü, mevcut leke ve hasarları, uygulanacak yıkama hattını ve teslim rotasını tek bir takip akışında görünür kılıyoruz.",
      anaAksiyon: "Halı alımı planlayın",
      ikincilAksiyon: "Yıkama sürecini görün",
      guvenEtiketi: "Kayıtlı kabul",
      hizmetEtiketi: "Dokumaya göre yıkama",
      surecEtiketi: "Kabul, yıkama, kurutma, iade",
      hikayeEtiketi: "Kayıt ve dokuma yaklaşımımız",
      sssEtiketi: "Halı teslimi öncesi",
      iletisimEtiketi: "Adet ve adres bilgisi",
      anaSayfaAkisi: ["hero", "surec", "guven", "hizmetler", "hikaye", "sss", "iletisim"],
    },
  },
  ilaclama: {
    aile: "hijyen",
    panelTuru: "risk-protokolu",
    kod: "Uygulama raporu 04",
    ustEtiket: "RİSK VE UYGULAMA RAPORU",
    durum: "Güvenlik öncelikli",
    adimlar: ["Risk keşfi", "Güvenli uygulama", "Takip kontrolü"],
    metrikler: [
      { etiket: "Keşif", deger: "Tür ve yoğunluk" },
      { etiket: "Takip", deger: "Kontrol tarihli" },
    ],
    alanlar: [
      { etiket: "Sorun türü", deger: "Haşere / kemirgen" },
      { etiket: "Alan", deger: "Ev / işyeri / gıda alanı" },
      { etiket: "Hassas durum", deger: "Çocuk / evcil hayvan" },
    ],
    secimEtiketi: "Güvenlik protokolü",
    secenekler: ["Risk keşfi", "Hazırlık", "Takip"],
    sonuc: { etiket: "Uygulama öncesi", deger: "Yöntem, bekleme süresi ve dönüş bilgisi" },
    icerikSemasi: {
      heroEtiketi: "Risk keşfi ve güvenlik protokolü",
      heroBasligi: "İlaçlamadan önce riski ve güvenli uygulama planını netleştirin.",
      heroAciklamasi: "Zararlı türünü, yoğunluğu, hassas alanları ve alana dönüş süresini kayıt altına alarak yöntem ve takip planını açıkça anlatıyoruz.",
      anaAksiyon: "Risk değerlendirmesi isteyin",
      ikincilAksiyon: "Uygulama türlerini görün",
      guvenEtiketi: "İnsan ve alan güvenliği",
      hizmetEtiketi: "Sorun türüne göre çözümler",
      surecEtiketi: "Keşif, uygulama ve takip",
      hikayeEtiketi: "Risk ve güvenlik yaklaşımımız",
      sssEtiketi: "Güvenli uygulama hakkında",
      iletisimEtiketi: "Sorunu ve alanı tarif edin",
      anaSayfaAkisi: ["hero", "guven", "hizmetler", "surec", "hikaye", "sss", "iletisim"],
    },
  },
  elektrikci: {
    aile: "teknik",
    panelTuru: "elektrik-teshisi",
    kod: "Servis kaydı 01",
    ustEtiket: "ELEKTRİK SERVİS KAYDI",
    durum: "Güvenli müdahale",
    adimlar: ["İzolasyon", "Ölçümlü teşhis", "Fonksiyon testi"],
    metrikler: [
      { etiket: "Öncelik", deger: "Risk seviyesine göre" },
      { etiket: "Teslim", deger: "Test raporlu" },
    ],
    alanlar: [
      { etiket: "Belirti", deger: "Sigorta / priz / enerji kesintisi" },
      { etiket: "Konum", deger: "Daire / işyeri" },
      { etiket: "Aciliyet", deger: "Aktif risk kontrolü" },
    ],
    secimEtiketi: "Servis kaydı",
    secenekler: ["Güvenliği sağla", "Ölçüm yap", "Test ederek teslim et"],
    sonuc: { etiket: "Müdahale standardı", deger: "İzolasyon, teşhis ve koruma testi" },
    icerikSemasi: {
      heroEtiketi: "Güvenli elektrik servis kaydı",
      heroBasligi: "Elektrik arızasını tahminle değil, ölçümlü teşhisle çözüme taşıyın.",
      heroAciklamasi: "Belirtiyi ve risk seviyesini kaydediyor; güvenli izolasyon, ölçüm sonucu ve yapılacak müdahaleyi işlemden önce açıklıyoruz.",
      anaAksiyon: "Elektrik servis kaydı açın",
      ikincilAksiyon: "Hizmet kapsamını görün",
      guvenEtiketi: "Ölçüm ve koruma standardı",
      hizmetEtiketi: "Arıza türüne göre servis",
      surecEtiketi: "İzolasyondan fonksiyon testine",
      hikayeEtiketi: "Ölçüm ve güvenlik disiplinimiz",
      sssEtiketi: "Servis çağırmadan önce",
      iletisimEtiketi: "Belirtiyi ve konumu paylaşın",
      anaSayfaAkisi: ["hero", "guven", "hizmetler", "surec", "hikaye", "sss", "iletisim"],
    },
  },
  tesisatci: {
    aile: "teknik",
    panelTuru: "tesisat-teshisi",
    kod: "Saha kaydı 02",
    ustEtiket: "TESİSAT SERVİS KAYDI",
    durum: "Kaynak tespiti",
    adimlar: ["Kaynak tespiti", "Müdahale onayı", "Basınç kontrolü"],
    metrikler: [
      { etiket: "Müdahale", deger: "Onay sonrası" },
      { etiket: "Teslim", deger: "Sızdırmazlık testli" },
    ],
    alanlar: [
      { etiket: "Sorun", deger: "Kaçak / tıkanıklık / armatür" },
      { etiket: "Görünür belirti", deger: "Nem / akış / koku" },
      { etiket: "Erişim", deger: "Banyo / mutfak / kolon" },
    ],
    secimEtiketi: "Teşhis akışı",
    secenekler: ["Kaynağı bul", "Kapsamı onayla", "Basınçla test et"],
    sonuc: { etiket: "Doğru başlangıç", deger: "Sorun fotoğrafı ve konum bilgisi" },
    icerikSemasi: {
      heroEtiketi: "Kaynak tespiti ve kontrollü müdahale",
      heroBasligi: "Kaçağın veya tıkanıklığın kaynağını bulup müdahaleyi netleştirin.",
      heroAciklamasi: "Görünen belirtiyi, olası kaynağı ve erişim koşullarını değerlendirerek yöntem, parça ihtiyacı ve test sürecini açıkça planlıyoruz.",
      anaAksiyon: "Tesisat servis talebi oluşturun",
      ikincilAksiyon: "Sorun türlerini görün",
      guvenEtiketi: "Kaynak ve sızdırmazlık kontrolü",
      hizmetEtiketi: "Tesisat çözümleri",
      surecEtiketi: "Tespitten basınç testine",
      hikayeEtiketi: "Teşhis ve müdahale disiplinimiz",
      sssEtiketi: "Müdahale öncesi sorular",
      iletisimEtiketi: "Sorunu fotoğrafla anlatın",
      anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"],
    },
  },
  "kombi-servisi": {
    aile: "teknik",
    panelTuru: "kombi-teshisi",
    kod: "Cihaz kaydı 03",
    ustEtiket: "CİHAZ SERVİS KAYDI",
    durum: "Cihaz bilgisi gerekli",
    adimlar: ["Cihaz kaydı", "Bakım ve onay", "Yanma testi"],
    metrikler: [
      { etiket: "Bakım", deger: "Ölçümlü" },
      { etiket: "Teslim", deger: "Güvenlik raporlu" },
    ],
    alanlar: [
      { etiket: "Cihaz", deger: "Marka ve model" },
      { etiket: "Belirti", deger: "Hata kodu / basınç / ısı" },
      { etiket: "Servis geçmişi", deger: "Son bakım bilgisi" },
    ],
    secimEtiketi: "Cihaz kontrolü",
    secenekler: ["Kaydı aç", "Ölç ve onayla", "Yanmayı test et"],
    sonuc: { etiket: "Servis sonunda", deger: "İşlem, ölçüm ve güvenlik raporu" },
    icerikSemasi: {
      heroEtiketi: "Cihaz kaydı ve güvenlik testi",
      heroBasligi: "Cihaz bilgisinden güvenlik testine kadar kayıtlı servis alın.",
      heroAciklamasi: "Marka-model, hata kodu ve basınç bilgisini kaydediyor; bakım, parça onayı, yanma ve sızdırmazlık sonuçlarını anlaşılır biçimde teslim ediyoruz.",
      anaAksiyon: "Kombi servis kaydı açın",
      ikincilAksiyon: "Bakım kapsamını görün",
      guvenEtiketi: "Yanma ve sızdırmazlık güvenliği",
      hizmetEtiketi: "Cihaza göre servis",
      surecEtiketi: "Kayıttan güvenlik raporuna",
      hikayeEtiketi: "Bakım ve test yaklaşımımız",
      sssEtiketi: "Kombi servisi hakkında",
      iletisimEtiketi: "Marka, model ve hatayı paylaşın",
      anaSayfaAkisi: ["hero", "guven", "surec", "hizmetler", "hikaye", "sss", "iletisim"],
    },
  },
  nakliyat: {
    aile: "lojistik",
    panelTuru: "tasima-teklifi",
    kod: "Taşıma kaydı 01",
    ustEtiket: "TAŞIMA MANİFESTOSU",
    durum: "Hızlı ön teklif",
    adimlar: ["Ekspertiz", "Kodlu paketleme", "Teslim tutanağı"],
    metrikler: [
      { etiket: "Ekip", deger: "Hacme göre" },
      { etiket: "Teslim", deger: "Tutanaklı" },
    ],
    alanlar: [
      { etiket: "Çıkış", deger: "Adres, kat ve erişim" },
      { etiket: "Varış", deger: "Adres, kat ve erişim" },
      { etiket: "Hacim", deger: "Oda ve özel eşya" },
    ],
    secimEtiketi: "Taşıma kapsamı",
    secenekler: ["Paketleme", "Söküm–kurulum", "Şehirler arası"],
    sonuc: { etiket: "Net teklif için", deger: "Rota, hacim, erişim ve tarih" },
    icerikSemasi: {
      heroEtiketi: "Rota, hacim ve erişim planı",
      heroBasligi: "Taşınmayı adres, eşya hacmi ve bina erişimiyle birlikte planlayın.",
      heroAciklamasi: "Çıkış-varış koşullarını, oda ve özel eşya envanterini, paketleme kapsamını ve taşıma tarihini tek bir teklif akışında topluyoruz.",
      anaAksiyon: "Taşıma ön teklifini alın",
      ikincilAksiyon: "Hizmet kapsamını görün",
      guvenEtiketi: "Envanter ve sorumluluk kaydı",
      hizmetEtiketi: "Taşıma türleri",
      surecEtiketi: "Ekspertizden teslim tutanağına",
      hikayeEtiketi: "Taşıma sorumluluğumuz",
      sssEtiketi: "Taşınmadan önce",
      iletisimEtiketi: "Rota ve eşya bilgisini paylaşın",
      anaSayfaAkisi: ["hero", "guven", "surec", "hizmetler", "hikaye", "sss", "iletisim"],
    },
  },
  transfer: {
    aile: "ulasim",
    panelTuru: "transfer-rezervasyonu",
    kod: "Yolculuk planı 01",
    ustEtiket: "TRANSFER REZERVASYONU",
    durum: "Sabit rota planı",
    adimlar: ["Rotayı girin", "Aracı seçin", "Yolculuğu onaylayın"],
    metrikler: [
      { etiket: "Karşılama", deger: "Uçuş takipli" },
      { etiket: "Fiyat", deger: "Rota bazlı" },
    ],
    alanlar: [
      { etiket: "Alış noktası", deger: "Havalimanı / adres" },
      { etiket: "Bırakış noktası", deger: "Otel / adres" },
      { etiket: "Yolcu ve bagaj", deger: "Kapasite seçimi" },
    ],
    secimEtiketi: "Araç sınıfı",
    secenekler: ["Sedan", "VIP van", "Grup aracı"],
    sonuc: { etiket: "Rezervasyon özeti", deger: "Rota, tarih, saat ve araç" },
    icerikSemasi: {
      heroEtiketi: "Rota ve araç seçimi",
      heroBasligi: "Nereden nereye? Aracınızı ve saatinizi hemen planlayın.",
      heroAciklamasi: "Alış-bırakış noktasını, uçuş saatini, yolcu ve bagaj sayısını girerek kapasitesi doğru aracı ve karşılama biçimini baştan netleştirin.",
      anaAksiyon: "Transfer rotası oluşturun",
      ikincilAksiyon: "Araç seçeneklerini görün",
      guvenEtiketi: "Sabit fiyat ve karşılama",
      hizmetEtiketi: "Transfer seçenekleri",
      surecEtiketi: "Rotadan kapı önü teslime",
      hikayeEtiketi: "Karşılama ve yolculuk standardımız",
      sssEtiketi: "Yolculuk öncesi",
      iletisimEtiketi: "Uçuş ve rota bilgisini paylaşın",
      anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"],
    },
  },
  "arac-kiralama": {
    aile: "ulasim",
    panelTuru: "arac-kiralama",
    kod: "Kiralama planı 02",
    ustEtiket: "ARAÇ UYGUNLUK ARAMASI",
    durum: "Tarihe göre uygunluk",
    adimlar: ["Tarihleri seçin", "Sınıfı karşılaştırın", "Teslimi planlayın"],
    metrikler: [
      { etiket: "Teslim", deger: "Nokta ve saat seçimi" },
      { etiket: "Koşullar", deger: "Açık bilgilendirme" },
    ],
    alanlar: [
      { etiket: "Alış tarihi", deger: "Gün ve saat" },
      { etiket: "İade tarihi", deger: "Gün ve saat" },
      { etiket: "Kullanım", deger: "Şehir / uzun yol / iş" },
    ],
    secimEtiketi: "Araç sınıfı",
    secenekler: ["Ekonomi", "Konfor", "SUV / geniş"],
    sonuc: { etiket: "Karşılaştırma", deger: "Kapasite, koşul ve teslim noktası" },
    icerikSemasi: {
      heroEtiketi: "Tarih, konum ve araç sınıfı",
      heroBasligi: "Tarih ve ihtiyacınıza uygun araç sınıfını kolayca bulun.",
      heroAciklamasi: "Alış-iade zamanını, yolcu ve bagaj ihtiyacını, kullanım rotasını ve teslim koşullarını karşılaştırarak doğru araç sınıfını seçin.",
      anaAksiyon: "Uygun araçları listeleyin",
      ikincilAksiyon: "Filo sınıflarını görün",
      guvenEtiketi: "Açık kiralama koşulları",
      hizmetEtiketi: "Araç sınıfları",
      surecEtiketi: "Rezervasyondan iadeye",
      hikayeEtiketi: "Filo ve teslim yaklaşımımız",
      sssEtiketi: "Kiralama öncesi",
      iletisimEtiketi: "Tarih ve kullanım bilgisini paylaşın",
      anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"],
    },
  },
};

const varsayilanKararNoktalari: [
  SektorKararNoktasi,
  SektorKararNoktasi,
  SektorKararNoktasi,
] = [
  { etiket: "İhtiyaç", deger: "Doğru kapsam" },
  { etiket: "Uygulama", deger: "Planlı çalışma" },
  { etiket: "Teslim", deger: "Açık kontrol" },
];

export function sektorSahneDiliniGetir(sektor: string) {
  return sektorDilleri[sektor] ?? varsayilanDil;
}

export function sektorKararNoktalariniGetir(sektor: string) {
  return sektorKararNoktalari[sektor] ?? varsayilanKararNoktalari;
}

export function sektorOperasyonProfiliniGetir(sektor: string) {
  return sektorOperasyonProfilleri[sektor] ?? null;
}

export function sektorSahneDiliKaydiVarMi(sektor: string) {
  return Object.hasOwn(sektorDilleri, sektor);
}
