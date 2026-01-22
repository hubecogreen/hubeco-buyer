import React from "react";
import Image from "next/image";
const BuyerWorking = () => {
  return (
    <div className="bg-white w-full flex items-center justify-center p-6 md:p-4">
      <div className="w-full">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex flex-col items-start p-4 md:pt-10 max-w-screen-xl">
            <div className="w-full mx-auto flex flex-col lg:flex-row justify-between bg-slate-100 p-4 md:mt-1 mb-5">
              <div className="overflow-auto p-4 w-full lg:w-1/2 ">
                <div className="flex flex-col space-y-4 pl-4 lg:pl-10 pt-5">
                  <div className="flex items-start mt-4 lg:mt-4">
                    <div className="p-1.5 rounded-md h-10 flex items-center justify-center">
                      <Image
                        src="/images/buyer-register/signup.webp"
                        alt="User add"
                        className="w-16 md:w-10"
                        width={32}
                        height={32}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.webp'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-regular text-sm md:text-base text-brown">
                        Sign Up
                      </h6>
                      <p className="text-left text-sm text-medium mt-2 text-brown">
                        Visit our Buyer Registration page and fill out the
                        sign-up form with your details.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-1.5 rounded-md h-10 flex items-center justify-center">
                      <Image
                        src="/images/buyer-register/create.webp"
                        alt="User Verify"
                        className="w-12 md:w-8"
                        width={32}
                        height={32}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.webp'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-regular text-sm md:text-base text-brown">
                        Create a profile
                      </h6>
                      <p className="text-left text-sm text-medium mt-2 text-brown">
                        Set up your profile to personalize your shopping
                        experience
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-1.5 rounded-md h-10 flex items-center justify-center">
                      <Image
                        src="/images/buyer-register/explore.webp"
                        alt="Set up"
                        className="w-16 md:w-10"
                        width={32}
                        height={32}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.webp'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-regular text-sm md:text-base text-brown">
                        Explore Products
                      </h6>
                      <p className="text-left text-sm text-medium mt-2 text-brown">
                        Browse our extensive catalog of eco-friendly building
                        materials
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-1.5 rounded-md flex items-center justify-center h-10">
                      <Image
                        src="/images/buyer-register/shopping.webp"
                        alt="Sell"
                        className="w-16 md:w-10"
                        width={32}
                        height={32}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.webp'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-regular text-sm md:text-base text-brown">
                        Start Shopping
                      </h6>
                      <p className="text-left text-sm text-medium mt-2 text-brown">
                        Add products to your cart and proceed to a seamless
                        checkout process
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block border-r border-[#C1C1C1] mx-8"></div>
              <div className="p-4 lg:p-5 w-full lg:w-1/2 lg:px-10">
                <h1 className="font-bold text-2xl lg:text-4xl mb-4 text-brown">
                  How it works
                </h1>
                <Image
                  src="/images/buyer-register/7-30.webp"
                  alt="How it Works"
                  className="w-full h-auto xl:w-128 xl:h-128"
                  width={585}
                  height={460}
                  onError={e => {
                    e.currentTarget.src = '/images/product-placeholder.webp'
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerWorking;
