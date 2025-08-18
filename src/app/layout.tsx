import "./globals.css";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import React from "react";
import Script from "next/script";
import MainLayout from "@/components/home/MainLayout";
import WhatsAppWidget from "@/components/WhatsApp";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
  variable: "--poppins",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_PROD_URL || 'https://hubeco.market'),
  title: "Buy Eco-Friendly, Low-Carbon Building Materials India Online",
  description:
    "Discover eco-friendly, low‑carbon building materials online in India. Shop sustainable supplies on Hubeco Marketplace and build smarter, greener projects today.",
  keywords:
    "Green building materials, sustainable building materials, green construction materials, construction materials, sustainable materials, marketplace for green building materials, online shopping for building materials, online shopping for green building materials, online shopping for sustainable building materials, eco-friendly construction, green building materials, sustainable construction, buy eco materials, B2B construction marketplace, green construction solutions, carbon-neutral materials, environmentally friendly building supplies. bio-digesters, waste management solutions, eco-friendly sanitation, sustainable water treatment, green sewage systems, organic waste recycling, sustainable wastewater management, recycled construction materials. energy-efficient building materials, thermal insulation, solar roofing, smart glass, eco-friendly insulation, cool roof technology, sustainable energy solutions, passive cooling materials. low-carbon cement, green concrete, sustainable construction materials, eco-friendly cement, carbon-neutral concrete, geopolymer concrete, high-performance sustainable cement. sustainable wood, bamboo building materials, reclaimed wood, engineered wood, eco-friendly timber, FSC-certified wood, sustainable forestry materials, wooden green building solutions. recycled building materials, upcycled construction materials, plastic bricks, reclaimed metal, crushed glass aggregates, sustainable raw materials, green building waste solutions",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Buy Eco-Friendly, Low-Carbon Building Materials India Online",
    description:
    "Discover eco-friendly, low‑carbon building materials online in India. Shop sustainable supplies on Hubeco Marketplace and build smarter, greener projects today.",
    siteName: "Hubeco",
    images: [
      {
        url: "/images/Admin-2.webp",
        alt: "Hubeco Logo",
      },
    ],
  },
  robots: {
    index: false,   // generates "noindex"
    follow: false,  // generates "nofollow"
  }
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
      <head>
        <meta name="robots" content="noindex, nofollow"/>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" /> */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://assets.hubeco.market" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://snap.licdn.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for faster resource loading */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://px.ads.linkedin.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload critical carousel images for LCP and Speed Index */}
        <link rel="preload" href="/images/home/latest/homebanner-roads.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/images/home/latest/9.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/images/home/latest/f.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/images/home/latest/8.webp" as="image" type="image/webp" fetchPriority="high" />
        
        {/* Preload critical background images */}
        <link rel="preload" href="/images/home/bg1.webp" as="image" type="image/webp" />
        
        {/* Preload critical CSS for faster rendering */}
        <link rel="preload" href="/globals.css" as="style" />
        <noscript><link rel="stylesheet" href="/globals.css" /></noscript>
        
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TBS9JSSD');
          `}
        </Script>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-REE72KGV61"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-REE72KGV61');
          `}
        </Script>
        
        {/* Service Worker Registration for Enhanced Caching */}
        <Script id="service-worker" strategy="lazyOnload">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `}
        </Script>
      </head>
      <body className={poppins.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TBS9JSSD"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <MainLayout isProd={isProd}>{children}</MainLayout>

        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight-init" strategy="lazyOnload">
          {`
            _linkedin_partner_id = "8360633";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script
          id="linkedin-insight"
          strategy="lazyOnload"
          src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
        />
        <noscript>
          <Image
            height={1}
            width={1}
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8360633&fmt=gif"
          />
        </noscript>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
