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
import { sektorTemaOnerileriniGetir } from "@/data/sektorSunumProfilleri";
import styles from "./tema.module.css";

type TemaKimligi =
  | "aurora"
  | "obsidian"
  | "ivory"
  | "terra"
  | "noir"
  | "lagoon"
  | "ruby"
  | "sage"
  | "copper"
  | "neon"
  | "mono"
  | "royal"
  | "sand"
  | "clinic"
  | "bistro"
  | "artisan"
  | "skyline"
  | "forest"
  | "studio"
  | "marble";

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
  sayfalar: SiteSayfasi[];
  githubAktarildiMi?: boolean;
  githubRepoAdi?: string;
  githubUrl?: string;
  sonGithubAktarimi?: string;
  olusturulmaTarihi: string;
  guncellenmeTarihi: string;
}

const temalar: Tema[] = [
  {
    id: "aurora",
    ad: "Aurora",
    kategori: "Premium modern",
    aciklama:
      "Krem zemin, gece laciverti yazılar ve canlı yeşil vurgu ile güven veren modern görünüm.",
    arkaPlan: "#F6F2E8",
    ikinciArkaPlan: "#E8F0E6",
    yazi: "#101A22",
    solukYazi: "#66716C",
    vurgu: "#1F8A5B",
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
    solukYazi: "#786454",
    vurgu: "#6F7D45",
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
    solukYazi: "#5F797B",
    vurgu: "#1E9C9A",
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
    solukYazi: "#815E5A",
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
    solukYazi: "#66715F",
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
    solukYazi: "#636866",
    vurgu: "#C65A32",
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
    vurgu: "#8B5CF6",
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
    solukYazi: "#765E43",
    vurgu: "#D36B2D",
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
    solukYazi: "#637D77",
    vurgu: "#2C8C78",
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
    solukYazi: "#7B604E",
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
    solukYazi: "#786A5D",
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
    solukYazi: "#667489",
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
    vurgu: "#D946A6",
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
    solukYazi: "#6F6D68",
    vurgu: "#A67C52",
    cizgi: "#C9C5BC",
    butonYazi: "#FFFFFF",
    karakter: "Taş, lüks, mimari",
    uygunSektorler: ["mermer", "mimarlik", "insaat", "mobilya", "dekorasyon"],
  },
];

export default function TemaSecimSayfasi() {
  const router = useRouter();

  const [proje, setProje] = useState<ProjeVerisi | null>(null);
  const [secilenTema, setSecilenTema] = useState<TemaKimligi | null>(null);
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

        setProje(projeVerisi);

        if (projeVerisi.tema) {
          setSecilenTema(projeVerisi.tema);
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

  const siraliTemalar = useMemo(() => {
    if (!proje) {
      return temalar;
    }

    const oneriler = sektorTemaOnerileriniGetir(proje.sektor);

    return [...temalar].sort((a, b) => {
      const aSirasi = oneriler.indexOf(a.id);
      const bSirasi = oneriler.indexOf(b.id);
      const aUygun = aSirasi !== -1;
      const bUygun = bSirasi !== -1;

      if (aUygun === bUygun) {
        if (aUygun && aSirasi !== bSirasi) {
          return aSirasi - bSirasi;
        }

        return 0;
      }

      return aUygun ? -1 : 1;
    });
  }, [proje]);

  const aktifTema = temalar.find((tema) => tema.id === secilenTema);

  function temaSec(temaId: TemaKimligi) {
    setSecilenTema(temaId);
    setHata("");
  }

  function kaydetVeDevamEt() {
    if (!proje) {
      return;
    }

    if (!secilenTema) {
      setHata("Devam etmek için bir tema seçmelisin.");
      return;
    }

    const guncelProje: ProjeVerisi = {
      ...proje,
      tema: secilenTema,
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
          <span>TEMA SEÇİMİ</span>

          <h1>
            Sitenin görsel
            <br />
            karakterini belirle.
          </h1>
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
              <h2>Temalar</h2>
            </div>

            <p>{temalar.length} tema</p>
          </div>

          <div className={styles.temaIzgarasi}>
            {siraliTemalar.map((tema) => {
              const aktif = secilenTema === tema.id;
              const sektoreUygun = sektorTemaOnerileriniGetir(
                proje.sektor,
              ).includes(tema.id);

              return (
                <button
                  type="button"
                  key={tema.id}
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
                  onClick={() => temaSec(tema.id)}
                >
                  <div className={styles.temaOnizleme}>
                    <div className={styles.ornekMenu}>
                      <strong>{proje.firmaAdi}</strong>
                      <span />
                    </div>

                    <div className={styles.ornekHero}>
                      <small>{tema.kategori}</small>

                      <div className={styles.ornekBaslik}>
                        <span />
                        <span />
                      </div>

                      <div className={styles.ornekMetin}>
                        <i />
                        <i />
                        <i />
                      </div>

                      <div className={styles.ornekCizgi} />

                      <div className={styles.ornekButon} />
                    </div>
                  </div>

                  <div className={styles.temaBilgisi}>
                    <div>
                      <span>{tema.kategori}</span>
                      <h3>{tema.ad}</h3>
                    </div>

                    {aktif && (
                      <div className={styles.seciliIsareti}>
                        <Check size={17} />
                      </div>
                    )}
                  </div>

                  <p>{tema.aciklama}</p>

                  <div className={styles.karakterSatiri}>
                    <strong>{tema.karakter}</strong>
                  </div>

                  {sektoreUygun && (
                    <small className={styles.onerilen}>
                      SEKTÖR İÇİN ÖNERİLEN
                    </small>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <aside className={styles.sagAlan}>
          <div className={styles.sabitAlan}>
            <span className={styles.sagEtiket}>SEÇİLEN TEMA</span>

            {aktifTema ? (
              <>
                <h2>{aktifTema.ad}</h2>
                <p>{aktifTema.aciklama}</p>

                <div className={styles.seciliTemaKart}
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
                  <span>{aktifTema.kategori}</span>
                  <strong>{proje.firmaAdi}</strong>
                  <p>{aktifTema.karakter}</p>
                </div>

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
              Tema daha sonra değiştirilebilir. Girilen içerikler silinmez.
            </small>
          </div>
        </aside>
      </section>
    </main>
  );
}
