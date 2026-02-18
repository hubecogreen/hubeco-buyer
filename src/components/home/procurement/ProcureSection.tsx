"use client";

import React from "react";

const ProcureSection: React.FC = () => {
    const services = [
        {
            id: 1,
            title: "100% Sustainable, Certified Materials",
            icon: "/images/procurement/icon1.png",
            description:
                "We list only GreenPro, GRIHA and EPD certified materials",
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
                "Manage RFQs, orders and payments seamlessly from your dashboard",
        },
        {
            id: 4,
            title: "Expert Support for Green Projects",
            icon: "/images/procurement/icon4.png",
            description:
                "We help you choose materials aligned with GRIHA, IGBC and LEED",
        },
    ];

    return (
        <section className="w-full flex justify-center pt-[60px] sm:pt-[80px] pb-[60px] md:pb-[40px] sm:pb-[80px] lg:p-[100px]">
            <div className="max-w-[1250px] w-full px-4 lg:px-0">

                {/* HEADING */}
                <h2
                    className="
          text-[28px] xs:text-[32px] sm:text-[36px] lg:text-[43px]
          leading-[34px] xs:leading-[38px] sm:leading-[40px] lg:leading-[43px]
          text-[#3D3528]
          text-center
          mb-[20px] sm:mb-[23px]
        "
                >
                    Why Procure from Us?
                </h2>

                {/* CONTENT ROW */}
                <div className="flex flex-col lg:flex-row gap-[20px] sm:gap-[25px] lg:gap-[31px] lg:items-stretch">

                    {/* LEFT IMAGE */}
                    <div
                        className="
            w-full
            lg:w-[592px]
            h-[280px]
            xs:h-[320px]
            sm:h-[400px]
            md:h-[449px] 
            lg:h-[598px]
            rounded-[12px]
            overflow-hidden
            shrink-0
          "
                    >
                        <img
                            src="/images/procurement/img1.webp"
                            alt="Procurement Benefits"
                            className="w-full h-full object-cover lg:object-cover md:object-cover md:object-[50%_25%] md:block lg:block block"
                        />
                        {/* <img
                            src="/images/procurement/img1-tab.png"
                            alt="Procurement Benefits"
                            className="w-full h-full object-cover lg:object-cover md:object-cover md:block lg:hidden hidden"
                        /> */}
                    </div>

                    {/* RIGHT CARDS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-[10px] md:gap-[5px] xs:gap-[12px] sm:gap-[15px] w-full">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="
                bg-cream
                border border-[#109989]
                rounded-[12px]
                sm:rounded-[16px]
                lg:rounded-[20px]
                lg:w-[300px]
                lg:h-[286px]
                md:h-[231px]
                p-[16px]
                md:p-[20px]
                xs:p-[20px]
                sm:p-[28px]
                lg:p-[40px]
                flex flex-col gap-[12px] sm:gap-[16px] lg:gap-[20px]
              "
                            >
                                <img
                                    src={service.icon}
                                    alt={service.title}
                                    className="w-[32px] h-[32px] xs:w-[36px] xs:h-[36px] md:h-[52px] md:w-[52px] sm:w-[42px] sm:h-[42px] lg:w-[65px] lg:h-[65px]"
                                />
                                {/* <h3 className="text-[20px] lg:text-[22px] font-medium">
                                    {service.title}
                                </h3> */}
                                <p className="text-[16px] xs:text-[12px] sm:text-[14px] lg:text-[22px] md:text-[16px] md:font-medium text-brown leading-[16px] xs:leading-[17px] sm:leading-[20px] lg:leading-[28px]">
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