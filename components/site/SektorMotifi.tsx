"use client";

import {
  Activity,
  Apple,
  Armchair,
  Baby,
  BookOpen,
  Brain,
  Building2,
  CakeSlice,
  Camera,
  Car,
  Dumbbell,
  Droplets,
  Flame,
  Flower2,
  GraduationCap,
  Hammer,
  Heart,
  House,
  KeyRound,
  Layers3,
  MapPinned,
  PawPrint,
  Printer,
  Route,
  Ruler,
  Scissors,
  Shapes,
  Shield,
  Sparkles,
  Stethoscope,
  SunMedium,
  Truck,
  WandSparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { sektorGorselDiliniGetir, type SektorIkonu } from "@/data/sektorGorselDili";
import styles from "./sektorMotifi.module.css";

const ikonlar: Record<SektorIkonu, LucideIcon> = {
  activity: Activity,
  apple: Apple,
  armchair: Armchair,
  baby: Baby,
  book: BookOpen,
  brain: Brain,
  building: Building2,
  cake: CakeSlice,
  camera: Camera,
  car: Car,
  dumbbell: Dumbbell,
  droplets: Droplets,
  flame: Flame,
  flower: Flower2,
  graduation: GraduationCap,
  hammer: Hammer,
  heart: Heart,
  house: House,
  key: KeyRound,
  layers: Layers3,
  map: MapPinned,
  paw: PawPrint,
  printer: Printer,
  route: Route,
  ruler: Ruler,
  scissors: Scissors,
  shapes: Shapes,
  shield: Shield,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  sun: SunMedium,
  truck: Truck,
  wand: WandSparkles,
  wrench: Wrench,
  zap: Zap,
};

type MotifVaryanti = "hero" | "panel" | "kart" | "tema" | "mini";

interface SektorMotifiProps {
  sektor: string;
  varyant?: MotifVaryanti;
  index?: number;
  etiketGoster?: boolean;
  className?: string;
}

const hareketler = {
  akiskan: { y: [0, -9, 0], x: [0, 4, 0], rotate: [0, 2, 0] },
  donen: { rotate: [0, 7, -4, 0], scale: [1, 1.04, 1] },
  nabiz: { scale: [1, 1.07, 1], y: [0, -3, 0] },
  salinan: { rotate: [-3, 4, -3], y: [0, -6, 0] },
};

export default function SektorMotifi({
  sektor,
  varyant = "panel",
  index = 0,
  etiketGoster = true,
  className = "",
}: SektorMotifiProps) {
  const dil = sektorGorselDiliniGetir(sektor);
  const hareketiAzalt = useReducedMotion();
  const ikonKimligi =
    varyant === "kart" || varyant === "mini"
      ? dil.destekIkonlari[index % dil.destekIkonlari.length]
      : dil.anaIkon;
  const AnaIkon = ikonlar[ikonKimligi];

  return (
    <div
      className={`${styles.motif} ${styles[varyant]} ${className}`}
      data-hareket={dil.hareket}
      data-site-parcasi="sektor-motifi"
      aria-label={`${dil.etiket}: ${dil.motif}`}
    >
      <span className={styles.izgara} aria-hidden="true" />
      <motion.span
        className={styles.yorunge}
        aria-hidden="true"
        animate={hareketiAzalt ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className={styles.anaIkon}
        animate={hareketiAzalt ? undefined : hareketler[dil.hareket]}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <AnaIkon aria-hidden="true" />
      </motion.span>

      {varyant !== "mini" &&
        dil.destekIkonlari.map((ikon, sira) => {
          const DestekIkonu = ikonlar[ikon];
          return (
            <motion.span
              key={`${ikon}-${sira}`}
              className={`${styles.destekIkon} ${styles[`destek${sira + 1}`]}`}
              aria-hidden="true"
              animate={
                hareketiAzalt
                  ? undefined
                  : { y: [0, sira % 2 === 0 ? -7 : 7, 0], rotate: [0, 5, 0] }
              }
              transition={{
                duration: 4 + sira * 0.8,
                delay: sira * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <DestekIkonu />
            </motion.span>
          );
        })}

      {etiketGoster && varyant !== "mini" && (
        <span className={styles.etiket}>
          <small>{dil.etiket}</small>
          <strong>{dil.motif}</strong>
        </span>
      )}
    </div>
  );
}
