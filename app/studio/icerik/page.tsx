"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  Eye,
  EyeOff,
  FileImage,
  FileText,
  ImagePlus,
  MessageCircle,
  Phone,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import {
  type ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./icerik.module.css";
import type {
  ButonVerisi,
  ListeElemani,
  SiteBolumu,
  SiteSayfasi,
} from "@/data/sektorSablonlari";
import type { ProjeVerisi } from "@/types/proje";

const sayfaOncelikleri: Record<string, number> = {
  "": 0,
  ana: 0,
  anasayfa: 0,
  "ana-sayfa": 0,
  hakkimizda: 10,
  hizmetler: 20,
  hizmetlerimiz: 20,
  menu: 20,
  urunler: 20,
  ilanlar: 20,
  odalar: 20,
  uzmanlarimiz: 30,
  uzmanlar: 30,
  ekip: 30,
  ekibimiz: 30,
  galeri: 40,
  projeler: 40,
  portfolyo: 40,
  randevu: 50,
  rezervasyon: 50,
  iletisim: 90,
  "bize-ulasin": 90,
};

const bolumOncelikleri: Record<SiteBolumu["tur"], number> = {
  hero: 0,
  metin: 10,
  hizmetler: 20,
  urunler: 20,
  "neden-biz": 30,
  istatistik: 40,
  galeri: 50,
  yorumlar: 60,
  ekip: 70,
  fiyatlar: 80,
  sss: 90,
  iletisim: 100,
  harita: 110,
  form: 120,
  video: 130,
  ozel: 140,
};

const listeDestekleyenBolumler: SiteBolumu["tur"][] = [
  "hizmetler",
  "urunler",
  "galeri",
  "ekip",
  "yorumlar",
  "fiyatlar",
  "sss",
  "neden-biz",
  "istatistik",
];

const topluIcerikSablonu = `Sayfa: Ana Sayfa
Bölüm: Açılış alanı
Küçük başlık: Antalya web tasarım ve dijital sistem
Ana başlık: İşletmenize özel hızlı ve güvenilir web sitesi
Açıklama: Firmanız için mobil uyumlu, WhatsApp bağlantılı ve müşterinin kolayca iletişime geçebileceği profesyonel web sitesi hazırlanır.
Buton: WhatsApp'tan bilgi al | https://wa.me/905000000000
Buton: Hizmetleri incele | /hizmetler

Sayfa: Ana Sayfa
Bölüm: Hakkımızda
Küçük başlık: Hakkımızda
Ana başlık: İşletmenizi internette daha güçlü gösteriyoruz
Açıklama: Sizi doğru anlatan, güven veren ve ziyaretçiyi iletişime yönlendiren sade ama etkili web siteleri hazırlarız.

Sayfa: Hizmetler
Bölüm: Hizmetler
Ana başlık: Hizmetlerimiz
Açıklama: İşletmenizin ihtiyacına göre hazırlanan temel hizmetleri inceleyin.
Hizmetler:
- Tek sayfa web sitesi | Küçük işletmeler için hızlı, mobil uyumlu ve net tanıtım sitesi.
- Çok sayfalı web sitesi | Hizmet, galeri, hakkımızda ve iletişim sayfalarıyla daha kapsamlı yapı.
- WhatsApp ve arama butonları | Ziyaretçinin tek dokunuşla size ulaşmasını sağlar.
- Google uyumlu temel yapı | Başlık, açıklama ve sayfa düzeni arama görünürlüğü düşünülerek hazırlanır.

Sayfa: İletişim
Bölüm: İletişim
Ana başlık: Hemen iletişime geçin
Açıklama: Web sitesi, demo çalışma veya fiyat bilgisi için bize WhatsApp üzerinden yazabilirsiniz.`;

interface TopluIcerikBloku {
  sayfa?: string;
  bolum?: string;
  alanlar: Partial<
    Pick<SiteBolumu, "ustBaslik" | "baslik" | "aciklama">
  >;
  butonlar: Array<Pick<ButonVerisi, "metin" | "baglanti">>;
  listeElemanlari: Array<
    Pick<ListeElemani, "baslik" | "aciklama" | "baglanti">
  >;
}

interface GorselHedefi {
  sayfaId: string;
  bolumId: string;
  elemanId?: string;
  alan: "gorsel" | "arkaPlanGorseli" | "listeGorseli";
  etiket: string;
  dolu: boolean;
}

function idOlustur() {
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    typeof window.crypto.randomUUID === "function"
  ) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function slugOlustur(metin: string) {
  return metin
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function telefonTemizle(telefon: string) {
  return telefon.replace(/[^\d+]/g, "");
}

function whatsappTemizle(telefon: string) {
  let temizNumara = telefon.replace(/\D/g, "");

  if (temizNumara.startsWith("0")) {
    temizNumara = `90${temizNumara.slice(1)}`;
  }

  return temizNumara;
}

function bolumAdi(tur: SiteBolumu["tur"]) {
  const adlar: Record<SiteBolumu["tur"], string> = {
    hero: "Açılış alanı",
    metin: "Hakkımızda / Metin alanı",
    hizmetler: "Hizmetler",
    urunler: "Ürünler",
    galeri: "Galeri",
    istatistik: "İstatistikler",
    "neden-biz": "Neden biz",
    yorumlar: "Müşteri yorumları",
    ekip: "Ekip",
    fiyatlar: "Fiyatlar",
    sss: "Sık sorulan sorular",
    iletisim: "İletişim",
    harita: "Harita",
    form: "Form",
    video: "Video",
    ozel: "Özel içerik",
  };

  return adlar[tur];
}

function sayfalariSirala(sayfalar: SiteSayfasi[]) {
  return [...sayfalar]
    .sort((a, b) => {
      if (a.anaSayfa && !b.anaSayfa) {
        return -1;
      }

      if (!a.anaSayfa && b.anaSayfa) {
        return 1;
      }

      const aAnahtar = slugOlustur(a.slug || a.ad);
      const bAnahtar = slugOlustur(b.slug || b.ad);

      const aOncelik =
        sayfaOncelikleri[aAnahtar] ??
        sayfaOncelikleri[slugOlustur(a.ad)] ??
        60;

      const bOncelik =
        sayfaOncelikleri[bAnahtar] ??
        sayfaOncelikleri[slugOlustur(b.ad)] ??
        60;

      if (aOncelik !== bOncelik) {
        return aOncelik - bOncelik;
      }

      return a.sira - b.sira;
    })
    .map((sayfa, index) => ({
      ...sayfa,
      sira: index,
    }));
}

function bolumleriSirala(bolumler: SiteBolumu[]) {
  return [...bolumler]
    .sort((a, b) => {
      const aOncelik = bolumOncelikleri[a.tur];
      const bOncelik = bolumOncelikleri[b.tur];

      if (aOncelik !== bOncelik) {
        return aOncelik - bOncelik;
      }

      return a.sira - b.sira;
    })
    .map((bolum, index) => ({
      ...bolum,
      sira: index,
    }));
}

function butonVarMi(
  butonlar: ButonVerisi[],
  kontrol: (buton: ButonVerisi) => boolean,
) {
  return butonlar.some(kontrol);
}

function anaSayfaButonlariniOlustur(
  proje: ProjeVerisi,
  mevcutButonlar: ButonVerisi[],
) {
  const butonlar = [...mevcutButonlar];

  if (
    proje.whatsapp.trim() &&
    !butonVarMi(
      butonlar,
      (buton) =>
        buton.baglanti.includes("wa.me") ||
        slugOlustur(buton.metin).includes("whatsapp"),
    )
  ) {
    butonlar.unshift({
      id: idOlustur(),
      metin: "WhatsApp’tan ulaşın",
      baglanti: `https://wa.me/${whatsappTemizle(proje.whatsapp)}`,
    });
  }

  if (
    proje.telefon.trim() &&
    !butonVarMi(
      butonlar,
      (buton) =>
        buton.baglanti.startsWith("tel:") ||
        slugOlustur(buton.metin).includes("telefon"),
    )
  ) {
    const whatsappIndex = butonlar.findIndex(
      (buton) =>
        buton.baglanti.includes("wa.me") ||
        slugOlustur(buton.metin).includes("whatsapp"),
    );

    const telefonButonu: ButonVerisi = {
      id: idOlustur(),
      metin: "Telefonla arayın",
      baglanti: `tel:${telefonTemizle(proje.telefon)}`,
    };

    if (whatsappIndex >= 0) {
      butonlar.splice(whatsappIndex + 1, 0, telefonButonu);
    } else {
      butonlar.unshift(telefonButonu);
    }
  }

  if (
    !butonVarMi(
      butonlar,
      (buton) =>
        buton.baglanti.includes("hizmet") ||
        slugOlustur(buton.metin).includes("hizmet"),
    )
  ) {
    butonlar.push({
      id: idOlustur(),
      metin: "Hizmetleri inceleyin",
      baglanti: "/hizmetler",
    });
  }

  return butonlar;
}

function projeyiDuzenle(proje: ProjeVerisi): ProjeVerisi {
  const siraliSayfalar = sayfalariSirala(proje.sayfalar).map((sayfa) => ({
    ...sayfa,
    bolumler: bolumleriSirala(sayfa.bolumler),
  }));

  const anaSayfa =
    siraliSayfalar.find((sayfa) => sayfa.anaSayfa) ??
    siraliSayfalar.find((sayfa) => !sayfa.slug.trim()) ??
    siraliSayfalar[0];

  const guncelSayfalar = siraliSayfalar.map((sayfa) => {
    if (!anaSayfa || sayfa.id !== anaSayfa.id) {
      return sayfa;
    }

    const heroBolumu =
      sayfa.bolumler.find((bolum) => bolum.tur === "hero") ?? null;

    if (!heroBolumu) {
      return sayfa;
    }

    return {
      ...sayfa,
      bolumler: sayfa.bolumler.map((bolum) =>
        bolum.id === heroBolumu.id
          ? {
              ...bolum,
              butonlar: anaSayfaButonlariniOlustur(
                proje,
                Array.isArray(bolum.butonlar) ? bolum.butonlar : [],
              ),
            }
          : bolum,
      ),
    };
  });

  return {
    ...proje,
    sayfalar: guncelSayfalar,
    guncellenmeTarihi: new Date().toISOString(),
  };
}

async function gorseliKucult(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Geçerli bir görsel seçmelisin."));
      return;
    }

    const okuyucu = new FileReader();

    okuyucu.onload = () => {
      const resim = new Image();

      resim.onload = () => {
        const enFazlaGenislik = 1600;
        const enFazlaYukseklik = 1200;

        let genislik = resim.width;
        let yukseklik = resim.height;

        const oran = Math.min(
          enFazlaGenislik / genislik,
          enFazlaYukseklik / yukseklik,
          1,
        );

        genislik = Math.round(genislik * oran);
        yukseklik = Math.round(yukseklik * oran);

        const canvas = document.createElement("canvas");

        canvas.width = genislik;
        canvas.height = yukseklik;

        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Görsel işlenemedi."));
          return;
        }

        context.drawImage(resim, 0, 0, genislik, yukseklik);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };

      resim.onerror = () => {
        reject(new Error("Görsel açılamadı."));
      };

      resim.src = String(okuyucu.result);
    };

    okuyucu.onerror = () => {
      reject(new Error("Dosya okunamadı."));
    };

    okuyucu.readAsDataURL(file);
  });
}

