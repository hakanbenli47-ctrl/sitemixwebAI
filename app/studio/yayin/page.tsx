"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Globe2,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ProjeVerisi } from "@/types/proje";
import styles from "./yayin.module.css";

const AKTIF_PROJE_ANAHTARI = "sitemix-aktif-proje";
const PROJELER_ANAHTARI = "sitemix-projeler";

function adresiTemizle(deger: string) {
  return deger
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/g, "");
}

function alanAdiGecerliMi(deger: string) {
  if (!deger) {
    return true;
  }

  return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(
    deger,
  );
}

function projeListesiniGuncelle(guncelProje: ProjeVerisi) {
  try {
    const kayit = localStorage.getItem(PROJELER_ANAHTARI);
    const projeler = kayit ? (JSON.parse(kayit) as ProjeVerisi[]) : [];

    const guncelListe = Array.isArray(projeler)
      ? projeler.some((proje) => proje.id === guncelProje.id)
        ? projeler.map((proje) =>
            proje.id === guncelProje.id ? guncelProje : proje,
          )
        : [guncelProje, ...projeler]
      : [guncelProje];

    localStorage.setItem(PROJELER_ANAHTARI, JSON.stringify(guncelListe));
  } catch {
    localStorage.setItem(
      PROJELER_ANAHTARI,
      JSON.stringify([guncelProje]),
    );
  }
}

