import { sektorStokGorselleriniGetir } from "@/data/sektorStokGorselleri";
import type { SiteBolumu, SiteSayfasi } from "@/data/sektorSablonlari";
import type { ProjeVerisi } from "@/types/proje";

function gorselGerekenBolumMu(bolum: SiteBolumu) {
  return ["hero", "metin", "hizmetler", "urunler", "galeri"].includes(
    bolum.tur,
  );
}

function listeGorseliGerekenBolumMu(bolum: SiteBolumu) {
  return ["hizmetler", "urunler", "galeri"].includes(bolum.tur);
}

export function stokGorselleriDoldur(proje: ProjeVerisi): ProjeVerisi {
  const stoklar = sektorStokGorselleriniGetir(proje.sektor);
  let sira = 0;

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
