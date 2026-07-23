export const metadata = { title: "Sin conexión — Ritual Seúl 50+" };

export default function Offline() {
  return (
    <>
      <header className="top">
        <div className="marca">Ritual Seúl 50+</div>
        <h1>Estás sin conexión</h1>
        <p>Esta parte todavía no se guardó en tu teléfono.</p>
      </header>

      <main className="pad">
        <div className="card">
          <p>
            Las secciones que ya abriste siguen disponibles sin internet. Vuelve a
            intentarlo cuando tengas señal y quedará guardada también.
          </p>
        </div>
      </main>
    </>
  );
}
