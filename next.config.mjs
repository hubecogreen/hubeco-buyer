import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Top-level URL segments that belong to the app itself (src/app folders and
 * public/ folders), read at build/dev start. The middleware skips its product
 * redirect lookup for these, so the list can never go out of date.
 */
function getAppRoutes() {
  const folders = (dir) =>
    fs.existsSync(dir)
      ? fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
      : [];

  const routes = new Set();
  const collect = (dir) => {
    for (const name of folders(dir)) {
      // (group) folders don't add a URL segment; their children are top-level routes
      if (/^\(.+\)$/.test(name)) collect(path.join(dir, name));
      // skip dynamic [slug], private _folders and @parallel slots
      else if (!/^[[_@]/.test(name)) routes.add(name);
    }
  };
  collect(path.join(projectDir, "src", "app"));
  folders(path.join(projectDir, "public")).forEach((name) => routes.add(name));

  return [...routes].sort();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_ROUTES: JSON.stringify(getAppRoutes()),
    // Optional: the API's address as seen from this server (e.g. http://127.0.0.1:3000).
    // Middleware lookups use it to skip the public internet/CDN round trip.
    INTERNAL_API_BASE_URL: process.env.INTERNAL_API_BASE_URL || "",
  },

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
