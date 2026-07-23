import { OfferStep } from "@/components/OfferStep";
import { CHECKOUT_LINKS } from "@/lib/checkout";

// Downsell 2 — Mini Anti-Manchas · US$14 (de US$27).
// Aceitar OU recusar → /gracias. Copy: site/downsell-2.html (aprovada).
export default function Downsell2Page() {
  return (
    <OfferStep
      kicker="⚠️ Última oportunidad"
      urgent
      headline={
        <>
          Espera, <span className="gold">no cierres</span>
        </>
      }
      vslCaption="30 segundos antes de que cierres"
      lead={
        <>
          Sé que el Protocolo completo no era para ti ahora. Pero no dejes tus
          manchas sin nada: llévate solo la{" "}
          <strong>receta esencial de la máscara de arroz coreana</strong> (ácido
          kójico natural), lo básico para empezar a aclarar en casa.
        </>
      }
      includesTitle="La versión esencial"
      includes={[
        <>La <strong>receta esencial</strong> de la máscara de arroz coreana (ácido kójico natural)</>,
        <>Lo <strong>básico para empezar a aclarar en casa</strong>, sin lo extra</>,
      ]}
      anchor="US$27"
      price="US$14"
      ctaLabel="SÍ, LO QUIERO POR US$14 →"
      refuseLabel="No, gracias"
      timerSeconds={3 * 60}
      timerLabel="Última oportunidad, expira en"
      checkoutUrl={CHECKOUT_LINKS.downsell2}
      acceptPath="/gracias"
      refusePath="/gracias"
      acceptEvent="Downsell2Accept"
      refuseEvent="Downsell2Refuse"
      guarantee={
        <>
          <strong>Sin riesgo para ti.</strong> Si no ves tu tono aclarar, escribe un
          email y te devolvemos cada centavo. La guía se queda contigo.
        </>
      }
    />
  );
}
