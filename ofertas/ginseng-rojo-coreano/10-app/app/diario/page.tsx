"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDiario, type Entrada } from "@/lib/diario";
import { useProgreso } from "@/lib/progreso";

export default function Diario() {
  const { listo, entradas, agregar, borrar } = useDiario();
  const { siguiente } = useProgreso();
  const [nota, setNota] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [guardando, setGuardando] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const guardar = async () => {
    if (!foto && !nota.trim()) return;
    setGuardando(true);
    await agregar({ noche: siguiente, foto: foto ?? undefined, nota: nota.trim() });
    setNota("");
    setFoto(null);
    if (input.current) input.current.value = "";
    setGuardando(false);
  };

  const primera = entradas.find((e) => e.foto);
  const ultima = [...entradas].reverse().find((e) => e.foto);
  const hayComparacion = primera && ultima && primera.id !== ultima.id;

  return (
    <>
      <header className="top">
        <Link href="/" className="volver">‹ Hoy</Link>
        <h1>Mi diario</h1>
        <p>Las fotos se quedan en tu teléfono. No se suben a ningún lado.</p>
      </header>

      <main className="pad stack">
        {hayComparacion ? (
          <section className="card">
            <div className="kicker">Tu cambio</div>
            <h2 style={{ margin: "0.35rem 0 0.75rem" }}>Antes y ahora</h2>
            <div className="comparar">
              <Figura entrada={primera} etiqueta={`Noche ${primera.noche}`} />
              <Figura entrada={ultima} etiqueta={`Noche ${ultima.noche}`} />
            </div>
            <p className="muted" style={{ marginTop: "0.75rem", marginBottom: 0 }}>
              Compara siempre con la misma luz y el mismo ángulo — de perfil, con luz
              natural, sin maquillaje.
            </p>
          </section>
        ) : null}

        <section className="card">
          <div className="kicker">Registro de hoy</div>
          <h2 style={{ margin: "0.35rem 0 0.75rem" }}>Noche {siguiente}</h2>

          <input
            ref={input}
            type="file"
            accept="image/*"
            capture="user"
            className="campo"
            onChange={(e) => setFoto(e.target.files?.[0] ?? null)}
          />
          {foto ? <p className="muted">Foto lista: {foto.name}</p> : null}

          <textarea
            className="campo"
            rows={3}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="¿Cómo sientes tu piel hoy?"
            style={{ marginTop: "0.6rem" }}
          />

          <button className="btn" style={{ marginTop: "0.75rem" }} onClick={guardar} disabled={guardando}>
            {guardando ? "Guardando…" : "Guardar en mi diario"}
          </button>
        </section>

        {!listo ? <p className="muted centro">Cargando tu diario…</p> : null}

        {listo && entradas.length === 0 ? (
          <div className="aviso tip">
            <b>Empieza por la foto del día 1</b>
            Es la que más vale. Dentro de tres semanas vas a querer tenerla — de perfil,
            con luz natural y sin maquillaje.
          </div>
        ) : null}

        {[...entradas].reverse().map((e) => (
          <section className="card" key={e.id}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
              <span className="kicker">Noche {e.noche}</span>
              <span className="muted" style={{ fontSize: "0.82rem" }}>{e.fecha}</span>
              <button
                className="borrar"
                onClick={() => borrar(e.id)}
                aria-label={`Borrar registro de la noche ${e.noche}`}
              >
                ✕
              </button>
            </div>
            {e.foto ? <Figura entrada={e} /> : null}
            {e.nota ? <p style={{ marginTop: "0.75rem", marginBottom: 0 }}>{e.nota}</p> : null}
          </section>
        ))}
      </main>
    </>
  );
}

function Figura({ entrada, etiqueta }: { entrada: Entrada; etiqueta?: string }) {
  const url = useMemo(() => (entrada.foto ? URL.createObjectURL(entrada.foto) : null), [entrada.foto]);
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  if (!url) return null;

  return (
    <figure className="foto">
      {/* Blob local: next/image não agrega aqui e exigiria configurar loader. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={etiqueta ?? `Registro de la noche ${entrada.noche}`} />
      {etiqueta ? <figcaption>{etiqueta}</figcaption> : null}
    </figure>
  );
}
