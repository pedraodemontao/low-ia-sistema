#!/usr/bin/env node
// Espionagem etapa 2 — scrape da Facebook Ad Library via Apify.
// Fecha o elo: com isto, o `espiao` mede ESCALA real (nº de criativos, tempo no ar, copies).
// Uso: node tools/scrape-ad-library.mjs "<url-ad-library OU termo>" [count] [outJsonPath]
// Requer: APIFY_TOKEN no .env (free tier). Ator configurável por env APIFY_ACTOR.

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function token() {
  if (process.env.APIFY_TOKEN) return process.env.APIFY_TOKEN.trim();
  const env = join(__dirname, "..", ".env");
  if (existsSync(env)) {
    const m = readFileSync(env, "utf8").match(/^APIFY_TOKEN\s*=\s*(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  console.error("ERRO: APIFY_TOKEN ausente. Pegue em apify.com → Settings → API. Ponha no .env.");
  process.exit(1);
}

// Ator padrão (FB Ad Library). Trocável por env APIFY_ACTOR se a conta usar outro.
const ACTOR = process.env.APIFY_ACTOR || "apify~facebook-ads-library-scraper";

const isUrl = (s) => /^https?:\/\//i.test(s);
function buildUrl(input) {
  // Se vier termo, monta a URL de busca da Ad Library BR (ativos, todos os tipos).
  if (isUrl(input)) return input;
  return `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&q=${encodeURIComponent(input)}&media_type=all`;
}

async function main() {
  const [inputRaw, countRaw = "30", outPath] = process.argv.slice(2);
  if (!inputRaw) {
    console.error('Uso: node tools/scrape-ad-library.mjs "<url-ad-library OU termo>" [count] [outJsonPath]');
    process.exit(1);
  }
  const KEY = token();
  const url = buildUrl(inputRaw);
  const count = parseInt(countRaw, 10) || 30;

  // Input genérico aceito pela maioria dos atores de Ad Library.
  const body = { urls: [{ url }], count, "scrapeAdDetails": true, activeStatus: "active", country: "BR" };

  const endpoint = `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?token=${KEY}&clean=true`;
  console.error(`▶ Apify ator=${ACTOR} · count=${count}\n  url=${url}`);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    console.error(`Apify ${res.status}: ${t.slice(0, 400)}`);
    console.error(`\nDicas: (1) confirme o ator com APIFY_ACTOR=<owner~actor>; (2) free tier pode limitar; (3) alguns atores são pagos.`);
    process.exit(1);
  }
  const items = await res.json();
  console.error(`✓ ${items.length} criativos retornados.`);

  // Resumo estruturado (campos variam por ator — defensivo).
  const get = (o, ks) => ks.map((k) => o?.[k]).find((v) => v != null);
  const resumo = items.slice(0, count).map((a) => ({
    advertiser: get(a, ["pageName", "page_name", "advertiser", "snapshot.page_name"]),
    started: get(a, ["startDate", "ad_delivery_start_time", "startDateFormatted"]),
    text: (get(a, ["adText", "body", "snapshot.body.text", "text"]) || "").toString().slice(0, 240),
    cta: get(a, ["ctaText", "cta_text", "snapshot.cta_text"]),
    link: get(a, ["link", "snapshot.link_url", "url"]),
  }));
  const advertisers = [...new Set(resumo.map((r) => r.advertiser).filter(Boolean))];

  console.log(JSON.stringify({
    total_criativos: items.length,
    anunciantes: advertisers,
    amostra: resumo.slice(0, 10),
  }, null, 2));

  if (outPath) {
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, JSON.stringify(items, null, 2));
    console.error(`raw salvo em ${outPath}`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
