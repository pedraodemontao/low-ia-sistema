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
      <span className="alert-badge">⚠️ JANELA DE ATIVAÇÃO ⚠️</span>
      <h1>
        {nome ? `${nome}, ` : ""}[gancho da ativação com{" "}
        <span className="gold">{resultado.nome}</span> — o que está prestes a acontecer].
      </h1>

      <div className="ativacao-circle">
        <div className={`aura${tocando ? " ativo" : ""}`} />
        <img loading="lazy" decoding="async" src="/placeholder.svg" alt="[imagem da ativação]" />
        <span className="ativacao-tag">[etiqueta de destaque]</span>
      </div>

      {!conectado ? (
        <>
          <button className="ritual-btn" onClick={abrir}>
            🔓 Tocar o selo e abrir a minha janela
          </button>
          <p className="muted ritual-hint">A janela só responde a quem toca com intenção.</p>
        </>
      ) : (
        <>
          <p className="muted">🔊 Ouça o que a janela de ativação revela:</p>
          <AudioPlayer
            texto={AUDIO2_TEXTO}
            src={AUDIO2_SRC}
            captionsSrc={AUDIO2_CAPS}
            evento="audio2"
            autoStart
            onPlayingChange={setTocando}
            onEnd={() => { setOuviu(true); confettiGold(); }}
            introLabel="▶ Ouça a sua ativação"
            playingLabel={`🔊 ${resultado.nome} está revelando a sua janela…`}
            doneLabel="✨ A sua janela está aberta, toque no botão abaixo."
          />
          <div style={{ height: 14 }} />
          {ouviu ? (
            <>
              <button className="btn btn-pulse" onClick={onCta}>
                [CTA para a oferta] →
              </button>
              <p className="scarcity">⏳ Esta janela fica aberta por tempo curtíssimo.</p>
            </>
          ) : (
            <p className="muted ritual-hint">🔒 Ouça a ativação até o fim para continuar…</p>
          )}
        </>
      )}
    </div>
  );
}
