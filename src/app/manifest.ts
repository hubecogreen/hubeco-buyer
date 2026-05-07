import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hubeco Marketplace",
    short_name: "Hubeco",
    description:
      "Shop eco-friendly, low-carbon building materials and manage sustainable procurement on Hubeco.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFFEF8",
    theme_color: "#109989",
    categories: ["business", "shopping", "productivity"],
    lang: "en-IN",
    icons: [
      {
        src: "/images/app-logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/app-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/app-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/app-logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
