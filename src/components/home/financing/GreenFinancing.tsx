"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GreenFinancing() {
  const router = useRouter();
  return (
    <section className="w-full bg-[#FFFEF8] ">
      <div className="w-full lg:max-w-[1440px] mx-auto px-4 lg:p-[100px]  flex flex-col items-center justify-start py-8 ">

        {/* CENTER HEADING */}
        <h2 className="
        w-full
        text-brown
        max-w-[354px]
        text-[28px]
        lg:text-[43px]
        leading-[36px]
        xs:leading-[40px]
        sm:leading-[43px]
        font-normal
        text-center
        mb-[24px]
        sm:mb-[32px]
      ">
          Green Financing
        </h2>

        {/* CONTENT */}
        <div className="w-full flex flex-col lg:flex-row md:flex-col items-center gap-[32px] sm:gap-[43px]">

          {/* Left Image */}
          <div className="w-full lg:w-[592px] h-auto lg:h-[520px] rounded-xl overflow-hidden relative">
            <Image
              src="/images/greenFinance/green.png"
              alt="Green Financing"
              width={592}
              height={520}
              className="w-full h-auto lg:h-full object-cover rounded-xl"
            />
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[582px] relative flex flex-col justify-center min-h-auto lg:min-h-[506px]">

            {/* Text */}
            <div className="flex flex-col gap-[16px] sm:gap-[20px] lg:gap-[20px]">
              <p className="text-[16px] xs:text-[18px] sm:text-[20px] lg:text-[24px] leading-[22px] xs:leading-[26px] sm:leading-[28px] lg:leading-[30px] text-brown">
                Access tailored financing solutions designed specifically for eco-friendly construction. Our green financing program empowers you to invest in certified sustainable materials while maintaining cost efficiency and project <br/>stability.
              </p>
              
              <p className="text-[16px] xs:text-[18px] sm:text-[20px] lg:text-[24px] leading-[22px] xs:leading-[26px] sm:leading-[28px] lg:leading-[30px] text-brown">
                Work with leading financial partners committed to environmental responsibility. Together we enable smoother, smarter and more sustainable project financing
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6 sm:mt-8 lg:mt-[34px] w-full lg:w-[328px] h-[52px] sm:h-[56px] lg:h-[60px] flex justify-center lg:justify-start">
              <button 
              onClick={() => router.push("/green-financing")}
              className="bg-[#109989] lg:w-full h-full rounded-md flex items-center justify-center gap-3 sm:gap-4 text-white text-[16px] sm:text-[17px] lg:text-[18px] font-medium px-[20px] py-[10px]">
                Ready To Build Greener
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className="sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px]"
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
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );

}