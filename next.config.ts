import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 95 keeps small UI text in project screenshots sharp; Next 16 only allows 75 by default.
    qualities: [75, 95],
  },
  turbopack: {
    // Pin the root so a stray lockfile higher up the tree isn't picked up.
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
