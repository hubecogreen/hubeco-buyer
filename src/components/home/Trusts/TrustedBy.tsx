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
        w-[1440px]
        h-[514px]
        pt-[99px]
        pr-[100px]
        pb-[100px]
        pl-[100px]
        flex
        flex-col
        items-center
      "
    >
      <h2 className="text-center text-[43px] font-semibold text-[#3d3528] mb-[54px]">
        Trusted by 50+ Brands
      </h2>

      <div
        className="
          flex
          justify-between
          items-center
          w-[1220px]
          max-w-[1220px]
          h-[217px]
          gap-[15px]
        "
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="
              w-[293.75px]
              h-[217px]
              rounded-[24px]
              p-[30px]
              bg-[linear-gradient(120.89deg,#DFF3F1_0%,#109989_24.32%)]
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
              width={90}
              height={90}
              className="mb-3"
            />

            <p className="text-[34px] font-semibold text-white">
              {counts[index]}
              {card.suffix}
            </p>

            <p className="text-[18px] font-medium text-white -mt-1 text-center">
              {card.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
