import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  
  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        port: '',
        pathname: '/b/**',
      },
    ],
  },

  // Enable experimental features for Turbopack
  experimental: {
    turbo: {
      // Enable file watching with polling for Docker
      resolveAlias: {
        // Add any path aliases here if needed
      },
    },
  },
  
  // Enable hot reloading in Docker (fallback for webpack if turbopack not used)
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }
    return config;
  },
};

export default nextConfig;
