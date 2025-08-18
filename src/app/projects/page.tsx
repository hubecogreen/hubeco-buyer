import React from "react";
import type { Metadata } from "next";
import { AiFillHome } from "react-icons/ai";
import PortfolioCard from "@/components/projects/PortfolioCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects | Hubeco Buyer",
  description:
    "Explore our portfolio of sustainable building projects, eco-friendly construction, and innovative green architecture at Hubeco Buyer.",
  keywords:
    "green building projects, sustainable construction, eco-friendly architecture, green portfolio, Hubeco projects, sustainable design, energy-efficient buildings, green construction case studies, eco projects, green building showcase",
  alternates: {
    canonical: "https://hubeco.market/projects",
  },
  openGraph: {
    title: "Projects | Hubeco Buyer",
    description:
      "Discover real-world examples of sustainable construction and green building solutions in our projects portfolio.",
    siteName: "Hubeco",
    url: "https://hubeco.market/projects",
    images: [
      {
        url: "/images/Admin-2.webp",
        alt: "Hubeco Logo",
      },
    ],
  },
};

const Projects = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="banner-section h-102">
        <div className="md:px-20 px-5 py-5 relative bg-[url('/images/about/aboutBanner1.webp')] bg-cover bg-center h-[200px] flex items-center justify-start text-white">
          <Link
            href="/"
            className="text-white flex items-center no-underline px-2.5 py-1 rounded"
          >
            <AiFillHome size={16} className="text-white mr-1.5" />
            Home
          </Link>

          <span className="text-white mx-2">/</span>
          <Link
            href="/projects"
            className="text-white no-underline px-2.5 py-1 rounded"
          >
            Projects
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 md:px-24 md:py-16 py-6">
        <main className="col-span-12 lg:col-span-12">
          <div className="">
            <PortfolioCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
