export default function BuildFutureSection() {
    return (
        <section className="w-full flex justify-center bg-cream">

            {/* Main Container */}
            <div className="w-full max-w-[1280px] py-[40px] px-[24px]">

                {/* Two Column Layout */}
                <div className="flex gap-[32px] items-center">

                    {/* LEFT SIDE */}
                    <div className="w-[584px] flex flex-col gap-[32px]">

                        <h2 className="text-[48px] font-bold leading-[48px] text-brown">
                            Build the Future of Green Construction Ecosystems
                        </h2>

                        <p className="text-[20px] text-brown leading-[26px]">
                            At Hubeco, you won’t just work on products, you’ll build infrastructure
                            for the future of construction:
                        </p>

                        {/* LIST */}
                        <div className="flex flex-col gap-[16px]">

                            {[
                                "Platform for sustainable material discovery and procurement",
                                "Tools for RFQ management and supplier comparison",
                                "Systems for CO₂ tracking and environmental impact measurement",
                                "Digital workflows for end-to-end construction sourcing"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-[16px]">

                                    <div className="min-w-[40px] h-[40px] flex items-center justify-center rounded-[10px] bg-[#E6F4F1]">
                                        <span className="text-[#2AAE9E] text-[14px] font-semibold">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <p className="text-[18px] text-[#5A5A5A] leading-[22px]">
                                        {item}
                                    </p>
                                </div>
                            ))}

                        </div>

                        <p className="text-[#2AAE9E] text-[18px] font-medium">
                            This is your opportunity to shape how India builds smarter, faster and greener.
                        </p>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className="w-[584px] h-[512px] flex gap-[16px]">

                        {/* COLUMN 1 */}
                        <div className="flex flex-col gap-[16px] items-end mb-[32px]">

                            {/* TOP IMAGE */}
                            <div className="w-[284px] h-[256px] rounded-[16px] overflow-hidden">
                                <img src="/images/careers/img1.png" className="w-full h-full object-cover" />
                            </div>

                            {/* BOTTOM IMAGE */}
                            <div className="w-[284px] h-[192px] rounded-[16px] overflow-hidden bottom-4">
                                <img src="/images/careers/img2.png" className="w-full h-full object-cover" />
                            </div>

                        </div>

                        {/* COLUMN 2 */}
                        <div className="flex flex-col gap-[16px] items-end mt-[32px]">

                            {/* TOP IMAGE */}
                            <div className="w-[284px] h-[192px] rounded-[16px] overflow-hidden">
                                <img src="/images/careers/img3.png" className="w-full h-full object-cover" />
                            </div>

                            {/* BOTTOM IMAGE */}
                            <div className="w-[284px] h-[256px] rounded-[16px] overflow-hidden">
                                <img src="/images/careers/img4.png" className="w-full h-full object-cover" />
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}