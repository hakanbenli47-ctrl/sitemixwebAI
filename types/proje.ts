import type { SiteSayfasi } from "@/data/sektorSablonlari";

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
  sayfalar: SiteSayfasi[];

  domain?: string;
  vercelUrl?: string;
  seoBaslik?: string;
  seoAciklama?: string;
  seoKelimeler?: string[];

  otomatikIcerikOlusturulduMu?: boolean;
  otomatikGorsellerOlusturulduMu?: boolean;

  githubAktarildiMi?: boolean;
  githubRepoAdi?: string;
  githubUrl?: string;
  sonGithubAktarimi?: string;

  olusturulmaTarihi: string;
  guncellenmeTarihi: string;
}
