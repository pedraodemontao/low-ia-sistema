#!/usr/bin/env bash
# Etapa 7 — clona o funil PROVADO (funil-base) pra uma oferta nova e marca os pontos de troca.
# Uso: bash tools/scaffold-funil.sh <nome-da-oferta>
# Resultado: ofertas/<nome>/07-paginas (código pronto) + CUSTOMIZE.md (o que trocar).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/templates/funil-base"
NOME="${1:-}"

[ -n "$NOME" ] || { echo "Uso: bash tools/scaffold-funil.sh <nome-da-oferta>"; exit 1; }
[ -d "$SRC" ] || { echo "ERRO: funil-modelo não encontrado em $SRC"; exit 1; }
DST="$ROOT/ofertas/$NOME/07-paginas"
[ -d "$DST" ] && { echo "ERRO: $DST já existe (apague antes de re-scaffold)"; exit 1; }

mkdir -p "$DST"
# copia o código, SEM peso/segredo/mídia específica
rsync -a \
  --exclude 'node_modules' --exclude '.next' --exclude '.git' --exclude '.vercel' \
  --exclude '.env' --exclude '.env.*' \
  --exclude 'public/audio/*' --exclude 'public/video/*' \
  "$SRC/" "$DST/"

# placeholder pras pastas de mídia (geradas depois pelas tools)
mkdir -p "$DST/public/audio" "$DST/public/video"; touch "$DST/public/audio/.gitkeep" "$DST/public/video/.gitkeep"

cat > "$DST/CUSTOMIZE.md" <<'MD'
# CUSTOMIZE — troque isto pra esta oferta (funil clonado do modelo provado)

> Lógica/animação/tracking NÃO mudam. Trocar oferta = trocar DADOS + assets.

## 1. Dados da oferta (o essencial)
- [ ] `lib/quiz-data.ts` — passos do quiz (STEPS), reações. **O que mais muda.**
- [ ] `lib/anjos.ts` — o "motor" do mecanismo (no modelo: data→anjo). Trocar pela lógica do SEU mecanismo, ou simplificar.
- [ ] `lib/audios.ts` — roteiro dos áudios (AUDIO1/2_TEXTO). Depois: `tools/gerar-audios.sh`.
- [ ] `lib/social-proof.ts` — nomes/valores da prova social.

## 2. Copy das telas (tom agressivo/urgente)
- [ ] `app/page.tsx` — HEADLINE/SUB + capa (hook). Use `/swipe <nicho>` pra começar do vencedor.
- [ ] `app/oferta/page.tsx` — checkout + order bump (preço!).
- [ ] `app/upsell/page.tsx` · `app/obrigado/page.tsx` — copy + preços.

## 3. Integrações (🔌 plugue o seu)
- [ ] `lib/checkout.ts` — link do SEU checkout Cakto.
- [ ] `lib/vsl.ts` — embed da SUA VSL (VTurb/ConverteAI) ou mp4 local.
- [ ] `lib/pixel.ts` — SEU `PIXEL_ID` do Meta.
- [ ] Vercel env vars (tracking): `PIXEL_ID`, `META_CAPI_TOKEN`, `CAKTO_WEBHOOK_SECRET` (ver SETUP.md §3).

## 4. Assets (gerados pelas tools)
- [ ] `public/` — hero/imagens (Higgsfield, etapa 6) → otimizar pra WebP.
- [ ] `public/audio/` — `tools/gerar-audios.sh ofertas/<nome>/07-paginas`.
- [ ] `public/video/` — VSL (se mp4 local) via Remotion.

## 5. Subir
```bash
cd ofertas/<nome>/07-paginas
npm install
npx tsc --noEmit        # nunca 'build' com 'dev' no ar
vercel --prod
```
MD

echo "✅ Funil clonado em: ofertas/$NOME/07-paginas"
echo "📋 Próximo: abra ofertas/$NOME/07-paginas/CUSTOMIZE.md e troque os pontos marcados."
echo "   Dica: /swipe <nicho> pra puxar hook/ângulo vencedor antes de escrever a copy."
