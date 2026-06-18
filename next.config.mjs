

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Service worker must never be cached by the browser or a CDN.
        // A stale cached sw.js means users keep running the old (buggy)
        // worker even after a new version is deployed — updates simply
        // never arrive. no-cache forces a byte-check on every navigation.
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
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
  
  // Disable automatic preloading to prevent unused resource warnings
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  
  // Optimize resource loading
  compress: true,
  optimizeFonts: true,
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // domains: ['assets-dev.hubeco.market']
    disableStaticImages: true,
    unoptimized: true,
    remotePatterns: [
     
      {
        protocol: "https",
        hostname: "assets.hubeco.market",
        port: "",
        pathname: "/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "assets-uat.hubeco.market",
      //   port: "",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "assets-dev.hubeco.market",
      //   port: "",
      //   pathname: "/**",
      // },
    ],
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
