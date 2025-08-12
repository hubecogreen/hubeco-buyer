import GreenFinancingSection from "@/components/greenFinance/green-finance-page";
import HubecoBeliefSection from "@/components/greenFinance/hubeco-belief-section";
import ReadyToBuildCTA from "@/components/greenFinance/ready-ToBuild";
import GreenHomeLoanSection from "@/components/greenFinance/greenHome-loan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Green Financing | Your App Name",
  description:
    "Empowering Sustainable Construction with accessible Green Capital",
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
