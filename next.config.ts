import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // This is the key change
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: true, // Required for static export with next/image
  },
};

export default nextConfig;