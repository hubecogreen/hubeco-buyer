"use client";

import React from "react";

const ProcureSection: React.FC = () => {
    const services = [
        {
            id: 1,
            title: "100% Sustainable, Certified Materials",
            icon: "/images/procurement/icon1.png",
            description:
                "We list materials certified by GreenPro, GRIHA, and EPD ensuring every purchase meets India’s leading green building standards.",
        },
        {
            id: 2,
            title: "Transparent Sourcing & Pricing",
            icon: "/images/procurement/icon2.png",
            description:
                "View verified suppliers, specifications, and prices in one place. Make smarter, transparent and value-driven procurement decisions.",
        },
        {
            id: 3,
            title: "Streamlined RFQ to Payment",
            icon: "/images/procurement/icon3.png",
            description:
                "Raise RFQs, negotiate, confirm orders and update payment status seamlessly all within your Hubeco dashboard.",
        },
        {
            id: 4,
            title: "Expert Support for Green Projects",
            icon: "/images/procurement/icon4.png",
            description:
                "Our team helps you select materials aligned with GRIHA, IGBC, and LEED requirements for your next sustainable project.",
        },
    ];

    return (
        <section className="w-full flex justify-center py-20 bg-white">
            <div className="max-w-[1250px] w-full flex flex-col gap-[12px]">

                {/* Heading */}
                <h2 className="text-[43px] leading-[43px] text-[#3D3528]">
                    Why Procure from Us?
                </h2>

                <div className="flex flex-col md:flex-row w-full gap-[31px] items-start">

                    {/* LEFT IMAGE (Exact Figma Properties) */}
                    <div
                        className="
                            w-[592px]
                            h-[802px]
                            rounded-[12px]
                            overflow-hidden
                            shrink-0
                        "
                    >
                        <img
                            src="/images/procurement/img1.png"
                            alt="Procurement Benefits"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* RIGHT 4 CARDS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">

                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="
                                    bg-white
                                    border border-[#109989]
                                    rounded-[20px]
                                    w-[300px]
                                    h-[391.75px]
                                    p-[40px]
                                    flex flex-col
                                    gap-[20px]
                                "
                            >
                                {/* ICON */}
                                <img
                                    src={service.icon}
                                    alt={service.title}
                                    className="w-[48px] h-[48px] object-contain"
                                />

                                {/* TITLE */}
                                <h3 className="text-[22px] font-medium text-[#000] leading-[1.1]">
                                    {service.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p className="text-[15px] text-[#6C757D] leading-[1.5]">
                                    {service.description}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcureSection;
