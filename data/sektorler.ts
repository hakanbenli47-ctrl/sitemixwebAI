export interface Sektor {
  id: string;
  ad: string;
  kategori: string;
}

// İşletme Bulucu'da web sitesi satışı için kullanılan gerçek hedef liste.
// Sıra, satış ekranındaki sektör sırasıyla aynı tutulur.
export const sektorler: Sektor[] = [
  { id: "oto-yikama", ad: "Oto Yıkama", kategori: "Otomotiv" },
  { id: "oto-detaylandirma", ad: "Oto Detaylandırma", kategori: "Otomotiv" },
  { id: "arac-kaplama", ad: "Araç Kaplama", kategori: "Otomotiv" },
  { id: "cam-balkon", ad: "Cam Balkon", kategori: "Yapı ve Uygulama" },
  { id: "tente", ad: "Tente", kategori: "Yapı ve Uygulama" },
  { id: "tadilat", ad: "Tadilat", kategori: "Yapı ve Uygulama" },
  { id: "dekorasyon", ad: "Dekorasyon", kategori: "Yapı ve Uygulama" },
  { id: "temizlik", ad: "Temizlik Şirketi", kategori: "Temizlik ve Hijyen" },
  { id: "koltuk-yikama", ad: "Koltuk Yıkama", kategori: "Temizlik ve Hijyen" },
  { id: "hali-yikama", ad: "Halı Yıkama", kategori: "Temizlik ve Hijyen" },
  { id: "ilaclama", ad: "İlaçlama", kategori: "Temizlik ve Hijyen" },
  { id: "guzellik-salonu", ad: "Güzellik Salonu", kategori: "Güzellik ve Bakım" },
  { id: "kuafor", ad: "Kuaför", kategori: "Güzellik ve Bakım" },
  { id: "berber", ad: "Berber", kategori: "Güzellik ve Bakım" },
  { id: "diyetisyen", ad: "Diyetisyen", kategori: "Sağlık ve Danışmanlık" },
  { id: "psikolog", ad: "Psikolog", kategori: "Sağlık ve Danışmanlık" },
  { id: "fizyoterapist", ad: "Fizyoterapist", kategori: "Sağlık ve Danışmanlık" },
  { id: "dis-klinigi", ad: "Diş Kliniği", kategori: "Sağlık ve Danışmanlık" },
  { id: "veteriner", ad: "Veteriner Kliniği", kategori: "Sağlık ve Danışmanlık" },
  { id: "emlak", ad: "Emlak Danışmanı", kategori: "Gayrimenkul ve Tasarım" },
  { id: "mimarlik", ad: "Mimarlık Ofisi", kategori: "Gayrimenkul ve Tasarım" },
  { id: "fotografci", ad: "Fotoğrafçı", kategori: "Etkinlik ve Yaratıcı İşler" },
  { id: "dugun-salonu", ad: "Düğün Salonu", kategori: "Etkinlik ve Yaratıcı İşler" },
  { id: "spor-salonu", ad: "Spor Salonu", kategori: "Eğitim ve Spor" },
  { id: "anaokulu", ad: "Anaokulu", kategori: "Eğitim ve Spor" },
  { id: "ozel-egitim-kursu", ad: "Özel Eğitim Kursu", kategori: "Eğitim ve Spor" },
  { id: "matbaa", ad: "Matbaa", kategori: "Üretim ve Perakende" },
  { id: "cicekci", ad: "Çiçekçi", kategori: "Üretim ve Perakende" },
  { id: "pastane", ad: "Pastane", kategori: "Üretim ve Perakende" },
  { id: "mobilya", ad: "Mobilyacı", kategori: "Üretim ve Perakende" },
  { id: "elektrikci", ad: "Elektrikçi", kategori: "Teknik Servis" },
  { id: "tesisatci", ad: "Tesisatçı", kategori: "Teknik Servis" },
  { id: "kombi-servisi", ad: "Kombi Servisi", kategori: "Teknik Servis" },
  { id: "nakliyat", ad: "Nakliyat", kategori: "Ulaşım ve Taşıma" },
  { id: "transfer", ad: "Transfer", kategori: "Ulaşım ve Taşıma" },
  { id: "arac-kiralama", ad: "Araç Kiralama", kategori: "Ulaşım ve Taşıma" },
];
