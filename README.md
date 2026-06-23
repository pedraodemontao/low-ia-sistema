# Low-IA — Automação de Modelagem de Ofertas

Sistema para **modelar ofertas low-ticket que já estão vendendo** e construir uma versão própria diferenciada, usando Claude Code + ferramentas de IA.

> **Princípio central:** a gente **não cria oferta do zero** — a gente **modela** o que já vende.
> **Modelar ≠ clonar.** Em low-ticket, clonar = cair no mesmo leilão do concorrente e queimar dinheiro.
> A **diferenciação** (etapa 5) é o coração: é onde a IA gera vantagem.

## Como usar (plugin Claude Code — clone & run)

É um **plugin Claude Code**. Clona o repo e os comandos ficam disponíveis:

```
claude plugin install .      # na raiz do low-ia (ou abra a pasta no Claude Code)
/nova-oferta "<nicho ou URL da Ad Library>"
```

`/nova-oferta` conduz o pipeline inteiro com checkpoint a cada etapa, delegando ao especialista certo e salvando o artefato (`ofertas/<nome>/00..09`).

### Comandos
| Comando | O que faz |
|---|---|
| **`/nova-oferta "<alvo>"`** | Orquestra o pipeline completo (espionar → diferenciar → construir → analisar) |
| `/espionar <url>` | Disseca uma oferta-alvo (agent `espiao`) → preenche 01/03/04 |
| `/diferenciar` | Etapa 5 ★ — foge do leilão + money model (skill `hormozi-ceo`) |
| `/construir-funil` | Adapta o funil Next.js (quiz/VSL/checkout/upsell + Pixel/CAPI) |
| `/analisar-funil` | ROAS real, onde vaza, placement, ação (agent `analista-funil`, cruza Meta+Cakto+VTurb) |

Agentes em `agents/`. Reusa skills globais (`persona`, `hormozi-ceo`, `copy`, `design`, `market-explorer`).

## Pipeline de modelagem

```
0 Alvo (nicho)
  └─ 1 Espionagem ──── Facebook Ad Library
       └─ 2 Coleta ──── Apify (scrape → Claude)
            └─ 3 Análise ──── Claude Code
                 └─ 4 Modelagem ──── extrai estrutura vencedora
                      └─ 5 Diferenciação ★ ──── reestrutura, foge do leilão
                           ├─ 6 Imagens ──── Higgsfield
                           ├─ 7 Páginas ──── Claude Code (LP/checkout/upsell)
                           ├─ 8 Copy ──── tom agressivo + urgente
                           └─ 9 Disparo ──── WaDisparo (WhatsApp) + tráfego
```

| # | Etapa | Ferramenta |
|---|-------|-----------|
| 0 | Alvo | input |
| 1 | Espionagem | Facebook Ad Library |
| 2 | Coleta | Apify |
| 3 | Análise | Claude Code |
| 4 | Modelagem | Claude Code |
| 5 | **Diferenciação** ★ | Claude + você |
| 6 | Imagens | Higgsfield |
| 7 | Páginas | Claude Code |
| 8 | Copy | skill `copy` (agressivo/urgente) |
| 9 | Disparo | WaDisparo + tráfego |

## Estrutura do projeto

```
low-ia/
├── README.md            # este arquivo
├── CLAUDE.md            # instruções operacionais pro Claude Code
├── pipeline.md          # spec detalhada de cada etapa
├── .claude/
│   └── skills/          # skills do projeto (construídas durante ofertas reais)
└── ofertas/
    ├── _template/       # template — copie por oferta
    └── {nome-oferta}/   # uma pasta por oferta modelada
```

## Stack de ferramentas

- **Facebook Ad Library** — espionagem (achar oferta validada)
- **Apify** — scraping de bibliotecas de anúncio
- **Higgsfield** — geração de imagem/criativo
- **Claude Code** — análise, modelagem, construção de páginas, orquestração
- **WaDisparo** — disparo em massa no WhatsApp
