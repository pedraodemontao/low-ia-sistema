// Checkout (Hotmart). COLE AQUI os links reais de cada produto da esteira.
// Placeholders: HOTMART_LINK_* — enquanto o link for placeholder, as páginas de
// upsell/downsell apenas navegam pro próximo passo (demo). Quando colar o link
// real, o CTA de aceitar passa a abrir o checkout Hotmart (configure na Hotmart
// o redirect pós-compra pro próximo passo do funil). Depois é só redeploy.
//
// Esteira FINAL (05-diferenciacao.md):
//   front $10 → order bump $9 (dentro do checkout do front, config na Hotmart)
//   → /upsell-1 $19 (recusou → /downsell-1 $9)
//   → /upsell-2 $27 (recusou → /downsell-2 $14) → /gracias

export const CHECKOUT_LINKS = {
  front: "https://pay.hotmart.com/HOTMART_LINK_FRONT", // Receta del Pegamento Rojo Coreano — US$10
  bump: "https://pay.hotmart.com/HOTMART_LINK_BUMP", // Protocolo de Choque 3 Noches — US$9 (order bump no checkout do front)
  upsell1: "https://pay.hotmart.com/HOTMART_LINK_UPSELL1", // El Ritual de la Cuchara Coreana — US$19
  downsell1: "https://pay.hotmart.com/HOTMART_LINK_DOWNSELL1", // Ritual de la Cuchara, versión esencial — US$9
  upsell2: "https://pay.hotmart.com/HOTMART_LINK_UPSELL2", // Protocolo Coreano Anti-Manchas — US$27
  downsell2: "https://pay.hotmart.com/HOTMART_LINK_DOWNSELL2", // Mini Anti-Manchas — US$14
} as const;

export const CHECKOUT_URL = CHECKOUT_LINKS.front;

export function isCheckoutPlaceholder(url: string) {
  return url.includes("HOTMART_LINK_");
}

export function irParaCheckout(extra?: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (!CHECKOUT_URL) {
    alert("Checkout ainda não configurado, cole o link da Hotmart em lib/checkout.ts");
    return;
  }
  const u = new URL(CHECKOUT_URL);
  // prefill / atribuição (Hotmart lê name/email da query quando disponível)
  if (extra) {
    for (const [k, v] of Object.entries(extra)) if (v) u.searchParams.set(k, v);
  }
  window.location.href = u.toString();
}
