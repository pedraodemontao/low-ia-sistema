// Engine do quiz — mapeia a "molestia" principal da pele -> "tu fórmula personalizada".
// Skincare: a fórmula sai da dor #1 escolhida no quiz (não de data de nascimento).
// A máquina (Leitura/Ativacao) só consome nome/numero/mensagem.

export const RESULTADOS = [
  "Fórmula Reafirmante",
  "Fórmula Anti-Arrugas",
  "Fórmula Cuello Firme",
  "Fórmula Anti-Manchas",
  "Fórmula Luminosidad",
] as const;

export type Resultado = {
  nome: string;
  numero: number;
  mensagem: string;
};

// Cada `molestia` (valor do tile no quiz) -> índice da fórmula + foco da leitura.
const POR_MOLESTIA: Record<string, { idx: number; foco: string }> = {
  "Papada / óvalo caído": { idx: 0, foco: "levantar el óvalo y definir el mentón" },
  "Arrugas": { idx: 1, foco: "suavizar las arrugas y alisar la piel" },
  "Flacidez del cuello": { idx: 2, foco: "firmar el cuello y el escote" },
  "Manchas": { idx: 3, foco: "aclarar las manchas y unificar el tono" },
  "Falta de brillo": { idx: 4, foco: "devolver la luminosidad a tu piel" },
};

const DEFAULT = POR_MOLESTIA["Papada / óvalo caído"];

export function calcResultado(molestia?: string | number): Resultado {
  const match = POR_MOLESTIA[String(molestia ?? "")] ?? DEFAULT;
  const nome = RESULTADOS[match.idx];
  return {
    nome,
    numero: match.idx + 1,
    mensagem: mensagemDoResultado(nome, match.foco),
  };
}

function mensagemDoResultado(nome: string, foco: string): string {
  return `Tu piel responde a la ${nome} del Ritual del Pegamento Rojo Coreano. ` +
    `Con ginseng rojo, tu ritual personalizado se enfoca en ${foco} en 2 minutos cada noche. ` +
    `Preparé tu fórmula — mírala ahora.`;
}
