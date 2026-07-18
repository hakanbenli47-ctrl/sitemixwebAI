export type SektorIkonu =
  | "activity"
  | "apple"
  | "armchair"
  | "baby"
  | "book"
  | "brain"
  | "building"
  | "cake"
  | "camera"
  | "car"
  | "dumbbell"
  | "droplets"
  | "flame"
  | "flower"
  | "graduation"
  | "hammer"
  | "heart"
  | "house"
  | "key"
  | "layers"
  | "map"
  | "paw"
  | "printer"
  | "route"
  | "ruler"
  | "scissors"
  | "shapes"
  | "shield"
  | "sparkles"
  | "stethoscope"
  | "sun"
  | "truck"
  | "wand"
  | "wrench"
  | "zap";

export type SektorHareketi = "akiskan" | "donen" | "nabiz" | "salinan";

export interface SektorGorselDili {
  anaIkon: SektorIkonu;
  destekIkonlari: [SektorIkonu, SektorIkonu, SektorIkonu];
  hareket: SektorHareketi;
  etiket: string;
  motif: string;
}

export const SECILI_IS_GORSEL_LIMITI = 4;

const sektorDilleri: Record<string, SektorGorselDili> = {
  "oto-yikama": { anaIkon: "car", destekIkonlari: ["droplets", "sparkles", "shield"], hareket: "akiskan", etiket: "Temiz yüzey", motif: "akış ve parlaklık" },
  "oto-detaylandirma": { anaIkon: "sparkles", destekIkonlari: ["car", "shield", "wand"], hareket: "salinan", etiket: "Detay işçiliği", motif: "hassas yüzeyler" },
  "arac-kaplama": { anaIkon: "layers", destekIkonlari: ["car", "shield", "wand"], hareket: "donen", etiket: "Katmanlı koruma", motif: "film ve yüzey" },
  "cam-balkon": { anaIkon: "building", destekIkonlari: ["layers", "ruler", "sun"], hareket: "salinan", etiket: "Şeffaf mekân", motif: "mimari çizgiler" },
  tente: { anaIkon: "sun", destekIkonlari: ["layers", "ruler", "shield"], hareket: "donen", etiket: "Akıllı gölge", motif: "ışık ve gölge" },
  tadilat: { anaIkon: "hammer", destekIkonlari: ["ruler", "house", "layers"], hareket: "nabiz", etiket: "Planlı dönüşüm", motif: "ölçü ve uygulama" },
  dekorasyon: { anaIkon: "armchair", destekIkonlari: ["wand", "house", "layers"], hareket: "salinan", etiket: "Mekân karakteri", motif: "form ve doku" },
  temizlik: { anaIkon: "sparkles", destekIkonlari: ["droplets", "shield", "wand"], hareket: "akiskan", etiket: "Hijyen standardı", motif: "temiz ritim" },
  "koltuk-yikama": { anaIkon: "armchair", destekIkonlari: ["droplets", "sparkles", "shield"], hareket: "akiskan", etiket: "Kumaş bakımı", motif: "lif ve temizlik" },
  "hali-yikama": { anaIkon: "layers", destekIkonlari: ["droplets", "sparkles", "route"], hareket: "akiskan", etiket: "Kontrollü yıkama", motif: "doku ve süreç" },
  ilaclama: { anaIkon: "shield", destekIkonlari: ["sparkles", "house", "activity"], hareket: "nabiz", etiket: "Güvenli müdahale", motif: "koruma halkaları" },
  "guzellik-salonu": { anaIkon: "wand", destekIkonlari: ["sparkles", "flower", "heart"], hareket: "salinan", etiket: "Bakım ritüeli", motif: "ışıltı ve zarafet" },
  kuafor: { anaIkon: "scissors", destekIkonlari: ["sparkles", "wand", "heart"], hareket: "salinan", etiket: "Stil imzası", motif: "kesim ve hareket" },
  berber: { anaIkon: "scissors", destekIkonlari: ["sparkles", "shield", "wand"], hareket: "nabiz", etiket: "Usta dokunuşu", motif: "keskin çizgiler" },
  diyetisyen: { anaIkon: "apple", destekIkonlari: ["activity", "heart", "sparkles"], hareket: "akiskan", etiket: "Dengeli yaşam", motif: "denge ve gelişim" },
  psikolog: { anaIkon: "brain", destekIkonlari: ["heart", "activity", "sparkles"], hareket: "nabiz", etiket: "Güvenli görüşme", motif: "sakin halkalar" },
  fizyoterapist: { anaIkon: "activity", destekIkonlari: ["heart", "shield", "sparkles"], hareket: "akiskan", etiket: "Hareket planı", motif: "ilerleme ve denge" },
  "dis-klinigi": { anaIkon: "stethoscope", destekIkonlari: ["sparkles", "shield", "heart"], hareket: "nabiz", etiket: "Klinik güven", motif: "temiz ve ölçülü" },
  veteriner: { anaIkon: "paw", destekIkonlari: ["heart", "stethoscope", "shield"], hareket: "salinan", etiket: "Dost sağlığı", motif: "şefkat ve bakım" },
  emlak: { anaIkon: "key", destekIkonlari: ["house", "map", "building"], hareket: "salinan", etiket: "Doğru portföy", motif: "konum ve değer" },
  mimarlik: { anaIkon: "ruler", destekIkonlari: ["building", "layers", "house"], hareket: "donen", etiket: "Mimari yaklaşım", motif: "ızgara ve oran" },
  fotografci: { anaIkon: "camera", destekIkonlari: ["sparkles", "heart", "wand"], hareket: "donen", etiket: "Görsel hikâye", motif: "odak ve kadraj" },
  "dugun-salonu": { anaIkon: "heart", destekIkonlari: ["sparkles", "flower", "cake"], hareket: "salinan", etiket: "Davet atmosferi", motif: "kutlama ve ritim" },
  "spor-salonu": { anaIkon: "dumbbell", destekIkonlari: ["activity", "heart", "zap"], hareket: "nabiz", etiket: "Performans alanı", motif: "enerji ve tempo" },
  anaokulu: { anaIkon: "baby", destekIkonlari: ["shapes", "heart", "sparkles"], hareket: "salinan", etiket: "Güvenli gelişim", motif: "oyun ve keşif" },
  "ozel-egitim-kursu": { anaIkon: "graduation", destekIkonlari: ["book", "shapes", "sparkles"], hareket: "akiskan", etiket: "Öğrenme yolu", motif: "seviye ve kazanım" },
  matbaa: { anaIkon: "printer", destekIkonlari: ["layers", "shapes", "wand"], hareket: "donen", etiket: "Baskı sistemi", motif: "renk ve katman" },
  cicekci: { anaIkon: "flower", destekIkonlari: ["heart", "sparkles", "route"], hareket: "salinan", etiket: "Taze aranjman", motif: "doğal formlar" },
  pastane: { anaIkon: "cake", destekIkonlari: ["heart", "sparkles", "wand"], hareket: "salinan", etiket: "Butik lezzet", motif: "katman ve kutlama" },
  mobilya: { anaIkon: "armchair", destekIkonlari: ["ruler", "hammer", "layers"], hareket: "salinan", etiket: "Usta üretim", motif: "malzeme ve ölçü" },
  elektrikci: { anaIkon: "zap", destekIkonlari: ["shield", "wrench", "house"], hareket: "nabiz", etiket: "Güvenli enerji", motif: "akım ve kontrol" },
  tesisatci: { anaIkon: "droplets", destekIkonlari: ["wrench", "shield", "house"], hareket: "akiskan", etiket: "Yerinde çözüm", motif: "akış ve müdahale" },
  "kombi-servisi": { anaIkon: "flame", destekIkonlari: ["wrench", "shield", "activity"], hareket: "nabiz", etiket: "Teknik ısı", motif: "ısı ve kontrol" },
  nakliyat: { anaIkon: "truck", destekIkonlari: ["route", "shield", "house"], hareket: "akiskan", etiket: "Planlı taşıma", motif: "rota ve teslim" },
  transfer: { anaIkon: "route", destekIkonlari: ["car", "map", "shield"], hareket: "akiskan", etiket: "Kesintisiz rota", motif: "konum ve zaman" },
  "arac-kiralama": { anaIkon: "car", destekIkonlari: ["key", "route", "shield"], hareket: "salinan", etiket: "Kolay kiralama", motif: "araç ve erişim" },
};

const varsayilanDil: SektorGorselDili = {
  anaIkon: "sparkles",
  destekIkonlari: ["shield", "activity", "wand"],
  hareket: "akiskan",
  etiket: "Profesyonel hizmet",
  motif: "güven ve hareket",
};

export function sektorGorselDiliniGetir(sektor: string) {
  return sektorDilleri[sektor] ?? varsayilanDil;
}

export function sektorGorselDiliKaydiVarMi(sektor: string) {
  return Object.hasOwn(sektorDilleri, sektor);
}
