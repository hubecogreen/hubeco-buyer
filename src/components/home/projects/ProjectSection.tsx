// components/IntroSection.js
"use client";
import React, { useRef, useCallback, useMemo } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CustomButton from "@/components/customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import ProductCard from "@/components/productCard/ProductCard";
import Image from "next/image";
import styles from "./ImageGrid.module.css";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";

const ProjectsSection = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const router = useRouter();

  // Memoize products data to prevent recreation
  const products = useMemo(() => [
    {
      title: "Agrocrete",
      category: "blog",
      image: "/images/projects/project10.webp",
    },
    {
      title: "Aggregrates",
      category: "blog",
      image: "/images/projects/project2.webp",
    },
    {
      title: "Sand",
      category: "news",
      image: "/images/projects/project3a.webp",
    },
    {
      title: "Greenboards",
      category: "article",
      image: "/images/projects/project4.webp",
    },
  ], []);

  // Memoize mouse event handlers
  const handleMouseEnter = useCallback(() => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.autoplay.stop();
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.autoplay.start();
    }
  }, []);

  // Memoize navigation handler
  const handleViewAllProjects = useCallback(() => {
    router.push('/projects');
  }, [router]);

  // Memoize desktop grid content
  const desktopGridContent = useMemo(() => (
    <div className="lg:flex hidden">
      <div className={`${styles.container3}`}>
        <div className={`${styles.gridItem}`}>
          <Image
            src="/images/projects/project10.webp"
            alt="Agrocrete green building project"
            className="rounded-md w-full h-auto object-cover"
            onError={e => {
              e.currentTarget.src = '/images/product-placeholder.webp'
            }}
            loading="lazy"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            width={600}
            height={600}
          />
        </div>
        <div className={`${styles.gridItem}`}>
          <Image
            src="/images/projects/project2.webp"
            alt="Aggregates green building project"
            className="rounded-md w-full h-auto object-cover"
            onError={e => {
              e.currentTarget.src = '/images/product-placeholder.webp'
            }}
            loading="lazy"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            width={600}
            height={600}
          />
        </div>
        <div className={`${styles.gridItem}`}>
          <Image
            src="/images/projects/project3a.webp"
            alt="Sand green building project"
            className="rounded-md w-full h-auto object-cover"
            onError={e => {
              e.currentTarget.src = '/images/product-placeholder.webp'
            }}
            loading="lazy"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            width={600}
            height={600}
          />
        </div>
        <div className={`${styles.gridItem}`}>
          <Image
            src="/images/projects/project4.webp"
            alt="Greenboards green building project"
            className="rounded-md w-full h-auto object-cover"
            onError={e => {
              e.currentTarget.src = '/images/product-placeholder.webp'
            }}
            loading="lazy"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  ), []);

  // Memoize mobile swiper content
  const mobileSwiperContent = useMemo(() => (
    <div
      className="lg:w-full w-11/12 lg:mt-20 mt-4 flex ml-5 lg:ml-20 overflow-hidden block lg:hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        ref={swiperRef}
        spaceBetween={15}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 3.4,
          },
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 1000 }}
        loop={true}
        className="swiper-container"
      >
        {products && products?.map((product: any, index: any) => (
          <SwiperSlide
            key={`${product.title}-${index}`}
            className={`w-full category-slide ${styles.categorySlide}`}
          >
            <div className="relative w-full">
              <Image
                src={product?.image}
                alt={`${product?.title || 'Green project'} - ${product?.category || 'project'}`}
                height={500}
                width={500}
                priority={index < 3} // Prioritize first 3 images for LCP
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                onError={e => {
                  e.currentTarget.src = '/images/product-placeholder.webp';
                }}
                loading={index < 3 ? "eager" : "lazy"}
                className={`${styles.catImg} object-cover w-full h-full rounded-md`}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ), [products, handleMouseEnter, handleMouseLeave]);

  return (
    <section
      className="relative w-full lg:w-[80%] w-[98%] items-center justify-center mx-auto projectsGrid"
    >
      {/* <div className="pb-2 lg:pb-10">
        <div className="items-center justify-center px-8 text-center z-20 lg:pt-7">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-brown mt-30">
            Green Projects
          </h2>
          <p className="lg:text-big text-md w-full lg:max-w-5xl mx-auto text-brown lg:pt-5">
            Browse the green building projects where our eco-friendly materials
            are deployed
          </p>
        </div>
      </div>
      
      {desktopGridContent}
      {mobileSwiperContent} */}
      
      {/* <div className=" align-center justify-center md:mt-0 mt-10 py-10">
        <CustomButton
          title={"View All Projects"}
          className="px-3 py-3 mx-auto h-12 md:h-12 font-semibold text-sm bg-secondary w-72 text-white  hover:bg-primary"
          customStyles={{
            width: "200px",
            alignSelf: "center",
            justifySelf: "center",
            border: "1px solid white",
          }}
          onPress={handleViewAllProjects}
          rightIcon={<GoArrowRight />}
        />
      </div> */}
    </section>
  );
};

export default ProjectsSection;
