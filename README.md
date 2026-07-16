# Sitemix Studio

İşletme Bulucu’daki 36 satış sektörüne göre tek veya çok sayfalı işletme
siteleri hazırlayan Next.js tabanlı stüdyo.

## Çalışma akışı

1. Firma, sektör, konum ve geçerli iletişim kanalları girilir.
2. Seçilen sektör için sayfa rolleri, bölüm sırası, hizmet anlatımı ve tema
   önerileri hazırlanır.
3. İsteğe bağlı OpenAI yapılandırması varsa metinler, mevcut sektör profilini
   ve kullanıcının verdiği gerçek bilgileri koruyarak yeniden yazılır.
4. Sektöre özel, doğrulanmış Unsplash görselleri uygun açılış, hakkımızda,
   ürün ve galeri alanlarına yerleştirilir.
5. İçerik merkezinde toplu metin değişiklikleri önce ön izlenir; eşleşme
   hataları giderildikten sonra uygulanır ve son toplu işlem geri alınabilir.
6. Talep formu araç, ölçü, tarih, konum, randevu veya hizmet kapsamı gibi
   alanları seçilen sektöre göre değiştirir.
7. GitHub aktarımında uzaktaki ve yüklenen görseller `public/images` içine
   alınır; site bağımsız olarak yayınlanabilir.

## Denetimler

```bash
npm run test:sektorler
npm run lint
npm run build
```

Sektör denetimi 36 sektörün tek ve çok sayfalı yapılarını; sayfa rolleri,
sluglar, bağlantılar, form profilleri, görsel havuzları ve şablon sürümünü
kontrol eder.

## Ortam değişkenleri

Görseller için API anahtarı gerekmez. `.env.local.example` içinde GitHub
aktarımı ve isteğe bağlı OpenAI içerik ayarları bulunur.
