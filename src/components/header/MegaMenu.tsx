"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiChevronDown, FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import styles from "./Header.module.css";
import useApi from "../Fetcher/useAPI";
import * as getEndpoint from "../../network/EndPoints";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import store from "@/reduxStore";

import {
  saveCategories,
  saveCatTime,
} from "@/reduxStore/slices/masterDataSlice";
import { useRouter } from "next/navigation";
import ViewMore from "../product/quote/ViewMore";
import { useBreakpoint } from "../hooks/useBreakpoint";

interface MenuItem {
  title: string;
  link: string;
  subItems?: { title: string; link: string }[];
  megaMenuItems?: { category: string; items: string[] }[];
}

interface MegaMenuProps {
  isOpen: boolean;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
  const [openedCategoryId, setOpenedCategoryId] = useState<string | null>(null);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { callApi } = useApi();
  const categoriesRedux = store.getState().masterData.categories;
  const catTimeRedux = store.getState().masterData.catetime;
  const dispatch = useDispatch();

  const currentTime = Date.now(); // Get the current time in milliseconds
  const catTime = new Date(catTimeRedux).getTime(); // Convert catTimeRedux to a timestamp
  const router = useRouter();

  const timeDifference = currentTime - catTime;
  const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);
  const breakpoint = useBreakpoint();
  const threshold = breakpoint === "tablet" ? 9 : 9;

  useEffect(() => {
    getCategories();
    getMenuCategories();
  }, []);

  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Categories Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message || "Request Failed");
    }
  };

  const getCategories = async () => {
    try {
      const result = (await callApi(
        getEndpoint.default.PRODUCTS_CATEGORIES,
        "GET"
      )) as any;
      if (result.data == null) {
        handleApiError(result.errorData);
      } else {
        const cuurentTime = new Date();

        const catResult = result && result?.data;
        console.log("catresult", catResult);
        setMainCategories(catResult);
        catResult &&
          catResult.forEach((element: any) => {
            if (element && element?.name == "Building Materials") {
              setCategoriesData(element?.subCategories || []);
            }
          });

        dispatch(saveCategories(result?.data[0]?.subCategories || []));
        dispatch(saveCatTime(cuurentTime));
      }
    } catch (error) {
      handleApiError(error);
    }
  };
  const handleMouseEnter = (categoryId: string) => {
    setHoveredCategoryId(categoryId);
  };
  
  const handleMouseLeave = () => {
    setHoveredCategoryId(null);
  };
  
 
  
  const getMenuCategories = async () => {
    try {
      const result = (await callApi(
        getEndpoint.default.MENU_CATEGORIES,
        "GET"
      )) as any;
      if (result.data == null) {
        handleApiError(result.errorData);
      } else {
        const cuurentTime = new Date();

        const catResult = result && result?.data;
        console.log("check mega menu result", catResult);
        setSubCategories(catResult);
        // setMainCategories(catResult);
        // catResult &&
        //   catResult.forEach((element: any) => {
        //     if (element && element?.name == "Building Materials") {
        //       setCategoriesData(element?.subCategories || []);
        //     }
        //   });

        // dispatch(saveCategories(result?.data[0]?.subCategories || []));
        // dispatch(saveCatTime(cuurentTime));
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  console.log("categoriesData", subCategories);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category: any) => {
    setOpenedCategoryId((prev) => (prev === category._id ? null : category._id));
    setSelectedCategory(category);
  };
  
  const handleClick = (menuItem?: any) => {
    // if (menuItem._id.includes(window.location.href)) {
    // toggleSidebar();
    // window.location.reload();  // Reload the page manually
    // }/
  };
  return (
    <div className="relative w-full">
      <nav
        className={`w-full mega-menu-header h-full md:h-12 md:flex ${
          isOpen ? "block fixed w-full h-full pt-5" : "hidden"
        } md:block`}
      >
        <li className={`${styles.parentMenuItem} relative flex h-full`}>
          <Link
            href="#"
            className={`block float-start font-semibold text-md py-2 pl-4 text-white flex items-center ${styles.parentMenuItemText} cursor-pointer`}
            onClick={toggleSidebar}
          >
            <FiMenu className="mr-2" />
            All
          </Link>
        </li>
        <ul className="w-full flex flex-col md:flex-row justify-center items-center pr-4 font-poppins">
          {/* All button with hamburger icon, styled like other menu items */}

          {subCategories
            .slice(0, threshold)
            .map((menuItem: any, index: any) => {
              return (
                <li
                  key={index}
                  className={`${styles.hasSubmenu} ${
                    styles.parentMenuItem
                  } relative flex justify-center align-middle items-center ${
                    isOpen ? "w-full" : " flex h-full"
                  }`}
                >
                  {/* <a
                    href={`/products?scid=${menuItem?._id}`}
                    onClick={handleClick}
                  >
                    <a
                      className={`block font-semibold text-md py-2 px-3 text-white flex items-center ${styles.parentMenuItemText}`}
                    >
                      {menuItem?.name}
                      <FiChevronDown className="ml-2" />
                    </a>
                  </a> */}
                  <Link
                  href={`/products?scid=${menuItem?._id}`}
                  className={`block font-semibold text-md py-2 px-3 text-white flex items-center ${styles.parentMenuItemText}`}
                  onClick={handleClick}
                >
                  {menuItem?.name}
                  <FiChevronDown className="ml-2" />
                </Link>

                  {menuItem?.childCategories && (
                    <ul className={`${styles.submenuDiv} absolute`}>
                      {menuItem?.childCategories.map(
                        (subItem: any, subIndex: any) => {
                          return (
                            <li
                              key={subIndex}
                              className={styles.secondlevelchild}
                            >
                              {/* <a
                                href={`/products?ccid=${subItem?._id}`}
                                replace={true}
                                onClick={handleClick}
                              >
                                <a className="block text-black text-sm my-1 px-2 py-1">
                                  {subItem?.name}
                                </a>
                              </a> */}
                               <Link
                              href={`/products?ccid=${subItem?._id}`}
                              replace={true}
                              className="block text-black text-sm my-1 px-2 py-1"
                              onClick={handleClick}
                            >
                              {subItem?.name}
                            </Link>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}
                </li>
              );
            })}

          {subCategories && subCategories.length > threshold && (
            <li
              key={8}
              className={`${styles.hasSubmenu} ${
                styles.parentMenuItem
              } relative ${isOpen ? "w-full" : " flex h-full"}`}
            >
              {/* <a href="#">
                <a
                  className={`block font-semibold text-md py-2 px-4 text-white flex h-full items-center ${styles.parentMenuItemText}`}
                >
                  More
                  <FiChevronDown className="ml-2" />
                </a>
              </a> */}
               <Link
                href="#"
                className={`block font-semibold text-md py-2 px-4 text-white flex h-full items-center ${styles.parentMenuItemText}`}
              >
                More
                <FiChevronDown className="ml-2" />
              </Link>
              <div
                className={`${
                  styles.submenuDiv
                } absolute bg-white shadow-md px-xl py-lg grid grid-cols-${
                  subCategories.slice(threshold).length > 4
                    ? "4"
                    : subCategories.slice(threshold).length
                } w-max`}
                style={{ left: "auto", right: "0px" }}
              >
                {subCategories
                  .slice(threshold)
                  .map((menuItem: any, index: any) => {
                    return (
                      <div key={index} className="w-fit mr-3 h-auto mb-3">
                        {/* <h4
                          className="font-medium text-base text-primary mb-1.5 cursor-pointer"
                          onClick={() =>
                            router.push(`/products?scid=${menuItem?._id}`)
                          }
                        >
                          <ViewMore text={menuItem?.name} length={30} />
                        </h4> */}
                        <Link
                        href={`/products?scid=${menuItem?._id}`}
                        className="font-medium text-base text-primary mb-1.5 cursor-pointer"
                      >
                        <ViewMore text={menuItem?.name} length={30} />
                      </Link>

                        {menuItem?.childCategories.map(
                          (item: any, itemIndex: any) => (
                            // <a
                            //   key={itemIndex}
                            //   href={`/products?ccid=${item?._id}`}
                            //   onClick={handleClick}
                            // >
                            //   <a className="block text-black text-sm my-1">
                            //     <ViewMore text={item?.name} length={30} />
                            //   </a>
                            // </a>
                            <Link
                            key={itemIndex}
                            href={`/products?ccid=${item?._id}`}
                            className="block text-black text-sm my-1"
                            onClick={handleClick}
                          >
                            <ViewMore text={item?.name} length={30} />
                          </Link>
                          )
                        )}
                      </div>
                    );
                  })}
              </div>
            </li>
          )}
        </ul>
      </nav>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white z-[150] transition-all duration-300 overflow-y-auto shadow-xl ${
          sidebarOpen ? "w-80 translate-x-0" : "w-0 -translate-x-full"
        }`}
        style={{ maxWidth: "100vw" }}
      >
        <div className="flex items-center justify-between bg-gray-800 text-white p-4 ml-4">
          <div
            className={
              "w-full md:mr-0 mr-5 w-40 h-8 md:w-48 mt-4 md:h-12 hover:cursor-pointer"
            }
            onClick={() => router.push("/")}
            style={{}}
          >
            <img
              src="/images/Logo-2.webp"
              className="md:h-[45px] "
              alt="Hubeco Logo"
            />
          </div>
          <button onClick={toggleSidebar} className="text-black">
            <FiX size={24} />
          </button>
        </div>

        <div className={`p-4 ml-4 ${selectedCategory ? "hidden" : "block"}`}>
  {mainCategories.map(
    (category: any, index: number) =>
      category.subCategories &&
      category.subCategories.length > 0 && (
        <div key={index}>
          <h3 className="text-xl text-black font-semibold mb-2">
            {category?.name}
          </h3>
          <ul>
  {category.subCategories.map((subCat: any, subIndex: number) => (
    <li
      key={subIndex}
      className="py-2 relative"
      onMouseEnter={() => handleMouseEnter(subCat._id)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between cursor-pointer">
        <Link
          href={`/products?scid=${subCat?._id}`}
          onClick={() => {
            handleClick();
            toggleSidebar();
          }}
        >
          <span className="text-black hover:text-primary">
            {subCat?.name}
          </span>
        </Link>
        {subCat?.childCategories?.length > 0 && (
          <FiChevronRight
            size={18}
            onClick={(e) => {
              e.stopPropagation();
              handleCategoryClick(subCat);
            }}
            className="ml-2"
          />
        )}
      </div>

      {/* Inline child categories (no absolute, responsive) */}
      {(hoveredCategoryId === subCat._id ||
  openedCategoryId === subCat._id) &&
  subCat?.childCategories?.length > 0 && (
    <div className="mt-2 pl-4">
      {subCat.childCategories.map((child: any, idx: number) => (
        <li key={idx} className="py-1 list-none">
          <Link
            href={`/products?ccid=${child._id}`}
            onClick={() => {
              handleClick();
              toggleSidebar();
            }}
            className="text-sm text-gray-700 hover:text-primary cursor-pointer"
          >
            {child.name}
          </Link>
        </li>
      ))}
    </div>
)}

    </li>
  ))}
</ul>

        </div>
      )
  )}
</div>


        {selectedCategory && (
          <div className="p-4">
            <div className="flex items-center mb-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center text-secondary"
              >
                <FiChevronDown className="transform rotate-90 mr-2" />
                Main Menu
              </button>
            </div>

            <h2 className="text-xl font-bold text-black mb-2 ml-4">
              {selectedCategory?.name}
            </h2>
            <ul>
              {selectedCategory?.childCategories?.map(
                (subItem: any, subIndex: number) => (
                  <li key={subIndex} className="py-2">
                    {/* <Link
                      href={`/products?ccid=${subItem?._id}`}
                      onClick={handleClick}
                      onClick={toggleSidebar}
                      className="text-black hover:text-primary ml-4"
                    >
                      {subItem?.name}
                    </Link> */}
                    <Link
                      href={`/products?ccid=${subItem?._id}`}
                      onClick={() => {
                        handleClick();
                        toggleSidebar();
                      }}
                      className="text-black hover:text-primary ml-4"
                    >
                      {subItem?.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;
