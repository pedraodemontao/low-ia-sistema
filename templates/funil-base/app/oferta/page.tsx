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
  const resultado = params.get("resultado") || "seu resultado";
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
        <span className="eyebrow">[nome do produto/entregável]</span>
        <h1>
          {nome ? `${nome}, ` : ""}seu resultado é{" "}
          <span className="gold">{resultado}</span>. [Promessa — o que ele revela e o próximo passo.]
        </h1>
        <p className="lead">
          [Lead da oferta — descreva o que a pessoa recebe e por que importa agora.]
        </p>
        <img loading="lazy" decoding="async" className="hero-img" src="/placeholder.svg" alt="[mockup do seu produto]" />
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Você recebe hoje:</p>
        <ul className="stack">
          <li>✅ [entregável principal]</li>
          <li>✅ [entregável secundário]</li>
          <li>🎁 Bônus: [bônus 1]</li>
          <li>🎁 Bônus: [bônus 2]</li>
          <li>🛡️ Garantia [X] dias: [condição da garantia]</li>
        </ul>
      </div>

      <div className="center">
        <p className="muted">de <s>R$ [de]</s> por apenas</p>
        <div className="price">R$ [preço]</div>
        <p className="scarcity">
          ⏳ Esta página sai do ar em <span className="timer">{mm}:{ss}</span>
        </p>
        <button className="btn" onClick={comprar}>
          [CTA de compra] →
        </button>
        <p className="muted" style={{ marginTop: 12 }}>
          Pagamento seguro · acesso imediato por e-mail
        </p>
      </div>

      <div className="spacer" />
    </main>
  );
}
