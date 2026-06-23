# Sequência de Recuperação de PIX (template)

PIX gerado e não pago = o cliente QUIS comprar e travou no impulso. É o dinheiro mais barato de recuperar (a intenção já existe). Disparar por WhatsApp (WaDisparo) + e-mail. Placeholders: `{nome}` `{oferta}` `{valor}` `{link}`.

## WhatsApp — 3 toques (timing a partir do PIX gerado)

### Toque 1 — ~10 min (lembrete quente)
> {nome}, vi aqui que o seu PIX do {oferta} foi gerado mas ainda não caiu 👀
> Tá quase! Basta abrir o app do banco e pagar o código PIX que você já recebe tudo na hora.
> Aqui o link de novo, caso precise: {link}

### Toque 2 — ~1 h (quebra de objeção + prova)
> {nome}, segurei a sua vaga 🙏 O {oferta} libera o acesso na hora do pagamento.
> Qualquer dúvida me chama aqui — quem entrou já tá usando. Não perde isso por causa de um PIX parado:
> {link}

### Toque 3 — ~24 h (urgência real + última chamada)
> {nome}, última chamada ⏳ Vou liberar a sua vaga reservada pra fila.
> Se ainda quiser o {oferta} por {valor}, paga o PIX hoje que mantenho o seu acesso:
> {link}

## E-mail — 1 toque (~30 min)
**Assunto:** {nome}, seu PIX do {oferta} não caiu ainda
> Oi {nome}, seu pedido do {oferta} está reservado, só falta o pagamento do PIX cair.
> É rápido: abra o app do banco e pague o código. O acesso libera automático.
> Pagar agora → {link}
> (Se já pagou, ignore este e-mail 🙏)

## Regras
- **Não** prometa resultado/cura (compliance). Foco = "seu PIX não caiu, finalize".
- Personalize sempre com `{nome}`. Tom: amigo que lembrou, não cobrador.
- Parar a sequência assim que o status virar `paid` (não incomodar quem pagou).
- Disparo: WaDisparo (WhatsApp) + provedor de e-mail. Gatilho = status `waiting_payment` na Cakto.
