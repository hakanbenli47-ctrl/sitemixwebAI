import type { SiteSayfasi } from "@/data/sektorSablonlari";
import type {
  EkOzellikKaydi,
  HizmetKaydi,
  IsletmeAlaniDegeri,
  MedyaKaydi,
  SektorSiteIcerigi,
  SektorTemaKimligi,
  YeniSektorKimligi,
} from "@/types/proje";

export interface AlanTanimi {
  anahtar: string;
  etiket: string;
  yerTutucu: string;
  zorunlu: boolean;
}

export interface TemaTanimi {
  id: SektorTemaKimligi;
  ad: string;
  aciklama: string;
  renkler: [string, string, string, string];
  yerlesim: "editorial" | "sinematik" | "dinamik";
  yerlesimAdi: string;
}

export interface SayfaTanimi {
  ad: string;
  slug: string;
}

export interface MedyaSlotuTanimi {
  slot: string;
  baslik: string;
}

export interface SektorTanimi {
  id: YeniSektorKimligi;
  ad: string;
  kisaAd: string;
  iskeletAdi: string;
  iskeletAciklamasi: string;
  alanlar: AlanTanimi[];
  temalar: [TemaTanimi, TemaTanimi, TemaTanimi];
  sayfalar: SayfaTanimi[];
  medyaSlotlari: MedyaSlotuTanimi[];
  icerik: Omit<SektorSiteIcerigi, "hizmetler" | "ozellikler"> & {
    hizmetler: Array<[string, string]>;
    ozellikler: Array<[string, string]>;
  };
}

const t = (
  id: SektorTemaKimligi,
  ad: string,
  aciklama: string,
  renkler: [string, string, string, string],
): TemaTanimi => ({
  id,
  ad,
  aciklama,
  renkler,
  yerlesim:
    id === "tema-1" ? "editorial" : id === "tema-2" ? "sinematik" : "dinamik",
  yerlesimAdi:
    id === "tema-1"
      ? "Editoryal site"
      : id === "tema-2"
        ? "Sinematik site"
        : "Dinamik vitrin",
});

const ortakAlanlar: AlanTanimi[] = [
  { anahtar: "yetkili", etiket: "Yetkili kişi", yerTutucu: "Ad Soyad", zorunlu: false },
  { anahtar: "calismaSaatleri", etiket: "Çalışma saatleri", yerTutucu: "Pzt–Cmt 09.00–19.00", zorunlu: true },
  { anahtar: "instagram", etiket: "Instagram", yerTutucu: "@isletme", zorunlu: false },
  { anahtar: "facebook", etiket: "Facebook", yerTutucu: "facebook.com/isletme", zorunlu: false },
  { anahtar: "tiktok", etiket: "TikTok", yerTutucu: "@isletme", zorunlu: false },
  { anahtar: "youtube", etiket: "YouTube", yerTutucu: "youtube.com/@isletme", zorunlu: false },
];

