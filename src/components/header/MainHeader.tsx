"use client";
import React, { useEffect, useState, useRef } from "react";
// import Link from "next/link";
import styles from "./Header.module.css";
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
import PincodePopup from "../checkLocationPopup/CheckDelivery"; // Import the PincodePopup component
import SidebarMenu from "./SidebarMenu"; // Import the SidebarMenu component
import UserPopover from "./userPopover"; // Import UserPopover component
import { usePathname, useRouter } from "next/navigation";
import { PiUserCircleThin, PiUserFocusThin } from "react-icons/pi";
import { VscMenu } from "react-icons/vsc";
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
  const cartCountRedux = store.getState().user.cartCount;
  const cartCountV=getCookie('CartCount');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isUserPopoverOpen, setUserPopoverOpen] = useState(false);
  const [cartCount, setCartCount] = useState<any>(cartCountV); // Example cart count
  const router = useRouter();
  const [refresh, setRefresh] = useState<number>(0);
  const token=getCookie('token');
  const dispatch=useDispatch();
  const userInfo = typeof window !== 'undefined' ? sessionStorage.getItem('buyerUserInfo') as any : null;
  const addInfo = userInfo ? JSON.parse(userInfo)?.addresses : null;
  const iconRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [selectedAdd, setSelectedAdd] = useState<any>([]);
  const [tempCity, setTempCity] = useState<any>(getCookie("culcity"));
  const [tempState, setTempState] = useState<any>(getCookie("culs"));
  const [tempPincode, setTempPincode] = useState<any>(getCookie("culp"));
  const [showVendorLogin, setShowVendorLogin] = useState<any>(false);
  const [reloadH, setReloadH] = useState<any>(0);
  const isClient = useClient()
  
  const pathname = usePathname();
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";
  const domainUrl = process.env.NEXT_PUBLIC_DEV_URL;


  useEffect(() => {
    if (fullUrl.includes(`${domainUrl}/plans`)) {
      setShowVendorLogin(true);
    } else {
      setShowVendorLogin(false);
    }
  }, [fullUrl]);

  const { refreshTokens } = useRefreshToken();
  const { callApi } = useApi();



  const getDefaultLoc = () => {
    if (addInfo && addInfo.length > 0) {
      addInfo.forEach((addy: any) => {
        if (addy.isDefault == true) {
          setTempCity(addy?.city);
          setTempPincode(addy?.postCode);
        }
      });
    }else{
      getCurrentLocation()
    }
  };



  useEffect(() => {
    router.refresh();
    setCartCount(cartCountV)
  }, [cartCountV]);

  useEffect(() => {
    if (token) {
      getDefaultLoc();
    } else {
      getCurrentLocation();
    }
  }, [reloadH == 1]);


  useEffect(()=>{
    if (typeof window !== 'undefined'){
      const handleSelectedAddress = (event: any) => {
        const address = event.detail;
        setTempCity(address?.city);
        setTempState(address?.state);
        setTempPincode(address?.postCode);
      };

      window.addEventListener('selectedAddress', handleSelectedAddress);

      return ()=>{
        if (typeof window !== 'undefined'){
          window.removeEventListener('selectedAddress', handleSelectedAddress);
        }
      }
    }
  },[])

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          setLoading(false);
          // // consoleerror("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Reverse Geocode Function using Google Maps API
  const reverseGeocode = async (latitude: any, longitude: any) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Add this to .env.local
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        fillAddressForm(addressComponents);
        // // console.log('CurrentUserLocation',addressComponents)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // consoleerror("Error fetching address:", error);
    }
  };

  const fillAddressForm = (addressComponents: any) => {
    const getAddressComponent = (type: any) =>
      addressComponents.find((component: any) => component.types.includes(type))
        ?.long_name || "";

    setCookie("culcity", getAddressComponent("locality"));
    setCookie("culs", getAddressComponent("administrative_area_level_1"));
    setCookie("culc", getAddressComponent("country"));
    setCookie("culp", getAddressComponent("postal_code"));
    setCookie("cula1", getAddressComponent("sublocality_level_2"));
    setCookie("cula2", getAddressComponent("sublocality_level_1"));
    setTempCity(getAddressComponent("locality"));
    setTempPincode(getAddressComponent("postal_code"));
  };

  const toggleMenu = () => {
    if (typeof document !== 'undefined') {
      const body = document.querySelector("body") as any;
      setMenuOpen(!isMenuOpen);
      if (!isMenuOpen) {
        body.style.overflow = "hidden"; // Disable scrolling
      } else {
        body.style.overflow = "auto"; // Enable scrolling
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

  const headerRef = useRef<HTMLElement | any>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const header = headerRef.current;
      let lastScrollY = window.pageYOffset;

      const handleScroll = () => {
        const currentScrollY = window.pageYOffset;

        if (currentScrollY > 100) {
          if (currentScrollY > lastScrollY) {
            // Scrolling down, hide the header
            header?.classList.add("hide-nav");
          } else {
            // Scrolling up, show the header
            header?.classList.remove("hide-nav");
          }
        } else {
          // Scroll position is less than 100, show the header
          header?.classList.remove("hide-nav");
        }

        lastScrollY = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Remove complex event listeners - using simple React events only

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
      // toast.error("Invalid Request");
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
      // toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      // toast.error("Invalid Request");
      setCartData([]);
      dispatch(saveCart([]));
      dispatch(saveCartCount([]));
      setCookie("CartCount", "");
    } else if (result?.status === 401) {
      await refreshTokens();
      getCart();
      // toast.error("Invalid Request");
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
      if (typeof window !== 'undefined') {
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
  }


  if(!isClient)
    return <></>

  return (
    <header
      ref={headerRef}
      className={`  fixed top-0 left-0 right-0 z-50 transition-transform duration-100 ${styles.sticky}`}
    >
      <div
        className={`w-full mobile-sm:w-[100%]  justify-center items-center bg-lightBgColor h-32 md:h-20 px-md py-xs ${styles.stickyHeader}`}
      >
        <div className="flex justify-between  py-md">
          <div className="md:w-12 w-8 md:px-4  md:hidden flex items-center">
            <VscMenu
              className="text-black  hover:cursor-pointer font-light"
              size={26}
              onClick={toggleMenu}
            />
          </div>
          <div
            className={`${styles.logo} w-full md:ml-4 ml-2 md:mr-0 mr-5 w-40 h-8 md:w-48 md:h-12 hover:cursor-pointer`}
            onClick={() => router.push("/")}
          >
            <Image
              src="/images/Logo-2.webp"
              className="md:h-[45px] "
              alt="Hubeco Logo"
              width={180}
              height={45}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp'
              }}
              loading="lazy"
            />
          </div>
          <div
            className="check-delivery shadow-lg flex bg-white w-52 h-12 lg:px-0 xl:px-2   2xl-px-1 2xl-px-2 p-sm hidden md:flex rounded cursor-pointer"
            onClick={togglePopup}
            style={{
              width: "14%", // This remains inline as there's no Tailwind equivalent for percentage-based width in default classes
            }}
          >

            <div className="w-8 h-6">
              <CiLocationOn size={28} className="text-secondary" />
            </div>
          {(tempCity && tempPincode) ? 
           <div>
              <p className="text-gray lg:text-[10px] text-[10px]">Delivery to</p>
              {/* <p className="text-black text-xs">{setAddress?.city} {setAddress?.postCode}</p> */}
              {tempCity && tempPincode && (
                <p className="text-black lg:text-[10px] text-[10px]">
                  {tempCity}, {tempPincode}
                </p>
              )}
            </div>
             : <p className="text-gray lg:text-[10px] text-[10px] lg:px-5 px-3">Click here to add shipping address</p>}
          </div>
          <div className="flex px-sm h-12 mobile-hide hidden md:block w-[47%]">

            <SearchBar placeholder={"Search for Products, Brands and more"} />
          </div>
          <div
            ref={iconRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${styles.icons} ${ token ? "w-max md:flex block md:mr-10 md:justify-end justify-end relative mobile-sm:left-[25px] md:left-[75px] items-center" : "md:w-[6%] w-max md:flex block md:justify-evenly justify-between md:mr-4 relative items-center"}  `}
            // style={{}}
          >
          <PiUserCircleThin className="text-black hover:cursor-pointer" size={30} />
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
          <div className={`${token ? 'md:right-[0px]' : 'md:right-[35px]'} relative md:top-[11px] z-[99999]`}>
              <CiShoppingCart
                className="text-black hover:cursor-pointer md:ml-4"
                size={30}
                onClick={onClickCart}
              />

              {Number(cartCountV) > 0 && (cartCountV !== '0' || cartCount !== null || cartCount !== undefined) && token ? (
                <div
                  className="absolute top-[-10px] right-[-10px] bg-[#439787] text-white rounded-full w-[20px] h-[20px] flex items-center justify-center text-[10px] font-bold"
                >
                  {cartCountV ? cartCountV : cartCount ? cartCount : ''}
                </div>
              ) : null}
            </div>

          {/* <PiUserRectangleThin
              className="text-black md:hidden hover:cursor-pointer"
              size={28}
            /> */}
         

          {/* <RiShieldUserLine
              className="text-black md:hidden hover:cursor-pointer"
              size={30}
            /> */}
          {token ? (
            <></>
          ) : (
            <>
             {/* <PiUserFocusThin */}
             <Image
             alt="vendor"
             className="text-black md:hidden mobile-sm:ml-2  hover:cursor-pointer"
             src="/images/home/vendor.webp" 
             width={28} height={16}
             onError={e => {
              e.currentTarget.src = '/images/product-placeholder.webp'
            }}
            loading="lazy"
             onClick={() => router.push('/plans')}
             />
             {/* { <BsShop 
            className="text-black md:hidden mobile-sm:ml-2  hover:cursor-pointer"
            size={25}
            onClick={() => router.push('/plans')}
          /> } */}
          <CustomButton
              title={`${showVendorLogin ? "Vendor Login" : "Become a Vendor"}`}
              className="text-base bg-secondary px-3 lg:text-sm hover:bg-primary h-12 mr-3 mobile-hide hidden md:flex text-white"
              customStyles={{}}
              rightIcon={<GoArrowRight />}
              hoverBgColor=""
              onPress={() => onClickVendor()}
            />
            </>
            
          )}

          <div className="md:w-12 w-8 md:ml-2  md:flex items-center hidden">
            {/* <RxHamburgerMenu
              className="text-black hover:cursor-pointer"
              size={26}
              onClick={toggleMenu}
            /> */}
            <VscMenu
              className="text-black  hover:cursor-pointer font-light"
              size={26}
              onClick={toggleMenu}
            />
          </div>
        </div>
        <div className="flex h-10 mt-2 mobile-hide block md:hidden w-full">

          <SearchBar
            customStyles={{ fontSize: "14px" }}
            placeholder={"Search for Products, Brands and more"}
          />
        </div>
      </div>

      <div
        className="w-full flex justify-center items-center h-12 px-md md:flex hidden z-[99] bg-[#087a74]"
      >

        <MegaMenu isOpen={false} />
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
