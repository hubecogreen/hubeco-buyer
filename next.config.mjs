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
        source: "/:all*(ico|jpg|jpeg|png|gif|webp|svg|css|js|woff|woff2|ttf|eot)",
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
    disableStaticImages: true,
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-uat.hubeco.market",
        // hostname: 'assets.hubeco.market',
        port: "",
        pathname: "/**",
      },
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
