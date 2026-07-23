import type { Bono } from "@/lib/types";

const SVG_CRISTAL = `<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 22 L128 86" stroke="#C9A227" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M128 86 L186 22" stroke="#C9A227" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M186 22 L178 38 M186 22 L170 26" stroke="#C9A227" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="128" cy="86" r="5" fill="#C9A227"/>
      <path d="M128 70 L128 60 M110 82 L100 78 M146 82 L156 78" stroke="#E3C56B" stroke-width="2" stroke-linecap="round"/>
      <rect x="35" y="98" width="230" height="24" rx="12" fill="#F3E9D2" stroke="#C9A227" stroke-width="1.5"/>
      <text x="150" y="114" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="10" fill="#6B4A2F">SELLO · miel + clara</text>
      <rect x="35" y="130" width="230" height="24" rx="12" fill="#FDF9F2" stroke="#8E1B1B" stroke-width="1.5"/>
      <text x="150" y="146" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="10" fill="#8E1B1B">HIDRATACIÓN · agua de arroz</text>
      <rect x="35" y="162" width="230" height="24" rx="12" fill="#8E1B1B"/>
      <text x="150" y="178" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="10" fill="#F7EFE3">TU PIEL</text>
    </svg>`;

const SVG_MAPA = `<svg width="270" height="290" viewBox="0 0 280 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M158 22 C112 26 88 62 90 98 L84 120 L96 130 C92 140 94 150 100 158 C106 166 112 172 118 178 C140 190 160 184 172 170" stroke="#8E1B1B" stroke-width="2"/>
      <path d="M158 22 C198 30 214 68 208 108 C204 134 196 152 186 164" stroke="#8E1B1B" stroke-width="2"/>
      <path d="M114 182 C110 210 106 230 102 250" stroke="#8E1B1B" stroke-width="2"/>
      <path d="M190 172 C195 200 197 226 197 250" stroke="#8E1B1B" stroke-width="2"/>
      <path d="M76 260 Q150 278 224 258" stroke="#8E1B1B" stroke-width="2"/>
      <path d="M120 186 C142 198 162 192 174 176" stroke="#C9A227" stroke-width="2" stroke-dasharray="5 4"/>
      <circle cx="124" cy="192" r="10" fill="#8E1B1B"/>
      <text x="124" y="196" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="bold" fill="#FDF9F2">1</text>
      <circle cx="150" cy="196" r="10" fill="#8E1B1B"/>
      <text x="150" y="200" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="bold" fill="#FDF9F2">2</text>
      <circle cx="172" cy="184" r="10" fill="#8E1B1B"/>
      <text x="172" y="188" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="bold" fill="#FDF9F2">3</text>
      <circle cx="184" cy="160" r="10" fill="#C9A227"/>
      <text x="184" y="164" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="bold" fill="#3E0A0A">4</text>
      <circle cx="196" cy="212" r="10" fill="#C9A227"/>
      <text x="196" y="216" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="bold" fill="#3E0A0A">5</text>
      <circle cx="200" cy="248" r="10" fill="#C9A227"/>
      <text x="200" y="252" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="bold" fill="#3E0A0A">6</text>
    </svg>`;

const SVG_DIRECCIONES = `<svg width="280" height="190" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 66 C100 96 150 98 192 62" stroke="#8E1B1B" stroke-width="2"/>
      <path d="M198 74 C202 104 204 132 204 162" stroke="#8E1B1B" stroke-width="2"/>
      <path d="M70 106 Q120 126 168 96" stroke="#C9A227" stroke-width="3" stroke-linecap="round"/>
      <path d="M168 96 L156 98 M168 96 L164 107" stroke="#C9A227" stroke-width="3" stroke-linecap="round"/>
      <path d="M78 132 Q126 150 170 122" stroke="#C9A227" stroke-width="3" stroke-linecap="round" opacity="0.65"/>
      <path d="M170 122 L158 124 M170 122 L166 133" stroke="#C9A227" stroke-width="3" stroke-linecap="round" opacity="0.65"/>
      <path d="M216 84 C220 110 221 134 220 156" stroke="#C9A227" stroke-width="3" stroke-linecap="round"/>
      <path d="M220 156 L213 146 M220 156 L227 146" stroke="#C9A227" stroke-width="3" stroke-linecap="round"/>
      <text x="58" y="150" font-family="Helvetica, Arial, sans-serif" font-size="9" fill="#6B4A2F">hacia la oreja, ascendente</text>
      <text x="150" y="180" font-family="Helvetica, Arial, sans-serif" font-size="9" fill="#6B4A2F">hacia la clavícula</text>
    </svg>`;