function blokBosMu(blok: TopluIcerikBloku) {
  return (
    !blok.sayfa?.trim() &&
    !blok.bolum?.trim() &&
    !blok.alanlar.ustBaslik?.trim() &&
    !blok.alanlar.baslik?.trim() &&
    !blok.alanlar.aciklama?.trim() &&
    blok.butonlar.length === 0 &&
    blok.listeElemanlari.length === 0
  );
}

function yeniTopluBlok(
  sayfa?: string,
  bolum?: string,
): TopluIcerikBloku {
  return {
    sayfa,
    bolum,
    alanlar: {},
    butonlar: [],
    listeElemanlari: [],
  };
}

function parcalariAyir(deger: string) {
  return deger
    .split("|")
    .map((parca) => parca.trim())
    .filter(Boolean);
}

function listeElemaniCoz(deger: string) {
  const temiz = deger.replace(/^[-•*]\s*/, "").trim();
  const [baslik = "", aciklama = "", baglanti = ""] = parcalariAyir(temiz);

  if (!baslik.trim()) {
    return null;
  }

  return {
    baslik: baslik.trim(),
    aciklama: aciklama.trim(),
    baglanti: baglanti.trim(),
  };
}

function butonCoz(deger: string) {
  const [metin = "", baglanti = ""] = parcalariAyir(deger);

  if (!metin.trim()) {
    return null;
  }

  return {
    metin: metin.trim(),
    baglanti: baglanti.trim(),
  };
}

