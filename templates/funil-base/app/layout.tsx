import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Pixel } from "@/components/Pixel";

export const metadata: Metadata = {
  title: "[Título da sua oferta — promessa principal]",
  description:
    "[Descrição/meta da sua oferta — o que o teste revela e o benefício central. Preencha por oferta.]",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Pixel />
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          strategy="afterInteractive"
          data-utmify-prevent-subids=""
        />
        {children}
      </body>
    </html>
  );
}
