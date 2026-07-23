"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/pixel";

// Gracias (fim da esteira). Copy: site/gracias.html (aprovada).
// Dispara só o custom PurchaseComplete — o Purchase real (com valor) sai
// server-side pelo webhook (api/cakto-webhook → CAPI), sem dupla contagem.
export default function GraciasPage() {
  return (
    <Suspense fallback={<main className="wrap" />}>
      <Gracias />
    </Suspense>
  );
}

// Placeholder — login real da members area entra na etapa 9.
const APP_ACCESS_URL = "https://app.ritualseul.com/acceso";

function Gracias() {
  const params = useSearchParams();
  const nome = params.get("nome") || "";

  useEffect(() => {
    track("PurchaseComplete");
  }, []);

  return (
    <main className="wrap">
      <div className="center">
        <span className="eyebrow">Pago confirmado ✅</span>
        <h1>
          ¡PAGO CONFIRMADO{nome ? `, ${nome}` : ""}!{" "}
          <span className="gold">Tu acceso está listo</span>
        </h1>
        <p className="lead">
          Tu Ritual del Pegamento Rojo Coreano ya está cargado en la app, calibrado
          para tu perfil de piel.
        </p>
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Cómo empezar ahora mismo:</p>
        <ul className="stack">
          <li>
            1️⃣ <strong>Toca &ldquo;Acceder a mi app&rdquo;</strong> — el botón de
            aquí abajo te lleva directo a tu ritual.
          </li>
          <li>
            2️⃣ <strong>Crea tu cuenta</strong> — solo con tu email, en menos de un
            minuto, para guardar tu progreso.
          </li>
          <li>
            3️⃣ <strong>Tu receta y tu cronograma ya están cargados</strong> —
            empiezas tu primera noche hoy mismo, sin nada que configurar.
          </li>
        </ul>
      </div>

      <div className="card">
        <p className="lead" style={{ margin: 0 }}>
          &ldquo;Bienvenida a tu ritual. Hiciste algo que la mayoría no hace: darle a
          tu piel un método, no otra crema. Nos vemos dentro de la app, noche tras
          noche.&rdquo;
        </p>
        <p className="eyebrow" style={{ marginTop: 10 }}>— Dra. Mina Seo ✔</p>
      </div>

      <div className="center">
        <a
          className="btn"
          style={{ textDecoration: "none", textAlign: "center" }}
          href={APP_ACCESS_URL}
        >
          Acceder a mi app →
        </a>
        <p className="muted" style={{ marginTop: 12 }}>
          También te enviamos el acceso a tu email. Revisa tu bandeja de entrada (y
          el spam, por si acaso).
        </p>
      </div>

      <p className="fine-print">
        Los resultados pueden variar. Este material tiene carácter informativo y no
        sustituye la orientación médica. © Ritual Seúl 50+
      </p>

      <div className="spacer" />
    </main>
  );
}
