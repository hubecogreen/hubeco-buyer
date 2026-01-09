import React from "react";
import Image from "next/image";

const WhatsAppWidget = () => {
  const whatsappNumber = "919985544055"; // Replace with your number in international format (without +)

  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50"
    >
      <Image
        src="/images/whatsapp (1).png" // Place a WhatsApp icon image in your public folder as whatsapp-icon.webp "D:\hubeco\hubeco-buyer\public\images\whatsapp (1).png"
        alt="Chat on WhatsApp"
        width={50}
        height={50}
      />
    </a>
  );
};

export default WhatsAppWidget;
