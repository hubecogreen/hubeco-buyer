"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[636px]">

        {/* Background */}
        <Image
          src="/images/careers/hero.jpg"
          alt="Careers Hero"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />

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
            <h1 className="text-[56px] text-cream font-semibold leading-[1.1]">
              Careers in{" "}
              <span className="text-primary">
                Sustainable Construction
              </span>{" "}
              & Green Procurement
            </h1>

            {/* Description */}
            <p className="text-[20px] text-cream">
              Build the future of India's construction industry with Hubeco, the
              leading <br /> digital platform for sustainable building materials and
              green procurement.
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

              <button className="bg-cream text-primary px-8 py-4 rounded-[8px] font-bold text-[18px]">
                Partner With Our Mission
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}