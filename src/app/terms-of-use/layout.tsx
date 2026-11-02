import type { Metadata } from "next";
const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").toLowerCase();
const isProductionIndexable =
    apiBaseUrl.length > 0 &&
    !apiBaseUrl.includes("uat") &&
    !apiBaseUrl.includes("dev") &&
    !apiBaseUrl.includes("localhost");
export const metadata: Metadata = {
    title: "Terms of Use | Hubeco",
    description:
        "Review the terms governing use of the Hubeco marketplace, accounts, transactions and related services.",
    alternates: {
        canonical: "https://hubeco.market/terms-of-use",
    },
    robots: {
        index: isProductionIndexable,
        follow: isProductionIndexable,
    },
    openGraph: {
        title: "Terms of Use | Hubeco",
        description:
            "Review the terms governing use of the Hubeco marketplace, accounts, transactions and related services.",
        url: "https://hubeco.market/terms-of-use",
        type: "website",
        siteName: "Hubeco",
    },
};

export default function TermsOfUseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}