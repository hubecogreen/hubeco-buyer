import Image from "next/image";

export default function WhyWorkWithUs() {
  return (
    <section className="flex w-full justify-center bg-cream">
      <div className="w-full max-w-[1280px] px-5 lg:pb-[40px] lg:pt-[40px] py-[20px] sm:px-6 lg:px-[24px]">
        <div className="flex flex-col items-start text-start lg:items-center lg:text-center">
          <h2 className="text-[32px]  font-bold leading-[1.15] text-brown sm:text-[40px] lg:text-[48px] lg:leading-[48px]">
            Why Work at Hubeco
          </h2>

          <h3 className="mt-2 text-[30px] lg:font-medium font-bold leading-[1.2] text-brown sm:text-[34px] lg:text-[42px] lg:leading-[48px]">
            Where Sustainability Meets Digital Innovation
          </h3>

          <p className="mt-4 max-w-[700px] text-[16px] leading-[26px] text-brown lg:text-[18px] lg:leading-[28px]">
            Work at the intersection of construction, climate tech and digital procurement systems.
            Hubeco offers a high-impact environment where your work directly contributes to reducing
            carbon emissions and improving material transparency in the built environment.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-[32px]">
          <div className="rounded-[24px] border border-primary bg-cream px-6 py-7 shadow-[0px_4px_24px_-1px_#0000000D] lg:h-[252px] lg:w-[389.33px] lg:px-[32px] lg:py-[36px]">
            <div className="mb-[22px] flex items-center">
              <Image src="/images/careers/icon1.svg" alt="check" width={52} height={52} />

              <h4 className="ml-[18px] text-[19px] font-bold text-brown lg:text-[21px]">
                Impact-Driven Work
              </h4>
            </div>
            <p className="text-[16px] leading-[1.6] text-brown">
              Build solutions that enable carbon reduction in construction projects by helping
              businesses choose sustainable materials.
            </p>
          </div>

          <div className="rounded-[24px] border border-primary bg-cream px-6 py-7 shadow-[0px_4px_24px_-1px_#0000000D] lg:h-[252px] lg:w-[389.33px] lg:px-[32px] lg:py-[36px]">
            <div className="mb-[16px] flex items-center">
              <Image
                src="/images/careers/icon2.svg"
                alt="check"
                width={52}
                height={52}
                className="mt-[2px]"
              />

              <h4 className="ml-[18px] text-[19px] font-bold text-brown lg:text-[21px]">
                Innovative Work Environment
              </h4>
            </div>

            <p className="text-[16px] leading-[1.6] text-brown">
              Work on cutting-edge platforms involving digital procurement systems,
              supply chain optimization and sustainability analytics.
            </p>
          </div>

          <div className="rounded-[24px] border border-primary bg-cream px-6 py-7 shadow-[0px_4px_24px_-1px_#0000000D] lg:h-[252px] lg:w-[389.33px] lg:px-[32px] lg:py-[36px]">
            <div className="mb-[16px] flex items-center">
              <Image
                src="/images/careers/icon3.svg"
                alt="check"
                width={52}
                height={52}
                className="mt-[2px]"
              />

              <h4 className="ml-[18px] text-[19px] font-bold text-brown lg:text-[21px]">
                Transparency & Trust
              </h4>
            </div>
            <p className="text-[16px] leading-[1.6] text-brown">
              We promote open collaboration between buyers, vendors and partners ensuring
              accountability and efficiency across every project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
