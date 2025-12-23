"use client";
import { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import Image from "next/image";
import GreenHomeLoanForm from "./GreenHomeLoanForm";
import GreenProjectFinancingForm from "./GreenProjectFinancingForm"; // new component

export default function GreenFinancingSection() {
  const [isHomeLoanFormOpen, setIsHomeLoanFormOpen] = useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);

  return (
    <>
      <div className="relative w-full h-[500px] overflow-hidden rounded-[48px] mx-auto max-w-[1440px] top-8 ">
        {/* Background Image */}
        <div className="absolute inset-0 m-4">
          <Image
            src="/images/greenFinance/greenFinanceBanner.webp"
            alt="Modern sustainable home interior"
            fill
            className="object-fit rounded-[48px]"
            priority
          />
          <div className="absolute inset-0 bg-black/50 rounded-[48px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-10 lg:px-20">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-4">
              Green Financing
            </h1>
            <div className="mb-8 space-y-1">
              <p className="text-white text-xl leading-tight">
                Empowering Sustainable Construction
              </p>
              <p className="text-white text-xl leading-tight">
                with accessible Green Capital
              </p>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6">
              <button
                onClick={() => setIsHomeLoanFormOpen(true)}
                className="flex items-center gap-2 bg-transparent border border-white text-white px-6 py-3 rounded-md text-base font-semibold hover:text-gray-900 transition"
              >
                Apply for Green Home Loan
                <GoArrowRight className="text-lg" />
              </button>

              <button
                onClick={() => setIsProjectFormOpen(true)}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md text-base font-semibold hover:bg-primary transition"
              >
                Apply for Green Project Financing
                <GoArrowRight className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <GreenHomeLoanForm
        isOpen={isHomeLoanFormOpen}
        onClose={() => setIsHomeLoanFormOpen(false)}
      />

      <GreenProjectFinancingForm
        isOpen={isProjectFormOpen}
        onClose={() => setIsProjectFormOpen(false)}
      />
    </>
  );
}
