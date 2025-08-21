// components/Footer.js
"use client";
import { GoArrowRight } from "react-icons/go";
import CustomButton from "../customButton/CustomButton";
// import styles from "./Footer.module.css";
import { BsEnvelope } from "react-icons/bs";
import Link from "next/link";
import { IoIosArrowRoundUp } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
// import { SlLocationPin } from "react-icons/sl";
import {
  FaFacebookF,
  FaInstagram,
  // FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const [showVendorLogin, setShowVendorLogin] = useState<any>(false);

  const pathname = usePathname();
  const fullUrl =
    typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";
  const domainUrl = process.env.NEXT_PUBLIC_PROD_URL;

  useEffect(() => {
    if (fullUrl.includes(`${domainUrl}/plans`)) {
      setShowVendorLogin(true);
    } else {
      setShowVendorLogin(false);
    }
  }, [fullUrl]);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickVendor = () => {
    if (showVendorLogin) {
      window.open(`https://vendor.hubeco.market/login`, "_blank");
    } else {
      router.push("/plans");
    }
  };

  return (
    <footer className="w-full justify-center bg-white md:mt-10 ">
      <div>
        {showScrollTop && (
          <div className="w-full justify-center items-center ">
            <div className="w-full justify-center flex mt-10 border-b border-[#eeeeee]">

              <button
                className="scroll-to-top md:w-20 rounded w-20 md:h-20 h-20 bg-secondary hover:bg-primary transition-all duration-500 text-white border-none flex items-center justify-center cursor-pointer align-self-center"
                onClick={scrollToTop}
              >
                <IoIosArrowRoundUp size={24} />
              </button>

            </div>
            <p className="mt-1 w-full align-center text-center uppercase text-gray text-xs font-normal ">
              Back to Top
            </p>
          </div>
        )}
      </div>
      <div
        className="w-full bg-white px-xl pt-10 md:pt-20 md:px-xxl bg-cover bg-center text-white"
        style={{
          backgroundImage: 'url("images/home/footer-bg-2.webp")',
        }}
      >

        <div
          className="max-w-screen-xl md:flex block  justify-between mx-auto md:pb-14 pb-5 "
        >
          <div className={"w-full  md:w-4/12 md:py-0 py-5"}>
            <div className={"  align-center hover:cursor-pointer  "}>
              <Image
                src="/images/Logo-2.webp"
                alt="Hubeco Logo"
                className=" h-[45px]"
                // width={234}
                // height={45}
                width={180}
                height={45}
                onError={e => {
                  e.currentTarget.src = '/images/product-placeholder.webp'
                }}
                loading="lazy"
                onClick={() => {
                  router.push("/");
                }}
              />
              <ul className="flex mt-8 mb-8">
                <li
                  className="align-middle bg-secondary hover:cursor-pointer hover:bg-primary  p-1.5 rounded"
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/people/HubecoMarket/61566048633254/?mibextid=LQQJ4",
                      "_blank"
                    )
                  }
                >
                  {/* <FaYoutube
                    className="text-white hover:cursor-pointer font-semibold"
                    size={20}
                  /> */}
                  <FaFacebookF
                    className="text-white   font-semibold"
                    size={20}
                  />
                  {/* <Image
                    className="hover:cursor-pointer"
                    width={28}
                    height={28}
                    alt="Facebook"
                    src={"/images/contact/facebook.webp"}
                  /> */}
                </li>
                <li
                  className="align-middle bg-secondary hover:cursor-pointer hover:bg-primary  ml-4 p-1.5 rounded"
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/@hubeco.marketplace",
                      "_blank"
                    )
                  }
                >
                  <FaYoutube className="text-white  font-semibold" size={20} />
                  {/* <Image
                    className="hover:cursor-pointer"
                    width={28}
                    height={28}
                    alt="Facebook"
                    src={"/images/contact/twitter.webp"}
                  /> */}
                </li>
                <li
                  className="align-middle bg-secondary hover:cursor-pointer hover:bg-primary ml-4 p-1.5 rounded"
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/hubeco.market/",
                      "_blank"
                    )
                  }
                >
                  <FaInstagram
                    className="text-white  font-semibold"
                    size={20}
                  />
                  {/* <Image
                    className="hover:cursor-pointer"
                    width={28}
                    height={28}
                    alt="Facebook"
                    src={"/images/contact/insta.webp"}
                  /> */}
                </li>
                <li
                  className="align-middle bg-secondary hover:cursor-pointer hover:bg-primary  ml-4 p-1.5 rounded"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/company/hubeco-market/",
                      "_blank"
                    )
                  }
                >
                  <FaLinkedinIn
                    className="text-white  font-semibold"
                    size={20}
                  />
                  {/* <Image
                    className="hover:cursor-pointer"
                    width={28}
                    height={28}
                    alt="Facebook"
                    src={"/images/contact/linkedIn.webp"}
                  /> */}
                </li>
                {/* <li className="align-middle bg-secondary hover:bg-primary ml-4 p-1.5 rounded">
                  <FaInstagram
                    className="text-white hover:cursor-pointer font-semibold"
                    size={20}
                  />
                </li> */}
              </ul>
            </div>
            {/* <span>hubeco</span> */}

            {/* 
          <p className="text-black text-sm font-normal pr-xl mt-10">
            <span className="text-primary">hubeco</span> is poised to unveil a
            new chapter in construction that honours our planet. We are crafting
            an experience that will change the way you think about buildings,
            sustainable materials and solutions.
          </p> */}
            <div className={"flex align-center mt-12"}>
              <CustomButton
                title={"Login/Register"}
                className="bg-white text-secondary hover:cursor-pointer  border border-solid border-secondary hover:border-primary font-semibold hover:text-white  h-12 md:h-12 md:w-40 w-40 md:text-md text-sm  hover:bg-primary"
                customStyles={
                  {
                    // width: "170px",
                    // border: "1px solid #A92449",
                    // color: "#A92449",
                  }
                }
                onPress={() => {
                  router.push("/login");
                }}
                rightIcon={<GoArrowRight />}
              />
              <CustomButton
                title={`${
                  showVendorLogin ? "Vendor Login" : "Vendor Connect"
                }`}
                onPress={() => onClickVendor()}
                className="ml-3 bg-secondary hover:cursor-pointer  text-white h-12 md:h-12 md:w-48  w-40 md:text-md text-sm  hover:bg-primary"
                customStyles={{}}
                rightIcon={<GoArrowRight />}
              />
            </div>
          </div>

          <div className={"w-full md:w-1/6 md:py-0 py-5"}>
            <h4 className="text-black text-xl mb-7">Quick Links</h4>
            <ul>
              <li className="text-fontGray py-xs ">
                <Link
                  href="/products"
                  className="text-gray-700 hover:cursor-pointer hover:text-[#2e3191] text-sm font-light"
                >
                  Products
                </Link>
              </li>
              {/* <li className="text-fontGray py-xs">
                <Link
                  href="/projects"
                  className="text-gray-600 hover:text-blue-700 text-sm font-light cursor-pointer"
                >
                  Projects
                </Link>
              </li> */}
              <li className="text-fontGray py-xs">
                <Link
                  href="/brands"
                  className="text-gray-600 hover:text-blue-700 text-sm font-light cursor-pointer"
                >
                  Brands
                </Link>
              </li>

              <li className="text-fontGray py-xs">
                <Link
                  href="/blogs"
                  className="text-gray-600 hover:text-blue-700 text-sm font-light cursor-pointer"
                >
                  Blogs
                </Link>
              </li>
              <li className="text-fontGray py-xs">
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-700 text-sm font-light cursor-pointer"
                >
                  About
                </Link>
              </li>
              <li className="text-fontGray py-xs">
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-700 text-sm font-light cursor-pointer"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className={"w-full md:w-1/6 md:py-0 py-5"}>
            <h4 className="text-black text-xl mb-7">Customer Area</h4>
            <ul>
              <li className="text-fontGray py-xs">
                <Link
                  href="/cart"
                  className="text-fontGray hover:text-primary text-sm cursor-pointer"
                >
                  My Cart
                </Link>
              </li>
              <li className="text-fontGray py-xs">
                <Link
                  href="/profile?tab=profile"
                  className="text-fontGray hover:text-primary hover:cursor-pointer text-sm"
                >
                  My Account
                </Link>
              </li>
              <li className="text-fontGray py-xs">
                <Link
                  href="/orders"
                  className="text-fontGray hover:text-primary hover:cursor-pointer text-sm"
                >
                  Orders
                </Link>
              </li>
              <li className="text-fontGray py-xs">
                <Link
                  href="/orders"
                  className="text-fontGray hover:text-primary hover:cursor-pointer text-sm"
                >
                  Returns
                </Link>
              </li>

              <li className="text-fontGray py-xs">
                <Link
                  href="/faq"
                  className="text-fontGray hover:text-primary hover:cursor-pointer text-sm "
                >
                  FAQ&#39;s
                </Link>
              </li>
            
            </ul>
          </div>
          <div className={"w-full md:w-1/5 lg:w-1/5 md:py-0 py-5"}>
            <h4 className="text-black text-xl mb-7">Contact Us</h4>
            <p className="text-fontGray text-sm font-light pt-2 text-justify">
              Have a question or need to get in touch? Leave us a message and we
              will get back to you shortly
            </p>
            <ul className="">
              <li className="flex my-4 align-middle items-center">
                <BsEnvelope
                  className="text-secondary hover:cursor-pointer hover:text-primary font-normal"
                  size={14}
                />
                <Link
                  href="mailto:info@hubeco.market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 text-black text-xs font-normal"
                >
                  info@hubeco.market
                </Link>
              </li>
              <li className="flex my-4 align-middle items-center">
                <FiPhone
                  className="text-secondary hover:cursor-pointer hover:text-primary font-normal"
                  size={14}
                />
                <Link
                  href="tel:9985544055"
                  // target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 text-black text-xs font-normal"
                >
                  +91 9985544055
                </Link>
              </li>
              <li className="inline-flex my-1 align-middle items-start">
                <IoLocationOutline
                  size={20}
                  height={20}
                  width={20}
                  className="text-secondary hover:cursor-pointer hover:text-primary font-normal z-20 "
                />
                <Link
                  href="https://maps.app.goo.gl/UbAKuXkfXee5TUn79"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 text-black text-xs font-normal"
                >
                  Hubeco Green Ventures Pvt Ltd<br></br>
                  Awfis Space Solutions Ltd, NSL Icon<br></br>
                  3rd Floor, Road No. 12, Anand Banjara Colony<br></br>
                  <p className="flex flex-wrap text-wrap">
                    {" "}
                    Banjara Hills, Hyderabad, Telangana - 500034
                  </p>
                  <br></br>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="copyright pt-xl md:flex justify-between max-w-screen-xl mx-auto pb-5 md:pd-1 border-t border-t-[#ededed]">
          <div className="md:pb-0 pb-3 flex items-center justify-center">
            <p className="text-fontGray text-xs font-light ">
              Copyright © {currentYear}, Powered by Hubeco Green Ventures Pvt
              Ltd. All rights reserved
            </p>
          </div>
          <div className={"justify-center flex"}>
            <ul className="flex flex-wrap">
              <li className="text-fontGray">
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="text-fontGray hover:text-primary text-xs px-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="text-fontGray">
                <Link href="#" className="text-fontGray text-xs ">|</Link>
              </li>
              <li className="text-fontGray">
                <Link
                  href="/terms-of-use"
                  target="_blank"
                  className="text-fontGray hover:text-primary text-xs px-sm"
                >
                  Terms of Use
                </Link>
              </li>
              <li className="text-fontGray">
                <Link href="#" className="text-fontGray text-xs ">|</Link>
              </li>
              <li className="text-fontGray">
                <Link
                  href="/vendor-terms-sale"
                  target="_blank"
                  className="text-fontGray hover:text-primary text-xs px-sm"
                >
                  Terms of Sale
                </Link>
              </li>
              <li className="text-fontGray">
                <Link href="#" className="text-fontGray text-xs ">|</Link>
              </li>
              <li className="text-fontGray">
                <Link
                  href="/returns-refunds-cancellations"
                  target="_blank"
                  className="text-fontGray hover:text-primary text-xs px-sm"
                >
                  Returns Refunds and Cancellations
                </Link>
              </li>
              <li className="text-fontGray">
                <Link href="#" className="text-fontGray text-xs ">|</Link>
              </li>
              <li className="text-fontGray">
                <Link
                  href="/shipping-delivery"
                  target="_blank"
                  className="text-fontGray hover:text-primary text-xs px-sm"
                >
                  Delivery and Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
