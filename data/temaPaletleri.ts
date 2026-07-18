import type { TemaKimligi } from "@/data/sektorTasarimlari";

export interface TemaPaleti {
  arkaPlan: string;
  ikinciArkaPlan: string;
  yazi: string;
  solukYazi: string;
  vurgu: string;
  cizgi: string;
  butonYazi: string;
}

export const temaPaletleri: Record<TemaKimligi, TemaPaleti> = {
  aurora: { arkaPlan: "#F6F2E8", ikinciArkaPlan: "#E8F0E6", yazi: "#101A22", solukYazi: "#4F5B55", vurgu: "#176B46", cizgi: "#D7D0C1", butonYazi: "#FFFFFF" },
  obsidian: { arkaPlan: "#0B0F12", ikinciArkaPlan: "#151B20", yazi: "#F4EFE6", solukYazi: "#A9B0B4", vurgu: "#A7F3C1", cizgi: "rgba(244, 239, 230, 0.14)", butonYazi: "#0B0F12" },
  ivory: { arkaPlan: "#FBF7EF", ikinciArkaPlan: "#EFE7D8", yazi: "#181512", solukYazi: "#71675B", vurgu: "#8F2E2E", cizgi: "#DDD2C1", butonYazi: "#FFFFFF" },
  terra: { arkaPlan: "#EFE3D1", ikinciArkaPlan: "#DED0B7", yazi: "#2A1B12", solukYazi: "#604C3D", vurgu: "#4B5825", cizgi: "#C8B698", butonYazi: "#FFFFFF" },
  noir: { arkaPlan: "#14110E", ikinciArkaPlan: "#211B15", yazi: "#F5EBDD", solukYazi: "#B8A995", vurgu: "#D5AC62", cizgi: "rgba(245, 235, 221, 0.15)", butonYazi: "#14110E" },
  lagoon: { arkaPlan: "#EEF8F8", ikinciArkaPlan: "#DCEFF0", yazi: "#10282B", solukYazi: "#486265", vurgu: "#086B6B", cizgi: "#BBD9DA", butonYazi: "#FFFFFF" },
  ruby: { arkaPlan: "#FFF1EC", ikinciArkaPlan: "#F7DCD4", yazi: "#301111", solukYazi: "#6F4945", vurgu: "#B52B2B", cizgi: "#E0B8AE", butonYazi: "#FFFFFF" },
  sage: { arkaPlan: "#EEF1E6", ikinciArkaPlan: "#DDE4D2", yazi: "#1D2A1F", solukYazi: "#526048", vurgu: "#76502D", cizgi: "#C6CEBB", butonYazi: "#FFFFFF" },
  copper: { arkaPlan: "#ECEBE6", ikinciArkaPlan: "#DBD9D1", yazi: "#171A1A", solukYazi: "#515654", vurgu: "#9D3F20", cizgi: "#BFC0B9", butonYazi: "#FFFFFF" },
  neon: { arkaPlan: "#100B1F", ikinciArkaPlan: "#1B1131", yazi: "#F2EEFF", solukYazi: "#B8ACD6", vurgu: "#A78BFA", cizgi: "rgba(242, 238, 255, 0.16)", butonYazi: "#100B1F" },
  mono: { arkaPlan: "#F7F7F3", ikinciArkaPlan: "#E8E8E2", yazi: "#0E0E0E", solukYazi: "#686868", vurgu: "#4B5F75", cizgi: "#CECEC8", butonYazi: "#FFFFFF" },
  royal: { arkaPlan: "#0C1830", ikinciArkaPlan: "#142746", yazi: "#F3F6FB", solukYazi: "#B8C4D8", vurgu: "#E0B85A", cizgi: "rgba(243, 246, 251, 0.15)", butonYazi: "#0C1830" },
  sand: { arkaPlan: "#F4E6CF", ikinciArkaPlan: "#E7D0AC", yazi: "#23170D", solukYazi: "#5F482F", vurgu: "#84370F", cizgi: "#D3B98E", butonYazi: "#FFFFFF" },
  clinic: { arkaPlan: "#F8FCFA", ikinciArkaPlan: "#E7F3EF", yazi: "#0E2521", solukYazi: "#4B6660", vurgu: "#166C5B", cizgi: "#C7DDD7", butonYazi: "#FFFFFF" },
  bistro: { arkaPlan: "#FFF4E2", ikinciArkaPlan: "#F3D7AF", yazi: "#2B160C", solukYazi: "#684934", vurgu: "#982C19", cizgi: "#DDBE91", butonYazi: "#FFFFFF" },
  artisan: { arkaPlan: "#F1E7D8", ikinciArkaPlan: "#E1D0B9", yazi: "#251B14", solukYazi: "#594A3D", vurgu: "#284B63", cizgi: "#C9B69B", butonYazi: "#FFFFFF" },
  skyline: { arkaPlan: "#EFF4FA", ikinciArkaPlan: "#DCE8F4", yazi: "#101A2B", solukYazi: "#4F6075", vurgu: "#1D4FBE", cizgi: "#C4D2E4", butonYazi: "#FFFFFF" },
  forest: { arkaPlan: "#102018", ikinciArkaPlan: "#1A3025", yazi: "#F1EEDC", solukYazi: "#B9BEA7", vurgu: "#B9D86B", cizgi: "rgba(241, 238, 220, 0.15)", butonYazi: "#102018" },
  studio: { arkaPlan: "#FAF7F2", ikinciArkaPlan: "#EEE9E1", yazi: "#111111", solukYazi: "#66615B", vurgu: "#A8267B", cizgi: "#D8D1C7", butonYazi: "#FFFFFF" },
  marble: { arkaPlan: "#F2F0EA", ikinciArkaPlan: "#E2E0DA", yazi: "#1A1A18", solukYazi: "#56534F", vurgu: "#74502F", cizgi: "#C9C5BC", butonYazi: "#FFFFFF" },
  pearl: { arkaPlan: "#FFF8F5", ikinciArkaPlan: "#F3E6E2", yazi: "#261A1D", solukYazi: "#67555A", vurgu: "#963A5D", cizgi: "#DCC9C9", butonYazi: "#FFFFFF" },
  hygiene: { arkaPlan: "#F2FBF8", ikinciArkaPlan: "#DDEFEA", yazi: "#102923", solukYazi: "#48645C", vurgu: "#087564", cizgi: "#B9D9D0", butonYazi: "#FFFFFF" },
  torque: { arkaPlan: "#0E1114", ikinciArkaPlan: "#1A2025", yazi: "#F7F4ED", solukYazi: "#B7BEC2", vurgu: "#FF6A1A", cizgi: "#343B40", butonYazi: "#111416" },
  signal: { arkaPlan: "#F3F5F6", ikinciArkaPlan: "#E0E5E7", yazi: "#111A20", solukYazi: "#4F5E66", vurgu: "#765A00", cizgi: "#C4CDD2", butonYazi: "#FFFFFF" },
  cargo: { arkaPlan: "#F3F0E8", ikinciArkaPlan: "#E1E5E3", yazi: "#162126", solukYazi: "#526167", vurgu: "#963512", cizgi: "#C7CDC9", butonYazi: "#FFFFFF" },
};

export function temaPaletiniGetir(tema?: string): TemaPaleti {
  return temaPaletleri[(tema as TemaKimligi) || "aurora"] ?? temaPaletleri.aurora;
}
