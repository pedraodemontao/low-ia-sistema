# 🧠 PROMPT MASTER — Low-IA (sistema de modelagem de ofertas low-ticket)

> **Cole este texto inteiro como primeira mensagem no Claude Code** depois de clonar o repositório.
> Ele explica, função por função, como o sistema funciona — e termina te guiando a preencher as credenciais.
> Tudo é orquestrado dentro do Claude Code: você dá um comando, o sistema delega ao especialista certo e salva o resultado em arquivos `.md` dentro de `ofertas/<sua-oferta>/`.

---

## 0. O que este sistema faz (em uma frase)

Pega uma oferta que **já está vendendo**, modela a estrutura vencedora, **diferencia** pra fugir do leilão, e **constrói o funil inteiro** (páginas + criativos + vídeo + entrega em PDF + tracking).
**Regra de ouro: modelar ≠ clonar.** Clonar em low-ticket = cair no mesmo leilão e queimar dinheiro.

O estado vive em arquivos `.md` (não na memória da conversa) — por isso dá pra parar e retomar a qualquer hora.

**Entrada principal:**
```
/nova-oferta "<nicho ou URL da Facebook Ad Library>"
```
Esse comando conduz o pipeline inteiro com checkpoint a cada etapa. Os comandos abaixo são as peças que ele orquestra — você também pode chamar cada um isolado.

---

## 1. 📥 Leitura dos dados da Biblioteca de Anúncio

**Objetivo:** achar uma oferta validada e medir a escala real do concorrente (nº de criativos, tempo no ar, copies, LP de destino).

**Como funciona:**
- **Espionagem manual / assistida:** `/espionar <url-da-ad-library>` aciona o agent `espiao`, que disseca a oferta-alvo (oferta, ângulo, mecanismo, funil, preço, gatilhos) e preenche `01-espionagem.md` + `03-analise.md` + `04-modelagem.md`.
- **Coleta com escala (Apify):** o scrape de verdade roda em
  ```
  node tools/scrape-ad-library.mjs "<url-ad-library OU termo>" 30 ofertas/<nome>/02-coleta/ads.json
  ```
  Isso baixa nº de criativos + copies + anunciantes (mede ESCALA = sinal de oferta validada). O `espiao` depois **lê esse JSON** e transforma em análise.
- **Requer:** `APIFY_TOKEN` no `.env` (free tier; pode esgotar no mês — troca de ator com `APIFY_ACTOR=owner~actor`).

**Sinais de oferta validada:** semanas no ar, muitos criativos ativos, escala. Resultado salvo em `02-coleta/` (JSON/assets) + `02-coleta.md` (resumo).

---

## 2. 🏗️ Criação das páginas (ativando as skills de design)

**Objetivo:** construir LP/quiz → VSL → checkout (com order bump) → upsell (com downsell), em Next.js, com Pixel + CAPI já plugados.

**Como funciona:**
- **`/construir-funil`** clona o funil já validado e marca o que trocar:
  ```
  bash tools/scaffold-funil.sh <nome-da-oferta>
  ```
  Gera `ofertas/<oferta>/07-paginas/` (código pronto, sem `node_modules`/`.next`/mídia) + um `CUSTOMIZE.md` apontando cada ponto de troca (dados, copy, integrações, assets). **Trocar de oferta = trocar dados, não lógica.** A "máquina" (componentes, animação, tracking) não muda.
- **Polimento com as skills de design (obrigatório na etapa 7):**
  - `ui-ux-pro-max` → hierarquia, espaçamento, tipografia, contraste, mobile, acessibilidade, CTA.
  - `design` + `design-system` → identidade visual da oferta (paleta + tokens em `app/globals.css`).
  - `brand` / `banner-design` → voz de marca e peças visuais quando precisar.
  - A skill `design` usa **Gemini** pra gerar logo/ícone/banner — exige `GEMINI_API_KEY` no `.env` + `bash tools/install-skills.sh` uma vez (instala as deps Python).

Rotas geradas: `/` (LP/quiz), `/oferta` (checkout + order bump), `/upsell` (upsell + downsell embutido). Sobe na Vercel (`vercel --prod`).

---

## 3. 🎨 Geração de IMAGENS e VÍDEOS (Higgsfield)

> "Riksfield" = **Higgsfield**. Usado via **MCP** dentro do Claude (precisa conectar + ter crédito).

