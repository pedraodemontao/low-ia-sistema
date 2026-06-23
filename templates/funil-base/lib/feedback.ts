// Feedback multissensorial — som (Web Audio, sem arquivo), háptico e confete.
// Tudo grátis, client-side. Plugar amanhã nos cliques/seleções/revelação.
import confetti from "canvas-confetti";

const GOLD = ["#e8c879", "#f7e0a3", "#d4af37", "#fff3cf"];

let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AC) ctx = new AC();
  }
  return ctx;
}

// Tom curto sintetizado (sino/ding) — sem precisar de arquivo de áudio.
export function tom(freq = 880, dur = 0.12, tipo: OscillatorType = "sine") {
  const ac = audio();
  if (!ac) return;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = tipo;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  o.connect(g);
  g.connect(ac.destination);
  o.start();
  o.stop(ac.currentTime + dur);
}

export function haptic(padrao: number | number[] = 15) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(padrao);
  }
}

// Feedback ao selecionar uma opção do quiz.
export function selectFx() {
  tom(880, 0.1);
  haptic(15);
}

// Burst de confete dourado (revelação / order bump adicionado).
export function confettiGold() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.42 },
    colors: GOLD,
    scalar: 1.1,
  });
}

// Combo da revelação: dois tons subindo + confete + vibração.
export function revealFx() {
  tom(660, 0.16);
  setTimeout(() => tom(990, 0.22), 130);
  confettiGold();
  haptic([20, 40, 20]);
}
