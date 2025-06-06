// components/ImageSlider.js
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { GoArrowRight } from "react-icons/go";
// import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import CustomButton from "../customButton/CustomButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
const ImageSlider = () => {
  const router=useRouter()
  const images = [
    "/images/buyer-register/buyerBannerN.png",
    "/images/buyer-register/buyerBannerN.png",
    "/images/buyer-register/buyerBannerN.png",
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
              src={src}
              alt={`Slide ${index}`}
              className="object-cover w-full h-full rounded"
              width={1448}
              height={549}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.jpg'
              }}
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center text-black bg-opacity-50 px-3 md:px-16">
              <h2 className="text-xs md:text-4xl font-normal md:mb-4 text-black md:tracking-wide">
                Welcome to hubeco.market-
                <br />
                Your Source for
                <span className="font-bold text-sm md:text-4xl px-2 text-[#B90647]">

                  Sustainable
                  <br />
                  Building Materials
                </span>
              </h2>
              <p className="text-xs md:text-sm mb-0 md:mb-6 text-black md:w-2/6 font-thin">
                At hubeco.market, we make it easy for you to find and purchase
                eco-friendly building materials for your projects. Whether
                you’re a professional builder, an architect, or a homeowner, our
                platform offers a vast selection of sustainable products to meet
                your needs.
              </p>
              <CustomButton
                title={"Register as a Buyer"}
                className="bg-secondary mt-4 px-2 md:px-4 py-2 h-8 md:h-12 md:py-3 w-32 md:w-52 text-white hover:bg-primary"
                // customStyles={{ width: "250px", height: "40px" }}
                rightIcon={<GoArrowRight />}
                onPress={()=>{router.push('/login')}}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
