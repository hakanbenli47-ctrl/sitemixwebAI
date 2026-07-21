import { NextResponse } from "next/server";
import type { ProjeVerisi } from "@/types/proje";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface GitHubDosyasi {
  content?: string;
  encoding?: string;
}

function repoAdiniAyikla(deger: string) {
  const temiz = deger.trim().replace(/\.git$/i, "").replace(/\/$/, "");
  const urlEslesmesi = temiz.match(/github\.com\/[^/]+\/([^/?#]+)/i);
  return (urlEslesmesi?.[1] || temiz.split("/").filter(Boolean).at(-1) || "").trim();
}

async function githubDosyasiniOku(owner: string, repo: string, dosyaYolu: string, token: string) {
  const cevap = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${dosyaYolu}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "Sitemix-Studio/1.0",
      },
      cache: "no-store",
    },
  );

  if (!cevap.ok) return null;
  const veri = (await cevap.json()) as GitHubDosyasi;
  if (!veri.content || veri.encoding !== "base64") return null;
  return Buffer.from(veri.content.replace(/\s/g, ""), "base64").toString("utf8");
}

function projeyiDogrula(veri: unknown): veri is ProjeVerisi {
  if (!veri || typeof veri !== "object") return false;
  const proje = veri as Partial<ProjeVerisi>;
  return Boolean(
    proje.id &&
      proje.firmaAdi &&
      proje.sektor &&
      Array.isArray(proje.sayfalar) &&
      proje.sayfalar.length,
  );
}

export async function POST(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  if (!token || !owner) {
    return NextResponse.json({ basarili: false, mesaj: "GitHub bağlantı bilgileri eksik." }, { status: 500 });
  }

  let repo = "";
  try {
    const govde = (await request.json()) as { repo?: string };
    repo = repoAdiniAyikla(govde.repo || "");
  } catch {
    return NextResponse.json({ basarili: false, mesaj: "Repository bilgisi okunamadı." }, { status: 400 });
  }

  if (!repo) {
    return NextResponse.json({ basarili: false, mesaj: "Repository adı veya GitHub adresi girin." }, { status: 400 });
  }

  try {
    const jsonIcerigi = await githubDosyasiniOku(owner, repo, "data/proje.json", token);
    const tsIcerigi = jsonIcerigi ? null : await githubDosyasiniOku(owner, repo, "data/proje.ts", token);
    let veri: unknown;

    if (jsonIcerigi) {
      veri = JSON.parse(jsonIcerigi);
    } else if (tsIcerigi) {
      const eslesme = tsIcerigi.match(/export const proje[^=]*=\s*([\s\S]+);\s*$/);
      veri = eslesme ? JSON.parse(eslesme[1]) : null;
    }

    if (!projeyiDogrula(veri)) {
      return NextResponse.json({ basarili: false, mesaj: "Bu repository Sitemix proje verisi içermiyor." }, { status: 404 });
    }

    const proje: ProjeVerisi = {
      ...veri,
      githubAktarildiMi: true,
      githubRepoAdi: repo,
      githubUrl: `https://github.com/${owner}/${repo}`,
      guncellenmeTarihi: new Date().toISOString(),
    };

    return NextResponse.json({ basarili: true, proje });
  } catch (error) {
    console.error("GitHub projesi getirilemedi:", error);
    return NextResponse.json({ basarili: false, mesaj: error instanceof Error ? error.message : "Proje getirilemedi." }, { status: 500 });
  }
}
