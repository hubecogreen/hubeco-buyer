"use client";
// components/sidebar/Sidebar.tsx
import { stat } from "fs";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import ViewMore from "./product/quote/ViewMore";
import Link from "next/link";
import Image from "next/image";
interface SidebarProps {
  activeSection: string;
  handleSectionClick: (section: string) => void;
  setStatus?: (status: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, handleSectionClick ,setStatus}:any) => {
  const [isOrdersExpanded, setOrdersExpanded] = useState(false);
  const [currentStaus,setCurrentStatus] = useState('all');
  const buyerInfo = sessionStorage.getItem("buyerUserInfo") as any;
  const userInfo = JSON.parse(buyerInfo);

  const statusTree = [
    { id: "all", label: "All" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
    { id: "cancelled", label: "Cancelled" },
    { id: "returned", label: "Returned" },
  ];
  

  // Function to toggle the orders section
  const toggleOrdersSection = () => {
    setOrdersExpanded((prev) => !prev);
    // console.log("orderSelected")
    handleSectionClick("orders");
  };

  useEffect(() => {
    if(activeSection=='orders')
    {
      setOrdersExpanded(true)
      
    }
   }, [activeSection]);

   const onClickStatus=(item:any)=>{
    setStatus(item?.label?.toLowerCase())
    setCurrentStatus(item?.label?.toLowerCase())
   }

  return (
    <aside className="w-full  lg:w-1/5 bg-cream  p-4 md:p-6 border border-primary rounded-lg shadow-sm h-fit">
      <h2 className="text-lg md:text-lg font-semibold text-[#31466B] mb-4 md:mb-6 flex">
        Hi, <span className="text-[#00A18A]"><ViewMore text={userInfo?.firstName+" "+userInfo?.lastName} length={35} className=""  /> </span>
      </h2>
      <ul className="space-y-2 md:space-y-4">
        {/* My Orders Section */}
        <li>
          <div
            className="flex items-center cursor-pointer justify-between"
            onClick={toggleOrdersSection}
          >
            <div className="flex items-center">
              <span className="mr-2 md:mr-3">
                <Image
                  src={
                    isOrdersExpanded
                      ? "/images/wishlist/ordersEdit.webp"
                      : "/images/wishlist/orders.webp"
                  }
                  alt="Orders"
                  width={20}
                  height={20}
                  onError={e => {
                    e.currentTarget.src = '/images/failedToLoadImage.webp'
                  }}
                  loading="lazy"
                />
              </span>
              <Link
                href="/orders"
                className={
                  isOrdersExpanded
                    ? "text-[#B90647] font-semibold"
                    : "text-[#31466B] hover:text-[#00A18A] font-medium"
                }
              >
                My Orders
              </Link>
            </div>
            <IoIosArrowDown />
          </div>

          {/* Collapsible sub-items */}
          {isOrdersExpanded && (
            <ul className="ml-4 md:ml-8 mt-2 space-y-1 md:space-y-2">
              {statusTree.map(
                (item:any) => (
                  <li key={item?.id}>
                    <Link
                      href="#"
                      className={`${
                        currentStaus === item?.label?.toLowerCase()
                          ? "text-[#B90647]"
                          : "text-[#31466B]"
                      } hover:text-[#00A18A]`}
                      onClick={() => {onClickStatus(item)}}
                    >
                      <div className="flex items-center">
                        <IoIosArrowForward />
                        {item?.label}
                      </div>
                    </Link>
                  </li>
                )
              )}
            </ul>
          )}
        </li>

        {/* Wishlist Section */}
        <li
          className="flex items-center cursor-pointer"
          onClick={() => handleSectionClick("saved")}
        >
          <span className="mr-2 md:mr-3">
            <Image
              src={
                activeSection === "saved"
                  ? "/images/wishlist/saved.webp"
                  : "/images/wishlist/savededit2.webp"
              }
              alt="Wishlist"
            //   width={20}
              width={
                activeSection === "saved"
                  ? 20
                  : 15}
              height={20}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp'
              }}
              loading="lazy"
            />
          </span>
          <Link
            href="/wishlist"
            className={`${
              activeSection === "saved"
                ? "text-[#B90647] font-semibold"
                : "text-[#31466B] hover:text-[#00A18A] font-medium"
            }`}
          >
            Wishlist
          </Link>
        </li>

        {/* Quote Requests Section */}
        <li
          className="flex items-center cursor-pointer"
          onClick={() => handleSectionClick("quote")}
        >
          <span className="mr-2 md:mr-3">
            <Image
              src={
                activeSection === "quote"
                  ? "/images/wishlist/quoteEdit.webp"
                  : "/images/wishlist/quote.webp"
              }
              alt="Quote Requests"
              width={20}
              height={20}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp'
              }}
              loading="lazy"
            />
          </span>
          <Link
            href="/quote-request"
            className={`${
              activeSection === "quote"
                ? "text-[#B90647] font-semibold"
                : "text-[#31466B] hover:text-[#00A18A] font-medium"
            }`}
          >
            Quote Requests
          </Link>
        </li>

      
      </ul>
    </aside>
  );
};

export default Sidebar;
