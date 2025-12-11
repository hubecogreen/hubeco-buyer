"use client";
import React, { useState, useCallback, useMemo } from "react";
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
import CustomButton from "@/components/customButton/CustomButton";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";


const WorksSection = () => {
  const [showBuyer, setShowBuyer] = useState<boolean>(true);

  // Memoize click handlers
  const handleBuyerClick = useCallback(() => {
    setShowBuyer(true);
  }, []);

  const handleVendorClick = useCallback(() => {
    setShowBuyer(false);
  }, []);

  // Memoize buyer content to prevent re-rendering
const buyerContent = useMemo(
  () => (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-5 ">

  {/* BOX 1 */}
  <div className="flex items-start  px-5 pt-10 pb-5 rounded-xl border-2 border-primary hover:shadow-md transition h-[330px] w-[290px]">
    <div className="flex flex-col gap-5">
      <Image src="/images/home/howitwork/search-icon.png" alt="search-icon" height={52} width={52}/>
      <h6 className="font-medium  text-[22px] text-black">Browse Products</h6>
      <p className="text-[18px]  leading-6  text-lightGraytext">
        Filter products using 
        material type, specifications, or browse 
        organized product categories.
      </p>
    </div>
  </div>

  {/* BOX 2 */}
  <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-primary hover:shadow-md transition h-[330px] w-[290px]">
    <div className="flex flex-col gap-5">
      <Image src="/images/home/howitwork/correct-icon.png" alt="correct-icon" height={52} width={52}/>
      <h6 className="font-medium  text-[22px] text-black">Request Quotations</h6>
      <p className="text-[18px]  leading-6  text-lightGraytext">
        Select products and request competitive quotes from verified suppliers.
      </p>
    </div>
  </div>

  {/* BOX 3 */}
  <div className="flex items-start  px-5 pt-10 pb-5 rounded-xl border-2 border-primary hover:shadow-md transition h-[330px] w-[290px]">
    <div className="flex flex-col gap-5">
      <Image src="/images/home/howitwork/cart-icon.png" alt="cart-icon" height={52} width={52}/>
      <h6 className="font-medium  text-[22px] text-black">Procure & Track Impact</h6>
      <p className="text-[18px]  leading-6  text-lightGraytext">
        Approve orders and monitor CO₂ emissions  using sustainable materials.
      </p>
    </div>
  </div>

  {/* BOX 4 */}
  <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-primary hover:shadow-md transition h-[330px] w-[290px]">
    <div className="flex flex-col gap-5">
      <Image src="/images/home/howitwork/recycle-icon.png" alt="recycle-icon" height={52} width={52}/>
      <h6 className="font-medium  text-[22px] text-black">Build Sustainably</h6>
      <p className="text-[18px]  leading-6  text-lightGraytext">
        Build eco-friendly structures using our  curated green materials.
      </p>
    </div>
  </div>

</div>

  ),
  []
);



  // Memoize vendor content to prevent re-rendering
const vendorContent = useMemo(
  () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-5">

      {/* BOX 1 */}
      <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-secondary hover:shadow-md transition h-[330px] w-[290px]">
        <div className="flex flex-col gap-5">
          <Image
            src="/images/home/howitwork/search-icon.png"
            alt="registration"
            height={52}
            width={52}
          />
          <h6 className="font-medium text-[22px] text-black">
            Registration
          </h6>
          <p className="text-[18px] leading-6 text-lightGraytext">

            Sign up quickly with our simple
             registration process to become a 
             vendor on our platform.
          
          </p>
        </div>
      </div>

      {/* BOX 2 */}
      <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-secondary hover:shadow-md transition h-[330px] w-[290px]">
        <div className="flex flex-col gap-5">
          <Image
            src="/images/home/howitwork/search-icon.png"
            alt="upload-products"
            height={52}
            width={52}
          />
          <h6 className="font-medium text-[22px] text-black">
            Upload Products
          </h6>
          <p className="text-[18px] leading-6 text-lightGraytext">
            Easily list your products with
             detailed specifications,
             certifications, sustainability
             data, images and prices
          </p>
        </div>
      </div>

      {/* BOX 3 */}
      <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-secondary hover:shadow-md transition h-[330px] w-[290px]">
        <div className="flex flex-col gap-5">
          <Image
            src="/images/home/howitwork/search-icon.png"
            alt="start-selling"
            height={52}
            width={52}
          />
          <h6 className="font-medium text-[22px] text-black">
            Start Selling
          </h6>
          <p className="text-[18px] leading-6 text-lightGraytext">
            Reach a broad audience and 
            receive quotation requests 
            from active buyers.
          </p>
        </div>
      </div>


       <div className="flex items-start px-5 pt-10 pb-5 rounded-xl border-2 border-secondary hover:shadow-md transition h-[330px] w-[290px]">
        <div className="flex flex-col gap-5">
          <Image
            src="/images/home/howitwork/search-icon.png"
            alt="start-selling"
            height={52}
            width={52}
          />
          <h6 className="font-medium text-[22px] text-black">
            Monitor Sales & Revenue
          </h6>
          <p className="text-[18px] leading-6 text-lightGraytext">

            Track your sales performance and
             revenue analytics from your 
              comprehensive vendor dashboard
          </p>
        </div>
      </div>

    </div>
  ),
  []
);


  return (
    <section className="relative md:flex block max-w-7xl mx-auto items-start h-fit justify-center bg-cream">

      <Image
    src="/images/home/latest/Vector.webp"
    alt="Center Vector"
    width={900}
    height={300}
    className="
      absolute 
      left-0
        bottom-0
      
      pointer-events-none
      opacity-80
    " 
  />  
      <div className="md:w-1/2 md:pt-14 pt-8 pr-2 md:pr-10 ">
        <div className="">
          <h2 className="text-center md:text-left text-2xl pt-5 md:text-[43px] font-normal text-black mt-30 pb-[20px]">
            How it works
          </h2>
          <p className="md:text-[18px] text-md  pt-5  text-lightGraytext leading-[30px] w-[390px] h-[120px] mb-[45px] ">
            We are passionate about driving the <br/>
            transition towards sustainable living by <br/>
             providing eco-friendly construction <br/>
             materials for both B2B and B2C markets.
          </p>
          <div className="relative flex md:block items-center justify-start mb-5 md:mb-0 z-20 mt-10">
          <CustomButton
  onPress={handleBuyerClick}
  className={`
    flex items-center justify-between 
    max-w-xs rounded-md border 
    transition-all mb-[25px]

    ${showBuyer 
      ? "border-primary text-white bg-primary shadow-[0px_6px_20px_rgba(67,151,135,0.45)]" 
      : "border-primary text-primary bg-white shadow-[0px_4px_12px_rgba(67,151,135,0.25)] hover:shadow-[0px_4px_16px_rgba(67,151,135,0.35)]"
    }

    font-bold text-[30px]
  `}
  customStyles={{ padding: "22px 62px", width: "384px" }}
  title="Buyer"
    rightIcon={
    showBuyer 
      ? (
          <Image 
            src="/images/home/howitwork/white-arrao-icon.png" 
            alt="white arrow" 
            width={30} 
            height={30}
          />
        )
      : (
          <Image 
            src="/images/home/howitwork/green-arrow-icon.png" 
            alt="red arrow" 
            width={30} 
            height={30}
          />
        )
  }
/>

<CustomButton
  onPress={handleVendorClick}
  className={`
    flex items-center justify-between 
    max-w-xs rounded-md border 
    transition-all

    ${!showBuyer 
      ? "border-secondary text-white bg-secondary shadow-[0px_6px_20px_rgba(169,36,73,0.45)]" 
      : "border-secondary text-secondary bg-white shadow-[0px_4px_12px_rgba(169,36,73,0.25)] hover:shadow-[0px_4px_16px_rgba(169,36,73,0.35)]"
    }

    font-bold text-[30px]
  `}
  customStyles={{ padding: "22px 62px", width: "384px" }}
  title="Vendor"
rightIcon={
    !showBuyer 
      ? (
          <Image 
            src="/images/home/howitwork/white-arrao-icon.png" 
            alt="white arrow" 
            width={30} 
            height={30}
          />
        )
      : (
          <Image 
            src="/images/home/howitwork/red-arrow-icon.png" 
            alt="red arrow" 
            width={30} 
            height={30}
          />
        )
  }/>

          </div>
        </div>
        {/* <Image
          src={"/images/home/latest/Vector.webp"}
          alt="How it works illustration"
          className="hidden md:block w-full -mt-[280px] -mr-[250px]"
          width={100}
          height={100}
          loading="lazy"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          onError={(e) => {
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
        /> */}
      </div>
      <div className="md:w-1/2 md:pl-10 md:pt-14 pt-8">
       
        <div className="w-full">{showBuyer ? buyerContent : vendorContent}</div>
      </div>
    </section>
  );
};

export default WorksSection;
