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
  | "marble"
  | "pearl"
  | "hygiene"
  | "torque"
  | "signal"
  | "cargo";

export type TasarimAilesi =
  | "otomotiv-atolye"
  | "yapi-sistemleri"
  | "proje-portfoyu"
  | "temizlik-servisi"
  | "hijyen-kontrol"
  | "acil-saha-servisi"
  | "teknik-servis-saha"
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
export type MedyaStratejisi = "metin-odakli";

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
  medyaStratejisi: MedyaStratejisi;
  gorselLimiti: number;
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
    { etiket: "Araç kabul atölyesi", aciklama: "Araç kabul kaydını, yüzey risklerini, iş emrini ve teslim kontrolünü yüksek kontrastlı teknik panellerde birleştirir.", duzen: "teknik", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "panorama", ozellikler: ["Araç kabul ve yüzey kayıt sistemi", "İş emrinden teslim kontrolüne izlenebilir akış"] },
    { etiket: "Yüzey sonuç stüdyosu", aciklama: "Boya, film ve iç yüzey uygulamalarını işlem öncesi durum, yöntem ve sonuç ilişkisiyle sinematik bir showroom düzeninde sunar.", duzen: "sinematik", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Panel ve yüzey odaklı sonuç sahnesi", "Uygulama standardı ve bakım sonrası rehber"] },
    { etiket: "Paket ve iş emri", aciklama: "Hizmet kapsamını araç sınıfı, yüzey ihtiyacı, işlem süresi ve teslim standardıyla karşılaştırılabilir kartlara ayırır.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Kapsam ve süre bazlı uygulama kartları", "Onay, teslim ve bakım bilgisini birlikte sunma"] },
  ],
  "yapi-sistemleri": [
    { etiket: "Mimari keşif", aciklama: "Sistem seçimi, ölçü ve keşif çağrısını çizgisel mimari motiflerle dengeli bir düzende birleştirir.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Ölçü ve keşif vurgusu", "Mimari tipografi ve ızgara dili"] },
    { etiket: "Sistem vitrini", aciklama: "Ürün tiplerini hareketli bilgi panelleri ve kısa teknik faydalarla vitrin mantığında gösterir.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Sistem bazlı proje seçkisi", "Malzeme ve kullanım detayı"] },
    { etiket: "Teknik çözüm", aciklama: "Dayanım, ölçülendirme ve montaj sürecini düzenli teknik panellerle açıklar.", duzen: "teknik", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Teknik karar kartları", "Adım adım montaj akışı"] },
  ],
  "proje-portfoyu": [
    { etiket: "Editoryal stüdyo", aciklama: "Proje hikâyesini geniş boşluklar, güçlü tipografi ve hareketli uygulama katmanlarıyla anlatır.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "ferah", gorselOrani: "karisik", ozellikler: ["Proje hikâyesi önceliği", "Asimetrik içerik ritmi"] },
    { etiket: "Proje arşivi", aciklama: "Tamamlanan işleri kategori, sonuç ve teslim mantığıyla güçlü bir portföye dönüştürür.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "dengeli", gorselOrani: "panorama", ozellikler: ["İkon destekli proje ızgarası", "Süreç ve sonuç eşleşmesi"] },
    { etiket: "Uygulama planı", aciklama: "Hizmet kapsamını, iş sırasını ve teslim yaklaşımını teknik bir düzende netleştirir.", duzen: "teknik", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Kapsam bazlı hizmet düzeni", "Planlama ve teslim akışı"] },
  ],
  "temizlik-servisi": [
    { etiket: "Hijyen operasyon planı", aciklama: "Alan keşfi, yüzey matrisi, ekip planı ve teslim kontrol listesini ilk bakışta anlaşılır bir servis panosuna dönüştürür.", duzen: "servis", kartStili: "yumusak", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Alan ve yüzey bazlı temizlik matrisi", "Kontrol listeli hizmet teslimi"] },
    { etiket: "Doğrulanabilir sonuç", aciklama: "Uygulama öncesi durum, kullanılan yöntem, kritik alanlar ve son kontrolü akışkan katmanlarla görünür kılar.", duzen: "sinematik", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Öncesi, yöntem ve sonuç ilişkisi", "Leke, kuruma ve yüzey güvenliği anlatımı"] },
    { etiket: "Periyodik hizmet sistemi", aciklama: "Alan türü, görev sıklığı, ekip sorumluluğu ve kalite kontrolünü kurumsal alıcıların tarayacağı plan kartlarında sunar.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Günlük, haftalık ve dönemsel görev planı", "Ekip, malzeme ve kalite kontrol görünürlüğü"] },
  ],
  "hijyen-kontrol": [
    { etiket: "Risk keşif protokolü", aciklama: "Zararlı türü, yoğunluk, giriş noktaları ve hassas alanları kayıt altına alan kontrollü keşif düzeni kurar.", duzen: "teknik", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Risk bölgesi ve zararlı türü kaydı", "Hazırlık ve alan güvenliği protokolü"] },
    { etiket: "Uygulama güvenliği", aciklama: "Ürün, yöntem, doz, bekleme süresi ve alana dönüş bilgisini güvenlik öncelikli servis panellerinde açıklar.", duzen: "servis", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Ürün ve uygulama bilgisinin şeffaf sunumu", "İnsan, evcil hayvan ve gıda alanı uyarıları"] },
    { etiket: "Takip ve raporlama", aciklama: "Uygulama raporunu, kontrol tarihini ve koruyucu önlemleri planlı bir takip akışına bağlar.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Uygulama sonrası kontrol takvimi", "Kayıtlı rapor ve önleyici öneriler"] },
  ],
  "acil-saha-servisi": [
    { etiket: "Hızlı servis", aciklama: "Sorun, hizmet bölgesi ve iletişim yolunu gecikmeden gösteren dönüşüm odaklı yapı kurar.", duzen: "servis", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "karisik", ozellikler: ["Tek dokunuşla servis talebi", "Hizmet bölgesi görünürlüğü"] },
    { etiket: "Teknik güven", aciklama: "Arıza türlerini, müdahale biçimini ve güvenlik adımlarını teknik bir sunumla açıklar.", duzen: "teknik", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "kare", ozellikler: ["Sorun türüne göre yönlendirme", "Güvenlik ve kontrol adımları"] },
    { etiket: "Yerinde çözüm", aciklama: "Saha, konum ve müdahale bilgisini hareketli teknik panellerle dengeler; kullanıcıyı kısa talep formuna taşır.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Konum ve uygunluk akışı", "Kısa talep formu önceliği"] },
  ],
  "teknik-servis-saha": [
    { etiket: "Güvenli servis kaydı", aciklama: "Arıza belirtisi, konum, cihaz veya tesisat bilgisi ve aciliyet seviyesini düzenli bir servis kabul ekranında toplar.", duzen: "servis", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "karisik", ozellikler: ["Belirti ve varlık bazlı servis kaydı", "Aciliyet ve hizmet bölgesi görünürlüğü"] },
    { etiket: "Ölçüm ve teşhis", aciklama: "Güvenli izolasyon, ölçüm, arıza tespiti ve müdahale onayını teknik bir teşhis raporu gibi sunar.", duzen: "teknik", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "kare", ozellikler: ["Ölçüm bulgusu ve müdahale gerekçesi", "İşlem öncesi kapsam ve parça onayı"] },
    { etiket: "Test ve servis raporu", aciklama: "Onarım sonrası çalışma, sızdırmazlık, koruma ve güvenlik testlerini kayıtlı teslim akışına bağlar.", duzen: "rezervasyon", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["İşlem sonrası fonksiyon ve güvenlik testi", "Bakım notu ve servis raporu teslimi"] },
  ],
  "butik-bakim": [
    { etiket: "Danışmanlık ve randevu", aciklama: "Ön görüşme, uygun işlem, tahmini süre ve bakım sonrası beklentiyi zarif bir randevu yolculuğunda birleştirir.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "portre", ozellikler: ["Ön görüşme ve uygunluk değerlendirmesi", "İşlem süresi ve bakım sonrası bilgilendirme"] },
    { etiket: "Uzmanlık editörü", aciklama: "Kesim, renk, cilt veya bakım sonucunu uzman yaklaşımı ve kişiye özel kararlarla editoryal bir seçkiye dönüştürür.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "dengeli", gorselOrani: "portre", ozellikler: ["Uzmanlık ve sonuç eşleşmesi", "Gerçekçi beklenti ve kişiye uyarlama anlatımı"] },
    { etiket: "Uygulama protokolü", aciklama: "Hizmetleri hazırlık, hijyen, uygulama ve evde bakım bilgileriyle kıyaslanabilir profesyonel kartlarda sunar.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Hazırlık ve hijyen standardı", "Uygulama sonrası bakım planı"] },
  ],
  "saglik-danismanlik": [
    { etiket: "Sakin görüşme", aciklama: "Uzmanlık alanlarını mahremiyet ve güven duygusunu koruyan sakin bir akışta anlatır.", duzen: "klinik", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "portre", ozellikler: ["Uzman yaklaşımı önceliği", "Görüşme biçimi ve mahremiyet"] },
    { etiket: "Uzmanlık rehberi", aciklama: "Danışanın kendine uygun hizmeti bulmasını açıklayıcı konu kartlarıyla kolaylaştırır.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Konu bazlı uzmanlık akışı", "Bilgilendirici soru-cevap alanı"] },
    { etiket: "Kolay randevu", aciklama: "İlk görüşme, süreç ve randevu seçeneklerini kısa ve güvenli bir yolculukta birleştirir.", duzen: "rezervasyon", kartStili: "katmanli", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["İlk görüşme beklentisi", "Belirgin fakat sakin randevu yolu"] },
  ],
  "klinik-guven": [
    { etiket: "Klinik güven", aciklama: "Hizmetleri, uzman yaklaşımını ve randevu bilgisini hijyenik ve ölçülü bir düzende sunar.", duzen: "klinik", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "karisik", ozellikler: ["Tedavi ve uzmanlık ayrımı", "Güven veren randevu paneli"] },
    { etiket: "Tedavi rehberi", aciklama: "Hizmetleri anlaşılır kategorilere ayırır; karar öncesi soruları açıkça yanıtlar.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "kare", ozellikler: ["Hizmet bazlı bilgi kartları", "Süreç ve hazırlık açıklamaları"] },
    { etiket: "Merkez vitrini", aciklama: "Klinik ortamını ve uygulama alanlarını ölçülü bilgi panelleriyle destekleyen güven odaklı sunum kurar.", duzen: "editorial", kartStili: "katmanli", yogunluk: "dengeli", gorselOrani: "panorama", ozellikler: ["Merkez ve ekipman görünürlüğü", "Uzmanlık hikâyesi"] },
  ],
  "emlak-portfoyu": [
    { etiket: "Portföy vitrini", aciklama: "İlanları konum, tip ve değer verileriyle desteklenen okunaklı bilgi bloklarında sunar.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "dengeli", gorselOrani: "panorama", ozellikler: ["İlan odaklı geniş kartlar", "Portföy talebine hızlı geçiş"] },
    { etiket: "Danışmanlık ofisi", aciklama: "Bölge uzmanlığı, süreç ve danışmanlık değerini kurumsal bir editoryal yapıda anlatır.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "ferah", gorselOrani: "karisik", ozellikler: ["Bölge ve danışmanlık vurgusu", "Alım-satım süreci açıklaması"] },
    { etiket: "İlan kataloğu", aciklama: "Portföy tiplerini karşılaştırılabilir kartlarla sıralar ve mobil taramayı hızlandırır.", duzen: "katalog", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Kategori hissi veren ilan düzeni", "Kısa bilgi ve hızlı talep"] },
  ],
  "yaratici-portfoy": [
    { etiket: "Seçili işler", aciklama: "Çekim türlerini, yaklaşımı ve seçili işleri düşük metin yoğunluklu güçlü bir portföy ritmine taşır.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "karisik", ozellikler: ["Öne çıkan seçili işler", "Çekim türüne hızlı geçiş"] },
    { etiket: "Editoryal hikâye", aciklama: "Çekim yaklaşımını, estetik dili ve proje hikâyelerini dergi düzeninde anlatır.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "portre", ozellikler: ["Dergi ritminde proje anlatımı", "Yaklaşım ve süreç dengesi"] },
    { etiket: "Çekim menüsü", aciklama: "Çekim türlerini, teslim yaklaşımını ve talep yolunu düzenli kartlarla gösterir.", duzen: "katalog", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Çekim türü karşılaştırması", "Brief ve tarih talebi"] },
  ],
  "etkinlik-sahnesi": [
    { etiket: "Sinematik davet", aciklama: "Mekânı, atmosferi ve davet akışını hareketli kutlama motifleriyle etkileyici biçimde hissettirir.", duzen: "sinematik", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Mekân odaklı açılış", "Davet akışından güçlü seçki"] },
    { etiket: "Salon vitrini", aciklama: "Salon seçenekleri ve paketleri kapasite, düzen ve tarih bilgileriyle kolay karşılaştırılır biçimde sunar.", duzen: "portfoy", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Salon ve düzen seçenekleri", "Kapasite ve paket görünürlüğü"] },
    { etiket: "Tarih planlama", aciklama: "Paket seçimi, tarih uygunluğu ve teklif akışını rezervasyon merkezli hale getirir.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Tarih ve kişi sayısı akışı", "Kısa teklif formu"] },
  ],
  "spor-enerjisi": [
    { etiket: "Performans kulübü", aciklama: "Antrenman, ekipman ve salon enerjisini yüksek kontrastlı dinamik bir yapıda sunar.", duzen: "teknik", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "panorama", ozellikler: ["Program ve hedef odaklı kartlar", "Güçlü üyelik çağrısı"] },
    { etiket: "Hareket vitrini", aciklama: "Ders ve antrenman enerjisini nabızlı hareketler, program blokları ve performans verileriyle öne çıkarır.", duzen: "sinematik", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Hareket odaklı seçki", "Salon atmosferi"] },
    { etiket: "Program seçimi", aciklama: "Dersleri ve üyelik seçeneklerini mobilde kolay kıyaslanabilir hale getirir.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "kare", ozellikler: ["Ders ve program ayrımı", "Hedefe göre yönlendirme"] },
  ],
  "okul-yasami": [
    { etiket: "Okul yaşamı", aciklama: "Sınıf, oyun ve gelişim alanlarını sıcak renkler, yumuşak şekiller ve güvenli bir akışla tanıtır.", duzen: "egitim", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "karisik", ozellikler: ["Günlük yaşam ve etkinlikler", "Veli güvenini destekleyen içerik"] },
    { etiket: "Gelişim yolculuğu", aciklama: "Programları yaş ve gelişim odağıyla düzenler; eğitim yaklaşımını görünür kılar.", duzen: "editorial", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "portre", ozellikler: ["Program ve gelişim alanları", "Eğitim yaklaşımı anlatımı"] },
    { etiket: "Tanışma planı", aciklama: "Okul ziyareti, program inceleme ve tanışma görüşmesini kolay bir kayıt akışına bağlar.", duzen: "rezervasyon", kartStili: "katmanli", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Okul ziyareti yönlendirmesi", "Kısa veli iletişim yolu"] },
  ],
  "akademik-program": [
    { etiket: "Program rehberi", aciklama: "Eğitim programlarını, seviyeleri ve kazanımları net bir akademik düzende sunar.", duzen: "egitim", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Seviye bazlı program düzeni", "Kazanım ve yöntem açıklaması"] },
    { etiket: "Akademik katalog", aciklama: "Kurs seçeneklerini karşılaştırmayı ve doğru programa ulaşmayı hızlandırır.", duzen: "katalog", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Program karşılaştırma kartları", "Hedefe göre seçim akışı"] },
    { etiket: "Seviye görüşmesi", aciklama: "Program bilgisini seviye belirleme ve danışmanlık çağrısıyla birleştirir.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Seviye değerlendirme adımı", "Danışmanlık odaklı kayıt yolu"] },
  ],
  "urun-katalogu": [
    { etiket: "Ürün vitrini", aciklama: "Ürünleri kategori blokları, kısa seçim bilgileri ve kolay talep akışıyla düzenli biçimde sunar.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "kare", ozellikler: ["Ürün kategorisi hissi", "Mobilde kolay ürün tarama"] },
    { etiket: "Butik koleksiyon", aciklama: "Ürünlerin işçiliğini ve duygusunu editoryal, seçkin bir görünümle öne çıkarır.", duzen: "editorial", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "portre", ozellikler: ["Koleksiyon odaklı sunum", "Ürün hikâyesi ve ayrıntı"] },
    { etiket: "Hızlı sipariş", aciklama: "Ürün seçimini teslim, adet veya tarih bilgisiyle kısa bir sipariş yoluna bağlar.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "kompakt", gorselOrani: "karisik", ozellikler: ["Teslim ve sipariş bilgisi", "WhatsApp'a doğal yönlendirme"] },
  ],
  "zanaat-atolyesi": [
    { etiket: "Usta işi", aciklama: "Malzeme, üretim ve işçilik ayrıntılarını sıcak bir atölye kimliğiyle anlatır.", duzen: "zanaat", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "karisik", ozellikler: ["Malzeme ve işçilik vurgusu", "Üretim süreci görünürlüğü"] },
    { etiket: "Mekân portföyü", aciklama: "Tamamlanan uygulamaları malzeme, ölçü ve sonuç bilgileriyle profesyonel bir seçkiye dönüştürür.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Mekâna uygulanmış ürünler", "Proje bazlı seçki"] },
    { etiket: "Üretim kataloğu", aciklama: "Ürün gruplarını, ölçü seçeneklerini ve özel üretim yolunu düzenli biçimde gösterir.", duzen: "katalog", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "kare", ozellikler: ["Ürün grubu karşılaştırması", "Ölçü ve özel üretim talebi"] },
  ],
  "lojistik-rota": [
    { etiket: "Ekspertiz ve envanter", aciklama: "Çıkış-varış, kat, erişim, eşya hacmi ve özel parçaları operasyon öncesi kayıt altına alan taşıma planı kurar.", duzen: "servis", kartStili: "keskin", yogunluk: "kompakt", gorselOrani: "karisik", ozellikler: ["Adres, erişim ve eşya envanteri", "Araç, ekip ve zaman penceresi planı"] },
    { etiket: "Paketleme operasyonu", aciklama: "Malzeme seçimi, oda kodlama, yükleme sırası ve araç içi sabitlemeyi teknik kontrol noktalarıyla sunar.", duzen: "teknik", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "panorama", ozellikler: ["Oda ve koli kodlama sistemi", "Yükleme sırası ve koruma kontrolü"] },
    { etiket: "Rota ve teslim tutanağı", aciklama: "Başlangıç, varış, tarih ve hizmet kapsamını teklif akışına; yerleşim ve son kontrolü teslim kaydına bağlar.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "ferah", gorselOrani: "kare", ozellikler: ["Rota, tarih ve erişim odaklı teklif", "Teslim, yerleşim ve son kontrol kaydı"] },
  ],
  "seyahat-rezervasyonu": [
    { etiket: "Kolay rezervasyon", aciklama: "Araç veya transfer seçimini tarih, rota ve iletişim bilgisiyle hızlıca birleştirir.", duzen: "rezervasyon", kartStili: "yumusak", yogunluk: "kompakt", gorselOrani: "karisik", ozellikler: ["Tarih ve rota odaklı akış", "Mobilde hızlı rezervasyon"] },
    { etiket: "Filo vitrini", aciklama: "Araç seçeneklerini sınıf, kapasite ve rota verileriyle profesyonel bir filoya dönüştürür.", duzen: "portfoy", kartStili: "katmanli", yogunluk: "ferah", gorselOrani: "panorama", ozellikler: ["Araç sınıfı ve kapasite", "Veri destekli filo sunumu"] },
    { etiket: "Seçenek kataloğu", aciklama: "Hizmet ya da araç türlerini kolay karşılaştırılan kartlarla listeler.", duzen: "katalog", kartStili: "cerceveli", yogunluk: "dengeli", gorselOrani: "kare", ozellikler: ["Karşılaştırılabilir seçenekler", "Kapsam ve uygunluk bilgisi"] },
  ],
};

const akislar = {
  otomotiv: ["hero", "guven", "hizmetler", "surec", "hikaye", "sss", "iletisim"],
  proje: ["hero", "hikaye", "hizmetler", "surec", "guven", "sss", "iletisim"],
  hizmet: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"],
  acil: ["hero", "guven", "hizmetler", "surec", "sss", "hikaye", "iletisim"],
  bakim: ["hero", "hizmetler", "surec", "guven", "hikaye", "sss", "iletisim"],
  hijyen: ["hero", "guven", "surec", "hizmetler", "sss", "hikaye", "iletisim"],
  teknik: ["hero", "guven", "hizmetler", "surec", "sss", "hikaye", "iletisim"],
  lojistik: ["hero", "guven", "surec", "hizmetler", "sss", "hikaye", "iletisim"],
  saglik: ["hero", "guven", "hizmetler", "hikaye", "surec", "sss", "iletisim"],
  katalog: ["hero", "hizmetler", "guven", "hikaye", "surec", "sss", "iletisim"],
  rezervasyon: ["hero", "hizmetler", "guven", "surec", "sss", "hikaye", "iletisim"],
} satisfies Record<string, AnaSayfaBolumu[]>;

const sektorKimlikleri: Record<string, SektorKimligi> = {
  "oto-yikama": { aile: "otomotiv-atolye", odak: "Araç kabul kaydı, yüzey güvenliği, doğru yıkama reçetesi ve kontrollü teslim", temalar: ["torque", "obsidian", "skyline"], adlar: ["Araç Kabul Sistemi", "Yıkama Sonuç Stüdyosu", "Paket ve Teslim Planı"], anaSayfaAkisi: akislar.otomotiv },
  "oto-detaylandirma": { aile: "otomotiv-atolye", odak: "Yüzey analizi, boya düzeltme, koruma reçetesi ve ışık altında kalite kontrolü", temalar: ["torque", "noir", "copper"], adlar: ["Detay Atölyesi", "Yüzey Koruma Stüdyosu", "Uygulama Reçetesi"], anaSayfaAkisi: akislar.otomotiv },
  "arac-kaplama": { aile: "otomotiv-atolye", odak: "Yüzey geçmişi, film seçimi, kesim-köşe işçiliği ve kürlenme sonrası teslim", temalar: ["torque", "studio", "copper"], adlar: ["Kaplama Laboratuvarı", "Film ve Yüzey Stüdyosu", "Uygulama Kataloğu"], anaSayfaAkisi: akislar.otomotiv },
  "cam-balkon": { aile: "yapi-sistemleri", odak: "Sistem seçimi, ölçü, yalıtım ve temiz montaj", temalar: ["skyline", "mono", "marble"], adlar: ["Şeffaf Mekân", "Sistem Vitrini", "Teknik Balkon"], anaSayfaAkisi: akislar.proje },
  tente: { aile: "yapi-sistemleri", odak: "Gölgelendirme, ölçülendirme, kumaş ve taşıyıcı sistem", temalar: ["sand", "terra", "copper"], adlar: ["Gölge Mimari", "Pergola Vitrini", "Tente Sistemleri"], anaSayfaAkisi: akislar.proje },
  tadilat: { aile: "proje-portfoyu", odak: "Keşif, iş kalemleri, uygulama sırası ve teslim disiplini", temalar: ["copper", "marble", "mono"], adlar: ["Dönüşüm Stüdyosu", "Önce Sonra", "Uygulama Planı"], anaSayfaAkisi: akislar.proje },
  dekorasyon: { aile: "proje-portfoyu", odak: "Mekân dili, malzeme seçimi ve tamamlanmış uygulamalar", temalar: ["terra", "marble", "artisan"], adlar: ["Mekân Hikâyesi", "Dekor Portföyü", "Malzeme Planı"], anaSayfaAkisi: akislar.proje },
  temizlik: { aile: "temizlik-servisi", odak: "Alan keşfi, yüzey matrisi, ekip görev planı ve kontrol listeli hijyen teslimi", temalar: ["hygiene", "lagoon", "aurora"], adlar: ["Hijyen Operasyon Planı", "Doğrulanabilir Sonuç", "Periyodik Hizmet Sistemi"], anaSayfaAkisi: akislar.hizmet },
  "koltuk-yikama": { aile: "temizlik-servisi", odak: "Kumaş etiketi ve renk testi, leke protokolü, kontrollü ekstraksiyon ve nem takibi", temalar: ["hygiene", "lagoon", "skyline"], adlar: ["Kumaş Kabul Protokolü", "Leke ve Sonuç Stüdyosu", "Kuruma Takip Planı"], anaSayfaAkisi: ["hero", "guven", "hizmetler", "surec", "sss", "hikaye", "iletisim"] },
  "hali-yikama": { aile: "temizlik-servisi", odak: "Barkodlu kabul, dokuma sınıflandırması, yıkama reçetesi, kontrollü kurutma ve iade", temalar: ["hygiene", "aurora", "sand"], adlar: ["Halı Kabul Sistemi", "Yıkama ve Kurutma Hattı", "Kayıtlı Teslim Planı"], anaSayfaAkisi: ["hero", "guven", "surec", "hizmetler", "sss", "hikaye", "iletisim"] },
  ilaclama: { aile: "hijyen-kontrol", odak: "Risk keşfi, güvenli ürün-yöntem seçimi, uygulama raporu ve planlı takip", temalar: ["signal", "hygiene", "copper"], adlar: ["Risk Keşif Protokolü", "Uygulama Güvenliği", "Takip ve Raporlama"], anaSayfaAkisi: akislar.hijyen },
  "guzellik-salonu": { aile: "butik-bakim", odak: "Ön görüşme, hijyen protokolü, kişiye uygun bakım ve uygulama sonrası takip", temalar: ["pearl", "ruby", "ivory"], adlar: ["Bakım Danışmanlığı", "Uzmanlık Editörü", "Uygulama Protokolü"], anaSayfaAkisi: akislar.bakim },
  kuafor: { aile: "butik-bakim", odak: "Saç geçmişi analizi, teknik renk-kesim reçetesi, stil sonucu ve evde bakım planı", temalar: ["pearl", "studio", "ivory"], adlar: ["Saç Danışmanlığı", "Stil ve Renk Editörü", "Teknik Uygulama Menüsü"], anaSayfaAkisi: akislar.bakim },
  berber: { aile: "butik-bakim", odak: "Yüz-saç oranı, hijyenli ekipman, usta kesim protokolü ve bakım periyodu", temalar: ["artisan", "noir", "pearl"], adlar: ["Usta Kabulü", "Kesim ve Sakal Kulübü", "Bakım Protokolü"], anaSayfaAkisi: akislar.bakim },
  diyetisyen: { aile: "saglik-danismanlik", odak: "Kişiye özel değerlendirme, takip ve sürdürülebilir beslenme", temalar: ["lagoon", "sage", "clinic"], adlar: ["Beslenme Rehberi", "Dengeli Yaklaşım", "Görüşme Planı"], anaSayfaAkisi: akislar.saglik },
  psikolog: { aile: "saglik-danismanlik", odak: "Uzmanlık alanı, güvenli görüşme ve mahremiyet", temalar: ["sage", "ivory", "lagoon"], adlar: ["Sakin Alan", "Uzmanlık Notları", "İlk Görüşme"], anaSayfaAkisi: ["hero", "guven", "hikaye", "hizmetler", "surec", "sss", "iletisim"] },
  fizyoterapist: { aile: "klinik-guven", odak: "Değerlendirme, hareket planı, uygulama ve ilerleme takibi", temalar: ["clinic", "lagoon", "sage"], adlar: ["Hareket Kliniği", "Tedavi Rehberi", "Merkez ve Egzersiz"], anaSayfaAkisi: akislar.saglik },
  "dis-klinigi": { aile: "klinik-guven", odak: "Tedavi seçenekleri, hekim yaklaşımı, klinik güveni ve randevu", temalar: ["lagoon", "clinic", "skyline"], adlar: ["Gülüş Kliniği", "Tedavi Rehberi", "Modern Klinik"], anaSayfaAkisi: akislar.saglik },
  veteriner: { aile: "klinik-guven", odak: "Hayvan sağlığı hizmetleri, klinik ortamı ve ulaşılabilir destek", temalar: ["sage", "clinic", "terra"], adlar: ["Dost Kliniği", "Bakım Rehberi", "Kliniğimiz"], anaSayfaAkisi: akislar.saglik },
  emlak: { aile: "emlak-portfoyu", odak: "İlan seçkisi, bölge uzmanlığı ve doğru portföy talebi", temalar: ["skyline", "ivory", "royal"], adlar: ["Seçili Portföy", "Emlak Danışmanı", "İlan Kataloğu"], anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"] },
  mimarlik: { aile: "proje-portfoyu", odak: "Mimari yaklaşım, proje bağlamı, süreç ve seçili yapılar", temalar: ["mono", "marble", "ivory"], adlar: ["Mimari Editör", "Proje Arşivi", "Tasarım Süreci"], anaSayfaAkisi: akislar.proje },
  fotografci: { aile: "yaratici-portfoy", odak: "Çekim dili, seçili işler, teslim yaklaşımı ve brief", temalar: ["studio", "mono", "noir"], adlar: ["Seçili Kareler", "İş Hikâyesi", "Çekim Türleri"], anaSayfaAkisi: ["hero", "hizmetler", "hikaye", "guven", "surec", "sss", "iletisim"] },
  "dugun-salonu": { aile: "etkinlik-sahnesi", odak: "Salon atmosferi, davet paketleri, kapasite ve tarih uygunluğu", temalar: ["noir", "ivory", "studio"], adlar: ["Davet Planı", "Salon Seçkisi", "Tarih Planı"], anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"] },
  "spor-salonu": { aile: "spor-enerjisi", odak: "Antrenman programları, salon olanakları, hedef ve üyelik", temalar: ["obsidian", "neon", "copper"], adlar: ["Performans Alanı", "Program Akışı", "Program Seçimi"], anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"] },
  anaokulu: { aile: "okul-yasami", odak: "Gelişim programı, güvenli okul ortamı, günlük yaşam ve veli görüşmesi", temalar: ["terra", "aurora", "sage"], adlar: ["Neşeli Okul", "Gelişim Yolculuğu", "Okulu Tanıyın"], anaSayfaAkisi: ["hero", "guven", "hizmetler", "hikaye", "surec", "sss", "iletisim"] },
  "ozel-egitim-kursu": { aile: "akademik-program", odak: "Program içeriği, seviye, eğitim yöntemi ve kayıt danışmanlığı", temalar: ["aurora", "royal", "skyline"], adlar: ["Eğitim Rehberi", "Program Kataloğu", "Seviye Görüşmesi"], anaSayfaAkisi: ["hero", "hizmetler", "guven", "surec", "hikaye", "sss", "iletisim"] },
  matbaa: { aile: "urun-katalogu", odak: "Baskı türü, malzeme, adet, termin ve örnek işler", temalar: ["mono", "copper", "studio"], adlar: ["Baskı Kataloğu", "Seçili İşler", "Hızlı Teklif"], anaSayfaAkisi: akislar.katalog },
  cicekci: { aile: "urun-katalogu", odak: "Aranjman türü, gönderim amacı, tazelik ve teslim zamanı", temalar: ["sage", "terra", "ruby"], adlar: ["Çiçek Seçkisi", "Butik Aranjman", "Aynı Gün Sipariş"], anaSayfaAkisi: akislar.katalog },
  pastane: { aile: "urun-katalogu", odak: "Pasta ve ürün çeşitleri, özel gün, kişi sayısı ve teslim", temalar: ["ruby", "bistro", "ivory"], adlar: ["Tatlı Vitrini", "Butik Pastane", "Özel Sipariş"], anaSayfaAkisi: akislar.katalog },
  mobilya: { aile: "zanaat-atolyesi", odak: "Malzeme, ölçü, özel üretim, işçilik ve mekâna uygulama", temalar: ["artisan", "marble", "terra"], adlar: ["Usta Atölye", "Mekân Portföyü", "Üretim Kataloğu"], anaSayfaAkisi: akislar.proje },
  elektrikci: { aile: "teknik-servis-saha", odak: "Güvenli enerji izolasyonu, ölçümle arıza tespiti, müdahale onayı ve koruma testi", temalar: ["signal", "obsidian", "skyline"], adlar: ["Elektrik Servis Kaydı", "Ölçüm ve Teşhis", "Test ve Servis Raporu"], anaSayfaAkisi: akislar.teknik },
  tesisatci: { aile: "teknik-servis-saha", odak: "Kaçak-kaynak tespiti, kontrollü müdahale, basınç veya sızdırmazlık testi ve teslim", temalar: ["signal", "lagoon", "skyline"], adlar: ["Tesisat Servis Kaydı", "Kaynak ve Müdahale", "Sızdırmazlık Raporu"], anaSayfaAkisi: akislar.teknik },
  "kombi-servisi": { aile: "teknik-servis-saha", odak: "Cihaz ve hata kaydı, ölçümlü bakım, parça onayı, yanma ve sızdırmazlık güvenliği", temalar: ["signal", "copper", "obsidian"], adlar: ["Cihaz Servis Kaydı", "Bakım ve Teşhis", "Güvenlik Test Raporu"], anaSayfaAkisi: akislar.teknik },
  nakliyat: { aile: "lojistik-rota", odak: "Ekspertiz ve envanter, erişim-rota planı, kodlu paketleme, kontrollü yükleme ve teslim tutanağı", temalar: ["cargo", "skyline", "copper"], adlar: ["Ekspertiz ve Envanter", "Paketleme Operasyonu", "Rota ve Teslim Tutanağı"], anaSayfaAkisi: akislar.lojistik },
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
      aciklama: `${kimlik.odak}. ${secenek.aciklama} Fotoğraf, galeri veya görsel yer tutucusu kullanmadan güçlü tipografi ve düzenli içerik akışıyla çalışır.`,
      tema: kimlik.temalar[index],
      aile: kimlik.aile,
      duzen: secenek.duzen,
      kartStili: secenek.kartStili,
      yogunluk: secenek.yogunluk,
      gorselOrani: secenek.gorselOrani,
      medyaStratejisi: "metin-odakli",
      gorselLimiti: 4,
      ozellikler: [
        kimlik.odak,
        "Yalnızca metin ve içerik hiyerarşisi",
        "Sektörel tipografi ve dengeli hareket",
        ...secenek.ozellikler,
      ],
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
