"use client";

import React from "react";

const PartnersSection: React.FC = () => {
    const partners = [
        {
            id: 1,
            name: "Raghuram Bezawada",
            role: "Project Director, SSREC, Hyderabad",
            icon: "/images/icons/icon1.png",
            testimonial:
                "Hubeco has truly simplified the process of sourcing eco-friendly sand for green construction projects. Their online portal is intuitive and efficient, the delivery and coordination from source to customer is seamlessly well coordinated , their commitment to sustainability and reliable service. Hubeco is a valuable partner in our journey towards responsible building practices",
        },
        {
            id: 2,
            name: "Ar. Sachin Kankaria",
            role: "Partner, Evo Green City (Dehu, Pune)",
            icon: "/images/icons/icon2.png",
            testimonial:
                "Working with hubeco.market has been a great experience. It’s made sourcing verified sustainable materials effortless and transparent. A truly reliable partner for developers who care about building responsibly",
        },
        {
            id: 3,
            name: "Rahul Agarwal",
            role: "Procurement Head, Stonecraft Group, Hyderabad",
            icon: "/images/icons/icon3.png",
            testimonial:
                "Hubeco.market has made sustainable sourcing effortless and transparent , a trusted partner for our eco-friendly projects.",
        },
    ];

    return (
        <section className="w-full flex justify-center py-20 bg-[#EAF7F5]">
            <div className="max-w-[1250px] w-full flex flex-col items-center gap-[22px]">

                {/* Heading */}
                <h1 className="text-[43px] leading-[43px] text-[#3D3528] font-semibold text-center">
                    What our Partners Say
                </h1>

                <h2 className="text-[20px] text-[#3D3528] text-center opacity-90">
                    Trusted By Developers, Procurement Teams and Suppliers
                </h2>

                {/* Cards */}
                <div className="flex flex-col md:flex-row gap-[10px] justify-center w-full mt-[72px]">

                    {partners.map((p) => (
                        <div
                            key={p.id}
                            className="
    bg-white
    rounded-[7px]
    w-[323px]
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
        </section>
    );
};

export default PartnersSection;
