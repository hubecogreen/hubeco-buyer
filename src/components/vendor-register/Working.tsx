import React from "react";
import Image from "next/image";
const Working = () => {
  return (
    <div className="bg-white w-full flex items-center justify-center p-6 md:p-4">
      <div className="w-full">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex flex-col items-start p-4 md:pt-10 max-w-screen-xl">
            <div className="w-full mx-auto flex flex-col lg:flex-row justify-between bg-secondaryBg p-4 md:mt-1 mb-5">
              <div className="overflow-auto p-4 w-full lg:w-1/2">
                <div className="flex flex-col space-y-4 pl-4 lg:pl-10 pt-5">
                  <div className="flex items-start mt-4 lg:mt-5">
                    <div className="p-1.5 rounded-md h-10 flex items-center justify-center">
                      <Image
                        src="/images/vendor-register/add.png"
                        alt="User add"
                        className="w-20 md:w-10"
                        width={32}
                        height={32}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-regular text-sm md:text-base text-black">
                        Sign Up
                      </h6>
                      <p className="text-left text-sm text-medium mt-2 text-black">
                        Visit our Vendor Registration page and fill out the
                        sign-up form with your business details.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-1.5 rounded-md h-10 flex items-center justify-center">
                      <Image
                        src="/images/vendor-register/verify.png"
                        alt="User Verify"
                        className="w-16 md:w-8"
                        width={32}
                        height={32}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-regular text-sm md:text-base text-black">
                        Verification
                      </h6>
                      <p className="text-left text-sm text-medium mt-2 text-black">
                        Our team will review your application and verify your
                        credentials to ensure quality and compliance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-1.5 rounded-md h-10 flex items-center justify-center">
                      <Image
                        src="/images/vendor-register/settings.png"
                        alt="Set up"
                        className="w-20 md:w-10"
                        width={32}
                        height={32}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-regular text-sm md:text-base text-black">
                        Profile Setup
                      </h6>
                      <p className="text-left text-sm text-medium mt-2 text-black">
                        Once approved, set up your vendor profile by adding
                        product listings, pricing, and descriptions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-1.5 rounded-md flex items-center justify-center h-10">
                      <Image
                        src="/images/vendor-register/sell.png"
                        alt="Sell"
                        className="w-20 md:w-10"
                        width={32}
                        height={32}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex flex-col mb-2">
                      <h6 className="font-regular text-sm md:text-base text-black">
                        Start Selling
                      </h6>
                      <p className="text-left text-sm text-medium mt-2 text-black">
                        Begin selling your sustainable building materials to a
                        wide audience committed to eco-friendly construction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block border-r border-[#C1C1C1] mx-8"></div>
              <div className="p-4 lg:p-5 w-full lg:w-1/2 lg:px-10">
                <h1 className="font-bold text-2xl lg:text-4xl mb-4 text-black">
                  How it works
                </h1>
                <Image
                  src="/images/vendor-register/work.png"
                  alt="How it Works"
                  className="w-full h-auto xl:w-128 xl:h-128"
                  width={32}
                        height={32}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.jpg'
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

export default Working;
