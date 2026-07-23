"use client";

import { useCallback, useEffect, useState } from "react";

/* Perfil da usuária: o que o test de piel responde.
   É o que transforma "la receta" em "TU fórmula" — a promessa que a copy vende
   ("recibe tu fórmula personalizada según tu test de piel").
   Fica só no aparelho, como o progresso. */

const KEY = "ritual-seul:perfil";

export type TipoPiel = "seca" | "mixta" | "sensible";
export type Foco = "cuello" | "arrugas" | "manchas";

export type Perfil = {
  nombre: string;
  tipoPiel: TipoPiel;
  foco: Foco;
  /** Reage mal a cosméticos novos / alergia conhecida → versão sem clara. */
  reactiva: boolean;
  creadoEn: string;
};

function leer(): Perfil | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<Perfil>;
    if (!p.tipoPiel || !p.foco) return null;
    return {
      nombre: typeof p.nombre === "string" ? p.nombre : "",
      tipoPiel: p.tipoPiel,
      foco: p.foco,
      reactiva: !!p.reactiva,
      creadoEn: typeof p.creadoEn === "string" ? p.creadoEn : new Date().toISOString().slice(0, 10),
    };
  } catch {
    return null;
  }
}

export function usePerfil() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setPerfil(leer());
    setListo(true);
  }, []);

  const guardar = useCallback((p: Omit<Perfil, "creadoEn">) => {
    const completo: Perfil = { ...p, creadoEn: new Date().toISOString().slice(0, 10) };
    setPerfil(completo);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(completo));
    } catch {
      /* segue na sessão */
    }
    return completo;
  }, []);

  const borrar = useCallback(() => {
    setPerfil(null);
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* noop */
    }
  }, []);

  return { listo, perfil, guardar, borrar };
}
