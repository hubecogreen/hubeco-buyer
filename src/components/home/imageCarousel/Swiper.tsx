"use client";
import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const logos = [
  "/images/home/hero/banka-bio-logo.png",
  "/images/home/hero/green-jam-logo.png",
  "/images/home/hero/saltech-logo.png",
  "/images/home/hero/univ-logo.png",
];

const greenProLabels = ["GreenPro", "EPD", "GRIHA"];


const ImageSlider = () => {
  const router=useRouter();


  return (
    <section className="relative  lg:h-[561px] md:h-[472px] h-[536px]  ">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-black/0 z-10" />

      {/* Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center px-[20px] lg:px-[120px]  text-cream lg:translate-y-[-100px] translate-y-[-40px] lg:max-w-[1440px] mx-auto  ">

        {/* Title + Right Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center  lg:gap-[80px] gap-[20px] w-full">
          {/* LEFT TITLE */}
          <div className="lg:max-w-3xl lg:space-y-4 lg:pt-[209px] pt-[160px] w-full">
            <h1 className="text-[27px] lg:text-[60px] lg:leading-[60px] leading-[30px] font-medium">
              Digitizing <br className="hidden lg:block" /> Procurement for <br className="lg:block md:hidden block " />
              Smarter,{" "} <br className="md:block lg:hidden hidden " />
              <span className="bg-primary px-2  py-1 rounded text-cream inline-flex">
                {"Sustainable".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.04,
                      ease: [0.25, 0.1, 0.25, 1], // smooth cubic ease
                    }}
                    className="inline-block will-change-transform"
                    style={{ display: "inline-block" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              {" "}
              <br className="md:hidden lg:block block" />
            
              Construction
            </h1>
          </div>

          {/* RIGHT SIDE — Vertical swiper text */}
          {/* RIGHT SIDE — Vertical swiper text */}
<div className="flex flex-col justify-center h-full lg:translate-y-[190px] gap-2 pointer-events-none">
  <p className="text-[20px] font-regular">Certified Products from</p>

  <div className="h-[50px] overflow-hidden">
    <div className="vertical-marquee">
      <div className="vertical-track">
        {[...greenProLabels, ...greenProLabels].map((item, i) => (
          <div key={i} className="vertical-item">
            <p className="text-3xl">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>



        </div>
        <hr className="border-white/40 w-full lg:my-6 my-[10px]" />


        {/* Middle Row (Paragraph + Buttons) */}
        <div className="lg:flex block gap-[312px] items-center  lg:pb-[50px] pb-[18px] lg:justify-between md:w-1/2 lg:w-auto">
  
  {/* Text */}
  <div className="">
    <p className="text-[20px] lg:leading-[30px] leading-[20px]  lg:mt-2 font-regular  ">
      Empowering India’s Construction Industry with <br className="hidden lg:block" />
      Sustainable Materials and Digital Efficiency
    </p>
  </div>

  {/* Buttons */}
  <div className=" gap-3 mt-4 flex  lg:gap-6  ">
    
    <motion.button
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      className="bg-primary hover:bg-cream hover:text-primary text-cream 
                 w-full lg:w-auto 
                 lg:px-[20px] lg:py-[18px] py-[10px] px-[20px] text-[18px] font-medium
                 rounded-md whitespace-nowrap"
      onClick={() => router.push("/products")}
    >
      Explore Materials
    </motion.button>

    <motion.button
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      className="bg-primary hover:bg-cream hover:text-primary text-cream 
                 w-full lg:w-auto 
                 lg:px-[20px] lg:py-[18px] py-[10px] px-[20px] text-[18px] font-medium
                 rounded-md whitespace-nowrap"
      onClick={() => router.push("/plans")}
    >
      Partner with Us
    </motion.button>

  </div>
</div>


        {/* Bottom scrolling logos */}
        <div className="w-full flex flex-row items-center justify-center bg-white/10 backdrop-blur-md rounded-md py-2 px-4">
          
          <p className="opacity-70 whitespace-nowrap px-3 text-[16px] ">Trusted by:</p>

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
                <SwiperSlide key={`${dup}-${i}`} className="marquee-slide ">
                  <Image src={logo} alt={`logo-${i}`} width={80} height={24} className="mx-3 mt-2" />
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
