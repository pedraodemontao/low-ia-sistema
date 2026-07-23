import type { Seccion } from "@/lib/types";

const SVG_CUELLO = `<svg width="240" height="170" viewBox="0 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M70 20 C64 70 62 110 52 150" stroke="#8E1B1B" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M170 20 C176 70 178 110 188 150" stroke="#8E1B1B" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M50 152 L190 152" stroke="#8E1B1B" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.5"/>
  <path d="M68 18 L172 18" stroke="#8E1B1B" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.5"/>
  <path d="M92 138 L92 48" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M92 48 L84 60 M92 48 L100 60" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M120 142 L120 44" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M120 44 L112 56 M120 44 L128 56" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M148 138 L148 48" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M148 48 L140 60 M148 48 L156 60" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
</svg>`;

const SVG_PAPADA = `<svg width="250" height="160" viewBox="0 0 250 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M32 34 C60 120 190 120 218 34" stroke="#8E1B1B" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M125 112 C96 106 72 88 56 62" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M56 62 L56 78 M56 62 L70 60" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M125 112 C154 106 178 88 194 62" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M194 62 L194 78 M194 62 L180 60" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <circle cx="125" cy="112" r="10" fill="#8E1B1B"/>
  <text x="125" y="117" text-anchor="middle" font-family="Avenir Next, sans-serif" font-size="11" font-weight="700" fill="#F7EFE3">1</text>
  <circle cx="42" cy="40" r="10" fill="#C9A227"/>
  <text x="42" y="45" text-anchor="middle" font-family="Avenir Next, sans-serif" font-size="11" font-weight="700" fill="#3E0A0A">2</text>
  <circle cx="208" cy="40" r="10" fill="#C9A227"/>
  <text x="208" y="45" text-anchor="middle" font-family="Avenir Next, sans-serif" font-size="11" font-weight="700" fill="#3E0A0A">2</text>
</svg>`;

const SVG_SURCOS = `<svg width="240" height="170" viewBox="0 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M120 24 L120 96" stroke="#8E1B1B" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
  <path d="M104 118 Q120 128 136 118" stroke="#8E1B1B" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
  <path d="M100 66 C92 84 88 100 92 116" stroke="#8E1B1B" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M140 66 C148 84 152 100 148 116" stroke="#8E1B1B" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M88 108 C70 96 58 80 52 58" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M52 58 L50 74 M52 58 L66 60" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M152 108 C182 96 182 80 188 58" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M188 58 L190 74 M188 58 L174 60" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round"/>
</svg>`;

const SVG_ZONAS = `<svg width="270" height="230" viewBox="0 0 270 230" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M158 16 C126 22 116 48 120 72 C122 84 114 92 108 100 C104 105 106 110 114 112 C112 118 115 121 112 125 C109 129 113 134 121 135 C119 144 126 152 139 152 C150 152 156 158 156 170 C156 192 142 206 118 216" stroke="#8E1B1B" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M192 30 C194 90 198 150 214 210" stroke="#8E1B1B" stroke-width="2.4" stroke-linecap="round" opacity="0.55"/>
  <path d="M178 196 L178 160" stroke="#C9A227" stroke-width="3" stroke-linecap="round"/>
  <path d="M178 160 L172 168 M178 160 L184 168" stroke="#C9A227" stroke-width="3" stroke-linecap="round"/>
  <path d="M198 190 L198 154" stroke="#C9A227" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
  <path d="M198 154 L192 162 M198 154 L204 162" stroke="#C9A227" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
  <circle cx="150" cy="190" r="11" fill="#8E1B1B"/>
  <text x="150" y="195" text-anchor="middle" font-family="Avenir Next, sans-serif" font-size="12" font-weight="700" fill="#F7EFE3">1</text>
  <circle cx="134" cy="146" r="11" fill="#8E1B1B"/>
  <text x="134" y="151" text-anchor="middle" font-family="Avenir Next, sans-serif" font-size="12" font-weight="700" fill="#F7EFE3">2</text>
  <circle cx="126" cy="112" r="11" fill="#C9A227"/>
  <text x="126" y="117" text-anchor="middle" font-family="Avenir Next, sans-serif" font-size="12" font-weight="700" fill="#3E0A0A">3</text>
</svg>`;

