# Padrão de VSL — módulo do sistema low-ia

Estrutura canônica de VSL (esquenta ou principal). Modelar sempre a VSL validada do concorrente, trocando mecanismo/marca. Funciona como **esquenta** (ticket baixo) ou **VSL principal** (ticket alto) — muda o tamanho e o peso do stack, não a ordem.

## Estrutura (10 blocos, nesta ordem)
1. **Hook (5s)** — pattern interrupt + promessa específica + loop aberto. Se a VSL roda pós-quiz, **PERSONALIZAR** (nome/anjo/desafio).
2. **Aviso / escassez** — "esta ativação é única; se sair, perde".
3. **Elevação** — "você é especial / a sua data revela algo raro".
4. **Inimigo nomeado** — o bloqueio (herdado, automático). Dá nome ao problema.
5. **Custo do problema** — o que ele sabota (dinheiro, relações, comando).
6. **Objeção-chave quebrada** — a maior resistência do nicho ("já rezei e nada → rádio desligado").
7. **Prova** — 1-2 casos concretos com número/valor.
8. **Visão** — a vida nova, sensorial ("imagine acordar amanhã…").
9. **Solução + stack + ancoragem + preço + garantia** — mecanismo único nomeado, o que vem dentro, ancora valor (R$X) → preço real → garantia.
10. **Urgência + CTA** — CTA no **meio** (após a visão) e no **fim**.

## Regras (checklist)
- [ ] **Personalização** quando pós-quiz (nome/anjo/desafio na tela; áudio genérico se for arquivo fixo).
- [ ] Hook nos 5s (sem enrolar).
- [ ] **Inimigo nomeado** + "não é culpa sua, é o [bloqueio]".
- [ ] **Prova** com número específico.
- [ ] **Loop aberto** (algo que só descobre comprando).
- [ ] **Stack + ancoragem** antes do preço.
- [ ] **Objeção do nicho** explicitamente quebrada.
- [ ] **CTA repetido** (meio + fim) + urgência com razão + garantia.
- [ ] Oralidade PT-BR (frases curtas), tom = mesma persona do funil.
- [ ] Fé + dinheiro (ângulo travado): o dinheiro está preso porque não acessou o anjo.

## Produção (igual aos áudios/criativos)
- Voz: ElevenLabs (Carla `oJebhZNaPllxk6W0LSBA` pt-BR — mesma do funil), `speed` ~1.08.
- Tela: slideshow de fotos IA (Higgsfield) OU avatar; **legenda karaokê** (timestamps reais) + **gate** (botão libera só no fim) + endcard CTA.
- Pipeline: mesmas funções (`gerar-audios.sh`/`gerar-video-ad.sh`) + composição Remotion. Personalização da tela via dados do quiz (localStorage).
- Exemplo vivo: `08-copy.md` seção G (oferta Anjo Regente, ticket R$37).
