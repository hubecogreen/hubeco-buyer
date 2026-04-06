"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[636px]">

        {/* Background */}
        <Image
          src="/images/careers/hero.png"
          alt="Careers Hero"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/5" />

        {/* 🔥 Content Container (EXACT FIGMA POSITION) */}
        <div className="absolute top-[84px] left-[100px] ">

          <div
            className="
              text-cream
              w-[854px]
              max-w-[1024px]
              pr-[24px]
              flex flex-col
              gap-[32px]
            "
          >

            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-[6px] rounded-full border border-primary bg-transparent w-fit h-[30px]">
              <span className="w-2 h-2 bg-cream font-Bold rounded-full"></span>
              <span className="text-[12px] tracking-[2px] font-bold uppercase text-cream">
                We are hiring
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[72px] text-cream font-bold leading-[1.1]">
              Build the Future{" "}<br/>
              <span className="text-cream">
                of Sustainable <br/> Construction
              </span>{" "}
             
            </h1>

            {/* Description */}
            <p className="text-[23px] text-cream">
             At hubeco, we’re redefining how the <br /> world sources building Materials 
            </p>

            {/* Buttons */}
            <div className="flex gap-[16px] pt-[8px]">
              <button
                onClick={() => {
                  const section = document.getElementById("open-roles");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-primary text-cream px-8 py-4 rounded-[8px] font-bold text-[18px]"
              >
                Explore Open Roles
              </button>

              {/* <button className="bg-cream text-primary px-8 py-4 rounded-[8px] font-bold text-[18px]">
                Partner With Our Mission
              </button> */}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}