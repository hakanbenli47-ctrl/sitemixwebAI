export type SektorHareketi = "akiskan" | "donen" | "nabiz" | "salinan";

export interface SektorSahneDili {
  hareket: SektorHareketi;
  etiket: string;
  motif: string;
}

export const SECILI_IS_GORSEL_LIMITI = 4;

const sektorDilleri: Record<string, SektorSahneDili> = {
  "oto-yikama": { hareket: "akiskan", etiket: "Temiz yüzey", motif: "akış, koruma ve parlaklık" },
  "oto-detaylandirma": { hareket: "salinan", etiket: "Detay işçiliği", motif: "hassas yüzey ve kusursuz sonuç" },
  "arac-kaplama": { hareket: "donen", etiket: "Katmanlı koruma", motif: "film, yüzey ve uygulama" },
  "cam-balkon": { hareket: "salinan", etiket: "Şeffaf mekân", motif: "mimari çizgi ve ölçü" },
  tente: { hareket: "donen", etiket: "Akıllı gölge", motif: "ışık, gölge ve konfor" },
  tadilat: { hareket: "nabiz", etiket: "Planlı dönüşüm", motif: "ölçü, uygulama ve teslim" },
  dekorasyon: { hareket: "salinan", etiket: "Mekân karakteri", motif: "form, doku ve denge" },
  temizlik: { hareket: "akiskan", etiket: "Hijyen standardı", motif: "temiz ritim ve güven" },
  "koltuk-yikama": { hareket: "akiskan", etiket: "Kumaş bakımı", motif: "lif, leke ve temizlik" },
  "hali-yikama": { hareket: "akiskan", etiket: "Kontrollü yıkama", motif: "doku, süreç ve teslim" },
  ilaclama: { hareket: "nabiz", etiket: "Güvenli müdahale", motif: "koruma, kontrol ve takip" },
  "guzellik-salonu": { hareket: "salinan", etiket: "Bakım ritüeli", motif: "zarafet, bakım ve sonuç" },
  kuafor: { hareket: "salinan", etiket: "Stil imzası", motif: "kesim, renk ve hareket" },
  berber: { hareket: "nabiz", etiket: "Usta dokunuşu", motif: "keskin çizgi ve gelenek" },
  diyetisyen: { hareket: "akiskan", etiket: "Dengeli yaşam", motif: "denge, takip ve gelişim" },
  psikolog: { hareket: "nabiz", etiket: "Güvenli görüşme", motif: "sakinlik, mahremiyet ve güven" },
  fizyoterapist: { hareket: "akiskan", etiket: "Hareket planı", motif: "ilerleme, denge ve takip" },
  "dis-klinigi": { hareket: "nabiz", etiket: "Klinik güven", motif: "temiz, ölçülü ve uzman" },
  veteriner: { hareket: "salinan", etiket: "Dost sağlığı", motif: "şefkat, bakım ve erişim" },
  emlak: { hareket: "salinan", etiket: "Doğru portföy", motif: "konum, değer ve güven" },
  mimarlik: { hareket: "donen", etiket: "Mimari yaklaşım", motif: "ızgara, oran ve bağlam" },
  fotografci: { hareket: "donen", etiket: "Görsel hikâye", motif: "odak, kadraj ve anlatı" },
  "dugun-salonu": { hareket: "salinan", etiket: "Davet atmosferi", motif: "kutlama, ritim ve plan" },
  "spor-salonu": { hareket: "nabiz", etiket: "Performans alanı", motif: "enerji, tempo ve gelişim" },
  anaokulu: { hareket: "salinan", etiket: "Güvenli gelişim", motif: "oyun, keşif ve güven" },
  "ozel-egitim-kursu": { hareket: "akiskan", etiket: "Öğrenme yolu", motif: "seviye, kazanım ve ilerleme" },
  matbaa: { hareket: "donen", etiket: "Baskı sistemi", motif: "renk, katman ve üretim" },
  cicekci: { hareket: "salinan", etiket: "Taze aranjman", motif: "doğal form ve teslim" },
  pastane: { hareket: "salinan", etiket: "Butik lezzet", motif: "katman, tat ve kutlama" },
  mobilya: { hareket: "salinan", etiket: "Usta üretim", motif: "malzeme, ölçü ve işçilik" },
  elektrikci: { hareket: "nabiz", etiket: "Güvenli enerji", motif: "akım, kontrol ve müdahale" },
  tesisatci: { hareket: "akiskan", etiket: "Yerinde çözüm", motif: "akış, tespit ve onarım" },
  "kombi-servisi": { hareket: "nabiz", etiket: "Teknik ısı", motif: "ısı, bakım ve kontrol" },
  nakliyat: { hareket: "akiskan", etiket: "Planlı taşıma", motif: "rota, güven ve teslim" },
  transfer: { hareket: "akiskan", etiket: "Kesintisiz rota", motif: "konum, zaman ve konfor" },
  "arac-kiralama": { hareket: "salinan", etiket: "Kolay kiralama", motif: "araç, erişim ve rota" },
};

const varsayilanDil: SektorSahneDili = {
  hareket: "akiskan",
  etiket: "Profesyonel hizmet",
  motif: "güven, süreç ve hareket",
};

export function sektorSahneDiliniGetir(sektor: string) {
  return sektorDilleri[sektor] ?? varsayilanDil;
}

export function sektorSahneDiliKaydiVarMi(sektor: string) {
  return Object.hasOwn(sektorDilleri, sektor);
}
