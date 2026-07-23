"use client";

import { useState } from "react";
import type { Resultado } from "@/lib/resultado";
import { AUDIO2_TEXTO, AUDIO2_SRC, AUDIO2_CAPS } from "@/lib/audios";
import { confettiGold, haptic, revealFx } from "@/lib/feedback";
import { AudioPlayer } from "./AudioPlayer";
import { Particles } from "./Particles";

// ÁUDIO 2, ativação / janela de resultado imersiva. Termina no CTA pra oferta.
export function Ativacao({
  resultado, nome, onCta,
}: {
  resultado: Resultado; nome: string; onCta: () => void;
}) {
  const [conectado, setConectado] = useState(false);
  const [tocando, setTocando] = useState(false);
  const [ouviu, setOuviu] = useState(false);

  function abrir() {
    revealFx();
    haptic([20, 40, 20]);
    setConectado(true);
  }

  return (
    <div className={`center step reveal immersive${tocando ? " ativo" : ""}`}>
      <Particles count={34} />
      <span className="alert-badge">⚠️ VENTANA DE ACTIVACIÓN ⚠️</span>
      <h1>
        {nome ? `${nome}, ` : ""}tu{" "}
        <span className="gold">{resultado.nome}</span> está lista para empezar esta noche.
      </h1>

      <div className="ativacao-circle">
        <div className={`aura${tocando ? " ativo" : ""}`} />
        <img loading="lazy" decoding="async" src="/placeholder.svg" alt="Ritual Seúl 50+" />
        <span className="ativacao-tag">Ginseng Rojo</span>
      </div>

      {!conectado ? (
        <>
          <button className="ritual-btn" onClick={abrir}>
            🔓 Toca para abrir tu ventana
          </button>
          <p className="muted ritual-hint">La ventana solo se abre si tocas con intención.</p>
        </>
      ) : (
        <>
          <p className="muted">🔊 Escucha lo que revela tu ventana de activación:</p>
          <AudioPlayer
            texto={AUDIO2_TEXTO}
            src={AUDIO2_SRC}
            captionsSrc={AUDIO2_CAPS}
            evento="audio2"
            autoStart
            onPlayingChange={setTocando}
            onEnd={() => { setOuviu(true); confettiGold(); }}
            introLabel="▶ Escucha tu activación"
            playingLabel={`🔊 Revelando tu ${resultado.nome}…`}
            doneLabel="✨ Tu ventana está abierta, toca el botón de abajo."
          />
          <div style={{ height: 14 }} />
          {ouviu ? (
            <>
              <button className="btn btn-pulse" onClick={onCta}>
                Ver mi ritual →
              </button>
              <p className="scarcity">⏳ Esta ventana queda abierta muy poco tiempo.</p>
            </>
          ) : (
            <p className="muted ritual-hint">🔒 Escucha la activación hasta el final para continuar…</p>
          )}
        </>
      )}
    </div>
  );
}
