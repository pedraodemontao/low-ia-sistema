#!/bin/bash
# Hotmart limita reembolso a 30 dias — alinha o selo de garantia dos entregáveis.
cd "$(dirname "$0")" || exit 1

# Selo "60" nas capas dos ebooks e nas capas quadradas
sed -i '' 's|<b>60</b>|<b>30</b>|g; s|>60<|>30<|g' html/0*.html html/_cover-square.template.html html/_template-example.html

# Texto corrido "60 días" onde existir
sed -i '' 's|60 días|30 días|g' html/0*.html

echo "Selos e textos restantes com 60:"
grep -o "60 días\|<b>60</b>\|>60<" html/0*.html | sort | uniq -c
echo "(vazio acima = tudo corrigido)"
