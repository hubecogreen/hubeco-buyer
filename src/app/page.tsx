import HomePage from "@/components/home/HomePage";
import { Metadata } from "next";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").toLowerCase();
const isProductionIndexable =
  apiBaseUrl.length > 0 &&
  !apiBaseUrl.includes("uat") &&
  !apiBaseUrl.includes("dev") &&
  !apiBaseUrl.includes("localhost");

// Organization Schema component
function OrganizationSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hubeco Market",
    alternateName: "Hubeco MarketPlace",
    url: "https://hubeco.market",
    logo: "https://hubeco.market/images/Rlogo.png",
    sameAs: [
      "https://www.facebook.com/people/HubecoMarket/61566048633254",
      "https://www.instagram.com/hubeco.market/",
      "https://www.linkedin.com/company/hubeco-market/",
      "https://www.youtube.com/@hubeco.marketplace"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 9985544055",
      contactType: "Customer Service",
      areaServed: "IN",
      availableLanguage: ["English"]
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

function WebsiteSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hubeco",
    alternateName: "Hubeco Market",
    url: "https://hubeco.market",
    description:
      "Marketplace for sustainable, eco-friendly, and low-carbon building materials.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://hubeco.market/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

export const metadata: Metadata = {
  title: "Buy Eco-Friendly, Low-Carbon Building Materials India Online",
  description:
    "Discover eco-friendly, low‑carbon building materials online in India. Shop sustainable supplies on Hubeco Marketplace and build smarter, greener projects today.",
  keywords:
    "Green building materials, sustainable building materials, green construction materials, construction materials, sustainable materials, marketplace for green building materials, online shopping for building materials, online shopping for green building materials, online shopping for sustainable building materials, eco-friendly construction, green building materials, sustainable construction, buy eco materials, B2B construction marketplace, green construction solutions, carbon-neutral materials, environmentally friendly building suppliers, bio-digesters, waste management solutions, organic waste recycling, recycled construction materials, energy-efficient building materials, thermal insulation, solar roofing, smart glass, eco-friendly insulation, cool roof technology, sustainable energy solutions,low-carbon cement, green concrete, sustainable construction materials, eco-friendly cement, carbon-neutral concrete, geopolymer concrete, high-performance sustainable cement, upcycled construction materials, reclaimed metal, crushed glass aggregates, sustainable raw materials, wall systems, eco electrical solutions, eco plumbing solutions, sustainable boards and panels, eco boards, eco panels, green insulation solutions, green wall finishes, sustainable steel, eco adhesive solutions, reinforcement and additives, green bath fittings, eco sanitary solutions, eco paints, cement alternatives, brick alternatives, sand alternatives",
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
  alternates: {
    canonical: "https://hubeco.market/",
  },
  robots: {
    index: isProductionIndexable,
    follow: isProductionIndexable,
  }
};

export default function MyApp() {
  return (
    <div className="bg-cream ">
      <OrganizationSchema />
      <WebsiteSchema />
      <HomePage />
    </div>
  );
}
