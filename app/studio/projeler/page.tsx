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
  Globe2,
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

  try {
    return new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(tarihNesnesi);
  } catch {
    return tarihNesnesi.toLocaleString("tr-TR");
  }
}

function tarihDegeri(proje: ProjeVerisi) {
  const tarih =
    proje.sonGithubAktarimi ||
    proje.guncellenmeTarihi ||
    proje.olusturulmaTarihi;

  if (!tarih) {
    return 0;
  }

  const deger = new Date(tarih).getTime();

  return Number.isNaN(deger) ? 0 : deger;
}

function gecerliProjeMi(veri: unknown): veri is ProjeVerisi {
  if (!veri || typeof veri !== "object") {
    return false;
  }

  const proje = veri as Partial<ProjeVerisi>;

  return typeof proje.id === "string" && proje.id.length > 0;
}

function projeleriOku(): ProjeVerisi[] {
  try {
    const kayit = window.localStorage.getItem(PROJELER_ANAHTARI);

    if (!kayit) {
      return [];
    }

    const veri: unknown = JSON.parse(kayit);

    if (!Array.isArray(veri)) {
      return [];
    }

    return veri.filter(gecerliProjeMi);
  } catch (error) {
    console.error("Projeler okunamadı:", error);
    return [];
  }
}

function aktifProjeyiOku(): ProjeVerisi | null {
  try {
    const kayit = window.localStorage.getItem(AKTIF_PROJE_ANAHTARI);

    if (!kayit) {
      return null;
    }

    const veri: unknown = JSON.parse(kayit);

    return gecerliProjeMi(veri) ? veri : null;
  } catch (error) {
    console.error("Aktif proje okunamadı:", error);
    return null;
  }
}

function guvenliKaydet(anahtar: string, veri: unknown) {
  try {
    window.localStorage.setItem(anahtar, JSON.stringify(veri));
    return true;
  } catch (error) {
    console.error("Tarayıcı depolama hatası:", error);
    return false;
  }
}

export default function ProjelerSayfasi() {
  const router = useRouter();

  const [projeler, setProjeler] = useState<ProjeVerisi[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [depolamaHatasi, setDepolamaHatasi] = useState(false);

  useEffect(() => {
    const yuklemeZamanlayicisi = window.setTimeout(() => {
      try {
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

      guncelProjeler = guncelProjeler
        .filter(gecerliProjeMi)
        .sort((a, b) => tarihDegeri(b) - tarihDegeri(a));

      setProjeler(guncelProjeler);

      const kaydedildi = guvenliKaydet(
        PROJELER_ANAHTARI,
        guncelProjeler,
      );

      if (!kaydedildi) {
        setDepolamaHatasi(true);
      }
      } catch (error) {
        console.error("Projeler hazırlanamadı:", error);
        setProjeler([]);
        setDepolamaHatasi(true);
      } finally {
        setYukleniyor(false);
      }
    }, 0);

    return () => window.clearTimeout(yuklemeZamanlayicisi);
  }, []);

  function projeyiAc(
    proje: ProjeVerisi,
    hedef:
      | "/studio/icerik"
      | "/studio/onizleme"
      | "/studio/yayin",
  ) {
    const kaydedildi = guvenliKaydet(
      AKTIF_PROJE_ANAHTARI,
      proje,
    );

    if (!kaydedildi) {
      window.alert(
        "Proje tarayıcıya kaydedilemedi. Depolama alanı dolmuş olabilir. Eski proje kayıtlarını veya site verilerini temizleyip tekrar deneyin.",
      );
      return;
    }

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

    const kaydedildi = guvenliKaydet(
      PROJELER_ANAHTARI,
      guncelProjeler,
    );

    if (!kaydedildi) {
      window.alert("Proje kaydı güncellenemedi.");
      return;
    }

    const aktifProje = aktifProjeyiOku();

    if (aktifProje?.id === projeId) {
      try {
        window.localStorage.removeItem(AKTIF_PROJE_ANAHTARI);
      } catch (error) {
        console.error("Aktif proje silinemedi:", error);
      }
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

      {depolamaHatasi && (
        <section className={styles.bosDurum}>
          <span>DEPOLAMA UYARISI</span>
          <h2>Bazı proje kayıtları tarayıcıya kaydedilemedi.</h2>
          <p>
            Proje görselleri tarayıcı depolama alanını doldurmuş
            olabilir.
          </p>
        </section>
      )}

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
            <article
              key={proje.id || `proje-${index}`}
              className={styles.projeSatiri}
            >
              <div className={styles.projeBilgisi}>
                <span className={styles.sira}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h2>{proje.firmaAdi || "İsimsiz proje"}</h2>
                  <p>
                    {proje.sektorAdi || "Sektör belirtilmedi"} ·{" "}
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
                  <span className={styles.taslakDurumu}>
                    Taslak
                  </span>
                )}
              </div>

              <div className={styles.tarih}>
                <span>
                  {tarihGoster(
                    proje.sonGithubAktarimi ||
                      proje.guncellenmeTarihi ||
                      proje.olusturulmaTarihi,
                  )}
                </span>

                {proje.githubRepoAdi && (
                  <small>{proje.githubRepoAdi}</small>
                )}
              </div>

              <div className={styles.aksiyonlar}>
                <button
                  type="button"
                  onClick={() =>
                    projeyiAc(proje, "/studio/icerik")
                  }
                >
                  <FilePenLine size={16} />
                  Düzenle
                </button>

                <button
                  type="button"
                  onClick={() =>
                    projeyiAc(proje, "/studio/onizleme")
                  }
                >
                  <Eye size={16} />
                  Önizle
                </button>

                <button
                  type="button"
                  onClick={() =>
                    projeyiAc(proje, "/studio/yayin")
                  }
                >
                  <Globe2 size={16} />
                  Yayın ayarları
                </button>

                {proje.githubUrl && (
                  <a
                    href={proje.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
