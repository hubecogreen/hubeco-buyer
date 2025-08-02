"use client";
import React, { useState, useCallback, useMemo } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import CustomButton from "@/components/customButton/CustomButton";
// import { GoArrowRight } from "react-icons/go";
// import BlogCard from "@/components/blogCard/BlogCard";
// import { headers } from "next/headers";
import Image from "next/image";

const WorksSection = () => {
  const [showBuyer, setShowBuyer] = useState<boolean>(true);

  // Memoize click handlers
  const handleBuyerClick = useCallback(() => {
    setShowBuyer(true);
  }, []);

  const handleVendorClick = useCallback(() => {
    setShowBuyer(false);
  }, []);

  // Memoize buyer content to prevent re-rendering
  const buyerContent = useMemo(
    () => (
      <div className="flex flex-col space-y-4 pt-5">
        <div className="flex items-start items-start mt-4 lg:mt-4">
          <div className="p-1.5 rounded-md h-10 flex items-center justify-center">
            <Image
              src="/images/home/latest/browse-products.webp"
              alt="Browse products icon"
              width={60}
              height={60}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onError={(e) => {
                e.currentTarget.src = "/images/product-placeholder.webp";
              }}
              loading="lazy"
            />
          </div>
          <div className="ml-4 flex flex-col mb-2">
            <h6 className="font-bold text-sm md:text-base text-black">
              Browse Products
            </h6>
            <p className="text-justify text-sm text-medium mt-2 text-black">
              Explore our wide range of green building materials, each carefully
              selected for sustainability and performance.
            </p>
          </div>
        </div>

        <div className="flex items-start items-start">
          <div className="p-1.5 pt-0 rounded-md h-10 flex items-center justify-center">
            <Image
              src="/images/home/latest/compare.webp"
              alt="Compare products icon"
              width={70}
              height={70}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onError={(e) => {
                e.currentTarget.src = "/images/product-placeholder.webp";
              }}
              loading="lazy"
            />
          </div>
          <div className="ml-4 pl-[4px] flex flex-col mb-2">
            <h6 className="font-bold text-sm md:text-base text-black">
              Compare and Choose
            </h6>
            <p className="text-justify text-sm text-medium mt-2 text-black">
              Use our platform to compare products, read green certifications
              and specifications, read reviews, and select the best materials
              for your project.
            </p>
          </div>
        </div>

        <div className="flex items-start items-start">
          <div className="p-1.5 pt-0 rounded-md h-10 flex items-center justify-center">
            <Image
              src="/images/home/latest/place-order.webp"
              alt="Place order icon"
              width={75}
              height={75}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onError={(e) => {
                e.currentTarget.src = "/images/product-placeholder.webp";
              }}
              loading="lazy"
            />
          </div>
          <div className="ml-3 flex flex-col mb-2">
            <h6 className="font-bold text-sm md:text-base text-black">
              Place Your Order
            </h6>
            <p className="text-justify text-sm text-medium mt-2 text-black">
              Enjoy a seamless shopping experience with secure payment options
              and efficient delivery services from the vendors.
            </p>
          </div>
        </div>

        <div className="flex items-start items-start">
          <div className="p-1.5 pt-0 rounded-md h-10 flex items-center justify-center">
            <Image
              src="/images/home/latest/sustainability.webp"
              alt="Sustainability icon"
              width={60}
              height={60}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onError={(e) => {
                e.currentTarget.src = "/images/product-placeholder.webp";
              }}
              loading="lazy"
            />
          </div>
          <div className="ml-4 flex flex-col mb-2">
            <h6 className="font-bold text-sm md:text-base text-black">
              Build Sustainably
            </h6>
            <p className="text-justify text-sm text-medium mt-2 text-black">
              Use our materials to create eco-friendly structures that benefit
              both the environment and your bottom line.
            </p>
          </div>
        </div>
      </div>
    ),
    []
  );

  // Memoize vendor content to prevent re-rendering
  const vendorContent = useMemo(
    () => (
      <div className="flex flex-col space-y-4 pt-5">
        <div className="flex items-start mt-4 lg:mt-4">
          <div className="p-1.5 pt-0 rounded-md h-10 flex items-center justify-center">
            <Image
              src="/images/home/latest/register.webp"
              alt="Registration icon"
              width={50}
              height={50}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onError={(e) => {
                e.currentTarget.src = "/images/product-placeholder.webp";
              }}
              priority={true}
            />
          </div>
          <div className="ml-4 flex flex-col mb-2">
            <h6 className="font-bold text-sm md:text-base text-black">
              Registration
            </h6>
            <p className="text-justify text-sm text-medium mt-2 text-black">
              Sign up quickly with our simple registration process to become a
              vendor on our platform.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="p-1.5 pt-0 rounded-md h-10 flex items-center justify-center">
            <Image
              src="/images/home/latest/cubes.webp"
              alt="Upload products icon"
              width={60}
              height={60}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onError={(e) => {
                e.currentTarget.src = "/images/product-placeholder.webp";
              }}
              priority={true}
            />
          </div>
          <div className="ml-4 flex flex-col mb-2">
            <h6 className="font-bold text-sm md:text-base text-black">
              Upload products
            </h6>
            <p className="text-justify text-sm text-medium mt-2 text-black">
              Easily list your products with detailed specifications,
              sustainability data, product certifications, images and prices.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="p-1.5 pl-[5px] pt-0 rounded-md h-10 flex items-center justify-center">
            <Image
              src="/images/home/latest/sell.webp"
              alt="Start selling icon"
              width={55}
              height={55}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onError={(e) => {
                e.currentTarget.src = "/images/product-placeholder.webp";
              }}
              priority={true}
            />
          </div>
          <div className="ml-3 flex flex-col mb-2">
            <h6 className="font-bold text-sm md:text-base text-black">
              Start Selling
            </h6>
            <p className="text-justify text-sm text-medium mt-2 text-black">
              Begin selling to a wide audience and manage your orders
              effortlessly from your vendor dashboard.
            </p>
          </div>
        </div>
      </div>
    ),
    []
  );

  return (
    <section className="md:flex block max-w-7xl md:my-14 my-4 px-5 pb-8 md:pb-0 shadow-md mx-auto items-start h-fit justify-center border border-[#dcdcdc] bg-[#F4F4F4]">
      <div className="md:w-1/2 md:pt-14 pt-8 pr-2 md:pr-10 md:border-r md:border-[#eaeaea] md:border-solid">
        <div className="md:pl-20">
          <h1 className="text-center md:text-left text-2xl pt-5 md:text-4xl font-bold text-black mt-30">
            How it works
          </h1>
          <p className="md:text-big text-md text-justify md:text-justify pt-5 mx-auto md:pr-[15px] text-fontGray ">
            We are passionate about driving the transition towards sustainable
            living by providing eco-friendly construction materials for both B2B
            and B2C markets.
          </p>
          <div className="relative flex md:block items-center justify-start mb-5 md:mb-0 z-20 mt-10">
            <h1
              className={`md:text-6xl text-xl hover:cursor-pointer ${
                showBuyer
                  ? "border-b-2 border-secondary border-solid"
                  : "border-0"
              } md:border-0 pb-2 md:pb-0 font-bold ${
                showBuyer ? "text-[#A92449]" : "text-[#C7C6C7]"
              }`}
              onClick={handleBuyerClick}
            >
              Buyer
            </h1>
            <p></p>
            <h1
              className={`md:text-6xl text-xl hover:cursor-pointer ${
                !showBuyer
                  ? "border-b-2 border-secondary border-solid"
                  : "border-0"
              } md:border-0 pb-2 md:pb-0 font-bold md:mt-10 md:ml-0 ml-10 ${
                !showBuyer ? "text-[#A92449]" : "text-[#C7C6C7]"
              }`}
              onClick={handleVendorClick}
            >
              Vendor
            </h1>
          </div>
        </div>
        <Image
          src={"/images/home/latest/Vector.webp"}
          alt="How it works illustration"
          className="hidden md:block w-full -mt-10"
          width={100}
          height={100}
          loading="lazy"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          onError={(e) => {
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
        />
      </div>
      <div className="md:w-1/2 md:pr-20 md:pl-10 md:pt-14 pt-8">
        <Image
          src={"/images/home/latest/worksImg.webp"}
          className="rounded-md w-full h-auto"
          alt="How it works process illustration"
          width={600}
          height={600}
          priority={true}
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          onError={(e) => {
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
        />
        <div className="w-full">{showBuyer ? buyerContent : vendorContent}</div>
      </div>
    </section>
  );
};

export default WorksSection;
