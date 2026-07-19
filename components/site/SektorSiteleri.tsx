"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { sektorDerinIcerigiGetir } from "@/data/sektorDerinIcerikleri";
import { sektorTanimiGetir, temaTanimiGetir, varsayilanIcerikOlustur } from "@/data/yeniSektorler";
import type { MedyaKaydi, ProjeVerisi, SektorSiteIcerigi } from "@/types/proje";
import styles from "./sektorSiteleri.module.css";

const SiteRotaBaglami = createContext("");

interface SiteProps {
  proje: ProjeVerisi;
  slug: string;
  git: (slug: string) => void;
}

interface GovdeProps extends SiteProps {
  icerik: SektorSiteIcerigi;
  medya: Record<string, MedyaKaydi>;
  alanlar: Record<string, string>;
}

function telefonHref(telefon: string) {
  const temiz = telefon.replace(/[^\d+]/g, "");
  return temiz ? `tel:${temiz}` : "#iletisim";
}

function vurguUstuYazi(renk: string) {
  const hex = renk.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return "#ffffff";
  const [r, g, b] = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((deger) => parseInt(deger, 16));
  const parlaklik = (r * 299 + g * 587 + b * 114) / 1000;
  return parlaklik > 150 ? "#101312" : "#ffffff";
}

function whatsappHref(numara: string, firmaAdi: string) {
  const temiz = numara.replace(/\D/g, "");
  return temiz ? `https://wa.me/${temiz}?text=${encodeURIComponent(`${firmaAdi} hakkında bilgi almak istiyorum.`)}` : "#iletisim";
}

function SayfaLinki({ slug, git, children, className }: { slug: string; git: (slug: string) => void; children: ReactNode; className?: string }) {
  return (
    <a
      href={slug ? `/${slug}` : "/"}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        git(slug);
      }}
    >
      {children}
    </a>
  );
}

function SiteBasligi({ proje, git, vurgu }: { proje: ProjeVerisi; git: (slug: string) => void; vurgu?: string }) {
  const [acik, setAcik] = useState(false);
  const sayfalar = [...proje.sayfalar].filter((sayfa) => sayfa.menuGoster).sort((a, b) => a.sira - b.sira);
  return (
    <header className={styles.header}>
      <SayfaLinki slug="" git={git} className={styles.marka}>
        {vurgu && <span>{vurgu}</span>}
        <strong>{proje.firmaAdi}</strong>
        <small>{proje.sektorAdi}</small>
      </SayfaLinki>
      <nav className={styles.masaustuMenu} aria-label="Ana menü">
        {sayfalar.map((sayfa) => <SayfaLinki key={sayfa.id} slug={sayfa.slug} git={git}>{sayfa.menuBasligi}</SayfaLinki>)}
      </nav>
      <a className={styles.headerTelefon} href={telefonHref(proje.telefon)}><Phone size={15} />{proje.telefon || "Hemen ara"}</a>
      <button className={styles.menuButonu} type="button" onClick={() => setAcik((deger) => !deger)} aria-label="Menüyü aç" aria-expanded={acik}>{acik ? <X /> : <Menu />}</button>
      {acik && <nav className={styles.mobilMenu}>{sayfalar.map((sayfa) => <SayfaLinki key={sayfa.id} slug={sayfa.slug} git={(hedef) => { setAcik(false); git(hedef); }}>{sayfa.menuBasligi}<ChevronRight size={17} /></SayfaLinki>)}</nav>}
    </header>
  );
}

function Medya({ medya, className }: { medya?: MedyaKaydi; className?: string }) {
  if (!medya?.acik || !medya.url.trim()) return null;
  return <figure className={`${styles.medya} ${className ?? ""}`}><Image src={medya.url} alt={medya.alternatifMetin || medya.baslik} fill unoptimized sizes="(max-width: 820px) 100vw, 50vw" /></figure>;
}

function UstEtiket({ children }: { children: ReactNode }) {
  return <span className={styles.ustEtiket}><i />{children}</span>;
}