function topluIcerigiCozumle(metin: string) {
  const bloklar: TopluIcerikBloku[] = [];
  let aktifBlok = yeniTopluBlok();
  let listeModu = false;

  function aktifBlokuBitir() {
    if (!blokBosMu(aktifBlok)) {
      bloklar.push(aktifBlok);
    }
  }

  metin
    .split("\n")
    .map((satir) => satir.trim())
    .forEach((satir) => {
      if (!satir) {
        return;
      }

      const ayiriciIndex = satir.indexOf(":");
      const hamAnahtar = ayiriciIndex >= 0 ? satir.slice(0, ayiriciIndex) : "";
      const deger = ayiriciIndex >= 0 ? satir.slice(ayiriciIndex + 1).trim() : satir;
      const anahtar = slugOlustur(hamAnahtar);

      if (["sayfa", "page"].includes(anahtar)) {
        if (!blokBosMu(aktifBlok) && aktifBlok.bolum) {
          aktifBlokuBitir();
          aktifBlok = yeniTopluBlok(deger);
        } else {
          aktifBlok.sayfa = deger;
        }

        listeModu = false;
        return;
      }

      if (["bolum", "bolum-adi", "alan", "section"].includes(anahtar)) {
        if (!blokBosMu(aktifBlok) && aktifBlok.bolum) {
          const oncekiSayfa = aktifBlok.sayfa;
          aktifBlokuBitir();
          aktifBlok = yeniTopluBlok(oncekiSayfa, deger);
        } else {
          aktifBlok.bolum = deger;
        }

        listeModu = false;
        return;
      }

      if (["kucuk-baslik", "ust-baslik", "etiket"].includes(anahtar)) {
        aktifBlok.alanlar.ustBaslik = deger;
        listeModu = false;
        return;
      }

      if (["baslik", "ana-baslik", "title"].includes(anahtar)) {
        aktifBlok.alanlar.baslik = deger;
        listeModu = false;
        return;
      }

      if (["aciklama", "metin", "paragraf", "description"].includes(anahtar)) {
        aktifBlok.alanlar.aciklama = deger;
        listeModu = false;
        return;
      }

      if (["buton", "button", "cta"].includes(anahtar)) {
        const buton = butonCoz(deger);

        if (buton) {
          aktifBlok.butonlar.push(buton);
        }

        listeModu = false;
        return;
      }

      if (
        [
          "liste",
          "icerikler",
          "icerik",
          "hizmetler",
          "hizmet",
          "urunler",
          "urun",
          "galeri",
          "referanslar",
          "yorumlar",
          "ekip",
          "fiyatlar",
          "sss",
        ].includes(anahtar)
      ) {
        const eleman = listeElemaniCoz(deger);

        if (eleman) {
          aktifBlok.listeElemanlari.push(eleman);
        }

        listeModu = true;
        return;
      }

      if (satir.startsWith("-") || satir.startsWith("•") || listeModu) {
        const eleman = listeElemaniCoz(satir);

        if (eleman) {
          aktifBlok.listeElemanlari.push(eleman);
        }
      }
    });

  aktifBlokuBitir();

  return bloklar;
}

function sayfaEslesir(sayfa: SiteSayfasi, aranan: string) {
  const arananAnahtar = slugOlustur(aranan);

  if (!arananAnahtar) {
    return sayfa.anaSayfa || !sayfa.slug.trim();
  }

  if (
    ["ana", "anasayfa", "ana-sayfa", "home"].includes(arananAnahtar) &&
    (sayfa.anaSayfa || !sayfa.slug.trim())
  ) {
    return true;
  }

  return [sayfa.ad, sayfa.menuBasligi, sayfa.slug]
    .map((deger) => slugOlustur(deger || ""))
    .includes(arananAnahtar);
}

function bolumEslesir(bolum: SiteBolumu, aranan: string) {
  const arananAnahtar = slugOlustur(aranan);

  if (!arananAnahtar) {
    return false;
  }

  const dogrudanAnahtarlar = [
    bolum.tur,
    bolumAdi(bolum.tur),
    bolum.ustBaslik,
    bolum.baslik,
    bolum.varyasyon,
  ].map((deger) => slugOlustur(deger || ""));

  if (dogrudanAnahtarlar.includes(arananAnahtar)) {
    return true;
  }

  if (["acilis", "acilis-alani", "hero", "giris", "ilk-alan"].includes(arananAnahtar)) {
    return bolum.tur === "hero";
  }

  if (["hakkimizda", "metin", "metin-alani"].includes(arananAnahtar)) {
    return bolum.tur === "metin";
  }

  if (["hizmet", "hizmetler", "hizmetlerimiz"].includes(arananAnahtar)) {
    return bolum.tur === "hizmetler";
  }

  if (["urun", "urunler", "menu", "ilan", "ilanlar", "odalar"].includes(arananAnahtar)) {
    return bolum.tur === "urunler";
  }

  if (["neden-biz", "neden", "avantajlar"].includes(arananAnahtar)) {
    return bolum.tur === "neden-biz";
  }

  if (["iletisim", "bize-ulasin", "ulasim"].includes(arananAnahtar)) {
    return bolum.tur === "iletisim";
  }

  return false;
}

function gelenButonlariUygula(
  mevcutButonlar: ButonVerisi[],
  gelenButonlar: Array<Pick<ButonVerisi, "metin" | "baglanti">>,
) {
  if (gelenButonlar.length === 0) {
    return mevcutButonlar;
  }

  return gelenButonlar.map((buton, index) => ({
    id: mevcutButonlar[index]?.id ?? idOlustur(),
    metin: buton.metin,
    baglanti: buton.baglanti,
  }));
}

function gelenListeyiUygula(
  mevcutListe: ListeElemani[],
  gelenListe: Array<Pick<ListeElemani, "baslik" | "aciklama" | "baglanti">>,
) {
  if (gelenListe.length === 0) {
    return mevcutListe;
  }

  return gelenListe.map((eleman, index) => ({
    id: mevcutListe[index]?.id ?? idOlustur(),
    baslik: eleman.baslik,
    aciklama: eleman.aciklama,
    baglanti: eleman.baglanti,
    gorsel: mevcutListe[index]?.gorsel ?? "",
  }));
}

