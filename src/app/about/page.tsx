import AboutPage from "@/components/about/AboutPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Hubeco",
  description:
    "Our mission is to empower builders,architects and homeowners to make sustainable choices that positively impact our planet. We believe that every construction project, whether big or small, should prioritize eco-friendliness and energy efficiency without compromising on quality or affordability.The building and construction sector accounts for 40% of global carbon emissions, and we aim to change that at hubeco!!",
  keywords:
    "Green building materials, sustainable building materials, green construction materials, construction materials, sustainable materials, marketplace for green building materials, online shopping for building materials, online shopping for green building materials, online shopping for sustainable building materials, eco-friendly construction, green building materials, sustainable construction, buy eco materials, B2B construction marketplace, green construction solutions, carbon-neutral materials, environmentally friendly building supplies. bio-digesters, waste management solutions, eco-friendly sanitation, sustainable water treatment, green sewage systems, organic waste recycling, sustainable wastewater management, recycled construction materials. energy-efficient building materials, thermal insulation, solar roofing, smart glass, eco-friendly insulation, cool roof technology, sustainable energy solutions, passive cooling materials. low-carbon cement, green concrete, sustainable construction materials, eco-friendly cement, carbon-neutral concrete, geopolymer concrete, high-performance sustainable cement. sustainable wood, bamboo building materials, reclaimed wood, engineered wood, eco-friendly timber, FSC-certified wood, sustainable forestry materials, wooden green building solutions. recycled building materials, upcycled construction materials, plastic bricks, reclaimed metal, crushed glass aggregates, sustainable raw materials, green building waste solutions",
  alternates: {
    canonical: "https://hubeco.market/about",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "About Hubeco",
    description:
      "Our mission is to empower builders,architects and homeowners to make sustainable choices that positively impact our planet. We believe that every construction project, whether big or small, should prioritize eco-friendliness and energy efficiency without compromising on quality or affordability.The building and construction sector accounts for 40% of global carbon emissions, and we aim to change that at hubeco!!",
    siteName: "Hubeco",
    images: [
      {
        url: "/images/Admin-2.png",
        alt: "Hubeco Logo",
      },
    ],
  },
};

export default function MyApp() {
  return (
    <div className="bg-white ">
      <AboutPage />
    </div>
  );
}