function Aksiyonlar({ proje, git, teklifSlug = "randevu" }: { proje: ProjeVerisi; git: (slug: string) => void; teklifSlug?: string }) {
  return <div className={styles.aksiyonlar}><SayfaLinki slug={teklifSlug} git={git} className={styles.anaButon}>Talep oluştur <ArrowRight size={18} /></SayfaLinki><a className={styles.ikincilButon} href={whatsappHref(proje.whatsapp || proje.telefon, proje.firmaAdi)} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a></div>;
}

function HizmetListesi({ icerik, numbered = false, compact = false }: { icerik: SektorSiteIcerigi; numbered?: boolean; compact?: boolean }) {
  const hizmetler = icerik.hizmetler.filter((hizmet) => hizmet.aktif);
  return <div className={`${styles.hizmetListesi} ${compact ? styles.kompaktListe : ""}`}>{hizmetler.map((hizmet, index) => <article key={hizmet.id} className={styles.hizmet}><span>{numbered ? String(index + 1).padStart(2, "0") : <ArrowDownRight size={20} />}</span><div><h3>{hizmet.baslik}</h3><p>{hizmet.aciklama}</p></div></article>)}</div>;
}

function Ozellikler({ icerik }: { icerik: SektorSiteIcerigi }) {
  return <div className={styles.ozellikler}>{icerik.ozellikler.filter((o) => o.aktif).map((ozellik) => <article key={ozellik.id}><Check size={18} /><div><strong>{ozellik.baslik}</strong><p>{ozellik.aciklama}</p></div></article>)}</div>;
}

function Surec({ icerik, rota = false }: { icerik: SektorSiteIcerigi; rota?: boolean }) {
  return <ol className={`${styles.surec} ${rota ? styles.rotaSureci : ""}`}>{icerik.surec.map((adim, index) => <li key={adim.baslik}><span>{rota ? <Route size={19} /> : String(index + 1).padStart(2, "0")}</span><strong>{adim.baslik}</strong><p>{adim.aciklama}</p></li>)}</ol>;
}

function Istatistikler({ icerik }: { icerik: SektorSiteIcerigi }) {
  return <div className={styles.istatistikler}>{icerik.istatistikler.map((item) => <div key={item.etiket}><strong>{item.deger}</strong><span>{item.etiket}</span></div>)}</div>;
}

function IletisimTemeli({ proje, icerik, alanlar, baslik }: { proje: ProjeVerisi; icerik: SektorSiteIcerigi; alanlar: Record<string, string>; baslik?: string }) {
  return <section className={styles.iletisim} id="iletisim"><div className={styles.iletisimMetni}><UstEtiket>İletişim masası</UstEtiket><h2>{baslik || icerik.ctaBaslik}</h2><p>{icerik.ctaMetni}</p><div className={styles.iletisimBilgileri}><a href={telefonHref(proje.telefon)}><Phone size={18} /><span><small>Telefon</small>{proje.telefon || "Numara eklenmedi"}</span></a><a href={whatsappHref(proje.whatsapp || proje.telefon, proje.firmaAdi)} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span><small>WhatsApp</small>{proje.whatsapp || proje.telefon || "Numara eklenmedi"}</span></a><div><MapPin size={18} /><span><small>Adres</small>{proje.adres || [proje.ilce, proje.sehir].filter(Boolean).join(" / ")}</span></div><div><Clock3 size={18} /><span><small>Çalışma saatleri</small>{alanlar.calismaSaatleri || "Randevu ile"}</span></div></div></div><form className={styles.iletisimFormu} onSubmit={(e) => e.preventDefault()}><label>Adınız<input required placeholder="Ad Soyad" /></label><label>Telefon<input required inputMode="tel" placeholder="05xx xxx xx xx" /></label><label>İhtiyacınız<select defaultValue=""><option value="" disabled>Hizmet seçin</option>{icerik.hizmetler.filter((h) => h.aktif).map((h) => <option key={h.id}>{h.baslik}</option>)}</select></label><label>Mesajınız<textarea rows={4} placeholder="Kısaca ihtiyacınızı anlatın" /></label><button type="submit">Talebi hazırla <ArrowRight size={18} /></button><small>Form örnek akıştır; yayın sonrası WhatsApp veya e-posta entegrasyonu eklenebilir.</small></form></section>;
}

