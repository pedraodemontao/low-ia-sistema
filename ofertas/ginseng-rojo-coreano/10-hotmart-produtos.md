# 10 · Cadastro dos produtos na Hotmart — Ritual Seúl 50+

Formato: **eBook** · idioma **español** · país principal **México** · categoria **Moda e Beleza** · moeda **USD** · pagamento **à vista**.
Arquivos: PDFs em `entregaveis/pdf/` · fotos 1200×1200 em `entregaveis/fotos/`.

## ⚠️ Garantia: 30 días, não 60
A Hotmart **limita o prazo de reembolso a 30 dias** (opções: 7/15/21/30). Toda a copy original prometia **60 días** — foi corrigida para 30 nas descrições, nas capas e nos 9 PDFs (`entregaveis/fix-garantia.sh`).
**Falta corrigir 60→30 em:** `08-copy.md`, `08b-esteira.md`, `05-diferenciacao.md`, páginas do funil (`07-paginas/`) e o banner de checkout (`06-imagens/banner-checkout-hotmart.png`).

## Links de checkout (produtos ATIVOS — instalados no funil em 20/07)

| Produto | Link de pagamento | Preço |
|---|---|---|
| Front · Pegamento Rojo | `pay.hotmart.com/A106789289T` | $10 |
| Bump · Protocolo de Choque | `pay.hotmart.com/J106789384M` | $9 |
| Upsell 1 · Cuchara Coreana | `pay.hotmart.com/G106805169N` | $19 |
| Downsell 1 · Versión Esencial | `pay.hotmart.com/U106805193H` | $9 |
| Upsell 2 · Anti-Manchas | `pay.hotmart.com/F106805224W` | $27 |
| Downsell 2 · Mini Anti-Manchas | `pay.hotmart.com/H106805253I` | $14 |

O `go.hotmart.com/<mesmo-código>` é a página de vendas; o `pay.` vai direto ao checkout — é o que o funil usa.

## Ofertas do produto 1 (front) — criadas em 21/07

| Oferta | Código | Preço | Link | Onde é usada |
|---|---|---|---|---|
| Preço base | `b60pazxm` | US$ 10 | `pay.hotmart.com/A106789289T` | CTAs normais do `results.html` |
| **Ruleta 20% OFF (funil)** | `1gr1hw6z` | **US$ 8** | `pay.hotmart.com/A106789289T?off=1gr1hw6z` | exit-intent/roleta (`CHECKOUT_URL_DISCOUNT`) |

`?off=<código>` seleciona a OFERTA (testado: abre em R$44,77 com a legenda
"Descuento de la ruleta - 20% OFF"). Não confundir com `?offDiscount=<cupom>`, que
aplica um CUPOM — também funciona, mas a oferta é mais limpa e não expõe código de cupom.

## Prazo de reembolso — RESOLVIDO em 21/07

Produtos 1 e 2 estavam em **7 dias** (a copy toda promete 30) — alterados para **30 dias**.
Produtos 3, 4, 5 e 6 já estavam em 30. **Os 6 agora estão em 30 dias**, batendo com a copy.

## ⚠️ Preço do bump: cadastro US$ 4, funil anuncia US$ 9

`Protocolo de Choque 3 Noches` (8148818) está cadastrado a **US$ 4,00** (código `ald9vnwr`).
A esteira em `05-diferenciacao.md`, o `08b-esteira.md` e o checkout do funil dizem **US$ 9**.
Decidir: subir o cadastro para 9 ou baixar a copy para 4. Enquanto divergir, quem clicar
paga 4 e o money model não fecha.

## Códigos de oferta (preço base) dos 6 produtos

| # | Produto | ID | Código da oferta | Preço |
|---|---|---|---|---|
| 1 | El Pegamento Rojo Coreano | 8148763 | `b60pazxm` | US$ 10 |
| 1b | ↳ Ruleta 20% OFF (funil) | 8148763 | `1gr1hw6z` | US$ 8 |
| 2 | Protocolo de Choque 3 Noches | 8148818 | `ald9vnwr` | US$ 4 ⚠️ |
| 3 | El Ritual de la Cuchara Coreana | 8156858 | `ybmqwvp5` | US$ 19 |
| 4 | Ritual de la Cuchara – Esencial | 8156868 | `i1wa4ahg` | US$ 9 |
| 5 | Protocolo Coreano Anti-Manchas | 8156885 | `4g2o3bwm` | US$ 27 |
| 6 | Mini Anti-Manchas | 8156900 | `846l8koe` | US$ 14 |

