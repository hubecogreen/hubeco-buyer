"use client";
import { useEffect, useMemo, useState } from "react";
import useApi from "@/components/Fetcher/useAPI";
import { GoArrowRight } from "react-icons/go";
import CustomButton from "../customButton/CustomButton";
import { BsEnvelope } from "react-icons/bs";
import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getProductCategoryTree } from "@/lib/productCategoryTreeCache";

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
  const { callApi } = useApi();
  const [categoryIdMap, setCategoryIdMap] = useState<Record<string, string>>({});


  const finalCategories = useMemo(() => {
  const BASE_CATEGORIES = ["Bricks", "Sand", "Paints", "Tiles"];

  const hasAdhesives = !!categoryIdMap["adhesives"];
  const hasSanitary = !!categoryIdMap["sanitary & bath fittings"];

  let extraCategories: string[] = [];

  if (hasAdhesives || hasSanitary) {
    if (hasAdhesives) extraCategories.push("Adhesives");
    if (hasSanitary) extraCategories.push("Sanitary & Bath Fittings");
  } else {
    extraCategories = ["Pavers", "Steel"];
  }

  return [...BASE_CATEGORIES, ...extraCategories].slice(0, 6);
}, [categoryIdMap]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const map: Record<string, string> = {};
        const data = await getProductCategoryTree(callApi);

        if (Array.isArray(data)) {
          data.forEach((parent: any) => {
            if (Array.isArray(parent?.subCategories)) {
              parent.subCategories.forEach((sub: any) => {
                if (sub?.name && sub?._id) {
                  map[sub.name.toLowerCase()] = sub._id;
                }
              });
            }
          });
        }

        setCategoryIdMap(map);
      } catch (e) {
        console.error("Category fetch failed", e);
      }
    };

    fetchCategories();
  }, []);


  const goToCategory = (name: string) => {
    const scid = categoryIdMap[name.toLowerCase()];
    if (!scid) return;

    router.push(`/products?scid=${scid}`);
  };

  return (
    <footer className="w-full bg-cream flex justify-center overflow-x-hidden pt-[49px]">
      <div className="w-full max-w-[1250px] flex flex-col">

        {/* TOP GREEN LINE */}
        <div className="w-full flex justify-center px-4 md:px-5 lg:px-0">
          <div className="w-full lg:w-[1200px] h-[1px] bg-[#069A66]" />
        </div>

        {/* COPYRIGHT */}
        <div className="w-full flex justify-center pt-2">
          <div className="w-full max-w-[1200px] mx-auto lg:px-0 md:px-4">
            {/* Mobile */}
            <div className="lg:hidden flex flex-col gap-2 px-4 pb-10 ">
              <p className="text-[12px] text-brown font-light mb-[80px]">
                Copyright © {currentYear}, Powered By Hubeco Green Ventures Pvt. Ltd.
                All Rights Reserved
              </p>

              <div className="flex flex-wrap gap-1 text-[12px] text-brown">
                <Link href="/privacy-policy">Privacy Policy</Link> |
                <Link href="/terms-of-use">Terms of Use</Link> |
                <Link href="/vendor-terms-sale">Terms of Sale</Link> |
                <Link href="/returns-refunds-cancellations">
                  Returns Refunds and Cancellations
                </Link>{" "}
                | <Link href="/shipping-delivery">Shipping Policy</Link>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex justify-between items-center">
              <p className="text-[12px] text-brown font-light">
                Copyright © {currentYear}, Powered By Hubeco Green Ventures Pvt. Ltd.
                All Rights Reserved
              </p>

              <div className="flex gap-1 text-[12px] text-brown">
                <Link href="/privacy-policy">Privacy Policy</Link> |
                <Link href="/terms-of-use">Terms of Use</Link> |
                <Link href="/vendor-terms-sale">Terms of Sale</Link> |
                <Link href="/returns-refunds-cancellations">
                  Returns Refunds and Cancellations
                </Link>{" "}
                | <Link href="/shipping-delivery">Delivery and Shipping Policy</Link>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER CONTENT */}
        <div className="w-full bg-cover bg-center bg-no-repeat">

          {/* GREEN DIVIDER */}
          <div className="w-full flex justify-start lg:ml-[460px] pt-0 md:pt-6 lg:pt-[138px] mb-4 px-4 md:px-4 lg:px-0">
            <div className="w-full lg:w-[768px] h-[1px] bg-[#069A66]" />
          </div>

          {/* ===== 4 COLUMNS (GRID FOR MD, FLEX FOR LG) ===== */}
          <div
            className="
              w-full
              grid grid-cols-1
              md:grid-cols-2
              lg:flex
              justify-start
              max-w-[1200px]
              mx-auto
              gap-6 md:gap-y-8 lg:gap-[60px]
              px-4 lg:px-0 
              md:px-8
              lg:ml-[460px]
            "
          >
            {/* Products */}
            <div className="w-full md:w-full lg:w-[112px]">
              <h4 className="text-[14px] text-primary mb-2">Products</h4>
             <ul className="space-y-1 text-[13px] lg:text-[14px]">
  {finalCategories.map((cat) => (
    <li key={cat}>
      <button
        onClick={() => goToCategory(cat)}
        className="text-brown"
      >
        {cat === "Sanitary & Bath Fittings" ? "Bath Fittings" : cat}
      </button>
    </li>
  ))}
