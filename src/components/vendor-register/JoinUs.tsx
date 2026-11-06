
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
        className="block w-full m-0 p-0 bg-cover bg-center min-h-[360px] h-auto md:max-lg:min-h-[360px] lg:h-96 lg:min-h-0"
        style={{
          backgroundImage: "url(images/vendor-register/joinbg.webp)",
        }}
      >
        <div
          className="
            min-h-[360px]
            h-full
            flex items-center justify-center
            px-4 py-12
            md:max-lg:box-border md:max-lg:px-4 md:max-lg:py-16
            lg:px-0 lg:py-20
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
              "
            >
              Ready to become a part of hubeco.market? Sign up as a vendor and
              start making a difference with your sustainable products.
            </p>

            {/* Join Action */}
            <div className="flex items-center justify-center">
            <div className="flex flex-col w-full lg:w-auto md:max-lg:w-auto">
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
