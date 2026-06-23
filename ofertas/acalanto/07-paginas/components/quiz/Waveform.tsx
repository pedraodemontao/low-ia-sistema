"use client";

// Waveform CSS-animada (headless-safe). Barras "dançam" quando ativo.
export function Waveform({ ativo, barras = 16 }: { ativo: boolean; barras?: number }) {
  return (
    <div className={`waveform${ativo ? " on" : ""}`} aria-hidden>
      {Array.from({ length: barras }, (_, i) => (
        <span key={i} style={{ animationDelay: `${(i % 6) * 0.09}s` }} />
      ))}
    </div>
  );
}
