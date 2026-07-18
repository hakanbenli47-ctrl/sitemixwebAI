"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LayoutTemplate,
  Monitor,
  Palette,
  Smartphone,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  sektorTasariminiGetir,
  sektorTasarimSecenekleriniGetir,
  type SektorTasarimSecenegi,
  type TemaKimligi,
} from "@/data/sektorTasarimlari";
import { sektorKararNoktalariniGetir } from "@/data/sektorGorselDili";
import { temaPaletiniGetir } from "@/data/temaPaletleri";
import styles from "./tema.module.css";

interface Tema {
  id: TemaKimligi;
  ad: string;
  kategori: string;
  aciklama: string;
  arkaPlan: string;
  ikinciArkaPlan: string;
  yazi: string;
  solukYazi: string;
  vurgu: string;
  cizgi: string;
  butonYazi: string;
  karakter: string;
  uygunSektorler: string[];
}

interface SiteSayfasi {
  id: string;
  ad: string;
  slug: string;
  menuBasligi: string;
  menuGoster: boolean;
  anaSayfa: boolean;
  sira: number;
  bolumler: unknown[];
}

interface ProjeVerisi {
  id: string;
  firmaAdi: string;
  sektor: string;
  sektorAdi: string;
  siteTipi: "tek-sayfa" | "cok-sayfa";
  telefon: string;
  whatsapp: string;
  eposta: string;
  adres: string;
  slug: string;
  tema: TemaKimligi | "";
  tasarim?: string;
  sayfalar: SiteSayfasi[];
  githubAktarildiMi?: boolean;
  githubRepoAdi?: string;
  githubUrl?: string;
  sonGithubAktarimi?: string;
  olusturulmaTarihi: string;
  guncellenmeTarihi: string;
}

