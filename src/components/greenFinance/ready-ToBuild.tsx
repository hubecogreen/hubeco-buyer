"use client";
import { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import Image from "next/image";
import GreenProjectFinancingForm from "./GreenProjectFinancingForm"; // import the form

export default function ReadyToBuildCTA() {
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);

  return (
    <div className="w-full lg:px-[100px] px-4 py-[5px] max-w-screen-xl mx-auto">
<div className="relative w-full  min-h-[320px] overflow-hidden rounded-[40px] flex items-center justify-center ">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/greenFinance/Green BG.png"
            alt="Green building materials background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-8">
          <h2 className="text-white text-[28px] sm:text-[32px] lg:text-[36px] font-semibold leading-snug tracking-tight mb-4">
            Ready to Build Greener?
          </h2>

          <p className="text-white/90 text-[18px] sm:text-[20px] leading-relaxed max-w-[600px] mb-8 leading-6">
            Submit your project details and connect
            <br /> with our financing experts today
          </p>

          <button
            onClick={() => setIsProjectFormOpen(true)}
            className="inline-flex items-center gap-3 bg-primary text-cream px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-[16px] sm:text-lg font-semibold hover:bg-primary transition-all duration-300"
          >
            Apply for Project Finance
            <GoArrowRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* Popup Form */}
      <GreenProjectFinancingForm
        isOpen={isProjectFormOpen}
        onClose={() => setIsProjectFormOpen(false)}
      />
    </div>
  );
}