const sektorler: SektorTanimi[] = [
  {
    id: "kuafor",
    ad: "Kuaför",
    kisaAd: "Saç tasarım",
    iskeletAdi: "Editoryal Salon",
    iskeletAciklamasi: "Randevu, uzmanlık ve saç dönüşümünü moda dergisi ritminde anlatan salon iskeleti.",
    alanlar: [...ortakAlanlar, { anahtar: "uzmanlik", etiket: "Salon uzmanlığı", yerTutucu: "Renklendirme ve saç tasarımı", zorunlu: true }],
    temalar: [
      t("tema-1", "Krem & Bordo", "Sakin, editoryal ve premium.", ["#f6f0e8", "#31191d", "#9e3f50", "#ffffff"]),
      t("tema-2", "Gece & Bakır", "Yüksek kontrastlı akşam salonu.", ["#171313", "#f4eee8", "#c9825a", "#261d1b"]),
      t("tema-3", "Adaçayı", "Doğal bakım odaklı ferah sunum.", ["#eef0e7", "#1e2b25", "#708568", "#ffffff"]),
    ],
    sayfalar: [{ ad: "Salon", slug: "" }, { ad: "Hizmetler", slug: "hizmetler" }, { ad: "Uzmanlık", slug: "uzmanlik" }, { ad: "Saç Rehberi", slug: "sac-rehberi" }, { ad: "Randevu", slug: "randevu" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Salon kapak görseli" }, { slot: "donusum", baslik: "Saç dönüşümü" }, { slot: "salon", baslik: "Salon atmosferi" }],
    icerik: {
      rozet: "Kişiye özel saç tasarımı",
      slogan: "Saçınızın formunu, tonunu ve bakım ritmini birlikte tasarlıyoruz.",
      heroBaslik: "Size benzeyen bir saç, iyi bir danışmanlıkla başlar.",
      heroAciklama: "Yüz şekli, saç yapısı ve günlük rutininiz değerlendirilir; kesimden renklendirmeye kadar bütün uygulamalar tek bir plan içinde ilerler.",
      hakkimizdaBaslik: "Her uygulamadan önce doğru teşhis",
      hakkimizdaMetni: "Saç geçmişinizi dinler, beklentinizi netleştirir ve uygulanabilir sonucu açıkça anlatırız. Böylece salondan çıktığınız gün kadar sonraki haftalarda da kullanabileceğiniz bir görünüm elde edersiniz.",
      guvenBasligi: "Teknik reçete, temiz uygulama, sürdürülebilir bakım",
      guvenMetni: "Kullanılan ürün, bekleme süresi ve evde bakım önerileri kayıt altına alınır. Sonraki randevunuzda kaldığınız yerden devam edilir.",
      ctaBaslik: "Saçınız için doğru başlangıcı planlayalım.",
      ctaMetni: "Kısa bir ön görüşme ile ihtiyacınızı belirleyip uygun hizmet ve randevu süresini netleştirelim.",
      hizmetler: [["Saç kesimi ve şekillendirme", "Yüz şekli ve saç dokusuna göre kişiselleştirilmiş kesim."], ["Renklendirme ve balyaj", "Ton analizi, açma planı ve koruyucu bakım ile kontrollü dönüşüm."], ["Keratin ve yoğun bakım", "Yıpranma seviyesine göre nem, parlaklık ve pürüzsüzlük desteği."], ["Gelin saçı", "Prova, aksesuar ve gün planlamasıyla eksiksiz hazırlık."], ["Fön ve özel gün", "Görünümü tamamlayan kalıcı şekillendirme seçenekleri."], ["Saç analizi", "Saç derisi ve tel yapısına göre bakım yol haritası."]],
      ozellikler: [["Danışmanlık kaydı", "Renk formülü ve uygulama notları sonraki ziyaret için saklanır."], ["Randevu disiplini", "Hizmete uygun süre ayrılır, bekleme azaltılır."], ["Evde bakım planı", "Sonucun kalıcılığı için uygulanabilir öneriler verilir."]],
      surec: [{ baslik: "Dinleme", aciklama: "Beklenti, saç geçmişi ve günlük kullanım konuşulur." }, { baslik: "Tasarım", aciklama: "Kesim, ton ve bakım planı birlikte netleştirilir." }, { baslik: "Uygulama", aciklama: "Teknik adımlar kontrollü biçimde tamamlanır." }, { baslik: "Takip", aciklama: "Evde bakım ve sonraki randevu zamanı belirlenir." }],
      sss: [{ soru: "İlk randevu ne kadar sürer?", cevap: "Danışmanlık dahil süre seçilen işleme göre netleştirilir." }, { soru: "Renk işlemi öncesi görüşme gerekir mi?", cevap: "Özellikle açma ve renk değişimlerinde kısa ön değerlendirme önerilir." }, { soru: "Kendi bakım ürünümü getirebilir miyim?", cevap: "İçeriği uygun olduğu sürece uzmanınızla birlikte değerlendirebilirsiniz." }],
      istatistikler: [{ deger: "01", etiket: "Kişisel saç reçetesi" }, { deger: "04", etiket: "Kontrollü uygulama adımı" }, { deger: "%100", etiket: "Şeffaf işlem planı" }],
    },
  },
  {
    id: "berber",
    ad: "Berber",
    kisaAd: "Erkek bakım",
    iskeletAdi: "Barber Club",
    iskeletAciklamasi: "Kırmızı-beyaz-mavi barber pole, hizmet menüsü ve koltuk randevusu üzerine kurulu güçlü kulüp yapısı.",
    alanlar: [...ortakAlanlar, { anahtar: "koltukSayisi", etiket: "Koltuk sayısı", yerTutucu: "3", zorunlu: false }],
    temalar: [t("tema-1", "Lacivert Kulüp", "Klasik barber club karakteri.", ["#08182d", "#f4efe5", "#d92f3b", "#ffffff"]), t("tema-2", "Kömür & Krem", "Maskülen ve sakin atölye.", ["#17191a", "#f1eadc", "#b58b52", "#25292b"]), t("tema-3", "Beyaz & Mavi", "Temiz, modern ve dinamik.", ["#f5f8fb", "#102540", "#1d70b7", "#ffffff"])],
    sayfalar: [{ ad: "Berber", slug: "" }, { ad: "Menü", slug: "hizmet-menusu" }, { ad: "Ustalar", slug: "ustalar" }, { ad: "Kulüp", slug: "kulup" }, { ad: "Randevu", slug: "randevu" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Berber koltuğu" }, { slot: "detay", baslik: "Kesim detayı" }, { slot: "ekip", baslik: "Usta ekibi" }],
    icerik: {
      rozet: "Klasik zanaat · modern bakım", slogan: "Keskin hatlar, temiz işçilik ve koltuğa ayrılmış gerçek zaman.", heroBaslik: "Tarzınızı aceleye getirmeyen bir berber deneyimi.", heroAciklama: "Saç ve sakal formu yüz hatlarınıza göre planlanır. Sıcak havlu, bakım ve son dokunuşlar tek bir servis ritminde tamamlanır.", hakkimizdaBaslik: "Mahalle sıcaklığı, kulüp disiplini", hakkimizdaMetni: "Her müşterinin kesim notunu ve tercihlerini tanırız. Klasik berber geleneğini hijyen, randevu düzeni ve güncel tekniklerle bir araya getiririz.", guvenBasligi: "Steril ekipman ve kişisel servis", guvenMetni: "Her servis öncesi ekipman hazırlanır, tek kullanımlık ürünler yenilenir ve koltuk bir sonraki misafir için eksiksiz temizlenir.", ctaBaslik: "Koltuğunuzu ayıralım.", ctaMetni: "İstediğiniz hizmeti seçin; uygun usta ve süreyi birlikte planlayalım.",
      hizmetler: [["Saç kesimi", "Yüz ve kafa formuna göre makas-makine dengesi."], ["Sakal tasarımı", "Hat belirleme, sıcak havlu ve bakım ile net görünüm."], ["Saç + sakal", "Tek seansta bütünlüklü bakım ve şekillendirme."], ["Damat tıraşı", "Prova, cilt hazırlığı ve özel gün paketi."], ["Çocuk kesimi", "Yaşa uygun, sabırlı ve rahat servis."], ["Bakım ritüeli", "Saç derisi, yüz ve sakal için tamamlayıcı bakım."]],
      ozellikler: [["Barber pole imzası", "Kırmızı, beyaz ve mavi hareketli silindir markanın giriş işaretidir."], ["Usta seçimi", "Müsaitliğe göre tercih ettiğiniz koltuk planlanır."], ["Kesim hafızası", "Önceki numara ve form notları korunur."]],
      surec: [{ baslik: "Karşılama", aciklama: "İstek ve önceki kesim deneyimi konuşulur." }, { baslik: "Form", aciklama: "Saç-sakal oranı ve geçiş seviyesi belirlenir." }, { baslik: "Servis", aciklama: "Kesim, yıkama ve bakım tamamlanır." }, { baslik: "Final", aciklama: "Kontur, ürün ve evde kullanım önerisi verilir." }],
      sss: [{ soru: "Randevusuz gelebilir miyim?", cevap: "Müsaitlik varsa servis verilir; beklememek için randevu önerilir." }, { soru: "Damat tıraşı için prova var mı?", cevap: "Paket seçimine göre saç-sakal formu önceden planlanabilir." }, { soru: "Çocuk kesimi yapılıyor mu?", cevap: "Evet, uygun süre ayrılarak rahat bir servis sağlanır." }],
      istatistikler: [{ deger: "45 dk", etiket: "Ortalama koltuk planı" }, { deger: "360°", etiket: "Saç ve sakal dengesi" }, { deger: "01", etiket: "Size ayrılmış usta" }],
    },
  },
  {
    id: "guzellik-salonu", ad: "Güzellik Salonu", kisaAd: "Bakım merkezi", iskeletAdi: "Beauty Ritual", iskeletAciklamasi: "Paket satışı yerine analiz, bakım protokolü ve randevu güveni kuran yumuşak katmanlı salon yapısı.",
    alanlar: [...ortakAlanlar, { anahtar: "uzmanlik", etiket: "Öne çıkan uzmanlık", yerTutucu: "Cilt bakımı ve bölgesel uygulamalar", zorunlu: true }],
    temalar: [t("tema-1", "Pudra & Vişne", "Zarif, güvenli ve sıcak.", ["#fff4f1", "#321d28", "#a84469", "#ffffff"]), t("tema-2", "İnci & Adaçayı", "Klinik olmayan temiz bakım dili.", ["#f4f5ef", "#21332d", "#678779", "#ffffff"]), t("tema-3", "Gece Işıltısı", "Premium ve dramatik güzellik stüdyosu.", ["#18131a", "#f7edf2", "#d58bb2", "#2a202b"])],
    sayfalar: [{ ad: "Stüdyo", slug: "" }, { ad: "Bakımlar", slug: "bakimlar" }, { ad: "Cilt Analizi", slug: "cilt-analizi" }, { ad: "Salon", slug: "salon" }, { ad: "Randevu", slug: "randevu" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Salon atmosferi" }, { slot: "bakim", baslik: "Bakım uygulaması" }, { slot: "sonuc", baslik: "Bakım sonucu" }],
    icerik: { rozet: "Kişisel bakım protokolü", slogan: "Cildinizi dinleyen, ihtiyacınıza göre şekillenen düzenli bakım.", heroBaslik: "Güzellik, doğru analiz ve tutarlı bakımla görünür olur.", heroAciklama: "Her uygulama cilt tipi, hedef ve günlük yaşamınıza göre planlanır; süreç, ürün ve beklenti baştan açıkça anlatılır.", hakkimizdaBaslik: "Tek seans değil, takip edilebilir bakım yolculuğu", hakkimizdaMetni: "Salonumuzda her bakım ön görüşmeyle başlar. Uygulama notları, hassasiyetler ve önerilen tekrar aralığı kayıt altına alınır.", guvenBasligi: "Hijyen protokolü her randevuda yeniden başlar", guvenMetni: "Uygulama alanı, ekipman ve sarf malzemeleri hizmete özel hazırlanır. Kullanılacak ürünler işlem öncesinde paylaşılır.", ctaBaslik: "Size uygun bakımı birlikte seçelim.", ctaMetni: "Kısa bir ihtiyaç görüşmesiyle doğru uygulamayı ve randevu süresini belirleyelim.",
      hizmetler: [["Profesyonel cilt bakımı", "Cilt tipine göre arındırma, nem ve bariyer desteği."], ["Kaş ve kirpik uygulamaları", "Yüz oranına uygun şekillendirme ve bakım."], ["Bölgesel bakım", "Hedef ve programa göre planlanan seanslı uygulamalar."], ["Lazer epilasyon", "Bölge ve kıl yapısına göre şeffaf seans planı."], ["Kalıcı makyaj", "Yüz anatomisine göre doğal ve kontrollü uygulama."], ["Özel gün hazırlığı", "Bakım takvimi ve son gün dokunuşları."]],
      ozellikler: [["Ön analiz", "Her bakım ihtiyaca göre seçilir."], ["Kişisel kayıt", "Uygulama ve hassasiyet notları korunur."], ["Şeffaf seans planı", "Süreç ve tekrar aralığı baştan açıklanır."]],
      surec: [{ baslik: "Analiz", aciklama: "Cilt ve hedef değerlendirilir." }, { baslik: "Protokol", aciklama: "Uygulama içeriği açıklanır." }, { baslik: "Bakım", aciklama: "Konfor ve hijyenle tamamlanır." }, { baslik: "Takip", aciklama: "Ev rutini ve kontrol zamanı belirlenir." }],
      sss: [{ soru: "Hangi bakımı seçmeliyim?", cevap: "Ön görüşmede cilt ihtiyacına göre uygun seçenek belirlenir." }, { soru: "Seans aralıkları nasıl belirlenir?", cevap: "Uygulama türü ve kişisel ihtiyaca göre planlanır." }, { soru: "Hassasiyetimi bildirmeli miyim?", cevap: "Evet; bilinen alerji ve hassasiyetler işlem öncesi paylaşılmalıdır." }],
      istatistikler: [{ deger: "01", etiket: "Kişisel bakım dosyası" }, { deger: "04", etiket: "Planlı bakım aşaması" }, { deger: "%100", etiket: "Açık ürün bilgisi" }] },
  },
  {
    id: "nail-artist", ad: "Nail Artist", kisaAd: "Tırnak stüdyosu", iskeletAdi: "Nail Lookbook", iskeletAciklamasi: "Tasarım kataloğu, set seçimi, hijyen ve hızlı randevu için asimetrik lookbook iskeleti.",
    alanlar: [...ortakAlanlar, { anahtar: "stil", etiket: "İmza stil", yerTutucu: "Minimal nail art", zorunlu: true }],
    temalar: [t("tema-1", "Sütlü Pembe", "Temiz ve sosyal medya dostu.", ["#fff7f6", "#2b2024", "#e16f91", "#ffffff"]), t("tema-2", "Kobalt Pop", "Cesur, genç ve grafik.", ["#f7f3ea", "#181a4b", "#4b52db", "#ffffff"]), t("tema-3", "Cherry Noir", "Gece stüdyosu ve güçlü kontrast.", ["#190f14", "#fff2f5", "#e04465", "#2b1820"])],
    sayfalar: [{ ad: "Lookbook", slug: "" }, { ad: "Uygulamalar", slug: "uygulamalar" }, { ad: "Set Rehberi", slug: "set-rehberi" }, { ad: "Hijyen", slug: "hijyen" }, { ad: "Randevu", slug: "randevu" }],
    medyaSlotlari: [{ slot: "hero", baslik: "İmza tırnak seti" }, { slot: "look-1", baslik: "Lookbook 1" }, { slot: "look-2", baslik: "Lookbook 2" }, { slot: "look-3", baslik: "Lookbook 3" }],
    icerik: { rozet: "Kişisel tırnak tasarımı", slogan: "Renginizi seçin, formu birlikte tasarlayalım.", heroBaslik: "Her set, küçük ölçekte tasarlanmış kişisel bir görünüm.", heroAciklama: "Tırnak yapınıza uygun form, günlük rutininize uygun uzunluk ve tarzınızı tamamlayan tasarım tek randevuda planlanır.", hakkimizdaBaslik: "Kopya set değil, size uyarlanmış tasarım", hakkimizdaMetni: "Beğendiğiniz referansı tırnak yatağınıza, ten tonunuza ve kullanım alışkanlığınıza göre yeniden yorumlarız.", guvenBasligi: "Sterilizasyon görünmeyen ama vazgeçilmez tasarım adımıdır", guvenMetni: "Metal ekipmanlar steril edilir, tek kullanımlık ürünler yenilenir ve çalışma yüzeyi her müşteri öncesi hazırlanır.", ctaBaslik: "Yeni setinizi planlayalım.", ctaMetni: "İstediğiniz formu veya referansı iletin; süre ve uygulama seçeneğini netleştirelim.",
      hizmetler: [["Kalıcı oje", "Tırnak yapısına uygun hazırlık ve dengeli renk uygulaması."], ["Protez tırnak", "Doğal görünümlü form ve kullanım alışkanlığına uygun uzunluk."], ["Jel güçlendirme", "Kırılmaya eğilimli tırnaklar için koruyucu destek."], ["Nail art", "Minimal çizgiden detaylı sete kişiselleştirilmiş tasarım."], ["Manikür", "Tırnak çevresi bakımı ve temiz form."], ["Çıkarma ve bakım", "Mevcut ürünü tırnağı yormadan kontrollü çıkarma."]],
      ozellikler: [["Tasarım ön seçimi", "Randevu öncesi model ve süre netleştirilir."], ["Kişisel törpü seçeneği", "İsteğe bağlı kişisel ekipman ayrılabilir."], ["Bakım kartı", "Set sonrası koruma önerileri paylaşılır."]],
      surec: [{ baslik: "Look", aciklama: "Model, renk ve form seçilir." }, { baslik: "Hazırlık", aciklama: "Tırnak yüzeyi ve çevresi hazırlanır." }, { baslik: "Set", aciklama: "Uygulama katmanlı ve kontrollü ilerler." }, { baslik: "Bakım", aciklama: "Yenileme zamanı ve kullanım önerisi verilir." }],
      sss: [{ soru: "Set ne kadar dayanır?", cevap: "Tırnak yapısı ve kullanım alışkanlığına göre yenileme aralığı değişir." }, { soru: "Referans görsel gönderebilir miyim?", cevap: "Evet, süre ve malzeme planı için önceden gönderebilirsiniz." }, { soru: "Mevcut ürünü çıkartıyor musunuz?", cevap: "Evet, randevuya çıkarma süresi eklenir." }],
      istatistikler: [{ deger: "1:1", etiket: "Kişisel tasarım" }, { deger: "04", etiket: "Hijyen adımı" }, { deger: "∞", etiket: "Renk ve desen olasılığı" }] },
  },
  {
    id: "nakliye", ad: "Nakliye", kisaAd: "Ev ve ofis taşıma", iskeletAdi: "Taşıma Manifestosu", iskeletAciklamasi: "Ekspertizden teslim tutanağına uzanan rota, araç ve yük operasyonu iskeleti.",
    alanlar: [...ortakAlanlar, { anahtar: "yetkiBelgesi", etiket: "Yetki belgesi", yerTutucu: "K3 / belge no", zorunlu: false }, { anahtar: "kapsama", etiket: "Taşıma kapsamı", yerTutucu: "Şehir içi ve şehirler arası", zorunlu: true }],
    temalar: [t("tema-1", "Rota Turuncu", "Hızlı ve operasyonel.", ["#f3f0e8", "#17252c", "#e05b27", "#ffffff"]), t("tema-2", "Gece Lojistik", "Kurumsal ve güçlü.", ["#101820", "#f5f2e9", "#f0b24a", "#1c2a34"]), t("tema-3", "Mavi Hat", "Şeffaf ve güven veren.", ["#eef4f7", "#13324a", "#2e7ca6", "#ffffff"])],
    sayfalar: [{ ad: "Rota Merkezi", slug: "" }, { ad: "Taşıma Türleri", slug: "tasima-turleri" }, { ad: "Operasyon", slug: "operasyon" }, { ad: "Araçlar", slug: "araclar" }, { ad: "Teklif Al", slug: "teklif-al" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Nakliye aracı" }, { slot: "paketleme", baslik: "Paketleme" }, { slot: "filo", baslik: "Araç filosu" }],
    icerik: { rozet: "Kayıtlı yük · planlı teslim", slogan: "Taşıma günü değil, taşıma planı yönetiyoruz.", heroBaslik: "Eşyanız için doğru araç, doğru ekip ve net bir teslim rotası.", heroAciklama: "Ücretsiz ön değerlendirmeden paketlemeye, yüklemeden teslim tutanağına kadar her adım sorumlusu ve zamanı belli bir operasyonla ilerler.", hakkimizdaBaslik: "Her taşınma ayrı bir operasyon dosyasıdır", hakkimizdaMetni: "Kat, asansör, erişim, yük hacmi ve özel parçalar önceden değerlendirilir. Araç ve ekip rastgele değil, bu bilgilere göre planlanır.", guvenBasligi: "Söz verilen saat, kayıtlı eşya, kontrollü teslim", guvenMetni: "Paketleme kapsamı ve hizmet sınırları teklif aşamasında netleştirilir; taşıma günü sürpriz maliyetlerin önüne geçilir.", ctaBaslik: "Taşıma planınızı bugün çıkaralım.", ctaMetni: "Çıkış-varış adresi ve yaklaşık eşya bilgisini paylaşın; ekip ve araç planını hazırlayalım.",
      hizmetler: [["Şehir içi evden eve", "Kat ve eşya hacmine göre ekipli, planlı taşıma."], ["Şehirler arası nakliye", "Rota, teslim günü ve araç paylaşımı açık taşıma."], ["Ofis ve kurumsal taşıma", "Departman ve ekipman etiketlemeli kesintisiz geçiş."], ["Parça eşya", "Az hacimli yükler için ekonomik rota planı."], ["Paketleme", "Eşya türüne uygun kutu, koruma ve etiketleme."], ["Asansörlü taşıma", "Bina ve cephe uygunluğuna göre dış cephe çözümü."]],
      ozellikler: [["Ön ekspertiz", "Araç, ekip ve süre doğru hesaplanır."], ["Yük listesi", "Özel ve hassas parçalar kayıt altına alınır."], ["Teslim kontrolü", "Operasyon teslim onayıyla kapanır."]],
      surec: [{ baslik: "Talep", aciklama: "Adres, kat ve yük bilgisi alınır." }, { baslik: "Plan", aciklama: "Araç, ekip ve zaman çizelgesi hazırlanır." }, { baslik: "Yükleme", aciklama: "Paketleme ve kontrollü yerleşim yapılır." }, { baslik: "Teslim", aciklama: "Eşyalar yerleştirilir ve kontrol edilir." }],
      sss: [{ soru: "Fiyat nasıl belirlenir?", cevap: "Mesafe, kat, yük hacmi, paketleme ve ek hizmetlere göre belirlenir." }, { soru: "Taşıma sigortalı mı?", cevap: "Sigorta kapsamı teklif ve sözleşmede açıkça belirtilir." }, { soru: "Koli temin ediyor musunuz?", cevap: "Seçilen pakete göre koli ve koruma malzemesi sağlanabilir." }],
      istatistikler: [{ deger: "4 adım", etiket: "Kayıtlı operasyon" }, { deger: "81 il", etiket: "Rota planlama" }, { deger: "1 dosya", etiket: "Tekliften teslimata" }] },
  },
  {
    id: "vip-tasimacilik", ad: "VIP Taşımacılık", kisaAd: "Özel transfer", iskeletAdi: "VIP Concierge", iskeletAciklamasi: "Uçuş takibi, rota rezervasyonu ve araç sınıfını concierge masası gibi sunan premium iskelet.",
    alanlar: [...ortakAlanlar, { anahtar: "filo", etiket: "Öne çıkan araç", yerTutucu: "Mercedes Vito VIP", zorunlu: true }, { anahtar: "havalimani", etiket: "Hizmet verilen havalimanı", yerTutucu: "İstanbul Havalimanı", zorunlu: false }],
    temalar: [t("tema-1", "Gece & Altın", "Klasik VIP karşılama.", ["#0c1420", "#f7f0df", "#d5aa54", "#172334"]), t("tema-2", "Şampanya", "Aydınlık ve rafine.", ["#f6f1e8", "#252018", "#a17a38", "#ffffff"]), t("tema-3", "Midnight Blue", "Teknolojik ve seçkin.", ["#071d33", "#eaf4fb", "#4da3d9", "#102a44"])],
    sayfalar: [{ ad: "Concierge", slug: "" }, { ad: "Transferler", slug: "transferler" }, { ad: "Filo", slug: "filo" }, { ad: "Rotalar", slug: "rotalar" }, { ad: "Rezervasyon", slug: "rezervasyon" }],
    medyaSlotlari: [{ slot: "hero", baslik: "VIP araç" }, { slot: "ic-mekan", baslik: "Araç içi" }, { slot: "filo", baslik: "Filo" }],
    icerik: { rozet: "Özel karşılama ve rota yönetimi", slogan: "Yolculuğunuz araç gelmeden önce başlar.", heroBaslik: "Uçuşunuza, programınıza ve misafirinize göre hazırlanmış transfer.", heroAciklama: "Karşılama noktası, uçuş takibi, araç sınıfı ve varış planı tek rezervasyon dosyasında yönetilir.", hakkimizdaBaslik: "Şoförlü araçtan fazlası: zaman ve karşılama yönetimi", hakkimizdaMetni: "Sürücü bilgisi, araç plakası ve buluşma detayı yolculuk öncesi paylaşılır. Gecikmeler rota masası tarafından takip edilir.", guvenBasligi: "Temiz araç, profesyonel sürücü, gizliliğe saygı", guvenMetni: "Araçlar her transfer öncesi hazırlanır; kurumsal misafir, aile ve özel programlarda iletişim tek sorumlu üzerinden yürür.", ctaBaslik: "Rotanızı concierge masasına iletin.", ctaMetni: "Tarih, yolcu sayısı ve durakları paylaşın; uygun araç sınıfını ve net teklifi sunalım.",
      hizmetler: [["Havalimanı transferi", "Uçuş takipli karşılama ve kapıdan kapıya ulaşım."], ["Kurumsal transfer", "Toplantı ve heyet programına göre araç koordinasyonu."], ["Şehirler arası VIP", "Uzun yol konforu ve planlı mola rotası."], ["Günlük şoförlü araç", "Saatlik veya günlük özel program yönetimi."], ["Düğün ve özel gün", "Zaman çizelgesine bağlı araç ve karşılama planı."], ["Tur ve gezi", "Çok duraklı özel rota ve esnek bekleme."]],
      ozellikler: [["Uçuş takibi", "Rötar durumuna göre karşılama güncellenir."], ["Sürücü bilgisi", "İletişim ve plaka yolculuk öncesi paylaşılır."], ["Tek rota sorumlusu", "Değişiklikler tek iletişim noktasından yönetilir."]],
      surec: [{ baslik: "Rota", aciklama: "Tarih, durak ve yolcu sayısı alınır." }, { baslik: "Araç", aciklama: "Konfor ve bagaja göre sınıf seçilir." }, { baslik: "Karşılama", aciklama: "Sürücü ve buluşma bilgisi paylaşılır." }, { baslik: "Varış", aciklama: "Program kontrollü şekilde tamamlanır." }],
      sss: [{ soru: "Uçuş gecikirse ne olur?", cevap: "Uçuş bilgisi paylaşıldığında karşılama saati takip edilir." }, { soru: "Araç sınıfı garanti edilir mi?", cevap: "Rezervasyonda onaylanan sınıf veya eşdeğer üst sınıf planlanır." }, { soru: "Çocuk koltuğu eklenebilir mi?", cevap: "Önceden belirtilirse uygun ekipman planlanabilir." }],
      istatistikler: [{ deger: "7/24", etiket: "Rota iletişimi" }, { deger: "1:1", etiket: "Özel karşılama" }, { deger: "Canlı", etiket: "Uçuş takibi" }] },
  },
  {
    id: "hali-yikama", ad: "Halı ve Ev Tekstili Yıkama", kisaAd: "Halı, koltuk, yatak", iskeletAdi: "Temizlik Takip Hattı", iskeletAciklamasi: "Ürün kabulünden leke kontrolüne ve teslimata kadar hizmetleri takip hattı olarak gösteren hijyen iskeleti.",
    alanlar: [...ortakAlanlar, { anahtar: "servisGunleri", etiket: "Servis günleri", yerTutucu: "Her gün ücretsiz servis", zorunlu: true }, { anahtar: "teslimSuresi", etiket: "Ortalama teslim", yerTutucu: "3–5 gün", zorunlu: false }],
    temalar: [t("tema-1", "Su & Nane", "Hijyenik ve ferah.", ["#eefaf8", "#123a38", "#12a28d", "#ffffff"]), t("tema-2", "Lacivert Temiz", "Kurumsal yıkama tesisi.", ["#0d2635", "#f1faf8", "#48c7b6", "#173b4c"]), t("tema-3", "Krem & Okyanus", "Ev sıcaklığı ve temizlik.", ["#f6f1e7", "#18343e", "#2d8aa0", "#ffffff"])],
    sayfalar: [{ ad: "Yıkama Hattı", slug: "" }, { ad: "Neleri Yıkıyoruz", slug: "hizmetler" }, { ad: "Leke Rehberi", slug: "leke-rehberi" }, { ad: "Tesis ve Hijyen", slug: "tesis" }, { ad: "Servis Talebi", slug: "servis-talebi" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Yıkama tesisi" }, { slot: "once", baslik: "Teslim alınan ürün" }, { slot: "sonra", baslik: "Yıkama sonrası" }],
    icerik: { rozet: "Barkodlu kabul · kontrollü kurutma", slogan: "Halıdan koltuğa, ev tekstiliniz için kayıtlı temizlik hattı.", heroBaslik: "Her ürün dokusuna göre ayrılır, doğru yöntemle temizlenir.", heroAciklama: "Ücretsiz servis, barkodlu takip, leke ön işlemi, kontrollü yıkama ve kapalı alanda kurutma adımlarıyla ürününüzü baştan sona izleriz.", hakkimizdaBaslik: "Tek yıkama yöntemi yok; doğru ürün teşhisi var", hakkimizdaMetni: "Dokuma, renk dayanımı, leke türü ve kullanım alanı kabul sırasında değerlendirilir. Uygulama buna göre seçilir.", guvenBasligi: "Karışmayan ürünler, ölçülü kimya, kontrollü teslim", guvenMetni: "Her ürün ayrı kayıtla tesise girer. İşlem notu, leke durumu ve teslim bilgisi sipariş boyunca korunur.", ctaBaslik: "Servis rotasına adresinizi ekleyelim.", ctaMetni: "Yıkanacak ürünleri ve konumunuzu iletin; alım günü ve yaklaşık teslim süresini paylaşalım.",
      hizmetler: [["Halı yıkama", "Makine, el dokuma ve hassas halıya uygun ayrı programlar."], ["Koltuk yıkama", "Yerinde kumaş analizi, vakum ve kontrollü nem uygulaması."], ["Yatak ve baza", "Kumaş yüzeyde leke, koku ve hijyen odaklı derin temizlik."], ["Perde ve stor", "Ürün tipine göre sökme-takma dahil hassas yıkama."], ["Yorgan ve battaniye", "Dolgu yapısına göre yıkama ve tam kurutma."], ["Cami ve iş yeri halısı", "Yerinde veya tesiste metrekareye uygun ekipli çalışma."], ["Sandalye ve puf", "Ev ve ofis oturma grupları için yerinde temizlik."], ["Leke ve koku işlemi", "Leke türüne göre ön işlem ve sonuç bilgilendirmesi."]],
      ozellikler: [["Barkodlu takip", "Ürünler müşteri kaydıyla eşleştirilir."], ["Kapalı kurutma", "Hava koşulundan bağımsız kontrollü süreç."], ["Ücretsiz servis", "Bölge ve servis gününe göre kapıdan alım-teslim."]],
      surec: [{ baslik: "Kabul", aciklama: "Ürün, leke ve özel notlar kaydedilir." }, { baslik: "Ayırma", aciklama: "Doku ve renge göre program seçilir." }, { baslik: "Yıkama", aciklama: "Ön işlem, durulama ve sıkma tamamlanır." }, { baslik: "Teslim", aciklama: "Son kontrol sonrası paketlenerek ulaştırılır." }],
      sss: [{ soru: "Her leke tamamen çıkar mı?", cevap: "Lekenin türü, yaşı ve dokuyla etkileşimi sonucu belirler; risk önceden paylaşılır." }, { soru: "Koltuk ne kadar sürede kurur?", cevap: "Kumaş, ortam ve hava dolaşımına göre süre değişir." }, { soru: "Halılar karışır mı?", cevap: "Kabulde oluşturulan ürün kaydı süreç boyunca korunur." }],
      istatistikler: [{ deger: "8+", etiket: "Ürün grubu" }, { deger: "04", etiket: "Kontrollü hat" }, { deger: "Kapalı", etiket: "Kurutma alanı" }] },
  },
  {
    id: "dovmeci", ad: "Dövme Stüdyosu", kisaAd: "Tattoo artist", iskeletAdi: "Ink Portfolio", iskeletAciklamasi: "Sanatçı portfolyosu, fikir geliştirme, hijyen ve seans akışını koyu galeri dilinde birleştiren iskelet.",
    alanlar: [...ortakAlanlar, { anahtar: "stil", etiket: "Dövme stili", yerTutucu: "Fine line / blackwork", zorunlu: true }, { anahtar: "yasSiniri", etiket: "Yaş politikası", yerTutucu: "18+", zorunlu: true }],
    temalar: [t("tema-1", "Ink Black", "Koyu portfolyo galerisi.", ["#0e0e0f", "#f1eee7", "#d64a38", "#1b1b1d"]), t("tema-2", "Kağıt & Mürekkep", "Editoryal sanatçı dosyası.", ["#f0ece2", "#191817", "#7c271f", "#ffffff"]), t("tema-3", "Ultraviolet", "Çağdaş ve deneysel.", ["#130d22", "#f2edff", "#8c63e7", "#211535"])],
    sayfalar: [{ ad: "Stüdyo", slug: "" }, { ad: "Stiller", slug: "stiller" }, { ad: "Portfolyo", slug: "portfolyo" }, { ad: "Seans ve Bakım", slug: "seans-bakim" }, { ad: "Fikir Gönder", slug: "fikir-gonder" }],
    medyaSlotlari: [{ slot: "hero", baslik: "İmza çalışma" }, { slot: "portfolio-1", baslik: "Portfolyo 1" }, { slot: "portfolio-2", baslik: "Portfolyo 2" }, { slot: "studio", baslik: "Stüdyo" }],
    icerik: { rozet: "Özgün tasarım · steril seans", slogan: "Fikrinizi kopyalamadan dinler, size ait bir çizgiye dönüştürürüz.", heroBaslik: "Teninizde kalacak tasarım, doğru fikir görüşmesiyle başlar.", heroAciklama: "Stil, yerleşim, ölçü ve detay seviyesi birlikte belirlenir. Tasarım vücut akışına göre hazırlanır ve seans planı açıkça paylaşılır.", hakkimizdaBaslik: "Portfolyo kadar süreç de sanatçının imzasıdır", hakkimizdaMetni: "Her proje referans konuşması, özgün çizim, yerleşim provası ve bakım bilgilendirmesiyle ilerler. Başkasına ait çalışma birebir kopyalanmaz.", guvenBasligi: "Tek kullanımlık sarf, steril çalışma alanı, açık bakım bilgisi", guvenMetni: "Seans hazırlığı müşteri önünde tamamlanır; iğne, kap ve bariyer ürünleri tek kullanımlıktır.", ctaBaslik: "Fikrinizi stüdyoya gönderin.", ctaMetni: "Konu, yaklaşık ölçü, vücut bölgesi ve beğendiğiniz stil örneklerini paylaşın; görüşme zamanını planlayalım.",
      hizmetler: [["Fine line", "İnce çizgi, dengeli boşluk ve sade kompozisyon."], ["Blackwork", "Siyah alan, doku ve güçlü kontrast odaklı tasarım."], ["Minimal dövme", "Küçük ölçekte okunaklı, kişisel semboller."], ["Cover-up", "Mevcut dövmenin formuna göre kapatma veya dönüştürme."], ["Rötuş", "İyileşme sonrası gerekli alanların kontrollü yenilenmesi."], ["Tasarım danışmanlığı", "Fikrin stil, ölçü ve yerleşim açısından geliştirilmesi."]],
      ozellikler: [["Özgün çizim", "Her çalışma müşteri ve yerleşime göre hazırlanır."], ["Steril seans", "Bariyer ve tek kullanımlık sarf protokolü uygulanır."], ["Bakım takibi", "İyileşme süreci için yazılı yönlendirme sunulur."]],
      surec: [{ baslik: "Fikir", aciklama: "Konu, stil ve yerleşim konuşulur." }, { baslik: "Çizim", aciklama: "Özgün kompozisyon hazırlanır." }, { baslik: "Seans", aciklama: "Yerleşim provası sonrası uygulama yapılır." }, { baslik: "Bakım", aciklama: "İyileşme adımları ve kontrol paylaşılır." }],
      sss: [{ soru: "Fiyat nasıl belirlenir?", cevap: "Ölçü, detay, yerleşim ve seans süresine göre belirlenir." }, { soru: "Tasarımı önceden görebilir miyim?", cevap: "Tasarım paylaşım ve revizyon yöntemi stüdyo politikasına göre açıklanır." }, { soru: "Dövme sonrası bakım nasıl yapılır?", cevap: "Seans sonunda cilt ve uygulamaya özel yazılı bakım bilgisi verilir." }],
      istatistikler: [{ deger: "1/1", etiket: "Özgün çizim" }, { deger: "18+", etiket: "Stüdyo politikası" }, { deger: "Tek", etiket: "Kullanımlık sarf" }] },
  },
  {
    id: "elektrikci", ad: "Elektrikçi", kisaAd: "Elektrik teknik servis", iskeletAdi: "Enerji Kontrol Paneli", iskeletAciklamasi: "Arıza önceliği, ölçüm, müdahale ve güvenlik kontrolünü teknik panel düzeninde sunan iskelet.",
    alanlar: [...ortakAlanlar, { anahtar: "acilServis", etiket: "Acil servis", yerTutucu: "7/24", zorunlu: true }, { anahtar: "belge", etiket: "Ustalık / yetki bilgisi", yerTutucu: "Belge no", zorunlu: false }],
    temalar: [t("tema-1", "Signal Yellow", "Teknik ve dikkat çekici.", ["#10161a", "#f3f5f3", "#f2c230", "#1c2429"]), t("tema-2", "Panel White", "Temiz kurumsal servis.", ["#f3f5f6", "#15242d", "#cb930d", "#ffffff"]), t("tema-3", "Electric Blue", "Modern ölçüm ve teknoloji.", ["#071d2c", "#e9f6fb", "#23a5d8", "#102c3d"])],
    sayfalar: [{ ad: "Servis Paneli", slug: "" }, { ad: "Arıza ve Hizmetler", slug: "hizmetler" }, { ad: "Çalışma Alanları", slug: "calisma-alanlari" }, { ad: "Güvenlik", slug: "guvenlik" }, { ad: "Servis Çağır", slug: "servis-cagir" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Elektrik müdahalesi" }, { slot: "pano", baslik: "Pano çalışması" }, { slot: "olcum", baslik: "Ölçüm cihazı" }],
    icerik: { rozet: "Ölçüm · müdahale · güvenlik testi", slogan: "Elektrik arızasında tahmin değil, ölçümle ilerleyen servis.", heroBaslik: "Arızanın kaynağını bulur, güvenli ve kalıcı müdahale planlarız.", heroAciklama: "Ev, iş yeri, apartman ve üretim alanlarında enerji kesintisi, kaçak, pano ve tesisat sorunlarına kayıtlı servis yaklaşımı.", hakkimizdaBaslik: "Önce hattı ve riski anlarız", hakkimizdaMetni: "Şikâyeti dinler, pano ve hattı ölçer, müdahale kapsamını açıklarız. Onaysız ek işlem yapılmaz.", guvenBasligi: "Enerji verilmeden önce son kontrol", guvenMetni: "Bağlantılar, koruma elemanları ve izolasyon kontrol edilir; çalışma alanı düzenli bırakılır.", ctaBaslik: "Arıza kaydınızı oluşturalım.", ctaMetni: "Belirtiyi, konumu ve mümkünse pano fotoğrafını iletin; servis önceliğini belirleyelim.",
      hizmetler: [["Elektrik arıza tespiti", "Kesinti, kaçak ve düzensiz enerji sorunlarında ölçümlü teşhis."], ["Pano ve sigorta", "Pano düzenleme, koruma elemanı değişimi ve etiketleme."], ["Aydınlatma", "Armatür, sensör, LED ve dış alan çözümleri."], ["Kablo ve hat çekimi", "Güç, data ve zayıf akım hatlarının düzenli kurulumu."], ["Kamera ve güvenlik", "Kamera, alarm ve görüntülü diafon altyapısı."], ["Topraklama kontrolü", "Koruma hattı ve kaçak akım sistemlerinin değerlendirilmesi."]],
      ozellikler: [["Ölçümlü teşhis", "Sorun kaynağı cihaz ve hat kontrolüyle belirlenir."], ["İşlem öncesi bilgi", "Kapsam ve değişecek parça açıklanır."], ["Güvenlik kontrolü", "Enerji dönüşü öncesi son test yapılır."]],
      surec: [{ baslik: "Kayıt", aciklama: "Belirti ve konum bilgisi alınır." }, { baslik: "Ölçüm", aciklama: "Pano, hat ve yük kontrol edilir." }, { baslik: "Müdahale", aciklama: "Onaylanan işlem güvenle uygulanır." }, { baslik: "Test", aciklama: "Koruma ve çalışma durumu doğrulanır." }],
      sss: [{ soru: "Acil arızaya geliyor musunuz?", cevap: "Servis bölgesi ve müsaitliğe göre acil kayıt önceliklendirilir." }, { soru: "Malzeme fiyatı önceden belli olur mu?", cevap: "Tespit sonrası kullanılacak malzeme ve işçilik açıklanır." }, { soru: "Kaçak akım rölesi neden atar?", cevap: "Cihaz, hat veya izolasyon kaynaklı olabilir; ölçüm yapılmadan kesin sonuç verilmez." }],
      istatistikler: [{ deger: "7/24", etiket: "Arıza kaydı" }, { deger: "3 test", etiket: "Ölçüm yaklaşımı" }, { deger: "AC", etiket: "Güvenli enerji dönüşü" }] },
  },
  {
    id: "tesisatci", ad: "Tesisatçı", kisaAd: "Su tesisatı", iskeletAdi: "Tesisat Teşhis Masası", iskeletAciklamasi: "Belirti seçimi, kaçak teşhisi, müdahale ve basınç kontrolünü servis fişi gibi yöneten iskelet.",
    alanlar: [...ortakAlanlar, { anahtar: "acilServis", etiket: "Acil servis", yerTutucu: "7/24", zorunlu: true }, { anahtar: "cihazliTespit", etiket: "Cihazlı tespit", yerTutucu: "Termal kamera ve akustik dinleme", zorunlu: false }],
    temalar: [t("tema-1", "Basınç Mavisi", "Teknik, ferah ve güvenli.", ["#eef7fb", "#123247", "#1689c0", "#ffffff"]), t("tema-2", "Gece Servis", "Acil müdahale karakteri.", ["#0d202b", "#eff8fb", "#35a9d4", "#173440"]), t("tema-3", "Bakır Hat", "Usta işi ve sıcak güven.", ["#f4eee5", "#34261e", "#b4693e", "#ffffff"])],
    sayfalar: [{ ad: "Teşhis Masası", slug: "" }, { ad: "Sorunlar ve Çözümler", slug: "hizmetler" }, { ad: "Cihazlı Tespit", slug: "cihazli-tespit" }, { ad: "Servis Süreci", slug: "servis-sureci" }, { ad: "Usta Çağır", slug: "usta-cagir" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Tesisat servisi" }, { slot: "teshis", baslik: "Cihazlı teşhis" }, { slot: "uygulama", baslik: "Onarım" }],
    icerik: { rozet: "Belirti · teşhis · sızdırmazlık", slogan: "Kırmadan önce kaynağı bulur, müdahaleyi netleştiririz.", heroBaslik: "Su kaçağı, tıkanıklık ve tesisat arızasında doğru teşhis.", heroAciklama: "Sorunun belirtisini dinler, uygun cihaz ve kontrol yöntemiyle kaynağı belirler, müdahale seçeneklerini açıkça sunarız.", hakkimizdaBaslik: "Gereksiz kırma yerine kontrollü teşhis", hakkimizdaMetni: "Nem, basınç, gider akışı ve bağlantılar sistemli biçimde kontrol edilir. İşlem yalnızca sorunlu alana odaklanır.", guvenBasligi: "Onarım sonrası akış ve sızdırmazlık kontrolü", guvenMetni: "Müdahale tamamlandıktan sonra hat yeniden test edilir; kullanılan parça ve yapılan işlem müşteriye açıklanır.", ctaBaslik: "Sorunu tarif edin, servis kaydını açalım.", ctaMetni: "Kaçak, tıkanıklık, koku veya basınç problemini iletin; uygun ekipmanı hazırlayalım.",
      hizmetler: [["Su kaçağı tespiti", "Nem ve hat belirtilerine göre cihaz destekli kaynak arama."], ["Tıkanıklık açma", "Gider yapısına uygun mekanik veya basınçlı uygulama."], ["Musluk ve rezervuar", "Kaçırma, ses ve dolum sorunlarında parça-onarım çözümü."], ["Petek ve ısıtma hattı", "Hava, dolaşım ve bağlantı problemlerinin kontrolü."], ["Gider kokusu", "Sifon, bağlantı ve havalandırma kaynaklarının değerlendirilmesi."], ["Tesisat yenileme", "Banyo, mutfak ve hat dönüşümleri için planlı uygulama."]],
      ozellikler: [["Belirti seçimi", "Servis kaydı sorunun türüne göre hazırlanır."], ["Cihazlı teşhis", "Uygun durumda kırma alanı daraltılır."], ["Basınç testi", "Onarım sonrası hat yeniden kontrol edilir."]],
      surec: [{ baslik: "Belirti", aciklama: "Sorun, konum ve geçmiş işlem öğrenilir." }, { baslik: "Teşhis", aciklama: "Hat ve bağlantılar kontrol edilir." }, { baslik: "Onarım", aciklama: "Onaylanan müdahale uygulanır." }, { baslik: "Test", aciklama: "Akış ve sızdırmazlık doğrulanır." }],
      sss: [{ soru: "Kırmadan kaçak bulunur mu?", cevap: "Sorunun türü ve tesisat erişimine göre cihazlı yöntemler kullanılabilir." }, { soru: "Tıkanıklık tekrarlar mı?", cevap: "Hat yapısı ve kullanım nedeni değerlendirilerek kalıcı riskler açıklanır." }, { soru: "Servis ücreti nasıl belirlenir?", cevap: "Tespit ve müdahale kapsamı işlem öncesi açıklanır." }],
      istatistikler: [{ deger: "4 adım", etiket: "Teşhis kaydı" }, { deger: "H₂O", etiket: "Basınç ve akış" }, { deger: "Son", etiket: "Sızdırmazlık testi" }] },
  },
  {
    id: "organizasyon", ad: "Organizasyon", kisaAd: "Etkinlik ve prodüksiyon", iskeletAdi: "Event Run of Show", iskeletAciklamasi: "Konsept, sahne, tedarikçi ve etkinlik akışını yapım dosyası estetiğinde sunan sinematik iskelet.",
    alanlar: [...ortakAlanlar, { anahtar: "uzmanlik", etiket: "Etkinlik uzmanlığı", yerTutucu: "Düğün, kurumsal etkinlik ve konser", zorunlu: true }, { anahtar: "kapasite", etiket: "Organizasyon kapasitesi", yerTutucu: "50–2.000 kişi", zorunlu: false }],
    temalar: [t("tema-1", "Neon Sahne", "Enerjik prodüksiyon dili.", ["#100b1c", "#f5f0ff", "#c356ff", "#211536"]), t("tema-2", "Bordo Gala", "Düğün ve gala zarafeti.", ["#241015", "#fff2ec", "#d69b6e", "#36171e"]), t("tema-3", "Paper Studio", "Çağdaş yaratıcı ajans.", ["#f2efe7", "#1b1b1c", "#ff5e3a", "#ffffff"])],
    sayfalar: [{ ad: "Showreel", slug: "" }, { ad: "Organizasyonlar", slug: "organizasyonlar" }, { ad: "Prodüksiyon", slug: "produksiyon" }, { ad: "İşler", slug: "isler" }, { ad: "Brief Ver", slug: "brief" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Etkinlik sahnesi" }, { slot: "event-1", baslik: "Etkinlik 1" }, { slot: "event-2", baslik: "Etkinlik 2" }, { slot: "event-3", baslik: "Etkinlik 3" }],
    icerik: { rozet: "Konseptten son alkışa", slogan: "Fikri, ekibi ve etkinlik gününü tek yapım akışında yönetiyoruz.", heroBaslik: "Hatırlanan etkinlikler, görünmeyen detayların doğru yönetilmesiyle kurulur.", heroAciklama: "Konsept, mekân, sahne, teknik prodüksiyon, tedarikçi ve konuk akışı tek bir zaman çizelgesinde buluşur.", hakkimizdaBaslik: "Yaratıcı fikir kadar kusursuz uygulama", hakkimizdaMetni: "Her projeye brief, bütçe ve mekân gerçekliğiyle yaklaşırız. Tasarım kararlarını sahada uygulanabilir üretim planına dönüştürürüz.", guvenBasligi: "Tek yapım sorumlusu, net görev dağılımı, kontrollü etkinlik günü", guvenMetni: "Kurulumdan kapanışa kadar ekipler run of show üzerinden ilerler; kritik kararlar ve iletişim noktaları önceden belirlenir.", ctaBaslik: "Etkinlik briefinizi birlikte açalım.", ctaMetni: "Tarih, konuk sayısı, mekân ve hayal ettiğiniz atmosferi paylaşın; ilk yapım çerçevesini çıkaralım.",
      hizmetler: [["Düğün ve davet", "Konsept, dekor, akış ve tedarikçi koordinasyonu."], ["Kurumsal etkinlik", "Lansman, bayi toplantısı ve şirket gecesi yapımı."], ["Konser ve sahne", "Sahne, ses, ışık ve sanatçı operasyonu."], ["Açılış ve lansman", "Marka mesajını deneyime dönüştüren kurgu."], ["Teknik prodüksiyon", "Ses, ışık, görüntü, truss ve sahne altyapısı."], ["Dekor ve uygulama", "Konsepte özel üretim, kurulum ve söküm."]],
      ozellikler: [["Run of show", "Tüm ekipler ortak zaman çizelgesinden ilerler."], ["Tek yapım masası", "Tedarikçi ve müşteri iletişimi merkezileştirilir."], ["Saha provası", "Kritik geçişler etkinlik öncesi kontrol edilir."]],
      surec: [{ baslik: "Brief", aciklama: "Amaç, konuk ve bütçe konuşulur." }, { baslik: "Konsept", aciklama: "Mekâna uygun yaratıcı yön geliştirilir." }, { baslik: "Prodüksiyon", aciklama: "Ekip, teknik ve tedarik planlanır." }, { baslik: "Show", aciklama: "Kurulumdan kapanışa akış yönetilir." }],
      sss: [{ soru: "Ne kadar önce başlamalıyız?", cevap: "Kapsama göre değişir; mekân ve tedarikçi seçimi için erken planlama avantaj sağlar." }, { soru: "Sadece teknik prodüksiyon alabilir miyiz?", cevap: "Evet, hizmet kapsamı ihtiyaç başlıklarına göre oluşturulabilir." }, { soru: "Bütçe nasıl takip edilir?", cevap: "Onaylanan kalemler ve değişiklikler proje boyunca kayıtlı tutulur." }],
      istatistikler: [{ deger: "01", etiket: "Yapım masası" }, { deger: "360°", etiket: "Etkinlik yönetimi" }, { deger: "Live", etiket: "Saha kontrolü" }] },
  },
  {
    id: "duvar-isleri", ad: "Duvar İşleri", kisaAd: "Boya, alçı ve dekor", iskeletAdi: "Yüzey Kataloğu", iskeletAciklamasi: "Önce-sonra, malzeme katmanları ve metrekare teklifini mimari numune kataloğu gibi sunan iskelet.",
    alanlar: [...ortakAlanlar, { anahtar: "uzmanlik", etiket: "Uygulama uzmanlığı", yerTutucu: "Boya, alçıpan ve dekoratif sıva", zorunlu: true }, { anahtar: "kesif", etiket: "Keşif bilgisi", yerTutucu: "Ücretsiz keşif", zorunlu: false }],
    temalar: [t("tema-1", "Kireç & Terracotta", "Doğal yüzey kataloğu.", ["#f2eadf", "#2f2924", "#b85f3e", "#ffffff"]), t("tema-2", "Beton Studio", "Modern ve mimari.", ["#e8e7e3", "#202224", "#6d7477", "#ffffff"]), t("tema-3", "Gece Ustası", "Premium iç mekân uygulaması.", ["#171613", "#f3efe5", "#d1a65a", "#27241f"])],
    sayfalar: [{ ad: "Yüzey Stüdyosu", slug: "" }, { ad: "Uygulamalar", slug: "uygulamalar" }, { ad: "Malzemeler", slug: "malzemeler" }, { ad: "İş Planı", slug: "is-plani" }, { ad: "Keşif İste", slug: "kesif" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Tamamlanmış mekân" }, { slot: "once", baslik: "Uygulama öncesi" }, { slot: "sonra", baslik: "Uygulama sonrası" }, { slot: "doku", baslik: "Yüzey dokusu" }],
    icerik: { rozet: "Keşif · yüzey hazırlığı · temiz teslim", slogan: "Duvarın görünen renginden önce görünmeyen altyapısını düzeltiriz.", heroBaslik: "Düzgün yüzey, doğru malzeme ve mekâna yakışan son kat.", heroAciklama: "Boya, alçı, alçıpan, dekoratif sıva ve duvar paneli uygulamalarını keşiften korumaya kadar planlı biçimde tamamlarız.", hakkimizdaBaslik: "İyi sonuç son katta değil, hazırlıkta başlar", hakkimizdaMetni: "Nem, çatlak, eski kaplama ve yüzey bozuklukları keşifte değerlendirilir. Malzeme ve uygulama sırası bu duruma göre belirlenir.", guvenBasligi: "Eşya koruma, katman kontrolü ve temiz teslim", guvenMetni: "Çalışma alanı kapatılır, uygulama katları kontrol edilir ve iş bitiminde yüzeyle birlikte mekân da teslim edilir.", ctaBaslik: "Mekânınız için keşif planlayalım.", ctaMetni: "Yaklaşık metrekare, mevcut yüzey ve istediğiniz uygulamayı iletin; doğru hazırlık planını çıkaralım.",
      hizmetler: [["İç cephe boya", "Yüzey onarımı, astar ve son kat dahil temiz uygulama."], ["Dış cephe boya", "Hava koşullarına uygun sistem ve cephe hazırlığı."], ["Alçı ve sıva", "Eğri, çatlak veya bozuk yüzeylerin düzeltilmesi."], ["Alçıpan", "Bölme duvar, asma tavan, niş ve gizli ışık altyapısı."], ["Dekoratif sıva", "Doku, beton efekt ve özel yüzey uygulamaları."], ["Duvar paneli ve çıta", "Mekâna göre ölçü, ritim ve montaj planı."]],
      ozellikler: [["Yerinde keşif", "Yüzey ve metraj uygulama öncesi görülür."], ["Alan koruma", "Zemin, mobilya ve sabit elemanlar kapatılır."], ["Katman kaydı", "Astar, dolgu ve son kat sistemi açıkça belirtilir."]],
      surec: [{ baslik: "Keşif", aciklama: "Yüzey, metraj ve erişim incelenir." }, { baslik: "Hazırlık", aciklama: "Koruma, kazıma ve tamir yapılır." }, { baslik: "Uygulama", aciklama: "Katlar teknik sırayla tamamlanır." }, { baslik: "Teslim", aciklama: "Rötuş ve temizlik kontrolü yapılır." }],
      sss: [{ soru: "Kaç kat boya yapılır?", cevap: "Renk geçişi ve yüzey emiciliğine göre astar ve kat sayısı belirlenir." }, { soru: "Eşyaları taşımamız gerekir mi?", cevap: "Keşifte alan koruma ve taşıma ihtiyacı birlikte planlanır." }, { soru: "İş ne kadar sürer?", cevap: "Metraj, yüzey tamiri ve kuruma sürelerine göre iş programı hazırlanır." }],
      istatistikler: [{ deger: "µm", etiket: "Katman disiplini" }, { deger: "04", etiket: "İş aşaması" }, { deger: "Temiz", etiket: "Mekân teslimi" }] },
  },
  {
    id: "oto-yikama", ad: "Oto Yıkama", kisaAd: "Detaylı araç temizliği", iskeletAdi: "Detailing Bay", iskeletAciklamasi: "Araç kabulü, paket karşılaştırması ve yüzey reçetesini yıkama istasyonu göstergeleriyle sunan iskelet.",
    alanlar: [...ortakAlanlar, { anahtar: "randevu", etiket: "Randevu düzeni", yerTutucu: "Randevulu / sıra ile", zorunlu: true }, { anahtar: "kapasite", etiket: "Günlük kapasite", yerTutucu: "20 araç", zorunlu: false }],
    temalar: [t("tema-1", "Foam Blue", "Parlak, ferah ve dinamik.", ["#ecf7fb", "#102d3d", "#13a8df", "#ffffff"]), t("tema-2", "Detailing Black", "Premium detailing garajı.", ["#0d1114", "#f3f6f7", "#39c4e6", "#182126"]), t("tema-3", "Racing Red", "Hızlı ve sportif.", ["#f4f2ee", "#211a1a", "#df3b35", "#ffffff"])],
    sayfalar: [{ ad: "Yıkama Bay", slug: "" }, { ad: "Paketler", slug: "paketler" }, { ad: "Detailing", slug: "detailing" }, { ad: "Uygulama Hattı", slug: "uygulama-hatti" }, { ad: "Randevu", slug: "randevu" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Parlak araç" }, { slot: "once", baslik: "Uygulama öncesi" }, { slot: "sonra", baslik: "Uygulama sonrası" }, { slot: "detay", baslik: "İç detay" }],
    icerik: { rozet: "Araç kabul · yüzey reçetesi · teslim kontrolü", slogan: "Her araca aynı kimya değil, yüzeye uygun uygulama.", heroBaslik: "Boyayı, döşemeyi ve detayları koruyan profesyonel araç temizliği.", heroAciklama: "Araç kabulünde ihtiyaç belirlenir; dış yüzey, jant, plastik, cam ve iç mekân için uygun paket hazırlanır.", hakkimizdaBaslik: "Hızlı yıkamadan detaylı bakıma net hizmet sınırları", hakkimizdaMetni: "Paket içeriği ve tahmini süre araç teslim alınmadan açıklanır. Hassas yüzeyler ve özel lekeler ayrıca değerlendirilir.", guvenBasligi: "Doğru ürün, temiz ekipman, son ışık kontrolü", guvenMetni: "Bez ve ekipmanlar uygulama alanına göre ayrılır; teslim öncesi araç aydınlık kontrol noktasında incelenir.", ctaBaslik: "Aracınız için doğru paketi seçelim.", ctaMetni: "Araç sınıfı ve ihtiyaçlarınızı iletin; uygun süre ve paketi netleştirelim.",
      hizmetler: [["İç-dış yıkama", "Günlük kir için dengeli dış yüzey ve kabin temizliği."], ["Detaylı iç temizlik", "Koltuk, tavan, taban ve plastik yüzeylerin derin temizliği."], ["Boya koruma", "Yüzey hazırlığı sonrası parlaklık ve hidrofobik destek."], ["Pasta-cila", "Boya durumuna göre çizik azaltma ve parlaklık uygulaması."], ["Motor temizliği", "Hassas alanlar korunarak kontrollü yüzey temizliği."], ["Far parlatma", "Matlaşmış yüzeyin kademeli düzeltilmesi ve korunması."]],
      ozellikler: [["Araç kabul kartı", "İhtiyaç ve hassas alanlar işaretlenir."], ["Ayrılmış ekipman", "İç, dış ve jant bezleri karıştırılmaz."], ["Teslim kontrolü", "Araç son ışıkta çevresel olarak kontrol edilir."]],
      surec: [{ baslik: "Kabul", aciklama: "Araç ve beklenti birlikte incelenir." }, { baslik: "Reçete", aciklama: "Paket, ürün ve süre belirlenir." }, { baslik: "Uygulama", aciklama: "Alanlar sırayla temizlenir." }, { baslik: "Teslim", aciklama: "Son kontrol ve bakım bilgisi verilir." }],
      sss: [{ soru: "Randevu gerekli mi?", cevap: "Detaylı uygulamalarda süre ayırmak için randevu önerilir." }, { soru: "Her çizik pasta-cila ile çıkar mı?", cevap: "Çiziğin derinliği boya ölçümü ve yüzey kontrolüyle değerlendirilir." }, { soru: "Koltuklar ne kadar sürede kurur?", cevap: "Kumaş ve hava koşullarına göre teslim süresi planlanır." }],
      istatistikler: [{ deger: "360°", etiket: "Teslim kontrolü" }, { deger: "3 alan", etiket: "Ayrı ekipman" }, { deger: "pH", etiket: "Yüzeye uygun kimya" }] },
  },
  {
    id: "oto-kurtarma", ad: "Oto Kurtarma", kisaAd: "Yol yardım ve çekici", iskeletAdi: "Acil Rota Konsolu", iskeletAciklamasi: "Konum, araç durumu, ekip yönlendirme ve varış bilgisini acil operasyon ekranı gibi sunan iskelet.",
    alanlar: [...ortakAlanlar, { anahtar: "acilHat", etiket: "Acil hat", yerTutucu: "7/24", zorunlu: true }, { anahtar: "kapsama", etiket: "Hizmet bölgesi", yerTutucu: "İstanbul ve çevre iller", zorunlu: true }],
    temalar: [t("tema-1", "Rescue Orange", "Acil ve görünür.", ["#10161b", "#f4f5f2", "#ff6a20", "#1b242b"]), t("tema-2", "Highway Yellow", "Yol güvenliği karakteri.", ["#f2f1ec", "#17232b", "#e6ad18", "#ffffff"]), t("tema-3", "Night Signal", "Gece yol yardımı.", ["#071522", "#eaf4f7", "#28a9d3", "#102739"])],
    sayfalar: [{ ad: "Acil Konsol", slug: "" }, { ad: "Yol Yardım", slug: "yol-yardim" }, { ad: "Çekici Filosu", slug: "filo" }, { ad: "Hizmet Bölgesi", slug: "hizmet-bolgesi" }, { ad: "Konum Gönder", slug: "konum-gonder" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Çekici aracı" }, { slot: "filo", baslik: "Kurtarma filosu" }, { slot: "operasyon", baslik: "Yükleme operasyonu" }],
    icerik: { rozet: "7/24 konum bazlı yönlendirme", slogan: "Aracınız kaldığı yerde, en yakın uygun ekibi yönlendiriyoruz.", heroBaslik: "Konumu paylaşın; doğru ekipmanla güvenli müdahaleyi planlayalım.", heroAciklama: "Arıza, kaza, lastik, akü veya çekici ihtiyacında araç ve yol durumuna uygun ekip yönlendirilir; tahmini varış bilgisi paylaşılır.", hakkimizdaBaslik: "Her arıza aynı çekiciyle çözülmez", hakkimizdaMetni: "Araç tipi, hasar durumu, yol eğimi ve varış noktası öğrenilir. Platform, vinç ve ek ekipman buna göre seçilir.", guvenBasligi: "Güvenli yükleme, kayıtlı varış, açık fiyat bilgisi", guvenMetni: "Müdahale kapsamı ve rota teyit edilir; araç sabitleme kontrolünden sonra yola çıkılır.", ctaBaslik: "Konumunuzu ve araç durumunu gönderin.", ctaMetni: "Araç modeli, sorun ve canlı konum bilgisiyle en uygun ekibi yönlendirelim.",
      hizmetler: [["Oto çekici", "Binek ve hafif ticari araçlar için platformlu taşıma."], ["Kaza kurtarma", "Hasar ve yol durumuna göre güvenli kaldırma-yükleme."], ["Akü takviye", "Uygun koşullarda yerinde çalıştırma desteği."], ["Lastik desteği", "Stepne ve ekipman uygunluğuna göre yerinde yardım."], ["Şehirler arası araç taşıma", "Planlı rota ile kapıdan kapıya araç transferi."], ["Kapalı otopark kurtarma", "Yükseklik ve manevra alanına uygun ekipman yönlendirmesi."]],
      ozellikler: [["Canlı konum", "Ekip yönlendirmesi doğru noktaya yapılır."], ["Araç uyumlu ekipman", "Platform ve kurtarma şekli duruma göre seçilir."], ["Tahmini varış", "Trafik ve mesafeye göre bilgi paylaşılır."]],
      surec: [{ baslik: "Konum", aciklama: "Canlı konum ve araç bilgisi alınır." }, { baslik: "Teşhis", aciklama: "Sorun ve yol koşulu değerlendirilir." }, { baslik: "Yönlendirme", aciklama: "Uygun ekip ve araç çıkarılır." }, { baslik: "Teslim", aciklama: "Araç belirlenen noktaya güvenle ulaştırılır." }],
      sss: [{ soru: "Ne kadar sürede gelirsiniz?", cevap: "Konum, trafik ve ekip müsaitliğine göre tahmini süre kayıt sırasında paylaşılır." }, { soru: "Fiyat nasıl belirlenir?", cevap: "Mesafe, araç durumu, ekipman ve operasyon zorluğuna göre açıklanır." }, { soru: "Otomatik araç çekilir mi?", cevap: "Araç tipi ve hasar durumu paylaşılırsa uygun yükleme yöntemi seçilir." }],
      istatistikler: [{ deger: "7/24", etiket: "Acil çağrı" }, { deger: "GPS", etiket: "Konum yönlendirme" }, { deger: "4 nokta", etiket: "Araç sabitleme" }] },
  },
  {
    id: "oto-servis", ad: "Oto Servis", kisaAd: "Bakım ve onarım", iskeletAdi: "Servis Kabul Dosyası", iskeletAciklamasi: "Araç kabulü, arıza teşhisi, iş emri ve teslim raporunu premium atölye düzeninde sunan iskelet.",
    alanlar: [...ortakAlanlar, { anahtar: "markalar", etiket: "Hizmet verilen markalar", yerTutucu: "Tüm binek ve hafif ticari", zorunlu: true }, { anahtar: "yolYardim", etiket: "Yol yardım", yerTutucu: "7/24 mobil servis", zorunlu: false }],
    temalar: [t("tema-1", "Torque Orange", "Performans ve teknik güç.", ["#0e1215", "#f6f3ec", "#ff681c", "#1b2227"]), t("tema-2", "Workshop Silver", "Kurumsal ve temiz servis.", ["#eef0ef", "#172127", "#62727a", "#ffffff"]), t("tema-3", "Racing Blue", "Modern uzman servis.", ["#091a2a", "#edf5fb", "#2c87d3", "#132b40"])],
    sayfalar: [{ ad: "Servis Kabul", slug: "" }, { ad: "Bakım ve Onarım", slug: "hizmetler" }, { ad: "Arıza Teşhis", slug: "ariza-teshis" }, { ad: "Kurumsal Filo", slug: "kurumsal-filo" }, { ad: "Randevu", slug: "randevu" }],
    medyaSlotlari: [{ slot: "hero", baslik: "Servis atölyesi" }, { slot: "teshis", baslik: "Arıza teşhis" }, { slot: "lift", baslik: "Lift üzerinde araç" }, { slot: "ekip", baslik: "Teknik ekip" }],
    icerik: { rozet: "Araç kabul · teşhis · iş emri · teslim", slogan: "Parça değiştirmeden önce arızayı doğrularız.", heroBaslik: "Aracınız için ölçümlü teşhis, açık iş emri ve kontrollü teslim.", heroAciklama: "Periyodik bakımdan mekanik onarıma, ön düzenden elektronik arızaya kadar tüm işlemler araç kabul dosyası üzerinden ilerler.", hakkimizdaBaslik: "Usta yorumu ile cihaz verisini aynı masada buluşturuyoruz", hakkimizdaMetni: "Sürücü şikâyeti dinlenir, yol testi ve cihaz kontrolü yapılır. Arıza doğrulanmadan gereksiz parça değişimine gidilmez.", guvenBasligi: "Onaysız işlem yok, değişen parça bilgisi açık, teslim kontrolü kayıtlı", guvenMetni: "İş emri, parça seçeneği ve süre müşteri onayıyla netleşir. Teslimde yapılan işlemler ve sonraki bakım zamanı paylaşılır.", ctaBaslik: "Aracınız için servis kaydı açalım.", ctaMetni: "Marka-model, kilometre ve şikâyeti iletin; uygun teşhis ve randevu süresini planlayalım.",
      hizmetler: [["Periyodik bakım", "Yağ, filtre, sıvı ve kontrol listesiyle kilometre bakımı."], ["Bilgisayarlı arıza tespiti", "Hata kodu, canlı veri ve fiziksel kontrolün birlikte değerlendirilmesi."], ["Mekanik onarım", "Motor, soğutma, fren ve aktarma sistemi müdahaleleri."], ["Ön düzen ve süspansiyon", "Ses, boşluk, rot ve yol tutuş problemlerinin kontrolü."], ["Fren sistemi", "Balata, disk, hidrolik ve güvenlik kontrolleri."], ["Mobil servis", "Uygun arızalarda yerinde teşhis ve temel müdahale."], ["Klima bakımı", "Soğutma performansı, gaz ve kaçak değerlendirmesi."], ["Kurumsal filo", "Araç bazlı bakım takvimi ve merkezi servis kaydı."]],
      ozellikler: [["Dijital iş emri", "Şikâyet, teşhis ve onaylanan işlemler kayıtlıdır."], ["Parça seçeneği", "Uygun durumda alternatifler açıkça sunulur."], ["Teslim raporu", "Yapılan işlem ve sonraki kontrol tarihi paylaşılır."]],
      surec: [{ baslik: "Kabul", aciklama: "Şikâyet, kilometre ve araç geçmişi alınır." }, { baslik: "Teşhis", aciklama: "Cihaz, lift ve yol kontrolü yapılır." }, { baslik: "İş emri", aciklama: "Kapsam, parça ve süre onaylanır." }, { baslik: "Teslim", aciklama: "Son kontrol ve raporla araç teslim edilir." }],
      sss: [{ soru: "Arıza tespiti ne kadar sürer?", cevap: "Belirti ve test ihtiyacına göre süre değişir; ilk değerlendirmede bilgi verilir." }, { soru: "Parçayı kendim getirebilir miyim?", cevap: "Garanti ve uyumluluk koşulları servis politikası kapsamında değerlendirilir." }, { soru: "Bakım kaydı tutuluyor mu?", cevap: "Yapılan işlem ve kilometre bilgisi sonraki bakım için saklanır." }],
      istatistikler: [{ deger: "OBD", etiket: "Canlı veri teşhisi" }, { deger: "4 adım", etiket: "Servis kabulü" }, { deger: "1 rapor", etiket: "Kontrollü teslim" }] },
  },
];

const BASLANGIC_SEKTORLERI: YeniSektorKimligi[] = [
  "kuafor",
  "berber",
  "guzellik-salonu",
  "nail-artist",
  "oto-yikama",
  "hali-yikama",
  "nakliye",
];

// İlk sürümde yalnızca kullanıcının aktif olarak satış yaptığı işletme grupları
// gösterilir. Eski proje tanımları geriye dönük düzenleme için dosyada korunur.
export const YENI_SEKTORLER = sektorler.filter((sektor) =>
  BASLANGIC_SEKTORLERI.includes(sektor.id),
);

const EK_GORSEL_ALANLARI: Partial<Record<YeniSektorKimligi, MedyaSlotuTanimi[]>> = {
  kuafor: [
    { slot: "galeri-1", baslik: "Kesim portfolyosu" },
    { slot: "galeri-2", baslik: "Renklendirme portfolyosu" },
    { slot: "galeri-3", baslik: "Salon detayları" },
    { slot: "galeri-4", baslik: "Uzman ekip" },
  ],
  berber: [
    { slot: "galeri-1", baslik: "Saç kesimi portfolyosu" },
    { slot: "galeri-2", baslik: "Sakal tasarımı" },
    { slot: "galeri-3", baslik: "Barber club atmosferi" },
    { slot: "galeri-4", baslik: "Usta koltukları" },
  ],
  "guzellik-salonu": [
    { slot: "galeri-1", baslik: "Cilt bakımı uygulaması" },
    { slot: "galeri-2", baslik: "Bakım odası" },
    { slot: "galeri-3", baslik: "Kaş ve kirpik çalışması" },
    { slot: "galeri-4", baslik: "Salon ekibi" },
  ],
  "nail-artist": [
    { slot: "galeri-1", baslik: "Yeni sezon seti" },
    { slot: "galeri-2", baslik: "Minimal nail art" },
    { slot: "galeri-3", baslik: "Renk koleksiyonu" },
    { slot: "galeri-4", baslik: "Çalışma masası" },
  ],
  "oto-yikama": [
    { slot: "galeri-1", baslik: "Dış yıkama uygulaması" },
    { slot: "galeri-2", baslik: "İç detay temizliği" },
    { slot: "galeri-3", baslik: "Pasta cila sonucu" },
    { slot: "galeri-4", baslik: "Yıkama istasyonu" },
  ],
  "hali-yikama": [
    { slot: "galeri-1", baslik: "Teslim alma servisi" },
    { slot: "galeri-2", baslik: "Yıkama hattı" },
    { slot: "galeri-3", baslik: "Kurutma alanı" },
    { slot: "galeri-4", baslik: "Paketli teslim" },
  ],
  nakliye: [
    { slot: "galeri-1", baslik: "Profesyonel paketleme" },
    { slot: "galeri-2", baslik: "Araç filosu" },
    { slot: "galeri-3", baslik: "Yükleme operasyonu" },
    { slot: "galeri-4", baslik: "Güvenli teslim" },
  ],
};

export function sektorTanimiGetir(sektor: string): SektorTanimi {
  return sektorler.find((kayit) => kayit.id === sektor) ?? sektorler[0];
}

export function yeniSektorMu(sektor: string): sektor is YeniSektorKimligi {
  return sektorler.some((kayit) => kayit.id === sektor);
}

export function varsayilanIcerikOlustur(sektor: string): SektorSiteIcerigi {
  const tanim = sektorTanimiGetir(sektor);
  const hizmetler: HizmetKaydi[] = tanim.icerik.hizmetler.map(([baslik, aciklama], index) => ({ id: `${tanim.id}-hizmet-${index + 1}`, baslik, aciklama, aktif: true }));
  const ozellikler: EkOzellikKaydi[] = tanim.icerik.ozellikler.map(([baslik, aciklama], index) => ({ id: `${tanim.id}-ozellik-${index + 1}`, baslik, aciklama, aktif: true }));
  return { ...tanim.icerik, hizmetler, ozellikler };
}

export function isletmeAlanlariOlustur(sektor: string): IsletmeAlaniDegeri[] {
  return sektorTanimiGetir(sektor).alanlar.map((alan) => ({ anahtar: alan.anahtar, etiket: alan.etiket, deger: "", zorunlu: alan.zorunlu }));
}

export function medyaAlanlariOlustur(
  sektor: string,
  tema: string = "tema-1",
): MedyaKaydi[] {
  const tanim = sektorTanimiGetir(sektor);
  const alanlar = [
    ...tanim.medyaSlotlari,
    ...(EK_GORSEL_ALANLARI[tanim.id] ?? []),
  ];

  return alanlar.map((alan, index) => {
    const dosyaAdi = `${alan.slot}.webp`;
    return {
      id: `${sektor}-medya-${index + 1}`,
      slot: alan.slot,
      baslik: alan.baslik,
      acik: false,
      url: `/site-assets/${sektor}/${tema}/${dosyaAdi}`,
      dosyaAdi,
      alternatifMetin: alan.baslik,
    };
  });
}

export function siteSayfalariOlustur(
  sektor: string,
  siteTipi: "tek-sayfa" | "cok-sayfa" = "cok-sayfa",
): SiteSayfasi[] {
  const sayfalar = sektorTanimiGetir(sektor).sayfalar;
  const aktifSayfalar = siteTipi === "tek-sayfa" ? sayfalar.slice(0, 1) : sayfalar;

  return aktifSayfalar.map((sayfa, index) => ({
    id: `${sektor}-sayfa-${index + 1}`,
    rol: index === 0 ? "ana" : index === 1 ? "hizmet" : index === 4 ? "aksiyon" : "ozel",
    ad: sayfa.ad,
    slug: sayfa.slug,
    menuBasligi: sayfa.ad,
    menuGoster: true,
    anaSayfa: index === 0,
    sira: index,
    bolumler: [],
  }));
}

export function temaTanimiGetir(sektor: string, tema?: string) {
  const tanim = sektorTanimiGetir(sektor);
  return tanim.temalar.find((kayit) => kayit.id === tema) ?? tanim.temalar[0];
}
