export interface IcerikKarti {
  baslik: string;
  aciklama: string;
}

export interface SektorDonusumProfili {
  heroBaslik: string;
  hakkimizdaBaslik: string;
  hizmetlerBaslik: string;
  guvenBaslik: string;
  surecBaslik: string;
  sssBaslik: string;
  galeriBaslik: string;
  iletisimBaslik: string;
  guvenUnsurlari: IcerikKarti[];
  surecAdimlari: IcerikKarti[];
  sorular: IcerikKarti[];
  galeriBasliklari: string[];
}

type Basliklar = readonly [string, string, string, string, string, string, string, string];
type KartSatiri = readonly [string, string];

function profil(
  basliklar: Basliklar,
  guvenUnsurlari: KartSatiri[],
  surecAdimlari: KartSatiri[],
  sorular: KartSatiri[],
  galeriBasliklari: string[],
): SektorDonusumProfili {
  const [
    heroBaslik,
    hakkimizdaBaslik,
    hizmetlerBaslik,
    guvenBaslik,
    surecBaslik,
    sssBaslik,
    galeriBaslik,
    iletisimBaslik,
  ] = basliklar;
  const kartlaraDonustur = (satirlar: KartSatiri[]) =>
    satirlar.map(([baslik, aciklama]) => ({ baslik, aciklama }));

  return {
    heroBaslik,
    hakkimizdaBaslik,
    hizmetlerBaslik,
    guvenBaslik,
    surecBaslik,
    sssBaslik,
    galeriBaslik,
    iletisimBaslik,
    guvenUnsurlari: kartlaraDonustur(guvenUnsurlari),
    surecAdimlari: kartlaraDonustur(surecAdimlari),
    sorular: kartlaraDonustur(sorular),
    galeriBasliklari,
  };
}

