"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function TrustedBy() {
  const cards = [
    { value: 50, suffix: "+", title: "Brands", img: "/images/trusts/img1.png" },
    { value: 9, suffix: " Tonnes", title: "of Co₂ Reduced", img: "/images/trusts/img2.png" },
    { value: 24, suffix: "Hrs", title: "Receive Quotes", img: "/images/trusts/img3.png" },
    { value: 99, suffix: "%", title: "On time delivery", img: "/images/trusts/img4.png" },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(cards.map(() => 0));

  // 🚀 Faster Framer-like animation speed
  const animationDuration = 600; // ms

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        // When section becomes visible → start counters
        if (isVisible) {
          setVisible(true);
        } else {
          // When section goes out of view → reset counters
          setVisible(false);
          setCounts(cards.map(() => 0));
        }
      },
      {
        threshold: 0.6, // triggers only when MOST of section is visible
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    cards.forEach((card, index) => {
      let start = 0;
      const end = card.value;

      const stepTime = Math.max(animationDuration / end, 10); // speed

      const timer = setInterval(() => {
        start += 1;
        setCounts((prev) => {
          const next = [...prev];
          next[index] = start;
          return next;
        });

        if (start >= end) clearInterval(timer);
      }, stepTime);
    });
  }, [visible]);

  return (
  <section
  ref={sectionRef}
  className="
    mx-auto
    w-full
    md:max-w-[1440px]
    p-[40px]
    md:p-[100px]
    block
    md:flex
    md:flex-col
    md:items-center
  "
>
  <h2 className="text-center text-[28px] md:text-[43px]  text-[#3d3528] mb-10 md:mb-[54px]">
    Trusted by 50+ Brands
  </h2>

  <div
    className="
      grid 
      grid-cols-2
      gap-4
      sm:gap-6
      md:flex
      md:justify-between
      md:items-center
      w-full
      md:w-[1220px]
      max-w-[1220px]
      md:h-[217px]
    "
  >
    {cards.map((card, index) => (
      <div
        key={index}
        className="
          w-full
          h-[160px]
          sm:h-[180px]
          md:w-[293.75px]
          md:h-[217px]
          rounded-[20px]
          p-[20px]
          sm:p-[25px]
          md:p-[30px]
          bg-[linear-gradient(120.89deg,#B0E0DA_0%,#109989_24.32%)]
          backdrop-blur-[1.38px]
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <Image
          src={card.img}
          alt={card.title}
          width={70}
          height={70}
          className="mb-2 md:mb-3"
        />

        <p className="text-[22px] sm:text-[26px] md:text-[34px] font-semibold text-white">
          {counts[index]}
          {card.suffix}
        </p>

        <p className="text-[12px] sm:text-[14px] md:text-[18px] font-medium text-white text-center -mt-1">
          {card.title}
        </p>
      </div>
    ))}
  </div>
</section>

  );
}
