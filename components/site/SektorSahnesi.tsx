"use client";

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

function OperasyonAdimlari({ profil }: { profil: SektorOperasyonProfili }) {
  return (
    <ol className={styles.operasyonAdimlari}>
      {profil.adimlar.map((adim, sira) => (
        <li key={adim}>
          <span>{String(sira + 1).padStart(2, "0")}</span>
          <strong>{adim}</strong>
        </li>
      ))}
    </ol>
  );
}

function OperasyonMetrikleri({ profil }: { profil: SektorOperasyonProfili }) {
  return (
    <dl className={styles.operasyonMetrikleri}>
      {profil.metrikler.map((metrik) => (
        <div key={`${metrik.etiket}-${metrik.deger}`}>
          <dt>{metrik.etiket}</dt>
          <dd>{metrik.deger}</dd>
        </div>
      ))}
    </dl>
  );
}

function OperasyonSahnesi({
  profil,
  sektorAdi,
  baslik,
  hareketiAzalt,
}: OperasyonSahnesiProps) {
  if (profil.aile === "bakim") {
    return (
      <div className={`${styles.operasyonPaneli} ${styles.operasyonBakim}`}>
        <header>
          <span>{profil.ustEtiket}</span>
          <strong>{profil.kod}</strong>
        </header>
        <div className={styles.bakimKartlari}>
          <article>
            <small>KİŞİYE ÖZEL PLAN</small>
            <strong>{sektorAdi}</strong>
            <p>{baslik}</p>
          </article>
          <aside>
            <span>RANDEVU DURUMU</span>
            <strong>{profil.durum}</strong>
            <OperasyonMetrikleri profil={profil} />
          </aside>
        </div>
        <OperasyonAdimlari profil={profil} />
      </div>
    );
  }

  if (profil.aile === "temizlik") {
    return (
      <div className={`${styles.operasyonPaneli} ${styles.operasyonTemizlik}`}>
        <header>
          <span>{profil.ustEtiket}</span>
          <strong>{profil.kod}</strong>
        </header>
        <div className={styles.temizlikMatrisi}>
          <article>
            <small>OPERASYON</small>
            <strong>{sektorAdi}</strong>
            <p>{baslik}</p>
          </article>
          <OperasyonMetrikleri profil={profil} />
          <div className={styles.temizlikOnayi}>
            <span>✓</span>
            <strong>{profil.durum}</strong>
          </div>
        </div>
        <OperasyonAdimlari profil={profil} />
      </div>
    );
  }

  if (profil.aile === "hijyen") {
    return (
      <div className={`${styles.operasyonPaneli} ${styles.operasyonHijyen}`}>
        <header>
          <span>{profil.ustEtiket}</span>
          <strong>{profil.kod}</strong>
        </header>
        <div className={styles.hijyenRiskAlani}>
          <article>
            <small>RİSK SINIFI / KONTROLLÜ</small>
            <strong>{sektorAdi}</strong>
            <p>{baslik}</p>
          </article>
          <div className={styles.hijyenDurumu}>
            <span>PROTOKOL</span>
            <strong>{profil.durum}</strong>
          </div>
        </div>
        <OperasyonAdimlari profil={profil} />
        <OperasyonMetrikleri profil={profil} />
      </div>
    );
  }

  if (profil.aile === "teknik") {
    return (
      <div className={`${styles.operasyonPaneli} ${styles.operasyonTeknik}`}>
        <header>
          <span>{profil.ustEtiket}</span>
          <strong>{profil.kod}</strong>
        </header>
        <div className={styles.teknikEkrani}>
          <article>
            <small>SERVİS / ÖLÇÜM / TEST</small>
            <strong>{sektorAdi}</strong>
            <p>{baslik}</p>
          </article>
          <motion.i
            animate={hareketiAzalt ? undefined : { scaleX: [0.18, 1, 0.18] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className={styles.teknikDurumu}>
            <span>SERVİS DURUMU</span>
            <strong>{profil.durum}</strong>
          </div>
        </div>
        <OperasyonMetrikleri profil={profil} />
        <OperasyonAdimlari profil={profil} />
      </div>
    );
  }

  if (profil.aile === "lojistik") {
    return (
      <div className={`${styles.operasyonPaneli} ${styles.operasyonLojistik}`}>
        <header>
          <span>{profil.ustEtiket}</span>
          <strong>{profil.kod}</strong>
        </header>
        <div className={styles.lojistikManifesto}>
          <article>
            <small>ÇIKIŞ / ROTA / VARIŞ</small>
            <strong>{sektorAdi}</strong>
            <p>{baslik}</p>
          </article>
          <div className={styles.rotaCizgisi} aria-hidden="true">
            <span />
            <motion.i
              animate={hareketiAzalt ? undefined : { x: [0, 120, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span />
          </div>
          <div className={styles.lojistikDurumu}>
            <span>OPERASYON</span>
            <strong>{profil.durum}</strong>
          </div>
        </div>
        <OperasyonAdimlari profil={profil} />
        <OperasyonMetrikleri profil={profil} />
      </div>
    );
  }

  return (
    <div className={`${styles.operasyonPaneli} ${styles.operasyonOtomotiv}`}>
      <header>
        <span>{profil.ustEtiket}</span>
        <strong>{profil.kod}</strong>
      </header>
      <div className={styles.otomotivIsEmri}>
        <article>
          <small>ARAÇ / YÜZEY / UYGULAMA</small>
          <strong>{sektorAdi}</strong>
          <p>{baslik}</p>
        </article>
        <div className={styles.otomotivDurumu}>
          <span>İŞ EMRİ DURUMU</span>
          <strong>{profil.durum}</strong>
        </div>
        <OperasyonMetrikleri profil={profil} />
      </div>
      <OperasyonAdimlari profil={profil} />
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
