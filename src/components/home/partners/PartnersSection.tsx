"use client";

import React, { useEffect, useRef, useState } from "react";

const PartnersSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const partners = [
        {
            id: 1,
            name: "Raghuram Bezawada",
            role: "Project Director, SSREC, Hyderabad",
            icon: "/images/partners/icon1.png",
            testimonial:
                "Hubeco has truly simplified the process of sourcing eco-friendly sand for green construction projects. Their online portal is intuitive and efficient, the delivery and coordination from source to customer is seamlessly well coordinated , their commitment to sustainability and reliable service. Hubeco is a valuable partner in our journey towards responsible building practices",
        },
        {
            id: 2,
            name: "Ar. Sachin Kankaria",
            role: "Partner, Evo Green City (Dehu, Pune)",
            icon: "/images/partners/icon2.png",
            testimonial:
                "Working with hubeco.market has been a great experience. It's made sourcing verified sustainable materials effortless and transparent. A truly reliable partner for developers who care about building responsibly",
        },
        {
            id: 3,
            name: "Rahul Agarwal",
            role: "Procurement Head, Stonecraft Group, Hyderabad",
            icon: "/images/partners/icon3.png",
            testimonial:
                "Hubeco.market has made sustainable sourcing effortless and transparent , a trusted partner for our eco-friendly projects.",
        },
    ];

    // Auto-scroll functionality for mobile
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (!isMobile) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
        }, 3000); // Auto-scroll every 3 seconds

        return () => clearInterval(interval);
    }, [partners.length]);

    // Scroll to current card on mobile
    useEffect(() => {
        if (scrollContainerRef.current && window.innerWidth < 768) {
            const container = scrollContainerRef.current;
            const cardWidth = container.offsetWidth;
            container.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? partners.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    };

    return (
        <section className="w-full flex justify-center py-12 sm:py-16 md:py-20 bg-[#109989] px-4">
            <div className="w-full max-w-[1440px] min-h-auto md:min-h-[703px] flex flex-col items-center gap-[24px] sm:gap-[32px] md:gap-[44px] py-12 sm:py-16 md:py-20">

                {/* Heading */}
                <h1 className="text-[32px] xs:text-[36px] sm:text-[40px] md:text-[43px] leading-[36px] xs:leading-[40px] sm:leading-[42px] md:leading-[43px] text-[#FFFFFF] font-semibold text-center px-4">
                    What our Partners Say
                </h1>

                <h2 className="text-[16px] xs:text-[17px] sm:text-[18px] md:text-[20px] text-[#FFFFFF] text-center opacity-90 px-4">
                    Trusted By Developers, Procurement Teams and Suppliers
                </h2>

                {/* Cards Container - Mobile: Carousel, Desktop: Side by Side */}
                <div className="relative w-full mt-[24px] sm:mt-[32px] md:mt-[44px]">
                    
                    {/* Mobile Carousel */}
                    <div className="md:hidden relative w-full">
                        <div 
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {partners.map((p) => (
                                <div
                                    key={p.id}
                                    className="flex-shrink-0 w-full snap-center px-2"
                                >
                                    <div className="
                                        bg-[#FFFEF8]
                                        rounded-[7px]
                                        w-full
                                        max-w-[380px]
                                        mx-auto
                                        min-h-[440px]
                                        xs:min-h-[460px]
                                        flex flex-col
                                        p-[24px]
                                        xs:p-[28px]
                                        border border-[#E4F1EE]
                                        border-l-[3px] border-l-[#0BA392]
                                    ">
                                        {/* ICON */}
                                        <div className="w-full flex justify-center mb-[20px] xs:mb-[22px]">
                                            <img
                                                src={p.icon}
                                                className="w-[60px] h-[60px] xs:w-[65px] xs:h-[65px] object-contain"
                                                alt={p.name}
                                            />
                                        </div>

                                        {/* NAME */}
                                        <h3 className="text-[18px] xs:text-[19px] font-semibold text-center text-[#222] mb-[5px]">
                                            {p.name}
                                        </h3>

                                        {/* ROLE */}
                                        <p className="text-[13px] xs:text-[13.5px] text-center opacity-70 leading-tight mb-[16px] xs:mb-[18px]">
                                            {p.role}
                                        </p>

                                        {/* TESTIMONIAL */}
                                        <p className="text-[13px] xs:text-[13.5px] leading-relaxed text-[#333] overflow-hidden">
                                            {p.testimonial}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows for Mobile */}
                        <button
                            onClick={handlePrevious}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
                            aria-label="Previous testimonial"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="#109989"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
                            aria-label="Next testimonial"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="#109989"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-2 mt-6">
                            {partners.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        index === currentIndex 
                                            ? 'bg-white w-6' 
                                            : 'bg-white/50'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Desktop: Side by Side Cards */}
                    <div className="hidden md:flex gap-[10px] justify-center w-full">
                        {partners.map((p) => (
                            <div
                                key={p.id}
                                className="
                                    bg-[#FFFEF8]
                                    rounded-[7px]
                                    w-[406px]
                                    h-[392px]
                                    flex flex-col
                                    p-[30px]
                                    border border-[#E4F1EE]
                                    border-l-[3px] border-l-[#0BA392]
                                "
                            >
                                {/* ICON */}
                                <div className="w-full flex justify-center mb-[25px]">
                                    <img
                                        src={p.icon}
                                        className="w-[70px] h-[70px] object-contain"
                                        alt={p.name}
                                    />
                                </div>

                                {/* NAME */}
                                <h3 className="text-[20px] font-semibold text-center text-[#222] mb-[5px]">
                                    {p.name}
                                </h3>

                                {/* ROLE */}
                                <p className="text-[14px] text-center opacity-70 leading-tight mb-[20px]">
                                    {p.role}
                                </p>

                                {/* TESTIMONIAL */}
                                <p className="text-[14px] leading-relaxed text-[#333] overflow-hidden">
                                    {p.testimonial}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hide scrollbar CSS */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default PartnersSection;