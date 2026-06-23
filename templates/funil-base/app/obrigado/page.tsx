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
  const resultado = params.get("resultado") || "seu seu resultado";

  return (
    <main className="wrap">
      <div className="center">
        <span className="eyebrow">Pagamento confirmado ✅</span>
        <h1>
          {nome ? `${nome}, ` : ""}sua porta de resultado com{" "}
          <span className="gold">{resultado}</span> está aberta.
        </h1>
        <p className="lead">
          Seu <strong>Mapa da Resultado</strong> e a oração que destrava o
          dinheiro já estão a caminho do seu e-mail. Abra ainda hoje, a hora
           do dinheiro de mais força é a que está no seu resultado.
        </p>
        <img loading="lazy" decoding="async" className="hero-img" src="/mockup-mapa.webp" alt="Mapa da Resultado" />
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Seus próximos passos:</p>
        <ul className="stack">
          <li>📩 Confira o e-mail (e a caixa de spam), chega em até 5 minutos</li>
          <li>🔊 Ouça a oração em áudio na sua hora ideal</li>
          <li>📅 Comece o Calendário dos 7 dias de resultado hoje</li>
        </ul>
      </div>

      <div className="center">
        <p className="muted">
          Dúvida ou não recebeu? Fale com a gente no WhatsApp do rodapé do e-mail.
        </p>
      </div>

      <div className="spacer" />
    </main>
  );
}
