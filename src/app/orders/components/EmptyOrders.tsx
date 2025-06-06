"use client";
import React from "react";

import CustomButton from "@/components/customButton/CustomButton";
import { useRouter } from "next/navigation";
import Image from "next/image";

const EmptyOrders = () => {
  const router = useRouter();

  return (
    <>
      {/* Main Content Area */}
      <div className=" mx-auto  pb-8 md:flex-row gap-6">
        <div className=" mx-auto  bg-[#F4F4F4] p-4 md:mt-1 mb-5">
          <div className="flex justify-center p-10">
            
            <Image
              src={"/images/wishlist/no-orders.png"}
              alt="Image"
              width={200}
              height={200}
              onError={(e) => {
                e.currentTarget.src = "images/failedToLoadImage.jpg";
              }}
              loading="lazy"
            />
          </div>
          <p className="font-bold text-center">Order Not Found</p>
          <div className="flex justify-center p-5">
            <CustomButton
              title={"Go to My Orders"}
              className="ml-3 bg-secondary hover:bg-primary font-semibold h-12 md:h-12 md:w-48 w-30 md:text-md text-sm text-white"
              customStyles={{}}
              onPress={() => {
                window.location.href = "/orders";
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyOrders;
