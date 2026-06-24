# Checklist de Criativo (copy + edição) — padrão do sistema low-ia

Aplicar em TODO criativo (vídeo e estático). Modelar sempre os validados do concorrente.

## COPY
- [ ] **Hook nos 3s** — pattern interrupt: acusação / pergunta / número seco. Ex: "Se [problema recorrente do nicho], isso NÃO é [causa que a pessoa culpa]."
- [ ] **Mecanismo nomeado** — "[nome do seu mecanismo]" (parece método, não papo).
- [ ] **Loop aberto** — prometer algo que só descobre clicando (o resultado/nome, a virada).
- [ ] **Prova específica** — 1 caso + resultado concreto (nome + número).
- [ ] **Quebra de objeção** — a maior resistência do nicho, dita explicitamente.
- [ ] **Urgência/escassez** — última chance / janela / sai do ar.
- [ ] **CTA imperativo + razão** — "Toque em saiba mais agora, antes que [a janela] feche."
- [ ] **Oralidade PT-BR** — frases curtas, "você", ritmo de fala.
- [ ] **Amarração ao mecanismo** — sempre ligar a dor à causa que só o seu mecanismo resolve.
- [ ] **Banco de 8-10 hooks** — testar vários ganchos no mesmo corpo (medo / família / "você merece" / prova / urgência). É onde escala. Ver swipe de hooks na oferta.

## EDIÇÃO (já automatizado no `tools/gerar-video-ad.sh` + Remotion)
- [x] **Legenda karaokê word-level** — palavra ativa em dourado + pop (timestamps reais do ElevenLabs).
- [x] **Power-words em dourado** (as palavras-chave do seu nicho + última, agora, grátis…).
- [x] **Hook punch nos 3s** — 1ª cena entra com zoom-punch (spring), não fade lento.
- [x] **Ducking de música** — trilha baixa sob a voz, sobe no endcard.
- [x] **Endcard com CTA** — "[nome da oferta] · [promessa curta] · Toque em saiba mais →".
- [x] **Gold pulse** (vinheta dourada pulsante) + gradiente de leitura.
- [x] **Ken Burns + crossfade**; cortes ~3-5s.
- [x] **SFX** — barulho de moedas (`mirelo_text_to_audio`) em criativos de vídeo-bg.
- [ ] **A fazer/variar manual:** mix stills + clips animados (Veo3); variações de duração (15/30/45s) e formato (9:16 / 4:5 / 1:1) pros placements.

## Composições Remotion (o "motor")
- `AdSlideshow` — slideshow de fotos IA (a maioria dos criativos).
- `AdVideoBg` — vídeo animado em loop de fundo (ex. clipe Veo3) + SFX.
- Estilo (legenda/endcard/pulse) centralizado em `~/remotion-editor/src/ad-shared.tsx`.