## Order Bump — ainda pendente

O card "Order Bump" em `Precificação e ofertas` do produto 1 continua com o botão
**Ativar** (nunca foi ligado). Por isso o checkout do front mostra só o produto de $10.
Ativar e apontar para o produto 2.

**Preço em moeda local:** com a conversão automática ligada, quem abre do Brasil vê em BRL (o front sai ~R$56). O público LatAm vê em USD ou na moeda do país. Está correto.

## Status do cadastro

| # | Produto | ID | Preço | PDF anexado | Foto |
|---|---|---|---|---|---|
| 1 | El Pegamento Rojo Coreano | 8148763 | $10 | ✅ 4 PDFs (principal + 3 bônus) | ✅ |
| 2 | Protocolo de Choque 3 Noches | 8148818 | $9 | ✅ | ✅ |
| 3 | El Ritual de la Cuchara Coreana | **8156858** | $19 | ⚠️ (subiu versão 60 días) | ⚠️ (60) |
| 4 | Ritual de la Cuchara – Versión Esencial | **8156868** | $9 | ⚠️ (subiu versão 60 días) | ⚠️ (60) |
| 5 | Protocolo Coreano Anti-Manchas | **8156885** | $27 | ⚠️ (subiu versão 60 días) | ⚠️ (60) |
| 6 | Mini Anti-Manchas | **8156900** | $14 | ⚠️ (subiu versão 60 días) | ⚠️ (60) |

Produtos 1 e 2 foram criados pelo Pedro; 3–6 criados nesta sessão.

**Produto 1 é formato Curso** (não eBook) — o conteúdo vive no Hotmart Club, não no upload direto. Estrutura montada: módulo principal **"Tu Ritual Seúl 50+"** → aula **"El Pegamento Rojo Coreano — Guía completa"** (publicada) com os 4 PDFs em *Material extra*. Produtos 2–6 são eBook e usam o upload direto em *Conteúdo do Produto*.

**Pendente nos produtos 3–6:** trocar o PDF e a foto pelas versões com "30 días" (os arquivos locais já estão corrigidos). Requer clicar em *Remover* no arquivo antigo — não automatizado por risco de diálogo nativo travar a sessão do browser.

---

## 1 · El Pegamento Rojo Coreano – Ritual Seúl 50+ · US$ 10

El ritual nocturno coreano de 2 minutos que sella y levanta la piel después de los 50 — con **ginseng rojo**, el ingrediente que las coreanas usan hace siglos.

Guía digital ilustrada, directo en tu celular. Recibes:

✔ La **receta del Pegamento Rojo Coreano**, personalizada según tu tipo de piel
✔ El **auto-masaje facial coreano de 3 dedos** para cuello, papada y surcos
✔ **Cronograma de 21 noches**, paso a paso, noche por noche

**Bonos incluidos:**
🎁 Piel de Cristal en 7 Noches
🎁 Mapa Coreano Anti-Papada
🎁 Sueño de Seúl — ritual de sueño para la regeneración de la piel

Sin botox, sin láser, sin cremas de cientos de dólares. Ingredientes que consigues en cualquier supermercado.

**Garantía incondicional de 30 días:** si no notas tu piel más firme, te devolvemos el 100% de tu dinero.

Empieza tu ritual esta noche.

---

## 2 · Protocolo de Choque 3 Noches · US$ 9 (order bump)

El empujón inicial del Pegamento Rojo Coreano: un protocolo intensivo de **3 noches** para ver los primeros cambios en tu piel **antes de empezar el ritual completo de 21 noches**.

Guía digital ilustrada, directo en tu celular. Recibes:

✔ La **versión reforzada** de la pasta de ginseng rojo para las primeras 3 noches
✔ **Aplicación en capas** paso a paso — noche 1, noche 2, noche 3
✔ El **orden exacto** (limpieza → pasta → masaje) para potenciar el efecto
✔ Guía del espejo: cómo notar y registrar los primeros cambios

