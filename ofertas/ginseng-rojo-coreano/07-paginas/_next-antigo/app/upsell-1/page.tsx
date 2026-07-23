import { OfferStep } from "@/components/OfferStep";
import { CHECKOUT_LINKS } from "@/lib/checkout";

// Upsell 1 — El Ritual de la Cuchara Coreana · US$19 (âncora US$47).
// Aceitar → /upsell-2 · Recusar → /downsell-1. Copy: site/upsell-1.html (aprovada).
export default function Upsell1Page() {
  return (
    <OfferStep
      kicker="⏳ Solo aparece una vez"
      headline={
        <>
          Acelera tu resultado con{" "}
          <span className="gold">El Ritual de la Cuchara Coreana</span>
        </>
      }
      vslCaption="Mira este video corto antes de continuar"
      lead={
        <>
          Cada piel reacciona diferente, y lo que cambia la velocidad del resultado
          es el <strong>músculo</strong>. La cuchara coreana lo activa justo cuando
          el Pegamento nutre, para que veas el cambio{" "}
          <strong>antes de la semana 1</strong>, sin quedarte esperando.
        </>
      }
      includesTitle="Lo que incluye hoy"
      includes={[
        <>La <strong>secuencia de la cuchara paso a paso</strong>, en guía ilustrada dentro de la app</>,
        <>La <strong>temperatura correcta</strong>: cuándo usar la cuchara tibia y cuándo la fría</>,
        <>El <strong>orden correcto</strong> de los movimientos, para no trabajar en vano</>,
        <>El <strong>movimiento anti-papada</strong> y para el surco del contorno</>,
        <>El <strong>cronograma de 21 días</strong> para hacerlo junto a tu Pegamento Rojo</>,
      ]}
      anchor="US$47"
      price="US$19"
      ctaLabel="SÍ, QUIERO EL RITUAL POR US$19 →"
      refuseLabel="No, gracias"
      timerSeconds={10 * 60}
      timerLabel="Esta oferta expira en"
      checkoutUrl={CHECKOUT_LINKS.upsell1}
      acceptPath="/upsell-2"
      refusePath="/downsell-1"
      acceptEvent="Upsell1Accept"
      refuseEvent="Upsell1Refuse"
      guarantee={
        <>
          <strong>Prueba el ritual sin riesgo.</strong> Si no sientes la diferencia,
          escribe un email y te devolvemos cada centavo. La guía se queda contigo.
        </>
      }
    />
  );
}