export const RITUAL: Seccion[] = [
  {
    slug: "receta",
    titulo: "La receta base",
    resumen: "Cuatro ingredientes, tres minutos de preparación y siete pasos hasta el enjuague frío.",
    bloques: [
      {
        tipo: "parrafo",
        texto:
          "Esta es la fórmula \"para todas\": funciona en la mayoría de las pieles maduras. Rinde para una aplicación generosa en cuello, mentón, mejillas y frente.",
      },
      {
        tipo: "receta",
        nombre: "Pegamento Rojo · fórmula base",
        ingredientes: [
          { item: "Polvo de ginseng rojo", cantidad: "1 cdta" },
          { item: "Miel pura", cantidad: "1 cda" },
          { item: "Agua de arroz", cantidad: "2 cdas" },
          { item: "Clara de huevo", cantidad: "½ unidad" },
        ],
        nota: "cdta = cucharadita (5 ml) · cda = cucharada sopera (15 ml).",
      },
      { tipo: "titulo", texto: "Antes de mezclar" },
      {
        tipo: "lista",
        items: [
          "Tazón de vidrio o cerámica, limpio y seco. Evita el plástico rayado.",
          "Manos recién lavadas y cabello recogido.",
          "Todos los ingredientes medidos antes de empezar.",
        ],
      },
      { tipo: "titulo", texto: "Paso a paso" },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "Mezcla la base roja",
            texto:
              "Une la cucharada de miel con la cucharadita de polvo de ginseng. Trabaja con el tenedor en círculos, aplastando contra las paredes del tazón, hasta obtener una pasta densa color ladrillo. Sin grumos secos.",
          },
          {
            titulo: "Agrega el agua de arroz",
            texto:
              "De a poco, media cucharada por vez, mezclando entre cada añadido. Buscas aflojar la pasta sin volverla líquida. Quizás no necesites las 2 cucharadas completas.",
          },
          {
            titulo: "Incorpora la clara",
            texto:
              "Añade la media clara y bate suave unos 20 segundos, hasta que la mezcla brille. No hace falta punto de nieve: solo integrar. Este es el ingrediente que sella.",
          },
          {
            titulo: "Aplica en capa fina",
            texto:
              "Con los dedos limpios, extiende una capa delgada y pareja: primero el cuello, después mentón y mandíbula, luego mejillas y frente. La piel debe verse roja translúcida, no cubierta como con barro.",
          },
          {
            titulo: "Respeta las zonas prohibidas",
            texto:
              "Nada de pasta en el contorno de los ojos, los párpados, los labios ni sobre piel irritada. Deja un margen de un dedo alrededor de los ojos.",
          },
          {
            titulo: "Masajea y deja actuar",
            texto:
              "Haz el masaje de 3 dedos durante 2 minutos. Después deja reposar 15 minutos mientras la clara sella. Sentirás la piel tirante: es el efecto tensor.",
          },
          {
            titulo: "Retira con agua fría",
            texto:
              "Enjuaga con abundante agua fresca, sin frotar, hasta que no quede residuo. Seca a toques con una toalla limpia y termina con tu crema hidratante de siempre.",
          },
        ],
      },
      {
        tipo: "aviso",
        variante: "tip",
        titulo: "La prueba del hilo",
        texto:
          "Levanta el tenedor: la pasta lista cae formando un hilo grueso y lento, como miel espesa. Si cae como agua, falta ginseng. Si no cae, falta agua de arroz.",
      },
      { tipo: "titulo", texto: "Conservación" },
      {
        tipo: "parrafo",
        texto:
          "Lo ideal es prepararla fresca cada noche: son tres minutos. Si prefieres adelantar trabajo, guárdala en un frasco de vidrio tapado, en el refrigerador.",
      },
      {
        tipo: "lista",
        items: [
          "Máximo 48 horas refrigerada. Pasado ese tiempo, se desecha sin negociar.",
          "Nunca a temperatura ambiente: contiene clara de huevo cruda.",
          "Saca la porción con una cuchara limpia y seca, nunca con los dedos.",
          "Si cambió el olor o el color, a la basura.",
        ],
      },
      {
        tipo: "aviso",
        variante: "alerta",
        titulo: "48 horas, ni una más",
        texto:
          "La pasta no lleva conservantes: esa es su virtud y su límite. Ante la menor duda, prepara una nueva. Los ingredientes cuestan centavos; tu piel, no.",
      },
      {
        tipo: "aviso",
        variante: "mina",
        titulo: "Palabras de la Dra. Mina",
        texto: "\"Fresco es una forma de respeto. A la receta, y a ti.\"",
      },
    ],
  },

  {
    slug: "variantes",
    titulo: "Tu variante",
    resumen: "Tres ajustes de la fórmula — seca, grasa/mixta y sensible — y cómo saber cuál es la tuya.",
    bloques: [
      {
        tipo: "parrafo",
        texto:
          "Quizás conociste tu tipo de piel a los 30. Después de los 50 conviene volver a preguntar: los cambios hormonales corren a muchas pieles hacia el lado seco, y el clima de tu ciudad también opina.",
      },
      { tipo: "titulo", texto: "La prueba de la servilleta" },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "Al despertar, no te laves la cara",
            texto: "Hazla un día que no hayas usado cremas la noche anterior.",
          },
          {
            titulo: "Presiona una servilleta de papel",
            texto: "Apóyala unos segundos sobre frente, nariz, mejillas y mentón.",
          },
          {
            titulo: "Lee el resultado",
            texto:
              "Sin marcas y piel tirante: seca. Marcas de grasa en frente y nariz pero mejillas normales: mixta/grasa. Piel que enrojece fácil, arde con cosméticos nuevos o pica: sensible.",
          },
        ],
      },
      { tipo: "titulo", texto: "Variante 1 · Piel seca" },
      {
        tipo: "parrafo",
        texto:
          "Tu piel pide agua y confort. Sube la miel — la humectante — y suma unas gotas de aceite vegetal. Menos clara, porque la película tensora en piel muy seca puede sentirse demasiado tirante.",
      },
      {
        tipo: "receta",
        nombre: "Pegamento Rojo · piel seca",
        ingredientes: [
          { item: "Polvo de ginseng rojo", cantidad: "1 cdta" },
          { item: "Miel pura", cantidad: "1½ cdas" },
          { item: "Agua de arroz", cantidad: "1½ cdas" },
          { item: "Clara de huevo", cantidad: "⅓ unidad" },
          { item: "Aceite de oliva o almendras", cantidad: "3 gotas" },
        ],
        nota: "Las gotas de aceite se agregan al final, con la clara ya integrada. Ideal en invierno, climas secos o de altura.",
      },
      { tipo: "titulo", texto: "Variante 2 · Piel grasa o mixta" },
      {
        tipo: "parrafo",
        texto:
          "Menos miel, para no sumar sensación pegajosa donde ya hay brillo. La avena — molida hasta quedar casi harina — aporta su efecto suavizante y matificante.",
      },
      {
        tipo: "receta",
        nombre: "Pegamento Rojo · piel grasa / mixta",
        ingredientes: [
          { item: "Polvo de ginseng rojo", cantidad: "1 cdta" },
          { item: "Miel pura", cantidad: "½ cda" },
          { item: "Agua de arroz", cantidad: "2 cdas" },
          { item: "Clara de huevo", cantidad: "½ unidad" },
          { item: "Avena molida fina", cantidad: "1 cdta" },
        ],
        nota: "Úsala si a media tarde tu rostro brilla en la zona T. Si tienes acné activo o brotes, consulta primero con tu dermatólogo.",
      },
      { tipo: "titulo", texto: "Variante 3 · Piel sensible" },
      {
        tipo: "parrafo",
        texto:
          "Elimina la clara de huevo — el ingrediente con más potencial de molestar — y la reemplaza por gel de sábila. Es también la variante para quien tiene alergia al huevo. El reposo baja de 15 a 10 minutos.",
      },
      {
        tipo: "receta",
        nombre: "Pegamento Rojo · piel sensible",
        ingredientes: [
          { item: "Polvo de ginseng rojo", cantidad: "½ cdta" },
          { item: "Miel pura", cantidad: "½ cda" },
          { item: "Agua de arroz", cantidad: "1½ cdas" },
          { item: "Gel de sábila (aloe vera) puro", cantidad: "1 cda" },
        ],
        nota: "Reposo de 10 minutos, no 15. La sábila forma una película ligera y refrescante al secarse.",
      },
      {
        tipo: "aviso",
        variante: "alerta",
        titulo: "Doble prueba de parche",
        texto:
          "Piel sensible = prueba de parche de 24 horas con la variante exacta que vayas a usar, aunque ya hayas probado la base. Si aun así sientes ardor al aplicarla, retira de inmediato y suspende.",
      },
      { tipo: "titulo", texto: "Cuándo cambiar de variante" },
      {
        tipo: "lista",
        items: [
          "Tirantez después del enjuague → variante seca",
          "Brillo en la frente a media tarde → variante grasa",
          "Enrojecimiento o picazón leve → variante sensible",
          "Piel cómoda, sin extremos → fórmula base",
          "Ardor durante el uso → suspender",
        ],
      },
      {
        tipo: "aviso",
        variante: "nota",
        titulo: "Cambiar no reinicia el plan",
        texto:
          "El cronograma sigue igual, solo cambia la mezcla del cuenco. Muchas usan la base entre semana y la seca cuando el clima castiga. La receta está al servicio de tu piel, no al revés.",
      },
    ],
  },

  {
    slug: "ingredientes",
    titulo: "Los 4 ingredientes",
    resumen: "Dónde comprarlos, cómo reconocer los buenos y qué hacer si alguno no es para ti.",
    bloques: [
      { tipo: "titulo", texto: "1 · El polvo de ginseng rojo" },
      {
        tipo: "parrafo",
        texto:
          "Es el único que quizás no tengas en casa. Búscalo en tiendas naturistas y herboristerías (pregunta por \"ginseng rojo en polvo\"), en tiendas de productos asiáticos o en línea.",
      },
      {
        tipo: "lista",
        items: [
          "La etiqueta debe decir 100% raíz de ginseng rojo (inglés: red ginseng powder; coreano: hongsam).",
          "Color rojizo-marrón, aroma terroso, ligeramente amargo.",
          "Sin azúcar ni saborizantes: las mezclas \"para té\" no sirven para la pasta.",
          "¿Solo consigues la raíz seca? Muélela en un molinillo de café hasta polvo fino.",
          "¿Solo hay ginseng blanco en polvo? Sirve como alternativa mientras consigues el rojo.",
        ],
      },
      {
        tipo: "aviso",
        variante: "tip",
        titulo: "Rinde mucho",
        texto: "Cada noche usas una cucharadita. Un frasco de 50 g alcanza para las 21 noches — y sobra.",
      },
      { tipo: "titulo", texto: "2 · La miel: pura o nada" },
      {
        tipo: "parrafo",
        texto:
          "Buena parte de la miel de supermercado está mezclada con jarabes de azúcar. Para cocinar quizás no importe; para tu piel, sí: buscamos las propiedades humectantes de la miel real.",
      },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "La prueba del agua fría",
            texto:
              "Deja caer una cucharadita de miel en un vaso de agua fría. La pura cae al fondo como una gota densa y tarda en disolverse. La adulterada se deshace enseguida, como almíbar.",
          },
          {
            titulo: "La prueba de la servilleta",
            texto:
              "Pon una gota sobre una servilleta de papel. La pura se queda encima, redonda y firme. La adulterada se absorbe y deja un cerco húmedo alrededor.",
          },
        ],
      },
      {
        tipo: "aviso",
        variante: "nota",
        titulo: "Los grumos son buena señal",
        texto:
          "La miel pura cristaliza con el tiempo o el frío. Eso que parece un defecto es un certificado de autenticidad: basta entibiar el frasco al baño maría suave. Cualquier miel pura sirve, clara u oscura.",
      },
      { tipo: "titulo", texto: "3 · El agua de arroz, hecha en casa" },
      {
        tipo: "parrafo",
        texto: "Este no se compra: se hace en tu cocina, en cinco minutos de trabajo real.",
      },
      {
        tipo: "receta",
        nombre: "Agua de arroz · preparación",
        ingredientes: [
          { item: "Arroz blanco (cualquier variedad)", cantidad: "½ taza" },
          { item: "Agua potable", cantidad: "1 taza" },
          { item: "Reposo", cantidad: "30 min" },
          { item: "Dura en refrigerador", cantidad: "hasta 4 días" },
        ],
      },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "Enjuaga",
            texto: "Lava el arroz con un primer chorro de agua y descártalo: ese enjuague se lleva el polvo.",
          },
          {
            titulo: "Remoja",
            texto:
              "Cubre el arroz con la taza de agua y deja reposar 30 minutos, removiendo un par de veces. El agua se pondrá blanquecina.",
          },
          {
            titulo: "Cuela y guarda",
            texto:
              "Pasa el agua a un frasco de vidrio limpio con tapa. Refrigerada, dura hasta 4 días. Si huele agrio, prepara una nueva. El arroz remojado se cocina esa misma noche, como siempre.",
          },
        ],
      },
      { tipo: "titulo", texto: "4 · La clara de huevo" },
      {
        tipo: "parrafo",
        texto:
          "Es el ingrediente más delicado, porque es un producto animal fresco. Tres reglas simples te mantienen segura.",
      },
      {
        tipo: "lista",
        items: [
          "Huevos frescos y refrigerados, con la cáscara limpia y sin fisuras.",
          "Lávate las manos antes de separar la clara, y lava el huevo bajo el chorro justo antes de romperlo.",
          "La clara sobrante se guarda tapada en el refrigerador, máximo 48 horas.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Para separarla, rompe el huevo y pasa la yema de una mitad de la cáscara a la otra sobre un tazón, dejando caer la clara. Usarás solo la mitad: el resto va a la cocina o a la pasta de mañana.",
      },
      {
        tipo: "aviso",
        variante: "nota",
        titulo: "Si el huevo no es para ti",
        texto:
          "Alergia, veganismo o simple preferencia: la clara se reemplaza por gel de sábila (aloe vera), que refresca y también forma película al secarse. La proporción exacta está en la variante sensible.",
      },
      {
        tipo: "aviso",
        variante: "alerta",
        titulo: "Regla de oro",
        texto:
          "Ante cualquier olor extraño — del huevo, de la miel o de la pasta — no lo dudes: se desecha y se prepara de nuevo.",
      },
      { tipo: "titulo", texto: "Tu lista de compras" },
      {
        tipo: "checklist",
        items: [
          "Polvo de ginseng rojo — frasco o bolsa de 50 g",
          "Miel pura — un frasco pequeño (250 g sobra)",
          "Arroz blanco — el que ya tienes en tu despensa",
          "Huevos frescos — media docena para todo el plan",
          "Un tazón pequeño de vidrio o cerámica",
          "Un tenedor o mini batidor de mano",
          "Cucharas medidoras (cdta y cda)",
          "Un frasco de vidrio con tapa para el agua de arroz",
          "Opcional: gel de sábila puro, si usarás la variante sensible",
        ],
      },
      {
        tipo: "aviso",
        variante: "tip",
        titulo: "Consejo de la Dra. Mina",
        texto:
          "Reserva un rincón fijo — una bandeja, una esquina del baño — para tus ingredientes y tu tazón. Cuando el ritual tiene su propio lugar, cuesta mucho menos empezar cada noche.",
      },
    ],
  },

  {
    slug: "masaje",
    titulo: "El masaje de 3 dedos",
    resumen: "Dos minutos, tres zonas, una sola dirección: hacia arriba.",
    bloques: [
      {
        tipo: "parrafo",
        texto:
          "Todo el masaje se hace con los mismos tres dedos: índice, medio y anular, juntos y planos. Tres dedos reparten la presión mejor que uno y cubren el ancho exacto de las zonas que trabajamos.",
      },
      { tipo: "titulo", texto: "Las tres reglas" },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "Presión de tomate maduro",
            texto:
              "Aprieta como tomarías un tomate maduro sin romperlo: firme para sentir el músculo debajo, suave para no arrastrar la piel. La pasta ayuda: da deslizamiento.",
          },
          {
            titulo: "Siempre hacia arriba y hacia afuera",
            texto:
              "Cada pasada nace abajo y muere arriba: de la base del cuello hacia la mandíbula, del mentón hacia la oreja, de la boca hacia el pómulo. Jamás en dirección contraria.",
          },
          {
            titulo: "Ritmo lento",
            texto: "Cada pasada dura 2 o 3 segundos. Esto no es una carrera: es como alisar una sábana con la palma.",
          },
        ],
      },
      {
        tipo: "aviso",
        variante: "nota",
        titulo: "Con pasta, siempre",
        texto:
          "El masaje se hace con la pasta ya aplicada. Nunca en seco: sin deslizamiento, los dedos jalan la piel en lugar de acompañarla.",
      },
      {
        tipo: "diagrama",
        svg: SVG_ZONAS,
        leyenda: "1 · Cuello — 2 · Papada y mentón — 3 · Surcos. El movimiento es siempre ascendente.",
      },
      { tipo: "titulo", texto: "Zona 1 · El cuello — 30 seg" },
      {
        tipo: "diagrama",
        svg: SVG_CUELLO,
        leyenda: "De la base del cuello hacia la mandíbula: pasadas verticales, siempre ascendentes.",
      },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "Posición",
            texto:
              "Mentón apenas elevado. Tres dedos de cada mano en la base del cuello, uno a cada lado de la garganta — sin presionar el centro.",
          },
          {
            titulo: "El movimiento",
            texto:
              "Sube con presión pareja hasta el borde de la mandíbula. Levanta los dedos, vuelve abajo, repite. Manos alternadas: una sube mientras la otra baja por el aire, como olas.",
          },
          { titulo: "Tiempo", texto: "30 segundos — unas 10 pasadas por lado." },
        ],
      },
      { tipo: "titulo", texto: "Zona 2 · Papada y mentón — 45 seg" },
      {
        tipo: "diagrama",
        svg: SVG_PAPADA,
        leyenda: "Del centro del mentón (1) hacia las orejas (2), barriendo la línea de la mandíbula.",
      },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "Posición",
            texto: "Tres dedos de cada mano bajo el centro del mentón, apoyados contra el borde del hueso.",
          },
          {
            titulo: "El movimiento",
            texto:
              "Barre a lo largo de la mandíbula hacia la oreja de cada lado, ambas manos a la vez, presionando suavemente hacia el hueso. Es el gesto de \"redibujar\" el óvalo del rostro.",
          },
          {
            titulo: "Tiempo",
            texto: "45 segundos — la zona estrella se lleva la porción más grande de los dos minutos.",
          },
        ],
      },
      { tipo: "titulo", texto: "Zona 3 · Los surcos — 30 seg" },
      {
        tipo: "diagrama",
        svg: SVG_SURCOS,
        leyenda: "Desde el borde del surco, hacia afuera y hacia arriba, en dirección al pómulo.",
      },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "Posición",
            texto: "Solo dos dedos aquí — índice y medio — apoyados junto a la comisura de los labios, sobre el surco.",
          },
          {
            titulo: "El movimiento",
            texto:
              "Desliza en diagonal hacia el pómulo, como si \"plancharas\" el pliegue hacia afuera y arriba. Presión más ligera que en el cuello: esta piel es más delgada.",
          },
          { titulo: "Tiempo", texto: "30 segundos, ambos lados a la vez. Sin tocar el contorno de los ojos." },
        ],
      },
      { tipo: "titulo", texto: "La secuencia completa de 2 minutos" },
      {
        tipo: "receta",
        nombre: "Secuencia completa",
        ingredientes: [
          { item: "1 · Cuello — pasadas verticales ascendentes", cantidad: "30 seg" },
          { item: "2 · Papada y mentón — barrido hacia las orejas", cantidad: "45 seg" },
          { item: "3 · Surcos — planchado diagonal al pómulo", cantidad: "30 seg" },
          { item: "4 · Cierre — presión suave de palmas en mejillas", cantidad: "15 seg" },
          { item: "Total", cantidad: "2 min" },
        ],
        nota: "El cierre es un regalo: apoya las palmas sobre las mejillas, presiona apenas y respira hondo una vez.",
      },
      { tipo: "titulo", texto: "Qué evitar" },
      {
        tipo: "lista",
        items: [
          "Movimientos hacia abajo o de frotado rápido: nada de fricción.",
          "Jalar o pellizcar la piel, aun con buena intención.",
          "Masajear el contorno de los ojos o el centro de la garganta.",
          "Uñas largas: trabaja con las yemas bien planas.",
        ],
      },
    ],
  },

  {
    slug: "ritual-nocturno",
    titulo: "El ritual nocturno",
    resumen: "Los veinte minutos de la noche que son solamente tuyos, de principio a fin.",
    bloques: [
      {
        tipo: "pasos",
        items: [
          {
            titulo: "Limpieza · 2 min",
            texto:
              "Lava rostro y cuello con agua tibia y tu limpiador suave de siempre. La pasta trabaja mejor sobre piel limpia, sin maquillaje ni cremas.",
          },
          {
            titulo: "Secado a toques · 30 seg",
            texto: "Con toalla limpia, presiona sin frotar. Deja la piel apenas húmeda: recibe mejor la mezcla.",
          },
          {
            titulo: "La pasta · 3 min",
            texto: "Prepara tu fórmula — base o variante — y aplícala en capa fina: cuello, mandíbula, mejillas, frente.",
          },
          {
            titulo: "El masaje · 2 min",
            texto: "La secuencia completa: cuello, papada, surcos, cierre de palmas.",
          },
          {
            titulo: "El reposo · 15 min",
            texto:
              "Deja actuar. Sentirás la piel tensarse a medida que la clara seca. Este cuarto de hora es tuyo: música suave, respiración, una infusión.",
          },
          {
            titulo: "Retiro y cierre · 2 min",
            texto: "Agua fría abundante, secado a toques, tu hidratante de siempre. Lava el tazón esta misma noche.",
          },
        ],
      },
      { tipo: "titulo", texto: "Higiene: las reglas de la casa" },
      {
        tipo: "lista",
        items: [
          "Manos limpias en cada paso. Cabello recogido, lentes fuera.",
          "El tazón y el tenedor se lavan después de cada uso, no a la mañana siguiente.",
          "Toalla exclusiva para el rostro, cambiada con frecuencia.",
          "Si guardaste pasta: frasco tapado, refrigerador, 48 horas máximo.",
        ],
      },
      { tipo: "titulo", texto: "Frecuencia" },
      {
        tipo: "parrafo",
        texto:
          "Durante el plan: 21 noches seguidas. Dos minutos de masaje cada noche valen más que veinte minutos una vez por semana.",
      },
      {
        tipo: "parrafo",
        texto:
          "Después del plan: 3 a 4 noches por semana como mantenimiento. Muchas siguen a diario porque el momento les hace bien. Con piel sensible, deja un día de descanso entre aplicaciones.",
      },
      {
        tipo: "aviso",
        variante: "tip",
        titulo: "¿Y si me salté una noche?",
        texto:
          "Nada se rompe. Retomas la noche siguiente donde quedaste, sin duplicar cantidades ni tiempo. El plan mide constancia, no perfección.",
      },
      { tipo: "titulo", texto: "Que el hábito se quede" },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "Ancla el ritual a algo que ya haces",
            texto: "\"Después de lavarme los dientes, preparo la pasta.\" El cerebro adopta rápido lo que va enganchado a un hábito viejo.",
          },
          {
            titulo: "Deja el rincón listo",
            texto: "Tazón, cucharas y frascos siempre en su bandeja. Si empezar cuesta menos de un minuto, empiezas.",
          },
          {
            titulo: "Marca cada noche cumplida",
            texto: "Una cadena de marcas es difícil de romper a propósito.",
          },
          {
            titulo: "Tómate la foto del día 1",
            texto: "De perfil, luz natural, sin maquillaje. No para redes: para ti. La memoria olvida cómo empezaste; la foto no.",
          },
        ],
      },
      {
        tipo: "aviso",
        variante: "mina",
        titulo: "Palabras de la Dra. Mina",
        texto:
          "\"No cuidas tu piel porque te sobra tiempo. Le haces tiempo porque te cuidas. Son veinte minutos: la telenovela puede esperar quince.\"",
      },
    ],
  },

  {
    slug: "ciencia",
    titulo: "Por qué funciona",
    resumen: "Qué cambió en tu piel después de los 50 y qué hace cada ingrediente del cuenco.",
    bloques: [
      { tipo: "titulo", texto: "Tu piel después de los 50" },
      {
        tipo: "parrafo",
        texto:
          "Tu piel se sostiene sobre dos fibras: el colágeno, que da firmeza, y la elastina, que permite estirarse y volver. Vigas y resortes.",
      },
      {
        tipo: "parrafo",
        texto:
          "A partir de los 40 el cuerpo produce menos colágeno cada año. Con la menopausia ese descenso se acelera: la piel pierde densidad, retiene menos agua y se vuelve más fina y más seca.",
      },
      {
        tipo: "lista",
        items: [
          "Piel más delgada y seca, sobre todo al despertar.",
          "El óvalo del rostro pierde definición: aparece la papada.",
          "Los surcos entre nariz y boca se marcan más.",
          "Salen manchas donde el sol cobró viejas cuentas.",
        ],
      },
      { tipo: "titulo", texto: "Por qué el cuello cae primero" },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "La piel del cuello es más fina",
            texto:
              "Tiene menos glándulas que produzcan grasa protectora y menos colágeno de reserva que la piel de las mejillas. Se deshidrata y se pliega antes.",
          },
          {
            titulo: "La gravedad trabaja a favor de la caída",
            texto: "El peso de los tejidos del rostro se apoya, con los años, sobre la línea de la mandíbula. Lo que las mejillas sueltan, el cuello lo recibe.",
          },
          {
            titulo: "Casi nadie lo trabaja",
            texto: "Cremas, limpieza, protector solar: casi todo termina en la mejilla. El cuello queda huérfano de cuidado — y de estímulo.",
          },
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "La buena noticia: por ser una zona olvidada, el cuello es también la que mejor responde cuando por fin recibe atención diaria. Es la protagonista de este ritual.",
      },
      { tipo: "titulo", texto: "El ginseng rojo" },
      {
        tipo: "parrafo",
        texto:
          "El ginseng rojo no es otra planta: es la misma raíz, cosechada madura — tradicionalmente a los seis años — y luego cocida al vapor y secada. Ese proceso le da su color rojizo profundo.",
      },
      {
        tipo: "parrafo",
        texto:
          "Sus compuestos característicos son los ginsenósidos, saponinas que funcionan como antioxidantes. Piensa en una manzana cortada que se oscurece al aire: los antioxidantes ayudan a proteger la piel de ese desgaste diario.",
      },
      {
        tipo: "lista",
        items: [
          "Saponinas antioxidantes que acompañan y cuidan la piel madura.",
          "Textura levemente exfoliante, muy fina, que al masajear deja la piel más suave.",
          "El calor sutil típico de la raíz, que con el masaje favorece la sensación de piel activa.",
        ],
      },
      { tipo: "titulo", texto: "La miel" },
      {
        tipo: "parrafo",
        texto:
          "Es un humectante: atrae y retiene agua. Ayuda a que la humedad se quede donde hace falta en lugar de evaporarse, por eso la piel queda flexible y no tirante. Además da el cuerpo pegajoso del \"pegamento\" y permite que los dedos se deslicen sin jalar la piel.",
      },
      { tipo: "titulo", texto: "El agua de arroz" },
      {
        tipo: "parrafo",
        texto:
          "Contiene almidón y trazas de vitaminas del propio grano. Sobre la piel actúa como suavizante: la deja sedosa al tacto y más uniforme a la vista. En la fórmula además cumple un papel técnico: afloja la mezcla hasta la textura exacta.",
      },
      { tipo: "titulo", texto: "La clara de huevo" },
      {
        tipo: "parrafo",
        texto:
          "Es casi pura proteína disuelta en agua. Al secarse forma una película fina y firme que produce el efecto tensor: la piel se siente recogida y se ve más lisa al instante.",
      },
      {
        tipo: "aviso",
        variante: "nota",
        titulo: "Honestidad sobre el efecto tensor",
        texto:
          "Ese efecto es temporal: se nota al momento y se va con el enjuague, como en cualquier cosmético de este tipo. Sirve por dos razones: el resultado inmediato sostiene el hábito, y mientras la película tensa, la miel, el agua de arroz y el ginseng quedan sellados debajo durante el reposo.",
      },
      { tipo: "titulo", texto: "Lo que este ritual puede — y no puede" },
      {
        tipo: "lista",
        items: [
          "Sí: hidratar profundamente la piel del cuello y el rostro noche tras noche.",
          "Sí: dar un efecto tensor temporal visible después de cada aplicación.",
          "Sí: el masaje diario favorece la circulación y la piel se ve más luminosa.",
          "Sí: con constancia, mejorar textura y apariencia general, con el contorno más definido a la vista.",
          "No: no borra arrugas ni reemplaza tratamientos médicos o dermatológicos.",
          "No: no cambia tu piel en tres días. Los cambios que valen llegan con las semanas.",
        ],
      },
      {
        tipo: "aviso",
        variante: "mina",
        titulo: "Palabras de la Dra. Mina",
        texto:
          "\"La receta es la mitad del secreto. La otra mitad duerme en tus manos, y aquí vamos a despertarla.\"",
      },
    ],
  },

  {
    slug: "errores",
    titulo: "Los 7 errores",
    resumen: "Siete tropiezos que se repiten en consulta — y la corrección exacta de cada uno.",
    bloques: [
      {
        tipo: "pasos",
        items: [
          {
            titulo: "1 · Aplicar la pasta en capa gruesa",
            texto:
              "Una capa gruesa no seca bien y la clara nunca forma su película tensora. Corrección: capa fina y translúcida, debes ver tu piel rojiza a través de la pasta. Si al minuto diez sigue igual de húmeda, pusiste de más.",
          },
          {
            titulo: "2 · Buscar resultados la noche 3",
            texto:
              "Mirarse con lupa cada mañana es la receta de la frustración. Corrección: no evalúes antes de las noches 7, 14 y 21. Tu instrumento de medida son las dos fotos, día 1 y día 21.",
          },
          {
            titulo: "3 · Masajear hacia abajo, o con fuerza",
            texto:
              "La piel madura no necesita fuerza, necesita dirección. Corrección: presión de tomate maduro, 2-3 segundos por pasada, siempre hacia arriba y hacia afuera. Si tu piel quedó enrojecida por el roce, fuiste demasiado fuerte.",
          },
          {
            titulo: "4 · Saltarse la prueba de parche",
            texto:
              "Miel, huevo y ginseng son alérgenos reales para algunas personas, por naturales que sean. Corrección: 24 horas de prueba detrás de la oreja antes del primer uso, y de nuevo ante cada variante nueva.",
          },
          {
            titulo: "5 · Usar pasta de más de 48 horas",
            texto:
              "La mezcla lleva clara cruda: no es negociable. Pasadas las 48 horas refrigerada — o una hora olvidada fuera del refrigerador — se desecha. Corrección: prepárala fresca siempre que puedas. Son tres minutos.",
          },
          {
            titulo: "6 · Aplicar sobre piel irritada o lesionada",
            texto:
              "Quemadura de sol, brote, herida, alergia activa: la pasta no cura nada de eso y el masaje puede empeorarlo. Corrección: pausa el ritual hasta que la piel se calme. Si la irritación vino del ritual, suspende y consulta a tu dermatólogo.",
          },
          {
            titulo: "7 · Abandonar en la noche 10",
            texto:
              "El error más caro, porque llega justo antes de la parte buena. Corrección: reconoce el valle con nombre y apellido y haz el ritual aunque sea sin ganas. La noche 11 es más fácil. La 21, inevitable.",
          },
        ],
      },
      {
        tipo: "aviso",
        variante: "tip",
        titulo: "El más común de todos",
        texto:
          "La capa gruesa y el abandono en la noche 10 son los dos que más veo. Uno se corrige en un segundo; el otro, con una decisión tomada de antemano.",
      },
    ],
  },

  {
    slug: "faq",
    titulo: "Preguntas frecuentes",
    resumen: "Las doce preguntas que más escucho en consulta, respondidas sin rodeos.",
    bloques: [
      { tipo: "titulo", texto: "¿Cuánto tiempo me toma cada noche?" },
      {
        tipo: "parrafo",
        texto:
          "Unos 20 a 25 minutos de principio a fin, pero de trabajo activo apenas 7 u 8: el resto es el reposo de 15 minutos, que puedes pasar leyendo o con los pies en alto.",
      },
      { tipo: "titulo", texto: "¿Puedo hacerlo de día en lugar de noche?" },
      {
        tipo: "parrafo",
        texto:
          "Puedes, aunque la noche es mejor: la piel descansa después sin sol ni maquillaje encima. Si lo haces de día, enjuaga muy bien y aplica tu protector solar antes de salir.",
      },
      { tipo: "titulo", texto: "¿Puedo maquillarme después de retirar la pasta?" },
      {
        tipo: "parrafo",
        texto:
          "El ritual es nocturno, así que lo ideal es ir de la pasta a la almohada. A la mañana siguiente, maquíllate normal — muchas notan que la base asienta mejor.",
      },
      { tipo: "titulo", texto: "¿Qué pasa si me salto una noche? ¿Y tres?" },
      {
        tipo: "parrafo",
        texto:
          "Una noche: retomas al día siguiente sin duplicar nada. Tres o más seguidas: reinicia el plan desde la noche 1 — el hábito se construye con la cadena entera.",
      },
      { tipo: "titulo", texto: "¿Cuándo voy a ver cambios de verdad?" },
      {
        tipo: "parrafo",
        texto:
          "El efecto tensor se ve desde la primera noche, pero es temporal. Los cambios que se quedan — textura, luminosidad, firmeza a la vista — suelen asomar entre la segunda y la tercera semana, y varían de piel a piel. La constancia es el ingrediente que no se compra.",
      },
      { tipo: "titulo", texto: "¿Esto reemplaza mis cremas o tratamientos?" },
      {
        tipo: "parrafo",
        texto:
          "No. Es un ritual cosmético que convive con tu rutina: sigue usando tu hidratante y tu protector solar, y nunca abandones un tratamiento médico por esta receta.",
      },
      { tipo: "titulo", texto: "¿Sirve para un hombre?" },
      {
        tipo: "parrafo",
        texto:
          "Sí, la piel madura masculina responde igual. Misma receta, mismo masaje; en la zona de la barba, la pasta se retira con un poco más de agua.",
      },
      { tipo: "titulo", texto: "¿Puedo usarla en el rostro completo?" },
      {
        tipo: "parrafo",
        texto:
          "Sí: cuello, mandíbula, mejillas y frente. Las excepciones de siempre: contorno de ojos, párpados, labios y cualquier zona irritada.",
      },
      { tipo: "titulo", texto: "¿Puedo usar ginseng blanco, o té de ginseng?" },
      {
        tipo: "parrafo",
        texto:
          "El polvo de ginseng blanco puro sirve como alternativa mientras consigues el rojo. Los tés instantáneos con azúcar o crema, no: el azúcar arruina la pasta y no aporta nada a la piel.",
      },
      { tipo: "titulo", texto: "¿La pasta huele fuerte? ¿Y el olor a huevo?" },
      {
        tipo: "parrafo",
        texto:
          "Tiene un aroma terroso, a raíz, que a casi todas termina gustándoles. La clara fresca casi no huele — si notas olor a huevo, el huevo no estaba fresco: desecha y empieza de nuevo.",
      },
      { tipo: "titulo", texto: "¿Puedo usarla si uso retinol o ácidos?" },
      {
        tipo: "parrafo",
        texto:
          "No las mismas noches. Alterna: las noches de retinol o ácidos, sin pasta; las demás, tu ritual. Si tu dermatólogo te indicó un esquema, su palabra manda.",
      },
      { tipo: "titulo", texto: "¿Y si estoy embarazada o amamantando?" },
      {
        tipo: "parrafo",
        texto:
          "Consulta primero con tu médico, como con cualquier producto nuevo en esa etapa. Lleva la lista de los cuatro ingredientes a la consulta.",
      },
    ],
  },

  {
    slug: "seguridad",
    titulo: "Seguridad",
    resumen: "Lo que hay que leer antes de la primera noche. Cuidarse también es saber cuándo no.",
    bloques: [
      {
        tipo: "parrafo",
        texto:
          "Esta guía es educativa y cosmética. No diagnostica, no trata ni cura ninguna condición de la piel, y no reemplaza el consejo de tu médico o dermatólogo.",
      },
      {
        tipo: "aviso",
        variante: "alerta",
        titulo: "Prueba de parche — obligatoria",
        texto:
          "Antes del primer uso completo, aplica una pequeña cantidad de la pasta detrás de la oreja o en la parte interna del antebrazo y espera 24 horas. Si aparece enrojecimiento, picazón o ardor, no uses la receta.",
      },
      {
        tipo: "aviso",
        variante: "alerta",
        titulo: "Alergias",
        texto:
          "Si tienes alergia al huevo, a la miel, al polen o al ginseng, no uses esta receta. Para la alergia al huevo existe la variante sensible, que reemplaza la clara por gel de sábila.",
      },
      {
        tipo: "aviso",
        variante: "alerta",
        titulo: "Zonas prohibidas",
        texto:
          "Evita siempre el contorno de los ojos, los párpados, los labios y cualquier zona con heridas o piel lesionada. Deja un margen de un dedo alrededor de los ojos.",
      },
      {
        tipo: "aviso",
        variante: "alerta",
        titulo: "Embarazo y lactancia",
        texto:
          "Si estás embarazada o amamantando, consulta con tu médico antes de comenzar. Si estás bajo tratamiento dermatológico, muestra esta receta a tu especialista.",
      },
      { tipo: "titulo", texto: "Cuándo suspender de inmediato" },
      {
        tipo: "lista",
        items: [
          "Ardor o molestia durante la aplicación: retira con agua fría y suspende.",
          "Enrojecimiento o picazón que no desaparece en unos minutos.",
          "Piel irritada, con brote, herida o quemadura de sol: pausa el ritual hasta que se calme.",
          "Cualquier olor extraño en la pasta, la miel o el huevo: se desecha y se prepara de nuevo.",
        ],
      },
      { tipo: "titulo", texto: "Higiene de la pasta" },
      {
        tipo: "lista",
        items: [
          "Máximo 48 horas refrigerada, en frasco de vidrio tapado.",
          "Nunca a temperatura ambiente: contiene clara de huevo cruda.",
          "Saca la porción con cuchara limpia y seca, nunca con los dedos.",
          "Tazón y tenedor lavados después de cada uso.",
        ],
      },
      {
        tipo: "aviso",
        variante: "mina",
        titulo: "Palabras de la Dra. Mina",
        texto: "\"Cuidarse también es saber cuándo no. La piel primero se respeta, después se mima.\"",
      },
    ],
  },
];
