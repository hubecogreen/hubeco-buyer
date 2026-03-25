import type { Metadata } from "next";
import ProductsList from "@/components/product/ProductsList";

export const metadata: Metadata = {
  title: "Sustainable Building Materials | Hubeco",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <ProductsList />
    </div>
  );
}
