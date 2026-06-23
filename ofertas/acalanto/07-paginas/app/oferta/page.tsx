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
  const nome = params.get("nome") || "";
  const [seg, setSeg] = useState(15 * 60);

  useEffect(() => {
    track("ViewContent", { content_name: "lp-acalanto" });
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
    track("InitiateCheckout", { content_name: "acalanto", value: 197 });
    // Order bump (lubrificante +R$39) é configurado DENTRO da Cakto, 1-clique no checkout.
    irParaCheckout({ name: nome, email });
  }

  return (
    <main className="wrap">
      <div className="center">
        <span className="eyebrow">Acalanto · Ritual Dois Tempos</span>
        <h1>
          {nome ? `${nome}, ` : ""}volte a sentir, no seu tempo, do seu jeito,{" "}
          <span className="gold">sem depender de ninguém</span>.
        </h1>
        <p className="lead">
          O Acalanto tem dois tempos, um suave pra começar devagar e um mais
          intenso pra quando o corpo pede. À prova d’água, discreto, e seu desde
          o primeiro dia. Cuidar de você não tem idade pra acabar.
        </p>
        <img loading="lazy" decoding="async" className="hero-img" src="/hero.png" alt="Acalanto" />
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Você recebe hoje:</p>
        <ul className="stack">
          <li>✅ <strong>Acalanto</strong> — aparelho com o Ritual Dois Tempos (modo suave + modo intenso)</li>
          <li>✅ À prova d’água — pra usar até no banho, com total privacidade</li>
          <li>🎁 Bônus: guia digital <strong>“21 Noites: redescobrir o prazer depois dos 50”</strong></li>
          <li>🎁 Bônus: áudios de aquecimento e relaxamento (só seus, no fone)</li>
          <li>📦 Entrega <strong>100% discreta</strong> — caixa sem nada escrito por fora</li>
          <li>🛡️ Garantia de <strong>30 dias</strong>: não foi pra você, devolvemos 100%</li>
        </ul>
      </div>

      <div className="center">
        <p className="muted">de <s>R$ 480,00</s> por apenas</p>
        <div className="price">R$ 197,00</div>
        <p className="muted">ou parcelado no cartão · Pix com aprovação na hora</p>
        <p className="scarcity">
          ⏳ A condição de hoje sai do ar em <span className="timer">{mm}:{ss}</span>
        </p>
        <button className="btn" onClick={comprar}>
          Quero o meu Acalanto →
        </button>
        <p className="muted" style={{ marginTop: 12 }}>
          🔒 Pagamento seguro · entrega discreta garantida
        </p>
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Mulheres que já fizeram por elas:</p>
        <ul className="stack">
          <li>💬 “Chegou rapidinho e numa caixa super discreta. Me senti eu de novo.” — Roseli M., 61</li>
          <li>💬 “Demorei pra criar coragem e me arrependo só de não ter feito antes.” — Clara S., 56</li>
          <li>💬 “O modo suave é perfeito pra quem nunca teve um. Recomendo, meninas.” — Larissa S., 52</li>
        </ul>
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Perguntas que toda mulher faz:</p>
        <ul className="stack">
          <li><strong>Vem discreto mesmo?</strong> Sim. Caixa neutra, sem marca nem descrição visível. Ninguém saberá o que é.</li>
          <li><strong>É difícil de usar?</strong> Não. Liga, escolhe o tempo (suave ou intenso) e pronto. Sem manual complicado.</li>
          <li><strong>E se não for pra mim?</strong> Você tem 30 dias. Não gostou, devolvemos 100% do valor.</li>
          <li><strong>Quanto tempo pra chegar?</strong> Em média de 5 a 12 dias úteis, com código de rastreio.</li>
        </ul>
      </div>

      <div className="center">
        <button className="btn" onClick={comprar}>
          Quero o meu Acalanto →
        </button>
        <p className="muted" style={{ marginTop: 12 }}>
          🛡️ 30 dias de garantia · 🔒 pagamento seguro · 📦 entrega discreta
        </p>
      </div>

      <div className="spacer" />
    </main>
  );
}