function KayanSerit({ kelimeler, ters = false }: { kelimeler: string[]; ters?: boolean }) {
  const tekrar = [...kelimeler, ...kelimeler];
  return (
    <div className={`${styles.kayanSerit} ${ters ? styles.kayanSeritTers : ""}`} aria-hidden="true">
      <div className={styles.kayanSeritIzi}>
        {tekrar.map((kelime, index) => (
          <span key={`${kelime}-${index}`}>
            {kelime}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function MobilHizliAksiyon({ proje }: { proje: ProjeVerisi }) {
  return (
    <div className={styles.mobilHizliAksiyon}>
      <a href={telefonHref(proje.telefon)}><Phone size={18} /><span><small>Hızlı bağlantı</small>Hemen ara</span></a>
      <a href={whatsappHref(proje.whatsapp || proje.telefon, proje.firmaAdi)} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span><small>Mesaj gönder</small>WhatsApp</span></a>
    </div>
  );
}

function ZenginIcerik({ proje }: { proje: ProjeVerisi }) {
  const derin = sektorDerinIcerigiGetir(proje.sektor);
  const hareketiAzalt = useReducedMotion();
  const giris = hareketiAzalt ? false : { opacity: 0, y: 58, filter: "blur(12px)" };
  const gorunur = { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <section className={styles.zenginIcerik} data-hareket-dili={derin.hareketDili}>
      <KayanSerit kelimeler={derin.kayanKelimeler} />

      <motion.div
        className={styles.zenginBaslik}
        initial={giris}
        whileInView={gorunur}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <UstEtiket>İşletmeye özel hizmet dosyası</UstEtiket>
          <h2>{derin.baslik}</h2>
        </div>
        <p>{derin.aciklama}</p>
      </motion.div>

      <div className={styles.alanBulutu}>
        {derin.calismaAlanlari.map((alan, index) => (
          <motion.span
            key={alan}
            initial={hareketiAzalt ? false : { opacity: 0, scale: 0.82 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.055, duration: 0.45 }}
          >
            {String(index + 1).padStart(2, "0")} · {alan}
          </motion.span>
        ))}
      </div>

      <div className={styles.paketGrid}>
        {derin.paketler.map((paket, index) => (
          <motion.article
            key={paket.ad}
            className={styles.paketKart}
            initial={hareketiAzalt ? false : { opacity: 0, y: 45, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ delay: index * 0.1, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            whileHover={hareketiAzalt ? undefined : { y: -10 }}
          >
            <span>{paket.etiket}</span>
            <h3>{paket.ad}</h3>
            <p>{paket.aciklama}</p>
            <ul>
              {paket.maddeler.map((madde) => <li key={madde}><Check size={14} />{madde}</li>)}
            </ul>
            <b>0{index + 1}</b>
          </motion.article>
        ))}
      </div>

      <div className={styles.kararRehberi}>
        <motion.div
          className={styles.kararBasligi}
          initial={giris}
          whileInView={gorunur}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>KARAR REHBERİ / 04 SENARYO</span>
          <h2>Hangi durumda nasıl ilerliyoruz?</h2>
        </motion.div>
        <div className={styles.senaryoGrid}>
          {derin.senaryolar.map((senaryo, index) => (
            <motion.article
              key={senaryo.baslik}
              initial={hareketiAzalt ? false : { opacity: 0, x: index % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.07, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{senaryo.baslik}</h3><p>{senaryo.aciklama}</p></div>
              <ArrowDownRight />
            </motion.article>
          ))}
        </div>
      </div>

      <div className={styles.kaliteBandi}>
        <div><ShieldCheck /><span>KALİTE KONTROLÜ</span></div>
        <ul>{derin.kaliteNotlari.map((not) => <li key={not}><i />{not}</li>)}</ul>
      </div>

      <KayanSerit kelimeler={[...derin.kayanKelimeler].reverse()} ters />
    </section>
  );
}

function Iletisim(props: { proje: ProjeVerisi; icerik: SektorSiteIcerigi; alanlar: Record<string, string>; baslik?: string }) {
  const aktifSlug = useContext(SiteRotaBaglami);
  return (
    <>
      {!aktifSlug && <ZenginIcerik proje={props.proje} />}
      <IletisimTemeli {...props} />
    </>
  );
}

function AltSayfa({ proje, slug, git, icerik, alanlar, medya, tur }: GovdeProps & { tur: string }) {
  const hizmetSayfasi = /hizmet|uygulama|bakim|paket|tasima|transfer|yol-yardim|organizasyon/.test(slug);
  const iletisimSayfasi = /randevu|teklif|brief|iste|cagir|gonder|rezervasyon|talep|kesif/.test(slug);
  const baslik = proje.sayfalar.find((sayfa) => sayfa.slug === slug)?.ad ?? proje.sektorAdi;
  if (iletisimSayfasi) return <><SiteBasligi proje={proje} git={git} /><main className={styles.altSayfa} data-alt-tur={tur}><div className={styles.altHero}><UstEtiket>{icerik.rozet}</UstEtiket><h1>{baslik}</h1><p>{icerik.ctaMetni}</p></div><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} baslik={icerik.ctaBaslik} /></main></>;
  return <><SiteBasligi proje={proje} git={git} /><main className={styles.altSayfa} data-alt-tur={tur}><div className={styles.altHero}><UstEtiket>{icerik.rozet}</UstEtiket><h1>{baslik}</h1><p>{hizmetSayfasi ? icerik.heroAciklama : icerik.hakkimizdaMetni}</p></div><Medya medya={medya.hero} className={styles.altMedya} />{hizmetSayfasi ? <section className={styles.altIcerik}><HizmetListesi icerik={icerik} numbered /><Surec icerik={icerik} rota={tur === "lojistik" || tur === "rescue"} /></section> : <section className={styles.altIcerik}><div className={styles.manifesto}><h2>{icerik.guvenBasligi}</h2><p>{icerik.guvenMetni}</p></div><Ozellikler icerik={icerik} />{icerik.sss.map((item) => <details key={item.soru}><summary>{item.soru}</summary><p>{item.cevap}</p></details>)}</section>}<Iletisim proje={proje} icerik={icerik} alanlar={alanlar} /></main></>;
}

function Kuafor(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="editorial" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="S/" /><main className={styles.kuafor}><section className={styles.kuaforHero}><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} /></div><aside><span>Salon dosyası / 01</span><strong>{alanlar.uzmanlik || proje.sektorAdi}</strong><p>{icerik.slogan}</p></aside><Medya medya={medya.hero} /></section><section className={styles.editorialKiris}><span>Analiz</span><span>Teknik reçete</span><span>Uygulama</span><span>Evde bakım</span></section><section className={styles.kuaforHizmet}><div><UstEtiket>Hizmet seçkisi</UstEtiket><h2>Görünüm değil, size ait bir kullanım biçimi.</h2></div><HizmetListesi icerik={icerik} numbered compact /></section><section className={styles.kuaforHikaye}><Medya medya={medya.donusum} /><div><h2>{icerik.hakkimizdaBaslik}</h2><p>{icerik.hakkimizdaMetni}</p><Ozellikler icerik={icerik} /></div></section><Istatistikler icerik={icerik} /><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} /></main></>;
}

function BarberPole() { return <div className={styles.barberPole} aria-hidden="true"><i /><span /></div>; }

function Berber(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="barber" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="B/" /><main className={styles.berber}><section className={styles.berberHero}><BarberPole /><div className={styles.berberKopya}><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} /></div><div className={styles.berberRozet}><Star /><strong>BARBER<br />CLUB</strong><span>{proje.sehir || "TÜRKİYE"}</span></div><Medya medya={medya.hero} /></section><section className={styles.berberMenu}><header><span>THE SERVICE MENU</span><h2>Koltuğa oturun.<br />Gerisini ustaya bırakın.</h2></header><HizmetListesi icerik={icerik} numbered /></section><section className={styles.berberClub}><div><h2>{icerik.hakkimizdaBaslik}</h2><p>{icerik.hakkimizdaMetni}</p></div><Surec icerik={icerik} /><BarberPole /></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} baslik="Koltuğunuzu ayıralım." /></main></>;
}

function Guzellik(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="beauty" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="✦" /><main className={styles.guzellik}><section className={styles.guzellikHero}><div className={styles.guzellikOrb}><Sparkles /></div><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} /></div><Medya medya={medya.hero} /></section><section className={styles.rituel}><div><span>01</span><h2>Analiz</h2><p>İhtiyacınızı dinleriz.</p></div><div><span>02</span><h2>Protokol</h2><p>Bakımı kişiselleştiririz.</p></div><div><span>03</span><h2>Ritüel</h2><p>Konforla uygularız.</p></div></section><section className={styles.guzellikHizmet}><div className={styles.dikeyYazi}>BEAUTY RITUAL</div><HizmetListesi icerik={icerik} /><Medya medya={medya.bakim} /></section><section className={styles.guzellikGuven}><div><UstEtiket>Bakım felsefemiz</UstEtiket><h2>{icerik.guvenBasligi}</h2><p>{icerik.guvenMetni}</p></div><Ozellikler icerik={icerik} /></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} /></main></>;
}

function Nail(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="nail" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="NAIL/" /><main className={styles.nail}><section className={styles.nailHero}><span className={styles.nailBuyukNo}>01</span><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} /></div><Medya medya={medya.hero} /></section><section className={styles.lookbook}><header><span>LOOKBOOK / CURRENT SETS</span><h2>Renk. Form. Detay.</h2></header><div className={styles.lookGrid}><Medya medya={medya["look-1"]} /><div className={styles.lookKart}>ALMOND<br /><strong>MINIMAL</strong></div><Medya medya={medya["look-2"]} /><div className={styles.lookKart}>SHORT<br /><strong>COLOR POP</strong></div><Medya medya={medya["look-3"]} /></div></section><section className={styles.nailServices}><HizmetListesi icerik={icerik} numbered /><aside><ShieldCheck /><h2>{icerik.guvenBasligi}</h2><p>{icerik.guvenMetni}</p></aside></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} /></main></>;
}

