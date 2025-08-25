import GreenFinancingSection from "@/components/greenFinance/green-finance-page";
import HubecoBeliefSection from "@/components/greenFinance/hubeco-belief-section";
import ReadyToBuildCTA from "@/components/greenFinance/ready-ToBuild";
import GreenHomeLoanSection from "@/components/greenFinance/greenHome-loan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empower Sustainability with Green Financing | Hubeco",
  description:
    "Explore green financing loan options with Hubeco. Access sustainable funding solutions that support eco-friendly projects and smart investments.",
};

export default function GreenFinancePage() {
  return (
    <div>
      <GreenFinancingSection />
      <HubecoBeliefSection />
      <ReadyToBuildCTA />
      <GreenHomeLoanSection />
    </div>
  );
}
