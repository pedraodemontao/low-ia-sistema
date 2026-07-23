// Fonte única do quiz — data-driven. Oferta: Ritual Seúl 50+ (skincare · ES/LatAm).
// A chave `molestia` alimenta o engine (lib/resultado.ts) → deriva "tu fórmula personalizada".
// Lógica/animação não mudam; aqui só o conteúdo (perguntas/opções em espanhol neutro).

export type StepKey =
  | "edad" | "molestia" | "piel" | "cremas" | "cambio" | "nome";

export type Opcao = { label: string; icon?: string; value: string | number };

export type StepConfig = {
  key: StepKey;
  titulo: string;
  cols: 2 | 3 | 4 | 6;
  big?: boolean;
  tipo?: "tiles" | "input";
  subtitulo?: string;
  placeholder?: string;
  ctaLabel?: string;
  opcoes?: Opcao[];
};

function tiles(labels: [string, string][]): Opcao[] {
  return labels.map(([label, icon]) => ({ label, icon, value: label }));
}

// 1) Edad
const EDAD = tiles([
  ["45–50", "🌸"], ["51–55", "🌷"], ["56–60", "🌹"], ["+60", "💃"],
]);

// 2) Molestia principal — ESTA resposta define a fórmula (ver lib/resultado.ts).
const MOLESTIA = tiles([
  ["Papada / óvalo caído", "💧"],
  ["Arrugas", "〰️"],
  ["Flacidez del cuello", "🧣"],
  ["Manchas", "🟤"],
  ["Falta de brillo", "✨"],
]);

// 3) Tipo de piel
const PIEL = tiles([
  ["Seca", "🏜️"], ["Mixta", "☯️"], ["Grasa", "💦"], ["Sensible", "🌡️"],
]);

// 4) Ya probó cremas
const CREMAS = tiles([
  ["Sí, muchas", "😔"], ["Algunas", "🤔"], ["No", "🙅‍♀️"],
]);

// 5) Qué cambiaría
const CAMBIO = tiles([
  ["Levantar el óvalo", "⬆️"],
  ["Borrar arrugas", "🪄"],
  ["Aclarar manchas", "🌗"],
  ["Recuperar brillo", "💫"],
]);

export const STEPS: StepConfig[] = [
  { key: "edad", titulo: "¿Cuál es tu edad?", cols: 2, big: true, opcoes: EDAD },
  { key: "molestia", titulo: "¿Qué es lo que más te molesta hoy?", cols: 2, big: true, opcoes: MOLESTIA },
  { key: "piel", titulo: "¿Cómo sientes tu piel?", cols: 2, big: true, opcoes: PIEL },
  { key: "cremas", titulo: "¿Ya probaste cremas caras sin resultado?", cols: 3, opcoes: CREMAS },
  { key: "cambio", titulo: "Si pudieras cambiar UNA cosa de tu rostro, ¿cuál sería?", cols: 2, big: true, opcoes: CAMBIO },
  {
    key: "nome", titulo: "¿Cuál es tu nombre?", cols: 2, tipo: "input",
    subtitulo: "Para personalizar tu fórmula y tu diagnóstico.",
    placeholder: "Escribe tu nombre",
    ctaLabel: "VER MI FÓRMULA →",
  },
];

export const LOADING_MSGS = [
  "Analizando tu tipo de piel…",
  "Cruzando tus respuestas con el ritual coreano…",
  "Preparando tu fórmula personalizada…",
];

// Micro-copy reativa: resposta escolhida -> frase empática (steps `molestia` e `cambio`).
export const REACOES: Record<string, string> = {
  "Papada / óvalo caído": "Te entiendo — el óvalo caído es la molestia #1 después de los 50. Y tiene solución.",
  "Arrugas": "Las arrugas no son el final del camino. Tu piel todavía responde.",
  "Flacidez del cuello": "El cuello delata la edad… pero también se puede firmar en casa.",
  "Manchas": "Las manchas se pueden aclarar — sin ácidos de farmacia que inflaman.",
  "Falta de brillo": "Ese brillo apagado se puede recuperar. Sigamos.",
  "Levantar el óvalo": "Perfecto — el pegamento rojo coreano trabaja justo ahí.",
  "Borrar arrugas": "Vamos a suavizar esas líneas, noche a noche.",
  "Aclarar manchas": "Aclarar el tono es totalmente posible. Te muestro cómo.",
  "Recuperar brillo": "Devolverte la luminosidad es el primer resultado que vas a notar.",
};
