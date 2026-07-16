"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  GripVertical,
  Home,
  Menu,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteSayfasi } from "@/data/sektorSablonlari";
import type { ProjeVerisi } from "@/types/proje";

function slugOlustur(metin: unknown) {
  return String(metin ?? "")
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function idOlustur() {
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    typeof window.crypto.randomUUID === "function"
  ) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function DuzenleyiciSayfasi() {
  const router = useRouter();

  const [proje, setProje] = useState<ProjeVerisi | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [yeniSayfaAdi, setYeniSayfaAdi] = useState("");
  const [hata, setHata] = useState("");
  const [kaydedildi, setKaydedildi] = useState(false);

  useEffect(() => {
    const yuklemeZamanlayicisi = window.setTimeout(() => {
      const kayitliProje = localStorage.getItem("sitemix-aktif-proje");

      if (!kayitliProje) {
        setYukleniyor(false);
        return;
      }

      try {
        const projeVerisi = JSON.parse(kayitliProje) as ProjeVerisi;

        setProje(projeVerisi);
      } catch (error) {
        console.error("Proje okunamadı:", error);
        localStorage.removeItem("sitemix-aktif-proje");
      } finally {
        setYukleniyor(false);
      }
    }, 0);

    return () => window.clearTimeout(yuklemeZamanlayicisi);
  }, []);

  function projeyiKaydet(guncelProje: ProjeVerisi) {
    const kaydedilecekProje: ProjeVerisi = {
      ...guncelProje,
      guncellenmeTarihi: new Date().toISOString(),
    };

    setProje(kaydedilecekProje);

    localStorage.setItem(
      "sitemix-aktif-proje",
      JSON.stringify(kaydedilecekProje),
    );

    setKaydedildi(true);

    window.setTimeout(() => {
      setKaydedildi(false);
    }, 1400);
  }

  function sayfaEkle() {
    if (!proje) {
      return;
    }

    const temizAd = yeniSayfaAdi.trim();

    if (!temizAd) {
      setHata("Yeni sayfanın adını yazmalısın.");
      return;
    }

    const yeniSlug = slugOlustur(temizAd);

    if (!yeniSlug) {
      setHata("Geçerli bir sayfa adı yazmalısın.");
      return;
    }

    const ayniSayfaVarMi = proje.sayfalar.some(
      (sayfa) =>
        sayfa.slug === yeniSlug ||
        String(sayfa.ad ?? "").toLocaleLowerCase("tr-TR") ===
          String(temizAd ?? "").toLocaleLowerCase("tr-TR"),
    );

    if (ayniSayfaVarMi) {
      setHata("Bu isimde veya adreste başka bir sayfa bulunuyor.");
      return;
    }

    const yeniSayfa: SiteSayfasi = {
      id: idOlustur(),
      rol: "ozel",
      ad: temizAd,
      slug: yeniSlug,
      menuBasligi: temizAd,
      menuGoster: true,
      anaSayfa: false,
      sira: proje.sayfalar.length,
      bolumler: [],
    };

    projeyiKaydet({
      ...proje,
      sayfalar: [...proje.sayfalar, yeniSayfa],
    });

    setYeniSayfaAdi("");
    setHata("");
  }

  function sayfaSil(sayfaId: string) {
    if (!proje) {
      return;
    }

    const silinecekSayfa = proje.sayfalar.find(
      (sayfa) => sayfa.id === sayfaId,
    );

    if (!silinecekSayfa || silinecekSayfa.anaSayfa) {
      return;
    }

    const onaylandi = window.confirm(
      `"${silinecekSayfa.ad}" sayfasını silmek istediğine emin misin?`,
    );

    if (!onaylandi) {
      return;
    }

    const kalanSayfalar = proje.sayfalar
      .filter((sayfa) => sayfa.id !== sayfaId)
      .map((sayfa, index) => ({
        ...sayfa,
        sira: index,
      }));

    projeyiKaydet({
      ...proje,
      sayfalar: kalanSayfalar,
    });
  }

  function sayfaGuncelle(
    sayfaId: string,
    alan: "ad" | "menuBasligi" | "slug" | "menuGoster",
    deger: string | boolean,
  ) {
    if (!proje) {
      return;
    }

    const guncelSayfalar = proje.sayfalar.map((sayfa) => {
      if (sayfa.id !== sayfaId) {
        return sayfa;
      }

      if (alan === "ad") {
        const yeniAd = String(deger);

        return {
          ...sayfa,
          ad: yeniAd,
          menuBasligi:
            sayfa.menuBasligi === sayfa.ad
              ? yeniAd
              : sayfa.menuBasligi,
          slug: sayfa.anaSayfa
            ? ""
            : slugOlustur(yeniAd),
        };
      }

      if (alan === "slug") {
        return {
          ...sayfa,
          slug: sayfa.anaSayfa
            ? ""
            : slugOlustur(String(deger)),
        };
      }

      return {
        ...sayfa,
        [alan]: deger,
      };
    });

    projeyiKaydet({
      ...proje,
      sayfalar: guncelSayfalar,
    });
  }

  function temaSecimineGec() {
    if (!proje) {
      return;
    }

    const bosSayfaVarMi = proje.sayfalar.some(
      (sayfa) => !sayfa.ad.trim(),
    );

    if (bosSayfaVarMi) {
      setHata("Sayfa adlarından biri boş bırakılamaz.");
      return;
    }

    router.push("/studio/tema");
  }

  if (yukleniyor) {
    return (
      <main className="projeBulunamadi">
        <span>SITEMIX STUDIO</span>
        <h1>Proje yükleniyor.</h1>
        <p>Kaydedilen proje bilgileri hazırlanıyor.</p>
      </main>
    );
  }

  if (!proje) {
    return (
      <main className="projeBulunamadi">
        <span>SITEMIX STUDIO</span>

        <h1>Aktif proje bulunamadı.</h1>

        <p>
          Önce yeni bir proje oluşturup temel bilgileri kaydetmelisin.
        </p>

        <Link href="/studio/yeni">
          Yeni proje oluştur
          <ArrowRight size={18} />
        </Link>
      </main>
    );
  }

  return (
    <main className="duzenleyiciSayfasi">
      <header className="duzenleyiciUstAlan">
        <Link href="/studio/yeni" className="duzenleyiciGeri">
          <ArrowLeft size={18} />
          Temel bilgiler
        </Link>

        <Link href="/" className="duzenleyiciLogo">
          <span>SITEMIX</span>
          <small>STUDIO</small>
        </Link>

        <div className="duzenleyiciDurum">
          {kaydedildi && (
            <span>
              <Check size={15} />
              Kaydedildi
            </span>
          )}

          <strong>02 / Sayfalar</strong>
        </div>
      </header>

      <section className="duzenleyiciBaslik">
        <div>
          <span>SAYFA YAPISI</span>

          <h1>{proje.firmaAdi}</h1>

          <p>
            Site içerisindeki sayfaları oluştur, sayfa adreslerini
            belirle ve hangi sayfaların menüde görüneceğini seç.
          </p>
        </div>

        <div className="projeKisaBilgi">
          <div>
            <span>Sektör</span>
            <strong>{proje.sektorAdi || "Belirtilmedi"}</strong>
          </div>

          <div>
            <span>Site yapısı</span>
            <strong>
              {proje.siteTipi === "tek-sayfa"
                ? "Tek sayfalı"
                : "Çok sayfalı"}
            </strong>
          </div>

          <div>
            <span>Proje adresi</span>
            <strong>{proje.slug}</strong>
          </div>
        </div>
      </section>

      <section className="sayfaYonetimAlani">
        <div className="sayfaListesiAlani">
          <div className="sayfaListesiBaslik">
            <div>
              <span>01</span>
              <h2>Site sayfaları</h2>
            </div>

            <p>{proje.sayfalar.length} sayfa</p>
          </div>

          <div className="sayfaListesi">
            {proje.sayfalar
              .sort((a, b) => a.sira - b.sira)
              .map((sayfa, index) => (
                <article className="sayfaSatiri" key={sayfa.id}>
                  <div className="sayfaSurukleme">
                    <GripVertical size={18} />
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="sayfaIkonu">
                    {sayfa.anaSayfa ? (
                      <Home size={21} />
                    ) : (
                      <FileText size={21} />
                    )}
                  </div>

                  <div className="sayfaAlanlari">
                    <div className="sayfaInputGrubu">
                      <label htmlFor={`sayfa-ad-${sayfa.id}`}>
                        Sayfa adı
                      </label>

                      <input
                        id={`sayfa-ad-${sayfa.id}`}
                        type="text"
                        value={sayfa.ad}
                        onChange={(event) =>
                          sayfaGuncelle(
                            sayfa.id,
                            "ad",
                            event.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="sayfaInputGrubu">
                      <label htmlFor={`menu-ad-${sayfa.id}`}>
                        Menü başlığı
                      </label>

                      <input
                        id={`menu-ad-${sayfa.id}`}
                        type="text"
                        value={sayfa.menuBasligi}
                        onChange={(event) =>
                          sayfaGuncelle(
                            sayfa.id,
                            "menuBasligi",
                            event.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="sayfaInputGrubu">
                      <label htmlFor={`slug-${sayfa.id}`}>
                        Sayfa adresi
                      </label>

                      <div className="sayfaSlugAlani">
                        <span>/</span>

                        <input
                          id={`slug-${sayfa.id}`}
                          type="text"
                          value={sayfa.slug}
                          disabled={sayfa.anaSayfa}
                          onChange={(event) =>
                            sayfaGuncelle(
                              sayfa.id,
                              "slug",
                              event.target.value,
                            )
                          }
                          placeholder={
                            sayfa.anaSayfa
                              ? "Ana sayfa"
                              : "sayfa-adresi"
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sayfaIslemleri">
                    <button
                      type="button"
                      className={
                        sayfa.menuGoster
                          ? "menuDurumButonu aktif"
                          : "menuDurumButonu"
                      }
                      onClick={() =>
                        sayfaGuncelle(
                          sayfa.id,
                          "menuGoster",
                          !sayfa.menuGoster,
                        )
                      }
                      title={
                        sayfa.menuGoster
                          ? "Menüden gizle"
                          : "Menüde göster"
                      }
                    >
                      <Menu size={18} />
                    </button>

                    <button
                      type="button"
                      className="sayfaSilButonu"
                      onClick={() => sayfaSil(sayfa.id)}
                      disabled={sayfa.anaSayfa}
                      title={
                        sayfa.anaSayfa
                          ? "Ana sayfa silinemez"
                          : "Sayfayı sil"
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </div>

        <aside className="yeniSayfaAlani">
          <div className="yeniSayfaSabitleyici">
            <span className="yeniSayfaEtiketi">YENİ SAYFA</span>

            <h2>Siteye yeni bir sayfa ekle.</h2>

            <p>
              Sayfa adını yaz. Menü başlığı ve sayfa adresi otomatik
              oluşturulsun.
            </p>

            <label htmlFor="yeniSayfaAdi">Sayfa adı</label>

            <input
              id="yeniSayfaAdi"
              type="text"
              value={yeniSayfaAdi}
              onChange={(event) => {
                setYeniSayfaAdi(event.target.value);
                setHata("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sayfaEkle();
                }
              }}
              placeholder="Örneğin: Hizmetler"
            />

            {yeniSayfaAdi.trim() && (
              <div className="yeniSayfaOnizleme">
                <span>Oluşacak adres</span>
                <strong>/{slugOlustur(yeniSayfaAdi)}</strong>
              </div>
            )}

            {hata && <p className="sayfaHatasi">{hata}</p>}

            <button
              type="button"
              className="sayfaEkleButonu"
              onClick={sayfaEkle}
            >
              <Plus size={19} />
              Sayfayı ekle
            </button>

            <div className="sonrakiAdimAlani">
              <span>SONRAKİ ADIM</span>

              <h3>Tema ve tasarım seçimi</h3>

              <p>
                Sayfaların hazır olduğunda sitenin ana tasarımını
                seçmeye geç.
              </p>

              <button
                type="button"
                onClick={temaSecimineGec}
              >
                Tema seçimine geç
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
