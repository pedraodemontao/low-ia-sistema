# Slots de imagem (etapa 6 — Higgsfield)

O template usa **um placeholder único** (`placeholder.svg`) em todos os slots. Gere as suas imagens (etapa 6) e substitua slot a slot — troque o `src` no componente indicado por `/{seu-arquivo}.webp` e salve o arquivo aqui em `public/`.

| Slot | Onde aparece | Sugestão de formato |
|------|--------------|---------------------|
| Capa/hero | `app/page.tsx` | 16:10 |
| Avatar/selo do resultado | `components/quiz/Leitura.tsx` | 1:1 |
| Imagem da ativação | `components/quiz/Ativacao.tsx` | 1:1 |
| Mockup do produto | `app/oferta/page.tsx`, `app/obrigado/page.tsx` | 16:10 |
| Imagem do upsell | `app/upsell/page.tsx` | 1:1 |

> As páginas usam `<img src="/placeholder.svg">`. Otimize as suas imagens pra WebP antes de subir.
