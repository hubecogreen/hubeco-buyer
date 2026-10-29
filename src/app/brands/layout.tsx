import type { Metadata } from "next";
const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").toLowerCase();
const isProductionIndexable =
    apiBaseUrl.length > 0 &&
    !apiBaseUrl.includes("uat") &&
    !apiBaseUrl.includes("dev") &&
    !apiBaseUrl.includes("localhost");
export const metadata: Metadata = {
    title: "Building Material Brands in India | Hubeco",
    description:
        "Explore building material brands listed on Hubeco. Discover products, specifications and supplier information for your project.",
    alternates: {
        canonical: "https://hubeco.market/brands",
    },
    robots: {
        index: isProductionIndexable,
        follow: isProductionIndexable,
    },
};

export default function BrandsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}