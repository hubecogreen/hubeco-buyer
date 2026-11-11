
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useRouter } from "next/navigation";
import { GoArrowRight } from "react-icons/go";
import CustomButton from "../customButton/CustomButton";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/plans");
  };

  const images = [
    "/images/vendor-register/vendorBanner.webp",
    "/images/vendor-register/vendorBanner.webp",
    "/images/vendor-register/vendorBanner.webp",
  ];

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="h-[560px] md:h-full lg:h-[480px]"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="h-full">
          <div className="relative w-full h-full">

            {/* Background Image */}
            <Image
              width={1448}
              height={549}
              src={src}
              alt={`Slide ${index}`}
              onError={(e) => {
                e.currentTarget.src =
                  "/images/product-placeholder.webp";
              }}
              loading="lazy"
              className="object-cover object-center w-full h-full"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/45 lg:bg-[linear-gradient(90deg,_rgba(16,43,38,0.949)_0%,_rgba(16,43,38,0.5412)_100%)]" />

            {/* Hero Content */}
            <div className="absolute inset-0 flex flex-col items-start justify-center w-full px-4 py-10 md:px-16 md:max-lg:px-4 lg:justify-start lg:px-[80px] lg:py-[62px] xl:left-1/2 xl:right-auto xl:w-full xl:max-w-[1440px] xl:-translate-x-1/2">

              <div className="w-full flex flex-col gap-5 md:gap-0 md:max-lg:max-w-[530px] md:max-lg:gap-5 lg:max-w-[650px] lg:gap-[18px]">

                {/* Section Label */}
                <span className="block text-[11px] font-bold leading-[140%] tracking-[1.8px] text-cream lg:text-white">
                  VENDOR CONNECT
                </span>

                {/* Heading */}
                <h2 className="text-[34px] leading-[118%] tracking-[-0.8px] font-semibold text-cream mb-0 md:text-4xl md:tracking-wide md:mb-4 md:max-lg:text-[44px] md:max-lg:tracking-[-0.8px] md:max-lg:mb-0 lg:text-[48px] lg:leading-[118%] lg:tracking-[-0.8px] lg:mb-0 lg:text-white">
                  <span>
                    Join
                    <span className="px-2 font-semibold text-cream lg:text-white">
                      hubeco.market
                    </span>
                  </span>
                  <span className="lg:hidden">
                    {" "}
                    <span className="vendor-heading-word">Vendor</span>
                    <br className="hidden lg:block" />
                    {" "}Community
                  </span>
                  <span className="hidden lg:block">
                    Vendor Community
                  </span>
                </h2>

                {/* Description */}
                <p className="text-[15px] leading-[160%] font-normal text-cream mb-0 md:text-sm md:w-3/6 md:mb-6 md:max-lg:text-[15px] md:max-lg:w-full md:max-lg:mb-0 lg:w-full lg:text-[15px] lg:leading-[170%] lg:mb-0 lg:text-white">
                  Are you a manufacturer or supplier of sustainable building
                  materials? hubeco.market is the perfect platform to showcase
                  your eco-friendly products to a dedicated audience of builders,
                  architects, and homeowners committed to sustainable
                  construction.
                </p>

                {/* Vendor Connect Button */}
                <CustomButton
                  title="Vendor Connect"
                  className="bg-primary mt-0 px-6 py-2 h-[52px] w-full rounded-lg text-cream hover:bg-[#0d887a] md:mt-4 md:w-[200px] md:h-[40px] md:max-lg:mt-0 md:max-lg:w-[236px] md:max-lg:h-[60px] lg:mt-0 lg:w-[236px] lg:h-[60px] lg:rounded-lg lg:text-[15px] lg:font-semibold"
                  rightIcon={<GoArrowRight />}
                  onPress={handleButtonClick}
                />

              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
