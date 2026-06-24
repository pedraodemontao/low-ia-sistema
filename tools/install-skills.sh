#!/usr/bin/env bash
# Instala as dependências das skills empacotadas (skills/).
# Hoje só a skill `design` precisa de venv Python (geração de imagem via Gemini:
# logo/ícone/banner/CIP/social). As demais (ui-ux-pro-max, design-system, brand,
# banner-design) rodam com stdlib/Node — nada a instalar.
# Idempotente: pode rodar quantas vezes quiser.
# Uso: bash tools/install-skills.sh
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DESIGN="$ROOT/skills/design"
VENV="$DESIGN/.venv"

echo "================ low-ia · install de skills ================"

if [ ! -f "$DESIGN/requirements.txt" ]; then
  echo "  ⚠️  skills/design/requirements.txt não encontrado — pulei a design."
  exit 0
fi

PY="$(command -v python3 || true)"
if [ -z "$PY" ]; then
  echo "  ❌ python3 não encontrado. Instale → brew install python (ou python.org)."
  echo "     Sem ele, a skill 'design' (logo/ícone/banner) não gera imagem."
  exit 1
fi
echo "  ✅ python3 $("$PY" --version 2>&1 | awk '{print $2}')"

# cria o venv só se ainda não existe
if [ ! -x "$VENV/bin/python" ]; then
  echo "  → criando venv em skills/design/.venv ..."
  "$PY" -m venv "$VENV" || { echo "  ❌ falha ao criar venv"; exit 1; }
fi

echo "  → instalando dependências (Gemini, pillow, cairosvg) ..."
"$VENV/bin/pip" install -q --upgrade pip >/dev/null 2>&1
if "$VENV/bin/pip" install -q -r "$DESIGN/requirements.txt"; then
  echo "  ✅ skill 'design' pronta (deps instaladas)."
else
  echo "  ⚠️  algumas deps falharam. Tente: cd skills/design && source .venv/bin/activate && pip install -r requirements.txt"
fi

echo ""
echo "  ℹ️  Falta a chave: GEMINI_API_KEY no .env (https://aistudio.google.com/apikey)."
echo "      ui-ux-pro-max · design-system · brand · banner-design = sem install."
echo "==========================================================="
