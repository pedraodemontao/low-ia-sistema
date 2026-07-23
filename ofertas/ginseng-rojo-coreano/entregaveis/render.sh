#!/bin/bash
# Renderiza os 9 ebooks HTML em PDF (6x9in) via Chrome headless.
cd "$(dirname "$0")" || exit 1
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BOOKS="01-el-pegamento-rojo-coreano 02-protocolo-de-choque-3-noches 03-el-ritual-de-la-cuchara-coreana 04-ritual-cuchara-version-esencial 05-protocolo-coreano-anti-manchas 06-mini-anti-manchas 07-bono-piel-de-cristal 08-bono-mapa-anti-papada 09-bono-sueno-de-seul"

mkdir -p pdf
for f in $BOOKS; do
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="pdf/$f.pdf" "html/$f.html" 2>/dev/null
  echo "$f -> $(du -h "pdf/$f.pdf" | cut -f1)"
done
rm -f pdf/_template-test.pdf
