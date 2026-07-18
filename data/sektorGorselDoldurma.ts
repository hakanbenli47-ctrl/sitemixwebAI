import type { ProjeVerisi } from "@/types/proje";

/**
 * Yeni sunum sistemi boş görsel alanlarını sektör ikonlarıyla tamamlar.
 * Kullanıcının daha önce eklediği gerçek iş görsellerine dokunulmaz.
 */
export function gorselsizSunumuHazirla(proje: ProjeVerisi): ProjeVerisi {
  return {
    ...proje,
    otomatikGorsellerOlusturulduMu: false,
    gorselsizSunumHazirlandiMi: true,
    guncellenmeTarihi: new Date().toISOString(),
  };
}
