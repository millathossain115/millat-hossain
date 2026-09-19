import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'react-icons',
      'react-icons/si',
      'react-icons/fa',
      'react-icons/fi',
    ],
  },
};

export default nextConfig;
