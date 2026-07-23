"use client";

import { useCallback, useEffect, useState } from "react";

/* Progresso do ritual. Fica só no aparelho (localStorage): funciona offline,
   não exige conta e não guarda nada de ninguém em servidor. */

const KEY = "ritual-seul:progreso";

export type Progreso = {
  /** Números das noites concluídas (1..21). */
  nochesHechas: number[];
  /** ISO date (YYYY-MM-DD) da primeira noite marcada. */
  inicio: string | null;
  /** Datas (YYYY-MM-DD) em que marcou alguma noite — base da sequência de dias. */
  dias: string[];
};

const VACIO: Progreso = { nochesHechas: [], inicio: null, dias: [] };

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

/** Dias seguidos até hoje (ou até ontem, se ainda não fez o de hoje). */
function calcularRacha(dias: string[]): number {
  if (!dias.length) return 0;
  const set = new Set(dias);
  const cursor = new Date();
  // Se ainda não marcou hoje, a sequência pode seguir viva desde ontem.
  if (!set.has(hoyISO())) cursor.setDate(cursor.getDate() - 1);

  let n = 0;
  for (;;) {
    const iso = cursor.toISOString().slice(0, 10);
    if (!set.has(iso)) break;
    n++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

function leer(): Progreso {
  if (typeof window === "undefined") return VACIO;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return VACIO;
    const p = JSON.parse(raw) as Partial<Progreso>;
    return {
      nochesHechas: Array.isArray(p.nochesHechas) ? p.nochesHechas.filter((n) => typeof n === "number") : [],
      inicio: typeof p.inicio === "string" ? p.inicio : null,
      dias: Array.isArray(p.dias) ? p.dias.filter((d) => typeof d === "string") : [],
    };
  } catch {
    return VACIO;
  }
}

export function useProgreso() {
  const [progreso, setProgreso] = useState<Progreso>(VACIO);
  // Evita divergência entre servidor e cliente: só usamos o valor real depois de montar.
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setProgreso(leer());
    setListo(true);
  }, []);

  const guardar = useCallback((p: Progreso) => {
    setProgreso(p);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(p));
    } catch {
      /* modo privado / quota cheia: o app segue funcionando na sessão */
    }
  }, []);

  const alternarNoche = useCallback(
    (numero: number) => {
      const hechas = new Set(progreso.nochesHechas);
      const marcando = !hechas.has(numero);
      marcando ? hechas.add(numero) : hechas.delete(numero);
      const lista = [...hechas].sort((a, b) => a - b);

      // A sequência conta dias em que ela cumpriu o ritual; desmarcar não apaga
      // o dia (ela esteve aqui), mas zerar tudo zera também.
      const dias = new Set(progreso.dias);
      if (marcando) dias.add(hoyISO());

      guardar({
        nochesHechas: lista,
        inicio: progreso.inicio ?? (lista.length ? hoyISO() : null),
        dias: lista.length ? [...dias].sort() : [],
      });
    },
    [progreso, guardar]
  );

  const reiniciar = useCallback(() => guardar(VACIO), [guardar]);

  const hechas = progreso.nochesHechas.length;
  // A "noche de hoy" é a primeira ainda não marcada — sem punir quem pula um dia.
  let siguiente = 1;
  while (progreso.nochesHechas.includes(siguiente) && siguiente <= 21) siguiente++;

  return {
    listo,
    progreso,
    hechas,
    racha: calcularRacha(progreso.dias),
    siguiente: Math.min(siguiente, 21),
    completo: hechas >= 21,
    porcentaje: Math.round((hechas / 21) * 100),
    estaHecha: (n: number) => progreso.nochesHechas.includes(n),
    alternarNoche,
    reiniciar,
  };
}
