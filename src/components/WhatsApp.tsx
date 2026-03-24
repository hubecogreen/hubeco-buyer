"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const WhatsAppWidget = () => {
  const pathname = usePathname();
  const [hideOnHomeHero, setHideOnHomeHero] = useState(false);
  const whatsappNumber = "919985544055"; // Replace with your number in international format (without +)
  const defaultMessage =
    "Hello, I would like to get a quote for sustainable building materials for my project. Please let me know the next steps to share my requirements.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  useEffect(() => {
    const isHomeRoute = pathname === "/" || pathname === "/home";

    if (!isHomeRoute) {
      setHideOnHomeHero(false);
      return;
    }

    const heroSection = document.getElementById("home-hero-section");

    if (!heroSection) {
      setHideOnHomeHero(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideOnHomeHero(entry.isIntersecting);
      },
      {
      threshold: 0.5  // stricter, smoother UX
      }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, [pathname]);

  if (hideOnHomeHero) {
    return null;
  }

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 pointer-events-auto bg-cream rounded-sm"
      style={{ pointerEvents: 'auto' }}
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
