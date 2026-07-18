# Sitemix Studio

Kuaför, nakliyat, tesisatçı, elektrikçi, oto yıkama, halı yıkama,
temizlik şirketi, araç kiralama, VIP transfer ve mobilya işletmeleri için
kod yazmadan çok sayfalı web siteleri hazırlayan Next.js stüdyosu.

## Çalışma akışı

1. Firma, sektör, konum ve iletişim bilgileri girilir.
2. İşletmenin gerçekten sunduğu hizmetler seçilir.
3. Satış, güven veya vitrin odaklı hazır içerik paketi belirlenir.
4. Sektöre özel çok sayfalı site; hazır metinler, sayfa rolleri, mobil menü,
   talep formu ve iletişim akışlarıyla oluşturulur.
5. Görsel stüdyoda sayfalar ve bölümler eklenir, sıralanır, çoğaltılır veya
   gizlenir; metin, renk, tipografi, boşluk, köşe ve hareket ayarları canlı
   önizleme üzerinden değiştirilir.
6. Site, GitHub'a bağımsız bir Next.js projesi olarak aktarılır. Vercel ayarı,
   normalize edilmiş rotalar, `sitemap.xml` ve `robots.txt` hazır gelir.

Sistem içerik üretiminde yapay zekâ servisi kullanmaz. Metinler on sektöre özel,
insan eliyle hazırlanmış şablon paketlerinden ve kullanıcının girdiği gerçek
işletme bilgilerinden oluşur.

## Denetimler

```bash
npm run test:sektorler
npm run test:yayin
npm run lint
npm run build
```

Sektör denetimi on sektörün sayfa rolleri, slug'ları, bağlantıları, form
profilleri, içerik özgünlüğü ve mobil metin yoğunluğunu kontrol eder. Yayın
denetimi bağımsız GitHub/Vercel projesinin bütün kaynaklarını, sitemap ve robots
güvencelerini doğrular.

## Ortam değişkenleri

Yalnızca GitHub aktarımı için `GITHUB_TOKEN`, `GITHUB_OWNER` ve isteğe bağlı
`GITHUB_DEFAULT_BRANCH` kullanılır. İçerik ve tema sistemi için API anahtarı
gerekmez.
