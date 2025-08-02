"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";

const ImageSlider = () => {
  const images = useMemo(() => [
    "/images/home/latest/homebanner-roads.webp",
    "/images/home/latest/9.webp",
    "/images/home/latest/f.webp",
    "/images/home/latest/8.webp",
  ], []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize auto slide functions to prevent unnecessary re-renders
  const startAutoSlide = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  }, [images.length]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleDotClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
    stopAutoSlide();
    startAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoSlide]);

  return (
    <>
      <div
        className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[30rem] xl:h-[36rem]"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        <div className="relative w-full h-full">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              width={1200}
              height={675}
              priority={index === 0}
              quality={85}
              placeholder={index === 0 ? "blur" : "empty"}
              blurDataURL={index === 0 ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" : undefined}
              onError={(e) => {
                e.currentTarget.src = '/images/product-placeholder.webp';
              }}
              className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding={index === 0 ? "sync" : "async"}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
      </div>
      
      <div className="relative w-max mx-auto z-40 lg:bottom-2 lg:mt-4 xl:bottom-16 md:bottom-16 bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentImageIndex ? "bg-primary w-8 h-3" : "bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => handleDotClick(index)}
            type="button"
          />
        ))}
      </div>
    </>
  );
};

export default ImageSlider;
