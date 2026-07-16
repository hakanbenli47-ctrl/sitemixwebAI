export type FormAlanTuru = "text" | "select" | "date" | "number" | "textarea";

export interface SektorFormAlani {
  ad: string;
  etiket: string;
  tur: FormAlanTuru;
  gerekli?: boolean;
  secenekler?: string[];
  yerTutucu?: string;
  min?: number;
}

export interface SektorFormProfili {
  baslik: string;
  aciklama: string;
  gonderimEtiketi: string;
  alanlar: SektorFormAlani[];
  gizlilikNotu?: string;
}

const hizmet = (etiket = "İlgilendiğiniz hizmet"): SektorFormAlani => ({
  ad: "hizmet",
  etiket,
  tur: "select",
  gerekli: true,
});

const tarih = (etiket = "Tercih edilen tarih"): SektorFormAlani => ({
  ad: "tarih",
  etiket,
  tur: "date",
});

const konum: SektorFormAlani = {
  ad: "konum",
  etiket: "Hizmet adresi veya bölgesi",
  tur: "text",
  gerekli: true,
  yerTutucu: "İlçe, mahalle veya açık adres",
};

const fotografNotu: SektorFormAlani = {
  ad: "fotograf",
  etiket: "Fotoğraf paylaşabilir misiniz?",
  tur: "select",
  secenekler: ["Evet, WhatsApp’tan gönderebilirim", "Şu an fotoğrafım yok"],
};

const genel: SektorFormProfili = {
  baslik: "İhtiyacınızı birlikte netleştirelim",
  aciklama: "Doğru kapsam ve dönüş için temel bilgileri paylaşın.",
  gonderimEtiketi: "Talebi gönder",
  alanlar: [hizmet(), konum, { ad: "detay", etiket: "Kısa açıklama", tur: "textarea", gerekli: true }],
};

