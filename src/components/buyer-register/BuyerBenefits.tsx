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
import styles from "./Banner.module.css";

const BuyerBenefits = () => {
  const accordionItems = [
    {
      imgSrc: "images/buyer-register/buy.webp",
      alt: "Buy",
      title: "Wide Range of Products ",
      description:
        "Access a comprehensive selection of green building materials from trusted suppliers",
    },
    {
      imgSrc: "images/buyer-register/competitive.webp",
      alt: "Price",
      title: "Competitive Pricing",
      description:
        "Enjoy competitive prices on high-quality, sustainable products.",
    },
    {
      imgSrc: "images/buyer-register/user-friendly.webp",
      alt: "user-friendly",
      title: "User-Friendly Experience",
      description:
        "Our intuitive platform makes it easy to browse, compare, and purchase materials.",
    },
    {
      imgSrc: "images/buyer-register/expert.webp",
      alt: "Expert",
      title: "Expert Support",
      description:
        "Receive guidance and support from our team of sustainability experts.",
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
    "/images/vendor-register/vendorBanner.webp",
    "/images/vendor-register/vendorBanner.webp",
    "/images/vendor-register/vendorBanner.webp",
    // Add more image paths here
  ];

  return (
    <div className=" w-full">
      <div
        className={`${styles.secondSection} flex flex-col lg:flex-row items-start justify-between py-8 md:py-16 px-4 lg:px-8 mx-auto max-w-screen-xl lg:p-4`}
      >
        <Image
          src="images/buyer-register/buyer.webp"
          alt="banner1"
          className="w-full lg:w-1/2 h-auto mx-auto lg:mx-0"
          width={712}
          height={558}
          onError={e => {
            e.currentTarget.src = '/images/product-placeholder.webp'
          }}
          loading="lazy"
        />
        <div className=" p-4 lg:p-8 lg:w-1/2 text-black">
          <h1 className="text-xl md:text-3xl font-bold text-black mb-4">
            Benefits of becoming A Buyer
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
                className="border-b border-gray-200 py-4 mb-4"
                style={{ borderBlockColor: "#B90647" }}
              >
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton className="flex justify-between">
                        <div className="flex items-center text-black">
                          <Image
                            src={item.imgSrc}
                            alt={item.alt}
                            className={`w-8 h-8 transition-all duration-300 ${selectedIndex === index || (selectedIndex === undefined && index === 0)
                                ? ''
                                : 'grayscale'
                              }`}
                            width={32}
                            height={32}
                            onError={(e) => {
                              e.currentTarget.src = '/images/product-placeholder.webp'
                            }}
                            loading="lazy"
                          />

                          <span
                            className={`flex-1 text-navy-900 ml-[10px] text-left ${selectedIndex === index ? "font-bold" : "font-normal"
                              }`}
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

export default BuyerBenefits;
