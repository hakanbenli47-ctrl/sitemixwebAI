"use client";

import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./siteGorunumu.module.css";
import semaStyles from "./sektorSemalari.module.css";
import SektorSahnesi from "./SektorSahnesi";
import { sektorKararNoktalariniGetir } from "@/data/sektorGorselDili";
import type {
  AnimasyonTuru,
  SiteBolumu,
  SiteSayfasi,
} from "@/data/sektorSablonlari";
import { sektorHizmetleriniGetir } from "@/data/sektorSablonlari";
import { sektorFormProfiliniGetir } from "@/data/sektorFormProfilleri";
import { temaKarakterleriniGetir } from "@/data/sektorSunumProfilleri";
import {
  sektorTasariminiGetir,
  type SektorTasarimSecenegi,
} from "@/data/sektorTasarimlari";
import {
  epostaGecerliMi,
  telefonBaglantisi,
  whatsappBaglantisi,
} from "@/lib/iletisim";
import type { ProjeVerisi } from "@/types/proje";

interface TemaRenkleri {
  arkaPlan: string;
  ikinciArkaPlan: string;
  yazi: string;
  solukYazi: string;
  vurgu: string;
  cizgi: string;
  butonYazi: string;
}

type DahiliBaglantiFonksiyonu = (
  baglanti: string,
  varsayilanBolumTuru?: SiteBolumu["tur"],
) => void;

const temaRenkleri: Record<string, TemaRenkleri> = {
  aurora: {
    arkaPlan: "#F6F2E8",
    ikinciArkaPlan: "#E8F0E6",
    yazi: "#101A22",
    solukYazi: "#4F5B55",
    vurgu: "#176B46",
    cizgi: "#D7D0C1",
    butonYazi: "#FFFFFF",
  },

  obsidian: {
    arkaPlan: "#0B0F12",
    ikinciArkaPlan: "#151B20",
    yazi: "#F4EFE6",
    solukYazi: "#A9B0B4",
    vurgu: "#A7F3C1",
    cizgi: "rgba(244, 239, 230, 0.14)",
    butonYazi: "#0B0F12",
  },

  ivory: {
    arkaPlan: "#FBF7EF",
    ikinciArkaPlan: "#EFE7D8",
    yazi: "#181512",
    solukYazi: "#71675B",
    vurgu: "#8F2E2E",
    cizgi: "#DDD2C1",
    butonYazi: "#FFFFFF",
  },

  terra: {
    arkaPlan: "#EFE3D1",
    ikinciArkaPlan: "#DED0B7",
    yazi: "#2A1B12",
    solukYazi: "#604C3D",
    vurgu: "#59662E",
    cizgi: "#C8B698",
    butonYazi: "#FFFFFF",
  },

  noir: {
    arkaPlan: "#14110E",
    ikinciArkaPlan: "#211B15",
    yazi: "#F5EBDD",
    solukYazi: "#B8A995",
    vurgu: "#D5AC62",
    cizgi: "rgba(245, 235, 221, 0.15)",
    butonYazi: "#14110E",
  },

  lagoon: {
    arkaPlan: "#EEF8F8",
    ikinciArkaPlan: "#DCEFF0",
    yazi: "#10282B",
    solukYazi: "#486265",
    vurgu: "#086B6B",
    cizgi: "#BBD9DA",
    butonYazi: "#FFFFFF",
  },

  ruby: {
    arkaPlan: "#FFF1EC",
    ikinciArkaPlan: "#F7DCD4",
    yazi: "#301111",
    solukYazi: "#6F4945",
    vurgu: "#C53232",
    cizgi: "#E0B8AE",
    butonYazi: "#FFFFFF",
  },

  sage: {
    arkaPlan: "#EEF1E6",
    ikinciArkaPlan: "#DDE4D2",
    yazi: "#1D2A1F",
    solukYazi: "#526048",
    vurgu: "#9A6A3E",
    cizgi: "#C6CEBB",
    butonYazi: "#FFFFFF",
  },

  copper: {
    arkaPlan: "#ECEBE6",
    ikinciArkaPlan: "#DBD9D1",
    yazi: "#171A1A",
    solukYazi: "#515654",
    vurgu: "#9D3F20",
    cizgi: "#BFC0B9",
    butonYazi: "#FFFFFF",
  },

  neon: {
    arkaPlan: "#100B1F",
    ikinciArkaPlan: "#1B1131",
    yazi: "#F2EEFF",
    solukYazi: "#B8ACD6",
    vurgu: "#7040D8",
    cizgi: "rgba(242, 238, 255, 0.16)",
    butonYazi: "#FFFFFF",
  },

  mono: {
    arkaPlan: "#F7F7F3",
    ikinciArkaPlan: "#E8E8E2",
    yazi: "#0E0E0E",
    solukYazi: "#686868",
    vurgu: "#4B5F75",
    cizgi: "#CECEC8",
    butonYazi: "#FFFFFF",
  },

  royal: {
    arkaPlan: "#0C1830",
    ikinciArkaPlan: "#142746",
    yazi: "#F3F6FB",
    solukYazi: "#B8C4D8",
    vurgu: "#E0B85A",
    cizgi: "rgba(243, 246, 251, 0.15)",
    butonYazi: "#0C1830",
  },

  sand: {
    arkaPlan: "#F4E6CF",
    ikinciArkaPlan: "#E7D0AC",
    yazi: "#23170D",
    solukYazi: "#5F482F",
    vurgu: "#A84716",
    cizgi: "#D3B98E",
    butonYazi: "#FFFFFF",
  },

  clinic: {
    arkaPlan: "#F8FCFA",
    ikinciArkaPlan: "#E7F3EF",
    yazi: "#0E2521",
    solukYazi: "#4B6660",
    vurgu: "#166C5B",
    cizgi: "#C7DDD7",
    butonYazi: "#FFFFFF",
  },

  bistro: {
    arkaPlan: "#FFF4E2",
    ikinciArkaPlan: "#F3D7AF",
    yazi: "#2B160C",
    solukYazi: "#684934",
    vurgu: "#B83D24",
    cizgi: "#DDBE91",
    butonYazi: "#FFFFFF",
  },

  artisan: {
    arkaPlan: "#F1E7D8",
    ikinciArkaPlan: "#E1D0B9",
    yazi: "#251B14",
    solukYazi: "#594A3D",
    vurgu: "#284B63",
    cizgi: "#C9B69B",
    butonYazi: "#FFFFFF",
  },

  skyline: {
    arkaPlan: "#EFF4FA",
    ikinciArkaPlan: "#DCE8F4",
    yazi: "#101A2B",
    solukYazi: "#4F6075",
    vurgu: "#2563EB",
    cizgi: "#C4D2E4",
    butonYazi: "#FFFFFF",
  },

  forest: {
    arkaPlan: "#102018",
    ikinciArkaPlan: "#1A3025",
    yazi: "#F1EEDC",
    solukYazi: "#B9BEA7",
    vurgu: "#B9D86B",
    cizgi: "rgba(241, 238, 220, 0.15)",
    butonYazi: "#102018",
  },

  studio: {
    arkaPlan: "#FAF7F2",
    ikinciArkaPlan: "#EEE9E1",
    yazi: "#111111",
    solukYazi: "#66615B",
    vurgu: "#A8267B",
    cizgi: "#D8D1C7",
    butonYazi: "#FFFFFF",
  },

  marble: {
    arkaPlan: "#F2F0EA",
    ikinciArkaPlan: "#E2E0DA",
    yazi: "#1A1A18",
    solukYazi: "#56534F",
    vurgu: "#74502F",
    cizgi: "#C9C5BC",
    butonYazi: "#FFFFFF",
  },

  pearl: {
    arkaPlan: "#FFF8F5",
    ikinciArkaPlan: "#F3E6E2",
    yazi: "#261A1D",
    solukYazi: "#67555A",
    vurgu: "#963A5D",
    cizgi: "#DCC9C9",
    butonYazi: "#FFFFFF",
  },

  hygiene: {
    arkaPlan: "#F2FBF8",
    ikinciArkaPlan: "#DDEFEA",
    yazi: "#102923",
    solukYazi: "#48645C",
    vurgu: "#087564",
    cizgi: "#B9D9D0",
    butonYazi: "#FFFFFF",
  },

  torque: {
    arkaPlan: "#0E1114",
    ikinciArkaPlan: "#1A2025",
    yazi: "#F7F4ED",
    solukYazi: "#B7BEC2",
    vurgu: "#FF6A1A",
    cizgi: "#343B40",
    butonYazi: "#111416",
  },

  signal: {
    arkaPlan: "#F3F5F6",
    ikinciArkaPlan: "#E0E5E7",
    yazi: "#111A20",
    solukYazi: "#4F5E66",
    vurgu: "#C79A00",
    cizgi: "#C4CDD2",
    butonYazi: "#111A20",
  },

  cargo: {
    arkaPlan: "#F3F0E8",
    ikinciArkaPlan: "#E1E5E3",
    yazi: "#162126",
    solukYazi: "#526167",
    vurgu: "#B5451B",
    cizgi: "#C7CDC9",
    butonYazi: "#FFFFFF",
  },

  standard: {
    arkaPlan: "#F6F2E8",
    ikinciArkaPlan: "#E8F0E6",
    yazi: "#101A22",
    solukYazi: "#4F5B55",
    vurgu: "#176B46",
    cizgi: "#D7D0C1",
    butonYazi: "#FFFFFF",
  },
};

