"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UpsellPage() {
  return (
    <Suspense fallback={<main className="wrap" />}>
      <Upsell />
    </Suspense>
  );
}

function Upsell() {
  const router = useRouter();
  const params = useSearchParams();
  const resultado = params.get("resultado") || "seu resultado";
  const nome = params.get("nome") || "";
  const [recusou, setRecusou] = useState(false);
  const [seg, setSeg] = useState(5 * 60);

  // DEMO: 1-click real pendente. Qualquer escolha fecha o funil na página de obrigado.
  const irParaObrigado = () =>
    router.push(`/obrigado?resultado=${encodeURIComponent(resultado)}&nome=${encodeURIComponent(nome)}`);

  useEffect(() => {
    const t = setInterval(() => setSeg((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seg / 60)).padStart(2, "0");
  const ss = String(seg % 60).padStart(2, "0");

  if (recusou) {
    return (
      <main className="wrap">
        <div className="center">
          <span className="eyebrow">Última chance</span>
          <h1>
            Espera, {nome || "antes de sair"}. [Downsell — reforce o que ela perde
            com <span className="gold">{resultado}</span>.]
          </h1>
          <p className="lead">
            [Lead do downsell — versão reduzida da oferta anterior por um preço menor.]
          </p>
        </div>

        <div className="card">
          <p className="muted" style={{ marginBottom: 8 }}>Versão reduzida, só hoje:</p>
          <ul className="stack">
            <li>✅ [entregável reduzido]</li>
            <li>🛡️ Mesma garantia de [X] dias</li>
          </ul>
        </div>

        <div className="center">
          <p className="muted">de <s>R$ [de]</s> por apenas</p>
          <div className="price">R$ [preço do downsell]</div>
          <button
            className="btn"
            onClick={irParaObrigado}
          >
            [CTA de aceite do downsell] →
          </button>
          <p className="muted" style={{ marginTop: 14 }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); irParaObrigado(); }}
              style={{ color: "var(--muted)", textDecoration: "underline" }}
            >
              [link de recusa]
            </a>
          </p>
        </div>

        <div className="spacer" />
      </main>
    );
  }

  return (
    <main className="wrap">
      <div className="center">
        <span className="eyebrow">⏳ Oferta única, não aparece de novo</span>
        <h1>
          {nome ? `${nome}, ` : ""}<span className="gold">{resultado}</span> [gancho
          do upsell — por que a oferta principal não basta sozinha].
        </h1>
        <p className="lead">
          [Lead do upsell — a versão ampliada/contínua do que ela acabou de comprar.]
        </p>
        <img loading="lazy" decoding="async" className="hero-img" src="/placeholder.svg" alt="[imagem do upsell]" style={{ maxWidth: 220, margin: "18px auto" }} />
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Adicione agora:</p>
        <ul className="stack">
          <li>✅ <strong>[entregável principal do upsell]</strong></li>
          <li>✅ <strong>[entregável recorrente]</strong></li>
          <li>✅ [entregável complementar]</li>
          <li>🎁 Bônus: [bônus do upsell]</li>
          <li>🛡️ Garantia [X] dias: [condição]</li>
        </ul>
      </div>

      <div className="center">
        <p className="muted">[âncora de valor — ex: por menos que um lanche]</p>
        <div className="price">R$ [preço do upsell]</div>
        <p className="scarcity">
          ⏳ Esta condição some em <span className="timer">{mm}:{ss}</span> e não volta
        </p>
        <button
          className="btn"
          onClick={irParaObrigado}
        >
          [CTA de aceite do upsell] →
        </button>
        <p className="muted" style={{ marginTop: 14 }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setRecusou(true); }}
            style={{ color: "var(--muted)", textDecoration: "underline" }}
          >
            [link de recusa]
          </a>
        </p>
      </div>

      <div className="spacer" />
    </main>
  );
}
