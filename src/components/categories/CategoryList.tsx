"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
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

  const [searchTerm, setSearchTerm] = useState("");

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

      // -------------------------------------
      // 1) NORMAL CATEGORIES (first category)
      // -------------------------------------
      const defaultCategory = data?.[0];

      const subCategoriesWithParent =
        defaultCategory?.subCategories?.map((sub: any) => ({
          ...sub,
          parentCategoryName: defaultCategory.name,
          parentCategorySlug: defaultCategory.seoSlug,
        })) || [];

      dispatch(saveCategories(subCategoriesWithParent));

      // -------------------------------------
      // 2) BUILDING SYSTEM CATEGORIES
      // -------------------------------------
      const buildingSystemParent = data.find((c: any) => {
        const name = c?.name?.toLowerCase();
        return name === "building systems" || name === "building system";
      });

      const buildingSystemsFormatted =
        buildingSystemParent?.subCategories?.map((sub: any) => ({
          ...sub,
          parentCategoryName: buildingSystemParent?.name,
          parentCategorySlug: buildingSystemParent?.seoSlug,
        })) || [];

      dispatch(saveBuildingSystemCategories(buildingSystemsFormatted));
      dispatch(saveCatTime(new Date()));
    } catch (error) {
      handleApiError(error);
    }
  };

  const CategoryCard = ({ category, index }: any) => (
    <Link
      key={index}
      href={`/products/${category?.parentCategorySlug}/${category?.seoSlug}?scid=${category?._id}`}
    >
     <div className="group border rounded-md flex flex-col items-start justify-start cursor-pointer hover:bg-primary transform transition-transform duration-300 hover:scale-105 w-[282px] h-[350px] pt-[16px] px-[16px]">
  <Image
    src={
      category?.image
        ? normalizePath(`${assetURL}/${category.image}`)
        : FALLBACK_IMAGE
    }
    alt={`Slide ${index}`}
    width={250}
    height={250}
    onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
    loading="lazy"
    className="rounded-[5px] object-cover bg-black h-[250px] w-[250px]"
  />

  <p
    className={`${styles.cattitle} text-[19px] font-medium text-primary mt-[20px] mx-[32px] pb-[20px] group-hover:text-white`}
  >
    {category?.name}
  </p>
</div>

    </Link>
  );

  // -----------------------------
  // REUSABLE SECTION
  // -----------------------------
  const CategorySection = ({ title, data }: any) => (
    <div className={`px-4  ${title=="Building Systems" ? "md:px-[100px] md:pb-[100px] md:pt-[43px]" : "md:p-[100px]"}  bg-cream`}>
      <div className="block md:flex md:justify-between items-center">
        <h2 className="text-primary text-2xl md:text-[43px]">{title}</h2>

        <CustomButton
          title="Shop Now"
          className="ml-3 bg-primary hover:bg-white hover:text-primary h-12 md:w-48 w-30 md:text-md text-sm text-white"
          rightIcon={<GoArrowRight />}
          onPress={() => router.push("/products")}
        />
      </div>

      <hr className="border-t-[1px] border-primary mx-auto mt-[21px] mb-[36px]" />

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.map((cat: any, idx: number) => (
          <CategoryCard category={cat} index={idx} key={idx} />
        ))}
      </div>

      {data?.length === 0 && (
        <>
          <LottieWrapper
            animationData={animationData}
            loop
            className="flex mx-auto justify-center items-center w-[400px] h-[400px]"
          />
          <p className="text-center text-fontGray mt-4 text-lg font-bold">
            No Categories Found.
          </p>
        </>
      )}
    </div>
  );

  return (
    <>
      <CategorySection title="Building Materials" data={categories} />
      <CategorySection title="Building Systems" data={buildingSystemCategories} />
    </>
  );
};

export default CategoryList;
