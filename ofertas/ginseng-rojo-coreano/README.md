# Oferta: Ritual Seúl 50+ (ES/LatAm)

Modelagem da oferta escalada **"Cola de Arroz Roxo Coreano"** (PT-BR, koreanskinapp.site) → versão própria em **espanhol neutro LatAm**, mecanismo trocado pra fugir do leilão.

- **Mecanismo:** El Pegamento Rojo Coreano (**ginseng rojo**, cor vermelha) — receita ancestral coreana, ritual noturno 2 min, sem botox.
- **Persona:** Dra. Mina Seo · **Avatar:** mulher 50–62 LatAm (flacidez/papada/manchas).
- **Checkout:** Hotmart (placeholder até criar os produtos). **Preços USD.**

## Estado das etapas

| Etapa | Estado | Artefato |
|---|---|---|
| 0 Alvo | ✅ | `00-alvo.md` |
| 1 Espionagem | ✅ (30 criativos, todos ativos/vídeo) | `01-espionagem.md` |
| 2 Coleta | ✅ (Apify `apify~facebook-ads-scraper`) | `02-coleta.md` + `02-coleta/ads.json` |
| 3 Análise | ✅ | `03-analise.md` |
| 4 Modelagem | ✅ | `04-modelagem.md` |
| 5 Diferenciação ★ | ✅ (mecanismo trocado + money model USD) | `05-diferenciacao.md` |
| — Persona | ✅ | `copy/avatar.md` |
| 6 Imagens/VSL | ⏸️ **pausado** (sem Higgsfield nesta oferta) | `06-imagens/` |
| 7 Páginas | ✅ (build OK, 11 rotas) | `07-paginas/` |
| 8 Copy | ✅ (ES, tom agressivo) | `08-copy.md` |
| 8c VSL Upsell 2 | ✅ script pronto (falta gravar) | `08c-vsl-upsell-2.md` |
| 8b Compliance | ⬜ pendente (rodar antes de subir anúncio) | — |
| — Entregáveis (9 PDFs) | ✅ 335 págs, zero overflow | `entregaveis/pdf/` |
| — Arte de produto | ✅ banner checkout + 6 capas 1200×1200 | `06-imagens/`, `entregaveis/fotos/` |
| — Cadastro Hotmart | ✅ 6 produtos em rascunho (IDs no arquivo) | `10-hotmart-produtos.md` |
| — App do front (PWA) | ✅ build OK, instalável, offline | `10-app/` |
| 9 Disparo + tracking | ⬜ pendente | `09-disparo.md` |

## Entregáveis digitais (`entregaveis/`)
9 ebooks em ES neutro, design próprio (`html/_ebook.css`, 6×9in, vermelho ginseng + creme, diagramas SVG esquemáticos). Fonte em `html/`, PDF em `pdf/`. Regerar: `bash entregaveis/render.sh` · validar corte de conteúdo: `bash entregaveis/check.sh`.

| PDF | Págs | Produto |
|---|---|---|
| `01-el-pegamento-rojo-coreano` | 71 | Front $10 |
| `07/08/09-bono-*` | 16/16/15 | Bônus do front |
| `02-protocolo-de-choque-3-noches` | 52 | Bump $9 |
| `03-el-ritual-de-la-cuchara-coreana` | 60 | Upsell 1 $19 |
| `04-ritual-cuchara-version-esencial` | 25 | Downsell 1 $9 |
| `05-protocolo-coreano-anti-manchas` | 58 | Upsell 2 $27 |
| `06-mini-anti-manchas` | 22 | Downsell 2 $14 |

## Money model (USD · Hotmart) — estrutura FINAL travada (05-diferenciacao.md)
Front **$10** → order bump **$9** (no checkout) → **Upsell 1** *El Ritual de la Cuchara Coreana* **$19** (âncora $47; recusou → **Downsell 1** *versión esencial* **$9**) → **Upsell 2** *Protocolo Coreano Anti-Manchas* **$27** (âncora $97; recusou → **Downsell 2** *Mini Anti-Manchas* **$14**) → gracias. Garantía 30 días em toda a esteira (limite da Hotmart).

## ⚠️ O funil que vale é `07-paginas/site/` (HTML estático)
Rodar com `cd 07-paginas/site && python3 -m http.server 3300`. Tem as 77 fotos, os preços finais e Pixel. A versão Next foi aposentada em `07-paginas/_next-antigo/` (nunca teve as fotos) — detalhe em `07-paginas/README.md`.

## Fluxo das páginas (histórico — a versão Next, hoje em `_next-antigo/`)
`/` quiz → `/oferta` ($10, checkout Hotmart + bump) → `/upsell-1` ($19) —aceitou→ `/upsell-2` · —recusou→ `/downsell-1` ($9) → `/upsell-2` ($27) —aceitou→ `/gracias` · —recusou→ `/downsell-2` ($14) → `/gracias`.
Rotas antigas viram redirect (next.config.ts): `/upsell`→`/upsell-1`, `/downsell`→`/downsell-1`, `/obrigado`→`/gracias`. Links Hotmart placeholder dos 6 produtos em `07-paginas/lib/checkout.ts` (`CHECKOUT_LINKS`, `HOTMART_LINK_*`).

## Próximos passos (pra ficar 100%)
1. **Criativos + VSL** (etapa 6) — quando decidir a ferramenta de vídeo/imagem.
2. **Hotmart** — os 6 produtos existem em rascunho (IDs e status em `10-hotmart-produtos.md`). Falta: anexar PDFs aos produtos 1 e 2, trocar PDF/foto dos produtos 3–6 pelas versões com "30 días", finalizar cadastro (envia para análise), colar os links em `07-paginas/lib/checkout.ts` (`CHECKOUT_LINKS`) e configurar order bump/upsell 1-clique + redirects pós-compra.
2b. **Garantia 30 días** (a Hotmart só permite 30 de reembolso). ✅ Corrigidos: entregáveis, descrições, páginas do funil, e os docs `08-copy`/`08b-esteira`/`05-diferenciacao`/`avatar`/README. ❌ Falta: produtos **3–6 na Hotmart** ainda cadastrados com "60 días" (10-hotmart-produtos.md ⚠️) e o **banner de checkout** (`06-imagens/banner-checkout-hotmart.png`, selo "60 DÍAS" queimado na imagem — regerar, não é sed).
3. **Compliance** — rodar `/compliance` na copy do anúncio (`08-copy.md` §1) antes de subir.
4. **Tracking** — Pixel/CAPI: preencher `PIXEL_ID`/`META_CAPI_TOKEN` nas ENV da Vercel; ligar VSL (VTurb) em `lib/vsl.ts`.
5. **Deploy** — `cd 07-paginas && vercel --prod`.
6. **Domínio** — comprar (evitar os do alvo): ex. `ritualseul.com` / `pielcoreana.app`.
