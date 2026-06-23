import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Pixel } from "@/components/Pixel";

export const metadata: Metadata = {
  title: "seu resultado, Descubra qual dos 72 perfis destrava o seu dinheiro",
  description:
    "Pela sua data de nascimento, revelamos qual dos 72 perfis rege a sua resultado, o bloqueio que trava o seu dinheiro e a oração que destrava os seus caminhos financeiros.",
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
