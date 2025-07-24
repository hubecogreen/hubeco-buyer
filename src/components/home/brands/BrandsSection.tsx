"use client";
import React, { useEffect, useRef, useState } from "react";
import "./BrandStyles.css";
import * as getEndpoint from "../../../network/EndPoints";
import toast from "react-hot-toast";
import useApi from "@/components/Fetcher/useAPI";
import Image from "next/image";
import { normalizePath } from "@/lib/utils";

const BrandsSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [brands, setBrands] = useState<any[]>([]);
  const { callApi } = useApi();
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  useEffect(() => {
    getBrands();
  }, []);

  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Categories Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const getBrands = async () => {
    try {
      const result = await callApi(`${getEndpoint.default.VENDORS}?limit=10000`, "GET") as any;
      if (result?.data == null) {
        handleApiError(result.errorData);
      } else {
        setBrands(result?.data?.items);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller && brands.length > 5 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const scrollerInner = scroller.querySelector(".scrolling-wrapper");
      const scrollerContent = Array.from(scrollerInner?.children || []);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement;
        duplicatedItem.setAttribute("aria-hidden", "true");
        scrollerInner?.appendChild(duplicatedItem);
      });

      const handleMouseEnter = () => scroller.classList.add("paused");
      const handleMouseLeave = () => scroller.classList.remove("paused");

      scroller.addEventListener("mouseenter", handleMouseEnter);
      scroller.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        scroller.removeEventListener("mouseenter", handleMouseEnter);
        scroller.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [brands]);

  return (
    <section className="relative w-full py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
            Our Brands
          </h1>
        </div>

        <div
          className={`${
            brands.length > 5
              ? "overflow-hidden"
              : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
          }`}
          ref={scrollerRef}
        >
          <div
            className={`${
              brands.length > 5
                ? "scrolling-wrapper flex items-center space-x-8 md:space-x-12"
                : "contents"
            }`}
          >
            {brands.map((vendor: any, index: number) => (
              <div
                key={index}
                className={`brand-slide flex items-center justify-center ${
                  brands.length > 5 ? "min-w-[210px] sm:min-w-[180px] md:min-w-[200px]" : ""
                }`}
              >
                <div className="w-full p-4 transition-transform duration-300 hover:scale-105">
                  {vendor?.businessInfo?.logo ? (
                    <div className="relative aspect-[3/2] w-full">
                      <Image
                        // src={
                        //   vendor?.businessInfo?.logo
                        //     ? (assetURL + '/' + vendor?.businessInfo?.logo).includes('//admin')
                        //       ? (assetURL + '/' + vendor?.businessInfo?.logo).replace('//admin', '/admin')
                        //       : `${assetURL}/${vendor?.businessInfo?.logo}`
                        //     : '/images/product-placeholder.webp'
                        // }
                        src={
                          vendor?.businessInfo?.logo
                            ? normalizePath(`${assetURL}/${vendor?.businessInfo?.logo}`)
                            : "/images/product-placeholder.webp"
                        }
                        alt={vendor?.businessInfo?.companyName}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 200px"
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.webp'
                        }}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#B906471A] text-[#B90647] text-xl sm:text-2xl md:text-3xl rounded-full uppercase">
                      {vendor.businessInfo.companyName
                        .split(" ")
                        .slice(0, 2)
                        .map((word: string) => word[0])
                        .join("")}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;