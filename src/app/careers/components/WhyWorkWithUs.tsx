import Image from "next/image";

export default function WhyWorkWithUs() {
  return (
    <section className="w-full flex justify-center bg-cream">

      {/* Container */}
      <div className="w-full max-w-[1280px] h-[730px] pt-[40px] pb-[40px] px-[24px]">

        {/* Heading Block */}
        <div className="flex flex-col items-center text-center">

          <h2 className="text-[48px] font-bold leading-[48px] text-brown">
            Why Work at Hubeco
          </h2>

          <h3 className="mt-2 text-[42px] font-medium leading-[48px] text-brown">
            Where Sustainability Meets Digital Innovation
          </h3>

          <p className="mt-4 max-w-[700px] text-[18px] leading-[28px] text-brown">
            Work at the intersection of construction, climate tech, and digital procurement systems.
            Hubeco offers a high-impact environment where your work directly contributes to reducing
            carbon emissions and improving material transparency in the built environment.
          </p>
        </div>

        {/* Cards Section */}
        <div className="mt-12 flex justify-center gap-[32px]">

          {/* CARD 1 */}
          <div className="w-[389.33px] h-[362px] rounded-[24px] border border-primary bg-cream shadow-[0px_4px_24px_-1px_#0000000D] p-[41px]">
            <div className="mb-8">
              <Image
                src="/images/careers/icon1.svg"   // your png path
                alt="check"
                width={64}
                height={64}
                className="mt-[2px]"
              />
            </div>

            <h4 className="text-[24px] font-semibold mb-4 text-brown">
              Impact-Driven Work
            </h4>

            <p className="text-[16px] text-brown leading-[1.6]">
              Build solutions that enable carbon reduction in construction projects by helping
              businesses choose sustainable materials.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="w-[389.33px] h-[362px] rounded-[24px] border border-primary bg-cream shadow-[0px_4px_24px_-1px_#0000000D] p-[41px]">
            <div className="mb-8">
              <Image
                src="/images/careers/icon2.svg"   // your png path
                alt="check"
                width={64}
                height={64}
                className="mt-[2px]"
              />
            </div>

            <h4 className="text-[24px] font-semibold mb-4 text-brown">
              Innovative Work Environment
            </h4>

            <p className="text-[16px] text-brown leading-[1.6]">
              Work on cutting-edge platforms involving digital procurement systems,
              supply chain optimization, and sustainability analytics.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="w-[389.33px] h-[362px] rounded-[24px] border border-primary bg-cream shadow-[0px_4px_24px_-1px_#0000000D] p-[41px]">
            <div className="mb-8">
              <Image
                src="/images/careers/icon3.svg"   // your png path
                alt="check"
                width={64}
                height={64}
                className="mt-[2px]"
              />
            </div>

            <h4 className="text-[24px] font-semibold mb-4 text-brown">
              Transparency & Trust
            </h4>

            <p className="text-[16px] text-brown leading-[1.6]">
              We promote open collaboration between buyers, vendors, and partners ensuring
              accountability and efficiency across every project.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}