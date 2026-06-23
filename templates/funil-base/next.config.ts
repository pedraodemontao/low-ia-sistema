import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    optimizePackageImports: ["framer-motion"], // tree-shake framer no bundle
  },
};

export default nextConfig;
