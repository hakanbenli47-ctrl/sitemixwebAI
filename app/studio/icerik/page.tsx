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
  FileText,
  Layers,
  MessageCircle,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./icerik.module.css";
import {
  projeyeOzelIcerigiUygula,
  projeyeOzelTopluIcerikOlustur,
} from "@/data/icerikSablonlari";
import { gorselsizSunumuHazirla } from "@/data/sektorGorselDoldurma";
import type {
  ButonVerisi,
  ListeElemani,
  SiteBolumu,
  SiteSayfasi,
} from "@/data/sektorSablonlari";
import { GUNCEL_SABLON_SURUMU } from "@/data/sektorSablonlari";
import { sektorSunumProfiliniGetir } from "@/data/sektorSunumProfilleri";
import { telefonBaglantisi, whatsappBaglantisi } from "@/lib/iletisim";
import type { ProjeVerisi } from "@/types/proje";

const listeDestekleyenBolumler: SiteBolumu["tur"][] = [
  "hizmetler",
  "urunler",
  "ekip",
  "yorumlar",
  "fiyatlar",
  "sss",
  "neden-biz",
  "istatistik",
];

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

interface TopluIcerikOnizlemesi {
  blokSayisi: number;
  eslesenSayisi: number;
  sorunlar: string[];
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

function slugOlustur(metin: unknown) {
  return String(metin ?? "")
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

      return a.sira - b.sira;
    })
    .map((sayfa, index) => ({
      ...sayfa,
      sira: index,
    }));
}

function bolumleriSirala(bolumler: SiteBolumu[]) {
  return [...bolumler]
    .sort((a, b) => a.sira - b.sira)
    .map((bolum, index) => ({
      ...bolum,
      sira: index,
    }));
}

