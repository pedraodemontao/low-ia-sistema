# QA do funil — responsividade e peso

Rodar o site primeiro: `cd ../site && python3 -m http.server 3300`

| Arquivo | O que faz |
|---|---|
| `_audit.html` | carrega as 7 páginas em iframe 390×844 e reporta overflow horizontal, alvos de toque < 44px, texto < 12px, imagens sem dimensão/lazy |
| `_probe.html` | mede larguras reais (app, CTA, parágrafo) em viewport de celular |
| `_shot.html` | wrapper para screenshot fiel: `?p=results.html` |

```bash
# auditoria
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --window-size=1200,900 --virtual-time-budget=22000 --dump-dom "file://$PWD/_audit.html"

# screenshot mobile fiel (o --window-size sozinho NÃO aplica viewport: renderiza largo e recorta)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --window-size=390,844 --screenshot="/tmp/m.png" "file://$PWD/_shot.html?p=results.html"
```
