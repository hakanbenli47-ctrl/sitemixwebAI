import { NextResponse } from "next/server";
import type {
  SiteBolumu,
  SiteSayfasi,
} from "@/data/sektorSablonlari";
import { sektorStokGorselleriniGetir } from "@/data/sektorStokGorselleri";
import type { ProjeVerisi } from "@/types/proje";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface OpenAITextPart {
  type?: string;
  text?: string;
}


interface OpenAIOutputItem {
  type?: string;
  content?: OpenAITextPart[];
}

interface OpenAICevabi {
  output_text?: string;
  output?: OpenAIOutputItem[];
  error?: {
    message?: string;
  };
}

interface UretilenListeElemani {
  id: string;
  baslik: string;
  aciklama: string;
}

interface UretilenBolum {
  id: string;
  ustBaslik: string;
  baslik: string;
  aciklama: string;
  listeElemanlari: UretilenListeElemani[];
}

interface UretilenSayfa {
  id: string;
  bolumler: UretilenBolum[];
}

interface UretilenIcerik {
  seoBaslik: string;
  seoAciklama: string;
  seoKelimeler: string[];
  sayfalar: UretilenSayfa[];
}

interface OtomatikOlusturmaIstegi {
  proje: ProjeVerisi;
  yalnizcaEksikleriDoldur?: boolean;
}

const icerikSemasi = {
  type: "object",
  properties: {
    seoBaslik: { type: "string" },
    seoAciklama: { type: "string" },
    seoKelimeler: {
      type: "array",
      items: { type: "string" },
    },
    sayfalar: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          bolumler: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                ustBaslik: { type: "string" },
                baslik: { type: "string" },
                aciklama: { type: "string" },
                listeElemanlari: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      baslik: { type: "string" },
                      aciklama: { type: "string" },
                    },
                    required: ["id", "baslik", "aciklama"],
                    additionalProperties: false,
                  },
                },
              },
              required: [
                "id",
                "ustBaslik",
                "baslik",
                "aciklama",
                "listeElemanlari",
              ],
              additionalProperties: false,
            },
          },
        },
        required: ["id", "bolumler"],
        additionalProperties: false,
      },
    },
  },
  required: [
    "seoBaslik",
    "seoAciklama",
    "seoKelimeler",
    "sayfalar",
  ],
  additionalProperties: false,
} as const;

function metniAl(cevap: OpenAICevabi) {
  if (cevap.output_text?.trim()) {
    return cevap.output_text.trim();
  }

  for (const oge of cevap.output ?? []) {
    for (const parca of oge.content ?? []) {
      if (parca.type === "output_text" && parca.text?.trim()) {
        return parca.text.trim();
      }
    }
  }

  return "";
}

function projeOzetiniOlustur(proje: ProjeVerisi) {
  return {
    firmaAdi: proje.firmaAdi,
    sektor: proje.sektor,
    sektorAdi: proje.sektorAdi,
    sehir: proje.sehir,
    ilce: proje.ilce,
    hizmetBolgesi: proje.hizmetBolgesi,
    adres: proje.adres,
    telefonVar: Boolean(proje.telefon.trim()),
    whatsappVar: Boolean(proje.whatsapp.trim()),
    epostaVar: Boolean(proje.eposta.trim()),
    sayfalar: proje.sayfalar.map((sayfa) => ({
      id: sayfa.id,
      ad: sayfa.ad,
      slug: sayfa.slug,
      bolumler: sayfa.bolumler.map((bolum) => ({
        id: bolum.id,
        tur: bolum.tur,
        ustBaslik: bolum.ustBaslik,
        baslik: bolum.baslik,
        aciklama: bolum.aciklama,
        listeElemanlari: bolum.listeElemanlari.map((eleman) => ({
          id: eleman.id,
          baslik: eleman.baslik,
          aciklama: eleman.aciklama,
        })),
      })),
    })),
  };
}

