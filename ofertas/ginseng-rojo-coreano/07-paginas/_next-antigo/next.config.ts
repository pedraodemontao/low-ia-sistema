import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    optimizePackageImports: ["framer-motion"], // tree-shake framer no bundle
  },
  // Rotas antigas da esteira → estrutura FINAL (05-diferenciacao.md).
  // Query string (resultado/nome/utm) é preservada automaticamente.
  async redirects() {
    return [
      { source: "/upsell", destination: "/upsell-1", permanent: false },
      { source: "/downsell", destination: "/downsell-1", permanent: false },
      { source: "/obrigado", destination: "/gracias", permanent: false },
    ];
  },
};

export default nextConfig;
