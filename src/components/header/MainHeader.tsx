"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Header.module.css";
import { GoArrowRight } from "react-icons/go";
import {
  CiLocationOn,
  CiMenuBurger,
  CiShoppingCart,
  CiUser,
} from "react-icons/ci";
import SearchBar from "@/components/searchBar/CustomSearchBar";
import CustomSearchBar from "@/components/searchBar/CustomSearchBar";
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

const vendorURL = process.env.NEXT_PUBLIC_VENDOR_URL;
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isProductSegmentsOpen, setIsProductSegmentsOpen] =
    useState<boolean>(false);
  const [rotatingPlaceholders, setRotatingPlaceholders] = useState<string[]>(
    []
  );
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const cartCountRedux = store.getState().user.cartCount;
  const cartCountV = getCookie("CartCount");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isUserPopoverOpen, setUserPopoverOpen] = useState(false);
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
  const [reloadH, setReloadH] = useState<any>(0);
  const isClient = useClient();

  const pathname = usePathname();
  const fullUrl =
    typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";
  const domainUrl = process.env.NEXT_PUBLIC_DEV_URL;

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
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsProductSegmentsOpen(true);
  };

  const handleProductSegmentsMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsProductSegmentsOpen(false);
    }, 300); // 300ms delay before closing
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
      if (result?.data) {
        const placeholders: string[] = [];

        // Add main categories
        result.data.forEach((category: any) => {
          placeholders.push(`Search for ${category.name}...`);

          // Add subcategories
          if (category.subCategories) {
            category.subCategories.forEach((subCat: any) => {
              placeholders.push(`Search for ${subCat.name}...`);

              // Add child categories
              if (subCat.childCategories) {
                subCat.childCategories.forEach((childCat: any) => {
                  placeholders.push(`Search for ${childCat.name}...`);
                });
              }
            });
          }
        });

        setRotatingPlaceholders(placeholders);
      }
    } catch (error) {
      console.log("Error fetching categories for placeholders:", error);
      // Fallback placeholders
      setRotatingPlaceholders([
        "Search for Bricks...",
        "Search for Cement...",
        "Search for Steel...",
        "Search for Tiles...",
        "Search for Paint...",
        "Search for Tools...",
        "Search for Plumbing...",
        "Search for Electrical...",
      ]);
    }
  };

  // Rotating placeholder effect with animation timing
  useEffect(() => {
    if (rotatingPlaceholders.length === 0) return;

    const interval = setInterval(() => {
      console.log("Changing placeholder from MainHeader");
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
    setUserPopoverOpen(true);
  };

  const handleMouseLeave = () => {
    setUserPopoverOpen(false);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    // Small delay to allow for click events
    setTimeout(() => {
      setIsSearchFocused(false);
      setShowSearchDropdown(false);
    }, 100);
  };

  const handleSearchClose = () => {
    setIsSearchFocused(false);
    setSearchValue("");
    setShowSearchDropdown(false);
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
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${styles.sticky}`}
    >
      <div
        className={`w-full justify-center items-center bg-lightBgColor h-20 px-4 pt-4 pb-24 ${
          styles.stickyHeader
        } ${isSearchFocused ? styles.searchFocused : ""}`}
      >
        <div className="flex justify-between items-center py-4">
          {/* Left side - Fixed elements (never affected) */}
          <div className="flex items-center justify-center space-x-6">
            {/* Mobile Logo */}
            <Link
              href="/"
              className={`${styles.logo} w-80 h-8 md:hidden hover:cursor-pointer mr-[35px]`}
            >
              <Image
                src="/images/Logo-2.webp"
                className="h-[35px]"
                alt="Hubeco Logo"
                width={200}
                height={35}
                onError={(e) => {
                  e.currentTarget.src = "/images/product-placeholder.webp";
                }}
                loading="lazy"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <div
                  className="flex items-center space-x-1 cursor-pointer hover:text-secondary transition-colors relative z-20"
                  onMouseEnter={handleProductSegmentsMouseEnter}
                  onMouseLeave={handleProductSegmentsMouseLeave}
                  data-product-segments-button
                >
                  <span
                    className={`font-medium relative ${
                      isProductSegmentsOpen ? "text-[#B90647]" : "text-gray-800"
                    }`}
                  >
                    Product Segments
                    {isProductSegmentsOpen && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                    )}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
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
                <div
                  onMouseEnter={handleProductSegmentsMouseEnter}
                  onMouseLeave={handleProductSegmentsMouseLeave}
                >
                  <ProductSegmentsDropdown
                    isOpen={isProductSegmentsOpen}
                    onClose={() => setIsProductSegmentsOpen(false)}
                  />
                </div>
              </div>
              <Link
                href="/green-financing"
                className="flex items-center space-x-1 cursor-pointer hover:text-secondary transition-colors"
              >
                <span className="text-gray-800 font-medium">
                  Green Financing
                </span>
                <svg
                  className="w-4 h-4 text-gray-600"
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
              </Link>
            </div>

            {/* Mobile Navigation Links */}
            <div className="md:hidden flex items-center space-x-4">
              <div className="relative">
                <div
                  className="flex items-center space-x-1 cursor-pointer hover:text-secondary transition-colors relative z-20"
                  onClick={toggleProductSegments}
                  data-product-segments-button
                >
                  <span
                    className={`font-medium relative text-sm ${
                      isProductSegmentsOpen ? "text-[#B90647]" : "text-gray-800"
                    }`}
                  >
                    Product Segments
                    {isProductSegmentsOpen && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                    )}
                  </span>
                  <svg
                    className={`w-3 h-3 text-gray-600 transition-transform duration-200 ${
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
              <Link
                href="/green-financing"
                className="flex items-center space-x-1 cursor-pointer hover:text-secondary transition-colors"
              >
                <span className="text-gray-800 font-medium text-sm">
                  Green Financing
                </span>
                <svg
                  className="w-3 h-3 text-gray-600"
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
              </Link>
            </div>
          </div>

          {/* Desktop Additional Navigation Links */}
          {!isSearchFocused && (
            <div className="hidden md:flex items-center space-x-10">
              <Link
                href="/brands"
                className={`font-medium cursor-pointer transition-colors relative ${
                  pathname === "/brands"
                    ? "text-[#B90647]"
                    : "text-gray-800 hover:text-secondary"
                }`}
              >
                Brands
                {pathname === "/brands" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link>
              <Link
                href="/blogs"
                className={`font-medium cursor-pointer transition-colors relative ${
                  pathname === "/blogs"
                    ? "text-[#B90647]"
                    : "text-gray-800 hover:text-secondary"
                }`}
              >
                Blogs
                {pathname === "/blogs" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link>
              <Link
                href="/products"
                className={`font-medium cursor-pointer transition-colors relative ${
                  pathname === "/products"
                    ? "text-[#B90647]"
                    : "text-gray-800 hover:text-secondary"
                }`}
              >
                Products
                {pathname === "/products" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link>
              <Link
                href="/about"
                className={`font-medium cursor-pointer transition-colors relative ${
                  pathname === "/about"
                    ? "text-[#B90647]"
                    : "text-gray-800 hover:text-secondary"
                }`}
              >
                About Us
                {pathname === "/about" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link>
              <Link
                href="/contact"
                className={`font-medium cursor-pointer transition-colors relative ${
                  pathname === "/contact"
                    ? "text-[#B90647]"
                    : "text-gray-800 hover:text-secondary"
                }`}
              >
                Contact Us
                {pathname === "/contact" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link>
            </div>
          )}

          {/* Mobile Additional Navigation Links */}
          {!isSearchFocused && (
            <div className="md:hidden flex items-center space-x-6">
              <Link
                href="/brands"
                className={`font-medium cursor-pointer transition-colors relative text-sm ${
                  pathname === "/brands"
                    ? "text-[#B90647]"
                    : "text-gray-800 hover:text-secondary"
                }`}
              >
                Brands
                {pathname === "/brands" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link>
              <Link
                href="/blogs"
                className={`font-medium cursor-pointer transition-colors relative text-sm ${
                  pathname === "/blogs"
                    ? "text-[#B90647]"
                    : "text-gray-800 hover:text-secondary"
                }`}
              >
                Blogs
                {pathname === "/blogs" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link>
              <Link
                href="/products"
                className={`font-medium cursor-pointer transition-colors relative text-sm ${
                  pathname === "/products"
                    ? "text-[#B90647]"
                    : "text-gray-800 hover:text-secondary"
                }`}
              >
                Products
                {pathname === "/products" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link>
              <Link
                href="/about"
                className={`font-medium cursor-pointer transition-colors relative text-sm ${
                  pathname === "/about"
                    ? "text-[#B90647]"
                    : "text-gray-800 hover:text-secondary"
                }`}
              >
                About
                {pathname === "/about" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link>
              <Link
                href="/contact"
                className={`font-medium cursor-pointer transition-colors relative text-sm ${
                  pathname === "/contact"
                    ? "text-[#B90647]"
                    : "text-gray-800 hover:text-secondary"
                }`}
              >
                Contact
                {pathname === "/contact" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B90647]"></div>
                )}
              </Link>
            </div>
          )}

          {/* Center - Search Bar with Hamburger Menu */}
          <div className="flex items-center space-x-2 md:space-x-4 max-w-2xl">
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
                    <IoSearchOutline className="text-gray-600" size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 md:space-x-4 w-full">
                  <div className="w-8 md:w-12 md:px-4 flex items-center">
                    <VscMenu
                      className="text-black hover:cursor-pointer font-light"
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
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div
              ref={iconRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <PiUserCircleThin
                className="text-black hover:cursor-pointer"
                size={26}
              />
            </div>

            <div
              ref={popoverRef}
              onMouseEnter={() => setUserPopoverOpen(true)}
              onMouseLeave={() => setUserPopoverOpen(false)}
            >
              <UserPopover
                isOpen={isUserPopoverOpen}
                userInfos={userInfo}
                onClose={() => setUserPopoverOpen(false)}
              />
            </div>

            <div className="relative pr-2 md:pr-4">
              <CiShoppingCart
                className="text-black hover:cursor-pointer"
                size={26}
                onClick={onClickCart}
              />
              {Number(cartCountV) > 0 &&
              (cartCountV !== "0" ||
                cartCount !== null ||
                cartCount !== undefined) &&
              token ? (
                <div className="absolute top-[-8px] right-[-8px] md:top-[-10px] md:right-[-10px] bg-[#439787] text-white rounded-full w-[16px] h-[16px] md:w-[20px] md:h-[20px] flex items-center justify-center text-[8px] md:text-[10px] font-bold">
                  {cartCountV ? cartCountV : cartCount ? cartCount : ""}
                </div>
              ) : null}
            </div>

            {!token && (
              <>
                <Link href="/plans">
                  <Image
                    alt="vendor"
                    className="text-black md:hidden mobile-sm:ml-2 hover:cursor-pointer"
                    src="/images/home/vendor.webp"
                    width={24}
                    height={14}
                    onError={(e) => {
                      e.currentTarget.src = "/images/product-placeholder.webp";
                    }}
                    loading="lazy"
                  />
                </Link>
                <CustomButton
                  title={`${
                    showVendorLogin ? "Vendor Login" : "Become a Vendor"
                  }`}
                  className="text-base bg-secondary px-3 lg:text-sm hover:bg-primary h-12 mr-3 mobile-hide hidden md:flex text-white p-[30px]"
                  customStyles={{}}
                  rightIcon={<GoArrowRight />}
                  hoverBgColor=""
                  onPress={() => onClickVendor()}
                />
              </>
            )}
          </div>
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
  );
};

export default Header;
