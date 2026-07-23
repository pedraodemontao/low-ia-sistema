import type { Bloque } from "@/lib/types";

/* Renderiza os blocos de conteúdo vindos de content/. É o único lugar que
   conhece a forma visual de cada tipo — o conteúdo em si fica agnóstico. */

export default function Bloques({ bloques }: { bloques: Bloque[] }) {
  return (
    <div className="stack">
      {bloques.map((b, i) => (
        <Uno key={i} b={b} />
      ))}
    </div>
  );
}

function Uno({ b }: { b: Bloque }) {
  switch (b.tipo) {
    case "titulo":
      return <h3>{b.texto}</h3>;

    case "parrafo":
      return <p>{b.texto}</p>;

    case "lista":
      return (
        <ul style={{ paddingLeft: "1.2rem" }}>
          {b.items.map((t, i) => (
            <li key={i} style={{ marginBottom: "0.4rem" }}>
              {t}
            </li>
          ))}
        </ul>
      );

    case "pasos":
      return (
        <div>
          {b.items.map((p, i) => (
            <div className="paso" key={i}>
              <span className="n">{i + 1}</span>
              <span>
                <b>{p.titulo}</b>
                {p.texto}
              </span>
            </div>
          ))}
        </div>
      );

    case "receta":
      return (
        <div className="receta">
          <h4>{b.nombre}</h4>
          <table>
            <tbody>
              {b.ingredientes.map((ing, i) => (
                <tr key={i}>
                  <td>{ing.item}</td>
                  <td>{ing.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {b.nota ? (
            <p className="muted" style={{ marginTop: "0.75rem", marginBottom: 0 }}>
              {b.nota}
            </p>
          ) : null}
        </div>
      );

    case "aviso":
      return (
        <div className={`aviso ${b.variante}`}>
          <b>{b.titulo}</b>
          {b.texto}
        </div>
      );

    case "diagrama":
      return (
        <div className="diagrama">
          <div dangerouslySetInnerHTML={{ __html: b.svg }} />
          <div className="leyenda">{b.leyenda}</div>
        </div>
      );

    case "checklist":
      return (
        <ul className="check">
          {b.items.map((t, i) => (
            <li key={i}>
              <label>
                <input type="checkbox" />
                <span className="box" aria-hidden="true">✓</span>
                <span className="lbl">{t}</span>
              </label>
            </li>
          ))}
        </ul>
      );
  }
}
