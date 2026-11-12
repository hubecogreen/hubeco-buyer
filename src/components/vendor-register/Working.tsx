
import React from "react";
import Image from "next/image";

const Working = () => {
  const steps = [
    {
      number: "1",
      icon: "/images/vendor-register/add.webp",
      alt: "User add",
      title: "Sign Up",
      description:
        "Visit our Vendor Registration page and fill out the sign-up form with your business details.",
    },
    {
      number: "2",
      icon: "/images/vendor-register/verify.webp",
      alt: "User Verify",
      title: "Verification",
      description:
        "Our team will review your application and verify your credentials to ensure quality and compliance.",
    },
    {
      number: "3",
      icon: "/images/vendor-register/settings.webp",
      alt: "Set up",
      title: "Profile Setup",
      description:
        "Once approved, set up your vendor profile by adding product listings, pricing, and descriptions.",
    },
    {
      number: "4",
      icon: "/images/vendor-register/sell.webp",
      alt: "Sell",
      title: "Start Selling",
      description:
        "Begin selling your sustainable building materials to a wide audience committed to eco-friendly construction.",
    },
  ];

  return (
   <div className="w-full bg-cream lg:bg-cream flex items-center justify-center px-4 py-[20px] mx-auto lg:max-w-[1440px] lg:px-[100px] lg:pt-[40px] lg:pb-[0px]">
    <div className="hidden xl:grid xl:box-border xl:min-h-[520px] xl:w-full xl:max-w-[1440px] xl:mx-auto xl:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] xl:justify-center xl:items-start xl:gap-20">
      <Image
        src="/images/vendor-register/work.webp"
        alt="A building materials supplier"
        width={552}
        height={480}
        onError={(e) => {
          e.currentTarget.src = "/images/product-placeholder.webp";
        }}
        loading="lazy"
        className="mt-[81px] h-[480px] w-full rounded-2xl object-cover"
      />

      <div className="flex w-full flex-col">
        <span className="mb-2 text-[11px] font-bold leading-[140%] tracking-[1.8px] text-[#08796D] font-['Poppins',sans-serif]">
          YOUR NEXT CHAPTER
        </span>
        <h2 className="mb-6 text-[34px] font-semibold leading-[100%] tracking-[-0.7px] text-[#203B37] font-['Poppins',sans-serif]">
          How It Works
        </h2>

        <div className="relative flex flex-col gap-[16px]">
          <div className="absolute bottom-7 left-[13.5px] top-7 w-px bg-[#A9D5CA]" />
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex gap-5">
              <div
                className={`z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#109989] text-[14px] font-normal leading-none text-[#08796D] ${
                  index === 0 ? "bg-[#109989] !text-white" : "bg-[#FFFEF8]"
                }`}
              >
                {step.number}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-[10px]">
                <h3 className="text-[22.29px] font-semibold leading-[140%] text-[#203B37] font-['Poppins',sans-serif]">
                  {step.title}
                </h3>
                <p className="text-[17.33px] font-normal leading-[165%] text-[#4D5553] font-['Poppins',sans-serif]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="w-full xl:hidden">
      <div className="w-full">
        <div className="flex flex-wrap justify-center">
          <div className="w-full max-w-screen-xl mx-auto flex flex-col items-start p-0">

            <div className="w-full mx-auto flex flex-col lg:flex-row justify-between bg-cream lg:bg-secondaryBg p-0 lg:p-4 mb-0 lg:mb-5 gap-7 lg:gap-0 md:max-lg:flex-col md:max-lg:gap-0">

              {/* Marketplace Image and Heading */}

              {/* Marketplace Image and Heading */}
              <div className="order-1 p-0 w-full flex flex-col gap-5 lg:order-2 lg:p-5 lg:w-[calc(50%-2rem)] lg:px-4 lg:gap-0 md:max-lg:contents">

                {/* Heading Content */}
                <div className="order-2 flex flex-col gap-3 overflow-visible p-0 w-full lg:order-1 lg:gap-0 lg:p-4 lg:w-[calc(50%-2rem)] md:max-lg:order-1 md:max-lg:gap-3 md:max-lg:mb-3">

                  {/* Mobile Only Label */}
                  <span className="lg:hidden text-[11px] leading-[140%] tracking-[1.8px] font-bold text-[#08796D] font-['Poppins',sans-serif]">
                    YOUR NEXT CHAPTER
                  </span>

                  {/* Heading - Both Mobile and Desktop */}
                  <h1 className="text-[28px] leading-[100%] tracking-[-0.7px] font-semibold text-brown font-['Poppins',sans-serif] lg:text-black lg:font-bold lg:text-2xl xl:text-4xl lg:leading-normal lg:tracking-normal lg:mb-4">
                    How it works
                  </h1>
                </div>

                {/* Marketplace Image */}
                <Image
                  src="/images/vendor-register/work.webp"
                  alt="How it Works"
                  className="order-2 w-full h-[229px] object-cover rounded-xl lg:order-2 lg:h-auto lg:rounded-none xl:w-128 xl:h-128 md:max-lg:order-2 md:max-lg:aspect-[708/449] md:max-lg:h-auto md:max-lg:rounded-2xl"
                  width={712}
                  height={558}
                  onError={(e) => {
                    e.currentTarget.src = "/images/product-placeholder.webp";
                  }}
                  loading="lazy"
                />

              </div>


              {/* Desktop Divider */}
              <div className="hidden lg:block border-r border-[#C1C1C1] mx-8"></div>

              {/* Onboarding Timeline */}
              <div className="order-1 overflow-visible p-0 w-full lg:order-1 lg:overflow-auto lg:p-4 lg:w-1/2 md:max-lg:order-3 md:max-lg:mt-6 md:max-lg:max-w-full">

                <div className="flex flex-col gap-4 lg:space-y-4 lg:gap-0 lg:pl-4 lg:pt-8">

                  {steps.map((step, index) => (
                    <div
                      key={step.number}
                      className="flex items-start gap-4 w-full lg:gap-0"
                    >

                      {/* Mobile Timeline Number */}
                      <div className="relative flex flex-col items-center shrink-0 self-stretch">
                        <div className="w-8 h-8 rounded-full bg-[#08796D] text-cream flex items-center justify-center text-sm font-semibold">
                          {step.number}
                        </div>

                        {index !== steps.length - 1 && (
                          <div className="absolute top-8 w-px h-[calc(100%-16px)] bg-[#A9D5CA]"></div>
                        )}
                      </div>

                      {/* Original Desktop Icon */}
                      <div className="hidden p-1.5 rounded-md h-10 items-center justify-center shrink-0">
                        <Image
                          src={step.icon}
                          alt={step.alt}
                          className={
                            index === 0 || index === 2
                              ? "w-20 md:w-10"
                              : index === 1
                                ? "w-16 md:w-8"
                                : "w-20 md:w-10"
                          }
                          width={32}
                          height={32}
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/product-placeholder.webp";
                          }}
                          loading="lazy"
                        />
                      </div>

                      {/* Step Details */}
                      <div className="flex flex-col flex-1 min-w-0 pb-4 lg:ml-4 lg:mb-2 lg:pb-0">

                        <h6 className="text-[18px] leading-[140%] font-semibold text-[#203B37] font-['Poppins',sans-serif] lg:font-semibold lg:text-[18px] lg:leading-[140%] lg:text-[#203B37]">
                          {step.title}
                        </h6>

                        <p className="text-left text-[14px] leading-[150%] font-normal mt-2 text-[#4D5553] font-['Poppins',sans-serif] lg:text-[14px] lg:leading-[150%] lg:text-[#4D5553]">
                          {step.description}
                        </p>

                      </div>
                    </div>
                  ))}

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Working;
