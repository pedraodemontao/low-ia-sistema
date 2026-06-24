"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { calcResultado } from "@/lib/resultado";
import { STEPS, LOADING_MSGS, REACOES, type StepKey } from "@/lib/quiz-data";
import { stepVariants } from "@/lib/anim";
import { selectFx } from "@/lib/feedback";
import { Particles } from "@/components/quiz/Particles";
import { SocialProof } from "@/components/quiz/SocialProof";
import { track } from "@/lib/pixel";

// Fases carregam sob demanda (capa fica leve → FCP/LCP mais rápido no mobile)
const Passo = dynamic(() => import("@/components/quiz/Passo").then((m) => m.Passo));
const Loading = dynamic(() => import("@/components/quiz/Loading").then((m) => m.Loading));
const Leitura = dynamic(() => import("@/components/quiz/Leitura").then((m) => m.Leitura));
const Ativacao = dynamic(() => import("@/components/quiz/Ativacao").then((m) => m.Ativacao));
const VSL = dynamic(() => import("@/components/quiz/VSL").then((m) => m.VSL));

type Fase = "capa" | "quiz" | "loading" | "leitura" | "email" | "ativacao" | "vsl";

const HEADLINE = "[Headline do quiz — a pergunta/promessa principal da sua oferta]";
const SUB = "[Subheadline — o que este teste de 30 segundos revela]";

const TOTAL_PASSOS = STEPS.length;

type Respostas = Partial<Record<StepKey, string | number>>;

