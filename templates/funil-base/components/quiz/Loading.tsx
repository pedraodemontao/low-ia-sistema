"use client";

import { useEffect, useState } from "react";
import { tom } from "@/lib/feedback";

// Loading multi-estágio com checkmarks + suspense (barra para ~90% e destrava).
export function Loading({ msgs, onDone }: { msgs: string[]; onDone: () => void }) {
  const [etapa, setEtapa] = useState(0);
  const [prog, setProg] = useState(0);
  const [destravando, setDestravando] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    msgs.forEach((_, i) => {
      timers.push(setTimeout(() => setEtapa(i + 1), 750 * (i + 1)));
    });
    timers.push(setTimeout(() => setProg(90), 120));
    const tParada = 750 * msgs.length + 450;
    timers.push(setTimeout(() => setDestravando(true), tParada));
    timers.push(setTimeout(() => {
      setProg(100);
      try { tom(990, 0.22); } catch { /* sem audio */ }
    }, tParada + 500));
    timers.push(setTimeout(() => onDone(), tParada + 1150));
    return () => timers.forEach(clearTimeout);
  }, [msgs, onDone]);

  return (
    <div className="loading-box">
      <h2 className="gold" style={{ marginBottom: 18 }}>
        {destravando ? "Quase lá…" : "Revelando o seu resultado…"}
      </h2>
      <ul className="loading-steps">
        {msgs.map((m, i) => (
          <li key={m} className={i < etapa ? "done" : i === etapa ? "active" : ""}>
            <span className="ck">{i < etapa ? "✓" : "•"}</span> {m}
          </li>
        ))}
      </ul>
      <div className="progress" style={{ maxWidth: 320, margin: "18px auto 0" }}>
        <i style={{ width: `${prog}%`, transition: "width 1.6s cubic-bezier(.2,.8,.2,1)" }} />
      </div>
      {destravando && <p className="muted" style={{ marginTop: 10 }}>✨ a chave foi encontrada…</p>}
    </div>
  );
}
