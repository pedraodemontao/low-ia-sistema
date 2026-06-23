---
description: Recupera vendas de PIX gerado e não pago — lista os parados do relatório Cakto e gera as mensagens de recuperação (WhatsApp + e-mail) prontas pra disparar.
argument-hint: "<caminho do orders_report.csv da Cakto> [link de pagamento]"
---

Use o agent **`recuperacao-pix`** pra recuperar o dinheiro parado em PIX.

Entrada: **$ARGUMENTS** (relatório Cakto; opcional o link de pagamento).

O agent: filtra `waiting_payment`, soma o total na mesa, rankeia por ad (`utm_content`), e gera as mensagens prontas (WhatsApp 3 toques + e-mail) ou um `recuperacao.csv`. Segue `templates/recuperacao-pix.md`. Tom: amigo que lembrou (sem prometer resultado — compliance). Pare quem já pagou.
