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

  const getData = useCallback(() => {
    const token = getCookie("token") as string;
    const url = `${getEndpoint.default.BLOGS}?limit=9&page=1`;

    Webservices.callGetApi(url, token)
      .then((response: any) => {
        if (response.data?.data) setBlogs(response.data.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // Wait until both refs exist before rendering Swiper
  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setNavReady(true);
    }
  }, [prevRef.current, nextRef.current]);

  return (
    <>
      {blogs.length > 0 && (
        <section className="relative p-[100px] flex flex-col bg-cream">
          <div className="flex justify-between">
            {/* LEFT TEXT */}
            <div className="w-[450px]">
              <h2 className="text-[44px] text-black">Blogs</h2>
              <p className="text-black text-[33px] mt-2 leading-[43px]">
                Inspiring insights for a smarter,{" "}
                <span className="text-primary">greener</span> future
              </p>
            </div>

            {/* SLIDER */}
            <div className="relative w-[750px]">

              {/* LEFT ARROW */}
         <button
  ref={prevRef}
  className="
    absolute left-[-30px] top-[300px] -translate-y-1/2 z-20
    w-[70px] h-[70px] rounded-full bg-white 
    flex items-center justify-center
  "
>
  <div
    className="
      w-[48px] h-[48px] rounded-full 
      border border-gray-500 border-dashed
      flex items-center justify-center
    "
  >
    <span className="text-gray-700 text-xl">←</span>
  </div>
</button>





              {/* SWIPER — render only when refs are ready */}
              {navReady && (
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={2}
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
                    <SwiperSlide
                      key={index}
                      className="!w-[350px]  !mr-[15px] !ml-[15px]"
                    >
                      <BlogCard product={product} index={index} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* RIGHT ARROW */}
           

                      <button
    ref={nextRef}
  className="
    absolute right-[-30px] top-[300px] -translate-y-1/2 z-20
    w-[70px] h-[70px] rounded-full bg-white 
    flex items-center justify-center
  "
>
  <div
    className="
      w-[48px] h-[48px] rounded-full 
      border border-gray-500 border-dashed
      flex items-center justify-center
    "
  >
    <span className="text-gray-700 text-xl"> →</span>
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
