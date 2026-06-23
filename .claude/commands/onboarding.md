---
description: Onboarding guiado do sistema do ZERO até 100% pronto — coleta todas as chaves, grava o .env, conecta MCP/tracking e valida até liberar o /nova-oferta. Rode na primeira vez.
---

Você é o instalador do sistema low-ia. Conduza o setup do usuário do **ZERO até 100% pronto** pra rodar `/nova-oferta`. Siga à risca.

## Regras
- **Uma pergunta por vez.** Não despeje tudo de uma vez.
- Para CADA chave: diga (a) pra que serve, (b) custo 🟢 grátis / 🟡 free tier / 🔴 pago, (c) o link exato de onde pegar, (d) peça pra colar. Só então passe pra próxima.
- Se o usuário não tiver uma chave 🔴/🟡 agora, marque como "pular por enquanto" e siga — o sistema roda só com o grátis.
- **NUNCA imprima de volta o valor de uma chave.** Confirme só com "✓ gravada".
- Grave tudo no `.env` (crie via `cp .env.example .env` se não existir). Nunca commite `.env` (já está no `.gitignore`).

## Passo 1 — Ferramentas locais
Rode `bash tools/check-setup.sh` e mostre só o que falta de ferramenta (node, git, Chrome, ffmpeg, poppler) com o comando de instalar. Não trave o resto por causa disso.

## Passo 2 — Chaves locais (`.env`), nesta ordem
1. `PEXELS_API_KEY`     🟢 b-roll da VSL → pexels.com/api
2. `APIFY_TOKEN`        🟡 scrape Ad Library → apify.com (Settings → Integrations → API token)
3. `ELEVENLABS_API_KEY` 🔴 voz da VSL → elevenlabs.io (Profile → API Key)
4. `VOICE_ID`           opcional (default Carla pt-BR) → só se quiser outra voz
5. `WADISPARO_API_KEY`  🔴 WhatsApp/recuperação → painel WaDisparo

Para cada uma: pergunte e, ao receber, grave/substitua a linha correspondente no `.env` (não duplique).

## Passo 3 — Higgsfield (imagens/avatar, etapa 6) 🔴
Não é chave `.env`. Explique como conectar o MCP do Higgsfield no Claude (higgsfield.ai) e peça pra confirmar quando conectar. Se já estiver conectado, valide e siga.

## Passo 4 — Tracking + checkout (produção, etapa 9)
Explique que estas NÃO vão no `.env`, e sim nas Environment Variables da **Vercel** (projeto do funil → Settings → Environment Variables → Redeploy). Liste o que vai precisar quando subir o funil, com onde pegar:
- `PIXEL_ID`             🟢 Meta Events Manager → dataset
- `META_CAPI_TOKEN`      🟢 Events Manager → Pixel → API de Conversões → Gerar token
- `CAKTO_WEBHOOK_SECRET` senha que o usuário inventa (igual nos 2 lados: Cakto + Vercel)
- `META_TEST_EVENT_CODE` só pra testar CAPI, remover depois

Avise que o link da Cakto vai no `lib/checkout.ts` e o embed do VTurb/ConverteAI no `lib/vsl.ts` — feito na etapa `/construir-funil`.

## Passo 5 — Validação final
Rode `bash tools/check-setup.sh` de novo e mostre o resumo (`X ok · Y pra plugar`). Liste o pendente e diga claramente: **"Dá pra começar agora? SIM/NÃO"** — SIM se Pexels + Cakto + Vercel + Meta estão ok. Termine com o comando exato pra começar:

```
/nova-oferta "<nicho ou URL do concorrente>"
```

Referência completa: `SETUP.md`. Não revele valores de chave.
