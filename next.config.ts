import type { NextConfig } from "next";

const nodeHosting = process.env.HURKIFY_DEPLOY_TARGET === "node";

const nextConfig: NextConfig = {
  // Keep current cPanel compatibility until its Node.js runtime is confirmed.
  // Managed enquiries work in both deployment modes.
  output: nodeHosting ? undefined : "export",
  trailingSlash: true,
  ...(nodeHosting
    ? {
        async redirects() {
          return [
            {
              source: "/:path*",
              has: [
                {
                  type: "host" as const,
                  value: "www\\.hurkifytechologylimited\\.com",
                },
              ],
              destination: "https://hurkifytechologylimited.com/:path*",
              permanent: true,
            },
          ];
        },
      }
    : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: !nodeHosting,
  },
};

export default nextConfig;
