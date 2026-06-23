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
  const resultado = params.get("resultado") || "seu seu resultado";
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
            Espera, {nome || "antes de sair"}. Não deixe a porta do seu dinheiro
            fechar com <span className="gold">{resultado}</span>.
          </h1>
          <p className="lead">
            Você destravou o bloqueio de hoje. Mas o dinheiro tem uma brecha
            <strong> nova a cada dia</strong>, e sem o lembrete certo você perde a
            abertura e volta pro aperto amanhã.
          </p>
        </div>

        <div className="card">
          <p className="muted" style={{ marginBottom: 8 }}>Versão reduzida, só hoje:</p>
          <ul className="stack">
            <li>✅ Mensagem diária de resultado do seu resultado por <strong>3 meses</strong></li>
            <li>🛡️ Mesma garantia de 7 dias</li>
          </ul>
        </div>

        <div className="center">
          <p className="muted">de <s>R$ 39,00</s> por apenas</p>
          <div className="price">R$ 14,00</div>
          <button
            className="btn"
            onClick={irParaObrigado}
          >
            Sim, quero o lembrete que abre meu dinheiro →
          </button>
          <p className="muted" style={{ marginTop: 14 }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); irParaObrigado(); }}
              style={{ color: "var(--muted)", textDecoration: "underline" }}
            >
              Não, prefiro deixar o dinheiro travado
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
          {nome ? `${nome}, ` : ""}<span className="gold">{resultado}</span> não
          destrava o seu dinheiro só hoje. Ele tem uma abertura pra cada mês do
          seu ano.
        </h1>
        <p className="lead">
          O Mapa destravou o bloqueio de <strong>agora</strong>. Mas as
          oportunidades de dinheiro, os meses de ganho e as ciladas mudam o ano
          todo, e seu resultado tem o movimento certo pra cada um. Sem isso, você vê o
          dinheiro passar sempre tarde demais.
        </p>
        <img loading="lazy" decoding="async" className="hero-img" src="/selo-resultado.webp" alt="Selo do seu resultado" style={{ maxWidth: 220, margin: "18px auto" }} />
      </div>

      <div className="card">
        <p className="muted" style={{ marginBottom: 8 }}>Adicione agora ao seu Mapa:</p>
        <ul className="stack">
          <li>✅ <strong>Leitura financeira do seu ano</strong>, mês a mês, onde {resultado} abre dinheiro pra você</li>
          <li>✅ <strong>Mensagem diária de resultado</strong> por 12 meses (no WhatsApp/e-mail)</li>
          <li>✅ Os meses de <strong>ganho</strong> e os meses de <strong>cuidado com dinheiro</strong> marcados</li>
          <li>🎁 Bônus: orações de abertura financeira para cada estação do ano</li>
          <li>🛡️ Garantia 7 dias: não sentiu diferença, devolvemos 100%</li>
        </ul>
      </div>

      <div className="center">
        <p className="muted">um ano inteiro de resultado guiada por menos que um lanche</p>
        <div className="price">R$ 39,00</div>
        <p className="scarcity">
          ⏳ Esta condição some em <span className="timer">{mm}:{ss}</span> e não volta
        </p>
        <button
          className="btn"
          onClick={irParaObrigado}
        >
          Sim! Quero meu resultado abrindo meu dinheiro o ano todo →
        </button>
        <p className="muted" style={{ marginTop: 14 }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setRecusou(true); }}
            style={{ color: "var(--muted)", textDecoration: "underline" }}
          >
            Não quero abrir meu dinheiro o ano todo, prefiro arriscar sozinho
          </a>
        </p>
      </div>

      <div className="spacer" />
    </main>
  );
}
