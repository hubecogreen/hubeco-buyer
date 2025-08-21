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
    <div className="relative">
      <div
        className="bg-cover bg-center h-96"
        style={{ backgroundImage: "url(images/vendor-register/joinbg.webp)" }}
      >
        <div className="bg-opacity-90 h-full flex items-center justify-center py-20">
          <div className="text-center p-4 max-w-4xl text-white">
            <h1 className="text-2xl text-white font-bold mb-4">
              Join Us Today
            </h1>
            <p className="mb-10 text-white">
              Ready to become a part of hubeco.market? Sign up as a vendor and
              start making a difference with your sustainable products.
            </p>
            <div className="flex items-center justify-center">
              <div className="flex flex-col md:flex-row gap-4">
                <CustomButton
                  title={"Vendor Connect"}
                  className="text-white font-semibold h-12 md:h-12 md:w-40 w-30 md:text-md text-sm"
                  customStyles={{
                    border: "1px solid #FFFFFF",
                    color: "#FFFFFF",
                    minWidth: "200px",
                  }}
                  hoverBgColor="white"
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