function Nakliye(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="lojistik" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="ROTA" /><main className={styles.nakliye}><section className={styles.nakliyeHero}><div className={styles.rotaCizgisi}><i /><span>ÇIKIŞ</span><i /><span>TESLİM</span></div><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} teklifSlug="teklif-al" /></div><aside><span>OPERASYON DURUMU</span><strong>TEKLİF HATTI AÇIK</strong><small>{alanlar.kapsama || proje.hizmetBolgesi}</small></aside></section><Istatistikler icerik={icerik} /><section className={styles.manifestoBolumu}><header><span>YÜK MANİFESTOSU</span><h2>Doğru taşıma türünü seçin.</h2></header><HizmetListesi icerik={icerik} numbered /><Medya medya={medya.paketleme} /></section><section className={styles.operasyonBolumu}><div><h2>{icerik.hakkimizdaBaslik}</h2><p>{icerik.hakkimizdaMetni}</p></div><Surec icerik={icerik} rota /></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} baslik="Taşıma planınızı çıkaralım." /></main></>;
}

function Vip(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="vip" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="VIP" /><main className={styles.vip}><section className={styles.vipHero}><div className={styles.vipMonogram}>V</div><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} teklifSlug="rezervasyon" /></div><Medya medya={medya.hero} /></section><section className={styles.concierge}><header><span>CONCIERGE DESK</span><h2>Yolculuğun her ayrıntısı tek masada.</h2></header><div className={styles.conciergeGrid}><HizmetListesi icerik={icerik} compact /><aside><CalendarDays /><strong>{alanlar.filo || "VIP araç filosu"}</strong><p>Rota, karşılama ve bekleme planı rezervasyonla birlikte hazırlanır.</p></aside></div></section><section className={styles.vipRota}><Surec icerik={icerik} rota /><Medya medya={medya["ic-mekan"]} /></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} baslik="Özel rotanızı planlayalım." /></main></>;
}

