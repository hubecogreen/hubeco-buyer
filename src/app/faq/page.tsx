"use client";
// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
import { PiMinusCircleBold } from "react-icons/pi";
import { TbCirclePlus } from "react-icons/tb";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  // AccordionIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

type ExpandedIndex = number | null | undefined;

export default function Page() {
  const accordionItems = [
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "What is hubeco?",
      description:
        "Hubeco is an online marketplace dedicated to providing a wide range of sustainable building materials. Our platform connects builders, architects, and homeowners with trusted suppliers and manufacturers committed to eco-friendly construction practices.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "How do I create an account?",
      description:
        "To create an account, click on the 'Sign Up' button at the top right corner of our homepage and follow the prompts to enter your details. You can choose to register as a buyer or a vendor.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "How can I contact customer support?",
      description:
        "You can reach our customer support team via email at info@hubeco.market , by phone at +91 9985544055, or through our live chat available on our website from 9 AM to 6 PM (Monday to Friday).",
    },
  ];

  const accordionItems1 = [
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "How do I place an order?",
      description:
        "Browse our product catalog, add the desired items to your cart, and proceed to checkout. Follow the prompts to complete your purchase using our secure payment options.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "What payment methods are accepted?",
      description:
        "We accept major credit cards, debit cards, and other secure payment methods like PayU and bank transfers.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "Can I track my order?",
      description:
        "Yes, you will receive a tracking number from your vendor once your materials are shipped. You can check the shipping status on the designated carrier’s website",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "What is the return policy?",
      description: (
        <>
          Our return policy allows you to return products within 7 days of
          receipt. The items must be in their original condition and packaging.
          For more details, please visit our{" "}
          <Link
            href="/returns-refunds-cancellations"
            className="text-[#A92449]"
          >
            Returns, Refunds and Cancellations
          </Link>
          .
        </>
      ),
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "How can I leave a review for a product?",
      description:
        "After receiving your order, log in to your account, navigate to the order history, and click on the product you want to review. Follow the prompts to leave your feedback and rating.",
    },
  ];

  const accordionItems2 = [
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "How do I Become a Vendor on hubeco.market?",
      description:
        "To Become a Vendor, visit our Vendor Registration page, fill out the application form with your business details, and submit it. Our team will review your application and get back to you with the next steps.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "What are the subscription plans available for vendors?",
      description: (
        <>
          We offer two subscription plans: Freemium and Premium. Each plan
          offers different features and benefits to suit your business needs.
          Visit our{" "}
          <Link href="https://hubeco.market/plans" className="text-[#A92449]">
            Plans
          </Link>{" "}
          for more details.
        </>
      ),
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "How do I list my products?",
      description:
        "Once your vendor account is approved, you can log in to your vendor module and start listing your products by adding product descriptions, images, pricing, and other details.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "How do I manage my orders?",
      description:
        "You can manage your orders through your vendor module. Here, you can view, process, and update the status of all your orders, as well as manage inventory and track sales.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "What support is available for vendors?",
      description:
        "We offer email and chat support for all vendors. You can reach our vendor support team at info@hubeco.market.",
    },
  ];

  const accordionItems3 = [
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "How long does shipping take?",
      description:
        "Shipping times vary depending on the supplier and your location. Estimated delivery times will be provided at checkout. You can also track your order using the tracking number provided.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "Do you ship Internationally?",
      description:
        "Currently, we ship within India. Please check our shipping policy or contact our customer support for more information on shipping options.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "What are the shipping costs?",
      description:
        "Shipping costs depend on the size, weight, and destination of your order. Detailed shipping charges will be  displayed at checkout before you confirm your purchase.",
    },
  ];

  const accordionItems4 = [
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "What makes your products sustainable?",
      description:
        "Our products are sourced from manufacturers who use eco-friendly materials and sustainable practices. This includes recycled content, energy-efficient production methods, and certifications like Greepro, GRIHA, FSC and ISO.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title:
        "How can I learn more about a product’s sustainability credentials?",
      description:
        "Each product listing includes detailed information about its sustainability credentials, such as certifications, material composition, and environmental impact. You can also contact our support team for additional information.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "Are your products certified?",
      description:
        "Many of our products are certified by recognized environmental and sustainability organizations. Look for certifications like Greepro, GRIHA, FSC and ISO in the product descriptions.",
    },
  ];

  const accordionItems5 = [
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "I am having a trouble with the website what should I do?",
      description:
        "If you encounter any technical issues, please try clearing your browser cache or using a different browser. If the problem persists, contact our customer support team for assistance.",
    },
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "How do I reset my password",
      description:
        "Click on the 'Forgot Password' link on the login page and enter your registered email address. You will receive a link to reset your password.",
    },
  ];
  const accordionItems6 = [
    {
      imgSrc: "images/faq/faq.webp",
      alt: "Image",
      title: "How can I provide feedback or suggestions",
      description:
        "We welcome your feedback and suggestions to help us improve our services. Please send your comments to info@hubeco.market.",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<ExpandedIndex | undefined>(
    undefined
  );
  const [selectedIndex1, setSelectedIndex1] = useState<
    ExpandedIndex | undefined
  >(undefined);
  const [selectedIndex2, setSelectedIndex2] = useState<
    ExpandedIndex | undefined
  >(undefined);
  const [selectedIndex3, setSelectedIndex3] = useState<
    ExpandedIndex | undefined
  >(undefined);
  const [selectedIndex4, setSelectedIndex4] = useState<
    ExpandedIndex | undefined
  >(undefined);
  const [selectedIndex5, setSelectedIndex5] = useState<
    ExpandedIndex | undefined
  >(undefined);
  const [selectedIndex6, setSelectedIndex6] = useState<
    ExpandedIndex | undefined
  >(undefined);

  // const handleAccordionChange = (index: ExpandedIndex | undefined) => {
  //   setSelectedIndex(index === selectedIndex ? undefined : index);
  // };
  // const handleAccordionChange = (index: ExpandedIndex | undefined) => {
  //   if (index === undefined) {
  //     // Provide a default value or handle accordingly
  //     index = 0; // example default value
  //   }
  //   setSelectedIndex(index === selectedIndex ? undefined : index);
  // };
  const handleAccordionChange = (index: number | number[] | null) => {
    if (Array.isArray(index)) {
      setSelectedIndex(index[0] ?? undefined);
    } else {
      setSelectedIndex(index ?? undefined);
    }
  };

  const handleAccordionChange1 = (index: number | number[] | null) => {
    if (Array.isArray(index)) {
      setSelectedIndex1(index[0] ?? undefined);
    } else {
      setSelectedIndex1(index ?? undefined);
    }
  };
  const handleAccordionChange2 = (index: number | number[] | null) => {
    if (Array.isArray(index)) {
      setSelectedIndex2(index[0] ?? undefined);
    } else {
      setSelectedIndex2(index ?? undefined);
    }
  };
  const handleAccordionChange3 = (index: number | number[] | null) => {
    if (Array.isArray(index)) {
      setSelectedIndex3(index[0] ?? undefined);
    } else {
      setSelectedIndex3(index ?? undefined);
    }
  };
  const handleAccordionChange4 = (index: number | number[] | null) => {
    if (Array.isArray(index)) {
      setSelectedIndex4(index[0] ?? undefined);
    } else {
      setSelectedIndex4(index ?? undefined);
    }
  };
  const handleAccordionChange5 = (index: number | number[] | null) => {
    if (Array.isArray(index)) {
      setSelectedIndex5(index[0] ?? undefined);
    } else {
      setSelectedIndex5(index ?? undefined);
    }
  };
  const handleAccordionChange6 = (index: number | number[] | null) => {
    if (Array.isArray(index)) {
      setSelectedIndex6(index[0] ?? undefined);
    } else {
      setSelectedIndex6(index ?? undefined);
    }
  };
  return (
    <div className="bg-white">
      <Head>
        <title>FAQ&#39;s | Hubeco Buyer</title>
      </Head>
      {/* <Header /> */}
      <div className="banner-section h-102">
        <div
          style={{ backgroundImage: "url('images/about/aboutBanner1.webp')" }}
          className="md:px-20 px-5 relative bg-cover bg-center h-[200px] flex items-center justify-start text-white"
        >
          <Link
            href="/"
            className="text-white flex items-center no-underline px-2.5 py-1.5 rounded"
          >
            <AiFillHome size={16} className="text-white mr-1.5" />
            Home
          </Link>
          <span className="text-white mx-2">/</span>
          <Link
            href="/faq"
            className="text-white no-underline px-2.5 py-1.5 rounded"
          >
            Frequently Asked Questions
          </Link>
        </div>
        <div className="bg-secondaryBg w-full">
          <div className="py-12 px-4 lg:px-24 mx-auto max-w-[100%] pb-0">
            <h1 className="text-4xl font-bold mb-4 mt-4 text-brown">
              Frequently Asked Questions{" "}
            </h1>
            <p className="max-w mx-0 text-xl text-brown font-medium">
              Thank you for choosing hubeco your partner in sustainable building
              materials. We look forward to assisting you!
            </p>
          </div>
          <div
            // className="flex flex-col lg:flex-row items-start justify-start py-12 space-y-4 lg:space-x-4 lg:space-y-0 mx-auto max-w-[90%]"
            // style={{ height: "700px" }}
            className="py-12 px-4 lg:px-24 mx-auto max-w-[100%] text-brown"
          >
            <div className=" pb-2">
              <h4 className="text-2xl font-bold">General Questions</h4>

              <Accordion
                className="w-full mt-5"
                allowMultiple={false}
                defaultIndex={selectedIndex ?? undefined}
                onChange={handleAccordionChange}
              >
                {accordionItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    className="border-b-[0.5px] border-gray-200 py-[17px] border-t-0 border-[rgba(185,6,71,1)]"
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
                                  selectedIndex === index
                                    ? "filter-none"
                                    : "filter grayscale"
                                }`}
                                width={32}
                                height={32}
                                onError={e => {
                                  e.currentTarget.src = '/images/product-placeholder.webp'
                                }}
                                loading="lazy"
                              />

                              <span
                                className={`text-left text-navy-900 flex-1 ${
                                  selectedIndex === index
                                    ? "font-bold"
                                    : "font-normal"
                                } ml-[10px]`}
                              >
                                {item.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {isExpanded ? (
                                <PiMinusCircleBold className="text-[#B90647] text-[18px]" />
                              ) : (
                                <TbCirclePlus className="text-[#B90647] text-[18px]" />
                              )}
                            </div>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          className="text-justify text-medium mt-2 !text-navy-900 pl-10"
                          pb={4}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        {/* {item.description}
                        </AccordionPanel> */}
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="pb-2">
              <h4 className="text-2xl font-bold mb-4">Buyer Questions</h4>
              <Accordion
                className="w-full mt-5"
                allowMultiple={false}
                defaultIndex={selectedIndex1 ?? undefined}
                onChange={handleAccordionChange1}
              >
                {accordionItems1.map((item, index) => (
                  <AccordionItem
                    key={index}
                    className="border-b-[0.5px] border-gray-200 py-[17px] border-b-[rgba(185,6,71,1)]"
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
                                  selectedIndex1 === index
                                    ? "filter-none"
                                    : "filter grayscale"
                                }`}
                                width={32}
                                height={32}
                                onError={e => {
                                  e.currentTarget.src = '/images/product-placeholder.webp'
                                }}
                                loading="lazy"
                              />

                              <span
                                className={`text-left text-navy-900 flex-1 ${
                                  selectedIndex1 === index
                                    ? "font-bold"
                                    : "font-normal"
                                } ml-[10px]`}
                              >
                                {item.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {isExpanded ? (
                                <PiMinusCircleBold className="text-[#B90647] text-[18px]" />
                              ) : (
                                <TbCirclePlus className="text-[#B90647] text-[18px]" />
                              )}
                            </div>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          className="text-justify text-medium mt-2 !text-navy-900 pl-10"
                          pb={4}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        {/* {item.description} */}
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className=" pb-2">
              <h4 className="text-2xl font-bold mb-4">Vendor Questions</h4>
              <Accordion
                className="w-full mt-5"
                allowMultiple={false}
                defaultIndex={selectedIndex2 ?? undefined}
                onChange={handleAccordionChange2}
              >
                {accordionItems2.map((item, index) => (
                  <AccordionItem
                    key={index}
                    className="border-b-[0.5px] border-gray-200 py-[17px] border-b-[#B90647]"
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
                                  selectedIndex2 === index
                                    ? "filter-none"
                                    : "filter grayscale"
                                }`}
                                width={32}
                                height={32}
                                onError={e => {
                                  e.currentTarget.src = '/images/product-placeholder.webp'
                                }}
                                loading="lazy"
                              />

                              <span
                                className={`text-left text-navy-900 flex-1 ${
                                  selectedIndex2 === index
                                    ? "font-bold"
                                    : "font-normal"
                                } ml-[10px]`}
                              >
                                {item.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {isExpanded ? (
                                <PiMinusCircleBold className="text-[#B90647] text-[18px]" />
                              ) : (
                                <TbCirclePlus className="text-[#B90647] text-[18px]" />
                              )}
                            </div>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          className="text-justify text-medium mt-2 !text-navy-900 pl-10"
                          pb={4}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        {/* {item.description}
                        </AccordionPanel> */}
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className=" pb-2 ">
              <h4 className="text-2xl font-bold mb-4">Shipping and Delivery</h4>
              <Accordion
                className="w-full mt-5"
                allowMultiple={false}
                defaultIndex={selectedIndex3 ?? undefined}
                onChange={handleAccordionChange3}
              >
                {accordionItems3.map((item, index) => (
                  <AccordionItem
                    key={index}
                    className="border-b-[0.5px] border-gray-200 py-[17px] border-b-[#B90647]"
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
                                  selectedIndex3 === index
                                    ? "filter-none"
                                    : "filter grayscale"
                                }`}
                                width={32}
                                height={32}
                                onError={e => {
                                  e.currentTarget.src = '/images/product-placeholder.webp'
                                }}
                                loading="lazy"
                              />

                              <span
                                className={`text-left text-navy-900 flex-1 ${
                                  selectedIndex3 === index
                                    ? "font-bold"
                                    : "font-normal"
                                } ml-[10px]`}
                              >
                                {item.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {isExpanded ? (
                                <PiMinusCircleBold className="text-[#B90647] text-[18px]" />
                              ) : (
                                <TbCirclePlus className="text-[#B90647] text-[18px]" />
                              )}
                            </div>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          className="text-justify text-medium mt-2 !text-navy-900 pl-10"
                          pb={4}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        {/* {item.description}
                        </AccordionPanel> */}
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className=" pb-2">
              <h4 className="text-2xl font-bold mb-4">
                Sustainability and Product Information
              </h4>
              <Accordion
                className="w-full mt-5"
                allowMultiple={false}
                defaultIndex={selectedIndex4 ?? undefined}
                onChange={handleAccordionChange4}
              >
                {accordionItems4.map((item, index) => (
                  <AccordionItem
                    key={index}
                    className="border-b-[0.5px] border-gray-200 py-[17px] border-b-[#B90647]"
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
                                  selectedIndex4 === index
                                    ? "filter-none"
                                    : "filter grayscale"
                                }`}
                                width={32}
                                height={32}
                                onError={e => {
                                  e.currentTarget.src = '/images/product-placeholder.webp'
                                }}
                                loading="lazy"
                              />

                              <span
                                className={`text-left text-navy-900 flex-1 ${
                                  selectedIndex4 === index
                                    ? "font-bold"
                                    : "font-normal"
                                } ml-[10px]`}
                              >
                                {item.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {isExpanded ? (
                                <PiMinusCircleBold className="text-[#B90647] text-[18px]" />
                              ) : (
                                <TbCirclePlus className="text-[#B90647] text-[18px]" />
                              )}
                            </div>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          className="text-justify text-medium mt-2 !text-navy-900 pl-10"
                          pb={4}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        {/* {item.description}
                        </AccordionPanel> */}
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className=" pb-2 ">
              <h4 className="text-2xl font-bold mb-4">Technical Support</h4>
              <Accordion
                className="w-full mt-5"
                allowMultiple={false}
                defaultIndex={selectedIndex5 ?? undefined}
                onChange={handleAccordionChange5}
              >
                {accordionItems5.map((item, index) => (
                  <AccordionItem
                    key={index}
                    className="border-b-[0.5px] border-gray-200 py-[17px] border-b-[#B90647]"
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
                                  selectedIndex5 === index
                                    ? "filter-none"
                                    : "filter grayscale"
                                }`}
                                width={32}
                                height={32}
                                onError={e => {
                                  e.currentTarget.src = '/images/product-placeholder.webp'
                                }}
                                loading="lazy"
                              />

                              <span
                                className={`text-left text-navy-900 flex-1 ${
                                  selectedIndex5 === index
                                    ? "font-bold"
                                    : "font-normal"
                                } ml-[10px]`}
                              >
                                {item.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {isExpanded ? (
                                <PiMinusCircleBold className="text-[#B90647] text-[18px]" />
                              ) : (
                                <TbCirclePlus className="text-[#B90647] text-[18px]" />
                              )}
                            </div>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          className="text-justify text-medium mt-2 !text-navy-900 pl-10"
                          pb={4}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        {/* {item.description}
                        </AccordionPanel> */}
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="pb-2">
              <h4 className="text-2xl font-bold mb-4">
                Feedback and Suggestions
              </h4>
              <Accordion
                className="w-full mt-5"
                allowMultiple={false}
                defaultIndex={selectedIndex6 ?? undefined}
                onChange={handleAccordionChange6}
              >
                {accordionItems6.map((item, index) => (
                  <AccordionItem
                    key={index}
                    className="border-b-[0.5px] border-gray-200 py-[17px] border-b-[#B90647]"
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
                                  selectedIndex6 === index
                                    ? "filter-none"
                                    : "filter grayscale"
                                }`}
                                width={32}
                                height={32}
                                onError={e => {
                                  e.currentTarget.src = '/images/product-placeholder.webp'
                                }}
                                loading="lazy"
                              />

                              <span
                                className={`text-left text-navy-900 flex-1 ${
                                  selectedIndex6 === index
                                    ? "font-bold"
                                    : "font-normal"
                                } ml-[10px]`}
                              >
                                {item.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {isExpanded ? (
                                <PiMinusCircleBold className="text-[#B90647] text-[18px]" />
                              ) : (
                                <TbCirclePlus className="text-[#B90647] text-[18px]" />
                              )}
                            </div>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          className="text-justify text-medium mt-2 !text-navy-900 pl-10"
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
            <div className="pb-2 pt-2">
              Still have questions? Contact our support team at{" "}
              <Link href="mailto:info@hubeco.market" className="text-[#A92449]">
                info@hubeco.market
              </Link>{" "}
              or call us at{" "}
              <Link href="tel:+919876543210" className="text-[#A92449]">
                +91 9985544055
              </Link>
              . We are here to help!
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
