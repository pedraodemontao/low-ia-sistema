// Contrato de conteúdo do app Ritual Seúl 50+.
// O conteúdo vem dos ebooks (entregaveis/html) reescrito para leitura em celular:
// blocos curtos, ação clara, nada de página de livro.

export type Bloque =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "titulo"; texto: string }
  | { tipo: "lista"; items: string[] }
  | { tipo: "pasos"; items: { titulo: string; texto: string }[] }
  | { tipo: "receta"; nombre: string; ingredientes: { item: string; cantidad: string }[]; nota?: string }
  | { tipo: "aviso"; variante: "tip" | "alerta" | "nota" | "mina"; titulo: string; texto: string }
  | { tipo: "diagrama"; svg: string; leyenda: string }
  | { tipo: "checklist"; items: string[] };

export type Seccion = {
  slug: string;
  titulo: string;
  resumen: string;
  bloques: Bloque[];
};

/** Uma das 21 noites do cronograma. */
export type Noche = {
  numero: number;
  titulo: string;
  intro: string;
  tareas: string[];
  tip?: { titulo: string; texto: string };
  /** Marco de semana: texto que aparece ao concluir esta noite. */
  hito?: string;
};

export type Bono = {
  slug: string;
  titulo: string;
  subtitulo: string;
  emoji: string;
  secciones: Seccion[];
};
