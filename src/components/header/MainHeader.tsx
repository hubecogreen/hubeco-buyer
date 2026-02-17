"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Header.module.css";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { IoIosClose } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";
import {
  CiLocationOn,
  CiMenuBurger,
  CiShoppingCart,
  CiUser,
} from "react-icons/ci";
import SearchBar from "@/components/searchBar/CustomSearchBar";
import CustomButton from "../customButton/CustomButton";
import MegaMenu from "./MegaMenu";
import PincodePopup from "../checkLocationPopup/CheckDelivery";
import SidebarMenu from "./SidebarMenu";
import UserPopover from "./userPopover";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { PiUserCircleThin, PiUserFocusThin } from "react-icons/pi";
import { VscMenu } from "react-icons/vsc";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import ProductSegmentsDropdown from "./ProductSegmentsDropdown";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import store from "@/reduxStore";
import { useDispatch } from "react-redux";
import {
  saveCart,
  saveCartCount,
  saveWishlist,
  setUser,
} from "@/reduxStore/slices/userSlice";
import useGetBuyer from "../hooks/useGetBuyer";
import { getCookie, setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import useRefreshToken from "../hooks/useRefreshToken";
import useApi from "../Fetcher/useAPI";
import { BsShop } from "react-icons/bs";
import Image from "next/image";
import useClient from "../hooks/useClient";
import SubmitEnquiryModal from "../modals/SubmitEnquiryModal";

const vendorURL = process.env.NEXT_PUBLIC_VENDOR_URL;
interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isProductSegmentsOpen, setIsProductSegmentsOpen] =
    useState<boolean>(false);
  const [isProductSegmentsClicked, setIsProductSegmentsClicked] =
    useState(false);
  const [rotatingPlaceholders, setRotatingPlaceholders] = useState<string[]>(
    []
  );
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const cartCountRedux = store.getState().user.cartCount;
  const cartCountV = getCookie("CartCount");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isUserPopoverOpen, setUserPopoverOpen] = useState(false);
  const [isUserPopoverClicked, setIsUserPopoverClicked] = useState(false);
  const [cartCount, setCartCount] = useState<any>(cartCountV);
  const router = useRouter();
  const [refresh, setRefresh] = useState<number>(0);
  const token = getCookie("token");
  const dispatch = useDispatch();
  const userInfo =
    typeof window !== "undefined"
      ? (sessionStorage.getItem("buyerUserInfo") as any)
      : null;
  const addInfo = userInfo ? JSON.parse(userInfo)?.addresses : null;
  const iconRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [selectedAdd, setSelectedAdd] = useState<any>([]);
  const [tempCity, setTempCity] = useState<any>(getCookie("culcity"));
  const [tempState, setTempState] = useState<any>(getCookie("culs"));
  const [tempPincode, setTempPincode] = useState<any>(getCookie("culp"));
  const [showVendorLogin, setShowVendorLogin] = useState<any>(false);
  const [showLoginPopup, setShowLoginPopup] = useState<any>(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [reloadH, setReloadH] = useState<any>(0);
  const isClient = useClient();

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

  // Fetch categories on component mount
  useEffect(() => {
    getCategoriesForPlaceholders();
  }, []);

  // Reset clicked state when dropdown closes
  useEffect(() => {
    if (!isProductSegmentsOpen) {
      setIsProductSegmentsClicked(false);
    }
  }, [isProductSegmentsOpen]);

  // Toggle function for product segments (mobile)
  const toggleProductSegments = () => {
    console.log("Toggle called, current state:", isProductSegmentsOpen);
    setIsProductSegmentsOpen((prev) => {
      const newState = !prev;
      console.log("New state will be:", newState);
      return newState;
    });
  };

  // Hover handlers for desktop
  const handleProductSegmentsMouseEnter = () => {
    // Don't open on hover if it was clicked (tablet behavior)
    if (isProductSegmentsClicked) {
      return;
    }

    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsProductSegmentsOpen(true);
  };

  const handleProductSegmentsMouseLeave = () => {
    // Don't close on mouse leave if it was clicked (tablet behavior)
    if (isProductSegmentsClicked) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsProductSegmentsOpen(false);
    }, 200); // 300ms delay before closing
    setHoverTimeout(timeout);
  };

  const { refreshTokens } = useRefreshToken();
  const { callApi } = useApi();

  // Fetch categories for rotating placeholders
  const getCategoriesForPlaceholders = async () => {
    try {
      const result = (await callApi(
        getEndpoint.default.PRODUCTS_CATEGORIES,
        "GET"
      )) as any;
      if (result?.data && result.data.length > 0) {
        const placeholders: string[] = [];

        console.log(result.data, "categories data");

        // Collect category names (main categories, subcategories, and child categories)
        result.data.forEach((category: any) => {
          // Add main category name
          if (category.name && category.name !== "N/A") {
            const truncatedName = category.name.length > 20
              ? category.name.substring(0, 20) + '...'
              : category.name;
            placeholders.push(`Search for ${truncatedName}...`);
          }

          // Add subcategory names
          if (category.subCategories && category.subCategories.length > 0) {
            category.subCategories.forEach((subCat: any) => {
              if (subCat.name && subCat.name !== "N/A") {
                const truncatedName = subCat.name.length > 20
                  ? subCat.name.substring(0, 20) + '...'
                  : subCat.name;
                placeholders.push(`Search for ${truncatedName}...`);
              }

              // Add child category names
              if (subCat.childCategories && subCat.childCategories.length > 0) {
                subCat.childCategories.forEach((childCat: any) => {
                  if (childCat.name && childCat.name !== "N/A") {
                    const truncatedName = childCat.name.length > 20
                      ? childCat.name.substring(0, 20) + '...'
                      : childCat.name;
                    placeholders.push(`Search for ${truncatedName}...`);
                  }
                });
              }
            });
          }
        });

        // Remove duplicates and limit to first 8 placeholders
        const uniquePlaceholders = Array.from(new Set(placeholders)).slice(0, 8);
        setRotatingPlaceholders(uniquePlaceholders);
      }
    } catch (error) {
      console.log("Error fetching categories for placeholders:", error);
      // Fallback placeholders
      setRotatingPlaceholders([
        "Search for categories...",
        "Search for products...",
        "Search for vendors...",
      ]);
    }
  };

  // Rotating placeholder effect with animation timing
  useEffect(() => {
    if (rotatingPlaceholders.length === 0) return;

    const interval = setInterval(() => {
      setCurrentPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % rotatingPlaceholders.length
      );
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [rotatingPlaceholders.length]);

  const getDefaultLoc = () => {
    if (addInfo && addInfo.length > 0) {
      addInfo.forEach((addy: any) => {
        if (addy.isDefault == true) {
          setTempCity(addy?.city);
          setTempPincode(addy?.postCode);
        }
      });
    }
  };

  useEffect(() => {
    router.refresh();
    setCartCount(cartCountV);
  }, [cartCountV]);

  useEffect(() => {
    if (token) {
      getDefaultLoc();
    }
  }, [reloadH == 1]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleSelectedAddress = (event: any) => {
        const address = event.detail;
        setTempCity(address?.city);
        setTempState(address?.state);
        setTempPincode(address?.postCode);
      };

      window.addEventListener("selectedAddress", handleSelectedAddress);

      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("selectedAddress", handleSelectedAddress);
        }
      };
    }
  }, []);

  const toggleMenu = () => {
    if (typeof document !== "undefined") {
      const body = document.querySelector("body") as any;
      setMenuOpen(!isMenuOpen);
      if (!isMenuOpen) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }
    setRefresh(refresh + 1);
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleMouseEnter = () => {
    if (!isUserPopoverClicked) {
      setUserPopoverOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isUserPopoverClicked) {
      setUserPopoverOpen(false);
    }
  };

  const closeUserPopover = () => {
    setUserPopoverOpen(false);
    setIsUserPopoverClicked(false);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    // Longer delay to allow for click events on search results
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 300); // Increased from 100ms to 300ms
  };

  const handleSearchClose = () => {
    setIsSearchFocused(false);
    setSearchValue("");
  };

  const headerRef = useRef<HTMLElement | any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const header = headerRef.current;
      let lastScrollY = window.pageYOffset;

      const handleScroll = () => {
        const currentScrollY = window.pageYOffset;

        if (currentScrollY > 100) {
          if (currentScrollY > lastScrollY) {
            header?.classList.add("hide-nav");
          } else {
            header?.classList.remove("hide-nav");
          }
        } else {
          header?.classList.remove("hide-nav");
        }

        lastScrollY = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getCart();
      getWishlist();
    }
  }, []);

  // REMOVED: The conflicting click-outside handler that was closing popover before menu items could be clicked
  // The UserPopover component has its own click-outside handler that works correctly

  const handleWishlistApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getWishlist();
    } else {
      toast.error(result?.data?.message);
    }
  };

  const getWishlist = async () => {
    setLoading(true);

    try {
      const result = (await callApi(
        getEndpoint.default.WISHLIST,
        "GET"
      )) as any;
      if (result.data == null) {
        handleWishlistApiError(result?.errorData);
      } else {
        setWishlistData(result?.data?.data);
        dispatch(saveWishlist(result?.data?.data));
      }
    } catch (e: any) {
      handleWishlistApiError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
    } else if (result?.status === 404) {
      setCartData([]);
      dispatch(saveCart([]));
      dispatch(saveCartCount([]));
      setCookie("CartCount", "");
    } else if (result?.status === 401) {
      await refreshTokens();
      getCart();
    } else {
      toast.error(result?.data?.message);
    }
  };

  const getCart = async () => {
    setLoading(true);

    try {
      const result = (await callApi(getEndpoint.default.CART, "GET")) as any;
      if (result.data == null) {
        handleApiError(result?.errorData);
      } else {
        setCartData(result?.data?.items);
        setCookie("CartCount", result?.data?.items?.length);
        setCartCount(result?.data?.items?.length || 0);
        dispatch(saveCart(result?.data?.items || []));
        dispatch(saveCartCount(result?.data?.items?.length || 0));
      }
    } catch (e: any) {
      handleApiError(e);
    } finally {
      setLoading(false);
    }
  };

  const onClickVendor = () => {
    if (showVendorLogin) {
      if (typeof window !== "undefined") {
        window.open(`${vendorURL}`, "_blank");
      }
    } else {
      router.push("/plans");
    }
  };

  const onClickCart = () => {
    if (token) {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  if (!isClient) return <></>;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${styles.sticky}  bg-cream lg:h-[79px]  shadow-md  flex items-center justify-center  `}
      >
        <div
          className={`hidden md:hidden lg:block lg:max-w-[1440px] mx-auto  lg:px-[100px]     ${styles.stickyHeader
            } ${isSearchFocused ? styles.searchFocused : ""}`}
        >
          <div className="flex justify-between items-center ">
            {/* Left side - Fixed elements (never affected) */}
            <div
              className={`flex items-center min-w-0 ${token
                ? "space-x-3 "
                : "space-x-2"
                }`}
            >

              {/* Mobile Logo */}
              <Link
                href="/"
                className={`${styles.logo}  hover:cursor-pointer flex-shrink-0 min-w-0 lg:pb-2`}

              >
                <Image
                  src="/images/Rlogo.png"
                  className="!h-[72px] !w-[255px] object-contain"
                  alt="Hubeco Logo"
                  width={255}
                  height={72}
                  onError={(e) => {
                    e.currentTarget.src = "/images/product-placeholder.webp";
                  }}
                  loading="lazy"
                />


              </Link>


              {/* Desktop Navigation Links - Visible on tablet and large screens */}
              <div
                className={`hidden lg:flex items-center flex-shrink-0 ${isSearchFocused ? "lg:flex md:hidden" : ""
                  }`}
              >
                <div className="relative">
                  <div
                    className="flex items-center space-x-1 cursor-pointer hover:text-secondary md:pl-1 l transition-colors relative z-20 lg:pl-2"
                    onMouseEnter={handleProductSegmentsMouseEnter}
                    onMouseLeave={handleProductSegmentsMouseLeave}
                    onClick={() => {
                      setIsProductSegmentsClicked(true);
                      setIsProductSegmentsOpen(!isProductSegmentsOpen);
                    }}
                    data-product-segments-button
                  >
                    {/* <span
                    className={`font-medium relative text-sm md:text-sm lg:text-base md:ml-[25px] lg:ml-[2px] ${
                      isProductSegmentsOpen ? "text-[#B90647]" : "text-brown"
                    }`}
                  >
                    Product Segments
                    {isProductSegmentsOpen && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                    )}
                  </span> */}
                    {/* <svg
                    className={`w-3 h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 text-brown transition-transform duration-200 ${
                      isProductSegmentsOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg> */}
                  </div>
                  {/* <div
                  onMouseEnter={handleProductSegmentsMouseEnter}
                  onMouseLeave={handleProductSegmentsMouseLeave}
                >
                  <ProductSegmentsDropdown
                    isOpen={isProductSegmentsOpen}
                    onClose={() => {
                      setIsProductSegmentsOpen(false);
                      setIsProductSegmentsClicked(false);
                    }}
                  />
                </div> */}
                </div>

                {/* Center - Search Bar with Hamburger Menu - Visible on tablet and large screens */}
                <div className="hidden md:flex lg:flex items-center space-x-2 md:space-x-2 lg:space-x-4 max-w-xl">
                  <div className="relative md:flex lg:flex">
                    {/* {!isSearchFocused ? (
                <div ref={searchRef} className="relative">
                  <button
                    className={`w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors md:mr-1 ${token? "lg:mr-0" : "lg:mr-4"}   md:ml-0 lg:ml-2`}
                    onClick={handleSearchFocus}
                  >
                    <IoSearchOutline className="text-brown" size={18} />
                  </button>
                </div>
              ) : ( */}
                    <div className="flex items-center space-x-2 md:space-x-2 lg:space-x-4 w-full md:w-[150px] lg:w-[300px] bg-cream">
                      {/* <div className="hidden md:hidden lg:flex">
                    <VscMenu
                      className="text-brown cursor-pointer font-light text-brown"
                      size={24}
                      onClick={toggleMenu}
                    />
                  </div> */}
                      <div className="relative flex-1 bg-red-200">
                        <SearchBar
                          isExpanded={true}
                          onFocus={handleSearchFocus}
                          onBlur={handleSearchBlur}
                          className="w-[288px] bg-red-100"
                          value={searchValue}
                          onChange={(value) => setSearchValue(value)}
                          placeholder={
                            rotatingPlaceholders[currentPlaceholderIndex] ||
                            "Search for Products..."
                          }
                        />
                      </div>
                      {/* <button
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={handleSearchClose}
                  >
                    <IoClose className="text-brown" size={18} />
                  </button> */}
                    </div>
                  </div>
                </div>
                {/* Products */}
                <Link
                  href="/products"
                  className={`ml-[29px] font-medium cursor-pointer transition-colors relative hidden lg:block ${pathname === "/products"
                    ? "text-[#B90647]"
                    : "text-brown hover:text-secondary"
                    }`}
                >
                  Products
                  {pathname === "/products" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                  )}
                </Link>

                {/* Green Financing */}
                <Link
                  href="/green-financing"
                  className={`ml-[20px] flex items-center space-x-1 cursor-pointer hover:text-secondary transition-colors relative hidden lg:flex ${pathname === "/green-financing"
                    ? "text-[#B90647]"
                    : "text-brown"
                    }`}
                >
                  <span className="font-medium text-base relative">
                    Green Financing
                    {pathname === "/green-financing" && (
                      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#B90647]"></span>
                    )}
                  </span>
                </Link>

                {/* About */}
                <Link
                  href="/about"
                  className={`ml-[20px] font-medium cursor-pointer transition-colors relative hidden lg:block ${pathname === "/about"
                    ? "text-[#B90647]"
                    : "text-brown hover:text-secondary"
                    }`}
                >
                  About
                  {pathname === "/about" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                  )}
                </Link>


              </div>

              {/* Mobile Navigation Links */}
              {/* <div className="md:hidden flex items-center space-x-3">
              <div className="relative">
                <div
                  className="flex items-center space-x-1 cursor-pointer text-brown relative z-20"
                  onClick={toggleProductSegments}
                  data-product-segments-button
                >
                  <span
                    className={`font-medium relative text-xs pl-4 ${
                      isProductSegmentsOpen ? "text-[#B90647]" : "text-brown"
                    }`}
                  >
                    Product Segments
                    {isProductSegmentsOpen && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                    )}
                  </span>
                  <svg
                    className={`w-3 h-3 text-brown transition-transform duration-200 ${
                      isProductSegmentsOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <ProductSegmentsDropdown
                  isOpen={isProductSegmentsOpen}
                  onClose={() => setIsProductSegmentsOpen(false)}
                />
              </div>
            </div> */}
            </div>

            {/* Desktop Additional Navigation Links - Visible on tablet and large screens, but hide some items on tablet */}
            {/* {!isSearchFocused && (
              <div
                className={`hidden md:flex items-center ${token
                  ? "space-x-8 md:space-x-10 lg:space-x-14"
                  : "space-x-6 md:space-x-8 lg:space-x-8"
                  }`}
              > */}
            {/* <Link
                href="/brands"
                className={`font-medium cursor-pointer transition-colors relative hidden lg:block ${
                  pathname === "/brands"
                    ? "text-[#B90647]"
                    : "text-brown hover:text-secondary"
                }`}
              >
                Brands
                {pathname === "/brands" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link> */}
            {/* <Link
                href="/blogs"
                className={`font-medium cursor-pointer transition-colors relative hidden lg:block ${
                  pathname === "/blogs"
                    ? "text-[#B90647]"
                    : "text-brown hover:text-secondary"
                }`}
              >
                Blogs
                {pathname === "/blogs" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link> */}


            {/* <Link
                href="/contact"
                className={`font-medium cursor-pointer transition-colors relative hidden lg:block ${
                  pathname === "/contact"
                    ? "text-[#B90647]"
                    : "text-brown hover:text-secondary"
                }`}
              >
                Contact Us
                {pathname === "/contact" && (
                  <div className="absolute bottom-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link> */}
            {/* </div>
            )} */}

            {/* Mobile Additional Navigation Links - Removed, moved to hamburger menu */}

            {/* Center - Search Bar with Hamburger Menu */}
            {/* <div className="hidden md:flex items-center space-x-2 md:space-x-4 max-w-2xl">
            <div className="relative">
              {!isSearchFocused ? (
                <div
                  ref={searchRef}
                  className="relative"
                  onClick={handleSearchFocus}
                >
                  <button
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={handleSearchFocus}
                  >
                    <IoSearchOutline className="text-brown" size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 md:space-x-4 w-full">
                  <div className="w-8 md:w-12 md:px-4 flex items-center">
                    <VscMenu
                      className="text-brown hover:cursor-pointer font-light"
                      size={24}
                      onClick={toggleMenu}
                    />
                  </div>
                  <div className="relative flex-1">
                    <SearchBar
                      isExpanded={true}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      className="w-full"
                      value={searchValue}
                      onChange={(value) => setSearchValue(value)}
                      showDropdown={showSearchDropdown}
                      onDropdownToggle={(show) => setShowSearchDropdown(show)}
                      placeholder={
                        rotatingPlaceholders[currentPlaceholderIndex] ||
                        "Search for Products..."
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div> */}



            {/* Right side - User actions */}
            <div className="flex items-center md:space-x-2 lg:space-x-4 justify-end ">
              {/* Profile Icon - Visible on all screen sizes */}
              {token ? <div className="flex ">
                <div
                  ref={iconRef}
                  onClick={() => {
                    if (isUserPopoverOpen) {
                      setUserPopoverOpen(false);
                      setIsUserPopoverClicked(false);
                    } else {
                      setUserPopoverOpen(true);
                      setIsUserPopoverClicked(true);
                    }
                  }}
                  className="relative flex justify-between items-center gap-[5px] cursor-pointer"
                >
                  <PiUserCircleThin
                    className="text-brown hover:cursor-pointer"
                    size={30}
                  />
                  <span className="text-primary">Profile</span>
                </div>

                <div ref={popoverRef}>
                  <UserPopover
                    isOpen={isUserPopoverOpen}
                    userInfos={userInfo}
                    onClose={() => closeUserPopover()}
                  />
                </div>

                {/* Cart Icon - Visible on all screen sizes */}
                <div className=" flex justify-between items-center pr-2 md:pr-2 lg:pr-4 lg:mx-4 gap-[5px] cursor-pointer "
                  onClick={onClickCart}>
                  <div className="relative">
                    <CiShoppingCart
                      className="text-brown hover:cursor-pointer "
                      size={30}

                    />
                    {Number(cartCountV) > 0 &&
                      (cartCountV !== "0" ||
                        cartCount !== null ||
                        cartCount !== undefined) &&
                      token ? (
                      <div className="absolute top-[-8px] right-[2px] md:top-[-8px] md:right-[2px] lg:top-[-12px] lg:right-[-7px] bg-[#439787] text-white rounded-full w-[16px] h-[16px] md:w-[16px] md:h-[16px] lg:w-[20px] lg:h-[20px] flex items-center justify-center text-[8px] md:text-[8px] lg:text-[10px] font-bold">
                        {cartCountV ? cartCountV : cartCount ? cartCount : ""}
                      </div>
                    ) : null}
                  </div>
                  <span className="text-primary">View Cart</span>
                </div>

              </div>
                :
                <div className="flex justify-between items-center">
                  <CustomButton
                    title="Submit Enquiry"
                    className="text-[16px] bg-secondaryLight py-[12px] px-[13px]  h-12 m-[10px] hidden lg:flex text-white w-[145px] "

                    hoverBgColor=""
                    onPress={() => setShowEnquiryModal(true)}
                  />
                  <CustomButton
                    title="Login / SignUp"
                    className="text-[16px] bg-cream text-secondaryLight border-[1px] border-secondaryLight  py-[12px] px-[13px] w-[145px]   h-12  hidden lg:flex  font-medium"

                    hoverBgColor=""
                    onPress={() => setShowLoginPopup(true)}
                  />
                </div>}

              {/* Vendor Button/Icon - Different for mobile vs tablet vs desktop */}
              {/* {!token && (
              <>
              
                <CustomButton
                  title={`${
                    showVendorLogin ? "Vendor Login" : "Vendor Connect"
                  }`}
                  className="text-base bg-secondary px-4 lg:px-2 hover:bg-primary h-12 mr-4 hidden lg:flex text-white font-medium"
                  customStyles={{ marginRight:'30px'}}
                  rightIcon={<GoArrowRight />}
                  hoverBgColor=""
                  onPress={() => onClickVendor()}
                />

               
                <Link
                  href="/plans"
                  className="hidden md:flex lg:hidden p-1"
                  onClick={() => onClickVendor()}
                >
                  <Image
                    alt="vendor"
                    className="w-5 h-5 md:w-6 md:h-6"
                    src="/images/home/vendor.webp"
                    width={20}
                    height={20}
                    onError={(e) => {
                      e.currentTarget.src = "/images/product-placeholder.webp";
                    }}
                    loading="lazy"
                  />
                </Link>

                <Link
                  href="/plans"
                  className="md:hidden"
                  onClick={() => onClickVendor()}
                >
                  <Image
                    alt="vendor"
                    className="w-7 h-7"
                    src="/images/home/vendor.webp"
                    width={20}
                    height={20}
                    onError={(e) => {
                      e.currentTarget.src = "/images/product-placeholder.webp";
                    }}
                    loading="lazy"
                  />
                </Link>
              </>
            )} */}

              {token && <div className="relative w-10 md:w-12 lg:w-18"></div>}

              {/* Tablet Hamburger Menu - Show after vendor image */}
              <div className="hidden md:flex lg:hidden" style={{ marginRight: '18px' }}>
                <VscMenu
                  className="text-brown cursor-pointer font-light text-brown"
                  size={22}
                  onClick={toggleMenu}
                />
              </div>
            </div>
          </div>

          {/* Second Line - Mobile Only: Search Bar */}
          <div className="md:hidden flex items-center justify-between py-2">
            {/* Search Bar */}
            <div className="flex-1 mx-3">
              <SearchBar
                isExpanded={true}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full"
                value={searchValue}
                onChange={(value) => setSearchValue(value)}
                placeholder={
                  rotatingPlaceholders[currentPlaceholderIndex] ||
                  "Search for Products..."
                }
              />
            </div>
          </div>
        </div>




        {/* ================= TABLET HEADER ONLY ================= */}
        <div className="hidden md:flex lg:hidden  w-full items-center gap-3 px-4 h-[72px] bg-cream border-b">

          {/* Menu */}
          <VscMenu
            className="text-brown cursor-pointer"
            size={22}
            onClick={toggleMenu}
          />

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/Rlogo.png"
              alt="Hubeco Logo"
              width={140}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Search */}
          <div className="flex-1">
            <SearchBar
              isExpanded={true}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              value={searchValue}
              onChange={(value) => setSearchValue(value)}
              placeholder={
                rotatingPlaceholders[currentPlaceholderIndex] ||
                "Search for Products..."
              }
            />
          </div>

          {/* Submit Enquiry */}
          {!token && (
            <>
              <CustomButton
                title="Submit Enquiry"
                className="bg-secondaryLight text-cream h-10 px-4 text-sm"
                onPress={() => setShowEnquiryModal(true)}
              />


              <CustomButton
                title="Login / SignUp"
                className="bg-cream border border-secondaryLight text-secondaryLight h-10 px-4 text-sm"
                onPress={() => setShowLoginPopup(true)}
              />
            </>
          )}

          <div className="flex items-center md:space-x-2 lg:space-x-4 ">
            {/* Profile Icon - Visible on all screen sizes */}
            {token ? <>
              <div
                ref={iconRef}
                onClick={() => {
                  if (isUserPopoverOpen) {
                    setUserPopoverOpen(false);
                    setIsUserPopoverClicked(false);
                  } else {
                    setUserPopoverOpen(true);
                    setIsUserPopoverClicked(true);
                  }
                }}
                className="relative"
              >
                <PiUserCircleThin
                  className="text-brown hover:cursor-pointer"
                  size={30}
                />
              </div>

              <div ref={popoverRef}>
                <UserPopover
                  isOpen={isUserPopoverOpen}
                  userInfos={userInfo}
                  onClose={() => closeUserPopover()}
                />
              </div>

              {/* Cart Icon - Visible on all screen sizes */}
              <div className="relative pr-2 md:pr-2 lg:pr-4">
                <CiShoppingCart
                  className="text-brown hover:cursor-pointer"
                  size={30}
                  onClick={onClickCart}
                />
                {Number(cartCountV) > 0 &&
                  (cartCountV !== "0" ||
                    cartCount !== null ||
                    cartCount !== undefined) &&
                  token ? (
                  <div className="absolute top-[-8px] right-[2px] md:top-[-8px] md:right-[2px] lg:top-[-12px] lg:right-[2px] bg-[#439787] text-white rounded-full w-[16px] h-[16px] md:w-[16px] md:h-[16px] lg:w-[20px] lg:h-[20px] flex items-center justify-center text-[8px] md:text-[8px] lg:text-[10px] font-bold">
                    {cartCountV ? cartCountV : cartCount ? cartCount : ""}
                  </div>
                ) : null}
              </div>
            </>
              :
              <div className="flex justify-between items-center">
                <CustomButton
                  title="Submit Enquiry"
                  className="text-[16px] bg-secondaryLight py-[12px] px-[13px]  h-12 m-[10px] hidden lg:flex text-white w-[145px] "

                  hoverBgColor=""
                  onPress={() => router.push('/contact')}
                />
                <CustomButton
                  title="Login / SignUp"
                  className="text-[16px] bg-cream text-secondaryLight border-[1px] border-secondaryLight  py-[12px] px-[13px] w-[145px]   h-12  hidden lg:flex  font-medium"

                  hoverBgColor=""
                  onPress={() => setShowLoginPopup(true)}
                />
              </div>}

            {/* Vendor Button/Icon - Different for mobile vs tablet vs desktop */}
            {/* {!token && (
              <>
              
                <CustomButton
                  title={`${
                    showVendorLogin ? "Vendor Login" : "Vendor Connect"
                  }`}
                  className="text-base bg-secondary px-4 lg:px-2 hover:bg-primary h-12 mr-4 hidden lg:flex text-white font-medium"
                  customStyles={{ marginRight:'30px'}}
                  rightIcon={<GoArrowRight />}
                  hoverBgColor=""
                  onPress={() => onClickVendor()}
                />

               
                <Link
                  href="/plans"
                  className="hidden md:flex lg:hidden p-1"
                  onClick={() => onClickVendor()}
                >
                  <Image
                    alt="vendor"
                    className="w-5 h-5 md:w-6 md:h-6"
                    src="/images/home/vendor.webp"
                    width={20}
                    height={20}
                    onError={(e) => {
                      e.currentTarget.src = "/images/product-placeholder.webp";
                    }}
                    loading="lazy"
                  />
                </Link>

                <Link
                  href="/plans"
                  className="md:hidden"
                  onClick={() => onClickVendor()}
                >
                  <Image
                    alt="vendor"
                    className="w-7 h-7"
                    src="/images/home/vendor.webp"
                    width={20}
                    height={20}
                    onError={(e) => {
                      e.currentTarget.src = "/images/product-placeholder.webp";
                    }}
                    loading="lazy"
                  />
                </Link>
              </>
            )} */}



          </div>

        </div>



        {/* MOBILE HEADER */}
        <div className="md:hidden sm:hidden w-full mx-[10px] p-2 bg-cream border-[1px] border-gray-200 shadow-sm h-[122px]" >

          {/* Row 1: Menu | Logo | Login */}
          <div className="flex items-center justify-between">

            {/* Menu */}
            <VscMenu
              className="text-brown cursor-pointer"
              size={24}
              onClick={toggleMenu}
            />

            {/* Logo */}
            <Link href="/" className="flex justify-center flex-1">
              <Image
                src="/images/Rlogo.png"
                alt="Hubeco Logo"
                width={188}
                height={43}
                className="object-contain"
              />
            </Link>

            {/* Login / Profile */}
            {token ? (
              <div className="flex items-center md:space-x-2 lg:space-x-4">
                {/* Profile Icon - Visible on all screen sizes */}
                {token ? <><div
                  ref={iconRef}
                  onClick={() => {
                    if (isUserPopoverOpen) {
                      setUserPopoverOpen(false);
                      setIsUserPopoverClicked(false);
                    } else {
                      setUserPopoverOpen(true);
                      setIsUserPopoverClicked(true);
                    }
                  }}
                  className="relative"
                >
                  <PiUserCircleThin
                    className="text-brown hover:cursor-pointer"
                    size={30}
                  />
                </div>

                  <div ref={popoverRef}>
                    <UserPopover
                      isOpen={isUserPopoverOpen}
                      userInfos={userInfo}
                      onClose={() => closeUserPopover()}
                    />
                  </div>

                  {/* Cart Icon - Visible on all screen sizes */}
                  <div className="relative pr-2 md:pr-2 lg:pr-4">
                    <CiShoppingCart
                      className="text-brown hover:cursor-pointer"
                      size={30}
                      onClick={onClickCart}
                    />
                    {Number(cartCountV) > 0 &&
                      (cartCountV !== "0" ||
                        cartCount !== null ||
                        cartCount !== undefined) &&
                      token ? (
                      <div className="absolute top-[-8px] right-[2px] md:top-[-8px] md:right-[2px] lg:top-[-12px] lg:right-[2px] bg-[#439787] text-white rounded-full w-[16px] h-[16px] md:w-[16px] md:h-[16px] lg:w-[20px] lg:h-[20px] flex items-center justify-center text-[8px] md:text-[8px] lg:text-[10px] font-bold">
                        {cartCountV ? cartCountV : cartCount ? cartCount : ""}
                      </div>
                    ) : null}
                  </div>
                </>
                  :
                  <div className="flex justify-between items-center">
                    <CustomButton
                      title="Submit Enquiry"
                      className="text-[16px] bg-secondaryLight py-[12px] px-[13px]  h-12 m-[10px] hidden lg:flex text-white w-[145px] "

                      hoverBgColor=""
                      onPress={() => router.push('/contact')}
                    />
                    <CustomButton
                      title="Login / SignUp"
                      className="text-[16px] bg-cream text-secondaryLight border-[1px] border-secondaryLight  py-[12px] px-[13px] w-[145px]   h-12  hidden lg:flex  font-medium"

                      hoverBgColor=""
                      onPress={() => setShowLoginPopup(true)}
                    />
                  </div>}

                {/* Vendor Button/Icon - Different for mobile vs tablet vs desktop */}
                {/* {!token && (
    <>
    
      <CustomButton
        title={`${
          showVendorLogin ? "Vendor Login" : "Vendor Connect"
        }`}
        className="text-base bg-secondary px-4 lg:px-2 hover:bg-primary h-12 mr-4 hidden lg:flex text-white font-medium"
        customStyles={{ marginRight:'30px'}}
        rightIcon={<GoArrowRight />}
        hoverBgColor=""
        onPress={() => onClickVendor()}
      />

     
      <Link
        href="/plans"
        className="hidden md:flex lg:hidden p-1"
        onClick={() => onClickVendor()}
      >
        <Image
          alt="vendor"
          className="w-5 h-5 md:w-6 md:h-6"
          src="/images/home/vendor.webp"
          width={20}
          height={20}
          onError={(e) => {
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
          loading="lazy"
        />
      </Link>

      <Link
        href="/plans"
        className="md:hidden"
        onClick={() => onClickVendor()}
      >
        <Image
          alt="vendor"
          className="w-7 h-7"
          src="/images/home/vendor.webp"
          width={20}
          height={20}
          onError={(e) => {
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
          loading="lazy"
        />
      </Link>
    </>
  )} */}



              </div>

            ) : (
              <CustomButton
                title="Login / SignUp"
                className="text-[12px] bg-cream text-secondaryLight border-[1px] border-secondaryLight px-4 lg:px-2  md:h-12 h-10   lg:flex  font-medium"

                hoverBgColor=""
                onPress={() => setShowLoginPopup(true)}
              />
            )}
          </div>

          {/* Row 2: Full-width Search */}
          <div className="mt-3">
            <SearchBar
              isExpanded={true}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="w-full"
              value={searchValue}
              onChange={(value) => setSearchValue(value)}
              placeholder={
                rotatingPlaceholders[currentPlaceholderIndex] ||
                "Search for Products..."
              }
            />
          </div>
        </div>


        <PincodePopup isOpen={isPopupOpen} onClose={togglePopup} />
        <SidebarMenu isOpen={isMenuOpen} onClose={toggleMenu} />
        {isMenuOpen && (
          <div
            className="fixed top-0 left-0 w-full duration-1000 h-full bg-black opacity-50 z-60"
            onClick={toggleMenu}
          />
        )}
      </header>
      <LoginPopup
        open={showLoginPopup}
        onOpenChange={setShowLoginPopup}
        router={router}
      />
      <SubmitEnquiryModal
        open={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        product={null}
        mode="form"
      />
    </>
  );
};
// ----------------------------
// Login Popup Component
// ----------------------------
const LoginPopup = ({
  open,
  onOpenChange,
  router,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  router: any;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          md:max-w-md
          max-w-[95vw]
          max-h-[50vh]
          rounded-lg
          h-fit
          p-4
          md:p-0
          bg-cream
        "
      >
        <div className="flex flex-col items-center justify-center gap-3 md:p-6 p-4">

          {/* Logo */}
          <Image
            src="/images/Rlogo.png"
            alt="Hubeco Logo"
            width={180}
            height={40}
            className="mb-1"
          />

          <p className="text-brown text-sm text-center mb-4">
            Sustainable Construction Materials Marketplace
          </p>

          {/* Buyer + Vendor buttons */}
          <div className="flex flex-row md:flex-row gap-4 w-full md:w-auto">

            {/* BUYER */}
            <button
              onClick={() => {
                onOpenChange(false);
                router.push("/login");
              }}
              className="
                group
                w-full md:w-[158px]
                h-[72px] md:h-[96px]
                bg-cream border border-[#109989]
                rounded-[7px] shadow-sm
                flex items-center justify-center gap-[11px]
                hover:bg-primary
              "
            >
              <Image
                src="/images/signup/buyer.png"
                width={25}
                height={26}
                alt="buyer"
                className="transition group-hover:invert group-hover:brightness-0"
              />
              <span className="text-primary font-medium group-hover:text-white text-[18px] md:text-[24px]">
                Buyer
              </span>
            </button>

            {/* VENDOR */}
            <button
              onClick={() => {
                onOpenChange(false);
                window.location.href = `${process.env.NEXT_PUBLIC_VENDOR_URL}/login`;
              }}
              className="
                group
                w-full md:w-[178px]
                h-[72px] md:h-[96px]
                bg-cream border border-[#BB0444]
                rounded-[7px] shadow-sm
                flex items-center justify-center gap-[9px]
                hover:bg-secondary
              "
            >
              <Image
                src="/images/signup/vendor.png"
                width={25}
                height={26}
                alt="vendor"
                className="transition group-hover:invert group-hover:brightness-0"
              />
              <span className="text-secondary font-medium group-hover:text-white text-[18px] md:text-[24px]">
                Vendor
              </span>
            </button>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


export default Header;