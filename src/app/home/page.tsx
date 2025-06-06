"use client";
// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
import ImageSlider from "@/components/home/imageCarousel/Swiper";
import CategorySection from "@/components/home/categories/Category";
import FeaturedProducts from "@/components/home/featured/FeaturedProducts";
import BrandsSection from "@/components/home/brands/BrandsSection";
import ProjectsSection from "@/components/home/projects/ProjectSection";
import BlogsSection from "@/components/home/blogs/BlogSection";
// import Head from "next/head";
// import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { useEffect, useState } from "react";
import WorksSection from "@/components/home/works/Works";
import useClient from "@/components/hooks/useClient";

export default function Home() {
  const isClient = useClient()
  
  const images = [
    "/images/home/bannerNew.png",
    "/images/home/bannerNew.png",
    "/images/home/bannerNew.png",
    // Add more image paths here
  ];

  const [showScrollBottom, setShowScrollBottom] = useState(true);

  const handleScroll = () => {
    if (
      window.scrollY <
      window.innerHeight *
        (document.documentElement.scrollHeight / window.innerHeight - 1)
    ) {
      setShowScrollBottom(true);
    } else {
      setShowScrollBottom(false);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight - window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if(!isClient)
    return <></>

  return (
    <div className="bg-white">
      {/* <Head>
        <title>Home | Hubeco Buyer</title>
      </Head> */}

      {/* <Header /> */}
      <div className="banner-section mx-auto h-64 md:h-full">
        <ImageSlider />
      </div>

      <div className="category-section md:pt-20 pt-10 mx-auto pb-10">
        <CategorySection />
      </div>
      <div className="featured-section mx-auto pb-10 md:max-w-full">
        <FeaturedProducts />
      </div>
      <div
        className="brands-section  mx-auto  "
        // style={{ "border-bottom": "1px solid #f3f3f3" }}
      >
        <BrandsSection />
      </div>
      <div
        className="works-section  mx-auto  "
        // style={{ "border-bottom": "1px solid #f3f3f3" }}
      >
        <WorksSection />
      </div>
      <div className="projects-section mx-auto relative bg-cover bg-no-repeat bg-top pt-[30px] bg-[url('/images/home/bg5.png')]">
        <ProjectsSection />
      </div>

      <div
        className="blogs-section  mx-auto "
        // style={{ "border-bottom": "1px solid #f3f3f3" }}
      >
        <BlogsSection />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
