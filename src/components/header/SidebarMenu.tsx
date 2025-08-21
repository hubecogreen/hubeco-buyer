"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import useApi from "../Fetcher/useAPI";
import store from "@/reduxStore";
import {
  saveCategories,
  saveCatTime,
} from "@/reduxStore/slices/masterDataSlice";
import toast from "react-hot-toast";
import * as getEndpoint from "../../network/EndPoints";
import useClient from "../hooks/useClient";

interface MenuItem {
  level: number;
  mb: any;
  title: string;
  link: string | null;
  icon: any;
  submenu?: any;
}

interface SidebarMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose }) => {
  interface Category {
    _id: string;
    name: string;
    subCategories?: Category[];
    childCategories?: Category[];
  }

  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [seoCategorySlug, setSeoCategorySlug] = useState<string>("");
  const { callApi } = useApi();

  const menuData = {
    menu: [
      {
        title: "Products",
        link: "/products",
        mb: true,
        level: 1,
        icon: "FaCubesStacked",
      },
      // {
      //   title: "Projects",
      //   link: "/projects",
      //   mb: true,
      //   level: 1,
      //   icon: "FaCubesStacked",
      // },
      {
        title: "Product Segments",
        link: "/categories",
        mb: true,
        level: 1,
        icon: "FaCubesStacked",
        submenu: allCategories.filter(
          (cat) =>
            (cat.subCategories && cat.subCategories.length > 0) ||
            (cat.childCategories && cat.childCategories.length > 0)
        ),
      },
      {
        title: "Green Financing",
        link: "/green-financing",
        mb: true,
        level: 1,
        icon: "FaLeaf",
      },
      {
        title: "Brands",
        link: "/brands",
        mb: true,
        level: 1,
        icon: "TbCategory",
      },
      {
        title: "Blogs",
        link: "/blogs",
        mb: true,
        level: 1,
        icon: "TbCategory",
      },
      {
        title: "About",
        link: "/about",
        mb: true,
        level: 1,
        submenu: [],
        icon: "TbCategory",
      },
      {
        title: "Contact Us",
        link: "/contact",
        mb: true,
        level: 1,
        submenu: [],
        icon: "TbCategory",
      },
      {
        title: "Vendor Connect",
        link: "/plans",
        mb: true,
        level: 1,
        submenu: [],
        icon: "FaStore",
      },
    ],
  };

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const dispatch = useDispatch();
  const isClient = useClient();

  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Categories Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
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
        const currentTime = new Date();
        setAllCategories(result?.data || []);
        dispatch(saveCategories(result?.data || []));
        dispatch(saveCatTime(currentTime));
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const router = useRouter();

