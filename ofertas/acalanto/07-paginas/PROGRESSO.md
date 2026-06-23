# PROGRESSO — Camada de Gamificação (funil Anjo Regente)

Atualizado: 2026-06-12 · Validação: `npx tsc --noEmit` (NUNCA `npm run build` com `dev` no ar — corrompe `.next`)
Plano completo: `/Users/pedro/.claude/plans/pode-criar-tudo-que-swift-gray.md`

## Estado dos checkpoints
- [x] CP0 — baseline (dev 200, tsc OK) + PROGRESSO.md criado
- [x] CP1 — `lib/quiz-data.ts` + `Tile.tsx` + `Passo.tsx` (data-driven, 9 passos) — tsc OK, screenshot ok
- [x] CP2 — `components/quiz/Reveal.tsx` extraído — tsc OK, reveal ok
- [x] CP3 — slide entre passos (AnimatePresence initial=false + stepVariants) + whileTap + selectFx. NOTA: stagger interno removido (Framer com initial escondido fica invisível no headless/virtual-time).
- [x] CP4 — medidor de sintonia (orb pulsante %) + milestone "🔥 quase lá" (CSS). screenshot ok
- [x] CP5 — micro-copy reativa (REACOES) após sinal/desafio, card transitório. tsc ok
- [x] CP6 — Loading.tsx multi-estágio (checkmarks + barra trava 90% + destrava + tom()). screenshot ok
- [x] CP7 ★ — Reveal cinematográfico: revealFx (confete+som+vibra) + avatar pop (CSS) + selo girando + Waveform + loop aberto (blur+cadeado). screenshot ok
- [x] CP8 — capa viva: Particles.tsx (canvas custom, sem dep). screenshot ok
- [x] CP9 — SocialProof.tsx toast ao vivo + lib/social-proof.ts. tsc ok
- [x] CP10 — reduced-motion: @media prefers-reduced-motion + useReducedMotion (Reveal) + guard (Particles)
- [x] CP11 — captura de lead: fase "email" antes do reveal (escassez + validação regex + localStorage `anjoRegente_lead`). screenshot ok
- [x] CP12 — scaffold Pixel (`lib/pixel.ts`, `track()` stub) + eventos plugados: QuizStart (capa→quiz), Lead (email), InitiateCheckout (→oferta). ID = PLACEHOLDER.

## ✅ TODOS OS 13 CHECKPOINTS (CP0–CP12) CONCLUÍDOS. Plano 100%.

## + Funil de 2 áudios + imersão (2026-06-12, pós-plano)
- Reordenado p/ referência: quiz → loading → **Áudio 1 (Leitura)** → e-mail → **Áudio 2 (Ativação)** → oferta.
- 2 roteiros novos `lib/audios.ts` (personagem Serena Vértiz, 72 anjos, financeiro, personaliza nome/anjo/desafio).
- `AudioPlayer.tsx` reutilizável: **legenda sincronizada com a voz** (onboundary), waveform, autoStart, onPlayingChange.
- **Imersão/ritual:** `Leitura.tsx` + `Ativacao.tsx` com **ritual de toque** ("toque o selo p/ se conectar" + háptico + revealFx), **aura que respira e intensifica com a voz**, partículas, vinheta de foco (`.immersive.ativo`), **flash de transição** entre fases.
- Copiado `ad-financeiro-visual.png` p/ `public/`.
- ⚠️ Voz ainda é TTS do navegador (robótica) — trocar por voz IA/gravada depois.
- **NO AR:** https://anjo-regente.vercel.app (Vercel prod, deployment protection OFF).
- Pendente p/ vender: 4 links Cakto + Pixel ID (do Pedro) → plugar + redeploy.

## Validação geral: `npx tsc --noEmit` SEMPRE limpo. Build prod NÃO rodado (dev no ar; rodar só com dev parado).

## ◀ PRÓXIMA FASE (fora desta sessão — exige API/serviço)
1. Checkout real (Ticto/Kiwify) — substituir `router.push` demo em `app/oferta` e `app/upsell`.
2. Entrega: gerar PDF "Mapa da Prosperidade" + áudio (voz IA) + envio email/WhatsApp.
3. Pixel: criar pixel no Meta, pôr ID em `lib/pixel.ts` + snippet base no `layout.tsx`.
4. Engine canônica dos 72 anjos (tabela real datas→anjo/salmo/selo).
5. Deploy (Vercel) + domínio próprio.
6. Regerar criativos financeiros no Higgsfield (quando subir crédito) — prompts em `06-imagens/PROMPTS-CRIATIVOS.md`.
7. Extrair módulo "Funil Gamificado" como skill/template reutilizável → ver Obsidian [[project_low_ia_sistema_replicavel]].

