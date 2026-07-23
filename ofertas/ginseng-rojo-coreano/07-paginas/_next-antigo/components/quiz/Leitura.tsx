"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Resultado } from "@/lib/resultado";
import { revealFx, confettiGold, haptic } from "@/lib/feedback";
import { AUDIO1_TEXTO, AUDIO1_SRC, AUDIO1_CAPS } from "@/lib/audios";
import { AudioPlayer } from "./AudioPlayer";
import { Particles } from "./Particles";

// ÁUDIO 1, revelação + ritual de conexão + leitura de conexão imersiva.
export function Leitura({
  resultado, nome, desafio, onContinuar,
}: {
  resultado: Resultado; nome: string; desafio?: string | number; onContinuar: () => void;
}) {
  const reduzido = useReducedMotion();
  const [conectado, setConectado] = useState(false);
  const [tocando, setTocando] = useState(false);
  const [ouviu, setOuviu] = useState(false);

  const partes = resultado.mensagem.split(". ");
  const primeira = partes[0] + (partes.length > 1 ? "." : "");

  function conectar() {
    if (!reduzido) revealFx(); else confettiGold();
    haptic([15, 30, 15]);
    setConectado(true);
  }

  return (
    <div className={`center step reveal immersive${tocando ? " ativo" : ""}`}>
      <Particles count={30} />
      <span className="eyebrow">Fórmula nº {resultado.numero}</span>
      <h1>
        {nome ? `${nome}, ` : ""}tu resultado es{" "}
        <span className="gold">{resultado.nome}</span>.
      </h1>

      <div className="reveal-avatar-wrap">
        <div className={`aura${tocando ? " ativo" : ""}`} />
        <img loading="lazy" decoding="async" className={`reveal-avatar${reduzido ? "" : " pop"}`} src="/placeholder.svg" alt={`Resultado ${resultado.nome}`} />
        <img loading="lazy" decoding="async" className={`reveal-selo${reduzido ? "" : " spin"}`} src="/placeholder.svg" alt="" aria-hidden />
      </div>

      <p className="lead">{primeira}</p>

      {!conectado ? (
        <>
          <button className="ritual-btn" onClick={conectar}>
            ✨ Toca para conocer tu {resultado.nome}
          </button>
          <p className="muted ritual-hint">Respira hondo y toca arriba para ver tu diagnóstico.</p>
        </>
      ) : (
        <>
          <p className="muted">🔊 Escucha el diagnóstico de tu piel:</p>
          <AudioPlayer
            texto={AUDIO1_TEXTO}
            src={AUDIO1_SRC}
            captionsSrc={AUDIO1_CAPS}
            evento="audio1"
            autoStart
            gateAtPct={35}
            onGate={() => setOuviu(true)}
            onPlayingChange={setTocando}
            onEnd={() => setOuviu(true)}
            introLabel={`▶ Escucha tu ${resultado.nome}`}
            playingLabel={`🔊 Revelando tu ${resultado.nome}…`}
            doneLabel="Diagnóstico inicial listo, continúa para recibir el resto."
          />
          <div style={{ height: 14 }} />
          {ouviu ? (
            <button className="btn btn-pulse" onClick={onContinuar}>Continuar mi diagnóstico →</button>
          ) : (
            <p className="muted ritual-hint">🔒 Escucha un poco del diagnóstico para continuar…</p>
          )}
        </>
      )}
    </div>
  );
}
