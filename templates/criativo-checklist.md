# Checklist de Criativo (copy + edição) — padrão do sistema low-ia

Aplicar em TODO criativo (vídeo e estático). Modelar sempre os validados do concorrente.

## COPY
- [ ] **Hook nos 3s** — pattern interrupt: acusação / pergunta / número seco. Ex: "Se o seu dinheiro some todo mês, isso NÃO é azar."
- [ ] **Mecanismo nomeado** — "72 Anjos da Cabala / Anjo Regente" (parece método, não papo).
- [ ] **Loop aberto** — prometer algo que só descobre clicando (o número/nome do anjo, a data da virada).
- [ ] **Prova específica** — 1 caso + valor ("Adriano fez R$12.800"); número concreto.
- [ ] **Quebra de objeção** — "não é simpatia, não precisa de nada complicado".
- [ ] **Urgência/escassez** — última porta / janela de 15 anos / sai do ar.
- [ ] **CTA imperativo + razão** — "Toque em saiba mais agora, antes que a porta feche."
- [ ] **Oralidade PT-BR** — frases curtas, "você", ritmo de fala.
- [ ] **Fé + dinheiro** — sempre amarrar: o dinheiro está preso porque a pessoa não acessou o anjo.
- [ ] **Banco de 8-10 hooks** — testar vários ganchos no mesmo corpo (medo / família / "você merece" / prova / urgência). É onde escala. Ver swipe de hooks na oferta.

## EDIÇÃO (já automatizado no `tools/gerar-video-ad.sh` + Remotion)
- [x] **Legenda karaokê word-level** — palavra ativa em dourado + pop (timestamps reais do ElevenLabs).
- [x] **Power-words em dourado** (dinheiro, anjo, porta, última, prosperidade…).
- [x] **Hook punch nos 3s** — 1ª cena entra com zoom-punch (spring), não fade lento.
- [x] **Ducking de música** — trilha baixa sob a voz, sobe no endcard.
- [x] **Endcard com CTA** — "Anjo Regente · Descubra o seu anjo · Toque em saiba mais →".
- [x] **Gold pulse** (vinheta dourada pulsante) + gradiente de leitura.
- [x] **Ken Burns + crossfade**; cortes ~3-5s.
- [x] **SFX** — barulho de moedas (`mirelo_text_to_audio`) em criativos de vídeo-bg.
- [ ] **A fazer/variar manual:** mix stills + clips animados (Veo3); variações de duração (15/30/45s) e formato (9:16 / 4:5 / 1:1) pros placements.

## Composições Remotion (o "motor")
- `AdSlideshow` — slideshow de fotos IA (a maioria dos criativos).
- `AdVideoBg` — vídeo animado em loop de fundo (ex. clipe Veo3) + SFX.
- Estilo (legenda/endcard/pulse) centralizado em `~/remotion-editor/src/ad-shared.tsx`.
