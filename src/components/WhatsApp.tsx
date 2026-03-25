"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const WhatsAppWidget = () => {
  const pathname = usePathname();
  const isHomeRoute = pathname === "/" || pathname === "/home";
  const [isWidgetVisible, setIsWidgetVisible] = useState(!isHomeRoute);
  const whatsappNumber = "919985544055"; // Replace with your number in international format (without +)
  const defaultMessage =
    "Hello, I would like to get a quote for sustainable building materials for my project. Please let me know the next steps to share my requirements.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let frameId: number | null = null;
    let mutationObserver: MutationObserver | null = null;

    if (!isHomeRoute) {
      setIsWidgetVisible(true);
      return;
    }

    setIsWidgetVisible(false);

    const connectHeroObserver = () => {
      const heroSection = document.getElementById("home-hero-section");

      if (!heroSection) {
        return false;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          const shouldShow = entry.intersectionRatio <= 0.25;
          setIsWidgetVisible(shouldShow);
        },
        {
          threshold: [0, 0.25, 1],
        }
      );

      observer.observe(heroSection);
      return true;
    };

    if (!connectHeroObserver()) {
      frameId = window.requestAnimationFrame(() => {
        if (connectHeroObserver()) {
          return;
        }

        mutationObserver = new MutationObserver(() => {
          if (connectHeroObserver()) {
            mutationObserver?.disconnect();
            mutationObserver = null;
          }
        });

        mutationObserver.observe(document.body, {
          childList: true,
          subtree: true,
        });
      });
    }

    return () => {
      observer?.disconnect();
      mutationObserver?.disconnect();

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isHomeRoute]);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!isWidgetVisible}
      className={`fixed bottom-5 right-5 z-40 rounded-sm bg-cream transition-all duration-300 ease-out ${
        isWidgetVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-3 opacity-0 pointer-events-none"
      }`}
    >
      <Image
        src="/images/whatsapp-1.svg" // Place a WhatsApp icon image in your public folder as whatsapp-icon.webp "D:\hubeco\hubeco-buyer\public\images\whatsapp (1).png"
        alt="Chat on WhatsApp"
        width={150}
        height={150}
      />
    </a>
  );
};

export default WhatsAppWidget;
