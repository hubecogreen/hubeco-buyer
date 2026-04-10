"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full pt-[45px] md:pt-0">
      <div className="relative h-[365px] w-full lg:h-[636px] md:h-[440px] ">
        <Image
          src="/images/careers/hero-ai-2.png"
          alt="Careers Hero"
          fill
          priority
          className="object-cover hidden md:block "
        />

        <Image
          src="/images/careers/hero-mobile-1.jpg"
          alt="Careers Hero"
          fill
          priority
          className="object-cover block md:hidden"
        />

        <div className="absolute inset-0 bg-black/5" />

<div className="absolute inset-x-0 top-[18px] px-[24px] sm:px-6 md:top-[40px] md:px-8 md:py-0 lg:left-[100px] lg:right-auto lg:top-[84px] lg:px-0 lg:py-0">          
  <div className="flex w-full max-w-[854px] flex-col gap-4 md:gap-[14px] pr-0 text-cream lg:gap-[32px]  lg:pr-[24px]">
            <div className="hidden sm:inline-flex h-[30px] w-fit items-center gap-2 rounded-full border border-primary bg-transparent px-4 py-[6px]">
              <span className="h-2 w-2 rounded-full bg-cream font-Bold"></span>
              <span className="text-[12px] font-bold uppercase tracking-[2px] text-cream">
                We are hiring
              </span>
            </div>

            <h1 className="text-[30px] font-semibold leading-[1.1] text-cream sm:text-[48px] lg:text-[72px]">
              Build the Future <br className="block lg:block" />
              <span className="text-cream">
                of Sustainable <br className="hidden lg:hidden md:block" /> Construction
              </span>
            </h1>

            <p className="max-w-[620px] mt-[70px] md:mt-0 text-[18px] leading-[1.5] text-cream sm:text-[20px] lg:text-[23px]">
              At hubeco, we’re redefining how the <br className="hidden lg: md:block" />
              world sources building Materials
            </p>

            <div className="flex pt-[8px]">
              <button
                onClick={() => {
                  const section = document.getElementById("open-roles");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full rounded-[8px] bg-primary lg:px-8 lg:py-4 px-[32px] py-[16px] text-center lg:text-[16px] text-[18px] font-bold text-cream sm:w-fit sm:px-8 sm:py-4 sm:text-[18px]"
              >
                Explore Open Roles
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
