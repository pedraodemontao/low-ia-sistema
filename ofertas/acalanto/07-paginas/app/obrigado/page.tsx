"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function ObrigadoPage() {
  return (
    <Suspense fallback={<main className="wrap" />}>
      <Obrigado />
    </Suspense>
  );
}

function Obrigado() {
  const params = useSearchParams();
  const nome = params.get("nome") || "";

  return (
    <main className="wrap">
      <div className="center">
        <span className="eyebrow">Pedido confirmado ✅</span>
        <h1>
          {nome ? `${nome}, ` : ""}seu <span className="gold">Acalanto</span> já
          está sendo preparado.
        </h1>
        <p className="lead">
          Ele sai numa caixa <strong>100% discreta</strong>, sem nada escrito por
          fora. Seus bônus digitais (o guia <em>“21 Noites”</em> e os áudios) já
          estão a caminho do seu e-mail, abra ainda hoje.
        </p>
        <img loading="lazy" decoding="async" className="hero-img" src="/hero.png" alt="Acalanto" />
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Seus próximos passos:</p>
        <ul className="stack">
          <li>📩 Confira o e-mail (e a caixa de spam), os bônus chegam em até 5 minutos</li>
          <li>📦 Você recebe o código de rastreio assim que o pedido for postado</li>
          <li>🎧 Comece pelos áudios de aquecimento, no seu tempo, sem pressa</li>
        </ul>
      </div>

      <div className="center">
        <p className="muted">
          Qualquer dúvida sobre entrega? Fale com a gente no WhatsApp do rodapé
          do e-mail de confirmação.
        </p>
      </div>

      <div className="spacer" />
    </main>
  );
}
