# 🚀 SETUP — comece aqui (sistema low-ia)

Este sistema monta ofertas low-ticket de ponta a ponta no **Claude Code**. O cérebro (espionar, modelar, diferenciar, copy) é grátis. Onde precisa de conta/crédito está **marcado abaixo** — plugue o seu e funciona.

## 1. Ferramentas locais (instalar uma vez)
| Ferramenta | Pra que | Como |
|---|---|---|
| **Claude Code** | rodar o sistema | claude.ai/code |
| **Node 18+** | tools (`fetch-pexels`) + funil Next.js | nodejs.org |
| **Git** | clonar/versionar | git-scm.com |
| **Google Chrome** | gerar PDF de entrega + screenshots | google.com/chrome |
| **ffmpeg** | montar vídeo/VSL (Remotion) | `brew install ffmpeg` |
| **poppler** | preview do PDF | `brew install poppler` |
| **Python 3.9+** | skill `design` (logo/ícone/banner via Gemini) | `brew install python` |

Depois de clonar, rode **`bash tools/install-skills.sh`** uma vez — instala as deps Python da skill `design`. As demais skills (`ui-ux-pro-max`, `design-system`, `brand`, `banner-design`) não precisam de install.

## 2. Contas / APIs (plugue as suas)
🟢 = grátis · 🟡 = free tier · 🔴 = pago/crédito

| Serviço | Pra que (etapa) | Custo | Onde pegar | Onde colocar |
|---|---|---|---|---|
| **Pexels** | b-roll grátis da VSL (6) | 🟢 | pexels.com/api | `.env` → `PEXELS_API_KEY` |
| **Apify** | scrape Ad Library (1-2) | 🟡 | apify.com → API token | `.env` → `APIFY_TOKEN` |
| **Meta Pixel + CAPI** | tracking (9) | 🟢 | Events Manager | Vercel env (ver §3) |
| **Cakto** | checkout/venda | 🟢 (taxa/venda) | cakto.com.br | link no `lib/checkout.ts` + webhook |
| **Vercel** | subir o funil | 🟢 | vercel.com | `vercel --prod` |
| **ElevenLabs** | voz dos áudios/VSL (6c) | 🔴 | elevenlabs.io → API Key | `.env` → `ELEVENLABS_API_KEY` |
| **Gemini (Google AI)** | skill `design`: logo/ícone/banner/CIP (6) | 🟢 free tier | aistudio.google.com/apikey | `.env` → `GEMINI_API_KEY` |
| **Higgsfield** | imagem + vídeo/avatar (6) | 🔴 crédito | higgsfield.ai (MCP) | conectar MCP no Claude |
| **VTurb/ConverteAI** | player da VSL | 🟡/🔴 | converteai.net | embed no `lib/vsl.ts` |
| **WaDisparo** | WhatsApp/recuperação (9) | 🔴 | wadisparo | `.env` → `WADISPARO_API_KEY` |

## 3. Passo a passo
```bash
# 1. clonar e instalar o plugin
git clone <repo> low-ia && cd low-ia
claude plugin install .        # registra /nova-oferta, /espionar, etc.

# 2. chaves locais — guiado (recomendado)
/onboarding                    # conduz a coleta de TODAS as chaves + instala as skills, do zero até 100%
# ou manual:
cp .env.example .env           # preencha as chaves (§2)
bash tools/install-skills.sh   # instala deps das skills de design (Gemini/imagem)
bash tools/check-setup.sh      # mostra o que falta

# 3. começar uma oferta
/nova-oferta "<seu nicho ou URL do concorrente>"
```
**Tracking (etapa 9, na Vercel):** projeto do funil → Settings → Environment Variables → adicionar `PIXEL_ID`, `META_CAPI_TOKEN`, `CAKTO_WEBHOOK_SECRET` → Redeploy. Detalhe em `ofertas/<sua>/07-paginas` + `lib/capi.ts`.

## 4. Dá pra começar SÓ com o grátis?
Sim. Com **Pexels + Cakto + Vercel + Meta (grátis)** você espiona, modela, diferencia, escreve copy, constrói o funil e liga o tracking. Os pagos (ElevenLabs/Higgsfield) entram na produção de **áudio/imagem/VSL** — pode começar sem e adicionar quando escalar. Cada etapa avisa se falta algo (procure o marcador `🔌 SETUP` nos comandos).
