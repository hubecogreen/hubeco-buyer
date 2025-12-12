"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import BlogCard from "@/components/blogCard/BlogCard";
import * as Webservices from "../../../network/WebServices";
import * as getEndpoint from "../../../network/EndPoints";
import { getCookie } from "cookies-next";

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
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [navReady, setNavReady] = useState(false);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const getData = useCallback((page = 1) => {
    const token = getCookie("token") as string;
    const url = `${getEndpoint.default.BLOGS}?limit=9&${page}`;

    Webservices.callGetApi(url, token)
      .then((response: any) => {
        if (response.data?.data) setBlogs(response.data.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (prevRef.current && nextRef.current) setNavReady(true);
  }, [prevRef.current, nextRef.current]);

  return (
    <>
      {blogs?.length > 0 && (
        <section className="relative px-4 md:p-[100px] py-16 bg-cream">

          <div className="flex flex-col md:flex-row justify-between gap-10">

            {/* LEFT TEXT */}
            <div className="w-full md:w-[450px]">
              <h2 className="text-[32px] md:text-[44px] text-black">
                Blogs
              </h2>
              <p className="text-black text-[22px] md:text-[33px] mt-2 leading-[32px] md:leading-[43px]">
                Inspiring insights for a smarter,{" "}
                <span className="text-primary">greener</span> future
              </p>
            </div>

            {/* SLIDER */}
            <div className="relative w-full md:w-[750px]">

              {/* LEFT ARROW */}
              <button
                ref={prevRef}
                className="
                  absolute 
                  left-[-10px] md:left-[-30px] 
                  top-[50%] md:top-[300px] 
                  -translate-y-1/2 
                  z-20
                  w-[45px] h-[45px] md:w-[70px] md:h-[70px]
                  rounded-full bg-white shadow
                  flex items-center justify-center
                "
              >
                <div
                  className="
                    w-[30px] h-[30px] md:w-[48px] md:h-[48px]
                    rounded-full 
                    border border-gray-500 border-dashed
                    flex items-center justify-center
                  "
                >
                  <span className="text-gray-700 text-lg md:text-xl">←</span>
                </div>
              </button>

              {/* SWIPER */}
              {navReady && (
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={1}
                  breakpoints={{
                    768: { slidesPerView: 2 },
                  }}
                  spaceBetween={20}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onSwiper={(swiper) => {
                    setTimeout(() => {
                      swiper.navigation.init();
                      swiper.navigation.update();
                    });
                  }}
                  className="w-full"
                >
                  {blogs.map((product, index) => (
                    <SwiperSlide key={index} className="!w-auto">
                      <BlogCard product={product} index={index} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* RIGHT ARROW */}
              <button
                ref={nextRef}
                className="
                  absolute 
                  right-[-10px] md:right-[-30px] 
                  top-[50%] md:top-[300px] 
                  -translate-y-1/2 
                  z-20
                  w-[45px] h-[45px] md:w-[70px] md:h-[70px]
                  rounded-full bg-white shadow
                  flex items-center justify-center
                "
              >
                <div
                  className="
                    w-[30px] h-[30px] md:w-[48px] md:h-[48px]
                    rounded-full 
                    border border-gray-500 border-dashed
                    flex items-center justify-center
                  "
                >
                  <span className="text-gray-700 text-lg md:text-xl">→</span>
                </div>
              </button>

            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogsSection;
