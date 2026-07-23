#!/bin/bash
# Detecta overflow (conteúdo cortado) nas páginas dos ebooks e renderiza os PDFs.
cd "$(dirname "$0")" || exit 1
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BOOKS="01-el-pegamento-rojo-coreano 02-protocolo-de-choque-3-noches 03-el-ritual-de-la-cuchara-coreana 04-ritual-cuchara-version-esencial 05-protocolo-coreano-anti-manchas 06-mini-anti-manchas 07-bono-piel-de-cristal 08-bono-mapa-anti-papada 09-bono-sueno-de-seul"
PROBE='<script>window.addEventListener("load",function(){var ps=document.querySelectorAll(".page"),bad=[];ps.forEach(function(p,i){if(p.scrollHeight>p.clientHeight+2)bad.push((i+1)+"[+"+(p.scrollHeight-p.clientHeight)+"px]")});document.title="R total="+ps.length+" over="+(bad.length?bad.join(" "):"NENHUM")});</script>'

for f in $BOOKS; do
  cat "html/$f.html" > "html/_chk-$f.html"
  printf '%s' "$PROBE" >> "html/_chk-$f.html"
  R=$("$CHROME" --headless=new --disable-gpu --window-size=576,864 --virtual-time-budget=3000 --dump-dom "html/_chk-$f.html" 2>/dev/null | grep -o '<title>[^<]*</title>' | head -1)
  echo "$f -> $R"
  rm -f "html/_chk-$f.html"
done