function Hali(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="hygiene" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="H₂O" /><main className={styles.hali}><section className={styles.haliHero}><div className={styles.kabarciklar}><i /><i /><i /></div><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} teklifSlug="servis-talebi" /></div><aside><span>SERVİS DURUMU</span><strong>{alanlar.servisGunleri || "Ücretsiz servis"}</strong><small>{alanlar.teslimSuresi || "Kontrollü teslim"}</small></aside></section><section className={styles.yikamaHatti}><header><span>KABUL</span><span>AYIRMA</span><span>YIKAMA</span><span>KURUTMA</span><span>TESLİM</span></header><HizmetListesi icerik={icerik} /></section><section className={styles.hijyenKaniti}><Medya medya={medya.once} /><div><ShieldCheck /><h2>{icerik.guvenBasligi}</h2><p>{icerik.guvenMetni}</p><Ozellikler icerik={icerik} /></div><Medya medya={medya.sonra} /></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} baslik="Servis rotasına eklenin." /></main></>;
}

function Dovme(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="ink" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="INK" /><main className={styles.dovme}><section className={styles.dovmeHero}><span className={styles.inkDaire}>ORIGINAL<br />WORK</span><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} teklifSlug="fikir-gonder" /></div><Medya medya={medya.hero} /></section><section className={styles.inkBand}><span>{alanlar.stil || "FINE LINE"}</span><span>BLACKWORK</span><span>CUSTOM DESIGN</span><span>{alanlar.yasSiniri || "18+"}</span></section><section className={styles.portfolioGrid}><Medya medya={medya["portfolio-1"]} /><div><span>PORTFOLIO / 01</span><h2>{icerik.hakkimizdaBaslik}</h2><p>{icerik.hakkimizdaMetni}</p></div><Medya medya={medya["portfolio-2"]} /><HizmetListesi icerik={icerik} numbered /></section><section className={styles.sterilBlok}><ShieldCheck /><div><h2>{icerik.guvenBasligi}</h2><p>{icerik.guvenMetni}</p></div><Surec icerik={icerik} /></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} /></main></>;
}

