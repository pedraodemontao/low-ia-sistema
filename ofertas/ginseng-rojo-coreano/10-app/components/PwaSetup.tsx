"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* Registra o service worker e oferece a instalação na tela de início.
   Android/Chrome: usa o evento beforeinstallprompt.
   iOS/Safari: não existe esse evento — mostramos a instrução manual. */

type PromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const OCULTO = "ritual-seul:instalar-oculto";

export default function PwaSetup() {
  const path = usePathname();
  const [prompt, setPrompt] = useState<PromptEvent | null>(null);
  const [iosSugerir, setIosSugerir] = useState(false);

  // No test de piel o convite tapa o botão — e ela ainda não viu valor nenhum
  // para querer instalar. O convite aparece depois, já com a fórmula na mão.
  const silenciar = path.startsWith("/bienvenida");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* sem SW o app segue funcionando, só perde o offline */
      });
    }

    if (localStorage.getItem(OCULTO) === "1") return;

    const yaInstalado =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    if (yaInstalado) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as PromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    const ua = window.navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS/.test(ua)) {
      setIosSugerir(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const cerrar = () => {
    localStorage.setItem(OCULTO, "1");
    setPrompt(null);
    setIosSugerir(false);
  };

  const instalar = async () => {
    if (!prompt) return;
    await prompt.prompt();
    await prompt.userChoice;
    cerrar();
  };

  if (silenciar) return null;

  if (prompt) {
    return (
      <div className="instalar" role="dialog" aria-label="Instalar la app">
        <p>
          <strong style={{ color: "var(--oro-claro)" }}>Instala tu ritual</strong>
          <br />
          Tenlo en tu pantalla de inicio, como cualquier app.
        </p>
        <button onClick={instalar}>Instalar</button>
        <button className="x" onClick={cerrar} aria-label="Ahora no">✕</button>
      </div>
    );
  }

  if (iosSugerir) {
    return (
      <div className="instalar" role="dialog" aria-label="Instalar la app">
        <p>
          <strong style={{ color: "var(--oro-claro)" }}>Ténlo a mano</strong>
          <br />
          Toca <b>Compartir</b> y luego <b>Añadir a inicio</b>.
        </p>
        <button className="x" onClick={cerrar} aria-label="Ahora no">✕</button>
      </div>
    );
  }

  return null;
}
