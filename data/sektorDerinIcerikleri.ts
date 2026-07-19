export interface PaketIcerigi {
  ad: string;
  etiket: string;
  aciklama: string;
  maddeler: string[];
}

export interface SenaryoIcerigi {
  baslik: string;
  aciklama: string;
}

export interface SektorDerinIcerigi {
  hareketDili: "editorial" | "club" | "soft" | "pop" | "route" | "luxury" | "clean" | "ink" | "signal" | "flow" | "stage" | "surface" | "wash" | "rescue" | "torque";
  kayanKelimeler: string[];
  baslik: string;
  aciklama: string;
  calismaAlanlari: string[];
  paketler: PaketIcerigi[];
  senaryolar: SenaryoIcerigi[];
  kaliteNotlari: string[];
}

const icerikler: Record<string, SektorDerinIcerigi> = {
  kuafor: {
    hareketDili: "editorial",
    kayanKelimeler: ["KESİM", "RENK", "BALYAJ", "BAKIM", "FORM", "DANIŞMANLIK", "IŞILTI", "RANDEVU"],
    baslik: "Saçınız için tek işlem değil, devam eden bir stil planı.",
    aciklama: "İlk görüşmeden sonraki bakım randevusuna kadar saçın formunu, rengini ve günlük kullanımını birlikte ele alan üç net çalışma biçimi.",
    calismaAlanlari: ["Kadın saç kesimi", "Renklendirme", "Balyaj ve ışıltı", "Keratin bakımı", "Gelin hazırlığı", "Saç derisi analizi"],
    paketler: [
      { ad: "Salon Başlangıcı", etiket: "İLK RANDEVU", aciklama: "Saç geçmişini ve hedef görünümü netleştiren danışmanlık odaklı başlangıç.", maddeler: ["Saç ve yüz formu analizi", "Uygulanabilir görünüm planı", "İşlem süresi ve bakım bilgisi"] },
      { ad: "Renk Dönüşümü", etiket: "TEKNİK DOSYA", aciklama: "Büyük renk değişimlerinde kontrollü açma, tonlama ve koruma planı.", maddeler: ["Tutam ve ton değerlendirmesi", "Aşamalı uygulama kararı", "Evde renk koruma rutini"] },
      { ad: "Özel Gün Atölyesi", etiket: "PROVA + UYGULAMA", aciklama: "Gelin ve davet görünümünü kıyafet, aksesuar ve gün akışıyla birlikte tasarlar.", maddeler: ["Model ve aksesuar provası", "Hazırlık zaman çizelgesi", "Gün boyu kalıcılık planı"] },
    ],
    senaryolar: [
      { baslik: "Büyük renk değişimi", aciklama: "Tek seansta mümkün olanla saç sağlığını korumak için aşamalı yapılması gerekenler ayrılır." },
      { baslik: "Kullanımı kolay kesim", aciklama: "Evde uzun şekillendirme gerektirmeyen form, günlük rutine göre belirlenir." },
      { baslik: "Yıpranmış saç bakımı", aciklama: "Nem, elastikiyet ve ısı geçmişi değerlendirilerek bakım sırası oluşturulur." },
      { baslik: "Gelin günü hazırlığı", aciklama: "Prova, renk tazeleme ve son uygulama tarihleri tek takvimde planlanır." },
    ],
    kaliteNotlari: ["Renk formülü kayıt altına alınır", "İşlem öncesi süre ve kapsam açıklanır", "Sonuç için evde bakım önerisi verilir", "Sonraki randevu aralığı netleştirilir"],
  },
  berber: {
    hareketDili: "club",
    kayanKelimeler: ["HAIRCUT", "BEARD", "HOT TOWEL", "FADE", "GROOM", "CLUB", "CRAFT", "APPOINTMENT"],
    baslik: "Koltuk servisini ihtiyaca göre seçin.",
    aciklama: "Hızlı bir düzeltmeden damat hazırlığına kadar her servis için ayrılan zaman, uygulama kapsamı ve son dokunuşlar baştan belli.",
    calismaAlanlari: ["Klasik kesim", "Skin fade", "Sakal tasarımı", "Sıcak havlu", "Damat tıraşı", "Çocuk kesimi"],
    paketler: [
      { ad: "Signature Cut", etiket: "45 DAKİKA", aciklama: "Saç formu, geçiş ve son şekillendirmeyi kapsayan kişisel koltuk servisi.", maddeler: ["Form danışmanlığı", "Kesim ve yıkama", "Ürün ve kullanım önerisi"] },
      { ad: "Full Groom", etiket: "SAÇ + SAKAL", aciklama: "Saç ve sakal oranını aynı servis içinde bütünleyen kapsamlı bakım.", maddeler: ["Saç-sakal denge planı", "Sıcak havlu ve kontur", "Yüz ve sakal bakımı"] },
      { ad: "Groom Day", etiket: "ÖZEL GÜN", aciklama: "Damat ve özel gün hazırlığında prova ve etkinlik günü servisi.", maddeler: ["Ön form görüşmesi", "Cilt ve sakal hazırlığı", "Etkinlik günü zaman planı"] },
    ],
    senaryolar: [
      { baslik: "İlk kez fade yaptıranlar", aciklama: "Geçiş yüksekliği ve bakım sıklığı yüz formuna göre açıklanır." },
      { baslik: "Sakal formunu değiştirenler", aciklama: "Çene hattı ve yoğunluk değerlendirilerek sürdürülebilir bir kontur seçilir." },
      { baslik: "Düzenli bakım", aciklama: "Önceki kesim numarası ve hat notları korunarak tutarlı sonuç sağlanır." },
      { baslik: "Damat hazırlığı", aciklama: "Cilt, saç ve sakal uygulaması etkinlik saatine göre sıralanır." },
    ],
    kaliteNotlari: ["Her müşteri öncesi steril ekipman", "Koltuk için ayrılmış servis süresi", "Kesim tercihi ve numara kaydı", "Tek kullanımlık sarf düzeni"],
  },
  "guzellik-salonu": {
    hareketDili: "soft",
    kayanKelimeler: ["SKIN", "RITUAL", "CARE", "GLOW", "ANALYSIS", "HYGIENE", "BALANCE", "BEAUTY"],
    baslik: "Bakım hedefinizi seans planına dönüştürün.",
    aciklama: "Tek uygulama seçmek yerine cildin mevcut durumu, hedef ve tekrar aralığıyla oluşturulan anlaşılır bakım yolları.",
    calismaAlanlari: ["Cilt bakımı", "Kaş ve kirpik", "Lazer uygulamaları", "Kalıcı makyaj", "Bölgesel bakım", "Özel gün hazırlığı"],
    paketler: [
      { ad: "Cilt Başlangıcı", etiket: "ANALİZ", aciklama: "Bakım seçmeden önce cilt ihtiyacını ve ev rutinini değerlendiren giriş protokolü.", maddeler: ["Cilt tipi ve hassasiyet", "Bakım hedefi", "Ev rutini önerisi"] },
      { ad: "Düzenli Bakım", etiket: "PROGRAM", aciklama: "Tekrarlayan bakım ihtiyacını seans aralıklarıyla takip edilebilir hale getirir.", maddeler: ["Kişisel bakım takvimi", "Uygulama notları", "Kontrol ve güncelleme"] },
      { ad: "Özel Gün Işıltısı", etiket: "HAZIRLIK", aciklama: "Etkinlik tarihine göre bakım ve son dokunuşları doğru günlere yerleştirir.", maddeler: ["Tarihe göre bakım sırası", "Kaş-kirpik planı", "Son gün uygulaması"] },
    ],
    senaryolar: [
      { baslik: "Hassas cilt", aciklama: "Ürün içeriği ve uygulama yoğunluğu hassasiyet geçmişine göre seçilir." },
      { baslik: "Düzenli seans", aciklama: "Her seansta önceki notlar üzerinden ilerlenir, gereksiz uygulama eklenmez." },
      { baslik: "İlk kez işlem yaptıranlar", aciklama: "Süreç, olası hisler ve bakım sonrası beklentiler baştan anlatılır." },
      { baslik: "Özel gün takvimi", aciklama: "Cildi yormadan sonuç almak için uygulamalar doğru aralıklarla planlanır." },
    ],
    kaliteNotlari: ["Ürün içeriği işlem öncesi paylaşılır", "Hassasiyet notları kaydedilir", "Her randevu için yeni hijyen hazırlığı", "Gerçekçi sonuç ve seans bilgisi"],
  },
  "nail-artist": {
    hareketDili: "pop",
    kayanKelimeler: ["NAIL ART", "GEL", "COLOR", "FORM", "MANICURE", "DETAIL", "LOOKBOOK", "STUDIO"],
    baslik: "Modeli değil, size uygun seti seçin.",
    aciklama: "Tırnak yapısı, uzunluk alışkanlığı ve tasarım detayına göre süre ve uygulama kapsamını netleştiren set rehberi.",
    calismaAlanlari: ["Kalıcı oje", "Jel güçlendirme", "Protez tırnak", "Minimal nail art", "Detaylı tasarım", "Çıkarma ve bakım"],
    paketler: [
      { ad: "Clean Set", etiket: "SADE", aciklama: "Bakımlı görünüm ve günlük kullanım için kısa, temiz ve dengeli set.", maddeler: ["Kuru manikür", "Form düzenleme", "Tek renk uygulama"] },
      { ad: "Studio Set", etiket: "TASARIM", aciklama: "Seçilen renk paleti ve detaylarla kişiselleştirilmiş nail art çalışması.", maddeler: ["Tasarım ön seçimi", "Renk ve form uyarlaması", "Detay uygulaması"] },
      { ad: "Repair & Renew", etiket: "YENİLEME", aciklama: "Mevcut ürünü kontrollü çıkarır, tırnağın ihtiyacına göre yeni seti hazırlar.", maddeler: ["Güvenli çıkarma", "Tırnak yüzeyi kontrolü", "Güçlendirme veya yeni set"] },
    ],
    senaryolar: [
      { baslik: "Kısa tırnak kullanımı", aciklama: "Günlük işlere uyumlu form ve dayanıklı renk seçimi yapılır." },
      { baslik: "Referans tasarım", aciklama: "Görseldeki model tırnak yatağına ve seçilen uzunluğa yeniden uyarlanır." },
      { baslik: "Kırılan set", aciklama: "Sorunlu tırnak değerlendirilir; onarım veya güvenli çıkarma seçilir." },
      { baslik: "Özel gün seti", aciklama: "Kıyafet, aksesuar ve etkinlik temasına göre renk paleti oluşturulur." },
    ],
    kaliteNotlari: ["Metal ekipman sterilizasyonu", "Tek kullanımlık sarf yenileme", "Randevu öncesi tasarım seçimi", "Set sonrası bakım kartı"],
  },
  nakliye: {
    hareketDili: "route",
    kayanKelimeler: ["EKSPERTİZ", "PAKETLEME", "ROTA", "YÜKLEME", "TAKİP", "TESLİM", "FİLO", "OPERASYON"],
    baslik: "Taşıma kapsamını yükünüze göre belirleyin.",
    aciklama: "Parça eşyadan kurumsal ofis geçişine kadar ekip, araç, paketleme ve teslim sorumluluğu farklılaşan operasyon seçenekleri.",
    calismaAlanlari: ["Evden eve", "Şehirler arası", "Ofis taşıma", "Parça eşya", "Asansörlü taşıma", "Paketleme ve depolama"],
    paketler: [
      { ad: "Planlı Taşıma", etiket: "STANDART", aciklama: "Araç, ekip ve yükleme zamanının önceden netleştiği temel operasyon.", maddeler: ["Telefon veya görüntülü ekspertiz", "Araç ve ekip planı", "Yükleme ve teslim"] },
      { ad: "Tam Paket", etiket: "ANAHTAR TESLİM", aciklama: "Paketleme, demontaj ve yeni adreste temel yerleşimi birlikte kapsar.", maddeler: ["Malzemeli paketleme", "Mobilya sökme-kurma", "Oda bazlı yerleşim"] },
      { ad: "Kurumsal Geçiş", etiket: "İŞ SÜREKLİLİĞİ", aciklama: "Ofis ekipmanını departman ve öncelik sırasına göre taşır.", maddeler: ["Birim bazlı etiketleme", "BT ve hassas ekipman planı", "Aşamalı teslim"] },
    ],
    senaryolar: [
      { baslik: "Yüksek kat ve dar erişim", aciklama: "Asansör, merdiven ve cephe uygunluğu araç çıkmadan değerlendirilir." },
      { baslik: "Şehirler arası teslim", aciklama: "Rota, çıkış saati ve teslim aralığı taşıma dosyasına yazılır." },
      { baslik: "Az hacimli yük", aciklama: "Parça eşya için paylaşımlı veya özel araç seçeneği değerlendirilir." },
      { baslik: "Ofis geçişi", aciklama: "Kritik departmanlar ve iş kesintisini azaltan taşıma sırası planlanır." },
    ],
    kaliteNotlari: ["Teklifte hizmet sınırları açık", "Hassas eşyalar ayrı kayıtlı", "Araç-yük hacmi eşleşmesi", "Teslim sonrası oda kontrolü"],
  },
  "vip-tasimacilik": {
    hareketDili: "luxury",
    kayanKelimeler: ["CONCIERGE", "AIRPORT", "PRIVATE", "ROUTE", "COMFORT", "WELCOME", "FLEET", "TRANSFER"],
    baslik: "Yolculuk tipine göre concierge servisi.",
    aciklama: "Tek transferden tam günlük programa kadar araç, sürücü, bekleme ve rota değişikliklerini aynı rezervasyon içinde yöneten seçenekler.",
    calismaAlanlari: ["Havalimanı karşılama", "Kurumsal heyet", "Günlük şoförlü araç", "Şehirler arası VIP", "Düğün transferi", "Özel tur rotası"],
    paketler: [
      { ad: "Airport Welcome", etiket: "UÇUŞ TAKİPLİ", aciklama: "Uçuş bilgisine göre hazırlanan karşılama ve kapıdan kapıya transfer.", maddeler: ["Canlı uçuş takibi", "İsimli karşılama", "Bagaja uygun araç"] },
      { ad: "Business Day", etiket: "TAM GÜN", aciklama: "Toplantı ve ziyaret programında sürücülü aracın gün boyu hazır tutulması.", maddeler: ["Çok duraklı rota", "Esnek bekleme", "Tek program sorumlusu"] },
      { ad: "Private Journey", etiket: "ÖZEL ROTA", aciklama: "Şehirler arası veya gezi programında konfor ve mola planı hazırlanır.", maddeler: ["Kişisel rota", "Konforlu araç sınıfı", "Program değişikliği desteği"] },
    ],
    senaryolar: [
      { baslik: "Uçuş rötarı", aciklama: "Karşılama saati uçuş hareketine göre güncellenir." },
      { baslik: "Kurumsal misafir", aciklama: "Sürücü ve araç bilgisi şirket yetkilisiyle önceden paylaşılır." },
      { baslik: "Çocuklu aile", aciklama: "Bagaj ve çocuk koltuğu ihtiyacı rezervasyonda planlanır." },
      { baslik: "Çok duraklı gün", aciklama: "Durak sırası ve bekleme süreleri tek program üzerinde yönetilir." },
    ],
    kaliteNotlari: ["Sürücü ve plaka önceden paylaşılır", "Transfer öncesi araç hazırlığı", "Gizliliğe saygılı servis", "Tek iletişim sorumlusu"],
  },
  "hali-yikama": {
    hareketDili: "clean",
    kayanKelimeler: ["BARKOD", "LEKE", "YIKAMA", "DURULAMA", "KURUTMA", "PAKETLEME", "SERVİS", "HİJYEN"],
    baslik: "Ürünün dokusuna göre temizlik yolu.",
    aciklama: "Halı, koltuk, yatak ve ev tekstilinde aynı işlem yerine malzeme, leke ve kullanım alanına göre ayrılan hizmet kapsamları.",
    calismaAlanlari: ["Halı ve kilim", "Koltuk ve sandalye", "Yatak ve baza", "Perde ve stor", "Yorgan ve battaniye", "Cami ve iş yeri"],
    paketler: [
      { ad: "Ev Tekstili Servisi", etiket: "ALIM + TESLİM", aciklama: "Halı ve taşınabilir tekstili kapıdan alıp tesiste işleyerek paketli teslim eder.", maddeler: ["Barkodlu kabul", "Dokuya göre program", "Paketli geri teslim"] },
      { ad: "Yerinde Hijyen", etiket: "MOBİL EKİP", aciklama: "Koltuk, yatak ve sabit yüzeylerde ekipmanlı yerinde temizlik.", maddeler: ["Kumaş analizi", "Leke ön işlemi", "Kontrollü nem uygulaması"] },
      { ad: "Geniş Alan", etiket: "KURUMSAL", aciklama: "Cami, ofis ve toplu kullanım alanlarında metrekareye göre ekip planı.", maddeler: ["Yerinde keşif", "Bölgesel çalışma planı", "Kuruma ve kullanıma açma"] },
    ],
    senaryolar: [
      { baslik: "Hassas dokuma", aciklama: "Renk dayanımı ve doku yapısı standart programdan önce değerlendirilir." },
      { baslik: "Yoğun leke ve koku", aciklama: "Sonuç beklentisi ve olası risk kabul sırasında açıkça paylaşılır." },
      { baslik: "Evcil hayvanlı ev", aciklama: "Koku ve tüy yoğunluğuna göre ön vakum ve uygulama planı hazırlanır." },
      { baslik: "İş yeri uygulaması", aciklama: "Çalışma saatini aksatmayacak bölüm ve kuruma sırası belirlenir." },
    ],
    kaliteNotlari: ["Müşteri-ürün eşleşmeli kabul", "Dokuma türüne uygun kimya", "Kapalı ve kontrollü kurutma", "Teslim öncesi leke kontrolü"],
  },
  dovmeci: {
    hareketDili: "ink",
    kayanKelimeler: ["CUSTOM", "FINE LINE", "BLACKWORK", "INK", "DESIGN", "STERILE", "SESSION", "AFTERCARE"],
    baslik: "Fikrin ölçüsüne ve detayına göre seans planı.",
    aciklama: "Küçük sembolden cover-up çalışmasına kadar çizim, yerleşim, seans süresi ve bakım sürecini açıklayan proje seçenekleri.",
    calismaAlanlari: ["Fine line", "Blackwork", "Minimal", "Lettering", "Cover-up", "Rötuş ve yenileme"],
    paketler: [
      { ad: "Small Original", etiket: "TEK SEANS", aciklama: "Küçük ölçekte kişisel sembol ve minimal kompozisyon çalışması.", maddeler: ["Fikir görüşmesi", "Özgün çizim", "Seans ve bakım bilgisi"] },
      { ad: "Custom Project", etiket: "TASARIM DOSYASI", aciklama: "Vücut akışına göre hazırlanan orta-büyük ölçekli özgün proje.", maddeler: ["Stil ve yerleşim araştırması", "Ölçüye özel kompozisyon", "Gerekirse çoklu seans planı"] },
      { ad: "Cover & Renew", etiket: "DÖNÜŞÜM", aciklama: "Mevcut dövmeyi kapatma, dönüştürme veya güçlendirme seçenekleri.", maddeler: ["Mevcut işin analizi", "Kapatma olasılıkları", "Renk ve yoğunluk planı"] },
    ],
    senaryolar: [
      { baslik: "İlk dövme", aciklama: "Ölçü, yerleşim, his ve bakım süreci ayrıntılı biçimde anlatılır." },
      { baslik: "Anlamlı kişisel tasarım", aciklama: "Fikir doğrudan kopyalanmadan sembol ve kompozisyona dönüştürülür." },
      { baslik: "Cover-up ihtiyacı", aciklama: "Mevcut çizgi ve koyuluk üzerinden gerçekçi kapatma alanı belirlenir." },
      { baslik: "Çoklu seans", aciklama: "Büyük çalışmalarda iyileşme ve devam tarihleri proje takvimine eklenir." },
    ],
    kaliteNotlari: ["Başka sanatçı işi birebir kopyalanmaz", "Seans hazırlığı müşteri önünde", "Tek kullanımlık iğne ve kap", "Yazılı bakım ve kontrol bilgisi"],
  },
  elektrikci: {
    hareketDili: "signal",
    kayanKelimeler: ["ARIZA", "ÖLÇÜM", "PANO", "KORUMA", "KABLO", "TEST", "ENERJİ", "SERVİS"],
    baslik: "Belirtiye göre doğru servis kaydını açın.",
    aciklama: "Acil kesintiden planlı pano yenilemeye kadar ölçüm, malzeme, müdahale ve güvenlik kontrolü farklılaşan teknik servis kapsamları.",
    calismaAlanlari: ["Ev ve daire", "İş yeri", "Apartman ortak alan", "Fabrika ve atölye", "Mağaza", "Dış alan"],
    paketler: [
      { ad: "Arıza Müdahale", etiket: "ÖNCELİKLİ", aciklama: "Kesinti, kaçak veya yanık kokusunda riski ve arıza kaynağını ölçer.", maddeler: ["Güvenlik ön kontrolü", "Hat ve pano ölçümü", "Onaylı müdahale"] },
      { ad: "Pano Düzenleme", etiket: "KORUMA", aciklama: "Sigorta, kaçak akım ve hat etiketlerini düzenli bir pano sistemine dönüştürür.", maddeler: ["Yük ve hat kontrolü", "Koruma elemanı seçimi", "Etiketleme ve test"] },
      { ad: "Yeni Hat Projesi", etiket: "KURULUM", aciklama: "Aydınlatma, priz, data veya cihaz hattını kullanım yüküne göre kurar.", maddeler: ["İhtiyaç ve güzergâh", "Malzeme ve kapasite", "Montaj ve devreye alma"] },
    ],
    senaryolar: [
      { baslik: "Sürekli atan sigorta", aciklama: "Yük, cihaz ve hat ihtimalleri ölçümle birbirinden ayrılır." },
      { baslik: "Eski pano", aciklama: "Koruma elemanları ve hat düzeni risk önceliğine göre yenilenir." },
      { baslik: "Yeni cihaz hattı", aciklama: "Güç ihtiyacı ve kablo kapasitesi cihaza göre hesaplanır." },
      { baslik: "İş yeri kesintisi", aciklama: "Kritik hatlar ve işletme devamlılığı müdahale sırasına alınır." },
    ],
    kaliteNotlari: ["Enerji kesme ve güvenlik prosedürü", "Ölçüm sonucu üzerinden işlem", "Malzeme bilgisi ve onay", "Enerji dönüşü öncesi koruma testi"],
  },
  tesisatci: {
    hareketDili: "flow",
    kayanKelimeler: ["KAÇAK", "BASINÇ", "GİDER", "AKIŞ", "TESPİT", "ONARIM", "TEST", "SERVİS"],
    baslik: "Sorunun belirtisine göre teşhis ve müdahale.",
    aciklama: "Kaçak, tıkanıklık, koku ve basınç sorunlarında kullanılacak ekipmanı ve işlem sınırını doğru belirleyen servis seçenekleri.",
    calismaAlanlari: ["Su kaçağı", "Gider tıkanıklığı", "Musluk ve rezervuar", "Petek ve ısıtma", "Gider kokusu", "Tesisat yenileme"],
    paketler: [
      { ad: "Hızlı Servis", etiket: "KÜÇÜK ONARIM", aciklama: "Musluk, rezervuar ve erişilebilir bağlantı arızalarında kontrollü müdahale.", maddeler: ["Belirti kaydı", "Parça kontrolü", "Onarım ve akış testi"] },
      { ad: "Cihazlı Teşhis", etiket: "KAYNAK TESPİTİ", aciklama: "Gizli kaçak ve nem sorununda müdahale alanını daraltmaya odaklanır.", maddeler: ["Hat ve basınç kontrolü", "Uygun cihazla tarama", "Müdahale noktası raporu"] },
      { ad: "Hat Yenileme", etiket: "PLANLI UYGULAMA", aciklama: "Banyo, mutfak veya ısıtma hattını keşif ve iş programıyla yeniler.", maddeler: ["Yerinde keşif", "Malzeme ve güzergâh", "Uygulama ve sızdırmazlık"] },
    ],
    senaryolar: [
      { baslik: "Alt kata nem", aciklama: "Kaçağın temiz su, gider veya yalıtım kaynaklı olma ihtimali ayrılır." },
      { baslik: "Tekrarlayan tıkanıklık", aciklama: "Sadece açma değil, hat eğimi ve kullanım nedeni de değerlendirilir." },
      { baslik: "Düşük su basıncı", aciklama: "Şebeke, vana, filtre ve iç hat ihtimalleri sırayla kontrol edilir." },
      { baslik: "Petek ısınmıyor", aciklama: "Hava, dolaşım, vana ve tesisat dengesi üzerinden teşhis yapılır." },
    ],
    kaliteNotlari: ["Gereksiz kırma öncesi teşhis", "İşlem kapsamı ve parça onayı", "Onarım sonrası basınç kontrolü", "Çalışma alanında temiz teslim"],
  },
  organizasyon: {
    hareketDili: "stage",
    kayanKelimeler: ["BRIEF", "CONCEPT", "STAGE", "LIGHT", "SOUND", "SHOW", "PRODUCTION", "LIVE"],
    baslik: "Etkinliğin ölçeğine göre yapım modeli.",
    aciklama: "Butik davetten büyük sahneye kadar konsept, teknik prodüksiyon, tedarikçi ve saha yönetimini ihtiyaca göre birleştiren yapım kapsamları.",
    calismaAlanlari: ["Düğün ve davet", "Kurumsal gece", "Lansman", "Konser", "Açılış", "Teknik prodüksiyon"],
    paketler: [
      { ad: "Creative Setup", etiket: "KONSEPT", aciklama: "Fikir, dekor ve mekân yerleşimini tasarlayıp uygulama dosyasına dönüştürür.", maddeler: ["Brief ve yaratıcı yön", "Mekân yerleşimi", "Dekor üretim planı"] },
      { ad: "Full Production", etiket: "360° YAPIM", aciklama: "Konseptten teknik altyapıya ve etkinlik günü yönetimine kadar tam kapsam.", maddeler: ["Tedarikçi koordinasyonu", "Ses-ışık-sahne", "Run of show yönetimi"] },
      { ad: "Technical Stage", etiket: "TEKNİK", aciklama: "Hazır konsept için sahne, ses, ışık ve görüntü operasyonu.", maddeler: ["Teknik keşif", "Ekipman ve ekip planı", "Kurulum, prova ve show"] },
    ],
    senaryolar: [
      { baslik: "Kurumsal lansman", aciklama: "Marka mesajı sahne akışı, içerik ve konuk deneyimine dönüştürülür." },
      { baslik: "Düğün ve davet", aciklama: "Konseptin yanında aile, tedarikçi ve zaman yönetimi tek çizelgede tutulur." },
      { baslik: "Canlı performans", aciklama: "Sanatçı ihtiyaçları, teknik rider ve sahne geçişleri prova planına alınır." },
      { baslik: "Açık hava etkinliği", aciklama: "Hava, enerji, güvenlik ve alternatif planlar yapım dosyasına eklenir." },
    ],
    kaliteNotlari: ["Onaylı bütçe kalemleri", "Tek yapım sorumlusu", "Kurulum ve teknik prova", "Dakikalı etkinlik akışı"],
  },
  "duvar-isleri": {
    hareketDili: "surface",
    kayanKelimeler: ["KEŞİF", "YÜZEY", "ASTAR", "DOKU", "RENK", "UYGULAMA", "RÖTUŞ", "TESLİM"],
    baslik: "Yüzey durumuna göre uygulama sistemi.",
    aciklama: "Sadece renk seçmek yerine mevcut duvarın onarım, astar, katman ve kuruma ihtiyacını birlikte tanımlayan iş kapsamları.",
    calismaAlanlari: ["İç cephe boya", "Dış cephe", "Alçı ve sıva", "Alçıpan", "Dekoratif sıva", "Panel ve çıta"],
    paketler: [
      { ad: "Renk Yenileme", etiket: "BOYA", aciklama: "Sağlam yüzeylerde koruma, küçük tamir ve temiz son kat uygulaması.", maddeler: ["Alan koruma", "Lokal yüzey tamiri", "Astar ve son kat"] },
      { ad: "Yüzey Düzeltme", etiket: "ALÇI + BOYA", aciklama: "Çatlak, dalga ve eski kaplamayı yeni boya öncesi doğru altyapıya getirir.", maddeler: ["Kazıma ve çatlak onarımı", "Alçı-sıva düzeltme", "Zımpara, astar ve boya"] },
      { ad: "Mimari Detay", etiket: "DEKOR", aciklama: "Niş, çıta, panel, dekoratif doku ve gizli ışık gibi özel uygulamalar.", maddeler: ["Ölçü ve ritim tasarımı", "Numune ve malzeme seçimi", "Uygulama ve rötuş"] },
    ],
    senaryolar: [
      { baslik: "Koyu renkten açığa geçiş", aciklama: "Örtücülük için astar ve kat sayısı yüzeyde test edilerek belirlenir." },
      { baslik: "Çatlak ve kabarma", aciklama: "Nem ve hareket nedeni görülmeden yalnızca üstü kapatılmaz." },
      { baslik: "Yaşanan evde uygulama", aciklama: "Oda sırası, eşya koruma ve günlük temizlik planı oluşturulur." },
      { baslik: "Dekoratif duvar", aciklama: "Doku ve renk kararı küçük numune üzerinden kesinleştirilir." },
    ],
    kaliteNotlari: ["Metraj ve yüzey keşfi", "Zemin-eşya koruma sistemi", "Katlar arasında kuruma kontrolü", "Rötuş ve temizlik teslimi"],
  },
  "oto-yikama": {
    hareketDili: "wash",
    kayanKelimeler: ["FOAM", "DETAIL", "RINSE", "POLISH", "PROTECT", "INTERIOR", "SHINE", "DELIVERY"],
    baslik: "Aracın yüzeyine göre uygulama paketi.",
    aciklama: "Günlük yıkamadan boya düzeltmeye kadar süre, kimya, ekipman ve teslim kontrolü farklılaşan profesyonel bakım kapsamları.",
    calismaAlanlari: ["İç-dış yıkama", "Detaylı iç temizlik", "Pasta-cila", "Boya koruma", "Far yenileme", "Motor yüzey temizliği"],
    paketler: [
      { ad: "Daily Clean", etiket: "HIZLI BAKIM", aciklama: "Günlük kir ve kabin tozu için dengeli iç-dış temizlik.", maddeler: ["Ön yıkama ve köpük", "Jant ve dış yüzey", "Kabin süpürme ve silme"] },
      { ad: "Deep Interior", etiket: "DERİN TEMİZLİK", aciklama: "Koltuk, taban, tavan ve plastikleri araç kabul notuna göre detaylandırır.", maddeler: ["Leke ve kumaş kontrolü", "Buhar/ekstraksiyon uygulaması", "Kuruma ve koku kontrolü"] },
      { ad: "Gloss & Protect", etiket: "DIŞ YÜZEY", aciklama: "Boya durumuna göre parlaklık düzeltme ve koruma uygulaması.", maddeler: ["Boya yüzeyi değerlendirmesi", "Uygun düzeltme adımı", "Koruma ve teslim ışığı"] },
    ],
    senaryolar: [
      { baslik: "Açık renk döşeme", aciklama: "Leke türü ve kumaş dayanımı görünmeyen alanda değerlendirilir." },
      { baslik: "Matlaşmış boya", aciklama: "Çizik derinliği ve vernik durumu pasta-cila öncesi kontrol edilir." },
      { baslik: "Satış öncesi hazırlık", aciklama: "Kabin ve dış yüzey görünümü teslim saatine göre birlikte planlanır." },
      { baslik: "Düzenli filo temizliği", aciklama: "Araç sayısı ve boşta kalma süresine göre periyodik sıra oluşturulur." },
    ],
    kaliteNotlari: ["İç-dış-jant ekipmanı ayrı", "Yüzeye uygun kimyasal seçimi", "Hassas alanların korunması", "Aydınlık teslim kontrolü"],
  },
  "oto-kurtarma": {
    hareketDili: "rescue",
    kayanKelimeler: ["SOS", "LOCATION", "DISPATCH", "RECOVERY", "PLATFORM", "ROUTE", "SECURE", "DELIVERY"],
    baslik: "Araç ve yol durumuna göre kurtarma modeli.",
    aciklama: "Basit yol yardımından kazalı araç yüklemeye kadar ekipman, güvenlik ve rota ihtiyacını doğru eşleştiren operasyon kapsamları.",
    calismaAlanlari: ["Platform çekici", "Kaza kurtarma", "Akü takviye", "Lastik desteği", "Otopark kurtarma", "Şehirler arası taşıma"],
    paketler: [
      { ad: "Road Assist", etiket: "YERİNDE DESTEK", aciklama: "Uygun arızalarda aracı çekmeden temel müdahale olasılığını değerlendirir.", maddeler: ["Konum ve belirti kaydı", "Akü/lastik temel destek", "Gerekirse çekici yönlendirme"] },
      { ad: "Safe Tow", etiket: "PLATFORM", aciklama: "Aracı yol koşuluna uygun biçimde platforma alıp belirlenen noktaya taşır.", maddeler: ["Araç ve erişim kontrolü", "Dört nokta sabitleme", "Rota ve teslim kaydı"] },
      { ad: "Recovery Operation", etiket: "KAZA / ZOR KONUM", aciklama: "Hasarlı veya yol dışı araç için vinç, kızak ve ek güvenlik planı.", maddeler: ["Fotoğraf ve konum değerlendirme", "Uygun kurtarma ekipmanı", "Güvenli kaldırma ve taşıma"] },
    ],
    senaryolar: [
      { baslik: "Otomatik araç", aciklama: "Şanzıman ve çekiş tipi bilgisi doğru yükleme yönteminin seçilmesini sağlar." },
      { baslik: "Kapalı otopark", aciklama: "Tavan yüksekliği ve manevra alanına göre alçak ekipman planlanır." },
      { baslik: "Kazalı araç", aciklama: "Teker ve süspansiyon durumu yükleme öncesi fotoğrafla değerlendirilir." },
      { baslik: "Şehirler arası teslim", aciklama: "Çıkış, varış ve teslim yetkilisi operasyon kaydına eklenir." },
    ],
    kaliteNotlari: ["Canlı konumla doğru yönlendirme", "Araç tipine uygun platform", "Yükleme öncesi fiyat kapsamı", "Sabitleme ve teslim kontrolü"],
  },
  "oto-servis": {
    hareketDili: "torque",
    kayanKelimeler: ["DIAGNOSIS", "SERVICE", "TORQUE", "BRAKE", "ENGINE", "SUSPENSION", "REPORT", "DELIVERY"],
    baslik: "Aracın ihtiyacına göre servis kapsamı.",
    aciklama: "Periyodik bakımdan karmaşık arıza teşhisine kadar kontrol listesi, iş emri, parça onayı ve teslim raporu farklılaşan servis yolları.",
    calismaAlanlari: ["Periyodik bakım", "Arıza teşhis", "Mekanik onarım", "Fren sistemi", "Ön düzen", "Kurumsal filo"],
    paketler: [
      { ad: "Periodic Care", etiket: "BAKIM", aciklama: "Kilometreye göre yağ, filtre, sıvı ve güvenlik kontrollerini tamamlar.", maddeler: ["Araç kabul kontrolü", "Bakım kalemleri", "Sonraki bakım kaydı"] },
      { ad: "Diagnostic File", etiket: "ARIZA TEŞHİS", aciklama: "Sürücü şikâyetini cihaz verisi, lift ve yol testiyle doğrular.", maddeler: ["Şikâyet ve geçmiş kayıt", "Canlı veri ve fiziksel test", "Onarım seçenekleri"] },
      { ad: "Fleet Continuity", etiket: "KURUMSAL", aciklama: "Firma araçları için bakım takvimi, öncelik ve merkezi raporlama sağlar.", maddeler: ["Araç bazlı servis planı", "Onaylı işlem akışı", "Bakım ve maliyet raporu"] },
    ],
    senaryolar: [
      { baslik: "Gösterge arıza lambası", aciklama: "Hata kodu tek başına parça kararı sayılmaz; canlı veriyle doğrulanır." },
      { baslik: "Fren sesi veya titreşim", aciklama: "Balata, disk, kaliper ve ön düzen birlikte kontrol edilir." },
      { baslik: "Uzun yol öncesi", aciklama: "Sıvı, lastik, fren ve soğutma kontrolleri risk sırasıyla yapılır." },
      { baslik: "Filo aracı", aciklama: "Araç boşta kalma süresini azaltacak randevu ve parça planı hazırlanır." },
    ],
    kaliteNotlari: ["Arıza doğrulanmadan parça kararı yok", "İş emri ve müşteri onayı", "Parça seçeneği açıkça sunulur", "Teslim raporu ve bakım tarihi"],
  },
};

export function sektorDerinIcerigiGetir(sektor: string): SektorDerinIcerigi {
  return icerikler[sektor] ?? icerikler.kuafor;
}
