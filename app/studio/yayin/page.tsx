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

function adresiTemizle(deger: unknown) {
  return String(deger ?? "")
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
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

function guvenliKaydet(anahtar: string, veri: unknown) {
  try {
    window.localStorage.setItem(
      anahtar,
      JSON.stringify(veri),
    );

    return true;
  } catch (error) {
    console.error(
      `${anahtar} tarayıcıya kaydedilemedi:`,
      error,
    );

    return false;
  }
}

function projeListesiniOku(): ProjeVerisi[] {
  try {
    const kayit = window.localStorage.getItem(
      PROJELER_ANAHTARI,
    );

    if (!kayit) {
      return [];
    }

    const veri: unknown = JSON.parse(kayit);

    return Array.isArray(veri)
      ? (veri as ProjeVerisi[])
      : [];
  } catch (error) {
    console.error("Proje listesi okunamadı:", error);
    return [];
  }
}

function projeListesiniGuncelle(
  guncelProje: ProjeVerisi,
) {
  const projeler = projeListesiniOku();

  const mevcutIndex = projeler.findIndex(
    (kayitliProje) =>
      kayitliProje.id === guncelProje.id,
  );

  const guncelListe = [...projeler];

  if (mevcutIndex >= 0) {
    guncelListe[mevcutIndex] = guncelProje;
  } else {
    guncelListe.unshift(guncelProje);
  }

  return guvenliKaydet(
    PROJELER_ANAHTARI,
    guncelListe,
  );
}

export default function YayinAyarlariSayfasi() {
  const router = useRouter();

  const [proje, setProje] =
    useState<ProjeVerisi | null>(null);

  const [domain, setDomain] = useState("");
  const [vercelUrl, setVercelUrl] = useState("");
  const [seoBaslik, setSeoBaslik] = useState("");
  const [seoAciklama, setSeoAciklama] =
    useState("");
  const [seoKelimeler, setSeoKelimeler] =
    useState("");

  const [hata, setHata] = useState("");
  const [kaydedildi, setKaydedildi] =
    useState(false);
  const [yukleniyor, setYukleniyor] =
    useState(true);
  const [kaydediliyor, setKaydediliyor] =
    useState(false);

  useEffect(() => {
    const yuklemeZamanlayicisi = window.setTimeout(() => {
      try {
      const kayit =
        window.localStorage.getItem(
          AKTIF_PROJE_ANAHTARI,
        );

      if (!kayit) {
        return;
      }

      const projeVerisi =
        JSON.parse(kayit) as ProjeVerisi;

      setProje(projeVerisi);
      setDomain(projeVerisi.domain ?? "");
      setVercelUrl(projeVerisi.vercelUrl ?? "");
      setSeoBaslik(projeVerisi.seoBaslik ?? "");
      setSeoAciklama(
        projeVerisi.seoAciklama ?? "",
      );
      setSeoKelimeler(
        (projeVerisi.seoKelimeler ?? []).join(
          ", ",
        ),
      );
      } catch (error) {
        console.error(
          "Yayın ayarları yüklenemedi:",
          error,
        );

        setHata(
          "Yayın ayarları yüklenirken bir hata oluştu.",
        );
      } finally {
        setYukleniyor(false);
      }
    }, 0);

    return () => window.clearTimeout(yuklemeZamanlayicisi);
  }, []);

  const kullanilacakAdres = useMemo(() => {
    const ozelDomain = adresiTemizle(domain);
    const demoAdresi =
      adresiTemizle(vercelUrl);

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
  }, [
    domain,
    vercelUrl,
    proje?.githubRepoAdi,
  ]);

  function alanDegisti() {
    setHata("");
    setKaydedildi(false);
  }

  function kaydet(): boolean {
    if (!proje) {
      setHata("Aktif proje bulunamadı.");
      setKaydedildi(false);
      return false;
    }

    setKaydediliyor(true);
    setHata("");
    setKaydedildi(false);

    const temizDomain =
      adresiTemizle(domain);

    const temizVercelUrl =
      adresiTemizle(vercelUrl);

    if (!temizDomain && !temizVercelUrl) {
      setHata(
        "Özel domain veya Vercel demo adresinden en az birini yazmalısınız.",
      );
      setKaydediliyor(false);
      return false;
    }

    if (!alanAdiGecerliMi(temizDomain)) {
      setHata(
        "Özel domain geçerli görünmüyor. Örnek: haskoyshellaracbakim.com.tr",
      );
      setKaydediliyor(false);
      return false;
    }

    if (
      temizVercelUrl &&
      !alanAdiGecerliMi(temizVercelUrl)
    ) {
      setHata(
        "Vercel adresi geçerli görünmüyor. Örnek: firmaadi.vercel.app",
      );
      setKaydediliyor(false);
      return false;
    }

    const anahtarKelimeler = seoKelimeler
      .split(",")
      .map((kelime) => kelime.trim())
      .filter(Boolean);

    const guncelProje: ProjeVerisi = {
      ...proje,
      domain: temizDomain || undefined,
      vercelUrl:
        temizVercelUrl || undefined,
      seoBaslik:
        seoBaslik.trim() || undefined,
      seoAciklama:
        seoAciklama.trim() || undefined,
      seoKelimeler:
        anahtarKelimeler.length > 0
          ? anahtarKelimeler
          : undefined,
      guncellenmeTarihi:
        new Date().toISOString(),
    };

    const aktifProjeKaydedildi =
      guvenliKaydet(
        AKTIF_PROJE_ANAHTARI,
        guncelProje,
      );

    if (!aktifProjeKaydedildi) {
      setHata(
        "Proje kaydedilemedi. Tarayıcı depolama alanı dolmuş olabilir. Büyük görselleri azaltıp tekrar deneyin.",
      );
      setKaydediliyor(false);
      return false;
    }

    const projeListesiKaydedildi =
      projeListesiniGuncelle(guncelProje);

    if (!projeListesiKaydedildi) {
      setHata(
        "Aktif proje kaydedildi ancak proje listesi güncellenemedi. Tarayıcı depolama alanı dolmuş olabilir.",
      );

      setDomain(temizDomain);
      setVercelUrl(temizVercelUrl);
      setProje(guncelProje);
      setKaydediliyor(false);

      return false;
    }

    setDomain(temizDomain);
    setVercelUrl(temizVercelUrl);
    setProje(guncelProje);
    setHata("");
    setKaydedildi(true);
    setKaydediliyor(false);

    return true;
  }

  function kaydetVeOnizle() {
    const basariliMi = kaydet();

    if (!basariliMi) {
      return;
    }

    router.push("/studio/onizleme");
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

        <Link href="/studio/projeler">
          Projelere dön
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.sayfa}>
      <header className={styles.ustAlan}>
        <Link
          href="/studio/projeler"
          className={styles.geri}
        >
          <ArrowLeft size={18} />
          Projelere dön
        </Link>

        <Link href="/" className={styles.logo}>
          <span>SITEMIX</span>
          <small>STUDIO</small>
        </Link>

        <strong className={styles.adim}>
          YAYIN AYARLARI
        </strong>
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
              type="text"
              value={domain}
              onChange={(event) => {
                setDomain(event.target.value);
                alanDegisti();
              }}
              placeholder="haskoyshellaracbakim.com.tr"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />

            <small>
              Domaini önce Vercel projesine
              bağla. Buraya yalnızca alan adını
              yaz; https:// ekleme.
            </small>
          </label>

          <label className={styles.alan}>
            <span>Vercel demo adresi</span>

            <input
              type="text"
              value={vercelUrl}
              onChange={(event) => {
                setVercelUrl(event.target.value);
                alanDegisti();
              }}
              placeholder="haskoy-sheel-arac-bakim1.vercel.app"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />

            <small>
              Özel domain boşsa canonical ve
              sitemap için bu adres kullanılır.
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
              type="text"
              value={seoBaslik}
              onChange={(event) => {
                setSeoBaslik(
                  event.target.value,
                );
                alanDegisti();
              }}
              placeholder={`${proje.firmaAdi} | ${proje.sektorAdi}`}
              maxLength={65}
            />

            <small>
              {seoBaslik.length}/65 karakter
            </small>
          </label>

          <label className={styles.alan}>
            <span>SEO açıklaması</span>

            <textarea
              value={seoAciklama}
              onChange={(event) => {
                setSeoAciklama(
                  event.target.value,
                );
                alanDegisti();
              }}
              placeholder={`${proje.firmaAdi}, ${proje.sektorAdi} alanında profesyonel hizmet sunar.`}
              maxLength={170}
              rows={5}
            />

            <small>
              {seoAciklama.length}/170 karakter
            </small>
          </label>

          <label className={styles.alan}>
            <span>Anahtar kelimeler</span>

            <input
              type="text"
              value={seoKelimeler}
              onChange={(event) => {
                setSeoKelimeler(
                  event.target.value,
                );
                alanDegisti();
              }}
              placeholder="firma adı, sektör, şehir, hizmet"
            />

            <small>
              Kelimeleri virgülle ayır.
            </small>
          </label>
        </div>

        <aside className={styles.sagAlan}>
          <span>OLUŞACAK ADRESLER</span>

          <h2>{kullanilacakAdres}</h2>

          <div className={styles.adresListesi}>
            <div>
              <small>Ana sayfa</small>
              <strong>
                {kullanilacakAdres}
              </strong>
            </div>

            <div>
              <small>Sitemap</small>
              <strong>
                {kullanilacakAdres ===
                "Domain henüz belirlenmedi"
                  ? "Domain henüz belirlenmedi"
                  : `${kullanilacakAdres}/sitemap.xml`}
              </strong>
            </div>

            <div>
              <small>Robots</small>
              <strong>
                {kullanilacakAdres ===
                "Domain henüz belirlenmedi"
                  ? "Domain henüz belirlenmedi"
                  : `${kullanilacakAdres}/robots.txt`}
              </strong>
            </div>
          </div>

          {proje.githubUrl && (
            <a
              href={proje.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository’yi aç
              <ExternalLink size={15} />
            </a>
          )}

          {hata && (
            <p className={styles.hata}>
              {hata}
            </p>
          )}

          {kaydedildi && (
            <p className={styles.basarili}>
              <CheckCircle2 size={17} />
              Ayarlar kaydedildi. Önizleme
              sayfasında GitHub’ı Güncelle
              butonuna bas.
            </p>
          )}

          <button
            type="button"
            className={styles.kaydet}
            onClick={kaydet}
            disabled={kaydediliyor}
          >
            {kaydediliyor
              ? "Kaydediliyor..."
              : "Ayarları kaydet"}
          </button>

          <button
            type="button"
            className={styles.onizle}
            onClick={kaydetVeOnizle}
            disabled={kaydediliyor}
          >
            <span>
              {kaydediliyor
                ? "Kaydediliyor..."
                : "Kaydet ve önizle"}
            </span>

            <ArrowRight size={18} />
          </button>
        </aside>
      </section>
    </main>
  );
}
