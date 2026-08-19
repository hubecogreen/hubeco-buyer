"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Mail, Phone, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface GetQuotePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappLink: string;
  phoneNumber: string;
  email: string;
  /**
   * Which edge of the trigger the popover hugs.
   * "responsive" hugs the left edge from md up to (but not including) lg
   * — where the trigger still sits on the left of the layout — then
   * switches to the right edge at lg+, where the layout pushes the
   * trigger to the right. Use "right" for triggers that stay pinned to
   * the right at every breakpoint (e.g. the floating WhatsApp button).
   */
  fromBottomNav?: boolean;
  align?: "left" | "right" | "responsive";
}

const alignClasses: Record<NonNullable<GetQuotePopoverProps["align"]>, string> = {
  left: "left-0",
  right: "right-0",
  responsive: "left-0 lg:left-auto lg:right-0",
};

const arrowAlignClasses: Record<NonNullable<GetQuotePopoverProps["align"]>, string> = {
  left: "left-8",
  right: "right-8",
  responsive: "left-8 lg:left-auto lg:right-8",
};

const GetQuotePopover = ({
  isOpen,
  onClose,
  whatsappLink,
  phoneNumber,
  email,
  fromBottomNav = false,
  align = "right",
}: GetQuotePopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const options = [
    // {
    //   label: "Call Us",
    //   icon: Phone,
    //   href: `tel:${phoneNumber}`,
    // },
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
        <motion.div
          ref={popoverRef}
          initial={{ opacity: 0, y: 8, scale: 0.96, ...(fromBottomNav ? { x: "-50%" } : {}), }}
          animate={{ opacity: 1, y: 0, scale: 1, ...(fromBottomNav ? { x: "-50%" } : {}), }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={`${fromBottomNav
            ? "fixed bottom-[96px] left-1/2"
            : "absolute bottom-full"
            } z-[120] mb-3 hidden w-[min(280px,calc(100vw-2.5rem))] rounded-[16px] border border-black/5 bg-cream px-4 py-4 shadow-2xl md:block ${fromBottomNav ? "" : alignClasses[align]}`}
        >
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className="text-[16px] font-medium text-brown">Get Quote</h2>
              <p className="text-[12px] text-brown/60">Get a custom quote based on your requirements.</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-6 w-6 items-center justify-center rounded-full text-brown transition hover:bg-black/5"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {options.map(({ label, icon: Icon, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={onClose}
                className="flex items-center gap-2 rounded-xl border border-primary/30 px-3 py-2 text-brown transition hover:bg-primary/5"
              >
                <Icon size={18} className="text-primary" />
                <span className="flex-1 text-[14px] font-medium">{label}</span>
                <ChevronRight size={14} className="text-brown/40" />
              </a>
            ))}
          </div>

          <div
            className={`absolute -bottom-1.5 h-3 w-3 rotate-45 bg-cream ${fromBottomNav
              ? "left-1/2 -translate-x-1/2"
              : arrowAlignClasses[align]
              }`}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default GetQuotePopover;
