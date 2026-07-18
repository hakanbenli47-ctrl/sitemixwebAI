"use client";

import { motion, useReducedMotion } from "motion/react";
import { sektorSahneDiliniGetir } from "@/data/sektorGorselDili";
import { sektorHizmetleriniGetir } from "@/data/sektorSablonlari";
import styles from "./sektorSahnesi.module.css";

type SahneVaryanti = "hero" | "panel" | "kart" | "tema";

interface SektorSahnesiProps {
  sektor: string;
  sektorAdi: string;
  aile?: string;
  baslik?: string;
  varyant?: SahneVaryanti;
  index?: number;
  className?: string;
}

function kisaltmaOlustur(metin: string) {
  const kelimeler = metin
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (kelimeler.length === 1) {
    return kelimeler[0].slice(0, 2).toLocaleUpperCase("tr-TR");
  }

  return kelimeler
    .slice(0, 2)
    .map((kelime) => kelime[0])
    .join("")
    .toLocaleUpperCase("tr-TR");
}

export default function SektorSahnesi({
  sektor,
  sektorAdi,
  aile = "genel-hizmet",
  baslik,
  varyant = "panel",
  index = 0,
  className = "",
}: SektorSahnesiProps) {
  const dil = sektorSahneDiliniGetir(sektor);
  const hareketiAzalt = useReducedMotion();
  const hizmetler = sektorHizmetleriniGetir(sektor).slice(0, 3);
  const sahneBasligi = baslik?.trim() || dil.etiket;
  const kisaltma = kisaltmaOlustur(sektorAdi);

  return (
    <div
      className={`${styles.sahne} ${styles[varyant]} ${className}`}
      data-aile={aile}
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
          className={styles.kisaltma}
          aria-hidden="true"
          animate={
            hareketiAzalt
              ? undefined
              : { y: [0, -5, 0], letterSpacing: ["-0.09em", "-0.04em", "-0.09em"] }
          }
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {kisaltma}
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

      <ol className={styles.hizmetSeridi} aria-hidden="true">
        {hizmetler.map((hizmet, sira) => (
          <li key={hizmet}>
            <span>{String(sira + 1).padStart(2, "0")}</span>
            <strong>{hizmet}</strong>
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
