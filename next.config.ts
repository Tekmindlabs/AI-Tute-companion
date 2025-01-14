import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000']
    },
  }
  // Remove the runtime configuration from here
};

export default nextConfig;