"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  sektorKararNoktalariniGetir,
  sektorSahneDiliniGetir,
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
  const sahneBasligi = baslik?.trim() || dil.etiket;

  return (
    <div
      className={`${styles.sahne} ${styles[varyant]} ${className}`}
      data-aile={aile}
      data-duzen={duzen}
      data-hareket={dil.hareket}
      data-site-parcasi="sektor-sahnesi"
      role="img"
      aria-label={`${sektorAdi}: ${dil.etiket}, ${dil.motif}`}
    >
      <span className={styles.izgara} aria-hidden="true" />
      <span className={styles.isik} aria-hidden="true" />

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
    </div>
  );
}
