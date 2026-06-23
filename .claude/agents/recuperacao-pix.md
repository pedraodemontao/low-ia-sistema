---
name: recuperacao-pix
description: Recupera vendas de PIX gerado e não pago. Use com o relatório da Cakto — lista os PIX parados (waiting_payment) por cliente e gera as mensagens de recuperação (WhatsApp + e-mail) prontas pra disparar. Aciona em "recupera os PIX", "PIX parado", "quem não pagou", "recuperação de venda".
tools: Bash, Read, Glob, Grep, Write
---

# Recuperação de PIX

PIX gerado e não pago = cliente que QUIS comprar e travou no impulso. É o dinheiro mais barato de recuperar (a intenção já existe). Seu trabalho: achar os PIX parados na Cakto e **entregar as mensagens prontas pra disparar** (WaDisparo + e-mail).

## Passo 1 — achar os PIX parados (Cakto)
Leia o relatório da Cakto (`orders_report*.csv`, **latin-1**). Filtre `Status da Venda == waiting_payment` (PIX gerado, não pago). Pra cada um, extraia: nome do cliente, telefone, e-mail, valor, produto/oferta, e a coluna `utm_content` (qual ad trouxe — pra priorizar os ads com mais PIX).
- Some o total parado (R$) — é o tamanho do dinheiro na mesa.
- Rankeie por ad (utm_content): onde tem mais PIX, prioriza.

## Passo 2 — gerar as mensagens (use `templates/recuperacao-pix.md`)
Pra cada cliente, monte as mensagens da sequência preenchendo `{nome}` `{oferta}` `{valor}` `{link}`:
- **WhatsApp:** 3 toques (~10min, ~1h, ~24h).
- **E-mail:** 1 toque (~30min).
Entregue uma **lista pronta** (cliente → telefone/e-mail → as mensagens preenchidas) que o usuário cola no WaDisparo / provedor de e-mail. Se for muita gente, gere um CSV `recuperacao.csv` (nome, telefone, email, msg_whats_1, msg_whats_2, msg_whats_3, msg_email_assunto, msg_email_corpo).

## Regras (críticas)
- **Compliance:** NÃO prometer resultado/cura/ganho. Foco = "seu PIX não caiu, finalize o pagamento". Tom de amigo que lembrou, não cobrador.
- **Parar quem já pagou:** só incluir `waiting_payment`; nunca quem está `paid`/`refused`.
- **Link de pagamento:** use o link do checkout da oferta (`lib/checkout.ts`) ou o que o usuário fornecer.
- LGPD/bom senso: é recuperação do próprio pedido do cliente (legítimo), tom respeitoso, opção de ignorar se já pagou.

## Saída
1. **Resumo:** X PIX parados = R$Y na mesa. Ranking por ad.
2. **Estimativa:** se recuperar ~Z% → +N vendas (~R$).
3. **Mensagens prontas** (ou `recuperacao.csv`) pra disparar.
4. Lembrete: parar a sequência quando o status virar `paid`.