const SVG_LINEA_NOCHE = `<svg width="300" height="160" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M244 26 A18 18 0 1 0 262 50 A14 14 0 0 1 244 26" fill="#C9A227"/>
      <line x1="22" y1="85" x2="278" y2="85" stroke="#8E1B1B" stroke-width="2"/>
      <path d="M278 85 L268 79 M278 85 L268 91" stroke="#8E1B1B" stroke-width="2" stroke-linecap="round"/>
      <circle cx="40" cy="85" r="7" fill="#8E1B1B"/>
      <circle cx="95" cy="85" r="7" fill="#C9A227"/>
      <circle cx="150" cy="85" r="7" fill="#8E1B1B"/>
      <circle cx="205" cy="85" r="7" fill="#C9A227"/>
      <circle cx="255" cy="85" r="7" fill="#8E1B1B"/>
      <text x="40" y="66" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9" font-weight="bold" fill="#8E1B1B">−30 min</text>
      <text x="95" y="66" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9" font-weight="bold" fill="#8E1B1B">−25</text>
      <text x="150" y="66" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9" font-weight="bold" fill="#8E1B1B">−15</text>
      <text x="205" y="66" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9" font-weight="bold" fill="#8E1B1B">−5</text>
      <text x="255" y="66" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9" font-weight="bold" fill="#8E1B1B">0</text>
      <text x="40" y="106" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="8.5" fill="#5C4A3D">Té caliente</text>
      <text x="95" y="106" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="8.5" fill="#5C4A3D">Pantallas fuera</text>
      <text x="150" y="106" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="8.5" fill="#5C4A3D">Habitación lista</text>
      <text x="205" y="106" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="8.5" fill="#5C4A3D">Respiración</text>
      <text x="255" y="106" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="8.5" fill="#5C4A3D">A dormir</text>
      <text x="150" y="130" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9" font-style="italic" fill="#6B4A2F">… y mientras duermes, tu piel hace el resto</text>
    </svg>`;

