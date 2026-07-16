export type TemaKimligi =
  | "aurora"
  | "obsidian"
  | "ivory"
  | "terra"
  | "noir"
  | "lagoon"
  | "ruby"
  | "sage"
  | "copper"
  | "neon"
  | "mono"
  | "royal"
  | "sand"
  | "clinic"
  | "bistro"
  | "artisan"
  | "skyline"
  | "forest"
  | "studio"
  | "marble";

export type TasarimAilesi =
  | "otomotiv-atolye"
  | "yapi-sistemleri"
  | "proje-portfoyu"
  | "temizlik-servisi"
  | "acil-saha-servisi"
  | "butik-bakim"
  | "saglik-danismanlik"
  | "klinik-guven"
  | "emlak-portfoyu"
  | "yaratici-portfoy"
  | "etkinlik-sahnesi"
  | "spor-enerjisi"
  | "okul-yasami"
  | "akademik-program"
  | "urun-katalogu"
  | "zanaat-atolyesi"
  | "lojistik-rota"
  | "seyahat-rezervasyonu";

export type TasarimDuzeni =
  | "teknik"
  | "sinematik"
  | "servis"
  | "editorial"
  | "klinik"
  | "katalog"
  | "rezervasyon"
  | "portfoy"
  | "egitim"
  | "zanaat";

export type KartStili = "keskin" | "yumusak" | "cerceveli" | "katmanli";
export type IcerikYogunlugu = "ferah" | "dengeli" | "kompakt";
export type GorselOrani = "panorama" | "portre" | "kare" | "karisik";

export type AnaSayfaBolumu =
  | "hero"
  | "hizmetler"
  | "guven"
  | "surec"
  | "hikaye"
  | "galeri"
  | "sss"
  | "iletisim";

export interface SektorTasarimSecenegi {
  id: string;
  ad: string;
  etiket: string;
  aciklama: string;
  tema: TemaKimligi;
  aile: TasarimAilesi;
  duzen: TasarimDuzeni;
  kartStili: KartStili;
  yogunluk: IcerikYogunlugu;
  gorselOrani: GorselOrani;
  ozellikler: string[];
}

export interface SektorTasarimProfili {
  sektor: string;
  aile: TasarimAilesi;
  odak: string;
  anaSayfaAkisi: AnaSayfaBolumu[];
  secenekler: SektorTasarimSecenegi[];
}

interface AileSecenegi {
  etiket: string;
  aciklama: string;
  duzen: TasarimDuzeni;
  kartStili: KartStili;
  yogunluk: IcerikYogunlugu;
  gorselOrani: GorselOrani;
  ozellikler: [string, string];
}

interface SektorKimligi {
  aile: TasarimAilesi;
  odak: string;
  temalar: [TemaKimligi, TemaKimligi, TemaKimligi];
  adlar: [string, string, string];
  anaSayfaAkisi: AnaSayfaBolumu[];
}

