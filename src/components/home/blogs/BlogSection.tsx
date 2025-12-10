"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// ✅ Correct Swiper v11 import
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import BlogCard from "@/components/blogCard/BlogCard";
import * as Webservices from "../../../network/WebServices";
import * as getEndpoint from "../../../network/EndPoints";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  description: string;
  metaKeywords: string;
  metaDescriptions: string;
  content: string;
  thumbnail: string;
  status: string;
  isActive: boolean;
  author: any;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

const BlogsSection = () => {
  const [blogs, setBlogData] = useState<Blog[]>([]);
  const router = useRouter();

  // Swiper button refs
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const getData = useCallback(() => {
    const token = getCookie("token") as string;
    const url = `${getEndpoint.default.BLOGS}?limit=9&page=1`;

    Webservices.callGetApi(url, token)
      .then((response: any) => {
        if (response.data?.data) {
          setBlogData(response.data.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {blogs.length > 0 && (
        <section className="relative w-full  flex flex-col items-center bg-cream">
          <div className="flex justify-between m-[100px] ">
            
            {/* LEFT TEXT */}
            <div className="w-[450px]">
              <h2 className="text-[44px] text-black font-semibold">Blogs</h2>
              <p className="text-black text-[33px] mt-2 leading-[28px]">
                Inspiring insights for a smarter,{" "}
                <span className="text-primary">greener</span> future
              </p>
            </div>

            {/* SLIDER */}
            <div className="relative w-[750px]">

              {/* LEFT ARROW */}
              <button
                ref={prevRef}
                className="absolute left-0 top-1/2 -translate-y-1/2 
                -translate-x-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md 
                flex items-center justify-center"
              >
                ←
              </button>

              {/* SWIPER */}
              {/* SWIPER */}
<Swiper
  modules={[Navigation]}
  slidesPerView={2}
  spaceBetween={20}
  onBeforeInit={(swiper) => {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
  }}
  navigation={{
    prevEl: prevRef.current,
    nextEl: nextRef.current,
  }}
  onSwiper={(swiper) => {
    // ensure refs are assigned AFTER Swiper is ready
    setTimeout(() => {
      swiper.navigation.init();
      swiper.navigation.update();
    });
  }}
  className="w-full"
>

                {blogs.map((product, index) => (
                  <SwiperSlide key={index} className="!w-[350px] !h-[470x] !mr-[30px]">
                    <BlogCard product={product} index={index} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* RIGHT ARROW */}
              <button
                ref={nextRef}
                className="absolute right-0 top-1/2 -translate-y-1/2 
                translate-x-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md 
                flex items-center justify-center"
              >
                →
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogsSection;
