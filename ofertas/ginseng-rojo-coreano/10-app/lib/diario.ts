"use client";

import { useCallback, useEffect, useState } from "react";

/* Diário com fotos. Fotos não cabem em localStorage, então vão em IndexedDB
   como Blob — e nunca saem do aparelho (nada sobe pra servidor nenhum).
   Serve pra que ela VEJA a mudança: quem registra o dia 1 e compara no dia 21
   não sente que "não funcionou". */

const DB = "ritual-seul";
const STORE = "diario";

export type Entrada = {
  id: string;
  fecha: string; // YYYY-MM-DD
  noche: number;
  foto?: Blob;
  nota: string;
};

function abrir(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

async function todas(): Promise<Entrada[]> {
  const db = await abrir();
  return new Promise((res, rej) => {
    const req = db.transaction(STORE, "readonly").objectStore(STORE).getAll();
    req.onsuccess = () => res((req.result as Entrada[]).sort((a, b) => a.noche - b.noche));
    req.onerror = () => rej(req.error);
  });
}

async function poner(e: Entrada): Promise<void> {
  const db = await abrir();
  return new Promise((res, rej) => {
    const req = db.transaction(STORE, "readwrite").objectStore(STORE).put(e);
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}

async function quitar(id: string): Promise<void> {
  const db = await abrir();
  return new Promise((res, rej) => {
    const req = db.transaction(STORE, "readwrite").objectStore(STORE).delete(id);
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}

export function useDiario() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [listo, setListo] = useState(false);

  const recargar = useCallback(async () => {
    try {
      setEntradas(await todas());
    } catch {
      setEntradas([]);
    } finally {
      setListo(true);
    }
  }, []);

  useEffect(() => {
    void recargar();
  }, [recargar]);

  const agregar = useCallback(
    async (datos: { noche: number; foto?: Blob; nota: string }) => {
      await poner({
        id: `${Date.now()}`,
        fecha: new Date().toISOString().slice(0, 10),
        ...datos,
      });
      await recargar();
    },
    [recargar]
  );

  const borrar = useCallback(
    async (id: string) => {
      await quitar(id);
      await recargar();
    },
    [recargar]
  );

  return { listo, entradas, agregar, borrar };
}