export const BONOS: Bono[] = [
  {
    slug: "piel-de-cristal",
    titulo: "Piel de Cristal",
    subtitulo: "El glow coreano en 7 noches",
    emoji: "✨",
    secciones: [
      {
        slug: "formula",
        titulo: "La fórmula cristal",
        resumen: "La misma base que ya conoces, pero más ligera y con el doble de agua de arroz.",
        bloques: [
          {
            tipo: "parrafo",
            texto: "En Seúl llamamos piel de cristal a una piel tan hidratada y tan lisa que devuelve la luz, como el vidrio. No necesitas productos nuevos: solo una variación de tu pasta y siete noches seguidas.",
          },
          {
            tipo: "lista",
            items: [
              "Hidratación — una piel con sed se ve opaca; una piel llena brilla.",
              "Superficie lisa — cuando la superficie está suave, la luz rebota ordenada.",
              "Sello — de nada sirve hidratar si la humedad se escapa durante la noche.",
            ],
          },
          {
            tipo: "aviso",
            variante: "alerta",
            titulo: "Prueba de parche — obligatoria",
            texto: "Aplica una pequeña cantidad de la fórmula cristal detrás de la oreja y espera 24 horas. Si aparece ardor, picazón o enrojecimiento, usa la variante sin clara o suspende el uso. Esta guía es educativa y cosmética: no reemplaza el consejo de tu médico o dermatólogo.",
          },
          {
            tipo: "receta",
            nombre: "Fórmula Cristal · 7 noches",
            ingredientes: [
              { item: "Agua de arroz (reposada 30 min)", cantidad: "4 cdas" },
              { item: "Polvo de ginseng rojo", cantidad: "½ cdta" },
              { item: "Miel pura", cantidad: "1 cdta" },
              { item: "Clara de huevo", cantidad: "½ unidad" },
            ],
            nota: "Prepárala cada noche y desecha lo que sobre. Lleva clara de huevo: nunca la guardes de un día para otro.",
          },
          {
            tipo: "pasos",
            items: [
              {
                titulo: "Prepara el agua de arroz",
                texto: "Enjuaga media taza de arroz, cúbrelo con agua y deja reposar 30 minutos. Cuela: esa agua blanca es tu base.",
              },
              {
                titulo: "Mezcla ginseng y miel",
                texto: "Une el polvo con la miel hasta lograr un rojo uniforme.",
              },
              {
                titulo: "Suma el agua de arroz",
                texto: "De a poco. Busca textura de esencia ligera: más fluida que tu pasta.",
              },
              {
                titulo: "Incorpora la clara",
                texto: "Bate suave 20 segundos. Es lo que sella el brillo.",
              },
            ],
          },
          {
            tipo: "diagrama",
            svg: SVG_CRISTAL,
            leyenda: "Una superficie hidratada y sellada devuelve la luz. Eso es el efecto cristal.",
          },
          {
            tipo: "aviso",
            variante: "nota",
            titulo: "Piel sensible",
            texto: "Omite la clara: queda una esencia aún más suave, con un sello más ligero.",
          },
          {
            tipo: "aviso",
            variante: "mina",
            titulo: "Palabras de la Dra. Mina",
            texto: "“Mi abuela guardaba el agua de arroz en un frasco de vidrio junto a la ventana. Decía: el arroz alimenta dos veces — primero al cuerpo, después a la piel.”",
          },
        ],
      },
      {
        slug: "limpieza",
        titulo: "La doble limpieza",
        resumen: "Dos pasos antes de la fórmula. La luz no atraviesa el residuo del día.",
        bloques: [
          {
            tipo: "parrafo",
            texto: "El cristal empieza en la limpieza. Protector solar, maquillaje y polvo de la ciudad se quedan en la superficie y apagan el brillo. Antes de la fórmula, cada noche, dos pasos.",
          },
          {
            tipo: "pasos",
            items: [
              {
                titulo: "Primer paso · aceite",
                texto: "Unas gotas de aceite suave (almendras u oliva ligera) sobre el rostro seco. Círculos lentos durante 30 segundos. Retira con agua tibia.",
              },
              {
                titulo: "Segundo paso · agua",
                texto: "Tu limpiador suave de siempre o un jabón neutro. Haz espuma, masajea y enjuaga bien.",
              },
            ],
          },
          {
            tipo: "aviso",
            variante: "tip",
            titulo: "Tibia, nunca caliente",
            texto: "El agua muy caliente reseca y apaga el brillo. Termina siempre con un toque de agua fresca.",
          },
          {
            tipo: "aviso",
            variante: "mina",
            titulo: "Palabras de la Dra. Mina",
            texto: "“En Seúl decimos que la doble limpieza no lava el rostro: lo prepara para escuchar.”",
          },
        ],
      },
      {
        slug: "siete-noches",
        titulo: "Las 7 noches",
        resumen: "Siete noches seguidas, quince minutos cada una. El brillo se construye por acumulación.",
        bloques: [
          {
            tipo: "parrafo",
            texto: "Elige una semana tranquila y no te saltes ninguna noche. Cada noche de hidratación sellada le deja a la piel un poco más de agua adentro: el cristal es la suma, no una sola noche.",
          },
          { tipo: "titulo", texto: "Noche 1 · El punto de partida" },
          {
            tipo: "checklist",
            items: [
              "Doble limpieza completa (aceite + agua)",
              "Fórmula cristal en capa fina: rostro, cuello y escote, evitando el contorno de ojos",
              "Deja actuar 10 minutos",
              "Retira con agua fría",
              "Termina con tu crema hidratante de siempre",
            ],
          },
          {
            tipo: "aviso",
            variante: "tip",
            titulo: "Esta noche",
            texto: "Tómate una foto de frente con luz natural, sin filtro. Será tu día 1 del cristal.",
          },
          { tipo: "titulo", texto: "Noche 2 · Instalar el ritmo" },
          {
            tipo: "checklist",
            items: [
              "Doble limpieza completa",
              "Fórmula cristal en capa fina, 10 minutos",
              "Retira con agua fría",
              "Sella con tu crema hidratante",
            ],
          },
          {
            tipo: "parrafo",
            texto: "No busques resultados todavía. Estas dos primeras noches son para instalar el hábito: busca el ritmo, no el espejo.",
          },
          { tipo: "titulo", texto: "Noche 3 · La constancia" },
          {
            tipo: "checklist",
            items: [
              "Doble limpieza completa",
              "Fórmula cristal en capa fina, 10 minutos",
              "Retira con agua fría",
              "Aplausos de lluvia: con las yemas de los dedos, palmaditas muy suaves por todo el rostro durante 30 segundos",
              "Sella con tu crema hidratante",
            ],
          },
          { tipo: "titulo", texto: "Noche 4 · Ajusta y sigue" },
          {
            tipo: "checklist",
            items: [
              "Doble limpieza completa",
              "Fórmula cristal en capa fina, 10 minutos",
              "Retira con agua fría",
              "Aplausos de lluvia, 30 segundos",
              "Sella con tu crema hidratante",
            ],
          },
          {
            tipo: "aviso",
            variante: "tip",
            titulo: "Ajusta la textura",
            texto: "Si la mezcla tira demasiado al secar, agrega una cucharada más de agua de arroz la próxima noche.",
          },
          { tipo: "titulo", texto: "Noche 5 · La profundidad" },
          {
            tipo: "checklist",
            items: [
              "Doble limpieza completa",
              "Fórmula cristal en capa fina",
              "Antes de retirar: masaje de 3 dedos, 1 minuto, siempre hacia arriba — cuello, mejillas, frente",
              "Retira con agua fría",
              "Sella con tu crema hidratante",
            ],
          },
          { tipo: "titulo", texto: "Noche 6 · El brillo asoma" },
          {
            tipo: "checklist",
            items: [
              "Doble limpieza completa",
              "Fórmula cristal en capa fina",
              "Masaje de 3 dedos, 1 minuto, hacia arriba",
              "Retira con agua fría",
              "Sella con tu crema hidratante",
            ],
          },
          { tipo: "titulo", texto: "Noche 7 · La noche del cristal" },
          {
            tipo: "checklist",
            items: [
              "Doble limpieza lenta, sin apuro",
              "Fórmula cristal + masaje de 3 dedos",
              "Durante los 10 minutos, respira lento y suelta los hombros",
              "Retira con agua fría y sella con tu crema",
              "Tómate la foto final: misma luz, mismo ángulo del día 1",
              "Compara las dos fotos con calma",
            ],
          },
          {
            tipo: "aviso",
            variante: "mina",
            titulo: "Palabras de la Dra. Mina",
            texto: "“El cristal no se fabrica en una noche. Se pule — noche tras noche, con las mismas manos pacientes.”",
          },
        ],
      },
      {
        slug: "faq",
        titulo: "Preguntas frecuentes",
        resumen: "Las tres dudas que más me llegan sobre las 7 noches.",
        bloques: [
          { tipo: "titulo", texto: "¿Puedo seguir después de la noche 7?" },
          {
            tipo: "parrafo",
            texto: "Sí. Como mantenimiento, usa la fórmula cristal 2 o 3 noches por semana, o intégrala a tu cronograma de 21 noches.",
          },
          { tipo: "titulo", texto: "¿Y si ya estoy en las 21 noches del Pegamento Rojo?" },
          {
            tipo: "parrafo",
            texto: "Puedes reemplazar la pasta por la fórmula cristal durante 7 noches seguidas, o alternar: una noche pasta, una noche cristal.",
          },
          { tipo: "titulo", texto: "Tengo la piel sensible, ¿puedo hacerlo?" },
          {
            tipo: "parrafo",
            texto: "Usa la variante sin clara y haz siempre la prueba de parche. Si hay molestia, suspende.",
          },
          {
            tipo: "parrafo",
            texto: "Siete noches. Eso fue todo lo que te pedí — y mira lo que la constancia devuelve. Guarda esta guía: tu piel va a querer volver a ella.",
          },
        ],
      },
    ],
  },
  {
    slug: "anti-papada",
    titulo: "Mapa Anti-Papada",
    subtitulo: "6 puntos que definen tu mandíbula",
    emoji: "📍",
    secciones: [
      {
        slug: "mapa",
        titulo: "El mapa de los 6 puntos",
        resumen: "Del mentón a la clavícula. Memoriza el recorrido antes de tocar la zona.",
        bloques: [
          {
            tipo: "parrafo",
            texto: "La papada no se combate: se drena, se despierta y se educa. Con las manos, con dirección y con constancia. Tres minutos al día, nada más.",
          },
          {
            tipo: "lista",
            items: [
              "Líquidos que se quedan — bajo el mentón el drenaje es lento y la zona se ve más llena, sobre todo al despertar.",
              "Tensión acumulada — apretar los dientes endurece los músculos y cambia la forma del contorno.",
              "Postura de pantalla — mirar el celular hacia abajo pliega la zona una y otra vez.",
            ],
          },
          {
            tipo: "aviso",
            variante: "alerta",
            titulo: "La presión correcta nunca duele",
            texto: "Trabaja solo los lados del cuello y el borde del hueso de la mandíbula. Nunca presiones la parte frontal de la garganta. Si tienes ganglios sensibles, dolor, problemas de tiroides o lesiones en la zona, consulta a tu médico antes de empezar. Esta guía es educativa y cosmética.",
          },
          {
            tipo: "aviso",
            variante: "nota",
            titulo: "Prueba de parche",
            texto: "Si acompañas el masaje con la pasta o con un aceite nuevo, aplica una pequeña cantidad detrás de la oreja y espera 24 horas antes del primer uso completo.",
          },
          {
            tipo: "diagrama",
            svg: SVG_MAPA,
            leyenda: "El recorrido completo: del mentón (1) a la clavícula (6). Rojo = despertar; oro = drenar.",
          },
          {
            tipo: "lista",
            items: [
              "1 · Bajo el mentón",
              "2 · Línea media de la mandíbula",
              "3 · Ángulo de la mandíbula",
              "4 · Bajo la oreja",
              "5 · Lateral del cuello",
              "6 · Hueco de la clavícula",
            ],
          },
          {
            tipo: "aviso",
            variante: "tip",
            titulo: "Manos limpias, manos tibias",
            texto: "Lávate las manos y frótalas 10 segundos antes de tocar el rostro. El calor de las palmas es parte de la técnica.",
          },
        ],
      },
      {
        slug: "puntos",
        titulo: "Punto por punto",
        resumen: "Cómo presionar cada punto y cuánto tiempo quedarte en él.",
        bloques: [
          { tipo: "titulo", texto: "Puntos 1 y 2 · el centro" },
          {
            tipo: "pasos",
            items: [
              {
                titulo: "Punto 1 · Bajo el mentón",
                texto: "Coloca las yemas del índice y el medio justo detrás del hueso del mentón, en la parte blanda. Presiona suave y dibuja círculos lentos y pequeños durante 20–30 segundos. Es el punto donde el recorrido despierta.",
              },
              {
                titulo: "Punto 2 · Línea media de la mandíbula",
                texto: "Desliza los dedos hasta la mitad del camino entre el mentón y la esquina de la mandíbula, siempre bajo el borde del hueso. Misma presión suave, mismos círculos lentos, 20–30 segundos. Trabaja los dos lados a la vez, una mano por lado.",
              },
            ],
          },
          {
            tipo: "aviso",
            variante: "tip",
            titulo: "Que los dedos se deslicen",
            texto: "Usa unas gotas de aceite o una pizca de tu pasta para que los dedos no jalen la piel. La piel se acompaña, nunca se arrastra.",
          },
          { tipo: "titulo", texto: "Puntos 3 y 4 · la esquina" },
          {
            tipo: "pasos",
            items: [
              {
                titulo: "Punto 3 · Ángulo de la mandíbula",
                texto: "La esquina del hueso, justo debajo y delante del lóbulo de la oreja. Aquí se guarda la tensión de apretar los dientes. Círculos suaves durante 30 segundos. Muchas mujeres sienten que la mandíbula se suelta de inmediato.",
              },
              {
                titulo: "Punto 4 · Bajo la oreja",
                texto: "El hueco blando justo debajo del lóbulo. Es la puerta de salida del rostro: todo lo que moviste en 1, 2 y 3 pasa por aquí. Presión muy suave, sin círculos: solo presiona y suelta, 20 segundos.",
              },
            ],
          },
          {
            tipo: "aviso",
            variante: "nota",
            titulo: "Sensibilidad al inicio",
            texto: "Es normal que los primeros días la zona se sienta sensible. Baja la presión. Recuerda la regla: nunca debe doler.",
          },
          { tipo: "titulo", texto: "Puntos 5 y 6 · la salida" },
          {
            tipo: "pasos",
            items: [
              {
                titulo: "Punto 5 · Lateral del cuello",
                texto: "Aquí no hay círculos: hay caricia. Desliza la mano abierta desde debajo de la oreja hacia abajo, por el costado del cuello, con una presión firme pero amable. Cinco pasadas lentas por lado.",
              },
              {
                titulo: "Punto 6 · Hueco de la clavícula",
                texto: "El pequeño hueco sobre la clavícula, cerca del hombro. Apoya dos dedos y haz 10 pulsaciones muy suaves, como si tocaras una puerta con delicadeza. Aquí desemboca todo el recorrido.",
              },
            ],
          },
          {
            tipo: "aviso",
            variante: "alerta",
            titulo: "Regla del cuello",
            texto: "En el cuello, el movimiento va siempre hacia abajo y siempre por los lados. Nunca presiones el centro de la garganta.",
          },
        ],
      },
      {
        slug: "secuencia",
        titulo: "La secuencia de 3 minutos",
        resumen: "Los seis puntos, ordenados y cronometrados.",
        bloques: [
          {
            tipo: "pasos",
            items: [
              {
                titulo: "0:00–0:20 · Prepara",
                texto: "Calienta unas gotas de aceite entre las palmas. Hombros abajo, respiración profunda.",
              },
              {
                titulo: "0:20–1:20 · Puntos 1, 2 y 3",
                texto: "Veinte segundos de círculos suaves en cada punto, los dos lados a la vez.",
              },
              {
                titulo: "1:20–1:40 · Punto 4",
                texto: "Presiona y suelta bajo las orejas, muy suave.",
              },
              {
                titulo: "1:40–2:20 · Punto 5",
                texto: "Cinco deslizamientos lentos por el lateral del cuello, hacia abajo.",
              },
              {
                titulo: "2:20–2:50 · Punto 6",
                texto: "Diez pulsaciones suaves sobre el hueco de la clavícula.",
              },
              {
                titulo: "2:50–3:00 · Cierra",
                texto: "Palmas tibias apoyadas sobre el cuello. Dos respiraciones profundas.",
              },
            ],
          },
          {
            tipo: "aviso",
            variante: "tip",
            titulo: "Mismo horario, cada día",
            texto: "Ideal: por la noche, justo antes de aplicar tu pasta. La constancia dibuja la línea.",
          },
          {
            tipo: "parrafo",
            texto: "El orden importa: primero el mapa, que drena y despierta la zona; después la pasta con tu masaje de 3 dedos, que sella y levanta. Total: cinco minutos por noche.",
          },
          {
            tipo: "diagrama",
            svg: SVG_DIRECCIONES,
            leyenda: "Del mentón hacia la oreja: siempre ascendente. Del cuello a la clavícula: siempre descendente.",
          },
        ],
      },
      {
        slug: "faq",
        titulo: "Preguntas frecuentes",
        resumen: "Las dudas que más aparecen con el mapa en la mano.",
        bloques: [
          { tipo: "titulo", texto: "¿Cuándo empiezo a notar la diferencia?" },
          {
            tipo: "parrafo",
            texto: "La sensación de ligereza suele llegar desde los primeros días. En el espejo, muchas mujeres notan la zona más despejada hacia la segunda o tercera semana de constancia.",
          },
          { tipo: "titulo", texto: "¿Puedo hacerlo dos veces al día?" },
          {
            tipo: "parrafo",
            texto: "Sí. Por la mañana ayuda a despertar el rostro después de la almohada; por la noche prepara la zona para la pasta.",
          },
          { tipo: "titulo", texto: "¿Con producto o sin producto?" },
          {
            tipo: "parrafo",
            texto: "Siempre con algo que deslice: unas gotas de aceite o tu pasta. En seco, los dedos jalan la piel.",
          },
          { tipo: "titulo", texto: "¿Debe doler para funcionar?" },
          {
            tipo: "parrafo",
            texto: "Jamás. El dolor no acelera nada: al contrario, tensa la zona. La presión correcta es la de una caricia decidida.",
          },
          {
            tipo: "aviso",
            variante: "mina",
            titulo: "Palabras de la Dra. Mina",
            texto: "“La constancia es la única técnica que no se puede comprar. Por suerte, ya la tienes.”",
          },
        ],
      },
    ],
  },
  {
    slug: "sueno-de-seul",
    titulo: "Sueño de Seúl",
    subtitulo: "El ritual nocturno que regenera tu piel",
    emoji: "🌙",
    secciones: [
      {
        slug: "por-que",
        titulo: "Tu piel trabaja de noche",
        resumen: "Por qué el cuidado de la piel no termina cuando apagas la luz: empieza ahí.",
        bloques: [
          {
            tipo: "parrafo",
            texto: "Durante el día tu piel se defiende: sol, viento, gestos, maquillaje. Durante la noche cambia de tarea y se dedica a renovarse. Por eso una buena noche se nota en el espejo — y una mala noche también.",
          },
          {
            tipo: "parrafo",
            texto: "Mientras duermes profundo, el cuerpo baja el ritmo y la piel aprovecha la calma. Es el momento en que mejor recibe lo que le dejaste antes de acostarte: tu pasta, tu crema, tu masaje.",
          },
          {
            tipo: "parrafo",
            texto: "Dormir bien no es dormir más. Se trata de cómo llegas a la cama: con qué luz, con qué temperatura, con qué cabeza. Ese es el terreno de este ritual — los 30 minutos que separan tu día de tu descanso.",
          },
          {
            tipo: "aviso",
            variante: "alerta",
            titulo: "Si el sueño es una lucha",
            texto: "Si tienes insomnio crónico, apnea del sueño o llevas semanas durmiendo mal, consulta a tu médico. Este ritual acompaña, pero no reemplaza la atención profesional.",
          },
          {
            tipo: "aviso",
            variante: "tip",
            titulo: "La pareja perfecta",
            texto: "Aplica tu Pegamento Rojo dentro de este ritual: piel cuidada + noche bien dormida es la combinación que más se nota por la mañana.",
          },
        ],
      },
      {
        slug: "rutina",
        titulo: "El ritual de 30 minutos",
        resumen: "Seis pasos suaves, en orden. Cada uno te empuja con dulzura hacia el siguiente.",
        bloques: [
          {
            tipo: "diagrama",
            svg: SVG_LINEA_NOCHE,
            leyenda: "Treinta minutos, cinco paradas. Tu piel recibe la noche preparada.",
          },
          {
            tipo: "pasos",
            items: [
              {
                titulo: "Prepara tu té (−30 min)",
                texto: "Una infusión sin cafeína: manzanilla, tilo o jengibre suave. Tómalo despacio, con las dos manos alrededor de la taza. El calor le avisa al cuerpo que el día terminó.",
              },
              {
                titulo: "Pantallas fuera (−25 min)",
                texto: "Celular en modo no molestar y lejos de la cama, idealmente en otra habitación. La luz de las pantallas le dice al cuerpo que todavía es de día — justo lo contrario de lo que buscas.",
              },
              {
                titulo: "Luz cálida y baja (−20 min)",
                texto: "Apaga las luces blancas del techo. Deja solo una lámpara cálida y tenue. La penumbra es la primera caricia de la noche.",
              },
              {
                titulo: "Enfría la habitación (−15 min)",
                texto: "Entre 18 y 20 °C es lo ideal. Si no puedes medirlo, busca fresco con cobija. Ventila cinco minutos si el aire está cargado.",
              },
              {
                titulo: "Acomoda tu almohada (−10 min)",
                texto: "Si puedes, duerme boca arriba: el rostro descansa libre, sin pliegues contra la tela. Si duermes de lado, elige una funda suave y lisa (seda o satén) y evita aplastar la mejilla contra la almohada.",
              },
              {
                titulo: "Respira 4-7-8 (−5 min)",
                texto: "Ya acostada, con la luz apagada, haz cuatro ciclos de la respiración 4-7-8.",
              },
            ],
          },
          {
            tipo: "aviso",
            variante: "tip",
            titulo: "El momento de la pasta",
            texto: "Este es el mejor momento para tu Pegamento Rojo: con el té servido y la luz baja, tu ritual de piel se vuelve parte del descanso.",
          },
          {
            tipo: "aviso",
            variante: "nota",
            titulo: "¿Y si me salto un paso?",
            texto: "No pasa nada. El ritual no es un examen: es una dirección. Cada paso que sumes ya trabaja a tu favor. Puedes sumar uno por noche: en una semana el ritual completo será tuyo.",
          },
        ],
      },
      {
        slug: "respiracion",
        titulo: "La respiración 4-7-8",
        resumen: "El interruptor suave del ritual: le dice al cuerpo que ya puede soltar.",
        bloques: [
          {
            tipo: "pasos",
            items: [
              {
                titulo: "Acomódate",
                texto: "Acostada, hombros sueltos, punta de la lengua apoyada detrás de los dientes de arriba.",
              },
              {
                titulo: "Inhala · 4 segundos",
                texto: "Por la nariz, lenta y silenciosa, contando hasta cuatro.",
              },
              {
                titulo: "Retén · 7 segundos",
                texto: "Sostén el aire sin tensión, contando hasta siete.",
              },
              {
                titulo: "Exhala · 8 segundos",
                texto: "Por la boca, con un soplido suave y largo, contando hasta ocho.",
              },
              {
                titulo: "Repite 4 ciclos",
                texto: "Muchas mujeres no llegan al cuarto: se quedan dormidas antes.",
              },
            ],
          },
          {
            tipo: "aviso",
            variante: "alerta",
            titulo: "Si te mareas",
            texto: "Vuelve a respirar normal y reduce a dos ciclos. Con la práctica, el ritmo se vuelve natural.",
          },
        ],
      },
      {
        slug: "habitacion",
        titulo: "La habitación de Seúl",
        resumen: "Ajústala una vez y trabajará por ti todas las noches.",
        bloques: [
          {
            tipo: "parrafo",
            texto: "En Corea la habitación se prepara como se prepara la piel: con pocos gestos, repetidos con cariño. Recorre esta lista una vez y ajusta lo que falte.",
          },
          {
            tipo: "checklist",
            items: [
              "Oscuridad total — cortina gruesa o antifaz suave",
              "Temperatura fresca: entre 18 y 20 °C",
              "Ventilar la habitación 5 minutos antes de acostarte",
              "Celular fuera de la habitación (o lejos de la cama, en silencio)",
              "Luces blancas del techo apagadas: solo una lámpara cálida y tenue",
              "Almohada lista para dormir boca arriba, con el rostro libre",
              "Si duermes de lado: funda suave y lisa (seda o satén), sin aplastar la mejilla",
              "Funda de almohada limpia — cámbiala dos veces por semana",
              "Vaso de agua en la mesa de noche",
              "Silencio, o un ruido blanco suave si tu calle es ruidosa",
              "Nada de trabajo pendiente a la vista: la cama es territorio de descanso",
            ],
          },
          {
            tipo: "aviso",
            variante: "nota",
            titulo: "La funda y tu piel",
            texto: "Tu rostro pasa más horas sobre la funda que frente al espejo. Límpiala como si fuera parte de tu rutina de piel — porque lo es.",
          },
        ],
      },
      {
        slug: "faq",
        titulo: "Preguntas frecuentes",
        resumen: "Lo que más me preguntan sobre el ritual nocturno.",
        bloques: [
          { tipo: "titulo", texto: "¿Y si no puedo dormir 8 horas?" },
          {
            tipo: "parrafo",
            texto: "Trabaja la calidad antes que la cantidad. Llegar a la cama serena, con la habitación preparada, mejora las horas que sí tienes.",
          },
          { tipo: "titulo", texto: "¿El té puede ser otro?" },
          {
            tipo: "parrafo",
            texto: "Cualquier infusión sin cafeína sirve: manzanilla, tilo, cedrón, jengibre suave. Evita té negro, verde y mate por la noche.",
          },
          { tipo: "titulo", texto: "¿Funciona desde la primera noche?" },
          {
            tipo: "parrafo",
            texto: "El ritual se construye. Algunas mujeres sienten el cambio esa misma semana; para otras toma un poco más. La constancia es la que trae los resultados.",
          },
          { tipo: "titulo", texto: "¿Puedo hacer la respiración ya en la cama?" },
          {
            tipo: "parrafo",
            texto: "Sí, es justamente el lugar ideal. Luz apagada, cuerpo acomodado, cuatro ciclos.",
          },
          {
            tipo: "aviso",
            variante: "mina",
            titulo: "Palabras de la Dra. Mina",
            texto: "“Duerme como quien se cuida: con la habitación lista, el rostro limpio y el corazón despacio.”",
          },
        ],
      },
    ],
  },
];
