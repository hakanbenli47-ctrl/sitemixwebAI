"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Globe2,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useMemo, useState } from "react";
import { sektorler } from "@/data/sektorler";
import { sektorSayfalariOlustur } from "@/data/sektorSablonlari";

type SiteTipi = "tek-sayfa" | "cok-sayfa";

interface ProjeFormu {
  firmaAdi: string;
  sektor: string;
  ozelSektor: string;
  siteTipi: SiteTipi;
  telefon: string;
  whatsapp: string;
  eposta: string;
  adres: string;
  slug: string;
}

const baslangicFormu: ProjeFormu = {
  firmaAdi: "",
  sektor: "",
  ozelSektor: "",
  siteTipi: "cok-sayfa",
  telefon: "",
  whatsapp: "",
  eposta: "",
  adres: "",
  slug: "",
};

function slugOlustur(metin: string) {
  return metin
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

export default function YeniProjeSayfasi() {
  const router = useRouter();

  const [form, setForm] = useState<ProjeFormu>(baslangicFormu);
  const [hata, setHata] = useState("");
  const [kaydediliyor, setKaydediliyor] = useState(false);

  const secilenSektor = useMemo(() => {
    return sektorler.find((sektor) => sektor.id === form.sektor);
  }, [form.sektor]);

  const gorunenSektor =
    form.sektor === "ozel"
      ? form.ozelSektor.trim()
      : secilenSektor?.ad ?? "";

  function alanGuncelle<K extends keyof ProjeFormu>(
    alan: K,
    deger: ProjeFormu[K],
  ) {
    setForm((eskiForm) => ({
      ...eskiForm,
      [alan]: deger,
    }));

    setHata("");
  }

  function firmaAdiGuncelle(firmaAdi: string) {
    setForm((eskiForm) => ({
      ...eskiForm,
      firmaAdi,
      slug: slugOlustur(firmaAdi),
    }));

    setHata("");
  }

  function devamEt() {
    if (!form.firmaAdi.trim()) {
      setHata("Devam etmek için firma adını yazmalısın.");
      return;
    }

    if (!form.sektor) {
      setHata("Devam etmek için bir sektör seçmelisin.");
      return;
    }

    if (form.sektor === "ozel" && !form.ozelSektor.trim()) {
      setHata("Özel sektörün adını yazmalısın.");
      return;
    }

    if (!form.slug.trim()) {
      setHata("Proje adresi boş bırakılamaz.");
      return;
    }

    setKaydediliyor(true);

    try {
      const sektorAdi =
        form.sektor === "ozel"
          ? form.ozelSektor.trim()
          : secilenSektor?.ad ?? "";

      let sayfalar = sektorSayfalariOlustur({
        firmaAdi: form.firmaAdi.trim(),
        sektor: form.sektor,
        sektorAdi,
        telefon: form.telefon.trim(),
        whatsapp: form.whatsapp.trim(),
        eposta: form.eposta.trim(),
        adres: form.adres.trim(),
      });

      if (form.siteTipi === "tek-sayfa") {
        sayfalar = [sayfalar[0]];
      }

      const tarih = new Date().toISOString();

      const projeVerisi = {
        id: idOlustur(),
        firmaAdi: form.firmaAdi.trim(),
        sektor: form.sektor,
        sektorAdi,
        siteTipi: form.siteTipi,
        telefon: form.telefon.trim(),
        whatsapp: form.whatsapp.trim(),
        eposta: form.eposta.trim(),
        adres: form.adres.trim(),
        slug: form.slug.trim(),
        tema: "",
        sayfalar,
        olusturulmaTarihi: tarih,
        guncellenmeTarihi: tarih,
      };

      localStorage.setItem(
        "sitemix-aktif-proje",
        JSON.stringify(projeVerisi),
      );

      router.push("/studio/tema");
    } catch (error) {
      console.error("Proje oluşturulamadı:", error);

      setKaydediliyor(false);
      setHata("Proje oluşturulurken bir sorun oluştu.");
    }
  }

  return (
    <main className="yeniProjeSayfasi">
      <header className="studioUstAlan">
        <Link href="/" className="studioLogo">
          <span>SITEMIX</span>
          <small>STUDIO</small>
        </Link>

        <div className="adimBilgisi">
          <span>01</span>
          <p>Temel bilgiler</p>
        </div>

        <Link href="/" className="geriBaglantisi">
          <ArrowLeft size={17} />
          Ana ekrana dön
        </Link>
      </header>

      <section className="projeBasligi">
        <div>
          <span className="projeEtiketi">YENİ PROJE</span>

          <h1>
            İşletmeyi
            <br />
            tanımlayalım.
          </h1>
        </div>

        <p>
          Sektör seçildiğinde gerekli sayfalar ve içerik bölümleri
          otomatik olarak hazırlanacak.
        </p>
      </section>

      <section className="projeCalismaAlani">
        <div className="projeFormAlani">
          <div className="formBolumu">
            <div className="formBolumNumarasi">
              <span>01</span>
              <p>Firma bilgileri</p>
            </div>

            <div className="alanGrubu">
              <label htmlFor="firmaAdi">Firma adı</label>

              <div className="inputCercevesi">
                <Building2 size={20} />

                <input
                  id="firmaAdi"
                  type="text"
                  value={form.firmaAdi}
                  onChange={(event) =>
                    firmaAdiGuncelle(event.target.value)
                  }
                  placeholder="Firma adını yaz"
                />
              </div>
            </div>

            <div className="alanGrubu">
              <label htmlFor="sektor">Sektör</label>

              <select
                id="sektor"
                value={form.sektor}
                onChange={(event) =>
                  alanGuncelle("sektor", event.target.value)
                }
              >
                <option value="">Sektör seç</option>

                {sektorler.map((sektor) => (
                  <option key={sektor.id} value={sektor.id}>
                    {sektor.kategori} — {sektor.ad}
                  </option>
                ))}
              </select>
            </div>

            {form.sektor === "ozel" && (
              <div className="alanGrubu">
                <label htmlFor="ozelSektor">Sektör adı</label>

                <input
                  id="ozelSektor"
                  type="text"
                  value={form.ozelSektor}
                  onChange={(event) =>
                    alanGuncelle("ozelSektor", event.target.value)
                  }
                  placeholder="Sektörün adını yaz"
                />
              </div>
            )}

            <div className="alanGrubu">
              <label>Site yapısı</label>

              <div className="siteTipiSecenekleri">
                <button
                  type="button"
                  className={
                    form.siteTipi === "tek-sayfa"
                      ? "siteTipiSecenegi aktif"
                      : "siteTipiSecenegi"
                  }
                  onClick={() =>
                    alanGuncelle("siteTipi", "tek-sayfa")
                  }
                >
                  <span>Tek sayfalı</span>
                  <small>Tüm bölümler ana sayfada hazırlanır</small>

                  {form.siteTipi === "tek-sayfa" && (
                    <Check size={18} className="secimIsareti" />
                  )}
                </button>

                <button
                  type="button"
                  className={
                    form.siteTipi === "cok-sayfa"
                      ? "siteTipiSecenegi aktif"
                      : "siteTipiSecenegi"
                  }
                  onClick={() =>
                    alanGuncelle("siteTipi", "cok-sayfa")
                  }
                >
                  <span>Çok sayfalı</span>
                  <small>
                    Sektöre uygun sayfalar otomatik oluşturulur
                  </small>

                  {form.siteTipi === "cok-sayfa" && (
                    <Check size={18} className="secimIsareti" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="formBolumu">
            <div className="formBolumNumarasi">
              <span>02</span>
              <p>İletişim bilgileri</p>
            </div>

            <div className="ikiliAlan">
              <div className="alanGrubu">
                <label htmlFor="telefon">Telefon</label>

                <div className="inputCercevesi">
                  <Phone size={19} />

                  <input
                    id="telefon"
                    type="tel"
                    value={form.telefon}
                    onChange={(event) =>
                      alanGuncelle("telefon", event.target.value)
                    }
                    placeholder="Telefon numarası"
                  />
                </div>
              </div>

              <div className="alanGrubu">
                <label htmlFor="whatsapp">WhatsApp</label>

                <div className="inputCercevesi">
                  <MessageCircle size={19} />

                  <input
                    id="whatsapp"
                    type="tel"
                    value={form.whatsapp}
                    onChange={(event) =>
                      alanGuncelle("whatsapp", event.target.value)
                    }
                    placeholder="WhatsApp numarası"
                  />
                </div>
              </div>
            </div>

            <div className="ikiliAlan">
              <div className="alanGrubu">
                <label htmlFor="eposta">E-posta</label>

                <input
                  id="eposta"
                  type="email"
                  value={form.eposta}
                  onChange={(event) =>
                    alanGuncelle("eposta", event.target.value)
                  }
                  placeholder="E-posta adresi"
                />
              </div>

              <div className="alanGrubu">
                <label htmlFor="adres">
                  Adres veya hizmet bölgesi
                </label>

                <div className="inputCercevesi">
                  <MapPin size={19} />

                  <input
                    id="adres"
                    type="text"
                    value={form.adres}
                    onChange={(event) =>
                      alanGuncelle("adres", event.target.value)
                    }
                    placeholder="Şehir, ilçe veya adres"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="formBolumu">
            <div className="formBolumNumarasi">
              <span>03</span>
              <p>Proje adresi</p>
            </div>

            <div className="alanGrubu">
              <label htmlFor="slug">Proje kısa adı</label>

              <div className="slugAlani">
                <Globe2 size={19} />

                <span>sitemix-studio/</span>

                <input
                  id="slug"
                  type="text"
                  value={form.slug}
                  onChange={(event) =>
                    alanGuncelle(
                      "slug",
                      slugOlustur(event.target.value),
                    )
                  }
                  placeholder="firma-adi"
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="projeOzetAlani">
          <div className="ozetSabitleyici">
            <div className="ozetBasligi">
              <span>CANLI ÖZET</span>
              <p>Otomatik hazırlanacak</p>
            </div>

            <div className="firmaOnizleme">
              <small>FİRMA</small>

              <h2>
                {form.firmaAdi.trim()
                  ? form.firmaAdi
                  : "Firma adı girilmedi"}
              </h2>

              {gorunenSektor && <p>{gorunenSektor}</p>}
            </div>

            <div className="ozetSatirlari">
              <div className="ozetSatiri">
                <span>Site yapısı</span>
                <strong>
                  {form.siteTipi === "tek-sayfa"
                    ? "Tek sayfalı"
                    : "Çok sayfalı"}
                </strong>
              </div>

              <div className="ozetSatiri">
                <span>Sayfalar</span>
                <strong>
                  {form.siteTipi === "tek-sayfa"
                    ? "Ana sayfa"
                    : "Sektöre göre otomatik"}
                </strong>
              </div>

              <div className="ozetSatiri">
                <span>İçerikler</span>
                <strong>Otomatik hazırlanacak</strong>
              </div>

              <div className="ozetSatiri">
                <span>Proje adresi</span>
                <strong>{form.slug || "Henüz oluşmadı"}</strong>
              </div>
            </div>

            {hata && <p className="formHatasi">{hata}</p>}

            <button
              type="button"
              className="devamButonu"
              onClick={devamEt}
              disabled={kaydediliyor}
            >
              {kaydediliyor
                ? "Site hazırlanıyor..."
                : "Siteyi otomatik hazırla"}

              <ArrowRight size={19} />
            </button>

            <p className="kayitNotu">
              Sayfaları ve bütün içerikleri daha sonra
              değiştirebilirsin.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}