// Fonte única do quiz — data-driven. TEMPLATE GENÉRICO.
// Trocar de oferta = trocar ESTE arquivo (títulos/opções) + assets. Lógica/animação não mudam.
// As chaves `mes` e `dia` alimentam o engine (lib/resultado.ts). As demais são exemplo — ajuste o texto.

export type StepKey =
  | "sinal" | "perfil" | "mes" | "dia" | "decada"
  | "estadoCivil" | "desafio" | "sexo" | "nome";

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

// TEMPLATE: troque as opções pelo conteúdo da SUA oferta.
const ABERTURA = tiles([
  ["Opção A", "🅰️"], ["Opção B", "🅱️"], ["Opção C", "🇨"],
  ["Opção D", "🇩"], ["Opção E", "🇪"], ["Opção F", "🇫"],
]);

// TEMPLATE: segundo qualificador — troque pelas opções da SUA oferta.
const QUALIFICA2 = tiles([
  ["Opção 1", "1️⃣"], ["Opção 2", "2️⃣"], ["Opção 3", "3️⃣"], ["Opção 4", "4️⃣"],
]);

export const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const MESES_OPC: Opcao[] = MESES.map((m, i) => ({ label: m, icon: "🗓️", value: i + 1 }));

const DIAS_OPC: Opcao[] = Array.from({ length: 31 }, (_, i) => ({
  label: String(i + 1), value: i + 1,
}));

const QUALIFICA = tiles([
  ["Opção 1", "1️⃣"], ["Opção 2", "2️⃣"], ["Opção 3", "3️⃣"], ["Opção 4", "4️⃣"],
]);

const SEXOS = tiles([["Feminino", "♀️"], ["Masculino", "♂️"]]);

export const STEPS: StepConfig[] = [
  { key: "sinal", titulo: "[Pergunta de abertura — gancho do seu nicho]", cols: 3, big: true, opcoes: ABERTURA },
  { key: "perfil", titulo: "[Segunda pergunta de qualificação]", cols: 4, opcoes: QUALIFICA2 },
  { key: "mes", titulo: "Em que mês você nasceu?", cols: 3, opcoes: MESES_OPC },
  { key: "dia", titulo: "Qual é o seu dia de nascimento?", cols: 6, opcoes: DIAS_OPC },
  { key: "desafio", titulo: "[Pergunta de qualificação — a dor principal]", cols: 2, big: true, opcoes: QUALIFICA },
  { key: "sexo", titulo: "Qual é o seu sexo?", cols: 2, big: true, opcoes: SEXOS },
  {
    key: "nome", titulo: "Qual é o seu primeiro nome?", cols: 2, tipo: "input",
    subtitulo: "[Por que pedir o nome — ex: personalizar o resultado.]",
    placeholder: "Digite seu nome",
    ctaLabel: "VER MEU RESULTADO →",
  },
];

export const LOADING_MSGS = [
  "[Mensagem de processamento 1 — crie suspense…]",
  "[Mensagem 2 — cruzando os seus dados…]",
  "[Mensagem 3 — quase lá…]",
];

// Micro-copy reativa: resposta escolhida -> frase empática. TEMPLATE — preencha por opção.
export const REACOES: Record<string, string> = {
  "Opção A": "[Frase empática reagindo à Opção A.]",
  "Opção B": "[Frase empática reagindo à Opção B.]",
  "Opção 1": "[Frase empática reagindo à dor 1.]",
  "Opção 2": "[Frase empática reagindo à dor 2.]",
};