const temaTanimlari: Tema[] = [
  {
    id: "aurora",
    ad: "Aurora",
    kategori: "Premium modern",
    aciklama:
      "Krem zemin, gece laciverti yazılar ve canlı yeşil vurgu ile güven veren modern görünüm.",
    arkaPlan: "#F6F2E8",
    ikinciArkaPlan: "#E8F0E6",
    yazi: "#101A22",
    solukYazi: "#4F5B55",
    vurgu: "#176B46",
    cizgi: "#D7D0C1",
    butonYazi: "#FFFFFF",
    karakter: "Net, ferah, güven veren",
    uygunSektorler: ["temizlik", "danismanlik", "kurs", "teknik-servis", "nakliyat"],
  },
  {
    id: "obsidian",
    ad: "Obsidian",
    kategori: "Koyu prestij",
    aciklama:
      "Siyaha yakın zemin, kırık beyaz yazı ve mint vurgu ile güçlü ve pahalı hissettiren tema.",
    arkaPlan: "#0B0F12",
    ikinciArkaPlan: "#151B20",
    yazi: "#F4EFE6",
    solukYazi: "#A9B0B4",
    vurgu: "#A7F3C1",
    cizgi: "rgba(244, 239, 230, 0.14)",
    butonYazi: "#0B0F12",
    karakter: "Güçlü, premium, kontrast",
    uygunSektorler: ["oto-yikama", "oto-servis", "spor-salonu", "yazilim", "ajans"],
  },
  {
    id: "ivory",
    ad: "Ivory",
    kategori: "Zarif kurumsal",
    aciklama:
      "Fildişi arka plan, mürekkep siyahı yazılar ve bordo vurgu ile sakin ama kaliteli duruş.",
    arkaPlan: "#FBF7EF",
    ikinciArkaPlan: "#EFE7D8",
    yazi: "#181512",
    solukYazi: "#71675B",
    vurgu: "#8F2E2E",
    cizgi: "#DDD2C1",
    butonYazi: "#FFFFFF",
    karakter: "Zarif, net, güvenli",
    uygunSektorler: ["avukat", "muhasebe", "danismanlik", "emlak"],
  },
  {
    id: "terra",
    ad: "Terra",
    kategori: "Doğal sıcak",
    aciklama:
      "Toprak tonları, koyu kahve yazı ve zeytin vurgu ile samimi yerel işletme hissi verir.",
    arkaPlan: "#EFE3D1",
    ikinciArkaPlan: "#DED0B7",
    yazi: "#2A1B12",
    solukYazi: "#604C3D",
    vurgu: "#59662E",
    cizgi: "#C8B698",
    butonYazi: "#FFFFFF",
    karakter: "Sıcak, doğal, samimi",
    uygunSektorler: ["veteriner", "pilates", "otel", "pansiyon", "dekorasyon"],
  },
  {
    id: "noir",
    ad: "Noir Gold",
    kategori: "Lüks hizmet",
    aciklama:
      "Kömür siyahı arka plan, şampanya yazı ve altın vurgu ile lüks hizmet sunumu.",
    arkaPlan: "#14110E",
    ikinciArkaPlan: "#211B15",
    yazi: "#F5EBDD",
    solukYazi: "#B8A995",
    vurgu: "#D5AC62",
    cizgi: "rgba(245, 235, 221, 0.15)",
    butonYazi: "#14110E",
    karakter: "Lüks, ciddi, etkileyici",
    uygunSektorler: ["otel", "emlak", "mermer", "estetik-merkezi", "mobilya"],
  },
  {
    id: "lagoon",
    ad: "Lagoon",
    kategori: "Temiz ve ferah",
    aciklama:
      "Buz mavisi zemin, koyu petrol yazı ve turkuaz vurgu ile temiz, sakin ve profesyonel görünür.",
    arkaPlan: "#EEF8F8",
    ikinciArkaPlan: "#DCEFF0",
    yazi: "#10282B",
    solukYazi: "#486265",
    vurgu: "#086B6B",
    cizgi: "#BBD9DA",
    butonYazi: "#FFFFFF",
    karakter: "Ferah, temiz, düzenli",
    uygunSektorler: ["klinik", "dis-klinigi", "diyetisyen", "psikolog", "temizlik"],
  },
  {
    id: "ruby",
    ad: "Ruby",
    kategori: "Cesur satış",
    aciklama:
      "Açık pembe-bej zemin, derin bordo yazı ve kırmızı vurgu ile dikkat çeken satış odaklı tema.",
    arkaPlan: "#FFF1EC",
    ikinciArkaPlan: "#F7DCD4",
    yazi: "#301111",
    solukYazi: "#6F4945",
    vurgu: "#C53232",
    cizgi: "#E0B8AE",
    butonYazi: "#FFFFFF",
    karakter: "Cesur, sıcak, dikkat çekici",
    uygunSektorler: ["guzellik-salonu", "kuafor", "berber", "pastane", "restoran"],
  },
  {
    id: "sage",
    ad: "Sage",
    kategori: "Sakin güven",
    aciklama:
      "Adaçayı yeşili tonları, koyu orman yazı ve bakır vurgu ile yumuşak güven duygusu oluşturur.",
    arkaPlan: "#EEF1E6",
    ikinciArkaPlan: "#DDE4D2",
    yazi: "#1D2A1F",
    solukYazi: "#526048",
    vurgu: "#9A6A3E",
    cizgi: "#C6CEBB",
    butonYazi: "#FFFFFF",
    karakter: "Sakin, doğal, güvenilir",
    uygunSektorler: ["veteriner", "pilates", "psikolog", "diyetisyen", "dekorasyon"],
  },
  {
    id: "copper",
    ad: "Copper",
    kategori: "Endüstriyel",
    aciklama:
      "Açık gri zemin, grafit yazı ve bakır-turuncu vurgu ile üretim ve teknik işler için güçlü.",
    arkaPlan: "#ECEBE6",
    ikinciArkaPlan: "#DBD9D1",
    yazi: "#171A1A",
    solukYazi: "#515654",
    vurgu: "#9D3F20",
    cizgi: "#BFC0B9",
    butonYazi: "#FFFFFF",
    karakter: "Keskin, teknik, güçlü",
    uygunSektorler: ["mermer", "insaat", "oto-servis", "teknik-servis", "mobilya"],
  },
  {
    id: "neon",
    ad: "Neon Pulse",
    kategori: "Dijital enerji",
    aciklama:
      "Koyu mor-siyah zemin, açık yazı ve neon mor vurgu ile genç ve dijital bir etki verir.",
    arkaPlan: "#100B1F",
    ikinciArkaPlan: "#1B1131",
    yazi: "#F2EEFF",
    solukYazi: "#B8ACD6",
    vurgu: "#7040D8",
    cizgi: "rgba(242, 238, 255, 0.16)",
    butonYazi: "#FFFFFF",
    karakter: "Dijital, enerjik, farklı",
    uygunSektorler: ["yazilim", "ajans", "portfolyo", "spor-salonu"],
  },
  {
    id: "mono",
    ad: "Mono Grid",
    kategori: "Minimal mimari",
    aciklama:
      "Beyaza yakın zemin, net siyah yazı ve gri-mavi vurgu ile mimari ve portfolyo için sade.",
    arkaPlan: "#F7F7F3",
    ikinciArkaPlan: "#E8E8E2",
    yazi: "#0E0E0E",
    solukYazi: "#686868",
    vurgu: "#4B5F75",
    cizgi: "#CECEC8",
    butonYazi: "#FFFFFF",
    karakter: "Minimal, net, mimari",
    uygunSektorler: ["mimarlik", "emlak", "portfolyo", "fotografci", "ajans"],
  },
  {
    id: "royal",
    ad: "Royal Blue",
    kategori: "Kurumsal premium",
    aciklama:
      "Koyu lacivert zemin, açık yazı ve altın-mavi vurgu ile ciddi kurumsal prestij sağlar.",
    arkaPlan: "#0C1830",
    ikinciArkaPlan: "#142746",
    yazi: "#F3F6FB",
    solukYazi: "#B8C4D8",
    vurgu: "#E0B85A",
    cizgi: "rgba(243, 246, 251, 0.15)",
    butonYazi: "#0C1830",
    karakter: "Kurumsal, pahalı, ciddi",
    uygunSektorler: ["avukat", "muhasebe", "danismanlik", "emlak", "sigorta"],
  },
  {
    id: "sand",
    ad: "Sandstone",
    kategori: "Yumuşak yerel",
    aciklama:
      "Kum beji zemin, sıcak siyah yazı ve turuncu vurgu ile ulaşılabilir ve samimi görünür.",
    arkaPlan: "#F4E6CF",
    ikinciArkaPlan: "#E7D0AC",
    yazi: "#23170D",
    solukYazi: "#5F482F",
    vurgu: "#A84716",
    cizgi: "#D3B98E",
    butonYazi: "#FFFFFF",
    karakter: "Samimi, açık, satış odaklı",
    uygunSektorler: ["nakliyat", "temizlik", "restoran", "kafe", "teknik-servis"],
  },
  {
    id: "clinic",
    ad: "Clinic White",
    kategori: "Sağlık güveni",
    aciklama:
      "Saf beyaz, medikal yeşil ve koyu petrol yazı ile sağlık sitelerinde güven ve temizlik verir.",
    arkaPlan: "#F8FCFA",
    ikinciArkaPlan: "#E7F3EF",
    yazi: "#0E2521",
    solukYazi: "#4B6660",
    vurgu: "#166C5B",
    cizgi: "#C7DDD7",
    butonYazi: "#FFFFFF",
    karakter: "Temiz, güven veren, profesyonel",
    uygunSektorler: ["klinik", "dis-klinigi", "veteriner", "psikolog", "diyetisyen"],
  },
  {
    id: "bistro",
    ad: "Bistro",
    kategori: "Yeme içme",
    aciklama:
      "Krem zemin, espresso yazı ve domates kırmızısı vurgu ile restoran menülerini iştahlı gösterir.",
    arkaPlan: "#FFF4E2",
    ikinciArkaPlan: "#F3D7AF",
    yazi: "#2B160C",
    solukYazi: "#684934",
    vurgu: "#B83D24",
    cizgi: "#DDBE91",
    butonYazi: "#FFFFFF",
    karakter: "Sıcak, iştahlı, canlı",
    uygunSektorler: ["restoran", "kafe", "pastane", "catering"],
  },
  {
    id: "artisan",
    ad: "Artisan",
    kategori: "El işçiliği",
    aciklama:
      "Kâğıt dokusu hissi veren tonlar, koyu kahve yazı ve lacivert vurgu ile butik kalite algısı.",
    arkaPlan: "#F1E7D8",
    ikinciArkaPlan: "#E1D0B9",
    yazi: "#251B14",
    solukYazi: "#594A3D",
    vurgu: "#284B63",
    cizgi: "#C9B69B",
    butonYazi: "#FFFFFF",
    karakter: "Butik, emek, kaliteli",
    uygunSektorler: ["mobilya", "mermer", "dekorasyon", "fotografci", "kuafor"],
  },
  {
    id: "skyline",
    ad: "Skyline",
    kategori: "Modern şehir",
    aciklama:
      "Açık mavi-gri zemin, gece mavisi yazı ve elektrik mavisi vurgu ile hızlı ve modern görünür.",
    arkaPlan: "#EFF4FA",
    ikinciArkaPlan: "#DCE8F4",
    yazi: "#101A2B",
    solukYazi: "#4F6075",
    vurgu: "#2563EB",
    cizgi: "#C4D2E4",
    butonYazi: "#FFFFFF",
    karakter: "Modern, hızlı, net",
    uygunSektorler: ["emlak", "yazilim", "ajans", "transfer", "danismanlik"],
  },
  {
    id: "forest",
    ad: "Forest",
    kategori: "Derin doğal",
    aciklama:
      "Koyu yeşil zemin, açık krem yazı ve limon yeşili vurgu ile doğal ama güçlü bir karakter.",
    arkaPlan: "#102018",
    ikinciArkaPlan: "#1A3025",
    yazi: "#F1EEDC",
    solukYazi: "#B9BEA7",
    vurgu: "#B9D86B",
    cizgi: "rgba(241, 238, 220, 0.15)",
    butonYazi: "#102018",
    karakter: "Doğal, derin, güçlü",
    uygunSektorler: ["otel", "pansiyon", "veteriner", "pilates", "dekorasyon"],
  },
  {
    id: "studio",
    ad: "Creative Studio",
    kategori: "Yaratıcı marka",
    aciklama:
      "Kırık beyaz zemin, siyah yazı ve canlı fuşya vurgu ile kreatif işlerde akılda kalır.",
    arkaPlan: "#FAF7F2",
    ikinciArkaPlan: "#EEE9E1",
    yazi: "#111111",
    solukYazi: "#66615B",
    vurgu: "#A8267B",
    cizgi: "#D8D1C7",
    butonYazi: "#FFFFFF",
    karakter: "Yaratıcı, canlı, iddialı",
    uygunSektorler: ["ajans", "fotografci", "portfolyo", "guzellik-salonu", "kuafor"],
  },
  {
    id: "marble",
    ad: "Marble",
    kategori: "Taş ve dekorasyon",
    aciklama:
      "Soğuk taş beyazı, antrasit yazı ve bronz vurgu ile mermer, dekorasyon ve mimari için özel.",
    arkaPlan: "#F2F0EA",
    ikinciArkaPlan: "#E2E0DA",
    yazi: "#1A1A18",
    solukYazi: "#56534F",
    vurgu: "#74502F",
    cizgi: "#C9C5BC",
    butonYazi: "#FFFFFF",
    karakter: "Taş, lüks, mimari",
    uygunSektorler: ["mermer", "mimarlik", "insaat", "mobilya", "dekorasyon"],
  },
  {
    id: "pearl",
    ad: "Pearl Care",
    kategori: "Bakım ve güzellik",
    aciklama:
      "İnci beyazı zemin, pudra katmanlar ve mürdüm vurgu ile danışmanlık ve randevu odaklı zarif salon kimliği.",
    arkaPlan: "#FFF8F5",
    ikinciArkaPlan: "#F3E6E2",
    yazi: "#261A1D",
    solukYazi: "#67555A",
    vurgu: "#963A5D",
    cizgi: "#DCC9C9",
    butonYazi: "#FFFFFF",
    karakter: "Zarif, kişisel, uzman",
    uygunSektorler: ["guzellik-salonu", "kuafor", "berber"],
  },
  {
    id: "hygiene",
    ad: "Hygiene Mint",
    kategori: "Temizlik ve hijyen",
    aciklama:
      "Steril mint zemin, koyu petrol yazı ve kontrollü yeşil vurgu ile yüzey güvenliği ve kalite kontrolünü öne çıkarır.",
    arkaPlan: "#F2FBF8",
    ikinciArkaPlan: "#DDEFEA",
    yazi: "#102923",
    solukYazi: "#48645C",
    vurgu: "#087564",
    cizgi: "#B9D9D0",
    butonYazi: "#FFFFFF",
    karakter: "Temiz, doğrulanabilir, güvenli",
    uygunSektorler: ["temizlik", "koltuk-yikama", "hali-yikama", "ilaclama"],
  },
  {
    id: "torque",
    ad: "Torque Garage",
    kategori: "Otomotiv atölyesi",
    aciklama:
      "Grafit atölye zemini, kırık beyaz bilgi alanları ve güvenlik turuncusu ile araç kabul ve iş emri hissi verir.",
    arkaPlan: "#0E1114",
    ikinciArkaPlan: "#1A2025",
    yazi: "#F7F4ED",
    solukYazi: "#B7BEC2",
    vurgu: "#FF6A1A",
    cizgi: "#343B40",
    butonYazi: "#111416",
    karakter: "Teknik, güçlü, kontrollü",
    uygunSektorler: ["oto-yikama", "oto-detaylandirma", "arac-kaplama"],
  },
  {
    id: "signal",
    ad: "Service Signal",
    kategori: "Teknik servis",
    aciklama:
      "Soğuk servis grisi, koyu teknik yazı ve sinyal sarısı ile ölçüm, güvenlik ve servis raporunu görünür kılar.",
    arkaPlan: "#F3F5F6",
    ikinciArkaPlan: "#E0E5E7",
    yazi: "#111A20",
    solukYazi: "#4F5E66",
    vurgu: "#C79A00",
    cizgi: "#C4CDD2",
    butonYazi: "#111A20",
    karakter: "Ölçümlü, güvenli, sahaya hazır",
    uygunSektorler: ["elektrikci", "tesisatci", "kombi-servisi", "ilaclama"],
  },
  {
    id: "cargo",
    ad: "Cargo Route",
    kategori: "Nakliyat operasyonu",
    aciklama:
      "Manifesto kremi, rota grisi ve yükleme turuncusu ile envanter, paketleme ve teslim sürecini operasyonel gösterir.",
    arkaPlan: "#F3F0E8",
    ikinciArkaPlan: "#E1E5E3",
    yazi: "#162126",
    solukYazi: "#526167",
    vurgu: "#B5451B",
    cizgi: "#C7CDC9",
    butonYazi: "#FFFFFF",
    karakter: "Planlı, izlenebilir, operasyonel",
    uygunSektorler: ["nakliyat"],
  },
];

