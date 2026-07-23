import { OfferStep } from "@/components/OfferStep";
import { CHECKOUT_LINKS } from "@/lib/checkout";

// Upsell 2 — Protocolo Coreano Anti-Manchas · US$27 (âncora US$97).
// Aceitar → /gracias · Recusar → /downsell-2. Copy: site/upsell-2.html (aprovada).
export default function Upsell2Page() {
  return (
    <OfferStep
      kicker="⏳ Solo aparece una vez"
      headline={
        <>
          Suma el <span className="gold">Protocolo Coreano Anti-Manchas</span>
        </>
      }
      vslCaption="Mira este video corto antes de continuar"
      lead={
        <>
          El Pegamento firma tu piel, pero <strong>no borra las manchas</strong> que
          ya se formaron. Los aclaradores de farmacia inflaman y la mancha vuelve
          peor. Este protocolo <strong>desinflama y aclara</strong> con ácido kójico
          natural, para el rostro, la axila y la ingle.
        </>
      }
      includesTitle="Lo que incluye hoy"
      includes={[
        <>La <strong>receta de la máscara de arroz coreana</strong> (ácido kójico natural)</>,
        <>El <strong>protocolo de 21 días</strong> para rostro, axila e ingle</>,
        <>La <strong>guía ilustrada paso a paso</strong> dentro de la app</>,
        <><strong>100% natural</strong>: arroz, leche y 2 ingredientes baratos de tu cocina</>,
      ]}
      anchor="US$97"
      price="US$27"
      ctaLabel="SÍ, QUIERO EL PROTOCOLO POR US$27 →"
      refuseLabel="No, gracias"
      timerSeconds={10 * 60}
      timerLabel="Esta oferta expira en"
      checkoutUrl={CHECKOUT_LINKS.upsell2}
      acceptPath="/gracias"
      refusePath="/downsell-2"
      acceptEvent="Upsell2Accept"
      refuseEvent="Upsell2Refuse"
      guarantee={
        <>
          <strong>Prueba el protocolo sin riesgo.</strong> Si no ves tu tono aclarar,
          escribe un email y te devolvemos cada centavo. La guía se queda contigo.
        </>
      }
    />
  );
}
