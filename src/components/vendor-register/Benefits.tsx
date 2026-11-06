
"use client";

import React, { useState } from "react";
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

  // First accordion is expanded by default.
  // -1 means all accordions are closed.
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleAccordionChange = (index) => {
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
          max-w-screen-xl
          mx-auto
          py-12 px-4
          md:max-lg:gap-0 md:max-lg:px-[30px] md:max-lg:py-8
          lg:flex-row
          lg:justify-between
          lg:items-stretch
          lg:px-4
          lg:py-4
        "
      >
        {/* Benefits Image */}
        <Image
          src="/images/vendor-register/benefits.webp"
          alt="Benefits of becoming a vendor"
          width={712}
          height={558}
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
            lg:w-1/2
            lg:aspect-auto
            lg:object-contain
            lg:rounded-none
            lg:h-auto
              lg:flex-none
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
            lg:w-1/2
            lg:p-8
          "
        >
          <div className="flex flex-col gap-5 md:max-lg:order-1 md:max-lg:mb-3 md:max-lg:w-full md:max-lg:gap-2 md:max-lg:pt-0">
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
              "
            >
              Benefits of becoming A Vendor
            </h2>
          </div>

          {/* Benefits Accordion */}
          <Accordion
            className="w-full flex flex-col gap-[10px] md:max-lg:!order-3 md:max-lg:!mt-[72px] md:max-lg:!grid md:max-lg:!grid-cols-2 md:max-lg:!gap-5"
            allowMultiple={false}
            allowToggle={true}
            index={selectedIndex}
            onChange={handleAccordionChange}
          >
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={index}
                className="!border-0 !m-0 !p-0 !overflow-hidden !rounded-xl"
              >
                {({ isExpanded }) => (
                  <div
                    className={`
                      w-full
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
                          !px-4
                          !py-4
                          !flex
                          !items-center
                          !justify-between
                          !gap-3
                          !text-left
                          !rounded-xl
                          hover:!bg-transparent
                          focus:!shadow-none
                        "
                      >
                        {/* Icon and Title */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Image
                            src={item.imgSrc}
                            alt={item.alt}
                            width={24}
                            height={24}
                            loading="lazy"
                            className="
                              w-6
                              h-6
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
                        <div className="shrink-0 flex items-center">
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
                        text-[13px]
                        leading-[150%]
                        font-normal
                        text-[#4D5553]
                        font-['Poppins',sans-serif]
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
