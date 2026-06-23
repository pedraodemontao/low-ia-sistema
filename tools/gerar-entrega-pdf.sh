#!/usr/bin/env bash
# Função do sistema low-ia: gera o PDF de entrega (MVP validador) de uma oferta.
# HTML -> PDF (Chrome headless) + preview PNG da pág 1 (poppler).
# Uso: tools/gerar-entrega-pdf.sh ofertas/<oferta>/entrega/arquivo.html
set -euo pipefail

HTML="${1:?uso: gerar-entrega-pdf.sh caminho/para/arquivo.html}"
[ -f "$HTML" ] || { echo "erro: HTML não encontrado: $HTML" >&2; exit 1; }

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
[ -x "$CHROME" ] || { echo "erro: Chrome não encontrado em $CHROME (defina CHROME=...)" >&2; exit 1; }

DIR="$(cd "$(dirname "$HTML")" && pwd)"
FILE="$(basename "$HTML")"
BASE="${FILE%.*}"
PDF="$DIR/$BASE.pdf"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF" "file://$DIR/$FILE" 2>/dev/null

if command -v pdftoppm >/dev/null 2>&1; then
  pdftoppm -png -r 90 -f 1 -l 1 "$PDF" "$DIR/$BASE-preview" >/dev/null 2>&1 || true
fi

PAGS="$(pdfinfo "$PDF" 2>/dev/null | awk '/Pages/{print $2}')"
echo "✓ PDF gerado: $PDF (${PAGS:-?} páginas)"
[ -f "$DIR/$BASE-preview-1.png" ] && echo "  preview: $DIR/$BASE-preview-1.png"
