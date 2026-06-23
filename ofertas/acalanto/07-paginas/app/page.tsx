"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/pixel";
import { SocialProof } from "@/components/quiz/SocialProof";

// Advertorial / native — porta de entrada do funil Acalanto.
// Ângulo maduro (mulher 50/60+): reconexão íntima, tom discreto e digno.
// CTA leva pra /oferta (LP + checkout Cakto). Sem quiz.

const CTA = "Ver o Acalanto e a condição de hoje →";

export default function Advertorial() {
  const router = useRouter();

  useEffect(() => {
    track("ViewContent", { content_name: "advertorial-acalanto" });
  }, []);

  function irParaOferta() {
    track("InitiateCheckout", { content_name: "acalanto", source: "advertorial" });
    router.push("/oferta");
  }

  return (
    <main className="wrap">
      <article className="article">
        <span className="eyebrow">HISTÓRIA REAL · BEM-ESTAR FEMININO</span>
        <h1>
          Aos 58 anos, eu achei que essa parte da minha vida tinha{" "}
          <span className="gold">acabado</span>. Eu estava enganada.
        </h1>
        <p className="byline">
          Por Ana L. · relato enviado à nossa redação · leitura de 2 minutos
        </p>

        <img
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="hero-img"
          src="/hero.png"
          alt="Acalanto"
        />

        <p>
          Quando o Carlos partiu, eu fiz as pazes com a ideia de que certas
          coisas não voltariam. Não é algo que a gente conversa no almoço de
          domingo. Mas existe um tipo de solidão que não é sobre estar sozinha
          na sala, é sobre o corpo esquecer que um dia também foi <em>seu</em>.
        </p>

        <p>
          Eu não estava procurando substituir ninguém. <strong>Não é sobre
          substituir.</strong> É sobre lembrar que eu ainda estou aqui, viva,
          inteira, e que cuidar de mim não tem idade pra começar nem hora pra
          acabar.
        </p>

        <p>
          Foi uma amiga, mais nova, que me falou de um jeito sem rodeios. Disse
          que não era nada do que eu estava imaginando, sem aquela cara de loja
          de coisas estranhas. Era discreto. Chegava numa caixa sem nada escrito
          por fora. E era, nas palavras dela, <em>“pra mulher que já sabe o que
          quer e não tem mais tempo a perder com vergonha”</em>.
        </p>

        <h2>O que mudou o jogo pra mim</h2>

        <p>
          Chama <strong>Acalanto</strong>. O nome já dizia muito, não tem nada de
          agressivo. O que me convenceu foi a simplicidade: ele tem dois tempos.
          Um modo suave, pra começar devagar, no seu ritmo. E um segundo, mais
          intenso, pra quando o corpo pede. Eles chamam isso de{" "}
          <strong>Ritual Dois Tempos</strong>. E como é à prova d’água, o banho
          virou o meu momento, de porta fechada, sem pressa, só meu.
        </p>

        <blockquote>
          “Eu não esperava me sentir tão eu de novo. Demorei anos pra descobrir
          uma coisa tão simples.” — Roseli M., 61 anos
        </blockquote>

        <p>
          Demorei a contar isso pra alguém. Hoje conto sem peso, porque sei que
          tem muita mulher da minha idade lendo isto e pensando exatamente o que
          eu pensava: <em>“será que ainda é pra mim?”</em>. É sim. Sempre foi.
        </p>

        <p>
          Quem fabrica deixou uma condição especial pra quem chega por aqui, com
          o material de apoio incluso (um guia que, sinceramente, devia vir com
          tudo na vida). Vou deixar o caminho abaixo. Faça por você.
        </p>

        <button className="btn" onClick={irParaOferta}>
          {CTA}
        </button>
        <p className="muted center">
          Entrega 100% discreta · garantia de 30 dias · pagamento seguro
        </p>
      </article>

      <div className="spacer" />
      <SocialProof />
    </main>
  );
}
