"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import usePWAInstall from "@/components/hooks/usePWAInstall";
import GetQuoteSheet from "@/components/GetQuoteSheet";
import GetQuotePopover from "@/components/GetQuotePopover";

const logos = [
  "/images/home/hero/brand-logos/angrirus-logo.webp",
  "/images/home/hero/brand-logos/banka-bio-logo.webp",
  "/images/home/hero/brand-logos/bildtech-logo.webp",
  "/images/home/hero/brand-logos/citadel-logo.webp",
  "/images/home/hero/brand-logos/eco-strong-logo.webp",

  "/images/home/hero/brand-logos/green-jam-logo.webp",
  "/images/home/hero/brand-logos/jalsevak-logo.webp",
  "/images/home/hero/brand-logos/magnus-logo.webp",
  "/images/home/hero/brand-logos/meghalite-logo.webp",
  "/images/home/hero/brand-logos/nanospan-greyscale-logo.webp",

  "/images/home/hero/brand-logos/path-frame-logo.webp",
  "/images/home/hero/brand-logos/perfect-logo.webp",
  "/images/home/hero/brand-logos/ploygon-logo.webp",
  "/images/home/hero/brand-logos/radha-tmt-logo.webp",
  "/images/home/hero/brand-logos/sai-iges-power-pvt-ltd-logo.webp",

  "/images/home/hero/brand-logos/saltech-logo.webp",
  "/images/home/hero/brand-logos/sbf-rapid-logo.webp",
  "/images/home/hero/brand-logos/trigger-logo.webp",
  "/images/home/hero/brand-logos/univ-logo.webp",
  "/images/home/hero/brand-logos/vinayak-industries-logo.webp",

  "/images/home/hero/brand-logos/visaka-logo.webp",
  "/images/home/hero/brand-logos/zydex-logo.webp",
  "/images/home/hero/brand-logos/bonphu-logo.webp",
  "/images/home/hero/brand-logos/kingston-logo.webp",
  "/images/home/hero/brand-logos/bathous-logo.webp",
  "/images/home/hero/brand-logos/hey-concreste-logo.webp",
  "/images/home/hero/brand-logos/dalmia-logo.webp",
  "/images/home/hero/brand-logos/ekam-eco-logo.webp",
  "/images/home/hero/brand-logos/gaia-logo.webp",
  "/images/home/hero/brand-logos/indowud-logo.webp",
  "/images/home/hero/brand-logos/prayag-clay-logo.webp",
];

const greenProLabels = ["GreenPro", "EPD", "GRIHA"];

const HeroSection = () => {
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL || "";
  const heroVideoUrl = `${assetURL}/buyer/home-video/hero-video-U.webm`;
  const heroPosterUrl = "/images/home/hero/video-poster.webp";
  const { shouldShowInstallButton } = usePWAInstall();
  const [isQuoteSheetOpen, setIsQuoteSheetOpen] = useState(false);

  const whatsappNumber = "919985544055";
  const defaultMessage =
    "Hello, I would like to get a quote for sustainable building materials for my project. Please let me know the next steps to share my requirements.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  // const handleGetQuoteClick = () => {
  //   setIsQuoteSheetOpen(true);
  // };

  const handleGetQuoteClick = () => {
    window.dispatchEvent(new Event("hubeco:open-boq-modal"));
  };

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
              India’s Digital <br className="hidden lg:block" />
              <span className="whitespace-nowrap">
                Procurement Platform for
              </span> <br className="lg:block md:hidden block" />
              {/* Smarter,{" "} */}
<span className="inline-flex items-center whitespace-nowrap">
  <span className="bg-primary px-2 py-1 rounded text-cream inline-block">
    {"Sustainable".split("").map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
      >
        {char}
      </motion.span>
    ))}
  </span>

  <span className="ml-1">Construction</span>
</span>
              {/* <br className="md:hidden block" /> */}
              
            </h1>
          </div>

          <div className="flex flex-col justify-center h-full lg:pt-[290px] gap-2 w-full md:w-1/2 lg:w-1/2">
            <p className="text-[20px] font-regular md:ml-[52px]">Certified Products aligned with</p>

            <div className="flex items-center md:ml-[52px] sm:gap-4 lg:gap-6 w-full  md:w-full lg:w-full sm:w-fit">
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

       <div className="lg:flex block items-center gap-12 lg:pb-[50px] pb-[18px]">
         <div className="flex-1">
    <p className="max-[390px] text-[16px] md:text-[20px] lg:leading-[30px] leading-[20px] lg:mt-2 font-regular">
      Source certified sustainable materials, building systems and green
      financing from verified suppliers. Upload BOQs, compare quotes and
      build a greener future.
    </p>
  </div>

          <div className=" gap-3 mt-4 flex  lg:gap-6 relative z-30  ">
            <div className="relative w-full lg:w-[190px]">
              <motion.button
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="group flex justify-center items-center gap-[10px]
             bg-primary hover:bg-cream hover:text-primary text-cream
             w-full lg:w-[190px]
             lg:px-[33px] lg:py-[11.5px] py-[10px] px-[10px] text-[17px] font-medium
             rounded-md whitespace-nowrap cursor-pointer"
                onClick={handleGetQuoteClick}
              >
                {/* <Image
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
                /> */}

                Submit BOQ
              </motion.button>

              <GetQuotePopover
                isOpen={isQuoteSheetOpen}
                onClose={() => setIsQuoteSheetOpen(false)}
                whatsappLink={whatsappLink}
                phoneNumber="+919985544055"
                email="info@hubeco.market"
                align="responsive"
              />
            </div>

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
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={10000} // Increase for slower movement (e.g., 5000-10000)
            allowTouchMove={false}
            modules={[Autoplay]}
            className="w-full marquee-swiper"
          >
            {[...logos, ...logos].map((logo, i) => (
              <SwiperSlide
                key={i}
                className="!w-auto flex items-center justify-center px-4"
              >
                <Image
                  src={logo}
                  alt={`logo-${i}`}
                  width={80}
                  height={40}
                  className="h-10 w-auto object-contain max-w-[100px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <GetQuoteSheet
        isOpen={isQuoteSheetOpen}
        onClose={() => setIsQuoteSheetOpen(false)}
        whatsappLink={whatsappLink}
        phoneNumber="+919985544055"
        email="info@hubeco.market"
      />
    </section>
  );
};

export default HeroSection;
