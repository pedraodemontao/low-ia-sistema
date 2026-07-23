"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePerfil, type Foco, type TipoPiel } from "@/lib/perfil";

/* Test de piel + bienvenida. Cumpre a promessa da copy ("responde el test y
   recibe TU fórmula") e, de passo, mostra logo o tamanho do que ela comprou —
   os primeiros minutos são os que decidem se ela fica ou pede reembolso. */

type Paso = 0 | 1 | 2 | 3 | 4;

export default function Bienvenida() {
  const router = useRouter();
  const { guardar } = usePerfil();

  const [paso, setPaso] = useState<Paso>(0);
  const [nombre, setNombre] = useState("");
  const [tipoPiel, setTipoPiel] = useState<TipoPiel | null>(null);
  const [foco, setFoco] = useState<Foco | null>(null);
  const [reactiva, setReactiva] = useState<boolean | null>(null);

  const terminar = () => {
    if (!tipoPiel || !foco || reactiva === null) return;
    guardar({ nombre: nombre.trim(), tipoPiel, foco, reactiva });
    router.push("/mi-formula?nueva=1");
  };

  return (
    <>
      <header className="top">
        <div className="marca">Ritual Seúl 50+</div>
        <h1>{paso === 0 ? "Bienvenida a tu ritual" : "Test de piel"}</h1>
        <p>
          {paso === 0
            ? "Un minuto para conocer tu piel — y preparar tu fórmula."
            : `Pregunta ${paso} de 4`}
        </p>
      </header>

      <main className="pad stack">
        {paso > 0 ? (
          <div className="barra" aria-label={`Paso ${paso} de 4`}>
            <i style={{ width: `${(paso / 4) * 100}%` }} />
          </div>
        ) : null}

        {paso === 0 ? (
          <>
            <section className="card">
              <p>
                Soy la <strong>Dra. Mina Seo</strong>. Lo que tienes aquí no es un libro
                para leer: es el ritual que preparo con mis clientas, noche por noche.
              </p>
              <p style={{ marginBottom: 0 }}>
                Antes de empezar necesito conocer tu piel. Son cuatro preguntas y con
                ellas armo <strong>tu fórmula</strong> — no la general, la tuya.
              </p>
            </section>

            <section className="card">
              <div className="kicker">Lo que ya es tuyo</div>
              <ul className="stack-sm" style={{ listStyle: "none", marginTop: "0.75rem" }}>
                <li>🫙 <strong>Tu fórmula personalizada</strong> del Pegamento Rojo</li>
                <li>🌙 <strong>21 noches</strong> guiadas, una por una</li>
                <li>🖐️ <strong>El masaje coreano</strong> de 3 dedos, con temporizador</li>
                <li>📖 <strong>9 secciones</strong>: ingredientes, técnica, errores, preguntas</li>
                <li>🎁 <strong>3 bonos</strong>: Piel de Cristal, Anti-Papada y Sueño de Seúl</li>
                <li>📸 <strong>Tu diario</strong> con fotos, para ver el cambio</li>
              </ul>
            </section>

            <button className="btn" onClick={() => setPaso(1)}>
              Empezar mi test
            </button>
          </>
        ) : null}

        {paso === 1 ? (
          <>
            <section className="card">
              <h2>¿Cómo te llamo?</h2>
              <p className="muted">Solo para que el ritual sea tuyo. No sale de este teléfono.</p>
              <input
                className="campo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                autoComplete="given-name"
                enterKeyHint="next"
              />
            </section>
            <button className="btn" onClick={() => setPaso(2)}>Continuar</button>
          </>
        ) : null}

        {paso === 2 ? (
          <>
            <section className="card">
              <h2>¿Cómo amanece tu piel?</h2>
              <p className="muted">
                Piensa en cómo la sientes al despertar, antes de lavarte la cara.
              </p>
              <Opciones
                valor={tipoPiel}
                onElegir={(v) => { setTipoPiel(v); setPaso(3); }}
                items={[
                  { v: "seca" as TipoPiel, t: "Tirante o áspera", d: "Se siente seca, a veces con descamación" },
                  { v: "mixta" as TipoPiel, t: "Brillante en la frente y nariz", d: "Mejillas normales o secas" },
                  { v: "sensible" as TipoPiel, t: "Se enrojece fácil", d: "Pica o arde con productos nuevos" },
                ]}
              />
            </section>
          </>
        ) : null}

        {paso === 3 ? (
          <section className="card">
            <h2>¿Qué te molesta más al verte?</h2>
            <p className="muted">Elige lo que más te pesa hoy. El ritual se ordena por eso.</p>
            <Opciones
              valor={foco}
              onElegir={(v) => { setFoco(v); setPaso(4); }}
              items={[
                { v: "cuello" as Foco, t: "El cuello y la papada", d: "La piel que cede bajo el mentón" },
                { v: "arrugas" as Foco, t: "Los surcos y arrugas", d: "Las líneas junto a la boca y los ojos" },
                { v: "manchas" as Foco, t: "Las manchas y el tono", d: "Piel despareja, zonas más oscuras" },
              ]}
            />
          </section>
        ) : null}

        {paso === 4 ? (
          <section className="card">
            <h2>Una última, importante</h2>
            <p className="muted">
              ¿Tu piel ha reaccionado mal a algún cosmético — ardor, ronchas, picazón?
            </p>
            <Opciones
              valor={reactiva}
              onElegir={(v) => { setReactiva(v); }}
              items={[
                { v: true, t: "Sí, me ha pasado", d: "Prepararé tu fórmula sin clara de huevo" },
                { v: false, t: "No, tolero bien", d: "Fórmula completa, con prueba de parche igual" },
              ]}
            />
            {reactiva !== null ? (
              <button className="btn" style={{ marginTop: "1rem" }} onClick={terminar}>
                Ver mi fórmula ✨
              </button>
            ) : null}
          </section>
        ) : null}

        {paso > 1 && paso < 4 ? (
          <button className="btn ghost sm" onClick={() => setPaso((paso - 1) as Paso)}>
            ‹ Volver
          </button>
        ) : null}
      </main>
    </>
  );
}

function Opciones<T extends string | boolean>({
  items,
  valor,
  onElegir,
}: {
  items: { v: T; t: string; d: string }[];
  valor: T | null;
  onElegir: (v: T) => void;
}) {
  return (
    <div className="opciones">
      {items.map((o) => (
        <button
          key={String(o.v)}
          className={`opcion ${valor === o.v ? "activa" : ""}`}
          onClick={() => onElegir(o.v)}
        >
          <b>{o.t}</b>
          <span>{o.d}</span>
        </button>
      ))}
    </div>
  );
}
