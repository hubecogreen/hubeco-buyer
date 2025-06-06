"use client";
import React, { useState } from "react";
// import Footer from "@/components/footer/MainFooter";
import Head from "next/head";
// import Header from "@/components/header/MainHeader";
// import Pagination from "@/components/pagination/Pagination";
import { AiFillHome } from "react-icons/ai";
// import ProductCard from "@/components/productCard/ProductCard";
// import styles from "./wishlist.module.css";
// import WishListCard from "@/components/wishlist/WishListCard";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import PortfolioCard from "@/components/projects/PortfolioCard";
// import { IoIosSearch } from "react-icons/io";
// import { FaCubes } from "react-icons/fa";
// import { FaCubesStacked } from "react-icons/fa6";
// import { Checkbox } from "@/components/ui/checkbox";
// import ProjectFilters from "@/components/vendor-product/Filters/ProjectFilters";
// import { ChevronUp } from "lucide-react";
// import ProjectDetails from "@/components/projects/ProjectDetails";
import Link from "next/link";

const Projects = () => {
  //   State to manage the active section and toggle
  const [openVendorMenus, setOpenVendorMenus] = useState<{
    [key: number]: boolean;
  }>({});
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("saved"); // Keeps track of the active section
  const [isOrdersExpanded, setOrdersExpanded] = useState(false); // Manages "My Orders" expanded state
  const [checked, setChecked] = useState(false);
  // Function to toggle the orders section
  const toggleOrdersSection = () => {
    setOrdersExpanded((prev) => !prev);
    setActiveSection("orders"); // Set 'orders' as active when toggled
  };

  // Function to set the active section
  const handleSectionClick = (section: React.SetStateAction<string>) => {
    setActiveSection(section);
  };

  // Sample JSON data
  const menuData = {
    menu: [
      {
        title: "Office & Commercial",
        link: null,
        mb: true,
        level: 1,
        icon: "FaCubesStacked",
        submenu: [
          {
            title: "Tilt Industrial Design",
            link: null,
            level: 2,
          },
          {
            title: "Junglefy",
            link: null,
            level: 2,
          },
          {
            title: "Hydrowood",
            link: null,
            level: 2,
          },
          {
            title: "Hydrowood",
            link: null,
            level: 2,
          },
        ],
      },
      {
        title: "Public",
        link: null,
        mb: true,
        level: 1,
        icon: "FaCubesStacked",
        submenu: [
          {
            title: "Tilt Industrial Design",
            link: null,
            level: 2,
          },
          {
            title: "Junglefy",
            link: null,
            level: 2,
          },
          {
            title: "Hydrowood",
            link: null,
            level: 2,
          },
          {
            title: "Hydrowood",
            link: null,
            level: 2,
          },
        ],
      },
      {
        title: "Education",
        link: null,
        mb: true,
        level: 1,
        icon: "FaCubesStacked",
        submenu: [
          {
            title: "Tilt Industrial Design",
            link: null,
            level: 2,
          },
          {
            title: "Junglefy",
            link: null,
            level: 2,
          },
          {
            title: "Hydrowood",
            link: null,
            level: 2,
          },
          {
            title: "Hydrowood",
            link: null,
            level: 2,
          },
        ],
      },
      {
        title: "Hotel",
        link: null,
        mb: true,
        level: 1,
        icon: "FaCubesStacked",
        submenu: [
          {
            title: "Tilt Industrial Design",
            link: null,
            level: 2,
          },
          {
            title: "Junglefy",
            link: null,
            level: 2,
          },
          {
            title: "Hydrowood",
            link: null,
            level: 2,
          },
          {
            title: "Hydrowood",
            link: null,
            level: 2,
          },
        ],
      },
      {
        title: "Industry",
        link: null,
        mb: true,
        level: 1,
        icon: "FaCubesStacked",
        submenu: [
          {
            title: "Tilt Industrial Design",
            link: null,
            level: 2,
          },
          {
            title: "Junglefy",
            link: null,
            level: 2,
          },
          {
            title: "Hydrowood",
            link: null,
            level: 2,
          },
          {
            title: "Hydrowood",
            link: null,
            level: 2,
          },
        ],
      },
    ],
  };
  const checkBoxData = {
    checkMenu: [
      {
        title: "GREEN CERTIFIED",
        link: null,

        level: 1,
        submenu: [
          {
            title: "IGBC",
            link: null,
            level: 2,
          },
          {
            title: "GRIHA",
            link: null,
            level: 2,
          },
          {
            title: "LEED Certifications",
            link: null,
            level: 2,
          },
        ],
      },
      {
        title: "AWARD WINNING",
        link: null,

        level: 1,
        submenu: [
          {
            title: "Award Name",
            link: null,
            level: 2,
          },
          {
            title: "Award Name",
            link: null,
            level: 2,
          },
          {
            title: "Award Name",
            link: null,
            level: 2,
          },
        ],
      },
    ],
  };
  const vendors = [
    {
      title: "VENDOR",
      submenu: [
        { title: "Vendor Name" },
        { title: "Vendor Name" },
        { title: "Vendor Name" },
        { title: "Vendor Name" },
        { title: "Vendor Name" },
        { title: "Vendor Name" },
      ],
    },
  ];

  const MenuItem = ({ item, level = 1 }: any) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Toggle submenu visibility
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <li>
        <div
          className={`flex items-center justify-between cursor-pointer ${
            level === 1 ? "font-semibold text-lg" : "font-medium"
          }`}
          onClick={toggleExpand}
        >
          <div className="flex items-center">
            {/* Toggle arrow icon based on submenu visibility */}
            {item.submenu && (
              <div className="ml-2">
                {isExpanded ? (
                  <IoIosArrowDown className="text-[#31466B]" />
                ) : (
                  <IoIosArrowForward className="text-[#31466B]" />
                )}
              </div>
            )}
            <span
              className={`
    ${
      isExpanded
        ? "text-[#B90647] cursor-default"
        : "text-[#31466B] cursor-pointer hover:text-[#00A18A]"
    } 
    text-base ml-[5px]
  `}
            >
              {item.title}
            </span>
          </div>
        </div>

        {/* Render Submenu */}
        {isExpanded && item.submenu && (
          <ul className={`ml-${level === 1 ? 10 : 10} mt-2 space-y-1`}>
            {item.submenu.map((subItem: any, index: any) => (
              <MenuItem key={index} item={subItem} level={level + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  const DropdownMenu = ({ data }: any) => {
    const [openMenus, setOpenMenus] = useState<any>({}); // Track which menus are open

    // Toggle submenu
    const handleToggleMenu = (index: any) => {
      setOpenMenus((prev: any) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };

    return (
      <div>
        {data.checkMenu.map((menu: any, index: any) => (
          <div key={index}>
            {/* Main menu title */}
            <div
              onClick={() => handleToggleMenu(index)}
              className="flex items-center cursor-pointer justify-between"
            >
              <span className="font-semibold text-[#212121] text-base">
                {menu.title}
              </span>
              {/* Arrow icon: side arrow if closed, down arrow if open */}
              {openMenus[index] ? (
                <IoIosArrowDown className="text-[#31466B]" />
              ) : (
                <IoIosArrowForward className="text-[#31466B]" />
              )}
            </div>

            {/* Submenu (only show if open) */}
            {openMenus[index] && (
              <div className="mt-2">

                {menu.submenu.map((submenu: any, subIndex: any) => (
                  <div
                  key={subIndex}
                  className="flex items-center mb-1.5"
                >
                
                    <input type="checkbox" id={subIndex} className="mr-2 " />
                    <span className="ml-3 text-sm md:text-base font-medium text-[#212121] ">
                      {submenu.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Horizontal line after each menu */}
            <hr className="border-t border-gray-500 mb-4 mt-4" />
          </div>
        ))}
      </div>
    );
  };

  // Function to toggle the open state of the vendor menu
  const handleToggle = (index: number) => {
    setOpenVendorMenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <div className="bg-white min-h-screen">
        <Head>
          <title>Projects</title>
        </Head>
        <div className="banner-section h-102">
          <div className="md:px-20 px-5 py-5 relative bg-[url('/images/about/aboutBanner1.png')] bg-cover bg-center h-[200px] flex items-center justify-start text-white">
            <Link
              href="/"
              className="text-white flex items-center no-underline px-2.5 py-1 rounded"
            >
              <AiFillHome size={16} className="text-white mr-1.5" />
              Home
            </Link>

            <span className="text-white mx-2">/</span>
            <Link
              href="/projects"
              className="text-white no-underline px-2.5 py-1 rounded"
            >
              Projects
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 md:px-24 md:py-16 py-6">
          {/* Sidebar */}

          <aside className="hidden w-full col-span-12 lg:col-span-3 bg-[#FAFAFF] p-4 md:p-6 border border-gray-200 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg md:text-xl font-semibold text-[#31466B] mb-2 md:mb-2">
              Filters
            </h2>
            <hr className="border-t border-gray-500 mb-4" />

            <h2 className="text-lg md:text-base font-bold text-[#212121] mb-6 md:mb-4">
              CATEGORIES
            </h2>
            <ul className="space-y-2 md:space-y-4">
              {menuData.menu.map((menuItem, index) => (
                <MenuItem key={index} item={menuItem} />
              ))}
            </ul>
            <hr className="border-t border-gray-500 mb-4 mt-5" />
            <div>
              {vendors.map((item: any, index: any) => (
                <div key={index}>
                  <h3
                    className="text-base text-[#212121] font-semibold mb-2 flex items-center justify-between"
                    onClick={() => handleToggle(index)}
                  >
                    {item.title}
                    {openVendorMenus[index] ? (
                      <IoIosArrowDown className="text-[#31466B]" />
                    ) : (
                      <IoIosArrowForward className="text-[#31466B]" />
                    )}
                  </h3>

                  {openVendorMenus[index] && (
                   <div className="my-2">

                      {/* Submenu content */}
                      <input
                        type="text"
                        placeholder="Search Vendor"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border border-gray-300 px-2 py-1 w-full max-w-[400px]"
                      />

                      {item.submenu.map((submenu: any, subIndex: any) => (
                        <div
                        key={subIndex}
                        className="flex items-center mb-1.5 mt-2"
                      >
                      
                          <input
                            type="checkbox"
                            id={`submenu-${subIndex}`}
                            className="mr-2"
                          />
                          <span className="ml-3 text-sm md:text-base font-medium text-[#212121]">
                            {submenu.title}
                          </span>
                        </div>
                      ))}

                      {/* Show More Button */}
                      {item.submenu.length > 2 && (
                        <button
                          className="text-sm text-[#B90647] font-bold mt-1"
                          onClick={() => setShowMore(!showMore)}
                        >
                          {showMore ? "Show Less" : "38 MORE"}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Horizontal line after each vendor */}
                  <hr className="border-t border-gray-500 mb-4 mt-4" />
                </div>
              ))}
            </div>

            <div>
              <DropdownMenu data={checkBoxData} />
            </div>
          </aside>

          {/* Product List */}
          <main className="col-span-12 lg:col-span-12">
            {/* <PortfolioCard/> */}

            <div className="">
              <PortfolioCard />
            </div>
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Projects;
