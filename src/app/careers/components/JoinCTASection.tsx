"use client";

export default function CareersCTA() {
  const scrollToRoles = () => {
    document.getElementById("open-roles")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="flex w-full justify-center bg-cream py-[40px]">
      <div className="relative mx-5 lg:min-h-[420px] md:max-h-[431px] min-h-[581px] w-full max-w-[1232px] overflow-hidden rounded-[28px] sm:mx-6 lg:mx-0 lg:h-[518px] lg:rounded-[48px]">
        <img
          src="/images/careers/cta.png"
          alt="cta"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-start md:justify-center lg:justify-center px-[10px] py-[40px] text-center sm:px-8 lg:px-[232px] lg:py-[96px]">
          <h2 className="max-w-[768px] text-[26px] font-bold leading-[1.1] text-cream sm:text-[40px] lg:text-[60px] lg:leading-[60px]">
            Join India’s Sustainable Construction <br className="md:hidden block"/>Revolution
          </h2>

          <p className=" my-[32px] md:mt-[16px] w-full lg:w-[922px] max-w-[922px] text-[20px] font-medium leading-[32px] text-cream sm:text-[18px] lg:mb-[8px] lg:text-[20px] lg:leading-[32.5px]">
            Ready to make an impact in green building, sustainable materials and <br className="hidden lg:block" />
            construction technology? At Hubeco, you’ll work on real-world problems <br className="hidden lg:block" />
            that shape cities, reduce emissions and improve how construction is done across India.
          </p>

          <button
            onClick={scrollToRoles}
            className="flex w-full items-center justify-center rounded-[16px] bg-primary p-[16px] text-center text-[15px] font-semibold text-cream sm:w-fit sm:min-w-[320px] sm:px-8 lg:w-[470.81px] lg:px-[40px] lg:py-[20px] lg:text-[20px]"
          >
            Explore Careers in Green Construction
          </button>
        </div>
      </div>
    </section>
  );
}
