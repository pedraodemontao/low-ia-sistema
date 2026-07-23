# App Ritual Seúl 50+ (PWA)

Entregável do produto **front ($10)**: o ritual do Pegamento Rojo Coreano como aplicativo instalável, não como PDF. É o que a página `/gracias` do funil promete ("Acceder a mi app").

**Acesso:** sem login. Só chega quem comprou — o link vive na página de obrigado e na entrega da Hotmart. `robots: noindex` no layout para não cair em buscador.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Deploy

Projeto Next.js padrão, 100% estático (20 rotas pré-renderizadas). Na Vercel: importar a pasta, sem variável de ambiente nenhuma.

Depois do deploy, apontar o funil para o app: `07-paginas/app/gracias/page.tsx` → `APP_ACCESS_URL` (hoje é o placeholder `https://app.ritualseul.com/acceso`).

## Antes de subir — 1 linha obrigatória

`lib/config.ts` → **`SOPORTE_EMAIL`** está com placeholder. Sem canal de suporte real, cliente travada vai direto no cartão, e chargeback custa mais que reembolso. Ali também ficam `GARANTIA_DIAS` (30, o máximo da Hotmart) e `NOMBRE_EN_FACTURA`.

## O que reduz reembolso e chargeback

| Peça | Problema que resolve |
|---|---|
| **Test de piel → fórmula própria** (`/bienvenida`, `/mi-formula`) | A copy vende "tu fórmula personalizada según tu test de piel" em 4 lugares. Sem isso, quem paga não recebe o que comprou — reembolso legítimo. |
| **Inventário na boas-vindas** | Os primeiros minutos decidem. Ela vê 21 noites + 9 seções + 3 bônus + diário antes de começar, em vez de cair numa tela solta. |
| **`/ayuda` com contato, garantia e "não reconheço o cargo"** | Cliente sem canal abre disputa no cartão. A página explica o nome na fatura e ensina a pedir reembolso — quem sabe que consegue devolver não vira chargeback. |
| **Timer guiado** (`/temporizador`) | A copy promete 2 minutos; a soma das zonas dá exatamente 120s. Sem cronômetro, "acho que faço errado" vira desistência. |
| **Diário com foto** (`/diario`) | Mata o "não vi resultado": ela compara o dia 1 com o de hoje. Fotos em IndexedDB, nunca saem do aparelho. |
| **Sequência de dias** | Reembolso é filho do abandono; a sequência dá motivo pra voltar amanhã. |

A fórmula sai de `lib/formula.ts`: o tipo de pele define as proporções (as 3 variantes do ebook) e o foco define a ordem e o tempo das zonas do masaje. Quem marca pele reativa recebe sempre a versão sem clara de ovo, independente do resto.

## O que faz dele um app de verdade

- **Instalável** — `manifest.json` + ícones (192, 512, maskable). Android mostra o convite nativo; no iOS o app sugere "Compartir → Añadir a inicio" (`components/PwaSetup.tsx`).
- **Funciona offline** — service worker (`public/sw.js`): páginas em network-first com fallback ao cache, estáticos em cache-first. Testado com o servidor derrubado: abre e navega normalmente.
- **Guarda o progresso** — as 21 noites marcadas ficam no `localStorage` (`lib/progreso.ts`). Sem conta, sem servidor, sem dado de ninguém em banco. A "noite de hoje" é a primeira não marcada, então pular um dia não quebra o ciclo.

## Estrutura

```
app/
  page.tsx              Hoy — a noite atual, checklist, progresso e sequência
  bienvenida/           Test de piel (1ª visita cai aqui) + inventário
  mi-formula/           A fórmula dela, com ajustes e ordem do masaje
  temporizador/         Masaje guiado, 120s, vibra a cada troca de zona
  cronograma/           As 21 noites
  ritual/[slug]/        9 seções (receta, masaje, variantes, ciencia, FAQ…)
  diario/               Fotos antes/depois + notas
  bonos/[slug]/         Os 3 bônus
  ayuda/                Suporte, garantia, dúvidas de acesso
  offline/              Tela de fallback do service worker
components/  Nav · Bloques (renderiza o conteúdo) · PwaSetup
content/     ritual.ts · cronograma.ts · bonos.ts  ← o conteúdo vive aqui
lib/         config.ts (contato) · formula.ts · perfil.ts · progreso.ts · diario.ts · types.ts
tools/       gerar-icones.html (regerar os ícones via Chrome headless)
```

## Conteúdo

Vem dos ebooks em `../entregaveis/html/`, reescrito para leitura em celular (blocos de 2-4 frases em vez de página de livro). Os diagramas SVG do masaje e do mapa anti-papada foram copiados dos ebooks, mesma paleta.

Para editar texto, mexer em `content/*.ts` — nenhum componente precisa mudar. Para um tipo de bloco novo, adicionar na união `Bloque` (`lib/types.ts`) e tratar em `components/Bloques.tsx`.

## Pendente

- Apontar `APP_ACCESS_URL` do funil para a URL real depois do deploy.
- O app cobre só o produto front + 3 bônus. Cuchara e Anti-Manchas (upsells) ainda são entregues em PDF pela Hotmart.
