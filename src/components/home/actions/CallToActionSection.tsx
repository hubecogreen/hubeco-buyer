"use client";

import CustomButton from "@/components/customButton/CustomButton";
import { useRouter } from "next/navigation";
import React from "react";


const CallToActionSection: React.FC = () => {
   const router = useRouter();
   const whatsappNumber = "919985544055";
   const whatsappLink = `https://wa.me/${whatsappNumber}`;

   return (
      <section
         className="
            w-full 
            h-[600px]
            relative 
            flex 
            items-center 
            justify-center
            md:h-[600px]
         "
      >
         {/* Background Image */}
         <div className="absolute inset-0">
            <img
               src="/images/actions/Action.jpg"
               alt="Call to action"
               className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[rgba(33,33,33,0.66)] opacity-60"></div>
         </div>

         {/* Content */}
         <div className="relative max-w-[900px] w-full px-[12px] 
                     flex flex-col items-center text-center gap-6
                     md:gap-6">

            {/* Title */}
            <h2
               className="
                  text-white 
                  font-medium 
                  text-[50px] 
                  leading-[1.1em] 
                  font-poppins
                  md:text-[50px]
                  sm:text-[40px]
                  max-[490px]:text-[32px]
                  max-[490px]:leading-[1.2em]
                  max-[390px]:text-[28px]
                  max-[390px]:leading-[1.3em]
               "
            >
               Designed for Developers, Architects & Home Owners
            </h2>

            {/* Subtitle */}
            <p
               className="
                  text-white 
                  text-[22px] 
                  leading-[1.5em]
                  md:text-[22px]
                  sm:text-[20px]
                  max-[490px]:text-[18px]
                  max-[490px]:leading-[1.4em]
                  max-[390px]:text-[16px]
                  max-[390px]:leading-[1.5em]
                  max-[490px]:px-4
               "
            >
               Get access to verified materials, instant quotations and <br className="hidden md:block" />measurable impact
               all through one simple platform
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-6
                        max-[490px]:gap-[10px]
                        max-[490px]:w-full
                       ">
               <CustomButton
                  className="
      bg-primary
      text-white 
      text-[20px]
      font-medium  
      !px-[19px]
      !py-[20px]
      rounded-[5px]
      tracking-wide
      md:text-[20px]
      md:!px-[30px]
      md:!py-[20px]
      max-[490px]:text-[16px]
    
      max-[490px]:!h-[59px]
      max-[490px]:w-full
      max-[490px]:whitespace-nowrap
      max-[390px]:text-[14px]
   "
                  onPress={() => router.push('/products')}
                  title="Request for Pricing"
               />

               <a
                  className="
      bg-primary
      text-white 
      text-[20px]
      font-medium 
      px-[19px] 
      py-[20px] 
      rounded-[5px]
      tracking-wide
      cursor-pointer
      md:text-[20px]
      md:px-[40px]
      md:py-[20px]
      max-[490px]:text-[16px]
      max-[490px]:px-4
      max-[490px]:h-[59px]
      max-[490px]:py-2
      max-[490px]:w-full
      max-[490px]:text-center
      max-[490px]:flex
      max-[490px]:items-center
      max-[490px]:justify-center
      max-[490px]:whitespace-nowrap
      max-[390px]:text-[14px]
      hover:opacity-90
      transition-opacity
   "
                  href={whatsappLink}
               >
                  Talk to an Expert
               </a>
            </div>
         </div>
      </section>
   );
};

export default CallToActionSection;