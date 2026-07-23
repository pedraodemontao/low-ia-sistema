"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { construirFormula } from "@/lib/formula";
import { usePerfil } from "@/lib/perfil";

/* Masaje guiado. A copy promete "2 minutos" — sem cronômetro a pessoa não sabe
   se fez certo, e "acho que estou fazendo errado" vira desistência.
   As zonas e os tempos vêm da fórmula dela. */

export default function Temporizador() {
  const router = useRouter();
  const { listo, perfil } = usePerfil();
  const [i, setI] = useState(0);
  const [restante, setRestante] = useState<number | null>(null);
  const [corriendo, setCorriendo] = useState(false);
  const [fin, setFin] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (listo && !perfil) router.replace("/bienvenida");
  }, [listo, perfil, router]);

  const zonas = perfil ? construirFormula(perfil).masaje : [];
  const zona = zonas[i];
  const total = zonas.reduce((s, z) => s + z.segundos, 0);

  const vibrar = useCallback((patron: number | number[]) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(patron);
  }, []);

  const parar = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
    setCorriendo(false);
  }, []);

  // Avança sozinho de zona em zona até fechar a sequência.
  useEffect(() => {
    if (!corriendo || restante === null) return;
    tick.current = setInterval(() => {
      setRestante((r) => {
        if (r === null) return r;
        if (r > 1) return r - 1;

        const siguiente = i + 1;
        if (siguiente < zonas.length) {
          vibrar([120, 60, 120]);
          setI(siguiente);
          return zonas[siguiente].segundos;
        }
        vibrar([200, 80, 200, 80, 300]);
        setFin(true);
        setCorriendo(false);
        if (tick.current) clearInterval(tick.current);
        return 0;
      });
    }, 1000);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [corriendo, restante === null, i, zonas, vibrar]);

  // Mantém a tela acesa durante o ritual (a mão está no rosto, não no celular).
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    const wl = (navigator as unknown as { wakeLock?: { request: (t: string) => Promise<typeof lock> } }).wakeLock;
    if (corriendo && wl) {
      wl.request("screen").then((l) => { lock = l; }).catch(() => {});
    }
    return () => { lock?.release().catch(() => {}); };
  }, [corriendo]);

  if (!listo || !perfil) return <main className="pad" />;

  const empezar = () => {
    setI(0); setFin(false);
    setRestante(zonas[0].segundos);
    setCorriendo(true);
    vibrar(80);
  };

  const reiniciar = () => { parar(); setI(0); setRestante(null); setFin(false); };

  const hechoEnZona = zona && restante !== null ? zona.segundos - restante : 0;
  const pct = zona ? Math.round((hechoEnZona / zona.segundos) * 100) : 0;

  return (
    <>
      <header className="top">
        <Link href="/mi-formula" className="volver">‹ Mi fórmula</Link>
        <h1>Masaje guiado</h1>
        <p>{total} segundos, en el orden de tu foco. Siempre hacia arriba.</p>
      </header>

      <main className="pad stack">
        {fin ? (
          <section className="card centro">
            <div style={{ fontSize: "3rem" }}>✓</div>
            <h2 style={{ marginTop: "0.5rem" }}>Masaje completo</h2>
            <p className="muted" style={{ marginTop: "0.5rem" }}>
              Deja la pasta actuar 15 minutos y retira con agua.
            </p>
            <button className="btn" style={{ marginTop: "1rem" }} onClick={reiniciar}>
              Hacerlo otra vez
            </button>
            <Link href="/" className="btn ghost sm" style={{ marginTop: "0.6rem" }}>
              Volver a mi noche
            </Link>
          </section>
        ) : (
          <section className="card centro">
            <div className="kicker">
              Zona {i + 1} de {zonas.length}
            </div>
            <h2 style={{ marginTop: "0.4rem" }}>{zona?.zona}</h2>

            <div className="crono" aria-live="polite">
              {restante === null ? zonas[0].segundos : restante}
              <span>s</span>
            </div>

            <div className="barra" style={{ marginBottom: "1rem" }}>
              <i style={{ width: `${restante === null ? 0 : pct}%` }} />
            </div>

            <p style={{ minHeight: "3.5rem" }}>{zona?.detalle}</p>

            {!corriendo ? (
              <button className="btn" onClick={empezar}>
                {restante === null ? "▶︎ Empezar los 2 minutos" : "▶︎ Continuar"}
              </button>
            ) : (
              <button className="btn ghost" onClick={parar}>
                ⏸ Pausar
              </button>
            )}

            {restante !== null && !corriendo ? (
              <button className="btn ghost sm" style={{ marginTop: "0.6rem" }} onClick={reiniciar}>
                Reiniciar
              </button>
            ) : null}
          </section>
        )}

        <section className="card">
          <div className="kicker">Tu secuencia</div>
          <div style={{ marginTop: "0.75rem" }}>
            {zonas.map((z, idx) => (
              <div className="paso" key={idx} style={{ opacity: idx === i && !fin ? 1 : 0.5 }}>
                <span className="n">{z.segundos}s</span>
                <span>
                  <b>{z.zona}</b>
                  {z.detalle}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="aviso tip">
          <b>Presión</b>
          Firme para sentir el músculo debajo, suave para no arrastrar la piel. Siempre
          con la pasta aplicada — nunca en seco.
        </div>
      </main>
    </>
  );
}
