export default function BuildFutureSection() {
  return (
    <section className="flex w-full justify-center bg-cream">
      <div className="w-full max-w-[1280px] px-5 lg:py-[40px] py-[20px] sm:px-6 lg:px-[24px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[32px]">
          <div className="flex w-full flex-col gap-6 lg:w-[584px] lg:gap-[32px]">
            <h2 className="text-[26px] font-bold leading-[1.15] text-brown sm:text-[40px] lg:text-[48px] lg:leading-[48px]">
              Build the Future of Green Construction Ecosystems
            </h2>

            <p className="text-[18px] leading-[26px] text-brown lg:text-[20px]">
              At Hubeco, you won’t just work on products, you’ll build infrastructure
              for the future of construction:
            </p>

            <div className="flex flex-col gap-[16px]">
              {[
                "Platform for sustainable material discovery and procurement",
                "Tools for RFQ management and supplier comparison",
                "Systems for CO₂ tracking and environmental impact measurement",
                "Digital workflows for end-to-end construction sourcing",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-[16px]">
                  <div className="flex h-[40px] min-w-[40px] items-center justify-center rounded-[10px] bg-[#E6F4F1]">
                    <span className="text-[14px] font-semibold text-[#2AAE9E]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-[17px] leading-[22px] text-brown lg:text-[18px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[16px] font-medium text-[#2AAE9E] lg:text-[18px]">
              This is your opportunity to shape how India builds smarter, faster and greener.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 lg:flex lg:h-[512px] lg:w-[584px] lg:gap-[16px]">
            <div className="flex flex-col gap-[16px] lg:mb-[32px] lg:items-end">
              <div className="h-[180px] w-full overflow-hidden rounded-[16px] sm:h-[220px] lg:h-[256px] lg:w-[284px]">
                <img src="/images/careers/img1.png" className="h-full w-full object-cover" />
              </div>

              <div className="h-[150px] w-full overflow-hidden rounded-[16px] sm:h-[180px] lg:h-[192px] lg:w-[284px]">
                <img src="/images/careers/img2.png" className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="flex flex-col gap-[16px] lg:mt-[32px] lg:items-end">
              <div className="h-[150px] w-full overflow-hidden rounded-[16px] sm:h-[180px] lg:h-[192px] lg:w-[284px]">
                <img src="/images/careers/img3.png" className="h-full w-full object-cover" />
              </div>

              <div className="h-[180px] w-full overflow-hidden rounded-[16px] sm:h-[220px] lg:h-[256px] lg:w-[284px]">
                <img src="/images/careers/img4.png" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
