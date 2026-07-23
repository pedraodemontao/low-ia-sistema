import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Há lockfiles acima desta pasta; sem isso o Next infere a raiz errada.
  outputFileTracingRoot: __dirname,
  headers: async () => [
    {
      // O service worker precisa poder controlar todo o escopo do app.
      source: "/sw.js",
      headers: [
        { key: "Service-Worker-Allowed", value: "/" },
        { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
      ],
    },
  ],
};

export default nextConfig;
