import type { Foco, Perfil, TipoPiel } from "@/lib/perfil";

/* Monta a fórmula da usuária a partir do test de piel.
   As proporções vêm das variantes do ebook (cap. 06); o foco define a ordem e o
   tempo das zonas do masaje (cap. 07). Nada aqui é inventado: é o mesmo conteúdo,
   resolvido para o caso dela em vez de listado como opção. */

export type Ingrediente = { item: string; cantidad: string; nota?: string };

export type Formula = {
  nombre: string;
  /** Uma frase que explica por que a fórmula dela é assim. */
  porQue: string;
  ingredientes: Ingrediente[];
  ajustes: string[];
  /** Zonas do masaje na ordem que ela deve fazer, com o tempo de cada. */
  masaje: { zona: string; segundos: number; detalle: string }[];
  /** O que observar primeiro, dado o foco escolhido. */
  senalTemprana: string;
};

const BASE: Record<TipoPiel, { nombre: string; porQue: string; ingredientes: Ingrediente[]; ajustes: string[] }> = {
  seca: {
    nombre: "Pegamento Rojo · fórmula confort",
    porQue:
      "Tu piel pide agua y confort, así que subimos la miel y bajamos la clara: la película tensora, en piel seca, se siente demasiado tirante.",
    ingredientes: [
      { item: "Polvo de ginseng rojo", cantidad: "1 cdta" },
      { item: "Miel pura", cantidad: "1½ cdas", nota: "más que la base — es tu humectante" },
      { item: "Agua de arroz", cantidad: "1½ cdas" },
      { item: "Clara de huevo", cantidad: "⅓ unidad", nota: "menos que la base" },
      { item: "Aceite de oliva o almendras", cantidad: "3 gotas", nota: "al final, con la clara ya integrada" },
    ],
    ajustes: [
      "Si vives en clima seco o de altura, puedes llegar a 4 gotas de aceite.",
      "Retira con agua tibia, no fría: el frío cierra pero también reseca en tu tipo de piel.",
    ],
  },
  mixta: {
    nombre: "Pegamento Rojo · fórmula equilibrio",
    porQue:
      "Donde ya hay brillo, la miel de más pesa. Bajamos la miel y sumamos avena molida, que suaviza y matifica sin resecar.",
    ingredientes: [
      { item: "Polvo de ginseng rojo", cantidad: "1 cdta" },
      { item: "Miel pura", cantidad: "½ cda", nota: "la mitad de la base" },
      { item: "Agua de arroz", cantidad: "2 cdas" },
      { item: "Clara de huevo", cantidad: "½ unidad" },
      { item: "Avena molida fina", cantidad: "1 cdta", nota: "casi harina — si queda gruesa, raspa" },
    ],
    ajustes: [
      "En la zona T aplica capa más fina; en mejillas y cuello, capa normal.",
      "Si al día siguiente notas más brillo del habitual, baja la avena a ½ cdta.",
    ],
  },
  sensible: {
    nombre: "Pegamento Rojo · fórmula suave",
    porQue:
      "Tu piel reacciona rápido, así que sale la clara y baja el ginseng. Menos activo, más calma — y el mismo ritual, sin castigar la barrera.",
    ingredientes: [
      { item: "Polvo de ginseng rojo", cantidad: "½ cdta", nota: "la mitad, para empezar" },
      { item: "Miel pura", cantidad: "1 cda" },
      { item: "Agua de arroz", cantidad: "2 cdas" },
      { item: "Yogur natural sin azúcar", cantidad: "1 cdta", nota: "reemplaza la clara" },
    ],
    ajustes: [
      "Sin clara de huevo: es la que más tensa y la que más reacciona.",
      "Prueba de parche obligatoria, 24 horas, antes de la primera noche completa.",
      "Si a la semana 2 todo va bien, puedes subir el ginseng a 1 cdta.",
    ],
  },
};

const FOCO: Record<
  Foco,
  { etiqueta: string; masaje: Formula["masaje"]; senalTemprana: string; extra: string }
> = {
  cuello: {
    etiqueta: "cuello y papada",
    masaje: [
      { zona: "Cuello", segundos: 45, detalle: "Pasadas verticales, de la base hacia la mandíbula. Manos alternadas." },
      { zona: "Papada y mentón", segundos: 45, detalle: "Del centro del mentón hacia las orejas, barriendo el hueso." },
      { zona: "Surcos", segundos: 20, detalle: "Diagonal hacia el pómulo, presión más ligera." },
      { zona: "Cierre", segundos: 10, detalle: "Palmas completas sobre las mejillas, una respiración honda." },
    ],
    senalTemprana:
      "En tu caso, lo primero que suele cambiar no es la papada: es la textura del cuello al tacto. Pásate la mano al día 5.",
    extra: "Aplica la pasta también por debajo de la mandíbula, hasta donde empieza el cuello.",
  },
  arrugas: {
    etiqueta: "arrugas y surcos",
    masaje: [
      { zona: "Surcos", segundos: 45, detalle: "Desde el borde del surco hacia afuera y arriba, al pómulo." },
      { zona: "Papada y mentón", segundos: 35, detalle: "Del centro del mentón hacia las orejas." },
      { zona: "Cuello", segundos: 30, detalle: "Pasadas verticales ascendentes." },
      { zona: "Cierre", segundos: 10, detalle: "Palmas sobre las mejillas, presión suave." },
    ],
    senalTemprana:
      "Los surcos no se borran: se ven menos marcados cuando la piel alrededor está más llena. Mira la zona a la luz del día, no con luz de baño.",
    extra: "Nunca estires el surco con los dedos: se trabaja hacia afuera, acompañando, no jalando.",
  },
  manchas: {
    etiqueta: "tono disparejo",
    masaje: [
      { zona: "Mejillas y pómulos", segundos: 40, detalle: "Círculos lentos hacia afuera, sin frotar." },
      { zona: "Cuello", segundos: 35, detalle: "Pasadas verticales ascendentes." },
      { zona: "Papada y mentón", segundos: 35, detalle: "Del centro hacia las orejas." },
      { zona: "Cierre", segundos: 10, detalle: "Palmas completas, una respiración honda." },
    ],
    senalTemprana:
      "El tono empareja despacio y solo si hay protector solar todos los días. Sin sol cuidado, ninguna receta sostiene el resultado.",
    extra:
      "Protector solar diario es la mitad del trabajo en tu caso. Sin él, la mancha vuelve más oscura de lo que estaba.",
  },
};

export function construirFormula(perfil: Perfil): Formula {
  // Piel reactiva manda sobre o tipo declarado: sempre a versão sem clara.
  const tipo: TipoPiel = perfil.reactiva ? "sensible" : perfil.tipoPiel;
  const base = BASE[tipo];
  const foco = FOCO[perfil.foco];

  return {
    nombre: base.nombre,
    porQue: base.porQue,
    ingredientes: base.ingredientes,
    ajustes: [...base.ajustes, foco.extra],
    masaje: foco.masaje,
    senalTemprana: foco.senalTemprana,
  };
}

export function etiquetaFoco(foco: Foco) {
  return FOCO[foco].etiqueta;
}

export function etiquetaTipo(tipo: TipoPiel) {
  return { seca: "piel seca", mixta: "piel mixta o grasa", sensible: "piel sensible" }[tipo];
}
