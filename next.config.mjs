/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
      {
        // Cache static assets for 1 year
        source: "/:all*(.js|.css|.png|.jpg|.jpeg|.webp|.svg|.woff2?)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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

  //   future: {
  //     webpack5: true,
  //   },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // domains: ['assets-dev.hubeco.market']
    // disableStaticImages: true,
    // unoptimized: true,
    domains: ["assets-uat.hubeco.market", "assets.hubeco.market", "uat.hubeco.market"],

    // Optional if your remote CDN hosts images under specific paths
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-uat.hubeco.market",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.hubeco.market",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uat.hubeco.market",
        pathname: "/**",
      },
    ],
    // Add better error handling for images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Increase timeout for image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    // Add fallback for failed images
    loader: 'default',
    loaderFile: undefined,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
