"use client";
import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import usePWAInstall from "@/components/hooks/usePWAInstall";

const logos = [
  "/images/home/hero/banka-bio-logo.png",
  "/images/home/hero/green-jam-logo.png",
  "/images/home/hero/saltech-logo.png",
  "/images/home/hero/univ-logo.png",
];

const greenProLabels = ["GreenPro", "EPD", "GRIHA"];

const HeroSection = () => {
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL || "";
  const heroVideoUrl = `${assetURL}/buyer/home-video/hero-video-U.webm`;
  const heroPosterUrl = "/images/home/hero/video-poster.webp";
  const { shouldShowInstallButton } = usePWAInstall();

  const whatsappNumber = "919985544055";
  const defaultMessage =
    "Hello, I would like to get a quote for sustainable building materials for my project. Please let me know the next steps to share my requirements.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <section
      id="home-hero-section"
      className="relative  lg:h-[561px] md:h-[472px] h-[536px]  "
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={heroPosterUrl}
        className="absolute inset-0 w-full h-full object-cover brightness-95 z-0"
      >
        <source src={heroVideoUrl} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-black/0 z-10" />

      <div className="relative z-20 w-full h-full flex flex-col justify-center px-[20px] lg:px-[120px]  text-cream lg:translate-y-[-100px] translate-y-[-40px] lg:max-w-[1440px] mx-auto  ">
        <div className="flex flex-col lg:flex-row items-start lg:items-center  lg:gap-[25px] gap-[20px] w-full">
          <div className="lg:max-w-3xl lg:space-y-4 lg:pt-[209px] pt-[160px] w-full">
            <h1
              className="text-[27px] lg:text-[60px] lg:leading-[60px] leading-[30px] font-medium"
              aria-label="Digitizing Procurement for Smarter Sustainable Construction"
            >
              Digitizing <br className="hidden lg:block" />
              <span className="whitespace-nowrap">
                Procurement for
              </span> <br className="lg:block md:hidden block" />
              Smarter,{" "}

              <span className="bg-primary px-2 py-1 rounded text-cream inline-block whitespace-nowrap">
                {"Sustainable".split("").map((char, i) => (
                  <motion.span key={i} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </span>

              <br className="md:hidden lg:block block" />
              Construction
            </h1>
          </div>

          <div className="flex flex-col justify-center h-full lg:translate-y-[190px] gap-2 w-full md:w-1/2 lg:w-1/2">
            <p className="text-[20px] font-regular">Certified Products aligned with</p>

            <div className="flex items-center justify-between sm:gap-4 lg:gap-6 w-full  md:w-full lg:w-full sm:w-fit">
              <div className="h-[50px] overflow-hidden flex-shrink-0 min-w-[120px]">
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

              {shouldShowInstallButton ? (
                <button
                  onClick={() => {
                    window.dispatchEvent(new Event("hubeco:open-install-popup"));
                  }}
                  className="flex items-center gap-2 bg-primary 
             w-auto sm:w-auto max-w-full overflow-hidden
             lg:px-[13px] lg:py-[11.5px] py-[10px] md:px-[18px] px-[16px] 
             rounded-[4px] text-cream text-[14px] sm:text-[16px] font-medium whitespace-nowrap cursor-pointer"
                >
                  <div className="flex items-center justify-center w-[28px] h-[28px] shrink-0">
                    <Download size={22} color="#FFFEF8" />
                  </div>

                  Get Hubeco App
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <hr className="border-white/40 w-full lg:my-6 my-[10px]" />

        <div className="lg:flex block gap-[312px] items-center  lg:pb-[50px] pb-[18px] lg:justify-between md:w-1/2 lg:w-auto">
          <div className="">
            <p className="max-[370px]:text-[16px] text-[20px] lg:leading-[30px] leading-[20px]  lg:mt-2 font-regular  ">
              Empowering India&apos;s Construction Industry with <br className="hidden lg:block" />
              Sustainable Materials and Digital Efficiency
            </p>
          </div>

          <div className=" gap-3 mt-4 flex  lg:gap-6 relative z-30  ">
            <motion.button
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              className="group flex justify-center items-center gap-[10px] 
             bg-primary hover:bg-cream hover:text-primary text-cream 
             w-full lg:w-[190px] 
             lg:px-[33px] lg:py-[11.5px] py-[10px] px-[20px] text-[17px] font-medium
             rounded-md whitespace-nowrap cursor-pointer"
              onClick={() => window.open(whatsappLink, "_blank")}
            >
              <Image
                src="/images/home/hero/whatsapp-white.png"
                alt="Get Quote"
                width={30}
                height={30}
                className="group-hover:hidden"
              />

              <Image
                src="/images/home/hero/whatsapp-green.png"
                alt="Get Quote"
                width={30}
                height={30}
                className="hidden group-hover:block"
              />

              Get Quote
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              className="bg-primary hover:bg-cream hover:text-primary text-cream 
                 w-full lg:w-auto 
                 lg:px-[33px] lg:py-[11.5px] py-[10px] px-[20px] text-[17px] font-medium
                 rounded-md whitespace-nowrap cursor-pointer"
              onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_VENDOR_URL}/login`}
            >
              Partner with Us
            </motion.button>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-center bg-white/10 backdrop-blur-md rounded-md py-2 px-4">
          <p className="opacity-70 whitespace-nowrap px-3 text-[16px] ">Trusted by:</p>

          <Swiper
            slidesPerView="auto"
            loop={false}
            allowTouchMove={false}
            autoplay={false}
            speed={5000}
            className="ml-4 opacity-85 w-full marquee-swiper"
          >
            {[...logos, ...logos, ...logos].map((dup) =>
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

export default HeroSection;
