import { OfferStep } from "@/components/OfferStep";
import { CHECKOUT_LINKS } from "@/lib/checkout";

// Downsell 1 — Ritual de la Cuchara, versión esencial · US$9 (de US$19).
// Aceitar OU recusar → /upsell-2. Copy: site/downsell-1.html (aprovada).
export default function Downsell1Page() {
  return (
    <OfferStep
      kicker="⚠️ Última oportunidad"
      urgent
      headline={
        <>
          Espera, <span className="gold">no te vayas</span>
        </>
      }
      vslCaption="30 segundos antes de que cierres"
      lead={
        <>
          Entiendo si el Ritual completo no era para ti ahora. Pero no te quedes sin
          lo mínimo: los <strong>3 movimientos clave de la cuchara</strong> y el{" "}
          <strong>cronograma de 21 días</strong>, lo esencial para que tu Pegamento
          Rojo levante el músculo y no te quedes esperando.
        </>
      }
      includesTitle="La versión esencial"
      includes={[
        <>Los <strong>3 movimientos clave</strong> de la cuchara coreana</>,
        <>El <strong>cronograma de 21 días</strong> para acompañar tu Pegamento</>,
        <>Lo esencial para que la pasta <strong>levante el músculo</strong>, sin lo extra</>,
      ]}
      anchor="US$19"
      price="US$9"
      ctaLabel="SÍ, LO QUIERO POR US$9 →"
      refuseLabel="No, gracias"
      timerSeconds={3 * 60}
      timerLabel="Última oportunidad, expira en"
      checkoutUrl={CHECKOUT_LINKS.downsell1}
      acceptPath="/upsell-2"
      refusePath="/upsell-2"
      acceptEvent="Downsell1Accept"
      refuseEvent="Downsell1Refuse"
      guarantee={
        <>
          <strong>Sin riesgo para ti.</strong> Si no sientes la diferencia, escribe
          un email y te devolvemos cada centavo. La guía se queda contigo.
        </>
      }
    />
  );
}
