import Link from "next/link";
import { notFound } from "next/navigation";
import Bloques from "@/components/Bloques";
import { RITUAL } from "@/content/ritual";

export function generateStaticParams() {
  return RITUAL.map((s) => ({ slug: s.slug }));
}

export default async function SeccionRitual({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seccion = RITUAL.find((s) => s.slug === slug);
  if (!seccion) notFound();

  return (
    <>
      <header className="top">
        <Link href="/ritual" className="volver">‹ Ritual</Link>
        <h1>{seccion.titulo}</h1>
        <p>{seccion.resumen}</p>
      </header>

      <main className="pad">
        <Bloques bloques={seccion.bloques} />
      </main>
    </>
  );
}
