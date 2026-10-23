import type { Metadata } from "next";
import type { ReactNode } from "react";

// The page is a client component, so its metadata lives here
const title = "Hubeco FAQs | Buyers, Vendors & Product Enquiries";
const description =
  "Find answers about buying products, requesting pricing, creating an account and registering as a vendor on Hubeco.";

export const metadata: Metadata = {
  title,
  description,
  keywords: "Hubeco marketplace FAQs",
  alternates: {
    canonical: "https://hubeco.market/faq",
  },
  openGraph: {
    title,
    description,
    siteName: "Hubeco",
    url: "https://hubeco.market/faq",
    images: [{ url: "/images/Admin-2.webp", alt: "Hubeco Logo" }],
  },
};

export default function FaqLayout({ children }: { children: ReactNode }) {
  return children;
}
