/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    // Allow better-sqlite3 (native module) to run in server components
    serverComponentsExternalPackages: ['better-sqlite3'],
  },
};

export default nextConfig;
