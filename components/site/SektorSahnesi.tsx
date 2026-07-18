"use client";

import {
  BaggageClaim,
  CalendarDays,
  CarFront,
  Droplets,
  MapPinned,
  Scissors,
  ShieldCheck,
  Sofa,
  Sparkles,
  SprayCan,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  sektorKararNoktalariniGetir,
  sektorOperasyonProfiliniGetir,
  sektorSahneDiliniGetir,
  type SektorOperasyonProfili,
} from "@/data/sektorGorselDili";
import styles from "./sektorSahnesi.module.css";

type SahneVaryanti = "hero" | "panel" | "kart" | "tema";

interface SektorSahnesiProps {
  sektor: string;
  sektorAdi: string;
  aile?: string;
  duzen?: string;
  baslik?: string;
  varyant?: SahneVaryanti;
  index?: number;
  className?: string;
}

interface OperasyonSahnesiProps {
  profil: SektorOperasyonProfili;
  sektorAdi: string;
  baslik: string;
  hareketiAzalt: boolean | null;
}

const panelIkonlari: Record<
  SektorOperasyonProfili["panelTuru"],
  LucideIcon
> = {
  "yikama-paketi": Droplets,
  "yuzey-analizi": CarFront,
  "kaplama-plani": CarFront,
  "bakim-randevusu": Sparkles,
  "sac-randevusu": Scissors,
  "berber-randevusu": Scissors,
  "temizlik-kapsami": SprayCan,
  "kumas-analizi": Sofa,
  "hali-takibi": ShieldCheck,
  "risk-protokolu": ShieldCheck,
  "elektrik-teshisi": Zap,
  "tesisat-teshisi": Wrench,
  "kombi-teshisi": Wrench,
  "tasima-teklifi": Truck,
  "transfer-rezervasyonu": MapPinned,
  "arac-kiralama": BaggageClaim,
};

function OperasyonSahnesi({
  profil,
  sektorAdi,
  baslik,
  hareketiAzalt,
}: OperasyonSahnesiProps) {
  const PanelIkonu = panelIkonlari[profil.panelTuru] ?? CalendarDays;

  return (
    <div
      className={styles.profesyonelPanel}
      data-panel-turu={profil.panelTuru}
      data-panel-aile={profil.aile}
    >
      <header className={styles.panelUstBilgi}>
        <span className={styles.panelKimligi}>
          <i aria-hidden="true">
            <PanelIkonu size={18} strokeWidth={1.8} />
          </i>
          <span>
            <small>{profil.ustEtiket}</small>
            <strong>{profil.kod}</strong>
          </span>
        </span>
        <span className={styles.panelDurumu}>
          <motion.i
            aria-hidden="true"
            animate={hareketiAzalt ? undefined : { opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {profil.durum}
        </span>
      </header>

      <div className={styles.panelBaslik}>
        <small>{sektorAdi}</small>
        <strong>{baslik}</strong>
      </div>

      <dl className={styles.kararAlanlari}>
        {profil.alanlar.map((alan, sira) => (
          <div key={`${alan.etiket}-${alan.deger}`}>
            <dt>
              <span>{String(sira + 1).padStart(2, "0")}</span>
              {alan.etiket}
            </dt>
            <dd>{alan.deger}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.secimAlani}>
        <small>{profil.secimEtiketi}</small>
        <div>
          {profil.secenekler.map((secenek, sira) => (
            <span key={secenek} data-secili={sira === 0 ? "true" : "false"}>
              {secenek}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.panelSonucu}>
        <div>
          <small>{profil.sonuc.etiket}</small>
          <strong>{profil.sonuc.deger}</strong>
        </div>
        <CalendarDays size={20} strokeWidth={1.8} aria-hidden="true" />
      </div>

      <footer className={styles.panelAltBilgi}>
        <ol>
          {profil.adimlar.map((adim, sira) => (
            <li key={adim}>
              <span>{String(sira + 1).padStart(2, "0")}</span>
              <strong>{adim}</strong>
            </li>
          ))}
        </ol>
        <dl>
          {profil.metrikler.map((metrik) => (
            <div key={`${metrik.etiket}-${metrik.deger}`}>
              <dt>{metrik.etiket}</dt>
              <dd>{metrik.deger}</dd>
            </div>
          ))}
        </dl>
      </footer>
    </div>
  );
}

export default function SektorSahnesi({
  sektor,
  sektorAdi,
  aile = "genel-hizmet",
  duzen = "servis",
  baslik,
  varyant = "panel",
  index = 0,
  className = "",
}: SektorSahnesiProps) {
  const dil = sektorSahneDiliniGetir(sektor);
  const hareketiAzalt = useReducedMotion();
  const kararNoktalari = sektorKararNoktalariniGetir(sektor);
  const operasyonProfili = sektorOperasyonProfiliniGetir(sektor);
  const sahneBasligi = baslik?.trim() || dil.etiket;

  return (
    <div
      className={`${styles.sahne} ${operasyonProfili ? styles.ozelOperasyon : ""} ${styles[varyant]} ${className}`}
      data-aile={aile}
      data-operasyon-aile={operasyonProfili?.aile}
      data-duzen={duzen}
      data-hareket={dil.hareket}
      data-site-parcasi="sektor-sahnesi"
      role="img"
      aria-label={`${sektorAdi}: ${dil.etiket}, ${dil.motif}`}
    >
      <span className={styles.izgara} aria-hidden="true" />
      <span className={styles.isik} aria-hidden="true" />

      {operasyonProfili ? (
        <OperasyonSahnesi
          profil={operasyonProfili}
          sektorAdi={sektorAdi}
          baslik={sahneBasligi}
          hareketiAzalt={hareketiAzalt}
        />
      ) : (
        <>

      <div className={styles.ustSatir} aria-hidden="true">
        <span>{dil.etiket}</span>
        <strong>SEKTÖREL SİSTEM / {String(index + 1).padStart(2, "0")}</strong>
      </div>

      <div className={styles.tipografi}>
        <motion.strong
          className={styles.sektorAdi}
          aria-hidden="true"
          animate={
            hareketiAzalt
              ? undefined
              : { y: [0, -5, 0], opacity: [0.9, 1, 0.9] }
          }
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {sektorAdi}
        </motion.strong>

        <div className={styles.sahneMetni}>
          <small>{dil.motif}</small>
          <strong>{sahneBasligi}</strong>
        </div>
      </div>

      <div className={styles.hareketHatti} aria-hidden="true">
        <motion.i
          animate={hareketiAzalt ? undefined : { scaleX: [0.16, 1, 0.16], x: [0, 18, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span />
        <span />
        <span />
      </div>

      <ol
        className={styles.hizmetSeridi}
        data-site-parcasi="sektor-kararlari"
        aria-hidden="true"
      >
        {kararNoktalari.map((karar, sira) => (
          <li key={`${karar.etiket}-${karar.deger}`}>
            <span>{String(sira + 1).padStart(2, "0")}</span>
            <small>{karar.etiket}</small>
            <strong>{karar.deger}</strong>
          </li>
        ))}
      </ol>

      <div className={styles.altSatir} aria-hidden="true">
        <span>STRATEJİ</span>
        <i />
        <strong>{dil.motif}</strong>
      </div>
        </>
      )}
    </div>
  );
}
