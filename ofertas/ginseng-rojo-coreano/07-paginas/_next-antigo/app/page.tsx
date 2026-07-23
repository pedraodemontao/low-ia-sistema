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

// FLUXO FIEL AO MODELO (koreanskin): capa → quiz → loading → /oferta (página de vendas/VSL).
// SEM ritual de áudio no quiz. As fases `leitura`/`ativacao` (ÁUDIO 1/2) do funil-base foram
// removidas — o alvo não usa áudio no quiz. Narração/VSL vive na página de vendas (/oferta).
type Fase = "capa" | "quiz" | "loading";

const HEADLINE = "Test de Piel Coreano — Diagnóstico Gratis de 1 Minuto";
const SUB = "Descubre si el Pegamento Rojo Coreano de la Dra. Mina Seo puede firmar tu piel — y recibe tu fórmula personalizada.";

const TOTAL_PASSOS = STEPS.length;

type Respostas = Partial<Record<StepKey, string | number>>;

export default function Funil() {
  const router = useRouter();
  const [fase, setFase] = useState<Fase>("capa");
  const [passo, setPasso] = useState(0);

  // Deep-link de preview (?f=quiz&p=3 / ?f=loading), só pra capturar telas.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const f = q.get("f");
    if (f === "quiz") { setFase("quiz"); setPasso(Number(q.get("p") || 0)); }
    else if (f === "loading") { setFase("loading"); }
  }, []);

  const [respostas, setRespostas] = useState<Respostas>({});
  const [nome, setNome] = useState("");

  const molestia = String(respostas.molestia ?? "");
  const resultado = useMemo(() => calcResultado(molestia), [molestia]);

  const config = STEPS[passo];

  function avancar() {
    setPasso((p) => Math.min(TOTAL_PASSOS - 1, p + 1));
  }
  function voltar() {
    if (passo === 0) setFase("capa");
    else setPasso((p) => p - 1);
  }
  const [reacao, setReacao] = useState<string | null>(null);
  const REACAO_STEPS = new Set<StepKey>(["molestia", "cambio"]);

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
    if (typeof window !== "undefined") {
      localStorage.setItem("lead", JSON.stringify({ nome, ...respostas }));
    }
    track("Lead", { nome });
    setFase("loading");
  }

  // Fim do "processando" → direto pra página de vendas (fiel ao modelo, sem áudio no meio).
  const irParaOferta = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resultado", JSON.stringify({ resultado, nome, ...respostas }));
    }
    track("InitiateCheckout", { resultado: resultado.nome });
    router.push(`/oferta?resultado=${encodeURIComponent(resultado.nome)}&nome=${encodeURIComponent(nome)}`);
  }, [resultado, nome, respostas, router]);

  return (
    <main className="wrap">
      <div className="flash" key={fase} />
      {fase === "capa" && (
        <div className="center capa">
          <Particles />
          <span className="alert-badge">⚠️ Solo hoy · cupos limitados ⚠️</span>
          <h1>
            Las coreanas de +50 no se operan… su secreto es el{" "}
            <span className="gold">pegamento rojo coreano</span>.
          </h1>
          <p className="lead">
            Responde el test gratis de 1 minuto y descubre tu fórmula personalizada
            con ginseng rojo — adaptada por la Dra. Mina Seo.
          </p>
          <button className="btn capa-cta" onClick={() => { track("QuizStart"); setFase("quiz"); setPasso(0); }}>
            Comenzar el test →
          </button>
          <p className="muted">Test de 1 minuto · gratis · anónimo</p>
          <img loading="eager" fetchPriority="high" decoding="async" className="hero-img capa-hero" src="/placeholder.svg" alt="Ritual Seúl 50+ — Pegamento Rojo Coreano" />
          <p className="social-proof">
            <b>+37.000 mujeres</b> ya descubrieron su fórmula.
          </p>
        </div>
      )}

      {fase === "quiz" && (
        <div>
          <div className="center">
            <span className="alert-badge">⚠️ Solo hoy · cupos limitados ⚠️</span>
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
              conexión con tu resultado: <b>{Math.round(((passo + 1) / TOTAL_PASSOS) * 100)}%</b>
            </div>
          </div>
          <div className="progress-wrap">
            <div className="progress-label">
              Paso {passo + 1} de {TOTAL_PASSOS}
              {passo + 1 >= TOTAL_PASSOS - 2 && <span className="milestone"> · 🔥 ¡Ya casi está!</span>}
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

          <button className="back-btn" onClick={voltar}>‹ Volver</button>
          <p className="privacy">🔒 Privacidad garantizada, tus respuestas son 100% anónimas.</p>
        </div>
      )}

      {fase === "loading" && <Loading msgs={LOADING_MSGS} onDone={irParaOferta} />}

      <div className="spacer" />
      {fase !== "loading" && <SocialProof />}
    </main>
  );
}
