"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  Copy,
  Eye,
  EyeOff,
  FilePlus2,
  GripVertical,
  ImagePlus,
  LayoutGrid,
  LayoutTemplate,
  Monitor,
  PanelRight,
  Plus,
  RefreshCw,
  Smartphone,
  Tablet,
  Trash2,
} from "lucide-react";
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  type BolumTuru,
  type SiteBolumu,
  type SiteSayfasi,
  sektorHizmetleriniGetir,
} from "@/data/sektorSablonlari";
import { sektorTasarimSecenekleriniGetir } from "@/data/sektorTasarimlari";
import {
  sektorIskeletSecenekleriniGetir,
  sektorIskeletiniGetir,
  sektorVarsayilanIskeletiniGetir,
  type SektorIskeletSecenegi,
} from "@/data/sektorIskeletleri";
import { temaPaletiniGetir } from "@/data/temaPaletleri";
import {
  hazirIcerikPaketiniUygula,
  icerikPaketleri,
  sektorVarsayilanIcerikPaketiniGetir,
  sektorVarsayilanStiliniGetir,
} from "@/data/studyoPaketleri";
import {
  telefonBaglantisi,
  whatsappBaglantisi,
} from "@/lib/iletisim";
import type {
  IcerikPaketiKimligi,
  ProjeVerisi,
  SiteStilAyarlari,
} from "@/types/proje";
import styles from "./duzenle.module.css";

type Cihaz = "masaustu" | "tablet" | "mobil";
type SagPanel = "icerik" | "tasarim";

interface BolumKutuphaneOgesi {
  tur: BolumTuru;
  ad: string;
  aciklama: string;
}

const bolumKutuphane: BolumKutuphaneOgesi[] = [
  { tur: "hero", ad: "Açılış", aciklama: "Güçlü başlık ve ana aksiyon" },
  { tur: "hizmetler", ad: "Hizmetler", aciklama: "Hazır hizmet kartları" },
  { tur: "metin", ad: "Metin alanı", aciklama: "Hikâye veya açıklama" },
  { tur: "istatistik", ad: "Güven alanı", aciklama: "İlkeler ve güçlü yanlar" },
  { tur: "neden-biz", ad: "Süreç", aciklama: "Adım adım çalışma biçimi" },
  { tur: "sss", ad: "Sık sorulanlar", aciklama: "Hazır soru ve cevaplar" },
  { tur: "form", ad: "Talep formu", aciklama: "Sektöre uygun alanlar" },
  { tur: "iletisim", ad: "İletişim", aciklama: "Telefon, WhatsApp ve e-posta" },
];

const cihazGenislikleri: Record<Cihaz, number> = {
  masaustu: 1440,
  tablet: 768,
  mobil: 390,
};

const varyasyonlar: Record<string, string[]> = {
  hero: ["standart", "kapak", "editoryal", "odakli"],
  hizmetler: ["kartli", "iki-kolon", "standart"],
  urunler: ["kartli", "iki-kolon", "standart"],
  metin: ["standart", "iki-kolon", "odakli"],
  istatistik: ["kartli", "iki-kolon", "standart"],
  "neden-biz": ["adimlar", "kartli", "standart"],
  sss: ["standart", "iki-kolon"],
  form: ["talep-formu", "standart"],
  iletisim: ["iletisim-paneli", "standart"],
};

