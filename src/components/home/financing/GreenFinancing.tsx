import Image from "next/image";

export default function GreenFinancing() {
  return (
    <div className="w-full bg-[#FFFEF8] flex justify-center items-center py-[60px] md:py-[100px]">

      {/* Outer Container */}
      <div className="w-full max-w-[1200px] block md:flex md:flex-row md:justify-center items-center gap-[43px] md:h-[384px] px-4 md:px-0">

        {/* Left Image */}
        <div className="
          w-full 
          md:w-[592px] 
          h-auto 
          md:h-[384px] 
          rounded-xl 
          overflow-hidden 
          relative 
          flex 
          justify-center 
          items-center
        ">
          <Image
            src="/images/greenFinance/green.png"
            alt="Green Financing"
            width={592}
            height={384}
            className="w-full h-auto md:h-full object-cover rounded-xl"
          />
        </div>

        {/* Right Section */}
        <div className="
          w-full 
          md:w-[582px] 
          relative 
          flex 
          mt-8 
          md:mt-0
          min-h-[350px]
        ">
          
          {/* Text Block */}
          <div className="
            w-full 
            md:w-[572px]
            flex 
            flex-col 
            gap-[14px]
            relative
          ">
            <h2 className="text-[32px] md:text-[43.2px] leading-[38px] md:leading-[43px] font-normal text-[#3D3528]">
              Green Financing
            </h2>

            <div className="flex flex-col gap-[20px] md:gap-[30px] mt-2">
              <p className="text-[18px] md:text-[24px] leading-[26px] md:leading-[30px] text-black w-full md:w-[501px]">
                Access flexible financing options for your sustainable building
                projects. Our green financing program helps you invest in
                eco-friendly materials while maintaining budget efficiencies.
              </p>

              <p className="text-[18px] md:text-[24px] leading-[26px] md:leading-[30px] text-black w-full md:w-[516px]">
                Partner with leading financial institutions committed to
                environmental responsibility.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="
            absolute 
            md:bottom-0 
            md:left-0 
            mt-6 
            md:mt-0
            w-full 
            md:w-[328px]
            h-[60px] 
            flex 
            justify-center 
            md:justify-start
          ">
            <button className="bg-[#109989] w-full md:w-[328px] h-[60px] rounded-md flex items-center justify-center gap-4 text-white text-[18px] font-medium">
              Ready To Build Greener
              <div className="w-7 h-7 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
