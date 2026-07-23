"use client";

import { ReactNode, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { track, type PixelEvent } from "@/lib/pixel";
import { isCheckoutPlaceholder } from "@/lib/checkout";

// Página-padrão da esteira (upsell/downsell). Copy aprovada em site/*.html,
// portada pro padrão visual do app (globals.css, dark vermelho-ginseng).
// Enquanto o link Hotmart for placeholder, ACEITAR navega direto pro próximo
// passo (demo). Com link real, ACEITAR abre o checkout 1-click da Hotmart
// (configurar lá o redirect pós-compra pra acceptPath).

export type OfferStepProps = {
  kicker: string;
  urgent?: boolean; // downsell: badge vermelho pulsando no lugar do eyebrow
  headline: ReactNode;
  vslCaption: string;
  lead: ReactNode;
  includesTitle: string;
  includes: ReactNode[];
  anchor: string; // ex.: "US$47"
  price: string; // ex.: "US$19"
  ctaLabel: string;
  refuseLabel: string;
  timerSeconds: number;
  timerLabel: string;
  checkoutUrl: string; // CHECKOUT_LINKS.* (placeholder HOTMART_LINK_*)
  acceptPath: string; // próxima rota ao aceitar
  refusePath: string; // próxima rota ao recusar
  acceptEvent: PixelEvent;
  refuseEvent: PixelEvent;
  guarantee: ReactNode;
};

export function OfferStep(props: OfferStepProps) {
  return (
    <Suspense fallback={<main className="wrap" />}>
      <OfferStepInner {...props} />
    </Suspense>
  );
}

function OfferStepInner(props: OfferStepProps) {
  const router = useRouter();
  const params = useSearchParams();
  const resultado = params.get("resultado") || "tu fórmula";
  const nome = params.get("nome") || "";
  const [seg, setSeg] = useState(props.timerSeconds);

  useEffect(() => {
    const t = setInterval(() => setSeg((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seg / 60)).padStart(2, "0");
  const ss = String(seg % 60).padStart(2, "0");

  const withParams = (path: string) =>
    `${path}?resultado=${encodeURIComponent(resultado)}&nome=${encodeURIComponent(nome)}`;

  function aceitar() {
    track(props.acceptEvent, { price: props.price });
    if (isCheckoutPlaceholder(props.checkoutUrl)) {
      router.push(withParams(props.acceptPath));
    } else {
      window.location.href = props.checkoutUrl;
    }
  }

  function recusar() {
    track(props.refuseEvent);
    router.push(withParams(props.refusePath));
  }

  return (
    <main className="wrap">
      <div className="center">
        {props.urgent ? (
          <span className="alert-badge">{props.kicker}</span>
        ) : (
          <span className="eyebrow">{props.kicker}</span>
        )}
        <h1>{props.headline}</h1>
        <p className="scarcity">
          ⏳ {props.timerLabel} <span className="timer">{mm}:{ss}</span>
        </p>
      </div>

      <div className="vsl-box" role="img" aria-label="Video de la oferta">
        <div className="play">▶</div>
        <div className="lab">[ VSL · placeholder ]</div>
      </div>
      <p className="vsl-cap">{props.vslCaption}</p>

      <div className="center">
        <p className="lead">{props.lead}</p>
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>{props.includesTitle}:</p>
        <ul className="stack">
          {props.includes.map((item, i) => (
            <li key={i}>✅ {item}</li>
          ))}
        </ul>
      </div>

      <div className="center">
        <p className="muted price-anchor">De <s>{props.anchor}</s> — hoy, solo por</p>
        <div className="price">{props.price}</div>
        <p className="muted" style={{ marginBottom: 14 }}>
          pago único · acceso inmediato en la app
        </p>
        <button className="btn" onClick={aceitar}>{props.ctaLabel}</button>
        <p className="muted" style={{ marginTop: 8 }}>
          🛡️ Garantía de 60 días · Compra segura · 1 clic, sin volver a cargar la tarjeta
        </p>
        <p style={{ marginTop: 14 }}>
          <a
            href="#"
            className="refuse-link"
            onClick={(e) => { e.preventDefault(); recusar(); }}
          >
            {props.refuseLabel}
          </a>
        </p>
      </div>

      <div className="card center">
        <div style={{ fontSize: 34, marginBottom: 6 }}>🛡️</div>
        <p className="muted" style={{ marginBottom: 6, fontWeight: 800, color: "var(--text)" }}>
          Garantía de 60 días
        </p>
        <p className="muted" style={{ margin: 0 }}>{props.guarantee}</p>
      </div>

      <p className="fine-print">
        Los resultados pueden variar. Este material tiene carácter informativo y no
        sustituye la orientación médica. © Ritual Seúl 50+
      </p>

      <div className="spacer" />
    </main>
  );
}
