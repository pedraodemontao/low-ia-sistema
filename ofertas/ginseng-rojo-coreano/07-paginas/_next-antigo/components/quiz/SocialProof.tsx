"use client";

import { useEffect, useState } from "react";
import { PROVAS } from "@/lib/social-proof";

// Toast de prova social ao vivo — aparece/some em ciclo.
export function SocialProof() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let idx = 0;
    let hideT: ReturnType<typeof setTimeout>;
    const tick = () => {
      setI(idx % PROVAS.length);
      idx++;
      setShow(true);
      hideT = setTimeout(() => setShow(false), 3800);
    };
    const start = setTimeout(tick, 1800);
    const loop = setInterval(tick, 6000);
    return () => { clearTimeout(start); clearInterval(loop); clearTimeout(hideT); };
  }, []);

  const p = PROVAS[i];
  return (
    <div className={`social-toast${show ? " show" : ""}`} aria-live="polite">
      🔓 <b>{p.nome}</b> de {p.cidade} acaba de desbloquear su fórmula
    </div>
  );
}
