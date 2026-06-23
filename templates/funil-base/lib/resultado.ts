// Engine genérico do quiz — mapeia a resposta (ex: data de nascimento) -> 1 resultado.
// TEMPLATE: troque RESULTADOS e os textos pelo mecanismo da SUA oferta (ex: arquétipo,
// perfil, signo, mapa, etc.). A máquina (cálculo do índice) não muda.

export const RESULTADOS = Array.from({ length: 72 }, (_, i) =>
  `Resultado ${String(i + 1).padStart(2, "0")}`,
) as readonly string[];

// TEMPLATE: domínios/temas do resultado (troque pelo benefício da sua oferta).
const DOMINIOS = [
  "o tema principal da sua oferta",
  "o segundo benefício",
  "o terceiro benefício",
  "o quarto benefício",
  "o quinto benefício",
] as const;

export type Resultado = {
  nome: string;
  numero: number;
  codigo: number;
  dominio: string;
  horaIdeal: string;
  mensagem: string;
};

// Dia 21/03 = índice 1. Distribui N resultados ao longo do ano (~5,07 dias cada).
function diaDoAno(mes: number, dia: number): number {
  const diasNoMes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let total = 0;
  for (let m = 1; m < mes; m++) total += diasNoMes[m - 1];
  total += dia;
  const base = 31 + 29 + 21; // 21/03
  let delta = total - base;
  if (delta < 0) delta += 366;
  return delta;
}

export function calcResultado(mes: number, dia: number): Resultado {
  const delta = diaDoAno(mes, dia);
  const idx = Math.min(RESULTADOS.length - 1, Math.floor(delta / (366 / RESULTADOS.length)));
  const nome = RESULTADOS[idx];
  const numero = idx + 1;
  return {
    nome,
    numero,
    codigo: ((numero * 3) % 150) + 1,
    dominio: DOMINIOS[idx % DOMINIOS.length],
    horaIdeal: `${String((idx * 20) % 24).padStart(2, "0")}:00`,
    mensagem: mensagemDoResultado(nome, DOMINIOS[idx % DOMINIOS.length]),
  };
}

function mensagemDoResultado(nome: string, dominio: string): string {
  // TEMPLATE: a mensagem que aparece na revelação. Escreva no ângulo da sua oferta.
  return `${nome} representa ${dominio} na sua vida. ` +
    `[Escreva aqui a leitura/promessa da sua oferta — o que isso revela e por que agir agora.]`;
}
