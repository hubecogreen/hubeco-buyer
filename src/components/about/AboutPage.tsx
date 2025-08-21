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
      imgSrc: "images/about/aboutEnv.webp",
      alt: "sustain",
      title: "Environmentally Responsible",
      description: "Sourced from sustainable practices and recycled content.",
    },
    {
      imgSrc: "images/about/aboutEnergy.webp",
      alt: "energy",
      title: "Energy Efficient",
      description:
        "Designed to reduce energy consumption and enhance building performance.",
    },
    {
      imgSrc: "images/about/aboutHeart.webp",
      alt: "healthy",
      title: "Healthy",
      description:
        " Low in VOCs and free from harmful chemicals, promoting better indoor air quality.",
    },
    {
      imgSrc: "images/about/aboutDurable.webp",
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

  useEffect(() => {}, []);
  return (
    <div className="bg-white md:mb-0 mb-[200px]">
      <head>
        <title>About | Hubeco Buyer</title>
      </head>
      
      <div className="banner-section h-102">
        <div className="relative bg-cover bg-center h-[200px] flex items-center justify-start text-white px-20" 
             style={{backgroundImage: 'url("images/about/aboutBanner1.webp")'}}>
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
          className="bg-white w-full flex items-center justify-center md:py-20 py-5 bg-cover bg-no-repeat bg-center relative"
          style={{backgroundImage: "url('/images/about/aboutWavesBg.webp')"}}
        >
          <div className="text-center p-4 text-black">
            <h1 className="text-4xl font-bold mb-4">ABOUT</h1>
            <p
              className="md:text-lg text-md md:text-center text-justify font-normal mx-auto max-w-[93%]"
            >
              I am delighted to introduce hubeco.market, our green sourcing
              platform for building and architectural products and services. Our
              mission is to empower builders,architects and homeowners to make
              sustainable choices that positively impact our planet. We believe
              that every construction project, whether big or small, should
              prioritize eco-friendliness and energy efficiency without
              compromising on quality or affordability.The building and
              construction sector accounts for 40% of global carbon emissions,
              and we aim to change that at hubeco!!
            </p>
          </div>
        </div>

        <div className="bg-secondaryBg w-full">
          <div
            className={`${styles.secondSection} flex flex-col lg:flex-row items-start justify-between md:py-12 py-6 px-2 lg:px-4 space-y-4 lg:space-x-4 lg:space-y-0 mx-auto max-w-[90%]`}
          >
            <div className="overflow-auto p-2 lg:p-4">
              <h1 className="text-2xl font-bold mb-4 text-black">What We Do</h1>
              <p className="max-w-2xl text-md font-thin text-black text-justify">
                We provide a comprehensive marketplace that connects you with a
                wide range of eco-friendly building materials. Our carefully
                curated selection includes products that are :
              </p>

              <Accordion
                className="w-full mt-10"
                allowMultiple={false}
                defaultIndex={selectedIndex ?? [0]}
                onChange={handleAccordionChange}
              >
                {accordionItems.map((item, index) => (
                  <AccordionItem
                  key={index}
                  className="border-b border-[#B90647] py-[17px]"
                >
                
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton className="flex justify-between">
                            <div className=" flex items-center">
                              <Image
                                src={item.imgSrc}
                                alt={item.alt}
                                className={`${
                                  selectedIndex === index ||
                                  (selectedIndex === undefined && index === 0)
                                    ? "filter-none"
                                    : "grayscale"
                                }`}
                                width={32}
                                height={32}
                                onError={e => {
                                  e.currentTarget.src = 'images/product-placeholder.webp'
                                }}
                                loading="lazy"
                              />
                              <span
                                className={`text-left text-black flex-1 font-semibold ml-2.5`}
                              >
                                {item.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {isExpanded ? (
                                <PiMinusCircleBold
                                  className="text-[#B90647] text-lg"
                                />
                              ) : (
                                <TbCirclePlus
                                  className="text-[#B90647] text-lg"
                                />
                              )}
                            </div>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          className="text-left text-sm text-black text-medium mt-2 pl-10"
                          pb={4}
                        >
                          {item.description}
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div
              className=" lg:flex justify-center items-center p-2 lg:p-4"
            >
              <Image
                src="images/about/aboutBanner2.webp"
                alt="banner1"
                className="w-full rounded-md md:w-full max-w-lg mx-auto"
                height={512}
                width={512}
                onError={e => {
                  e.currentTarget.src = 'images/product-placeholder.webp'
                }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex items-center justify-center md:pb-8 pb-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold md:mb-4 text-black">
                Our Values
              </h1>
            </div>
          </div>
          <div
            className="flex flex-col lg:flex-row justify-evenly mx-auto max-w-[94%]"
          >
            <div className="w-full lg:w-5/12 md:py-11 py-2 md:pr-5 pr-1">
              {valueItems.slice(0, 2).map((item, index) => (
                <div key={index} className="flex p-4 items-start justify-start">
                  <div className="align-middle bg-secondary hover:bg-primary mt-[5px] md:ml-4 md:p-1.5 p-[7px] rounded-md  ">
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
                    <h1 className="text-xl font-medium mb-4 text-black text-justify">
                      {item.title}
                    </h1>
                    <p className="max-w-2xl text-black text-md font-normal text-justify">
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
                className=" w-full  h-auto rounded-md max-w-xs lg:max-w-sm mx-auto"
                width={332.69}
                height={332.69}
                onError={e => {
                  e.currentTarget.src = 'images/product-placeholder.webp'
                }}
                loading="lazy"
              />
            </div>
            <div className="w-full lg:w-2/5 py-11 md:pl-5">
              {valueItems.slice(2).map((item, index) => (
                <div key={index} className="flex p-4 items-start justify-start">
                  <div className="align-middle bg-secondary hover:bg-primary mt-[5px]  md:ml-4 md:p-1.5 p-[7px] rounded-md  ">
                  <Image
                      src={item.imgSrc}
                      alt={item.alt}
                      height={25}
                      width={40}
                      onError={e => {
                        e.currentTarget.src = 'images/product-placeholder.webp'
                      }}
                      loading="lazy"
                      // className="rotate-on-hover"
                      // style={{ height: "25px", width: "40px" }}
                    />
                  </div>
                  <div className="ml-4">
                    <h1 className="text-xl font-medium mb-4 text-black text-justify">
                      {item.title}
                    </h1>
                    <p className="max-w-2xl text-black text-md text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center pb-12">
            <CustomButton
              title={"Shop Now"}
              className="md:ml-3 bg-secondary hover:bg-primary h-12 md:h-12 md:w-48 w-32 md:text-md text-sm text-white"
              customStyles={{}}
              rightIcon={<GoArrowRight />}
              onPress={() => router.push("/products")}
            />
          </div>
        </div>

        <div
          className="bg-white w-full flex flex-col lg:flex-row items-start justify-center py-12 md:px-16 px-4 lg:px-20 space-y-8 lg:space-y-0 lg:space-x-4 bg-cover bg-no-repeat bg-center relative"
          style={{backgroundImage: "url('/images/about/aboutWavesBg2.webp')"}}
        >
          <div className="flex flex-col items-start lg:w-1/2">
            <Image
              src="images/about/aboutBanner3.webp"
              alt="banner1"
              className="h-64 lg:h-72 w-full rounded-md md:w-4/5 lg:w-full"
              width={668.28}
              height={288}
              onError={e => {
                e.currentTarget.src = 'images/product-placeholder.webp'
              }}
              loading="lazy"
            />
            <div className="mt-4 max-w-2xl text-left">
              <h1 className="text-2xl font-bold mb-4 text-black">
                Our Mission
              </h1>
              <p className="text-md text-black font-normal text-justify">
                To empower builders, architects, and homeowners with access to a
                comprehensive marketplace of high-quality green building
                materials, fostering sustainable practices and environmental
                stewardship in the construction industry.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start lg:w-1/2 md:pl-5">
            <Image
              src="images/about/aboutBanner4.webp"
              alt="banner2"
              className="h-64 lg:h-72 w-full rounded-md md:w-4/5 lg:w-full"
              width={648.53}
              height={288}
              onError={e => {
                e.currentTarget.src = 'images/product-placeholder.webp'
              }}
              loading="lazy"
            />
            <div className="mt-4 max-w-2xl text-left">
              <h1 className="text-2xl font-bold mb-4 text-black">
                Our Vision
              </h1>
              <p className="text-md text-black font-normal text-justify">
                Our vision is to lead the transformation of the construction
                industry towards a sustainable future by connecting buyers and
                vendors of green building materials on a global scale. We
                envision a world where sustainable construction practices are
                the norm, where buildings are energy-efficient, environmentally
                friendly, and contribute positively to the well-being of people
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
                  Whether you are a builder, architect, or homeowner, I invite
                  you to join us on our journey towards a more sustainable
                  future. Explore our marketplace, connect with our community,
                  and discover the difference that ecofriendly materials can
                  make.
                </p>
                <div className="flex items-center justify-center">
                  <div className="flex flex-col md:flex-row gap-4">
                    <CustomButton
                      onPress={() => {
                        router.push("/plans");
                      }}
                      title={"Vendor Connect"}
                      className="text-white bg-secondary hover:bg-primary font-semibold h-12 w-full md:w-40 text-sm md:text-md"
                      customStyles={{
                        border: "1px solid #FFFFFF",
                        color: "#FFFFFF",
                        minWidth: "200px",
                      }}
                      rightIcon={<GoArrowRight />}
                    />
                    <CustomButton
                      title={"Register as a Buyer"}
                      className="text-white bg-secondary hover:bg-primary font-semibold h-12 w-full md:w-40 text-sm md:text-md"
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

        <div
          className="bg-white w-full flex items-center justify-center p-6 md:p-20 bg-cover bg-no-repeat bg-center relative pb-20"
          style={{backgroundImage: "url('/images/about/aboutWavesBg2.webp')"}}
        >
          <div className="w-full">
            <div className="flex w-full justify-between bg-secondaryBg rounded mobile-sm:mb-20 mobile-sm:flex-wrap sm:flex-nowrap h-[500px] md:h-[450px]">
              <div className="w-full p-2 md:h-[450px] h-fit-content md:w-8/12 flex flex-col items-start">
                <div className="w-full lg:w-2/3 pl-4 md:pl-8">
                  <h1 className="text-3xl md:text-5xl font-medium text-left px-2 md:px-4 text-black py-[5%] leading-tight">
                    Together, let&#39;s build a greener tomorrow with{" "}
                    <span className="text-primary font-medium text-3xl md:text-5xl">
                      hubeco.market
                    </span>
                  </h1>
                </div>
                <div className="w-full md:w-2/3 flex flex-col md:flex-row items-start md:items-center pl-4 md:pl-8 mt-5 md:mb-0 mb-4 md:mt-24">
                  <div className="md:mr-4">
                    <h1 className="text-xl font-bold text-left px-2 md:pr-4 text-black">
                      SaiPadma Potluri
                    </h1>
                    <p className="text-left mb-2 px-2 md:pr-4 text-black text-sm">
                      Founder & CEO
                    </p>
                    <div className="ml-4 md:ml-2 mt-4 md:mt-0 flex-shrink-0">
                      <div
                        onClick={() =>
                          window.open(
                            "https://www.linkedin.com/in/saipadmap/",
                            "_blank"
                          )
                        }
                        className="p-1.5 rounded-md h-8 w-8 bg-secondary hover:bg-primary flex items-center cursor-pointer justify-center"
                      >
                        <BiLogoLinkedin className="text-white" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-fit flex items-center justify-center md:h-[450px] h-fit-content">
                <Image
                  src="images/about/profile-pic.webp"
                  alt="banner1"
                  style={{ width: "100%", height: "100%" }}
                  width={317.81}
                  height={450}
                  onError={e => {
                    e.currentTarget.src = 'images/product-placeholder.webp'
                  }}
                  loading="lazy"
                  className="md:w-auto md:max-w-full rounded-r"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}