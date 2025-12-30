"use client";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import React, { useState, useCallback, useMemo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface CustomButtonProps {
  onPress: () => void;
  className: string;
  customStyles?: React.CSSProperties;
  title: string;
  rightIcon: React.ReactNode;
}

const CustomButton = ({
  onPress,
  className,
  customStyles,
  title,
  rightIcon,
}: CustomButtonProps) => (
  <button onClick={onPress} className={className} style={customStyles}>
    <span>{title}</span>
    {rightIcon}
  </button>
);

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  [key: string]: any;
}

const Image = ({ src, alt, width, height, className, ...props }: ImageProps) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    {...props}
  />
);

const WorksSection = () => {
  const [showBuyer, setShowBuyer] = useState(true);

  const handleBuyerClick = useCallback(() => setShowBuyer(true), []);
  const handleVendorClick = useCallback(() => setShowBuyer(false), []);

  const buyerContent = useMemo(
    () => (
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-[10px] pt-5">
        {[
          {
            img: "/images/home/howitwork/search-icon.png",
            text: "Filter products by material, specs or category",
          },
          {
            img: "/images/home/howitwork/correct-icon.png",
            text: "Select products and request quotes from verified suppliers.",
          },
          {
            img: "/images/home/howitwork/cart-icon.png",
            text: "Approve orders and track CO₂ savings",
          },
          {
            img: "/images/home/howitwork/recycle-icon.png",
            text: "Build with curated green materials",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start px-3 pt-5 pb-3 rounded-xl border-[1px] border-primary h-[140px] w-full lg:px-5 lg:pt-10 lg:pb-5 lg:h-[215px] lg:w-[300px]"
          >
            <div className="flex flex-col gap-3 lg:gap-5">
              <Image
                src={item.img}
                alt="icon"
               width={52}
                height={32}
                className="w-[30px] h-auto lg:w-[52px] lg:h-auto"
              />
              <p className="text-[13px] lg:text-[24px]  lg:leading-6 text-brown">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
    []
  );

  const vendorContent = useMemo(
    () => (
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 pt-5">
        {[
          {
            img: "/images/home/howitwork/user-icon.png",
            text: "Sign up easily to become a vendor.",
          },
          {
            img: "/images/home/howitwork/cloud-icon.png",
            text: "List products with specs, certifications and prices.",
          },
          {
            img: "/images/home/howitwork/shop-icon.png",
            text: "Reach buyers and receive RFQ’s.",
          },
          {
            img: "/images/home/howitwork/graph-icon.png",
            text: "Track sales and revenue in your vendor dashboard.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start px-3 pt-5 pb-3 rounded-xl border-[1px] border-secondary h-[140px] w-full lg:px-5 lg:pt-10 lg:pb-5 lg:h-[215px] lg:w-[300px]"
          >
            <div className="flex flex-col gap-3 lg:gap-5">
              <Image
                src={item.img}
                alt="icon"
                width={52}
                height={32}
                className="w-[30px] h-auto lg:w-[52px] lg:h-auto"
              />
              <p className="text-[13px]  lg:text-[24px] lg:leading-6 text-brown">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
    []
  );

  return (
 <section className="relative block bg-cream mx-auto lg:flex  lg:p-[100px] p-[20px] lg:max-w-[1440px] ">
  {/* Background Image - Positioned to match reference */}
  <Image
    src="/images/home/latest/Vector.webp"
    alt="Center Vector"
    width={700}
    height={300}
    className="hidden lg:block absolute left-[600px] top-[365px] -translate-x-3/4 -translate-y-1/2 opacity-80 pointer-events-none z-0"
  />

  {/* Left Div */}
  <div className="flex lg:flex-row flex-col justify-start lg:gap-[162px]">
  <div className="relative z-10  ">
    <h2 className="text-center text-[28px] text-brown pb-3 lg:text-left lg:text-[43px] lg:pb-5">
      How it Works
    </h2>

    <p className="text-[12px] leading-relaxed text-lightGraytext mb-4 lg:text-[18px] lg:leading-[30px] lg:w-[390px] lg:mb-10">
      We are passionate about driving the transition towards sustainable
      living by providing eco-friendly construction materials for both B2B
      and B2C customers.
    </p>

    <div className="flex gap-3 mt-4 lg:block lg:mt-10 ">
      <CustomButton
        onPress={handleBuyerClick}
        className={`flex items-center shadow-md shadow-primary justify-center lg:w-[380px] lg:h-[80px] gap-2 rounded-md border font-bold w-full py-3 text-[16px]  lg:p-[22px] h-[60px] lg:text-[30px] lg:justify-between mb-0 lg:mb-6 ${
          showBuyer
            ? "bg-primary text-white border-primary"
            : "bg-transparent text-primary border-primary"
        }`}
        title="Buyer"
        rightIcon={
          showBuyer ? (
            <Image
              src="/images/home/howitwork/white-arrao-icon.png"
              alt="arrow"
              width={25}
              height={25}
              className="hidden lg:block"
            />
          ) : (
            <Image
              src="/images/home/howitwork/green-arrow-icon.png"
              alt="arrow"
              width={25}
              height={25}
              className="hidden lg:block"
            />
          )
        }
      />

      <CustomButton
        onPress={handleVendorClick}
        className={`flex items-center justify-center shadow-md shadow-secondary lg:w-[380px] lg:h-[80px] gap-2 rounded-md border font-bold w-full py-3 text-[16px]  lg:p-[22px] h-[60px] lg:text-[30px] lg:justify-between ${
          !showBuyer
            ? "bg-secondary text-white border-secondary"
            : "bg-transparent text-secondary border-secondary"
        }`}
        title="Vendor"
        rightIcon={
          !showBuyer ? (
            <Image
              src="/images/home/howitwork/white-arrao-icon.png"
              alt="arrow"
              width={25}
              height={25}
              className="hidden lg:block"
            />
          ) : (
            <Image
              src="/images/home/howitwork/red-arrow-icon.png"
              alt="arrow"
              width={25}
              height={25}
              className="hidden lg:block"
            />
          )
        }
      />
    </div>
  </div>

  {/* Right Div */}
  <div className="relative z-10  ">
    {showBuyer ? buyerContent : vendorContent}
  </div>

  </div>
</section>
  );
};

export default WorksSection;