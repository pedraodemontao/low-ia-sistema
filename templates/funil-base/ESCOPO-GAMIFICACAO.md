# Escopo de Gamificação — pronto pra construir (sem APIs)

> Libs instaladas: `framer-motion`, `canvas-confetti`. Helpers prontos: `lib/anim.ts`, `lib/feedback.ts`.
> Tudo client-side, grátis. Nada depende de Higgsfield/gateway. Construir em cima do `app/page.tsx` atual.

## Helpers já prontos (só importar)
- `lib/anim.ts` → `stepVariants`, `fadeUp`, `staggerGrid`, `revealPop`, `tapPop`.
- `lib/feedback.ts` → `selectFx()` (som+vibra ao escolher), `revealFx()` (combo da revelação), `confettiGold()`, `tom()`, `haptic()`.

## Onde plugar cada coisa (no `app/page.tsx`)

| # | Item | Onde | Como |
|---|------|------|------|
| 1 | Transição entre passos | wrapper do `{passo === N}` | `<AnimatePresence mode="wait">` + `<motion.div key={passo} variants={stepVariants} initial="enter" animate="center" exit="exit">` |
| 2 | Tiles entram em stagger | grade `.tiles` | `motion.div variants={staggerGrid}` no container + `fadeUp` em cada `Tile` |
| 3 | Feedback ao selecionar | `onClick` de cada `Tile` | chamar `selectFx()` antes de `avancar()`; `whileTap={tapPop}` no botão |
| 4 | Barra de progresso animada | `.progress > i` | trocar por `motion.i` com `animate={{ width }}` spring + milestone (texto "🔥 quase lá" quando passo ≥ 6) |
| 5 | Medidor de sintonia do anjo | header do quiz | orb/barra que enche `= (passo/total)*100`; cresce a cada resposta |
| 6 | Micro-copy reativa | após selecionar no passo de "sinal"/"desafio" | objeto `REACOES[resposta]` → frase empática some/aparece com `fadeUp` |
| 7 | Loading multi-estágio + suspense | fase `loading` | lista de etapas com ✓ animando; barra para em ~90% e "destrava" antes do reveal |
| 8 | Revelação cinematográfica | componente `Reveal` | avatar/selo com `revealPop`; chamar `revealFx()` no mount (confete+som+vibra) |
| 9 | Waveform no áudio | player do `Reveal` | barras animbadas via `motion` enquanto `tocando` |
| 10 | Aviso com loop aberto | `Reveal` | 1ª frase visível; resto `filter: blur(6px)` + cadeado → "desbloqueie no Mapa" |
| 11 | Selo girando | `Reveal` / capa | `selo-anjo.png` com `animate={{ rotate: 360 }}` infinito + glow |
| 12 | Capa viva (partículas) | fase `capa` | partículas douradas (canvas leve ou `tsparticles` se quiser) atrás do hero |
| 13 | Prova social ao vivo | capa + pós-reveal | array de nomes/cidades + `setInterval` faux "fulano desbloqueou agora" |
| 14 | `prefers-reduced-motion` | global | desligar animações pesadas via `useReducedMotion()` do framer-motion |

## Ordem sugerida (maior impacto → menor)
1. **Revelação** (#8, #9, #10, #11) — o clímax. `revealFx()` já pronto.
2. **Feedback + transições** (#1, #2, #3, #4) — sensação tátil em todo o quiz.
3. **Loading com suspense** (#7).
4. **Sintonia + micro-copy reativa** (#5, #6).
5. **Capa viva + social proof** (#12, #13).
6. **Acessibilidade/perf** (#14) — fechar.

## Ainda precisa de ferramenta (cosmético, tem fallback)
- Voz natural da oração → IA (hoje: TTS navegador).
- Avatares únicos por anjo / selo premium / vídeo de fundo → Higgsfield (hoje: reusar `hero`/`selo`/`ad-financeiro-visual` + CSS).
