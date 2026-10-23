import GreenFinancingSection from "@/components/greenFinance/green-finance-page";
import HubecoBeliefSection from "@/components/greenFinance/hubeco-belief-section";
import ReadyToBuildCTA from "@/components/greenFinance/ready-ToBuild";
import GreenHomeLoanSection from "@/components/greenFinance/greenHome-loan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Green Financing for Construction Projects | Hubeco",
  description:
    "Explore green project financing for developers and contractors, along with home loan options for eligible sustainable housing projects.",
  keywords: "green financing for construction projects India",
  alternates: {
    canonical: "https://hubeco.market/green-financing",
  },
  openGraph: {
    title: "Green Financing for Construction Projects | Hubeco",
    description:
      "Explore green project financing for developers and contractors, along with home loan options for eligible sustainable housing projects.",
    siteName: "Hubeco",
    url: "https://hubeco.market/green-financing",
    images: [{ url: "/images/Admin-2.webp", alt: "Hubeco Logo" }],
  },
};

export default function GreenFinancePage() {
  return (
    <div className="bg-cream">
      <GreenFinancingSection />
      <HubecoBeliefSection />
      <ReadyToBuildCTA />
      <GreenHomeLoanSection />
    </div>
  );
}
