---
description: Verifica o setup do sistema (ferramentas locais + chaves de API) e mostra exatamente o que falta plugar, com onde pegar cada uma.
---

Rode o check de setup e guie o usuário no que falta:

1. Execute `bash tools/check-setup.sh` e mostre a saída.
2. Para cada item ⚠️, explique em 1 linha: pra que serve, custo (🟢 grátis / 🟡 free tier / 🔴 pago), e o link de onde pegar (está no `SETUP.md` e no `.env.example`).
3. Lembre: dá pra começar só com o grátis (Pexels + Cakto + Vercel + Meta). Os pagos (ElevenLabs/Higgsfield) entram na produção de áudio/imagem/VSL.
4. Se o `.env` não existir, oriente: `cp .env.example .env` e preencher.

Não revele valores de chave. Referência completa: `SETUP.md`.
