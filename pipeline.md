# Pipeline de Modelagem — Spec Detalhada

Cada etapa: **input → ação → output (artefato salvo)**. O artefato de uma etapa alimenta a próxima.

---

## 0 · Alvo
- **Input:** nicho/mercado para caçar oferta.
- **Output:** `00-alvo.md` — nicho, idioma, ticket-alvo, observações.

## 1 · Espionagem 🕵️
- **Ferramenta:** Facebook Ad Library.
- **Ação:** achar oferta **já vendendo**. Sinais de validação: tempo no ar (semanas+), muitos criativos ativos, escala.
- **Output:** `01-espionagem.md` — links dos anúncios, página do anunciante, hipótese de por que está escalando.

## 2 · Coleta 📥
- **Ferramenta:** Apify.
- **Ação:** scrapear a biblioteca → dados estruturados (criativos, copies, tempo no ar, LP de destino).
- **Output:** `02-coleta/` (JSON/CSV/assets baixados) + `02-coleta.md` (resumo).

## 3 · Análise 🔬
- **Ferramenta:** Claude Code.
- **Ação:** ler o scrape — qual oferta está validada, ângulo dominante, estrutura do funil, preço, gatilhos.
- **Output:** `03-analise.md`.

## 4 · Modelagem 🧩
- **Ação:** extrair a **estrutura vencedora** — promessa, mecanismo único, stack de valor, preço, ângulo de copy.
- **Output:** `04-modelagem.md`.

## 5 · Diferenciação ★ 🎯
- **Ação:** reestruturar pra **fugir do leilão**. Novo empacotamento, novo ângulo, bônus diferentes, naming próprio. NÃO clonar.
- **Money model (SEMPRE):** toda oferta fecha a etapa 5 com um bloco **Money Model** — front + order bump + upsell(s) + downsell. Sempre entregar **2-3 ideias** de order bump e **2-3 ideias** de upsell (não só uma), cada uma matando uma objeção ou ampliando o resultado prometido. O Pedro escolhe; o resto fica no banco de ideias pra testar depois.
- **Output:** `05-diferenciacao.md` — a oferta própria definida + bloco Money Model com banco de ideias.

## 6 · Imagens 🎨
- **Ferramenta:** Higgsfield.
- **Ação:** gerar criativos de anúncio + imagens das páginas.
- **Output:** `06-imagens/` (assets).

## 6b · Criativo de VÍDEO 🎬 (função do sistema)
- **Formato validado:** slideshow de fotos IA + Ken Burns + legenda sincronizada (palavra dourada) + narração voz IA + música. Modelar o vídeo campeão do concorrente (transcrever → trocar poucas palavras → nosso mecanismo).
- **Pipeline:** espionar vídeo → transcrever (`~/remotion-editor/transcribe.mjs`) → modelar `roteiro.txt` → gerar fotos Higgsfield (nano_banana_pro 9:16, sem texto, `cena1.png…`) → música (`sonilo_music`) → `tools/gerar-video-ad.sh roteiro.txt pasta-fotos saida.mp4 [musica]`.
- **Ferramentas:** Higgsfield (fotos/música/SFX) + ElevenLabs (voz with-timestamps, `.env`) + Remotion (`AdSlideshow` / `AdVideoBg`). Ver `tools/README.md`.
- **Padrão de COPY + EDIÇÃO (obrigatório):** seguir `templates/criativo-checklist.md` — hook 3s, mecanismo nomeado, loop aberto, prova, objeção, urgência, CTA+razão, fé+dinheiro, banco de 8-10 hooks; edição = legenda karaokê word-level (palavra dourada), hook punch, ducking de música, endcard CTA, gold pulse, SFX moedas.
- **Voz:** ElevenLabs João Gabriel `MjS9ecoVZlOFzvnemirW` (masc. pt-BR). Criativos ≤ 40s.
- **Output:** `06-imagens/video-ad/*.mp4`.

