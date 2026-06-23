#!/usr/bin/env bash
# Função do sistema low-ia: gera um CRIATIVO DE VÍDEO (slideshow) pronto.
# Pipeline: roteiro.txt + fotos IA (cena*.png) -> narração (ElevenLabs) + legendas
#           sincronizadas (palavra dourada) + música opcional -> Remotion AdSlideshow -> MP4.
#
# Pré-requisitos:
#   - .env na raiz com ELEVENLABS_API_KEY
#   - fotos já geradas no Higgsfield (nano_banana_pro 9:16, SEM texto), nomeadas cena1.png, cena2.png...
#   - projeto Remotion em ~/remotion-editor com a composição AdSlideshow (src/AdSlideshow)
#
# Uso: tools/gerar-video-ad.sh <roteiro.txt> <pasta-fotos> <saida.mp4> [musica.m4a]
#   VOICE_ID=<id> opcional (default Sarah/ElevenLabs). pt-BR nativa exige plano pago.
set -euo pipefail

ROTEIRO="${1:?uso: gerar-video-ad.sh roteiro.txt pasta-fotos saida.mp4 [musica]}"
FOTOS="${2:?pasta com cena*.png}"
SAIDA="${3:?caminho saida.mp4}"
MUSICA="${4:-}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REM="$HOME/remotion-editor"
[ -d "$REM" ] || { echo "erro: projeto Remotion não encontrado em $REM" >&2; exit 1; }
KEY="$(grep -h ELEVENLABS_API_KEY "$ROOT/.env" 2>/dev/null | cut -d= -f2 | tr -d '\r' || true)"
[ -n "$KEY" ] || { echo "erro: ELEVENLABS_API_KEY ausente no .env" >&2; exit 1; }
VOICE_ID="${VOICE_ID:-EXAVITQu4vr4xnSDxMaL}"
SLUG="$(basename "${SAIDA%.*}")"
# saída absoluta (o render roda com cwd no projeto Remoton)
mkdir -p "$(dirname "$SAIDA")"
SAIDA="$(cd "$(dirname "$SAIDA")" && pwd)/$(basename "$SAIDA")"
DEST="$REM/public/broll/$SLUG"
mkdir -p "$DEST"

echo "→ narração + legendas sincronizadas (ElevenLabs with-timestamps, voz $VOICE_ID)…"
python3 - "$KEY" "$VOICE_ID" "$ROTEIRO" "$DEST/narracao.mp3" "$DEST/captions.json" <<'PY'
import sys,json,base64,urllib.request
key,voice,rot,outmp3,outcap=sys.argv[1:6]
texto=open(rot,encoding="utf-8").read().strip()
body=json.dumps({"text":texto,"model_id":"eleven_multilingual_v2",
  "voice_settings":{"stability":0.4,"similarity_boost":0.85,"style":0.3,"use_speaker_boost":True}}).encode()
req=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128",
  data=body,headers={"xi-api-key":key,"Content-Type":"application/json"})
r=json.load(urllib.request.urlopen(req))
open(outmp3,"wb").write(base64.b64decode(r["audio_base64"]))
al=r.get("alignment") or r.get("normalized_alignment")
chars=al["characters"]; st=al["character_start_times_seconds"]; et=al["character_end_times_seconds"]
words=[]; cur=""; ws=None; we=None
for c,s,e in zip(chars,st,et):
    if c==" ":
        if cur: words.append((cur,ws,we)); cur=""; ws=None
        continue
    if not cur: ws=s
    cur+=c; we=e
if cur: words.append((cur,ws,we))
# WORD-LEVEL (karaokê): uma entrada por palavra
caps=[{"text":w[0],"start":round(w[1],2),"end":round(w[2],2)} for w in words]
json.dump(caps,open(outcap,"w"),ensure_ascii=False)
print(len(caps),"palavras sincronizadas (karaokê)")
PY

echo "→ copiando fotos…"
i=1; IMGS=()
for f in $(ls "$FOTOS"/cena*.png 2>/dev/null | sort -V); do
  cp "$f" "$DEST/cena$i.png"; IMGS+=("broll/$SLUG/cena$i.png"); i=$((i+1))
done
[ ${#IMGS[@]} -gt 0 ] || { echo "erro: nenhuma cena*.png em $FOTOS" >&2; exit 1; }

MUSIC_PROP=""
if [ -n "$MUSICA" ] && [ -f "$MUSICA" ]; then
  cp "$MUSICA" "$DEST/musica.m4a"; MUSIC_PROP=",\"musicSrc\":\"broll/$SLUG/musica.m4a\""
fi

IMGJSON=$(printf '"%s",' "${IMGS[@]}"); IMGJSON="[${IMGJSON%,}]"
PROPS="{\"audioSrc\":\"broll/$SLUG/narracao.mp3\",\"captionsSrc\":\"broll/$SLUG/captions.json\",\"images\":$IMGJSON$MUSIC_PROP}"

echo "→ render Remotion (${#IMGS[@]} cenas)…"
cd "$REM"
npx remotion render src/index.ts AdSlideshow "$SAIDA" --concurrency=4 --props="$PROPS"
echo "✓ criativo de vídeo: $SAIDA"
