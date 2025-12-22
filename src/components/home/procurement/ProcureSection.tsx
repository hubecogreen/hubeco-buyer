"use client";

import React from "react";

const ProcureSection: React.FC = () => {
    const services = [
        {
            id: 1,
            title: "100% Sustainable, Certified Materials",
            icon: "/images/procurement/icon1.png",
            description:
                "We list only GreenPro, GRIHA, and EPD certified materials",
        },
        {
            id: 2,
            title: "Transparent Sourcing & Pricing",
            icon: "/images/procurement/icon2.png",
            description:
                "View verified suppliers, specs and prices for smarter procurement",
        },
        {
            id: 3,
            title: "Streamlined RFQ to Payment",
            icon: "/images/procurement/icon3.png",
            description:
                "Manage RFQs, orders and payments seamlessly from your dashboard.",
        },
        {
            id: 4,
            title: "Expert Support for Green Projects",
            icon: "/images/procurement/icon4.png",
            description:
                "We help you choose materials aligned with GRIHA, IGBC and LEED.",
        },
    ];

    return (
        <section className="w-full flex justify-center pt-[60px] sm:pt-[80px] pb-[60px] sm:pb-[80px] md:p-[100px]">
            <div className="max-w-[1250px] w-full px-4 md:px-0">

                {/* HEADING */}
                <h2
                    className="
          text-[28px] xs:text-[32px] sm:text-[36px] md:text-[43px]
          leading-[34px] xs:leading-[38px] sm:leading-[40px] md:leading-[43px]
          text-[#3D3528]
          text-center
          mb-[20px] sm:mb-[23px]
        "
                >
                    Why Procure from Us?
                </h2>

                {/* CONTENT ROW */}
                <div className="flex flex-col md:flex-row gap-[20px] sm:gap-[25px] md:gap-[31px] md:items-stretch">

                    {/* LEFT IMAGE */}
                    <div
                        className="
            w-full
            md:w-[592px]
            h-[280px]
            xs:h-[320px]
            sm:h-[400px]
            md:h-[598px]
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

                    {/* RIGHT CARDS */}
                    <div className="grid grid-cols-2 gap-[10px] xs:gap-[12px] sm:gap-[15px] w-full">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="
                bg-cream
                border border-[#109989]
                rounded-[12px]
                sm:rounded-[16px]
                md:rounded-[20px]
                md:w-[300px]
                md:h-[286px]
                p-[16px]
                xs:p-[20px]
                sm:p-[28px]
                md:p-[40px]
                flex flex-col gap-[12px] sm:gap-[16px] md:gap-[20px]
              "
                            >
                                <img
                                    src={service.icon}
                                    alt={service.title}
                                    className="w-[32px] h-[32px] xs:w-[36px] xs:h-[36px] sm:w-[42px] sm:h-[42px] md:w-[48px] md:h-[48px]"
                                />
                                {/* <h3 className="text-[20px] md:text-[22px] font-medium">
                                    {service.title}
                                </h3> */}
                                <p className="text-[11px] xs:text-[12px] sm:text-[14px] md:text-[22px] text-[#000000] leading-[16px] xs:leading-[17px] sm:leading-[20px] md:leading-[28px]">
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