import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove standalone output for local development
  // output: "standalone",

  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        port: "",
        pathname: "/b/**",
      },
    ],
  },
};

export default nextConfig;
