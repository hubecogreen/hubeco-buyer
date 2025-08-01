"use client";
import React from "react";

import CustomButton from "@/components/customButton/CustomButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
const EmptyWishlist = () => {


  const router=useRouter();

  return (

    <>
      {/* Main Content Area */}
      <div className=" mx-auto  pb-8 md:flex-row gap-6">
       

        <div className=" mx-auto  bg-[#F4F4F4] p-4 md:mt-1 mb-5">
          <div className="flex justify-center p-10">
            {/* <Lottie
              animationData={animationData}
              loop={true}
              style={{ width: 300, height: 300 }}
            /> */}
            <Image src="/images/wishlist/wishlistimage.webp" alt="Image" width={300} height={300}
            onError={e => {
              e.currentTarget.src = '/images/product-placeholder.webp'
            }}
            loading="lazy"/>
          </div>
          <p className="font-bold text-center">Your Wishlist is Empty!</p>
          <div className="flex justify-center p-5">
            <CustomButton
              title={"Shop Now"}
              className="ml-3 bg-secondary hover:bg-primary h-12 md:h-12 md:w-48 w-30 md:text-md text-sm text-white"
              customStyles={{}}
              onPress={()=>{router.push('/products')}}
            />
          </div>
        </div>
       

      </div>

</>

  );
};

export default EmptyWishlist;
