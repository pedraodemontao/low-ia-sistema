"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/pixel";
import { VSL_CFG } from "@/lib/vsl";

// Etapa VSL — player de venda (VTurb/YouTube/file). O CTA é o botão do próprio player (VTurb).
export function VSL({ nome }: { nome: string; onCta?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => { track("ViewContent", { etapa: "vsl" }); }, []);

  // injeta o player do VTurb no <head> (igual o embed oficial do ConverteAI), sem duplicar
  useEffect(() => {
    if (VSL_CFG.tipo !== "vturb" || !VSL_CFG.vturbScript) return;
    if (document.querySelector(`script[src="${VSL_CFG.vturbScript}"]`)) return;
    const s = document.createElement("script");
    s.src = VSL_CFG.vturbScript;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  return (
    <div className="center step immersive">
      <span className="eyebrow">La revelación final de tu fórmula</span>
      <h1>
        {nome ? `${nome}, ` : ""}mira{" "}
        <span className="gold">por qué las coreanas de +50 no se operan</span>.
      </h1>

      {VSL_CFG.tipo === "vturb" ? (
        // VTurb: altura AUTO (sem .vsl-frame) pra não cortar o botão que o player insere abaixo do vídeo
        <div
          ref={ref}
          className="vsl-vturb-wrap"
          dangerouslySetInnerHTML={{ __html: `<vturb-smartplayer id="${VSL_CFG.vturbDivId}" style="display:block;margin:0 auto;width:100%"></vturb-smartplayer>` }}
        />
      ) : (
        <div className="vsl-frame">
          {VSL_CFG.tipo === "file" && VSL_CFG.fileSrc ? (
            <video
              ref={videoRef}
              src={VSL_CFG.fileSrc}
              autoPlay
              playsInline
              controls={false}
              style={{ width: "100%", height: "100%", objectFit: "cover", background: "#08081a" }}
            />
          ) : VSL_CFG.tipo === "youtube" && VSL_CFG.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${VSL_CFG.youtubeId}?autoplay=1&rel=0&playsinline=1`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="VSL"
            />
          ) : (
            <div className="vsl-placeholder">
              🎬 <b>VSL aquí</b>
              <span>pega el embed (VTurb/YouTube) en <code>lib/vsl.ts</code></span>
            </div>
          )}
        </div>
      )}

      <p className="scarcity">⏳ Esta página se cierra en breve.</p>
    </div>
  );
}