## 6c · VSL 🎥 (função do sistema)
- **Padrão obrigatório:** `templates/vsl-estrutura.md` — 10 blocos (hook 5s personalizado → aviso → elevação → inimigo nomeado → custo → objeção quebrada → prova → visão → solução+stack+ancoragem+preço+garantia → urgência+CTA meio/fim).
- **Esquenta** (ticket baixo) ou **principal** (ticket alto) — mesma ordem, muda tamanho/stack.
- **Personalização** quando pós-quiz: tela usa nome/anjo/desafio (áudio fixo genérico).
- Produção = mesmas ferramentas dos áudios/criativos (ElevenLabs + Remotion, legenda karaokê + gate + endcard).
- **VSL editada densa (padrão DR):** avatar falante (HeyGen/Higgsfield) + composição `VslEdit` (Remotion, data-driven em `src/vsl/beats.ts`). Cutaway a cada raciocínio (avatar <45% da tela), **b-roll de vídeo stock grátis (Pexels, `tools/fetch-pexels.mjs`)** pros humanos/realistas + imagem Higgsfield pro sobrenatural, legenda **palavra-única**, provas com foto, grade frio/quente, voz dominante. GOTCHA: `OffthreadVideo` em `Sequence from` rende preto → usar `<Loop>`. Detalhes: `tools/README.md`. Pode embedar mp4 local OU player externo (VTurb/ConverteAI) no funil.
- Exemplo: `08-copy.md` seção G.

## 7c · Rastreamento (Pixel + CAPI) 📊 (função do sistema)
- **Browser:** Meta Pixel no layout (`components/Pixel.tsx`) + `lib/pixel.ts` `track()` (PageView, Lead, ViewContent, InitiateCheckout).
- **Servidor (CAPI):** `lib/capi.ts` + `app/api/cakto-webhook/route.ts` — Purchase via **webhook da Cakto** (a compra é em domínio externo, só dá server-side). Match: email+telefone+CPF (hash) + fbc/fbp, dedupe por order id.
- **Env vars na Vercel** (nunca no código): `META_CAPI_TOKEN`, `PIXEL_ID`, `CAKTO_WEBHOOK_SECRET`, `META_TEST_EVENT_CODE` (só validação). Validar via aba Testar Eventos → `events_received:1`.
- Payload real da Cakto + setup completo: memória `tracking-cakto-capi`.

## 7 · Páginas 🏗️
- **Ferramenta:** Claude Code.
- **Ação:** construir LP, checkout, **upsell/downsell** (sempre — o upsell sai do Money Model da etapa 5). Order bump entra na própria página de checkout.
- **Output:** `07-paginas/` (código das páginas). Rotas: `/` (LP/quiz), `/oferta` (checkout + order bump), `/upsell` (upsell pós-compra com downsell embutido).

## 7b · Entrega MVP 📄 (SEMPRE — função do sistema)
- **Ação:** toda oferta gera de cara um **PDF de entrega** (o produto entregável) pra ter um MVP validável com tráfego ANTES da entrega final/personalizada.
- **Como:** copiar `templates/entrega-mvp.html` → `ofertas/<oferta>/entrega/entrega.html`, preencher os `{{PLACEHOLDERS}}`, e rodar `tools/gerar-entrega-pdf.sh ofertas/<oferta>/entrega/entrega.html` (gera PDF A4 + preview PNG). Requer Chrome + poppler (`brew install poppler`).
- **Output:** `ofertas/<oferta>/entrega/*.pdf` — sobe na entrega do gateway (Cakto/Kiwify: email/área de membros).

## 8 · Copy ✍️
- **Ferramenta:** skill `copy`.
- **Ação:** headline + corpo + CTA, tom **agressivo + urgente** (low-ticket = impulso).
- **Output:** `08-copy.md`.

## 9 · Disparo 🚀
- **Ferramenta:** WaDisparo (WhatsApp) + tráfego pago.
- **Ação:** distribuir a oferta.
- **Output:** `09-disparo.md` — listas, mensagens, configuração de campanha.
