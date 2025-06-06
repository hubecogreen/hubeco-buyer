import "./globals.css";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import React from "react";
import Script from "next/script";
import MainLayout from "@/components/home/MainLayout";
 
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
  variable: "--poppins",
});
 
export const metadata: Metadata = {
  title: "Marketplace for Green Building Materials",
  description:
    "India's marketplace for green building materials. India's biggest online store for green building materials, bricks, cement, AAC blocks, steel, plumbing, electrical, façade, building envelope, waterproofing, waste water, lighting, flooring, acoustics, dry walls, false ceiling, glazing, façade panels, plaster, construction blocks, construction aggregates, cooling towers, doors & windows, furniture, indoor air quality, insulation, paints & coatings, ready mix concrete, solar photo voltaic module, hybrid thermal panels, oxygen optimizer, STP ready mix plaster, adhesives, WPC doors & Frames and more! Find the largest selection from all brands at the lowest prices in India.",
  keywords:
    "Green building materials, sustainable building materials, green construction materials, construction materials, sustainable materials, marketplace for green building materials, online shopping for building materials, online shopping for green building materials, online shopping for sustainable building materials, eco-friendly construction, green building materials, sustainable construction, buy eco materials, B2B construction marketplace, green construction solutions, carbon-neutral materials, environmentally friendly building supplies. bio-digesters, waste management solutions, eco-friendly sanitation, sustainable water treatment, green sewage systems, organic waste recycling, sustainable wastewater management, recycled construction materials. energy-efficient building materials, thermal insulation, solar roofing, smart glass, eco-friendly insulation, cool roof technology, sustainable energy solutions, passive cooling materials. low-carbon cement, green concrete, sustainable construction materials, eco-friendly cement, carbon-neutral concrete, geopolymer concrete, high-performance sustainable cement. sustainable wood, bamboo building materials, reclaimed wood, engineered wood, eco-friendly timber, FSC-certified wood, sustainable forestry materials, wooden green building solutions. recycled building materials, upcycled construction materials, plastic bricks, reclaimed metal, crushed glass aggregates, sustainable raw materials, green building waste solutions.",
  openGraph: {
    title: "Marketplace for Green Building Materials",
    description:
      "Marketplace for green building materials. India's biggest online store for green building materials, bricks, cement, steel, plumbing, electrical, façade, building envelope, waterproofing, waste water, lighting, flooring, acoustics, dry walls, false ceiling, glazing, façade panels, plaster, construction blocks, construction aggregates, cooling towers, doors & windows, furniture, indoor air quality, insulation, paints& coatings, ready mix concrete, solar photo voltaic module,hybrid thermal panels,STP, oxygen optimizers, AAC, ready mix plaster, adhesives, WPC doors & Frames and more! Find the largest selection from all brands at the lowest prices in India.",
    siteName: "Hubeco",
    images: [
      {
        url: "/images/Admin-2.png",
        alt: "Hubeco Logo",
      },
    ],
  },
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd =
    !process.env.NEXT_PUBLIC_API_BASE_URL?.includes("uat") &&
    !process.env.NEXT_PUBLIC_API_BASE_URL?.includes("dev");
 
  return (
    <html lang="en" className={poppins.variable}>
      <head />
      <body className={poppins.className}>
        <MainLayout isProd={isProd}>{children}</MainLayout>
 
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-REE72KGV61"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-REE72KGV61');
          `}
        </Script>
 
        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight-init" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "8360633";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
          src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8360633&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  );
}