// Checkout (Cakto). COLE AQUI o link de checkout do Acalanto (front R$197).
// Money model configurado DENTRO da Cakto (1-click pós-compra):
//   - ORDER BUMP: lubrificante íntimo base água +R$39 (toggle no checkout)
//   - UPSELL: "Leve 2" segundo Acalanto +R$157
//   - DOWNSELL: bônus digitais premium R$27
// Quando preencher, é só redeploy, nada mais muda no código.

export const CHECKOUT_URL = "https://pay.cakto.com.br/SEU_LINK_CHECKOUT";

export function irParaCheckout(extra?: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (!CHECKOUT_URL) {
    alert("Checkout ainda não configurado, cole o link da Cakto em lib/checkout.ts");
    return;
  }
  const u = new URL(CHECKOUT_URL);
  // prefill / atribuição (Cakto lê name/email da query quando disponível)
  if (extra) {
    for (const [k, v] of Object.entries(extra)) if (v) u.searchParams.set(k, v);
  }
  window.location.href = u.toString();
}
