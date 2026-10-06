"use client";

import React, { useEffect, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import BlogCard from "@/components/blogCard/BlogCard";
import * as Webservices from "../../../network/WebServices";
import * as getEndpoint from "../../../network/EndPoints";
import { getCookie } from "cookies-next";
import Image from "next/image";


interface Blog {
  _id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  slug: string;
}

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // const getData = useCallback(() => {
  //   const token = getCookie("token");
  //   const url = `${getEndpoint.default.BLOGS}`;

  //   Webservices.callGetApi(url, token || undefined)
  //     .then((res: any) => {
  //       if (Array.isArray(res?.data?.data)) {
  //         setBlogs(res.data.data);
  //       }
  //     })
  //     .catch(console.error);
  // }, []);

  const getData = useCallback(async () => {
  const token = getCookie("token");

  try {
    // Get the first page
    const firstUrl = `${getEndpoint.default.BLOGS}?page=1`;

    const firstResponse: any = await Webservices.callGetApi(
      firstUrl,
      token || undefined
    );

    const firstBlogs = Array.isArray(firstResponse?.data?.data)
      ? firstResponse.data.data
      : [];

    const totalPages = firstResponse?.data?.metadata?.totalPages || 1;

    // If there are more pages, fetch them too
    const remainingRequests = [];

    for (let page = 2; page <= totalPages; page++) {
      const url = `${getEndpoint.default.BLOGS}?page=${page}`;

      remainingRequests.push(
        Webservices.callGetApi(url, token || undefined)
      );
    }

    const remainingResponses = await Promise.all(remainingRequests);

    const remainingBlogs = remainingResponses.flatMap((response: any) =>
      Array.isArray(response?.data?.data) ? response.data.data : []
    );

    // Combine all pages
    setBlogs([...firstBlogs, ...remainingBlogs]);
  } catch (error) {
    console.error(error);
  }
}, []);

  useEffect(() => {
    getData();
  }, [getData]);

  if (blogs.length === 0) return null;

  return (
    <section className="relative px-5  py-8 lg:py-0 bg-cream">
      <div className="flex flex-col lg:flex-row justify-between gap-10  lg:max-w-[1440px] lg:px-[100px] lg:py-[40px] mx-auto">

        {/* LEFT CONTENT */}
        <div className="w-full lg:w-[450px]">
          <h2 className="text-center lg:text-left text-[32px] lg:text-[44px] text-brown mb-[8px]">
            Blogs
          </h2>
          <p className="text-brown text-[22px] lg:text-[33px] mt-2 text-center lg:text-left ">
            Inspiring insights for a smarter{" "}
            <span className="text-primary">greener</span> future
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative w-full lg:w-[750px]">

          {/* LEFT ARROW */}
          <button
            className="swiper-button-prev-custom absolute lg:left-[-30px] left-[-10px] top-1/2 
                       -translate-y-1/2 z-20 lg:w-[70px] lg:h-[70px] w-[60px] h-[60px]
                       rounded-full bg-cream shadow flex items-center justify-center"
          >
            <Image
              src="/images/blogs/left.png"
              alt="Previous"
              width={90}
              height={90}
            />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={true}
            speed={800}
            watchSlidesProgress
            observer={true}
            observeParents={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false, // 👈 key
              pauseOnMouseEnter: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            className="w-full"
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog._id}>
                <BlogCard product={blog} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* RIGHT ARROW */}
          <button
            className="swiper-button-next-custom absolute lg:right-[-30px] right-[-10px]  top-1/2 
                       -translate-y-1/2 z-20 lg:w-[70px] lg:h-[70px] w-[60px] h-[60px]
                       rounded-full bg-cream shadow flex items-center justify-center
                       "
          >
            <Image
              src="/images/blogs/right.png"
              alt="Previous"
              width={90}
              height={90}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
