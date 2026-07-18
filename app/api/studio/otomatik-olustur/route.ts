import { NextResponse } from "next/server";
import { projeyeOzelIcerigiUygula } from "@/data/icerikSablonlari";
import { gorselsizSunumuHazirla } from "@/data/sektorGorselDoldurma";
import { hazirIcerikPaketiniUygula } from "@/data/studyoPaketleri";
import type { ProjeVerisi } from "@/types/proje";

export const runtime = "nodejs";

interface OtomatikOlusturmaIstegi {
  proje: ProjeVerisi;
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

  const sektorIcerikliProje = projeyeOzelIcerigiUygula(istek.proje);
  const paketliProje = hazirIcerikPaketiniUygula(sektorIcerikliProje);
  const proje = {
    ...gorselsizSunumuHazirla(paketliProje),
    otomatikIcerikOlusturulduMu: true,
    guncellenmeTarihi: new Date().toISOString(),
  };

  return NextResponse.json({
    basarili: true,
    proje,
    uyarilar: [],
    mesaj:
      "Hazır sektör metinleri, seçilen hizmetler ve çok sayfalı içerik paketi uygulandı.",
  });
}