async function yapayZekaIcerigiOlustur(
  proje: ProjeVerisi,
): Promise<UretilenIcerik | null> {
  const apiAnahtari = process.env.OPENAI_API_KEY?.trim();
  const model = process.env.OPENAI_MODEL?.trim();

  if (!apiAnahtari || !model) {
    return null;
  }

  const konum = [proje.ilce, proje.sehir].filter(Boolean).join(", ");

  const talimat = `Türkiye'deki küçük ve orta ölçekli işletmeler için dönüşüm ve yerel SEO odaklı web sitesi metinleri hazırla.

Kurallar:
- Doğal ve profesyonel Türkçe kullan.
- Firma adı, sektör, şehir, ilçe ve hizmet bölgesini bağlama uygun biçimde kullan; gereksiz tekrar yapma.
- İçerikleri gerçekten sektöre özel yaz. Boş reklam cümlelerinden kaçın.
- Kullanıcının vermediği kuruluş yılı, çalışan sayısı, sertifika, ödül, fiyat, garanti, başarı oranı veya resmi yetki uydurma.
- Sağlık ve hukuk alanlarında kesin sonuç vaat etme.
- Başlıkları kısa; açıklamaları çoğunlukla 1-3 cümle tut.
- Sayfa, bölüm ve liste öğesi ID'lerini aynen koru. Yeni sayfa veya bölüm ekleme ve mevcut olanı silme.
- Galeri öğelerine de sektöre uygun başlık ve kısa açıklama yaz.
- SEO başlığı yaklaşık 45-60 karakter, SEO açıklaması yaklaşık 130-160 karakter olsun.
- SEO kelimeleri firma, sektör, ${konum || "hizmet bölgesi"} ve temel hizmetleri kapsasın.`;

  const cevap = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiAnahtari}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      instructions: talimat,
      input: JSON.stringify(projeOzetiniOlustur(proje)),
      text: {
        format: {
          type: "json_schema",
          name: "sitemix_site_icerigi",
          strict: true,
          schema: icerikSemasi,
        },
      },
    }),
    cache: "no-store",
  });

  const veri = (await cevap.json()) as OpenAICevabi;

  if (!cevap.ok) {
    throw new Error(
      veri.error?.message ||
        `İçerik isteği başarısız oldu: ${cevap.status}`,
    );
  }

  const metin = metniAl(veri);

  if (!metin) {
    throw new Error("Geçerli bir içerik döndürülmedi.");
  }

  return JSON.parse(metin) as UretilenIcerik;
}

function degeriUygula(
  mevcut: string,
  yeniDeger: string,
  yalnizcaEksikleriDoldur: boolean,
) {
  if (yalnizcaEksikleriDoldur && mevcut.trim()) {
    return mevcut;
  }

  return yeniDeger.trim() || mevcut;
}

function uretilenIcerigiUygula(
  proje: ProjeVerisi,
  uretilen: UretilenIcerik,
  yalnizcaEksikleriDoldur: boolean,
): ProjeVerisi {
  const sayfaHaritasi = new Map(
    uretilen.sayfalar.map((sayfa) => [sayfa.id, sayfa]),
  );

  const sayfalar = proje.sayfalar.map((sayfa) => {
    const uretilenSayfa = sayfaHaritasi.get(sayfa.id);

    if (!uretilenSayfa) {
      return sayfa;
    }

    const bolumHaritasi = new Map(
      uretilenSayfa.bolumler.map((bolum) => [bolum.id, bolum]),
    );

    return {
      ...sayfa,
      bolumler: sayfa.bolumler.map((bolum) => {
        const uretilenBolum = bolumHaritasi.get(bolum.id);

        if (!uretilenBolum) {
          return bolum;
        }

        const elemanHaritasi = new Map(
          uretilenBolum.listeElemanlari.map((eleman) => [
            eleman.id,
            eleman,
          ]),
        );

        return {
          ...bolum,
          ustBaslik: degeriUygula(
            bolum.ustBaslik,
            uretilenBolum.ustBaslik,
            yalnizcaEksikleriDoldur,
          ),
          baslik: degeriUygula(
            bolum.baslik,
            uretilenBolum.baslik,
            yalnizcaEksikleriDoldur,
          ),
          aciklama: degeriUygula(
            bolum.aciklama,
            uretilenBolum.aciklama,
            yalnizcaEksikleriDoldur,
          ),
          listeElemanlari: bolum.listeElemanlari.map((eleman) => {
            const uretilenEleman = elemanHaritasi.get(eleman.id);

            if (!uretilenEleman) {
              return eleman;
            }

            return {
              ...eleman,
              baslik: degeriUygula(
                eleman.baslik,
                uretilenEleman.baslik,
                yalnizcaEksikleriDoldur,
              ),
              aciklama: degeriUygula(
                eleman.aciklama,
                uretilenEleman.aciklama,
                yalnizcaEksikleriDoldur,
              ),
            };
          }),
        };
      }),
    };
  });

  return {
    ...proje,
    seoBaslik: degeriUygula(
      proje.seoBaslik ?? "",
      uretilen.seoBaslik,
      yalnizcaEksikleriDoldur,
    ),
    seoAciklama: degeriUygula(
      proje.seoAciklama ?? "",
      uretilen.seoAciklama,
      yalnizcaEksikleriDoldur,
    ),
    seoKelimeler:
      yalnizcaEksikleriDoldur &&
      (proje.seoKelimeler?.length ?? 0) > 0
        ? proje.seoKelimeler
        : uretilen.seoKelimeler
            .map((kelime) => kelime.trim())
            .filter(Boolean),
    sayfalar,
    otomatikIcerikOlusturulduMu: true,
    guncellenmeTarihi: new Date().toISOString(),
  };
}

