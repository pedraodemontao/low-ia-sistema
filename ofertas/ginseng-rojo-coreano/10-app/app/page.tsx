"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CRONOGRAMA } from "@/content/cronograma";
import { construirFormula } from "@/lib/formula";
import { usePerfil } from "@/lib/perfil";
import { useProgreso } from "@/lib/progreso";

export default function Hoy() {
  const router = useRouter();
  const { listo: perfilListo, perfil } = usePerfil();
  const { listo, hechas, siguiente, completo, porcentaje, racha, estaHecha, alternarNoche } =
    useProgreso();

  // Primeira vez: o test de piel vem antes de tudo — é o que a copy prometeu.
  useEffect(() => {
    if (perfilListo && !perfil) router.replace("/bienvenida");
  }, [perfilListo, perfil, router]);

  if (!perfilListo || !perfil) return <main className="pad" />;

  const noche = CRONOGRAMA.find((n) => n.numero === siguiente) ?? CRONOGRAMA[0];
  const hecha = estaHecha(noche.numero);
  const formula = construirFormula(perfil);
  const nombre = perfil.nombre || "amiga";

  return (
    <>
      <header className="top">
        <div className="marca">Ritual Seúl 50+</div>
        <h1>
          {completo ? `Lo lograste, ${nombre}` : `Tu noche ${noche.numero}, ${nombre}`}
        </h1>
        <p>
          {completo
            ? "Completaste las 21 noches. Sigue con el ritual las veces que quieras."
            : "Dos minutos. Siempre hacia arriba."}
        </p>
      </header>

      <main className="pad stack">
        <section className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div>
              <div className="kicker">Noche</div>
              <div className="progreso-num" suppressHydrationWarning>
                {listo ? noche.numero : "—"}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p className="muted" style={{ marginBottom: "0.4rem" }} suppressHydrationWarning>
                {listo ? `${hechas} de 21 completadas` : "Cargando…"}
                {listo && racha > 1 ? <span className="racha"> 🔥 {racha} seguidas</span> : null}
              </p>
              <div className="barra">
                <i style={{ width: `${listo ? porcentaje : 0}%` }} />
              </div>
            </div>
          </div>

          <div className="sep" />

          <h2>{noche.titulo}</h2>
          <p style={{ marginTop: "0.5rem" }}>{noche.intro}</p>

          <ul className="check" style={{ marginTop: "1rem" }}>
            {noche.tareas.map((t, i) => (
              <li key={i}>
                <label>
                  <input type="checkbox" />
                  <span className="box" aria-hidden="true">✓</span>
                  <span className="lbl">{t}</span>
                </label>
              </li>
            ))}
          </ul>

          {noche.tip ? (
            <div className="aviso tip" style={{ marginTop: "1rem" }}>
              <b>{noche.tip.titulo}</b>
              {noche.tip.texto}
            </div>
          ) : null}

          <button
            className={`btn ${hecha ? "ghost" : ""}`}
            style={{ marginTop: "1.25rem" }}
            onClick={() => alternarNoche(noche.numero)}
          >
            {hecha ? "✓ Noche completada" : "Marcar esta noche como hecha"}
          </button>
        </section>

        <Link href="/temporizador" className="btn">
          ▶︎ Hacer el masaje guiado · 2 min
        </Link>

        <ul className="enlaces">
          <li>
            <Link href="/mi-formula">
              <span className="ico" aria-hidden="true">🫙</span>
              <span className="txt">
                <b>Mi fórmula</b>
                <span>{formula.nombre.replace("Pegamento Rojo · ", "")}</span>
              </span>
              <span className="chev" aria-hidden="true">›</span>
            </Link>
          </li>
          <li>
            <Link href="/diario">
              <span className="ico" aria-hidden="true">📸</span>
              <span className="txt">
                <b>Mi diario</b>
                <span>Tu antes y después, en tu teléfono</span>
              </span>
              <span className="chev" aria-hidden="true">›</span>
            </Link>
          </li>
          <li>
            <Link href="/cronograma">
              <span className="ico" aria-hidden="true">🌙</span>
              <span className="txt">
                <b>Las 21 noches</b>
                <span>Tu cronograma completo</span>
              </span>
              <span className="chev" aria-hidden="true">›</span>
            </Link>
          </li>
          <li>
            <Link href="/ayuda">
              <span className="ico" aria-hidden="true">💬</span>
              <span className="txt">
                <b>Ayuda</b>
                <span>Escríbenos — respondemos en 24 h</span>
              </span>
              <span className="chev" aria-hidden="true">›</span>
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
