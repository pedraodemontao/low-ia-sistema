"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { track } from "@/lib/pixel";

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
  const nome = params.get("nome") || "";
  const [recusou, setRecusou] = useState(false);
  const [seg, setSeg] = useState(5 * 60);

  useEffect(() => {
    track("ViewContent", { content_name: "upsell-leve-2" });
    const t = setInterval(() => setSeg((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  // DEMO: 1-click real é configurado na Cakto. Aqui só registra a intenção e fecha o funil.
  const aceitar = (item: string, value: number) => {
    track("InitiateCheckout", { content_name: item, value });
    router.push(`/obrigado?nome=${encodeURIComponent(nome)}`);
  };
  const irParaObrigado = () => router.push(`/obrigado?nome=${encodeURIComponent(nome)}`);

  const mm = String(Math.floor(seg / 60)).padStart(2, "0");
  const ss = String(seg % 60).padStart(2, "0");

  // DOWNSELL — só os bônus digitais premium (CMV zero, recupera o "não").
  if (recusou) {
    return (
      <main className="wrap">
        <div className="center">
          <span className="eyebrow">Última chance</span>
          <h1>
            Espera, {nome || "antes de sair"}. Leva ao menos a parte que{" "}
            <span className="gold">faz toda a diferença</span>.
          </h1>
          <p className="lead">
            Tudo bem não querer o segundo aparelho. Mas não saia sem o material
            que ensina a aproveitar o seu de verdade, é o que separa quem usa
            uma vez de quem transforma num ritual.
          </p>
        </div>

        <div className="card">
          <p className="muted" style={{ marginBottom: 8 }}>Versão reduzida, só agora:</p>
          <ul className="stack">
            <li>✅ Guia avançado <strong>“21 Noites”</strong> em versão completa</li>
            <li>✅ Pacote extra de áudios de relaxamento e aquecimento</li>
            <li>🛡️ Mesma garantia de 30 dias</li>
          </ul>
        </div>

        <div className="center">
          <p className="muted">de <s>R$ 67,00</s> por apenas</p>
          <div className="price">R$ 27,00</div>
          <button className="btn" onClick={() => aceitar("downsell-bonus-digital", 27)}>
            Sim, quero o material completo →
          </button>
          <p className="muted" style={{ marginTop: 14 }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); irParaObrigado(); }}
              style={{ color: "var(--muted)", textDecoration: "underline" }}
            >
              Não, quero finalizar assim mesmo
            </a>
          </p>
        </div>

        <div className="spacer" />
      </main>
    );
  }

  // UPSELL — "Leve 2": um pra você, um pra presentear / pro casal.
  return (
    <main className="wrap">
      <div className="center">
        <span className="eyebrow">⏳ Oferta única, não aparece de novo</span>
        <h1>
          {nome ? `${nome}, ` : ""}leve <span className="gold">o segundo</span> com
          quase metade do preço, um pra você, um pra presentear.
        </h1>
        <p className="lead">
          A maioria das nossas clientes volta dias depois querendo um segundo,
          pra dar de presente a uma amiga ou pra ter junto do parceiro. Só que
          aí já é preço cheio. <strong>Agora, não.</strong> Adicione o segundo
          Acalanto por uma fração do valor e nunca mais passe por essa conversa.
        </p>
        <img loading="lazy" decoding="async" className="hero-img" src="/hero.png" alt="Acalanto" style={{ maxWidth: 260, margin: "18px auto" }} />
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Adicione agora ao seu pedido:</p>
        <ul className="stack">
          <li>✅ Um <strong>segundo Acalanto</strong> completo (Ritual Dois Tempos + à prova d’água)</li>
          <li>✅ Mesma <strong>entrega discreta</strong>, no mesmo frete</li>
          <li>🎁 Embalagem de presente opcional, se for pra dar de presente</li>
          <li>🛡️ Garantia de 30 dias também no segundo</li>
        </ul>
      </div>

      <div className="center">
        <p className="muted">um segundo aparelho por menos que metade do preço de hoje</p>
        <div className="price">+ R$ 157,00</div>
        <p className="scarcity">
          ⏳ Esta condição some em <span className="timer">{mm}:{ss}</span> e não volta
        </p>
        <button className="btn" onClick={() => aceitar("upsell-leve-2", 157)}>
          Sim! Quero o segundo com desconto →
        </button>
        <p className="muted" style={{ marginTop: 14 }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setRecusou(true); }}
            style={{ color: "var(--muted)", textDecoration: "underline" }}
          >
            Não quero o segundo agora
          </a>
        </p>
      </div>

      <div className="spacer" />
    </main>
  );
}
