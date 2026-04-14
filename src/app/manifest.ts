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
        src: "/Admin-2.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/Admin-2.webp",
        sizes: "512x512",
        type: "image/webp",
      },
      {
        src: "/Admin-2.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable",
      },
      {
        src: "/Admin-2.webp",
        sizes: "180x180",
        type: "image/webp",
      },
    ],
  };
}