const profiller: Record<string, SektorDonusumProfili> = {
  "oto-yikama": profil(
    ["Aracınız Yenilensin", "Özenli Araç Bakımı", "Yıkama Seçenekleri", "Doğru Bakım", "Temizlik Akışı", "Yıkama Rehberi", "Bakım Detayları", "Aracınızı Anlatın"],
    [
      ["Yüzeye Uygun İşlem", "Boya, jant, döşeme ve hassas parçalar aynı ürünle değil, yüzeyin durumuna uygun yöntemle ele alınır."],
      ["Net Hizmet Kapsamı", "İç temizlik, dış yıkama, leke işlemi ve koruma adımları araç görülerek birbirinden ayrılır."],
      ["Teslim Öncesi Kontrol", "Camlar, kapı araları, jantlar ve iç mekândaki öncelikli noktalar teslimden önce yeniden gözden geçirilir."],
    ],
    [
      ["Aracı Görelim", "Araç tipi, kullanım yoğunluğu ve özellikle ilgilenilmesi istenen alanlar belirlenir."],
      ["Paketi Seçelim", "Gerekli temizlik adımları, tahmini süre ve varsa ek uygulamalar başlamadan konuşulur."],
      ["Sırayla Uygulayalım", "Dış yüzeyden iç mekâna kadar işlemler birbirini kirletmeyecek bir sırayla yürütülür."],
      ["Birlikte İnceleyelim", "Teslim sırasında öncelikler kontrol edilir ve bakım sonrası dikkat edilecek noktalar paylaşılır."],
    ],
    [
      ["Hangi paket uygun?", "Araç boyutu, iç mekânın durumu ve beklenen sonuç öğrenildikten sonra gereksiz işlem eklemeden uygun kapsam belirlenir."],
      ["Ne kadar sürer?", "Süre; seçilen paket, aracın kirlilik düzeyi ve uygulanacak ek işlemlere göre araç görülünce netleşir."],
      ["Lekeler çıkar mı?", "Lekenin türü, yaşı ve yüzey malzemesi sonucu etkiler; işlem öncesi yüzey kontrolüyle gerçekçi bilgi verilir."],
      ["Randevu gerekli mi?", "Yoğunluk ve işlem süresi değişebileceği için gelmeden önce uygun saat sormak beklemeyi azaltır."],
    ],
    ["Dış Yüzey Bakımı", "İç Mekân Temizliği", "Jant ve Lastikler", "Koltuk Detayları", "Kapı Araları", "Teslim Kontrolü"],
  ),
  "oto-detaylandirma": profil(
    ["Detaylarda Yenilik", "Bilinçli Yüzey Bakımı", "Koruma Uygulamaları", "İşçilik Standardı", "Detaylandırma Planı", "Bakım Soruları", "Uygulama Detayları", "Aracınızı Değerlendirelim"],
    [
      ["Boya Durumu Analizi", "Çizik, hare, vernik kalınlığı ve daha önce yapılan işlemler değerlendirilmeden düzeltme seviyesi belirlenmez."],
      ["Ürün ve Yöntem Uyumu", "Pasta, polisaj, kaplama ve iç detay ürünleri yüzeyin malzemesine ve mevcut durumuna göre seçilir."],
      ["Kontrollü Sonuç", "Farklı ışık açıları, panel geçişleri ve koruyucu katmanın yüzey davranışı teslim öncesinde incelenir."],
    ],
    [
      ["Ön İnceleme", "Araç gün ışığına yakın koşullarda incelenir; beklentiyle uygulanabilir sonuç arasındaki sınırlar konuşulur."],
      ["İşlem Haritası", "Panel bazında düzeltme, temizlik ve koruma adımları sıralanarak kapsam oluşturulur."],
      ["Hassas Uygulama", "Maskeleme, yüzey hazırlığı ve ürün uygulaması malzemeye uygun bekleme süreleriyle yürütülür."],
      ["Bakım Teslimi", "Son görünüm kontrol edilir; yıkama zamanı ve korumayı sürdürecek bakım önerileri açıklanır."],
    ],
    [
      ["Pasta cila ne sağlar?", "Uygulanabilecek düzeltme seviyesi vernik durumu ve çizik derinliğine bağlıdır; her iz güvenle giderilemeyebilir."],
      ["Seramik ne zaman yapılır?", "Kalıcı kir ve yüzey kusurları giderilip boya uygun biçimde hazırlandıktan sonra koruyucu uygulama planlanır."],
      ["Araç kaç gün kalır?", "İçeriğin kapsamı, yüzey düzeltme ihtiyacı ve ürünün kürlenme koşulları süreyi belirler."],
      ["Sonrasında nasıl yıkanır?", "İlk yıkama zamanı ve kullanılacak yöntem uygulanan ürüne göre teslim sırasında ayrıca açıklanır."],
    ],
    ["Boya Ön İncelemesi", "Panel Düzeltme", "Seramik Hazırlığı", "İç Detay İşçiliği", "Hassas Bölgeler", "Işık Altı Kontrol"],
  ),
  "arac-kaplama": profil(
    ["Koruyun veya Değiştirin", "Doğru Film Uygulaması", "Kaplama Çözümleri", "Malzeme ve İşçilik", "Kaplama Süreci", "Film Rehberi", "Yüzey Detayları", "Aracınızı Planlayalım"],
    [
      ["Film Türü Seçimi", "Şeffaf PPF, renk değişim folyosu ve cam filmi farklı amaçlara hizmet eder; beklentiye göre ayrı değerlendirilir."],
      ["Kenar ve Parça İşçiliği", "Kıvrımlar, panel birleşimleri, sensörler ve sökülmesi gereken parçalar uygulama öncesinde planlanır."],
      ["Teslim Kaydı", "Uygulanan alanlar, kullanılan ürün bilgisi ve bakım koşulları işletmenin sunduğu belgelerle birlikte açıklanır."],
    ],
    [
      ["Aracı İnceleyelim", "Boya durumu, değişen veya boyalı parçalar ve kaplanacak yüzeylerin uygunluğu kontrol edilir."],
      ["Kapsamı Çizelim", "Tam veya bölgesel kaplama, film serisi, ton ve söküm gerektiren parçalar netleştirilir."],
      ["Yüzeyi Hazırlayalım", "Kir, kalıntı ve uygulamayı etkileyecek kusurlar giderilerek paneller kontrollü biçimde hazırlanır."],
      ["Kenarları Kontrol Edelim", "Kabarcık, birleşim, kenar dönüşü ve genel görünüm incelenir; bakım talimatı teslim edilir."],
    ],
    [
      ["PPF mi folyo mu?", "PPF boya korumaya, renkli folyo görünüm değişimine odaklanır; kullanım amacı seçimde belirleyicidir."],
      ["Boyalı parçaya uygulanır mı?", "Sonradan boyanmış yüzeyin durumu ayrıca incelenir; söküm riski ve uygulanabilirlik önceden konuşulur."],
      ["Cam filmi tonu nasıl seçilir?", "Görüş konforu, araç kullanımı ve yürürlükteki kurallar birlikte değerlendirilerek uygun seçenek ele alınır."],
      ["Kaplama sonrası ne yapılır?", "İlk yıkama, basınçlı su mesafesi ve kenarlara müdahale edilmemesi gibi bakım notları ürüne göre paylaşılır."],
    ],
    ["PPF Panel Uygulaması", "Renk Değişim Folyosu", "Cam Filmi Detayı", "Kenar Dönüşleri", "Krom Karartma", "Teslim Işığı Kontrolü"],
  ),
  "cam-balkon": profil(
    ["Balkonunuz Dört Mevsim", "Ölçüye Uygun Sistem", "Cam Balkon Modelleri", "Doğru Sistem Seçimi", "Keşiften Montaja", "Sistem Soruları", "Mekân Çözümleri", "Ölçü ve Keşif"],
    [
      ["Yerinde Ölçü", "Açıklıklar, köşe dönüşleri, parapet ve tavan eğimi görülmeden sağlıklı sistem kararı verilmez."],
      ["Kullanıma Uygun Model", "Katlanır, sürme veya ısıcamlı seçenekler balkonun kullanım amacı ve cephe koşullarına göre karşılaştırılır."],
      ["Montaj Kontrolü", "Ray hareketi, kanat ayarı, su tahliye noktaları ve birleşim detayları teslimden önce denenir."],
    ],
    [
      ["Alanı Dinleyelim", "Balkonun nasıl kullanılacağı, rüzgâr-güneş yönü ve görünüm beklentisi öğrenilir."],
      ["Ölçüyü Alalım", "Taşıyıcı yüzeyler, açıklıklar ve montajı etkileyen mevcut detaylar yerinde kaydedilir."],
      ["Sistemi Üretelim", "Onaylanan cam, profil rengi ve açılım biçimine göre üretim hazırlığı yapılır."],
      ["Ayarları Yapalım", "Montaj sonrası açma-kapama hareketi, kilitler ve birleşimler kullanıcıyla birlikte kontrol edilir."],
    ],
    [
      ["Hangi sistem uygun?", "Balkon ölçüsü, açılım ihtiyacı, yalıtım beklentisi ve bütçe bilinmeden tek bir model önermek doğru değildir."],
      ["Fiyatı ne belirler?", "Toplam metraj, cam ve profil seçimi, köşe sayısı, yükseklik ve montaj koşulları teklifi etkiler."],
      ["Su alır mı?", "Cephe yönü, tahliye, zemin eğimi ve montaj birleşimleri birlikte değerlendirilir; yapı koşulları keşifte açıklanır."],
      ["Bakımı nasıl yapılır?", "Rayların temiz tutulması, hareketli parçaların zorlanmaması ve ayar ihtiyacında servis alınması önerilir."],
    ],
    ["Katlanır Sistem", "Sürme Sistem", "Köşe Dönüşü", "Profil Detayları", "Ray ve Kilitler", "Montaj Sonrası"],
  ),
  tente: profil(
    ["Gölgeyi Kontrol Edin", "Dış Mekân Konforu", "Tente Sistemleri", "Mekâna Uygun Çözüm", "Ölçüden Kuruluma", "Tente Soruları", "Gölgelendirme Örnekleri", "Keşif Planlayın"],
    [
      ["Cepheye Uygun Taşıyıcı", "Duvar veya tavan yapısı, açıklık ve rüzgâr etkisi görülerek bağlantı biçimi planlanır."],
      ["Doğru Kumaş ve Sistem", "Güneş, yağmur, kullanım sıklığı ve açılır-kapanır beklentisine göre model ile kumaş birlikte seçilir."],
      ["Hareket Kontrolü", "Kol, motor, sensör ve eğim ayarları kurulum sonrası farklı konumlarda denenir."],
    ],
    [
      ["İhtiyacı Belirleyelim", "Gölgelenecek alan, kullanım saatleri ve tente kapalıyken istenen görünüm konuşulur."],
      ["Keşif Yapalım", "Ölçü, montaj zemini, elektrik ihtiyacı ve çevredeki engeller yerinde kontrol edilir."],
      ["Üretimi Hazırlayalım", "Model, profil rengi, kumaş ve kumanda seçimi onaylandıktan sonra üretim planlanır."],
      ["Sistemi Deneyelim", "Açılım mesafesi, gerginlik, su eğimi ve kumanda işlevleri teslimde birlikte incelenir."],
    ],
    [
      ["Hangi tente seçilmeli?", "Mafsallı, kasetli, pergola ve körüklü sistemler alanın boyutu ile kullanım amacına göre değerlendirilir."],
      ["Rüzgârda kullanılabilir mi?", "Her sistemin rüzgâr dayanımı ve kullanım sınırı farklıdır; hava koşullarında kapatma önerileri ürünle birlikte açıklanır."],
      ["Motorlu sistem gerekir mi?", "Açıklık genişliği, kullanım sıklığı ve erişim kolaylığı motor seçimini anlamlı hâle getirebilir."],
      ["Kumaş değişir mi?", "Mekanik aksam uygunsa ölçü ve modelle uyumlu yeni kumaş seçeneği ayrıca değerlendirilebilir."],
    ],
    ["Mafsallı Tente", "Pergola Sistemi", "Kaset Mekanizması", "Kumaş Seçenekleri", "Motor ve Sensör", "Cephe Montajı"],
  ),
  tadilat: profil(
    ["Mekânınızı Yenileyin", "Kontrollü Tadilat", "Yenileme Hizmetleri", "Kapsamı Baştan Bilin", "Tadilat Yolculuğu", "Tadilat Soruları", "Dönüşüm Detayları", "Projenizi Anlatın"],
    [
      ["İş Sırası Planı", "Yıkım, tesisat, yüzey, sabit mobilya ve son montaj işleri birbirini bozmayacak sırada ele alınır."],
      ["Kapsam Listesi", "Malzeme, işçilik, dahil olmayan kalemler ve olası değişiklikler teklif öncesinde görünür hâle getirilir."],
      ["Ara Kontroller", "Kapanacak tesisatlar, ölçüler ve yüzey hazırlıkları sonraki iş başlamadan önce kontrol edilir."],
    ],
    [
      ["Alanı İnceleyelim", "Mevcut durum, kullanım ihtiyacı ve korunacak bölümler yerinde değerlendirilir."],
      ["İşleri Sıralayalım", "Uygulama kalemleri, malzeme kararları ve birbirine bağlı işler bir takvimde toplanır."],
      ["Aşamaları Yürütelim", "Her ekip, önceki işin kontrolünden sonra kendi uygulamasına geçer; değişiklikler kayıt altına alınır."],
      ["Teslimi Tamamlayalım", "Eksik listesi, yüzeyler, çalışan donanımlar ve temizlik durumu son turda gözden geçirilir."],
    ],
    [
      ["Teklif için ne gerekir?", "Alan ölçüsü, mevcut fotoğraflar, yapılması istenen işler ve malzeme beklentisi ilk kapsamı oluşturur."],
      ["Süre nasıl belirlenir?", "İş kalemi sayısı, kuruma süreleri, özel üretimler ve tedarik planı gerçekçi takvimi belirler."],
      ["Evde kalınabilir mi?", "Yıkım, tesisat kesintisi, toz ve çalışma alanı dikkate alınarak etaplama imkânı keşifte değerlendirilir."],
      ["Değişiklik olursa ne olur?", "Yeni talebin süre ve maliyet etkisi uygulamadan önce açıklanıp kapsam güncellenmelidir."],
    ],
    ["Yıkım Hazırlığı", "Tesisat Altyapısı", "Yüzey Uygulamaları", "Mutfak Yenileme", "Banyo Detayları", "Teslim Kontrolü"],
  ),
  dekorasyon: profil(
    ["Mekâna Karakter Katın", "Dengeli İç Mekânlar", "Dekorasyon Çözümleri", "Tasarımda Bütünlük", "Fikirden Uygulamaya", "Dekorasyon Rehberi", "Mekân Detayları", "Fikrinizi Paylaşın"],
    [
      ["İhtiyaca Uygun Kurgu", "Görünüm kadar dolaşım, depolama, ışık ve günlük kullanım alışkanlıkları da tasarım kararına katılır."],
      ["Malzeme Dengesi", "Renk, doku, bakım ihtiyacı ve bütçe birlikte değerlendirilerek birbirini tamamlayan seçimler yapılır."],
      ["Uygulama Uyumu", "Ölçü, sabit eleman ve aydınlatma kararları sahadaki gerçek koşullarla düzenli olarak karşılaştırılır."],
    ],
    [
      ["Tarzı Konuşalım", "Beğeniler, korunacak eşyalar, kullanım sorunları ve hedeflenen atmosfer birlikte tanımlanır."],
      ["Yerleşimi Çözelim", "Mobilya ölçüleri, dolaşım alanları, depolama ve aydınlatma noktaları dengelenir."],
      ["Seçimleri Birleştirelim", "Renk, yüzey, tekstil ve tamamlayıcı parçalar tek bir görsel dil içinde netleştirilir."],
      ["Sahada Uygulayalım", "Onaylanan kararlar ölçü ve işçilik kontrolleriyle mekâna aktarılır; son dokunuşlar birlikte yapılır."],
    ],
    [
      ["Nereden başlamalıyız?", "Önce mekândaki kullanım problemi ve korunacak unsurlar belirlenir; stil seçimi bu çerçevede anlam kazanır."],
      ["Bütçe nasıl yönetilir?", "Sabit uygulamalar, mobilya ve aksesuarlar öncelik sırasına konarak harcama dengesi kurulabilir."],
      ["Mevcut eşyalar kullanılır mı?", "Ölçü, durum ve yeni yerleşime uyumlu parçalar tasarımın doğal bir parçası olarak değerlendirilebilir."],
      ["Görsel ile sonuç aynı mı?", "Görselleştirme yön gösterir; ışık, malzeme dokusu ve saha ölçüleri nihai görünümde farklılık yaratabilir."],
    ],
    ["Renk ve Doku", "Aydınlatma Kurgusu", "Mobilya Yerleşimi", "Duvar Detayları", "Depolama Çözümleri", "Son Dokunuşlar"],
  ),
  temizlik: profil(
    ["Alanınız Ferahlasın", "Planlı Temizlik", "Temizlik Hizmetleri", "Kapsamı Net Bilin", "Temizlik Planı", "Temizlik Soruları", "Alan Detayları", "İhtiyacınızı Anlatın"],
    [
      ["Alana Özel Liste", "Ev, ofis veya boş yapı için yapılacak işler kullanım durumu ve öncelikli bölümlere göre ayrı yazılır."],
      ["Yüzey Ayrımı", "Cam, ahşap, metal, doğal taş ve kumaş yüzeyler uygun ürün ve yöntemle ele alınır."],
      ["Son Tur Kontrolü", "Öncelikli odalar, temas noktaları ve atlanan alanlar çalışma sonunda kapsam listesiyle karşılaştırılır."],
    ],
    [
      ["Alanı Öğrenelim", "Alan türü, yaklaşık büyüklük, eşyalı olup olmadığı ve yoğun kir bulunan bölümler konuşulur."],
      ["Listeyi Netleştirelim", "Dahil olacak odalar, detay işleri, ekipman ve uygun çalışma zamanı belirlenir."],
      ["Bölüm Bölüm İlerleyelim", "Temizlenen alanın yeniden kirlenmesini önleyecek bir sıra izlenerek uygulama yapılır."],
      ["Öncelikleri Kontrol Edelim", "İş sonunda başlangıçta belirtilen alanlar gözden geçirilir ve gerekli son dokunuşlar tamamlanır."],
    ],
    [
      ["Fiyat için ne gerekli?", "Alan türü, yaklaşık metrekare, oda sayısı, eşya durumu ve istenen ayrıntılar teklif kapsamını belirler."],
      ["Malzemeyi kim getirir?", "Ekipman ve ürünlerin kim tarafından sağlanacağı randevu öncesinde açıkça netleştirilmelidir."],
      ["Ne kadar sürer?", "Süre; alan büyüklüğü, eşya yoğunluğu, kir durumu ve talep edilen detaylara göre planlanır."],
      ["Evde bulunmak gerekir mi?", "Giriş, anahtar teslimi, evcil hayvanlar ve son kontrol düzeni önceden konuşularak uygun yöntem seçilir."],
    ],
    ["Mutfak Detayları", "Banyo Yüzeyleri", "Cam ve Çerçeveler", "Ofis Alanları", "İnşaat Sonrası", "Son Kontrol"],
  ),
  "koltuk-yikama": profil(
    ["Kumaşlar Tazelensin", "Yerinde Döşeme Bakımı", "Koltuk Yıkama", "Kumaşı Önce Tanıyın", "Yıkama Aşamaları", "Koltuk Soruları", "Döşeme Detayları", "Fotoğraf Gönderin"],
    [
      ["Kumaş Ön Testi", "Renk verme, hassas doku ve daha önce kullanılan kimyasallar görünmeyen küçük bir alanda değerlendirilir."],
      ["Leke Ayrımı", "Yağ, içecek, evcil hayvan ve kullanım kiri aynı işlemle ele alınmaz; lekenin geçmişi önemlidir."],
      ["Dengeli Nem", "Yüzeye gereğinden fazla su yüklemeden kirin çözülmesi ve güçlü vakumla nemin çekilmesi hedeflenir."],
    ],
    [
      ["Kumaşı İnceleyelim", "Koltuk türü, kumaş etiketi, renk ve lekeli bölgeler uygulama öncesinde kontrol edilir."],
      ["Lekeyi Değerlendirelim", "Lekenin türüne göre ön işlem seçilir; çıkmayabilecek izler hakkında gerçekçi bilgi verilir."],
      ["Yıkayıp Çekelim", "Uygun ürünle yüzey çalışılır ve çözünmüş kir güçlü vakumla döşemeden uzaklaştırılır."],
      ["Kurumayı Anlatalım", "Havalandırma, kullanım için bekleme ve minderlerin konumu teslim sırasında açıklanır."],
    ],
    [
      ["Her kumaş yıkanır mı?", "Üretici etiketi, kumaş yapısı ve renk dayanımı kontrol edilmeden standart işlem uygulanmamalıdır."],
      ["Lekeler tamamen çıkar mı?", "Lekenin içeriği, bekleme süresi ve önceki müdahaleler sonucu etkiler; kesin sonuç sözü verilmez."],
      ["Kaç saatte kurur?", "Kumaş kalınlığı, çekilen nem, oda sıcaklığı ve havalandırma kuruma süresini değiştirir."],
      ["Önceden ne hazırlamalıyım?", "Koltuk çevresindeki küçük eşyaları kaldırmak ve özel lekeleri göstermek uygulamayı kolaylaştırır."],
    ],
    ["Kumaş Ön Kontrolü", "Leke Ön İşlemi", "Köşe Koltuklar", "Sandalye Döşemesi", "Yatak Yüzeyi", "Nem Çekimi"],
  ),
  "hali-yikama": profil(
    ["Halılar Özenle Temizlensin", "Dokumaya Uygun Bakım", "Halı Yıkama", "Her Halı Farklıdır", "Teslimatlı Yıkama", "Halı Soruları", "Yıkama Detayları", "Halıyı Tanımlayın"],
    [
      ["Tür ve Etiketleme", "Makine, yün, viskon veya el dokuması halılar karışmayacak biçimde kayda alınır ve ayrı değerlendirilir."],
      ["Renk ve Leke Testi", "Hassas renkler, saçaklar ve eski lekeler yıkama öncesi kontrol edilerek uygun işlem seçilir."],
      ["Tam Kurutma", "Koku ve nem riskini azaltmak için halının yapısına uygun durulama ile kontrollü kurutma birlikte planlanır."],
    ],
    [
      ["Teslim Alalım", "Halı adedi, ölçüler, tür ve özel lekeler kayıt altına alınarak teslim bilgisi oluşturulur."],
      ["Ön Kontrol Yapalım", "Renk verme, taban durumu, saçaklar ve hasarlı bölgeler yıkamadan önce incelenir."],
      ["Uygun Programı Seçelim", "Toz alma, leke ön işlemi, yıkama ve durulama adımları halı yapısına göre uygulanır."],
      ["Kurutarak Teslim Edelim", "Nem kontrolü ve son inceleme tamamlandıktan sonra paketleme ve teslimat planlanır."],
    ],
    [
      ["Hangi halılar yıkanır?", "Halı türü ve üretici bakım talimatı görülerek tesis yıkaması ya da farklı bir yöntem önerilebilir."],
      ["Leke çıkar mı?", "Lekenin türü, yaşı, iplik yapısı ve evde yapılan müdahaleler sonucu doğrudan etkiler."],
      ["Teslimat ne zaman?", "Toplama bölgesi, tesis yoğunluğu, halı türü ve kuruma koşulları teslim planını belirler."],
      ["Saçaklar nasıl korunur?", "Saçak yapısı ve mevcut yıpranma ön kontrolde kaydedilir; uygun yıkama ve tarama yöntemi seçilir."],
    ],
    ["Toz Alma", "Leke Kontrolü", "Yıkama Hattı", "Saçak Bakımı", "Kurutma Alanı", "Paketleme"],
  ),
  ilaclama: profil(
    ["Kontrollü Mücadele", "Hedefe Yönelik İlaçlama", "Zararlı Kontrolü", "Doğru Teşhis Önemli", "Mücadele Planı", "İlaçlama Soruları", "Uygulama Alanları", "Durumu Bildirin"],
    [
      ["Zararlı Tespiti", "Görülen canlının türü, izleri ve yoğunluk noktaları anlaşılmadan uygulama yöntemi belirlenmez."],
      ["Alan Risk Analizi", "Çocuklar, evcil hayvanlar, gıda alanları ve bina kullanım biçimi hazırlık ile ürün seçimini etkiler."],
      ["Takip Gereksinimi", "Tek uygulama, tekrar veya periyodik kontrol ihtiyacı zararlının yaşam döngüsü ve saha koşuluna göre açıklanır."],
    ],
    [
      ["Belirtiyi Dinleyelim", "Görülme zamanı, bölge, izler ve daha önce yapılan uygulamalar hakkında bilgi alınır."],
      ["Alanı Kontrol Edelim", "Giriş noktaları, yuvalanma alanları, gıda-su kaynakları ve yayılım işaretleri incelenir."],
      ["Yöntemi Uygulayalım", "Hedef zararlıya ve mekân kullanımına uygun uygulama, gerekli koruma adımlarıyla yürütülür."],
      ["Takibi Planlayalım", "Havalandırma, alana dönüş, temizlik ve yeniden kontrol zamanı açık biçimde bildirilir."],
    ],
    [
      ["Evden çıkmak gerekir mi?", "Uygulama türü ve kullanılan ürünün talimatına göre alanı boşaltma ile dönüş süresi değişebilir."],
      ["Evcil hayvanlar ne olacak?", "Türü ve yaşam alanı önceden bildirilmelidir; akvaryum dahil gerekli koruma adımları ayrıca açıklanır."],
      ["Tek seans yeterli mi?", "Yoğunluk, yumurta dönemi, komşu alanlar ve giriş kaynakları tekrar ihtiyacını belirleyebilir."],
      ["Önceden ne hazırlanır?", "Gıda, kişisel eşya, dolap içi ve mobilya düzeni için yapılacak hazırlıklar uygulama türüne göre gönderilir."],
    ],
    ["Keşif Noktaları", "Giriş Bölgeleri", "Mutfak Alanları", "Yatak Çevresi", "Dış Alan Kontrolü", "Takip Uygulaması"],
  ),
  "guzellik-salonu": profil(
    ["Bakımınızı Planlayın", "Kişiye Uygun Bakım", "Bakım Uygulamaları", "Bilinçli Uygulama", "Bakım Yolculuğu", "Uygulama Soruları", "Bakım Detayları", "Randevu Planlayın"],
    [
      ["Ön Görüşme", "Cilt yapısı, hassasiyet, önceki uygulamalar ve beklenen görünüm işlem seçilmeden önce değerlendirilir."],
      ["Seans Bilgisi", "Uygulamanın aşamaları, seans düzeni ve bakım sonrası dikkat edilecek noktalar önceden açıklanır."],
      ["Gerçekçi Beklenti", "Kişisel farklılıklar gözetilir; kesin sonuç veya herkese aynı etki vaat eden anlatımdan kaçınılır."],
    ],
    [
      ["İhtiyacı Konuşalım", "İlgilenilen uygulama, günlük bakım alışkanlığı ve varsa hassasiyetler öğrenilir."],
      ["Uygunluğu Değerlendirelim", "Mevcut durum ve uygulamayı ertelemeyi gerektirebilecek koşullar ön görüşmede ele alınır."],
      ["Seansı Uygulayalım", "Belirlenen bakım adımları hijyen ve ürün kullanım talimatları gözetilerek yürütülür."],
      ["Bakımı Anlatalım", "İşlem sonrası rutin, kaçınılması gerekenler ve takip zamanı kişiye özel paylaşılır."],
    ],
    [
      ["Hangi bakım uygun?", "Cilt veya bölge görülmeden yalnızca popülerliğe göre işlem seçmek yerine ön değerlendirme yapılmalıdır."],
      ["Kaç seans gerekir?", "Uygulama türü, mevcut durum ve kişisel yanıt seans planını değiştirir; görüşmede çerçeve çizilir."],
      ["Öncesinde ne yapmalıyım?", "Güneşlenme, kullanılan ürünler ve yakın tarihli işlemler randevu sırasında mutlaka bildirilmelidir."],
      ["Sonrasında nelere dikkat edilir?", "Uygulamaya özel temizlik, güneşten korunma ve ürün kullanımı notları seans bitiminde verilir."],
    ],
    ["Cilt Ön Değerlendirmesi", "Bakım Hazırlığı", "Uygulama Ortamı", "Ürün ve Ekipman", "Seans Detayları", "Bakım Sonrası"],
  ),
  kuafor: profil(
    ["Tarzınızı Tazeleyin", "Saça Uygun Yaklaşım", "Saç Hizmetleri", "Beklentiyi Netleştirin", "Salondaki Süreç", "Saç Bakım Rehberi", "Stil Detayları", "Randevunuzu Planlayın"],
    [
      ["Saç Analizi", "Yoğunluk, doku, mevcut renk ve geçmiş kimyasal işlemler hedef modelle birlikte değerlendirilir."],
      ["Renk Planı", "Açma gereksinimi, ton geçişi, bakım ihtiyacı ve uygulanabilir sonuç işlemden önce konuşulur."],
      ["Günlük Kullanım", "Kesim ve şekillendirme yalnızca salon görünümüne değil, evde ayrılabilecek bakım süresine de uyarlanır."],
    ],
    [
      ["Modeli Gösterin", "Beğenilen örnekler, istenmeyen detaylar ve günlük kullanım biçimi üzerinden hedef netleştirilir."],
      ["Saçı Değerlendirelim", "Mevcut kesim, renk geçmişi ve saçın taşıyabileceği işlem seviyesi incelenir."],
      ["Uygulamayı Yapalım", "Kesim veya renk adımları ara kontrollerle ilerletilir; ton ve form dengesi izlenir."],
      ["Ev Bakımını Paylaşalım", "Şekillendirme yöntemi, bakım sıklığı ve rengi korumaya yardımcı notlar açıklanır."],
    ],
    [
      ["Fotoğraftaki model olur mu?", "Aynı görünüm saç yapısı, yoğunluk ve yüz formuna göre uyarlanır; birebir sonuç yerine uygun yorum planlanır."],
      ["Renk tek seansta çıkar mı?", "Mevcut boya, hedef ton ve saçın dayanımı bazen kademeli işlem gerektirebilir."],
      ["Randevuya nasıl gelmeliyim?", "Planlanan işleme göre saçın temizliği ve ürün kullanılmaması gibi hazırlık bilgisi önceden paylaşılır."],
      ["İşlem ne kadar sürer?", "Saç uzunluğu, yoğunluğu, teknik ve renk geçişleri randevu süresini doğrudan etkiler."],
    ],
    ["Kesim Formu", "Renk Geçişleri", "Saç Bakımı", "Şekillendirme", "Özel Gün Stili", "Son Görünüm"],
  ),
  berber: profil(
    ["Görünümünüz Netleşsin", "Dengeli Erkek Bakımı", "Berber Hizmetleri", "Yüze Uygun Form", "Kesim Akışı", "Bakım Soruları", "Kesim Detayları", "Saatinizi Ayırın"],
    [
      ["Yüz ve Saç Dengesi", "Saçın çıkış yönü, yoğunluğu, yüz formu ve sakal çizgisi birlikte ele alınır."],
      ["Temiz Geçişler", "Favori, ense ve saç-sakal bağlantıları farklı açılardan kontrol edilerek dengelenir."],
      ["Kullanılabilir Model", "Evde şekillendirme süresi ve bakım sıklığı, seçilen formun sürdürülebilir olmasını sağlar."],
    ],
    [
      ["Modeli Konuşalım", "İstenen uzunluk, geçiş seviyesi ve sakal formu işlem başlamadan netleştirilir."],
      ["Çıkışları İnceleyelim", "Tepe, ense ve sakal yönleri kesim planında dikkate alınır."],
      ["Formu Oluşturalım", "Kesim, çizgi ve geçişler yüzün iki tarafı karşılaştırılarak kontrollü ilerletilir."],
      ["Son Dokunuşu Yapalım", "Genel görünüm, simetri ve şekillendirme müşteriyle birlikte kontrol edilir."],
    ],
    [
      ["Hangi model yakışır?", "Yüz formu kadar saç yapısı, çıkış yönleri ve günlük kullanım tercihi de modeli belirler."],
      ["Saç ve sakal birlikte mi?", "Bütünlüklü görünüm isteniyorsa uzunluklar ve geçişler aynı randevuda birlikte planlanabilir."],
      ["Ne sıklıkla gelmeliyim?", "Kesim formu, uzama hızı ve istenen netlik bakım aralığını kişiden kişiye değiştirir."],
      ["Damat tıraşı nasıl planlanır?", "Etkinlik saati, hazırlık programı ve prova ihtiyacı önceden konuşularak yeterli süre ayrılır."],
    ],
    ["Saç Geçişleri", "Sakal Çizgisi", "Ense Detayı", "Klasik Kesim", "Modern Form", "Son Şekillendirme"],
  ),
  diyetisyen: profil(
    ["Size Uyan Beslenme", "Sürdürülebilir Beslenme", "Danışmanlık Alanları", "Bilgiye Dayalı Plan", "Danışmanlık Süreci", "Beslenme Soruları", "Planın Bileşenleri", "Görüşme Planlayın"],
    [
      ["Kişisel Değerlendirme", "Yaşam düzeni, beslenme alışkanlığı, hedef ve ilgili sağlık bilgileri uzman görüşmesinde birlikte ele alınır."],
      ["Uygulanabilir Düzen", "Plan; ev, iş, okul, bütçe ve mutfak alışkanlıkları içinde sürdürülebilecek seçeneklere dayanır."],
      ["Düzenli İzlem", "Gidişat yalnızca tartıyla değil, uygulanabilirlik, geri bildirim ve ihtiyaç değişimiyle değerlendirilir."],
    ],
    [
      ["Öyküyü Dinleyelim", "Günlük düzen, öğün alışkanlıkları, hedef ve varsa profesyonelle paylaşılması gereken bilgiler alınır."],
      ["Hedefi Netleştirelim", "Öncelikler ve gerçekçi takip ölçütleri danışanla birlikte belirlenir."],
      ["Planı Oluşturalım", "Besin tercihleri ve yaşam koşullarına uyan alternatifli bir düzen hazırlanır."],
      ["Gidişatı Uyarlayalım", "Kontrollerde zorlanan noktalar konuşulur ve plan gerektiğinde yeniden düzenlenir."],
    ],
    [
      ["İlk görüşmede ne olur?", "Beslenme öyküsü, günlük düzen ve hedefler değerlendirilir; kişisel planın çerçevesi oluşturulur."],
      ["Hazır liste verilir mi?", "Danışmanlık kişiye özel değerlendirmeye dayanır; başka birine hazırlanmış liste uygun kabul edilmez."],
      ["Online görüşme yapılır mı?", "Hizmet biçimi işletmeye göre değişir; ölçüm ve takip yöntemleri randevu öncesinde açıklanır."],
      ["Ne sıklıkla görüşülür?", "Hedef, takip ihtiyacı ve planın uygulanma durumu görüşme aralığını belirler."],
    ],
    ["Beslenme Öyküsü", "Öğün Planı", "Porsiyon Rehberi", "Alternatif Seçimler", "Takip Notları", "Yaşam Düzeni"],
  ),
  psikolog: profil(
    ["Kendinize Alan Açın", "Güvenli Görüşme Alanı", "Görüşme Alanları", "Etik ve Mahremiyet", "Görüşme Süreci", "Terapi Soruları", "Süreç Başlıkları", "İlk Görüşmeyi Planlayın"],
    [
      ["Mahremiyet Çerçevesi", "Görüşmelerin gizlilik sınırları, kayıt ve iletişim biçimi ilk temas sırasında anlaşılır biçimde açıklanır."],
      ["Uygun Uzmanlık Alanı", "Başvuru konusu, yaş grubu ve görüşme ihtiyacı hizmet kapsamıyla eşleştirilir; gerekirse yönlendirme yapılır."],
      ["Gerçekçi Süreç", "Terapi tek seansta kesin çözüm vaadi değildir; amaçlar ve ilerleme danışanla birlikte değerlendirilir."],
    ],
    [
      ["İlk Teması Kurun", "Görüşme türü, uygun saat ve yalnızca randevu için gerekli temel bilgiler paylaşılır."],
      ["Çerçeveyi Konuşalım", "Başvuru nedeni, beklenti, görüşme sıklığı ve mahremiyet sınırları ilk görüşmede ele alınır."],
      ["Süreci Birlikte İzleyelim", "Hedefler ve ele alınan konular danışanın ihtiyacına göre oturumlar boyunca şekillenir."],
      ["Gidişatı Değerlendirelim", "Belirli aralıklarla ihtiyaç, fayda ve devam planı birlikte gözden geçirilir."],
    ],
    [
      ["İlk seans nasıl geçer?", "Tanışma, başvuru nedenini anlama ve görüşme çerçevesini belirleme amacı taşır; danışan paylaşım hızını belirler."],
      ["Kaç seans gerekir?", "Başvuru konusu, hedefler ve kişisel süreç farklıdır; önceden kesin seans sayısı vaat edilmez."],
      ["Online görüşme uygun mu?", "Uygunluk; konu, mahrem bir ortam sağlanması ve uzmanın değerlendirmesine göre ele alınır."],
      ["Acil durumda ne yapmalıyım?", "Acil risk veya güvenlik sorunu varsa randevu mesajı beklemek yerine 112 ve ilgili acil destek kanallarına başvurulmalıdır."],
    ],
    ["İlk Görüşme", "Bireysel Süreç", "Çift Görüşmesi", "Çocuk ve Ergen", "Online Görüşme", "Takip Değerlendirmesi"],
  ),
  fizyoterapist: profil(
    ["Harekete Güvenle Dönün", "Kişiye Uygun Rehabilitasyon", "Terapi Alanları", "Değerlendirme Önceliği", "Rehabilitasyon Süreci", "Terapi Soruları", "Hareket Detayları", "Değerlendirme Planlayın"],
    [
      ["Fonksiyon Değerlendirmesi", "Şikâyet kadar hareket, günlük yaşam etkisi, önceki tedaviler ve profesyonel yönlendirmeler birlikte incelenir."],
      ["Kademeli Program", "Egzersiz ve manuel uygulamalar kişinin toleransı ile hedeflerine göre aşamalı biçimde düzenlenir."],
      ["Aktif Katılım", "Seans dışındaki güvenli hareketler ve ev programının doğru uygulanması sürecin anlaşılır bir parçasıdır."],
    ],
    [
      ["Durumu Dinleyelim", "Şikâyetin başlangıcı, etkileyen hareketler, günlük yaşam ve varsa hekim değerlendirmesi konuşulur."],
      ["Hareketi İnceleyelim", "Fonksiyon, hareket açıklığı ve kişinin hedefi uzman değerlendirmesiyle ele alınır."],
      ["Programı Uygulayalım", "Uygun görülen egzersiz ve terapi adımları toleransa göre ilerletilir."],
      ["İlerlemeyi Ölçelim", "Günlük işlev, hareket kalitesi ve hedeflerdeki değişim düzenli olarak gözden geçirilir."],
    ],
    [
      ["İlk seansta ne yapılır?", "Öykü ve fonksiyon değerlendirilir; uygun hizmet kapsamı ve başlangıç programı açıklanır."],
      ["Kaç seans gerekir?", "Durumun niteliği, hedef ve verilen yanıta göre değişir; kesin sayı değerlendirmeden söylenmez."],
      ["Ağrı varken egzersiz olur mu?", "Hangi hareketin uygun olduğu profesyonel değerlendirmeyle belirlenmelidir; internetten genellenmiş öneri uygulanmamalıdır."],
      ["Ne getirmeliyim?", "Varsa raporlar, görüntüleme sonuçları ve rahat hareket etmeyi sağlayan kıyafetler görüşmeyi kolaylaştırabilir."],
    ],
    ["Hareket Değerlendirmesi", "Manuel Uygulama", "Klinik Egzersiz", "Denge Çalışması", "Ev Programı", "İlerleme Takibi"],
  ),
  "dis-klinigi": profil(
    ["Gülüşünüz İçin Plan", "Açık Tedavi Bilgisi", "Diş Tedavileri", "Değerlendirme ve Onam", "Tedavi Yolculuğu", "Diş Sağlığı Soruları", "Klinik Detayları", "Muayene Planlayın"],
    [
      ["Muayene Temeli", "Tedavi seçimi şikâyet, ağız içi muayene ve gerekli görülen görüntülemeler değerlendirilmeden yapılmaz."],
      ["Seçeneklerin Açıklanması", "Alternatifler, aşamalar, olası sınırlamalar ve bakım gereksinimi hastanın anlayacağı dille konuşulur."],
      ["Kontrol Planı", "İşlem sonrası öneriler, beklenen normal süreç ve yeniden değerlendirme zamanı tedaviye göre paylaşılır."],
    ],
    [
      ["Şikâyeti Dinleyelim", "Ağrı, hassasiyet, estetik beklenti ve sağlık öyküsü muayene öncesinde kaydedilir."],
      ["Muayene Edelim", "Ağız içi durum incelenir; gerekli görülürse ek görüntüleme veya farklı branş görüşü planlanır."],
      ["Planı Açıklayalım", "Öncelikler, alternatifler ve aşamalar onam alınmadan önce anlaşılır biçimde sunulur."],
      ["Takibi Yapalım", "İşlem sonrası bakım ve kontrol aralığı kişisel tedavi planına göre belirlenir."],
    ],
    [
      ["İlk muayenede ne olur?", "Şikâyet dinlenir, ağız içi değerlendirilir ve gerekirse tanısal incelemeler planlanır."],
      ["Tedavi aynı gün başlar mı?", "Acil durum, gerekli hazırlıklar ve işlemin kapsamına göre muayene günü ya da sonraki randevuda başlayabilir."],
      ["Fiyat neden muayenede netleşir?", "Diş sayısı, materyal, ek işlemler ve kişisel tedavi planı görülmeden doğru kapsam oluşturulamaz."],
      ["Acil ağrıda ne yapmalıyım?", "Şiddetli ağrı, travma veya hızla artan şişlikte klinikle acil iletişim kurulmalı; genel mesaj yanıtı beklenmemelidir."],
    ],
    ["Muayene Alanı", "Dijital Görüntüleme", "Tedavi Planı", "İmplant Süreci", "Ortodonti Kontrolü", "Bakım Eğitimi"],
  ),
  veteriner: profil(
    ["Dostunuz İçin Bakım", "Şefkatli Klinik Yaklaşım", "Veteriner Hizmetleri", "Muayene Önceliği", "Klinik Süreci", "Veteriner Soruları", "Klinik Detayları", "Randevu Oluşturun"],
    [
      ["Ayrıntılı Öykü", "Tür, yaş, beslenme, aşı geçmişi, davranış değişikliği ve kullanılan ilaçlar muayeneyi yönlendirir."],
      ["Gerekçeli İnceleme", "Test veya görüntüleme ihtiyacı muayene bulgularına göre açıklanır; sonuçlar tedavi planıyla birlikte değerlendirilir."],
      ["Evde Takip Bilgisi", "İlaç kullanımı, beslenme, aktivite ve yeniden başvuru gerektiren belirtiler sahiplerine açıkça anlatılır."],
    ],
    [
      ["Belirtileri Paylaşın", "Ne zaman başladığı, iştah-su tüketimi, dışkı-idrar ve davranış değişiklikleri not edilir."],
      ["Muayene Edelim", "Hayvanın stresini azaltacak yaklaşım gözetilerek fiziksel değerlendirme yapılır."],
      ["Seçenekleri Konuşalım", "Gerekli incelemeler ve olası tedavi adımları sahip onayı öncesinde açıklanır."],
      ["Takibi Sürdürelim", "Kontrol zamanı, ilaç düzeni ve acil uyarı işaretleri yazılı veya sözlü olarak paylaşılır."],
    ],
    [
      ["Randevuya ne getirmeliyim?", "Aşı karnesi, kullanılan ilaçlar, önceki sonuçlar ve belirtilerin fotoğraf-videoları yararlı olabilir."],
      ["Aşı planı nasıl yapılır?", "Yaş, tür, yaşam koşulu ve sağlık durumu muayenede değerlendirilerek kişisel takvim oluşturulur."],
      ["Taşıma çantası gerekli mi?", "Kedi ve küçük hayvanlarda güvenli taşıma, klinik stresini ve kaçma riskini azaltmaya yardımcı olur."],
      ["Acil durumda ne yapmalıyım?", "Solunum güçlüğü, ciddi travma, nöbet veya zehirlenme şüphesinde kliniği acil arayın; form yanıtı beklemeyin."],
    ],
    ["Genel Muayene", "Aşı ve Koruma", "Laboratuvar İncelemesi", "Cerrahi Hazırlık", "Diş Sağlığı", "Kontrol Muayenesi"],
  ),
  emlak: profil(
    ["Doğru Yeri Bulun", "Bölgeyi Bilen Danışmanlık", "Emlak Hizmetleri", "Bilgiyle Karar Verin", "Gayrimenkul Süreci", "Emlak Soruları", "Portföy Detayları", "Aradığınızı Anlatın"],
    [
      ["Nitelikli Portföy Bilgisi", "Konum, tapu niteliği, kullanım durumu ve öne çıkan özellikler ilan metninde ayrıştırılır."],
      ["İhtiyaca Göre Eşleşme", "Bütçe kadar yaşam biçimi, ulaşım, kat, cephe ve taşınma zamanı da seçenekleri daraltır."],
      ["İşlem Adımlarının Açıklığı", "Ziyaret, teklif, belge kontrolü ve sözleşme süreci tarafların rolüyle birlikte açıklanır."],
    ],
    [
      ["Arama Kriterlerini Belirleyelim", "Konum, bütçe, kullanım amacı ve vazgeçilmez özellikler kısa bir ihtiyaç listesine dönüştürülür."],
      ["Portföyleri Eşleştirelim", "Güncel uygunluk kontrol edilerek kriterlere en yakın seçenekler gerekçeleriyle sunulur."],
      ["Yerinde İnceleyelim", "Mülkün mevcut durumu, çevresi ve ilandaki bilgileri ziyaret sırasında birlikte değerlendirilir."],
      ["İşlemi Takip Edelim", "Tekliften sözleşmeye kadar gerekli adımlar ve talep edilen belgeler düzenli biçimde paylaşılır."],
    ],
    [
      ["Portföy güncel mi?", "İlanın uygunluğu görüşme veya ziyaret planlanmadan önce mülk sahibiyle yeniden teyit edilmelidir."],
      ["Yer gösterimi nasıl olur?", "Uygun saat, buluşma noktası ve hizmet koşulları randevu öncesinde açıkça paylaşılır."],
      ["Hangi belgeler incelenir?", "İşlemin türüne göre tapu, kimlik, yetki ve sözleşme bilgileri ilgili uzmanlarla birlikte kontrol edilmelidir."],
      ["Satış fiyatı nasıl belirlenir?", "Konum, emsal işlemler, fiziksel durum ve güncel piyasa koşulları birlikte değerlendirilir."],
    ],
    ["Dış Cephe", "Salon ve Yaşam Alanı", "Mutfak", "Oda Yerleşimi", "Balkon ve Manzara", "Konum Çevresi"],
  ),
  mimarlik: profil(
    ["Fikri Mekâna Dönüştürün", "Bağlama Uygun Tasarım", "Mimarlık Hizmetleri", "Kararlar Birbiriyle Uyumlu", "Proje Aşamaları", "Mimarlık Soruları", "Proje Detayları", "Projenizi Konuşalım"],
    [
      ["İhtiyaç Programı", "Kullanıcı sayısı, işlevler, alan ilişkileri ve gelecekteki ihtiyaçlar tasarım başlamadan tanımlanır."],
      ["Mevzuat ve Saha", "Parsel, mevcut yapı, iklim, yönlenme ve ilgili izin koşulları tasarım kararlarıyla birlikte ele alınır."],
      ["Tasarım-Uygulama Bağı", "Çizim, malzeme, detay ve sahadaki imalatların aynı karar setine göre ilerlemesi gözetilir."],
    ],
    [
      ["Brief Oluşturalım", "Beklentiler, işlevler, bütçe çerçevesi ve teslim ihtiyaçları yazılı bir programa dönüştürülür."],
      ["Seçenekleri Tasarlayalım", "Yerleşim ve konsept alternatifleri güçlü-zayıf yönleriyle değerlendirmeye sunulur."],
      ["Projeyi Detaylandıralım", "Onaylanan yaklaşım ölçü, malzeme, teknik koordinasyon ve gerekli çizimlerle geliştirilir."],
      ["Uygulamayı İzleyelim", "Hizmet kapsamındaysa saha soruları ve imalat uyumu proje kararları üzerinden takip edilir."],
    ],
    [
      ["İlk görüşmeye ne getirmeliyim?", "Arsa veya mekân bilgileri, mevcut çizimler, fotoğraflar, ihtiyaç listesi ve beğenilen örnekler başlangıcı hızlandırır."],
      ["Proje ücreti neye bağlıdır?", "Alan büyüklüğü, hizmet aşamaları, teknik disiplinler ve onay süreçleri kapsamı belirler."],
      ["Ruhsat süreci dahil mi?", "Belediye takibi ve resmi başvuruların hizmete dahil olup olmadığı teklif içinde ayrıca belirtilmelidir."],
      ["Değişiklik nasıl yönetilir?", "Onay sonrası değişikliğin çizim, süre ve diğer disiplinlere etkisi değerlendirilerek yeni karar kayıt altına alınır."],
    ],
    ["Konsept Eskizleri", "Plan Alternatifleri", "Malzeme Paleti", "Teknik Detaylar", "Uygulama Sahası", "Tamamlanan Mekân"],
  ),
  fotografci: profil(
    ["Anı Hikâyeye Dönüştürün", "Doğal ve Planlı Çekim", "Çekim Hizmetleri", "Teslimi Baştan Bilin", "Çekim Yolculuğu", "Çekim Soruları", "Seçili Kareler", "Tarihinizi Paylaşın"],
    [
      ["Çekim Briefi", "Etkinlik akışı, istenen duygu, önemli kişiler ve kaçırılmaması gereken anlar çekim öncesi konuşulur."],
      ["Paket İçeriği", "Çekim süresi, fotoğraf-video kapsamı, ekip, albüm ve teslim formatları birbirinden ayrılarak açıklanır."],
      ["Seçim ve Teslim", "Kare seçimi, düzenleme yaklaşımı, yedekleme ve teslim kanalı başlangıçta netleştirilir."],
    ],
    [
      ["Tarzı Belirleyelim", "Beğenilen görseller, doğal veya yönlendirmeli çekim tercihi ve kullanım amacı konuşulur."],
      ["Akışı Planlayalım", "Tarih, konum, ışık saatleri, ulaşım ve etkinliğin kritik anları bir çekim planında toplanır."],
      ["Günü Çekelim", "Ana akış korunurken portre, detay ve atmosfer kareleri dengeli biçimde kaydedilir."],
      ["Seçip Teslim Edelim", "Belirlenen seçim ve düzenleme sürecinden sonra dosyalar kararlaştırılan formatta hazırlanır."],
    ],
    [
      ["Paketler neyi kapsar?", "Saat, ekip, fotoğraf-video, dış çekim, albüm ve ulaşım kalemleri pakete göre ayrı ayrı kontrol edilmelidir."],
      ["Yağmur olursa ne olur?", "Alternatif iç mekân, saat değişikliği veya yeni tarih seçenekleri çekim öncesinde planlanabilir."],
      ["Fotoğrafları kim seçer?", "Stüdyonun çalışma biçimine göre ön seçim fotoğrafçı, nihai albüm seçimi müşteri tarafından yapılabilir."],
      ["Teslim süresi nedir?", "Çekim hacmi, video kurgusu, albüm seçimi ve sezon yoğunluğu takvimi etkiler; sözleşmede netleştirilmelidir."],
    ],
    ["Hazırlık Anları", "Çift Portreleri", "Tören Akışı", "Mekân Detayları", "Ürün Çekimi", "Albüm Tasarımı"],
  ),
  "dugun-salonu": profil(
    ["Davetiniz Hazır Olsun", "Eksiksiz Davet Planı", "Davet Seçenekleri", "Her Detay Görünür", "Davet Planı", "Salon Soruları", "Mekân Detayları", "Tarihi Kontrol Edin"],
    [
      ["Kapasite Uyumu", "Masa düzeni, dans alanı, sahne ve servis geçişleri davetli sayısıyla birlikte değerlendirilir."],
      ["Paketin Açık İçeriği", "Menü, süsleme, müzik, fotoğraf, karşılama ve ek hizmetlerin dahil olup olmadığı net biçimde ayrılır."],
      ["Gün Akışı", "Kurulum, misafir kabulü, tören anları, ikram ve kapanış saatleri sorumlularla birlikte planlanır."],
    ],
    [
      ["Tarihi ve Sayıyı Paylaşın", "Davet türü, yaklaşık misafir sayısı ve tercih edilen tarih uygunluk için kontrol edilir."],
      ["Mekânı Gezin", "Giriş, salon düzeni, sahne, hazırlık alanı, otopark ve mevsim koşulları yerinde incelenir."],
      ["Paketi Netleştirin", "Menü, masa düzeni, konsept, müzik ve dışarıdan alınacak hizmetler yazılı hâle getirilir."],
      ["Akışı Onaylayın", "Davet öncesi son kişi sayısı, oturma düzeni ve program sorumlularla tekrar kontrol edilir."],
    ],
    [
      ["Salon kaç kişilik?", "Rahat kapasite masa tipi ve dans alanına göre değişir; yalnızca azami kişi sayısıyla karar verilmemelidir."],
      ["Paket neleri içerir?", "Yiyecek-içecek, süsleme, müzik, fotoğraf ve personel kalemleri teklif üzerinde ayrı görülmelidir."],
      ["Açık alanda plan B var mı?", "Yağmur, rüzgâr veya sıcaklık için kapalı alan geçişi ve karar saati önceden konuşulmalıdır."],
      ["Son kişi sayısı ne zaman verilir?", "Mutfak ve masa planının doğru hazırlanabilmesi için salonun belirlediği kesin bildirim tarihi dikkate alınır."],
    ],
    ["Salon Yerleşimi", "Nikâh Alanı", "Masa Düzeni", "Sahne ve Pist", "Karşılama Alanı", "Gece Aydınlatması"],
  ),
  "spor-salonu": profil(
    ["Hedefinize Göre Çalışın", "Sürdürülebilir Antrenman", "Antrenman Seçenekleri", "Program Size Uysun", "Üyelik Başlangıcı", "Spor Salonu Soruları", "Salon Detayları", "Salonu Deneyin"],
    [
      ["Başlangıç Değerlendirmesi", "Hedef, deneyim, hareket geçmişi ve profesyonelle paylaşılması gereken durumlar program öncesi ele alınır."],
      ["Seviyeye Uygun Program", "Yoğunluk ve hareket seçimi kişinin teknik yeterliliğine, zamanına ve toparlanmasına göre ayarlanır."],
      ["Düzenli Takip", "Program yalnızca yazılıp bırakılmaz; uygulanabilirlik ve ilerleme belirli aralıklarla gözden geçirilir."],
    ],
    [
      ["Hedefi Belirleyelim", "Beklenti, haftalık zaman ve mevcut deneyim konuşularak gerçekçi başlangıç noktası seçilir."],
      ["Salonu Tanıyalım", "Alanlar, ekipman, grup dersi programı ve kullanım kuralları üyelik öncesinde gösterilir."],
      ["Programı Başlatalım", "Teknik güvenlik ve kademeli yüklenme gözetilerek ilk çalışma düzeni uygulanır."],
      ["İlerlemeyi Güncelleyelim", "Devamlılık, performans ve zorlanma durumu değerlendirilerek program uyarlanır."],
    ],
    [
      ["Hangi üyelik uygun?", "Gelebileceğiniz günler, grup dersi isteği ve bireysel destek ihtiyacı paket seçimini belirler."],
      ["İlk kez başlıyorum, olur mu?", "Başlangıç seviyesine uygun tanıtım ve program sunulup sunulmadığı görüşmede sorulmalıdır."],
      ["Özel ders gerekli mi?", "Teknik öğrenme, özel hedef veya yakın takip ihtiyacı varsa birebir seçenek değerlendirilebilir."],
      ["Sağlık sorunum varsa?", "Egzersize uygunluk konusunda ilgili sağlık profesyonelinin değerlendirmesi istenebilir; durum eğitmene bildirilmelidir."],
    ],
    ["Serbest Ağırlık Alanı", "Kardiyo Bölümü", "Grup Dersleri", "Kişisel Antrenman", "Soyunma Alanları", "Ekipman Detayları"],
  ),
  anaokulu: profil(
    ["Merakla Büyüsünler", "Güvenli Öğrenme Ortamı", "Eğitim Programları", "Aile İçin Açık Bilgi", "Kayıt Yolculuğu", "Veli Soruları", "Okul Yaşamı", "Tanışma Planlayın"],
    [
      ["Yaşa Uygun Program", "Günlük akış, oyun, dinlenme ve etkinlikler çocukların yaş grubu ile gelişim ihtiyaçlarına göre açıklanır."],
      ["Güvenlik ve İletişim", "Teslim alma, yetkili kişiler, sağlık bilgileri ve aile bilgilendirme yöntemleri kayıt öncesi paylaşılır."],
      ["Uyum Süreci", "Çocuğun okula alışma hızı gözetilir; ilk günler için aileyle birlikte uygulanabilir bir geçiş planı kurulur."],
    ],
    [
      ["Yaş Grubunu Öğrenelim", "Doğum tarihi, önceki okul deneyimi ve ailenin program beklentisi ön görüşmede konuşulur."],
      ["Okulu Gezin", "Sınıflar, oyun alanları, yemek-dinlenme düzeni ve günlük akış yerinde incelenir."],
      ["Programı Değerlendirin", "Saatler, etkinlik yaklaşımı, iletişim biçimi ve kayıt koşulları aileye açıklanır."],
      ["Uyumu Planlayın", "Başlangıç tarihi, gerekli belgeler ve çocuğun ilk günlerdeki destek ihtiyacı birlikte belirlenir."],
    ],
    [
      ["Hangi yaş grupları var?", "Kabul yaşı ve grup dağılımı kurumun programına göre değişir; doğum tarihiyle güncel bilgi alınmalıdır."],
      ["Günlük akış nasıl?", "Oyun, etkinlik, açık hava, yemek ve dinlenme saatlerinin yaş grubuna göre nasıl dengelendiği incelenmelidir."],
      ["Uyum süreci nasıl ilerler?", "Çocuğun tepkisine göre kademeli süre, aile iletişimi ve öğretmen gözlemiyle planlanır."],
      ["Kayıt için ne gerekir?", "Gerekli belgeler, sağlık bilgileri, yetkili teslim kişileri ve ödeme koşulları kurum tarafından güncel olarak paylaşılır."],
    ],
    ["Sınıf Ortamı", "Oyun Alanları", "Sanat Etkinliği", "Bahçe Zamanı", "Yemek Düzeni", "Günlük Akış"],
  ),
  "ozel-egitim-kursu": profil(
    ["Hedefe Odaklanın", "Planlı Öğrenme Süreci", "Eğitim Programları", "Gelişimi Görünür Kılın", "Kayıt ve Eğitim", "Kurs Soruları", "Öğrenme Ortamı", "Seviyenizi Belirleyin"],
    [
      ["Seviye ve Hedef", "Program önerisi öğrencinin mevcut düzeyi, hedefi, zamanı ve öğrenme ihtiyacına göre yapılır."],
      ["Ders Yapısı", "Grup büyüklüğü, ders süresi, materyaller ve ölçme yöntemi kayıt öncesinde açıkça anlatılır."],
      ["İlerleme Geri Bildirimi", "Deneme, ödev veya uygulama sonuçları yalnızca puan değil, eksik kazanımlar üzerinden değerlendirilir."],
    ],
    [
      ["Hedefi Öğrenelim", "Sınav, okul desteği, beceri veya mesleki amaç ile kullanılabilir zaman belirlenir."],
      ["Seviyeyi Belirleyelim", "Uygun ölçme veya ön görüşmeyle öğrencinin başlangıç noktası anlaşılır."],
      ["Programı Eşleştirelim", "Ders içeriği, sınıf düzeni ve takvim öğrencinin ihtiyacına göre önerilir."],
      ["Gelişimi İzleyelim", "Katılım, çalışmalar ve ölçme sonuçları üzerinden programın etkisi düzenli gözden geçirilir."],
    ],
    [
      ["Hangi program uygun?", "Yaş, seviye, hedef ve haftalık çalışma zamanı öğrenilmeden yalnızca sınıf adına göre seçim yapılmamalıdır."],
      ["Sınıflar kaç kişilik?", "Grup büyüklüğü programa ve döneme göre değişebilir; güncel kontenjan kayıt öncesinde sorulmalıdır."],
      ["Ders kaçırılırsa ne olur?", "Telafi, kayıt erişimi veya etüt koşulları kurumun programına göre açıkça öğrenilmelidir."],
      ["Gelişim nasıl paylaşılır?", "Ölçme sonuçları, öğretmen geri bildirimi ve belirlenen takip aralığı kayıt görüşmesinde netleştirilmelidir."],
    ],
    ["Seviye Belirleme", "Sınıf Ortamı", "Birebir Çalışma", "Ders Materyalleri", "Deneme ve Ölçme", "Gelişim Görüşmesi"],
  ),
  matbaa: profil(
    ["Baskınız Doğru Çıksın", "Üretime Uygun Baskı", "Baskı Ürünleri", "Dosyadan Teslime Kontrol", "Baskı Süreci", "Baskı Soruları", "Üretim Detayları", "Dosyanızı Gönderin"],
    [
      ["Baskı Öncesi Kontrol", "Ölçü, taşma payı, renk modu, çözünürlük ve kesim çizgileri üretime geçmeden incelenir."],
      ["Malzeme ve Adet Uyumu", "Kâğıt, gramaj, baskı tekniği ve sonlandırma seçimi kullanım alanı ile miktara göre değerlendirilir."],
      ["Numune ve Onay", "Renk veya ölçünün kritik olduğu işlerde dijital prova ya da fiziksel numune seçeneği kapsamda netleştirilir."],
    ],
    [
      ["Ürünü Tanımlayın", "Ölçü, adet, kullanım yeri, teslim tarihi ve istenen sonlandırma bilgileri alınır."],
      ["Dosyayı Kontrol Edelim", "Baskıya uygunluk incelenir; gerekiyorsa tasarım veya teknik düzeltme ihtiyacı bildirilir."],
      ["Onayı Alalım", "Malzeme, renk yaklaşımı, kesim ve üretim detayları müşteri onayına sunulur."],
      ["Üretip Teslim Edelim", "Baskı ve sonlandırma tamamlanınca adet, kesim ve paketleme kontrolleri yapılır."],
    ],
    [
      ["Hangi dosya gerekir?", "Tercihen baskıya uygun PDF; doğru ölçü, taşma, gömülü font ve yeterli görsel çözünürlüğüyle hazırlanmalıdır."],
      ["Renkler ekrandaki gibi olur mu?", "Ekran RGB, baskı ise farklı renk süreçleri kullanır; kâğıt ve makine de tonu etkileyebilir."],
      ["Fiyatı ne belirler?", "Ölçü, adet, malzeme, renk, baskı tekniği, kesim ve lak-selefon gibi sonlandırmalar birlikte hesaplanır."],
      ["Ne zaman teslim edilir?", "Dosya onayı, üretim tekniği, sonlandırma ve yoğunluk teslim takvimini belirler."],
    ],
    ["Dosya Kontrolü", "Kâğıt Seçimi", "Dijital Baskı", "Etiket Kesimi", "Selefon ve Lak", "Paketleme"],
  ),
  cicekci: profil(
    ["Duygunuzu Çiçekle Anlatın", "Mevsime Uygun Tasarım", "Çiçek Seçenekleri", "Siparişiniz Net Olsun", "Sipariş Akışı", "Çiçek Soruları", "Aranjman Detayları", "Siparişinizi Anlatın"],
    [
      ["Amaca Uygun Tasarım", "Kutlama, geçmiş olsun, açılış veya taziye için renk, form ve mesajın tonu ayrı planlanır."],
      ["Mevsimsel Şeffaflık", "Görseldeki çiçek bulunmadığında renk ve genel karakter korunarak yapılabilecek değişiklik önceden konuşulur."],
      ["Teslimat Bilgisi", "Alıcı adı, telefon, açık adres, teslim aralığı ve kart notu sipariş onayında yeniden kontrol edilir."],
    ],
    [
      ["Anlamı Belirleyelim", "Gönderim nedeni, alıcıyla ilişki, renk tercihi ve iletilmek istenen duygu öğrenilir."],
      ["Tasarımı Seçelim", "Buket, kutu, saksı veya kurumsal aranjman; bütçe ve teslim koşuluna göre önerilir."],
      ["Siparişi Onaylayalım", "İçerik, boyut, kart notu, adres ve teslim zamanı birlikte teyit edilir."],
      ["Hazırlayıp Ulaştıralım", "Taze ürünlerle hazırlanan tasarım, belirlenen teslim bilgilerine göre yönlendirilir."],
    ],
    [
      ["Görselin aynısı gelir mi?", "Çiçekler mevsimsel ürünlerdir; tür değişikliği gerekirse renk ve tasarım dengesi korunarak onay alınmalıdır."],
      ["Aynı gün teslim olur mu?", "Stok, hazırlık süresi, adres ve kurye yoğunluğuna göre güncel uygunluk siparişten önce teyit edilir."],
      ["Kart notu eklenir mi?", "Not metni yazım ve isim bilgisiyle birlikte sipariş onayında kontrol edilmelidir."],
      ["Alıcı yerinde olmazsa?", "Telefonla ulaşma, güvenli teslim noktası veya yeniden yönlendirme koşulları çiçekçiyle önceden konuşulmalıdır."],
    ],
    ["Mevsim Buketi", "Kutuda Çiçek", "Saksı Bitkisi", "Açılış Tasarımı", "Düğün Çiçekleri", "Kurumsal Aranjman"],
  ),
  pastane: profil(
    ["Kutlamanıza Tat Katın", "Taze ve Özenli Üretim", "Pasta ve Tatlılar", "Sipariş Detayları Net", "Sipariş Hazırlığı", "Pasta Soruları", "Lezzet Detayları", "Sipariş Planlayın"],
    [
      ["Kişi Sayısına Uygun Boyut", "Pasta ölçüsü yalnızca görünüşe değil, servis biçimi ve yaklaşık porsiyon ihtiyacına göre seçilir."],
      ["İçerik ve Alerjen Bilgisi", "Krema, dolgu, meyve, kuruyemiş ve özel beslenme talepleri siparişten önce açıkça konuşulur."],
      ["Teslim Güvenliği", "Tasarım, kat sayısı ve hava koşullarına göre taşıma, saklama ve servis zamanı müşteriye açıklanır."],
    ],
    [
      ["Kutlamayı Anlatın", "Tarih, kişi sayısı, tema, renk ve pastanın sunulacağı ortam hakkında bilgi alınır."],
      ["Lezzeti Seçin", "Kek, krema, dolgu ve dış kaplama seçenekleri birbiriyle uyumlu biçimde belirlenir."],
      ["Tasarımı Onaylayın", "Yazı, yaş, figür, ölçü ve teslim bilgisi üretim başlamadan önce teyit edilir."],
      ["Doğru Koşulda Teslim Alın", "Taşıma zemini, soğukta saklama ve servis öncesi bekleme notları ürünle birlikte paylaşılır."],
    ],
    [
      ["Kaç kişilik pasta almalıyım?", "Dilim boyutu, başka ikramların bulunması ve servis biçimi yaklaşık porsiyon hesabını değiştirir."],
      ["Fotoğrafın aynısı yapılır mı?", "El yapımı ürünlerde renk, malzeme ve teknik sınırlar olabilir; tasarımın uygulanabilir yorumu onaylanır."],
      ["Ne kadar önce sipariş vermeliyim?", "Özel tasarım, figür, katlı yapı ve yoğun tarihler daha erken planlama gerektirir."],
      ["Alerjen bilgisi nasıl alınır?", "Tüketicinin hassasiyeti açıkça bildirilmelidir; çapraz temas koşulları işletmeden ayrıca öğrenilmelidir."],
    ],
    ["Yaş Pasta", "Özel Gün Tasarımı", "Dolgu Katmanları", "Butik Kurabiye", "Günlük Tatlılar", "Paketleme"],
  ),
  mobilya: profil(
    ["Mekânınıza Tam Uysun", "Ölçüye Özel Mobilya", "Mobilya Çözümleri", "Detaylar Baştan Çözülür", "Üretim Yolculuğu", "Mobilya Soruları", "Üretim Detayları", "Ölçü Planlayın"],
    [
      ["Yerinde Ölçü", "Duvar açıları, tesisat noktaları, süpürgelik, kapak açılımı ve taşıma yolu üretimden önce kontrol edilir."],
      ["Malzeme Açıklığı", "Gövde, kapak, tezgâh, kenar bandı, menteşe ve ray seçenekleri teklif içinde ayrı tanımlanır."],
      ["Montaj Sonu Ayar", "Kapak aralıkları, çekmece hareketi, sabitleme ve yüzeyler kullanım öncesi son kez incelenir."],
    ],
    [
      ["İhtiyacı Çizelim", "Depolama, kullanım, stil ve mevcut mekân sorunları bir ihtiyaç listesine dönüştürülür."],
      ["Ölçüyü Alalım", "Nişler, duvarlar, tesisat ve montajı etkileyen detaylar yerinde kaydedilir."],
      ["Tasarımı Onaylayalım", "Yerleşim, malzeme, renk, aksesuar ve kullanım detayları üretimden önce netleştirilir."],
      ["Üretip Kuralım", "Parçalar hazırlanır, alana uygun sırayla monte edilir ve hareketli aksamların ayarı yapılır."],
    ],
    [
      ["Fiyatı ne belirler?", "Ölçü, malzeme, kapak sistemi, aksesuar, tezgâh ve montaj koşulları toplam kapsamı belirler."],
      ["Üretim ne kadar sürer?", "Tasarım onayı, malzeme tedariki, özel işlemler ve atölye planı teslim tarihini etkiler."],
      ["Duvar düzgün değilse ne olur?", "Yerinde ölçüde farklar kaydedilir; dolgu, pay veya saha uyarlaması tasarımda çözülür."],
      ["Montaj öncesi ne hazırlanır?", "Alan boşaltma, elektrik-su noktaları, zemin ve duvar işlerinin tamamlanma durumu önceden kontrol edilir."],
    ],
    ["Mutfak Dolapları", "Gardırop İçi", "Kapak ve Kulplar", "Çekmece Sistemleri", "Özel Üretim", "Montaj Ayarları"],
  ),
  elektrikci: profil(
    ["Elektriğiniz Güvende Olsun", "Ölçerek Müdahale", "Elektrik Hizmetleri", "Arıza Önce Tespit", "Servis Akışı", "Elektrik Soruları", "Uygulama Detayları", "Arızayı Bildirin"],
    [
      ["Güvenli Ön Kontrol", "Arızanın belirtisi, sigorta davranışı, koku-ısınma ve etkilenen hat öğrenilerek riskli alan sınırlandırılır."],
      ["Ölçüme Dayalı Tespit", "Kablo, hat, bağlantı ve koruma elemanları uygun ölçüm yapılmadan tahminle değiştirilmez."],
      ["Çalışma Sonu Test", "Onarım sonrası devre, yük, kaçak ve ilgili koruma elemanları hizmet kapsamına göre yeniden kontrol edilir."],
    ],
    [
      ["Belirtiyi Dinleyelim", "Ne zaman başladığı, hangi cihaz veya hatta görüldüğü ve sigortanın durumu öğrenilir."],
      ["Enerjiyi Güvene Alalım", "Riskli bölüm uygun yöntemle izole edilerek kontrollü inceleme ortamı oluşturulur."],
      ["Arızayı Ölçelim", "Bağlantılar ve devreler test edilerek sorunun kaynağı ile gerekli işlem açıklanır."],
      ["Sistemi Deneyelim", "Onarım tamamlanınca ilgili hat çalıştırılır ve kullanıcıya dikkat edilecek noktalar bildirilir."],
    ],
    [
      ["Sigorta sürekli atıyor, neden?", "Aşırı yük, kısa devre, kaçak veya arızalı cihaz gibi farklı nedenler olabilir; ölçüm gerekir."],
      ["Acil durumda ne yapmalıyım?", "Yanık kokusu, duman, kıvılcım veya ısınma varsa güvenliyse ana enerjiyi kesin ve acil servis çağırın."],
      ["Fiyat telefonda belli olur mu?", "Belirti ön bilgi verir; arıza noktası ve gerekli malzeme yerinde tespit edilmeden kesin kapsam oluşmayabilir."],
      ["Eski tesisat yenilenmeli mi?", "Kablo durumu, pano, topraklama, yük ihtiyacı ve ölçüm sonuçları birlikte değerlendirilmelidir."],
    ],
    ["Pano Kontrolü", "Hat Ölçümü", "Priz ve Anahtar", "Aydınlatma Montajı", "Kablo Düzeni", "Çalışma Testi"],
  ),
  tesisatci: profil(
    ["Su Sorunu Büyümesin", "Tespit Odaklı Tesisat", "Tesisat Hizmetleri", "Kaynağı Doğru Bulun", "Müdahale Süreci", "Tesisat Soruları", "Onarım Detayları", "Sorunu Gösterin"],
    [
      ["Belirtiye Göre Tespit", "Nem, basınç kaybı, ses, koku ve tıkanma noktası değerlendirilerek müdahale alanı daraltılır."],
      ["Gerektiği Kadar Açma", "Kaçak veya tıkanıklığın yeri mümkün olduğunca tespit edilerek gereksiz kırma riskinin azaltılması hedeflenir."],
      ["Onarım Sonu Kontrol", "Akış, sızdırmazlık, basınç ve kullanılan bağlantılar işlem tamamlandıktan sonra denenir."],
    ],
    [
      ["Belirtiyi Paylaşın", "Sorunun yeri, ne zaman başladığı, bina yaşı ve varsa fotoğraf-video bilgisi alınır."],
      ["Kaynağı Tespit Edelim", "Görsel kontrol ve gerekli ekipmanla kaçağın veya tıkanıklığın olası noktası belirlenir."],
      ["İşlemi Açıklayalım", "Kırma, parça değişimi veya cihazla müdahale gereksinimi başlamadan önce anlatılır."],
      ["Akışı Kontrol Edelim", "Onarım sonrası su verilerek sızdırmazlık ve kullanım durumu birlikte gözden geçirilir."],
    ],
    [
      ["Su kaçağı nasıl anlaşılır?", "Sayaç hareketi, nem, kabarma, basınç düşmesi veya alt kata sızıntı belirti olabilir; yerinde kontrol gerekir."],
      ["Kırmadan tespit mümkün mü?", "Kaçağın türü ve boru güzergâhına göre cihazla alan daraltılabilir; her durumda sıfır kırma garantisi verilemez."],
      ["Tıkanıklık tekrarlar mı?", "Hat eğimi, boru yapısı ve kullanım alışkanlığı çözümün kalıcılığını etkiler; neden ayrıca değerlendirilmelidir."],
      ["Acil durumda ne yapmalıyım?", "Kontrolsüz su akışında ana vanayı kapatın, elektrikle temas riski varsa alana yaklaşmadan destek çağırın."],
    ],
    ["Kaçak Tespiti", "Gider Hattı", "Armatür Montajı", "Boru Bağlantısı", "Vana Değişimi", "Sızdırmazlık Testi"],
  ),
  "kombi-servisi": profil(
    ["Isınmanız Aksamadan", "Tespitli Kombi Servisi", "Kombi Hizmetleri", "Parça Değil Arıza", "Servis Süreci", "Kombi Soruları", "Servis Detayları", "Arızayı Paylaşın"],
    [
      ["Arıza Kodu ve Belirti", "Ekran kodu, ses, basınç, sıcak su ve ısıtma davranışı ön bilgi olarak birlikte değerlendirilir."],
      ["Kontrol Sonrası Teklif", "Parça değişimi gerekiyorsa arıza nedeni ve işlem kapsamı onay alınmadan önce açıklanır."],
      ["Çalışma Testi", "Servis sonrası sıcak su, ısıtma devresi, basınç ve sızdırmazlık ilgili işlem kapsamında kontrol edilir."],
    ],
    [
      ["Belirtiyi Kaydedelim", "Marka-model, arıza kodu, basınç değeri ve sorunun hangi kullanımda çıktığı öğrenilir."],
      ["Cihazı İnceleyelim", "Güvenlik kontrolleri ve ölçümler yapılarak arızanın olası kaynağı belirlenir."],
      ["İşlemi Onaylayalım", "Bakım, onarım veya parça gereksinimi gerekçesi ve kapsamıyla birlikte sunulur."],
      ["Sistemi Çalıştıralım", "Cihaz farklı modlarda denenir; basınç ve kullanıcı ayarları hakkında bilgi verilir."],
    ],
    [
      ["Basınç neden düşer?", "Tesisat kaçağı, genleşme tankı veya cihaz içi sorunlar gibi farklı nedenler olabilir; tekrar ediyorsa servis gerekir."],
      ["Bakım ne zaman yapılır?", "Kullanım yoğunluğu ve üretici önerileri dikkate alınır; ısıtma dönemi öncesi kontrol planlamak pratiktir."],
      ["Arıza kodunu silebilir miyim?", "Kullanım kılavuzundaki güvenli adımlar dışında kapağı açmayın; kod tekrarlıyorsa profesyonel servis çağırın."],
      ["Gaz kokusunda ne yapmalıyım?", "Kıvılcım oluşturmayın, güvenliyse vanayı kapatıp ortamı havalandırın ve 187 Doğal Gaz Acil hattını arayın."],
    ],
    ["Cihaz Ön Kontrolü", "Basınç Ölçümü", "Bakım İşlemleri", "Petek Devresi", "Termostat Ayarı", "Çalışma Testi"],
  ),
  nakliyat: profil(
    ["Taşınmayı Planlayın", "Kontrollü Eşya Taşıma", "Taşıma Hizmetleri", "Teklifte Her Şey Net", "Taşınma Günü", "Nakliyat Soruları", "Taşıma Detayları", "Taşınmanızı Anlatın"],
    [
      ["Doğru Hacim Bilgisi", "Oda sayısı tek başına yetmez; büyük eşyalar, koli adedi, hassas parçalar ve bina erişimi birlikte değerlendirilir."],
      ["Paketleme Kapsamı", "Kimin paketleyeceği, kullanılacak malzeme, mobilya sökme-kurma ve özel eşyalar teklifte ayrıştırılır."],
      ["Teslim Planı", "Araç, ekip, çıkış-varış saatleri, kat ve asansör koşulları taşınma öncesinde yazılı olarak netleştirilir."],
    ],
    [
      ["Eşyayı Tanıyalım", "Çıkış-varış adresi, kat, asansör, oda ve özel eşya bilgileri fotoğraf veya keşifle alınır."],
      ["Planı Yazalım", "Ekip, araç, paketleme, söküm-kurulum ve kapsam dışı işler teklif üzerinde belirtilir."],
      ["Güvenle Taşıyalım", "Eşyalar türüne göre paketlenir, araçta sabitlenir ve bina koşullarına uygun sırayla yüklenir."],
      ["Teslimi Kontrol Edelim", "Parçalar doğru odalara alınır, kapsam dahilindeki kurulum yapılır ve eksik-hasar kontrolü tamamlanır."],
    ],
    [
      ["Teklif için ne gerekli?", "İki adres, kat ve asansör bilgisi, eşya listesi, tarih ve paketleme beklentisi paylaşılmalıdır."],
      ["Nakliye sigortası neyi kapsar?", "Poliçe, istisna ve beyan koşulları firmadan yazılı olarak istenmeli; kapsam varsayılmamalıdır."],
      ["Mobilya kurulumu dahil mi?", "Sökme-kurma, avize, beyaz eşya veya duvar montajı gibi işler teklifte ayrı ayrı belirtilmelidir."],
      ["Taşınma günü ne hazırlamalıyım?", "Değerli belgeler ayrılmalı, bina yönetimi ve asansör izni tamamlanmalı, kişisel ihtiyaç kolisi hazır tutulmalıdır."],
    ],
    ["Ambalaj Malzemeleri", "Mobilya Sökümü", "Hassas Eşyalar", "Araç İçi Sabitleme", "Asansörlü Taşıma", "Yeni Adres Teslimi"],
  ),
  transfer: profil(
    ["Yolculuğunuz Hazır", "Zamanında ve Planlı", "Transfer Seçenekleri", "Rezervasyon Bilgisi Net", "Transfer Akışı", "Transfer Soruları", "Yolculuk Detayları", "Transfer Planlayın"],
    [
      ["Uçuş ve Saat Takibi", "Uçuş kodu, planlanan iniş, karşılama noktası ve bekleme koşulları rezervasyonda açıkça kaydedilir."],
      ["Yolcuya Uygun Araç", "Kişi sayısı, bagaj, çocuk koltuğu ve erişilebilirlik ihtiyacı araç planını belirler."],
      ["Sabit Buluşma Bilgisi", "Sürücü iletişimi, tabela adı ve terminaldeki buluşma noktası yolculuk öncesi paylaşılır."],
    ],
    [
      ["Bilgileri Paylaşın", "Alış-bırakış adresi, tarih, saat, uçuş kodu, yolcu ve bagaj sayısı alınır."],
      ["Aracı Eşleştirelim", "Kapasite ve özel ihtiyaçlara uygun araç seçeneği ile fiyat kapsamı onaya sunulur."],
      ["Buluşmayı Kesinleştirelim", "Sürücü, araç ve karşılama bilgisi hizmetten önce müşteriye iletilir."],
      ["Rotayı Tamamlayalım", "Yolcu güvenli biçimde alınır ve rezervasyondaki adrese planlanan rota üzerinden ulaştırılır."],
    ],
    [
      ["Uçuş gecikirse ne olur?", "Uçuş koduyla takip ve ücretsiz bekleme süresi işletmeye göre değişir; rezervasyonda teyit edilmelidir."],
      ["Bagaj için hangi araç?", "Büyük valiz, bebek arabası, spor ekipmanı ve toplam parça sayısı araç seçiminden önce bildirilmelidir."],
      ["Çocuk koltuğu var mı?", "Yaş ve kilo bilgisiyle önceden talep edilmeli; rezervasyon onayında bulunabilirliği kontrol edilmelidir."],
      ["Gece transferi yapılır mı?", "Çalışma saatleri ve ek ücret koşulları tarih-saat bilgisi verilerek önceden sorulmalıdır."],
    ],
    ["Havalimanı Karşılama", "Araç İç Mekânı", "Bagaj Alanı", "Çocuk Koltuğu", "Grup Transferi", "Otel Teslimi"],
  ),
  "arac-kiralama": profil(
    ["Yolunuza Uygun Araç", "Açık Kiralama Koşulları", "Kiralık Araçlar", "Koşulları Baştan Bilin", "Kiralama Akışı", "Kiralama Soruları", "Araç Detayları", "Tarihleri Paylaşın"],
    [
      ["Toplam Ücret Açıklığı", "Günlük ücret, vergi, kilometre, ek sürücü, teslim yeri ve olası ek hizmetler rezervasyonda ayrıştırılır."],
      ["Araç Sınıfı Uyumu", "Yolcu, bagaj, rota, sürüş konforu ve kullanım süresi seçilecek araç grubunu belirler."],
      ["Teslim Tutanağı", "Yakıt, kilometre, mevcut hasarlar, aksesuarlar ve iade koşulları araç tesliminde birlikte kaydedilir."],
    ],
    [
      ["Tarihleri Belirleyin", "Alış-iade zamanı, konum, sürücü bilgisi ve yolculuk planı rezervasyon için alınır."],
      ["Aracı Seçelim", "Kişi-bagaj sayısı ve kullanım amacına göre uygun araç sınıfı ile koşullar sunulur."],
      ["Sözleşmeyi İnceleyin", "Teminat, kilometre, yakıt, depozito ve ek sürücü maddeleri teslimden önce açıklanır."],
      ["Aracı Birlikte Kontrol Edin", "Mevcut hasarlar ve donanımlar kaydedilir; iade yeri ile saati yeniden teyit edilir."],
    ],
    [
      ["Hangi belgeler gerekir?", "Geçerli ehliyet, kimlik ve ödeme koşulları firmanın araç sınıfı ile kiralama politikasına göre değişebilir."],
      ["Depozito ne zaman iade edilir?", "Bloke tutarı ve çözülme süresi banka ile şirket koşullarına bağlıdır; sözleşmede görülmelidir."],
      ["Kilometre sınırı var mı?", "Günlük veya toplam sınır ve aşım bedeli araç grubuna göre rezervasyon öncesinde teyit edilmelidir."],
      ["Araç modeli garanti mi?", "Rezervasyon çoğunlukla belirli bir sınıf içindir; marka-model garantisi varsa onay belgesinde açıkça yazmalıdır."],
    ],
    ["Ekonomik Sınıf", "Otomatik Araçlar", "Geniş Bagaj", "Araç Teslimi", "Hasar Kontrolü", "Havalimanı Teslimi"],
  ),
};

