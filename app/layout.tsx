import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sitemix Studio",
  description:
    "Bağımsız tek ve çok sayfalı müşteri sitelerini oluşturma, GitHub'a aktarma ve sonradan yeniden düzenleme stüdyosu.",
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
