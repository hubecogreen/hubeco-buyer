import React, { useEffect, useRef } from "react";
import styles from "./UserPopover.module.css";
import { FaRegUser } from "react-icons/fa";
import { TbCubePlus } from "react-icons/tb";
import { CgShoppingBag } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import Image from "next/image";

import CustomButton from "../customButton/CustomButton";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { toast } from 'react-hot-toast';
import { saveToken, saveRefreshToken, setUser } from '@/reduxStore/slices/userSlice';
import { useDispatch } from "react-redux";
import useApi from "../Fetcher/useAPI";
import { BsCardChecklist } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { GrTicket } from "react-icons/gr";
import Link from "next/link";
import useClient from "../hooks/useClient";

interface UserPopoverProps {
  isOpen: boolean;
  userInfos: any;
  onClose: () => void;
}

const UserPopover: React.FC<UserPopoverProps> = ({
  isOpen,
  userInfos,
  onClose,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const token = getCookie('token');
  const userInfo = JSON.parse(userInfos);
  const buyerUserInfo = sessionStorage.getItem('buyerUserInfo') as any;
  const buyerInfo = JSON.parse(buyerUserInfo);
  const router = useRouter();
  const dispatch = useDispatch();
  const {callApi}=useApi()
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL

  const isClient = useClient()

  // Fixed: Use 'click' event instead of 'mousedown' to allow menu items to be clicked first
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      // Use 'click' instead of 'mousedown' - click fires AFTER mousedown and mouseup
      // This allows the menu item click to complete before closing
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle navigation
  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  const Logout = async () => {
    const res = (await callApi('auth/logout', 'POST')) as any;
    if (res.error == '') {
      dispatch(saveToken(''));
      dispatch(saveRefreshToken(''));
      dispatch(setUser(''));
      deleteCookie('token');
      deleteCookie('refreshToken');
      deleteCookie('otpToken');
      deleteCookie('userRegistered');
      deleteCookie('addressAdded');
      deleteCookie('encryptedMobile')
      deleteCookie('selectedbuyertype')
      deleteCookie('notLoggedIn')
      sessionStorage.removeItem('buyerUserInfo');
      sessionStorage.clear();

      toast.success('Logged out successfully', { iconTheme: {
        primary: '#439787',
        secondary: '#FFFAEE',
      }});
      router.push('/login');
    } else {
      dispatch(saveToken(''));
      dispatch(saveRefreshToken(''));
      dispatch(setUser(''));
      deleteCookie('token');
      deleteCookie('refreshToken');
      deleteCookie('otpToken');
      deleteCookie('userRegistered');
      deleteCookie('addressAdded');
      deleteCookie('tandcCheck')
      deleteCookie('privacyPolicyCheck')
      deleteCookie('selectedbuyertype')
      sessionStorage.removeItem('buyerUserInfo');
      sessionStorage.clear();

      toast.success('Logged out successfully', { iconTheme: {
        primary: '#439787',
        secondary: '#FFFAEE',
      }});
      router.push('/login');
    }
    onClose();
  };

  if(!isClient)
    return <></>


  return (
    <div ref={popoverRef} className={`${styles.popover} ${token?'md:right-[170px] mobile-sm:right-[10px] ':'md:right-[150px] mobile-sm:right-[10px]'} `}>
      <div className={`${styles.popoverContent} bg-cream`}>
        {token ? (
          <>
          {buyerInfo?.firstName + buyerInfo?.lastName ?
          <>
            <div className={styles.userInfo}>
            <Image
              alt="profile"
              src={buyerInfo?.displayImage ? `${assetURL}/${buyerInfo?.displayImage}` : '/images/user.webp'}
              width={40}
              height={40}
              onError={e => {
                e.currentTarget.src = '/images/user.webp';
              }}
              loading="lazy"
              className="rounded-full w-[40px] h-[40px]"
            />

              

              <div className="ml-3 ">
                <p className={styles.userName}>{(userInfo?.firstName + userInfo?.lastName).length>20?(userInfo?.firstName + userInfo?.lastName).substring(0,20):userInfo?.firstName + userInfo?.lastName}</p>
                <p className={styles.userEmail}>{userInfo?.email}</p>
              </div>
            </div>
            <div className={styles.separator}></div></>
            : null}
            <ul className={styles.menu}>
              <li 
                className="flex items-center justify-start cursor-pointer" 
                onClick={() => handleNavigation('/profile?tab=profile')}
              >
                <FaRegUser color="#3d3529" />
                <span className="ml-2 text-brown">My Profile</span>
              </li>
              <li 
                className="flex items-center justify-start cursor-pointer" 
                onClick={() => handleNavigation('/orders')}
              >
                <CgShoppingBag color="#3d3529" />
                <span className="ml-2 text-brown">Orders</span>
              </li>
              <li 
                className="flex items-center justify-start cursor-pointer" 
                onClick={() => handleNavigation('/quote-request')}
              >
                <FiFileText color="#3d3529" />
                <span className="ml-2 text-brown">Quote Requests</span>
              </li>
              <li 
                className="flex items-center justify-start cursor-pointer" 
                onClick={() => handleNavigation('/subscriptions')}
              >
                <BsCardChecklist color="#3d3529" />
                <span className="ml-2 text-brown">Subscriptions</span>
              </li>
              <li 
                className="flex items-center justify-start cursor-pointer" 
                onClick={() => handleNavigation('/wishlist')}
              >
                <TbCubePlus color="#3d3529" />
                <span className="ml-2 text-brown">Wishlist</span>
              </li>
              <li 
                className="flex items-center justify-start cursor-pointer" 
                onClick={() => handleNavigation('/tickets')}
              >
                <GrTicket color="#3d3529" />
                <span className="ml-2 text-brown">Tickets Raised</span>
              </li>
              <li onClick={Logout} className="flex items-center justify-start cursor-pointer">

                <AiOutlineLogout color="#3d3529" />
                <span className="ml-2 text-brown">
                  Logout
                </span>
              </li>
            </ul>
          </>
        ) : (
          <div className="flex justify-center max-w-11/12 mx-auto items-center w-full">
            <div className="w-full">
              <CustomButton
                title={"Login"}
                className="text-base mx-auto w-11/12 h-12 mt-2 bg-secondary lg:text-sm hover:bg-primary  mobile-hide md:flex text-white hover:bg-hoverBg"
                customStyles={{}}
                hoverBgColor=""
                onPress={() => router.push("/login")}
              />
              <div className="flex mx-auto w-11/12 justify-between mt-4 items-center">
                <p className="text-brown text-semibold text-sm">New Customer?</p>
                <Link href='/login' className="text-secondary hover:cursor-pointer text-bold text-sm">Sign Up</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPopover;