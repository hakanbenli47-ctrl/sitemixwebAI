"use client";
/* eslint-disable @next/next/no-img-element -- local editor preview renders data URLs before publishing */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, CirclePlus, Eye, FileImage, ImageOff, LayoutDashboard, Palette, RotateCcw, Save, Settings2, Trash2, Upload, X } from "lucide-react";
import { sektorTanimiGetir, varsayilanIcerikOlustur } from "@/data/yeniSektorler";
import type { EkOzellikKaydi, HizmetKaydi, MedyaKaydi, ProjeVerisi, SektorSiteIcerigi, SektorTemaKimligi } from "@/types/proje";
import styles from "./yonetim.module.css";

const AKTIF_PROJE = "sitemix-aktif-proje";
const PROJELER = "sitemix-projeler";
type Sekme = "isletme" | "metin" | "hizmet" | "medya" | "tema";

function kimlikOlustur() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function gorseliKucult(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const okuyucu = new FileReader();
    okuyucu.onerror = () => reject(new Error("Dosya okunamadı."));
    okuyucu.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Görsel açılamadı."));
      img.onload = () => {
        const enFazla = 1600;
        const oran = Math.min(1, enFazla / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * oran);
        canvas.height = Math.round(img.height * oran);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Görsel işlenemedi."));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/webp", .8));
      };
      img.src = String(okuyucu.result);
    };
    okuyucu.readAsDataURL(file);
  });
}

