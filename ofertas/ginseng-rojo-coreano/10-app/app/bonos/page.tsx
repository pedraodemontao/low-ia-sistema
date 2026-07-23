import Link from "next/link";
import { BONOS } from "@/content/bonos";

export default function Bonos() {
  return (
    <>
      <header className="top">
        <div className="marca">Ritual Seúl 50+</div>
        <h1>Tus bonos</h1>
        <p>Tres guías extra que vienen con tu ritual.</p>
      </header>

      <main className="pad">
        <ul className="enlaces">
          {BONOS.map((b) => (
            <li key={b.slug}>
              <Link href={`/bonos/${b.slug}`}>
                <span className="ico" aria-hidden="true">{b.emoji}</span>
                <span className="txt">
                  <b>{b.titulo}</b>
                  <span>{b.subtitulo}</span>
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
