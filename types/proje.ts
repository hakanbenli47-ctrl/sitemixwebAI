import type { SiteSayfasi } from "@/data/sektorSablonlari";

export type IcerikPaketiKimligi = "hizli" | "guven" | "vitrin";

export type SiteMotoruKimligi =
  | "butik-vitrin"
  | "hizli-servis"
  | "rota-lojistik"
  | "paket-katalog"
  | "operasyon-portfoy";

export interface SiteStilAyarlari {
  genislik: "dar" | "dengeli" | "genis";
  bosluk: "kompakt" | "dengeli" | "ferah";
  kose: "keskin" | "yumusak" | "yuvarlak";
  tipografi: "modern" | "kurumsal" | "editorial";
  hareket: "sakin" | "dengeli" | "canli";
}

export type YeniSektorKimligi =
  | "kuafor"
  | "berber"
  | "guzellik-salonu"
  | "nail-artist"
  | "nakliye"
  | "vip-tasimacilik"
  | "hali-yikama"
  | "dovmeci"
  | "elektrikci"
  | "tesisatci"
  | "organizasyon"
  | "duvar-isleri"
  | "oto-yikama"
  | "oto-kurtarma"
  | "oto-servis";

export type SektorTemaKimligi = "tema-1" | "tema-2" | "tema-3";

export interface IsletmeAlaniDegeri {
  anahtar: string;
  etiket: string;
  deger: string;
  zorunlu: boolean;
}

export interface HizmetKaydi {
  id: string;
  baslik: string;
  aciklama: string;
  aktif: boolean;
  ozelMi?: boolean;
}

export interface EkOzellikKaydi {
  id: string;
  baslik: string;
  aciklama: string;
  aktif: boolean;
  ozelMi?: boolean;
}

export interface MedyaKaydi {
  id: string;
  slot: string;
  baslik: string;
  acik: boolean;
  url: string;
  dosyaAdi?: string;
  alternatifMetin?: string;
}

export interface SurecAdimi {
  baslik: string;
  aciklama: string;
}

export interface SssKaydi {
  soru: string;
  cevap: string;
}

export interface IstatistikKaydi {
  deger: string;
  etiket: string;
}

export interface SektorSiteIcerigi {
  rozet: string;
  slogan: string;
  heroBaslik: string;
  heroAciklama: string;
  hakkimizdaBaslik: string;
  hakkimizdaMetni: string;
  guvenBasligi: string;
  guvenMetni: string;
  ctaBaslik: string;
  ctaMetni: string;
  hizmetler: HizmetKaydi[];
  ozellikler: EkOzellikKaydi[];
  surec: SurecAdimi[];
  sss: SssKaydi[];
  istatistikler: IstatistikKaydi[];
}

export interface ProjeVerisi {
  id: string;
  firmaAdi: string;
  sektor: string;
  sektorAdi: string;
  siteTipi: "tek-sayfa" | "cok-sayfa";
  telefon: string;
  whatsapp: string;
  eposta: string;
  adres: string;
  sehir: string;
  ilce: string;
  hizmetBolgesi?: string;
  slug: string;
  tema: string;
  tasarim?: string;
  iskelet?: string;
  siteMotoru?: SiteMotoruKimligi;
  icerikPaketi?: IcerikPaketiKimligi;
  secilenHizmetler?: string[];
  stilAyarlari?: SiteStilAyarlari;
  sayfalar: SiteSayfasi[];
  sablonSurumu?: number;
  yeniSistemMi?: boolean;
  sektorTemasi?: SektorTemaKimligi;
  isletmeAlanlari?: IsletmeAlaniDegeri[];
  hizmetler?: HizmetKaydi[];
  ekOzellikler?: EkOzellikKaydi[];
  medyalar?: MedyaKaydi[];
  siteIcerigi?: SektorSiteIcerigi;
  projeSurumu?: number;

  domain?: string;
  vercelUrl?: string;
  seoBaslik?: string;
  seoAciklama?: string;
  seoKelimeler?: string[];

  otomatikIcerikOlusturulduMu?: boolean;
  otomatikGorsellerOlusturulduMu?: boolean;
  gorselsizSunumHazirlandiMi?: boolean;
  gorselAlanlariHazirlandiMi?: boolean;
  gorselPaketSurumu?: number;

  githubAktarildiMi?: boolean;
  githubRepoAdi?: string;
  githubUrl?: string;
  sonGithubAktarimi?: string;

  olusturulmaTarihi: string;
  guncellenmeTarihi: string;
}
