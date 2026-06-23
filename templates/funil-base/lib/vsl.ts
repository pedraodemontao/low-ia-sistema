// Config da VSL (vídeo entre áudio 2 e checkout).
// Tipos:
//  - "file": mp4 local em /public (fileSrc). É o caso da VSL editada (Remotion).
//  - "youtube": youtubeId = ID do vídeo
//  - "vturb": vturbScript = URL do player.js, vturbDivId = id da div do embed
//  - "placeholder": quadro provisório (sem vídeo)

export type VslTipo = "placeholder" | "youtube" | "vturb" | "file";

export const VSL_CFG: {
  tipo: VslTipo;
  fileSrc: string;
  youtubeId: string;
  vturbScript: string;
  vturbDivId: string;
  ctaDelaySec: number; // segundos de vídeo até liberar o botão (no "file", lido do currentTime real)
} = {
  tipo: "vturb",
  fileSrc: "/video/vsl-final.mp4",
  youtubeId: "",
  vturbScript: "https://scripts.converteai.net/SEU_ACCOUNT_VTURB/players/SEU_PLAYER_VTURB_ID/v4/player.js",
  vturbDivId: "vid-SEU_PLAYER_VTURB_ID",
  ctaDelaySec: 0, // VTurb controla a retenção; botão do funil já liberado. Ajuste se quiser segurar.
};
