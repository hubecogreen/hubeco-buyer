
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";

import { PiMinusCircleBold } from "react-icons/pi";
import { TbCirclePlus } from "react-icons/tb";

const Benefits = () => {
  const accordionItems = [
    {
      imgSrc: "/images/vendor-register/target.webp",
      alt: "Reach",
      title: "Reach a Targeted Audience",
      description:
        "Connect with customers specifically looking for green building materials.",
    },
    {
      imgSrc: "/images/vendor-register/boost.webp",
      alt: "Boost",
      title: "Boost Your Sales",
      description:
        "Increase your visibility and sales through our well-established marketplace.",
    },
    {
      imgSrc: "/images/vendor-register/build.webp",
      alt: "Build",
      title: "Build Your Brand",
      description:
        "Enhance your brand reputation by aligning with a platform dedicated to sustainability.",
    },
    {
      imgSrc: "/images/vendor-register/onboarding.webp",
      alt: "Onboarding",
      title: "Seamless Onboarding",
      description:
        "Our simple registration process ensures you can start selling quickly.",
    },
  ];

  // Mobile/desktop: one item always open (can't close the last one).
  // Tablet (md to lg): every item open, toggle icon hidden.
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const update = () => setIsTablet(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleAccordionChange = (index: number | number[]) => {
    if (!isTablet && typeof index === "number" && index >= 0)
      setSelectedIndex(index);
  };

  return (
    <section className="w-full bg-cream">
      <div
        className="
          flex flex-col
          items-start
          gap-7
          w-full
          mx-auto
          px-4 py-[20px]
          md:max-lg:gap-0
          lg:box-border
          lg:min-h-[520px]
          lg:max-w-[1440px]
          lg:px-[100px]
          lg:pt-[40px]
          lg:pb-[0px]
          lg:grid
          lg:grid-cols-[46fr_54fr]
          lg:items-start
          lg:justify-normal
          lg:gap-20
        "
      >
        {/* Benefits Image */}
        <Image
          src="/images/vendor-register/benefits.webp"
          alt="Benefits of becoming a vendor"
          width={712}
          height={600}
          onError={(e) => {
            e.currentTarget.src =
              "/images/product-placeholder.webp";
          }}
          loading="lazy"
          className="
          block
            w-full
            aspect-[358/280.51]
            object-cover
            rounded-xl
            lg:w-full
            lg:h-[430px]
            lg:aspect-auto
            lg:object-cover
            lg:rounded-2xl
            md:max-lg:order-2
            md:max-lg:aspect-[708/449]
            md:max-lg:rounded-2xl
          "
        />

        {/* Benefits Content */}
        <div
          className="
            flex flex-col
            gap-5
            w-full
            p-0
            text-[#203B37]
            md:max-lg:contents
            lg:w-full
            lg:gap-3
            lg:p-0
          "
        >
          <div className="flex flex-col gap-2 md:max-lg:order-1 md:max-lg:mb-3  md:max-lg:pt-0 md:gap-2">
            {/* Section Label */}
            <span
              className="
                text-[11px]
                font-bold
                leading-[140%]
                tracking-[1.8px]
                text-[#08796D]
                font-['Inter',sans-serif]
                md:max-lg:inline-block
                md:max-lg:w-full
                md:max-lg:min-h-[16px]
                md:max-lg:whitespace-normal
                md:max-lg:overflow-visible
                lg:text-[11px]
                lg:min-h-[15px]
                lg:tracking-[1.8px]
              "
            >
              GROW WITH HUBECO
            </span>

            {/* Section Heading */}
            <h2
              className="
                text-[27px]
                leading-[125%]
                tracking-[-0.6px]
                font-semibold
                text-[#203B37]
                font-['Poppins',sans-serif]
                mb-0
                md:max-lg:w-full
                lg:text-[32px]
                lg:leading-[125%]
                lg:tracking-[-0.6px]
              "
            >
              Benefits of becoming A Vendor
            </h2>
          </div>

          {/* Benefits Accordion */}
          <Accordion
            className="w-full flex flex-col gap-[10px] md:max-lg:!order-3 md:max-lg:!mt-[30px] md:max-lg:!grid md:max-lg:!grid-cols-2 md:max-lg:!gap-5 lg:!gap-[10.15px]"
            allowMultiple={isTablet}
            index={isTablet ? accordionItems.map((_, i) => i) : selectedIndex}
            onChange={handleAccordionChange}
          >
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={index}
                className="!border-0 !m-0 !p-0 !overflow-hidden !rounded-xl lg:!rounded-[10.15px]"
              >
                {({ isExpanded }) => (
                  <div
                    className={`
                      w-full
                      lg:min-h-[74px]
                      lg:box-border
                      rounded-xl
                      border
                      transition-colors
                      duration-200
                      ${isExpanded
                        ? "bg-[#EDF7F4] border-[#A9D5CA]"
                        : "bg-[#FFFEF8] border-[#109989]"
                      }
                    `}
                  >
                    {/* Accordion Header */}
                    <h3>
                      <AccordionButton
                        className="
                          !w-full
                          !min-h-[68px]
                          lg:!min-h-0
                          lg:!h-[74px]
                          !px-4
                          !py-4
                          lg:!px-[13.53px]
                          lg:!py-[10px]
                          !flex
                          !items-center
                          !justify-between
                          !gap-3
                          !text-left
                          !rounded-xl
                          hover:!bg-transparent
                          focus:!shadow-none
                          md:max-lg:!pointer-events-none
                        "
                      >
                        {/* Icon and Title */}
                        <div className="flex items-center gap-3 flex-1 min-w-0 lg:gap-[10.15px]">
                          <Image
                            src={item.imgSrc}
                            alt={item.alt}
                            width={24}
                            height={24}
                            loading="lazy"
                            className="
                              w-6
                              h-6
                              lg:w-[23.68px]
                              lg:h-[23.68px]
                              object-contain
                              shrink-0
                            "
                          />

                          <span
                            className={`
                              text-[14px]
                              leading-[140%]
                              text-[#203B37]
                              font-['Poppins',sans-serif]
                              lg:text-[16px]
                              lg:font-semibold
                              lg:leading-[140%]
                              lg:font-['Inter',sans-serif]
                              ${isExpanded
                                ? "font-semibold"
                                : "font-medium"
                              }
                            `}
                          >
                            {item.title}
                          </span>
                        </div>

                        {/* Expand / Collapse Icon */}
                        <div className="shrink-0 flex items-center md:max-lg:hidden">
                          {isExpanded ? (
                            <PiMinusCircleBold
                              className="text-[#109989] text-[18px]"
                            />
                          ) : (
                            <TbCirclePlus
                              className="text-[#109989] text-[20px]"
                            />
                          )}
                        </div>
                      </AccordionButton>
                    </h3>

                    {/* Accordion Description */}
                    <AccordionPanel
                      className="
                        !pt-0
                        !px-4
                        !pb-4
                        lg:!box-border
                        lg:!px-[44px]
                        lg:!pb-[8px]
                        lg:!pt-0
                        text-[13px]
                        leading-[150%]
                        font-normal
                        text-[#4D5553]
                        font-['Poppins',sans-serif]
                        lg:text-[12px]
                        lg:leading-[100%]
                      "
                    >
                      {item.description}
                    </AccordionPanel>
                  </div>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
