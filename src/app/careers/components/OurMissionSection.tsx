import Image from "next/image";

export default function OurMissionSection() {
  return (
    <section className="mx-auto flex w-full px-5 sm:px-6 lg:max-w-[1440px] lg:px-[100px]">
      <div className="w-full max-w-[1280px] pb-[56px] pt-[56px] lg:pb-[70px] lg:pt-[80px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-[80px]">
          <div className="w-full lg:w-[576px]">
            <p className="text-[14px] font-bold uppercase tracking-[2px] text-primary">
              OUR MISSION
            </p>

            <h2 className="mt-4 text-[32px] font-semibold leading-[1.2] text-brown sm:text-[38px] lg:text-[44px]">
              Digitizing Sustainable <br className="hidden lg:block" />
              Construction <br className="hidden lg:block" />
              Procurement in India
            </h2>
          </div>

          <div className="flex w-full flex-col gap-5 pt-0 text-[16px] leading-[1.6] text-brown lg:w-[576px] lg:gap-[24px] lg:pt-[39px]">
            <p className="text-[18px] text-brown lg:text-[20px]">
              At Hubeco, our mission is to simplify and scale access to certified
              sustainable construction materials through a unified digital platform.
            </p>

            <p className="text-[18px] text-brown lg:text-[20px]">
              We empower stakeholders across the construction ecosystem with:
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Image
                  src="/images/careers/Icon.svg"
                  alt="check"
                  width={20}
                  height={20}
                  className="mt-[2px]"
                />
                <p className="text-[16px] leading-[1.5] lg:text-[18px]">
                  Verified green materials (GreenPro, EPD, GRIHA)
                </p>
              </li>

              <li className="flex items-start gap-3">
                <Image
                  src="/images/careers/Icon.svg"
                  alt="check"
                  width={20}
                  height={20}
                  className="mt-[2px]"
                />
                <p className="text-[16px] leading-[1.5] lg:text-[18px]">
                  Transparent supplier networks
                </p>
              </li>

              <li className="flex items-start gap-3">
                <Image
                  src="/images/careers/Icon.svg"
                  alt="check"
                  width={20}
                  height={20}
                  className="mt-[2px]"
                />
                <p className="text-[16px] leading-[1.5] lg:text-[18px]">
                  Real-time procurement workflows
                </p>
              </li>

              <li className="flex items-start gap-3">
                <Image
                  src="/images/careers/Icon.svg"
                  alt="check"
                  width={20}
                  height={20}
                  className="mt-[2px]"
                />
                <p className="text-[16px] leading-[1.5] lg:text-[18px]">
                  Integrated green financing solutions
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
