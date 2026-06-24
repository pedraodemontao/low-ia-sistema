#!/usr/bin/env bash
# Verifica o que falta pro sistema low-ia rodar. Não revela valores de chave.
# Uso: bash tools/check-setup.sh   (ou o comando /setup)
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV="$ROOT/.env"
ok=0; warn=0

green() { printf "  ✅ %s\n" "$1"; ok=$((ok+1)); }
miss()  { printf "  ⚠️  %s\n" "$1"; warn=$((warn+1)); }

has_env() { grep -qE "^$1=.+" "$ENV" 2>/dev/null; }

echo "================ low-ia · check de setup ================"

echo ""
echo "[ ferramentas locais ]"
command -v node >/dev/null 2>&1 && green "node $(node -v)" || miss "node faltando → nodejs.org"
command -v git  >/dev/null 2>&1 && green "git" || miss "git faltando → git-scm.com"
[ -f "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ] && green "Chrome (PDF/screenshots)" || miss "Chrome faltando → google.com/chrome"
if command -v ffmpeg >/dev/null 2>&1 || [ -d "$HOME/remotion-editor" ]; then green "ffmpeg (sistema ou Remotion)"; else miss "ffmpeg faltando → brew install ffmpeg (ou usar ~/remotion-editor)"; fi
command -v pdftoppm >/dev/null 2>&1 && green "poppler (preview PDF)" || miss "poppler faltando → brew install poppler"
command -v python3 >/dev/null 2>&1 && green "python3 $(python3 --version 2>&1 | awk '{print $2}') (skill design)" || miss "python3 faltando → brew install python (skill design/imagem)"

echo ""
echo "[ chaves locais (.env) ]"
[ -f "$ENV" ] || { miss ".env não existe → cp .env.example .env"; }
has_env PEXELS_API_KEY     && green "PEXELS_API_KEY (b-roll grátis)"        || miss "PEXELS_API_KEY 🟢 grátis → pexels.com/api"
has_env APIFY_TOKEN        && green "APIFY_TOKEN (scrape Ad Library) · free tier pode esgotar/mês" || miss "APIFY_TOKEN 🟡 free → apify.com (Settings→API)"
has_env ELEVENLABS_API_KEY && green "ELEVENLABS_API_KEY (voz)"              || miss "ELEVENLABS_API_KEY 🔴 pago → elevenlabs.io (Profile→API Key)"
has_env GEMINI_API_KEY     && green "GEMINI_API_KEY (skill design: logo/ícone/banner)" || miss "GEMINI_API_KEY 🟢 free tier → aistudio.google.com/apikey"
has_env WADISPARO_API_KEY  && green "WADISPARO_API_KEY (WhatsApp)"          || miss "WADISPARO 🔴 → opcional (etapa 9/recuperação)"

echo ""
echo "[ skills empacotadas (skills/) ]"
if [ -x "$ROOT/skills/design/.venv/bin/python" ]; then green "skill design: deps Python instaladas"; else miss "skill design: rode 'bash tools/install-skills.sh' (logo/ícone/banner via Gemini)"; fi
echo "  ℹ️  ui-ux-pro-max · design-system · brand · banner-design = sem install (stdlib/Node)"

echo ""
echo "[ via MCP / produção (entram quando você chega na etapa) ]"
echo "  ℹ️  Higgsfield (imagens/avatar, etapa 6) 🔴 crédito → conectar o MCP no Claude (higgsfield.ai), não é chave .env"
echo "  ℹ️  Tracking (etapa 9) nas ENV VARS da Vercel: PIXEL_ID, META_CAPI_TOKEN, CAKTO_WEBHOOK_SECRET (ver SETUP.md §3)"
echo "  ℹ️  VSL: embed do VTurb/ConverteAI no lib/vsl.ts · Checkout: link Cakto no lib/checkout.ts"

echo ""
echo "================ resumo ================"
echo "  $ok ok · $warn pra plugar"
if [ "$warn" -gt 0 ]; then
  echo "  Dá pra começar só com o grátis (Pexels+Cakto+Vercel+Meta). Os 🔴 entram na produção de áudio/imagem."
  echo "  Detalhes: SETUP.md"
fi
