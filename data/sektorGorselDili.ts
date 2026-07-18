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

export function sektorSahneDiliKaydiVarMi(sektor: string) {
  return Object.hasOwn(sektorDilleri, sektor);
}
