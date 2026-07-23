"use client";

import type { StepConfig } from "@/lib/quiz-data";
import { Tile } from "./Tile";

// Renderiza um passo do quiz (grade de tiles OU input de nome), data-driven.
// Estado mora no Funil; este componente é presentational.
export type PassoProps = {
  config: StepConfig;
  value: string | number;
  onSelect: (v: string | number) => void;
  // input (passo nome)
  nome?: string;
  onNome?: (v: string) => void;
  onSubmit?: () => void;
};

export function Passo({ config, value, onSelect, nome, onNome, onSubmit }: PassoProps) {
  return (
    <div className="step">
      <div className="center"><h2>{config.titulo}</h2></div>

      {config.tipo === "input" ? (
        <>
          {config.subtitulo && (
            <p className="muted center" style={{ marginBottom: 8 }}>{config.subtitulo}</p>
          )}
          <input
            type="text"
            placeholder={config.placeholder}
            value={nome ?? ""}
            autoFocus
            onChange={(e) => onNome?.(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
          />
          <div style={{ height: 12 }} />
          <button className="btn" onClick={() => onSubmit?.()}>
            {config.ctaLabel}
          </button>
        </>
      ) : (
        <div className={`tiles cols-${config.cols}`}>
          {config.opcoes?.map((o) => (
            <Tile
              key={o.label}
              icon={o.icon}
              label={o.label}
              big={config.big}
              selected={value === o.value}
              onClick={() => onSelect(o.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
