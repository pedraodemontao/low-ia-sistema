import Link from "next/link";
import { RITUAL } from "@/content/ritual";

const ICONOS: Record<string, string> = {
  receta: "🫙",
  variantes: "🎨",
  ingredientes: "🛒",
  masaje: "🖐️",
  "ritual-nocturno": "🌙",
  ciencia: "🌿",
  errores: "⚠️",
  faq: "💬",
  seguridad: "🛡️",
};

export default function Ritual() {
  return (
    <>
      <header className="top">
        <Link href="/" className="volver">‹ Hoy</Link>
        <h1>Tu ritual</h1>
        <p>Todo lo que necesitas saber, a mano.</p>
      </header>

      <main className="pad">
        <ul className="enlaces">
          {RITUAL.map((s) => (
            <li key={s.slug}>
              <Link href={`/ritual/${s.slug}`}>
                <span className="ico" aria-hidden="true">{ICONOS[s.slug] ?? "📖"}</span>
                <span className="txt">
                  <b>{s.titulo}</b>
                  <span>{s.resumen}</span>
                </span>
                <span className="chev" aria-hidden="true">›</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
