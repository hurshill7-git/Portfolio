import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Pin the workspace root (an unrelated lockfile in the home dir otherwise wins).
  turbopack: { root: projectRoot },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
