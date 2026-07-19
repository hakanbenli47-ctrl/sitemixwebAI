"use client";

import SektorSiteleri from "@/components/site/SektorSiteleri";
import type { ProjeVerisi } from "@/types/proje";

export default function SiteGorunumu({
  proje,
  baslangicSlug = "",
  gercekRotaKullan = false,
}: {
  proje: ProjeVerisi;
  baslangicSlug?: string;
  gercekRotaKullan?: boolean;
}) {
  return (
    <SektorSiteleri
      proje={proje}
      baslangicSlug={baslangicSlug}
      gercekRotaKullan={gercekRotaKullan}
    />
  );
}
