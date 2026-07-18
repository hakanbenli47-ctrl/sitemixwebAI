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
  sektorHizmetleriniGetir,
  sektorSayfalariOlustur,
} from "@/data/sektorSablonlari";
import { sektorVarsayilanTemasiniGetir } from "@/data/sektorSunumProfilleri";
import {
  hazirIcerikPaketiniUygula,
  icerikPaketleri,
  sektorVarsayilanIcerikPaketiniGetir,
  sektorVarsayilanStiliniGetir,
} from "@/data/studyoPaketleri";
import {
  epostaGecerliMi,
  iletisimKanaliVarMi,
  turkiyeTelefonunuDuzenle,
  whatsappNumarasiniDuzenle,
} from "@/lib/iletisim";
import type { ProjeVerisi } from "@/types/proje";
import type { IcerikPaketiKimligi } from "@/types/proje";

interface ProjeFormu {
  firmaAdi: string;
  sektor: string;
  icerikPaketi: IcerikPaketiKimligi;
  secilenHizmetler: string[];
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
  icerikPaketi: "guven",
  secilenHizmetler: [],
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

  const gorunenSektor = secilenSektor?.ad ?? "";

  const sektorHizmetleri = useMemo(() => {
    return form.sektor ? sektorHizmetleriniGetir(form.sektor) : [];
  }, [form.sektor]);

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

  function sektorGuncelle(sektor: string) {
    setForm((eskiForm) => ({
      ...eskiForm,
      sektor,
      icerikPaketi: sektorVarsayilanIcerikPaketiniGetir(sektor),
      secilenHizmetler: sektor ? sektorHizmetleriniGetir(sektor) : [],
    }));

    setHata("");
  }

  function hizmetSeciminiDegistir(hizmet: string) {
    setForm((eskiForm) => {
      const seciliMi = eskiForm.secilenHizmetler.includes(hizmet);
      const secilenHizmetler = seciliMi
        ? eskiForm.secilenHizmetler.filter((aday) => aday !== hizmet)
        : [...eskiForm.secilenHizmetler, hizmet];

      return { ...eskiForm, secilenHizmetler };
    });

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

    if (form.secilenHizmetler.length === 0) {
      setHata("Site içeriği için en az bir hizmet seçmelisin.");
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

    const sektorAdi = secilenSektor?.ad ?? "";

    try {
      const sayfalar = sektorSayfalariOlustur({
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
        hizmetler: form.secilenHizmetler,
      });

      const tarih = new Date().toISOString();

      const temelProje: ProjeVerisi = {
        id: idOlustur(),
        firmaAdi: form.firmaAdi.trim(),
        sektor: form.sektor,
        sektorAdi,
        siteTipi: "cok-sayfa",
        telefon: form.telefon.trim(),
        whatsapp: form.whatsapp.trim(),
        eposta: form.eposta.trim(),
        adres: form.adres.trim(),
        sehir: form.sehir.trim(),
        ilce: form.ilce.trim(),
        hizmetBolgesi: form.hizmetBolgesi.trim(),
        slug: form.slug.trim(),
        tema: sektorVarsayilanTemasiniGetir(form.sektor),
        icerikPaketi: form.icerikPaketi,
        secilenHizmetler: form.secilenHizmetler,
        stilAyarlari: sektorVarsayilanStiliniGetir(form.sektor),
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

      const icerikliProje = hazirIcerikPaketiniUygula(
        projeyeOzelIcerigiUygula(temelProje),
        form.icerikPaketi,
      );
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
            veri.mesaj || "Hazır içerik ve tasarım sahnesi hazırlanamadı.",
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
        console.error("Hazır içerik paketi tamamlanamadı:", otomatikHata);

        localStorage.setItem(
          "sitemix-son-uyarilar",
          JSON.stringify([
            otomatikHata instanceof Error
              ? otomatikHata.message
              : "Hazır içerik paketi tamamlanamadı; sektör şablonu kullanıldı.",
          ]),
        );
      }

      localStorage.setItem(
        "sitemix-aktif-proje",
        JSON.stringify(kaydedilecekProje),
      );

      router.push("/studio/duzenle");
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
          Sektörü ve hizmetleri seç; hazır metin kütüphanesi çok sayfalı siteyi
          doldursun. Tasarımı sonraki ekranda kod yazmadan özgürce düzenle.
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
                  sektorGuncelle(event.target.value)
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

            {form.sektor && (
              <div className="alanGrubu">
                <label>Sunulan hizmetler</label>

                <div className="hizmetSecenekleri">
                  {sektorHizmetleri.map((hizmet) => {
                    const seciliMi = form.secilenHizmetler.includes(hizmet);

                    return (
                      <button
                        type="button"
                        key={hizmet}
                        className={
                          seciliMi
                            ? "hizmetSecenegi aktif"
                            : "hizmetSecenegi"
                        }
                        onClick={() => hizmetSeciminiDegistir(hizmet)}
                        aria-pressed={seciliMi}
                      >
                        <Check size={15} />
                        {hizmet}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="alanGrubu">
              <label>Site yapısı</label>

              <div className="cokSayfaliBilgi">
                <div>
                  <Globe2 size={22} />
                  <span>Çok sayfalı site</span>
                </div>
                <p>
                  Ana sayfa, hizmetler, hakkımızda, talep/randevu ve iletişim
                  sayfaları sektör paketinden hazır gelir.
                </p>
              </div>
            </div>

            <div className="alanGrubu">
              <label>Hazır içerik yaklaşımı</label>

              <div className="icerikPaketiSecenekleri">
                {icerikPaketleri.map((paket) => {
                  const aktifMi = form.icerikPaketi === paket.id;

                  return (
                    <button
                      type="button"
                      key={paket.id}
                      className={
                        aktifMi
                          ? "icerikPaketiSecenegi aktif"
                          : "icerikPaketiSecenegi"
                      }
                      onClick={() =>
                        alanGuncelle("icerikPaketi", paket.id)
                      }
                      aria-pressed={aktifMi}
                    >
                      <small>{paket.etiket}</small>
                      <span>{paket.ad}</span>
                      <p>{paket.aciklama}</p>
                      {aktifMi && <Check size={17} />}
                    </button>
                  );
                })}
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
              <p>Hazır sektör paketinden</p>
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
                <strong>Çok sayfalı</strong>
              </div>

              <div className="ozetSatiri">
                <span>Seçili hizmet</span>
                <strong>{form.secilenHizmetler.length}</strong>
              </div>

              <div className="ozetSatiri">
                <span>İçerik yaklaşımı</span>
                <strong>
                  {icerikPaketleri.find(
                    (paket) => paket.id === form.icerikPaketi,
                  )?.ad ?? "Güven ve süreç"}
                </strong>
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
                  <span>Çok sayfalı siteyi hazırla</span>
                  <ArrowRight size={19} />
                </>
              )}
            </button>

            <p className="kayitNotu">
              Oluşturulan metinleri, bölüm sırasını ve iletişim bilgilerini daha
              sonra değiştirebilirsin.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
