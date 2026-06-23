#!/usr/bin/env node
// Banco de takes grátis (Pexels) — função do sistema low-ia.
// Uso: node tools/fetch-pexels.mjs "<query>" <count> <photo|video> <outDir> <prefix>
// Ex:  node tools/fetch-pexels.mjs "lit candle prayer" 2 video ~/remotion-editor/public/broll/vsl/stock candle
// Chave: PEXELS_API_KEY no ambiente ou em low-ia/.env (NUNCA commitar).

import { readFileSync, mkdirSync, createWriteStream, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY.trim();
  const envPath = join(__dirname, "..", ".env");
  if (existsSync(envPath)) {
    const m = readFileSync(envPath, "utf8").match(/^PEXELS_API_KEY\s*=\s*(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  console.error("ERRO: defina PEXELS_API_KEY no ambiente ou em low-ia/.env");
  process.exit(1);
}

const expand = (p) => p.startsWith("~") ? join(homedir(), p.slice(1)) : resolve(p);

async function download(url, dest) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await new Promise((ok, err) => {
    const ws = createWriteStream(dest);
    ws.on("finish", ok); ws.on("error", err);
    ws.end(buf);
  });
  return buf.length;
}

async function main() {
  const [query, countRaw, type = "video", outDirRaw, prefix] = process.argv.slice(2);
  if (!query || !outDirRaw || !prefix) {
    console.error('Uso: node fetch-pexels.mjs "<query>" <count> <photo|video> <outDir> <prefix>');
    process.exit(1);
  }
  const count = parseInt(countRaw || "3", 10);
  const key = loadKey();
  const outDir = expand(outDirRaw);
  mkdirSync(outDir, { recursive: true });

  const isVideo = type === "video";
  const base = isVideo ? "https://api.pexels.com/v1/videos/search" : "https://api.pexels.com/v1/search";
  const url = `${base}?query=${encodeURIComponent(query)}&orientation=portrait&size=medium&per_page=${count}`;
  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) { console.error(`Pexels ${res.status}: ${await res.text()}`); process.exit(1); }
  const data = await res.json();
  const items = isVideo ? (data.videos || []) : (data.photos || []);
  if (!items.length) { console.error(`Sem resultados para "${query}"`); return; }

  let i = 0;
  for (const it of items.slice(0, count)) {
    i++;
    const ext = isVideo ? "mp4" : "jpg";
    const dest = join(outDir, `${prefix}-${i}.${ext}`);
    let link;
    if (isVideo) {
      // escolher arquivo retrato (height>width) com maior altura até ~1920
      const files = (it.video_files || []).filter((f) => f.height >= f.width);
      files.sort((a, b) => b.height - a.height);
      const pick = files.find((f) => f.height <= 1920) || files[0] || (it.video_files || [])[0];
      link = pick?.link;
    } else {
      link = it.src?.portrait || it.src?.large2x || it.src?.large;
    }
    if (!link) { console.error(`sem link p/ item ${i}`); continue; }
    try {
      const bytes = await download(link, dest);
      console.log(`OK  ${prefix}-${i}.${ext}  (${(bytes / 1e6).toFixed(1)}MB)  por ${it.user?.name || "?"}`);
    } catch (e) {
      console.error(`FALHA ${prefix}-${i}: ${e.message}`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
