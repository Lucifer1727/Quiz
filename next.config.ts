import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Only run ESLint on development builds
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
