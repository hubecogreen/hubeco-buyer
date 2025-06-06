"use client";
import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import CustomButton from "@/components/customButton/CustomButton";
// import { GoArrowRight } from "react-icons/go";
// import BlogCard from "@/components/blogCard/BlogCard";
// import { headers } from "next/headers";
import Image from "next/image";
const WorksSection = () => {
const [showBuyer,setShowBuyer]=useState<boolean>(true)

//   const colors = ["#009886", "#009886", "#009886"]; // Define your colors here
//   const [bgColor, setBgColor] = useState(colors[0]);



  return (
    <section
  className="md:flex block max-w-7xl md:my-14 my-4 px-5 pb-8 md:pb-0 shadow-md mx-auto items-start h-fit justify-center border border-[#dcdcdc] bg-[#F4F4F4]"
>

  <div className="md:w-1/2 md:pt-14 pt-8 pr-2 md:pr-10 md:border-r md:border-[#eaeaea] md:border-solid" >
  <div className="md:pl-20">
  <h1 className="text-center md:text-left text-2xl pt-5 md:text-4xl font-bold text-black mt-30">
  How it works
          </h1>
          <p className="md:text-big text-md text-justify md:text-justify pt-5 mx-auto md:pr-[15px] text-fontGray " >
          We are passionate about driving the transition towards sustainable living by providing eco-friendly construction materials for both B2B and B2C markets. 
          </p>
          <div className="relative flex md:block items-center justify-start mb-5 md:mb-0 z-20 mt-10" >
          <h1
            className={`md:text-6xl text-xl hover:cursor-pointer ${showBuyer ? 'border-b-2 border-secondary border-solid' : 'border-0'} md:border-0 pb-2 md:pb-0 font-bold ${showBuyer ? 'text-[#A92449]' : 'text-[#C7C6C7]'}`}
            onClick={() => { setShowBuyer(true); console.log('first'); }}
          >
            Buyer
          </h1>
            <p></p>
            <h1
              className={`md:text-6xl text-xl hover:cursor-pointer ${!showBuyer ? 'border-b-2 border-secondary border-solid' : 'border-0'} md:border-0 pb-2 md:pb-0 font-bold md:mt-10 md:ml-0 ml-10 ${!showBuyer ? 'text-[#A92449]' : 'text-[#C7C6C7]'}`}
              onClick={() => { setShowBuyer(false); console.log('second'); }}
            >
              Vendor
            </h1>
                      
          </div>
          
          </div>
          <Image 
          src={'/images/home/latest/Vector.png'} 
          alt="User add"
          className="hidden  md:block w-full -mt-10" 
          width={50}
          height={50}
          onError={e => {
            e.currentTarget.src = '/images/product-placeholder.jpg'
          }}
          loading="lazy"
           />
  </div>
  <div className="md:w-1/2 md:pr-20 md:pl-10 md:pt-14 pt-8">
  <Image 
  src={'/images/home/latest/worksImg.jpg'} className="rounded-md" 
  alt="User add"
  width={500}
  height={500}
   onError={e => {
    e.currentTarget.src = '/images/product-placeholder.jpg'
  }}
  loading="lazy"
  />
  <div className="  w-full  ">
    {showBuyer?
                (<div className="flex flex-col space-y-4  pt-5">
                  <div className="flex items-start items-start mt-4 lg:mt-4">
                    <div className="p-1.5 rounded-md h-10  flex items-center justify-center">
                      <Image
                        src="/images/home/latest/browse-products.png"
                        alt="User add"
                      
                        // width={38}
                        // height={38}
                        // className="w-16 md:w-10"
                        width={45}
                        height={45}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-bold text-sm md:text-base text-black">
                      Browse Products
                      </h6>
                      <p className="text-justify text-sm text-medium mt-2 text-black">
                      Explore our wide range of green building materials, each carefully selected for sustainability and performance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start items-start">
                    <div className="p-1.5 pt-0 rounded-md h-10 flex items-center justify-center">
                      <Image
                        src="/images/home/latest/compare.png"
                        alt="User Verify"
                      // className="w-16 md:w-10"
                        width={50}
                        height={50}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 pl-[4px] flex flex-col mb-2">
                      <h6 className="font-bold text-sm md:text-base text-black">
                      Compare and Choose
                      </h6>
                      <p className="text-justify text-sm text-medium mt-2 text-black">
                      Use our platform to compare products, read green certifications and specifications, read reviews, and select the best materials for your project.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start items-start">
                    <div className="p-1.5 pt-0 rounded-md h-10 flex items-center justify-center">
                      <Image
                        src="/images/home/latest/place-order.png"
                        alt="Set up"
                        width={55}
                        height={55}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
                        }}
                        loading="lazy"
                        // className="w-16 md:w-10"
                      />
                    </div>
                    <div className="ml-3 flex flex-col mb-2">
                      <h6 className="font-bold text-sm md:text-base text-black">
                      Place Your Order
                      </h6>
                      <p className="text-justify text-sm text-medium mt-2 text-black">
                      Enjoy a seamless shopping experience with secure payment options and efficient delivery services from the vendors.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start items-start">
                    <div className="p-1.5 pt-0 rounded-md h-10 flex items-center justify-center">
                      <Image
                        src="/images/home/latest/sustainability.png"
                        alt="Set up"
                        width={45}
                        height={45}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
                        }}
                        loading="lazy"
                        // className="w-16 md:w-8"
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-bold text-sm md:text-base text-black">
                      Build Sustainably
                      </h6>
                      <p className="text-justify text-sm text-medium mt-2 text-black">
                      Use our materials to create eco-friendly structures that benefit both the environment and your bottom line.
                      </p>
                    </div>
                  </div>
                
                </div>
                )
                :  
                (
            <div className="flex flex-col space-y-4  pt-5">
                  <div className="flex items-start mt-4 lg:mt-4">
                  <div className="p-1.5 pt-0 rounded-md h-10  flex items-center justify-center">
                      <Image
                        src="/images/home/latest/register.png"
                        alt="User add"
                        width={30}
                        height={30}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
                        }}
                        loading="lazy"
                        // className="w-16 md:w-10"
                        // width={28}
                        // height={28}
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-bold text-sm md:text-base text-black">
                      Registration
                      </h6>
                      <p className="text-justify text-sm text-medium mt-2 text-black">
                      Sign up quickly with our simple registration process to become a vendor on our platform.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-1.5 pt-0 rounded-md h-10 flex items-center justify-center">
                      <Image
                        src="/images/home/latest/cubes.png"
                        alt="User Verify"
                        // className="w-12 md:w-12"
                        width={40}
                        height={40}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-bold text-sm md:text-base text-black">
                      Upload products
                      </h6>
                      <p className="text-justify text-sm text-medium mt-2 text-black">
                      Easily list your products with detailed specifications, sustainability data, product certifications, images and prices.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-1.5 pl-[5px] pt-0 rounded-md h-10 flex items-center justify-center">
                      <Image
                        src="/images/home/latest/sell.png"
                        alt="Set up"
                        // className="w-16 md:w-12"
                        width={38}
                        height={38}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-3 flex flex-col mb-2">
                      <h6 className="font-bold text-sm md:text-base text-black">
                        Start Selling
                      </h6>
                      <p className="text-justify text-sm text-medium mt-2 text-black">
                      Begin selling to a wide audience and manage your orders effortlessly from your vendor dashboard.
                      </p>
                    </div>
                  </div>
                


            
              </div>)
              }
              </div>
</div>

      
    </section>
  );
};

export default WorksSection;
