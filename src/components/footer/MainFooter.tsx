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
    <footer className="w-full bg-cream flex justify-center overflow-x-hidden">
      <div className="w-full max-w-[1250px] flex flex-col">

        {/* TOP GREEN LINE */}
        <div className="w-full flex justify-center">
          <div className="w-full md:w-[1200px] h-[1px] bg-[#069A66]" />
        </div>

        {/* COPYRIGHT ROW */}
        <div className="w-full flex justify-center pt-2">
          <div className="w-full max-w-[1200px]">
            {/* Mobile */}
            <div className="md:hidden flex flex-col gap-2 px-4">
              <p className="text-[12px] text-black font-light leading-tight pb-[40px]">
                Copyright © {currentYear}, Powered By Hubeco Green Ventures Pvt Ltd. All Rights Reserved
              </p>

              <div className="flex flex-wrap gap-2 text-[12px] text-black pb-[40px]">
                <Link href="/privacy-policy">Privacy Policy</Link> |
                <Link href="/terms-of-use">Terms of Use</Link> |
                <Link href="/vendor-terms-sale">Terms of Sale</Link> |
                <Link href="/returns-refunds-cancellations">Returns Refunds and Cancellations</Link> |
                <Link href="/shipping-delivery">Shipping Policy</Link>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex justify-between items-center whitespace-nowrap">
              <p className="text-[12px] text-black font-light">
                Copyright © {currentYear}, Powered By Hubeco Green Ventures Pvt Ltd. All Rights Reserved
              </p>

              <div className="flex gap-1 text-[12px] text-black whitespace-nowrap ">
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
          <div className="w-full flex justify-start md:ml-[460px] pt-6 md:pt-10 mb-4 md:mt-[131px] px-4 md:px-0">
            <div className="w-full md:w-[768px] h-[1px] bg-[#069A66]" />
          </div>


          {/* FOUR COLUMNS */}
          <div className="w-full flex flex-col md:flex-row justify-start max-w-[1200px] mx-auto gap-6 md:gap-[60px] md:pb-[148px] px-4 md:px-0 md:ml-[460px]">

            {/* Column 1 - Products */}
            <div className="w-full md:w-[112px]">
              <h4 className="text-[14px] text-[#069A66] mb-2 font-semibold">Products</h4>
              <ul className="space-y-1 text-[13px] md:text-[14px]">
                <li><Link className="text-[#023A27]" href="/products/bricks">Bricks</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Adhesives</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Paints</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Tiles</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Bath Fittings</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Steel</Link></li>
              </ul>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="w-full md:w-[112px]">
              <h4 className="text-[14px] text-[#069A66] mb-2 font-semibold">Quick Links</h4>
              <ul className="space-y-1 text-[13px] md:text-[14px]">
                <li><Link className="text-[#023A27]" href="/about">About</Link></li>
                <li><Link className="text-[#023A27]" href="/blogs">Blogs</Link></li>
                <li><Link className="text-[#023A27] whitespace-nowrap" href="/blogs">Green Financing</Link></li>
                <li><Link className="text-[#023A27] whitespace-nowrap" href="/plans">Vendor Connect</Link></li>
                <li><Link className="text-[#023A27]" href="/brands">Brands</Link></li>
              </ul>
            </div>

            {/* Column 3 - Customer Support */}
            <div className="w-full md:w-[150px]">
              <h4 className="text-[14px] text-[#069A66] mb-2 font-semibold">Support</h4>
              <ul className="space-y-1 text-[13px] md:text-[14px]">
                <li><Link className="text-[#023A27]" href="/contact">Contact Us</Link></li>
                <li><Link className="text-[#023A27]" href="/cart">Help Center</Link></li>
                <li><Link className="text-[#023A27]" href="/profile?tab=profile">Order Tracking</Link></li>
                <li><Link className="text-[#023A27]" href="/orders">Returns</Link></li>
              </ul>
            </div>

            {/* Column 4 - Contact Us */}
            <div className="w-full md:w-[230px]">
              <h4 className="text-[14px] text-[#069A66] mb-2 font-semibold">Contact Us</h4>

              <div className="flex items-start gap-2 text-black text-[13px] md:text-xs">
                <p
                  className="text-black mb-2 text-[13px] md:text-[14px] leading-[18px] md:leading-[20px]"
                >
                  Awfis Co-Working Space <br />
                  NSL Icon, Road No. 12 <br />
                  Banjara Hills, Hyderabad <br />
                  Telangana
                </p>
              </div>

              <p className="text-[13px] md:text-[14px] flex items-center gap-2 text-black mb-2">
                <FiPhone size={14} /> Phone: +91 9985544055
              </p>

              <p className="text-[13px] md:text-[14px] flex items-center gap-2 text-black mb-3 md:mb-1">
                <BsEnvelope size={14} />Email: info@hubeco.market
              </p>

              {/* Social Icons */}
              <ul className="flex mt-3 md:mt-1 mb-6 md:mb-8 gap-2">
                <li
                  className="w-[32px] h-[32px] md:w-[26px] md:h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.instagram.com/hubeco.market/", "_blank")}
                >
                  <FaInstagram size={16} className="text-white md:w-[14px] md:h-[14px]" />
                </li>
                <li
                  className="w-[32px] h-[32px] md:w-[26px] md:h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.facebook.com/people/HubecoMarket/61566048633254/", "_blank")}
                >
                  <FaFacebookF size={16} className="text-white md:w-[14px] md:h-[14px]" />
                </li>
                <li
                  className="w-[32px] h-[32px] md:w-[26px] md:h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.linkedin.com/company/hubeco-market/", "_blank")}
                >
                  <FaLinkedinIn size={16} className="text-white md:w-[14px] md:h-[14px]" />
                </li>

                <li
                  className="w-[32px] h-[32px] md:w-[26px] md:h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.youtube.com/@hubeco.marketplace", "_blank")}
                >
                  <FaYoutube size={16} className="text-white md:w-[14px] md:h-[14px]" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM LOGO */}
        <div className="w-full flex mt-5 pb-[30px] px-4 md:px-0">
          <div className="max-w-[1200px] md:ml-[10px] w-full flex justify-start md:justify-start">
            <div className="w-full max-w-[279.38px] md:max-w-[717px] h-[63px] md:h-[161px] relative">
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