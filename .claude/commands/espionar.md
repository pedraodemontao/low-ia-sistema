---
description: Espiona uma oferta concorrente validada (Ad Library / página de venda) e extrai a estrutura vencedora — oferta, ângulo, mecanismo, funil, preço.
argument-hint: "<URL da Ad Library, da página de venda, ou caminho do dump>"
---

Use o agent **`espiao`** para dissecar o alvo abaixo.

Alvo: **$ARGUMENTS**

Se estivermos dentro de uma oferta (`ofertas/<nome>/`), o agent preenche `01-espionagem.md`, `03-analise.md` e `04-modelagem.md` no formato do `_template`. Senão, devolve o relatório no chat.

Lembre: **modelar ≠ clonar** — o espião só extrai a estrutura; a diferenciação (fugir do leilão) é a etapa 5.