function hashOlustur(metin: string) {
  let hash = 0;

  for (let index = 0; index < metin.length; index += 1) {
    hash = (hash * 31 + metin.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function gorselGerekenBolumMu(bolum: SiteBolumu) {
  return ["hero", "metin", "hizmetler", "urunler", "galeri", "ekip"].includes(
    bolum.tur,
  );
}

function listeGorseliGerekenBolumMu(bolum: SiteBolumu) {
  return ["hizmetler", "urunler", "galeri", "ekip"].includes(bolum.tur);
}

function stokGorselleriDoldur(proje: ProjeVerisi): ProjeVerisi {
  const stoklar = sektorStokGorselleriniGetir(proje.sektor);
  const baslangic = hashOlustur(
    `${proje.firmaAdi}-${proje.sektor}-${proje.sehir}-${proje.ilce}`,
  );
  let sira = baslangic % stoklar.length;

  function siradakiGorsel() {
    const gorsel = stoklar[sira % stoklar.length];
    sira += 1;
    return gorsel;
  }

  const sayfalar: SiteSayfasi[] = proje.sayfalar.map((sayfa) => ({
    ...sayfa,
    bolumler: sayfa.bolumler.map((bolum) => {
      if (!gorselGerekenBolumMu(bolum)) {
        return bolum;
      }

      let gorsel = bolum.gorsel;
      let arkaPlanGorseli = bolum.arkaPlanGorseli;

      if (
        bolum.tur === "hero" &&
        !arkaPlanGorseli.trim() &&
        !gorsel.trim()
      ) {
        if (bolum.varyasyon === "kapak") {
          arkaPlanGorseli = siradakiGorsel();
        } else {
          gorsel = siradakiGorsel();
        }
      }

      if (bolum.tur === "metin" && !gorsel.trim()) {
        gorsel = siradakiGorsel();
      }

      const listeElemanlari = bolum.listeElemanlari.map((eleman) => {
        if (
          !listeGorseliGerekenBolumMu(bolum) ||
          eleman.gorsel.trim()
        ) {
          return eleman;
        }

        return {
          ...eleman,
          gorsel: siradakiGorsel(),
        };
      });

      return {
        ...bolum,
        gorsel,
        arkaPlanGorseli,
        listeElemanlari,
      };
    }),
  }));

  return {
    ...proje,
    sayfalar,
    otomatikGorsellerOlusturulduMu: true,
    guncellenmeTarihi: new Date().toISOString(),
  };
}

function istegiDogrula(istek: OtomatikOlusturmaIstegi) {
  return Boolean(
    istek?.proje?.id &&
      istek.proje.firmaAdi?.trim() &&
      istek.proje.sektorAdi?.trim() &&
      Array.isArray(istek.proje.sayfalar),
  );
}

export async function POST(request: Request) {
  let istek: OtomatikOlusturmaIstegi;

  try {
    istek = (await request.json()) as OtomatikOlusturmaIstegi;
  } catch {
    return NextResponse.json(
      {
        basarili: false,
        mesaj: "Gönderilen proje verisi okunamadı.",
      },
      { status: 400 },
    );
  }

  if (!istegiDogrula(istek)) {
    return NextResponse.json(
      {
        basarili: false,
        mesaj: "Proje bilgileri eksik veya geçersiz.",
      },
      { status: 400 },
    );
  }

  const uyarilar: string[] = [];
  const yalnizcaEksikleriDoldur = Boolean(
    istek.yalnizcaEksikleriDoldur,
  );
  let proje = istek.proje;

  try {
    const uretilenIcerik = await yapayZekaIcerigiOlustur(proje);

    if (uretilenIcerik) {
      proje = uretilenIcerigiUygula(
        proje,
        uretilenIcerik,
        yalnizcaEksikleriDoldur,
      );
    }
  } catch (error) {
    console.error("Otomatik içerik üretim hatası:", error);
    uyarilar.push(
      error instanceof Error
        ? `İçerik üretilemedi: ${error.message}`
        : "İçerik üretilemedi; hazır sektör metinleri kullanıldı.",
    );
  }

  proje = stokGorselleriDoldur(proje);

  return NextResponse.json({
    basarili: true,
    proje,
    uyarilar,
    mesaj:
      uyarilar.length > 0
        ? "Site hazırlandı; hazır sektör metinleri ve ücretsiz stok görseller kullanıldı."
        : "Sektöre ve konuma özel içerikler ile ücretsiz stok görseller hazırlandı.",
  });
}
