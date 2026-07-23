import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import PwaSetup from "@/components/PwaSetup";

export const metadata: Metadata = {
  title: "Ritual Seúl 50+",
  description:
    "Tu ritual nocturno del Pegamento Rojo Coreano — receta, masaje coreano de 3 dedos y cronograma de 21 noches.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Ritual Seúl" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" },
  // Área de membros: não deve aparecer em buscador.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#8e1b1b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="app">{children}</div>
        <Nav />
        <PwaSetup />
      </body>
    </html>
  );
}
