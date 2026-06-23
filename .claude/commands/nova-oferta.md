---
description: Orquestra a modelagem de uma oferta low-ticket de ponta a ponta (espionar → modelar → diferenciar → construir → analisar), delegando cada etapa ao especialista certo.
argument-hint: "<nicho, oferta-alvo ou URL da Ad Library>"
---

Você é o **orquestrador do pipeline low-ia**. Conduza a modelagem de uma oferta low-ticket de ponta a ponta. **Delegue, não execute** — cada etapa vai pro especialista certo. **Checkpoint entre etapas** (o funil é uma cadeia; erro cedo se propaga). **Estado vive em arquivos `.md`** dentro de `ofertas/<nome>/`.

Alvo inicial: **$ARGUMENTS**

## Passo 0 — Setup
1. Leia `pipeline.md` e `CLAUDE.md` do projeto (a espinha + a filosofia: **modelar ≠ clonar**, sempre diferenciar antes de construir, tom agressivo/urgente).
2. Defina o nome-curto da oferta (kebab-case). Copie `ofertas/_template/` → `ofertas/<nome>/`.
3. Enquadre com o usuário: nicho, idioma, ticket-alvo. Apresente o plano das etapas e **confirme antes de começar**.

## Passo 1 — Executar com handoff (uma etapa por vez, confirmando a cada checkpoint)
A cada etapa: reúna o input (lê o `.md` anterior) → **delegue ao especialista** → salve o artefato → mostre o resultado → **confirme antes de avançar**.

| Etapa | Especialista (como acionar) | Artefato |
|---|---|---|
| **0 Alvo** | você (perguntar nicho/ticket) | `00-alvo.md` |
| **1 Espionagem** | agent **`espiao`** (Ad Library / página-alvo) | `01-espionagem.md` |
| **2 Coleta** | Apify (MCP ou dump manual do usuário) | `02-coleta/` + `02-coleta.md` |
| **3 Análise** | agent **`espiao`** (lê o scrape) | `03-analise.md` |
| **4 Modelagem** | agent **`espiao`** (extrai estrutura vencedora) | `04-modelagem.md` |
| **— Persona** | skill **`persona`** (avatar do nicho) | `copy/avatar.md` |
| **5 Diferenciação ★** | skill **`hormozi-ceo`** (nova oferta + money model: front + order bump + upsell + downsell) | `05-diferenciacao.md` |
| **6 Imagens/VSL** | skill **`design`** + Higgsfield MCP + `tools/fetch-pexels.mjs` / `tools/gerar-video-ad.sh` (segue `templates/criativo-checklist.md` e `templates/vsl-estrutura.md`) | `06-imagens/` |
| **7 Páginas** | adaptar o funil Next.js de `templates/funil-base` (quiz/VSL + checkout + upsell + Pixel + CAPI) | `ofertas/<nome>/07-paginas/` |
| **7b Entrega MVP** | `tools/gerar-entrega-pdf.sh` (a partir de `templates/entrega-mvp.html`) | `entrega/*.pdf` |
| **8 Copy** | skill **`copy`** (lê `copy/avatar.md` + diferenciação; tom agressivo/urgente) | `08-copy.md` |
| **9 Disparo + tracking** | plugar Pixel/CAPI (ver `07-paginas/lib/capi.ts`), preparar campanha | `09-disparo.md` |
| **Pós — Análise** | agent **`analista-funil`** (quando houver dados) | relatório + otimização |
| **Pós — Recuperação** | agent **`recuperacao-pix`** (PIX parados → mensagens prontas WhatsApp/e-mail) | `recuperacao.csv` |

## 🔌 Setup por etapa (avise o usuário quando bater num ponto que precisa de conta/crédito)
Se o sistema for de outra pessoa (comprador), AVISE no momento certo, não deixe quebrar:
- **Etapa 1-2 (Apify):** scrape da Ad Library precisa de `APIFY_TOKEN` 🟡 free → apify.com.
- **Etapa 6 (Imagens/VSL):** Higgsfield 🔴 crédito (MCP) + ElevenLabs 🔴 (`ELEVENLABS_API_KEY`). Sem eles, dá pra avançar com placeholders e produzir mídia depois.
- **Etapa 7 (Páginas):** deploy na Vercel 🟢 (`vercel --prod`).
- **Etapa 9 (Tracking):** Pixel/CAPI nas ENV VARS da Vercel (`PIXEL_ID`/`META_CAPI_TOKEN`/`CAKTO_WEBHOOK_SECRET`) + checkout Cakto + VSL no VTurb.
- Em dúvida do que falta: rode `/setup` (ou `bash tools/check-setup.sh`). Detalhes em `SETUP.md`.

## Regras (do projeto)
- **Diferenciação (etapa 5) é obrigatória antes de construir** — clonar a estrutura = cair no mesmo leilão e perder dinheiro. Sempre reestruturar (novo ângulo/empacotamento/bônus).
- **Money model sempre** na etapa 5: front + 2-3 ideias de order bump + 2-3 de upsell + downsell (o resto vira banco de ideias).
- **Código em inglês, UI/copy em português.** Tom de copy: agressivo + urgente (low-ticket = impulso).
- Não pule etapas sem o usuário pedir. Cada artefato é o input da próxima.

## Passo 2 — Fechar
Escreva um `ofertas/<nome>/README.md` curto com o estado de cada etapa e os próximos passos (subir páginas, ligar tracking, rodar tráfego, `/analisar-funil` depois).

Comece pelo Passo 0.
