"use client";

import React, { useState } from "react";
import Image from "next/image";
import GetQuoteSheet from "@/components/GetQuoteSheet";
import GetQuotePopover from "@/components/GetQuotePopover";

const WhatsAppWidget = () => {
  const [isQuoteSheetOpen, setIsQuoteSheetOpen] = useState(false);
  const whatsappNumber = "919985544055"; // Replace with your number in international format (without +)
  const defaultMessage =
    "Hello, I would like to get a quote for sustainable building materials for my project. Please let me know the next steps to share my requirements.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const handleWidgetClick = () => {
    setIsQuoteSheetOpen(true);
  };

  return (
    <>
      <div className="fixed hidden lg:block lg:bottom-5 bottom-20 md:bottom-20 right-5 z-40">
        <button
          type="button"
          onClick={handleWidgetClick}
          aria-label="Chat on WhatsApp"
          className="block rounded-sm bg-cream"
        >
          <Image
            src="/images/get-quote.svg" // Place a WhatsApp icon image in your public folder as whatsapp-icon.webp "D:\hubeco\hubeco-buyer\public\images\whatsapp (1).png"
            alt="Chat on WhatsApp"
            width={150}
            height={150}
          />
        </button>

        <GetQuotePopover

          isOpen={isQuoteSheetOpen}
          onClose={() => setIsQuoteSheetOpen(false)}
          whatsappLink={whatsappLink}
          phoneNumber="+919985544055"
          email="info@hubeco.market"
          align="right"
        />
      </div>

      <GetQuoteSheet
        isOpen={isQuoteSheetOpen}
        onClose={() => setIsQuoteSheetOpen(false)}
        whatsappLink={whatsappLink}
        phoneNumber="+919985544055"
        email="info@hubeco.market"
      />
    </>
  );
};

export default WhatsAppWidget;
