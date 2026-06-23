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
3. Tracking: Pixel (`components/Pixel.tsx`) + CAPI (`lib/capi.ts` + `app/api/cakto-webhook`). Env vars na Vercel.
4. Otimização mobile e padrões: ver memórias e `tools/README.md`. Validar com `npx tsc --noEmit` (nunca `build` com o `dev` no ar).

Saída: `ofertas/<nome>/07-paginas` pronto pra deploy na Vercel. Depois: `09-disparo.md` + `/analisar-funil`.