function Elektrik(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="technical" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="⚡" /><main className={styles.elektrik}><section className={styles.elektrikHero}><div className={styles.panelKod}>ENERJİ / TEST<br /><strong>220—380V</strong></div><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} teklifSlug="servis-cagir" /></div><aside><Zap /><span>ACİL SERVİS</span><strong>{alanlar.acilServis || "7/24"}</strong></aside></section><section className={styles.teknikPanel}><header><span>ARIZA SINIFI</span><span>ÖLÇÜM</span><span>MÜDAHALE</span><span>TEST</span></header><HizmetListesi icerik={icerik} numbered /></section><section className={styles.olcumBolumu}><Medya medya={medya.olcum} /><div><h2>{icerik.guvenBasligi}</h2><p>{icerik.guvenMetni}</p><Surec icerik={icerik} /></div></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} baslik="Arıza kaydınızı açalım." /></main></>;
}

function Tesisat(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="plumbing" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="HAT" /><main className={styles.tesisat}><section className={styles.tesisatHero}><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} teklifSlug="usta-cagir" /></div><div className={styles.boruCizimi}><i /><i /><span>BAR</span></div><aside><span>HIZLI SORUN SEÇİMİ</span>{icerik.hizmetler.slice(0, 5).map((hizmet) => <SayfaLinki key={hizmet.id} slug="usta-cagir" git={git}>{hizmet.baslik}<ChevronRight size={15} /></SayfaLinki>)}</aside></section><section className={styles.teshisMasasi}><div><span>TESHİS / 01</span><h2>{icerik.hakkimizdaBaslik}</h2><p>{icerik.hakkimizdaMetni}</p></div><Medya medya={medya.teshis} /><Surec icerik={icerik} /></section><section className={styles.tesisatServices}><HizmetListesi icerik={icerik} numbered /><div className={styles.basincKart}><strong>{alanlar.cihazliTespit || "Cihaz destekli tespit"}</strong><span>ONARIM SONRASI</span><b>BASINÇ TESTİ</b></div></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} /></main></>;
}

