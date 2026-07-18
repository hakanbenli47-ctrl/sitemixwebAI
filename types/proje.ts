import type { SiteSayfasi } from "@/data/sektorSablonlari";

export type IcerikPaketiKimligi = "hizli" | "guven" | "vitrin";

export interface SiteStilAyarlari {
  genislik: "dar" | "dengeli" | "genis";
  bosluk: "kompakt" | "dengeli" | "ferah";
  kose: "keskin" | "yumusak" | "yuvarlak";
  tipografi: "modern" | "kurumsal" | "editorial";
  hareket: "sakin" | "dengeli" | "canli";
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
  icerikPaketi?: IcerikPaketiKimligi;
  secilenHizmetler?: string[];
  stilAyarlari?: SiteStilAyarlari;
  sayfalar: SiteSayfasi[];
  sablonSurumu?: number;

  domain?: string;
  vercelUrl?: string;
  seoBaslik?: string;
  seoAciklama?: string;
  seoKelimeler?: string[];

  otomatikIcerikOlusturulduMu?: boolean;
  otomatikGorsellerOlusturulduMu?: boolean;
  gorselsizSunumHazirlandiMi?: boolean;

  githubAktarildiMi?: boolean;
  githubRepoAdi?: string;
  githubUrl?: string;
  sonGithubAktarimi?: string;

  olusturulmaTarihi: string;
  guncellenmeTarihi: string;
}
