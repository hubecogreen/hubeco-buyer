"use client";
import React, { useState, useEffect, useRef } from "react";
// import styles from "./Swiper.module.css"; // Keep your existing styles
import Image from "next/image"
const ImageSlider = () => {
  const images = [
    "/images/home/latest/homebanner-roads.webp",
    "/images/home/latest/9.webp",
    // "/images/home/latest/3.webp",
    "/images/home/latest/f.webp",
    "/images/home/latest/8.webp",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    //@ts-ignore
    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoSlide = () => {
     //@ts-ignore
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
     //@ts-ignore
    clearInterval(intervalRef.current);
  };

  const handleDotClick = (index:any) => {
    setCurrentImageIndex(index);
    stopAutoSlide();
    startAutoSlide();
  };

  return (
    <>
      <div
        className="relative  w-full h-64 sm:h-80 md:h-96 lg:h-[30rem] xl:h-[36rem]"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        <div className="relative w-full h-full">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Slide ${index}`}
              width={500}
              height={500}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp';
              }}
              priority={true}
              className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

      </div>
      <div className="relative w-max mx-auto z-40 lg:bottom-2 lg:mt-4 xl:bottom-16 md:bottom-16 bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentImageIndex ? "bg-primary w-8 h-3" : "bg-white"
            }`}
            aria-label="Go to next slide"
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </>
  );
};

export default ImageSlider;