</ul>

            </div>

            {/* Quick Links */}
            <div className="w-full md:w-full lg:w-[112px]">
              <h4 className="text-[14px] text-primary mb-2">Quick Links</h4>
              <ul className="space-y-1 text-[13px] lg:text-[14px]">
                <li><Link className="text-brown" href="/about">About</Link></li>
                <li><Link className="text-brown" href="/blogs">Blogs</Link></li>
                <li><Link className="text-brown whitespace-nowrap" href="/green-financing">Green Financing</Link></li>
                <li>
                  <a
                    href={`${process.env.NEXT_PUBLIC_VENDOR_URL}/login`}
                    className="text-brown whitespace-nowrap"
                  >
                    Vendor Connect
                  </a>
                </li>
                <li><Link className="text-brown" href="/brands">Brands</Link></li>

              </ul>
            </div>

            {/* Customer Support */}
            <div className="w-full md:w-full lg:w-[150px]">
              <h4 className="text-[14px] text-primary mb-2">Customer Support</h4>
              <ul className="space-y-1 text-[13px] lg:text-[14px]">
                <li><Link className="text-brown" href="/orders">Orders</Link></li>
                <li><Link className="text-brown" href="/orders">Returns</Link></li>
                <li><Link className="text-brown" href="/contact">Contact Us</Link></li>
                <li><Link className="text-brown" href="/faq">FAQ&apos;s</Link></li>
                <li><Link className="text-brown" href="/careers">Careers</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="w-full md:w-full lg:w-[230px]">
              <h4 className="text-[14px] text-primary mb-2">Contact Us</h4>

              <p className="text-brown text-[13px] lg:text-[14px] leading-[20px] mb-2">
                Awfis Co-Working Space <br />
                NSL Icon, Road No. 12 <br />
                Banjara Hills, Hyderabad <br />
                Telangana
              </p>

              <p className="text-[13px] lg:text-[14px] flex items-center gap-2 text-brown mb-2">
                <FiPhone size={14} /> +91 9985544055
              </p>

              <p className="text-[13px] lg:text-[14px] flex items-center gap-2 text-brown mb-3">
                <BsEnvelope size={14} /> info@hubeco.market
              </p>

              <ul className="flex gap-2">
                <li className="w-[32px] h-[32px] bg-[#169B88] rounded flex items-center justify-center cursor-pointer"
                  onClick={() => window.open("https://www.instagram.com/hubeco.market/", "_blank")}
                >
                  <FaInstagram className="text-white" size={16} />
                </li>
                <li className="w-[32px] h-[32px] bg-[#169B88] rounded flex items-center justify-center cursor-pointer"
                  onClick={() => window.open("https://www.facebook.com/people/HubecoMarket/61566048633254/", "_blank")}
                >
                  <FaFacebookF className="text-white" size={16} />
                </li>
                <li className="w-[32px] h-[32px] bg-[#169B88] rounded flex items-center justify-center cursor-pointer"
                  onClick={() => window.open("https://www.linkedin.com/company/hubeco-market/", "_blank")}
                >
                  <FaLinkedinIn className="text-white" size={16} />
                </li>
                <li className="w-[32px] h-[32px] bg-[#169B88] rounded flex items-center justify-center cursor-pointer"
                  onClick={() => window.open("https://www.youtube.com/@hubeco.marketplace", "_blank")}
                >
                  <FaYoutube className="text-white" size={16} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM LOGO */}
        <div className="w-full flex mt-[90px] pb-[60px] md:pb-[2px] lg:pb-[58px] px-4 lg:px-0">
          <div className="max-w-[1200px] w-full">
            <Link href="/">
              <div className="relative lg:w-[717px] lg:h-[162px]  w-[339px] h-[77px] md:w-[497px] md:h-[112px]">
                <Image
                  src="/images/Rlogo.png"
                  alt="Hubeco Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
