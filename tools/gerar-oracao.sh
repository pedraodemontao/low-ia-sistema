#!/usr/bin/env bash
# Texto -> MP3. Voz IA ElevenLabs (Carla pt-BR) por padrão; fallback macOS `say` com --say.
# Uso: bash tools/gerar-oracao.sh <texto.txt> <saida.mp3> [--say]
#   VOICE_ID=<id> troca a voz ElevenLabs. STAB/STYLE/SPEED ajustam (defaults calmos p/ oração).
set -uo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TXTFILE="${1:-}"; OUT="${2:-}"; MODE="${3:-}"
[ -n "$TXTFILE" ] && [ -n "$OUT" ] || { echo "Uso: bash tools/gerar-oracao.sh <texto.txt> <saida.mp3> [--say]"; exit 1; }
[ -f "$TXTFILE" ] || { echo "texto não encontrado: $TXTFILE"; exit 1; }
TXT="$(cat "$TXTFILE")"
VOICE_ID="${VOICE_ID:-oJebhZNaPllxk6W0LSBA}"  # Carla pt-BR

if [ "$MODE" = "--say" ]; then
  echo "▶ Voz macOS (Luciana) — placeholder grátis"
  TMP="$(mktemp -t oracao).aiff"; WAV="${TMP%.aiff}.wav"
  say -v Luciana -r 155 -o "$TMP" "$TXT"
  afconvert -f WAVE -d LEI16@44100 "$TMP" "$WAV" >/dev/null 2>&1
  ( cd "$HOME/remotion-editor" && npx remotion ffmpeg -y -i "$WAV" -codec:a libmp3lame -b:a 128k "$OUT" ) >/dev/null 2>&1
  rm -f "$TMP" "$WAV"
  [ -f "$OUT" ] && echo "✅ $OUT (voz macOS — troque pela Carla quando tiver crédito: rode sem --say)" || echo "❌ falhou"
  exit 0
fi

KEY="$(grep -h ELEVENLABS_API_KEY "$ROOT/.env" 2>/dev/null | cut -d= -f2 | tr -d '\r')"
[ -n "$KEY" ] || { echo "Sem ELEVENLABS_API_KEY no .env"; exit 1; }
echo "▶ ElevenLabs · voz $VOICE_ID"
python3 - "$KEY" "$VOICE_ID" "$TXT" "$OUT" <<'PY'
import sys,urllib.request,json,os
key,voice,texto,out=sys.argv[1:5]
body=json.dumps({"text":texto,"model_id":"eleven_multilingual_v2",
  "voice_settings":{"stability":float(os.environ.get("STAB","0.6")),"similarity_boost":0.9,
    "style":float(os.environ.get("STYLE","0.25")),"speed":float(os.environ.get("SPEED","0.96")),"use_speaker_boost":True}}).encode()
req=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_128",
  data=body,headers={"xi-api-key":key,"Content-Type":"application/json"})
try:
  r=urllib.request.urlopen(req); open(out,"wb").write(r.read()); print("✅",out)
except urllib.error.HTTPError as e:
  msg=e.read().decode()[:200]
  if "quota" in msg.lower(): print("⚠️ ElevenLabs sem crédito. Recarregue, OU rode com --say (voz macOS placeholder).")
  else: print("ERRO",e.code,msg)
  sys.exit(1)
PY
