"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import LottieWrapper from "../LottieWrapper";
import animationData from "../../../public/animations/nodatafound.json";
import styles from "../home/categories/Category.module.css";
import CustomButton from "../customButton/CustomButton";

import * as getEndpoint from "../../network/EndPoints";
import useApi from "../Fetcher/useAPI";
import {
  saveCategories,
  saveCatTime,
} from "@/reduxStore/slices/masterDataSlice";
import { normalizePath } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


const FALLBACK_IMAGE = "/images/product-placeholder.webp";

const CategoryList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { callApi } = useApi();

  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  // Redux State
  const categories = useSelector((state: any) => state.masterData.categories);
  const buildingSystemCategories = useSelector(
    (state: any) => state.masterData.buildingSystemCategories
  );

  useEffect(() => {
    // Only fetch if categories don't exist in Redux
    if (!categories || categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  // -----------------------------
  // API ERROR HANDLER
  // -----------------------------
  const handleApiError = (err: any) => {
    const result = err?.response;
    const msg =
      result?.data?.message ||
      (result?.status === 400
        ? "Categories Not Found"
        : result?.status === 404
          ? "Invalid Request"
          : "Something went wrong");

    toast.error(msg);
  };

  const chunkIntoRows = (arr: any[], size = 4) => {
    const rows = [];
    for (let i = 0; i < arr.length; i += size) {
      rows.push(arr.slice(i, i + size));
    }
    return rows;
  };


const MobileRowCarousel = ({ items }: { items: any[] }) => {
  const shouldAutoSlide = items.length >= 4;

  // Only duplicate when auto sliding
  const marqueeItems = shouldAutoSlide
    ? [...items, ...items, ...items]
    : items;

  return (
    <div className="lg:hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={6}
        loop={false}
        allowTouchMove={false}
        autoplay={
          shouldAutoSlide
            ? {
                delay: 0, // continuous
                disableOnInteraction: false,
              }
            : false
        }
        speed={shouldAutoSlide ? 5000 : 0}
        className="w-full"
      >
        {marqueeItems.map((cat: any, index: number) => (
          <SwiperSlide
            key={`${cat._id}-${index}`}
            className="!w-auto"
          >
            <CategoryCard category={cat} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};



  // -----------------------------
  // FETCH CATEGORY DATA
  // -----------------------------
  const fetchCategories = async () => {
    try {
      const result: any = await callApi(
        getEndpoint.default.PRODUCTS_CATEGORIES,
        "GET"
      );

      if (!result?.data) {
        handleApiError(result?.errorData);
        return;
      }

      const data = result.data;

    dispatch(saveCategories(data || []));
      dispatch(saveCatTime(new Date()));
    } catch (error) {
      handleApiError(error);
    }
  };

  // -----------------------------
  // CATEGORY CARD
  // -----------------------------
  const CategoryCard = ({ category, index }: any) => (
    <Link
      href={`/products/${category?.parentCategorySlug}/${category?.seoSlug}?scid=${category?._id}`}
    >
      <div className="px-[5px] pb-4 ">
        <div
          className="
    group border border-darkcream rounded-md
    cursor-pointer
    flex flex-col items-center

    w-[115px] h-[150px]
    lg:w-[282px] lg:h-[369px]
    md:w-[170px] md:h-[223px]
    p-[4px] md:pt-[18px] md:px-[11px] md:pb-4 lg:p-4

    lg:hover:bg-primary
    lg:hover:scale-105
    lg:transition-transform lg:duration-300
  "
        >
          <Image
            src={
              category?.image
                ? normalizePath(`${assetURL}/${category.image}`)
                : FALLBACK_IMAGE
            }
            alt={category?.name}
            width={250}
            height={250}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
            className="
  rounded-md object-cover
  w-[103px] h-[103px]
  md:w-[151px] md:h-[151px]
  lg:w-[250px] lg:h-[250px]
"
          />

          <p
            className={`${styles.cattitle} text-[12px] md:text-[14px] lg:text-[18px] font-medium  text-primary lg:group-hover:text-white md:mt-4 mt-1 text-center `}
          >
            {category?.name}
          </p>
        </div>
      </div>
    </Link>
  );

  // -----------------------------
  // CATEGORY SECTION
  // -----------------------------
  const CategorySection = ({ title, data }: any) => {
   // Find correct parent by title
  const parentCategory = data.find(
    (c: any) => c?.name?.toLowerCase() === title.toLowerCase()
  );

  // Extract subCategories (Bricks, Sand, Cement, etc)
  const subCategories = parentCategory?.subCategories || [];
return(
    <div
      className={`px-4 bg-cream lg:max-w-[1440px] mx-auto ${title === "Building Systems"
          ? "lg:px-[100px] p-[20px] lg:py-[0px]"
          : "lg:px-[100px] py-[20px] lg:py-[80px]"
        }`}
    >
      {/* 👇 CENTERED when width > 1440px */}
      <div className="">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
          <h2 className="text-xl lg:text-[43px] lg:text-start text-center text-brown">
            {title}
          </h2>

          {/* <CustomButton
            title="View All"
            className="lg:flex hidden bg-[#109989] rounded-[5px]
            px-[14px] py-[10px] lg:!px-[25px] lg:!py-[10px] h-[53px]

            gap-[12px] text-white text-[14px] lg:text-[18px]"
            rightIcon={<GoArrowRight className="w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]" />}
            onPress={() => router.push("/products")}
          /> */}
        </div>

        <hr className="border-t border-primary mx-auto mt-[21px] mb-[10px] lg:mb-9" />

        {/* Mobile */}
        {/* {chunkIntoRows(subCategories || []).map((row, idx) => (
          <MobileRowCarousel key={idx} items={row} />
        ))} */}

        {/* Desktop */}
        <div className="grid md:grid-cols-4 grid-cols-3 md:gap-4 lg:px-[20px] md:px-[16px]">
          {subCategories?.map((cat: any, idx: number) => (
            <CategoryCard key={idx} category={cat} />
          ))}
        </div>
      </div>
    </div>
)
  };


  return (
    <>
      <CategorySection title="Building Materials" data={categories} />
      <CategorySection
        title="Building Systems"
        data={categories}
      />
    </>
  );
};

export default CategoryList;
