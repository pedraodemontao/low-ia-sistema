import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Pixel } from "@/components/Pixel";

export const metadata: Metadata = {
  title: "Acalanto — bem-estar e autocuidado feminino",
  description:
    "Volte a sentir, no seu tempo, do seu jeito. Acalanto com o Ritual Dois Tempos: discreto, à prova d'água e seu. Entrega 100% discreta e garantia de 30 dias.",
  robots: { index: false, follow: false },
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