function Organizasyon(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="event" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="LIVE" /><main className={styles.organizasyon}><section className={styles.eventHero}><div className={styles.eventTicker}>NOW PLANNING — NOW PLANNING — NOW PLANNING</div><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} teklifSlug="brief" /></div><Medya medya={medya.hero} /><span className={styles.eventYil}>2026+</span></section><section className={styles.runOfShow}><header><span>RUN OF SHOW</span><h2>Brief’ten son alkışa.</h2></header><Surec icerik={icerik} /></section><section className={styles.eventServices}><HizmetListesi icerik={icerik} numbered /><aside><strong>{alanlar.kapasite || "Her ölçekte etkinlik"}</strong><p>{icerik.guvenMetni}</p><Sparkles /></aside></section><section className={styles.eventPortfolio}><Medya medya={medya["event-1"]} /><Medya medya={medya["event-2"]} /><Medya medya={medya["event-3"]} /></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} baslik="Etkinliğin briefini açalım." /></main></>;
}

function Duvar(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="surface" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="M²" /><main className={styles.duvar}><section className={styles.duvarHero}><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} teklifSlug="kesif" /></div><div className={styles.renkNumuneleri}><i /><i /><i /><span>YÜZEY / RENK / DOKU</span></div><Medya medya={medya.hero} /></section><section className={styles.yuzeyKatalog}><header><span>MALZEME KATALOĞU</span><h2>Duvar için doğru katmanı seçin.</h2></header><HizmetListesi icerik={icerik} numbered /></section><section className={styles.onceSonra}><Medya medya={medya.once} /><div><span>ÖNCE / SONRA</span><h2>{icerik.hakkimizdaBaslik}</h2><p>{icerik.hakkimizdaMetni}</p><Ozellikler icerik={icerik} /></div><Medya medya={medya.sonra} /></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} baslik="Yerinde keşif planlayalım." /></main></>;
}

function OtoYikama(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="detailing" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="BAY.01" /><main className={styles.otoYikama}><section className={styles.washHero}><div className={styles.yikamaIsiklari}><i /><i /><i /></div><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} /></div><aside><span>WASH BAY STATUS</span><strong>READY</strong><small>{alanlar.randevu || "Randevulu hizmet"}</small></aside><Medya medya={medya.hero} /></section><section className={styles.paketKarsilastirma}><header><span>UYGULAMA MENÜSÜ</span><h2>Aracın ihtiyacına göre paket.</h2></header><HizmetListesi icerik={icerik} numbered /></section><section className={styles.detailingStory}><div><Wrench /><h2>{icerik.guvenBasligi}</h2><p>{icerik.guvenMetni}</p></div><div className={styles.beforeAfter}><Medya medya={medya.once} /><span>→</span><Medya medya={medya.sonra} /></div><Surec icerik={icerik} /></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} /></main></>;
}

function OtoKurtarma(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="rescue" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="SOS" /><main className={styles.otoKurtarma}><section className={styles.rescueHero}><div className={styles.sinyal}><i /><i /><i /></div><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} teklifSlug="konum-gonder" /></div><aside><span>ACİL HAT</span><a href={telefonHref(proje.telefon)}>{proje.telefon || "Hemen ara"}</a><small>{alanlar.kapsama || proje.hizmetBolgesi}</small></aside></section><section className={styles.konumPaneli}><div><MapPin /><span>KONUM</span><strong>ALINDI</strong></div><div><Route /><span>EKİP</span><strong>YÖNLENDİRİLİYOR</strong></div><div><Clock3 /><span>VARIŞ</span><strong>PAYLAŞILACAK</strong></div></section><section className={styles.rescueServices}><HizmetListesi icerik={icerik} numbered /><Medya medya={medya.filo} /></section><section className={styles.rescueRoute}><h2>{icerik.guvenBasligi}</h2><Surec icerik={icerik} rota /></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} baslik="Konumunuzu gönderin." /></main></>;
}

