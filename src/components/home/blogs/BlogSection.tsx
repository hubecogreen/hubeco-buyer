"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CustomButton from "@/components/customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import BlogCard from "@/components/blogCard/BlogCard";
import * as Webservices from "../../../network/WebServices";
import * as getEndpoint from "../../../network/EndPoints";
import { getCookie } from 'cookies-next'
import { useRouter } from "next/navigation";

const baseAPI = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  author: {
    email: string;
    firstName: string;
    lastName: string;
    userId: string;
    userType: string;
    sessionId: string;
    thumbnail: string | null;
    phoneNumber: string;
  };
  createdAt: string;
  updatedAt: string;
  slug: string;
}

const BlogsSection = () => {
  const [blogs, setBlogData] = useState<Blog[]>([]);
  const colors = ["#009886", "#009886", "#009886"]; // Define your colors here
  const [bgColor, setBgColor] = useState(colors[0]);
  const [slidesToShow, setSlidesToShow] = useState(3)
  const router = useRouter()

  // Memoize API data fetching
  const getData = useCallback((page = 1) => {
    const token = getCookie('token') as string  
    const url = `${getEndpoint.default.BLOGS}?limit=9&page=${page}`;
    Webservices.callGetApi(url, token)
      .then(
        (response: {
          data: { data: Blog[]; nextCursor: string | null; totalCount: number; metadata: { totalCount: number; currentPage: number } };
        }) => {
          if (response.data && Array.isArray(response.data.data)) {
            setBlogData(response.data.data);
            if(response.data.data.length != 0 && response.data.data.length == 2) {
              setSlidesToShow(2)
            } else if(response.data.data.length != 0 && response.data.data.length == 1) {
              setSlidesToShow(1)
            } else if(response.data.data.length != 0 && response.data.data.length > 2) {
              setSlidesToShow(3)
            } else {
              setSlidesToShow(1)
            }
          } else {
            // consoleerror("Unexpected response format: ", response);
          }
        }
      )
      .catch((err) => {
        // consoleerror("API call failed: ", err);
      });
  }, []);

  // Memoize navigation handler
  const handleSeeAllBlogs = useCallback(() => {
    router.push('/blogs');
  }, [router]);

  // Memoize swiper content
  const swiperContent = useMemo(() => (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: slidesToShow,
        },
      }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="h-auto flex justify-center md:h-auto md:w-10/12 md:mx-auto max-w-[95%]"
    >
      {blogs.map((src, index) => (
        <SwiperSlide
          key={`${src._id || index}`}
          className="md:w-full w-full h-full"
        >
          <div className="h-full">
            <BlogCard
              key={`${src._id || index}`}
              //@ts-ignore
              product={src}
              index={index} // Pass index for priority loading
              imageStyle={{
                filter: "grayscale(100%)",
                transition: "filter 0.8s ease-in-out",
              }}
              imageHoverStyle={{
                filter: "grayscale(0%)",
              }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  ), [blogs, slidesToShow]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 3000);
    getData();
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [getData]);

  return (
    <>
      {blogs && blogs.length > 0 ? (
        <section
          className="relative w-full items-center justify-center pt-4 md:pt-[50px] mobile-sm:mt-4 transition-bg ease-in-out duration-1000 bg-[url('/images/home/wavesBglight.webp')] bg-contain bg-no-repeat bg-center"
          style={{ backgroundColor: bgColor }}
        >
          <div className="pb-10">
            <div className="items-center justify-center px-8 text-center z-20 md:pt-20 pt-4">
              <h2 className="text-4xl font-bold mb-4 text-white mt-30">
                Blogs & News
              </h2>
            </div>
          </div>
        
          {swiperContent}
        
          <div className="flex flex-row justify-evenly items-center mx-auto max-w-[90%]">
            {/* Uncomment below if you want to use the grid layout instead */}
            {/* {blogs.map((product, index) => (
              <BlogCard key={index} product={product} />
            ))} */}
          </div>
        
          <div className="flex justify-center items-center md:py-10 py-4">
            <CustomButton
              title="See all Blogs and News"
              className="px-3 py-3 mx-auto h-12 md:h-12 font-semibold bg-secondary hover:bg-primary2 text-sm w-72 text-white border border-white"
              onPress={handleSeeAllBlogs}
              rightIcon={<GoArrowRight />}
            />
          </div>
        </section>
      ) : <></>}
    </>
  );
};

export default BlogsSection;