function anaSayfaButonlariniOlustur(
  proje: ProjeVerisi,
  mevcutButonlar: ButonVerisi[],
) {
  const sunum = sektorSunumProfiliniGetir(proje.sektor);
  const gecerliButonlar = mevcutButonlar.filter(
    (buton) =>
      String(buton.metin ?? "").trim() &&
      String(buton.baglanti ?? "").trim(),
  );

  const iletisimButonu =
    gecerliButonlar.find(
      (buton) =>
        buton.baglanti.includes("wa.me") ||
        buton.baglanti.startsWith("tel:") ||
        slugOlustur(buton.metin).includes("whatsapp") ||
        slugOlustur(buton.metin).includes("telefon"),
    ) ??
    (whatsappBaglantisi(proje.whatsapp)
      ? {
          id: idOlustur(),
          metin: "WhatsApp’tan bilgi alın",
          baglanti: whatsappBaglantisi(proje.whatsapp),
        }
      : telefonBaglantisi(proje.telefon)
        ? {
            id: idOlustur(),
            metin: "Telefonla bilgi alın",
            baglanti: telefonBaglantisi(proje.telefon),
          }
        : null);

  const hizmetButonu =
    gecerliButonlar.find(
      (buton) =>
        buton.baglanti.includes("hizmet") ||
        buton.baglanti.includes(sunum.hizmetSayfasiSlug) ||
        slugOlustur(buton.metin).includes("hizmet") ||
        slugOlustur(buton.metin).includes(
          slugOlustur(sunum.hizmetSayfasiAdi),
        ),
    ) ?? {
      id: idOlustur(),
      metin: `${sunum.hizmetSayfasiAdi} sayfasını inceleyin`,
      baglanti:
        proje.siteTipi === "tek-sayfa"
          ? "#hizmetler"
          : `/${sunum.hizmetSayfasiSlug}`,
    };

  const digerButonlar = gecerliButonlar.filter(
    (buton) =>
      buton.id !== iletisimButonu?.id && buton.id !== hizmetButonu.id,
  );

  return [iletisimButonu, hizmetButonu, ...digerButonlar]
    .filter((buton): buton is ButonVerisi => Boolean(buton))
    .slice(0, 2);
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
  const [topluOnizleme, setTopluOnizleme] =
    useState<TopluIcerikOnizlemesi | null>(null);
  const [geriAlmaVar, setGeriAlmaVar] = useState(false);

  useEffect(() => {
    const yuklemeZamanlayicisi = window.setTimeout(() => {
      const kayit = localStorage.getItem("sitemix-aktif-proje");
      setGeriAlmaVar(Boolean(localStorage.getItem("sitemix-proje-yedegi")));

      if (!kayit) {
        setYukleniyor(false);
        return;
      }

      try {
        const hamProje = JSON.parse(kayit) as ProjeVerisi;
        const guncelSablonluProje = gorselsizSunumuHazirla(
          hamProje.sablonSurumu === GUNCEL_SABLON_SURUMU
            ? hamProje
            : projeyeOzelIcerigiUygula(hamProje),
        );
        const duzenlenmisProje = projeyiDuzenle(guncelSablonluProje);

        setProje(duzenlenmisProje);
        setTopluIcerik(projeyeOzelTopluIcerikOlustur(duzenlenmisProje));
        setTopluBilgi(
          `${duzenlenmisProje.sektorAdi} ve ${
            duzenlenmisProje.siteTipi === "tek-sayfa"
              ? "tek sayfa"
              : "çok sayfa"
          } yapısı için işletme bilgileriyle hazırlandı.`,
        );

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
    }, 0);

    return () => window.clearTimeout(yuklemeZamanlayicisi);
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

  const icerikOzeti = useMemo(() => {
    if (!proje) {
      return { bolum: 0, kelime: 0 };
    }

    const bolumler = proje.sayfalar.flatMap((sayfa) => sayfa.bolumler);
    const metin = bolumler
      .flatMap((bolum) => [
        bolum.ustBaslik,
        bolum.baslik,
        bolum.aciklama,
        ...bolum.listeElemanlari.flatMap((eleman) => [
          eleman.baslik,
          eleman.aciklama,
        ]),
      ])
      .join(" ")
      .trim();

    return {
      bolum: bolumler.length,
      kelime: metin ? metin.split(/\s+/).length : 0,
    };
  }, [proje]);

  function projeyiKaydet(guncelProje: ProjeVerisi, yedekle = false) {
    const kaydedilecek = {
      ...guncelProje,
      guncellenmeTarihi: new Date().toISOString(),
    };

    setProje(kaydedilecek);

    try {
      if (yedekle && proje) {
        localStorage.setItem("sitemix-proje-yedegi", JSON.stringify(proje));
        setGeriAlmaVar(true);
      }

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
        "Tarayıcı depolama alanı doldu. Eski projelerden bazılarını temizleyip tekrar dene.",
      );
    }
  }

  function sonTopluDegisikligiGeriAl() {
    const yedek = localStorage.getItem("sitemix-proje-yedegi");

    if (!yedek) {
      return;
    }

    try {
      const oncekiProje = JSON.parse(yedek) as ProjeVerisi;
      localStorage.removeItem("sitemix-proje-yedegi");
      setGeriAlmaVar(false);
      projeyiKaydet(oncekiProje);
      setTopluIcerik(projeyeOzelTopluIcerikOlustur(oncekiProje));
      setTopluOnizleme(null);
      setTopluBilgi("Son toplu içerik değişikliği geri alındı.");
    } catch {
      localStorage.removeItem("sitemix-proje-yedegi");
      setGeriAlmaVar(false);
      setHata("Geri alma kaydı okunamadı.");
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
    const baglanti = whatsappBaglantisi(proje?.whatsapp);

    if (!secilenBolum || !baglanti) {
      setHata(
        "WhatsApp butonu eklemek için proje bilgilerinde WhatsApp numarası bulunmalı.",
      );
      return;
    }

    const whatsappButonu: ButonVerisi = {
      id: idOlustur(),
      metin: "WhatsApp’tan ulaşın",
      baglanti,
    };

    bolumGuncelle("butonlar", [...secilenBolum.butonlar, whatsappButonu]);
  }

  function hizliTelefonButonuEkle() {
    const baglanti = telefonBaglantisi(proje?.telefon);

    if (!secilenBolum || !baglanti) {
      setHata(
        "Telefon butonu eklemek için proje bilgilerinde telefon numarası bulunmalı.",
      );
      return;
    }

    const telefonButonu: ButonVerisi = {
      id: idOlustur(),
      metin: "Telefonla arayın",
      baglanti,
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

  function topluIcerigiOnizle() {
    if (!proje) {
      return;
    }

    const bloklar = topluIcerigiCozumle(topluIcerik);
    const sorunlar: string[] = [];
    let eslesenSayisi = 0;

    bloklar.forEach((blok, index) => {
      const sayfaAdaylari = blok.sayfa?.trim()
        ? proje.sayfalar.filter((sayfa) =>
            sayfaEslesir(sayfa, blok.sayfa || ""),
          )
        : proje.sayfalar.filter(
            (sayfa) =>
              sayfa.id === (secilenSayfaId || proje.sayfalar[0]?.id),
          );

      if (sayfaAdaylari.length !== 1) {
        sorunlar.push(
          `${index + 1}. blok: “${blok.sayfa || "seçili sayfa"}” için ${
            sayfaAdaylari.length === 0 ? "eşleşme bulunamadı" : "birden fazla sayfa eşleşti"
          }.`,
        );
        return;
      }

      const hedefSayfa = sayfaAdaylari[0];
      const bolumAdaylari = blok.bolum?.trim()
        ? hedefSayfa.bolumler.filter((bolum) =>
            bolumEslesir(bolum, blok.bolum || ""),
          )
        : hedefSayfa.bolumler.filter(
            (bolum) =>
              bolum.id === (secilenBolumId || hedefSayfa.bolumler[0]?.id),
          );

      if (bolumAdaylari.length !== 1) {
        sorunlar.push(
          `${index + 1}. blok: ${hedefSayfa.ad} / “${blok.bolum || "seçili bölüm"}” için ${
            bolumAdaylari.length === 0 ? "eşleşme bulunamadı" : "birden fazla bölüm eşleşti"
          }.`,
        );
        return;
      }

      eslesenSayisi += 1;
    });

    const onizleme = {
      blokSayisi: bloklar.length,
      eslesenSayisi,
      sorunlar,
    };

    setTopluOnizleme(onizleme);
    setHata(
      bloklar.length === 0
        ? "Toplu içerik alanına uygulanacak metin bulunamadı."
        : sorunlar.length > 0
          ? "İçerik uygulanmadı. Ön izlemedeki eşleşme sorunlarını düzelt."
          : "",
    );
  }

  function topluIcerigiUygula() {
    if (!proje) {
      return;
    }

    if (!topluOnizleme || topluOnizleme.sorunlar.length > 0) {
      topluIcerigiOnizle();
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

    projeyiKaydet(
      {
        ...proje,
        sayfalar,
      },
      true,
    );

    if (ilkUygulananSayfaId) {
      setSecilenSayfaId(ilkUygulananSayfaId);
      setSecilenBolumId(ilkUygulananBolumId);
    }

    setTopluBilgi(`${uygulananSayisi} bölüm toplu içerikle güncellendi.`);
    setTopluOnizleme(null);
    setHata("");
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
            Girişte verdiğin işletme bilgileri, seçtiğin sektör ve site yapısı
            kullanılarak içerikler hazırlandı. Aşağıdan kontrol edip bütün
            bölümlere tek seferde uygulayabilirsin.
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

      <section className={styles.projeOzeti}>
        <article>
          <Layers size={19} />
          <div>
            <strong>{proje.sayfalar.length}</strong>
            <span>{proje.siteTipi === "tek-sayfa" ? "Tek sayfa" : "Sayfa"}</span>
          </div>
        </article>

        <article>
          <FileText size={19} />
          <div>
            <strong>{icerikOzeti.bolum}</strong>
            <span>Düzenli bölüm</span>
          </div>
        </article>

        <article>
          <Check size={19} />
          <div>
            <strong>{icerikOzeti.kelime}</strong>
            <span>İçerik kelimesi</span>
          </div>
        </article>

        <article>
          <Eye size={19} />
          <div>
            <strong>%100</strong>
            <span>Metin odaklı sunum</span>
          </div>
        </article>
      </section>

      <section className={styles.topluPanel}>
        <div className={styles.topluBaslik}>
          <div>
            <span>İÇERİK MERKEZİ</span>
            <h2>Hazır içeriği gözden geçir ve uygula</h2>
          </div>

          <button
            type="button"
            onClick={() => {
              const guncelProje = gorselsizSunumuHazirla(
                projeyeOzelIcerigiUygula(proje),
              );
              const ilkSayfa = guncelProje.sayfalar[0];

              projeyiKaydet(guncelProje, true);
              setTopluIcerik(
                projeyeOzelTopluIcerikOlustur(guncelProje),
              );

              if (ilkSayfa) {
                setSecilenSayfaId(ilkSayfa.id);
                setSecilenBolumId(ilkSayfa.bolumler[0]?.id ?? "");
              }

              setTopluBilgi(
                `${proje.sektorAdi} için sayfa sırası, bölüm yapısı, içerikler ve sunum tercihleri yenilendi.`,
              );
            }}
          >
            İşletmeye özel içeriği yenile
          </button>
        </div>

        <textarea
          value={topluIcerik}
          onChange={(event) => {
            setTopluIcerik(event.target.value);
            setTopluOnizleme(null);
          }}
          placeholder="İşletmeye özel sayfa ve bölüm içerikleri burada hazırlanır. Metinleri kontrol edip doğrudan uygulayabilirsin."
          rows={10}
        />

        <div className={styles.topluAksiyonlar}>
          <button type="button" onClick={topluIcerigiOnizle}>
            <FileText size={17} />
            Değişiklikleri ön izle
          </button>

          {topluOnizleme && topluOnizleme.sorunlar.length === 0 && (
            <button type="button" onClick={topluIcerigiUygula}>
              <Check size={17} />
              Onayla ve uygula
            </button>
          )}

          {geriAlmaVar && (
            <button type="button" onClick={sonTopluDegisikligiGeriAl}>
              <RotateCcw size={17} />
              Son toplu değişikliği geri al
            </button>
          )}
        </div>

        {topluOnizleme && (
          <div className={styles.topluOnizleme} role="status">
            <strong>
              {topluOnizleme.eslesenSayisi}/{topluOnizleme.blokSayisi} bölüm
              eşleşti
            </strong>
            {topluOnizleme.sorunlar.length > 0 ? (
              <ul>
                {topluOnizleme.sorunlar.map((sorun) => (
                  <li key={sorun}>{sorun}</li>
                ))}
              </ul>
            ) : (
              <span>Hazır. İçerik henüz uygulanmadı; sonucu onaylayabilirsin.</span>
            )}
          </div>
        )}

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
              <FileText size={36} />
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
