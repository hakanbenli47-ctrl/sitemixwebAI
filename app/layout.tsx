import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sitemix Studio",
  description:
    "Görsele ihtiyaç duymadan, sektörel tipografi ve hareketli bilgi sahneleriyle profesyonel web siteleri oluşturma sistemi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
