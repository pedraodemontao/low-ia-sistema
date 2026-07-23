import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Pixel } from "@/components/Pixel";

export const metadata: Metadata = {
  title: "Test de Piel Coreano — Ritual Seúl 50+",
  description:
    "Descubre tu fórmula personalizada con ginseng rojo. El ritual coreano de 2 minutos que firma la piel después de los 50 — sin bótox, en casa. Test gratis de 1 minuto.",
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
    <html lang="es">
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
