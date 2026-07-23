# Funil — Ritual Seúl 50+ (ES/LatAm)

> **A versão viva é `site/`.** É HTML estático, com as 77 fotos, os preços finais da
> esteira e Pixel nos 7 arquivos. Não existe build: é abrir e usar.

```bash
cd site && python3 -m http.server 3300
# http://localhost:3300
```

| Página | Arquivo | Preço |
|---|---|---|
| Quiz (isca) | `index.html` | — |
| Resultado + oferta | `results.html` | $10 + bump $9 |
| Upsell 1 · Cuchara | `upsell-1.html` | $19 (âncora $47) |
| Downsell 1 · Esencial | `downsell-1.html` | $9 |
| Upsell 2 · Anti-Manchas | `upsell-2.html` | $27 (âncora $97) |
| Downsell 2 · Mini | `downsell-2.html` | $14 |
| Obrigado | `gracias.html` | → link do app |

## Estado (20/07)

✅ **Links da Hotmart** — os 6 produtos ativos e instalados. Tabela em `../10-hotmart-produtos.md`.
✅ **Cupom** — `RITUAL20` (20% off no front), usado no exit-intent do `results.html`.
✅ **Pixel** — `1543617480743468` em `site/js/pixel.js`, nos 7 HTMLs. Dispara PageView,
   ViewContent, Lead e InitiateCheckout + os eventos custom do quiz. Preserva UTMs.

### Tracking — FECHADO em 22/07

Domínio de produção: **https://pegamentorojo.site** (segue o último deploy sozinho).

| Item | Estado |
|---|---|
| Pixel `1543617480743468` nos 7 HTMLs | ✅ PageView, ViewContent, Lead, InitiateCheckout |
| `META_PIXEL_ID` / `META_CAPI_TOKEN` / `HOTMART_HOTTOK` na Vercel | ✅ Production |
| Webhook na Hotmart (Compra aprovada, v2.0.0) | ✅ criado |
| Purchase server-side chegando no Meta | ✅ `{"sent":true,"events_received":1}` |

Endpoint: `https://pegamentorojo.site/api/hotmart-webhook` — GET 405, POST sem hottok 401,
POST com hottok válido envia o Purchase.

⚠️ O teste entrou **sem** `test_event_code`, então há um Purchase fictício de US$10
(`HP-TESTE-1`) no pixel. Para testar sem sujar dados: setar `META_TEST_CODE`, testar,
**remover e redeployar** — se ficar setado, todo Purchase real vira evento de teste.

### Corrigido em 21/07 (testado no browser, 5 checkouts)

1. **Upsells/downsells não abriam o checkout.** As 4 páginas tinham `e.preventDefault()`
   no CTA de aceitar e pulavam direto pra próxima página do funil (stub de demo).
   Agora o `<a>` leva pro `pay.hotmart.com`.
2. **UTM quebrava o checkout do front.** `getUTMQuery()` devolve com `&` na frente, mas
   era concatenado numa URL SEM `?` → `pay.hotmart.com/A106789289T&utm_source=…` →
   Hotmart respondia **"Offer not found" (erro 008)**. Ou seja: todo clique de tráfego
   pago morria. Criado `window.appendUTM(url)` em `js/pixel.js` — usar SEMPRE ele.

### Otimização mobile + velocidade (22/07)

Peso do site: **10 MB → 3,5 MB**. Caminho crítico do quiz: **197 KB**.

| O que era | O que virou |
|---|---|
| 6 PNGs de ~1 MB (1000×1000) exibidas a **84px** na pergunta 5 do quiz | WebP 240px — **5,1 MB → 24 KB** |
| 68 JPGs | WebP q80 — 4,8 MB → 3,2 MB |
| Inter do Google Fonts (2 conexões externas + 6 pesos) | **self-hosted** `fonts/inter-var-latin.woff2` (48 KB, variável, cobre todos os pesos) |
| `user-scalable=no` (bloqueava zoom — público 50-62 anos) | zoom liberado |
| textos de 7,5–10px | piso de 11px, apoio em 12px |
| "No, gracias" com 15px de altura | alvo de 46px (mínimo de toque) |
| imagens sem dimensão → layout shift | width/height reais em 19 `<img>` + `aspect-ratio` no CSS |
| 10 arquivos `.bak` subindo no deploy | removidos |
| sem cache headers | `assets/` e `fonts/` com `immutable` de 1 ano |

