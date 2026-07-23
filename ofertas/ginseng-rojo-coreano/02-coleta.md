# 2 · Coleta (Apify)

Scrape da biblioteca de anúncios. Assets brutos em `02-coleta/ads.json`.

- **Fonte (URL/ator Apify):** Ad Library `view_all_page_id=398592850002702` (sort: total_impressions desc). Ator `apify~facebook-ads-scraper` (`isDetailsPerAd: true`, `resultsLimit: 30`). Rodado 13/jul/2026.
- **Resumo do que veio:**
  - 30 criativos, **todos ativos**, **todos vídeo**.
  - 1 anunciante: "Dra. Renata Cavalcante".
  - 2 copies únicas (22x + 8x); 1 title; 1 linkDescription.
  - 30/30 apontam pra `https://koreanskinapp.site/` (quiz).
  - Placements: FB, IG, Messenger, Threads (30) + Audience Network (8).
- **Obs. técnica:** o `startUrls`/`resultsLimit`/`isDetailsPerAd` deste ator diferem do formato antigo da tool — tool corrigida nesta rodada. O resumo em stdout da tool ainda lê campos rasos (copy sai vazia no console); os hooks reais vieram do parse de `snapshot.body.text` no raw.
