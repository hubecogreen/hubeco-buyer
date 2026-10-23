import BlogsSection from "@/components/blogs/blogSection/BlogsSection";
import JoinSection from "@/components/blogs/joinus/JoinSection";

import Head from "next/head";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainable Construction Materials Blog | Hubeco",
  description:
    "Read practical guides on sustainable construction materials, product comparisons, specifications and sourcing for building projects.",
  keywords:
    "sustainable construction materials blog, green building blogs, sustainable construction news, eco-friendly materials, green innovations, building tips, construction industry news, Hubeco blogs, sustainable architecture, eco construction, green marketplace articles",
  alternates: {
    canonical: "https://hubeco.market/blogs",
  },
  openGraph: {
    title: "Sustainable Construction Materials Blog | Hubeco",
    description:
      "Read practical guides on sustainable construction materials, product comparisons, specifications and sourcing for building projects.",
    siteName: "Hubeco",
    url: "https://hubeco.market/blogs",
    images: [
      {
        url: "/images/Admin-2.webp",
        alt: "Hubeco Logo",
      },
    ],
  },
};

export default function Blogs() {
  return (
    <div className="bg-cream">
      <div
        className="relative bg-cover bg-center h-[200px] flex items-center justify-start text-white md:px-28 px-10"
        style={{
          backgroundImage: 'url("images/about/aboutBanner1.webp")'
        }}
      >
        <Link
          href="/"
          className="text-white flex items-center no-underline px-2 py-1 rounded"
        >
          <AiFillHome size={16} className="text-white mr-1.5" />
          Home
        </Link>
        <span className="text-white mx-2">/</span>
        <Link
          href="/blogs"
          className="text-white no-underline px-2.5 py-1 rounded"
        >
          Blogs
        </Link>
      </div>
      
      <div className="category-section mx-auto pb-10 md:px-16 px-2">
        <BlogsSection />
      </div>

      <div className="blogs-section mx-auto">
        <JoinSection />
      </div>
    </div>
  );
}