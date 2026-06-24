---
description: Constrói as páginas do funil (quiz/LP → VSL → checkout → upsell) a partir da oferta diferenciada, adaptando o template Next.js, com Pixel + CAPI.
argument-hint: "[oferta; lê 05-diferenciacao.md e 08-copy.md]"
---

Etapa 7 do pipeline: construir o funil. Base = o funil Next.js validado em `templates/funil-base` (quiz gamificado data-driven, VSL embed, checkout, upsell, Pixel browser + CAPI server-side via webhook Cakto).

Contexto: **$ARGUMENTS**

1. Leia `ofertas/<nome>/05-diferenciacao.md` (oferta + money model) e `08-copy.md` (copy).
2. Copie/adapte `templates/funil-base` → `ofertas/<nome>/07-paginas`. **Trocar de oferta = trocar dados + assets**, não a lógica:
   - `lib/quiz-data.ts` (passos do quiz), `lib/audios.ts` (narração), `lib/vsl.ts` (embed da VSL), `lib/checkout.ts` (link Cakto), `lib/pixel.ts` (PIXEL_ID).
   - `app/page.tsx` (capa/quiz), `/oferta` (checkout + order bump), `/upsell`, `/obrigado`.
3. **Qualidade de UI/UX (eleva a conversão):** depois de trocar dados+copy, rode a skill **`ui-ux-pro-max`** sobre `app/` (capa/quiz, `/oferta`, `/upsell`, `/obrigado`) — hierarquia visual, espaçamento, tipografia, contraste, hover/estados, mobile-first, acessibilidade. A **máquina** (componentes do quiz, animações, tracking) não muda; o foco é polir layout/legibilidade/CTA.
4. **Identidade visual da oferta:** use a skill **`design`** (+ `design-system` p/ tokens, `brand` p/ tom visual) pra definir paleta/tipografia/tokens da oferta e aplicar em `app/globals.css` (variáveis CSS) — coerente com os criativos da etapa 6. Imagens/banners pela skill `design`/`banner-design` + Higgsfield.
5. Tracking: Pixel (`components/Pixel.tsx`) + CAPI (`lib/capi.ts` + `app/api/cakto-webhook`). Env vars na Vercel.
6. Otimização mobile e padrões: ver memórias e `tools/README.md`. Validar com `npx tsc --noEmit` (nunca `build` com o `dev` no ar).

Saída: `ofertas/<nome>/07-paginas` pronto pra deploy na Vercel. Depois: `09-disparo.md` + `/analisar-funil`.
