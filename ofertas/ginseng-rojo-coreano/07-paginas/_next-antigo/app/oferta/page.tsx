"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { irParaCheckout } from "@/lib/checkout";
import { track } from "@/lib/pixel";

export default function OfertaPage() {
  return (
    <Suspense fallback={<main className="wrap" />}>
      <Oferta />
    </Suspense>
  );
}

function Oferta() {
  const params = useSearchParams();
  const resultado = params.get("resultado") || "tu fórmula";
  const nome = params.get("nome") || "";
  const [seg, setSeg] = useState(15 * 60);

  useEffect(() => {
    const t = setInterval(() => setSeg((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seg / 60)).padStart(2, "0");
  const ss = String(seg % 60).padStart(2, "0");

  function comprar() {
    let email = "";
    if (typeof window !== "undefined") {
      try { email = JSON.parse(localStorage.getItem("lead") || "{}").email || ""; } catch {}
    }
    track("InitiateCheckout", { resultado });
    irParaCheckout({ name: nome, email });
  }

  return (
    <main className="wrap">
      <div className="center">
        <span className="eyebrow">El Ritual del Pegamento Rojo Coreano</span>
        <h1>
          {nome ? `${nome}, ` : ""}tu piel sí puede volver a verse firme — con{" "}
          <span className="gold">{resultado}</span> y el ritual coreano de 2 minutos.
        </h1>
        <p className="lead">
          El ginseng rojo — usado hace siglos en Corea — sella y levanta la piel y
          repone colágeno. La Dra. Mina Seo lo adaptó para ti en un ritual nocturno
          de 2 minutos: en casa, sin bótox y sin cremas de cientos de dólares.
        </p>
        <img loading="lazy" decoding="async" className="hero-img" src="/placeholder.svg" alt="Ritual Seúl 50+ — Pegamento Rojo Coreano" />
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Por qué funciona para ti:</p>
        <ul className="stack">
          <li>✓ Ritual coreano de <strong>2 minutos</strong> cada noche — en casa, sin aparatos.</li>
          <li>✓ Con <strong>ginseng rojo</strong>, lo que las coreanas de +50 usan hace siglos.</li>
          <li>✓ <strong>Tu fórmula personalizada</strong> según tu test de piel.</li>
          <li>✓ Sin bótox, sin agujas, sin cremas de cientos de dólares.</li>
          <li>✓ Acceso <strong>inmediato y 100% digital</strong> en la app.</li>
          <li>✓ <strong>Garantía total de 60 días.</strong></li>
        </ul>
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Recibes hoy:</p>
        <ul className="stack">
          <li>✅ La receta personalizada del Pegamento Rojo Coreano</li>
          <li>✅ Auto-masaje facial coreano de 3 dedos (video paso a paso)</li>
          <li>✅ Cronograma de 21 noches con recalibración semanal</li>
          <li>🎁 Bono: <em>Piel de Cristal en 7 noches</em></li>
          <li>🎁 Bono: <em>Mapa Coreano Anti-Papada</em></li>
          <li>🎁 Bono: <em>Sueño de Seúl</em></li>
          <li>🛡️ Garantía total de 60 días — o te devolvemos tu dinero.</li>
        </ul>
      </div>

      <div className="center">
        <p className="muted">Una consulta estética cuesta cientos de dólares. Hoy, todo el ritual por:</p>
        <div className="price">US$10</div>
        <p className="scarcity">
          ⏳ Esta página sale del aire en <span className="timer">{mm}:{ss}</span>
        </p>
        <button className="btn" onClick={comprar}>
          SÍ, QUIERO MI RITUAL POR US$10 →
        </button>
        <p className="muted" style={{ marginTop: 12 }}>
          Pago seguro · acceso inmediato · garantía de 60 días
        </p>
      </div>

      <div className="spacer" />
    </main>
  );
}