const aileKurgulari: Record<TasarimAilesi, [AileSecenegi, AileSecenegi, AileSecenegi]> = {
  "otomotiv-atolye": [
    { etiket: "Performans atölyesi", aciklama: "Teknik işçiliği, paketleri ve sonuçları yüksek kontrastlı atölye düzeninde sunar.", duzen: "teknik", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "panorama", ozellikler: ["Numaralı servis panelleri", "Güçlü teklif ve randevu geçişi"] },
    { etiket: "Sinematik showroom", aciklama: "Araç fotoğraflarını geniş yüzeylerde kullanır; uygulama örneklerini showroom gibi gezdirir.", duzen: "sinematik", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Tam ekran araç sunumu", "Öncesi ve sonrası odaklı galeri"] },
    { etiket: "Bakım kataloğu", aciklama: "Hizmetleri kolay karşılaştırılan kartlara ayırır ve karar vermeyi hızlandırır.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Karşılaştırılabilir hizmet kartları", "Mobilde hızlı paket tarama"] },
  ],
  "yapi-sistemleri": [
    { etiket: "Mimari keşif", aciklama: "Mekân fotoğrafı, sistem seçimi ve keşif çağrısını dengeli bir mimari düzende birleştirir.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Ölçü ve keşif vurgusu", "Geniş uygulama fotoğrafları"] },
    { etiket: "Sistem vitrini", aciklama: "Ürün tiplerini büyük görseller ve kısa teknik faydalarla vitrin mantığında gösterir.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Sistem bazlı proje seçkisi", "Malzeme ve kullanım detayı"] },
    { etiket: "Teknik çözüm", aciklama: "Dayanım, ölçülendirme ve montaj sürecini düzenli teknik panellerle açıklar.", duzen: "teknik", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Teknik karar kartları", "Adım adım montaj akışı"] },
  ],
  "proje-portfoyu": [
    { etiket: "Editoryal stüdyo", aciklama: "Proje hikâyesini geniş boşluklar, güçlü tipografi ve seçili karelerle anlatır.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "ferah", gorselOrani: "karisik", ozellikler: ["Proje hikâyesi önceliği", "Asimetrik içerik ritmi"] },
    { etiket: "Proje arşivi", aciklama: "Tamamlanan işleri kategori ve proje mantığıyla güçlü bir portföye dönüştürür.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "dengeli", gorselOrani: "panorama", ozellikler: ["Görsel ağırlıklı proje ızgarası", "Süreç ve sonuç eşleşmesi"] },
    { etiket: "Uygulama planı", aciklama: "Hizmet kapsamını, iş sırasını ve teslim yaklaşımını teknik bir düzende netleştirir.", duzen: "teknik", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Kapsam bazlı hizmet düzeni", "Planlama ve teslim akışı"] },
  ],
  "temizlik-servisi": [
    { etiket: "Net hizmet akışı", aciklama: "Hizmet kapsamını, güven unsurlarını ve teklif adımını ilk bakışta anlaşılır kılar.", duzen: "servis", kartStili: "yumusak", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Kapsamı açık hizmet kartları", "Sessiz teklif yönlendirmesi"] },
    { etiket: "Sonuç vitrini", aciklama: "Temizlik sonucunu ve uygulama ayrıntılarını önce-sonra hissi veren görsel alanlarla öne çıkarır.", duzen: "sinematik", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Sonuç odaklı görsel akış", "Ekipman ve yöntem anlatımı"] },
    { etiket: "Kurumsal plan", aciklama: "Düzenli hizmet, alan türü ve çalışma sıklığını kurumsal alıcıların kolay tarayacağı yapıda sunar.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Alan türüne göre hizmet seçimi", "Periyodik çalışma vurgusu"] },
  ],
  "acil-saha-servisi": [
    { etiket: "Hızlı servis", aciklama: "Sorun, hizmet bölgesi ve iletişim yolunu gecikmeden gösteren dönüşüm odaklı yapı kurar.", duzen: "servis", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "karisik", ozellikler: ["Tek dokunuşla servis talebi", "Hizmet bölgesi görünürlüğü"] },
    { etiket: "Teknik güven", aciklama: "Arıza türlerini, müdahale biçimini ve güvenlik adımlarını teknik bir sunumla açıklar.", duzen: "teknik", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "kare", ozellikler: ["Sorun türüne göre yönlendirme", "Güvenlik ve kontrol adımları"] },
    { etiket: "Yerinde çözüm", aciklama: "Saha fotoğrafları ile süreç bilgisini dengeler; kullanıcıyı kısa talep formuna taşır.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Konum ve uygunluk akışı", "Kısa talep formu önceliği"] },
  ],
  "butik-bakim": [
    { etiket: "Butik randevu", aciklama: "Uygulamaları zarif bir hizmet menüsüyle sunar ve randevuya doğal biçimde yönlendirir.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "portre", ozellikler: ["Randevu odaklı hizmet seçimi", "Mobilde rahat uygulama tarama"] },
    { etiket: "Stil galerisi", aciklama: "Sonuç fotoğraflarını editoryal bir görünümle öne alır ve uzmanlık algısını güçlendirir.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "dengeli", gorselOrani: "portre", ozellikler: ["Model ve uygulama galerisi", "Görselden hizmete geçiş"] },
    { etiket: "Bakım menüsü", aciklama: "Hizmetleri sade, kıyaslanabilir ve açıklayıcı kartlarla düzenler.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Net bakım kategorileri", "Fayda ve süreç açıklamaları"] },
  ],
  "saglik-danismanlik": [
    { etiket: "Sakin görüşme", aciklama: "Uzmanlık alanlarını mahremiyet ve güven duygusunu koruyan sakin bir akışta anlatır.", duzen: "klinik", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "portre", ozellikler: ["Uzman yaklaşımı önceliği", "Görüşme biçimi ve mahremiyet"] },
    { etiket: "Uzmanlık rehberi", aciklama: "Danışanın kendine uygun hizmeti bulmasını açıklayıcı konu kartlarıyla kolaylaştırır.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Konu bazlı uzmanlık akışı", "Bilgilendirici soru-cevap alanı"] },
    { etiket: "Kolay randevu", aciklama: "İlk görüşme, süreç ve randevu seçeneklerini kısa ve güvenli bir yolculukta birleştirir.", duzen: "rezervasyon", kartStili: "katmanli", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["İlk görüşme beklentisi", "Belirgin fakat sakin randevu yolu"] },
  ],
  "klinik-guven": [
    { etiket: "Klinik güven", aciklama: "Hizmetleri, uzman yaklaşımını ve randevu bilgisini hijyenik ve ölçülü bir düzende sunar.", duzen: "klinik", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "karisik", ozellikler: ["Tedavi ve uzmanlık ayrımı", "Güven veren randevu paneli"] },
    { etiket: "Tedavi rehberi", aciklama: "Hizmetleri anlaşılır kategorilere ayırır; karar öncesi soruları açıkça yanıtlar.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "kare", ozellikler: ["Hizmet bazlı bilgi kartları", "Süreç ve hazırlık açıklamaları"] },
    { etiket: "Merkez vitrini", aciklama: "Klinik ortamını ve uygulama alanlarını profesyonel görsellerle destekleyen güven odaklı sunum kurar.", duzen: "editorial", kartStili: "katmanli", yogunluk: "dengeli", gorselOrani: "panorama", ozellikler: ["Merkez ve ekipman görünürlüğü", "Uzmanlık hikâyesi"] },
  ],
  "emlak-portfoyu": [
    { etiket: "Portföy vitrini", aciklama: "İlanları büyük görseller ve okunaklı bilgi bloklarıyla emlak vitrini gibi sunar.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "dengeli", gorselOrani: "panorama", ozellikler: ["İlan odaklı geniş kartlar", "Portföy talebine hızlı geçiş"] },
    { etiket: "Danışmanlık ofisi", aciklama: "Bölge uzmanlığı, süreç ve danışmanlık değerini kurumsal bir editoryal yapıda anlatır.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "ferah", gorselOrani: "karisik", ozellikler: ["Bölge ve danışmanlık vurgusu", "Alım-satım süreci açıklaması"] },
    { etiket: "İlan kataloğu", aciklama: "Portföy tiplerini karşılaştırılabilir kartlarla sıralar ve mobil taramayı hızlandırır.", duzen: "katalog", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Kategori hissi veren ilan düzeni", "Kısa bilgi ve hızlı talep"] },
  ],
  "yaratici-portfoy": [
    { etiket: "Görsel portföy", aciklama: "Seçili işleri geniş kadrajlar ve düşük metin yoğunluğuyla başrole taşır.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "karisik", ozellikler: ["Tam genişlikte seçili işler", "Görselden çekim türüne geçiş"] },
    { etiket: "Editoryal hikâye", aciklama: "Çekim yaklaşımını, estetik dili ve proje hikâyelerini dergi düzeninde anlatır.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "portre", ozellikler: ["Dergi ritminde proje anlatımı", "Yaklaşım ve süreç dengesi"] },
    { etiket: "Çekim menüsü", aciklama: "Çekim türlerini, teslim yaklaşımını ve talep yolunu düzenli kartlarla gösterir.", duzen: "katalog", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Çekim türü karşılaştırması", "Brief ve tarih talebi"] },
  ],
  "etkinlik-sahnesi": [
    { etiket: "Sinematik davet", aciklama: "Mekânı, atmosferi ve davet anlarını tam ekran görsellerle hissettirir.", duzen: "sinematik", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Mekân odaklı açılış", "Davet anlarından güçlü galeri"] },
    { etiket: "Salon vitrini", aciklama: "Salon seçenekleri ve paketleri görsel karşılaştırmaya uygun biçimde düzenler.", duzen: "portfoy", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Salon ve düzen seçenekleri", "Kapasite ve paket görünürlüğü"] },
    { etiket: "Tarih planlama", aciklama: "Paket seçimi, tarih uygunluğu ve teklif akışını rezervasyon merkezli hale getirir.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Tarih ve kişi sayısı akışı", "Kısa teklif formu"] },
  ],
  "spor-enerjisi": [
    { etiket: "Performans kulübü", aciklama: "Antrenman, ekipman ve salon enerjisini yüksek kontrastlı dinamik bir yapıda sunar.", duzen: "teknik", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "panorama", ozellikler: ["Program ve hedef odaklı kartlar", "Güçlü üyelik çağrısı"] },
    { etiket: "Hareket vitrini", aciklama: "Ders ve antrenman görsellerini güçlü kadrajlarla öne çıkarır.", duzen: "sinematik", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Hareket odaklı galeri", "Salon atmosferi"] },
    { etiket: "Program seçimi", aciklama: "Dersleri ve üyelik seçeneklerini mobilde kolay kıyaslanabilir hale getirir.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "kare", ozellikler: ["Ders ve program ayrımı", "Hedefe göre yönlendirme"] },
  ],
  "okul-yasami": [
    { etiket: "Okul yaşamı", aciklama: "Sınıf, oyun ve gelişim alanlarını sıcak görseller ve güvenli bir akışla tanıtır.", duzen: "egitim", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "karisik", ozellikler: ["Günlük yaşam ve etkinlikler", "Veli güvenini destekleyen içerik"] },
    { etiket: "Gelişim yolculuğu", aciklama: "Programları yaş ve gelişim odağıyla düzenler; eğitim yaklaşımını görünür kılar.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "portre", ozellikler: ["Program ve gelişim alanları", "Eğitim yaklaşımı anlatımı"] },
    { etiket: "Tanışma planı", aciklama: "Okul ziyareti, program inceleme ve tanışma görüşmesini kolay bir kayıt akışına bağlar.", duzen: "rezervasyon", kartStili: "katmanli", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Okul ziyareti yönlendirmesi", "Kısa veli iletişim yolu"] },
  ],
  "akademik-program": [
    { etiket: "Program rehberi", aciklama: "Eğitim programlarını, seviyeleri ve kazanımları net bir akademik düzende sunar.", duzen: "egitim", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Seviye bazlı program düzeni", "Kazanım ve yöntem açıklaması"] },
    { etiket: "Akademik katalog", aciklama: "Kurs seçeneklerini karşılaştırmayı ve doğru programa ulaşmayı hızlandırır.", duzen: "katalog", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Program karşılaştırma kartları", "Hedefe göre seçim akışı"] },
    { etiket: "Seviye görüşmesi", aciklama: "Program bilgisini seviye belirleme ve danışmanlık çağrısıyla birleştirir.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Seviye değerlendirme adımı", "Danışmanlık odaklı kayıt yolu"] },
  ],
  "urun-katalogu": [
    { etiket: "Ürün vitrini", aciklama: "Ürünleri güçlü fotoğraflar, kısa seçim bilgileri ve kolay talep akışıyla sunar.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "kare", ozellikler: ["Ürün kategorisi hissi", "Mobilde kolay ürün tarama"] },
    { etiket: "Butik koleksiyon", aciklama: "Ürünlerin işçiliğini ve duygusunu editoryal, seçkin bir görünümle öne çıkarır.", duzen: "editorial", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "portre", ozellikler: ["Koleksiyon odaklı sunum", "Ürün hikâyesi ve ayrıntı"] },
    { etiket: "Hızlı sipariş", aciklama: "Ürün seçimini teslim, adet veya tarih bilgisiyle kısa bir sipariş yoluna bağlar.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "kompakt", gorselOrani: "karisik", ozellikler: ["Teslim ve sipariş bilgisi", "WhatsApp'a doğal yönlendirme"] },
  ],
  "zanaat-atolyesi": [
    { etiket: "Usta işi", aciklama: "Malzeme, üretim ve işçilik ayrıntılarını sıcak bir atölye kimliğiyle anlatır.", duzen: "zanaat", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Malzeme ve işçilik vurgusu", "Üretim süreci görünürlüğü"] },
    { etiket: "Mekân portföyü", aciklama: "Tamamlanan uygulamaları geniş proje görselleriyle profesyonel bir seçkiye dönüştürür.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Mekâna uygulanmış ürünler", "Proje bazlı galeri"] },
    { etiket: "Üretim kataloğu", aciklama: "Ürün gruplarını, ölçü seçeneklerini ve özel üretim yolunu düzenli biçimde gösterir.", duzen: "katalog", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Ürün grubu karşılaştırması", "Ölçü ve özel üretim talebi"] },
  ],
  "lojistik-rota": [
    { etiket: "Taşıma planı", aciklama: "Taşınma türünü, kapsamı ve teklif yolunu operasyonel bir akışta netleştirir.", duzen: "servis", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "karisik", ozellikler: ["Taşınma türüne göre seçim", "Hızlı fiyat talebi"] },
    { etiket: "Operasyon güveni", aciklama: "Paketleme, taşıma ve teslim adımlarını teknik güven unsurlarıyla destekler.", duzen: "teknik", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "panorama", ozellikler: ["Adım adım operasyon", "Araç ve ekip görünürlüğü"] },
    { etiket: "Rota ve teklif", aciklama: "Başlangıç, varış ve taşınma bilgilerini kısa teklif formuna bağlayan planlama düzeni kurar.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "kare", ozellikler: ["Rota bilgisi önceliği", "Planlı talep toplama"] },
  ],
  "seyahat-rezervasyonu": [
    { etiket: "Kolay rezervasyon", aciklama: "Araç veya transfer seçimini tarih, rota ve iletişim bilgisiyle hızlıca birleştirir.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "kompakt", gorselOrani: "karisik", ozellikler: ["Tarih ve rota odaklı akış", "Mobilde hızlı rezervasyon"] },
    { etiket: "Filo vitrini", aciklama: "Araç seçeneklerini geniş görseller ve karar bilgileriyle profesyonel bir filoya dönüştürür.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Araç sınıfı ve kapasite", "Görsel filo sunumu"] },
    { etiket: "Seçenek kataloğu", aciklama: "Hizmet ya da araç türlerini kolay karşılaştırılan kartlarla listeler.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "kare", ozellikler: ["Karşılaştırılabilir seçenekler", "Kapsam ve uygunluk bilgisi"] },
  ],
};

const akislar = {
  otomotiv: ["hero", "guven", "hizmetler", "galeri", "surec", "hikaye", "sss", "iletisim"],
  proje: ["hero", "galeri", "hikaye", "hizmetler", "surec", "guven", "sss", "iletisim"],
  hizmet: ["hero", "hizmetler", "guven", "surec", "galeri", "hikaye", "sss", "iletisim"],
  acil: ["hero", "guven", "hizmetler", "surec", "sss", "hikaye", "iletisim"],
  bakim: ["hero", "hizmetler", "galeri", "guven", "hikaye", "surec", "sss", "iletisim"],
  saglik: ["hero", "guven", "hizmetler", "hikaye", "surec", "galeri", "sss", "iletisim"],
  katalog: ["hero", "hizmetler", "galeri", "guven", "hikaye", "surec", "sss", "iletisim"],
  rezervasyon: ["hero", "hizmetler", "guven", "surec", "galeri", "sss", "hikaye", "iletisim"],
} satisfies Record<string, AnaSayfaBolumu[]>;

const sektorKimlikleri: Record<string, SektorKimligi> = {
  "oto-yikama": { aile: "otomotiv-atolye", odak: "Yıkama paketleri, boya güvenliği ve görünür araç sonucu", temalar: ["obsidian", "skyline", "copper"], adlar: ["Yıkama Garajı", "Parlak Showroom", "Bakım Paketleri"], anaSayfaAkisi: akislar.otomotiv },
  "oto-detaylandirma": { aile: "otomotiv-atolye", odak: "Detaylı işçilik, boya düzeltme ve koruma uygulamaları", temalar: ["obsidian", "noir", "copper"], adlar: ["Detail Lab", "Kusursuz Yüzey", "Koruma Menüsü"], anaSayfaAkisi: akislar.otomotiv },
  "arac-kaplama": { aile: "otomotiv-atolye", odak: "PPF, renk değişimi, cam filmi ve uygulama kalitesi", temalar: ["obsidian", "studio", "copper"], adlar: ["Wrap Studio", "Kaplama Sahnesi", "Film Seçkisi"], anaSayfaAkisi: akislar.otomotiv },
  "cam-balkon": { aile: "yapi-sistemleri", odak: "Sistem seçimi, ölçü, yalıtım ve temiz montaj", temalar: ["skyline", "mono", "marble"], adlar: ["Şeffaf Mekân", "Sistem Vitrini", "Teknik Balkon"], anaSayfaAkisi: akislar.proje },
  tente: { aile: "yapi-sistemleri", odak: "Gölgelendirme, ölçülendirme, kumaş ve taşıyıcı sistem", temalar: ["sand", "terra", "copper"], adlar: ["Gölge Mimari", "Pergola Vitrini", "Tente Sistemleri"], anaSayfaAkisi: akislar.proje },
  tadilat: { aile: "proje-portfoyu", odak: "Keşif, iş kalemleri, uygulama sırası ve teslim disiplini", temalar: ["copper", "marble", "mono"], adlar: ["Dönüşüm Stüdyosu", "Önce Sonra", "Uygulama Planı"], anaSayfaAkisi: akislar.proje },
  dekorasyon: { aile: "proje-portfoyu", odak: "Mekân dili, malzeme seçimi ve tamamlanmış uygulamalar", temalar: ["terra", "marble", "artisan"], adlar: ["Mekân Hikâyesi", "Dekor Portföyü", "Malzeme Planı"], anaSayfaAkisi: akislar.proje },
  temizlik: { aile: "temizlik-servisi", odak: "Alan türü, temizlik kapsamı, ekip güveni ve teklif", temalar: ["aurora", "lagoon", "sand"], adlar: ["Temiz Başlangıç", "Görünür Sonuç", "Kurumsal Temizlik"], anaSayfaAkisi: akislar.hizmet },
  "koltuk-yikama": { aile: "temizlik-servisi", odak: "Kumaş analizi, leke işlemi, ekipman ve kuruma süreci", temalar: ["lagoon", "aurora", "skyline"], adlar: ["Yerinde Temizlik", "Önce Sonra", "Koltuk Bakım Planı"], anaSayfaAkisi: ["hero", "galeri", "hizmetler", "surec", "guven", "sss", "hikaye", "iletisim"] },
  "hali-yikama": { aile: "temizlik-servisi", odak: "Teslim alma, yıkama aşamaları, kurutma ve iade düzeni", temalar: ["lagoon", "aurora", "sand"], adlar: ["Halı Servisi", "Yıkama Süreci", "Düzenli Teslim"], anaSayfaAkisi: ["hero", "surec", "hizmetler", "galeri", "guven", "sss", "hikaye", "iletisim"] },
  ilaclama: { aile: "acil-saha-servisi", odak: "Zararlı türü, güvenli uygulama, hazırlık ve takip", temalar: ["copper", "aurora", "sand"], adlar: ["Güvenli Müdahale", "Teknik İlaçlama", "Hızlı Talep"], anaSayfaAkisi: akislar.acil },
  "guzellik-salonu": { aile: "butik-bakim", odak: "Bakım uygulaması, uzman yaklaşımı, salon deneyimi ve randevu", temalar: ["ruby", "studio", "ivory"], adlar: ["Bakım Butiği", "Güzellik Editörü", "Uygulama Menüsü"], anaSayfaAkisi: akislar.bakim },
  kuafor: { aile: "butik-bakim", odak: "Kesim, renklendirme, saç bakımı ve stil sonuçları", temalar: ["studio", "ivory", "ruby"], adlar: ["Saç Stüdyosu", "Stil Galerisi", "Kuaför Menüsü"], anaSayfaAkisi: akislar.bakim },
  berber: { aile: "butik-bakim", odak: "Kesim, sakal tasarımı, bakım ritüeli ve randevu", temalar: ["artisan", "obsidian", "sand"], adlar: ["Usta Berber", "Kesim Kulübü", "Bakım Menüsü"], anaSayfaAkisi: akislar.bakim },
  diyetisyen: { aile: "saglik-danismanlik", odak: "Kişiye özel değerlendirme, takip ve sürdürülebilir beslenme", temalar: ["lagoon", "sage", "clinic"], adlar: ["Beslenme Rehberi", "Dengeli Yaklaşım", "Görüşme Planı"], anaSayfaAkisi: akislar.saglik },
  psikolog: { aile: "saglik-danismanlik", odak: "Uzmanlık alanı, güvenli görüşme ve mahremiyet", temalar: ["sage", "ivory", "lagoon"], adlar: ["Sakin Alan", "Uzmanlık Notları", "İlk Görüşme"], anaSayfaAkisi: ["hero", "guven", "hikaye", "hizmetler", "surec", "sss", "iletisim"] },
  fizyoterapist: { aile: "klinik-guven", odak: "Değerlendirme, hareket planı, uygulama ve ilerleme takibi", temalar: ["clinic", "lagoon", "sage"], adlar: ["Hareket Kliniği", "Tedavi Rehberi", "Merkez ve Egzersiz"], anaSayfaAkisi: akislar.saglik },
  "dis-klinigi": { aile: "klinik-guven", odak: "Tedavi seçenekleri, hekim yaklaşımı, klinik güveni ve randevu", temalar: ["lagoon", "clinic", "skyline"], adlar: ["Gülüş Kliniği", "Tedavi Rehberi", "Modern Klinik"], anaSayfaAkisi: akislar.saglik },
  veteriner: { aile: "klinik-guven", odak: "Hayvan sağlığı hizmetleri, klinik ortamı ve ulaşılabilir destek", temalar: ["sage", "clinic", "terra"], adlar: ["Dost Kliniği", "Bakım Rehberi", "Kliniğimiz"], anaSayfaAkisi: akislar.saglik },
  emlak: { aile: "emlak-portfoyu", odak: "İlan seçkisi, bölge uzmanlığı ve doğru portföy talebi", temalar: ["skyline", "ivory", "royal"], adlar: ["Seçili Portföy", "Emlak Danışmanı", "İlan Kataloğu"], anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"] },
  mimarlik: { aile: "proje-portfoyu", odak: "Mimari yaklaşım, proje bağlamı, süreç ve seçili yapılar", temalar: ["mono", "marble", "ivory"], adlar: ["Mimari Editör", "Proje Arşivi", "Tasarım Süreci"], anaSayfaAkisi: akislar.proje },
  fotografci: { aile: "yaratici-portfoy", odak: "Çekim dili, seçili işler, teslim yaklaşımı ve brief", temalar: ["studio", "mono", "noir"], adlar: ["Seçili Kareler", "Görsel Hikâye", "Çekim Türleri"], anaSayfaAkisi: ["hero", "galeri", "hizmetler", "hikaye", "guven", "surec", "sss", "iletisim"] },
  "dugun-salonu": { aile: "etkinlik-sahnesi", odak: "Salon atmosferi, davet paketleri, kapasite ve tarih uygunluğu", temalar: ["noir", "ivory", "studio"], adlar: ["Davet Sahnesi", "Salon Seçkisi", "Tarih Planı"], anaSayfaAkisi: ["hero", "galeri", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"] },
  "spor-salonu": { aile: "spor-enerjisi", odak: "Antrenman programları, salon olanakları, hedef ve üyelik", temalar: ["obsidian", "neon", "copper"], adlar: ["Performans Alanı", "Hareket Sahnesi", "Program Seçimi"], anaSayfaAkisi: ["hero", "hizmetler", "galeri", "guven", "surec", "hikaye", "sss", "iletisim"] },
  anaokulu: { aile: "okul-yasami", odak: "Gelişim programı, güvenli okul ortamı, günlük yaşam ve veli görüşmesi", temalar: ["terra", "aurora", "sage"], adlar: ["Neşeli Okul", "Gelişim Yolculuğu", "Okulu Tanıyın"], anaSayfaAkisi: ["hero", "galeri", "guven", "hizmetler", "hikaye", "surec", "sss", "iletisim"] },
  "ozel-egitim-kursu": { aile: "akademik-program", odak: "Program içeriği, seviye, eğitim yöntemi ve kayıt danışmanlığı", temalar: ["aurora", "royal", "skyline"], adlar: ["Eğitim Rehberi", "Program Kataloğu", "Seviye Görüşmesi"], anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"] },
  matbaa: { aile: "urun-katalogu", odak: "Baskı türü, malzeme, adet, termin ve örnek işler", temalar: ["mono", "copper", "studio"], adlar: ["Baskı Kataloğu", "Seçili İşler", "Hızlı Teklif"], anaSayfaAkisi: akislar.katalog },
  cicekci: { aile: "urun-katalogu", odak: "Aranjman türü, gönderim amacı, tazelik ve teslim zamanı", temalar: ["sage", "terra", "ruby"], adlar: ["Çiçek Seçkisi", "Butik Aranjman", "Aynı Gün Sipariş"], anaSayfaAkisi: akislar.katalog },
  pastane: { aile: "urun-katalogu", odak: "Pasta ve ürün çeşitleri, özel gün, kişi sayısı ve teslim", temalar: ["ruby", "bistro", "ivory"], adlar: ["Tatlı Vitrini", "Butik Pastane", "Özel Sipariş"], anaSayfaAkisi: akislar.katalog },
  mobilya: { aile: "zanaat-atolyesi", odak: "Malzeme, ölçü, özel üretim, işçilik ve mekâna uygulama", temalar: ["artisan", "marble", "terra"], adlar: ["Usta Atölye", "Mekân Portföyü", "Üretim Kataloğu"], anaSayfaAkisi: akislar.proje },
  elektrikci: { aile: "acil-saha-servisi", odak: "Arıza türü, elektrik güvenliği, konum ve servis talebi", temalar: ["copper", "obsidian", "skyline"], adlar: ["Hızlı Elektrik", "Teknik Güven", "Servis Talebi"], anaSayfaAkisi: akislar.acil },
  tesisatci: { aile: "acil-saha-servisi", odak: "Tesisat sorunu, aciliyet, yerinde tespit ve müdahale", temalar: ["skyline", "lagoon", "copper"], adlar: ["Hızlı Tesisat", "Arıza Rehberi", "Usta Çağır"], anaSayfaAkisi: akislar.acil },
  "kombi-servisi": { aile: "acil-saha-servisi", odak: "Marka-model, hata bilgisi, bakım ve güvenli servis", temalar: ["copper", "skyline", "obsidian"], adlar: ["Kombi Servisi", "Teknik Bakım", "Servis Kaydı"], anaSayfaAkisi: akislar.acil },
  nakliyat: { aile: "lojistik-rota", odak: "Taşınma türü, rota, eşya kapsamı, paketleme ve teslim", temalar: ["sand", "skyline", "copper"], adlar: ["Taşıma Planı", "Güvenli Operasyon", "Rota ve Teklif"], anaSayfaAkisi: akislar.rezervasyon },
  transfer: { aile: "seyahat-rezervasyonu", odak: "Alış-bırakış noktası, tarih, yolcu sayısı ve araç seçimi", temalar: ["royal", "skyline", "obsidian"], adlar: ["Kolay Transfer", "Premium Filo", "Transfer Seçenekleri"], anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "sss", "hikaye", "iletisim"] },
  "arac-kiralama": { aile: "seyahat-rezervasyonu", odak: "Araç sınıfı, kiralama tarihi, teslim koşulları ve uygunluk", temalar: ["skyline", "royal", "obsidian"], adlar: ["Hızlı Kiralama", "Araç Filosu", "Kiralama Rehberi"], anaSayfaAkisi: akislar.rezervasyon },
};

const varsayilanKimlik: SektorKimligi = {
  aile: "acil-saha-servisi",
  odak: "Hizmet kapsamı, güven, süreç ve kolay iletişim",
  temalar: ["aurora", "skyline", "sand"],
  adlar: ["Net Hizmet", "Profesyonel Sunum", "Kolay Talep"],
  anaSayfaAkisi: akislar.hizmet,
};

function profilOlustur(sektor: string, kimlik: SektorKimligi): SektorTasarimProfili {
  const aileSecenekleri = aileKurgulari[kimlik.aile];

  return {
    sektor,
    aile: kimlik.aile,
    odak: kimlik.odak,
    anaSayfaAkisi: [...kimlik.anaSayfaAkisi],
    secenekler: aileSecenekleri.map((secenek, index) => ({
      id: `${sektor}-tasarim-${index + 1}`,
      ad: kimlik.adlar[index],
      etiket: secenek.etiket,
      aciklama: `${kimlik.odak}. ${secenek.aciklama}`,
      tema: kimlik.temalar[index],
      aile: kimlik.aile,
      duzen: secenek.duzen,
      kartStili: secenek.kartStili,
      yogunluk: secenek.yogunluk,
      gorselOrani: secenek.gorselOrani,
      ozellikler: [kimlik.odak, ...secenek.ozellikler],
    })),
  };
}

export function sektorTasarimProfiliniGetir(sektor: string) {
  return profilOlustur(sektor, sektorKimlikleri[sektor] ?? varsayilanKimlik);
}

export function sektorTasarimSecenekleriniGetir(sektor: string) {
  return sektorTasarimProfiliniGetir(sektor).secenekler;
}

export function sektorTasariminiGetir(
  sektor: string,
  tasarimId?: string,
  tema?: string,
) {
  const secenekler = sektorTasarimSecenekleriniGetir(sektor);

  return (
    secenekler.find((secenek) => secenek.id === tasarimId) ??
    secenekler.find((secenek) => secenek.tema === tema) ??
    secenekler[0]
  );
}

export function sektorAnaSayfaAkisiniGetir(sektor: string) {
  return sektorTasarimProfiliniGetir(sektor).anaSayfaAkisi;
}

export function sektorTasarimKaydiVarMi(sektor: string) {
  return Object.hasOwn(sektorKimlikleri, sektor);
}
