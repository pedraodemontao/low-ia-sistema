# Funil-base — a máquina (template GENÉRICO)

Funil gamificado provado (quiz → áudios → VSL → checkout + upsell, com Pixel + CAPI). **Conteúdo 100% genérico/placeholder** — sem nicho. O `tools/scaffold-funil.sh` clona isto e você preenche com a SUA oferta (a oferta que você modela vira a referência).

## A máquina (não muda) vs o conteúdo (você preenche)
- **Máquina:** componentes do quiz, animações, player de áudio/VSL, engine de resultado (`lib/resultado.ts`), tracking (Pixel/CAPI), checkout/upsell, otimização mobile. Compila limpo (`npx tsc --noEmit`).
- **Conteúdo (placeholder — preencha):**
  - `lib/quiz-data.ts` — perguntas/opções do quiz (estão com `[colchetes]` de placeholder).
  - `lib/resultado.ts` — o mecanismo (mapeia data → 1 de N resultados). Troque `RESULTADOS` e os textos.
  - `lib/audios.ts` — roteiro dos áudios (placeholder).
  - copy das páginas (`app/*`) — headlines/textos a preencher.
  - `public/` — todos os slots usam `placeholder.svg`; gere as suas imagens (etapa 6) e troque slot a slot (ver `public/IMAGENS.md`).

## Integrações (placeholder — plugue o seu)
- `lib/pixel.ts` → `SEU_PIXEL_ID_AQUI`
- `lib/checkout.ts` → `SEU_LINK_CHECKOUT`
- `lib/vsl.ts` → `SEU_PLAYER_VTURB_ID`

## Usar
Não edite aqui direto. Rode `bash tools/scaffold-funil.sh <sua-oferta>` → você mexe na cópia da oferta (com um `CUSTOMIZE.md` listando tudo). Depois: `npm install` → `npx tsc --noEmit` → `vercel --prod`.
