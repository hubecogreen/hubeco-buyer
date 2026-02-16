"use client";
// import { useToast } from "@chakra-ui/react";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/customButton/CustomButton";

import { GoArrowRight } from "react-icons/go";
import { PiMinusCircleBold, PiPhoneLight } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
// import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { PiMapPinAreaLight } from "react-icons/pi";
import CustomInput from "@/components/customInput/CustomTextField";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbCirclePlus } from "react-icons/tb";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";

import { toast } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AiFillHome } from "react-icons/ai";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import animationData from "../../../public/animations/thankyou.json";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import Image from "next/image";
import { getCookie } from "cookies-next";
import LottieWrapper from "@/components/LottieWrapper";
type ExpandedIndex = number | null | undefined;
const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[^\d]+$/, "Name cannot contain numbers")
    .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")

    // @ts-ignore
    .test(
      "no-leading-space",
      "Empty space at the start is not allowed",
      (value: any) => value && value.trimLeft() === value
    )

    // @ts-ignore
    .test(
      "no-multiple-spaces",
      "Double space are not allowed",
      (value: any) => value && !/\s{2,}/.test(value)
    )
    .min(3, "Name must be at least 3 characters")
    .matches(/^(?! )(?=.*[^ ]).{3,}(?<! )$/, "Enter valid name")
    .max(75, "Name cannot exceed 75 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address format")
    // .matches(/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/, "Invalid email address format")
    .max(120, "Email address cannot exceed 320 characters"),
  mobile: yup
    .string()
    .required("Mobile Number is required")
    .matches(/^[a-zA-Z0-9\s]*$/, "Special characters not allowed")
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
      "Characters are not allowed"
    )
    .max(10, "No more than 10 digits")
    .matches(/^[6-9][0-9]*$/, "First number must be between 6 to 9")
    .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits"),
  textMessage: yup
    .string()
    .required("This field is required")
    .max(1000, "Message cannot exceed 1000 characters"),
  // .required('This field is required')
});
export default function Page() {
  const {
    control,
    handleSubmit,
    setValue,
    // setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      textMessage: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoading1, setIsLoading1] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const accordionItems = [
    {
      imgSrc: "images/about/aboutEnv.webp",
      alt: "sustain",
      title: "What is hubeco?",
      description:
        "Hubeco is an online marketplace dedicated to providing a wide range of sustainable building materials. Our platform connects builders, architects, and homeowners with trusted suppliers and manufacturers committed to eco-friendly construction practices.",
    },
    {
      imgSrc: "images/about/aboutEnergy.webp",
      alt: "energy",
      title: "How do I create an account?",
      description:
        "To create an account, click on the 'Sign Up' button at the top right corner of our homepage and follow the prompts to enter your details. You can choose to register as a buyer or a vendor.",
    },
    {
      imgSrc: "images/about/aboutHeart.webp",
      alt: "healthy",
      title: "Can I track my order?",
      description:
        "Yes, you will receive a tracking number from your vendor once your materials are shipped. You can check the shipping status on the designated carrier’s website.",
    },
    {
      imgSrc: "images/about/aboutDurable.webp",
      alt: "durable",
      title: "How do I become a vendor on hubeco.market?",
      description:
        "To become a vendor, visit our Vendor Registration page, fill out the application form with your business details, and submit it. Our team will review your application and get back to you with the next steps.",
    },
    {
      imgSrc: "images/about/aboutDurable.webp",
      alt: "durable",
      title: "What makes your products sustainable?",
      description:
        "Our products are sourced from manufacturers who use eco-friendly materials and sustainable practices. This includes recycled content, energy-efficient production methods, and certifications like Greepro, GRIHA, FSC and ISO.",
    },
  ];
  const valueItems = [
    {
      imgSrc: "images/social/social.webp",
      alt: "facebook",
      title: "Facebook",
      description: "Hubeco Trail Name",
    },
    {
      imgSrc: "images/social/twitter.webp",
      alt: "Twitter",
      title: "Twitter",
      description: "Hubeco Trail Name",
    },
    {
      imgSrc: "images/social/instagram.webp",
      alt: "Instagram",
      title: "Instagram",
      description: "Hubeco Trail Name",
    },
    {
      imgSrc: "images/social/linkedIn.webp",
      alt: "LinkedIn",
      title: "LinkedIn",
      description: "Hubeco Trail Name",
    },
  ];

  const images = [
    "/images/contact/slider1.webp",
    "/images/contact/slider2.webp",
    "/images/contact/slider5.webp",
    "/images/contact/slider3.webp",
    "/images/contact/slider4.webp",
    "/images/contact/slider6.webp",
    "/images/contact/slider7.webp",

    // Add more image paths here
  ];

  const [selectedIndex, setSelectedIndex] = useState<ExpandedIndex | undefined>(
    0
  );

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const onPress = () => {
    setIsLoading1(true);
    router.push("/contact");
    setIsLoading1(false);
  };

  const handleAccordionChange = (index: ExpandedIndex | undefined) => {
    setSelectedIndex(index === selectedIndex ? undefined : index);
  };

  const token = getCookie("token");

  const clearFormFields = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("mobile", "");
    setValue("textMessage", "");
  };

  const onSubmit = (data: any) => {
    // // console.log("formmmmm");
    setIsLoading(true);

    const payloadData = {
      name: data.name,
      email: data.email,
      mobile: `+91${data.mobile}`,
      subject: "Buyer",
      message: data.textMessage,
    };
    // // console.log("PayloadData", payloadData);

    Webservices.callPostApi(getEndpoint.default.CONTACTUS, payloadData, token)
      .then((result) => {
        // // console.log("ContactUs", result.data);

        if (result.status === 201) {
          setIsLoading(false);
          // toast.success("Message Sent Successfully");
          setIsSubmitted(true);
          reset();

          // router.push('/thankyou-page');
        } else {
          setIsLoading(false);
          toast.error("Message Send Failed");
        }
        // clearFormFields();
      })
      .catch((err) => {
        // // console.log("err", err);
        setIsLoading(false);
        toast.error(
          err && err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "Failed to send message"
        );
      });
  };
  return (
    <div className="bg-cream">
      <Head>
        <title>Contact Us | Hubeco Buyer</title>
      </Head>
      {/* <Header /> */}
      <div className="banner-section w-full h-102 mx-lg">
        <div
          style={{ backgroundImage: "url('images/about/aboutBanner1.webp')" }}
          className="relative bg-cover bg-center h-[200px] flex items-center justify-start text-white md:px-[80px] px-[60px]"
        >
          <Link
            href="/"
            className="text-white flex items-center no-underline px-2.5 py-1 rounded"
          >
            <AiFillHome size={16} className="text-white mr-1.5" />
            <span>Home</span>
          </Link>

          <span className="text-white mx-2">/</span>
          <Link
            href="/contact"
            className="text-white no-underline px-2.5 py-1 rounded"
            legacyBehavior
          >
            <Link
              href="/contact"
              className="text-white no-underline px-2.5 py-1 rounded"
            >
              <span>Contact Us</span>
            </Link>
          </Link>
        </div>
        <div className="bg-cream  md:py-20">
          <div className="md:flex flex-col lg:flex-row items-start justify-start space-y-4 lg:space-x-4 lg:space-y-0 bg-cover bg-no-repeat bg-center bg-[url('/images/home/contactbg-1.png')]">
            <div className="md:w-11/12 mx-auto md:flex">
              <div className=" md:w-1/2 w-full md:overflow-auto p-4">
                <h1 className="md:text-3xl text-2xl  text-center md:text-left font-bold md:mb-4 text-brown">
                  Customer Support
                </h1>
                <p className="max-w-2xl mb-4 py-4 text-justify text-brown md:text-lg text-md">
                  For any inquiries or support related to your purchases,
                  account, or our services, feel free to reach out to us:
                </p>
                <div className="flex flex-col space-y-4 max-w-md">
                  <div className="flex items-start">
                    <div className="bg-primary hover:bg-secondary  p-1.5 rounded-md h-10 flex items-center justify-center">
                      <PiPhoneLight className="h-6 w-7 text-white" />
                    </div>
                    <div className="ml-4 flex flex-col">
                      <h6 className="font-regular text-sm md:text-base text-primary">
                        Phone
                      </h6>
                      <p className="font-medium text-xs md:text-sm overflow-hidden overflow-ellipsis whitespace-nowrap text-brown">
                        +91 9985544055
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary hover:bg-secondary  p-1.5 rounded-md h-10 flex items-center justify-center">
                      <TfiEmail className="h-5 w-7 text-white" />
                    </div>
                    <div className="ml-4 flex flex-col">
                      <h6 className="font-regular text-sm md:text-base text-primary">
                        Email
                      </h6>
                      <Link
                        href="mailto:info@hubeco.market"
                        className="font-medium text-xs md:text-sm text-brown no-underline overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        info@hubeco.market
                      </Link>
                    </div>
                  </div>

                  {/* <div className="flex items-start">
                    <div className="bg-secondary hover:bg-primary  p-1.5 rounded-md h-10 flex items-center justify-center">
                      <HiOutlineChatBubbleLeftEllipsis
                      
                      />
                    </div>
                    <div className="ml-4 flex flex-col">
                      <h6 className="font-regular text-sm md:text-base text-secondary">
                        Live Chat
                      </h6>
                      <p className="font-medium text-xs md:text-sm overflow-hidden overflow-ellipsis whitespace-nowrap text-brown">
                        9 AM to 6 PM <br /> (Monday to Friday)
                      </p>
                    </div>
                  </div> */}

                  <div className="flex items-start">
                    <div className="bg-primary hover:bg-secondary p-1.5 rounded-md h-10 flex items-center justify-center">
                      <PiMapPinAreaLight className="h-5 w-[30px] text-white" />
                    </div>
                    <div className="ml-4 flex flex-col">
                      <h6 className="font-regular text-sm md:text-base text-primary">
                        Address
                      </h6>
                      <p className="font-medium text-xs md:text-sm overflow-hidden overflow-ellipsis text-brown">
                        Hubeco Green Ventures Pvt. Ltd<br></br>
                        Awfis Space Solutions Ltd, NSL Icon<br></br>
                        3rd Floor, Road No. 12, Anand Banjara Colony<br></br>
                        Banjara Hills, Hyderabad, Telangana - 500034<br></br>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 w-full mb-10 flex">
                {!isSubmitted ? (
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                    className="md:flex w-full md:flex-col md:gap-5"
                  >
                    <div className="flex justify-center">
                      <div className="inline-block max-w-full w-11/12 md:w-full p-6 bg-cream shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
                        <div className="md:p-4 py-4">
                          <label className="block text-brown mb-2 text-brown text-base font-medium">
                            Name <span className="text-red">*</span>
                          </label>
                          <Controller
                            rules={{ required: true }}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <CustomInput
                                placeholder="Enter Name"
                                onChange={onChange}
                                value={value}
                                customStyles={{
                                  // backgroundColor: "#F3F3F3",
                                  borderRadius: "5px",
                                  // width: "500px",
                                }}
                                extraClassnames="custom-input"
                                errorMessage={errors.name?.message}
                              />
                            )}
                            name="name"
                          />
                        </div>
                        <div className="md:p-4 py-4">
                          <label className="block text-brown mb-2 text-brown text-base font-medium">
                            Email <span className="text-red">*</span>
                          </label>
                          <Controller
                            rules={{ required: true }}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <CustomInput
                                placeholder="Enter Email"
                                onChange={onChange}
                                value={value}
                                customStyles={{
                                  // backgroundColor: "#F3F3F3",
                                  borderRadius: "5px",
                                  // width: "500px",
                                }}
                                extraClassnames="custom-input"
                                errorMessage={errors.email?.message}
                              />
                            )}
                            name="email"
                          />
                        </div>
                        <div className="md:p-4 py-4">
                          <label className="block text-brown mb-2 text-brown text-base font-medium">
                            Phone Number <span className="text-red">*</span>
                          </label>
                          <Controller
                            rules={{ required: true }}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <CustomInput
                                placeholder="Enter Phone Number"
                                prefix="+91"
                                onChange={onChange}
                                value={value}
                                customStyles={{
                                  borderRadius: "5px",
                                  // width: "500px",
                                }}
                                extraClassnames="custom-input"
                                errorMessage={errors.mobile?.message}
                                isMobileInput
                              />
                            )}
                            name="mobile"
                          />
                        </div>
                        <div className="md:p-4 py-4">
                          <label className="block text-brown mb-2 text-brown text-base font-medium">
                            Your Message <span className="text-red">*</span>
                          </label>
                          <Controller
                            rules={{ required: true }}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <CustomInput
                                placeholder="Write Your Message Here ..."
                                onChange={onChange}
                                value={value}
                                customStyles={{
                                  borderRadius: "5px",
                                  width: "100%",
                                  height: "100px",
                                }}
                                extraClassnames="custom-input"
                                isTextArea
                                rows={5}
                                errorMessage={errors.textMessage?.message}
                              />
                            )}
                            name="textMessage"
                          />
                        </div>
                        <div className="md:mt-0 mt-5 text-center lg:text-left">
                          <CustomButton
                            title="Send Message"
                            className="px-2 py-3  font-semibold text-sm bg-primary w-44 hover:bg-secondary"
                            type="submit"
                            customStyles={{
                              marginLeft: "15px",
                              border: "1px solid white",
                              color: "white",
                            }}
                            loaderStyles="w-68"
                            rightIcon={
                              <LiaLongArrowAltRightSolid
                                className="text-white font-semibold ml-4"
                                size={20}
                              />
                            }
                            loading={isLoading} // Update based on your loading state
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-center">
                    <div className="inline-block max-w-full p-6 bg-white shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
                      <div className="text-center py-10 md:py-15 text-white bg-white pl-30 w-[540px] h-[520px]">
                        <div className="flex justify-center">
                          <LottieWrapper
                            animationData={animationData}
                            loop={true}
                            className="w-[300px] h-[300px]"
                          />
                        </div>
                        <h1 className="text-4xl md:text-3xl font-bold mb-4 text-brown">
                          Thank you !
                        </h1>
                        <div className="flex items-center justify-center">
                          <p className="mb-2 md:mb-2 lg:mb-4 text-sm md:text-base text-brown w-10/12 text-center">
                            Your enquiry has been submitted successfully
                          </p>
                        </div>
                        <div className="flex items-center justify-center">
                          {/* <CustomButton
            title={"Go Back"}
            className="ml-3 bg-secondary h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-white hover:bg-primary"
            customStyles={{}}
            rightIcon={<GoArrowRight />}
            onPress={onPress}
            loading={isLoading1}
            
          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:w-full w-full md:mb-10 mb-3 flex justify-center">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 6,
                },
              }}
              // navigation
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="max-w-full h-64 md:h-full md:mx-auto"

              // modules={[Navigation, Pagination, Scrollbar, Autoplay]}
            >
              {images.map((src, index) => (
                <SwiperSlide key={index} className="w-[95%] md:w-full mx-auto">
                  <div className="relative w-full rounded-[5px]">
                    <Image
                      src={src}
                      alt={`Slide ${index}`}
                      height={204.47}
                      width={239.66}
                      onError={e => {
                        e.currentTarget.src = '/images/product-placeholder.webp'
                      }}
                      loading="lazy"
                      style={{height:204.5}}
                      className="w-full rounded-md h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="text-center p-4 ">
            <h1 className="md:text-4xl text-2xl font-bold mb-6 text-brown">
              Connect With Us
            </h1>
            <p className="mb-4 md:text-big text-md md:text-center text-justify font-normal text-brown">
              Stay connected and follow us on social media for the latest
              updates, news and promotions:
            </p>

            <div className="flex justify-center">
              <div className="inline-block max-w-full md:p-6 p-0 bg-cream border border-primary shadow-[0px_8px_24px_rgba(149,157,165,0.2)] dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-2 xl:gap-28 lg:gap-18 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-y-8">
                  {/* {valueItems.slice(0, 4).map((item, index) => ( */}
                  <div
                    // key={index}
                    className="flex items-center group cursor-pointer p-4 bg-gray-100 rounded-lg"
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/people/HubecoMarket/61566048633254/?mibextid=LQQJ4d",
                        "_blank"
                      )
                    }
                  >
                    <FaFacebookF
                      className="bg-primary group-hover:bg-secondary p-4 rounded-md   font-semibold"
                      size={60}
                      color="#ffffff"
                    />
                    <div className="md:ml-4 ml-2 text-left flex-1">
                      <h6 className="font-bold text-sm md:text-base mb-2 text-primary group-hover:text-secondary">
                        {/* {item.title} */}
                        Facebook
                      </h6>
                      {/* <p className="font-medium text-xs md:text-sm overflow-hidden overflow-ellipsis whitespace-nowrap text-brown">
                 
                        Hubeco.Market
                      </p> */}
                    </div>
                  </div>
                  {/* ))} */}
                  <div
                    // key={index}
                    className="flex items-center group cursor-pointer p-4 bg-gray-100 rounded-lg"
                    onClick={() =>
                      window.open(
                        "https://www.youtube.com/@hubeco.marketplace",
                        "_blank"
                      )
                    }
                  >
                    <FaYoutube
                      className=" bg-primary group-hover:bg-secondary p-4 rounded-md   font-semibold"
                      size={60}
                      color="#ffffff"
                    />
                    <div className="md:ml-4 ml-2 text-left flex-1">
                      <h6 className="font-bold text-sm md:text-base mb-2 text-primary group-hover:text-secondary">
                        {/* {item.title} */}
                        Youtube
                      </h6>
                      {/* <p className="font-medium text-xs md:text-sm overflow-hidden overflow-ellipsis whitespace-nowrap text-brown">
                       
                        hubeco.market
                      </p> */}
                    </div>
                  </div>
                  <div
                    // key={index}
                    className="flex items-center group cursor-pointer p-4 bg-gray-100 rounded-lg"
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/hubeco.market/",
                        "_blank"
                      )
                    }
                  >
                    <FaInstagram
                      className=" bg-primary group-hover:bg-secondary p-4 rounded-md   font-semibold"
                      size={60}
                      color="#ffffff"
                    />
                    <div className="md:ml-4 ml-2 text-left flex-1">
                      <h6 className="font-bold text-sm md:text-base mb-2 text-primary group-hover:text-secondary">
                        {/* {item.title} */}
                        Instagram
                      </h6>
                      {/* <p className="font-medium text-xs md:text-sm overflow-hidden overflow-ellipsis whitespace-nowrap text-brown">
                      
                        hubeco.market
                      </p> */}
                    </div>
                  </div>
                  <div
                    // key={index}
                    className="flex items-center group cursor-pointer p-4 bg-gray-100 rounded-lg"
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/company/hubeco-market/",
                        "_blank"
                      )
                    }
                  >
                    <FaLinkedinIn
                      className=" bg-primary group-hover:bg-secondary p-4 rounded-md   font-semibold"
                      size={60}
                      color="#ffffff"
                    />
                    <div className="md:ml-4 ml-2 text-left flex-1">
                      <h6 className="font-bold text-sm md:text-base mb-2 text-primary group-hover:text-secondary">
                        {/* {item.title} */}
                        LinkedIn
                      </h6>
                      {/* <p className="font-medium text-xs md:text-sm overflow-hidden overflow-ellipsis whitespace-nowrap text-brown">
                 
                        hubeco.market
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cream w-full">
          <div className="flex items-center justify-center md:py-8 py-4">
            <div className="text-center">
              <h1 className="md:text-3xl text-2xl font-bold mt-4 text-brown">
                Frequently Asked Questions
              </h1>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-start justify-start lg:space-x-4 mx-auto max-w-[90%] lg:max-w-[80%] h-[650px]">
            <div className="hidden lg:flex justify-center items-center p-4 mb-10">
              <Image
                src="images/contact/contactFaq.webp"
                alt="banner1"
                className="w-full max-w-lg mx-auto h-[500px] rounded-[10px]"
                width={512}
                height={500}
                onError={e => {
                  e.currentTarget.src = '/images/product-placeholder.webp'
                }}
                loading="lazy"
              />
            </div>
            <div className="overflow-auto p-4 lg:flex-1 lg:max-w-[75%] lg:mt-[-60px]">
              <Accordion
                className="w-full md:mt-10 mt-4"
                allowMultiple={false}
                defaultIndex={selectedIndex ?? undefined}
                //onChange={handleAccordionChange}
              >
                {accordionItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    className="border-b border-t-0 border-[rgba(185,6,71,1)] py-[17px]"
                  >
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton className="flex justify-between text-left">
                            <div className="items-center">
                              <span className="text-left font-bold  flex-1 text-brown text-base">
                                {item.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {isExpanded ? (
                                <PiMinusCircleBold className="text-primary text-[18px]" />
                              ) : (
                                <TbCirclePlus className="text-primary text-[18px]" />
                              )}
                            </div>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          className="text-justify text-medium mt-2 text-sm  text-brown"
                          pb={4}
                        >
                          {item.description}
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="md:mt-0 mt-10 pt-5 pb-10 text-center lg:text-left">
                <CustomButton
                  title={"View More FAQs"}
                  className="px-3 py-3 ml-0 h-12 md:h-12 font-semibold text-sm text-white bg-primary w-72 hover:bg-secondary"
                  customStyles={{
                    width: "200px",
                    // marginLeft: "10px",
                    border: "1px solid white",
                    color: "white",
                  }}
                  onPress={() => {
                    router.push("/faq");
                  }}
                  rightIcon={
                    <LiaLongArrowAltRightSolid
                      className="text-white font-semibold ml-4"
                      size={20}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