const temalar = temaTanimlari.map((tema) => ({
  ...tema,
  ...temaPaletiniGetir(tema.id),
}));

const duzenAdlari: Record<SektorTasarimSecenegi["duzen"], string> = {
  teknik: "Teknik servis akışı",
  sinematik: "Güçlü marka anlatısı",
  servis: "Hızlı hizmet akışı",
  editorial: "Editoryal marka düzeni",
  klinik: "Sakin güven düzeni",
  katalog: "Karşılaştırmalı hizmet düzeni",
  rezervasyon: "Randevu ve talep akışı",
  portfoy: "Uzmanlık ve sonuç düzeni",
  egitim: "Program ve bilgi düzeni",
  zanaat: "Ustalık ve üretim düzeni",
};

const yogunlukAdlari: Record<SektorTasarimSecenegi["yogunluk"], string> = {
  ferah: "Ferah ve seçici",
  dengeli: "Dengeli ve açıklayıcı",
  kompakt: "Yoğun ve hızlı taranabilir",
};

const kartStiliAdlari: Record<SektorTasarimSecenegi["kartStili"], string> = {
  keskin: "Keskin teknik paneller",
  yumusak: "Yumuşak bilgi alanları",
  cerceveli: "Çerçeveli içerik blokları",
  katmanli: "Katmanlı vurgu alanları",
};