function gorselHedefleriniOlustur(
  proje: ProjeVerisi,
  sadeceBosAlanlar: boolean,
  sayfaId?: string,
  bolumId?: string,
) {
  const hedefler: GorselHedefi[] = [];

  sayfalariSirala(proje.sayfalar).forEach((sayfa) => {
    if (sayfaId && sayfa.id !== sayfaId) {
      return;
    }

    bolumleriSirala(sayfa.bolumler).forEach((bolum) => {
      if (bolumId && bolum.id !== bolumId) {
        return;
      }

      const sayfaAdi = sayfa.ad || "Sayfa";
      const bolumEtiketi = bolum.baslik || bolumAdi(bolum.tur);

      if (bolum.tur === "hero" || bolum.tur === "metin") {
        hedefler.push({
          sayfaId: sayfa.id,
          bolumId: bolum.id,
          alan: "arkaPlanGorseli",
          etiket: `${sayfaAdi} / ${bolumEtiketi} / arka plan`,
          dolu: Boolean(bolum.arkaPlanGorseli),
        });
      }

      hedefler.push({
        sayfaId: sayfa.id,
        bolumId: bolum.id,
        alan: "gorsel",
        etiket: `${sayfaAdi} / ${bolumEtiketi} / ana görsel`,
        dolu: Boolean(bolum.gorsel),
      });

      bolum.listeElemanlari.forEach((eleman, index) => {
        hedefler.push({
          sayfaId: sayfa.id,
          bolumId: bolum.id,
          elemanId: eleman.id,
          alan: "listeGorseli",
          etiket: `${sayfaAdi} / ${bolumEtiketi} / ${eleman.baslik || `${index + 1}. içerik`}`,
          dolu: Boolean(eleman.gorsel),
        });
      });
    });
  });

  return sadeceBosAlanlar
    ? hedefler.filter((hedef) => !hedef.dolu)
    : hedefler;
}

function gorseliHedefeYerlestir(
  proje: ProjeVerisi,
  hedef: GorselHedefi,
  gorsel: string,
): ProjeVerisi {
  return {
    ...proje,
    sayfalar: proje.sayfalar.map((sayfa) => {
      if (sayfa.id !== hedef.sayfaId) {
        return sayfa;
      }

      return {
        ...sayfa,
        bolumler: sayfa.bolumler.map((bolum) => {
          if (bolum.id !== hedef.bolumId) {
            return bolum;
          }

          if (hedef.alan === "listeGorseli") {
            return {
              ...bolum,
              listeElemanlari: bolum.listeElemanlari.map((eleman) =>
                eleman.id === hedef.elemanId
                  ? {
                      ...eleman,
                      gorsel,
                    }
                  : eleman,
              ),
            };
          }

          return {
            ...bolum,
            [hedef.alan]: gorsel,
          };
        }),
      };
    }),
  };
}

