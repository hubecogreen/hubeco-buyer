"use client";

import React, { useEffect, useRef, useState } from "react";

const PartnersSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const partners = [
    {
      id: 1,
      name: "Raghuram Bezawada",
      role: "Project Director, SSREC, Hyderabad",
      icon: "/images/partners/icon1.png",
      testimonial:
        "Hubeco has truly simplified the process of sourcing eco-friendly sand for green construction projects. Their online portal is intuitive and efficient, the delivery and coordination from source to customer is seamlessly well coordinated , their commitment to sustainability and reliable service. Hubeco is a valuable partner in our journey towards responsible building practices",
    },
    {
      id: 2,
      name: "Ar. Sachin Kankaria",
      role: "Partner, Evo Green City (Dehu, Pune)",
      icon: "/images/partners/icon2.png",
      testimonial:
        "Working with hubeco.market has been a great experience. It's made sourcing verified sustainable materials effortless and transparent. A truly reliable partner for developers who care about building responsibly",
    },
    {
      id: 3,
      name: "Rahul Agarwal",
      role: "Procurement Head, Stonecraft Group, Hyderabad",
      icon: "/images/partners/icon3.png",
      testimonial:
        "Hubeco.market has made sustainable sourcing effortless and transparent , a trusted partner for our eco-friendly projects.",
    },
  ];

  /* detect visible cards */
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setVisibleSlides(2); // md
      } else {
        setVisibleSlides(1); // mobile
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalDots = Math.ceil(partners.length / visibleSlides);

  /* auto scroll (till lg) */
  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === totalDots - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [totalDots]);

  /* scroll logic */
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth / visibleSlides;

    container.scrollTo({
      left: currentIndex * cardWidth,
      behavior: "smooth",
    });
  }, [currentIndex, visibleSlides]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalDots - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalDots - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full flex justify-center py-12 md:py-20 bg-[#109989] px-4">
      <div className="w-full max-w-[1440px] flex flex-col items-center gap-8">

        <h1 className="text-[32px] md:text-[43px] text-white font-semibold text-center">
          What our Partners Say
        </h1>

        <h2 className="text-[16px] md:text-[20px] text-white opacity-90 text-center">
          Trusted By Developers, Procurement Teams and Suppliers
        </h2>

        {/* Carousel: mobile + md */}
        <div className="relative w-full mt-8 lg:hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {partners.map((p) => (
              <div
                key={p.id}
                className="flex-shrink-0 w-full md:w-1/2 snap-center px-2"
              >
                <div className="bg-[#FFFEF8] rounded-[7px] min-h-[440px] p-6 border border-[#E4F1EE] border-l-[3px] border-l-[#0BA392]">
                  <div className="flex justify-center mb-5">
                    <img
                      src={p.icon}
                      alt={p.name}
                      className="w-[60px] h-[60px]"
                    />
                  </div>

                  <h3 className="text-[18px] font-semibold text-center mb-1">
                    {p.name}
                  </h3>

                  <p className="text-[13px] text-center opacity-70 mb-4">
                    {p.role}
                  </p>

                  <p className="text-[13px] text-[#333] leading-relaxed">
                    {p.testimonial}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ARROWS – NOT TOUCHED */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="#109989"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="#109989"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop static */}
        <div className="hidden lg:flex gap-[10px] justify-center w-full mt-10">
          {partners.map((p) => (
            <div
              key={p.id}
              className="bg-[#FFFEF8] rounded-[7px] w-[406px]  p-[30px] border border-[#E4F1EE] border-l-[3px] border-l-[#0BA392] flex flex-col"
            >
              <div className="flex justify-center mb-6">
                <img
                  src={p.icon}
                  alt={p.name}
                  className="w-[70px] h-[70px]"
                />
              </div>

              <h3 className="text-[20px] font-semibold text-center mb-1">
                {p.name}
              </h3>

              <p className="text-[14px] text-center opacity-70 mb-5 ">
                {p.role}
              </p>

              <p className="text-[14px] text-[#333] leading-relaxed">
                {p.testimonial}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
