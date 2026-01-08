"use client";
import React from "react";
import CustomButton from "@/components/customButton/CustomButton";
import { useRouter } from "next/navigation";
import Image from "next/image";

const EmptyCart = () => {


  const router = useRouter();

  return (

    <>
      {/* Main Content Area */}
      <div className=" mx-auto  py-8 md:flex-row gap-6">


        <div className=" mx-auto p-4 md:mt-1 mb-5">
          <div className="flex justify-center p-10">
            {/* <Lottie
              animationData={animationData}
              loop={true}
              style={{ width: 300, height: 300 }}
            /> */}
            <Image src="/images/wishlist/cartimage.webp" alt="Image" width={300} height={300}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp'
              }}
              loading="lazy"
            />
          </div>
          <p className="text-brown font-bold text-center">Your cart is empty!</p>
          <div className="flex justify-center p-5">
            <CustomButton
              title={"Shop Now"}
              className="ml-3 bg-primary  h-12 md:h-12 md:w-48 w-30 md:text-md text-sm text-cream"
              customStyles={{}}
              onPress={() => { router.push('/products') }}
            />
          </div>
        </div>


      </div>

    </>

  );
};

export default EmptyCart;
