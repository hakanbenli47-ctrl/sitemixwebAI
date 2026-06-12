# Sitemix Studio — Ücretsiz Stok Görsel Güncellemesi

## Değiştirilecek dosyalar

- `app/studio/yeni/page.tsx`
- `app/api/github/aktar/route.ts`
- `app/api/studio/otomatik-olustur/route.ts`
- `components/site/SiteGorunumu.tsx`
- `components/site/siteGorunumu.module.css`
- `data/sektorSablonlari.ts`
- `types/proje.ts`

## Eklenecek yeni dosya

- `data/sektorStokGorselleri.ts`

## Çalışma şekli

1. Yeni projede firma, sektör, şehir, ilçe ve hizmet bölgesi girilir.
2. Sektör ve konuma özel hazır içerikler oluşturulur.
3. OpenAI ayarları eklenmişse mevcut içerikler daha ayrıntılı biçimde yeniden yazılır; zorunlu değildir.
4. Kullanıcı görsel yüklediyse o görsel korunur.
5. Boş görsel alanlarına sektör grubuna ait sabit ücretsiz stok görseller eklenir.
6. Görseller için Pexels veya başka bir API anahtarı gerekmez.
7. GitHub aktarımında uzaktaki stok görseller ve yüklenen görseller `public/images` klasörüne alınır.
8. Müşteri değişiklik isterse içerik düzenleyicisinden istenen görsel veya metin değiştirilebilir.

## Ortam değişkenleri

Görseller için ek ortam değişkeni yoktur. `.env.local.example` dosyasında yalnızca GitHub ayarları ve isteğe bağlı içerik ayarları bulunur.
