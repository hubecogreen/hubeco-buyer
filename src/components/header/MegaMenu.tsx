"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FiChevronDown, FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import styles from "./Header.module.css";
import useApi from "../Fetcher/useAPI";
import * as getEndpoint from "../../network/EndPoints";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import store from "@/reduxStore";
import { ArrowBigRight, ChevronRight, Search } from "lucide-react";

import {
  saveCategories,
  saveCatTime,
} from "@/reduxStore/slices/masterDataSlice";
import { useRouter } from "next/navigation";
import ViewMore from "../product/quote/ViewMore";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { GoArrowRight } from "react-icons/go";

interface MenuItem {
  title: string;
  link: string;
  subItems?: { title: string; link: string }[];
  megaMenuItems?: { category: string; items: string[] }[];
}

interface Category {
  _id: string;
  name: string;
  subCategories?: Category[];
  childCategories?: Category[];
}

interface MegaMenuProps {
  isOpen: boolean;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );
  const [openedCategoryId, setOpenedCategoryId] = useState<string | null>(null);
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
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
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCategories();
    getMenuCategories();
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    if (!sidebarOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

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
    console.log("Clicked category:", category);
    console.log("Current openedCategoryId:", openedCategoryId);
    console.log("Category childCategories:", category.childCategories);

    if (category.childCategories?.length > 0) {
      setOpenedCategoryId((prev) => {
        const newId = prev === category._id ? null : category._id;
        console.log("Setting openedCategoryId from", prev, "to", newId);
        return newId;
      });
    }
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
        <ul className="w-full flex flex-col md:flex-row justify-center items-center pr-4 font-poppins">
          {/* All button with hamburger icon, styled like other menu items */}
          <li
            className={`${styles.hasSubmenu} ${styles.parentMenuItem} relative flex h-full mr-5`}
          >
            <button
              className={`block float-start font-semibold text-md py-2 pl-4 text-white flex items-center ${styles.parentMenuItemText} cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSidebar();
              }}
            >
              <FiMenu className="mr-2" />
              All
            </button>
            {sidebarOpen && (
              <div
                ref={sidebarRef}
                className="absolute left-0 top-[100%] w-[1200px] bg-white shadow-lg z-50 rounded-lg overflow-hidden "
              >
                <div className="flex h-[500px]">
                  {/* Left Side - Search and Categories */}
                  <div className="w-[400px] bg-gray-50 flex flex-col">
                    {/* Search Bar */}
                    <div className="p-6 bg-white">
                      <div className="relative bg-gray-50 ">
                        {/* <input
                          type="text"
                          placeholder="Looking for"
                          className="w-full bg-transparent border-none outline-none text-sm py-3 px-4 placeholder-gray-400"
                        />
                        <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <Search size={20} className="text-gray-400" />
                        </button> */}
                        <p className="font-bold text-xl pb-5">Categories</p>
                      </div>
                    </div>

                    {/* Categories List with Scrolling */}
                    <div
                      className="flex-1 px-6 pb-6 overflow-y-auto max-h-[350px]"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#c1c1c1 #f1f1f1",
                      }}
                    >
                      {mainCategories.map((category, index) => (
                       <div
                       key={category._id}
                       className={`flex items-center justify-between p-4 rounded-lg mb-2 transition-all duration-200
                         ${
                           selectedCategory?._id === category._id ||
                           (index === 0 && !selectedCategory)
                             ? "bg-teal-600 text-white shadow-sm"
                             : "bg-white hover:bg-gray-50 text-gray-700"
                         }
                         ${category.subCategories && category.subCategories.length > 0 ? "cursor-pointer" : "cursor-default"}
                       `}
                       onClick={
                         category.subCategories && category.subCategories.length > 0
                           ? () => handleCategoryClick(category)
                           : undefined
                       }
                     >
                       <span className="text-sm font-medium">
                         {category.name}
                       </span>
                       {category.subCategories && category.subCategories.length > 0 && (
                         <GoArrowRight
                           size={18}
                           className={`transition-colors duration-200 ${
                             selectedCategory?._id === category._id ||
                             (index === 0 && !selectedCategory)
                               ? "text-white"
                               : "text-gray-400"
                           }`}
                         />
                       )}
                     </div>                     
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Subcategories and Child Categories */}
                  <div className="flex-1 bg-white relative">
                    {/* Background image with left margin and custom height */}
                    <div
                      className="absolute right-0 bottom-0 w-[200px] h-[200px] bg-[url('/images/logo-banner.png')] bg-contain bg-no-repeat"
                      style={{
                        right: "30px", // Creates margin on the left side of the image
                        bottom: "20px",
                        backgroundSize: "190px 200px", // Increased height (250px wide × 200px tall)
                      }}
                    ></div>
                    {(selectedCategory || mainCategories.length > 0) && (
                      <>
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-gray-100">
                          <h1 className="text-2xl font-semibold text-gray-800">
                            {selectedCategory
                              ? selectedCategory.name
                              : mainCategories[0]?.name}
                          </h1>
                        </div>

                        {/* Content Area */}
                        <div className="flex h-[380px]">
                          {/* Subcategories Column with Gray Background */}
                          <div
                            className="w-[300px] bg-[#FFFFFF] border-r rounded-lg flex flex-col"
                            style={{ margin: "20px" }}
                          >
                            <div
                              className="p-6 overflow-y-auto max-h-[400px]"
                              style={{
                                scrollbarWidth: "thin",
                                scrollbarColor: "#c1c1c1 #f1f1f1",
                              }}
                            >
                              {(selectedCategory
                                ? selectedCategory.subCategories
                                : mainCategories[0]?.subCategories
                              )?.map((subCat, index) => (
                                <div
                                  key={subCat._id}
                                  className={`p-3 cursor-pointer rounded-lg mb-2 transition-all duration-200 ${
                                    hoveredCategoryId === subCat._id ||
                                    (index === 0 && !hoveredCategoryId)
                                      ? "text-teal-600 bg-white font-medium"
                                      : "text-gray-700 hover:text-teal-600 hover:bg-white"
                                  }`}
                                  onMouseEnter={() =>
                                    handleMouseEnter(subCat._id)
                                  }
                                  onClick={() =>
                                    setOpenedCategoryId(subCat._id)
                                  }
                                >
                                  <span className="text-sm flex items-center justify-between">
                                    {subCat.name}
                                    {subCat.childCategories &&
                                      subCat.childCategories.length > 0 && (
                                        <ChevronRight
                                          size={16}
                                          className="ml-2 text-gray-400"
                                        />
                                      )}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Child Categories Area with Background Pattern */}
                          <div className="flex-1 p-2 pr-2 overflow-y-auto bg-gradient-to-br from-pink-50 to-blue-50 relative">
                    

                            {/* Content */}
                            <div className="relative z-10 p-3 w-full">
                              {(() => {
                                const currentCategory =
                                  selectedCategory || mainCategories[0];
                                const currentHoveredId =
                                  hoveredCategoryId ||
                                  currentCategory?.subCategories?.[0]?._id;

                                return currentCategory?.subCategories?.map(
                                  (subCat) => {
                                    if (
                                      subCat._id === currentHoveredId &&
                                      subCat.childCategories &&
                                      subCat.childCategories.length > 0
                                    ) {
                                      // Group child categories into rows of 4 items each (like the table columns)
                                      const children = subCat.childCategories;
                                      const itemsPerRow = 3;

                                      // 1. Calculate number of rows needed
                                      const numRows = Math.ceil(children.length / itemsPerRow);

                                      // 2. Build columns
                                      const columns = Array.from({ length: itemsPerRow }, (_, colIdx) =>
                                        children.filter((_, idx) => idx % itemsPerRow === colIdx)
                                      );

                                      // 3. Build rows from columns
                                      const tableRows = Array.from({ length: numRows }, (_, rowIdx) =>
                                        columns.map(col => col[rowIdx] || null)
                                      );

                                      return (
                                        <div
                                          key={subCat._id}
                                          className="relative"
                                        >
                                          {/* Background image at bottom right */}
                                          <div className="absolute bottom-0 right-0 w-1/3 h-fullopacity-20"></div>

                                          {/* Table-like layout */}
                                          <div className="w-full overflow-x-auto">
                                            <table className="w-full border-collapse">
                                              <tbody>
                                                {tableRows.map((row, rowIndex) => (
                                                  <tr key={rowIndex} className="hover:bg-gray-50">
                                                    {row.map((child, colIndex) => (
                                                      <td
                                                        key={child ? child._id : `empty-${colIndex}`}
                                                        className="py-3 px-4 text-gray-600 align-top"
                                                      >
                                                        {child ? (
                                                          <a
                                                            href={`/products?ccid=${child._id}`}
                                                            className="block hover:text-teal-600 transition-colors duration-200"
                                                            onClick={() => {
                                                              toggleSidebar();
                                                              handleClick(child);
                                                            }}
                                                          >
                                                            {child.name}
                                                          </a>
                                                        ) : null}
                                                      </td>
                                                    ))}
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </li>
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

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default MegaMenu;
