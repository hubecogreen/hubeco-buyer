"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import GetQuotePopover from "@/components/GetQuotePopover";
import GetQuoteSheet from "@/components/GetQuoteSheet";

const navItems = [
    {
        label: "Home",
        href: "/",
        icon: "/images/Menu/home.svg",
        activeIcon: "/images/Menu/home1.svg",
    },
    {
        label: "Categories",
        href: "/categories",
        icon: "/images/Menu/categories.svg",
        activeIcon: "/images/Menu/categories1.svg",
    },
    {
        label: "Green Finance",
        href: "/green-financing",
        icon: "/images/Menu/leaf.svg",
        activeIcon: "/images/Menu/leaf1.svg",
    },
    {
        label: "Submit Enquiry",
        href: "#",
        icon: "/images/Menu/enquiry.svg",
        activeIcon: "/images/Menu/enquiry1.svg",
    },
];

interface BottomNavigationProps {
    onSubmitEnquiry: () => void;
}

export default function BottomNavigation({
    onSubmitEnquiry,
}: BottomNavigationProps) {
    const pathname = usePathname();
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const whatsappNumber = "919985544055";

    const defaultMessage =
        "Hello, I would like to get a quote for sustainable building materials for my project. Please let me know the next steps to share my requirements.";

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

    // const handleSubmitEnquiry = () => {
    //     window.dispatchEvent(new CustomEvent("open-submit-enquiry"));
    // };

    return (
        <nav
            className="fixed bottom-[-1px] left-0 right-0 z-50 lg:hidden bg-cream border-t shadow-[0_-2px_8px_rgba(0,0,0,0.08)]"
        >
            <div className="mx-auto grid h-[64px] w-full max-w-[390px] sm:max-w-[480px] md:max-w-[640px] grid-cols-5 px-0 pt-2">
                {navItems.map((item) => {
                    const active = pathname === item.href;

                    const content = (
                        <div className="w-full h-[55px] flex flex-col items-center pt-1 pb-2">
                            <img
                                src={active ? item.activeIcon : item.icon}
                                alt={item.label}
                                className="w-6 h-7 mb-[4px]"
                            />

                            <span
                                className={`text-[9px] leading-[10px] font-semibold whitespace-nowrap text-center ${active ? "text-primary" : "text-brown"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </div>
                    );

                    if (item.label === "Submit Enquiry") {
                        return (
                            <button
                                key={item.label}
                                onClick={onSubmitEnquiry}
                                className="flex w-full justify-center bg-transparent border-0 p-0"
                            >
                                {content}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex w-full justify-center ${item.label === "Green Finance" ? "col-start-4" : ""
                                }`}
                        >
                            {content}
                        </Link>
                    );
                })}
                {/* Mobile Floating Quote Button */}
                <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-[26px] z-50
               w-[70px] h-[70px] rounded-full
               bg-primary
               border-[2.5px] border-cream
               flex flex-col items-center justify-center p-0"
                >
                    <img
                        src="/images/Menu/quoteicon.png"
                        alt="Quote"
                        className="w-[30px] h-[30px]"
                    />

                    <span className="text-cream text-[10px] leading-[10px] font-semibold mt-[3px]">
                        Quote
                    </span>
                </button>
            </div>
            <GetQuotePopover
                fromBottomNav={true}
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                whatsappLink={whatsappLink}
                phoneNumber="+919985544055"
                email="info@hubeco.market"
            />

            <GetQuoteSheet
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                whatsappLink={whatsappLink}
                phoneNumber="+919985544055"
                email="info@hubeco.market"
            />
        </nav>
    );
}
