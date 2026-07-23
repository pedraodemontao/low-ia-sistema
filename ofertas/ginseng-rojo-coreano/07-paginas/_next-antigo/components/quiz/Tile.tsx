"use client";

import { motion } from "framer-motion";
import { tapPop } from "@/lib/anim";

// Tile do quiz com entrada em stagger (fadeUp) e feedback de toque (whileTap).
export type TileProps = {
  icon?: string;
  label: string;
  big?: boolean;
  selected?: boolean;
  onClick: () => void;
};

export function Tile({ icon, label, big, selected, onClick }: TileProps) {
  return (
    <motion.button
      whileTap={tapPop}
      className={`tile${big ? " big" : ""}${selected ? " selected" : ""}`}
      onClick={onClick}
    >
      {icon && <span className="tile-icon">{icon}</span>}
      <span>{label}</span>
    </motion.button>
  );
}
