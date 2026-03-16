import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Performance optimizations for Lighthouse 95+
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-accordion', '@radix-ui/react-dialog', 'react-scroll-parallax', 'ogl', 'three', '@react-three/fiber', '@react-three/drei'],
    webpackBuildWorker: true,
    staleTimes: {
      dynamic: 30,   // cache navigations for 30s — reduces repeat-visit latency
      static: 300,
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
  
  // SEO and metadata — keep ETags enabled for proper conditional caching
  generateEtags: true,
  
  // Build optimizations - swcMinify is enabled by default in Next.js 15
  
  // Security headers
  async headers() {
    return [
      // Immutable cache for hashed static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Security headers for all pages
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

};

export default withBundleAnalyzer(nextConfig);