  const renderMenuItems = (menu: MenuItem[]) => {
    return (
      <ul className="flex flex-col gap-1">
        {menu?.map((item: MenuItem) => (
          <li
            className={`${item?.title == "Product Segments" ? "" : ""}`}
            key={item.title}
            onClick={() => {
              if (item.submenu && item.submenu.length > 0) {
                // Do nothing, let the toggle handle it
              } else {
                router.push(item.link!);
                if (onClose) onClose();
              }
            }}
          >
            <div
              className={`flex justify-between items-center cursor-pointer text-sm mb-1 ${
                item.submenu && item.submenu.length > 0 ? "font-normal" : ""
              } ${
                item.level == 1
                  ? "mb-4"
                  : item.level == 2 || item.level == 3
                  ? "mb-2"
                  : ""
              } ${
                typeof window !== "undefined" &&
                window.location.href.includes(item.link!)
                  ? styles.parentItemActive
                  : ""
              }`}
              onClick={() =>
                item.submenu &&
                item.submenu.length > 0 &&
                toggleMenu(item.title)
              }
            >
              {item.title}
              {item.submenu &&
                item.submenu.length > 0 &&
                (openMenus[item.title] ? <FaAngleUp /> : <FaAngleDown />)}
            </div>
            {item?.submenu && item?.submenu.length > 0 && (
              <ul
                className={`${styles.submenu} ${
                  openMenus[item.title] ? styles.open : ""
                } pl-4 flex flex-col gap-2`}
              >
                {item?.title == "Product Segments"
                  ? renderCategoryItems(item.submenu)
                  : renderMenuItems(item.submenu)}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderCategoryItems = (categories: any) => {
    if (!categories || categories.length === 0) return null;

    return (
      <ul className="flex flex-col gap-1">
        {categories.map((category: any) => {
          // Show category if it has either subCategories or childCategories
          const hasSubCategories =
            category.subCategories && category.subCategories.length > 0;
          const hasChildCategories =
            category.childCategories && category.childCategories.length > 0;

          if (!hasSubCategories && !hasChildCategories) {
            return null;
          }

          return (
            <li key={category?._id}>
              <div
                className={`flex justify-between items-center cursor-pointer text-sm mb-1 ${
                  openMenus[category._id] ? styles.parentItemActive : ""
                }`}
              >
                <span
                  onClick={() => {
                    setSeoCategorySlug(category.seoSlug || "");
                    console.log("Main category selected:", category?.seoSlug);
                  }}
                >
                  {category?.name}
                </span>
                {(hasSubCategories || hasChildCategories) &&
                  (openMenus[category._id] ? (
                    <FaAngleUp
                      onClick={() => {
                        toggleMenu(category._id);
                        setSeoCategorySlug(category.seoSlug || "");
                      }}
                    />
                  ) : (
                    <FaAngleDown
                      onClick={() => {
                        toggleMenu(category._id);
                        setSeoCategorySlug(category.seoSlug || "");
                      }}
                    />
                  ))}
              </div>
              {(hasSubCategories || hasChildCategories) && (
                <ul
                  className={`${styles.submenu} ${
                    openMenus[category._id] ? styles.open : ""
                  } pl-4 flex flex-col gap-2`}
                >
                  {/* Show subCategories if they exist */}
                  {hasSubCategories &&
                    renderChildCategories(category.subCategories, "sub")}

                  {/* Show childCategories if they exist */}
                  {hasChildCategories &&
                    renderChildCategories(
                      category.childCategories,
                      category.seoSlug,
                      "child"
                    )}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderChildCategories = (
    categories: any,
    seoSlug?: string,
    type?: "sub" | "child"
  ) => {
    if (!categories || categories.length === 0) return null;

    console.log(categories, "check what categories are coming");
    console.log("Type being passed:", type);
    return (
      <>
        {categories.map((category: any) => (
          <li
            key={category?._id}
            onClick={() => {
              // Handle subcategory click
              if (type === "sub") {
                const url = `/products/${category?.seoSlug}?scid=${category?._id}`;
                console.log(
                  "Subcategory clicked - Generated URL:",
                  url,
                  "category:",
                  category?.name
                );
                router.push(url);
                if (onClose) onClose();
              }
            }}
          >
            <div
              className={`flex justify-between items-center cursor-pointer text-sm mb-1 ${
                typeof window !== "undefined" &&
                window.location.href.includes(category?._id)
                  ? styles.parentItemActive
                  : ""
              }`}
              onClick={(e) => {
                // Prevent event bubbling to parent li
                e.stopPropagation();

                // Handle child category click
                if (type === "child") {
                  const url = `/products/${seoCategorySlug}/${seoSlug}/${category?.seoSlug}?ccid=${category?._id}`;
                  console.log(
                    "Child category clicked - Generated URL:",
                    url,
                    "category:",
                    category?.name
                  );
                  router.push(url);
                  if (onClose) onClose();
                }
              }}
            >
              {category?.name}
              {category.childCategories &&
                category.childCategories.length > 0 &&
                (openMenus[`child-${category._id}`] ? (
                  <FaAngleUp
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(`child-${category._id}`);
                    }}
                  />
                ) : (
                  <FaAngleDown
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(`child-${category._id}`);
                    }}
                  />
                ))}
            </div>
            {category.childCategories &&
              category.childCategories.length > 0 && (
                <ul
                  className={`${styles.submenu} ${
                    openMenus[`child-${category._id}`] ? styles.open : ""
                  } pl-4 flex flex-col gap-2`}
                >
                  {renderChildCategories(
                    category.childCategories,
                    category.seoSlug,
                    "child"
                  )}
                </ul>
              )}
          </li>
        ))}
      </>
    );
  };

  if (!isClient) return <></>;

  return (
    <div
      className={`${styles.sidebar} ${
        isOpen ? styles.open : ""
      } w-[400%] bg-[url('/images/home/sidebarBg.webp')] bg-cover bg-bottom bg-no-repeat !z-[99999]`}
    >
      <div className="flex justify-end p-4 w-full md:w-11/12">
        <AiOutlineClose
          size={28}
          onClick={onClose}
          className="cursor-pointer"
          color="#000"
        />
      </div>
      <nav className={`${styles.sidebarNav} p-4 w-full md:w-11/12`}>
        {renderMenuItems(menuData.menu)}
      </nav>
    </div>
  );
};

export default SidebarMenu;
