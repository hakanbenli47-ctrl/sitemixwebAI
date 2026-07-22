"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronRight, CirclePlus, FileText, Layers3, Palette, Rows3, Sparkles } from "lucide-react";
import {
  YENI_SEKTORLER,
  GORSEL_PAKET_SURUMU,
  SEKTOR_ICERIK_SURUMU,
  isletmeAlanlariOlustur,
  medyaAlanlariOlustur,
  sektorTanimiGetir,
  siteSayfalariOlustur,
  varsayilanIcerikOlustur,
} from "@/data/yeniSektorler";
import type { EkOzellikKaydi, HizmetKaydi, IsletmeAlaniDegeri, ProjeVerisi, SektorTemaKimligi, YeniSektorKimligi } from "@/types/proje";
import styles from "./yeni.module.css";

const AKTIF_PROJE = "sitemix-aktif-proje";
const PROJELER = "sitemix-projeler";

function slugOlustur(metin: string) {
  return metin.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

function kimlikOlustur() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function benzersizProjeSlug(istenenSlug: string) {
  const temel = slugOlustur(istenenSlug) || `site-${Date.now()}`;
  try {
    const projeler = JSON.parse(localStorage.getItem(PROJELER) || "[]") as ProjeVerisi[];
    const kullanilan = new Set(projeler.map((proje) => proje.githubRepoAdi || proje.slug).filter(Boolean));
    let aday = temel;
    let sira = 2;
    while (kullanilan.has(aday)) {
      aday = `${temel}-${sira}`;
      sira += 1;
    }
    return aday;
  } catch {
    return temel;
  }
}

export default function YeniProjeSayfasi() {
  const [adim, setAdim] = useState(1);
  const [sektor, setSektor] = useState<YeniSektorKimligi>("kuafor");
  const [tema, setTema] = useState<SektorTemaKimligi>("tema-1");
  const [siteTipi, setSiteTipi] = useState<"tek-sayfa" | "cok-sayfa">("tek-sayfa");
  const [firmaAdi, setFirmaAdi] = useState("");
  const [telefon, setTelefon] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [eposta, setEposta] = useState("");
  const [sehir, setSehir] = useState("");
  const [ilce, setIlce] = useState("");
  const [adres, setAdres] = useState("");
  const [hizmetBolgesi, setHizmetBolgesi] = useState("");
  const [slug, setSlug] = useState("");
  const [alanlar, setAlanlar] = useState<IsletmeAlaniDegeri[]>(() => isletmeAlanlariOlustur("kuafor"));
  const [hizmetler, setHizmetler] = useState<HizmetKaydi[]>(() => varsayilanIcerikOlustur("kuafor").hizmetler);
  const [ozellikler, setOzellikler] = useState<EkOzellikKaydi[]>(() => varsayilanIcerikOlustur("kuafor").ozellikler);
  const [yeniHizmet, setYeniHizmet] = useState("");
  const [yeniOzellik, setYeniOzellik] = useState("");
  const [hata, setHata] = useState("");

  const tanim = useMemo(() => sektorTanimiGetir(sektor), [sektor]);

  function sektorSec(yeniSektor: YeniSektorKimligi) {
    setSektor(yeniSektor);
    setTema("tema-1");
    setAlanlar(isletmeAlanlariOlustur(yeniSektor));
    const icerik = varsayilanIcerikOlustur(yeniSektor);
    setHizmetler(icerik.hizmetler);
    setOzellikler(icerik.ozellikler);
    setHata("");
  }

  function sonrakiAdim() {
    if (adim === 2) {
      if (!firmaAdi.trim() || !telefon.trim() || !sehir.trim()) {
        setHata("İşletme adı, telefon ve şehir zorunludur.");
        return;
      }
      const eksik = alanlar.find((alan) => alan.zorunlu && !alan.deger.trim());
      if (eksik) {
        setHata(`${eksik.etiket} alanını doldurun.`);
        return;
      }
    }
    setHata("");
    setAdim((deger) => Math.min(4, deger + 1));
  }

  function hizmetEkle() {
    const baslik = yeniHizmet.trim();
    if (!baslik) return;
    setHizmetler((liste) => [...liste, { id: kimlikOlustur(), baslik, aciklama: "İşletmenize özel ek hizmet. Açıklamasını düzenleme ekranından değiştirebilirsiniz.", aktif: true, ozelMi: true }]);
    setYeniHizmet("");
  }

  function ozellikEkle() {
    const baslik = yeniOzellik.trim();
    if (!baslik) return;
    setOzellikler((liste) => [...liste, { id: kimlikOlustur(), baslik, aciklama: "İşletmenize ait ek özellik.", aktif: true, ozelMi: true }]);
    setYeniOzellik("");
  }

  function projeyiOlustur() {
    const tarih = new Date().toISOString();
    const icerik = varsayilanIcerikOlustur(sektor);
    const projeSlug = benzersizProjeSlug(slug || firmaAdi);
    const proje: ProjeVerisi = {
      id: kimlikOlustur(), firmaAdi: firmaAdi.trim(), sektor, sektorAdi: tanim.ad, siteTipi, telefon: telefon.trim(), whatsapp: (whatsapp || telefon).trim(), eposta: eposta.trim(), adres: adres.trim(), sehir: sehir.trim(), ilce: ilce.trim(), hizmetBolgesi: hizmetBolgesi.trim(), slug: projeSlug, tema, sektorTemasi: tema, sayfalar: siteSayfalariOlustur(sektor, siteTipi), isletmeAlanlari: alanlar, hizmetler, ekOzellikler: ozellikler, medyalar: medyaAlanlariOlustur(sektor), siteIcerigi: { ...icerik, hizmetler, ozellikler }, yeniSistemMi: true, projeSurumu: 2, sablonSurumu: 11, githubRepoAdi: projeSlug, seoBaslik: `${firmaAdi.trim()} | Resmî Web Sitesi`, seoAciklama: icerik.heroAciklama, seoKelimeler: [firmaAdi.trim(), tanim.ad, sehir.trim(), ilce.trim()].filter(Boolean), gorselAlanlariHazirlandiMi: true, gorselPaketSurumu: GORSEL_PAKET_SURUMU, sektorIcerikSurumu: SEKTOR_ICERIK_SURUMU, olusturulmaTarihi: tarih, guncellenmeTarihi: tarih,
    };
    try {
      localStorage.setItem(AKTIF_PROJE, JSON.stringify(proje));
      const eski = JSON.parse(localStorage.getItem(PROJELER) || "[]") as ProjeVerisi[];
      localStorage.setItem(PROJELER, JSON.stringify([proje, ...eski.filter((kayit) => kayit.id !== proje.id)]));
      window.location.href = "/studio/duzenle";
    } catch {
      setHata("Proje kaydedilemedi. Tarayıcı depolama alanını kontrol edip yeniden deneyin.");
    }
  }

  return (
    <main className={styles.sayfa}>
      <header className={styles.ustBar}>
        <Link href="/"><ArrowLeft size={18} /> Ana sayfa</Link>
        <strong>SITEMIX <span>STUDIO</span></strong>
        <div>{[1,2,3,4].map((sayi) => <i key={sayi} className={sayi <= adim ? styles.aktifAdim : ""} />)}</div>
      </header>

      <section className={styles.baslik}>
        <div><span>YENİ NESİL SEKTÖR SİSTEMİ</span><h1>{adim === 1 ? "İşletme türünü seçin." : adim === 2 ? "Değişken bilgileri girin." : adim === 3 ? "Hazır içeriği uyarlayın." : "Görsel karakteri seçin."}</h1></div>
        <p>Her site normal bir web projesi gibi bağımsız oluşturulur. Studio yalnızca içeriği, sabit görselleri ve GitHub yayınını yönetir.</p>
      </section>

      {adim === 1 && <><section className={styles.siteTipiSecimi}><div><span>SİTE YAPISI</span><h2>Proje nasıl yayınlanacak?</h2><p>Bu seçim GitHub’a çıkacak gerçek projenin rota yapısını belirler.</p></div><button type="button" className={siteTipi === "tek-sayfa" ? styles.seciliTip : ""} onClick={() => setSiteTipi("tek-sayfa")}><FileText /><strong>Tek sayfa</strong><small>Tüm içerik tek akışta; hızlı, güçlü ve dönüşüm odaklı.</small>{siteTipi === "tek-sayfa" && <Check />}</button><button type="button" className={siteTipi === "cok-sayfa" ? styles.seciliTip : ""} onClick={() => setSiteTipi("cok-sayfa")}><Rows3 /><strong>Çok sayfa</strong><small>Hizmet, uzmanlık ve iletişim için bağımsız adresler.</small>{siteTipi === "cok-sayfa" && <Check />}</button></section><section className={styles.sektorGrid}>{YENI_SEKTORLER.map((kayit, index) => <button key={kayit.id} type="button" className={sektor === kayit.id ? styles.secili : ""} onClick={() => sektorSec(kayit.id)}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{kayit.ad}</h2><p>{kayit.iskeletAdi}</p><small>{kayit.iskeletAciklamasi}</small></div>{sektor === kayit.id ? <Check /> : <ChevronRight />}</button>)}</section></>}

      {adim === 2 && <section className={styles.formYerlesimi}><div className={styles.formKart}><div className={styles.ikiKolon}><label>İşletme adı *<input value={firmaAdi} onChange={(e) => { setFirmaAdi(e.target.value); if (!slug) setSlug(slugOlustur(e.target.value)); }} placeholder="Örn. Usta Makas" /></label><label>Telefon *<input value={telefon} onChange={(e) => setTelefon(e.target.value)} placeholder="05xx xxx xx xx" /></label><label>WhatsApp<input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="Boşsa telefon kullanılır" /></label><label>E-posta<input value={eposta} onChange={(e) => setEposta(e.target.value)} placeholder="iletisim@firma.com" /></label><label>Şehir *<input value={sehir} onChange={(e) => setSehir(e.target.value)} placeholder="İstanbul" /></label><label>İlçe<input value={ilce} onChange={(e) => setIlce(e.target.value)} placeholder="Kadıköy" /></label></div><label>Adres<textarea value={adres} onChange={(e) => setAdres(e.target.value)} rows={3} placeholder="Açık adres" /></label><label>Hizmet bölgesi<input value={hizmetBolgesi} onChange={(e) => setHizmetBolgesi(e.target.value)} placeholder="İstanbul geneli / 30 km çevre" /></label><div className={styles.ikiKolon}>{alanlar.map((alan, index) => <label key={alan.anahtar}>{alan.etiket}{alan.zorunlu && " *"}<input value={alan.deger} onChange={(e) => setAlanlar((liste) => liste.map((kayit, sira) => sira === index ? { ...kayit, deger: e.target.value } : kayit))} placeholder={tanim.alanlar[index]?.yerTutucu} /></label>)}</div><label>Proje kısa adı *<div className={styles.slug}><span>/</span><input value={slug} onChange={(e) => setSlug(slugOlustur(e.target.value))} placeholder="firma-adi" /></div></label></div><aside className={styles.formOzeti}><span>SEKTÖR İSKELETİ</span><h2>{tanim.iskeletAdi}</h2><p>{tanim.iskeletAciklamasi}</p><ul><li><Layers3 /> {siteTipi === "tek-sayfa" ? "Tek akış" : `${tanim.sayfalar.length} bağımsız sayfa`}</li><li><Sparkles /> Önceden doldurulmuş metinler</li><li><Palette /> 3 ayrı site düzeni</li></ul></aside></section>}

      {adim === 3 && <section className={styles.icerikYerlesimi}><div><div className={styles.bolumBasligi}><span>HAZIR HİZMETLER</span><p>Kapalı hizmet sitede görünmez; sonradan tekrar açabilirsiniz.</p></div><div className={styles.secimListesi}>{hizmetler.map((hizmet) => <button key={hizmet.id} type="button" className={hizmet.aktif ? styles.seciliSatir : ""} onClick={() => setHizmetler((liste) => liste.map((kayit) => kayit.id === hizmet.id ? { ...kayit, aktif: !kayit.aktif } : kayit))}><span>{hizmet.aktif ? <Check /> : <CirclePlus />}</span><div><strong>{hizmet.baslik}</strong><p>{hizmet.aciklama}</p></div></button>)}</div><div className={styles.eklemeSatiri}><input value={yeniHizmet} onChange={(e) => setYeniHizmet(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") hizmetEkle(); }} placeholder="İşletmeye özel ek hizmet" /><button type="button" onClick={hizmetEkle}><CirclePlus /> Hizmet ekle</button></div></div><aside><div className={styles.bolumBasligi}><span>EK ÖZELLİKLER</span><p>Güven ve dönüşüm alanlarında gösterilir.</p></div><div className={styles.ozellikSecimleri}>{ozellikler.map((ozellik) => <button key={ozellik.id} type="button" className={ozellik.aktif ? styles.seciliOzellik : ""} onClick={() => setOzellikler((liste) => liste.map((kayit) => kayit.id === ozellik.id ? { ...kayit, aktif: !kayit.aktif } : kayit))}><Check /><span><strong>{ozellik.baslik}</strong><small>{ozellik.aciklama}</small></span></button>)}</div><div className={styles.eklemeSatiri}><input value={yeniOzellik} onChange={(e) => setYeniOzellik(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") ozellikEkle(); }} placeholder="Örn. Ücretsiz keşif" /><button type="button" onClick={ozellikEkle}><CirclePlus /> Özellik ekle</button></div></aside></section>}

      {adim === 4 && (
        <section className={styles.temaYerlesimi}>
          {tanim.temalar.map((kayit) => (
            <button
              key={kayit.id}
              type="button"
              className={tema === kayit.id ? styles.seciliTema : ""}
              onClick={() => setTema(kayit.id)}
            >
              <div className={styles.renkler}>
                {kayit.renkler.map((renk) => (
                  <i key={renk} style={{ background: renk }} />
                ))}
              </div>
              <span>{kayit.id.replace("tema-", "0")} · {kayit.yerlesimAdi}</span>
              <h2>{kayit.ad}</h2>
              <p>{kayit.aciklama}</p>
              <small>{tema === kayit.id ? "SEÇİLDİ" : "TEMAYI SEÇ"}</small>
            </button>
          ))}
          <div className={styles.medyaNotu}>
            <Sparkles />
            <div>
              <strong>Sektörün hazır görsel paketi otomatik kullanılacak.</strong>
              <p>
                Dosyaları yalnızca bir kez <code>public/site-assets/{sektor}/</code> klasörüne koyun.
                Seçilen tema değişse de görseller korunur; müşteri değişiklik isterse Projeler →
                Düzenle → Görseller alanından yalnızca ilgili görseli değiştirin.
              </p>
            </div>
          </div>
        </section>
      )}

      <footer className={styles.altBar}>
        <div><span>0{adim} / 04</span><strong>{tanim.ad} · {tanim.iskeletAdi}</strong></div>
        {hata && <p>{hata}</p>}
        <div className={styles.altAksiyonlar}>{adim > 1 && <button type="button" onClick={() => { setAdim((d) => d - 1); setHata(""); }}><ArrowLeft /> Geri</button>}{adim < 4 ? <button type="button" className={styles.ileri} onClick={sonrakiAdim}>Devam <ArrowRight /></button> : <button type="button" className={styles.ileri} onClick={projeyiOlustur}>Projeyi oluştur <ArrowRight /></button>}</div>
      </footer>
    </main>
  );
}
