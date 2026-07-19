/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const ts = require("typescript");

function tsModulunuYukle(dosya, bagimliliklar = {}) {
  const kaynak = fs.readFileSync(dosya, "utf8");
  const cikti = ts.transpileModule(kaynak, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const modul = { exports: {} };
  const yerelRequire = (istek) => bagimliliklar[istek] || require(istek);

  new Function(
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
    cikti,
  )(modul.exports, yerelRequire, modul, dosya, path.dirname(dosya));

  return modul.exports;
}

function bolum(id, tur, sira, baslik) {
  return {
    id,
    tur,
    varyasyon: "standart",
    aktif: true,
    sira,
    ustBaslik: tur === "hero" ? "Güvenli servis" : "İletişim",
    baslik,
    aciklama: "Hizmet kapsamını ve uygun zamanı birlikte netleştirelim.",
    gorsel: "",
    arkaPlanGorseli: "",
    animasyon: "asagidan",
    butonlar: [],
    listeElemanlari: [],
  };
}

function geciciDiziniTemizle(kok, geciciDizin) {
  if (path.dirname(geciciDizin) !== kok) {
    throw new Error("Geçici Vercel paket dizini proje sınırları dışında.");
  }

  const nodeModulleriBaglantisi = path.join(geciciDizin, "node_modules");

  if (fs.existsSync(nodeModulleriBaglantisi)) {
    const bilgi = fs.lstatSync(nodeModulleriBaglantisi);

    if (bilgi.isSymbolicLink()) {
      fs.unlinkSync(nodeModulleriBaglantisi);
    }
  }

  fs.rmSync(geciciDizin, { recursive: true, force: true });
}

async function calistir() {
  const kok = path.resolve(__dirname, "..");
  const geciciDizin = path.join(kok, ".vercel-paket-test");
  const kurulumHazir = fs.existsSync(
    path.join(geciciDizin, "node_modules", "next", "package.json"),
  );

  if (kurulumHazir) {
    for (const oge of fs.readdirSync(geciciDizin)) {
      if (oge === "node_modules") {
        continue;
      }

      const hedef = path.join(geciciDizin, oge);

      if (path.dirname(hedef) !== geciciDizin) {
        throw new Error("Geçici paket temizleme hedefi güvenli değil.");
      }

      fs.rmSync(hedef, { recursive: true, force: true });
    }
  } else {
    geciciDiziniTemizle(kok, geciciDizin);
    fs.mkdirSync(geciciDizin, { recursive: true });
  }

  const stokGorseller = tsModulunuYukle(
    path.join(kok, "data/sektorStokGorselleri.ts"),
  );
  const gorselDoldurma = tsModulunuYukle(
    path.join(kok, "data/sektorGorselDoldurma.ts"),
    { "@/data/sektorStokGorselleri": stokGorseller },
  );
  const aktarimRotasi = tsModulunuYukle(
    path.join(kok, "app/api/github/aktar/route.ts"),
    { "@/data/sektorGorselDoldurma": gorselDoldurma },
  );
  const tarih = new Date().toISOString();
  const proje = {
    id: "vercel-paket-denetimi",
    firmaAdi: "Vercel Test Elektrik",
    sektor: "elektrikci",
    sektorAdi: "Elektrikçi",
    siteTipi: "cok-sayfa",
    telefon: "0532 555 00 00",
    whatsapp: "",
    eposta: "bilgi@example.com",
    adres: "Ankara",
    sehir: "Ankara",
    ilce: "Çankaya",
    hizmetBolgesi: "Ankara",
    slug: "vercel-test-elektrik",
    tema: "signal",
    iskelet: "elektrikci-iskelet-11",
    icerikPaketi: "hizli",
    secilenHizmetler: ["Elektrik arıza tespiti"],
    stilAyarlari: {
      genislik: "genis",
      bosluk: "kompakt",
      kose: "keskin",
      tipografi: "kurumsal",
      hareket: "canli",
    },
    sayfalar: [
      {
        id: "ana-sayfa",
        rol: "ana",
        ad: "Ana Sayfa",
        slug: "",
        menuBasligi: "Ana Sayfa",
        menuGoster: true,
        anaSayfa: true,
        sira: 0,
        bolumler: [
          {
            ...bolum("hero", "hero", 0, "Güvenli elektrik servisi"),
            gorselAlaniAcikMi: true,
            gorsel:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
          },
        ],
      },
      {
        id: "iletisim-sayfasi",
        rol: "iletisim",
        ad: "İletişim",
        slug: "İLETİŞİM !",
        menuBasligi: "",
        menuGoster: true,
        anaSayfa: false,
        sira: 1,
        bolumler: [bolum("iletisim", "iletisim", 0, "Bize ulaşın")],
      },
      {
        id: "tekrar-sayfa",
        rol: "ozel",
        ad: "İletişim Kopyası",
        slug: "İLETİŞİM !",
        menuBasligi: "İletişim Kopyası",
        menuGoster: false,
        anaSayfa: false,
        sira: 2,
        bolumler: [bolum("detay", "metin", 0, "Servis kapsamı")],
      },
    ],
    sablonSurumu: 9,
    seoBaslik: "Vercel Test Elektrik",
    seoAciklama: "Vercel ve sitemap üretim paketi denetimi.",
    seoKelimeler: ["elektrikçi", "Ankara"],
    olusturulmaTarihi: tarih,
    guncellenmeTarihi: "gecersiz-tarih",
  };

  const dosyalar = await aktarimRotasi.aktarilacakDosyalariOlustur(
    proje,
    "vercel-test-elektrik",
  );

  for (const [dosyaYolu, dosya] of Object.entries(dosyalar)) {
    const hedef = path.join(geciciDizin, ...dosyaYolu.split("/"));
    fs.mkdirSync(path.dirname(hedef), { recursive: true });

    if (typeof dosya === "string") {
      fs.writeFileSync(hedef, dosya, "utf8");
    } else {
      fs.writeFileSync(
        hedef,
        dosya.encoding === "base64"
          ? Buffer.from(dosya.content, "base64")
          : dosya.content,
        dosya.encoding === "base64" ? undefined : "utf8",
      );
    }
  }

  const projeKaynagi = fs.readFileSync(
    path.join(geciciDizin, "data/proje.ts"),
    "utf8",
  );
  const sitemapKaynagi = fs.readFileSync(
    path.join(geciciDizin, "app/sitemap.ts"),
    "utf8",
  );

  if (
    !projeKaynagi.includes('"slug": "iletisim"') ||
    !projeKaynagi.includes('"slug": "iletisim-2"') ||
    !projeKaynagi.includes('"iskelet": "elektrikci-iskelet-11"') ||
    !projeKaynagi.includes('"gorselAlaniAcikMi": true') ||
    !Object.keys(dosyalar).some((dosyaYolu) => dosyaYolu.startsWith("public/images/")) ||
    projeKaynagi.includes("data:image/png;base64") ||
    sitemapKaynagi.includes("gecersiz-tarih")
  ) {
    throw new Error("Slug, iskelet, görsel veya sitemap normalizasyonu beklenen sonucu vermedi.");
  }

  const npmKomutu = process.env.npm_execpath;

  if (!npmKomutu) {
    throw new Error("npm çalıştırma yolu bulunamadı.");
  }

  if (!kurulumHazir) {
    const kurulum = spawnSync(
      process.execPath,
      [npmKomutu, "install", "--no-audit", "--no-fund", "--package-lock=false"],
      {
        cwd: geciciDizin,
        encoding: "utf8",
        env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      },
    );

    process.stdout.write(kurulum.stdout || "");
    process.stderr.write(kurulum.stderr || "");

    if (kurulum.status !== 0) {
      throw new Error(
        `Üretilen Vercel paketinin bağımlılıkları kurulamadı: ${
          kurulum.error?.message || kurulum.status
        }`,
      );
    }
  }

  const nextKomutu = path.join(
    geciciDizin,
    "node_modules",
    "next",
    "dist",
    "bin",
    "next",
  );
  const derleme = spawnSync(process.execPath, [nextKomutu, "build"], {
    cwd: geciciDizin,
    encoding: "utf8",
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  });

  process.stdout.write(derleme.stdout || "");
  process.stderr.write(derleme.stderr || "");

  if (derleme.status !== 0) {
    throw new Error(
      `Üretilen Vercel paketi derlenemedi: ${
        derleme.error?.message || derleme.status
      }`,
    );
  }

  geciciDiziniTemizle(kok, geciciDizin);
  console.log("Üretilen bağımsız Vercel paketi başarıyla derlendi.");
}

calistir().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
