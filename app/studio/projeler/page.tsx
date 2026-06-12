"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Eye,
  FilePenLine,
  GitBranch,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ProjeVerisi } from "@/types/proje";
import styles from "./projeler.module.css";

const PROJELER_ANAHTARI = "sitemix-projeler";
const AKTIF_PROJE_ANAHTARI = "sitemix-aktif-proje";

function tarihGoster(tarih?: string) {
  if (!tarih) {
    return "Tarih bulunamadı";
  }

  const tarihNesnesi = new Date(tarih);

  if (Number.isNaN(tarihNesnesi.getTime())) {
    return "Tarih bulunamadı";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(tarihNesnesi);
}

function projeleriOku(): ProjeVerisi[] {
  try {
    const kayit = localStorage.getItem(PROJELER_ANAHTARI);

    if (!kayit) {
      return [];
    }

    const veri = JSON.parse(kayit);

    return Array.isArray(veri) ? (veri as ProjeVerisi[]) : [];
  } catch {
    return [];
  }
}

function aktifProjeyiOku(): ProjeVerisi | null {
  try {
    const kayit = localStorage.getItem(AKTIF_PROJE_ANAHTARI);

    if (!kayit) {
      return null;
    }

    return JSON.parse(kayit) as ProjeVerisi;
  } catch {
    return null;
  }
}

export default function ProjelerSayfasi() {
  const router = useRouter();

  const [projeler, setProjeler] = useState<ProjeVerisi[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const kayitliProjeler = projeleriOku();
    const aktifProje = aktifProjeyiOku();

    let guncelProjeler = [...kayitliProjeler];

    if (aktifProje) {
      const mevcutIndex = guncelProjeler.findIndex(
        (proje) => proje.id === aktifProje.id,
      );

      if (mevcutIndex >= 0) {
        guncelProjeler[mevcutIndex] = aktifProje;
      } else {
        guncelProjeler.unshift(aktifProje);
      }
    }

    guncelProjeler.sort((a, b) => {
      const bTarih = new Date(
        b.sonGithubAktarimi ||
          b.guncellenmeTarihi ||
          b.olusturulmaTarihi,
      ).getTime();

      const aTarih = new Date(
        a.sonGithubAktarimi ||
          a.guncellenmeTarihi ||
          a.olusturulmaTarihi,
      ).getTime();

      return bTarih - aTarih;
    });

    localStorage.setItem(
      PROJELER_ANAHTARI,
      JSON.stringify(guncelProjeler),
    );

    setProjeler(guncelProjeler);
    setYukleniyor(false);
  }, []);

  function projeyiAc(
    proje: ProjeVerisi,
    hedef: "/studio/icerik" | "/studio/onizleme",
  ) {
    localStorage.setItem(
      AKTIF_PROJE_ANAHTARI,
      JSON.stringify(proje),
    );

    router.push(hedef);
  }

  function projeyiSil(projeId: string) {
    const onaylandi = window.confirm(
      "Bu projeyi Studio listesinden silmek istediğinize emin misiniz? GitHub repository silinmez.",
    );

    if (!onaylandi) {
      return;
    }

    const guncelProjeler = projeler.filter(
      (proje) => proje.id !== projeId,
    );

    localStorage.setItem(
      PROJELER_ANAHTARI,
      JSON.stringify(guncelProjeler),
    );

    const aktifProje = aktifProjeyiOku();

    if (aktifProje?.id === projeId) {
      localStorage.removeItem(AKTIF_PROJE_ANAHTARI);
    }

    setProjeler(guncelProjeler);
  }

  return (
    <main className={styles.sayfa}>
      <header className={styles.ustAlan}>
        <Link href="/" className={styles.geriDon}>
          <ArrowLeft size={17} />
          Studio ana sayfası
        </Link>

        <Link href="/studio/yeni" className={styles.yeniProje}>
          <Plus size={17} />
          Yeni proje oluştur
        </Link>
      </header>

      <section className={styles.baslikAlani}>
        <span>SITEMIX STUDIO</span>
        <h1>Projeler</h1>
        <p>
          Oluşturduğun siteleri düzenle, önizle ve GitHub
          repositorylerini güncelle.
        </p>
      </section>

      {yukleniyor ? (
        <section className={styles.bosDurum}>
          <span>PROJELER YÜKLENİYOR</span>
          <h2>Proje kayıtları hazırlanıyor.</h2>
        </section>
      ) : projeler.length === 0 ? (
        <section className={styles.bosDurum}>
          <span>HENÜZ PROJE YOK</span>
          <h2>İlk web siteni oluşturmaya başla.</h2>

          <Link href="/studio/yeni">
            Yeni proje oluştur
            <ArrowRight size={18} />
          </Link>
        </section>
      ) : (
        <section className={styles.projeListesi}>
          <div className={styles.listeBasligi}>
            <span>PROJE</span>
            <span>DURUM</span>
            <span>SON GÜNCELLEME</span>
            <span>İŞLEMLER</span>
          </div>

          {projeler.map((proje, index) => (
            <article key={proje.id} className={styles.projeSatiri}>
              <div className={styles.projeBilgisi}>
                <span className={styles.sira}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h2>{proje.firmaAdi}</h2>
                  <p>
                    {proje.sektorAdi} ·{" "}
                    {proje.siteTipi === "tek-sayfa"
                      ? "Tek sayfa"
                      : "Çok sayfa"}
                  </p>
                </div>
              </div>

              <div className={styles.projeDurumu}>
                {proje.githubAktarildiMi ? (
                  <span className={styles.githubDurumu}>
                    <GitBranch size={14} />
                    GitHub’a aktarıldı
                  </span>
                ) : (
                  <span className={styles.taslakDurumu}>Taslak</span>
                )}
              </div>

              <div className={styles.tarih}>
                <span>
                  {tarihGoster(
                    proje.sonGithubAktarimi ||
                      proje.guncellenmeTarihi,
                  )}
                </span>

                {proje.githubRepoAdi && (
                  <small>{proje.githubRepoAdi}</small>
                )}
              </div>

              <div className={styles.aksiyonlar}>
                <button
                  type="button"
                  onClick={() => projeyiAc(proje, "/studio/icerik")}
                >
                  <FilePenLine size={16} />
                  Düzenle
                </button>

                <button
                  type="button"
                  onClick={() => projeyiAc(proje, "/studio/onizleme")}
                >
                  <Eye size={16} />
                  Önizle
                </button>

                {proje.githubUrl && (
                  <a
                    href={proje.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={16} />
                    GitHub
                  </a>
                )}

                <button
                  type="button"
                  className={styles.silButonu}
                  onClick={() => projeyiSil(proje.id)}
                  aria-label="Projeyi sil"
                  title="Projeyi Studio listesinden sil"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
