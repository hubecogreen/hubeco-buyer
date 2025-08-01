"use client";
// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
// import ImageSlider from "@/components/home/imageCarousel/Swiper";
// import CategorySection from "@/components/home/categories/Category";
// import FeaturedProducts from "@/components/home/featured/FeaturedProducts";
// import BrandsSection from "@/components/home/brands/BrandsSection";
// import ProjectsSection from "@/components/home/projects/ProjectSection";
// import BlogsSection from "@/components/home/blogs/BlogSection";
// import Head from "next/head";
// import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { useEffect, useState } from "react";
import useClient from "../hooks/useClient";
// import WorksSection from "@/components/home/works/Works";

export default function Home() {
  const images = [
    "/images/home/bannerNew.webp",
    "/images/home/bannerNew.webp",
    "/images/home/bannerNew.webp",
    // Add more image paths here
  ];

  const [showScrollBottom, setShowScrollBottom] = useState(true);

  const isClient = useClient()
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
  
  
  
    
      

    </div>
  );
}