const profiller: Record<string, SektorFormProfili> = {
  "oto-yikama": {
    baslik: "Aracınız için uygun bakımı planlayalım",
    aciklama: "Araç ve istediğiniz temizlik kapsamını yazın; süre ve uygunluk bilgisi paylaşalım.",
    gonderimEtiketi: "Bakım talebi gönder",
    alanlar: [hizmet(), { ad: "arac", etiket: "Araç marka ve modeli", tur: "text", gerekli: true }, { ad: "aracTipi", etiket: "Araç tipi", tur: "select", secenekler: ["Binek", "SUV", "Hafif ticari", "Ticari"], gerekli: true }, tarih(), fotografNotu],
  },
  "oto-detaylandirma": {
    baslik: "Detaylı bakım kapsamını belirleyelim",
    aciklama: "Aracın mevcut durumunu ve hedeflediğiniz uygulamayı paylaşın.",
    gonderimEtiketi: "Ön değerlendirme gönder",
    alanlar: [hizmet(), { ad: "arac", etiket: "Araç marka, model ve yılı", tur: "text", gerekli: true }, { ad: "durum", etiket: "Öncelikli ihtiyaç", tur: "textarea", gerekli: true }, tarih(), fotografNotu],
  },
  "arac-kaplama": {
    baslik: "Kaplama ve film talebinizi değerlendirelim",
    aciklama: "Araç bilgisi, uygulama alanı ve renk-film tercihi teklifin doğruluğunu artırır.",
    gonderimEtiketi: "Kaplama talebi gönder",
    alanlar: [hizmet(), { ad: "arac", etiket: "Araç marka, model ve yılı", tur: "text", gerekli: true }, { ad: "uygulamaAlani", etiket: "Kaplanacak alan", tur: "select", secenekler: ["Tam araç", "Bölgesel", "Camlar", "PPF / boya koruma", "Ticari reklam kaplama"], gerekli: true }, { ad: "tercih", etiket: "Renk, doku veya film tercihi", tur: "text" }, fotografNotu],
  },
  "arac-kiralama": {
    baslik: "Uygun aracı ve tarihleri bulalım",
    aciklama: "Teslim noktası, tarih ve kişi ihtiyacını paylaşın.",
    gonderimEtiketi: "Müsaitlik sorgula",
    alanlar: [{ ad: "aracSinifi", etiket: "Araç sınıfı", tur: "select", secenekler: ["Ekonomik", "Orta sınıf", "SUV", "Otomatik", "Ticari"], gerekli: true }, { ad: "alisTarihi", etiket: "Alış tarihi", tur: "date", gerekli: true }, { ad: "iadeTarihi", etiket: "İade tarihi", tur: "date", gerekli: true }, { ad: "teslim", etiket: "Teslim ve iade noktası", tur: "text", gerekli: true }],
  },
  "cam-balkon": {
    baslik: "Balkonunuza uygun sistemi planlayalım",
    aciklama: "Yaklaşık ölçü, sistem tercihi ve konum keşif planını hızlandırır.",
    gonderimEtiketi: "Keşif talebi gönder",
    alanlar: [hizmet("Sistem tercihi"), konum, { ad: "olcu", etiket: "Yaklaşık genişlik ve yükseklik", tur: "text", gerekli: true }, { ad: "kat", etiket: "Kat ve erişim bilgisi", tur: "text" }, fotografNotu],
  },
  tente: {
    baslik: "Alanınıza uygun gölgelendirmeyi belirleyelim",
    aciklama: "Kullanım alanı, ölçü ve açılır-kapanır sistem beklentinizi paylaşın.",
    gonderimEtiketi: "Ölçü ve keşif talebi gönder",
    alanlar: [hizmet("Tente veya sistem türü"), konum, { ad: "alan", etiket: "Uygulama alanı", tur: "select", secenekler: ["Balkon", "Teras", "Bahçe", "Kafe / restoran", "Mağaza önü"], gerekli: true }, { ad: "olcu", etiket: "Yaklaşık ölçü", tur: "text" }, fotografNotu],
  },
  tadilat: {
    baslik: "Tadilat kapsamını birlikte çıkaralım",
    aciklama: "Mekân, yapılacak işler, yaklaşık büyüklük ve zaman beklentisiyle ön değerlendirme isteyin.",
    gonderimEtiketi: "Proje talebi gönder",
    alanlar: [hizmet("Tadilat türü"), konum, { ad: "mekan", etiket: "Mekân türü", tur: "select", secenekler: ["Daire", "Müstakil ev", "Ofis", "Mağaza", "Diğer"], gerekli: true }, { ad: "metrekare", etiket: "Yaklaşık m²", tur: "number", min: 1 }, { ad: "butce", etiket: "Bütçe aralığı", tur: "text" }, fotografNotu],
  },
  dekorasyon: {
    baslik: "Mekân fikrinizi projeye dönüştürelim",
    aciklama: "Kullanım amacı, stil, alan ve teslim beklentisini paylaşın.",
    gonderimEtiketi: "Dekorasyon talebi gönder",
    alanlar: [hizmet(), konum, { ad: "mekan", etiket: "Mekân ve yaklaşık m²", tur: "text", gerekli: true }, { ad: "stil", etiket: "Stil veya renk tercihi", tur: "text" }, { ad: "takvim", etiket: "Hedeflenen tamamlanma zamanı", tur: "text" }, fotografNotu],
  },
  mobilya: {
    baslik: "Özel üretim ihtiyacınızı netleştirelim",
    aciklama: "Ürün, ölçü, malzeme ve teslim yeri üzerinden ön teklif isteyin.",
    gonderimEtiketi: "Üretim talebi gönder",
    alanlar: [hizmet("Ürün veya mobilya türü"), konum, { ad: "olcu", etiket: "Yaklaşık ölçüler", tur: "text", gerekli: true }, { ad: "malzeme", etiket: "Malzeme, renk veya model tercihi", tur: "text" }, fotografNotu],
  },
  elektrikci: {
    baslik: "Elektrik ihtiyacınızı doğru ekibe iletin",
    aciklama: "Arıza veya uygulama türü, konum ve aciliyet bilgisini paylaşın.",
    gonderimEtiketi: "Servis talebi gönder",
    alanlar: [hizmet(), konum, { ad: "aciliyet", etiket: "Aciliyet", tur: "select", secenekler: ["Acil", "Bugün", "Bu hafta", "Planlı çalışma"], gerekli: true }, { ad: "belirti", etiket: "Arıza veya yapılacak iş", tur: "textarea", gerekli: true }, fotografNotu],
  },
  tesisatci: {
    baslik: "Tesisat sorununu hızlıca değerlendirelim",
    aciklama: "Sorunun yeri, belirtisi ve aciliyetini paylaşın.",
    gonderimEtiketi: "Tesisat talebi gönder",
    alanlar: [hizmet(), konum, { ad: "aciliyet", etiket: "Aciliyet", tur: "select", secenekler: ["Acil kaçak", "Bugün", "Bu hafta", "Planlı yenileme"], gerekli: true }, { ad: "belirti", etiket: "Sorunu kısaca anlatın", tur: "textarea", gerekli: true }, fotografNotu],
  },
  "kombi-servisi": {
    baslik: "Kombi servis talebinizi oluşturalım",
    aciklama: "Marka-model, hata kodu ve ısıtma durumunu paylaşın.",
    gonderimEtiketi: "Kombi servis talebi gönder",
    alanlar: [hizmet(), konum, { ad: "cihaz", etiket: "Kombi marka ve modeli", tur: "text", gerekli: true }, { ad: "hata", etiket: "Hata kodu veya belirti", tur: "textarea", gerekli: true }, { ad: "aciliyet", etiket: "Uygun zaman", tur: "select", secenekler: ["Bugün", "Yarın", "Bu hafta", "Planlı bakım"] }],
  },
  temizlik: {
    baslik: "Doğru temizlik kapsamını oluşturalım",
    aciklama: "Alan türü, büyüklük ve mevcut durum üzerinden hızlı ön teklif alın.",
    gonderimEtiketi: "Temizlik talebi gönder",
    alanlar: [hizmet(), konum, { ad: "alan", etiket: "Alan türü", tur: "select", secenekler: ["Ev", "Ofis", "İnşaat sonrası", "Boş daire", "İşyeri"], gerekli: true }, { ad: "buyukluk", etiket: "Oda sayısı veya yaklaşık m²", tur: "text", gerekli: true }, { ad: "zaman", etiket: "Tercih edilen gün", tur: "date" }, fotografNotu],
  },
  "koltuk-yikama": {
    baslik: "Koltuk yıkama teklifini hazırlayalım",
    aciklama: "Takım sayısı, kumaş ve leke durumunu paylaşın.",
    gonderimEtiketi: "Yıkama talebi gönder",
    alanlar: [konum, { ad: "adet", etiket: "Koltuk / takım sayısı", tur: "text", gerekli: true }, { ad: "kumas", etiket: "Kumaş veya ürün türü", tur: "select", secenekler: ["Koltuk takımı", "Köşe takımı", "Sandalye", "Yatak", "Araç koltuğu"], gerekli: true }, { ad: "leke", etiket: "Leke veya koku durumu", tur: "textarea" }, fotografNotu],
  },
  "hali-yikama": {
    baslik: "Halılarınız için fiyat ve teslimat bilgisi alın",
    aciklama: "Adet, yaklaşık ölçü ve ürün türünü paylaşın.",
    gonderimEtiketi: "Halı yıkama talebi gönder",
    alanlar: [konum, { ad: "adet", etiket: "Halı adedi", tur: "number", gerekli: true, min: 1 }, { ad: "tur", etiket: "Halı türü", tur: "select", secenekler: ["Makine halısı", "Yün halı", "El dokuma", "Shaggy", "Yerinde yıkama"], gerekli: true }, { ad: "olcu", etiket: "Yaklaşık toplam m²", tur: "number", min: 1 }, { ad: "ozelDurum", etiket: "Leke veya özel durum", tur: "textarea" }],
  },
  ilaclama: {
    baslik: "İlaçlama ihtiyacınızı güvenli biçimde değerlendirelim",
    aciklama: "Canlı türü, alan ve kullanım durumunu paylaşın; uygun yöntem hakkında bilgi alın.",
    gonderimEtiketi: "İlaçlama talebi gönder",
    alanlar: [konum, { ad: "zararli", etiket: "Gözlenen zararlı", tur: "select", secenekler: ["Hamam böceği", "Karınca", "Tahtakurusu", "Fare", "Sivrisinek", "Diğer / emin değilim"], gerekli: true }, { ad: "alan", etiket: "Alan türü ve yaklaşık m²", tur: "text", gerekli: true }, { ad: "kullanim", etiket: "Çocuk, evcil hayvan veya gıda alanı var mı?", tur: "textarea", gerekli: true }],
  },
  kuafor: {
    baslik: "Size uygun işlemi ve zamanı planlayalım",
    aciklama: "İşlem, saçın mevcut durumu ve tarih tercihinizi paylaşın.",
    gonderimEtiketi: "Randevu talebi gönder",
    alanlar: [hizmet(), tarih(), { ad: "sacDurumu", etiket: "Mevcut saç uzunluğu, renk ve işlem geçmişi", tur: "textarea", gerekli: true }, fotografNotu],
  },
  berber: {
    baslik: "Bakım randevunuzu planlayalım",
    aciklama: "İşlemi ve uygun olduğunuz zamanı seçin.",
    gonderimEtiketi: "Randevu talebi gönder",
    alanlar: [hizmet(), tarih(), { ad: "saat", etiket: "Tercih edilen saat aralığı", tur: "text" }, { ad: "not", etiket: "Model veya özel hazırlık notu", tur: "textarea" }],
  },
  "guzellik-salonu": {
    baslik: "Bakım ön görüşmenizi planlayalım",
    aciklama: "İlgilendiğiniz uygulama, mevcut durum ve zaman tercihinizi paylaşın.",
    gonderimEtiketi: "Ön görüşme talebi gönder",
    alanlar: [hizmet(), tarih(), { ad: "gecmis", etiket: "Daha önce yapılan uygulamalar ve hassasiyetler", tur: "textarea", gerekli: true }, fotografNotu],
    gizlilikNotu: "Sağlıkla ilgili ayrıntıları yalnızca yetkili uzmanla ve gerekli olduğu ölçüde paylaşın.",
  },
  diyetisyen: {
    baslik: "Beslenme görüşmesi talebi oluşturun",
    aciklama: "Hedefiniz ve görüşme tercihiniz üzerinden uygun program hakkında bilgi alın.",
    gonderimEtiketi: "Görüşme talebi gönder",
    alanlar: [hizmet("Hedef veya program"), { ad: "hedef", etiket: "Temel hedefiniz", tur: "textarea", gerekli: true }, { ad: "gorusme", etiket: "Görüşme biçimi", tur: "select", secenekler: ["Yüz yüze", "Online", "Fark etmez"], gerekli: true }, tarih()],
    gizlilikNotu: "Tanı, tahlil ve hassas sağlık bilgilerini açık forma yazmayın; uzman görüşmesinde paylaşın.",
  },
  psikolog: {
    baslik: "İlk görüşme talebinizi iletin",
    aciklama: "Görüşme türü ve uygun zamanınızı paylaşmanız yeterlidir.",
    gonderimEtiketi: "Görüşme talebi gönder",
    alanlar: [hizmet("Görüşme alanı"), { ad: "gorusme", etiket: "Görüşme biçimi", tur: "select", secenekler: ["Yüz yüze", "Online", "Fark etmez"], gerekli: true }, tarih(), { ad: "not", etiket: "Paylaşmak istediğiniz kısa not", tur: "textarea" }],
    gizlilikNotu: "Acil risk veya kriz durumlarında bu formu kullanmayın; 112’yi veya en yakın sağlık kuruluşunu arayın.",
  },
  fizyoterapist: {
    baslik: "Değerlendirme randevusu isteyin",
    aciklama: "Şikâyet bölgesi, süre ve randevu tercihinizi paylaşın.",
    gonderimEtiketi: "Değerlendirme talebi gönder",
    alanlar: [hizmet(), { ad: "bolge", etiket: "Şikâyet veya çalışma bölgesi", tur: "text", gerekli: true }, { ad: "sure", etiket: "Ne kadar süredir devam ediyor?", tur: "text" }, tarih(), { ad: "yonlendirme", etiket: "Hekim yönlendirmesi veya rapor var mı?", tur: "select", secenekler: ["Evet", "Hayır"] }],
    gizlilikNotu: "Bu form tanı koymaz; uygunluk uzman değerlendirmesiyle belirlenir.",
  },
  "dis-klinigi": {
    baslik: "Diş randevusu talebinizi iletin",
    aciklama: "Tedavi alanı, şikâyet ve zaman tercihinizi paylaşın.",
    gonderimEtiketi: "Randevu talebi gönder",
    alanlar: [hizmet("Tedavi veya başvuru alanı"), { ad: "sikayet", etiket: "Şikâyetinizi kısaca açıklayın", tur: "textarea", gerekli: true }, { ad: "aciliyet", etiket: "Aciliyet", tur: "select", secenekler: ["Ağrı / acil", "Bu hafta", "Kontrol / planlı"], gerekli: true }, tarih()],
    gizlilikNotu: "Kesin tedavi planı muayene ve hekim değerlendirmesi sonrasında oluşturulur.",
  },
  veteriner: {
    baslik: "Dostunuz için randevu talebi oluşturun",
    aciklama: "Hayvan türü, yaş, başvuru nedeni ve aciliyet bilgisini paylaşın.",
    gonderimEtiketi: "Veteriner randevusu iste",
    alanlar: [hizmet(), { ad: "hayvan", etiket: "Hayvan türü, ırkı ve yaşı", tur: "text", gerekli: true }, { ad: "sikayet", etiket: "Başvuru nedeni", tur: "textarea", gerekli: true }, { ad: "aciliyet", etiket: "Aciliyet", tur: "select", secenekler: ["Acil", "Bugün", "Planlı kontrol"], gerekli: true }],
    gizlilikNotu: "Hayati acil durumlarda form yanıtını beklemeden kliniği telefonla arayın.",
  },
  emlak: {
    baslik: "Aradığınız gayrimenkulü tarif edin",
    aciklama: "İşlem türü, bölge, bütçe ve önceliklere göre uygun portföyleri değerlendirelim.",
    gonderimEtiketi: "Portföy talebi gönder",
    alanlar: [{ ad: "islem", etiket: "İşlem türü", tur: "select", secenekler: ["Satın almak", "Kiralamak", "Satmak", "Kiraya vermek"], gerekli: true }, { ad: "tur", etiket: "Gayrimenkul türü", tur: "select", secenekler: ["Konut", "Arsa", "İşyeri", "Villa", "Diğer"], gerekli: true }, { ad: "bolge", etiket: "Tercih edilen bölge", tur: "text", gerekli: true }, { ad: "butce", etiket: "Bütçe veya fiyat beklentisi", tur: "text", gerekli: true }, { ad: "ozellik", etiket: "Oda sayısı ve diğer öncelikler", tur: "textarea" }],
  },
  mimarlik: {
    baslik: "Projeniz için ön görüşme isteyin",
    aciklama: "Proje türü, alan, konum ve takvim üzerinden kapsamı değerlendirelim.",
    gonderimEtiketi: "Mimari proje talebi gönder",
    alanlar: [hizmet(), konum, { ad: "proje", etiket: "Yapı / mekân türü ve yaklaşık m²", tur: "text", gerekli: true }, { ad: "asama", etiket: "Projenin mevcut aşaması", tur: "select", secenekler: ["Fikir aşaması", "Arsa / mekân hazır", "Ruhsat / proje süreci", "Uygulama başladı"], gerekli: true }, { ad: "takvim", etiket: "Takvim ve bütçe notu", tur: "textarea" }],
  },
  fotografci: {
    baslik: "Çekim planınızı oluşturalım",
    aciklama: "Çekim türü, tarih, konum ve teslim beklentisini paylaşın.",
    gonderimEtiketi: "Çekim teklifi iste",
    alanlar: [hizmet("Çekim türü"), tarih("Çekim tarihi"), { ad: "konum", etiket: "Çekim yeri", tur: "text", gerekli: true }, { ad: "sure", etiket: "Yaklaşık süre veya adet", tur: "text" }, { ad: "teslim", etiket: "Teslim ve kullanım beklentisi", tur: "textarea" }],
  },
  "dugun-salonu": {
    baslik: "Davet tarihiniz için uygunluğu sorun",
    aciklama: "Etkinlik türü, tarih ve kişi sayısıyla salon ve paket seçeneklerini öğrenin.",
    gonderimEtiketi: "Salon uygunluğu sor",
    alanlar: [hizmet("Etkinlik türü"), tarih("Etkinlik tarihi"), { ad: "kisi", etiket: "Tahmini kişi sayısı", tur: "number", gerekli: true, min: 1 }, { ad: "servis", etiket: "Servis tercihi", tur: "select", secenekler: ["Yemekli", "Kokteyl", "İkramlı", "Henüz karar vermedim"], gerekli: true }, { ad: "not", etiket: "Paket veya konsept notu", tur: "textarea" }],
  },
  "spor-salonu": {
    baslik: "Hedefinize uygun programı bulalım",
    aciklama: "Hedef, deneyim ve uygun zamanınıza göre deneme görüşmesi planlayın.",
    gonderimEtiketi: "Deneme görüşmesi iste",
    alanlar: [hizmet("Program veya ders"), { ad: "hedef", etiket: "Temel hedefiniz", tur: "select", secenekler: ["Kuvvet", "Kilo yönetimi", "Kondisyon", "Hareketlilik", "Genel sağlık"], gerekli: true }, { ad: "seviye", etiket: "Deneyim seviyesi", tur: "select", secenekler: ["Yeni başlıyorum", "Bir süredir yapıyorum", "İleri seviye"], gerekli: true }, { ad: "zaman", etiket: "Uygun gün ve saatler", tur: "text", gerekli: true }],
  },
  anaokulu: {
    baslik: "Okul tanışma görüşmesi planlayın",
    aciklama: "Çocuğun yaş grubu, dönem ve görüşme tercihini paylaşın.",
    gonderimEtiketi: "Tanışma görüşmesi iste",
    alanlar: [{ ad: "yas", etiket: "Çocuğun yaşı", tur: "number", gerekli: true, min: 1 }, { ad: "donem", etiket: "Düşünülen başlangıç dönemi", tur: "text", gerekli: true }, { ad: "program", etiket: "Program tercihi", tur: "select", secenekler: ["Tam gün", "Yarım gün", "Oyun grubu", "Henüz karar vermedim"], gerekli: true }, tarih("Görüşme tarihi"), { ad: "not", etiket: "Özel ihtiyaç veya merak ettiğiniz konu", tur: "textarea" }],
  },
  "ozel-egitim-kursu": {
    baslik: "Uygun eğitim programını belirleyelim",
    aciklama: "Yaş, seviye, hedef ve ders biçimini paylaşın.",
    gonderimEtiketi: "Program görüşmesi iste",
    alanlar: [hizmet("Program veya ders"), { ad: "yasSeviye", etiket: "Yaş ve mevcut seviye", tur: "text", gerekli: true }, { ad: "hedef", etiket: "Eğitim hedefi", tur: "textarea", gerekli: true }, { ad: "bicim", etiket: "Ders tercihi", tur: "select", secenekler: ["Birebir", "Grup", "Online", "Fark etmez"], gerekli: true }, { ad: "zaman", etiket: "Uygun gün ve saatler", tur: "text" }],
  },
  matbaa: {
    baslik: "Baskı işiniz için doğru teklif alın",
    aciklama: "Ürün, adet, ölçü, malzeme ve teslim tarihini paylaşın.",
    gonderimEtiketi: "Baskı teklifi iste",
    alanlar: [hizmet("Basılacak ürün"), { ad: "adet", etiket: "Adet", tur: "number", gerekli: true, min: 1 }, { ad: "olcu", etiket: "Ölçü ve malzeme", tur: "text", gerekli: true }, { ad: "tasarim", etiket: "Baskıya hazır tasarım var mı?", tur: "select", secenekler: ["Evet", "Tasarım desteği gerekli"], gerekli: true }, tarih("Teslim tarihi"), { ad: "not", etiket: "Renk, finisaj ve diğer notlar", tur: "textarea" }],
  },
  cicekci: {
    baslik: "Doğru aranjmanı birlikte seçelim",
    aciklama: "Gönderim amacı, tarih, teslim bölgesi ve bütçeyi paylaşın.",
    gonderimEtiketi: "Çiçek sipariş talebi gönder",
    alanlar: [hizmet("Ürün veya aranjman"), { ad: "amaç", etiket: "Gönderim amacı", tur: "select", secenekler: ["Doğum günü", "Yeni iş / açılış", "Yıldönümü", "Düğün / nişan", "Başsağlığı", "Diğer"], gerekli: true }, tarih("Teslim tarihi"), { ad: "teslim", etiket: "Teslim bölgesi", tur: "text", gerekli: true }, { ad: "butce", etiket: "Bütçe aralığı", tur: "text" }, { ad: "not", etiket: "Renk ve kart notu", tur: "textarea" }],
  },
  pastane: {
    baslik: "Siparişinizi ayrıntılarıyla planlayalım",
    aciklama: "Ürün, kişi sayısı, tema ve teslim tarihini paylaşın.",
    gonderimEtiketi: "Sipariş talebi gönder",
    alanlar: [hizmet("Ürün türü"), { ad: "kisi", etiket: "Kişi sayısı veya adet", tur: "number", gerekli: true, min: 1 }, tarih("Teslim tarihi"), { ad: "tema", etiket: "Tema, renk ve yazı", tur: "textarea" }, { ad: "teslim", etiket: "Teslim / mağazadan alım tercihi", tur: "select", secenekler: ["Mağazadan alacağım", "Teslimat istiyorum"], gerekli: true }],
  },
  nakliyat: {
    baslik: "Taşıma teklifini doğru bilgilerle hazırlayalım",
    aciklama: "Çıkış-varış, eşya kapsamı, kat ve tarih bilgisini paylaşın.",
    gonderimEtiketi: "Nakliyat teklifi iste",
    alanlar: [hizmet(), { ad: "cikis", etiket: "Çıkış ilçesi ve kat", tur: "text", gerekli: true }, { ad: "varis", etiket: "Varış ilçesi ve kat", tur: "text", gerekli: true }, { ad: "asansor", etiket: "Bina / dış cephe asansörü durumu", tur: "text" }, tarih("Taşıma tarihi"), { ad: "kapsam", etiket: "Oda sayısı ve taşınacak özel eşyalar", tur: "textarea", gerekli: true }, fotografNotu],
  },
  transfer: {
    baslik: "Transfer planınızı oluşturalım",
    aciklama: "Alış, varış, tarih, saat ve yolcu sayısını paylaşın.",
    gonderimEtiketi: "Transfer uygunluğu sor",
    alanlar: [hizmet("Transfer türü"), { ad: "alis", etiket: "Alış noktası", tur: "text", gerekli: true }, { ad: "varis", etiket: "Varış noktası", tur: "text", gerekli: true }, tarih("Transfer tarihi"), { ad: "saat", etiket: "Saat / uçuş numarası", tur: "text", gerekli: true }, { ad: "kisi", etiket: "Yolcu ve bagaj sayısı", tur: "text", gerekli: true }],
  },
};

export function sektorFormProfiliniGetir(sektor: string) {
  return profiller[sektor] ?? genel;
}
