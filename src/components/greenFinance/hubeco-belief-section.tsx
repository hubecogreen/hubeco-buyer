"use client";
import Image from "next/image";

export default function HubecoBeliefSection() {
  return (
    <div className="relative w-full overflow-hidden pt-12 pb-10">
      {/* Background Vector */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/greenFinance/HubecoBeliefSection-vector.png"
          alt="Wavy background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-gray-50 rounded-3xl px-6 sm:px-10 lg:px-16 py-12 sm:py-16 ">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-14 pb-14 pr-10 pl-10 rounded-2xl"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            {/* Left Column: Text */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-3xl font-bold text-black leading-tight">
                At Hubeco, we believe that financing should never be a barrier
                to building sustainably
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our Green Project Financing solutions are designed to support
                real estate developers and contractors in adopting eco-friendly
                materials and technologies without compromising on budget or
                timelines.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/greenFinance/HubecoBeliefSection.webp"
                alt="Modern sustainable apartment buildings"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
