"use client";

import Link from "next/link";
import { CRONOGRAMA } from "@/content/cronograma";
import { useProgreso } from "@/lib/progreso";

export default function Cronograma() {
  const { listo, hechas, porcentaje, siguiente, estaHecha, alternarNoche, reiniciar } = useProgreso();

  return (
    <>
      <header className="top">
        <Link href="/" className="volver">‹ Hoy</Link>
        <h1>Tus 21 noches</h1>
        <p suppressHydrationWarning>
          {listo ? `${hechas} completadas · ${porcentaje}%` : "Cargando…"}
        </p>
      </header>

      <main className="pad stack">
        <div className="barra">
          <i style={{ width: `${listo ? porcentaje : 0}%` }} />
        </div>

        {CRONOGRAMA.map((n) => {
          const hecha = estaHecha(n.numero);
          const esHoy = listo && n.numero === siguiente;
          return (
            <section
              className="card"
              key={n.numero}
              style={esHoy ? { borderColor: "var(--rojo)", borderWidth: 2 } : undefined}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                <span className="kicker">Noche {n.numero}</span>
                {esHoy ? <span className="kicker" style={{ color: "var(--rojo)" }}>· hoy</span> : null}
                {hecha ? <span className="hecho" style={{ marginLeft: "auto" }}>✓</span> : null}
              </div>

              <h2 style={{ marginTop: "0.35rem" }}>{n.titulo}</h2>
              <p style={{ marginTop: "0.5rem" }}>{n.intro}</p>

              <ul className="check" style={{ marginTop: "0.875rem" }}>
                {n.tareas.map((t, i) => (
                  <li key={i}>
                    <label>
                      <input type="checkbox" />
                      <span className="box" aria-hidden="true">✓</span>
                      <span className="lbl">{t}</span>
                    </label>
                  </li>
                ))}
              </ul>

              {n.tip ? (
                <div className="aviso tip" style={{ marginTop: "0.875rem" }}>
                  <b>{n.tip.titulo}</b>
                  {n.tip.texto}
                </div>
              ) : null}

              {n.hito ? (
                <div className="aviso mina" style={{ marginTop: "0.875rem" }}>
                  <b>Marca de la Dra. Mina</b>
                  {n.hito}
                </div>
              ) : null}

              <button
                className={`btn sm ${hecha ? "ghost" : ""}`}
                style={{ marginTop: "1rem" }}
                onClick={() => alternarNoche(n.numero)}
              >
                {hecha ? "✓ Hecha" : "Marcar como hecha"}
              </button>
            </section>
          );
        })}

        <button className="btn ghost sm" onClick={reiniciar}>
          Reiniciar mi progreso
        </button>
      </main>
    </>
  );
}
