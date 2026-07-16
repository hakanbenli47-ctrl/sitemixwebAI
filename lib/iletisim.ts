function sadeceRakam(deger: unknown) {
  return String(deger ?? "").replace(/\D/g, "");
}

export function turkiyeTelefonunuDuzenle(deger: unknown) {
  let numara = sadeceRakam(deger);

  if (numara.startsWith("0090")) {
    numara = numara.slice(2);
  } else if (numara.length === 11 && numara.startsWith("0")) {
    numara = `90${numara.slice(1)}`;
  } else if (numara.length === 10) {
    numara = `90${numara}`;
  }

  return /^90[2-5]\d{9}$/.test(numara) ? numara : "";
}

export function whatsappNumarasiniDuzenle(deger: unknown) {
  const numara = turkiyeTelefonunuDuzenle(deger);
  return /^905\d{9}$/.test(numara) ? numara : "";
}

export function telefonBaglantisi(deger: unknown) {
  const numara = turkiyeTelefonunuDuzenle(deger);
  return numara ? `tel:+${numara}` : "";
}

export function whatsappBaglantisi(deger: unknown, mesaj = "") {
  const numara = whatsappNumarasiniDuzenle(deger);

  if (!numara) {
    return "";
  }

  return mesaj
    ? `https://wa.me/${numara}?text=${encodeURIComponent(mesaj)}`
    : `https://wa.me/${numara}`;
}

export function epostaGecerliMi(deger: unknown) {
  const eposta = String(deger ?? "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta);
}

export function iletisimKanaliVarMi({
  telefon,
  whatsapp,
  eposta,
}: {
  telefon: unknown;
  whatsapp: unknown;
  eposta: unknown;
}) {
  return Boolean(
    turkiyeTelefonunuDuzenle(telefon) ||
      whatsappNumarasiniDuzenle(whatsapp) ||
      epostaGecerliMi(eposta),
  );
}