export default function YayinAyarlariSayfasi() {
  const router = useRouter();

  const [proje, setProje] = useState<ProjeVerisi | null>(null);
  const [domain, setDomain] = useState("");
  const [vercelUrl, setVercelUrl] = useState("");
  const [seoBaslik, setSeoBaslik] = useState("");
  const [seoAciklama, setSeoAciklama] = useState("");
  const [seoKelimeler, setSeoKelimeler] = useState("");
  const [hata, setHata] = useState("");
  const [kaydedildi, setKaydedildi] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const kayit = localStorage.getItem(AKTIF_PROJE_ANAHTARI);

    if (!kayit) {
      setYukleniyor(false);
      return;
    }

    try {
      const projeVerisi = JSON.parse(kayit) as ProjeVerisi;

      setProje(projeVerisi);
      setDomain(projeVerisi.domain ?? "");
      setVercelUrl(projeVerisi.vercelUrl ?? "");
      setSeoBaslik(projeVerisi.seoBaslik ?? "");
      setSeoAciklama(projeVerisi.seoAciklama ?? "");
      setSeoKelimeler((projeVerisi.seoKelimeler ?? []).join(", "));
    } catch (error) {
      console.error("Yayın ayarları yüklenemedi:", error);
    } finally {
      setYukleniyor(false);
    }
  }, []);

  const kullanilacakAdres = useMemo(() => {
    const ozelDomain = adresiTemizle(domain);
    const demoAdresi = adresiTemizle(vercelUrl);

    if (ozelDomain) {
      return `https://${ozelDomain}`;
    }

    if (demoAdresi) {
      return `https://${demoAdresi}`;
    }

    if (proje?.githubRepoAdi) {
      return `https://${proje.githubRepoAdi}.vercel.app`;
    }

    return "Domain henüz belirlenmedi";
  }, [domain, proje?.githubRepoAdi, vercelUrl]);

  function kaydet() {
    if (!proje) {
      return;
    }

    const temizDomain = adresiTemizle(domain);
    const temizVercelUrl = adresiTemizle(vercelUrl);

    if (!alanAdiGecerliMi(temizDomain)) {
      setHata("Özel domain geçerli görünmüyor. Örnek: firmaadi.com");
      return;
    }

    if (temizVercelUrl && !alanAdiGecerliMi(temizVercelUrl)) {
      setHata("Vercel adresi geçerli görünmüyor. Örnek: firmaadi.vercel.app");
      return;
    }

    const anahtarKelimeler = seoKelimeler
      .split(",")
      .map((kelime) => kelime.trim())
      .filter(Boolean);

    const guncelProje: ProjeVerisi = {
      ...proje,
      domain: temizDomain || undefined,
      vercelUrl: temizVercelUrl || undefined,
      seoBaslik: seoBaslik.trim() || undefined,
      seoAciklama: seoAciklama.trim() || undefined,
      seoKelimeler:
        anahtarKelimeler.length > 0 ? anahtarKelimeler : undefined,
      guncellenmeTarihi: new Date().toISOString(),
    };

    localStorage.setItem(
      AKTIF_PROJE_ANAHTARI,
      JSON.stringify(guncelProje),
    );

    projeListesiniGuncelle(guncelProje);
    setProje(guncelProje);
    setHata("");
    setKaydedildi(true);
  }

  function kaydetVeOnizle() {
    kaydet();

    window.setTimeout(() => {
      router.push("/studio/onizleme");
    }, 50);
  }

  if (yukleniyor) {
    return (
      <main className={styles.durumSayfasi}>
        <span>SITEMIX STUDIO</span>
        <h1>Yayın ayarları hazırlanıyor.</h1>
      </main>
    );
  }

  if (!proje) {
    return (
      <main className={styles.durumSayfasi}>
        <span>SITEMIX STUDIO</span>
        <h1>Aktif proje bulunamadı.</h1>
        <Link href="/studio/projeler">Projelere dön</Link>
      </main>
    );
  }

  return (
    <main className={styles.sayfa}>
      <header className={styles.ustAlan}>
        <Link href="/studio/projeler" className={styles.geri}>
          <ArrowLeft size={18} />
          Projelere dön
        </Link>

        <Link href="/" className={styles.logo}>
          <span>SITEMIX</span>
          <small>STUDIO</small>
        </Link>

        <strong className={styles.adim}>YAYIN AYARLARI</strong>
      </header>

      <section className={styles.baslikAlani}>
        <div>
          <span>DOMAIN VE SEO</span>
          <h1>
            Canlı sitenin
            <br />
            yayın bilgilerini gir.
          </h1>
        </div>

        <div className={styles.projeBilgisi}>
          <span>Aktif proje</span>
          <strong>{proje.firmaAdi}</strong>
          <small>{kullanilacakAdres}</small>
        </div>
      </section>

      <section className={styles.formAlani}>
        <div className={styles.formBolumu}>
          <div className={styles.bolumBasligi}>
            <Globe2 size={21} />
            <div>
              <span>01</span>
              <h2>Domain bilgileri</h2>
            </div>
          </div>

          <label className={styles.alan}>
            <span>Özel domain</span>
            <input
              value={domain}
              onChange={(event) => {
                setDomain(event.target.value);
                setKaydedildi(false);
              }}
              placeholder="firmaadi.com"
            />
            <small>
              Domaini önce Vercel projesine elle bağla. Buraya yalnızca alan
              adını yaz; https:// ekleme.
            </small>
          </label>

          <label className={styles.alan}>
            <span>Vercel demo adresi</span>
            <input
              value={vercelUrl}
              onChange={(event) => {
                setVercelUrl(event.target.value);
                setKaydedildi(false);
              }}
              placeholder="firmaadi.vercel.app"
            />
            <small>
              Özel domain boşsa canonical ve sitemap için bu adres kullanılır.
            </small>
          </label>
        </div>

        <div className={styles.formBolumu}>
          <div className={styles.bolumBasligi}>
            <Search size={21} />
            <div>
              <span>02</span>
              <h2>SEO bilgileri</h2>
            </div>
          </div>

          <label className={styles.alan}>
            <span>SEO başlığı</span>
            <input
              value={seoBaslik}
              onChange={(event) => {
                setSeoBaslik(event.target.value);
                setKaydedildi(false);
              }}
              placeholder={`${proje.firmaAdi} | ${proje.sektorAdi}`}
              maxLength={65}
            />
            <small>{seoBaslik.length}/65 karakter</small>
          </label>

          <label className={styles.alan}>
            <span>SEO açıklaması</span>
            <textarea
              value={seoAciklama}
              onChange={(event) => {
                setSeoAciklama(event.target.value);
                setKaydedildi(false);
              }}
              placeholder={`${proje.firmaAdi}, ${proje.sektorAdi} alanında profesyonel hizmet sunar.`}
              maxLength={170}
              rows={5}
            />
            <small>{seoAciklama.length}/170 karakter</small>
          </label>

          <label className={styles.alan}>
            <span>Anahtar kelimeler</span>
            <input
              value={seoKelimeler}
              onChange={(event) => {
                setSeoKelimeler(event.target.value);
                setKaydedildi(false);
              }}
              placeholder="firma adı, sektör, şehir, hizmet"
            />
            <small>Kelimeleri virgülle ayır.</small>
          </label>
        </div>

        <aside className={styles.sagAlan}>
          <span>OLUŞACAK ADRESLER</span>
          <h2>{kullanilacakAdres}</h2>

          <div className={styles.adresListesi}>
            <div>
              <small>Ana sayfa</small>
              <strong>{kullanilacakAdres}</strong>
            </div>
            <div>
              <small>Sitemap</small>
              <strong>{kullanilacakAdres}/sitemap.xml</strong>
            </div>
            <div>
              <small>Robots</small>
              <strong>{kullanilacakAdres}/robots.txt</strong>
            </div>
          </div>

          {proje.githubUrl && (
            <a href={proje.githubUrl} target="_blank" rel="noreferrer">
              Repository’yi aç
              <ExternalLink size={15} />
            </a>
          )}

          {hata && <p className={styles.hata}>{hata}</p>}

          {kaydedildi && (
            <p className={styles.basarili}>
              <CheckCircle2 size={17} />
              Ayarlar kaydedildi. Önizlemede GitHub’ı Güncelle’ye bas.
            </p>
          )}

          <button type="button" className={styles.kaydet} onClick={kaydet}>
            Ayarları kaydet
          </button>

          <button
            type="button"
            className={styles.onizle}
            onClick={kaydetVeOnizle}
          >
            Kaydet ve önizle
            <ArrowRight size={18} />
          </button>
        </aside>
      </section>
    </main>
  );
}
