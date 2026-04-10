import "./globals.css";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import React from "react";
import Script from "next/script";
import MainLayout from "@/components/home/MainLayout";
import Image from "next/image";
import dynamic from "next/dynamic";

const WhatsAppWidget = dynamic(() => import("@/components/WhatsApp"), {
  loading: () => <div className="min-h-[100px]" />,
});

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const isProductionIndexable =
  apiBaseUrl.length > 0 &&
  !apiBaseUrl.includes("uat") &&
  !apiBaseUrl.includes("dev");

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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: isProductionIndexable,
    follow: isProductionIndexable,
    googleBot: {
      index: isProductionIndexable,
      follow: isProductionIndexable,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Buy Eco-Friendly, Low-Carbon Building Materials India Online",
    description:
      "Discover eco-friendly, low‑carbon building materials online in India. Shop sustainable supplies on Hubeco Marketplace and build smarter, greener projects today.",
    url: "/",
    type: "website",
    siteName: "Hubeco",
    images: [
      {
        url: "/images/Admin-2.webp",
        alt: "Hubeco Logo",
      },
    ],
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = isProductionIndexable;
  const enableDiagnostics = process.env.NODE_ENV !== "production";

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" /> */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://assets.hubeco.market" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

        {/* DNS prefetch for faster resource loading */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* <link rel="dns-prefetch" href="https://px.ads.linkedin.com" /> */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Preload critical carousel images for LCP and Speed Index */}
        <link rel="preload" href="/images/actions/Action.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/images/home/hero/video-poster.webp" as="image" type="image/webp" fetchPriority="high" />

        {/* Preload critical background images */}
        {/* <link rel="preload" href="/images/home/bg1.webp" as="image" type="image/webp" /> */}

        {/* Preload critical CSS for faster rendering */}
        {/* <link rel="preload" href="/globals.css" as="style" />
        <noscript><link rel="stylesheet" href="/globals.css" /></noscript> */}
        
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
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="diLRPHS68vrjgTxnWTWOMw"
          strategy="afterInteractive"
        />

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

        {/* LinkedIn Insight Tag - deferred until user intent/idle */}
        <Script id="linkedin-insight-deferred" strategy="afterInteractive">
          {`
            (function () {
              let booted = false;
              function boot() {
                if (booted) return;
                booted = true;
                window._linkedin_partner_id = "8360633";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(window._linkedin_partner_id);

                const s = document.createElement("script");
                s.async = true;
                s.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                document.head.appendChild(s);
              }

              ["scroll", "keydown", "pointerdown", "touchstart"].forEach(function (eventName) {
                window.addEventListener(eventName, boot, { once: true, passive: true });
              });

              if ("requestIdleCallback" in window) {
                window.requestIdleCallback(boot, { timeout: 7000 });
              } else {
                setTimeout(boot, 5000);
              }
            })();
          `}
        </Script>
        {/* Page Load Diagnostics */}
        {enableDiagnostics ? <Script id="page-load-diagnostics" strategy="afterInteractive">
          {`
    window.addEventListener("load", () => {
      setTimeout(() => {
        const t = performance.timing;

        const metrics = {
          DNS_Time: t.domainLookupEnd - t.domainLookupStart,
          TCP_Connection: t.connectEnd - t.connectStart,
          TTFB_Server_Response: t.responseStart - t.requestStart,
          Response_Download: t.responseEnd - t.responseStart,
          DOM_Processing: t.domComplete - t.domLoading,
          First_Render: t.domContentLoadedEventEnd - t.navigationStart,
          Full_Page_Load: t.loadEventEnd - t.navigationStart,
        };

        console.group("🚀 PAGE LOAD DIAGNOSTICS");
        console.table(metrics);
        console.groupEnd();

        // Paint Metrics
        new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log("🎨 Paint Metric:", entry.name, entry.startTime + "ms");
          });
        }).observe({ type: "paint", buffered: true });

        // LCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const last = entries[entries.length - 1];
          if (last) {
            console.log("🔥 LCP:", last.startTime, "ms");
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });

        // Long Tasks
        new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.warn("⛔ Long JS Task:", entry.duration, "ms");
          });
        }).observe({ type: "longtask", buffered: true });

      }, 100);
    });
  `}
        </Script> : null}

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