const varsayilan = profil(
  ["İhtiyacınıza Uygun", "Açık Hizmet Anlayışı", "Hizmet Seçenekleri", "Net Karar Noktaları", "Çalışma Akışı", "Merak Edilenler", "Hizmet Detayları", "Bize Anlatın"],
  [
    ["Açık Kapsam", "Yapılacak işler ve kapsam dışında kalan noktalar hizmet başlamadan önce netleştirilir."],
    ["Uygun Yöntem", "Talebin koşulları değerlendirilerek uygulanabilir seçenekler anlaşılır biçimde paylaşılır."],
    ["Son Kontrol", "Belirlenen kapsam tamamlandığında sonuç ve sonraki adımlar birlikte gözden geçirilir."],
  ],
  [
    ["Talebi Anlayalım", "İhtiyacın temel ayrıntıları ve öncelikler öğrenilir."],
    ["Kapsamı Belirleyelim", "Uygun hizmet ve çalışma sınırları açıklanır."],
    ["Planı Uygulayalım", "Onaylanan adımlar belirlenen sırayla yürütülür."],
    ["Sonucu İnceleyelim", "Tamamlanan kapsam ve takip gereksinimi değerlendirilir."],
  ],
  [
    ["Nasıl başlamalıyım?", "İhtiyacınızı, konumu ve uygun zamanı paylaşarak ilk değerlendirmeyi başlatabilirsiniz."],
    ["Kapsam nasıl belirlenir?", "Mevcut durum ve beklenen sonuç birlikte değerlendirilerek hizmet sınırları oluşturulur."],
    ["Süre neye bağlıdır?", "Çalışmanın kapsamı, alan koşulları ve gerekli hazırlıklar süreyi etkiler."],
    ["Sonrasında ne olur?", "Tamamlanan işler ve varsa takip adımları teslim sırasında açıklanır."],
  ],
  ["Ön İnceleme", "Hazırlık", "Uygulama", "Detaylar", "Son Kontrol", "Teslim"],
);

export function sektorDonusumProfiliniGetir(sektor: string) {
  return profiller[sektor] ?? varsayilan;
}
