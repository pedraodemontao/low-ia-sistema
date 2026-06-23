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
      <span className="eyebrow">Resultado nº {resultado.numero} de 72</span>
      <h1>
        {nome ? `${nome}, ` : ""}seu seu resultado é{" "}
        <span className="gold">{resultado.nome}</span>.
      </h1>

      <div className="reveal-avatar-wrap">
        <div className={`aura${tocando ? " ativo" : ""}`} />
        <img loading="lazy" decoding="async" className={`reveal-avatar${reduzido ? "" : " pop"}`} src="/hero.webp" alt={`Resultado ${resultado.nome}`} />
        <img loading="lazy" decoding="async" className={`reveal-selo${reduzido ? "" : " spin"}`} src="/selo-resultado.webp" alt="" aria-hidden />
      </div>

      <p className="lead">{primeira}</p>

      {!conectado ? (
        <>
          <button className="ritual-btn" onClick={conectar}>
            ✨ Toque para se conectar com {resultado.nome}
          </button>
          <p className="muted ritual-hint">Coloque a mão sobre o peito, respire fundo e toque acima.</p>
        </>
      ) : (
        <>
          <p className="muted">🔊 Ouça a leitura de conexão do seu resultado:</p>
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
            introLabel={`▶ Ouça a leitura de ${resultado.nome} sobre o seu dinheiro`}
            playingLabel={`🔊 ${resultado.nome} está revelando a sua conexão…`}
            doneLabel="Leitura inicial concluída, continue para receber o resto."
          />
          <div style={{ height: 14 }} />
          {ouviu ? (
            <button className="btn btn-pulse" onClick={onContinuar}>Continuar a minha leitura →</button>
          ) : (
            <p className="muted ritual-hint">🔒 Ouça um pouco da leitura para continuar…</p>
          )}
        </>
      )}
    </div>
  );
}
