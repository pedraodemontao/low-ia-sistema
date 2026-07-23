"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { construirFormula, etiquetaFoco, etiquetaTipo } from "@/lib/formula";
import { usePerfil } from "@/lib/perfil";

export default function MiFormulaPage() {
  return (
    <Suspense fallback={<main className="pad" />}>
      <MiFormula />
    </Suspense>
  );
}

function MiFormula() {
  const router = useRouter();
  const params = useSearchParams();
  const esNueva = params.get("nueva") === "1";
  const { listo, perfil } = usePerfil();

  useEffect(() => {
    if (listo && !perfil) router.replace("/bienvenida");
  }, [listo, perfil, router]);

  if (!listo || !perfil) return <main className="pad" />;

  const f = construirFormula(perfil);
  const nombre = perfil.nombre || "amiga";

  return (
    <>
      <header className="top">
        <Link href="/" className="volver">‹ Hoy</Link>
        <div className="marca" style={{ marginTop: "0.5rem" }}>Tu fórmula</div>
        <h1>{f.nombre}</h1>
        <p>
          Para {nombre}: {etiquetaTipo(perfil.reactiva ? "sensible" : perfil.tipoPiel)}, foco en{" "}
          {etiquetaFoco(perfil.foco)}.
        </p>
      </header>

      <main className="pad stack">
        {esNueva ? (
          <div className="aviso mina">
            <b>De la Dra. Mina</b>
            {nombre}, esta es tu fórmula. No es la general del libro: cambié las
            proporciones por lo que me contaste. Empieza esta noche.
          </div>
        ) : null}

        <section className="card">
          <p style={{ marginBottom: 0 }}>{f.porQue}</p>
        </section>

        <div className="receta">
          <h4>Tu pasta · una aplicación</h4>
          <table>
            <tbody>
              {f.ingredientes.map((ing, i) => (
                <tr key={i}>
                  <td>
                    {ing.item}
                    {ing.nota ? <em className="ing-nota">{ing.nota}</em> : null}
                  </td>
                  <td>{ing.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="card">
          <div className="kicker">Tus ajustes</div>
          <ul style={{ paddingLeft: "1.2rem", marginTop: "0.75rem" }}>
            {f.ajustes.map((a, i) => (
              <li key={i} style={{ marginBottom: "0.5rem" }}>{a}</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <div className="kicker">Tu orden de masaje</div>
          <h2 style={{ margin: "0.35rem 0 0.75rem" }}>Ordenado por tu foco</h2>
          <p className="muted">
            Los mismos 2 minutos, pero con más tiempo donde a ti te importa.
          </p>
          <div style={{ marginTop: "1rem" }}>
            {f.masaje.map((z, i) => (
              <div className="paso" key={i}>
                <span className="n">{z.segundos}s</span>
                <span>
                  <b>{z.zona}</b>
                  {z.detalle}
                </span>
              </div>
            ))}
          </div>
          <Link href="/temporizador" className="btn" style={{ marginTop: "1.25rem" }}>
            ▶︎ Hacer el masaje guiado
          </Link>
        </section>

        <div className="aviso tip">
          <b>Qué mirar primero</b>
          {f.senalTemprana}
        </div>

        <div className="aviso alerta">
          <b>Antes de la primera noche</b>
          Prueba de parche: una pequeña cantidad detrás de la oreja, 24 horas. Si hay
          ardor, ronchas o picazón, no uses la receta.
        </div>

        <Link href="/bienvenida" className="btn ghost sm">
          Rehacer mi test de piel
        </Link>
      </main>
    </>
  );
}
