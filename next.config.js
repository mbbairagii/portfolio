/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

module.exports = nextConfig;