export default function DuzenlemeSayfasi() {
  const [proje, setProje] = useState<ProjeVerisi | null>(null);
  const [sekme, setSekme] = useState<Sekme>("isletme");
  const [durum, setDurum] = useState("");
  const [yeniHizmet, setYeniHizmet] = useState("");
  const [yeniOzellik, setYeniOzellik] = useState("");

  useEffect(() => {
    const zamanlayici = window.setTimeout(() => {
      try {
        const kayit = window.localStorage.getItem(AKTIF_PROJE);
        if (kayit) setProje(JSON.parse(kayit) as ProjeVerisi);
      } catch {
        setDurum("Proje kaydı okunamadı.");
      }
    }, 0);
    return () => window.clearTimeout(zamanlayici);
  }, []);

  const tanim = useMemo(() => proje ? sektorTanimiGetir(proje.sektor) : null, [proje]);
  const icerik = useMemo(() => proje ? (proje.siteIcerigi ?? varsayilanIcerikOlustur(proje.sektor)) : null, [proje]);

  function guncelle(degisiklik: Partial<ProjeVerisi>) {
    setProje((mevcut) => mevcut ? { ...mevcut, ...degisiklik, guncellenmeTarihi: new Date().toISOString() } : mevcut);
    setDurum("Kaydedilmemiş değişiklikler var.");
  }

  function icerikGuncelle(degisiklik: Partial<SektorSiteIcerigi>) {
    if (!proje || !icerik) return;
    guncelle({ siteIcerigi: { ...icerik, ...degisiklik } });
  }

  function hizmetleriGuncelle(hizmetler: HizmetKaydi[]) {
    guncelle({ hizmetler, siteIcerigi: icerik ? { ...icerik, hizmetler } : undefined });
  }

  function ozellikleriGuncelle(ozellikler: EkOzellikKaydi[]) {
    guncelle({ ekOzellikler: ozellikler, siteIcerigi: icerik ? { ...icerik, ozellikler } : undefined });
  }

  function kaydet() {
    if (!proje) return;
    try {
      localStorage.setItem(AKTIF_PROJE, JSON.stringify(proje));
      const liste = JSON.parse(localStorage.getItem(PROJELER) || "[]") as ProjeVerisi[];
      const guncelListe = liste.some((item) => item.id === proje.id) ? liste.map((item) => item.id === proje.id ? proje : item) : [proje, ...liste];
      localStorage.setItem(PROJELER, JSON.stringify(guncelListe));
      setDurum("Tüm değişiklikler kaydedildi.");
    } catch {
      setDurum("Kayıt alanı doldu. Büyük görselleri azaltın veya gereksiz görselleri kaldırın.");
    }
  }

  async function medyaYukle(medya: MedyaKaydi, file?: File) {
    if (!proje || !file) return;
    if (!file.type.startsWith("image/")) { setDurum("Yalnızca görsel dosyası yükleyebilirsiniz."); return; }
    if (file.size > 15 * 1024 * 1024) { setDurum("Görsel 15 MB'dan küçük olmalıdır."); return; }
    setDurum("Görsel optimize ediliyor...");
    try {
      const url = await gorseliKucult(file);
      const medyalar = (proje.medyalar ?? []).map((item) => item.id === medya.id ? { ...item, url, dosyaAdi: file.name, alternatifMetin: item.alternatifMetin || `${proje.firmaAdi} ${item.baslik}`, acik: true } : item);
      guncelle({ medyalar });
      setDurum("Görsel hazırlandı. Kalıcı olması için değişiklikleri kaydedin.");
    } catch (error) { setDurum(error instanceof Error ? error.message : "Görsel yüklenemedi."); }
  }

  if (!proje || !tanim || !icerik) {
    return <main className={styles.bos}><span>SITEMIX STUDIO</span><h1>{durum || "Düzenlenecek proje bulunamadı."}</h1><Link href="/studio/yeni">Yeni proje oluştur</Link></main>;
  }

  const hizmetler = proje.hizmetler ?? icerik.hizmetler;
  const ozellikler = proje.ekOzellikler ?? icerik.ozellikler;
  const sekmeler: Array<[Sekme, string, React.ReactNode]> = [["isletme","İşletme",<Settings2 key="i" />],["metin","Ana metinler",<LayoutDashboard key="m" />],["hizmet","Hizmet ve özellik",<CirclePlus key="h" />],["medya","Görseller",<FileImage key="g" />],["tema","Tema",<Palette key="t" />]];

  return (
    <main className={styles.sayfa}>
      <header className={styles.ustBar}><Link href="/studio/projeler"><ArrowLeft /> Projeler</Link><div><span>{tanim.iskeletAdi}</span><strong>{proje.firmaAdi}</strong></div><div className={styles.ustAksiyonlar}><Link href="/studio/onizleme"><Eye /> Önizle</Link><button type="button" onClick={kaydet}><Save /> Kaydet</button></div></header>
      <section className={styles.baslik}><div><span>{tanim.ad.toUpperCase()} / İŞLETME STÜDYOSU</span><h1>Yalnızca değişeni yönetin.</h1></div><p>İskelet ve sektör içeriği hazır. Bilgiler, hizmetler, ek özellikler, üç tema ve isteğe bağlı görseller bu ekrandan güncellenir.</p></section>
      <nav className={styles.sekmeler}>{sekmeler.map(([id, ad, ikon]) => <button key={id} type="button" className={sekme === id ? styles.aktif : ""} onClick={() => setSekme(id)}>{ikon}<span>{ad}</span></button>)}</nav>

      {sekme === "isletme" && <section className={styles.panel}><div className={styles.panelBasligi}><span>01</span><div><h2>İşletme bilgileri</h2><p>En sık değişen kimlik, iletişim ve sektör alanları.</p></div></div><div className={styles.formGrid}><label>İşletme adı *<input value={proje.firmaAdi} onChange={(e) => guncelle({ firmaAdi: e.target.value })} /></label><label>Telefon *<input value={proje.telefon} onChange={(e) => guncelle({ telefon: e.target.value })} /></label><label>WhatsApp<input value={proje.whatsapp} onChange={(e) => guncelle({ whatsapp: e.target.value })} /></label><label>E-posta<input value={proje.eposta} onChange={(e) => guncelle({ eposta: e.target.value })} /></label><label>Şehir *<input value={proje.sehir} onChange={(e) => guncelle({ sehir: e.target.value })} /></label><label>İlçe<input value={proje.ilce} onChange={(e) => guncelle({ ilce: e.target.value })} /></label><label className={styles.tamAlan}>Adres<textarea rows={3} value={proje.adres} onChange={(e) => guncelle({ adres: e.target.value })} /></label><label className={styles.tamAlan}>Hizmet bölgesi<input value={proje.hizmetBolgesi || ""} onChange={(e) => guncelle({ hizmetBolgesi: e.target.value })} /></label>{(proje.isletmeAlanlari ?? []).map((alan, index) => <label key={alan.anahtar}>{alan.etiket}{alan.zorunlu && " *"}<input value={alan.deger} onChange={(e) => { const liste = [...(proje.isletmeAlanlari ?? [])]; liste[index] = { ...alan, deger: e.target.value }; guncelle({ isletmeAlanlari: liste }); }} /></label>)}</div></section>}

      {sekme === "metin" && <section className={styles.panel}><div className={styles.panelBasligi}><span>02</span><div><h2>Hazır içerik şeması</h2><p>Metinler önceden doludur. İsterseniz işletmeye göre ince ayar yapabilirsiniz.</p></div></div><div className={styles.metinGrid}><label>Üst rozet<input value={icerik.rozet} onChange={(e) => icerikGuncelle({ rozet: e.target.value })} /></label><label>Slogan<input value={icerik.slogan} onChange={(e) => icerikGuncelle({ slogan: e.target.value })} /></label><label className={styles.tamAlan}>Ana başlık<textarea rows={3} value={icerik.heroBaslik} onChange={(e) => icerikGuncelle({ heroBaslik: e.target.value })} /></label><label className={styles.tamAlan}>Ana açıklama<textarea rows={4} value={icerik.heroAciklama} onChange={(e) => icerikGuncelle({ heroAciklama: e.target.value })} /></label><label>Hakkımızda başlığı<textarea rows={3} value={icerik.hakkimizdaBaslik} onChange={(e) => icerikGuncelle({ hakkimizdaBaslik: e.target.value })} /></label><label>Güven başlığı<textarea rows={3} value={icerik.guvenBasligi} onChange={(e) => icerikGuncelle({ guvenBasligi: e.target.value })} /></label><label>Hakkımızda metni<textarea rows={6} value={icerik.hakkimizdaMetni} onChange={(e) => icerikGuncelle({ hakkimizdaMetni: e.target.value })} /></label><label>Güven metni<textarea rows={6} value={icerik.guvenMetni} onChange={(e) => icerikGuncelle({ guvenMetni: e.target.value })} /></label><label>Çağrı başlığı<input value={icerik.ctaBaslik} onChange={(e) => icerikGuncelle({ ctaBaslik: e.target.value })} /></label><label>Çağrı açıklaması<input value={icerik.ctaMetni} onChange={(e) => icerikGuncelle({ ctaMetni: e.target.value })} /></label></div></section>}

      {sekme === "hizmet" && <section className={styles.ciftPanel}><div className={styles.panel}><div className={styles.panelBasligi}><span>03</span><div><h2>Hizmetler</h2><p>Başlık ve açıklamayı düzenleyin; göz simgesiyle gösterimi açıp kapatın.</p></div></div><div className={styles.kayitListesi}>{hizmetler.map((hizmet, index) => <article key={hizmet.id} className={!hizmet.aktif ? styles.kapaliKayit : ""}><button type="button" className={styles.durumButonu} onClick={() => hizmetleriGuncelle(hizmetler.map((item) => item.id === hizmet.id ? { ...item, aktif: !item.aktif } : item))}>{hizmet.aktif ? <Check /> : <X />}</button><div><input value={hizmet.baslik} onChange={(e) => hizmetleriGuncelle(hizmetler.map((item, sira) => sira === index ? { ...item, baslik: e.target.value } : item))} /><textarea rows={2} value={hizmet.aciklama} onChange={(e) => hizmetleriGuncelle(hizmetler.map((item, sira) => sira === index ? { ...item, aciklama: e.target.value } : item))} /></div>{hizmet.ozelMi && <button type="button" className={styles.silButonu} onClick={() => hizmetleriGuncelle(hizmetler.filter((item) => item.id !== hizmet.id))}><Trash2 /></button>}</article>)}</div><div className={styles.ekle}><input value={yeniHizmet} onChange={(e) => setYeniHizmet(e.target.value)} placeholder="Yeni hizmet adı" /><button type="button" onClick={() => { const ad = yeniHizmet.trim(); if (!ad) return; hizmetleriGuncelle([...hizmetler, { id: kimlikOlustur(), baslik: ad, aciklama: "İşletmenize özel hizmet açıklaması.", aktif: true, ozelMi: true }]); setYeniHizmet(""); }}><CirclePlus /> Ekle</button></div></div><div className={styles.panel}><div className={styles.panelBasligi}><span>04</span><div><h2>Ek özellikler</h2><p>İşletmenin güven ve dönüşüm alanlarına eklenir.</p></div></div><div className={styles.kayitListesi}>{ozellikler.map((ozellik, index) => <article key={ozellik.id} className={!ozellik.aktif ? styles.kapaliKayit : ""}><button type="button" className={styles.durumButonu} onClick={() => ozellikleriGuncelle(ozellikler.map((item) => item.id === ozellik.id ? { ...item, aktif: !item.aktif } : item))}>{ozellik.aktif ? <Check /> : <X />}</button><div><input value={ozellik.baslik} onChange={(e) => ozellikleriGuncelle(ozellikler.map((item, sira) => sira === index ? { ...item, baslik: e.target.value } : item))} /><textarea rows={2} value={ozellik.aciklama} onChange={(e) => ozellikleriGuncelle(ozellikler.map((item, sira) => sira === index ? { ...item, aciklama: e.target.value } : item))} /></div>{ozellik.ozelMi && <button type="button" className={styles.silButonu} onClick={() => ozellikleriGuncelle(ozellikler.filter((item) => item.id !== ozellik.id))}><Trash2 /></button>}</article>)}</div><div className={styles.ekle}><input value={yeniOzellik} onChange={(e) => setYeniOzellik(e.target.value)} placeholder="Yeni özellik" /><button type="button" onClick={() => { const ad = yeniOzellik.trim(); if (!ad) return; ozellikleriGuncelle([...ozellikler, { id: kimlikOlustur(), baslik: ad, aciklama: "İşletmenize ait ek özellik.", aktif: true, ozelMi: true }]); setYeniOzellik(""); }}><CirclePlus /> Ekle</button></div></div></section>}

      {sekme === "medya" && <section className={styles.panel}><div className={styles.panelBasligi}><span>05</span><div><h2>İsteğe bağlı görseller</h2><p>Alanlar kapalı gelir. Görsel yüklenmedikçe sitede boş kutu gösterilmez.</p></div></div><div className={styles.medyaGrid}>{(proje.medyalar ?? []).map((medya) => <article key={medya.id} className={medya.acik ? styles.acikMedya : ""}><div className={styles.medyaOnizleme}>{medya.url ? <img src={medya.url} alt={medya.alternatifMetin || medya.baslik} /> : <ImageOff />}</div><div className={styles.medyaBilgi}><span>{medya.slot.toUpperCase()}</span><h3>{medya.baslik}</h3><p>{medya.dosyaAdi || "Henüz dosya yüklenmedi"}</p><label>Alternatif metin<input value={medya.alternatifMetin || ""} onChange={(e) => guncelle({ medyalar: (proje.medyalar ?? []).map((item) => item.id === medya.id ? { ...item, alternatifMetin: e.target.value } : item) })} placeholder={`${proje.firmaAdi} ${medya.baslik}`} /></label></div><div className={styles.medyaAksiyon}><button type="button" onClick={() => guncelle({ medyalar: (proje.medyalar ?? []).map((item) => item.id === medya.id ? { ...item, acik: !item.acik } : item) })}>{medya.acik ? <><Check /> Alan açık</> : <><X /> Alan kapalı</>}</button><label><Upload /> {medya.url ? "Değiştir" : "Görsel yükle"}<input hidden type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(e) => { void medyaYukle(medya, e.target.files?.[0]); e.currentTarget.value = ""; }} /></label>{medya.url && <button type="button" onClick={() => guncelle({ medyalar: (proje.medyalar ?? []).map((item) => item.id === medya.id ? { ...item, url: "", dosyaAdi: undefined } : item) })}><Trash2 /> Görseli kaldır</button>}<button type="button" onClick={() => guncelle({ medyalar: (proje.medyalar ?? []).map((item) => item.id === medya.id ? { ...item, acik: false, url: "", dosyaAdi: undefined, alternatifMetin: "" } : item) })}><RotateCcw /> Sıfırla</button></div></article>)}</div><div className={styles.medyaAciklama}><FileImage /><p>Yüklenen görseller tarayıcıda projeyle birlikte saklanır, yayın sırasında küçültülmüş dosya olarak GitHub deposuna eklenir ve Vercel paketinde kalıcı olur. Yeniden yükleme, kaldırma ve sıfırlama seçenekleri her zaman kullanılabilir.</p></div></section>}

      {sekme === "tema" && <section className={styles.panel}><div className={styles.panelBasligi}><span>06</span><div><h2>Üç sektör teması</h2><p>İskelet değişmez; renk, kontrast ve atmosfer işletmeye göre seçilir.</p></div></div><div className={styles.temaGrid}>{tanim.temalar.map((tema) => <button key={tema.id} type="button" className={proje.sektorTemasi === tema.id ? styles.seciliTema : ""} onClick={() => guncelle({ sektorTemasi: tema.id as SektorTemaKimligi, tema: tema.id })}><div>{tema.renkler.map((renk) => <i key={renk} style={{ background: renk }} />)}</div><span>{tema.id.replace("tema-", "0")}</span><h3>{tema.ad}</h3><p>{tema.aciklama}</p>{proje.sektorTemasi === tema.id && <strong><Check /> AKTİF TEMA</strong>}</button>)}</div></section>}

      <footer className={styles.kayitCubugu}><div><span>{durum || "Proje açık"}</span><strong>{proje.sayfalar.length} sayfa · {hizmetler.filter((h) => h.aktif).length} aktif hizmet · {(proje.medyalar ?? []).filter((m) => m.acik && m.url).length} görsel</strong></div><div><Link href="/studio/onizleme"><Eye /> Önizle</Link><button type="button" onClick={kaydet}><Save /> Değişiklikleri kaydet</button></div></footer>
    </main>
  );
}
