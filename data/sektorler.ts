export interface Sektor {
  id: string;
  ad: string;
  kategori: string;
}

// Kullanıcının satış yaptığı alanlara odaklanan uzman sektör listesi.
// Hazır içerik paketleri, formlar ve başlangıç sayfaları bu alanlar için korunur.
export const sektorler: Sektor[] = [
  { id: "kuafor", ad: "Kuaför", kategori: "Güzellik ve Bakım" },
  { id: "nakliyat", ad: "Nakliyat", kategori: "Ulaşım ve Taşıma" },
  { id: "tesisatci", ad: "Tesisatçı", kategori: "Teknik Servis" },
  { id: "elektrikci", ad: "Elektrikçi", kategori: "Teknik Servis" },
  { id: "oto-yikama", ad: "Oto Yıkama", kategori: "Otomotiv" },
  { id: "hali-yikama", ad: "Halı Yıkama", kategori: "Temizlik ve Hijyen" },
  { id: "temizlik", ad: "Temizlik Şirketi", kategori: "Temizlik ve Hijyen" },
  { id: "arac-kiralama", ad: "Araç Kiralama", kategori: "Ulaşım ve Taşıma" },
  { id: "transfer", ad: "VIP Transfer", kategori: "Ulaşım ve Taşıma" },
  { id: "mobilya", ad: "Mobilya ve Özel Üretim", kategori: "Mobilya" },
];
