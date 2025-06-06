"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import CustomButton from "@/components/customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import styles from "./Category.module.css";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import store from "@/reduxStore";
import { normalizePath } from "@/lib/utils";
import * as getEndpoint from "../../../network/EndPoints";
import toast from "react-hot-toast";
import useApi from "@/components/Fetcher/useAPI";
import CustomLoader from "@/components/sharedComponents/loader";

interface Category {
  _id: string;
  name: string;
  subCategories?: Category[];
  childCategories?: Category[];
}

const CategorySection = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const router = useRouter();
  const { callApi } = useApi();
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  const getCategories = async () => {
    try {
      const result = (await callApi(
        getEndpoint.default.PRODUCTS_CATEGORIES,
        "GET"
      )) as any;
      if (result.data == null) {
        handleApiError(result.errorData);
      } else {
        // Extract all subcategories from all categories
        const allSubCategories = result.data.flatMap((category: Category) => 
          category.subCategories || []
        );
        setSubCategories(allSubCategories);
        setIsDataLoaded(true); 
      }
    } catch (error) {
      handleApiError(error);
    }
  };

    const handleApiError = async (err: any) => {
      const result = err?.response;
      if (result?.status === 400) {
        toast.error("Categories Not Found");
      } else if (result?.status === 404) {
        toast.error("Invalid Request");
      } else {
        toast.error(result?.data?.message);
      }
    };
    
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  const handleMouseEnter = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.autoplay.start();
    }
  };

    useEffect(() => {
      getCategories();
      if (isDataLoaded && swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.update();
      }
    }, [isDataLoaded]);

    console.log("subCategories", subCategories, subCategories.length);
    console.log("isDataLoaded", isDataLoaded);



  return (
    <section className="relative w-full items-center justify-center bg-white overflow-hidden">
      <div className="overflow-hidden bg-[url('/images/home/bg1.png')] bg-contain bg-top bg-no-repeat">
        <div className="flex flex-col items-center  justify-center text-white  px-4 md:px-12">
          <h2
            className={`${styles.textAnimate} text-2xl md:text-3xl font-normal mb-4 text-secondary drop-shadow-md`}
          >
            Welcome to{" "}
            <span className="text-primary font-bold text-3xl md:text-6xl drop-shadow-md">
              hubeco
            </span>
          </h2>
          <h1
            className={`${styles.gradientText} ${styles.textAnimate} text-xl md:text-4xl font-bold mb-4 text-black`}
          >
            Where every choice is a
          </h1>
          <h1
            className={`${styles.gradientText} ${styles.textAnimate} text-xl md:text-4xl font-bold mb-4 text-black`}
          >
            step towards Sustainability
          </h1>
          <CustomButton
            title={"Shop Now"}
            onPress={() => router.push("/products")}
            className="bg-secondary mt-4 px-2 md:px-4 py-2 h-12 md:h-12 md:py-3 w-36 md:w-40 text-white hover:bg-primary"
            customStyles={{}}
            rightIcon={<GoArrowRight />}
          />
        </div>
        <div className="items-center justify-center px-8 text-center z-20 pt-10 md:pt-10">
          <p className="text-md md:text-big mx-auto text-black font-medium pt-5 text-justify md:text-justify max-w-[1390px]">
            At hubeco, we are revolutionizing the way you build. We offer a
            comprehensive range of green building materials to help you create
            eco-friendly, energy efficient, and sustainable structures. Our
            marketplace connects you with top manufacturers and suppliers
            dedicated to delivering high-quality, environmentally responsible
            products.
          </p>
        </div>

        <div
          className="md:w-full w-11/12 mt-20 flex ml-5 md:ml-20 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
            {isDataLoaded && subCategories.length > 0 ? (
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
            autoplay={{ delay: 1000 ,
              pauseOnMouseEnter: true,
              disableOnInteraction: false}}
            loop={true}
            className="swiper-container w-full flex justify-center items-center"
          >
            {subCategories &&
              subCategories?.map((category: any, index: any) => {
                // console.log('cewrbetn',`${assetURL}/${category?.image}`)
                return (
                  <SwiperSlide
                    key={index}
                    className={`w-full category-slide w-full ${styles.categorySlide}`}
                  >
                    <div
                      className="relative hover:cursor-pointer w-full"
                      onClick={() =>
                        router.push(`/products?scid=${category?._id}`)
                      }
                    >
                      <Image
                        src={
                          category?.image
                            ? normalizePath(`${assetURL}/${category?.image}`)
                            : "/images/product-placeholder.jpg"
                        }
                        alt={`Slide ${index}`}
                        width={414}
                        height={414}
                        onError={(e) => {
                          e.currentTarget.src =
                            "images/product-placeholder.jpg";
                        }}
                        loading="lazy"
                        className="object-cover w-[414px] h-[414px] rounded-sm"
                      />

                      <div className="absolute w-[414px] inset-0 flex flex-row justify-between items-end bg-black h-[414px] opacity-20"></div>
                      <div className="absolute w-full inset-0 flex flex-col items-start justify-end text-white bg-opacity-50">
                        <p
                          className={`${styles.cattitle} text-2xl mb-6 text-white font-bold ml-5 z-20 cat-text`}
                        >
                          {category?.name}
                        </p>
                        <CustomButton
                          title={"Shop Now"}
                          onPress={() => router.push(`/products`)}
                          className={`${styles.catButton} px-3 py-2 ml-5 mb-4 h-12 md:h-12 text-white font-semibold z-20 text-sm bg-secondary hover:bg-primary`}
                          customStyles={{
                            width: "150px",
                            border: "1px solid white",
                          }}
                          rightIcon={<GoArrowRight />}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
         ) : (
          <div className="w-full text-center py-10"><CustomLoader/></div>
        )}
        </div>
        <div className="align-center justify-center pt-10 pb-0">
          <CustomButton
            title={"View All Categories"}
            className="px-3 py-2 mx-auto h-12 md:h-12 font-semibold text-white text-sm bg-secondary w-72 hover:bg-primary"
            customStyles={{
              width: "200px",
              alignSelf: "center",
              justifySelf: "center",
              border: "1px solid white",
            }}
            onPress={() => router.push("/categories")}
            rightIcon={<GoArrowRight />}
          />
        </div>
      </div>
    </section>
  );
};

export default CategorySection;


