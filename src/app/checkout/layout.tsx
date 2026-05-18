import type { Metadata } from "next";
import type { ReactNode } from "react";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").toLowerCase();
const isProductionIndexable =
  apiBaseUrl.length > 0 &&
  !apiBaseUrl.includes("uat") &&
  !apiBaseUrl.includes("dev") &&
  !apiBaseUrl.includes("localhost");

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: isProductionIndexable,
    googleBot: {
      index: false,
      follow: isProductionIndexable,
    },
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