const sayfaGecisi: Variants = {
  baslangic: {
    opacity: 0,
    y: 35,
    filter: "blur(8px)",
  },

  gorunur: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  cikis: {
    opacity: 0,
    y: -25,
    filter: "blur(6px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const bolumGecisi: Variants = {
  gizli: {
    opacity: 0,
    y: 70,
    filter: "blur(8px)",
  },

  gorunur: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const bolumAnimasyonlari: Record<AnimasyonTuru, Variants> = {
  asagidan: bolumGecisi,
  soldan: {
    gizli: { opacity: 0, x: -70 },
    gorunur: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
    },
  },
  sagdan: {
    gizli: { opacity: 0, x: 70 },
    gorunur: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
    },
  },
  soluklasarak: {
    gizli: { opacity: 0 },
    gorunur: {
      opacity: 1,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  },
  maskeli: {
    gizli: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    gorunur: {
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
    },
  },
  yok: {
    gizli: { opacity: 1 },
    gorunur: { opacity: 1 },
  },
};

const listeKapsayici: Variants = {
  gizli: {},

  gorunur: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const listeElemaniGecisi: Variants = {
  gizli: {
    opacity: 0,
    y: 45,
  },

  gorunur: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function bolumNumarasi(index: number) {
  return String(index + 1).padStart(2, "0");
}

function turkceSlugOlustur(metin: unknown) {
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

function temizBaglantiOlustur(baglanti: string) {
  const ilkParca = baglanti.trim();

  if (!ilkParca) {
    return "";
  }

  const domainsiz = ilkParca.replace(/^https?:\/\/[^/]+/i, "");

  return domainsiz
    .replace(/^\/+/, "")
    .split("?")[0]
    .split("#")[0]
    .replace(/\/+$/, "");
}

function baglantidakiHash(baglanti: string) {
  const hashIndex = baglanti.indexOf("#");

  if (hashIndex === -1) {
    return "";
  }

  return baglanti
    .slice(hashIndex + 1)
    .trim()
    .replace(/^\/+/, "");
}

function hariciBaglantiMi(baglanti: string) {
  return baglanti.startsWith("http://") || baglanti.startsWith("https://");
}

function ozelBaglantiMi(baglanti: string) {
  return (
    hariciBaglantiMi(baglanti) ||
    baglanti.startsWith("tel:") ||
    baglanti.startsWith("mailto:") ||
    baglanti.startsWith("sms:")
  );
}

function dahiliHrefOlustur(baglanti: string) {
  const deger = baglanti.trim();

  if (!deger || deger === "/") {
    return "/";
  }

  if (ozelBaglantiMi(deger) || deger.startsWith("#")) {
    return deger;
  }

  const yol = temizBaglantiOlustur(deger);
  const hash = baglantidakiHash(deger);

  return `${yol ? `/${yol}` : "/"}${hash ? `#${hash}` : ""}`;
}

function varyasyonSinifi(varyasyon: string) {
  const anahtar = varyasyon.trim().replace(/-/g, "_");

  return anahtar ? styles[`varyasyon_${anahtar}`] ?? "" : "";
}

function sayfalariSirala(sayfalar: SiteSayfasi[]) {
  return [...sayfalar].sort((a, b) => {
    if (a.anaSayfa && !b.anaSayfa) {
      return -1;
    }

    if (!a.anaSayfa && b.anaSayfa) {
      return 1;
    }

    return a.sira - b.sira;
  });
}

function anaSayfayiBul(sayfalar: SiteSayfasi[]) {
  return (
    sayfalar.find((sayfa) => sayfa.anaSayfa) ??
    sayfalar.find((sayfa) => !sayfa.slug.trim()) ??
    sayfalariSirala(sayfalar)[0] ??
    null
  );
}

function bolumeKaydir(bolumId: string, hareketiAzalt = false) {
  window.setTimeout(() => {
    const hedef = document.getElementById(`bolum-${bolumId}`);

    hedef?.scrollIntoView({
      behavior: hareketiAzalt ? "auto" : "smooth",
      block: "start",
    });
  }, 500);
}

function AnimasyonluBaslik({
  ustBaslik,
  baslik,
  aciklama,
}: {
  ustBaslik: string;
  baslik: string;
  aciklama: string;
}) {
  return (
    <div className={styles.bolumBasligi}>
      {ustBaslik.trim() && (
        <motion.span
          className={styles.kucukBaslik}
          initial={false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
        >
          {ustBaslik}
        </motion.span>
      )}

      {baslik.trim() && (
        <motion.h2
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.8,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {baslik}
        </motion.h2>
      )}

      {aciklama.trim() && (
        <motion.p
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            delay: 0.18,
          }}
        >
          {aciklama}
        </motion.p>
      )}
    </div>
  );
}

function Butonlar({
  bolum,
  dahiliBaglantiAc,
}: {
  bolum: SiteBolumu;
  dahiliBaglantiAc: DahiliBaglantiFonksiyonu;
}) {
  const butonlar = bolum.butonlar.filter(
    (buton) => buton.metin.trim() && buton.baglanti.trim(),
  );

  if (butonlar.length === 0) {
    return null;
  }

  return (
    <motion.div
      className={styles.butonlar}
      variants={listeKapsayici}
      initial={false}
      whileInView="gorunur"
      viewport={{ once: true, amount: 0.4 }}
    >
      {butonlar.map((buton) => {
        const hizmetButonuMu =
          turkceSlugOlustur(buton.metin).includes("hizmet") ||
          temizBaglantiOlustur(buton.baglanti).includes("hizmet");

        const ozelBaglanti = ozelBaglantiMi(buton.baglanti);

        return (
          <motion.a
            key={buton.id}
            variants={listeElemaniGecisi}
            href={ozelBaglanti
              ? buton.baglanti
              : dahiliHrefOlustur(buton.baglanti)}
            target={hariciBaglantiMi(buton.baglanti) ? "_blank" : undefined}
            rel="noreferrer"
            onClick={(event) => {
              if (ozelBaglanti) {
                return;
              }

              event.preventDefault();

              dahiliBaglantiAc(
                buton.baglanti,
                hizmetButonuMu ? "hizmetler" : undefined,
              );
            }}
            whileHover={{
              y: -4,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <span>{buton.metin}</span>
            <ArrowRight size={16} />
          </motion.a>
        );
      })}
    </motion.div>
  );
}

interface HeroBilgisi {
  etiket: string;
  deger: string;
}

function MarkaSeridi({
  sektorAdi,
  hizmetler,
}: {
  sektorAdi: string;
  hizmetler: string[];
}) {
  const ogeler = [sektorAdi, ...hizmetler].filter(Boolean);

  if (ogeler.length === 0) {
    return null;
  }

  return (
    <div
      className={styles.markaSeridi}
      data-site-alani="hizmet-seridi"
      aria-label="Öne çıkan hizmetler"
    >
      <div className={styles.markaSeridiAkisi}>
        {[...ogeler, ...ogeler].map((oge, index) => (
          <span key={`${oge}-${index}`} aria-hidden={index >= ogeler.length}>
            <i />
            {oge}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroBolumu({
  bolum,
  tema,
  firmaAdi,
  sektor,
  sektorAdi,
  tasarim,
  bilgiler,
  dahiliBaglantiAc,
}: {
  bolum: SiteBolumu;
  tema: string;
  firmaAdi: string;
  sektor: string;
  sektorAdi: string;
  tasarim?: SektorTasarimSecenegi;
  bilgiler: HeroBilgisi[];
  dahiliBaglantiAc: DahiliBaglantiFonksiyonu;
}) {
  const arkaPlanStili = bolum.arkaPlanGorseli
    ? {
        backgroundImage: `linear-gradient(rgba(5, 8, 6, 0.55), rgba(5, 8, 6, 0.55)), url("${bolum.arkaPlanGorseli}")`,
      }
    : undefined;
  const animasyon = bolumAnimasyonlari[bolum.animasyon] ?? bolumGecisi;

  return (
    <motion.section
      id={`bolum-${bolum.id}`}
      className={`${styles.heroBolumu} ${
        bolum.arkaPlanGorseli ? styles.gorselliHero : ""
      } ${styles[`hero_${tema}`] ?? ""} ${varyasyonSinifi(bolum.varyasyon)}`}
      style={arkaPlanStili}
      initial="gizli"
      animate="gorunur"
      variants={animasyon}
      data-site-alani="hero"
    >
      <div className={styles.heroDekorasyon}>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      <div className={styles.heroKunye} aria-hidden="true">
        <span>{firmaAdi}</span>
        <i />
        <strong>{tasarim?.etiket || sektorAdi}</strong>
      </div>

      <motion.div
        className={styles.heroMetni}
        data-site-parcasi="hero-metin"
        initial="gizli"
        animate="gorunur"
        variants={listeKapsayici}
      >
        {bolum.ustBaslik.trim() && (
          <motion.span
            className={styles.kucukBaslik}
            variants={listeElemaniGecisi}
          >
            {bolum.ustBaslik}
          </motion.span>
        )}

        {bolum.baslik.trim() && (
          <motion.h1 variants={listeElemaniGecisi}>{bolum.baslik}</motion.h1>
        )}

        {bolum.aciklama.trim() && (
          <motion.p variants={listeElemaniGecisi}>{bolum.aciklama}</motion.p>
        )}

        <Butonlar bolum={bolum} dahiliBaglantiAc={dahiliBaglantiAc} />

        {bilgiler.length > 0 && (
          <motion.ul
            className={styles.heroBilgiListesi}
            data-site-parcasi="hero-bilgi"
            variants={listeElemaniGecisi}
          >
            {bilgiler.map((bilgi, index) => (
              <li key={`${bilgi.etiket}-${bilgi.deger}`}>
                <span>{bolumNumarasi(index)}</span>
                <div>
                  <small>{bilgi.etiket}</small>
                  <strong>{bilgi.deger}</strong>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </motion.div>

      {!bolum.arkaPlanGorseli && (
        <motion.div
          className={`${styles.heroGorseli} ${
            bolum.gorsel ? "" : styles.heroSahnesi
          }`}
          data-site-parcasi="hero-gorsel"
          initial={{
            opacity: 0,
            scale: 0.94,
            x: 55,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {bolum.gorsel ? (
            <motion.img
              src={bolum.gorsel}
              alt={bolum.baslik}
              whileHover={{
                scale: 1.035,
              }}
              transition={{
                duration: 0.7,
              }}
            />
          ) : (
            <SektorSahnesi
              sektor={sektor}
              sektorAdi={sektorAdi}
              aile={tasarim?.aile}
              duzen={tasarim?.duzen}
              baslik={bolum.ustBaslik || sektorAdi}
              varyant="hero"
            />
          )}

          <div className={styles.gorselNumarasi}>
            <span>01</span>
            <strong>{bolum.gorsel ? "SEÇİLİ İŞ" : "SEKTÖR SAHNESİ"}</strong>
          </div>
        </motion.div>
      )}

      <motion.div
        className={styles.kaydirmaIsareti}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.1,
          duration: 0.6,
        }}
      >
        <span />
        Aşağı kaydır
      </motion.div>
    </motion.section>
  );
}

function MetinBolumu({
  bolum,
  sektor,
  sektorAdi,
  aile,
  duzen,
  dahiliBaglantiAc,
}: {
  bolum: SiteBolumu;
  sektor: string;
  sektorAdi: string;
  aile?: string;
  duzen?: string;
  dahiliBaglantiAc: DahiliBaglantiFonksiyonu;
}) {
  const yerlesimSinifi =
    bolum.varyasyon === "sol-gorsel"
      ? styles.solGorsel
      : bolum.varyasyon === "sag-gorsel"
        ? styles.sagGorsel
        : styles.tekKolonMetin;

  return (
    <div
      className={`${styles.metinYerlesimi} ${yerlesimSinifi} ${
        bolum.gorsel ? "" : styles.sahneliMetin
      }`}
      data-site-parcasi="hikaye"
    >
      <motion.div
        className={styles.metinIcerigi}
        data-site-parcasi="hikaye-metin"
        variants={bolumGecisi}
        initial={false}
        whileInView="gorunur"
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        {bolum.ustBaslik.trim() && (
          <span className={styles.kucukBaslik}>{bolum.ustBaslik}</span>
        )}

        {bolum.baslik.trim() && <h2>{bolum.baslik}</h2>}

        {bolum.aciklama.trim() && <p>{bolum.aciklama}</p>}

        <Butonlar bolum={bolum} dahiliBaglantiAc={dahiliBaglantiAc} />
      </motion.div>

      {bolum.gorsel ? (
        <motion.div
          className={styles.metinGorseli}
          data-site-parcasi="hikaye-gorsel"
          initial={false}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.img
            src={bolum.gorsel}
            alt={bolum.baslik}
            whileHover={{
              scale: 1.035,
            }}
            transition={{
              duration: 0.65,
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          className={`${styles.metinGorseli} ${styles.metinSahnesi}`}
          data-site-parcasi="hikaye-gorsel"
          initial={false}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <SektorSahnesi
            sektor={sektor}
            sektorAdi={sektorAdi}
            aile={aile}
            duzen={duzen}
            baslik={bolum.ustBaslik || bolum.baslik}
            varyant="panel"
          />
        </motion.div>
      )}
    </div>
  );
}

function ListeBolumu({
  bolum,
  dahiliBaglantiAc,
}: {
  bolum: SiteBolumu;
  dahiliBaglantiAc: DahiliBaglantiFonksiyonu;
}) {
  const elemanlar = bolum.listeElemanlari.filter(
    (eleman) => eleman.baslik.trim() || eleman.aciklama.trim() || eleman.gorsel,
  );

  if (elemanlar.length === 0) {
    return null;
  }

  if (bolum.tur === "sss") {
    return (
      <motion.div
        className={styles.sssListesi}
        variants={listeKapsayici}
        initial={false}
        whileInView="gorunur"
        viewport={{ once: true, amount: 0.12 }}
      >
        {elemanlar.map((eleman, index) => (
          <motion.details
            className={styles.sssOgesi}
            key={eleman.id}
            variants={listeElemaniGecisi}
          >
            <summary>
              <span>{bolumNumarasi(index)}</span>
              <strong>{eleman.baslik}</strong>
              <i aria-hidden="true">+</i>
            </summary>
            <p>{eleman.aciklama}</p>
          </motion.details>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.liste}
      data-site-parcasi="liste"
      variants={listeKapsayici}
      initial={false}
      whileInView="gorunur"
      viewport={{
        once: true,
        amount: 0.15,
      }}
    >
      {elemanlar.map((eleman, index) => {
        const ozelBaglanti = ozelBaglantiMi(eleman.baglanti);

        return (
          <motion.article
            className={`${styles.listeSatiri} ${
              eleman.gorsel ? "" : styles.gorselsizListeSatiri
            }`}
            data-site-parcasi="kart"
            key={eleman.id}
            variants={listeElemaniGecisi}
          >
            <span className={styles.listeNumara}>{bolumNumarasi(index)}</span>

            <div className={styles.listeIcerik} data-site-parcasi="kart-metin">
              {eleman.baslik.trim() && <h3>{eleman.baslik}</h3>}

              {eleman.aciklama.trim() && <p>{eleman.aciklama}</p>}

              {eleman.baglanti.trim() && (
                <a
                  href={ozelBaglanti ? eleman.baglanti : "#"}
                  target={
                    hariciBaglantiMi(eleman.baglanti) ? "_blank" : undefined
                  }
                  rel="noreferrer"
                  onClick={(event) => {
                    if (ozelBaglanti) {
                      return;
                    }

                    event.preventDefault();
                    dahiliBaglantiAc(eleman.baglanti);
                  }}
                >
                  Detayları incele
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            {eleman.gorsel && (
              <motion.div
                className={styles.listeGorsel}
                data-site-parcasi="kart-gorsel"
                whileHover={{
                  scale: 1.025,
                }}
                transition={{
                  duration: 0.4,
                }}
              >
                <Image
                  src={eleman.gorsel}
                  alt={eleman.baslik}
                  width={1200}
                  height={800}
                  unoptimized
                />
              </motion.div>
            )}

            <motion.span
              className={styles.satirOku}
              whileHover={{
                x: 6,
              }}
            >
              <ArrowRight size={19} />
            </motion.span>
          </motion.article>
        );
      })}
    </motion.div>
  );
}

function GaleriBolumu({
  bolum,
  sektor,
  sektorAdi,
  aile,
  duzen,
}: {
  bolum: SiteBolumu;
  sektor: string;
  sektorAdi: string;
  aile?: string;
  duzen?: string;
}) {
  const elemanlar = bolum.listeElemanlari
    .filter(
      (eleman) =>
        eleman.gorsel || eleman.baslik.trim() || eleman.aciklama.trim(),
    )
    .slice(0, 6);

  if (elemanlar.length === 0 && !bolum.gorsel) {
    return null;
  }

  return (
    <motion.div
      className={styles.galeri}
      data-site-parcasi="galeri"
      variants={listeKapsayici}
      initial={false}
      whileInView="gorunur"
      viewport={{
        once: true,
        amount: 0.12,
      }}
    >
      {bolum.gorsel && (
        <motion.figure
          className={styles.buyukGaleriGorseli}
          data-site-parcasi="galeri-karti"
          variants={listeElemaniGecisi}
        >
          <div className={styles.galeriGorselSarma}>
            <motion.img
              src={bolum.gorsel}
              alt={bolum.baslik}
              whileHover={{
                scale: 1.04,
              }}
              transition={{
                duration: 0.75,
              }}
            />
          </div>
        </motion.figure>
      )}

      {elemanlar.map((eleman, index) => (
        <motion.figure
          key={eleman.id}
          variants={listeElemaniGecisi}
          data-site-parcasi="galeri-karti"
        >
          <div className={styles.galeriGorselSarma}>
            {eleman.gorsel ? (
              <motion.img
                src={eleman.gorsel}
                alt={eleman.baslik}
                whileHover={{
                  scale: 1.055,
                }}
                transition={{
                  duration: 0.65,
                }}
              />
            ) : (
              <SektorSahnesi
                sektor={sektor}
                sektorAdi={sektorAdi}
                aile={aile}
                duzen={duzen}
                baslik={eleman.baslik}
                varyant="kart"
                index={index}
                className={styles.galeriSahnesi}
              />
            )}

            <span className={styles.galeriSirasi}>{bolumNumarasi(index)}</span>
          </div>

          {(eleman.baslik.trim() || eleman.aciklama.trim()) && (
            <figcaption>
              {eleman.baslik.trim() && <strong>{eleman.baslik}</strong>}

              {eleman.aciklama.trim() && <span>{eleman.aciklama}</span>}
            </figcaption>
          )}
        </motion.figure>
      ))}
    </motion.div>
  );
}

function IletisimBolumu({
  bolum,
  proje,
}: {
  bolum: SiteBolumu;
  proje: ProjeVerisi;
}) {
  const telefonAdresi = telefonBaglantisi(proje.telefon);
  const whatsappAdresi = whatsappBaglantisi(proje.whatsapp);
  const iletisimler = [
    telefonAdresi
      ? {
          id: "telefon",
          etiket: "Telefon",
          deger: proje.telefon,
          baglanti: telefonAdresi,
          ikon: Phone,
        }
      : null,

    whatsappAdresi
      ? {
          id: "whatsapp",
          etiket: "WhatsApp",
          deger: proje.whatsapp,
          baglanti: whatsappAdresi,
          ikon: MessageCircle,
        }
      : null,

    proje.eposta
      ? {
          id: "eposta",
          etiket: "E-posta",
          deger: proje.eposta,
          baglanti: `mailto:${proje.eposta}`,
          ikon: Mail,
        }
      : null,
  ].filter(Boolean);

  return (
    <div className={styles.iletisimYerlesimi}>
      <motion.div
        variants={bolumGecisi}
        initial={false}
        whileInView="gorunur"
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        {bolum.ustBaslik.trim() && (
          <span className={styles.kucukBaslik}>{bolum.ustBaslik}</span>
        )}

        {bolum.baslik.trim() && <h2>{bolum.baslik}</h2>}

        {bolum.aciklama.trim() && <p>{bolum.aciklama}</p>}
      </motion.div>

      <motion.div
        className={styles.iletisimListesi}
        variants={listeKapsayici}
        initial={false}
        whileInView="gorunur"
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        {iletisimler.map((iletisim) => {
          if (!iletisim) {
            return null;
          }

          const Ikon = iletisim.ikon;

          return (
            <motion.a
              key={iletisim.id}
              variants={listeElemaniGecisi}
              href={iletisim.baglanti}
              target={iletisim.id === "whatsapp" ? "_blank" : undefined}
              rel="noreferrer"
              whileHover={{
                x: 8,
              }}
            >
              <Ikon size={20} />

              <span>
                <small>{iletisim.etiket}</small>
                <strong>{iletisim.deger}</strong>
              </span>

              <ArrowRight size={18} />
            </motion.a>
          );
        })}

        {proje.adres && (
          <motion.div variants={listeElemaniGecisi}>
            <MapPin size={20} />

            <span>
              <small>Adres</small>
              <strong>{proje.adres}</strong>
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function FormBolumu({
  bolum,
  proje,
}: {
  bolum: SiteBolumu;
  proje: ProjeVerisi;
}) {
  const profil = sektorFormProfiliniGetir(proje.sektor);
  const hizmetler = sektorHizmetleriniGetir(proje.sektor);
  const whatsappAdresi = whatsappBaglantisi(proje.whatsapp);
  const epostaVar = epostaGecerliMi(proje.eposta);
  const telefonAdresi = telefonBaglantisi(proje.telefon);
  const gonderimMumkun = Boolean(
    whatsappAdresi || epostaVar || telefonAdresi,
  );

  function formuGonder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const veriler = new FormData(form);
    const ad = String(veriler.get("ad") ?? "").trim();
    const telefon = String(veriler.get("telefon") ?? "").trim();
    const alanSatirlari = profil.alanlar
      .map((alan) => {
        const deger = String(veriler.get(alan.ad) ?? "").trim();
        return deger ? `${alan.etiket}: ${deger}` : "";
      })
      .filter(Boolean);
    const metin = [
      `Merhaba, ${proje.firmaAdi} web sitesinden bilgi almak istiyorum.`,
      ad ? `Ad soyad: ${ad}` : "",
      telefon ? `Telefon: ${telefon}` : "",
      ...alanSatirlari,
    ]
      .filter(Boolean)
      .join("\n");
    const mesajliWhatsappAdresi = whatsappBaglantisi(proje.whatsapp, metin);

    if (mesajliWhatsappAdresi) {
      window.open(mesajliWhatsappAdresi, "_blank", "noopener,noreferrer");
      return;
    }

    if (epostaVar) {
      window.open(
        `mailto:${proje.eposta.trim()}?subject=${encodeURIComponent("Web sitesi bilgi talebi")}&body=${encodeURIComponent(metin)}`,
        "_self",
      );
      return;
    }

    if (telefonAdresi) {
      window.open(telefonAdresi, "_self");
    }
  }

  const gonderimEtiketi = whatsappAdresi
    ? `${profil.gonderimEtiketi} · WhatsApp`
    : epostaVar
      ? `${profil.gonderimEtiketi} · E-posta`
      : telefonAdresi
        ? "Telefonla iletişime geç"
        : "İletişim bilgisi eksik";

  return (
    <div className={styles.formYerlesimi}>
      <motion.div
        className={styles.formTanitim}
        variants={bolumGecisi}
        initial={false}
        whileInView="gorunur"
        viewport={{ once: true, amount: 0.25 }}
      >
        {bolum.ustBaslik.trim() && (
          <span className={styles.kucukBaslik}>{bolum.ustBaslik}</span>
        )}
        <h2>{profil.baslik || bolum.baslik}</h2>
        <p>{profil.aciklama || bolum.aciklama}</p>
      </motion.div>

      <motion.form
        className={styles.talepFormu}
        onSubmit={formuGonder}
        variants={listeKapsayici}
        initial={false}
        whileInView="gorunur"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.label variants={listeElemaniGecisi}>
          <span>Ad soyad</span>
          <input name="ad" type="text" autoComplete="name" required />
        </motion.label>
        <motion.label variants={listeElemaniGecisi}>
          <span>Telefon</span>
          <input
            name="telefon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
          />
        </motion.label>
        {profil.alanlar.map((alan) => {
          const secenekler =
            alan.ad === "hizmet" && !alan.secenekler?.length
              ? hizmetler
              : alan.secenekler ?? [];

          return (
            <motion.label key={alan.ad} variants={listeElemaniGecisi}>
              <span>{alan.etiket}</span>
              {alan.tur === "textarea" ? (
                <textarea
                  name={alan.ad}
                  rows={4}
                  placeholder={alan.yerTutucu}
                  required={alan.gerekli}
                />
              ) : alan.tur === "select" ? (
                <select name={alan.ad} required={alan.gerekli} defaultValue="">
                  <option value="" disabled>
                    Seçiniz
                  </option>
                  {secenekler.map((secenek) => (
                    <option key={secenek} value={secenek}>
                      {secenek}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={alan.ad}
                  type={alan.tur}
                  min={alan.min}
                  placeholder={alan.yerTutucu}
                  required={alan.gerekli}
                />
              )}
            </motion.label>
          );
        })}
        <motion.button
          type="submit"
          variants={listeElemaniGecisi}
          disabled={!gonderimMumkun}
        >
          <span>{gonderimEtiketi}</span>
          <ArrowRight size={18} />
        </motion.button>
        <small>
          {profil.gizlilikNotu ||
            "Gönder butonu sizi seçili iletişim kanalına yönlendirir; bilgileriniz bu sitede saklanmaz."}
        </small>
      </motion.form>
    </div>
  );
}

function HaritaBolumu({
  bolum,
  proje,
}: {
  bolum: SiteBolumu;
  proje: ProjeVerisi;
}) {
  const adres = proje.adres.trim();

  const haritaAdresi = adres
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        adres,
      )}&output=embed`
    : "";

  const haritadaAcAdresi = adres
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        adres,
      )}`
    : "";

  return (
    <div className={styles.haritaAlani}>
      <motion.div
        variants={bolumGecisi}
        initial={false}
        whileInView="gorunur"
        viewport={{ once: true }}
      >
        {bolum.ustBaslik.trim() && (
          <span className={styles.kucukBaslik}>
            {bolum.ustBaslik}
          </span>
        )}

        {bolum.baslik.trim() && (
          <h2>{bolum.baslik}</h2>
        )}

        {adres ? (
          <>
            <p>{adres}</p>

            <a
              href={haritadaAcAdresi}
              target="_blank"
              rel="noreferrer"
              className={styles.haritadaAc}
            >
              Google Maps’te aç
              <ExternalLink size={16} />
            </a>
          </>
        ) : (
          <p>Konum bilgisi henüz eklenmedi.</p>
        )}
      </motion.div>

      <motion.div
        className={styles.haritaYerTutucu}
        initial={false}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        {haritaAdresi ? (
          <iframe
            src={haritaAdresi}
            title={`${proje.firmaAdi} konumu`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className={styles.haritaBosDurum}>
            <MapPin size={38} />
            <strong>Adres bilgisi eklenmedi</strong>
          </div>
        )}
      </motion.div>
    </div>
  );
}
function BolumRender({
  bolum,
  proje,
  index,
  anaSayfaMi,
  tasarim,
  dahiliBaglantiAc,
}: {
  bolum: SiteBolumu;
  proje: ProjeVerisi;
  index: number;
  anaSayfaMi: boolean;
  tasarim?: SektorTasarimSecenegi;
  dahiliBaglantiAc: DahiliBaglantiFonksiyonu;
}) {
  if (!bolum.aktif) {
    return null;
  }

  if (bolum.tur === "hero") {
    const kararNoktalari = sektorKararNoktalariniGetir(proje.sektor);
    const heroBilgileri: HeroBilgisi[] = anaSayfaMi
      ? kararNoktalari.map((karar) => ({ ...karar }))
      : [];

    return (
      <HeroBolumu
        bolum={bolum}
        tema={proje.tema}
        firmaAdi={proje.firmaAdi}
        sektor={proje.sektor}
        sektorAdi={proje.sektorAdi}
        tasarim={tasarim}
        bilgiler={heroBilgileri}
        dahiliBaglantiAc={dahiliBaglantiAc}
      />
    );
  }

  const listeTuruMu = [
    "hizmetler",
    "urunler",
    "neden-biz",
    "yorumlar",
    "ekip",
    "fiyatlar",
    "sss",
    "istatistik",
  ].includes(bolum.tur);
  const animasyon = bolumAnimasyonlari[bolum.animasyon] ?? bolumGecisi;

  return (
    <motion.section
      id={`bolum-${bolum.id}`}
      className={`${styles.standartBolum} ${
        index % 2 === 1 ? styles.alternatifBolum : ""
      } ${styles[`bolum_${bolum.tur}`] ?? ""} ${varyasyonSinifi(bolum.varyasyon)}`}
      data-bolum-turu={bolum.tur}
      data-bolum-sira={index}
      initial={false}
      whileInView="gorunur"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      variants={animasyon}
    >
      <div className={styles.bolumNumarasi}>
        <span>{bolumNumarasi(index)}</span>
        <i />
      </div>

      <span className={styles.bolumFiligran} aria-hidden="true">
        {bolumNumarasi(index)}
      </span>

      <div className={styles.bolumIcerikSahnesi} data-site-parcasi="bolum-sahnesi">
        {bolum.tur === "galeri" ? (
          <>
            <AnimasyonluBaslik
              ustBaslik={bolum.ustBaslik}
              baslik={bolum.baslik}
              aciklama={bolum.aciklama}
            />

            <GaleriBolumu
              bolum={bolum}
              sektor={proje.sektor}
              sektorAdi={proje.sektorAdi}
              aile={tasarim?.aile}
              duzen={tasarim?.duzen}
            />

            <Butonlar bolum={bolum} dahiliBaglantiAc={dahiliBaglantiAc} />
          </>
        ) : bolum.tur === "iletisim" ? (
          <IletisimBolumu bolum={bolum} proje={proje} />
        ) : bolum.tur === "harita" ? (
          <HaritaBolumu bolum={bolum} proje={proje} />
        ) : bolum.tur === "form" ? (
          <FormBolumu bolum={bolum} proje={proje} />
        ) : listeTuruMu ? (
          <>
            <AnimasyonluBaslik
              ustBaslik={bolum.ustBaslik}
              baslik={bolum.baslik}
              aciklama={bolum.aciklama}
            />

            <ListeBolumu
              bolum={bolum}
              dahiliBaglantiAc={dahiliBaglantiAc}
            />

            <Butonlar bolum={bolum} dahiliBaglantiAc={dahiliBaglantiAc} />
          </>
        ) : (
          <MetinBolumu
            bolum={bolum}
            sektor={proje.sektor}
            sektorAdi={proje.sektorAdi}
            aile={tasarim?.aile}
            duzen={tasarim?.duzen}
            dahiliBaglantiAc={dahiliBaglantiAc}
          />
        )}
      </div>
    </motion.section>
  );
}

interface SiteGorunumuProps {
  proje: ProjeVerisi;
  baslangicSlug?: string;
  gercekRotaKullan?: boolean;
}

function sayfaYoluOlustur(sayfa: SiteSayfasi) {
  if (sayfa.anaSayfa || !sayfa.slug.trim()) {
    return "/";
  }

  return `/${turkceSlugOlustur(sayfa.slug || sayfa.ad)}`;
}

export default function SiteGorunumu({
  proje,
  baslangicSlug = "",
  gercekRotaKullan = false,
}: SiteGorunumuProps) {
  const [aktifSayfaId, setAktifSayfaId] = useState(() => {
    const ilkSayfalar = sayfalariSirala(proje.sayfalar);
    const ilkAnaSayfa = anaSayfayiBul(ilkSayfalar);
    const temizBaslangicSlug = turkceSlugOlustur(baslangicSlug);
    const baslangicSayfasi = temizBaslangicSlug
      ? ilkSayfalar.find(
          (sayfa) =>
            turkceSlugOlustur(sayfa.slug || sayfa.ad) === temizBaslangicSlug,
        )
      : ilkAnaSayfa;

    return baslangicSayfasi?.id ?? ilkAnaSayfa?.id ?? "";
  });

  const [mobilMenuAcik, setMobilMenuAcik] = useState(false);
  const hareketiAzalt = useReducedMotion();
  const mobilMenuRef = useRef<HTMLDivElement>(null);
  const menuAcButonuRef = useRef<HTMLButtonElement>(null);
  const menuKapatButonuRef = useRef<HTMLButtonElement>(null);

  const siraliSayfalar = useMemo(() => {
    return sayfalariSirala(proje.sayfalar);
  }, [proje.sayfalar]);

  const anaSayfa = useMemo(() => {
    return anaSayfayiBul(siraliSayfalar);
  }, [siraliSayfalar]);

  useEffect(() => {
    if (!gercekRotaKullan) {
      return;
    }

    function tarayiciGecmisiniUygula() {
      const yolSlug = turkceSlugOlustur(
        window.location.pathname.replace(/^\/+|\/+$/g, ""),
      );

      const hedefSayfa = yolSlug
        ? siraliSayfalar.find(
            (sayfa) => turkceSlugOlustur(sayfa.slug || sayfa.ad) === yolSlug,
          )
        : anaSayfa;

      if (hedefSayfa) {
        setAktifSayfaId(hedefSayfa.id);
      }
    }

    window.addEventListener("popstate", tarayiciGecmisiniUygula);

    return () => {
      window.removeEventListener("popstate", tarayiciGecmisiniUygula);
    };
  }, [anaSayfa, gercekRotaKullan, siraliSayfalar]);

  useEffect(() => {
    if (!mobilMenuAcik) {
      return;
    }

    const oncekiTasacakDegeri = document.body.style.overflow;
    const menuAcButonu = menuAcButonuRef.current;
    document.body.style.overflow = "hidden";
    menuKapatButonuRef.current?.focus();

    function klavyeyiYonet(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobilMenuAcik(false);
        return;
      }

      if (event.key !== "Tab" || !mobilMenuRef.current) {
        return;
      }

      const odaklanabilirler = Array.from(
        mobilMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const ilk = odaklanabilirler[0];
      const son = odaklanabilirler.at(-1);

      if (!ilk || !son) {
        return;
      }

      if (event.shiftKey && document.activeElement === ilk) {
        event.preventDefault();
        son.focus();
      } else if (!event.shiftKey && document.activeElement === son) {
        event.preventDefault();
        ilk.focus();
      }
    }

    document.addEventListener("keydown", klavyeyiYonet);

    return () => {
      document.body.style.overflow = oncekiTasacakDegeri;
      document.removeEventListener("keydown", klavyeyiYonet);
      menuAcButonu?.focus();
    };
  }, [mobilMenuAcik]);

  const aktifSayfa = useMemo(() => {
    return (
      siraliSayfalar.find((sayfa) => sayfa.id === aktifSayfaId) ??
      anaSayfa ??
      null
    );
  }, [siraliSayfalar, aktifSayfaId, anaSayfa]);

  function sayfaDegistir(sayfaId: string, bolumId?: string) {
    const hedefSayfa = siraliSayfalar.find((sayfa) => sayfa.id === sayfaId);

    setAktifSayfaId(sayfaId);
    setMobilMenuAcik(false);

    if (gercekRotaKullan && hedefSayfa) {
      const sayfaYolu = sayfaYoluOlustur(hedefSayfa);
      const yeniAdres = bolumId ? `${sayfaYolu}#bolum-${bolumId}` : sayfaYolu;

      window.history.pushState({}, "", yeniAdres);
    }

    if (bolumId) {
      bolumeKaydir(bolumId, Boolean(hareketiAzalt));
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: hareketiAzalt ? "auto" : "smooth",
    });
  }

  function dahiliBaglantiAc(
    baglanti: string,
    varsayilanBolumTuru?: SiteBolumu["tur"],
  ) {
    const temizBaglanti = temizBaglantiOlustur(baglanti);

    const hash = baglantidakiHash(baglanti);

    const hedefAnahtar = turkceSlugOlustur(hash || temizBaglanti);

    if (!hedefAnahtar && anaSayfa) {
      sayfaDegistir(anaSayfa.id);
      return;
    }

    /*
     * Önce ayrı sayfa aranır.
     * /hizmetler bağlantısı varsa Hizmetler sayfası açılır.
     */
    const tamEslesenSayfa = siraliSayfalar.find((sayfa) => {
      const sayfaSlug = turkceSlugOlustur(sayfa.slug);

      const sayfaAdi = turkceSlugOlustur(sayfa.ad);

      const menuBasligi = turkceSlugOlustur(sayfa.menuBasligi);

      return (
        sayfaSlug === hedefAnahtar ||
        sayfaAdi === hedefAnahtar ||
        menuBasligi === hedefAnahtar
      );
    });

    if (tamEslesenSayfa) {
      /*
       * Bağlantıda ayrıca #hizmetler gibi bölüm verilmişse
       * sayfayı açtıktan sonra o bölüme kaydırır.
       */
      if (hash) {
        const hedefBolum = tamEslesenSayfa.bolumler.find(
          (bolum) =>
            turkceSlugOlustur(bolum.tur) === turkceSlugOlustur(hash) ||
            turkceSlugOlustur(bolum.baslik) === turkceSlugOlustur(hash) ||
            bolum.id === hash,
        );

        sayfaDegistir(tamEslesenSayfa.id, hedefBolum?.id);

        return;
      }

      sayfaDegistir(tamEslesenSayfa.id);
      return;
    }

    /*
     * Ayrı Hizmetler sayfası yoksa önce aktif sayfanın
     * içindeki hizmetler bölümü aranır.
     */
    const arananBolumTuru =
      varsayilanBolumTuru ??
      (hedefAnahtar.includes("hizmet") ? "hizmetler" : undefined);

    if (arananBolumTuru && aktifSayfa) {
      const aktifSayfadakiBolum = aktifSayfa.bolumler.find(
        (bolum) => bolum.aktif && bolum.tur === arananBolumTuru,
      );

      if (aktifSayfadakiBolum) {
        bolumeKaydir(aktifSayfadakiBolum.id, Boolean(hareketiAzalt));
        return;
      }
    }

    /*
     * Aktif sayfada yoksa tüm sayfalarda bölüm aranır.
     */
    const bolumEslesmesi = siraliSayfalar
      .flatMap((sayfa) =>
        sayfa.bolumler.map((bolum) => ({
          sayfa,
          bolum,
        })),
      )
      .find(({ bolum }) => {
        if (!bolum.aktif) {
          return false;
        }

        const tur = turkceSlugOlustur(bolum.tur);

        const baslik = turkceSlugOlustur(bolum.baslik);

        const ustBaslik = turkceSlugOlustur(bolum.ustBaslik);

        return (
          (arananBolumTuru && bolum.tur === arananBolumTuru) ||
          tur === hedefAnahtar ||
          baslik === hedefAnahtar ||
          ustBaslik === hedefAnahtar ||
          bolum.id === hedefAnahtar
        );
      });

    if (bolumEslesmesi) {
      sayfaDegistir(bolumEslesmesi.sayfa.id, bolumEslesmesi.bolum.id);

      return;
    }

    /*
     * Bağlantı bulunamadığında 404'e gitmez.
     * Ana sayfaya döner.
     */
    if (anaSayfa) {
      sayfaDegistir(anaSayfa.id);
    }
  }

  if (!aktifSayfa) {
    return (
      <main className={styles.bosSayfa}>
        <span>BOŞ PROJE</span>
        <h1>{proje.firmaAdi}</h1>
        <p>Bu projede görüntülenecek aktif bir sayfa bulunamadı.</p>
      </main>
    );
  }

  const tasarim = sektorTasariminiGetir(
    proje.sektor,
    proje.tasarim,
    proje.tema,
  );
  const etkinTema = tasarim?.tema ?? proje.tema;
  const renkler = temaRenkleri[etkinTema] ?? temaRenkleri.standard;
  const temaKarakterSiniflari = temaKarakterleriniGetir(etkinTema)
    .map((karakter) => styles[`tema_${karakter}`] ?? "")
    .filter(Boolean)
    .join(" ");

  const menuSayfalari = siraliSayfalar.filter((sayfa) => sayfa.menuGoster);

  const aktifBolumler = [...aktifSayfa.bolumler]
    .filter((bolum) => bolum.aktif)
    .sort((a, b) => a.sira - b.sira);
  const markaHizmetleri = sektorHizmetleriniGetir(proje.sektor).slice(0, 4);

  const cssDegiskenleri = {
    "--site-arka-plan": renkler.arkaPlan,
    "--site-ikinci-arka-plan": renkler.ikinciArkaPlan,
    "--site-yazi": renkler.yazi,
    "--site-soluk-yazi": renkler.solukYazi,
    "--site-vurgu": renkler.vurgu,
    "--site-cizgi": renkler.cizgi,
    "--site-buton-yazi": renkler.butonYazi,
  } as CSSProperties;

  return (
    <main
      className={`${styles.site} ${semaStyles.sektorSemasi} ${styles[`tema_${etkinTema}`] ?? ""} ${temaKarakterSiniflari}`}
      style={cssDegiskenleri}
      data-sektor={proje.sektor}
      data-tasarim-aile={tasarim?.aile}
      data-tasarim-duzen={tasarim?.duzen}
      data-kart-stili={tasarim?.kartStili}
      data-yogunluk={tasarim?.yogunluk}
      data-gorsel-orani={tasarim?.gorselOrani}
      data-medya-stratejisi={tasarim?.medyaStratejisi}
      data-gorsel-limiti={tasarim?.gorselLimiti}
      data-ana-sayfa={aktifSayfa.anaSayfa ? "true" : "false"}
    >
      <header className={styles.siteHeader} data-site-alani="navigasyon">
        <a
          href={anaSayfa ? sayfaYoluOlustur(anaSayfa) : "/"}
          className={styles.firmaLogo}
          onClick={(event) => {
            event.preventDefault();
            if (anaSayfa) {
              sayfaDegistir(anaSayfa.id);
            }
          }}
        >
          <span>{proje.firmaAdi}</span>
          <small>{proje.sektorAdi}</small>
        </a>

        <nav className={styles.masaustuMenu}>
          {menuSayfalari.map((sayfa, index) => (
            <a
              href={sayfaYoluOlustur(sayfa)}
              key={sayfa.id}
              className={aktifSayfaId === sayfa.id ? styles.aktifMenu : ""}
              aria-current={aktifSayfaId === sayfa.id ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                sayfaDegistir(sayfa.id);
              }}
            >
              <span>{bolumNumarasi(index)}</span>
              {sayfa.menuBasligi}
            </a>
          ))}
        </nav>

        {(whatsappBaglantisi(proje.whatsapp) ||
          telefonBaglantisi(proje.telefon)) && (
          <a
            className={styles.headerAksiyon}
            href={
              whatsappBaglantisi(proje.whatsapp) ||
              telefonBaglantisi(proje.telefon)
            }
            target={whatsappBaglantisi(proje.whatsapp) ? "_blank" : undefined}
            rel={whatsappBaglantisi(proje.whatsapp) ? "noreferrer" : undefined}
          >
            {whatsappBaglantisi(proje.whatsapp) ? (
              <MessageCircle size={17} />
            ) : (
              <Phone size={17} />
            )}
            <span>
              {whatsappBaglantisi(proje.whatsapp) ? "Bilgi alın" : "Hemen arayın"}
            </span>
          </a>
        )}

        <button
          type="button"
          ref={menuAcButonuRef}
          className={styles.mobilMenuButonu}
          onClick={() => setMobilMenuAcik(true)}
          aria-label="Menüyü aç"
          aria-expanded={mobilMenuAcik}
          aria-controls="mobil-site-menusu"
        >
          <Menu size={24} />
        </button>
      </header>

      {aktifSayfa.anaSayfa && (
        <MarkaSeridi
          sektorAdi={proje.sektorAdi}
          hizmetler={markaHizmetleri}
        />
      )}

      <AnimatePresence>
        {mobilMenuAcik && (
          <motion.div
            ref={mobilMenuRef}
            id="mobil-site-menusu"
            className={styles.mobilMenu}
            role="dialog"
            aria-modal="true"
            aria-label="Site menüsü"
            initial={
              hareketiAzalt
                ? { opacity: 0 }
                : { opacity: 0, clipPath: "circle(0% at 92% 6%)" }
            }
            animate={
              hareketiAzalt
                ? { opacity: 1 }
                : { opacity: 1, clipPath: "circle(150% at 92% 6%)" }
            }
            exit={
              hareketiAzalt
                ? { opacity: 0 }
                : { opacity: 0, clipPath: "circle(0% at 92% 6%)" }
            }
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={styles.mobilMenuUst}>
              <strong>{proje.firmaAdi}</strong>

              <button
                type="button"
                ref={menuKapatButonuRef}
                onClick={() => setMobilMenuAcik(false)}
                aria-label="Menüyü kapat"
              >
                <X size={26} />
              </button>
            </div>

            <motion.nav
              variants={listeKapsayici}
              initial="gizli"
              animate="gorunur"
            >
              {menuSayfalari.map((sayfa, index) => (
                <motion.a
                  href={sayfaYoluOlustur(sayfa)}
                  key={sayfa.id}
                  variants={listeElemaniGecisi}
                  aria-current={aktifSayfaId === sayfa.id ? "page" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    sayfaDegistir(sayfa.id);
                  }}
                >
                  <span>{bolumNumarasi(index)}</span>
                  <strong>{sayfa.menuBasligi}</strong>
                  <ArrowRight size={22} />
                </motion.a>
              ))}
            </motion.nav>

            <div className={styles.mobilHizliIletisim}>
              {telefonBaglantisi(proje.telefon) && (
                <a href={telefonBaglantisi(proje.telefon)}>
                  <Phone size={18} />
                  <span>Ara</span>
                </a>
              )}
              {whatsappBaglantisi(proje.whatsapp) && (
                <a
                  href={whatsappBaglantisi(proje.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={aktifSayfa.id}
          className={styles.sayfaIcerigi}
          variants={sayfaGecisi}
          initial="baslangic"
          animate="gorunur"
          exit="cikis"
        >
          {aktifBolumler.length > 0 ? (
            aktifBolumler.map((bolum, index) => (
              <BolumRender
                key={bolum.id}
                bolum={bolum}
                proje={proje}
                index={index}
                anaSayfaMi={aktifSayfa.anaSayfa}
                tasarim={tasarim}
                dahiliBaglantiAc={dahiliBaglantiAc}
              />
            ))
          ) : (
            <section className={styles.bosSayfa}>
              <span>BOŞ SAYFA</span>
              <h1>{aktifSayfa.ad}</h1>

              <p>Bu sayfaya henüz görünür bir bölüm eklenmedi.</p>
            </section>
          )}
        </motion.div>
      </AnimatePresence>

      <footer className={styles.footer} data-site-alani="footer">
        <motion.div
          className={styles.footerFirma}
          initial={false}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.85,
          }}
        >
          <span>{proje.sektorAdi}</span>
          <h2>{proje.firmaAdi}</h2>
        </motion.div>

        <div className={styles.footerOrta}>
          <nav>
            {menuSayfalari.map((sayfa) => (
              <a
                href={sayfaYoluOlustur(sayfa)}
                key={sayfa.id}
                aria-current={aktifSayfaId === sayfa.id ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  sayfaDegistir(sayfa.id);
                }}
              >
                {sayfa.menuBasligi}
              </a>
            ))}
          </nav>

          <div className={styles.footerIletisim}>
            {telefonBaglantisi(proje.telefon) && (
              <a href={telefonBaglantisi(proje.telefon)}>
                {proje.telefon}
              </a>
            )}

            {proje.eposta && (
              <a href={`mailto:${proje.eposta}`}>{proje.eposta}</a>
            )}

            {proje.adres && <span>{proje.adres}</span>}
          </div>
        </div>

        <div className={styles.footerAlt}>
          <span>
            © {new Date().getFullYear()} {proje.firmaAdi}
          </span>

          <strong>{proje.firmaAdi}</strong>
        </div>
      </footer>

      {whatsappBaglantisi(proje.whatsapp) && (
        <motion.a
          className={styles.sabitWhatsapp}
          href={whatsappBaglantisi(proje.whatsapp)}
          target="_blank"
          rel="noreferrer"
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 1,
            duration: 0.5,
          }}
          whileHover={{
            scale: 1.06,
            y: -3,
          }}
          whileTap={{
            scale: 0.96,
          }}
        >
          <MessageCircle size={20} />
          WhatsApp
        </motion.a>
      )}
    </main>
  );
}
