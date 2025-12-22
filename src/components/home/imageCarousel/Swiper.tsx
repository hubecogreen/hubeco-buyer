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
    <section className="relative w-full md:h-[561px] h-[536px]  ">
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
      <div className="relative z-20 w-full h-full flex flex-col justify-center px-[20px] md:px-[120px]  text-white md:translate-y-[-100px] translate-y-[-40px] md:max-w-[1440px] mx-auto ">

        {/* Title + Right Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center  md:gap-[80px] gap-[20px] w-full">
          {/* LEFT TITLE */}
          <div className="md:max-w-3xl md:space-y-4 md:pt-[209px] pt-[160px] w-full">
            <h1 className="text-[27px] md:text-[60px] md:leading-[60px] leading-[30px] font-medium">
              Digitizing <br className="hidden md:block" /> Procurement for <br />
              Smarter,{" "}
              <span className="bg-primary px-2  py-1 rounded text-white inline-flex">
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
              <br />
            
              Construction
            </h1>
          </div>

          {/* RIGHT SIDE — Vertical swiper text */}
          <div className="flex flex-col justify-center h-full md:translate-y-[190px] gap-2">
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
        <hr className="border-white/40 w-full md:my-6 my-[10px]" />


        {/* Middle Row (Paragraph + Buttons) */}
        <div className="md:flex block gap-[312px] items-center  md:pb-[50px] pb-[18px] md:justify-between">
  
  {/* Text */}
  <div className="md:w-auto">
    <p className="text-[20px] md:leading-[30px] leading-[20px]  md:mt-2 font-regular ">
      Empowering India’s Construction industry with <br className="hidden md:block" />
      Sustainable Materials and Digital Efficiency
    </p>
  </div>

  {/* Buttons */}
  <div className=" gap-3 mt-4 flex  md:gap-6  ">
    
    <motion.button
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      className="bg-primary hover:bg-white hover:text-primary text-white 
                 w-full md:w-auto 
                 md:px-[40px] md:py-[20px] py-[10px] px-[20px] text-[18px] font-medium
                 rounded-md"
      onClick={() => router.push("/products")}
    >
      Shop Now
    </motion.button>

    <motion.button
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      className="bg-primary hover:bg-white hover:text-primary text-white 
                 w-full md:w-auto 
                 md:px-[40px] md:py-[20px] py-[10px] px-[20px] text-[18px] font-medium
                 rounded-md"
      onClick={() => router.push("/plans")}
    >
      Sell With Us
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
