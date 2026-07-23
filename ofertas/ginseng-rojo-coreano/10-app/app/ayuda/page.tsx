import Link from "next/link";
import { GARANTIA_DIAS, NOMBRE_EN_FACTURA, SOPORTE_EMAIL } from "@/lib/config";

export const metadata = { title: "Ayuda — Ritual Seúl 50+" };

/* Página de ajuda. Existe por um motivo comercial claro: cliente travada e sem
   canal abre disputa no cartão. Aqui ela encontra contato, o passo a passo do
   reembolso e quem está do outro lado. */

export default function Ayuda() {
  return (
    <>
      <header className="top">
        <Link href="/" className="volver">‹ Hoy</Link>
        <h1>Ayuda</h1>
        <p>Estamos de este lado. Escríbenos antes de darte por vencida.</p>
      </header>

      <main className="pad stack">
        <section className="card">
          <div className="kicker">Contacto directo</div>
          <h2 style={{ margin: "0.35rem 0 0.75rem" }}>¿Algo no funciona?</h2>
          <p>
            Respondemos en menos de 24 horas, de lunes a sábado. Cuéntanos qué pasó y
            desde qué teléfono entras — con eso lo resolvemos rápido.
          </p>
          <a className="btn" href={`mailto:${SOPORTE_EMAIL}?subject=Ayuda%20-%20Ritual%20Se%C3%BAl%2050%2B`}>
            ✉️ Escribir a soporte
          </a>
          <p className="muted centro" style={{ marginTop: "0.6rem", marginBottom: 0 }}>
            {SOPORTE_EMAIL}
          </p>
        </section>

        <section className="card">
          <div className="kicker">Tu garantía</div>
          <h2 style={{ margin: "0.35rem 0 0.75rem" }}>{GARANTIA_DIAS} días, sin explicaciones</h2>
          <p>
            Si el ritual no es para ti, te devolvemos el 100%. No tienes que justificar
            nada ni discutir con nadie.
          </p>
          <p style={{ marginBottom: 0 }}>
            El reembolso se pide en la misma plataforma donde compraste (Hotmart), desde
            el correo de compra: abre el e-mail de tu compra y toca{" "}
            <strong>&ldquo;Solicitar reembolso&rdquo;</strong>. Si no lo encuentras,
            escríbenos y lo hacemos por ti.
          </p>
        </section>

        <section className="card">
          <div className="kicker">Preguntas de acceso</div>
          <h2 style={{ margin: "0.35rem 0 0.75rem" }}>Lo que más nos preguntan</h2>

          <div className="stack">
            <div>
              <h3>No reconozco un cargo en mi tarjeta</h3>
              <p>
                Tu compra aparece como <strong>{NOMBRE_EN_FACTURA}</strong> en el estado
                de cuenta, no como &ldquo;Ritual Seúl&rdquo;. Es la plataforma que procesa
                el pago. Si tienes dudas, escríbenos antes de reportarlo al banco: lo
                aclaramos en el día.
              </p>
            </div>

            <div>
              <h3>Perdí el enlace de la app</h3>
              <p>
                Está en el correo de tu compra y en la página que viste después de pagar.
                Si no lo encuentras, escríbenos y te lo reenviamos.
              </p>
            </div>

            <div>
              <h3>¿Cómo la dejo en mi pantalla de inicio?</h3>
              <p>
                En Android, el propio teléfono te ofrece instalarla. En iPhone: toca{" "}
                <strong>Compartir</strong> y luego <strong>Añadir a pantalla de inicio</strong>.
                Así la abres como cualquier app, incluso sin internet.
              </p>
            </div>

            <div>
              <h3>Cambié de teléfono y perdí mi progreso</h3>
              <p>
                Tu progreso y tus fotos se guardan en el teléfono, no en internet — es lo
                que permite que la app funcione sin conexión y que tus fotos no salgan de
                tus manos. Al cambiar de equipo se empieza de nuevo; el contenido completo
                sigue disponible igual.
              </p>
            </div>

            <div>
              <h3>La app no carga o se ve en blanco</h3>
              <p>
                Cierra y vuelve a abrirla con internet una vez: se actualiza sola. Si
                sigue igual, escríbenos diciendo qué teléfono usas.
              </p>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="kicker">Quién está detrás</div>
          <h2 style={{ margin: "0.35rem 0 0.75rem" }}>Dra. Mina Seo</h2>
          <p>
            Esteticista formada en Seúl, casi treinta años trabajando con pieles maduras.
            La receta del Pegamento Rojo viene de la libreta de su abuela, Seo Jung-hee, y
            está adaptada a los ingredientes y al clima de América Latina.
          </p>
          <p style={{ marginBottom: 0 }} className="muted">
            Esta guía es educativa y cosmética. No diagnostica, no trata ninguna condición
            y no reemplaza el consejo de tu médico o dermatólogo.
          </p>
        </section>
      </main>
    </>
  );
}
