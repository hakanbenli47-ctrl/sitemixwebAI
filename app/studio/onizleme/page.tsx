"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  ExternalLink,
  GitBranch,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import SiteGorunumu from "@/components/site/SiteGorunumu";
import type { ProjeVerisi } from "@/types/proje";
import styles from "./onizleme.module.css";

interface GithubAktarimCevabi {
  basarili: boolean;
  yeniOlusturuldu?: boolean;
  repoAdi?: string;
  branch?: string;
  githubUrl?: string;
  commitUrl?: string | null;
  mesaj: string;
}

interface AktarimDurumu {
  tur: "basarili" | "hata";
  mesaj: string;
  githubUrl?: string;
}

export default function SiteOnizlemeSayfasi() {
  const [proje, setProje] =
    useState<ProjeVerisi | null>(null);

  const [yukleniyor, setYukleniyor] =
    useState(true);

  const [aktariliyor, setAktariliyor] =
    useState(false);

  const [aktarimDurumu, setAktarimDurumu] =
    useState<AktarimDurumu | null>(null);

  useEffect(() => {
    const yuklemeZamanlayicisi = window.setTimeout(() => {
      const kayit = localStorage.getItem(
        "sitemix-aktif-proje",
      );

      if (!kayit) {
        setYukleniyor(false);
        return;
      }

      try {
        const projeVerisi = JSON.parse(
          kayit,
        ) as ProjeVerisi;

        setProje(projeVerisi);
      } catch (error) {
        console.error(
          "Önizleme yüklenemedi:",
          error,
        );
      } finally {
        setYukleniyor(false);
      }
    }, 0);

    return () => window.clearTimeout(yuklemeZamanlayicisi);
  }, []);

  async function githubaAktar() {
    if (!proje || aktariliyor) {
      return;
    }

    setAktariliyor(true);
    setAktarimDurumu(null);

    try {
      const cevap = await fetch(
        "/api/github/aktar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(proje),
        },
      );

      const veri =
        (await cevap.json()) as GithubAktarimCevabi;

      if (!cevap.ok || !veri.basarili) {
        throw new Error(
          veri.mesaj ||
            "GitHub aktarımı tamamlanamadı.",
        );
      }

      const guncelProje: ProjeVerisi = {
        ...proje,
        githubAktarildiMi: true,
        githubRepoAdi: veri.repoAdi,
        githubUrl: veri.githubUrl,
        sonGithubAktarimi:
          new Date().toISOString(),
      };

      localStorage.setItem(
        "sitemix-aktif-proje",
        JSON.stringify(guncelProje),
      );

      setProje(guncelProje);

      setAktarimDurumu({
        tur: "basarili",
        mesaj: veri.mesaj,
        githubUrl: veri.githubUrl,
      });
    } catch (error) {
      const mesaj =
        error instanceof Error
          ? error.message
          : "GitHub aktarımı sırasında bilinmeyen bir hata oluştu.";

      setAktarimDurumu({
        tur: "hata",
        mesaj,
      });
    } finally {
      setAktariliyor(false);
    }
  }

  if (yukleniyor) {
    return (
      <main className={styles.durumSayfasi}>
        <span>SITEMIX STUDIO</span>

        <h1>
          Site önizlemesi hazırlanıyor.
        </h1>
      </main>
    );
  }

  if (!proje) {
    return (
      <main className={styles.durumSayfasi}>
        <span>SITEMIX STUDIO</span>

        <h1>
          Önizlenecek proje bulunamadı.
        </h1>

        <Link href="/studio/yeni">
          Yeni proje oluştur
        </Link>
      </main>
    );
  }

  return (
    <>
      <div className={styles.studioCubugu}>
        <Link href="/studio/icerik">
          <ArrowLeft size={17} />
          İçerik düzenlemeye dön
        </Link>

        <span>CANLI ÖNİZLEME</span>

        <div className={styles.studioAksiyonlari}>
          <strong className={styles.studioTema}>
            {proje.tema}
          </strong>

          <button
            type="button"
            className={styles.githubAktarButonu}
            onClick={githubaAktar}
            disabled={aktariliyor}
          >
            {aktariliyor ? (
              <LoaderCircle
                size={16}
                className={styles.donenIkon}
              />
            ) : proje.githubAktarildiMi ? (
              <RefreshCw size={16} />
            ) : (
              <GitBranch size={16} />
            )}

            <span>
              {aktariliyor
                ? "Aktarılıyor..."
                : proje.githubAktarildiMi
                  ? "GitHub'ı Güncelle"
                  : "GitHub'a Aktar"}
            </span>
          </button>
        </div>
      </div>

      {aktarimDurumu && (
        <div
          className={`${styles.aktarimBildirimi} ${
            aktarimDurumu.tur === "basarili"
              ? styles.aktarimBasarili
              : styles.aktarimHatasi
          }`}
        >
          <div>
            {aktarimDurumu.tur ===
            "basarili" ? (
              <CheckCircle2 size={19} />
            ) : (
              <CircleAlert size={19} />
            )}

            <span>
              {aktarimDurumu.mesaj}
            </span>
          </div>

          {aktarimDurumu.githubUrl && (
            <a
              href={aktarimDurumu.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub’da aç
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      )}

      <SiteGorunumu proje={proje} />
    </>
  );
}
