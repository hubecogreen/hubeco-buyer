// components/GreenFinancing.tsx

import Image from "next/image";

export default function GreenFinancing() {
  return (
    <div className="w-full bg-[#FFFEF8] flex justify-center items-center py-[100px]">
      {/* Outer Container (1440px layout alignment) */}
      <div className="w-[1200px] flex flex-row justify-center items-center gap-[43px] h-[384px]">
        
        {/* Left Image Section */}
        <div className="w-[592px] h-[384px] rounded-xl overflow-hidden relative flex justify-center items-center">
          <Image
            src="/images/greenFinance/green.png"
            alt="Green Financing"
            width={592}
            height={384}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Right Content Section */}
        <div className="w-[582px] h-[384px] relative flex">
          
          {/* Text Block (Positioned exactly like Framer) */}
          <div className="absolute left-0 top-[calc(50%-299px/2-43.5px)] w-[572px] h-[299px] flex flex-col gap-[14px]">
            
            {/* Heading */}
            <h2 className="text-[43.2px] leading-[43px] font-normal text-[#3D3528]">
              Green Financing
            </h2>

            {/* Description */}
            <div className="w-[572px] h-[240px] flex flex-col gap-[30px]">
              <p className="w-[501px] text-[24px] leading-[30px] text-black">
                Access flexible financing options for your sustainable building
                projects. Our green financing program helps you invest in
                eco-friendly materials while maintaining budget efficiencies.
              </p>

              <p className="w-[516px] text-[24px] leading-[30px] text-black">
                Partner with leading financial institutions committed to
                environmental responsibility.
              </p>
            </div>
          </div>

          {/* CTA Button – Perfect Framer Position */}
          <div className="absolute bottom-0 left-0 bg-[#109989] w-[328px] h-[60px] rounded-md flex items-center justify-center px-4">
  <button className="flex items-center gap-4 bg-[#109989] text-white text-[18px] font-medium capitalize">
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
