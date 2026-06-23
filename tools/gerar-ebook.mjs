#!/usr/bin/env node
// Gerador de EBOOK do sistema low-ia — data-driven. Engine + estilo aqui; CONTEÚDO vem de um config por oferta.
// Uso: node tools/gerar-ebook.mjs <config.mjs> [saida-basename] [--no-pdf]
//   ex: node tools/gerar-ebook.mjs ofertas/<oferta>/entrega/ebook-config.mjs ofertas/<oferta>/entrega/ebook
// Gera <basename>.html e (se Chrome disponível) <basename>.pdf (80+ páginas tranquilo).
// O config exporta: { meta, capitulos[], detalhada?, secoesFinais[] }. Ver templates/ebook-config-exemplo.mjs.

import { writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// --- assembly ---
function capituloHTML(c) {
  return `<div class="chapter">
    ${c.kicker ? `<span class="kicker">${esc(c.kicker)}</span>` : ""}
    <h2 class="cap">${esc(c.titulo)}</h2>
    ${c.corpo || ""}
  </div>`;
}

function detalhadaHTML(d) {
  if (!d) return "";
  const head = `<div class="chapter">
    ${d.kicker ? `<span class="kicker">${esc(d.kicker)}</span>` : ""}
    <h2 class="cap">${esc(d.titulo)}</h2>
    ${d.intro || ""}
  </div>`;
  const itens = d.nomes.map((nome, i) => {
    const campos = (d.campos ? d.campos(nome, i) : []) // [{label,valor}]
      .map((c) => `<tr><td>${esc(c.label)}</td><td>${esc(c.valor)}</td></tr>`).join("");
    const sub = d.sub ? `<span class="anjo-sub">${esc(d.sub(nome, i))}</span>` : "";
    return `<div class="anjo">
      <div class="anjo-h"><span class="anjo-num">${String(i + 1).padStart(2, "0")}</span>
        <div><h3>${esc(nome)}</h3>${sub}</div></div>
      ${d.leitura ? `<p class="leitura">${d.leitura(nome, i)}</p>` : ""}
      ${campos ? `<table class="ficha"><tbody>${campos}</tbody></table>` : ""}
      ${d.oracao ? `<p class="oracao"><b>${esc(d.oracaoLabel || "Oração:")}</b><br>${d.oracao(nome, i)}</p>` : ""}
    </div>`;
  }).join("\n");
  return head + "\n" + itens;
}

function sumarioHTML(itens) {
  return `<div class="chapter"><span class="kicker">Sumário</span>
    <h2 class="cap">O que você vai encontrar</h2>
    <ol class="sumario">${itens.map((t) => `<li>${esc(t)}</li>`).join("")}</ol></div>`;
}

function render(cfg) {
  const m = cfg.meta;
  const tituloHTML = (m.tituloLinhas || [m.titulo || "Ebook"]).map((l) =>
    l.replace(/\*([^*]+)\*/g, '<span class="gold">$1</span>')).join("<br>");
  const fotoHTML = m.autorFoto
    ? `<img class="autor-foto" src="${pathToFileURL(resolve(m.autorFoto)).href}">` : "";

  const sumarioItens = [
    ...cfg.capitulos.map((c) => c.titulo),
    ...(cfg.detalhada ? [cfg.detalhada.titulo] : []),
    ...(cfg.secoesFinais || []).map((c) => c.titulo),
  ];

  const corpo = [
    sumarioHTML(sumarioItens),
    ...cfg.capitulos.map(capituloHTML),
    detalhadaHTML(cfg.detalhada),
    ...(cfg.secoesFinais || []).map(capituloHTML),
  ].join("\n");

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
@page{size:A4;margin:20mm 18mm}
*{box-sizing:border-box}
body{font-family:Georgia,'Times New Roman',serif;color:#1a1730;line-height:1.6;font-size:11.5pt}
h1,h2,h3{font-family:Georgia,serif;color:#3a2f6e}
.cover{height:257mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  background:linear-gradient(160deg,#1d1b3a,#3a2f6e 60%,#1d1b3a);color:#fff;border-radius:4px;page-break-after:always}
.cover .eyebrow{letter-spacing:6px;color:#e8c879;text-transform:uppercase;font-size:12pt;margin-bottom:18px}
.cover h1{color:#fff;font-size:40pt;line-height:1.1;margin:0 30px}
.cover .gold{color:#f7e0a3}
.cover .sub{color:#d8d3ef;font-size:14pt;margin-top:18px;font-style:italic}
.autor-foto{width:200px;height:200px;border-radius:50%;object-fit:cover;object-position:center 28%;
  margin:46px auto 14px;border:4px solid #e8c879;box-shadow:0 0 0 8px rgba(232,200,121,.18),0 18px 50px rgba(0,0,0,.5)}
.cover .by{margin-top:8px;color:#e8c879;font-size:14pt;letter-spacing:2px;font-weight:700}
.cover .by-sub{color:#d8d3ef;font-size:11pt;letter-spacing:1px;margin-top:4px}
.chapter{page-break-before:always}
h2.cap{font-size:24pt;border-bottom:2px solid #e8c879;padding-bottom:8px;margin:0 0 18px;color:#3a2f6e}
.kicker{color:#9a7b1f;letter-spacing:3px;text-transform:uppercase;font-size:10pt;font-weight:700}
p{margin:0 0 12px;text-align:justify}
blockquote{border-left:3px solid #e8c879;margin:16px 0;padding:6px 16px;color:#4a4270;font-style:italic;background:#faf7ef}
.sumario li{margin:6px 0}.ritual{background:#faf7ef;border:1px solid #ecd9a6;border-radius:8px;padding:14px 18px;margin:14px 0}
.anjo{page-break-inside:avoid;border:1px solid #e7e1f5;border-radius:8px;padding:14px 16px;margin:0 0 16px;background:#fcfbff}
.anjo-h{display:flex;align-items:center;gap:14px;margin-bottom:8px}
.anjo-num{font-size:26pt;color:#e8c879;font-weight:700;min-width:54px;text-align:center}
.anjo h3{margin:0;font-size:17pt;color:#3a2f6e}.anjo-sub{color:#8a83ad;font-size:9.5pt}
.leitura{margin:6px 0 10px}
table.ficha{width:100%;border-collapse:collapse;margin:8px 0;font-size:10.5pt}
table.ficha td{border:1px solid #e7e1f5;padding:6px 10px}
table.ficha td:first-child{background:#f3efff;color:#5a4fa0;font-weight:700;width:38%}
.oracao{background:#f6f1ff;border-radius:6px;padding:10px 14px;font-style:italic;color:#3a3270}
.refs{font-size:10pt;color:#4a4270}.refs li{margin:6px 0}
</style></head><body>
<div class="cover">
  ${m.eyebrow ? `<div class="eyebrow">${esc(m.eyebrow)}</div>` : ""}
  <h1>${tituloHTML}</h1>
  ${m.subtitulo ? `<div class="sub">${m.subtitulo}</div>` : ""}
  ${fotoHTML}
  ${m.autor ? `<div class="by">${esc(m.autor)}</div>` : ""}
  ${m.credencial ? `<div class="by-sub">${esc(m.credencial)}</div>` : ""}
</div>
${corpo}
</body></html>`;
}

// --- run ---
const [cfgArg, baseArg, ...flags] = process.argv.slice(2);
if (!cfgArg) { console.error("Uso: node tools/gerar-ebook.mjs <config.mjs> [saida-basename] [--no-pdf]"); process.exit(1); }
const cfgPath = resolve(cfgArg);
if (!existsSync(cfgPath)) { console.error("config não encontrado:", cfgPath); process.exit(1); }
const cfg = (await import(pathToFileURL(cfgPath).href)).default;
const base = resolve(baseArg || cfgPath.replace(/ebook-config\.mjs$/, "ebook").replace(/\.mjs$/, "-ebook"));

const html = render(cfg);
writeFileSync(base + ".html", html);
console.log("HTML:", base + ".html", "·", html.length, "chars");

if (!flags.includes("--no-pdf")) {
  const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  if (existsSync(chrome)) {
    execFileSync(chrome, ["--headless", "--disable-gpu", "--no-pdf-header-footer",
      `--print-to-pdf=${base}.pdf`, pathToFileURL(base + ".html").href], { stdio: "ignore" });
    console.log("PDF :", base + ".pdf");
  } else {
    console.log("(Chrome não achado — gere o PDF com: gerar-entrega-pdf ou imprima o HTML)");
  }
}
