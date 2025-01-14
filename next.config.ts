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
    serverActions: true,
  },
  // Add explicit middleware configuration
  middleware: {
    // Ensure middleware only runs on matching paths
    matcher: [
      '/',
      '/login',
      '/register',
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }
};

export default nextConfig;