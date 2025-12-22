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
  saveBuildingSystemCategories,
  saveCategories,
  saveCatTime,
} from "@/reduxStore/slices/masterDataSlice";
import { normalizePath } from "@/lib/utils";

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
    fetchCategories();
  }, []);

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

      // 1️⃣ Default Categories
      const defaultCategory = data?.[0];

      const formattedCategories =
        defaultCategory?.subCategories?.map((sub: any) => ({
          ...sub,
          parentCategoryName: defaultCategory.name,
          parentCategorySlug: defaultCategory.seoSlug,
        })) || [];

      dispatch(saveCategories(formattedCategories));

      // 2️⃣ Building System Categories
      const buildingSystemParent = data.find((c: any) => {
        const name = c?.name?.toLowerCase();
        return name === "building systems" || name === "building system";
      });

      const formattedBuildingSystems =
        buildingSystemParent?.subCategories?.map((sub: any) => ({
          ...sub,
          parentCategoryName: buildingSystemParent?.name,
          parentCategorySlug: buildingSystemParent?.seoSlug,
        })) || [];

      dispatch(saveBuildingSystemCategories(formattedBuildingSystems));
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
      <div className="group border rounded-md flex flex-col cursor-pointer hover:bg-primary transition-transform duration-300 hover:scale-105 w-[260px] h-[340px] p-4">
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
          className="rounded-md object-cover h-[250px] w-full"
        />

        <p
          className={`${styles.cattitle} text-[18px] font-medium text-primary mt-4 text-center group-hover:text-white`}
        >
          {category?.name}
        </p>
      </div>
    </Link>
  );

  // -----------------------------
  // CATEGORY SECTION
  // -----------------------------
  const CategorySection = ({ title, data }: any) => (
    <div
      className={`px-4 bg-cream flex justify-center ${
        title === "Building Systems"
          ? "md:px-[100px] md:pb-[100px] md:pt-[43px] p-[20px]"
          : "md:p-[100px] p-[20px]"
      }`}
    >
      <div className="md:max-w-[1440px] ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between  gap-4 ">
        <h2 className="text-xl md:text-[43px] md:text-start text-center text-brown ">{title}</h2>

        <CustomButton
          title="View All"
          className=" md:flex hidden 
            bg-[#109989]
            rounded-[5px]
            px-[14px] py-[10px]
            md:!px-[20px] md:!py-[10px]
            gap-[12px]
            text-white
            text-[14px]
            md:text-[18px]
            capitalize
            w-fit
          "
          rightIcon={
            <GoArrowRight className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
          }
          onPress={() => router.push("/products")}
        />
      </div>

      <hr className="border-t border-primary mx-auto mt-5 mb-6 md:mb-9" />

      {/* Mobile Scroll / Desktop Grid */}
      <div
        className="
          flex gap-4 overflow-x-auto pb-4
          snap-x snap-mandatory
          scrollbar-hide
          md:grid md:grid-cols-4 md:gap-8 md:overflow-visible
        "
      >
        {data?.map((cat: any, idx: number) => (
          <div key={idx} className="snap-start shrink-0 md:shrink">
            <CategoryCard category={cat} index={idx} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data?.length === 0 && (
        <>
          <LottieWrapper
            animationData={animationData}
            loop
            className="flex mx-auto justify-center items-center w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
          />
          <p className="text-center text-fontGray mt-4 text-base md:text-lg font-bold">
            No Categories Found.
          </p>
        </>
      )}
      </div>
    </div>
  );

  return (
    <>
      <CategorySection title="Building Materials" data={categories} />
      <CategorySection
        title="Building Systems"
        data={buildingSystemCategories}
      />
    </>
  );
};

export default CategoryList;
