import Link from "next/link";
import { notFound } from "next/navigation";
import Bloques from "@/components/Bloques";
import { BONOS } from "@/content/bonos";

export function generateStaticParams() {
  return BONOS.map((b) => ({ slug: b.slug }));
}

export default async function Bono({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bono = BONOS.find((b) => b.slug === slug);
  if (!bono) notFound();

  return (
    <>
      <header className="top">
        <Link href="/bonos" className="volver">‹ Bonos</Link>
        <h1>
          {bono.emoji} {bono.titulo}
        </h1>
        <p>{bono.subtitulo}</p>
      </header>

      <main className="pad stack">
        {bono.secciones.map((s) => (
          <section className="card" key={s.slug}>
            <div className="kicker">{s.resumen}</div>
            <h2 style={{ margin: "0.35rem 0 1rem" }}>{s.titulo}</h2>
            <Bloques bloques={s.bloques} />
          </section>
        ))}
      </main>
    </>
  );
}
