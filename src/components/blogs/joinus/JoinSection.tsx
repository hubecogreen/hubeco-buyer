// components/IntroSection.js
"use client";
import CustomButton from "@/components/customButton/CustomButton";
import React, { useRef } from "react";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";

const JoinSection = () => {
  const router=useRouter();
  return (
    // <section
    //   className="relative w-full  items-center justify-center bg-white "
    //   style={{}}
    // ></section>
    <div className="relative">
      <div className="bg-[url('/images/blogsection/banner.webp')] bg-cover bg-center h-96 md:h-80 lg:h-96">

        <div className="bg-opacity-90 h-full flex items-center justify-center py-10 md:py-20">
          <div className="text-center p-4 max-w-lg md:max-w-2xl lg:max-w-4xl text-white">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              Join Us on Our Journey
            </h1>
            <p className="mb-6 md:mb-8 lg:mb-10 text-sm md:text-base lg:text-lg">
              Whether you are a builder, architect, or homeowner, I invite you
              to join us on our journey towards a more sustainable future.
              Explore our marketplace, connect with our community, and discover
              the difference that ecofriendly materials can make.
            </p>
            <div className="flex items-center justify-center">
              <div className="flex flex-col md:flex-row gap-4">
                <CustomButton
                  title={"Become a Vendor"}
                  className="text-white font-semibold h-12 w-full md:w-40 text-sm md:text-md"
                  customStyles={{
                    border: "1px solid #FFFFFF",
                    color: "#FFFFFF",
                    minWidth: "200px",
                  }}
                  hoverBgColor="white"
                  hoverColor="black"
                  rightIcon={<GoArrowRight />}
                  onPress={()=>{router.push('/plans')}}
                />
                <CustomButton
                  title={"Register as a Buyer"}
                  className="text-white font-semibold h-12 w-full md:w-40 text-sm md:text-md"
                  customStyles={{
                    border: "1px solid #FFFFFF",
                    color: "#FFFFFF",
                    minWidth: "200px",
                  }}
                  hoverBgColor="white"
                  hoverColor="black"
                  rightIcon={<GoArrowRight />}
                  onPress={()=>{router.push('/login')}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinSection;
