/* Webhook Hotmart → Purchase no Meta CAPI (Vercel Function).
 *
 * Por que server-side: o Purchase acontece no checkout da Hotmart, fora do
 * nosso domínio — o Pixel do navegador não vê. Sem isto, o Meta sabe quem
 * clicou em comprar (InitiateCheckout) mas nunca quem comprou, e a campanha
 * otimiza pelo sinal errado.
 *
 * Configurar na Hotmart: Ferramentas → Webhook (Postback) → nova integração
 *   URL:    https://SEU-DOMINIO/api/hotmart-webhook
 *   Evento: Compra aprovada (PURCHASE_APPROVED)
 *   Versão: 2.0.0
 *
 * Variáveis de ambiente na Vercel:
 *   META_PIXEL_ID       1543617480743468
 *   META_CAPI_TOKEN     token do Gerenciador de Eventos → Configurações → API de Conversões
 *   HOTMART_HOTTOK      o hottok que a Hotmart mostra ao criar o webhook
 *   META_TEST_CODE      (opcional) code de teste, para ver o evento chegar em tempo real
 */

const crypto = require('crypto');

/** O Meta exige PII com hash SHA-256, minúsculo e sem espaços nas pontas. */
function hash(v) {
  if (!v) return undefined;
  return crypto.createHash('sha256').update(String(v).trim().toLowerCase()).digest('hex');
}

/** Telefone: só dígitos antes do hash. */
function hashPhone(v) {
  if (!v) return undefined;
  const digits = String(v).replace(/\D/g, '');
  return digits ? crypto.createHash('sha256').update(digits).digest('hex') : undefined;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }

  // Só a Hotmart conhece o hottok — é o que impede alguém de forjar vendas.
  const hottok = req.headers['x-hotmart-hottok'] || req.body?.hottok;
  if (!process.env.HOTMART_HOTTOK || hottok !== process.env.HOTMART_HOTTOK) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  const evento = body.event || body.data?.event;

  // Só compra aprovada vira Purchase. Reembolso/chargeback não desfazem o
  // evento no Meta, então nem enviamos.
  if (evento && evento !== 'PURCHASE_APPROVED' && evento !== 'PURCHASE_COMPLETE') {
    return res.status(200).json({ ignored: evento });
  }

  const d = body.data || body;
  const buyer = d.buyer || {};
  const purchase = d.purchase || {};
  const price = purchase.price || purchase.original_offer_price || {};
  const product = d.product || {};

  const valor = Number(price.value ?? purchase.full_price?.value ?? 0);
  const moeda = price.currency_value || price.currency_code || 'USD';
  const transacao = purchase.transaction || d.transaction;

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        // Mesma transação = mesmo id: se a Hotmart reenviar o webhook, o Meta
        // deduplica em vez de contar a venda duas vezes.
        event_id: transacao ? `hm_${transacao}` : undefined,
        user_data: {
          em: hash(buyer.email) ? [hash(buyer.email)] : undefined,
          ph: hashPhone(buyer.checkout_phone || buyer.phone) ? [hashPhone(buyer.checkout_phone || buyer.phone)] : undefined,
          fn: hash((buyer.name || '').split(' ')[0]) ? [hash((buyer.name || '').split(' ')[0])] : undefined,
          country: hash(buyer.address?.country_iso || buyer.address?.country) ? [hash(buyer.address?.country_iso || buyer.address?.country)] : undefined,
        },
        custom_data: {
          value: valor,
          currency: moeda,
          content_name: product.name,
          content_ids: product.id ? [String(product.id)] : undefined,
          content_type: 'product',
          order_id: transacao,
        },
      },
    ],
  };

  if (process.env.META_TEST_CODE) payload.test_event_code = process.env.META_TEST_CODE;

  try {
    const url = `https://graph.facebook.com/v21.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_TOKEN}`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const out = await r.json();

    if (!r.ok) {
      console.error('CAPI recusou', out);
      // 200 mesmo assim: a Hotmart reenvia em caso de erro, e reenvio aqui
      // só geraria ruído — o log já registra o que falhou.
      return res.status(200).json({ sent: false, meta: out });
    }

    console.log('Purchase enviado', { transacao, valor, moeda });
    return res.status(200).json({ sent: true, meta: out });
  } catch (e) {
    console.error('Falha ao chamar o CAPI', e);
    return res.status(200).json({ sent: false, error: String(e) });
  }
};
