// Roteiros dos áudios do funil. TEMPLATE GENÉRICO — escreva no ângulo da SUA oferta.
// Os textos abaixo viram voz IA via tools/gerar-audios.sh (ElevenLabs) → /public/audio/*.mp3.
// Áudio 1 = problema + captura de e-mail. Áudio 2 = ponte/urgência pra VSL.

export const AUDIO1_SRC = "/audio/audio1.mp3";
export const AUDIO2_SRC = "/audio/audio2.mp3";
export const AUDIO1_CAPS = "/audio/audio1.captions.json";
export const AUDIO2_CAPS = "/audio/audio2.captions.json";

// TEMPLATE: roteiro do áudio 1 (problema + por que captar o e-mail). Tom da sua oferta.
export const AUDIO1_TEXTO = [
  "[Abertura: fisgue a atenção e valide que a pessoa chegou aqui por um motivo.]",
  "[Apresente o mecanismo/leitura da sua oferta e o problema central que ela resolve.]",
  "[Crie um loop aberto e peça o e-mail pra continuar a revelação.]",
].join(" ");

// TEMPLATE: roteiro do áudio 2 (ponte curta pra VSL — NÃO entregue a prova/mecanismo aqui).
export const AUDIO2_TEXTO = [
  "[Aviso/urgência: o que você encontrou é sério demais pra entregar por escrito.]",
  "[Diga que gravou a revelação em vídeo e mande assistir até o fim sem pausar.]",
  "[Chamada pra tocar no botão e começar a VSL.]",
].join(" ");