## ◀ PRÓXIMO PASSO EXATO (CP11)
CP11 — captura de lead: inserir um passo de e-mail/telefone ANTES do reveal (ou após o nome,
passo 8). Salvar em `localStorage` junto de `anjoRegente`. Validar formato (regex simples).
Sem backend. Depois CP12: `components/Pixel.tsx` com `fbq('init', PLACEHOLDER)` + eventos
`QuizStart` (capa→quiz), `Lead` (email), `InitiateCheckout` (irParaOferta), via stub se ID ausente.

Módulo reutilizável já montado em: `lib/quiz-data.ts`, `lib/anim.ts`, `lib/feedback.ts`,
`lib/social-proof.ts`, `components/quiz/{Tile,Passo,Reveal,Loading,Waveform,Particles,SocialProof}.tsx`.

## Contratos
- `lib/quiz-data.ts` → `STEPS: StepConfig[]`, `LOADING_MSGS: string[]`, `REACOES: Record<string,string>`
  - `StepConfig = { key, titulo, cols: 2|3|4|6, big?, tipo?: "tiles"|"input", opcoes?: {label,icon?,value}[] }`
- `Tile` props: `{ icon?, label, big?, selected?, onClick }`
- `Passo` props: `{ config: StepConfig, value, onSelect }`
- `Reveal` props: `{ anjo, nome, onCta }`

## ★ OBJETIVO CENTRAL (frisado pelo Pedro)
Esta camada de gamificação NÃO é só desta oferta — é pra virar uma **FUNÇÃO DE DESTAQUE
reutilizável do sistema low-ia**: um módulo "Funil Gamificado" portável que pluga em
qualquer oferta futura (vira skill/agente). Por isso TUDO é data-driven e modular:
- Módulo portável = `components/quiz/*` + `lib/anim.ts` + `lib/feedback.ts` + `lib/quiz-data.ts`.
- Trocar de oferta = trocar só `quiz-data.ts` (dados) + assets. Lógica/animação não muda.
- Manter zero acoplamento com "anjos": nomes genéricos, engine injetável. Documentar no Obsidian
  como semente de skill (`project_low_ia_sistema_replicavel.md`).

## Decisões travadas
- Refator SIM (data-driven → template replicável). Escopo: MÁXIMO (gamificação + CP11/CP12 locais).
- Estado 100% no `Funil`; filhos presentational.
- Partículas: canvas custom (sem tsparticles). Confete: canvas-confetti.
- Sem git/commit. Validar com `tsc --noEmit` + screenshots headless (window ≥ 500px, deep-links `?f=`).

## Validação por CP
| CP | tsc | screenshot | nota |
|----|-----|-----------|------|
| CP0 | ✓ | — | dev 200 |

## + VSL + áudio real + tracking (2026-06-14)
- Estrutura final: capa → quiz → áudio1 → email → áudio2 → **VSL (vídeo embed)** → checkout.
- `components/quiz/VSL.tsx` + `lib/vsl.ts` (placeholder; colar VTurb/YouTube depois). CTA com delay configurável.
- **Áudio real em arquivo** (`/public/audio/audio1.m4a`, `audio2.m4a`) — voz Luciana (macOS) como PONTE até voz IA (ElevenLabs precisa de API key → só trocar os .m4a).
- Áudios agora GENÉRICOS (`lib/audios.ts` AUDIO1_TEXTO/AUDIO2_TEXTO) — personalização fica no visual, não na voz (igual ref).
- Player suporta `src` (arquivo) ou TTS (fallback). **Tracking instrumentado**: AudioPlay / AudioProgress(25/50/75/90) / AudioComplete / AudioAbandon → Pixel (stub até ID real). VSL dispara ViewContent.
- Função do sistema: `tools/gerar-audios.sh <app>` (extrai textos do audios.ts → say pt-BR → .m4a).
