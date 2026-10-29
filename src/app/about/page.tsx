import AboutPage from "@/components/about/AboutPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Hubeco | Sustainable Building Materials Marketplace",
  description:
    "Learn how Hubeco connects buyers with suppliers of sustainable building materials and supports more informed construction procurement.",
  keywords:
    "about Hubeco, sustainable building materials, green building materials marketplace",
  alternates: {
    canonical: "https://hubeco.market/about",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "About Hubeco | Sustainable Building Materials Marketplace",
    description:
      "Learn how Hubeco connects buyers with suppliers of sustainable building materials and supports more informed construction procurement.",
    url: "https://hubeco.market/about",
    type: "website",
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
    <div className="bg-cream ">
      <AboutPage />
    </div>
  );
}
