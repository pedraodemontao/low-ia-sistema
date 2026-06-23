// Config de EXEMPLO do ebook (template genérico). Copie pra ofertas/<oferta>/entrega/ebook-config.mjs e preencha.
// Engine: tools/gerar-ebook.mjs. Rodar: node tools/gerar-ebook.mjs ofertas/<oferta>/entrega/ebook-config.mjs
//
// Estrutura do config:
//  meta        -> capa (título, subtítulo, foto do expert, credencial)
//  capitulos[] -> capítulos de prosa (intro, fundamentos, etc.)
//  detalhada   -> a seção que ENCHE páginas: N itens, cada um com fichas + leitura + oração/ação
//  secoesFinais[] -> orações/protocolo/bônus/encerramento/referências

// TEMPLATE: troque pela sua lista (ex.: 72 anjos, 12 arquétipos, 30 receitas, 21 dias...).
const ITENS = Array.from({ length: 40 }, (_, i) => `Item ${String(i + 1).padStart(2, "0")}`);

// pools com tamanhos diferentes (e que não dividam a distância entre itens repetidos) -> sem repetição óbvia
const TEMAS = ["[tema A]","[tema B]","[tema C]","[tema D]","[tema E]","[tema F]","[tema G]","[tema H]","[tema I]","[tema J]","[tema K]","[tema L]","[tema M]"]; // 13
const VIRTUDES = ["[virtude 1]","[virtude 2]","[virtude 3]","[virtude 4]","[virtude 5]","[virtude 6]","[virtude 7]","[virtude 8]","[virtude 9]","[virtude 10]","[virtude 11]"]; // 11

export default {
  meta: {
    eyebrow: "[Linha de topo da capa]",
    tituloLinhas: ["[Título linha 1]", "*[Palavra em destaque]*", "[Título linha 3]"], // *palavra* fica dourada
    subtitulo: "[Subtítulo da capa]<br>[segunda linha]",
    autorFoto: new URL("../06-imagens/SEU-EXPERT.png", import.meta.url).pathname, // foto do expert (opcional)
    autor: "[Nome do Expert]",
    credencial: "[Credencial — ex: Especialista há +X anos · +Y mil pessoas]",
  },
  capitulos: [
    { kicker: "Boas-vindas", titulo: "[Título da carta de abertura]", corpo: `
      <p>[Carta de boas-vindas na voz do expert — fisgue, conecte, prometa.]</p>
      <blockquote>[Uma frase-chave que resume a tese do produto.]</blockquote>` },
    { kicker: "Capítulo 1", titulo: "[O que é o método]", corpo: `<p>[Explique o método/promessa.]</p>` },
    { kicker: "Capítulo 2", titulo: "[Fundamento / a tradição / a ciência]", corpo: `<p>[A base que dá credibilidade — com referências ao final.]</p>` },
    { kicker: "Capítulo 3", titulo: "[O problema / o inimigo]", corpo: `<p>[Por que o leitor está travado — nomeie o bloqueio.]</p>` },
    { kicker: "Capítulo 4", titulo: "[Como usar este livro]", corpo: `<div class="ritual">[Passo a passo de como aplicar.]</div>` },
  ],
  detalhada: {
    kicker: "O coração do livro",
    titulo: "[Título da seção detalhada]",
    intro: `<p>[Introduza a lista — diga ao leitor como usar.]</p>`,
    nomes: ITENS,
    oracaoLabel: "Prática:",
    sub: (n, i) => `Item ${i + 1} de ${ITENS.length}`,
    leitura: (n, i) => `${n}: [leitura/descrição variando por ${TEMAS[i % TEMAS.length]}].`,
    oracao: (n, i) => `[Oração, afirmação ou ação prática para ${n}.]`,
    campos: (n, i) => [
      { label: "[Campo 1]", valor: TEMAS[i % TEMAS.length] },
      { label: "[Campo 2]", valor: VIRTUDES[i % VIRTUDES.length] },
      { label: "[Campo 3]", valor: `[valor ${i + 1}]` },
    ],
  },
  secoesFinais: [
    { kicker: "Prática", titulo: "[Protocolo / plano de ação]", corpo: `<div class="ritual">[Passos práticos do método.]</div>` },
    { kicker: "Bônus", titulo: "[Bônus prometido na oferta]", corpo: `<p>[Entregue o bônus.]</p>` },
    { kicker: "Encerramento", titulo: "[Última palavra]", corpo: `<p>[Chamada final + reforço de constância.]</p>` },
    { kicker: "Referências", titulo: "Referências e leituras", corpo: `
      <ul class="refs"><li>[Fonte 1]</li><li>[Fonte 2]</li><li>[Fonte 3]</li></ul>
      <p class="refs"><i>Nota:</i> [aviso de responsabilidade — não substitui orientação profissional].</p>` },
  ],
};
