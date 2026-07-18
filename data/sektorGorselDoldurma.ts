import type { ProjeVerisi } from "@/types/proje";

/**
 * Yayın verisini tamamen metin tabanlı sunuma dönüştürür.
 * Galeri sayfaları ve bölümleri kaldırılır; eski kayıtlardaki görseller temizlenir.
 */
export function gorselsizSunumuHazirla(proje: ProjeVerisi): ProjeVerisi {
  return {
    ...proje,
    sayfalar: proje.sayfalar
      .filter((sayfa) => sayfa.rol !== "galeri")
      .map((sayfa) => ({
        ...sayfa,
        bolumler: sayfa.bolumler
          .filter((bolum) => bolum.tur !== "galeri")
          .map((bolum) => ({
            ...bolum,
            gorsel: "",
            arkaPlanGorseli: "",
            listeElemanlari: bolum.listeElemanlari.map((eleman) => ({
              ...eleman,
              gorsel: "",
            })),
          })),
      })),
    otomatikGorsellerOlusturulduMu: false,
    gorselsizSunumHazirlandiMi: true,
    guncellenmeTarihi: new Date().toISOString(),
  };
}
