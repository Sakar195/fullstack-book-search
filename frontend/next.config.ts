import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

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