export default function Funil() {
  const router = useRouter();
  const [fase, setFase] = useState<Fase>("capa");
  const [passo, setPasso] = useState(0);

  // Deep-link de preview (?f=quiz&p=3 / ?f=reveal), só pra capturar telas.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const f = q.get("f");
    if (f === "quiz") { setFase("quiz"); setPasso(Number(q.get("p") || 0)); }
    else if (f === "loading") { setFase("loading"); }
    else if (f === "leitura") { setFase("leitura"); }
    else if (f === "email") { setFase("email"); }
    else if (f === "ativacao") { setFase("ativacao"); }
    else if (f === "vsl") { setFase("vsl"); }
  }, []);

  const [respostas, setRespostas] = useState<Respostas>({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const mes = Number(respostas.mes || 1);
  const dia = Number(respostas.dia || 1);
  const resultado = useMemo(() => calcResultado(mes, dia), [mes, dia]);

  const config = STEPS[passo];

  function avancar() {
    setPasso((p) => Math.min(TOTAL_PASSOS - 1, p + 1));
  }
  function voltar() {
    if (passo === 0) setFase("capa");
    else setPasso((p) => p - 1);
  }
  const [reacao, setReacao] = useState<string | null>(null);
  const REACAO_STEPS = new Set<StepKey>(["sinal", "desafio"]);

  function selecionar(key: StepKey, v: string | number) {
    selectFx();
    setRespostas((r) => ({ ...r, [key]: v }));
    const msg = REACOES[String(v)];
    if (REACAO_STEPS.has(key) && msg) {
      setReacao(msg);
      setTimeout(() => { setReacao(null); avancar(); }, 1500);
    } else {
      avancar();
    }
  }

  function finalizarQuiz() {
    if (!nome.trim()) return;
    setFase("loading");
  }

  const aposLoading = useCallback(() => setFase("leitura"), []);

  function confirmarEmail() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    if (typeof window !== "undefined") {
      localStorage.setItem("lead", JSON.stringify({ nome, email, ...respostas }));
    }
    track("Lead", { nome });
    setFase("ativacao");
  }

  function irParaOferta() {
    if (typeof window !== "undefined") {
      localStorage.setItem("resultado", JSON.stringify({ resultado, nome, email, ...respostas }));
    }
    track("InitiateCheckout", { resultado: resultado.nome });
    router.push(`/oferta?resultado=${encodeURIComponent(resultado.nome)}&nome=${encodeURIComponent(nome)}`);
  }

  return (
    <main className="wrap">
      <div className="flash" key={fase} />
      {fase === "capa" && (
        <div className="center capa">
          <Particles />
          <span className="alert-badge">⚠️ [selo de alerta/urgência] ⚠️</span>
          <h1>
            [Hook da capa — abra com o problema. Destaque{" "}
            <span className="gold">[o mecanismo central]</span> em dourado.]
          </h1>
          <p className="lead">
            [Promessa do teste — o que ele revela e por que vale os 30 segundos.]
          </p>
          <button className="btn capa-cta" onClick={() => { track("QuizStart"); setFase("quiz"); setPasso(0); }}>
            Começar o teste →
          </button>
          <p className="muted">Teste de 30 segundos · gratuito · anônimo</p>
          <img loading="eager" fetchPriority="high" decoding="async" className="hero-img capa-hero" src="/placeholder.svg" alt="[imagem da sua oferta]" />
          <p className="social-proof">
            <b>[prova social]</b> [ex: +X pessoas já fizeram o teste].
          </p>
        </div>
      )}

      {fase === "quiz" && (
        <div>
          <div className="center">
            <span className="alert-badge">⚠️ [selo de alerta/urgência] ⚠️</span>
          </div>
          <div className="quiz-head">
            <h1>{HEADLINE}</h1>
            <p className="sub">{SUB}</p>
          </div>
          <div className="conexão">
            <div
              className="conexão-orb"
              style={{
                transform: `scale(${0.6 + 0.5 * ((passo + 1) / TOTAL_PASSOS)})`,
                opacity: 0.55 + 0.45 * ((passo + 1) / TOTAL_PASSOS),
              }}
            >
              ✦
            </div>
            <div className="conexão-label">
              conexão com seu resultado: <b>{Math.round(((passo + 1) / TOTAL_PASSOS) * 100)}%</b>
            </div>
          </div>
          <div className="progress-wrap">
            <div className="progress-label">
              Passo {passo + 1} de {TOTAL_PASSOS}
              {passo + 1 >= TOTAL_PASSOS - 2 && <span className="milestone"> · 🔥 Você está quase lá!</span>}
            </div>
            <div className="progress">
              <i style={{ width: `${((passo + 1) / TOTAL_PASSOS) * 100}%` }} />
            </div>
          </div>

          {reacao ? (
            <div className="step reacao-card">
              <div className="reacao-orb">✦</div>
              <p>{reacao}</p>
              <span className="reacao-cont">continuando…</span>
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={passo}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Passo
                  config={config}
                  value={respostas[config.key] ?? ""}
                  onSelect={(v) => selecionar(config.key, v)}
                  nome={nome}
                  onNome={setNome}
                  onSubmit={finalizarQuiz}
                />
              </motion.div>
            </AnimatePresence>
          )}

          <button className="back-btn" onClick={voltar}>‹ Voltar</button>
          <p className="privacy">🔒 Privacidade garantida, suas respostas são 100% anônimas.</p>
        </div>
      )}

      {fase === "loading" && <Loading msgs={LOADING_MSGS} onDone={aposLoading} />}

      {fase === "leitura" && (
        <Leitura
          resultado={resultado}
          nome={nome}
          desafio={respostas.desafio}
          onContinuar={() => setFase("email")}
        />
      )}

      {fase === "email" && (
        <div className="step">
          <p className="scarcity center">⚠️ [escassez — ex: a próxima etapa fica aberta por tempo curto].</p>
          <div className="center"><h2>Digite o seu e-mail para receber o restante do seu resultado</h2></div>
          <p className="muted center" style={{ marginBottom: 8 }}>
            [microcopy — por que pedir o e-mail aqui (ex: enviar o material completo).]
          </p>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && confirmarEmail()}
          />
          <div style={{ height: 12 }} />
          <button className="btn" onClick={confirmarEmail}>
            Ver o meu resultado →
          </button>
          <p className="privacy">🔒 Não enviamos spam. Seus dados são confidenciais.</p>
        </div>
      )}

      {fase === "ativacao" && (
        <Ativacao resultado={resultado} nome={nome} onCta={() => setFase("vsl")} />
      )}

      {fase === "vsl" && <VSL nome={nome} onCta={irParaOferta} />}

      <div className="spacer" />
      {fase !== "loading" && <SocialProof />}
    </main>
  );
}
