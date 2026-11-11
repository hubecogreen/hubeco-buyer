
import React from "react";
import CustomButton from "../customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";

const JoinUs = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/plans");
  };

  return (
    <div className="relative block w-full m-0 p-0 bg-cream">
      <div
        className="relative block w-full m-0 p-0 bg-cover bg-center min-h-[360px] h-auto md:max-lg:min-h-[360px] lg:h-96 lg:min-h-0 xl:h-[320px] xl:min-h-[320px]"
        style={{
          backgroundImage: "url(images/vendor-register/joinbg.webp)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 hidden bg-[rgba(16,44,38,0.7882)] xl:block" />
        <div
          className="
            relative z-10
            min-h-[360px]
            h-full
            flex items-center justify-center
            px-4 py-12
            md:max-lg:box-border md:max-lg:px-4 md:max-lg:py-16
            lg:px-0 lg:py-20
            xl:box-border xl:min-h-[320px] xl:px-[390px] xl:py-[62.5px]
          "
        >
          <div
            className="
              text-center
              w-full
              max-w-4xl
              md:max-lg:max-w-[520px] md:max-lg:flex md:max-lg:flex-col md:max-lg:gap-5
              p-0
              lg:p-4
              text-cream
              xl:box-border xl:flex xl:h-[195px] xl:w-[660px] xl:max-w-none xl:flex-col xl:items-center xl:justify-start xl:gap-5 xl:p-0
            "
          >
            {/* Heading */}
            <h1
              className="
                text-[30px]
                leading-[125%]
                tracking-normal
                font-semibold
                font-['Poppins',sans-serif]
                text-cream
                mb-4
                md:max-lg:mb-0 md:max-lg:text-[36px]
                lg:text-2xl
                lg:font-bold
                xl:mb-0 xl:h-[45px] xl:w-full xl:text-[36px] xl:font-semibold xl:leading-[125%]
              "
            >
              Join Us Today
            </h1>

            {/* Description */}
            <p
              className="
                text-[15px]
                leading-[165%]
                font-normal
                font-['Poppins',sans-serif]
                text-cream
                mb-6
                md:max-lg:mb-0
                lg:mb-10
                xl:mb-0 xl:h-[50px] xl:w-full xl:text-[15px] xl:leading-[165%]
              "
            >
              Ready to become a part of hubeco.market? Sign up as a vendor and
              start making a difference with your sustainable products.
            </p>

            {/* Join Action */}
            <div className="flex items-center justify-center xl:h-[60px] xl:w-full">
            <div className="flex flex-col w-full lg:w-auto md:max-lg:w-auto xl:h-[60px] xl:w-[236px]">
                <CustomButton
                  title="Vendor Connect"
                  className="
                    bg-cream
                    !text-secondary
                    font-semibold
                    h-[52px]
                    w-full
                    rounded-lg
                    text-[15px]
                    md:max-lg:h-[60px] md:max-lg:w-[236px]
                    lg:h-12
                    lg:w-40
                    lg:!bg-transparent
                    lg:!text-cream
                    lg:text-sm
                    xl:!h-[60px] xl:!w-[236px] xl:!bg-cream xl:!text-[#A92449] xl:!border-0 xl:!text-[15px]
                  "
                  customStyles={{
                    border: "1px solid #FFFFFF",
                    color: "#FFFFFF",
                    minWidth: "200px",
                  }}
                  hoverBgColor="cream"
                  hoverColor="black"
                  rightIcon={<GoArrowRight />}
                  onPress={handleButtonClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
