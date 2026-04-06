import Image from "next/image";

export default function BenefitsSection() {
    return (
        <section className="w-full flex justify-center bg-cream">

            {/* Main Container */}
            <div className="w-full max-w-[1280px] py-[40px]  px-[24px]">

                {/* Heading */}
                <h2 className="text-center text-[36px] leading-[48px] font-bold text-brown max-w-[800px] mx-auto">
                    Benefits Designed for High-Performance Teams in Climate Tech
                </h2>

                {/* Cards Wrapper */}
                <div className="mt-[48px] flex gap-[32px]">

                    {/* CARD 1 */}
                    <div className="w-[389.33px] border border-primary rounded-[24px] p-[30px] flex flex-col">

                        {/* ICON */}
                        <div className=" mb-[27px] flex items-center">
                            <Image  alt="location-icon" src="/images/careers/img1.svg"  width={21} height={30} />
                  

                        <h3 className="text-[20px] font-semibold text-brown ml-[18px]">
                            Flexible & Remote Work
                        </h3>

                              </div>

                        <p className="text-[16px] text-brown leading-[22px]">
                            Work with distributed teams across India with flexible work options that fit your lifestyle.
                        </p>

                    </div>

                    {/* CARD 2 */}
                    <div className="w-[389.33px]  border border-primary rounded-[24px] p-[30px] flex flex-col">

                        <div className=" mb-[27px] flex items-center">
                            <Image  alt="learning-icon" src="/images/careers/img2.svg"  width={30} height={30} />
                     

                        <h3 className="text-[20px] font-semibold text-brown ml-[12px]">
                            Learning & Growth
                        </h3>
                           </div>

                        <p className="text-[16px] text-brown leading-[22px]">
                            Upskill in: Sustainability certifications, Construction technology and Procurement systems with dedicated budgets.
                        </p>

                    </div>

                    {/* CARD 3 */}
                    <div className="w-[389.33px]  border border-primary rounded-[24px] p-[30px] flex flex-col">

                        <div className=" mb-[27px] flex items-center">
                            <Image  alt="impact-icon" src="/images/careers/img3.svg"  width={30} height={30} />
                 

                        <h3 className="text-[20px] font-semibold text-brown ml-[12px]">
                            Impact Opportunities
                        </h3>
                               </div>

                        <p className="text-[16px] text-brown leading-[22px]">
                            Participate in projects that contribute to real-world environmental impact and ESG goals at scale.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
}