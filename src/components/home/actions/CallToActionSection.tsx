"use client";

import React from "react";

const CallToActionSection: React.FC = () => {
    return (
        <section
            className="
                w-full 
                h-[600px]
                relative 
                flex 
                items-center 
                justify-center
            "
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/images/actions/Action.jpg"
                    alt="Call to action"
                    className="w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[rgba(33,33,33,0.66)] opacity-60"></div>
            </div>

            {/* Content */}
            <div className="relative max-w-[900px] w-full px-5 
                        flex flex-col items-center text-center gap-6">

                {/* Title */}
                <h2
                    className="
                        text-white 
                        font-medium 
                        text-[50px] 
                        leading-[1.1em] 
                        font-poppins
                    "
                >
                    Designed for Developers, Architects & Home Owners
                </h2>

                {/* Subtitle */}
                <p
                    className="
                        text-white 
                        text-[22px] 
                        leading-[1.5em] 
                    "
                >
                    Get access to verified materials, instant quotations and measurable impact
                    all through one simple platform
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        className="
                            bg-[#109989]
                            text-white 
                            text-[20px]
                            font-medium 
                            px-8 
                            py-3 
                            rounded-[5px]
                            tracking-wide
                        "
                    >
                        Submit RFQ
                    </button>

                    <button
                        className="
                            bg-[#109989]
                            text-white 
                            text-[20px]
                            font-medium 
                            px-8 
                            py-3 
                            rounded-[5px]
                            tracking-wide
                        "
                    >
                        Talk to an Expert
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection;
