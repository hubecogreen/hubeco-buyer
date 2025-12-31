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

  const chunkIntoRows = (arr: any[], size = 4) => {
    const rows = [];
    for (let i = 0; i < arr.length; i += size) {
      rows.push(arr.slice(i, i + size));
    }
    return rows;
  };
  const MobileRowCarousel = ({ items }: { items: any[] }) => {
    const rowRef = React.useRef<HTMLDivElement | null>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(items.length === 4);

    const CARD_WIDTH = 110; // REQUIRED
    const SCROLL_BY = CARD_WIDTH;
    
    useEffect(() => {
      if (!rowRef.current) return;

      const container = rowRef.current;

      const interval = setInterval(() => {
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;

        // reached end → go back to start
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: SCROLL_BY, behavior: "smooth" });
        }
      }, 2500); // 2.5s

      return () => clearInterval(interval);
    }, []);


    const onScroll = () => {
      if (!rowRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;

      setShowLeft(scrollLeft > 2);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 2);
    };

    const scroll = (dir: "left" | "right") => {
      if (!rowRef.current) return;
      rowRef.current.scrollBy({
        left: dir === "left" ? -SCROLL_BY : SCROLL_BY,
        behavior: "smooth",
      });
    };

    return (
      <div className="relative lg:hidden  ">
        {/* LEFT ARROW */}
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="
    absolute left-[10px] top-1/2 -translate-y-1/2 z-20
    w-[40px] h-[40px]
    rounded-full
    bg-black/20
    flex items-center justify-center
    
  "
          >
            <Image
              src="https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg"
              alt="prev"
              width={40}
              height={40}
            />
          </button>
        )}

        {/* RIGHT ARROW */}
        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="
    absolute right-[10px] top-1/2 -translate-y-1/2 z-20
    w-[40px] h-[40px]
    rounded-full
    bg-black/20
    flex items-center justify-center
    
  "
          >
            <Image
              src="https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg"
              alt="next"
              width={40}
              height={40}
            />
          </button>
        )}

        {/* ROW */}
        <div
          ref={rowRef}
          onScroll={onScroll}
          className="
          flex gap-[6px]
          overflow-x-auto
          scrollbar-hide
        "
          style={{
            width: '100%',
            // height: "142px",
            overflow: 'hidden'
          }}
        >
          {items.map((cat: any) => (
            <div key={cat._id} className="shrink-0">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
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
      <div className="px-[5px] pb-4 ">
        <div
          className="
    group border border-darkcream rounded-md
    cursor-pointer
    flex flex-col items-center

    w-[95px] h-[124px]
    lg:w-[282px] lg:h-[369px]
    md:w-[195px] md:h-[255px]
    p-[4px] lg:p-4

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
  w-[84px] h-[84px]
  md:w-[173px] md:h-[173px]
  lg:w-[250px] lg:h-[250px]
"
          />

          <p
            className={`${styles.cattitle} text-[8px] lg:text-[18px] font-medium  text-primary group-hover:text-white mt-4 text-center `}
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
  const CategorySection = ({ title, data }: any) => (
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

          <CustomButton
            title="View All"
            className="lg:flex hidden bg-[#109989] rounded-[5px]
            px-[14px] py-[10px] lg:!px-[25px] lg:!py-[10px] h-[53px]

            gap-[12px] text-white text-[14px] lg:text-[18px]"
            rightIcon={<GoArrowRight className="w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]" />}
            onPress={() => router.push("/products")}
          />
        </div>

        <hr className="border-t border-primary mx-auto mt-[21px] mb-[10px] lg:mb-9" />

        {/* Mobile */}
        {chunkIntoRows(data || []).map((row, idx) => (
          <MobileRowCarousel key={idx} items={row} />
        ))}

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4 lg:px-[20px]">
          {data?.map((cat: any, idx: number) => (
            <CategoryCard key={idx} category={cat} />
          ))}
        </div>
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