Ideal para quien no quiere esperar: mientras el ritual de 21 noches construye el resultado, el Protocolo de Choque enciende la piel desde la primera noche.

**Garantía incondicional de 30 días.**

Tu piel empieza a cambiar esta noche — no en 21.

---

## 3 · El Ritual de la Cuchara Coreana · US$ 19 (upsell 1)

El **yoga facial coreano con cuchara** que acelera tu Pegamento Rojo: mientras la pasta nutre, la cuchara activa el músculo que sostiene tu rostro.

Guía digital ilustrada, directo en tu celular. Recibes:

✔ Los **5 movimientos completos** — cuello, papada, surcos, mejillas y frente, con ilustración de cada uno
✔ **Cuál cuchara usar** (metal, cerámica o madera) y cómo higienizarla
✔ **Temperatura correcta:** cuándo tibia y cuándo fría, y por qué cambia el resultado
✔ El **orden exacto** de la secuencia y los tiempos por zona
✔ **Cronograma de 21 días** integrado a tu ritual del Pegamento Rojo

Sin aparatos caros, sin sesiones de clínica. Una cuchara que ya tienes en casa y 5 minutos por noche.

**Garantía incondicional de 30 días.**

---

## 4 · Ritual de la Cuchara – Versión Esencial · US$ 9 (downsell 1)

Los **3 movimientos clave** del yoga facial coreano con cuchara — lo esencial, bien hecho.

Guía digital ilustrada, directo en tu celular. Recibes:

✔ **Movimiento 1 · Cuello** — el barrido ascendente, ilustrado paso a paso
✔ **Movimiento 2 · Papada** — el levantamiento de la línea de la mandíbula
✔ **Movimiento 3 · Surcos** — el alisado diagonal hacia el pómulo
✔ Tu **rutina de 5 minutos** y el cronograma simple de 21 días

Una cuchara, 5 minutos por noche, y la técnica correcta para no trabajar en contra de tu piel.

**Garantía incondicional de 30 días.**

---

## 5 · Protocolo Coreano Anti-Manchas · US$ 27 (upsell 2)

La **máscara coreana de arroz** que empareja el tono de tu piel en 21 días — rostro, axilas e ingle.

Guía digital ilustrada, directo en tu celular. Recibes:

✔ La **receta de la máscara de arroz fermentado**, paso a paso, con el ácido kójico que nace de la propia fermentación
✔ **Protocolo ROSTRO de 21 días** con mapa de zonas y cronograma noche por noche
✔ **Protocolo AXILAS de 21 días** — versión suave, con las reglas de la depilación
✔ **Protocolo INGLE de 21 días** — cuidados extra para la zona más sensible
✔ El capítulo de **protección solar**: la mitad del resultado está aquí
✔ Registro de acompañamiento por zona

Sin limón, sin agua oxigenada, sin recetas que queman la piel. El método coreano es gradual y gentil — por eso funciona sin castigar.

**Garantía incondicional de 30 días.**

---

## 6 · Mini Anti-Manchas · US$ 14 (downsell 2)

La **receta esencial de la máscara coreana de arroz** para atenuar manchas y emparejar el tono.

Guía digital ilustrada, directo en tu celular. Recibes:

✔ La **receta completa de la máscara de arroz**, paso a paso, con conservación
✔ **Cómo aplicarla en el rostro** — frecuencia, tiempo de pose y retiro
✔ **Versión suave para axilas e ingle**
✔ Las reglas de **protección solar** sin las cuales ninguna receta funciona
✔ Registro simple de acompañamiento

Sin limón, sin agua oxigenada, sin recetas agresivas. Ingredientes de cocina y el método correcto.

**Garantía incondicional de 30 días.**

---

## Pendências pós-cadastro
- Configurar **order bump** (produto 2 no checkout do 1) e **upsell 1-click** (3→4, 5→6) na ferramenta de funil da Hotmart.
- Copiar os 6 links de checkout pra `07-paginas/lib/checkout.ts` (placeholders `HOTMART_LINK_*`).
- Área de membros: URL final em `app/gracias/page.tsx` (`APP_ACCESS_URL`).
