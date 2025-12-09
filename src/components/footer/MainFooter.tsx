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
    <footer className="w-full bg-white flex justify-center md:mt-10 overflow-x-hidden">
      <div className="w-full max-w-[1250px] flex flex-col">

        {/* TOP GREEN LINE */}
        <div className="w-full flex justify-center mt-10">
          <div className="w-[1200px] h-[1px] bg-[#069A66]" />
        </div>

        {/* COPYRIGHT ROW */}
        <div className="w-full flex justify-center pt-2">
          <div className="w-full max-w-[1200px]">
            {/* Mobile */}
            <div className="md:hidden flex flex-col gap-2 px-4">
              <p className="text-[12px] text-black font-light leading-tight">
                Copyright © {currentYear}, Powered By Hubeco Green Ventures Pvt Ltd. All Rights Reserved
              </p>

              <div className="flex flex-wrap gap-2 text-[12px] text-black">
                <Link href="/privacy-policy">Privacy Policy</Link> |
                <Link href="/terms-of-use">Terms of Use</Link> |
                <Link href="/vendor-terms-sale">Terms of Sale</Link> |
                <Link href="/returns-refunds-cancellations">Returns & Refunds</Link> |
                <Link href="/shipping-delivery">Shipping Policy</Link>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex justify-between items-center">
              <p className="text-[12px] text-black font-light">
                Copyright © {currentYear}, Powered By Hubeco Green Ventures Pvt Ltd. All Rights Reserved
              </p>

              <div className="flex gap-3 text-[12px] text-black">
                <Link href="/privacy-policy">Privacy Policy</Link> |
                <Link href="/terms-of-use">Terms of Use</Link> |
                <Link href="/vendor-terms-sale">Terms of Sale</Link> |
                <Link href="/returns-refunds-cancellations">Returns</Link> |
                <Link href="/shipping-delivery">Shipping Policy</Link>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER CONTENT (Background Section) */}
        <div className="w-full bg-cover bg-center bg-no-repeat mr-[0px]"
          style={{ backgroundImage: "url('/images/home/footer-bg-2.webp')" }}>

          {/* GREEN DIVIDER */}
          <div className="w-full flex justify-start ml-[460px] pt-10">
            <div className="w-[768px] h-[1px] bg-[#069A66]" />
          </div>
          

          {/* FOUR COLUMNS */}
          <div className="w-full flex justify-start max-w-[1200px] mx-auto  flex gap-[60px] pb-10 ml-[460px]">

            {/* Column 1 */}
            <div className="w-[112px] ">
              <h4 className="text-[14px] text-[#069A66] mb-2">Products</h4>
              <ul className="space-y-1">
                <li><Link className="text-[#023A27]" href="/products">Bricks</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Adhesives</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Paints</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Tiles</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Bath Fittings</Link></li>
                <li><Link className="text-[#023A27]" href="/products">Steel</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="w-[112px]">
              <h4 className="text-[14px] text-[#069A66] mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li><Link className="text-[#023A27]" href="/products">Products</Link></li>
                <li><Link className="text-[#023A27]" href="/brands">Brands</Link></li>
                <li><Link className="text-[#023A27]" href="/blogs">Blogs</Link></li>
                <li><Link className="text-[#023A27]" href="/about">About</Link></li>
                <li><Link className="text-[#023A27]" href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="w-[150px]">
              <h4 className="text-[14px] text-[#069A66] mb-2">Customer Support</h4>
              <ul className="space-y-1">
                <li><Link className="text-[#023A27]" href="/cart">Help Center</Link></li>
                <li><Link className="text-[#023A27]" href="/profile?tab=profile">Order Tracking</Link></li>
                <li><Link className="text-[#023A27]" href="/orders">Returns</Link></li>
                <li><Link className="text-[#023A27]" href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="w-[230px]">
              <h4 className="text-[14px] text-[#069A66] mb-2">Contact Us</h4>

              <p className="text-[14px] text-black mb-3 leading-[20px]">
                Have a question or need to get in touch? Leave us a message.
              </p>

              <p className="text-[14px] flex items-center gap-2 text-black mb-1">
                <FiPhone size={14} /> +91 9985544055
              </p>

              <p className="text-[14px] flex items-center gap-2 text-black mb-3">
                <BsEnvelope size={14} /> info@hubeco.market
              </p>

              <div className="flex items-start gap-2 text-black text-xs">
                <IoLocationOutline size={20} />
                <Link
                  href="https://maps.app.goo.gl/UbAKuXkfXee5TUn79"
                  target="_blank"
                  className="text-black"
                >
                  Hubeco Green Ventures Pvt Ltd <br />
                  Awfis Space Solutions Ltd, NSL Icon <br />
                  3rd Floor, Road No.12 <br />
                  Banjara Hills, Hyderabad – 500034
                </Link>
              </div>

              {/* Social Icons */}
              <ul className="flex mt-3 mb-8 gap-4">
                <li
                  className="w-[26px] h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.facebook.com/people/HubecoMarket/61566048633254/", "_blank")}
                >
                  <FaFacebookF size={14} className="text-white" />
                </li>

                <li
                  className="w-[26px] h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.youtube.com/@hubeco.marketplace", "_blank")}
                >
                  <FaYoutube size={14} className="text-white" />
                </li>

                <li
                  className="w-[26px] h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.instagram.com/hubeco.market/", "_blank")}
                >
                  <FaInstagram size={14} className="text-white" />
                </li>

                <li
                  className="w-[26px] h-[26px] bg-[#169B88] rounded flex justify-center items-center cursor-pointer"
                  onClick={() => window.open("https://www.linkedin.com/company/hubeco-market/", "_blank")}
                >
                  <FaLinkedinIn size={14} className="text-white" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM LOGO */}
        <div className="w-full flex  mt-5">
          <div className="max-w-[1200px] ml-[10px] w-full flex justify-start">
            <div className="w-[717px] h-[161px] relative">
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
