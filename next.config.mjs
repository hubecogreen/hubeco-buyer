/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for AWS Amplify deployment
  trailingSlash: false,
  poweredByHeader: false,
  // Configure for proper SSR/SSG without static export
  distDir: '.next',
  // Disable static export since we have API routes
  output: undefined,
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "application/xml" }
        ]
      },
      // Next.js static images (optimized)
      {
        source: "/_next/image/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=63072000, immutable" },
          { key: "Access-Control-Allow-Origin", value: "*" }
        ]
      },
      // Next.js build static chunks
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=63072000, immutable" }
        ]
      },
      // Images in /images
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=63072000, immutable" }
        ]
      },
      // All other static assets
      {
        source: "/:path*\\.(ico|jpg|jpeg|png|gif|webp|svg|css|js|woff|woff2|ttf|eot)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      }
    ]
  },
  
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.hubeco.market",
          },
        ],
        destination: "https://hubeco.market/:path*",
        permanent: true,
      },
    ];
  },

  reactStrictMode: false,

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Enhanced image configuration for better caching and optimization
    disableStaticImages: false, // Enable Next.js image optimization
    unoptimized: false, // Enable image optimization
    minimumCacheTTL: 63072000, // 2 years cache TTL
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-uat.hubeco.market",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.hubeco.market",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uat.hubeco.market",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
    domains: [
      'assets-uat.hubeco.market',
      'assets.hubeco.market',
      'uat.hubeco.market',
      'localhost',
    ],
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['react-icons', 'lodash', 'dayjs'],
  },
  
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable compression
  compress: true,
  
  // Optimize font loading
  optimizeFonts: true,
  
  // Configure metadata base URL
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://uat.hubeco.market',
  },
  
  webpack(config, { dev, isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Optimize bundle splitting for better performance
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          reactIcons: {
            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
            name: 'react-icons',
            chunks: 'all',
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
          },
        },
      };
      
      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    return config;
  },
};

export default nextConfig;
