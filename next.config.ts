import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.glb": {
        type: "asset",
      },
    },
  },
};

export default nextConfig;
