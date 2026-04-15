"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const Footer = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const { rehydrated } = useAuth();
  const { callApi } = useApi();
  const callApiRef = useRef(callApi);
  const [categoryIdMap, setCategoryIdMap] = useState<Record<string, string>>({});
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isIPhoneSafari, setIsIPhoneSafari] = useState(false);
  const [installFallbackMessage, setInstallFallbackMessage] = useState("");


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
    callApiRef.current = callApi;
  }, [callApi]);

  useEffect(() => {
    if (!rehydrated) {
      return;
    }

    const fetchCategories = async () => {
      try {
        const map: Record<string, string> = {};
        const data = await getProductCategoryTree(callApiRef.current);

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
  }, [rehydrated]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const checkStandalone = () => {
      const isIosStandalone =
        "standalone" in window.navigator &&
        Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);

      const isDisplayModeStandalone =
        window.matchMedia("(display-mode: standalone)").matches;

      setIsStandalone(isIosStandalone || isDisplayModeStandalone);
    };

    const checkDevice = () => {
      const userAgent = window.navigator.userAgent;
      const platform = window.navigator.platform;
      const isIOS =
        /iPhone|iPad|iPod/i.test(userAgent) ||
        (platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
      const isSafari = /Safari/i.test(userAgent) && !/CriOS|FxiOS|EdgiOS/i.test(userAgent);

      setIsAndroid(/Android/i.test(userAgent));
      setIsIOS(isIOS);
      setIsIPhoneSafari(isIOS && isSafari);
    };

    const syncInstallPrompt = () => {
      const storedPrompt = (window as Window & {
        __hubecoInstallPrompt?: BeforeInstallPromptEvent | null;
      }).__hubecoInstallPrompt;

      setInstallPrompt(storedPrompt ?? null);
      if (storedPrompt) {
        setInstallFallbackMessage("");
      }
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setInstallFallbackMessage("");
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsStandalone(true);
      setInstallFallbackMessage("");
    };

    checkStandalone();
    checkDevice();
    syncInstallPrompt();
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("hubeco:installpromptavailable", syncInstallPrompt);
    window.addEventListener("hubeco:appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("hubeco:installpromptavailable", syncInstallPrompt);
      window.removeEventListener("hubeco:appinstalled", handleAppInstalled);
    };
  }, []);


  const goToCategory = (name: string) => {
    const scid = categoryIdMap[name.toLowerCase()];
    if (!scid) return;

    router.push(`/products?scid=${scid}`);
  };

  const handleInstall = async () => {
    setInstallFallbackMessage("");

    if (isStandalone) {
      return;
    }

    if (!installPrompt && isIPhoneSafari) {
      await handleShare();
      setInstallFallbackMessage("Use Share, then Add to Home Screen to install Hubeco.");
      return;
    }

    if (!installPrompt && isIOS) {
      setInstallFallbackMessage(
        "Open this page in Safari, then tap Share and choose Add to Home Screen."
      );
      return;
    }

    if (!installPrompt) {
      setInstallFallbackMessage(
        isAndroid
          ? "Use Chrome menu and choose Install app or Add to Home screen."
          : "Use your browser menu and choose Install app or Add to Home screen."
      );
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallPrompt(null);
    (window as Window & {
      __hubecoInstallPrompt?: BeforeInstallPromptEvent | null;
    }).__hubecoInstallPrompt = null;

    if (choice.outcome === "dismissed") {
      setInstallFallbackMessage(
        "Install was dismissed. Use your browser menu to try installing again."
      );
    }
  };

  const handleShare = async () => {
    if (typeof window === "undefined" || typeof window.navigator.share !== "function") {
      return;
    }

    try {
      await window.navigator.share({
        title: "Hubeco",
        text: "Install Hubeco on your iPhone from Safari.",
        url: window.location.origin,
      });
    } catch {
      // User dismissed the share sheet.
    }
  };

  if (!rehydrated) return null;

  const showInstallCard = !isStandalone && (isAndroid || isIOS || !!installPrompt);
  const installMessage = isIPhoneSafari
    ? "On iPhone Safari, tap Share and choose Add to Home Screen to install Hubeco."
    : isIOS
      ? "To install Hubeco on iPhone, open this page in Safari and add it to your Home Screen."
    : isAndroid
      ? "Install Hubeco on your Android phone for a faster app-like experience."
      : "Install Hubeco for a faster app-like experience on your device.";
  const installButtonLabel = isIPhoneSafari
    ? "Open Share"
    : isIOS
      ? "How to Install"
      : "Install App";

  return (
    <footer className="w-full bg-cream flex justify-center overflow-x-hidden pt-[49px]">
      <div className="w-full max-w-[1250px] flex flex-col">
        {showInstallCard ? (
          <div className="w-full px-4 md:px-5 lg:px-0">
            <div className="mx-auto mb-6 flex w-full max-w-[1200px] flex-col gap-3 rounded-2xl bg-[#E6F7F3] px-4 py-4 text-brown md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium">
                  {installMessage}
                </p>
                {installFallbackMessage ? (
                  <p className="mt-1 text-xs text-brown/80">{installFallbackMessage}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={handleInstall}
                className="h-10 shrink-0 rounded-full bg-[#01B6A3] px-4 text-sm font-semibold text-white shadow-md"
              >
                {installButtonLabel}
              </button>
            </div>
          </div>
        ) : null}

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
                <li><Link className="text-brown" href="/careers">Careers</Link></li>
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
