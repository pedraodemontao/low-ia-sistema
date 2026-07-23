// Scaffold de tracking (Meta Pixel). ID placeholder — preencher quando criar o pixel.
// Sem ID/snippet real, track() só loga (no-op seguro). Não chama API.
// Pra ativar: criar pixel no Meta, pôr o ID abaixo e adicionar o snippet base do fbq no layout.

export const PIXEL_ID: string = "SEU_PIXEL_ID_AQUI";

export type PixelEvent =
  | "QuizStart" | "Lead" | "InitiateCheckout" | "Purchase" | "ViewContent"
  | "AudioPlay" | "AudioProgress" | "AudioComplete" | "AudioAbandon"
  // Esteira (custom, viram trackCustom): aceite/recusa de cada passo + gracias.
  | "Upsell1Accept" | "Upsell1Refuse"
  | "Downsell1Accept" | "Downsell1Refuse"
  | "Upsell2Accept" | "Upsell2Refuse"
  | "Downsell2Accept" | "Downsell2Refuse"
  | "PurchaseComplete";

// Eventos padrão do Meta (vão como "track"); o resto é custom ("trackCustom").
const STANDARD = new Set<PixelEvent>(["ViewContent", "Lead", "InitiateCheckout", "Purchase"]);

export function track(event: PixelEvent, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...a: unknown[]) => void };
  if (typeof w.fbq === "function" && PIXEL_ID !== "PLACEHOLDER") {
    w.fbq(STANDARD.has(event) ? "track" : "trackCustom", event, data);
  } else {
    console.debug("[pixel:stub]", event, data ?? "");
  }
}
