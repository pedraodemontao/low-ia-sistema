"use client";

import { useEffect, useRef } from "react";

// Partículas douradas subindo (canvas custom, sem dependência). Respeita reduced-motion.
export function Particles({ count = 42, color = "232,200,121" }: { count?: number; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || typeof window === "undefined") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0, h = 0, raf = 0;
    function resize() {
      w = canvas!.clientWidth; h = canvas!.clientHeight;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isMobile = (window.innerWidth || 999) < 640;
    const n = reduce ? 0 : (isMobile ? Math.min(count, 20) : count); // menos partículas no mobile
    const ps = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.6,
      s: Math.random() * 0.4 + 0.12,
      a: Math.random() * 0.5 + 0.2,
    }));

    function frame() {
      if (document.hidden) { raf = requestAnimationFrame(frame); return; } // pausa desenho com aba oculta
      ctx!.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y -= p.s;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        ctx!.globalAlpha = p.a;
        ctx!.fillStyle = `rgba(${color},1)`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    frame();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [count, color]);

  return <canvas ref={ref} className="particles" aria-hidden />;
}
