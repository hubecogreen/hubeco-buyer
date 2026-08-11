"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Mail , Phone, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface GetQuoteSheetProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappLink: string;
  phoneNumber: string;
  email: string;
}

const GetQuoteSheet = ({
  isOpen,
  onClose,
  whatsappLink,
  phoneNumber,
  email,
}: GetQuoteSheetProps) => {
  useEffect(() => {
    if (typeof document === "undefined" || !isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const options = [
    {
      label: "Call Us",
      icon: Phone,
      href: `tel:${phoneNumber}`,
    },
    {
      label: "Chat on WhatsApp",
      icon: FaWhatsapp,
      href: whatsappLink,
      external: true,
    },
    {
      label: "Email Us",
      icon: Mail,
      href: `mailto:${email}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[120] lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 rounded-t-[24px] bg-cream px-5 pb-8 pt-3 shadow-2xl"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-black/15" />

            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-[22px] font-medium text-brown">Get Quote</h2>
                <p className="text-[14px] text-brown/60">Get a custom quote based on your requirements.</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-brown transition hover:bg-black/5"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {options.map(({ label, icon: Icon, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-2xl border border-[2px] border-primary/30 px-4 py-3 text-brown transition hover:bg-primary/5"
                >
                  <Icon size={26} className="text-primary" />
                  <span className="flex-1 text-[18px] font-medium">{label}</span>
                  <ChevronRight size={18} className="text-brown/40" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};

export default GetQuoteSheet;
