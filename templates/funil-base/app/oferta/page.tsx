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
  const resultado = params.get("resultado") || "seu seu resultado";
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
        <span className="eyebrow">Mapa da Resultado</span>
        <h1>
          {nome ? `${nome}, ` : ""}seu resultado é{" "}
          <span className="gold">{resultado}</span>. Veja o que está travando o seu
          dinheiro, e como destravar.
        </h1>
        <p className="lead">
          Receba agora o seu Mapa da Resultado, qual bloqueio segura a sua
          renda, a oração que abre os caminhos financeiros e a hora certa de pedir.
        </p>
        <img loading="lazy" decoding="async" className="hero-img" src="/mockup-mapa.webp" alt="Mockup do Mapa da Resultado" />
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Você recebe hoje:</p>
        <ul className="stack">
          <li>✅ Mapa da Resultado do seu seu resultado (PDF personalizado)</li>
          <li>✅ Oração que <strong>destrava o dinheiro</strong> em áudio</li>
          <li>🎁 Bônus: Oração de Abertura de Caminhos Financeiros</li>
          <li>🎁 Bônus: Calendário dos 7 dias de resultado</li>
          <li>🛡️ Garantia 7 dias: não sentiu os caminhos se movendo, devolvemos 100%</li>
        </ul>
      </div>

      <div className="center">
        <p className="muted">de <s>R$ 97,00</s> por apenas</p>
        <div className="price">R$ 37,00</div>
        <p className="scarcity">
          ⏳ Esta página sai do ar em <span className="timer">{mm}:{ss}</span>
        </p>
        <button className="btn" onClick={comprar}>
          Quero destravar minha resultado →
        </button>
        <p className="muted" style={{ marginTop: 12 }}>
          Pagamento seguro · acesso imediato por e-mail
        </p>
      </div>

      <div className="spacer" />
    </main>
  );
}
