# Low-IA — Instruções do Projeto

> Leia também o `~/.claude/CLAUDE.md` global (padrões de código da Bravy).

## O que é este projeto
Automação de **modelagem de ofertas low-ticket**. Pega oferta que já vende, modela e constrói versão própria diferenciada. É um **plugin Claude Code** (`.claude-plugin/plugin.json`): clona o repo e os comandos/agentes ficam disponíveis.

## Comandos (entrypoints)
- **`/nova-oferta "<nicho ou url>"`** — orquestrador do pipeline completo (espionar → modelar → diferenciar → construir → analisar). Delega a cada especialista com checkpoint.
- **`/espionar <url>`** — agent `espiao` disseca uma oferta-alvo (preenche 01/03/04).
- **`/diferenciar`** — etapa 5 (fugir do leilão + money model) via `hormozi-ceo`.
- **`/construir-funil`** — adapta o funil Next.js (quiz/VSL/checkout/upsell + Pixel/CAPI).
- **`/analisar-funil`** — agent `analista-funil`: ROAS real, onde vaza, placement, ação (cruza Meta+Cakto+VTurb).

Agentes: `espiao`, `analista-funil` (em `agents/`). Reusa skills globais: `persona`, `hormozi-ceo`, `copy`, `design`, `design-system`, `brand`, `banner-design`, `ui-ux-pro-max`, `market-explorer`.

**Qualidade das páginas (etapa 7):** ao construir/adaptar o funil, SEMPRE polir com a skill `ui-ux-pro-max` (UI/UX: hierarquia, espaçamento, tipografia, contraste, mobile, acessibilidade) e definir a identidade visual da oferta com `design` + `design-system` (paleta/tokens em `app/globals.css`). A máquina (componentes/animação/tracking do `funil-base`) não muda — o polimento é em layout, legibilidade e CTA.

## Swipe Library (`swipe/`) — o cérebro que compõe
Inteligência de copy/oferta GLOBAL que cresce a cada oferta. `swipe/observado.md` (mercado, do `espiao`) + `swipe/validado.md` ★ (provado pela Cakto, do `analista-funil`). Loop: espionar→observado → rodar → `analista-funil` promove o que pagou→validado → `copy` lê validado primeiro na próxima oferta. **Ao escrever copy/diferenciar, SEMPRE consultar `swipe/validado.md` do nicho** (via `/swipe <nicho>`) antes de começar do zero. `copy` (skill global) deve ler `swipe/validado.md` como swipe de maior prioridade.

## Regra de ouro
**Modelar ≠ clonar.** Em low-ticket, clonar a estrutura do concorrente = cair no mesmo leilão e perder dinheiro. **Sempre reestruturar** (etapa 5) antes de construir páginas/copy. Tom de copy: **agressivo + urgente** (compra por impulso).

## Pipeline (sempre seguir nesta ordem)
1. **Espionagem** — Facebook Ad Library: achar oferta validada (sinais: tempo no ar, nº de criativos, escala)
2. **Coleta** — Apify scrapeia a biblioteca → JSON/dados estruturados
3. **Análise** — ler o scrape: oferta validada, ângulo, estrutura de funil, preço
4. **Modelagem** — extrair estrutura vencedora (promessa, mecanismo, stack, preço, copy)
5. **Diferenciação** ★ — reestruturar pra fugir do leilão (novo empacotamento/ângulo/bônus)
6. **Imagens** — Higgsfield gera criativos + imagens das páginas
7. **Páginas** — construir LP, checkout, upsell
8. **Copy** — usar skill `copy` (tom agressivo/urgente)
9. **Disparo** — WaDisparo (WhatsApp) + tráfego pago

## Onde salvar o trabalho
- Cada oferta vive em `ofertas/{nome}/`, copiada de `ofertas/_template/`.
- Cada etapa salva seu artefato no arquivo correspondente (`01-espionagem.md`, etc.).
- **Estado vive em arquivos `.md`**, não na memória da conversa — é o que permite retomar e o que torna o produto compartilhável.

## Ferramentas e integrações
- **Apify** — quando o Pedro mandar uma URL/dump de biblioteca de anúncios, analisar o conteúdo scrapeado.
- **Higgsfield** — geração de imagem (criativos, mockups de página).
- **WaDisparo** — disparo WhatsApp.
- Chaves de API ficam em `.env` (NUNCA commitar). Pedir ao Pedro quando faltar.

## Convenções
- Código em inglês, UI/copy em português (padrão Bravy).
- Construir skills **incrementalmente**, a partir de necessidade real numa oferta — não preventivamente.
- Memória estratégica do projeto vive no vault Obsidian (`~/Claude-Memory`), não aqui.
