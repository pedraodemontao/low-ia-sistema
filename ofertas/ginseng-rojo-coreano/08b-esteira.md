# 08b · Esteira (upsells + downsells) — Ritual Seúl 50+

Fluxo: **front → order bump → Upsell 1 → (recusou? Downsell 1) → Upsell 2 → (recusou? Downsell 2) → gracias.**
Tudo digital, entregável = **guia ilustrada no app** (sem acompanhamento, sem vídeo de método). Garantía **30 días** em tudo. Checkout: Hotmart (placeholder, 1-click).

---

## UPSELL 1 — El Ritual de la Cuchara Coreana · **US$19** (âncora US$47)
**O que é:** guía ilustrada no app com a secuencia coreana de yoga facial com colher (gua sha) pra fazer JUNTO com o Pegamento e acelerar o resultado (levanta o músculo enquanto a pasta nutre). Inclui: temperatura da colher (tibia/fría), orden correcta, movimento p/ papada e surco, cronograma 21 días.
**Ângulo (VSL):** cada pele reage diferente → maioria que não vê resultado na semana 1 desiste → o que muda a velocidade é o MÚSCULO → a colher ativa o músculo no momento em que a pasta nutre → resultado rápido pra qualquer uma. (VSL completa modelada — produzir vídeo depois.)
**Página:** VSL placeholder + oferta + **CTA aceitar** (Hotmart 1-click) + link recusar.
- Aceitar → `upsell-2.html` · Recusar → `downsell-1.html`

## DOWNSELL 1 — Ritual de la Cuchara *esencial* · **US$9** (de US$19)
Copy (curta, tela de downsell):
> **Espera, no te vayas.** Entiendo si el Ritual completo no era para ti ahora. Pero no te quedes sin lo mínimo: los **3 movimientos clave de la cuchara** + el **cronograma de 21 días** — lo esencial para que tu Pegamento Rojo levante el músculo y no te quedes esperando. Hoy, solo **US$9** en vez de US$19. 30 días de garantía.
- Aceitar OU recusar → `upsell-2.html`

---

## UPSELL 2 — Protocolo Coreano Anti-Manchas · **US$27** (âncora US$97)
**O que é:** guía ilustrada no app com a receita da máscara de arroz coreana (ácido kójico natural) + protocolo 21 días pra clarear manchas do rosto, axila e ingle. Par perfeito do Pegamento (um firma, o outro clareia). 100% natural (arroz, leite + 2 ingredientes baratos).
**Ângulo (VSL):** o Pegamento firma mas não apaga manchas já formadas → mancha = "curativo" de melanina sobre micro-ferida inflamada → clareador de farmácia (ácido artificial) inflama e a mancha volta pior → desinflamar + clarear no natural (ácido kójico) → piel de cristal. (VSL completa modelada.)
**Página:** VSL placeholder + oferta + **CTA aceitar** + link recusar.
- Aceitar → `gracias.html` · Recusar → `downsell-2.html`

## DOWNSELL 2 — Mini Anti-Manchas · **US$14** (de US$27)
Copy (curta):
> **Espera, no cierres.** Sé que el Protocolo completo no era para ti ahora. Pero no dejes tus manchas sin nada: llévate solo la **receta esencial de la máscara de arroz coreana** (ácido kójico natural) — lo básico para empezar a aclarar en casa. Hoy, solo **US$14** en vez de US$27. 30 días de garantía.
- Aceitar OU recusar → `gracias.html`

---

## Páginas a construir (em `07-paginas/site/`)
`upsell-1.html` · `downsell-1.html` · `upsell-2.html` · `downsell-2.html` · `gracias.html`
Design: mesmo `css/quiz.css` (vermelho), header com logo (gota + Pegamento Rojo · Dra. Mina), VSL placeholder (box com play), card de oferta, preço com âncora riscada, **timer**, CTA (botão), garantía 30 días, link de recusa discreto. Checkout = `https://pay.hotmart.com/SEU_LINK_<etapa>` (placeholder).
