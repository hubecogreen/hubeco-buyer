import type { Metadata } from "next";
import type { ReactNode } from "react";

// The page is a client component, so its metadata lives here
const title = "Contact Hubeco | Building Materials Marketplace";
const description =
  "Contact Hubeco for product enquiries, supplier support and marketplace assistance. Reach our team by phone or email.";

export const metadata: Metadata = {
  title,
  description,
  keywords: "contact Hubeco building materials marketplace",
  alternates: {
    canonical: "https://hubeco.market/contact",
  },
  openGraph: {
    title,
    description,
    siteName: "Hubeco",
    url: "https://hubeco.market/contact",
    images: [{ url: "/images/Admin-2.webp", alt: "Hubeco Logo" }],
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