const gorselAlaniDestekleyenTurler = new Set([
  "hero",
  "metin",
  "hizmetler",
  "urunler",
  "istatistik",
  "neden-biz",
  "yorumlar",
  "ekip",
]);

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
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function idOlustur() {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function gorselDosyasiniOku(dosya: File) {
  return new Promise<string>((resolve, reject) => {
    const okuyucu = new FileReader();
    okuyucu.onload = () => resolve(String(okuyucu.result ?? ""));
    okuyucu.onerror = () => reject(new Error("Görsel dosyası okunamadı"));
    okuyucu.readAsDataURL(dosya);
  });
}

async function gorseliWebIcinHazirla(dosya: File) {
  const kaynak = await gorselDosyasiniOku(dosya);
  const gorsel = new window.Image();

  await new Promise<void>((resolve, reject) => {
    gorsel.onload = () => resolve();
    gorsel.onerror = () => reject(new Error("Görsel açılamadı"));
    gorsel.src = kaynak;
  });

  const enBuyukKenar = 1800;
  const oran = Math.min(1, enBuyukKenar / Math.max(gorsel.width, gorsel.height));
  const tuval = document.createElement("canvas");
  tuval.width = Math.max(1, Math.round(gorsel.width * oran));
  tuval.height = Math.max(1, Math.round(gorsel.height * oran));
  const cizim = tuval.getContext("2d");

  if (!cizim) {
    throw new Error("Görsel hazırlanamadı");
  }

  cizim.drawImage(gorsel, 0, 0, tuval.width, tuval.height);
  return tuval.toDataURL("image/webp", 0.82);
}

function bolumuKlonla(kaynak: SiteBolumu, sira: number): SiteBolumu {
  return {
    ...kaynak,
    id: idOlustur(),
    sira,
    aktif: true,
    butonlar: kaynak.butonlar.map((buton) => ({ ...buton, id: idOlustur() })),
    listeElemanlari: kaynak.listeElemanlari.map((eleman) => ({
      ...eleman,
      id: idOlustur(),
    })),
  };
}

function iskeletiProjeyeUygula(
  proje: ProjeVerisi,
  iskelet: SektorIskeletSecenegi,
  zorla = false,
) {
  const oncelik = new Map(
    iskelet.bolumOnceligi.map((tur, index) => [tur, index]),
  );

  return {
    ...proje,
    iskelet: iskelet.id,
    sayfalar: proje.sayfalar.map((sayfa) => {
      if (sayfa.ozelBolumSirasi && !zorla) return sayfa;

      const bolumler = [...sayfa.bolumler]
        .sort((birinci, ikinci) => {
          const birinciOncelik = oncelik.get(birinci.tur) ?? 100 + birinci.sira;
          const ikinciOncelik = oncelik.get(ikinci.tur) ?? 100 + ikinci.sira;

          return birinciOncelik - ikinciOncelik || birinci.sira - ikinci.sira;
        })
        .map((bolum, sira) => ({ ...bolum, sira }));

      return { ...sayfa, ozelBolumSirasi: false, bolumler };
    }),
  };
}

function varsayilanBolumOlustur(
  proje: ProjeVerisi,
  tur: BolumTuru,
  sira: number,
): SiteBolumu {
  const hizmetler =
    proje.secilenHizmetler?.length
      ? proje.secilenHizmetler
      : sektorHizmetleriniGetir(proje.sektor);
  const whatsapp = whatsappBaglantisi(proje.whatsapp);
  const telefon = telefonBaglantisi(proje.telefon);
  const ortak = {
    id: idOlustur(),
    tur,
    varyasyon: varyasyonlar[tur]?.[0] ?? "standart",
    aktif: true,
    sira,
    ustBaslik: proje.sektorAdi,
    baslik: "Yeni bölüm",
    aciklama: "Bu alanın metnini sağdaki içerik panelinden düzenleyebilirsiniz.",
    gorsel: "",
    arkaPlanGorseli: "",
    gorselAlaniAcikMi: false,
    animasyon: "asagidan" as const,
    butonlar: [],
    listeElemanlari: [],
  } satisfies SiteBolumu;

  if (["hizmetler", "urunler"].includes(tur)) {
    return {
      ...ortak,
      baslik: "Hizmetlerimiz",
      aciklama:
        "İhtiyacınıza uygun hizmet kapsamını inceleyin; ayrıntıları birlikte netleştirelim.",
      listeElemanlari: hizmetler.map((hizmet) => ({
        id: idOlustur(),
        baslik: hizmet,
        aciklama: `${hizmet} için kapsam, hazırlık ve uygulama bilgileri talebe göre açıklanır.`,
        gorsel: "",
        baglanti: "/iletisim",
      })),
    };
  }

  if (tur === "neden-biz") {
    return {
      ...ortak,
      baslik: "Nasıl Çalışıyoruz?",
      listeElemanlari: [
        ["Talebi dinliyoruz", "İhtiyaç, konum ve beklentileri birlikte netleştiriyoruz."],
        ["Kapsamı açıklıyoruz", "Yapılacak işi ve gerekli hazırlıkları başlamadan paylaşıyoruz."],
        ["Planı uyguluyoruz", "Çalışmayı belirlenen kapsam ve sıra içinde yürütüyoruz."],
        ["Son kontrolü yapıyoruz", "Tamamlanan işi birlikte kontrol ederek teslim ediyoruz."],
      ].map(([baslik, aciklama]) => ({
        id: idOlustur(),
        baslik,
        aciklama,
        gorsel: "",
        baglanti: "",
      })),
    };
  }

  if (tur === "istatistik") {
    return {
      ...ortak,
      ustBaslik: "Çalışma ilkeleri",
      baslik: "Güven Veren Hizmet Düzeni",
      listeElemanlari: ["Açık kapsam", "Düzenli iletişim", "Kontrollü teslim"].map(
        (baslik) => ({
          id: idOlustur(),
          baslik,
          aciklama: `${baslik}, hizmet sürecinin başından sonuna korunur.`,
          gorsel: "",
          baglanti: "",
        }),
      ),
    };
  }

  if (tur === "sss") {
    return {
      ...ortak,
      ustBaslik: "Merak edilenler",
      baslik: "Sık Sorulan Sorular",
      listeElemanlari: [
        ["Nasıl bilgi alabilirim?", "Telefon veya WhatsApp üzerinden talebinizi paylaşabilirsiniz."],
        ["Hizmet kapsamı nasıl belirlenir?", "İhtiyaç ve alan koşulları değerlendirildikten sonra kapsam netleştirilir."],
        ["Uygunluk nasıl öğrenilir?", "Konum ve tarih bilgisi paylaşıldığında güncel uygunluk bildirilir."],
      ].map(([baslik, aciklama]) => ({
        id: idOlustur(),
        baslik,
        aciklama,
        gorsel: "",
        baglanti: "",
      })),
    };
  }

  if (tur === "form") {
    return {
      ...ortak,
      ustBaslik: "Kısa talep formu",
      baslik: "İhtiyacınızı Paylaşın",
      aciklama:
        "Hizmet, konum ve zaman bilgisini girin; talebiniz seçili iletişim kanalına hazırlansın.",
    };
  }

  if (tur === "iletisim") {
    return {
      ...ortak,
      ustBaslik: "İletişim",
      baslik: "Birlikte Planlayalım",
      aciklama:
        "Hizmet kapsamı, uygunluk ve sonraki adımlar için doğrudan iletişime geçin.",
      butonlar: [
        ...(telefon
          ? [{ id: idOlustur(), metin: `Telefon: ${proje.telefon}`, baglanti: telefon }]
          : []),
        ...(whatsapp
          ? [{ id: idOlustur(), metin: "WhatsApp’tan yazın", baglanti: whatsapp }]
          : []),
        ...(proje.eposta
          ? [{ id: idOlustur(), metin: "E-posta gönderin", baglanti: `mailto:${proje.eposta}` }]
          : []),
      ],
    };
  }

  if (tur === "hero") {
    return {
      ...ortak,
      ustBaslik: proje.sektorAdi,
      baslik: `${proje.firmaAdi} ile ihtiyacınıza uygun çözümü planlayın.`,
      aciklama:
        "Hizmet kapsamını inceleyin; konum ve uygunluk bilgisi için bizimle iletişime geçin.",
      butonlar: [
        {
          id: idOlustur(),
          metin: "Hizmetleri inceleyin",
          baglanti: "/hizmetler",
        },
      ],
    };
  }

  return ortak;
}

function sayfalariSirala(sayfalar: SiteSayfasi[]) {
  return [...sayfalar].sort((a, b) => a.sira - b.sira);
}

export default function DuzenleyiciSayfasi() {
  const [proje, setProje] = useState<ProjeVerisi | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aktifSayfaId, setAktifSayfaId] = useState("");
  const [aktifBolumId, setAktifBolumId] = useState("");
  const [cihaz, setCihaz] = useState<Cihaz>("masaustu");
  const [sagPanel, setSagPanel] = useState<SagPanel>("icerik");
  const [onizlemeSurumu, setOnizlemeSurumu] = useState(0);
  const [yeniSayfaAdi, setYeniSayfaAdi] = useState("");
  const [bildirim, setBildirim] = useState("");
  const onizlemeZamanlayicisi = useRef<number | null>(null);
  const bildirimZamanlayicisi = useRef<number | null>(null);

  useEffect(() => {
    const zamanlayici = window.setTimeout(() => {
      const kayit = localStorage.getItem("sitemix-aktif-proje");

      if (!kayit) {
        setYukleniyor(false);
        return;
      }

      try {
        const kayitli = JSON.parse(kayit) as ProjeVerisi;
        const temelProje: ProjeVerisi = {
          ...kayitli,
          siteTipi: "cok-sayfa",
          icerikPaketi:
            kayitli.icerikPaketi ??
            sektorVarsayilanIcerikPaketiniGetir(kayitli.sektor),
          iskelet:
            kayitli.iskelet ?? sektorVarsayilanIskeletiniGetir(kayitli.sektor),
          secilenHizmetler:
            kayitli.secilenHizmetler?.length
              ? kayitli.secilenHizmetler
              : sektorHizmetleriniGetir(kayitli.sektor),
          stilAyarlari:
            kayitli.stilAyarlari ?? sektorVarsayilanStiliniGetir(kayitli.sektor),
        };
        const guncel = iskeletiProjeyeUygula(
          temelProje,
          sektorIskeletiniGetir(temelProje.sektor, temelProje.iskelet),
        );
        const ilkSayfa = sayfalariSirala(guncel.sayfalar)[0];

        setProje(guncel);
        setAktifSayfaId(ilkSayfa?.id ?? "");
        setAktifBolumId(
          [...(ilkSayfa?.bolumler ?? [])].sort((a, b) => a.sira - b.sira)[0]?.id ?? "",
        );
        localStorage.setItem("sitemix-aktif-proje", JSON.stringify(guncel));
      } catch (error) {
        console.error("Proje okunamadı:", error);
      } finally {
        setYukleniyor(false);
      }
    }, 0);

    return () => window.clearTimeout(zamanlayici);
  }, []);

  useEffect(() => {
    return () => {
      if (onizlemeZamanlayicisi.current !== null) {
        window.clearTimeout(onizlemeZamanlayicisi.current);
      }

      if (bildirimZamanlayicisi.current !== null) {
        window.clearTimeout(bildirimZamanlayicisi.current);
      }
    };
  }, []);

  const siraliSayfalar = useMemo(
    () => sayfalariSirala(proje?.sayfalar ?? []),
    [proje?.sayfalar],
  );

  const aktifSayfa = useMemo(
    () => siraliSayfalar.find((sayfa) => sayfa.id === aktifSayfaId) ?? siraliSayfalar[0],
    [aktifSayfaId, siraliSayfalar],
  );

  const aktifBolum = useMemo(
    () => aktifSayfa?.bolumler.find((bolum) => bolum.id === aktifBolumId),
    [aktifBolumId, aktifSayfa],
  );

  const tasarimSecenekleri = useMemo(
    () => (proje ? sektorTasarimSecenekleriniGetir(proje.sektor) : []),
    [proje],
  );

  const iskeletSecenekleri = useMemo(
    () => (proje ? sektorIskeletSecenekleriniGetir(proje.sektor) : []),
    [proje],
  );

  function projeyiKaydet(guncel: ProjeVerisi, mesaj = "Değişiklik kaydedildi") {
    const kaydedilecek = {
      ...guncel,
      siteTipi: "cok-sayfa" as const,
      guncellenmeTarihi: new Date().toISOString(),
    };

    setProje(kaydedilecek);
    localStorage.setItem("sitemix-aktif-proje", JSON.stringify(kaydedilecek));
    setBildirim(mesaj);

    if (onizlemeZamanlayicisi.current !== null) {
      window.clearTimeout(onizlemeZamanlayicisi.current);
    }

    onizlemeZamanlayicisi.current = window.setTimeout(() => {
      setOnizlemeSurumu((surum) => surum + 1);
      onizlemeZamanlayicisi.current = null;
    }, 320);

    if (bildirimZamanlayicisi.current !== null) {
      window.clearTimeout(bildirimZamanlayicisi.current);
    }

    bildirimZamanlayicisi.current = window.setTimeout(() => {
      setBildirim("");
      bildirimZamanlayicisi.current = null;
    }, 1600);
  }

  function sayfayiSec(sayfa: SiteSayfasi) {
    setAktifSayfaId(sayfa.id);
    setAktifBolumId(
      [...sayfa.bolumler].sort((a, b) => a.sira - b.sira)[0]?.id ?? "",
    );
  }

  function sayfaEkle() {
    if (!proje) return;
    const ad = yeniSayfaAdi.trim();
    const slug = slugOlustur(ad);

    if (!ad || !slug) {
      setBildirim("Yeni sayfa için bir ad yazın");
      return;
    }

    if (proje.sayfalar.some((sayfa) => sayfa.slug === slug)) {
      setBildirim("Bu sayfa adresi zaten kullanılıyor");
      return;
    }

    const yeniSayfa: SiteSayfasi = {
      id: idOlustur(),
      rol: "ozel",
      ad,
      slug,
      menuBasligi: ad,
      menuGoster: true,
      anaSayfa: false,
      sira: proje.sayfalar.length,
      bolumler: [
        varsayilanBolumOlustur(proje, "hero", 0),
        varsayilanBolumOlustur(proje, "metin", 1),
        varsayilanBolumOlustur(proje, "iletisim", 2),
      ],
    };

    projeyiKaydet(
      { ...proje, sayfalar: [...proje.sayfalar, yeniSayfa] },
      "Yeni sayfa hazırlandı",
    );
    setYeniSayfaAdi("");
    sayfayiSec(yeniSayfa);
  }

  function sayfaKlonla(sayfa: SiteSayfasi) {
    if (!proje) return;
    let slug = `${slugOlustur(sayfa.slug || sayfa.ad)}-kopya`;
    let sira = 2;

    while (proje.sayfalar.some((aday) => aday.slug === slug)) {
      slug = `${slugOlustur(sayfa.slug || sayfa.ad)}-kopya-${sira}`;
      sira += 1;
    }

    const kopya: SiteSayfasi = {
      ...sayfa,
      id: idOlustur(),
      rol: "ozel",
      ad: `${sayfa.ad} Kopyası`,
      slug,
      menuBasligi: `${sayfa.menuBasligi} Kopyası`,
      anaSayfa: false,
      sira: proje.sayfalar.length,
      bolumler: sayfa.bolumler.map((bolum, index) => bolumuKlonla(bolum, index)),
    };

    projeyiKaydet(
      { ...proje, sayfalar: [...proje.sayfalar, kopya] },
      "Sayfa çoğaltıldı",
    );
    sayfayiSec(kopya);
  }

  function sayfaSil(sayfa: SiteSayfasi) {
    if (!proje || sayfa.anaSayfa) return;
    const kalanlar = proje.sayfalar
      .filter((aday) => aday.id !== sayfa.id)
      .map((aday, index) => ({ ...aday, sira: index }));
    const sonraki = sayfalariSirala(kalanlar)[0];

    projeyiKaydet({ ...proje, sayfalar: kalanlar }, "Sayfa silindi");
    if (sonraki) sayfayiSec(sonraki);
  }

  function sayfaGuncelle(degisiklik: Partial<SiteSayfasi>) {
    if (!proje || !aktifSayfa) return;
    const guncel = { ...aktifSayfa, ...degisiklik };

    if (!guncel.anaSayfa) {
      guncel.slug = slugOlustur(guncel.slug || guncel.ad);
    }

    const cakisma = proje.sayfalar.some(
      (sayfa) => sayfa.id !== guncel.id && !guncel.anaSayfa && sayfa.slug === guncel.slug,
    );

    if (cakisma) {
      setBildirim("Bu sayfa adresi başka bir sayfada kullanılıyor");
      return;
    }

    projeyiKaydet({
      ...proje,
      sayfalar: proje.sayfalar.map((sayfa) =>
        sayfa.id === guncel.id ? guncel : sayfa,
      ),
    });
  }

  function bolumEkle(tur: BolumTuru) {
    if (!proje || !aktifSayfa) return;
    const kaynak = proje.sayfalar
      .flatMap((sayfa) => sayfa.bolumler)
      .find((bolum) => bolum.tur === tur);
    const yeniBolum = kaynak
      ? bolumuKlonla(kaynak, aktifSayfa.bolumler.length)
      : varsayilanBolumOlustur(proje, tur, aktifSayfa.bolumler.length);
    const sayfalar = proje.sayfalar.map((sayfa) =>
      sayfa.id === aktifSayfa.id
        ? { ...sayfa, bolumler: [...sayfa.bolumler, yeniBolum] }
        : sayfa,
    );

    projeyiKaydet({ ...proje, sayfalar }, "Hazır bölüm eklendi");
    setAktifBolumId(yeniBolum.id);
    setSagPanel("icerik");
  }

  function bolumGuncelle(degisiklik: Partial<SiteBolumu>) {
    if (!proje || !aktifSayfa || !aktifBolum) return;
    const sayfalar = proje.sayfalar.map((sayfa) =>
      sayfa.id === aktifSayfa.id
        ? {
            ...sayfa,
            bolumler: sayfa.bolumler.map((bolum) =>
              bolum.id === aktifBolum.id ? { ...bolum, ...degisiklik } : bolum,
            ),
          }
        : sayfa,
    );

    projeyiKaydet({ ...proje, sayfalar });
  }

  function bolumTasi(yon: -1 | 1) {
    if (!proje || !aktifSayfa || !aktifBolum) return;
    const sirali = [...aktifSayfa.bolumler].sort((a, b) => a.sira - b.sira);
    const index = sirali.findIndex((bolum) => bolum.id === aktifBolum.id);
    const hedef = index + yon;

    if (hedef < 0 || hedef >= sirali.length) return;
    [sirali[index], sirali[hedef]] = [sirali[hedef], sirali[index]];
    const bolumler = sirali.map((bolum, sira) => ({ ...bolum, sira }));

    projeyiKaydet({
      ...proje,
      sayfalar: proje.sayfalar.map((sayfa) =>
        sayfa.id === aktifSayfa.id
          ? { ...sayfa, ozelBolumSirasi: true, bolumler }
          : sayfa,
      ),
    });
  }

  function bolumKlonla() {
    if (!proje || !aktifSayfa || !aktifBolum) return;
    const kopya = bolumuKlonla(aktifBolum, aktifSayfa.bolumler.length);

    projeyiKaydet({
      ...proje,
      sayfalar: proje.sayfalar.map((sayfa) =>
        sayfa.id === aktifSayfa.id
          ? { ...sayfa, bolumler: [...sayfa.bolumler, kopya] }
          : sayfa,
      ),
    }, "Bölüm çoğaltıldı");
    setAktifBolumId(kopya.id);
  }

  function bolumSil() {
    if (!proje || !aktifSayfa || !aktifBolum) return;
    const kalanlar = aktifSayfa.bolumler
      .filter((bolum) => bolum.id !== aktifBolum.id)
      .sort((a, b) => a.sira - b.sira)
      .map((bolum, index) => ({ ...bolum, sira: index }));

    projeyiKaydet({
      ...proje,
      sayfalar: proje.sayfalar.map((sayfa) =>
        sayfa.id === aktifSayfa.id ? { ...sayfa, bolumler: kalanlar } : sayfa,
      ),
    }, "Bölüm silindi");
    setAktifBolumId(kalanlar[0]?.id ?? "");
  }

  function listeElemaniGuncelle(
    elemanId: string,
    alan: "baslik" | "aciklama",
    deger: string,
  ) {
    if (!aktifBolum) return;
    bolumGuncelle({
      listeElemanlari: aktifBolum.listeElemanlari.map((eleman) =>
        eleman.id === elemanId ? { ...eleman, [alan]: deger } : eleman,
      ),
    });
  }

  async function gorselDosyasiSecildi(event: ChangeEvent<HTMLInputElement>) {
    const dosya = event.target.files?.[0];

    if (!dosya || !aktifBolum) return;

    if (!dosya.type.startsWith("image/")) {
      setBildirim("Lütfen geçerli bir görsel dosyası seçin");
      return;
    }

    try {
      setBildirim("Görsel web için hazırlanıyor");
      const gorsel = await gorseliWebIcinHazirla(dosya);

      if (gorsel.length > 3_500_000) {
        setBildirim("Görsel çok büyük; daha küçük bir dosya seçin");
        return;
      }

      bolumGuncelle({ gorsel });
    } catch (error) {
      console.error("Görsel hazırlanamadı:", error);
      setBildirim("Görsel hazırlanamadı");
    } finally {
      event.target.value = "";
    }
  }

  function stilGuncelle<K extends keyof SiteStilAyarlari>(
    alan: K,
    deger: SiteStilAyarlari[K],
  ) {
    if (!proje) return;
    const stil = proje.stilAyarlari ?? sektorVarsayilanStiliniGetir(proje.sektor);
    projeyiKaydet({
      ...proje,
      stilAyarlari: { ...stil, [alan]: deger },
    });
  }

  function icerikPaketiDegistir(paket: IcerikPaketiKimligi) {
    if (!proje) return;
    projeyiKaydet(
      hazirIcerikPaketiniUygula(proje, paket),
      "Hazır içerik yaklaşımı uygulandı",
    );
  }

  if (yukleniyor) {
    return (
      <main className={styles.durumSayfasi}>
        <span>SITEMIX COMPOSER</span>
        <h1>Çok sayfalı stüdyo hazırlanıyor.</h1>
      </main>
    );
  }

  if (!proje || !aktifSayfa) {
    return (
      <main className={styles.durumSayfasi}>
        <span>SITEMIX COMPOSER</span>
        <h1>Düzenlenecek proje bulunamadı.</h1>
        <Link href="/studio/yeni">Yeni proje oluştur</Link>
      </main>
    );
  }

  const stil = proje.stilAyarlari ?? sektorVarsayilanStiliniGetir(proje.sektor);
  const siraliBolumler = [...aktifSayfa.bolumler].sort((a, b) => a.sira - b.sira);

  return (
    <main className={styles.studyo}>
      <header className={styles.ustCubuk}>
        <Link href="/studio/yeni" className={styles.geriBaglantisi}>
          <ArrowLeft size={17} />
          Proje bilgileri
        </Link>

        <div className={styles.marka}>
          <strong>SITEMIX</strong>
          <span>COMPOSER</span>
        </div>

        <div className={styles.ustAksiyonlar}>
          {bildirim && (
            <span className={styles.bildirim}>
              <Check size={14} />
              {bildirim}
            </span>
          )}
          <Link href="/studio/icerik" className={styles.ikincilAksiyon}>
            Tüm metinler
          </Link>
          <Link href="/studio/onizleme" className={styles.anaAksiyon}>
            Tam önizleme
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <section className={styles.calismaAlani}>
        <aside className={styles.solPanel}>
          <div className={styles.panelBasligi}>
            <div>
              <span>ÇOK SAYFALI PROJE</span>
              <h1>{proje.firmaAdi}</h1>
            </div>
            <small>{siraliSayfalar.length} sayfa</small>
          </div>

          <div className={styles.sayfaListesi}>
            {siraliSayfalar.map((sayfa, index) => (
              <button
                type="button"
                key={sayfa.id}
                className={
                  sayfa.id === aktifSayfa.id
                    ? `${styles.sayfaButonu} ${styles.aktif}`
                    : styles.sayfaButonu
                }
                onClick={() => sayfayiSec(sayfa)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{sayfa.ad}</strong>
                  <small>{sayfa.anaSayfa ? "/" : `/${sayfa.slug}`}</small>
                </div>
                {sayfa.menuGoster ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            ))}
          </div>

          <div className={styles.sayfaEkleme}>
            <label htmlFor="yeni-sayfa">Yeni sayfa</label>
            <div>
              <input
                id="yeni-sayfa"
                value={yeniSayfaAdi}
                onChange={(event) => setYeniSayfaAdi(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sayfaEkle();
                }}
                placeholder="Örn. Kampanyalar"
              />
              <button type="button" onClick={sayfaEkle} aria-label="Sayfa ekle">
                <FilePlus2 size={17} />
              </button>
            </div>
          </div>

          <div className={styles.panelAyirici} />

          <div className={styles.altBaslik}>
            <div>
              <span>AKTİF SAYFA</span>
              <h2>Bölümler</h2>
            </div>
            <small>{siraliBolumler.length}</small>
          </div>

          <div className={styles.bolumListesi}>
            {siraliBolumler.map((bolum, index) => (
              <button
                type="button"
                key={bolum.id}
                className={
                  bolum.id === aktifBolumId
                    ? `${styles.bolumButonu} ${styles.aktif}`
                    : styles.bolumButonu
                }
                onClick={() => {
                  setAktifBolumId(bolum.id);
                  setSagPanel("icerik");
                }}
              >
                <GripVertical size={14} />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{bolum.baslik || bolum.tur}</strong>
                  <small>{bolum.tur}</small>
                </div>
                {!bolum.aktif && <EyeOff size={13} />}
              </button>
            ))}
          </div>

          <details className={styles.bolumKutuphane} open>
            <summary>
              <Plus size={15} />
              Hazır bölüm ekle
            </summary>
            <div>
              {bolumKutuphane.map((oge) => (
                <button type="button" key={oge.tur} onClick={() => bolumEkle(oge.tur)}>
                  <LayoutGrid size={15} />
                  <span>
                    <strong>{oge.ad}</strong>
                    <small>{oge.aciklama}</small>
                  </span>
                </button>
              ))}
            </div>
          </details>
        </aside>

        <section className={styles.onizlemeAlani}>
          <div className={styles.onizlemeUst}>
            <div>
              <span>CANLI SAYFA</span>
              <strong>{aktifSayfa.ad}</strong>
            </div>

            <div className={styles.cihazSecici} aria-label="Önizleme genişliği">
              {([
                ["masaustu", Monitor, "Masaüstü"],
                ["tablet", Tablet, "Tablet"],
                ["mobil", Smartphone, "Mobil"],
              ] as const).map(([id, Ikon, ad]) => (
                <button
                  type="button"
                  key={id}
                  className={cihaz === id ? styles.aktif : ""}
                  onClick={() => setCihaz(id)}
                  title={ad}
                >
                  <Ikon size={16} />
                  <span>{ad}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setOnizlemeSurumu((surum) => surum + 1)}
                title="Önizlemeyi yenile"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          <div className={styles.tuval}>
            <div
              className={styles.cihazCercevesi}
              data-cihaz={cihaz}
              style={{ maxWidth: `${cihazGenislikleri[cihaz]}px` }}
            >
              <iframe
                key={`${onizlemeSurumu}-${aktifSayfa.id}-${cihaz}`}
                src={`/studio/onizleme?gomulu=1&sayfa=${encodeURIComponent(
                  aktifSayfa.slug,
                )}`}
                title={`${aktifSayfa.ad} ${cihaz} önizlemesi`}
              />
            </div>
          </div>
        </section>

        <aside className={styles.sagPanel}>
          <div className={styles.panelSekmeleri}>
            <button
              type="button"
              className={sagPanel === "icerik" ? styles.aktif : ""}
              onClick={() => setSagPanel("icerik")}
            >
              <PanelRight size={15} />
              İçerik
            </button>
            <button
              type="button"
              className={sagPanel === "tasarim" ? styles.aktif : ""}
              onClick={() => setSagPanel("tasarim")}
            >
              <LayoutGrid size={15} />
              Tasarım
            </button>
          </div>

          {sagPanel === "icerik" ? (
            <div className={styles.panelIcerigi}>
              <section className={styles.ayarGrubu}>
                <div className={styles.ayarBasligi}>
                  <span>SAYFA</span>
                  <div className={styles.satirAksiyonlari}>
                    <button type="button" onClick={() => sayfaKlonla(aktifSayfa)} title="Sayfayı çoğalt">
                      <Copy size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => sayfaGuncelle({ menuGoster: !aktifSayfa.menuGoster })}
                      title={aktifSayfa.menuGoster ? "Menüden gizle" : "Menüde göster"}
                    >
                      {aktifSayfa.menuGoster ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => sayfaSil(aktifSayfa)}
                      disabled={aktifSayfa.anaSayfa}
                      title="Sayfayı sil"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <label>
                  Sayfa adı
                  <input
                    value={aktifSayfa.ad}
                    onChange={(event) =>
                      sayfaGuncelle({
                        ad: event.target.value,
                        menuBasligi:
                          aktifSayfa.menuBasligi === aktifSayfa.ad
                            ? event.target.value
                            : aktifSayfa.menuBasligi,
                      })
                    }
                  />
                </label>
                <label>
                  Menü başlığı
                  <input
                    value={aktifSayfa.menuBasligi}
                    onChange={(event) => sayfaGuncelle({ menuBasligi: event.target.value })}
                  />
                </label>
                <label>
                  Sayfa adresi
                  <div className={styles.slugAlani}>
                    <span>/</span>
                    <input
                      value={aktifSayfa.slug}
                      disabled={aktifSayfa.anaSayfa}
                      onChange={(event) => sayfaGuncelle({ slug: event.target.value })}
                    />
                  </div>
                </label>
              </section>

              {aktifBolum ? (
                <section className={styles.ayarGrubu}>
                  <div className={styles.ayarBasligi}>
                    <span>SEÇİLİ BÖLÜM · {aktifBolum.tur}</span>
                    <div className={styles.satirAksiyonlari}>
                      <button type="button" onClick={() => bolumTasi(-1)} title="Yukarı taşı">
                        <ArrowUp size={14} />
                      </button>
                      <button type="button" onClick={() => bolumTasi(1)} title="Aşağı taşı">
                        <ArrowDown size={14} />
                      </button>
                      <button type="button" onClick={bolumKlonla} title="Çoğalt">
                        <Copy size={14} />
                      </button>
                      <button type="button" onClick={bolumSil} title="Sil">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <label className={styles.anahtarSatiri}>
                    <span>
                      <strong>Bölümü göster</strong>
                      <small>Geçici olarak gizleyebilirsiniz</small>
                    </span>
                    <input
                      type="checkbox"
                      checked={aktifBolum.aktif}
                      onChange={(event) => bolumGuncelle({ aktif: event.target.checked })}
                    />
                  </label>

                  <label>
                    Küçük başlık
                    <input
                      value={aktifBolum.ustBaslik}
                      onChange={(event) => bolumGuncelle({ ustBaslik: event.target.value })}
                    />
                  </label>
                  <label>
                    Ana başlık
                    <textarea
                      rows={3}
                      value={aktifBolum.baslik}
                      onChange={(event) => bolumGuncelle({ baslik: event.target.value })}
                    />
                  </label>
                  <label>
                    Açıklama
                    <textarea
                      rows={5}
                      value={aktifBolum.aciklama}
                      onChange={(event) => bolumGuncelle({ aciklama: event.target.value })}
                    />
                  </label>
                  <label>
                    Yerleşim
                    <select
                      value={aktifBolum.varyasyon}
                      onChange={(event) => bolumGuncelle({ varyasyon: event.target.value })}
                    >
                      {(varyasyonlar[aktifBolum.tur] ?? [aktifBolum.varyasyon]).map(
                        (varyasyon) => (
                          <option key={varyasyon} value={varyasyon}>
                            {varyasyon.replace(/-/g, " ")}
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  {gorselAlaniDestekleyenTurler.has(aktifBolum.tur) && (
                    <div className={styles.gorselAlaniAyari}>
                      <label className={styles.anahtarSatiri}>
                        <span>
                          <strong>Görsel alanını aç</strong>
                          <small>İlk oluşturulduğunda kapalıdır; açılmadıkça sitede yer kaplamaz</small>
                        </span>
                        <input
                          type="checkbox"
                          checked={aktifBolum.gorselAlaniAcikMi ?? false}
                          onChange={(event) =>
                            bolumGuncelle({ gorselAlaniAcikMi: event.target.checked })
                          }
                        />
                      </label>

                      {aktifBolum.gorselAlaniAcikMi && (
                        <label className={styles.gorselBaglantiAlani}>
                          <span>
                            <ImagePlus size={15} />
                            Görsel bağlantısı
                          </span>
                          <input
                            type="url"
                            value={aktifBolum.gorsel}
                            placeholder="https://... veya /images/..."
                            onChange={(event) => bolumGuncelle({ gorsel: event.target.value })}
                          />
                          <span className={styles.veyaAyirici}>VEYA</span>
                          <span className={styles.dosyaSecici}>
                            <ImagePlus size={15} />
                            Bilgisayardan görsel seç
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/avif"
                              onChange={gorselDosyasiSecildi}
                            />
                          </span>
                          <small>Görsel web için otomatik küçültülür. Boş bırakılırsa bekleyen alan görünür.</small>
                        </label>
                      )}
                    </div>
                  )}

                  {aktifBolum.listeElemanlari.length > 0 && (
                    <div className={styles.listeEditoru}>
                      <span>KART VE LİSTE METİNLERİ</span>
                      {aktifBolum.listeElemanlari.map((eleman, index) => (
                        <article key={eleman.id}>
                          <small>{String(index + 1).padStart(2, "0")}</small>
                          <input
                            value={eleman.baslik}
                            onChange={(event) =>
                              listeElemaniGuncelle(eleman.id, "baslik", event.target.value)
                            }
                          />
                          <textarea
                            rows={3}
                            value={eleman.aciklama}
                            onChange={(event) =>
                              listeElemaniGuncelle(eleman.id, "aciklama", event.target.value)
                            }
                          />
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              ) : (
                <div className={styles.bosPanel}>
                  <Plus size={22} />
                  <p>Bu sayfaya hazır bir bölüm ekleyerek başlayın.</p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.panelIcerigi}>
              <section className={styles.ayarGrubu}>
                <div className={styles.ayarBasligi}>
                  <span>SEKTÖREL İSKELET ŞABLONLARI · {iskeletSecenekleri.length} SEÇENEK</span>
                </div>
                <p className={styles.iskeletAciklamasi}>
                  Bunlar tema değildir. Menü, açılış, bölüm sırası ve sayfa geometrisi birlikte değişir.
                </p>
                <div className={styles.iskeletSecenekleri}>
                  {iskeletSecenekleri.map((secenek) => {
                    const aktifMi = proje.iskelet === secenek.id;

                    return (
                      <button
                        type="button"
                        key={secenek.id}
                        className={aktifMi ? styles.aktif : ""}
                        onClick={() =>
                          projeyiKaydet(
                            iskeletiProjeyeUygula(proje, secenek, true),
                            "Site iskeleti uygulandı",
                          )
                        }
                      >
                        <span
                          className={styles.iskeletOnizleme}
                          data-iskelet-akis={secenek.akis}
                        >
                          <i />
                          <i />
                          <i />
                          <i />
                        </span>
                        <span className={styles.iskeletKartBasligi}>
                          <LayoutTemplate size={15} />
                          <strong>{secenek.ad}</strong>
                        </span>
                        <small>{secenek.etiket}</small>
                        <p>{secenek.ozellikler.join(" · ")}</p>
                        {aktifMi && <Check size={15} />}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className={styles.ayarGrubu}>
                <div className={styles.ayarBasligi}>
                  <span>RENK VE YÜZEY YÖNÜ</span>
                </div>
                <div className={styles.tasarimSecenekleri}>
                  {tasarimSecenekleri.map((secenek) => {
                    const palet = temaPaletiniGetir(secenek.tema);
                    const aktifMi = proje.tasarim === secenek.id;

                    return (
                      <button
                        type="button"
                        key={secenek.id}
                        className={aktifMi ? styles.aktif : ""}
                        onClick={() =>
                          projeyiKaydet({
                            ...proje,
                            tasarim: secenek.id,
                            tema: secenek.tema,
                          }, "Tasarım yönü uygulandı")
                        }
                      >
                        <span className={styles.paletOnizleme}>
                          {[palet.arkaPlan, palet.yazi, palet.vurgu, palet.ikinciArkaPlan].map(
                            (renk) => <i key={renk} style={{ background: renk }} />,
                          )}
                        </span>
                        <strong>{secenek.ad}</strong>
                        <small>{secenek.etiket}</small>
                        {aktifMi && <Check size={15} />}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className={styles.ayarGrubu}>
                <div className={styles.ayarBasligi}>
                  <span>HAZIR İÇERİK YAKLAŞIMI</span>
                </div>
                <div className={styles.paketSecenekleri}>
                  {icerikPaketleri.map((paket) => (
                    <button
                      type="button"
                      key={paket.id}
                      className={proje.icerikPaketi === paket.id ? styles.aktif : ""}
                      onClick={() => icerikPaketiDegistir(paket.id)}
                    >
                      <strong>{paket.ad}</strong>
                      <small>{paket.aciklama}</small>
                    </button>
                  ))}
                </div>
              </section>

              <section className={styles.ayarGrubu}>
                <div className={styles.ayarBasligi}>
                  <span>SERBEST TASARIM AYARLARI</span>
                </div>
                {([
                  ["genislik", "İçerik genişliği", [["dar", "Dar"], ["dengeli", "Dengeli"], ["genis", "Geniş"]]],
                  ["bosluk", "Dikey boşluk", [["kompakt", "Kompakt"], ["dengeli", "Dengeli"], ["ferah", "Ferah"]]],
                  ["kose", "Köşe karakteri", [["keskin", "Keskin"], ["yumusak", "Yumuşak"], ["yuvarlak", "Yuvarlak"]]],
                  ["tipografi", "Tipografi", [["modern", "Modern"], ["kurumsal", "Kurumsal"], ["editorial", "Editoryal"]]],
                  ["hareket", "Hareket", [["sakin", "Sakin"], ["dengeli", "Dengeli"], ["canli", "Canlı"]]],
                ] as const).map(([alan, etiket, secenekler]) => (
                  <div className={styles.segmentGrubu} key={alan}>
                    <span>{etiket}</span>
                    <div>
                      {secenekler.map(([deger, ad]) => (
                        <button
                          type="button"
                          key={deger}
                          className={stil[alan] === deger ? styles.aktif : ""}
                          onClick={() => stilGuncelle(alan, deger)}
                        >
                          {ad}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}

          <div className={styles.yayinKarti}>
            <span>YAYINA HAZIRLIK</span>
            <strong>Mobil, sitemap ve Vercel kontrolleri yayın adımında çalışır.</strong>
            <Link href="/studio/yayin">
              Yayın ayarlarına geç
              <ArrowRight size={15} />
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