export default function TemaSecimSayfasi() {
  const router = useRouter();

  const [proje, setProje] = useState<ProjeVerisi | null>(null);
  const [secilenTasarim, setSecilenTasarim] = useState<string | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState("");

  useEffect(() => {
    const yuklemeZamanlayicisi = window.setTimeout(() => {
      const kayitliProje = localStorage.getItem("sitemix-aktif-proje");

      if (!kayitliProje) {
        setYukleniyor(false);
        return;
      }

      try {
        const projeVerisi = JSON.parse(kayitliProje) as ProjeVerisi;
        const baslangicTasarimi = sektorTasariminiGetir(
          projeVerisi.sektor,
          projeVerisi.tasarim,
          projeVerisi.tema,
        );

        setProje(projeVerisi);
        setSecilenTasarim(baslangicTasarimi?.id ?? null);
      } catch (error) {
        console.error("Proje yüklenemedi:", error);
        localStorage.removeItem("sitemix-aktif-proje");
      } finally {
        setYukleniyor(false);
      }
    }, 0);

    return () => window.clearTimeout(yuklemeZamanlayicisi);
  }, []);

  const tasarimSecenekleri = useMemo(() => {
    return proje ? sektorTasarimSecenekleriniGetir(proje.sektor) : [];
  }, [proje]);

  const sektorKararNoktalari = useMemo(() => {
    return proje ? sektorKararNoktalariniGetir(proje.sektor) : [];
  }, [proje]);

  const aktifTasarim = tasarimSecenekleri.find(
    (tasarim) => tasarim.id === secilenTasarim,
  );
  const aktifTema = temalar.find((tema) => tema.id === aktifTasarim?.tema);

  function tasarimSec(tasarim: SektorTasarimSecenegi) {
    setSecilenTasarim(tasarim.id);
    setHata("");
  }

  function kaydetVeDevamEt() {
    if (!proje) {
      return;
    }

    if (!aktifTasarim) {
      setHata("Devam etmek için bir site tasarımı seçmelisin.");
      return;
    }

    const guncelProje: ProjeVerisi = {
      ...proje,
      tema: aktifTasarim.tema,
      tasarim: aktifTasarim.id,
      guncellenmeTarihi: new Date().toISOString(),
    };

    localStorage.setItem(
      "sitemix-aktif-proje",
      JSON.stringify(guncelProje),
    );

    const projelerKaydi = localStorage.getItem("sitemix-projeler");

    if (projelerKaydi) {
      try {
        const projeler = JSON.parse(projelerKaydi) as ProjeVerisi[];

        if (Array.isArray(projeler)) {
          const guncelProjeler = projeler.some((kayit) => kayit.id === guncelProje.id)
            ? projeler.map((kayit) =>
                kayit.id === guncelProje.id ? guncelProje : kayit,
              )
            : [guncelProje, ...projeler];

          localStorage.setItem(
            "sitemix-projeler",
            JSON.stringify(guncelProjeler),
          );
        }
      } catch {
        localStorage.setItem(
          "sitemix-projeler",
          JSON.stringify([guncelProje]),
        );
      }
    } else {
      localStorage.setItem(
        "sitemix-projeler",
        JSON.stringify([guncelProje]),
      );
    }

    router.push("/studio/icerik");
  }

  if (yukleniyor) {
    return (
      <main className={styles.durumSayfasi}>
        <span>SITEMIX STUDIO</span>
        <h1>Temalar hazırlanıyor.</h1>
      </main>
    );
  }

  if (!proje) {
    return (
      <main className={styles.durumSayfasi}>
        <span>SITEMIX STUDIO</span>
        <h1>Aktif proje bulunamadı.</h1>
        <p>Önce yeni bir proje oluşturmalısın.</p>

        <Link href="/studio/yeni">
          Yeni proje oluştur
          <ArrowRight size={18} />
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.sayfa}>
      <header className={styles.ustAlan}>
        <Link href="/studio/duzenle" className={styles.geri}>
          <ArrowLeft size={18} />
          Sayfa düzeni
        </Link>

        <Link href="/" className={styles.logo}>
          <span>SITEMIX</span>
          <small>STUDIO</small>
        </Link>

        <div className={styles.adim}>
          <strong>03 / Tema</strong>
        </div>
      </header>

      <section className={styles.baslikAlani}>
        <div>
          <span>OTOMATİK SİTE TASARIMI</span>

          <h1>
            {proje.sektorAdi} için hazırlanmış
            <br />
            üç farklı site yönü.
          </h1>

          <p className={styles.baslikAciklamasi}>
            İçerik sırası, renk rolleri, hizmet anlatımı ve ana aksiyon sektör
            verilerinden birlikte üretilir. Bir yön seçtiğinde yalnız renk değil,
            sitenin bütün karar akışı değişir.
          </p>
        </div>

        <div className={styles.projeBilgisi}>
          <div>
            <span>Firma</span>
            <strong>{proje.firmaAdi}</strong>
          </div>

          <div>
            <span>Sektör</span>
            <strong>{proje.sektorAdi}</strong>
          </div>

          <div>
            <span>Sayfa sayısı</span>
            <strong>{proje.sayfalar.length}</strong>
          </div>
        </div>
      </section>

      <section className={styles.calismaAlani}>
        <div className={styles.temaListesi}>
          <div className={styles.listeBasligi}>
            <div>
              <Palette size={20} />
              <h2>Sektör verisinden üretilen site yönleri</h2>
            </div>

            <p>{tasarimSecenekleri.length} ayrı içerik ve tasarım sistemi</p>
          </div>

          <div className={styles.temaIzgarasi}>
            {tasarimSecenekleri.map((tasarim) => {
              const tema = temalar.find((aday) => aday.id === tasarim.tema);
              const aktif = secilenTasarim === tasarim.id;

              if (!tema) {
                return null;
              }

              return (
                <button
                  type="button"
                  key={tasarim.id}
                  aria-pressed={aktif}
                  className={`${styles.temaSecenegi} ${
                    aktif ? styles.aktif : ""
                  }`}
                  style={
                    {
                      "--tema-arka": tema.arkaPlan,
                      "--tema-ikinci": tema.ikinciArkaPlan,
                      "--tema-yazi": tema.yazi,
                      "--tema-soluk": tema.solukYazi,
                      "--tema-vurgu": tema.vurgu,
                      "--tema-cizgi": tema.cizgi,
                      "--tema-buton-yazi": tema.butonYazi,
                    } as React.CSSProperties
                  }
                  onClick={() => tasarimSec(tasarim)}
                >
                  <div
                    className={styles.temaOnizleme}
                    data-onizleme-duzen={tasarim.duzen}
                    data-onizleme-kart={tasarim.kartStili}
                  >
                    <div className={styles.ornekMenu}>
                      <strong>{proje.firmaAdi}</strong>
                      <span />
                    </div>

                    <div className={styles.ornekHero}>
                      <small>{tasarim.etiket}</small>
                      <strong>{proje.sektorAdi}</strong>
                      <h4>{tasarim.ad}</h4>
                      <p>{tasarim.aciklama}</p>
                      <span className={styles.ornekAksiyon}>
                        Bilgi alın
                        <ArrowRight size={13} />
                      </span>
                    </div>

                    <div className={styles.ornekIcerikSatiri}>
                      <span>Hizmetler</span>
                      <span>Güven</span>
                      <span>İletişim</span>
                    </div>
                  </div>

                  <div className={styles.temaBilgisi}>
                    <div>
                      <span>{tasarim.etiket}</span>
                      <h3>{tasarim.ad}</h3>
                    </div>

                    {aktif && (
                      <div className={styles.seciliIsareti}>
                        <Check size={17} />
                      </div>
                    )}
                  </div>

                  <p>{tasarim.aciklama}</p>

                  <div className={styles.karakterSatiri}>
                    <strong>
                      {tema.kategori} · {duzenAdlari[tasarim.duzen]}
                    </strong>
                  </div>

                  <ul className={styles.kartOzellikleri}>
                    {tasarim.ozellikler.slice(-2).map((ozellik) => (
                      <li key={ozellik}>{ozellik}</li>
                    ))}
                  </ul>

                  <span className={styles.gorselsizRozet}>
                    İçerik ve tipografi odaklı
                  </span>

                  <small className={styles.onerilen}>
                    {tasarim === tasarimSecenekleri[0]
                      ? "OTOMATİK OLARAK ÖNERİLEN"
                      : "FARKLI BİR MARKA YÖNÜ"}
                  </small>
                </button>
              );
            })}
          </div>
        </div>

        <aside className={styles.sagAlan}>
          <div className={styles.sabitAlan}>
            <span className={styles.sagEtiket}>SEÇİLEN SİTE DÜZENİ</span>

            {aktifTema && aktifTasarim ? (
              <>
                <h2>{aktifTasarim.ad}</h2>
                <p>{aktifTasarim.aciklama}</p>

                <div
                  className={styles.seciliTemaKart}
                  data-duzen={aktifTasarim.duzen}
                  style={
                    {
                      "--tema-arka": aktifTema.arkaPlan,
                      "--tema-ikinci": aktifTema.ikinciArkaPlan,
                      "--tema-yazi": aktifTema.yazi,
                      "--tema-soluk": aktifTema.solukYazi,
                      "--tema-vurgu": aktifTema.vurgu,
                      "--tema-cizgi": aktifTema.cizgi,
                      "--tema-buton-yazi": aktifTema.butonYazi,
                    } as React.CSSProperties
                  }
                >
                  <span>{aktifTasarim.etiket}</span>
                  <strong>{proje.firmaAdi}</strong>
                  <p>{aktifTema.ad} renk sistemi</p>
                </div>

                <div className={styles.tasarimDetaylari}>
                  <div>
                    <small>Sayfa kurgusu</small>
                    <strong>{duzenAdlari[aktifTasarim.duzen]}</strong>
                  </div>
                  <div>
                    <small>Sunum yaklaşımı</small>
                    <strong>Metin odaklı içerik sistemi</strong>
                  </div>
                  <div>
                    <small>İçerik yoğunluğu</small>
                    <strong>{yogunlukAdlari[aktifTasarim.yogunluk]}</strong>
                  </div>
                  <div>
                    <small>Kart biçimi</small>
                    <strong>{kartStiliAdlari[aktifTasarim.kartStili]}</strong>
                  </div>
                </div>

                <div className={styles.otomatikKontroller}>
                  <small>OTOMATİK OLARAK AYARLANANLAR</small>
                  <ul>
                    <li>Sektöre göre bölüm ve karar sırası</li>
                    <li>Okunabilir başlık, açıklama ve düğme renkleri</li>
                    <li>Mobil ve masaüstüne uyarlanan içerik ritmi</li>
                    <li>Doğru talep, randevu veya teklif aksiyonu</li>
                  </ul>
                </div>

                <div className={styles.sektorKararlari}>
                  <div className={styles.sektorKararlariBaslik}>
                    <small>SEKTÖREL KARAR MİMARİSİ</small>
                    <strong>{aktifTema.karakter}</strong>
                  </div>

                  {sektorKararNoktalari.map((karar, index) => (
                    <div
                      className={styles.sektorKarari}
                      key={`${karar.etiket}-${karar.deger}`}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <small>{karar.etiket}</small>
                        <strong>{karar.deger}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <ul className={styles.tasarimOzellikleri}>
                  {aktifTasarim.ozellikler.map((ozellik) => (
                    <li key={ozellik}>
                      <Check size={15} />
                      <span>{ozellik}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.renkler}>
                  <div>
                    <span style={{ backgroundColor: aktifTema.arkaPlan }} />
                    <small>Arka plan</small>
                  </div>

                  <div>
                    <span style={{ backgroundColor: aktifTema.yazi }} />
                    <small>Yazı</small>
                  </div>

                  <div>
                    <span style={{ backgroundColor: aktifTema.vurgu }} />
                    <small>Vurgu</small>
                  </div>

                  <div>
                    <span style={{ backgroundColor: aktifTema.ikinciArkaPlan }} />
                    <small>İkinci alan</small>
                  </div>
                </div>

                <div className={styles.uyumluluk}>
                  <div>
                    <Monitor size={18} />
                    <span>Masaüstü görünüm</span>
                  </div>

                  <div>
                    <Smartphone size={18} />
                    <span>Mobil görünüm</span>
                  </div>

                  <div>
                    <LayoutTemplate size={18} />
                    <span>{proje.sayfalar.length} sayfa yapısı</span>
                  </div>

                  <div>
                    <Palette size={18} />
                    <span>Yüksek kontrastlı, okunabilir içerik düzeni</span>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.bosSecim}>
                <LayoutTemplate size={30} />

                <p>Ayrıntılarını görmek için soldan bir tema seç.</p>
              </div>
            )}

            {hata && <p className={styles.hata}>{hata}</p>}

            <button
              type="button"
              className={styles.devamButonu}
              onClick={kaydetVeDevamEt}
            >
              İçerik düzenlemeye geç
              <ArrowRight size={19} />
            </button>

            <small className={styles.not}>
              Tasarım daha sonra değiştirilebilir. Girilen içerikler silinmez.
            </small>
          </div>
        </aside>
      </section>
    </main>
  );
}
