"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Globe2,
  LoaderCircle,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useMemo, useState } from "react";
import { projeyeOzelIcerigiUygula } from "@/data/icerikSablonlari";
import { sektorler } from "@/data/sektorler";
import {
  GUNCEL_SABLON_SURUMU,
  sektorSayfalariOlustur,
} from "@/data/sektorSablonlari";
import { sektorVarsayilanTemasiniGetir } from "@/data/sektorSunumProfilleri";
import {
  epostaGecerliMi,
  iletisimKanaliVarMi,
  turkiyeTelefonunuDuzenle,
  whatsappNumarasiniDuzenle,
} from "@/lib/iletisim";
import type { ProjeVerisi } from "@/types/proje";

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
  sehir: string;
  ilce: string;
  hizmetBolgesi: string;
  slug: string;
}

interface OtomatikOlusturmaCevabi {
  basarili: boolean;
  proje?: ProjeVerisi;
  mesaj?: string;
  uyarilar?: string[];
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
  sehir: "",
  ilce: "",
  hizmetBolgesi: "",
  slug: "",
};

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

  const gorunenKonum = [form.ilce.trim(), form.sehir.trim()]
    .filter(Boolean)
    .join(", ");

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

  async function devamEt() {
    if (kaydediliyor) {
      return;
    }

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

    if (!form.sehir.trim()) {
      setHata("İçeriklerin yerelleşmesi için şehir bilgisini yazmalısın.");
      return;
    }

    if (!form.slug.trim()) {
      setHata("Proje adresi boş bırakılamaz.");
      return;
    }

    if (form.telefon.trim() && !turkiyeTelefonunuDuzenle(form.telefon)) {
      setHata("Telefonu 05xx xxx xx xx veya alan kodlu sabit numara biçiminde yazmalısın.");
      return;
    }

    if (form.whatsapp.trim() && !whatsappNumarasiniDuzenle(form.whatsapp)) {
      setHata("WhatsApp numarası geçerli bir Türkiye cep telefonu olmalı.");
      return;
    }

    if (form.eposta.trim() && !epostaGecerliMi(form.eposta)) {
      setHata("Geçerli bir e-posta adresi yazmalısın.");
      return;
    }

    if (!iletisimKanaliVarMi(form)) {
      setHata("Yayınlanan formun çalışması için telefon, WhatsApp veya e-posta bilgilerinden en az birini eklemelisin.");
      return;
    }

    setKaydediliyor(true);
    setHata("");

    const sektorAdi =
      form.sektor === "ozel"
        ? form.ozelSektor.trim()
        : secilenSektor?.ad ?? "";

    try {
      let sayfalar = sektorSayfalariOlustur({
        firmaAdi: form.firmaAdi.trim(),
        sektor: form.sektor,
        sektorAdi,
        telefon: form.telefon.trim(),
        whatsapp: form.whatsapp.trim(),
        eposta: form.eposta.trim(),
        adres: form.adres.trim(),
        sehir: form.sehir.trim(),
        ilce: form.ilce.trim(),
        hizmetBolgesi: form.hizmetBolgesi.trim(),
      });

      if (form.siteTipi === "tek-sayfa") {
        sayfalar = sayfalar.length > 0 ? [sayfalar[0]] : [];
      }

      const tarih = new Date().toISOString();

      const temelProje: ProjeVerisi = {
        id: idOlustur(),
        firmaAdi: form.firmaAdi.trim(),
        sektor: form.sektor,
        sektorAdi,
        siteTipi: form.siteTipi,
        telefon: form.telefon.trim(),
        whatsapp: form.whatsapp.trim(),
        eposta: form.eposta.trim(),
        adres: form.adres.trim(),
        sehir: form.sehir.trim(),
        ilce: form.ilce.trim(),
        hizmetBolgesi: form.hizmetBolgesi.trim(),
        slug: form.slug.trim(),
        tema: sektorVarsayilanTemasiniGetir(form.sektor),
        sayfalar,
        sablonSurumu: GUNCEL_SABLON_SURUMU,
        seoBaslik: `${form.firmaAdi.trim()} | ${sektorAdi}`,
        seoAciklama: `${form.firmaAdi.trim()}, ${gorunenKonum || form.sehir.trim()} bölgesinde ${String(sektorAdi ?? "").toLocaleLowerCase("tr-TR")} hizmetleri sunar.`,
        seoKelimeler: [
          form.firmaAdi.trim(),
          sektorAdi,
          form.sehir.trim(),
          form.ilce.trim(),
        ].filter(Boolean),
        olusturulmaTarihi: tarih,
        guncellenmeTarihi: tarih,
      };

      const icerikliProje = projeyeOzelIcerigiUygula(temelProje);
      let kaydedilecekProje = icerikliProje;

      try {
        const cevap = await fetch("/api/studio/otomatik-olustur", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            proje: icerikliProje,
            yalnizcaEksikleriDoldur: false,
          }),
        });

        const veri = (await cevap.json()) as OtomatikOlusturmaCevabi;

        if (!cevap.ok || !veri.basarili || !veri.proje) {
          throw new Error(
            veri.mesaj || "Otomatik içerik ve görseller hazırlanamadı.",
          );
        }

        kaydedilecekProje = veri.proje;

        if (veri.uyarilar?.length) {
          localStorage.setItem(
            "sitemix-son-uyarilar",
            JSON.stringify(veri.uyarilar),
          );
        } else {
          localStorage.removeItem("sitemix-son-uyarilar");
        }
      } catch (otomatikHata) {
        console.error("Otomatik hazırlama tamamlanamadı:", otomatikHata);

        localStorage.setItem(
          "sitemix-son-uyarilar",
          JSON.stringify([
            otomatikHata instanceof Error
              ? otomatikHata.message
              : "Otomatik hazırlama tamamlanamadı; hazır sektör şablonu kullanıldı.",
          ]),
        );
      }

      localStorage.setItem(
        "sitemix-aktif-proje",
        JSON.stringify(kaydedilecekProje),
      );

      router.push("/studio/tema");
    } catch (error) {
      console.error("Proje oluşturulamadı:", error);
      setKaydediliyor(false);
      setHata(
        error instanceof Error
          ? error.message
          : "Proje oluşturulurken bir sorun oluştu.",
      );
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
          Sektör, şehir ve ilçe bilgilerine göre sayfalar, içerikler ve
          eksik görseller otomatik hazırlanacak.
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
                  <small>Sektöre uygun sayfalar otomatik oluşturulur</small>

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
              <p>Konum ve hizmet bölgesi</p>
            </div>

            <div className="ikiliAlan">
              <div className="alanGrubu">
                <label htmlFor="sehir">Şehir</label>

                <div className="inputCercevesi">
                  <MapPin size={19} />

                  <input
                    id="sehir"
                    type="text"
                    value={form.sehir}
                    onChange={(event) =>
                      alanGuncelle("sehir", event.target.value)
                    }
                    placeholder="Örn. Antalya"
                  />
                </div>
              </div>

              <div className="alanGrubu">
                <label htmlFor="ilce">İlçe</label>

                <div className="inputCercevesi">
                  <MapPin size={19} />

                  <input
                    id="ilce"
                    type="text"
                    value={form.ilce}
                    onChange={(event) =>
                      alanGuncelle("ilce", event.target.value)
                    }
                    placeholder="Örn. Kepez"
                  />
                </div>
              </div>
            </div>

            <div className="alanGrubu">
              <label htmlFor="hizmetBolgesi">
                Hizmet verilen bölgeler
              </label>

              <input
                id="hizmetBolgesi"
                type="text"
                value={form.hizmetBolgesi}
                onChange={(event) =>
                  alanGuncelle("hizmetBolgesi", event.target.value)
                }
                placeholder="Örn. Kepez, Muratpaşa, Konyaaltı ve çevresi"
              />
            </div>

            <div className="alanGrubu">
              <label htmlFor="adres">Açık adres veya konum açıklaması</label>

              <div className="inputCercevesi">
                <MapPin size={19} />

                <input
                  id="adres"
                  type="text"
                  value={form.adres}
                  onChange={(event) =>
                    alanGuncelle("adres", event.target.value)
                  }
                  placeholder="İsteğe bağlı açık adres"
                />
              </div>
            </div>
          </div>

          <div className="formBolumu">
            <div className="formBolumNumarasi">
              <span>03</span>
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
          </div>

          <div className="formBolumu">
            <div className="formBolumNumarasi">
              <span>04</span>
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
              {gorunenKonum && <p>{gorunenKonum}</p>}
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
                <span>İçerikler</span>
                <strong>Sektör ve konuma özel</strong>
              </div>

              <div className="ozetSatiri">
                <span>Görseller</span>
                <strong>Eksikler internetten tamamlanır</strong>
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
              {kaydediliyor ? (
                <>
                  <span>Site hazırlanıyor...</span>
                  <LoaderCircle size={19} className="donenIkon" />
                </>
              ) : (
                <>
                  <span>Siteyi otomatik hazırla</span>
                  <ArrowRight size={19} />
                </>
              )}
            </button>

            <p className="kayitNotu">
              Oluşturulan bütün metinleri ve görselleri daha sonra
              değiştirebilirsin.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
