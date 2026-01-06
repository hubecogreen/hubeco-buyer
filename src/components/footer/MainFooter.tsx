"use client";

import { GoArrowRight } from "react-icons/go";
import CustomButton from "../customButton/CustomButton";
import { BsEnvelope } from "react-icons/bs";
import Link from "next/link";
import { IoIosArrowRoundUp } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const userInfo = useSelector((state: any) => state.user?.userInfo || {});
  const rehydrated = useSelector((state: any) => state._persist?.rehydrated);
  const isAuthenticated =
    rehydrated && userInfo && Object.keys(userInfo).length > 0;
  return { isAuthenticated, userInfo, rehydrated };
};

const Footer = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const { rehydrated } = useAuth();
  if (!rehydrated) return null;

  return (
    <footer className="w-full bg-cream flex justify-center overflow-x-hidden pt-[49px]">
      <div className="w-full max-w-[1250px] flex flex-col">

        {/* TOP GREEN LINE */}
        <div className="w-full flex justify-center">
          <div className="w-full lg:w-[1200px] h-[1px] bg-[#069A66]" />
        </div>

        {/* COPYRIGHT ROW */}
        <div className="w-full flex justify-center pt-2">
          <div className="w-full max-w-[1200px]">
            {/* Mobile */}
            <div className="lg:hidden flex flex-col gap-2 px-4">
              <p className="text-[12px] text-brown font-light leading-tight pb-[40px]">
                Copyright © {currentYear}, Powered By Hubeco Green Ventures Pvt Ltd. All Rights Reserved
              </p>

              <div className="flex flex-wrap gap-2 text-[12px] text-brown pb-[40px]">
                <Link href="/privacy-policy">Privacy Policy</Link> |
                <Link href="/terms-of-use">Terms of Use</Link> |
                <Link href="/vendor-terms-sale">Terms of Sale</Link> |
                <Link href="/returns-refunds-cancellations">Returns Refunds and Cancellations</Link> |
                <Link href="/shipping-delivery">Shipping Policy</Link>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex justify-between items-center whitespace-nowrap">
              <p className="text-[12px] text-brown font-light">
                Copyright © {currentYear}, Powered By Hubeco Green Ventures Pvt Ltd. All Rights Reserved
              </p>

              <div className="flex gap-1 text-[12px] text-brown whitespace-nowrap ">
                <Link href="/privacy-policy">Privacy Policy</Link> |
                <Link href="/terms-of-use">Terms of Use</Link> |
                <Link href="/vendor-terms-sale">Terms of Sale</Link> |
                <Link href="/returns-refunds-cancellations">Returns Refunds and Cancellations</Link> |
                <Link href="/shipping-delivery">Delivery and Shipping Policy</Link>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER CONTENT (Background Section) */}
        <div className="w-full bg-cover bg-center bg-no-repeat"
        >

          {/* GREEN DIVIDER */}
          <div className="w-full flex justify-start lg:ml-[460px] pt-6 lg:pt-10 mb-4 lg:mt-[131px] px-4 lg:px-0">
            <div className="w-full lg:w-[768px] h-[1px] bg-[#069A66]" />
          </div>


          {/* FOUR COLUMNS */}
          <div className="w-full flex flex-col lg:flex-row justify-start max-w-[1200px] mx-auto gap-6 lg:gap-[60px]  px-4 lg:px-0 lg:ml-[460px]">

            {/* Column 1 - Products */}
            <div className="w-full lg:w-[112px]">
              <h4 className="text-[14px] text-primary mb-2 ">Products</h4>
              <ul className="space-y-1 text-[13px] lg:text-[14px]">
                <li><Link className="text-[#023A27]" href="/products/bricks">Bricks</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Adhesives</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Paints</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Tiles</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Bath Fittings</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Steel</Link></li>
              </ul>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="w-full lg:w-[112px]">
              <h4 className="text-[14px] text-primary mb-2 ">Quick Links</h4>
              <ul className="space-y-1 text-[13px] lg:text-[14px]">
                <li><Link className="text-[#023A27]" href="/about">About</Link></li>
                <li><Link className="text-[#023A27]" href="/blogs">Blogs</Link></li>
                <li><Link className="text-[#023A27] whitespace-nowrap" href="/green-financing">Green Financing</Link></li>
                <li><Link className="text-[#023A27] whitespace-nowrap" href="/plans">Vendor Connect</Link></li>
                <li><Link className="text-[#023A27]" href="/brands">Brands</Link></li>
                <li><Link className="text-[#023A27]" href="/faq">Faq's</Link></li>
              </ul>
            </div>

            {/* Column 3 - Customer Support */}
            <div className="w-full lg:w-[150px]">
              <h4 className="text-[14px] text-primary mb-2 ">Customer Support</h4>
              <ul className="space-y-1 text-[13px] lg:text-[14px]">                
                <li><Link className="text-[#023A27]" href="/cart">Help Center</Link></li>
                <li><Link className="text-[#023A27]" href="/orders">Orders</Link></li>
                <li><Link className="text-[#023A27]" href="/orders">Returns</Link></li>
                <li><Link className="text-[#023A27]" href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 4 - Contact Us */}
            <div className="w-full lg:w-[230px]">
              <h4 className="text-[14px] text-primary mb-2">Contact Us</h4>

              <div className="flex items-start gap-2 text-brown text-[13px] lg:text-xs">
                <p
                  className="text-brown mb-2 text-[13px] lg:text-[14px] leading-[18px] lg:leading-[20px]"
                >
                  Awfis Co-Working Space <br />
                  NSL Icon, Road No. 12 <br />
                  Banjara Hills, Hyderabad <br />
                  Telangana
                </p>
              </div>

              <p className="text-[13px] lg:text-[14px] flex items-center gap-2 text-brown mb-2">
                <FiPhone size={14} /> Phone: +91 9985544055
              </p>

              <p className="text-[13px] lg:text-[14px] flex items-center gap-2 text-brown mb-3 lg:mb-2">
                <BsEnvelope size={14} />Email: info@hubeco.market
              </p>

              {/* Social Icons */}
              <ul className="flex mt-3 lg:mt-1 mb-6 lg:mb-8 gap-2">
                <li
                  className="w-[32px] h-[32px] lg:w-[26px] lg:h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.instagram.com/hubeco.market/", "_blank")}
                >
                  <FaInstagram size={16} className="text-white lg:w-[14px] lg:h-[14px]" />
                </li>
                <li
                  className="w-[32px] h-[32px] lg:w-[26px] lg:h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.facebook.com/people/HubecoMarket/61566048633254/", "_blank")}
                >
                  <FaFacebookF size={16} className="text-white lg:w-[14px] lg:h-[14px]" />
                </li>
                <li
                  className="w-[32px] h-[32px] lg:w-[26px] lg:h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.linkedin.com/company/hubeco-market/", "_blank")}
                >
                  <FaLinkedinIn size={16} className="text-white lg:w-[14px] lg:h-[14px]" />
                </li>

                <li
                  className="w-[32px] h-[32px] lg:w-[26px] lg:h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.youtube.com/@hubeco.marketplace", "_blank")}
                >
                  <FaYoutube size={16} className="text-white lg:w-[14px] lg:h-[14px]" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM LOGO */}
        <div className="w-full flex mt-[90px] lg:pb-[58px] pb-[30px] px-4 lg:px-0 lg:mt-[148px] md:mt-[132px]">
          <div className="max-w-[1200px] lg:ml-[10px] w-full flex justify-start lg:justify-start">
            <div className="w-full max-w-[279.38px] lg:max-w-[717px] h-[63px] lg:h-[161px] relative">
              <Image
                src="/images/logo3.png"
                alt="Hubeco Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;