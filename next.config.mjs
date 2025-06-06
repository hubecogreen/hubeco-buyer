/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/sitemap.xml',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/xml',
            },
          ],
        },
      ]
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
    disableStaticImages:true,
    unoptimized:true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets-uat.hubeco.market',
        // hostname: 'assets.hubeco.market',
        port: '',
        pathname: '/**',
      },
    ]
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
