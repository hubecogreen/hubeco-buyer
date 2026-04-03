"use client";

export default function CareersCTA() {

  const scrollToRoles = () => {
    document.getElementById("open-roles")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full flex justify-center bg-cream py-[40px]">

      {/* CONTAINER */}
      <div className="relative w-[1232px] h-[518px] rounded-[48px] overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <img
          src="/images/careers/cta.png"
          alt="cta"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY (IMPORTANT) */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[232px] py-[96px]">

          {/* HEADING */}
          <h2 className="text-cream text-[60px] leading-[60px] font-bold max-w-[768px]">
            Join India’s Sustainable Construction Revolution
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-[16px] mb-[8px] text-cream text-[20px] leading-[32.5px] font-medium max-w-[768px]">
            Ready to make an impact in green building, sustainable materials and
            construction technology? At Hubeco, you’ll work on real-world problems
            that shape cities, reduce emissions and improve how construction is
            done across India.
          </p>

          {/* BUTTON */}

          <button onClick={scrollToRoles} className="
  w-[470.81px]
  px-[40px] py-[20px]
  bg-primary
  text-cream
  rounded-[16px]
  text-[20px]
  font-semibold
  flex items-center justify-center
  text-center
">
            Explore Careers in Green Construction
          </button>


        </div>

      </div>

    </section>
  );
}