### 3a. Imagens / criativos (etapa 6)
Gera criativos de anúncio e imagens das páginas via Higgsfield (`generate_image`, modelo `nano_banana_pro`, 9:16, sem texto). Saída em `06-imagens/`.

### 3b. Criativo de VÍDEO — slideshow (`tools/gerar-video-ad.sh`)
Formato validado: fotos IA + Ken Burns + legenda sincronizada (palavra dourada) + narração voz IA + música.
```
# 1. gerar fotos no Higgsfield (nano_banana_pro, 9:16, SEM texto) -> cena1.png, cena2.png...
# 2. escrever roteiro.txt (copy modelada do concorrente / swipe validado)
tools/gerar-video-ad.sh roteiro.txt pasta-fotos saida.mp4 [musica.m4a]
```
Pipeline: espionar vídeo → transcrever (`~/remotion-editor/transcribe.mjs`) → modelar `roteiro.txt` → fotos Higgsfield → música (Higgsfield `sonilo_music`) → montar. Voz via **ElevenLabs**. Render via **Remotion** (composição `AdSlideshow`). Saída: `06-imagens/video-ad/*.mp4`.

### 3c. VSL densa (composição `VslEdit` no Remotion)
Avatar falante (HeyGen/Higgsfield) + b-roll. **B-roll de humanos/realistas = vídeo stock GRÁTIS do Pexels** (`node tools/fetch-pexels.mjs "<query>" <count> video <outDir> <prefix>`, requer `PEXELS_API_KEY`) — pra não queimar crédito Higgsfield. B-roll sobrenatural = imagem Higgsfield. Estrutura obrigatória em `templates/vsl-estrutura.md`. Pode embedar mp4 local OU player externo (VTurb/ConverteAI) no funil.

**Requer:** MCP Higgsfield conectado + crédito; `ELEVENLABS_API_KEY` e `PEXELS_API_KEY` no `.env`; projeto Remotion em `~/remotion-editor`; `ffmpeg`.

---

## 4. 📄 Geração do PDF (a entrega)

**Objetivo:** toda oferta gera de cara um **PDF entregável** — um MVP validável com tráfego ANTES da entrega final personalizada. É o produto que o comprador recebe (email/área de membros da Cakto/Kiwify).

**Duas formas:**

- **Entrega rápida (1 doc):**
  ```
  cp templates/entrega-mvp.html ofertas/<oferta>/entrega/entrega.html   # preencher {{PLACEHOLDERS}}
  tools/gerar-entrega-pdf.sh ofertas/<oferta>/entrega/entrega.html       # gera PDF A4 + preview PNG
  ```

- **Ebook completo (80+ páginas, data-driven):**
  ```
  node tools/gerar-ebook.mjs ofertas/<oferta>/entrega/ebook-config.mjs ofertas/<oferta>/entrega/ebook
  ```
  Trocar de oferta = trocar só o `ebook-config.mjs` (capa, capítulos, seção detalhada, orações/protocolo, bibliografia). Exemplo em `templates/ebook-config-exemplo.mjs`.

**Requer:** **Google Chrome** (renderiza o PDF) + **poppler** (`brew install poppler`, gera o preview PNG). Saída: `ofertas/<oferta>/entrega/*.pdf`.

---

## 5. 🔊 Geração do resto (áudios, copy, tracking) + "o que falta"

**Áudios do funil / narração (`tools/gerar-audios.sh`):**
```
tools/gerar-audios.sh ofertas/<oferta>/07-paginas      # lê AUDIO1_TEXTO/AUDIO2_TEXTO de lib/audios.ts → .mp3
```
Usa ElevenLabs se tiver `ELEVENLABS_API_KEY`; senão cai no `say` do macOS. Voz boa pt-BR = plano pago.

**Copy (etapa 8):** skill `copy`, tom **agressivo + urgente** (low-ticket = impulso). Sempre consulta a **Swipe Library** (`swipe/validado.md` ★, via `/swipe <nicho>`) antes de escrever do zero — é a inteligência que cresce a cada oferta.

**Diferenciação (etapa 5 ★):** `/diferenciar` — novo ângulo/empacotamento/bônus + **Money Model** (front + order bump + upsell + downsell, com 2-3 ideias de cada). É o coração do sistema.

