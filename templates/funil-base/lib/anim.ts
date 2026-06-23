// Variants reutilizáveis do Framer Motion (camada de gamificação).
// Plugar amanhã: envolver cada passo do quiz em <motion.div variants={stepVariants} ...>.
import type { Variants } from "framer-motion";

// Transição direcional entre passos do quiz (spring).
export const stepVariants: Variants = {
  enter: { opacity: 0, x: 40 },
  center: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 26 },
  },
  exit: { opacity: 0, x: -40, transition: { duration: 0.18 } },
};

// Entrada suave (cards, blocos, micro-copy).
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 24 } },
};

// Stagger pra grades de tiles (cada filho entra em sequência).
export const staggerGrid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

// Pop dramático da revelação (avatar/selo surgindo).
export const revealPop: Variants = {
  hidden: { opacity: 0, scale: 0.6, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 180, damping: 14 },
  },
};

// Tile selecionado dá um "tap" tátil.
export const tapPop = { scale: 0.94 };
