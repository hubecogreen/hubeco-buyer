"use client";
import { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import Image from "next/image";
import GreenHomeLoanForm from "./GreenHomeLoanForm"; // import the form

export default function GreenHomeLoanSection() {
  const [isHomeLoanFormOpen, setIsHomeLoanFormOpen] = useState(false);

  return (
    <div className="w-full py-16">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-stretch">
          {/* Left Image */}
          <div className="relative">
            <div className="relative  w-full rounded-2xl overflow-hidden  min-h-96 h-full">
              <Image
                src="/images/greenFinance/loan_section2.png"
                alt="Modern eco-conscious home with large windows"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <h3 className="text-3xl sm:text-3xl font-extrabold text-brown leading-tight tracking-tight leading-10">
              Apply for Green Home Loan turning <br/>Eco-Conscious Homes into reality
              with Smarter, Greener Loans
            </h3>

            <p className="text-[18px] text-brown leading-relaxed font-normal">
              Buying a home is one of the most important decisions you will
              make. At Hubeco, we make it easier to choose a home that’s
              healthier, energy-efficient and future ready with financing that
              rewards your commitment to sustainability.
            </p>

            <div className="pt-4">
              <button
                onClick={() => setIsHomeLoanFormOpen(true)}
                className="inline-flex items-center gap-3 border-2 border-primary bg-primary text-cream px-7 py-3 rounded-lg text-[18px] font-semibold transition-all duration-300"
              >
                Apply for Home Loan
                <GoArrowRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      <GreenHomeLoanForm
        isOpen={isHomeLoanFormOpen}
        onClose={() => setIsHomeLoanFormOpen(false)}
      />
    </div>
  );
}
