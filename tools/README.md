# tools/ — Funções de destaque do sistema low-ia

Funções reutilizáveis por oferta. Todas leem `.env` da raiz quando precisam de chave (NUNCA commitar `.env`).

## 1. `gerar-entrega-pdf.sh` — PDF de entrega (MVP validador)
`HTML → PDF A4 + preview PNG`. Toda oferta entrega um PDF de cara pra validar com tráfego.
```
cp templates/entrega-mvp.html ofertas/<oferta>/entrega/entrega.html   # preencher {{PLACEHOLDERS}}
tools/gerar-entrega-pdf.sh ofertas/<oferta>/entrega/entrega.html
```
Requer: Chrome + poppler (`brew install poppler`).

## 2. `gerar-audios.sh` — vozes do funil
Extrai `AUDIO1_TEXTO`/`AUDIO2_TEXTO` do `lib/audios.ts` → narra → `.mp3` em `public/audio/`.
Usa **ElevenLabs** (voz IA) se `ELEVENLABS_API_KEY` no `.env`; senão macOS `say`.
```
tools/gerar-audios.sh ofertas/<oferta>/07-paginas
VOICE_ID=<id> tools/gerar-audios.sh ...   # trocar voz
```
Vozes pt-BR nativas (Amora `QJd9SLe6MVCdF6DR0EAu`) exigem plano pago ElevenLabs; premade Sarah `EXAVITQu4vr4xnSDxMaL` (free).

## 3. `gerar-video-ad.sh` — criativo de vídeo (slideshow) ★
`roteiro.txt + fotos IA → narração + legendas (palavra dourada) + música → MP4`.
Formato modelado dos criativos validados (fotos IA + Ken Burns + legenda + voz).
```
# 1. gerar fotos no Higgsfield (nano_banana_pro, 9:16, SEM texto) -> cena1.png, cena2.png...
# 2. escrever roteiro.txt (copy modelada do swipe validado)
tools/gerar-video-ad.sh roteiro.txt pasta-fotos saida.mp4 [musica.m4a]
VOICE_ID=<id> tools/gerar-video-ad.sh ...
```
Requer: `.env` (ElevenLabs) + projeto Remotion em `~/remotion-editor` com a composição **AdSlideshow** (`src/AdSlideshow/index.tsx`).

### Pipeline completo do criativo de vídeo (resumo)
1. **Espionar** o vídeo validado (Ad Library) → baixar mp4.
2. **Transcrever** (whisper: `~/remotion-editor/transcribe.mjs`) → copy do concorrente.
3. **Modelar** a copy (mudar poucas palavras → nosso mecanismo/marca) → `roteiro.txt`.
4. **Gerar fotos** no Higgsfield seguindo as cenas do roteiro (nano_banana_pro 9:16, sem texto).
5. **Música** (opcional): Higgsfield `sonilo_music`.
6. **Montar**: `gerar-video-ad.sh` (narração + legendas + render).

> A composição `AdSlideshow` (no projeto Remotion) é parte da função: slideshow + Ken Burns + crossfade + `<Audio>` narração/música + legendas com highlight dourado em power-words. Editar lá pra mudar estilo de legenda/transição.

## 4. `fetch-pexels.mjs` — banco de takes grátis (Pexels) ★
`query → baixa vídeo/foto vertical (9:16) do Pexels`. Stock real e grátis → para de queimar crédito Higgsfield gerando take a take.
```
node tools/fetch-pexels.mjs "<query>" <count> <photo|video> <outDir> <prefix>
node tools/fetch-pexels.mjs "lit candle" 2 video ~/remotion-editor/public/broll/vsl/stock candle
```
Requer `PEXELS_API_KEY` no `.env` (grátis em pexels.com/api, 200 req/h). Filtra `orientation=portrait`, escolhe arquivo HD vertical.

## VSL densa (composição `VslEdit` no Remotion) ★
VSL editada padrão DR a partir de avatar falante (HeyGen/Higgsfield) + biblioteca de b-roll.
- **Timeline data-driven:** `~/remotion-editor/src/vsl/beats.ts` (trocar de oferta = trocar este arquivo + assets). Tipos: cutaway/textpop/proof/steps/price/stack/urgency/cta/grade/sfx.
- **Componentes:** `src/vsl/components.tsx` — `ZoomAvatar`, `CutVideo`(Loop)/`CutImg`(Ken Burns), `TextPop`, `ProofCard`(foto+estrelas), `Steps`, `PriceAnchor`, `Stack`, `Urgency`, `Cta`, `Grade`, `LegendaUnica`(palavra-única), `Particles`, `Sfx`.
- **b-roll:** vídeo stock Pexels (humanos/realistas) + imagem Higgsfield (sobrenatural). Cutaway a cada raciocínio → avatar <45% da tela (não denuncia IA). SEM takes repetidos.
- **GOTCHA:** `OffthreadVideo` em `<Sequence from>` rende PRETO → usar `<Loop>` + gate por opacidade (ver `CutVideo`).
- **Áudio:** voz domina (`duckMusic` 0.05), SFX 0.28-0.5 (sintetizados via ffmpeg em `public/broll/vsl/sfx/`).
- Render: `npx remotion render src/index.ts VslEdit out/vsl-final.mp4 --concurrency=4 --crf=20`.

## 5. `scrape-ad-library.mjs` — espionagem com escala (Apify)
`url/termo da Ad Library → nº de criativos + copies + anunciantes` (mede ESCALA real do concorrente).
```
node tools/scrape-ad-library.mjs "<url-ad-library OU termo>" 30 ofertas/<nome>/02-coleta/ads.json
```
Requer `APIFY_TOKEN` (free tier — pode esgotar no mês; trocar ator com `APIFY_ACTOR=owner~actor`). O orquestrador roda isso na Etapa 2; o `espiao` lê o JSON.

## 6. `scaffold-funil.sh` — clonar o funil provado (Etapa 7)
`<oferta> → ofertas/<oferta>/07-paginas (código pronto) + CUSTOMIZE.md (o que trocar)`.
```
bash tools/scaffold-funil.sh <nome-da-oferta>
```
Clona o funil validado (teste-dos-anjos) sem node_modules/.next/mídia, e gera um CUSTOMIZE.md marcando cada ponto de troca (dados, copy, integrações, assets). Trocar oferta = trocar dados, não lógica.

## 7. `check-setup.sh` — o que falta plugar
`bash tools/check-setup.sh` (ou `/setup`) — ferramentas locais + chaves .env, com onde pegar cada uma. Ver `SETUP.md`.

## 8. `gerar-ebook.mjs` — ebook de entrega (80+ páginas) ★
`config.mjs (conteúdo da oferta) → ebook HTML + PDF` (capa com foto do expert, capítulos, seção detalhada de N itens com fichas variadas, orações/protocolo, bibliografia).
```
node tools/gerar-ebook.mjs ofertas/<oferta>/entrega/ebook-config.mjs ofertas/<oferta>/entrega/ebook
```
Data-driven: trocar de oferta = trocar o `ebook-config.mjs` (engine/estilo não muda). Exemplo: `templates/ebook-config-exemplo.mjs`. Anatomia do config: `meta` (título, subtítulo, autorFoto, credencial) + `capitulos[]` + `detalhada` (lista de N itens com `campos/leitura/oracao` e pools co-primos pra não repetir) + `secoesFinais[]`. Gera o PDF via Chrome.