**Tracking (etapa 9):** Meta Pixel no browser (`components/Pixel.tsx` + `lib/pixel.ts`) + CAPI server-side via webhook da Cakto (`lib/capi.ts` + `app/api/cakto-webhook/route.ts`). As chaves vão nas **Env Vars da Vercel** (não no `.env`): `PIXEL_ID`, `META_CAPI_TOKEN`, `CAKTO_WEBHOOK_SECRET`, `META_TEST_EVENT_CODE` (só validação).

**Análise / otimização:** `/analisar-funil` (agent `analista-funil`) cruza Meta + Cakto + VTurb → ROAS real, onde vaza, placement, ação. Promove o que pagou pra `swipe/validado.md`.

**"O QUE FALTA" — descobrir e preencher:**
```
/setup                      # ou: bash tools/check-setup.sh
```
Mostra exatamente quais ferramentas locais e quais chaves de API ainda faltam, com o link de onde pegar cada uma. Cada comando do pipeline também avisa quando falta algo (marcador `🔌 SETUP`).

---

## 6. ✅ Setup — preencher as credenciais (faça isto agora)

### 6.1 Ferramentas locais (instalar uma vez)
| Ferramenta | Pra que |
|---|---|
| Claude Code | rodar o sistema |
| Node 18+ | tools + funil Next.js |
| Git | clonar/versionar |
| Google Chrome | gerar PDF de entrega + screenshots |
| ffmpeg (`brew install ffmpeg`) | montar vídeo/VSL |
| poppler (`brew install poppler`) | preview do PDF |
| Python 3.9+ (`brew install python`) | skill `design` (logo/ícone/banner via Gemini) |

### 6.2 Setup guiado (recomendado)
```bash
git clone <repo> low-ia && cd low-ia
claude plugin install .          # registra /nova-oferta, /espionar, etc.
/onboarding                      # conduz a coleta de TODAS as chaves + instala skills, do zero ao 100%
```
Ou manual:
```bash
cp .env.example .env             # preencha as chaves abaixo
bash tools/install-skills.sh     # deps Python da skill design (Gemini)
bash tools/check-setup.sh        # mostra o que ainda falta
```

### 6.3 Chaves do `.env`  (🟢 grátis · 🟡 free tier · 🔴 pago)
| Variável | Pra que (etapa) | Custo | Onde pegar |
|---|---|---|---|
| `PEXELS_API_KEY` | b-roll grátis da VSL (3c) | 🟢 | pexels.com/api |
| `APIFY_TOKEN` | scrape Ad Library (1) | 🟡 | apify.com → API token |
| `GEMINI_API_KEY` | skill design: logo/ícone/banner (2) | 🟢 | aistudio.google.com/apikey |
| `ELEVENLABS_API_KEY` | voz dos áudios/VSL (3,5) | 🔴 | elevenlabs.io → API Key |
| `VOICE_ID` (opcional) | trocar a voz | — | painel ElevenLabs |
| `HIGGSFIELD_API_KEY` | imagem + vídeo/avatar (3) | 🔴 | higgsfield.ai (+ conectar MCP) |
| `WADISPARO_API_KEY` | disparo WhatsApp (5) | 🔴 | painel WaDisparo |

### 6.4 Vão nas Env Vars da VERCEL (não no `.env`)
`PIXEL_ID` · `META_CAPI_TOKEN` · `CAKTO_WEBHOOK_SECRET` (senha que você inventa, igual nos 2 lados) · `META_TEST_EVENT_CODE` (só validação). Projeto do funil → Settings → Environment Variables → Redeploy.

> **NUNCA commite o `.env`** (já está no `.gitignore`). Chaves sensíveis nunca hardcoded.

### 6.5 Dá pra começar só com o grátis?
Sim. Com **Pexels + Cakto + Vercel + Meta (grátis)** você espiona, modela, diferencia, escreve copy, constrói o funil e liga o tracking. Os pagos (ElevenLabs/Higgsfield) entram na produção de áudio/imagem/VSL — adicione quando escalar.

---

## 7. Comece

```
/onboarding                         # se ainda não plugou as chaves
/nova-oferta "<seu nicho ou URL do concorrente>"
```
A partir daí o sistema conduz: espionar → modelar → **diferenciar** → imagens/vídeo → páginas → PDF de entrega → copy → tracking → disparo. Cada etapa salva seu artefato em `ofertas/<sua-oferta>/`.
