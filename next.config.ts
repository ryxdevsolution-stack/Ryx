import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations for Lighthouse 95+
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-accordion', '@radix-ui/react-dialog', 'three'],
    webpackBuildWorker: true,
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Dev indicators configuration
  devIndicators: {
    position: 'bottom-right' as const,
  },

  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // 🚨 CRITICAL: Disable ESLint during builds for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Compression and performance
  compress: true,
  poweredByHeader: false,
  
  // SEO and metadata
  generateEtags: false,
  
  // Build optimizations - swcMinify is enabled by default in Next.js 15
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;