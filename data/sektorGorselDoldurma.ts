import type { ProjeVerisi } from "@/types/proje";

/**
 * Projeyi görsel alanları kapalı başlayan sunuma hazırlar.
 * Kullanıcının özellikle açtığı bölüm görselleri korunur; kapalı alanlar yer tutmaz.
 */
export function gorselsizSunumuHazirla(proje: ProjeVerisi): ProjeVerisi {
  const gorselAlaniAcikMi = proje.sayfalar.some((sayfa) =>
    sayfa.bolumler.some((bolum) => bolum.gorselAlaniAcikMi),
  );

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
            gorselAlaniAcikMi: bolum.gorselAlaniAcikMi ?? false,
            gorsel: bolum.gorselAlaniAcikMi ? bolum.gorsel : "",
            arkaPlanGorseli: bolum.gorselAlaniAcikMi
              ? bolum.arkaPlanGorseli
              : "",
            listeElemanlari: bolum.listeElemanlari.map((eleman) => ({
              ...eleman,
              gorsel: "",
            })),
          })),
      })),
    otomatikGorsellerOlusturulduMu: false,
    gorselsizSunumHazirlandiMi: !gorselAlaniAcikMi,
    gorselAlanlariHazirlandiMi: true,
    guncellenmeTarihi: new Date().toISOString(),
  };
}
