// components/Benefits.js
"use client";
import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
// import { GoArrowRight } from "react-icons/go";
// import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
// import CustomButton from "../customButton/CustomButton";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  ExpandedIndex,
} from "@chakra-ui/react";
import { PiMinusCircleBold } from "react-icons/pi";
import { TbCirclePlus } from "react-icons/tb";
import styles from "./Vendor.module.css";
// import { ImageOptimizerCache } from "next/dist/server/image-optimizer";
const Benefits = () => {
  const accordionItems = [
    {
      imgSrc: "images/vendor-register/target.png",
      alt: "Reach",
      title: "Reach a Targeted Audience ",
      description:
        "Connect with customers specifically looking for green building materials.",
    },
    {
      imgSrc: "images/vendor-register/boost.png",
      alt: "Boost",
      title: "Boost Your Sales",
      description:
        "Increase your visibility and sales through our well-established marketplace.",
    },
    {
      imgSrc: "images/vendor-register/build.png",
      alt: "Build",
      title: "Build Your Brand",
      description:
        "Enhance your brand reputation by aligning with a platform dedicated to sustainability.",
    },
    {
      imgSrc: "images/vendor-register/onboarding.png",
      alt: "durable",
      title: "Seamless Onboarding",
      description:
        "Our simple registration process ensures you can start selling quickly.",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<ExpandedIndex | undefined>(
    undefined
  );

  const handleAccordionChange = (index: number | number[] | null) => {
    if (Array.isArray(index)) {
      setSelectedIndex(index[0] ?? undefined);
    } else {
      setSelectedIndex(index ?? undefined);
    }
  };

  const images = [
    "/images/vendor-register/vendorBanner.png",
    "/images/vendor-register/vendorBanner.png",
    "/images/vendor-register/vendorBanner.png",
    // Add more image paths here
  ];

  return (
    <div className="w-full">
      <div
        className={`${styles.secondSection} flex flex-col lg:flex-row items-start justify-between py-8 md:py-16 px-4 lg:px-8 mx-auto max-w-screen-xl lg:p-4`}
      >
        <Image
          src="images/vendor-register/benefits.png"
          alt="banner1"
          className="w-full lg:w-1/2 h-auto mx-auto lg:mx-0"
          width={712}
          height={557.83}
          onError={e => {
            e.currentTarget.src = '/images/product-placeholder.jpg'
          }}
          loading="lazy"
        />
        <div className=" p-4 lg:p-8 lg:w-1/2 text-black">
          <h1 className="text-xl md:text-3xl font-bold text-black mb-4">
            Benefits of becoming A Vendor
          </h1>
          <Accordion
            className="w-full mt-5"
            allowMultiple={false}
            defaultIndex={selectedIndex ?? [0]}
            onChange={handleAccordionChange}
          >
            {accordionItems.map((item, index) => (
              <AccordionItem
              key={index}
              className="border-b border-[#B90647] py-4 mb-4"
            >
            
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton className="flex justify-between">
                        <div className="flex items-center text-black">
                        <Image
                            src={item.imgSrc}
                            alt={item.alt}
                            className={`w-8 h-8 ${selectedIndex === index || (selectedIndex === undefined && index === 0) ? 'filter-none' : 'filter-grayscale'}`}
                            width={32}
                            height={32}
                            onError={e => {
                              e.currentTarget.src = '/images/product-placeholder.jpg';
                            }}
                            loading="lazy"
                          />

                          <span
                            className={`text-left text-navy-900 flex-1 ${selectedIndex === index ? "font-bold" : "font-normal"} ml-2`}
                          >

                            {item.title}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {isExpanded ? (
                            <PiMinusCircleBold className="text-[#B90647] text-[18px]" />
                          ) : (
                            <TbCirclePlus className="text-[#B90647] text-[18px]" />
                          )}
                        </div>

                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      className="text-left text-black text-sm text-medium mt-2 !text-navy-900 pl-10"
                      pb={4}
                    >
                      {item.description}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
