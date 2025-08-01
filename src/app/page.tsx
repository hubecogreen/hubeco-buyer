import HomePage from "@/components/home/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Eco-Friendly, Low-Carbon Building Materials India Online",
  description:
    "Discover eco-friendly, low‑carbon building materials online in India. Shop sustainable supplies on Hubeco Marketplace and build smarter, greener projects today.",
  keywords:
    "Green building materials, sustainable building materials, green construction materials, construction materials, sustainable materials, marketplace for green building materials, online shopping for building materials, online shopping for green building materials, online shopping for sustainable building materials, eco-friendly construction, green building materials, sustainable construction, buy eco materials, B2B construction marketplace, green construction solutions, carbon-neutral materials, environmentally friendly building supplies. bio-digesters, waste management solutions, eco-friendly sanitation, sustainable water treatment, green sewage systems, organic waste recycling, sustainable wastewater management, recycled construction materials. energy-efficient building materials, thermal insulation, solar roofing, smart glass, eco-friendly insulation, cool roof technology, sustainable energy solutions, passive cooling materials. low-carbon cement, green concrete, sustainable construction materials, eco-friendly cement, carbon-neutral concrete, geopolymer concrete, high-performance sustainable cement. sustainable wood, bamboo building materials, reclaimed wood, engineered wood, eco-friendly timber, FSC-certified wood, sustainable forestry materials, wooden green building solutions. recycled building materials, upcycled construction materials, plastic bricks, reclaimed metal, crushed glass aggregates, sustainable raw materials, green building waste solutions",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "TZB2HDrat5f3I40A452lngPPjOvK8aaeLE-TtkdOhks",
  },
  openGraph: {
    title: "Buy Eco-Friendly, Low-Carbon Building Materials India Online",
    description:
    "Discover eco-friendly, low‑carbon building materials online in India. Shop sustainable supplies on Hubeco Marketplace and build smarter, greener projects today.",
    siteName: "Hubeco",
    images: [
      {
        url: "/images/Admin-2.webp",
        alt: "Hubeco Logo",
      },
    ],
  },
};

export default function MyApp() {
  return (
    <div className="bg-white ">
      <HomePage />
    </div>
  );
}
