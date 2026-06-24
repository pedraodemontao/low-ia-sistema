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
  const resultado = params.get("resultado") || "seu resultado";

  return (
    <main className="wrap">
      <div className="center">
        <span className="eyebrow">Pagamento confirmado ✅</span>
        <h1>
          {nome ? `${nome}, ` : ""}[confirmação — o acesso/resultado com{" "}
          <span className="gold">{resultado}</span> está liberado].
        </h1>
        <p className="lead">
          [Mensagem de obrigado — o que ela recebe, onde e o que fazer agora.]
        </p>
        <img loading="lazy" decoding="async" className="hero-img" src="/placeholder.svg" alt="[imagem do produto entregue]" />
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Seus próximos passos:</p>
        <ul className="stack">
          <li>📩 Confira o e-mail (e a caixa de spam), chega em até 5 minutos</li>
          <li>🔊 [próximo passo 2]</li>
          <li>📅 [próximo passo 3]</li>
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
