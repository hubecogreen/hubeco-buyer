"use client";
// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
import { BiLogoLinkedin } from "react-icons/bi";
import { TbCirclePlus } from "react-icons/tb";
import { PiMinusCircleBold } from "react-icons/pi";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  // AccordionIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomButton from "@/components/customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
// import Head from "next/head";
import styles from "./About.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ExpandedIndex = number | null | undefined;
export default function Page() {
  const accordionItems = [
    {
      imgSrc: "images/about/road.png",
      alt: "sustain",
      title: "Environmentally Responsible",
      description: "Sourced from sustainable practices and recycled content.",
    },
    {
      imgSrc: "images/about/renewable-energy.png",
      alt: "energy",
      title: "Energy Efficient",
      description:
        "Designed to reduce energy consumption and enhance building performance.",
    },
    {
      imgSrc: "images/about/healthy-heart.png",
      alt: "healthy",
      title: "Healthy",
      description:
        " Low in VOCs and free from harmful chemicals, promoting better indoor air quality.",
    },
    {
      imgSrc: "images/about/kettlebell.png",
      alt: "durable",
      title: "Durable",
      description:
        "Built to last, ensuring long-term sustainability and reduced maintenance costs.",
    },
  ];
  const [selectedIndex, setSelectedIndex] = useState<ExpandedIndex | undefined>(
    undefined
  );
  const router = useRouter();
  const valueItems = [
    {
      imgSrc: "images/about/sustain.webp",
      alt: "sustain",
      title: "Sustainability",
      description:
        "We prioritize materials and practices that reduce environmental impact and promote long-term ecological balance.",
    },
    {
      imgSrc: "images/about/trans.webp",
      alt: "transparency",
      title: "Transparency",
      description:
        "We believe in providing clear, accurate information about our products, including their environmental impact and sourcing practices.",
    },
    {
      imgSrc: "images/about/quality.webp",
      alt: "quality",
      title: "Quality",
      description:
        "We are committed to offering only the highest quality products that meet rigorous standards for performance and sustainability.",
    },
    {
      imgSrc: "images/about/community.webp",
      alt: "community",
      title: "Community",
      description:
        "We foster a community of like-minded individuals and organizations dedicated to advancing sustainable building practices.",
    },
  ];

  const handleAccordionChange = (index: number | number[] | null) => {
    if (Array.isArray(index)) {
      setSelectedIndex(index[0] ?? undefined);
    } else {
      setSelectedIndex(index ?? undefined);
    }
  };

  useEffect(() => { }, []);
  return (
    <div className="bg-cream md:mb-0 ">
      <head>
        <title>About | Hubeco Buyer</title>
      </head>

      <div className="banner-section h-102">
        <div className="relative bg-cover bg-center h-[200px] flex items-center justify-start text-white px-20"
          style={{ backgroundImage: 'url("images/about/aboutBanner1.webp")' }}>
          <Link
            href="/"
            className="text-white flex items-center no-underline px-2.5 py-1 rounded"
          >
            <AiFillHome size={16} className="text-white mr-1.5" />
            Home
          </Link>

          <span className="text-white mx-2">/</span>
          <Link
            href="/about"
            className="text-white no-underline px-2.5 py-1 rounded"
          >
            About
          </Link>
        </div>
          
        <div
          className="
                    z-100 bg-cream w-full flex justify-start items-center
                    pt-[80px] pb-[40px]
                    px-[80px]
                    md:px-[40px]
                    max-lg:px-6
                    max-sm:px-4
  "
        >
          <div className="flex flex-col lg:flex-row max-w-[1280px] w-full gap-16 text-brown mx-auto">
            <div className="flex flex-col lg:w-[608px] justify-between w-full">
              {/* TOP CONTENT */}
              <div>
                <span
                  className="
                            inline-flex items-center justify-center
                            gap-2
                            px-3 py-[6px]
                            text-sm font-semibold text-primary
                            rounded-full
                            border
                            bg-[#1099891A]
                            border-[#10998933]
                            mb-8
                            w-fit
                          "
                >
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  ABOUT US
                </span>

                <h2 className="lg:text-[60px] md:text-[48px] text-[36px] font-bold leading-[1.1] mb-8">
                  <span className="block text-brown">Building a</span>
                  <span className="block text-primary">Sustainable Future</span>
                </h2>

                <div>
                  <p className="md:text-lg lg:text-[18px] text-start leading-relaxed">
                    I am delighted to introduce{" "}
                    <span className="font-bold">hubeco.market</span>, our green sourcing
                    platform for building and architectural products and services.
                  </p>
                  <p className="md:text-lg text-[18px] text-start leading-relaxed mt-4">
                    Our mission is to empower builders architects and homeowners to make
                    sustainable choices that positively impact our planet. We believe
                    that every construction project, whether big or small, should
                    prioritize eco-friendliness and energy efficiency without
                    compromising on quality or affordability. The building and
                    construction sector accounts for 40% of global carbon emissions,
                    and we aim to change that at hubeco!!
                  </p>
                </div>
              </div>

              {/* BUTTON (BOTTOM) */}
              <CustomButton
                title="Explore Marketplace"
                className="
      self-start
      w-[215px] h-[56px]
      md:mt-[48px] mt-[48px]
      px-4 py-[16px]
      rounded-[8px]
      bg-[#109989] hover:bg-[#109989]
      text-white
      flex items-center justify-center
      gap-1
      whitespace-nowrap
    "
     onPress={() => router.push("/products")}
                rightIcon={<GoArrowRight />}
              />
            </div>

            {/* IMAGE COLUMN */}
            <div className=" flex w-full lg:w-[608px]">
              <Image
                src="images/about/aboutBanner2.webp"
                alt="About Hubeco"
                width={608}
                height={600}
                className="w-full lg:h-[608px] h-[268px] md:h-[408px] rounded-[16px] object-cover"
              />
            </div>

          </div>
        </div>

        <div className=" w-full ">
          {/* Replace the entire secondSection div with this */}
          <div className={`flex flex-col items-center py-2 md:px-8 lg:px-0 px-2 md:py-8 lg:pb-10 mx-auto max-w-[1280px] w-full gap-6 `}>
            <div className="w-full p-2 md:p-2 lg:p-0">
              <span className="text-[14px] font-semibold text-primary tracking-wider mb-2 block">
                OUR FOCUS
              </span>

              <h1 className="text-2xl font-bold mb-4 text-brown">What We Do</h1>
              <p className="text-md text-brown lg:mb-6 md:mb-6 mb-6">
                We provide a comprehensive marketplace that connects you with a wide
                range of eco-friendly building materials.
              </p>

              {/* Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between gap-8 w-full">
                {accordionItems.map((item, index) => (
                  <div
                    key={index}
                    className="w-full lg:max-w-[290px] md:h-[259px] h-[153.5px] md:p-8 py-5 px-8 rounded-2xl border border-primary bg-cream hover:shadow-lg transition-shadow duration-300"
                    style={{
                      borderRadius: '16px',
                      borderWidth: '1px',
                    }}
                  >
                    <div className="flex md:flex-col flex-row justify-between md:justify-start gap-6 md:gap-0  h-full">
                      {/* Icon */}
                      <div className="mb-6">
                        <Image
                          src={item.imgSrc}
                          alt={item.alt}
                          width={56}
                          height={56}
                          className="w-15 h-14"
                        />
                      </div>
<div className="w-full flex items-start justify-between md:items-start justify-start flex-col">
                      {/* Title */}
                      <h3 className="font-semibold text-brown md:text-lg text-[20px] mb-3">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[14px] text-brown leading-relaxed">
                        {item.description}
                      </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* OUR VALUES SECTION */}
          <div className="w-full py-[40px] md:px-[40px] lg:px-[80px] px-4">
            <div className="max-w-[1280px] mx-auto w-full">

              <div className="flex flex-col lg:flex-row md:flex-col gap-[23px] md:gap-16 lg:items-end">

                {/* LEFT SIDE */}
                <div className="flex-1 order-2 lg:order-none mt-0">

                  {/* Heading */}
                  <div className="mb-12">
                    <h2 className="text-[36px] md:text-start text-center font-bold text-brown mb-4">
                      Our Values
                    </h2>
                    <p className="text-brown md:text-start text-center text-[18px] md:text-sm">
                      Guiding principles that drive our commitment to a sustainable future.
                    </p>
                  </div>

                  {/* Values List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-10">
                    {valueItems.map((item, index) => (
                      <div key={index} className="border-b border-primary pb-6">

                        <div className="flex items-start gap-4">

                          {/* Number Circle */}
                          <div className="min-w-[48px] h-[48px] rounded-full bg-[#1099891A] flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {(index + 1).toString().padStart(2, "0")}
                            </span>
                          </div>

                          {/* Text */}
                          <div>
                            <h3 className="text-[18px] font-semibold text-brown mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-brown leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full order-1 lg:order-none lg:flex-1 flex md:justify-start justify-center lg:justify-end">
                  <Image
                    src="images/about/values.webp"
                    alt="Sustainable values"
                    width={582}
                    height={702}
                    className="
                            w-full
                            max-w-[582px]                            
                            md:max-w-[688px]
                            md:h-[476px]
                            lg:h-auto
                            rounded-xl
                            object-cover
                            hidden
                            lg:block 
                            md:hidden
                            block
                          "
                  />
                  <Image
                   src="images/about/values-tab.jpg"
                    alt="Sustainable values"
                    width={688} 
                    height={476}
                    className="hidden md:w-full md:block lg:hidden rounded-xl"
                    />  
                    <Image
                    src="images/about/values-mob.png"
                    alt="Sustainable values"
                    width={358}
                    height={268}
                    className="md:hidden block lg:hidden w-full h-full rounded-xl"
                  />
                </div>


              </div>
              {/* Center Button */}
              <div className="flex justify-center mt-12 order-3 lg:order-none">
                <CustomButton
                  title="Explore Materials"
                  className="bg-primary hover:bg-primary text-white h-[48px] px-8 rounded-md"
                  rightIcon={<GoArrowRight />}
                  onPress={() => router.push("/products")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* MISSION & VISION SECTION */}
        <div className="w-full py-[40px] px-[80px] md:px-[40px] max-lg:px-6 max-sm:px-4">
          <div className="max-w-[1280px] mx-auto w-full">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* Mission Card */}
              <div className="border border-primary rounded-2xl p-6 bg-cream">

                <Image
                  src="images/about/aboutBanner3.webp"
                  alt="Our Mission"
                  width={600}
                  height={350}
                  className="w-full h-[220px] object-cover rounded-xl mb-6"
                />

                <h3 className="text-[22px] font-bold text-brown mb-4">
                  Our Mission
                </h3>

                <p className="text-brown text-sm leading-relaxed">
                  To empower builders, architects and homeowners with access to a
                  comprehensive marketplace of high-quality green building
                  materials, fostering sustainable practices and environmental
                  stewardship in the construction industry.
                </p>

              </div>

              {/* Vision Card */}
              <div className="border border-primary rounded-2xl p-6 bg-cream">

                <Image
                  src="images/about/aboutBanner4.webp"
                  alt="Our Vision"
                  width={600}
                  height={350}
                  className="w-full h-[220px] object-cover rounded-xl mb-6"
                />

                <h3 className="text-[22px] font-bold text-brown mb-4">
                  Our Vision
                </h3>

                <p className="text-brown text-sm leading-relaxed">
                  Our vision is to lead the transformation of the construction
                  industry towards a sustainable future by connecting buyers and
                  vendors of green building materials on a global scale. We
                  envision a world where sustainable construction practices are
                  the norm, where buildings are energy-efficient, environmentally
                  friendly and contribute positively to the well-being of people
                  and the planet.
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="relative">
          <div
            className="bg-cover bg-center h-auto md:h-80 lg:h-96"
            style={{ backgroundImage: "url(images/about/aboutBanner5.webp)" }}
          >
            <div className="bg-opacity-90 h-full flex items-center justify-center py-10 md:py-20">
              <div className="text-center p-4 max-w-lg md:max-w-2xl lg:max-w-4xl text-white">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                  Join Us on Our Journey
                </h1>
                <p className="mb-6 md:mb-8 lg:mb-10 text-sm md:text-base lg:text-lg">
                  Whether you are a builder, architect or homeowner, I invite
                  you to join us on our journey towards a more sustainable
                  future. Explore our marketplace, connect with our community
                  and discover the difference that ecofriendly materials can
                  make.
                </p>
                <div className="flex items-center justify-center">
                  <div className="flex flex-col md:flex-row gap-4">
                    <CustomButton
                      onPress={() => {
                        window.location.href = `${process.env.NEXT_PUBLIC_VENDOR_URL}/login`;
                      }}
                      title={"Vendor Connect"}
                      className="text-white bg-primary hover:bg-primary font-semibold h-12 w-full md:w-40 text-sm md:text-md"
                      customStyles={{
                        border: "1px solid #FFFFFF",
                        color: "#FFFFFF",
                        minWidth: "200px",
                      }}
                      rightIcon={<GoArrowRight />}
                    />
                    <CustomButton
                      title={"Register as a Buyer"}
                      className="text-white bg-primary hover:bg-primary font-semibold h-12 w-full md:w-40 text-sm md:text-md"
                      customStyles={{
                        border: "1px solid #FFFFFF",
                        color: "#FFFFFF",
                        minWidth: "200px",
                      }}
                      onPress={() => {
                        router.push("/login");
                      }}
                      rightIcon={<GoArrowRight />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROFILE SECTION */}
        <div className="bg-cream w-full flex items-center justify-center px-4 p-6 md:px-10 md:py-12 lg:p-12 bg-cover bg-no-repeat bg-center relative pb-0 lg:pb-20">
          <div className="w-full flex lg:justify-center">
            {/* Main Container: 1280px x 542px */}
            <div className="relative flex flex-col md:flex-row lg:flex-row  w-full  h-[542px]   md:h-[320px]  lg:pr-0 lg:max-w-[1280px] lg:h-auto border border-primary bg-cream rounded-xl overflow-hidden md:overflow-visible lg:overflow-hidden">


              {/* TEXT COLUMN: Properties based on Figma Auto Layout */}
              <div className="flex-1 flex flex-col items-start justify-start px-4 md:px-[32px] lg:px-16 lg:pt-[95px] md:pt-[40px] pt-2">
                {/* Text Container: Set to Fill width and Hug height */}
                <div className="w-full h-auto flex flex-col items-start gap-0">
                  <h1 className="text-[40px] md:text-[46px] lg:text-[60px] font-bold text-brown leading-[1.1] lg:mb-[52px] md:mb-[35px] mb-[20px]">
                    <span className="whitespace-nowrap">
                      Together,&nbsp;let&apos;s
                    </span>
                    <br />
                    <span className="whitespace-nowrap">
                      build&nbsp;a&nbsp;<span className="text-primary">greener</span>
                    </span>
                    <br />
                    tomorrow
                  </h1>
                  {/* <span className="text-brown-medium">
                      hubeco.market
                    </span> */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-6 md:gap-6  mt-auto lg:pb-[95px] md:pb-[50px]">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl md:text-[22px] font-bold text-brown">
                          SaiPadma Potluri
                        </h2>
                        <Link
                          href="https://www.linkedin.com/in/saipadmap/"
                          target="_blank"
                          className="hidden lg:flex md:flex p-1 rounded-md h-7 w-7 bg-primary hover:opacity-90 flex items-center justify-center transition-all"
                        >
                          <BiLogoLinkedin className="text-white" size={24} />
                        </Link>
                      </div>
                      <p className="text-brown md:text-[17px] text-lg">
                        Founder & CEO
                      </p>
                      <Link
                        href="https://www.linkedin.com/in/saipadmap/"
                        target="_blank"
                        className="lg:hidden md:hidden mt-1 p-1 rounded-md h-7 w-7 bg-primary hover:opacity-90 flex items-center justify-center transition-all"
                      >
                        <BiLogoLinkedin className="text-white" size={24} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* IMAGE COLUMN: Fixed 668px width */}
              <div className="relative w-full h-[400px] md:w-[528px] md:h-[320px] lg:w-[668px] lg:h-[542px]">                <Image
                src="/images/about/blob-mobile.png"
                alt="SaiPadma Potluri - Founder & CEO"
                fill
                className="object-cover object-top md:hidden"
                loading="lazy"
              />
                <Image
                  src="/images/about/blob-tab1.png"
                  alt="SaiPadma Potluri - Founder & CEO"
                  fill
                  className="hidden md:block lg:hidden absolute bottom-0 right-0 object-cover "
                  loading="lazy"
                />
                <Image
                  src="/images/about/blob-desktop.png"
                  alt="SaiPadma Potluri - Founder & CEO"
                  fill
                  style={{ objectFit: "cover" }}
                  className="hidden lg:block object-cover rounded-r-xl"
                  onError={(e) => {
                    e.currentTarget.src = 'images/product-placeholder.webp';
                  }}
                  loading="lazy"
                />


              </div>
              <div className="hidden lg:block md:hidden absolute bottom-0 left-[-40px]">
                <Image
                  src="/images/about/leaf.png"
                  alt="decorative leaf"
                  width={300}
                  height={500}

                  priority
                />
              </div>
              <div className="hidden lg:hidden md:block absolute bottom-0 left-[-10px]">
                <Image
                  src="/images/about/leaf-1.png"
                  alt="SaiPadma Potluri - Founder & CEO"
                  width={97}
                  height={238}

                  loading="lazy"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}