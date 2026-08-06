"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

    // const handleSubmitEnquiry = () => {
    //     window.dispatchEvent(new CustomEvent("open-submit-enquiry"));
    // };

    return (
        <nav
            className="fixed bottom-[-1px] left-0 right-0 z-50 lg:hidden bg-cream border-t shadow-[0_-2px_8px_rgba(0,0,0,0.08)]"
        >
            <div className="mx-auto grid h-[64px] w-full max-w-[390px] sm:max-w-[480px] md:max-w-[640px] grid-cols-4 px-2 sm:px-6 md:px-10 pt-2">
                {navItems.map((item) => {
                    const active = pathname === item.href;

                    const content = (
                        <div className="w-full h-[55px] flex flex-col items-center pt-1 pb-2">
                            <img
                                src={active?item.activeIcon : item.icon}
                                alt={item.label}
                                className="w-6 h-7 mb-[4px]"
                            />

                            <span
                                className={`text-[10px] leading-[10px] font-semibold whitespace-nowrap text-center ${active ? "text-primary" : "text-brown"
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
                            className="flex w-full justify-center"
                        >
                            {content}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
