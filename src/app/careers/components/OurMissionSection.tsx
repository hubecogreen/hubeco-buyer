import Image from "next/image";

export default function OurMissionSection() {
  return (
    <section className="w-full flex lg:max-w-[1440px] mx-auto lg:px-[100px] ">

      {/* Container */}
      <div className="w-full max-w-[1280px] pt-[80px] pb-[70px]">

        {/* Row */}
        <div className="flex gap-[80px]">

          {/* LEFT SIDE */}
          <div className="w-[576px]">

            {/* Label */}
            <p className="h-[20px] text-primary uppercase text-[14px] font-bold  tracking-[2px]">
              OUR MISSION
            </p>

            {/* Heading */}
            <h2 className="mt-4 h-[144px] text-brown text-[44px] font-semibold leading-[1.2]">
              Digitizing Sustainable <br />
              Construction <br />
              Procurement in India
            </h2>

          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              w-[576px]
              pt-[39px]
              flex flex-col
              gap-[24px]
              text-brown
              text-[16px]
              leading-[1.6]
            "
          >

            {/* Paragraph */}
            <p className="text-brown text-[20px]">
              At Hubeco, our mission is to simplify and scale access to certified
              sustainable construction materials through a unified digital platform.
            </p>

            <p className="text-brown text-[20px]">
              We empower stakeholders across the construction ecosystem with:
            </p>

            {/* Points */}
            <ul className="space-y-3">
              <li className="flex items-end gap-3">
                <Image
                  src="/images/careers/Icon.svg"   // your png path
                  alt="check"
                  width={20}
                  height={20}
                  className="mt-[2px]"
                />
                <p className="text-[18px]">
                  Verified green materials (GreenPro, EPD, GRIHA)
                </p>
              </li>

              <li className="flex items-end gap-3">
                 <Image
                  src="/images/careers/Icon.svg"   // your png path
                  alt="check"
                  width={20}
                  height={20}
                  className="mt-[2px]"
                />
                <p className="text-[18px]">
                  Transparent supplier networks
                </p>
              </li>

              <li className="flex items-end gap-3">
                <Image
                  src="/images/careers/Icon.svg"   // your png path
                  alt="check"
                  width={20}
                  height={20}
                  className="mt-[2px]"
                />
                <p className="text-[18px]">
                  Real-time procurement workflows
                </p>
              </li>

              <li className="flex items-end gap-3">
               <Image
                  src="/images/careers/Icon.svg"   // your png path
                  alt="check"
                  width={20}
                  height={20}
                  className="mt-[2px]"
                />
                <p className="text-[18px]">
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