"use client";
import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const logos = [
  "/images/home/hero/banka-bio-logo.png",
  "/images/home/hero/green-jam-logo.png",
  "/images/home/hero/saltech-logo.png",
  "/images/home/hero/univ-logo.png",
];

const greenProLabels = ["GreenPro", "EDP", "GRIHA"];


const ImageSlider = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full-screen video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-95 z-0"
      >
        <source src="/images/home/hero/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-32 text-white">

        {/* Title + Right Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-[179px] w-full">
          {/* LEFT TITLE */}
          <div className="max-w-3xl space-y-4 pt-[209px]">
            <h1 className="text-3xl lg:text-6xl md:text-[60px] leading-[60px]">
              Digitizing <br /> Procurement for <br />
              Smarter,{" "}
              <span className="bg-primary px-2 rounded text-white">
                Sustainable
              </span>{" "}
              <br />
              Construction
            </h1>
          </div>

          {/* RIGHT SIDE — Vertical swiper text */}
          <div className="flex flex-col justify-center h-full md:translate-y-[180px] gap-2">
            <p className="text-lg">Certified Products from</p>

            <div className="h-[50px] overflow-hidden">
              <div className="vertical-marquee">
                <div className="vertical-track">
                  {[...greenProLabels, ...greenProLabels].map((item, i) => (
                    <div key={i} className="vertical-item">
                      <p className="text-4xl font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>


        </div>
<hr className="border-white/40 w-full my-8" />


        {/* Middle Row (Paragraph + Buttons) */}
        <div className="flex gap-[312px] items-center  pb-[50px]">
          <div>
            <p className="text-[20px] leading-[20px] opacity-85 mt-2">
              Empowering India’s Construction industry with <br />
              Sustainable Materials and Digital Efficiency
            </p>
          </div>

          <div className="flex space-x-4 ">
            <button className="bg-primary hover:bg-white hover:text-primary text-white px-[40px] py-[20px] rounded-md">
              Shop Now
            </button>
            <button className="bg-primary hover:bg-white hover:text-primary text-white px-[40px] py-[20px]  rounded-md">
              Sell With Us
            </button>
          </div>
        </div>

        {/* Bottom scrolling logos */}
       <div className="w-full flex flex-row items-center justify-center bg-white/10 backdrop-blur-md rounded-md py-2 px-4">

          <p className="opacity-80 whitespace-nowrap px-3 -mt-[16px]">Trusted by:</p>

          <Swiper
            slidesPerView="auto"
            loop={false}               // important
            allowTouchMove={false}     // prevent dragging reset
            autoplay={false}
            speed={5000}
            className="ml-4 opacity-85 w-full marquee-swiper"
          >
            {[...logos, ...logos, ...logos].map((dup) =>        // duplicate items manually ×2
              logos.map((logo, i) => (
                <SwiperSlide key={`${dup}-${i}`} className="marquee-slide">
                  <Image src={logo} alt={`logo-${i}`} width={80} height={24} className="mx-3" />
                </SwiperSlide>
              ))
            )}
          </Swiper>


        </div>

      </div>
    </section>
  );
};

export default ImageSlider;
