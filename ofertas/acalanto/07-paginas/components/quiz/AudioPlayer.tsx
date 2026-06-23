"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Waveform } from "./Waveform";
import { track } from "@/lib/pixel";

type Word = { text: string; start: number; end: number };
type Line = { words: Word[]; start: number; end: number };

const POWER = /^(resultado|agora|novo|importante|atenção|segredo|chave)[.,!?:;]?$/i;

function chunkLines(words: Word[], n = 5): Line[] {
  const out: Line[] = [];
  for (let i = 0; i < words.length; i += n) {
    const g = words.slice(i, i + n);
    out.push({ words: g, start: g[0].start, end: g[g.length - 1].end });
  }
  return out;
}

// Player imersivo. `src` = arquivo de áudio; `captionsSrc` = json word-level (timestamps reais → karaokê 100% no time).
export function AudioPlayer({
  texto, src, captionsSrc, evento, introLabel, playingLabel, doneLabel, autoStart, onEnd, onPlayingChange, gateAtPct, onGate,
}: {
  texto: string;
  src?: string;
  captionsSrc?: string;
  evento: string;
  introLabel: string;
  playingLabel: string;
  doneLabel: string;
  autoStart?: boolean;
  onEnd?: () => void;
  onPlayingChange?: (tocando: boolean) => void;
  gateAtPct?: number; // libera o CTA quando o áudio atinge esse %, sem precisar do 100%
  onGate?: () => void;
}) {
  const [tocando, setTocando] = useState(false);
  const [prog, setProg] = useState(0);
  const [ouviu, setOuviu] = useState(false);
  const [tNow, setTNow] = useState(0);
  const [caps, setCaps] = useState<Word[] | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progRef = useRef(0);
  const marcosRef = useRef<Set<number>>(new Set());
  const gateRef = useRef(false);

  const lines = useMemo(() => (caps ? chunkLines(caps, 5) : []), [caps]);

  // carrega legenda com timestamps reais
  useEffect(() => {
    if (!captionsSrc) return;
    fetch(captionsSrc).then((r) => r.json()).then((d: Word[]) => setCaps(d)).catch(() => {});
  }, [captionsSrc]);

  function setTocandoX(v: boolean) { setTocando(v); onPlayingChange?.(v); }
  function limparTimer() { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } }
  function marcar(pct: number) {
    progRef.current = pct;
    for (const m of [25, 50, 75, 90]) {
      if (pct >= m && !marcosRef.current.has(m)) { marcosRef.current.add(m); track("AudioProgress", { audio: evento, pct: m }); }
    }
  }

  function parar(abandono = true) {
    limparTimer();
    if (audioRef.current) audioRef.current.pause();
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    if (abandono && progRef.current > 0 && progRef.current < 100) track("AudioAbandon", { audio: evento, pct: progRef.current });
    setTocandoX(false);
  }
  function encerrar() {
    limparTimer(); setProg(100); progRef.current = 100; setTocandoX(false); setOuviu(true);
    track("AudioComplete", { audio: evento }); onEnd?.();
  }

  function tocar() {
    setProg(0); progRef.current = 0; setOuviu(false); marcosRef.current.clear(); gateRef.current = false; setTocandoX(true);
    track("AudioPlay", { audio: evento });
    if (src && audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.playbackRate = 1.1; audioRef.current.play().catch(() => {}); return; }
    // fallback TTS (sem arquivo)
    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    const durMs = Math.max(8000, (texto.trim().split(/\s+/).length / 2.3) * 1000);
    const inicio = Date.now();
    limparTimer();
    timerRef.current = setInterval(() => { const f = (Date.now() - inicio) / durMs; setProg(Math.min(99, Math.round(f * 100))); marcar(Math.round(f * 100)); }, 140);
    if (!synth) { setTimeout(encerrar, durMs); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(texto); u.lang = "pt-BR"; u.rate = 0.95;
    const vpt = synth.getVoices().find((v) => v.lang?.toLowerCase().startsWith("pt")); if (vpt) u.voice = vpt;
    u.onend = encerrar; u.onerror = () => { limparTimer(); setTocandoX(false); };
    synth.speak(u);
  }
  function toggle() { if (tocando) parar(); else tocar(); }

  function onTime() {
    const a = audioRef.current; if (!a || !a.duration) return;
    setTNow(a.currentTime);
    const pct = Math.min(99, Math.round((a.currentTime / a.duration) * 100));
    setProg(pct); marcar(pct);
    if (gateAtPct != null && !gateRef.current && pct >= gateAtPct) { gateRef.current = true; onGate?.(); }
  }

  useEffect(() => {
    if (autoStart) { const t = setTimeout(tocar, 350); return () => { clearTimeout(t); parar(false); }; }
    return () => parar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // legenda atual: última linha que já começou (segura nos silêncios; sem flash da frase final)
  let line: Line | null = null;
  if (lines.length && (tocando || tNow > 0)) {
    for (const l of lines) { if (l.start <= tNow + 0.05) line = l; else break; }
  }

  return (
    <div className={`audio-wrap${tocando ? " tocando" : ""}`}>
      {src && <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => { e.currentTarget.playbackRate = 1.1; }} onTimeUpdate={onTime} onEnded={encerrar} />}
      {line && (
        <div className="audio-caption" key={line.start}>
          {line.words.map((w, i) => {
            const active = tNow >= w.start && tNow < w.end;
            const gold = active || POWER.test(w.text);
            return (
              <span key={i} style={{
                display: "inline-block", margin: "0 0.16em",
                color: gold ? "#f7e0a3" : "#fff",
                transform: active ? "scale(1.1)" : "scale(1)", transition: "transform .08s",
              }}>{w.text}</span>
            );
          })}
        </div>
      )}
      <div className="audio-player">
        <button className="audio-btn" onClick={toggle} aria-label="Ouvir">{tocando ? "❚❚" : "▶"}</button>
        <div style={{ flex: 1, textAlign: "left" }}>
          <Waveform ativo={tocando} />
          <div className="audio-bar"><div className="audio-fill" style={{ width: `${prog}%` }} /></div>
          <div className="audio-label">{tocando ? playingLabel : ouviu ? doneLabel : introLabel}</div>
        </div>
      </div>
    </div>
  );
}
