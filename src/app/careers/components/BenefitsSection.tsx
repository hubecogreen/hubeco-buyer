import Image from "next/image";

export default function BenefitsSection() {
  return (
    <section className="flex w-full justify-center bg-cream">
      <div className="w-full max-w-[1280px] px-5 lg:py-[40px] py-[20px] sm:px-6 lg:px-[24px]">
        <h2 className="mx-auto max-w-[800px]  text-start lg:text-center text-[26px] font-bold leading-[1.2] text-brown sm:text-[32px] lg:text-[36px] lg:leading-[48px]">
          Benefits Designed for High-Performance Teams in Climate Tech
        </h2>

        <div className="mt-[32px] grid grid-cols-1 gap-5 lg:mt-[48px] lg:grid-cols-3 lg:gap-[32px]">
          <div className="flex flex-col rounded-[24px] border border-primary p-6 lg:w-[389.33px] lg:p-[30px]">
            <div className="mb-[24px] flex items-center lg:mb-[27px]">
              <Image alt="location-icon" src="/images/careers/img1.svg" width={21} height={30} />

              <h3 className="ml-[18px] text-[18px] font-semibold text-brown lg:text-[20px]">
                Flexible & Remote Work
              </h3>
            </div>

            <p className="text-[16px] leading-[22px] text-brown">
              Work with distributed teams across India with flexible work options that fit your lifestyle.
            </p>
          </div>

          <div className="flex flex-col rounded-[24px] border border-primary p-6 lg:w-[389.33px] lg:p-[30px]">
            <div className="mb-[24px] flex items-center lg:mb-[27px]">
              <Image alt="learning-icon" src="/images/careers/img2.svg" width={30} height={30} />

              <h3 className="ml-[12px] text-[18px] font-semibold text-brown lg:text-[20px]">
                Learning & Growth
              </h3>
            </div>

            <p className="text-[16px] leading-[22px] text-brown">
              Upskill in: Sustainability certifications, Construction technology and Procurement systems with dedicated budgets.
            </p>
          </div>

          <div className="flex flex-col rounded-[24px] border border-primary p-6 lg:w-[389.33px] lg:p-[30px]">
            <div className="mb-[24px] flex items-center lg:mb-[27px]">
              <Image alt="impact-icon" src="/images/careers/img3.svg" width={30} height={30} />

              <h3 className="ml-[12px] text-[18px] font-semibold text-brown lg:text-[20px]">
                Impact Opportunities
              </h3>
            </div>

            <p className="text-[16px] leading-[22px] text-brown">
              Participate in projects that contribute to real-world environmental impact and ESG goals at scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
