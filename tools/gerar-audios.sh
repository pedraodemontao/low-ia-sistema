#!/usr/bin/env bash
# Função do sistema low-ia: gera os arquivos de voz do funil a partir do lib/audios.ts.
# Usa ElevenLabs (voz IA) se ELEVENLABS_API_KEY estiver no .env da raiz; senão macOS `say` (ponte).
# Uso: tools/gerar-audios.sh ofertas/<oferta>/07-paginas
# Voz IA: export VOICE_ID=<id> (default Amora Faria, pt-BR calma).
set -euo pipefail

APP="${1:?uso: gerar-audios.sh caminho/para/07-paginas}"
AUDIOS_TS="$APP/lib/audios.ts"
OUT="$APP/public/audio"
mkdir -p "$OUT"
[ -f "$AUDIOS_TS" ] || { echo "erro: $AUDIOS_TS não existe" >&2; exit 1; }

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
KEY="$(grep -h ELEVENLABS_API_KEY "$ROOT/.env" 2>/dev/null | cut -d= -f2 | tr -d '\r' || true)"
VOICE_ID="${VOICE_ID:-oJebhZNaPllxk6W0LSBA}"  # Carla (pt-BR, upbeat/dinâmica). Amora calm=QJd9SLe6MVCdF6DR0EAu · João masc=MjS9ecoVZlOFzvnemirW.

extrair() { # $1 const -> stdout texto
  python3 - "$AUDIOS_TS" "$1" <<'PY'
import re, sys
src = open(sys.argv[1], encoding="utf-8").read()
m = re.search(sys.argv[2] + r"\s*=\s*\[(.*?)\]\.join", src, re.S)
if not m: sys.exit("const não achada: " + sys.argv[2])
partes = re.findall(r'"((?:[^"\\]|\\.)*)"', m.group(1))
def unesc(s): return s.replace('\\"', '"').replace("\\n", " ").replace("\\\\", "\\")
print(" ".join(unesc(p) for p in partes))  # mantém acentos UTF-8 (NÃO usar unicode_escape)
PY
}

gerar_eleven() { # $1 const  $2 base — mp3 + captions json (timestamps reais)
  local txt; txt="$(extrair "$1")"
  python3 - "$KEY" "$VOICE_ID" "$txt" "$OUT/$2.mp3" "$OUT/$2.captions.json" <<'PY'
import sys,json,base64,urllib.request,os
key,voice,texto,outmp3,outcap=sys.argv[1:6]
body=json.dumps({"text":texto,"model_id":"eleven_multilingual_v2",
  "voice_settings":{"stability":float(os.environ.get("STAB","0.55")),"similarity_boost":0.9,"style":float(os.environ.get("STYLE","0.30")),"speed":float(os.environ.get("SPEED","1.0")),"use_speaker_boost":True}}).encode()
req=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128",
  data=body,headers={"xi-api-key":key,"Content-Type":"application/json"})
r=json.load(urllib.request.urlopen(req))
open(outmp3,"wb").write(base64.b64decode(r["audio_base64"]))
al=r.get("alignment") or r.get("normalized_alignment")
chars,st,et=al["characters"],al["character_start_times_seconds"],al["character_end_times_seconds"]
words=[];cur="";ws=we=None
for c,s,e in zip(chars,st,et):
  if c==" ":
    if cur: words.append((cur,ws,we));cur="";ws=None
    continue
  if not cur: ws=s
  cur+=c;we=e
if cur: words.append((cur,ws,we))
json.dump([{"text":w[0],"start":round(w[1],2),"end":round(w[2],2)} for w in words],open(outcap,"w"),ensure_ascii=False)
print("  legenda:",len(words),"palavras (timestamps reais)")
PY
  echo "✓ $OUT/$2.mp3 + $2.captions.json [ElevenLabs]"
}

gerar_say() { # $1 const  $2 base
  extrair "$1" > "/tmp/$2.txt"
  say -v "${VOICE:-Luciana}" -f "/tmp/$2.txt" -o "/tmp/$2.aiff"
  afconvert -f m4af -d aac "/tmp/$2.aiff" "$OUT/$2.m4a"
  echo "✓ $OUT/$2.m4a [say ${VOICE:-Luciana}]"
}

if [ -n "$KEY" ]; then
  gerar_eleven AUDIO1_TEXTO audio1
  gerar_eleven AUDIO2_TEXTO audio2
  echo "voz IA: ElevenLabs / $VOICE_ID"
else
  gerar_say AUDIO1_TEXTO audio1
  gerar_say AUDIO2_TEXTO audio2
fi
