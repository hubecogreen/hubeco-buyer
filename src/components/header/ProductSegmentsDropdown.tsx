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
import Image from "next/image";

interface Category {
  seoSlug: string;
  _id: string;
  name: string;
  subCategories?: Category[];
  childCategories?: Category[];
}

interface FeaturedProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

interface ProductSegmentsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductSegmentsDropdown: React.FC<ProductSegmentsDropdownProps> = ({ isOpen, onClose }) => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );
  const [openedCategoryId, setOpenedCategoryId] = useState<string | null>(null);
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(true);
  const { callApi } = useApi();
  const categoriesRedux = store.getState().masterData.categories;
  const catTimeRedux = store.getState().masterData.catetime;
  const dispatch = useDispatch();

  const currentTime = Date.now();
  const catTime = new Date(catTimeRedux).getTime();
  const router = useRouter();

  const timeDifference = currentTime - catTime;
  const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);
  const breakpoint = useBreakpoint();
  const threshold = breakpoint === "tablet" ? 9 : 9;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCategories();
    getMenuCategories();
    getFeaturedProducts();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close dropdown on escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

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
    if (categoriesRedux && timeDifferenceInHours < 24) {
      setCategoriesData(categoriesRedux);
      return;
    }

    try {
      const result = (await callApi(
        getEndpoint.default.CATEGORIES,
        "GET"
      )) as any;
      if (result?.data == null) {
        handleApiError(result?.errorData);
      } else {
        setCategoriesData(result?.data?.data);
        dispatch(saveCategories(result?.data?.data));
        dispatch(saveCatTime(Date.now()));
      }
    } catch (e) {
      handleApiError(e);
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
      setIsLoading(true);
      const result = (await callApi(
        getEndpoint.default.PRODUCTS_CATEGORIES,
        "GET"
      )) as any;
      if (result?.data == null) {
        handleApiError(result?.errorData);
      } else {
        console.log(result?.data, 'checkncknnd');
        setMainCategories(result?.data);
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getFeaturedProducts = async () => {
    try {
      setIsFeaturedLoading(true);
      // For now, we'll use a mock featured products array
      // You can replace this with actual API call when endpoint is available
      const mockFeaturedProducts = [
        {
          _id: "1",
          name: "ECOTHERM –VP 230",
          description: "Ecotherm Series exemplify Sustainability by Incorporating 30% recyclable bricks in production using 50% less clay compared to solid bricks.",
          image: "/images/product-placeholder.webp",
          slug: "ecotherm-vp-230"
        },
        {
          _id: "2", 
          name: "GREEN BUILD 500",
          description: "Sustainable building material with enhanced thermal properties and reduced carbon footprint.",
          image: "/images/product-placeholder.webp",
          slug: "green-build-500"
        },
        {
          _id: "3",
          name: "ECO CEMENT PLUS",
          description: "Environmentally friendly cement alternative with superior strength and durability.",
          image: "/images/product-placeholder.webp", 
          slug: "eco-cement-plus"
        }
      ];
      setFeaturedProducts(mockFeaturedProducts);
    } catch (e) {
      console.log("Error fetching featured products:", e);
    } finally {
      setIsFeaturedLoading(false);
    }
  };

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
  };

  const handleClick = (menuItem?: any) => {
    if (menuItem) {
      router.push(`/products/${menuItem.seoSlug}?ccid=${menuItem._id}`);
    }
  };

  const toggleSubCategory = (subCategoryId: string) => {
    setOpenedCategoryId(openedCategoryId === subCategoryId ? null : subCategoryId);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main dropdown content */}
      <div
        ref={dropdownRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="w-full h-full mt-[150px] bg-black bg-opacity-80 flex">
          <div className="w-full flex h-[900px]">
            {/* Left Column - Main Categories */}
            <div className="w-1/3 bg-black bg-opacity-90 p-8 border-r border-gray-800">
              <div className="space-y-4 h-full overflow-y-auto">
                {mainCategories && mainCategories.length > 0 ? mainCategories.map((category, index) => (
                  <div
                    key={category._id}
                    className={`flex items-center justify-between p-4 rounded cursor-pointer transition-all duration-200 ${
                      selectedCategory?._id === category._id ||
                      (index === 0 && !selectedCategory)
                        ? "bg-[#B90647] text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <span className="text-base font-medium">
                      {category.name}
                    </span>
                    <GoArrowRight size={16} className="text-white" />
                  </div>
                )) : (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-gray-400">{isLoading ? "Loading categories..." : "No categories found"}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Middle Column - Split into 2 sub-columns */}
            <div className="w-1/3 bg-black bg-opacity-90 border-r border-gray-800">
              {(selectedCategory || (mainCategories && mainCategories.length > 0)) && (
                <>
                  {/* Header with category name and underline */}
                  <div className="p-8 pb-4">
                    <h2 className="text-xl font-bold text-gray-300 mb-2">
                      {selectedCategory
                        ? selectedCategory.name
                        : mainCategories && mainCategories.length > 0 ? mainCategories[0]?.name : "Categories"}
                    </h2>
                    <div className="w-16 h-1 bg-[#B90647]"></div>
                  </div>

                  {/* Two sub-columns */}
                  <div className="flex h-[calc(900px-120px)]">
                    {/* Left sub-column - Subcategories */}
                    <div className="w-1/2 p-8 pt-0 overflow-y-auto">
                      <div className="space-y-3">
                        {(selectedCategory
                          ? selectedCategory.subCategories
                          : mainCategories && mainCategories.length > 0 ? mainCategories[0]?.subCategories : []
                        )?.map((subCat, index) => (
                          <div
                            key={subCat._id}
                            className={`p-3 cursor-pointer rounded transition-all duration-200 ${
                              openedCategoryId === subCat._id
                                ? "text-[#B90647] font-semibold"
                                : "text-gray-300 hover:text-white"
                            }`}
                            onClick={() => toggleSubCategory(subCat._id)}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{subCat.name}</span>
                              {subCat.childCategories && subCat.childCategories.length > 0 && (
                                <ChevronRight
                                  size={16}
                                  className={`transition-transform duration-200 ${
                                    openedCategoryId === subCat._id ? 'rotate-90' : ''
                                  }`}
                                />
                              )}
                            </div>
                            
                            {/* Child categories shown below when expanded */}
                            {openedCategoryId === subCat._id && subCat.childCategories && subCat.childCategories.length > 0 && (
                              <div className="mt-2 ml-4 space-y-2">
                                {subCat.childCategories.map((child) => (
                                  <div
                                    key={child._id}
                                    className="p-2 cursor-pointer rounded text-gray-400 hover:text-white transition-all duration-200"
                                  >
                                    <Link
                                      href={`/products/${selectedCategory?.seoSlug || 'category'}/${subCat?.seoSlug || 'sub-category'}/${child?.seoSlug || 'child-category'}?ccid=${child._id}`}
                                      className="text-xs"
                                      onClick={() => {
                                        onClose();
                                        handleClick(child);
                                      }}
                                    >
                                      {child.name}
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right sub-column - Additional subcategories */}
                    <div className="w-1/2 p-8 pt-0 overflow-y-auto">
                      <div className="space-y-3">
                        {/* Additional subcategories that are not expanded */}
                        {(selectedCategory
                          ? selectedCategory.subCategories
                          : mainCategories && mainCategories.length > 0 ? mainCategories[0]?.subCategories : []
                        )?.filter(subCat => subCat._id !== openedCategoryId).map((subCat) => (
                          <div
                            key={subCat._id}
                            className="p-3 cursor-pointer rounded text-gray-300 hover:text-white transition-all duration-200"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{subCat.name}</span>
                              {subCat.childCategories && subCat.childCategories.length > 0 && (
                                <GoArrowRight size={14} className="text-gray-400" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right Column - Featured Products */}
            <div className="w-1/3 bg-black bg-opacity-90 p-8">
              <h3 className="text-lg font-bold text-gray-300 mb-6">Featured Products</h3>
              <div className="space-y-6 h-[calc(900px-120px)] overflow-y-auto">
                {isFeaturedLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-gray-400">Loading featured products...</p>
                  </div>
                ) : featuredProducts && featuredProducts.length > 0 ? (
                  featuredProducts.slice(0, 3).map((product) => (
                    <div key={product._id} className="border-b border-gray-800 pb-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-700 rounded flex-shrink-0">
                          {product.image && (
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover rounded"
                              onError={(e) => {
                                e.currentTarget.src = "/images/product-placeholder.webp";
                              }}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-300 mb-2">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-gray-400">No featured products</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSegmentsDropdown; 