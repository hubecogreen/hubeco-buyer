// components/ImageSlider.js
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRouter } from 'next/navigation';
import { GoArrowRight } from "react-icons/go";
// import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import CustomButton from "../customButton/CustomButton";
import Image from "next/image";

const ImageSlider = () => {

  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/plans');
  };

  const images = [
    "/images/vendor-register/vendorBanner.png",
    "/images/vendor-register/vendorBanner.png",
    "/images/vendor-register/vendorBanner.png",
    // Add more image paths here
  ];

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="h-64 md:h-full"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="h-full">
          <div className="relative w-full h-full">
            <Image
              width={1448}
              height={549}
              src={src}
              alt={`Slide ${index}`}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.jpg'
              }}
              loading="lazy"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center text-black bg-opacity-50 px-4 md:px-16">
              <h2 className="text-sm md:text-4xl font-normal mb-4 text-black tracking-wide">
                Join
                <span className="font-bold text-sm md:text-4xl px-2 text-[#B90647]">
                  hubeco.market
                </span>
                Vendor
                <br /> Community
              </h2>
              <p className="text-xs md:text-sm mb-1 md:w-3/6 md:mb-6 text-black">
                Are you a manufacturer or supplier of sustainable building
                materials? hubeco.market is the perfect platform to showcase
                your eco-friendly products to a dedicated audience of builders,
                architects, and homeowners committed to sustainable
                construction.
              </p>
              <CustomButton
                title={"Become a Vendor"}
                className="bg-secondary mt-4 px-2 md:px-4 py-2 h-12 md:h-12 md:py-3 w-36 md:w-40 text-white hover:bg-primary"
                customStyles={{ width: "200px", height: "40px" }}
                rightIcon={<GoArrowRight />}
                onPress={handleButtonClick}

              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
