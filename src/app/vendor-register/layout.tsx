import type { Metadata } from "next";
import type { ReactNode } from "react";

// The page is a client component, so its metadata lives here
const title = "Register as a Building Materials Vendor | Hubeco";
const description =
  "Join Hubeco as a building materials vendor and showcase your products to buyers looking for construction materials and supplier quotations.";

export const metadata: Metadata = {
  title,
  description,
  keywords: "building materials vendor registration India",
  alternates: {
    canonical: "https://hubeco.market/vendor-register",
  },
  openGraph: {
    title,
    description,
    siteName: "Hubeco",
    url: "https://hubeco.market/vendor-register",
    images: [{ url: "/images/Admin-2.webp", alt: "Hubeco Logo" }],
  },
};

export default function VendorRegisterLayout({ children }: { children: ReactNode }) {
  return children;
}