function OtoServis(props: GovdeProps) {
  if (props.slug) return <AltSayfa {...props} tur="workshop" />;
  const { proje, git, icerik, medya, alanlar } = props;
  return <><SiteBasligi proje={proje} git={git} vurgu="RPM" /><main className={styles.otoServis}><section className={styles.servisHero}><div className={styles.devirGosterge}><span>RPM</span><strong>4.2</strong><i /></div><div><UstEtiket>{icerik.rozet}</UstEtiket><h1>{icerik.heroBaslik}</h1><p>{icerik.heroAciklama}</p><Aksiyonlar proje={proje} git={git} /></div><Medya medya={medya.hero} /></section><section className={styles.isEmri}><header><span>DİJİTAL İŞ EMRİ</span><strong>{alanlar.markalar || "Binek ve hafif ticari"}</strong></header><Surec icerik={icerik} /><Istatistikler icerik={icerik} /></section><section className={styles.servisHizmet}><div><span>ATÖLYE / HİZMETLER</span><h2>Teşhisten teslime aynı dosya.</h2><p>{icerik.hakkimizdaMetni}</p></div><HizmetListesi icerik={icerik} numbered /></section><section className={styles.servisKaniti}><Medya medya={medya.teshis} /><div><ShieldCheck /><h2>{icerik.guvenBasligi}</h2><p>{icerik.guvenMetni}</p><Ozellikler icerik={icerik} /></div></section><Iletisim proje={proje} icerik={icerik} alanlar={alanlar} baslik="Servis kaydınızı açalım." /></main></>;
}

const govdeler: Record<string, (props: GovdeProps) => ReactNode> = {
  kuafor: Kuafor, berber: Berber, "guzellik-salonu": Guzellik, "nail-artist": Nail, nakliye: Nakliye, "vip-tasimacilik": Vip, "hali-yikama": Hali, dovmeci: Dovme, elektrikci: Elektrik, tesisatci: Tesisat, organizasyon: Organizasyon, "duvar-isleri": Duvar, "oto-yikama": OtoYikama, "oto-kurtarma": OtoKurtarma, "oto-servis": OtoServis,
};

export default function SektorSiteleri({ proje, baslangicSlug = "", gercekRotaKullan = false }: { proje: ProjeVerisi; baslangicSlug?: string; gercekRotaKullan?: boolean }) {
  const [slug, setSlug] = useState(baslangicSlug);
  const hareketiAzalt = useReducedMotion();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [slug]);
  const icerik = useMemo(() => {
    const temel = proje.siteIcerigi ?? varsayilanIcerikOlustur(proje.sektor);
    return { ...temel, hizmetler: proje.hizmetler?.length ? proje.hizmetler : temel.hizmetler, ozellikler: proje.ekOzellikler?.length ? proje.ekOzellikler : temel.ozellikler };
  }, [proje]);
  const medya = Object.fromEntries((proje.medyalar ?? []).map((item) => [item.slot, item]));
  const alanlar = Object.fromEntries((proje.isletmeAlanlari ?? []).map((item) => [item.anahtar, item.deger]));
  const tema = temaTanimiGetir(proje.sektor, proje.sektorTemasi || proje.tema);
  const renkStili = { "--site-bg": tema.renkler[0], "--site-text": tema.renkler[1], "--site-accent": tema.renkler[2], "--site-surface": tema.renkler[3], "--site-on-accent": vurguUstuYazi(tema.renkler[2]) } as CSSProperties;
  const Govde = govdeler[proje.sektor] ?? Kuafor;
  const tanim = sektorTanimiGetir(proje.sektor);
  const sayfayaGit = (hedef: string) => {
    if (gercekRotaKullan) {
      window.location.assign(hedef ? `/${hedef}` : "/");
      return;
    }
    setSlug(hedef);
  };
  return (
    <div className={styles.site} data-sektor={proje.sektor} data-tema={tema.id} data-iskelet={tanim.iskeletAdi} style={renkStili}>
      <SiteRotaBaglami.Provider value={slug}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slug || "ana-sayfa"}
            className={styles.sayfaGecisi}
            initial={hareketiAzalt ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={hareketiAzalt ? undefined : { opacity: 0, y: -18, filter: "blur(8px)" }}
            transition={{ duration: hareketiAzalt ? 0 : 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            <Govde proje={proje} slug={slug} git={sayfayaGit} icerik={icerik} medya={medya} alanlar={alanlar} />
          </motion.div>
        </AnimatePresence>
      </SiteRotaBaglami.Provider>
      <MobilHizliAksiyon proje={proje} />
      <footer className={styles.footer}><strong>{proje.firmaAdi}</strong><span>{tanim.iskeletAdi} · {new Date().getFullYear()}</span><a href={telefonHref(proje.telefon)}>İletişime geç <ArrowRight size={16} /></a></footer>
    </div>
  );
}
