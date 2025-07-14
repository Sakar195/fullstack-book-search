import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        port: "",
        pathname: "/b/**",
      },
    ],
    // Add explicit formats and sizes
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Add this to help with URL encoding issues
    unoptimized: false,
    // Add domains as fallback
    domains: ["covers.openlibrary.org"],
  },
  // Ensure proper URL handling
  trailingSlash: false,
  poweredByHeader: false,
  // Add experimental features that might help
  experimental: {
    optimizePackageImports: ["next"],
  },
};

export default nextConfig;
