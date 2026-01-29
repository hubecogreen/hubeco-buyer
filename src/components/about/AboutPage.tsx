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
          className="z-100 bg-cream w-full flex items-center justify-center md:py-20 py-5 bg-cover bg-no-repeat bg-center relative lg:h-[500px]"
          style={{ backgroundImage: "url('/images/about/Subtract (2).png')" }}
        >
          <div className="text-center p-4 text-brown">
            <h1 className="text-4xl font-bold mb-4">ABOUT</h1>
            <p
              className="md:text-lg text-md md:text-center text-justify font-normal mx-auto max-w-[93%] text-brown"
            >
              I am delighted to introduce hubeco.market, our green sourcing
              platform for building and architectural products and services. Our
              mission is to empower builders architects and homeowners to make
              sustainable choices that positively impact our planet. We believe
              that every construction project, whether big or small, should
              prioritize eco-friendliness and energy efficiency without
              compromising on quality or affordability.The building and
              construction sector accounts for 40% of global carbon emissions,
              and we aim to change that at hubeco!!
            </p>
          </div>
        </div>

        <div className=" w-full ">
          <div
            className={`${styles.secondSection} flex flex-col md:flex-row items-center justify-between
        md:py-12 py-6 px-2 lg:px-4 mx-auto max-w-[90%] gap-6 mb-12`}
          >
            {/* TEXT COLUMN */}
            <div className="md:w-1/2 overflow-visible lg:overflow-auto p-2 lg:p-4">
              <h1 className="text-2xl font-bold mb-4 text-brown">What We Do</h1>
              <p className="text-md text-brown mb-6">
                We provide a comprehensive marketplace that connects you with a wide
                range of eco-friendly building materials.
              </p>

              <Accordion
                allowMultiple={false}
                defaultIndex={selectedIndex ?? [0]}
                onChange={handleAccordionChange}
              >
                {accordionItems.map((item, index) => (
                  <AccordionItem key={index} className="border-b border-primary py-4">
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <Image
                              src={item.imgSrc}
                              alt={item.alt}
                              width={32}
                              height={32}
                              className={
                                selectedIndex === index ||
                                  (selectedIndex === undefined && index === 0)
                                  ? ""
                                  : "grayscale"
                              }
                            />
                            <span className="font-semibold text-brown">
                              {item.title}
                            </span>
                          </div>
                          {isExpanded ? (
                            <PiMinusCircleBold className="text-primary" />
                          ) : (
                            <TbCirclePlus className="text-primary" />
                          )}
                        </AccordionButton>

                        <AccordionPanel className="pl-10 text-sm text-brown">
                          {item.description}
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* IMAGE COLUMN (VISIBLE ON TABLET + DESKTOP) */}
            <div className="flex md:flex md:w-1/2 justify-center items-center p-2 lg:p-4">
              <Image
                src="images/about/aboutBanner2.webp"
                alt="What we do"
                width={512}
                height={512}
                className="rounded-md max-w-lg w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-center md:pb-2 pb-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold md:mb-4 text-brown">
                Our Values
              </h1>
            </div>
          </div>
          <div
            className="flex flex-col lg:flex-row justify-evenly mx-auto max-w-[94%]"
          >
            <div className="w-full lg:w-5/12 md:py-2 py-2 md:pr-5 pr-1">
              {valueItems.slice(0, 2).map((item, index) => (
                <div key={index} className="flex p-4 items-start justify-start">
                  <div className="align-middle bg-primary hover:bg-primary mt-[5px] md:ml-4 md:p-1.5 p-[7px] rounded-md  ">
                    <Image
                      src={item.imgSrc}
                      alt={item.alt}
                      width={30}
                      height={25}
                      onError={e => {
                        e.currentTarget.src = 'images/product-placeholder.webp'
                      }}
                      loading="lazy"
                    // className="md:h-[25px] md:w-[30px] h-[25px] w-[25px] "
                    // style={{ height: "25px", width: "30px" }}
                    />
                  </div>
                  <div className="ml-4">
                    <h1 className="text-xl font-medium mb-4 text-brown text-justify">
                      {item.title}
                    </h1>
                    <p className="max-w-2xl text-brown text-md font-normal text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-3/12 py-5 flex justify-center items-center">
            <Image
                src="images/about/values.webp"
                alt="banner1"
                className=" w-full  h-auto rounded-md max-w-xs lg:max-w-sm mx-auto md:hidden lg:block block"
                width={332.69}
                height={332.69}
                onError={e => {
                  e.currentTarget.src = 'images/product-placeholder.webp'
                }}
                loading="lazy"
              />
              <Image
                src="images/about/values-tab.jpg"
                alt="banner1"
                className=" min-w-[720px] h-auto rounded-md max-w-xs lg:max-w-sm mx-auto md:block lg:hidden hidden"
                width={720.69}
                height={332.69}
                onError={e => {
                  e.currentTarget.src = 'images/product-placeholder.webp'
                }}
                loading="lazy"
              />
            </div>
            <div className="w-full lg:w-2/5 md:py-2 py-11 md:pl-5">
              {valueItems.slice(2).map((item, index) => (
                <div key={index} className="flex p-4 items-start justify-start">
                  <div className="align-middle bg-primary hover:bg-primary mt-[5px] lg:ml-4 md:ml-[-5px] md:p-1.5 p-[7px] rounded-md  ">
                    <Image
                      src={item.imgSrc}
                      alt={item.alt}
                      height={20}
                      width={35}
                      onError={e => {
                        e.currentTarget.src = 'images/product-placeholder.webp'
                      }}
                      loading="lazy"
                    // className="rotate-on-hover"
                    // style={{ height: "25px", width: "40px" }}
                    />
                  </div>
                  <div className="ml-4">
                    <h1 className="text-xl font-medium mb-4 text-brown text-justify">
                      {item.title}
                    </h1>
                    <p className="max-w-2xl text-brown text-md text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <CustomButton
              title={"Explore Materials"}
              className="md:ml-3 bg-primary hover:bg-primary h-12 md:h-12 md:w-48 w-44 md:text-md text-sm text-white whitespace-nowrap"
              customStyles={{}}
              rightIcon={<GoArrowRight />}
              onPress={() => router.push("/products")}
            />
          </div>
        </div>

        <div
          className="bg-cream w-full flex flex-col lg:flex-row items-start justify-center py-12 md:px-16 px-4 lg:px-20 space-y-8 lg:space-y-0 lg:space-x-4 bg-cover bg-no-repeat bg-center relative"
          // style={{backgroundImage: "url('/images/about/aboutWavesBg_2.png')"}}
        >
          <div className="flex flex-col items-start md:w-[100%] lg:w-1/2 md:pl-0">
            <Image
              src="images/about/aboutBanner3.webp"
              alt="banner1"
              className="h-64 lg:h-72 w-full rounded-md md:w-full lg:w-full"
              width={668.28}
              height={288}
              onError={e => {
                e.currentTarget.src = 'images/product-placeholder.webp'
              }}
              loading="lazy"
            />
            <div className="mt-4 max-w-full text-left">
              <h1 className="text-2xl font-bold mb-4 text-brown">
                Our Mission
              </h1>
              <p className="text-md text-brown font-normal text-left md:text-justify">
                To empower builders, architects and homeowners with access to a
                comprehensive marketplace of high-quality green building
                materials, fostering sustainable practices and environmental
                stewardship in the construction industry.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start md:w-[100%] lg:w-1/2 md:pl-0">
            <Image
              src="images/about/aboutBanner4.webp"
              alt="banner2"
              className="h-64 lg:h-72 w-full rounded-md md:w-full lg:w-full"
              width={648.53}
              height={288}
              onError={e => {
                e.currentTarget.src = 'images/product-placeholder.webp'
              }}
              loading="lazy"
            />
            <div className="mt-4 max-w-full text-left">
              <h1 className="text-2xl font-bold mb-4 text-brown">
                Our Vision
              </h1>
              <p className="text-md text-brown font-normal text-left  md:text-justify">
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
                        window.location.href =`${process.env.NEXT_PUBLIC_VENDOR_URL}/login`;
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
        <div className="bg-cream w-full flex items-center justify-center p-6 md:p-12 bg-cover bg-no-repeat bg-center relative pb-0 lg:pb-20">
          <div className="w-full flex justify-center">
            {/* Main Container: 1280px x 542px */}
            <div className="relative flex flex-col lg:flex-row w-full max-w-[400px] h-[542px] md:max-w-[770px] md:h-[952.5px] md:px-[6.95px] lg:pr-0 lg:max-w-[1280px] lg:h-auto border border-primary bg-cream rounded-xl overflow-hidden">


              {/* TEXT COLUMN: Properties based on Figma Auto Layout */}
              <div className="flex-1 flex flex-col items-start justify-start px-4 md:px-12 lg:px-16 lg:pt-[95px] pt-2">
                {/* Text Container: Set to Fill width and Hug height */}
                <div className="w-full h-auto flex flex-col items-start gap-0">
                  <h1 className="text-[40px] md:text-[56px] lg:text-[60px] font-bold text-brown leading-[1.1] lg:mb-[52px] mb-[20px]">
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
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-auto lg:pb-[95px]">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-brown">
                          SaiPadma Potluri
                        </h2>
                        <Link
                          href="https://www.linkedin.com/in/saipadmap/"
                          target="_blank"
                          className="hidden lg:flex p-1 rounded-md h-7 w-7 bg-primary hover:opacity-90 flex items-center justify-center transition-all"
                        >
                          <BiLogoLinkedin className="text-white" size={24} />
                        </Link>
                      </div>
                      <p className="text-brown text-lg">
                        Founder & CEO
                      </p>
                      <Link
                        href="https://www.linkedin.com/in/saipadmap/"
                        target="_blank"
                        className="lg:hidden mt-1 p-1 rounded-md h-7 w-7 bg-primary hover:opacity-90 flex items-center justify-center transition-all"
                      >
                        <BiLogoLinkedin className="text-white" size={24} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* IMAGE COLUMN: Fixed 668px width */}
              <div className="relative w-full h-[400px] md:w-[756.11px] md:h-[678.58px] lg:w-[668px] lg:h-[542px]">
                <Image
                  src="/images/about/blob-mobile.png"
                  alt="SaiPadma Potluri - Founder & CEO"
                  fill
                  className="object-cover object-top md:hidden"
                  loading="lazy"
                />
                <Image
                  src="/images/about/blob-tab.png"
                  alt="SaiPadma Potluri - Founder & CEO"
                  width={756}
                  height={678}
                  className="hidden md:block lg:hidden absolute bottom-0 left-[49%] -translate-x-1/2"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}