export default function KolayIcerikDuzenleyici() {
  const router = useRouter();

  const [proje, setProje] = useState<ProjeVerisi | null>(null);
  const [secilenSayfaId, setSecilenSayfaId] = useState("");
  const [secilenBolumId, setSecilenBolumId] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);
  const [kaydedildi, setKaydedildi] = useState(false);
  const [hata, setHata] = useState("");
  const [topluIcerik, setTopluIcerik] = useState("");
  const [topluBilgi, setTopluBilgi] = useState("");

  useEffect(() => {
    const kayit = localStorage.getItem("sitemix-aktif-proje");

    if (!kayit) {
      setYukleniyor(false);
      return;
    }

    try {
      const hamProje = JSON.parse(kayit) as ProjeVerisi;
      const duzenlenmisProje = projeyiDuzenle(hamProje);

      setProje(duzenlenmisProje);

      localStorage.setItem(
        "sitemix-aktif-proje",
        JSON.stringify(duzenlenmisProje),
      );

      const ilkSayfa = duzenlenmisProje.sayfalar[0];

      if (ilkSayfa) {
        setSecilenSayfaId(ilkSayfa.id);

        const ilkBolum = ilkSayfa.bolumler[0];

        if (ilkBolum) {
          setSecilenBolumId(ilkBolum.id);
        }
      }
    } catch (error) {
      console.error("Proje yüklenemedi:", error);
      localStorage.removeItem("sitemix-aktif-proje");
    } finally {
      setYukleniyor(false);
    }
  }, []);

  const secilenSayfa = useMemo(() => {
    return (
      proje?.sayfalar.find((sayfa) => sayfa.id === secilenSayfaId) ?? null
    );
  }, [proje, secilenSayfaId]);

  const secilenBolum = useMemo(() => {
    return (
      secilenSayfa?.bolumler.find((bolum) => bolum.id === secilenBolumId) ??
      null
    );
  }, [secilenSayfa, secilenBolumId]);

  const bosGorselHedefleri = useMemo(() => {
    return proje ? gorselHedefleriniOlustur(proje, true) : [];
  }, [proje]);

  const seciliBolumBosGorselHedefleri = useMemo(() => {
    return proje && secilenSayfa && secilenBolum
      ? gorselHedefleriniOlustur(
          proje,
          true,
          secilenSayfa.id,
          secilenBolum.id,
        )
      : [];
  }, [proje, secilenSayfa, secilenBolum]);

  function projeyiKaydet(guncelProje: ProjeVerisi) {
    const kaydedilecek = {
      ...guncelProje,
      guncellenmeTarihi: new Date().toISOString(),
    };

    setProje(kaydedilecek);

    try {
      localStorage.setItem(
        "sitemix-aktif-proje",
        JSON.stringify(kaydedilecek),
      );

      setKaydedildi(true);
      setHata("");

      window.setTimeout(() => {
        setKaydedildi(false);
      }, 1200);
    } catch {
      setHata(
        "Tarayıcı depolama alanı doldu. Büyük görsellerden bazılarını kaldır.",
      );
    }
  }

  function sayfaSec(sayfaId: string) {
    setSecilenSayfaId(sayfaId);
    setHata("");

    const sayfa = proje?.sayfalar.find((item) => item.id === sayfaId);

    const ilkBolum = sayfa?.bolumler
      .slice()
      .sort((a, b) => a.sira - b.sira)[0];

    setSecilenBolumId(ilkBolum?.id ?? "");
  }

  function bolumGuncelle<K extends keyof SiteBolumu>(
    alan: K,
    deger: SiteBolumu[K],
  ) {
    if (!proje || !secilenSayfa || !secilenBolum) {
      return;
    }

    const sayfalar = proje.sayfalar.map((sayfa) => {
      if (sayfa.id !== secilenSayfa.id) {
        return sayfa;
      }

      return {
        ...sayfa,
        bolumler: sayfa.bolumler.map((bolum) =>
          bolum.id === secilenBolum.id
            ? {
                ...bolum,
                [alan]: deger,
              }
            : bolum,
        ),
      };
    });

    projeyiKaydet({
      ...proje,
      sayfalar,
    });
  }

  function butonEkle() {
    if (!secilenBolum) {
      return;
    }

    const yeniButon: ButonVerisi = {
      id: idOlustur(),
      metin: "",
      baglanti: "",
    };

    bolumGuncelle("butonlar", [...secilenBolum.butonlar, yeniButon]);
  }

  function hizliWhatsappButonuEkle() {
    if (!secilenBolum || !proje?.whatsapp.trim()) {
      setHata(
        "WhatsApp butonu eklemek için proje bilgilerinde WhatsApp numarası bulunmalı.",
      );
      return;
    }

    const whatsappButonu: ButonVerisi = {
      id: idOlustur(),
      metin: "WhatsApp’tan ulaşın",
      baglanti: `https://wa.me/${whatsappTemizle(proje.whatsapp)}`,
    };

    bolumGuncelle("butonlar", [...secilenBolum.butonlar, whatsappButonu]);
  }

  function hizliTelefonButonuEkle() {
    if (!secilenBolum || !proje?.telefon.trim()) {
      setHata(
        "Telefon butonu eklemek için proje bilgilerinde telefon numarası bulunmalı.",
      );
      return;
    }

    const telefonButonu: ButonVerisi = {
      id: idOlustur(),
      metin: "Telefonla arayın",
      baglanti: `tel:${telefonTemizle(proje.telefon)}`,
    };

    bolumGuncelle("butonlar", [...secilenBolum.butonlar, telefonButonu]);
  }

  function butonGuncelle(
    butonId: string,
    alan: "metin" | "baglanti",
    deger: string,
  ) {
    if (!secilenBolum) {
      return;
    }

    bolumGuncelle(
      "butonlar",
      secilenBolum.butonlar.map((buton) =>
        buton.id === butonId
          ? {
              ...buton,
              [alan]: deger,
            }
          : buton,
      ),
    );
  }

  function butonSil(butonId: string) {
    if (!secilenBolum) {
      return;
    }

    bolumGuncelle(
      "butonlar",
      secilenBolum.butonlar.filter((buton) => buton.id !== butonId),
    );
  }

  async function anaGorselYukle(
    event: ChangeEvent<HTMLInputElement>,
    alan: "gorsel" | "arkaPlanGorseli",
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setHata("");

    try {
      const gorsel = await gorseliKucult(file);
      bolumGuncelle(alan, gorsel);
    } catch (error) {
      setHata(error instanceof Error ? error.message : "Görsel yüklenemedi.");
    }

    event.target.value = "";
  }

  function listeElemaniGuncelle(
    elemanId: string,
    alan: keyof Omit<ListeElemani, "id">,
    deger: string,
  ) {
    if (!secilenBolum) {
      return;
    }

    bolumGuncelle(
      "listeElemanlari",
      secilenBolum.listeElemanlari.map((eleman) =>
        eleman.id === elemanId
          ? {
              ...eleman,
              [alan]: deger,
            }
          : eleman,
      ),
    );
  }

  async function listeGorseliYukle(
    event: ChangeEvent<HTMLInputElement>,
    elemanId: string,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const gorsel = await gorseliKucult(file);
      listeElemaniGuncelle(elemanId, "gorsel", gorsel);
    } catch (error) {
      setHata(error instanceof Error ? error.message : "Görsel yüklenemedi.");
    }

    event.target.value = "";
  }

  function listeElemaniEkle() {
    if (!secilenBolum) {
      return;
    }

    const yeniEleman: ListeElemani = {
      id: idOlustur(),
      baslik: "",
      aciklama: "",
      gorsel: "",
      baglanti: "",
    };

    bolumGuncelle("listeElemanlari", [
      ...secilenBolum.listeElemanlari,
      yeniEleman,
    ]);
  }

  function listeElemaniSil(elemanId: string) {
    if (!secilenBolum) {
      return;
    }

    bolumGuncelle(
      "listeElemanlari",
      secilenBolum.listeElemanlari.filter(
        (eleman) => eleman.id !== elemanId,
      ),
    );
  }

  function bolumTasi(yon: "yukari" | "asagi") {
    if (!proje || !secilenSayfa || !secilenBolum) {
      return;
    }

    const bolumler = [...secilenSayfa.bolumler].sort(
      (a, b) => a.sira - b.sira,
    );

    const index = bolumler.findIndex((bolum) => bolum.id === secilenBolum.id);
    const hedef = yon === "yukari" ? index - 1 : index + 1;

    if (hedef < 0 || hedef >= bolumler.length) {
      return;
    }

    [bolumler[index], bolumler[hedef]] = [bolumler[hedef], bolumler[index]];

    const yeniBolumler = bolumler.map((bolum, sira) => ({
      ...bolum,
      sira,
    }));

    projeyiKaydet({
      ...proje,
      sayfalar: proje.sayfalar.map((sayfa) =>
        sayfa.id === secilenSayfa.id
          ? {
              ...sayfa,
              bolumler: yeniBolumler,
            }
          : sayfa,
      ),
    });
  }

  function bolumSil() {
    if (!proje || !secilenSayfa || !secilenBolum) {
      return;
    }

    const onay = window.confirm("Bu bölümü silmek istediğine emin misin?");

    if (!onay) {
      return;
    }

    const bolumler = secilenSayfa.bolumler
      .filter((bolum) => bolum.id !== secilenBolum.id)
      .map((bolum, sira) => ({
        ...bolum,
        sira,
      }));

    projeyiKaydet({
      ...proje,
      sayfalar: proje.sayfalar.map((sayfa) =>
        sayfa.id === secilenSayfa.id
          ? {
              ...sayfa,
              bolumler,
            }
          : sayfa,
      ),
    });

    setSecilenBolumId(bolumler[0]?.id ?? "");
  }

  function topluIcerigiUygula() {
    if (!proje) {
      return;
    }

    const bloklar = topluIcerigiCozumle(topluIcerik);

    if (bloklar.length === 0) {
      setHata("Toplu içerik alanına uygulanacak metin bulunamadı.");
      return;
    }

    let uygulananSayisi = 0;
    let ilkUygulananSayfaId = "";
    let ilkUygulananBolumId = "";

    const sayfalar = proje.sayfalar.map((sayfa) => ({
      ...sayfa,
      bolumler: sayfa.bolumler.map((bolum) => ({
        ...bolum,
        butonlar: [...bolum.butonlar],
        listeElemanlari: [...bolum.listeElemanlari],
      })),
    }));

    bloklar.forEach((blok) => {
      const hedefSayfa = blok.sayfa?.trim()
        ? sayfalar.find((sayfa) => sayfaEslesir(sayfa, blok.sayfa || ""))
        : sayfalar.find((sayfa) => sayfa.id === secilenSayfaId) ?? sayfalar[0];

      if (!hedefSayfa) {
        return;
      }

      const hedefBolum = blok.bolum?.trim()
        ? hedefSayfa.bolumler.find((bolum) =>
            bolumEslesir(bolum, blok.bolum || ""),
          )
        : hedefSayfa.bolumler.find((bolum) => bolum.id === secilenBolumId) ??
          hedefSayfa.bolumler[0];

      if (!hedefBolum) {
        return;
      }

      Object.assign(hedefBolum, {
        ...hedefBolum,
        ...blok.alanlar,
        butonlar: gelenButonlariUygula(hedefBolum.butonlar, blok.butonlar),
        listeElemanlari: gelenListeyiUygula(
          hedefBolum.listeElemanlari,
          blok.listeElemanlari,
        ),
      });

      uygulananSayisi += 1;

      if (!ilkUygulananSayfaId) {
        ilkUygulananSayfaId = hedefSayfa.id;
        ilkUygulananBolumId = hedefBolum.id;
      }
    });

    if (uygulananSayisi === 0) {
      setHata(
        "İçerik okundu ama eşleşen sayfa veya bölüm bulunamadı. Sayfa ve bölüm adlarını mevcut paneldeki adlarla yaz.",
      );
      return;
    }

    projeyiKaydet({
      ...proje,
      sayfalar,
    });

    if (ilkUygulananSayfaId) {
      setSecilenSayfaId(ilkUygulananSayfaId);
      setSecilenBolumId(ilkUygulananBolumId);
    }

    setTopluBilgi(`${uygulananSayisi} bölüm toplu içerikle güncellendi.`);
    setHata("");
  }

  async function topluGorselYukle(
    event: ChangeEvent<HTMLInputElement>,
    hedefler: GorselHedefi[],
    yalnizSeciliBolum: boolean,
  ) {
    if (!proje) {
      return;
    }

    const dosyalar = Array.from(event.target.files ?? []);

    if (dosyalar.length === 0) {
      return;
    }

    if (hedefler.length === 0) {
      setHata("Görsel yerleştirilecek boş alan bulunamadı.");
      event.target.value = "";
      return;
    }

    let guncelProje = proje;
    let yuklenenSayisi = 0;

    try {
      for (let index = 0; index < dosyalar.length && index < hedefler.length; index += 1) {
        const gorsel = await gorseliKucult(dosyalar[index]);
        guncelProje = gorseliHedefeYerlestir(guncelProje, hedefler[index], gorsel);
        yuklenenSayisi += 1;
      }

      projeyiKaydet(guncelProje);

      setTopluBilgi(
        yalnizSeciliBolum
          ? `${yuklenenSayisi} görsel seçili bölüme sırayla yerleştirildi.`
          : `${yuklenenSayisi} görsel boş alanlara sırayla yerleştirildi.`,
      );
      setHata("");
    } catch (error) {
      setHata(error instanceof Error ? error.message : "Toplu görsel yükleme tamamlanamadı.");
    }

    event.target.value = "";
  }

  if (yukleniyor) {
    return (
      <main className={styles.durumSayfasi}>
        <span>SITEMIX STUDIO</span>
        <h1>Site hazırlanıyor.</h1>
      </main>
    );
  }

  if (!proje) {
    return (
      <main className={styles.durumSayfasi}>
        <span>SITEMIX STUDIO</span>
        <h1>Aktif proje bulunamadı.</h1>

        <Link href="/studio/yeni">
          Yeni proje oluştur
          <ArrowRight size={18} />
        </Link>
      </main>
    );
  }

  const sayfalar = sayfalariSirala(proje.sayfalar);

  const bolumler = secilenSayfa
    ? [...secilenSayfa.bolumler].sort((a, b) => a.sira - b.sira)
    : [];

  const seciliIndex = bolumler.findIndex(
    (bolum) => bolum.id === secilenBolumId,
  );

  return (
    <main className={styles.sayfa}>
      <header className={styles.ustAlan}>
        <Link href="/studio/tema" className={styles.geri}>
          <ArrowLeft size={18} />
          Tema
        </Link>

        <Link href="/" className={styles.logo}>
          <span>SITEMIX</span>
          <small>STUDIO</small>
        </Link>

        <div className={styles.kayitDurumu}>
          {kaydedildi && (
            <span>
              <Check size={15} />
              Kaydedildi
            </span>
          )}

          <strong>03 / İçerikler</strong>
        </div>
      </header>

      <section className={styles.baslikAlani}>
        <div>
          <span>OTOMATİK İÇERİKLER</span>
          <h1>{proje.firmaAdi}</h1>

          <p>
            Sayfalar ve içerikler doğru sıraya getirildi. İstersen tek tek
            düzenle, istersen toplu içerik alanına hazır metni yapıştırıp
            bütün bölümlere tek seferde uygula.
          </p>
        </div>

        <button
          type="button"
          className={styles.onizlemeButonu}
          onClick={() => router.push("/studio/onizleme")}
        >
          Siteyi önizle
          <ArrowRight size={18} />
        </button>
      </section>

      <section className={styles.topluPanel}>
        <div className={styles.topluBaslik}>
          <div>
            <span>TOPLU DOLDURMA</span>
            <h2>İçerikleri tek tek yazmadan yerleştir</h2>
          </div>

          <button
            type="button"
            onClick={() => {
              setTopluIcerik(topluIcerikSablonu);
              setTopluBilgi("Örnek şablon hazırlandı. Üzerini değiştirip uygula.");
            }}
          >
            Örnek şablonu getir
          </button>
        </div>

        <textarea
          value={topluIcerik}
          onChange={(event) => setTopluIcerik(event.target.value)}
          placeholder="ChatGPT’den aldığın içerik metnini buraya yapıştır. Sayfa, Bölüm, Küçük başlık, Ana başlık, Açıklama, Buton ve Hizmetler satırlarını okuyup doğru alanlara yerleştirir."
          rows={12}
        />

        <div className={styles.topluAksiyonlar}>
          <button type="button" onClick={topluIcerigiUygula}>
            <FileText size={17} />
            Toplu içeriği uygula
          </button>

          <label>
            <Upload size={17} />
            Tüm görselleri sırayla yükle
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) =>
                topluGorselYukle(event, bosGorselHedefleri, false)
              }
            />
          </label>
        </div>

        <div className={styles.gorselSiraKutusu}>
          <strong>Boş görsel yeri: {bosGorselHedefleri.length}</strong>
          <p>
            Toplu görsel seçersen dosyalar aşağıdaki sıraya göre yerleşir. Önce
            mevcut boş alanlar doldurulur, dolu görsellerin üzerine yazılmaz.
          </p>

          {bosGorselHedefleri.length > 0 && (
            <ol>
              {bosGorselHedefleri.slice(0, 8).map((hedef) => (
                <li key={`${hedef.sayfaId}-${hedef.bolumId}-${hedef.elemanId ?? hedef.alan}`}>
                  {hedef.etiket}
                </li>
              ))}

              {bosGorselHedefleri.length > 8 && (
                <li>+{bosGorselHedefleri.length - 8} görsel alanı daha</li>
              )}
            </ol>
          )}
        </div>

        {topluBilgi && <p className={styles.topluBilgi}>{topluBilgi}</p>}
      </section>

      <section className={styles.editorAlani}>
        <aside className={styles.sayfaPaneli}>
          <div className={styles.panelBasligi}>
            <span>01</span>
            <h2>Sayfalar</h2>
          </div>

          {sayfalar.map((sayfa) => (
            <button
              key={sayfa.id}
              type="button"
              className={`${styles.sayfaButonu} ${
                sayfa.id === secilenSayfaId ? styles.aktifSayfa : ""
              }`}
              onClick={() => sayfaSec(sayfa.id)}
            >
              <FileText size={17} />

              <div>
                <strong>{sayfa.ad}</strong>
                <span>{sayfa.bolumler.length} bölüm hazır</span>
              </div>
            </button>
          ))}
        </aside>

        <section className={styles.bolumPaneli}>
          <div className={styles.panelBasligi}>
            <span>02</span>
            <h2>{secilenSayfa?.ad}</h2>
          </div>

          {bolumler.map((bolum, index) => (
            <button
              key={bolum.id}
              type="button"
              className={`${styles.bolumButonu} ${
                bolum.id === secilenBolumId ? styles.aktifBolum : ""
              }`}
              onClick={() => setSecilenBolumId(bolum.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>

              <div>
                <strong>{bolum.baslik || bolumAdi(bolum.tur)}</strong>
                <small>{bolumAdi(bolum.tur)}</small>
              </div>

              {bolum.aktif ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          ))}
        </section>

        <aside className={styles.ayarPaneli}>
          {!secilenBolum ? (
            <div className={styles.bosAlan}>
              <FileImage size={36} />
              <p>Düzenlemek için bir bölüm seçin.</p>
            </div>
          ) : (
            <>
              <div className={styles.ayarUstAlan}>
                <div>
                  <span>{bolumAdi(secilenBolum.tur)}</span>

                  <h2>{secilenBolum.baslik || "Bölüm içeriğini düzenleyin"}</h2>
                </div>

                <button
                  type="button"
                  onClick={() => bolumGuncelle("aktif", !secilenBolum.aktif)}
                >
                  {secilenBolum.aktif ? <Eye size={17} /> : <EyeOff size={17} />}
                </button>
              </div>

              <div className={styles.siraIslemleri}>
                <button
                  type="button"
                  disabled={seciliIndex <= 0}
                  onClick={() => bolumTasi("yukari")}
                >
                  <ArrowUp size={16} />
                  Yukarı
                </button>

                <button
                  type="button"
                  disabled={
                    seciliIndex === -1 || seciliIndex === bolumler.length - 1
                  }
                  onClick={() => bolumTasi("asagi")}
                >
                  <ArrowDown size={16} />
                  Aşağı
                </button>

                <label className={styles.bolumTopluGorselButonu}>
                  <Upload size={16} />
                  Bu bölümün görselleri
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) =>
                      topluGorselYukle(
                        event,
                        seciliBolumBosGorselHedefleri,
                        true,
                      )
                    }
                  />
                </label>

                <button
                  type="button"
                  className={styles.silButonu}
                  onClick={bolumSil}
                >
                  <Trash2 size={16} />
                  Sil
                </button>
              </div>

              <div className={styles.formGrubu}>
                <label>Küçük başlık</label>

                <input
                  type="text"
                  value={secilenBolum.ustBaslik}
                  onChange={(event) =>
                    bolumGuncelle("ustBaslik", event.target.value)
                  }
                />
              </div>

              <div className={styles.formGrubu}>
                <label>Ana başlık</label>

                <input
                  type="text"
                  value={secilenBolum.baslik}
                  onChange={(event) => bolumGuncelle("baslik", event.target.value)}
                />
              </div>

              <div className={styles.formGrubu}>
                <label>Açıklama</label>

                <textarea
                  rows={5}
                  value={secilenBolum.aciklama}
                  onChange={(event) =>
                    bolumGuncelle("aciklama", event.target.value)
                  }
                />
              </div>

              <div className={styles.gorselBolumu}>
                <div className={styles.gorselBasligi}>
                  <div>
                    <ImagePlus size={18} />
                    <strong>Ana görsel</strong>
                  </div>

                  {secilenBolum.gorsel && (
                    <button type="button" onClick={() => bolumGuncelle("gorsel", "")}> 
                      Kaldır
                    </button>
                  )}
                </div>

                {secilenBolum.gorsel ? (
                  <img
                    src={secilenBolum.gorsel}
                    alt=""
                    className={styles.yuklenenGorsel}
                  />
                ) : (
                  <label className={styles.gorselYukle}>
                    <Upload size={24} />
                    <span>Görsel yükleyin</span>
                    <small>JPG, PNG veya WEBP</small>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => anaGorselYukle(event, "gorsel")}
                    />
                  </label>
                )}
              </div>

              {(secilenBolum.tur === "hero" || secilenBolum.tur === "metin") && (
                <div className={styles.gorselBolumu}>
                  <div className={styles.gorselBasligi}>
                    <div>
                      <ImagePlus size={18} />
                      <strong>Arka plan görseli</strong>
                    </div>

                    {secilenBolum.arkaPlanGorseli && (
                      <button
                        type="button"
                        onClick={() => bolumGuncelle("arkaPlanGorseli", "")}
                      >
                        Kaldır
                      </button>
                    )}
                  </div>

                  {secilenBolum.arkaPlanGorseli ? (
                    <img
                      src={secilenBolum.arkaPlanGorseli}
                      alt=""
                      className={styles.yuklenenGorsel}
                    />
                  ) : (
                    <label className={styles.gorselYukle}>
                      <Upload size={24} />
                      <span>Arka plan yükleyin</span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          anaGorselYukle(event, "arkaPlanGorseli")
                        }
                      />
                    </label>
                  )}
                </div>
              )}

              <div className={styles.listeAlani}>
                <div className={styles.listeUstAlan}>
                  <div>
                    <span>BUTONLAR</span>
                    <strong>{secilenBolum.butonlar.length}</strong>
                  </div>

                  <button type="button" onClick={butonEkle}>
                    <Plus size={15} />
                    Yeni buton
                  </button>
                </div>

                {(secilenBolum.tur === "hero" ||
                  secilenBolum.tur === "metin" ||
                  secilenBolum.tur === "iletisim") && (
                  <div className={styles.siraIslemleri}>
                    <button
                      type="button"
                      onClick={hizliWhatsappButonuEkle}
                      disabled={!proje.whatsapp.trim()}
                    >
                      <MessageCircle size={15} />
                      WhatsApp
                    </button>

                    <button
                      type="button"
                      onClick={hizliTelefonButonuEkle}
                      disabled={!proje.telefon.trim()}
                    >
                      <Phone size={15} />
                      Telefon
                    </button>
                  </div>
                )}

                {secilenBolum.butonlar.map((buton, index) => (
                  <article key={buton.id} className={styles.listeElemani}>
                    <div className={styles.listeElemaniBasligi}>
                      <span>BUTON {String(index + 1).padStart(2, "0")}</span>

                      <button type="button" onClick={() => butonSil(buton.id)}>
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={buton.metin}
                      onChange={(event) =>
                        butonGuncelle(buton.id, "metin", event.target.value)
                      }
                      placeholder="Buton yazısı"
                    />

                    <input
                      type="text"
                      value={buton.baglanti}
                      onChange={(event) =>
                        butonGuncelle(buton.id, "baglanti", event.target.value)
                      }
                      placeholder="/hizmetler, tel: veya https://..."
                    />
                  </article>
                ))}
              </div>

              {secilenBolum.listeElemanlari.length > 0 && (
                <div className={styles.listeAlani}>
                  <div className={styles.listeUstAlan}>
                    <div>
                      <span>İÇERİKLER</span>
                      <strong>{secilenBolum.listeElemanlari.length}</strong>
                    </div>

                    <button type="button" onClick={listeElemaniEkle}>
                      <Plus size={15} />
                      Yeni ekle
                    </button>
                  </div>

                  {secilenBolum.listeElemanlari.map((eleman, index) => (
                    <article key={eleman.id} className={styles.listeElemani}>
                      <div className={styles.listeElemaniBasligi}>
                        <span>{String(index + 1).padStart(2, "0")}</span>

                        <button
                          type="button"
                          onClick={() => listeElemaniSil(eleman.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={eleman.baslik}
                        onChange={(event) =>
                          listeElemaniGuncelle(
                            eleman.id,
                            "baslik",
                            event.target.value,
                          )
                        }
                        placeholder="Başlık"
                      />

                      <textarea
                        rows={3}
                        value={eleman.aciklama}
                        onChange={(event) =>
                          listeElemaniGuncelle(
                            eleman.id,
                            "aciklama",
                            event.target.value,
                          )
                        }
                        placeholder="Açıklama"
                      />

                      <input
                        type="text"
                        value={eleman.baglanti}
                        onChange={(event) =>
                          listeElemaniGuncelle(
                            eleman.id,
                            "baglanti",
                            event.target.value,
                          )
                        }
                        placeholder="Bağlantı — isteğe bağlı"
                      />

                      {eleman.gorsel ? (
                        <div className={styles.elemanGorselAlani}>
                          <img src={eleman.gorsel} alt="" />

                          <button
                            type="button"
                            onClick={() =>
                              listeElemaniGuncelle(eleman.id, "gorsel", "")
                            }
                          >
                            Kaldır
                          </button>
                        </div>
                      ) : (
                        <label className={styles.kucukGorselYukle}>
                          <Upload size={18} />
                          Görsel yükle

                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => listeGorseliYukle(event, eleman.id)}
                          />
                        </label>
                      )}
                    </article>
                  ))}
                </div>
              )}

              {secilenBolum.listeElemanlari.length === 0 &&
                listeDestekleyenBolumler.includes(secilenBolum.tur) && (
                  <button
                    type="button"
                    className={styles.ilkElemanButonu}
                    onClick={listeElemaniEkle}
                  >
                    <Plus size={17} />
                    İlk içeriği ekle
                  </button>
                )}

              <div className={styles.kayitNotu}>
                <Save size={16} />
                Değişiklikler otomatik kaydedilir.
              </div>
            </>
          )}

          {hata && <p className={styles.hata}>{hata}</p>}
        </aside>
      </section>
    </main>
  );
}