Originais das imagens: `_assets-originais-webp/` (fora do deploy). Ferramentas de QA
e como rodar: `_qa/README.md` — auditoria de overflow, alvo de toque, texto pequeno e CLS.

### Persona visual unificada (22/07)

O funil tinha **duas mulheres diferentes** como "Dra. Mina Seo": a hero/hanbok e as fotos
herdadas do alvo (arquivos `*yuna*`, doutora de jaleco branco). Trocadas por fotos da
mesma pessoa (hanbok laranja no hanok):

| Slot | Antes | Agora |
|---|---|---|
| Hero do quiz | `t01-hero` (jaleco) | `t01-hero` (hanbok + tigela) |
| Chip "Dra. Mina" | `avatar-mina` (jaleco) | recorte do rosto da hero |
| Diagnóstico | `t25-dryuna-diagnosis` | `t25-mina-diagnosis-v2` |
| App | `op-02-yuna-app` | `op-02-mina-app-v2` |
| Garantia | `op-09-yuna-guarantee` | `op-09-mina-guarantee-v2` |
| Credenciais | `t14-dryuna-authority` | `t14-mina-authority-v2` (crop da hero) |

Arquivos antigos movidos para `_assets-originais-webp/`. **Nomes novos de propósito:**
com `Cache-Control: immutable`, reaproveitar o mesmo nome faz quem já visitou continuar
vendo a foto antiga. Ao trocar qualquer imagem, use sufixo novo (`-v2`, `-v3`).

⚠️ **Armadilha do anti-CLS:** `width`/`height` nos `<img>` sem `height:auto` no CSS viram
altura fixa em px — as imagens esticaram e a página ganhou ~1.150px de altura fantasma.
Regra `img[width][height]{height:auto}` no `quiz.css` resolve. Não remover.

### Ainda pendente na Hotmart (não é código)

- **Order bump não aparece** no checkout do front — "Detalhes da compra" mostra só o
  produto de $10. Configurar em Ferramentas → order bump (produto 2 no checkout do 1).
- **Redirect pós-compra**: cada produto precisa apontar a página de agradecimento pro
  próximo passo (up1/down1 → `upsell-2.html`; up2/down2 → `gracias.html`), senão o
  funil morre no obrigado padrão da Hotmart.
- ~~Cupom `RITUAL20`~~ **resolvido em 21/07**: o parâmetro é `?offDiscount=RITUAL20`
  (não `?off=`, que é código de OFERTA e era ignorado). Testado: abre em R$44,77 com
  "Cupom RITUAL20 aplicado!". Já corrigido em `results.html` (`CHECKOUT_URL_DISCOUNT`).
- **"Autor: C Company"** aparece pro comprador em todos os checkouts.

### Ainda pendente

- **Link do app** — `gracias.html` aponta para `https://consumer.hotmart.com/` (área do
  comprador, onde os 6 produtos são entregues). Trocar por `app.pegamentorojo.site`
  quando o PWA (`../10-app/`) for publicado.
- **VSL do upsell 2** — `upsell-1.html` virou TSL (texto) e não precisa mais de vídeo;
  `upsell-2.html` ainda tem placeholder.

## `_next-antigo/` — o que é e por que ficou

Existiu uma segunda versão do funil em Next.js. Ela **nunca teve as fotos** (o `public/`
só tinha um placeholder) e ficou para trás em conteúdo. Foi aposentada aqui para não
subir por engano — o sintoma clássico era rodar `npm run dev` na raiz e ver um funil
antigo e sem imagem.

Não foi apagada porque tem duas coisas reaproveitáveis:

- **`_next-antigo/app/api/capi/`** — espelha os eventos do funil no Meta CAPI server-side,
  com o mesmo `event_id` do `fbq` do browser (deduplicação). Melhora atribuição de verdade.
  Site estático não roda isso sozinho; se quiser, vira Vercel Function ao lado do `site/`.
- **`_next-antigo/lib/capi.ts`** — a implementação em si.

⚠️ **`_next-antigo/app/api/cakto-webhook/`** está desatualizado: aponta para a **Cakto**, e a
oferta passou para a **Hotmart**. Se for religar o Purchase server-side, tem que refazer
para o webhook da Hotmart.

## Outras pastas

- `_assets-backup/` — as mesmas fotos de `site/assets/`, guardadas.
- `referencia/` — captura do funil-alvo original (modelagem). Só consulta, não é nosso.
- `public/` — sobra do Next, sem uso.
