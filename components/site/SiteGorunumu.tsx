"use client";

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
import { AnimatePresence, motion, type Variants } from "motion/react";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import styles from "./siteGorunumu.module.css";
import type { SiteBolumu, SiteSayfasi } from "@/data/sektorSablonlari";
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
    solukYazi: "#66716C",
    vurgu: "#1F8A5B",
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
    solukYazi: "#786454",
    vurgu: "#6F7D45",
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
    solukYazi: "#5F797B",
    vurgu: "#1E9C9A",
    cizgi: "#BBD9DA",
    butonYazi: "#FFFFFF",
  },

  ruby: {
    arkaPlan: "#FFF1EC",
    ikinciArkaPlan: "#F7DCD4",
    yazi: "#301111",
    solukYazi: "#815E5A",
    vurgu: "#C53232",
    cizgi: "#E0B8AE",
    butonYazi: "#FFFFFF",
  },

  sage: {
    arkaPlan: "#EEF1E6",
    ikinciArkaPlan: "#DDE4D2",
    yazi: "#1D2A1F",
    solukYazi: "#66715F",
    vurgu: "#9A6A3E",
    cizgi: "#C6CEBB",
    butonYazi: "#FFFFFF",
  },

  copper: {
    arkaPlan: "#ECEBE6",
    ikinciArkaPlan: "#DBD9D1",
    yazi: "#171A1A",
    solukYazi: "#636866",
    vurgu: "#C65A32",
    cizgi: "#BFC0B9",
    butonYazi: "#FFFFFF",
  },

  neon: {
    arkaPlan: "#100B1F",
    ikinciArkaPlan: "#1B1131",
    yazi: "#F2EEFF",
    solukYazi: "#B8ACD6",
    vurgu: "#8B5CF6",
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
    solukYazi: "#765E43",
    vurgu: "#D36B2D",
    cizgi: "#D3B98E",
    butonYazi: "#FFFFFF",
  },

  clinic: {
    arkaPlan: "#F8FCFA",
    ikinciArkaPlan: "#E7F3EF",
    yazi: "#0E2521",
    solukYazi: "#637D77",
    vurgu: "#2C8C78",
    cizgi: "#C7DDD7",
    butonYazi: "#FFFFFF",
  },

  bistro: {
    arkaPlan: "#FFF4E2",
    ikinciArkaPlan: "#F3D7AF",
    yazi: "#2B160C",
    solukYazi: "#7B604E",
    vurgu: "#B83D24",
    cizgi: "#DDBE91",
    butonYazi: "#FFFFFF",
  },

  artisan: {
    arkaPlan: "#F1E7D8",
    ikinciArkaPlan: "#E1D0B9",
    yazi: "#251B14",
    solukYazi: "#786A5D",
    vurgu: "#284B63",
    cizgi: "#C9B69B",
    butonYazi: "#FFFFFF",
  },

  skyline: {
    arkaPlan: "#EFF4FA",
    ikinciArkaPlan: "#DCE8F4",
    yazi: "#101A2B",
    solukYazi: "#667489",
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
    vurgu: "#D946A6",
    cizgi: "#D8D1C7",
    butonYazi: "#FFFFFF",
  },

  marble: {
    arkaPlan: "#F2F0EA",
    ikinciArkaPlan: "#E2E0DA",
    yazi: "#1A1A18",
    solukYazi: "#6F6D68",
    vurgu: "#A67C52",
    cizgi: "#C9C5BC",
    butonYazi: "#FFFFFF",
  },

  standard: {
    arkaPlan: "#F6F2E8",
    ikinciArkaPlan: "#E8F0E6",
    yazi: "#101A22",
    solukYazi: "#66716C",
    vurgu: "#1F8A5B",
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

const sayfaOncelikleri: Record<string, number> = {
  "": 0,
  ana: 0,
  "ana-sayfa": 0,
  anasayfa: 0,

  hakkimizda: 10,
  "hakkimizda-sayfasi": 10,

  hizmetler: 20,
  hizmetlerimiz: 20,
  servisler: 20,
  menu: 20,
  urunler: 20,
  ilanlar: 20,
  odalar: 20,

  uzmanlarimiz: 30,
  ekibimiz: 30,
  ekip: 30,

  galeri: 40,
  portfolyo: 40,
  projeler: 40,

  rezervasyon: 50,
  randevu: 50,

  iletisim: 90,
  bizeulasin: 90,
  "bize-ulasin": 90,
};

function bolumNumarasi(index: number) {
  return String(index + 1).padStart(2, "0");
}

function turkceSlugOlustur(metin: string) {
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

function sayfalariSirala(sayfalar: SiteSayfasi[]) {
  return [...sayfalar].sort((a, b) => {
    if (a.anaSayfa && !b.anaSayfa) {
      return -1;
    }

    if (!a.anaSayfa && b.anaSayfa) {
      return 1;
    }

    const aSlug = turkceSlugOlustur(a.slug || a.ad);
    const bSlug = turkceSlugOlustur(b.slug || b.ad);

    const aOncelik =
      sayfaOncelikleri[aSlug] ??
      sayfaOncelikleri[turkceSlugOlustur(a.ad)] ??
      60;

    const bOncelik =
      sayfaOncelikleri[bSlug] ??
      sayfaOncelikleri[turkceSlugOlustur(b.ad)] ??
      60;

    if (aOncelik !== bOncelik) {
      return aOncelik - bOncelik;
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

function bolumeKaydir(bolumId: string) {
  window.setTimeout(() => {
    const hedef = document.getElementById(`bolum-${bolumId}`);

    hedef?.scrollIntoView({
      behavior: "smooth",
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
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
        >
          {ustBaslik}
        </motion.span>
      )}

      {baslik.trim() && (
        <motion.h2
          initial={{ opacity: 0, y: 45 }}
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
          initial={{ opacity: 0, y: 25 }}
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
      initial="gizli"
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
            href={ozelBaglanti ? buton.baglanti : "#"}
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

function HeroBolumu({
  bolum,
  tema,
  dahiliBaglantiAc,
}: {
  bolum: SiteBolumu;
  tema: string;
  dahiliBaglantiAc: DahiliBaglantiFonksiyonu;
}) {
  const arkaPlanStili = bolum.arkaPlanGorseli
    ? {
        backgroundImage: `linear-gradient(rgba(5, 8, 6, 0.55), rgba(5, 8, 6, 0.55)), url("${bolum.arkaPlanGorseli}")`,
      }
    : undefined;

  return (
    <section
      id={`bolum-${bolum.id}`}
      className={`${styles.heroBolumu} ${
        bolum.arkaPlanGorseli ? styles.gorselliHero : ""
      } ${styles[`hero_${tema}`] ?? ""}`}
      style={arkaPlanStili}
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

      <motion.div
        className={styles.heroMetni}
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
      </motion.div>

      {bolum.gorsel && !bolum.arkaPlanGorseli && (
        <motion.div
          className={styles.heroGorseli}
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

          <div className={styles.gorselNumarasi}>
            <span>01</span>
            <strong>GÖRSEL</strong>
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
    </section>
  );
}

function MetinBolumu({
  bolum,
  dahiliBaglantiAc,
}: {
  bolum: SiteBolumu;
  dahiliBaglantiAc: DahiliBaglantiFonksiyonu;
}) {
  const yerlesimSinifi =
    bolum.varyasyon === "sol-gorsel"
      ? styles.solGorsel
      : bolum.varyasyon === "sag-gorsel"
        ? styles.sagGorsel
        : styles.tekKolonMetin;

  return (
    <div className={`${styles.metinYerlesimi} ${yerlesimSinifi}`}>
      <motion.div
        className={styles.metinIcerigi}
        variants={bolumGecisi}
        initial="gizli"
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

      {bolum.gorsel && (
        <motion.div
          className={styles.metinGorseli}
          initial={{
            opacity: 0,
            scale: 0.93,
            y: 60,
          }}
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

  return (
    <motion.div
      className={styles.liste}
      variants={listeKapsayici}
      initial="gizli"
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
            className={styles.listeSatiri}
            key={eleman.id}
            variants={listeElemaniGecisi}
          >
            <span className={styles.listeNumara}>{bolumNumarasi(index)}</span>

            <div className={styles.listeIcerik}>
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
                whileHover={{
                  scale: 1.025,
                }}
                transition={{
                  duration: 0.4,
                }}
              >
                <img src={eleman.gorsel} alt={eleman.baslik} />
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

function GaleriBolumu({ bolum }: { bolum: SiteBolumu }) {
  const gorseller = bolum.listeElemanlari.filter((eleman) => eleman.gorsel);

  if (gorseller.length === 0 && !bolum.gorsel) {
    return null;
  }

  return (
    <motion.div
      className={styles.galeri}
      variants={listeKapsayici}
      initial="gizli"
      whileInView="gorunur"
      viewport={{
        once: true,
        amount: 0.12,
      }}
    >
      {bolum.gorsel && (
        <motion.figure
          className={styles.buyukGaleriGorseli}
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

      {gorseller.map((eleman, index) => (
        <motion.figure key={eleman.id} variants={listeElemaniGecisi}>
          <div className={styles.galeriGorselSarma}>
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
  const iletisimler = [
    proje.telefon
      ? {
          id: "telefon",
          etiket: "Telefon",
          deger: proje.telefon,
          baglanti: `tel:${proje.telefon.replace(/\s/g, "")}`,
          ikon: Phone,
        }
      : null,

    proje.whatsapp
      ? {
          id: "whatsapp",
          etiket: "WhatsApp",
          deger: proje.whatsapp,
          baglanti: `https://wa.me/${proje.whatsapp.replace(/\D/g, "")}`,
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
        initial="gizli"
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
        initial="gizli"
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

function HaritaBolumu({
  bolum,
  proje,
}: {
  bolum: SiteBolumu;
  proje: ProjeVerisi;
}) {
  return (
    <div className={styles.haritaAlani}>
      <motion.div
        variants={bolumGecisi}
        initial="gizli"
        whileInView="gorunur"
        viewport={{ once: true }}
      >
        {bolum.ustBaslik.trim() && (
          <span className={styles.kucukBaslik}>{bolum.ustBaslik}</span>
        )}

        {bolum.baslik.trim() && <h2>{bolum.baslik}</h2>}

        {bolum.aciklama.trim() && <p>{bolum.aciklama}</p>}
      </motion.div>

      <motion.div
        className={styles.haritaYerTutucu}
        initial={{
          opacity: 0,
          scale: 0.94,
        }}
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
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <MapPin size={38} />
        </motion.div>

        <strong>{proje.adres || "Konum bilgisi"}</strong>

        <span>Gerçek Google Maps bağlantısı yayın aşamasında eklenecek.</span>
      </motion.div>
    </div>
  );
}

function BolumRender({
  bolum,
  proje,
  index,
  dahiliBaglantiAc,
}: {
  bolum: SiteBolumu;
  proje: ProjeVerisi;
  index: number;
  dahiliBaglantiAc: DahiliBaglantiFonksiyonu;
}) {
  if (!bolum.aktif) {
    return null;
  }

  if (bolum.tur === "hero") {
    return (
      <HeroBolumu
        bolum={bolum}
        tema={proje.tema}
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

  return (
    <motion.section
      id={`bolum-${bolum.id}`}
      className={`${styles.standartBolum} ${
        index % 2 === 1 ? styles.alternatifBolum : ""
      } ${styles[`bolum_${bolum.tur}`] ?? ""}`}
      initial="gizli"
      whileInView="gorunur"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      variants={bolumGecisi}
    >
      <div className={styles.bolumNumarasi}>
        <span>{bolumNumarasi(index)}</span>
        <i />
      </div>

      {bolum.tur === "galeri" ? (
        <>
          <AnimasyonluBaslik
            ustBaslik={bolum.ustBaslik}
            baslik={bolum.baslik}
            aciklama={bolum.aciklama}
          />

          <GaleriBolumu bolum={bolum} />
        </>
      ) : bolum.tur === "iletisim" ? (
        <IletisimBolumu bolum={bolum} proje={proje} />
      ) : bolum.tur === "harita" ? (
        <HaritaBolumu bolum={bolum} proje={proje} />
      ) : listeTuruMu ? (
        <>
          <AnimasyonluBaslik
            ustBaslik={bolum.ustBaslik}
            baslik={bolum.baslik}
            aciklama={bolum.aciklama}
          />

          <ListeBolumu bolum={bolum} dahiliBaglantiAc={dahiliBaglantiAc} />
        </>
      ) : (
        <MetinBolumu bolum={bolum} dahiliBaglantiAc={dahiliBaglantiAc} />
      )}
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
  const [aktifSayfaId, setAktifSayfaId] = useState("");

  const [mobilMenuAcik, setMobilMenuAcik] = useState(false);

  const siraliSayfalar = useMemo(() => {
    return sayfalariSirala(proje.sayfalar);
  }, [proje.sayfalar]);

  const anaSayfa = useMemo(() => {
    return anaSayfayiBul(siraliSayfalar);
  }, [siraliSayfalar]);

  useEffect(() => {
    if (!anaSayfa) {
      setAktifSayfaId("");
      return;
    }

    const temizBaslangicSlug = turkceSlugOlustur(baslangicSlug);

    const baslangicSayfasi = temizBaslangicSlug
      ? siraliSayfalar.find(
          (sayfa) =>
            turkceSlugOlustur(sayfa.slug || sayfa.ad) === temizBaslangicSlug,
        )
      : anaSayfa;

    setAktifSayfaId((mevcutSayfaId) => {
      const sayfaHalaVar = siraliSayfalar.some(
        (sayfa) => sayfa.id === mevcutSayfaId,
      );

      if (sayfaHalaVar && !baslangicSlug) {
        return mevcutSayfaId;
      }

      return baslangicSayfasi?.id ?? anaSayfa.id;
    });
  }, [anaSayfa, baslangicSlug, siraliSayfalar]);

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
      bolumeKaydir(bolumId);
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
        bolumeKaydir(aktifSayfadakiBolum.id);
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

  const renkler = temaRenkleri[proje.tema] ?? temaRenkleri.standard;

  const menuSayfalari = siraliSayfalar.filter((sayfa) => sayfa.menuGoster);

  const aktifBolumler = [...aktifSayfa.bolumler]
    .filter((bolum) => bolum.aktif)
    .sort((a, b) => a.sira - b.sira);

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
      className={`${styles.site} ${styles[`tema_${proje.tema}`] ?? ""}`}
      style={cssDegiskenleri}
    >
      <header className={styles.siteHeader}>
        <button
          type="button"
          className={styles.firmaLogo}
          onClick={() => {
            if (anaSayfa) {
              sayfaDegistir(anaSayfa.id);
            }
          }}
        >
          <span>{proje.firmaAdi}</span>
          <small>{proje.sektorAdi}</small>
        </button>

        <nav className={styles.masaustuMenu}>
          {menuSayfalari.map((sayfa, index) => (
            <button
              type="button"
              key={sayfa.id}
              className={aktifSayfaId === sayfa.id ? styles.aktifMenu : ""}
              onClick={() => sayfaDegistir(sayfa.id)}
            >
              <span>{bolumNumarasi(index)}</span>
              {sayfa.menuBasligi}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className={styles.mobilMenuButonu}
          onClick={() => setMobilMenuAcik(true)}
          aria-label="Menüyü aç"
        >
          <Menu size={24} />
        </button>
      </header>

      <AnimatePresence>
        {mobilMenuAcik && (
          <motion.div
            className={styles.mobilMenu}
            initial={{
              opacity: 0,
              clipPath: "circle(0% at 92% 6%)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(150% at 92% 6%)",
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at 92% 6%)",
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={styles.mobilMenuUst}>
              <strong>{proje.firmaAdi}</strong>

              <button
                type="button"
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
                <motion.button
                  type="button"
                  key={sayfa.id}
                  variants={listeElemaniGecisi}
                  onClick={() => sayfaDegistir(sayfa.id)}
                >
                  <span>{bolumNumarasi(index)}</span>
                  <strong>{sayfa.menuBasligi}</strong>
                  <ArrowRight size={22} />
                </motion.button>
              ))}
            </motion.nav>
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

      <footer className={styles.footer}>
        <motion.div
          className={styles.footerFirma}
          initial={{
            opacity: 0,
            y: 70,
          }}
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
              <button
                type="button"
                key={sayfa.id}
                onClick={() => sayfaDegistir(sayfa.id)}
              >
                {sayfa.menuBasligi}
              </button>
            ))}
          </nav>

          <div className={styles.footerIletisim}>
            {proje.telefon && (
              <a href={`tel:${proje.telefon.replace(/\s/g, "")}`}>
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

      {proje.whatsapp && (
        <motion.a
          className={styles.sabitWhatsapp}
          href={`https://wa.me/${proje.whatsapp.replace(/\D/g, "")}`}
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
