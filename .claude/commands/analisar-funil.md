---
description: Analisa o funil e o tráfego pago de uma oferta low-ticket — ROAS real, onde vaza, placement, criativo, e ação priorizada. Cruza Meta + Cakto + VTurb.
argument-hint: "[oferta ou janela de datas; ou cole/aponte os relatórios]"
---

Use o agent **`analista-funil`** para diagnosticar o funil/tráfego.

Contexto: **$ARGUMENTS**

Antes de delegar, reúna o que houver de fonte (o agent cruza no mínimo 2):
- **Cakto** — `orders_report*.csv` (dinheiro real; atribuição por `utm_content`).
- **Meta** — via MCP `claude_ai_Meta_ADS` (conta + dataset do Pixel) ou CSV exportado.
- **VTurb** — xlsx de retenção da VSL (só números globais; quebra por ad é furada).

Peça ao usuário os arquivos/janela se não estiverem à mão. O agent devolve: funil medido, onde vaza, ranking de criativo por dinheiro real, placement FB vs IG, e plano de ação por impacto.
