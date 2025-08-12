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
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
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

  // News ticker style continuous scrolling
  useEffect(() => {
    if (!isOpen || featuredProducts.length === 0) return;

    let animationId: number;
    let startTime: number;
    const scrollSpeed = 50; // pixels per second

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      setCurrentProductIndex((prevIndex) => {
        const pixelsScrolled = (elapsed / 1000) * scrollSpeed;
        const productHeight = 33.33; // percentage per product
        const newIndex = Math.floor(pixelsScrolled / productHeight);
        const totalProducts = featuredProducts.length - 2;
        return newIndex % totalProducts;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isOpen, featuredProducts.length]);


  // Close dropdown on outside click - temporarily disabled for testing
  useEffect(() => {
    if (!isOpen) return;
    
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        // Check if the click is on the Product Segments button
        const productSegmentsButton = document.querySelector('[data-product-segments-button]');
        if (productSegmentsButton && productSegmentsButton.contains(target)) {
          return; // Don't close if clicking on the button itself
        }
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
      
      const result = await callApi(getEndpoint.default.PRODUCTSLIST, "GET") as any;
      console.log('API Response:', result?.data?.data);

      if (result?.data == null) {
        handleApiError(result?.errorData);
      } else {
        // Transform the API response to match our FeaturedProduct interface
        const products = result?.data?.data?.slice(0, 10).map((product: any) => ({
          _id: product._id,
          name: product.productName || product.name || "Product",
          description: product.description || product.shortDescription || "Sustainable building material with enhanced properties.",
          image: product.image? `${process.env.NEXT_PUBLIC_ASSET_URL}/${product.image}` : "/images/product-placeholder.webp",
          slug: product.slug || product._id
        }));
        
        console.log('Transformed products:', products);
        setFeaturedProducts(products);
      }
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

  // Create continuous marquee products
  const getMarqueeProducts = () => {
    if (featuredProducts.length === 0) return [];
    // Duplicate the products array to create seamless loop
    return [...featuredProducts, ...featuredProducts];
  };

  if (!isOpen) return null;

  console.log(featuredProducts, getMarqueeProducts(), 'featuredProducts');


  return (
    <>
      {/* Main dropdown content */}
      <div
        ref={dropdownRef}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full h-[500px] pointer-events-auto">
          {/* Left Column - Main Categories */}
          <div className="w-3/12 bg-black bg-opacity-90 pt-6 border-r border-gray-800">
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {mainCategories && mainCategories.length > 0 ? mainCategories.map((category, index) => (
                <div
                  key={category._id}
                  className={`flex items-center justify-between p-4 rounded transition-all duration-200 ${
                    selectedCategory?._id === category._id ||
                    (index === 0 && !selectedCategory)
                      ? "bg-[#B90647] text-white"
                      : category.subCategories && category.subCategories.length > 0
                      ? "text-white hover:text-[#B90647] hover:bg-gray-800 cursor-pointer"
                      : "text-white cursor-not-allowed"
                  }`}
                  onClick={() => category.subCategories && category.subCategories.length > 0 && handleCategoryClick(category)}
                >
                  <span className="text-base font-medium">
                    {category.name}
                  </span>
                  {category.subCategories && category.subCategories.length > 0 && (
                    <GoArrowRight size={16} className="text-white" />
                  )}
                </div>
              )) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-white">{isLoading ? "Loading categories..." : "No categories found"}</p>
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Split into 2 sub-columns */}
          <div className="w-5/12 bg-black bg-opacity-90 border-r border-gray-800">
            {(selectedCategory || (mainCategories && mainCategories.length > 0)) && (
              <>
                {/* Header with category name and underline */}
                <div className="p-8 pb-4">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {selectedCategory
                      ? selectedCategory.name
                      : mainCategories && mainCategories.length > 0 ? mainCategories[0]?.name : "Categories"}
                  </h2>
                  <div className="w-16 h-1 bg-[#B90647]"></div>
                </div>

                {/* Two sub-columns */}
                <div className="flex h-[calc(500px-120px)]">
                  {/* Left sub-column - Subcategories */}
                  <div className="w-1/2 p-8 pt-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                    <div>
                      {(selectedCategory
                        ? selectedCategory.subCategories
                        : mainCategories && mainCategories.length > 0 ? mainCategories[0]?.subCategories : []
                      )?.slice(0, Math.ceil(((selectedCategory
                        ? selectedCategory.subCategories
                        : mainCategories && mainCategories.length > 0 ? mainCategories[0]?.subCategories : []
                      )?.length || 0) / 2)).map((subCat, index) => (
                        <div
                          key={subCat._id}
                          className={`p-3 cursor-pointer rounded transition-all duration-200 ${
                            openedCategoryId === subCat._id
                              ? "text-[#B90647] font-semibold"
                              : "text-white hover:text-[#B90647]"
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
                            <div className="mt-2 ml-4 space-y-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                              {subCat.childCategories.map((child) => (
                                <div
                                  key={child._id}
                                  className="p-2 cursor-pointer rounded text-white hover:text-[#B90647] transition-all duration-200"
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
                  <div className="w-1/2 p-8 pt-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                    <div>
                      {/* Additional subcategories that are not expanded */}
                      {(selectedCategory
                        ? selectedCategory.subCategories
                        : mainCategories && mainCategories.length > 0 ? mainCategories[0]?.subCategories : []
                      )?.slice(Math.ceil(((selectedCategory
                        ? selectedCategory.subCategories
                        : mainCategories && mainCategories.length > 0 ? mainCategories[0]?.subCategories : []
                      )?.length || 0) / 2)).map((subCat, index) => (
                        <div
                          key={subCat._id}
                          className={`p-3 cursor-pointer rounded transition-all duration-200 ${
                            openedCategoryId === subCat._id
                              ? "text-[#B90647] font-semibold"
                              : "text-white hover:text-[#B90647]"
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
                            <div className="mt-2 ml-4 space-y-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                              {subCat.childCategories.map((child) => (
                                <div
                                  key={child._id}
                                  className="p-2 cursor-pointer rounded text-white hover:text-[#B90647] transition-all duration-200"
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
                </div>
              </>
            )}
          </div>

          {/* Right Column - Featured Products */}
          <div className="w-4/12 bg-black bg-opacity-90 p-8">
            <h3 className="text-lg font-bold text-white mb-6">Featured Products</h3>
            <div className="h-[calc(500px-120px)] overflow-hidden relative">
              {isFeaturedLoading ? (
                <div className="flex items-center justify-center h-32">
                  <p className="text-white">Loading featured products...</p>
                </div>
              ) : featuredProducts && featuredProducts.length > 0 ? (
                console.log('Rendering products:', featuredProducts),
                <div className="relative h-full">
                  <div 
                    className="transition-none"
                    style={{
                      transform: `translateY(-${currentProductIndex * 33.33}%)`
                    }}
                  >
                    {getMarqueeProducts().map((product: any, index: number) => (
                      <div 
                        key={`${product._id}-${index}`} 
                        className="border-b border-gray-800 pb-4 mb-4"
                        style={{ height: 'calc((500px - 120px) / 3)', minHeight: '120px' }}
                      >
                        <div className="flex items-start space-x-4 h-full">
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
                            <h4 className="text-sm font-bold text-white mb-2">
                              {product.name}
                            </h4>
                            <p className="text-xs text-white leading-relaxed">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-white">No featured products</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full h-full pointer-events-auto bg-black bg-opacity-95">
          <div className="flex flex-col h-full">
            
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-white">Product Segments</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-[#B90647] transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Mobile Categories Section */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-base font-bold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {mainCategories && mainCategories.length > 0 ? mainCategories.map((category, index) => (
                    <div
                      key={category._id}
                      className={`flex items-center justify-between p-3 rounded transition-all duration-200 ${
                        selectedCategory?._id === category._id ||
                        (index === 0 && !selectedCategory)
                          ? "bg-[#B90647] text-white"
                          : category.subCategories && category.subCategories.length > 0
                          ? "text-white hover:text-[#B90647] hover:bg-gray-800 cursor-pointer"
                          : "text-white cursor-not-allowed"
                      }`}
                      onClick={() => category.subCategories && category.subCategories.length > 0 && handleCategoryClick(category)}
                    >
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      {category.subCategories && category.subCategories.length > 0 && (
                        <GoArrowRight size={16} className="text-white" />
                      )}
                    </div>
                  )) : (
                    <div className="flex items-center justify-center h-32">
                      <p className="text-white text-sm">{isLoading ? "Loading categories..." : "No categories found"}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Subcategories Section */}
              {(selectedCategory || (mainCategories && mainCategories.length > 0)) && (
                <div className="p-4 border-t border-gray-800">
                  <h3 className="text-base font-bold text-white mb-4">
                    {selectedCategory
                      ? selectedCategory.name
                      : mainCategories && mainCategories.length > 0 ? mainCategories[0]?.name : "Categories"}
                  </h3>
                  <div className="space-y-2">
                    {(selectedCategory
                      ? selectedCategory.subCategories
                      : mainCategories && mainCategories.length > 0 ? mainCategories[0]?.subCategories : []
                    )?.map((subCat, index) => (
                      <div
                        key={subCat._id}
                        className={`p-3 cursor-pointer rounded transition-all duration-200 ${
                          openedCategoryId === subCat._id
                            ? "text-[#B90647] font-semibold"
                            : "text-white hover:text-[#B90647]"
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
                          <div className="mt-2 ml-4 space-y-1">
                            {subCat.childCategories.map((child) => (
                              <div
                                key={child._id}
                                className="p-2 cursor-pointer rounded text-white hover:text-[#B90647] transition-all duration-200"
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
              )}

              {/* Mobile Featured Products Section */}
              <div className="p-4 border-t border-gray-800">
                <h3 className="text-base font-bold text-white mb-4">Featured Products</h3>
                <div className="h-48 overflow-hidden relative">
                  {isFeaturedLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <p className="text-white text-sm">Loading featured products...</p>
                    </div>
                  ) : featuredProducts && featuredProducts.length > 0 ? (
                    <div className="relative h-full">
                      <div 
                        className="transition-none"
                        style={{
                          transform: `translateY(-${currentProductIndex * 33.33}%)`
                        }}
                      >
                        {getMarqueeProducts().map((product: any, index: number) => (
                          <div 
                            key={`${product._id}-${index}`} 
                            className="border-b border-gray-800 pb-3 mb-3"
                            style={{ height: 'calc(192px / 3)', minHeight: '60px' }}
                          >
                            <div className="flex items-start space-x-3 h-full">
                              <div className="w-12 h-12 bg-gray-700 rounded flex-shrink-0">
                                {product.image && (
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover rounded"
                                    onError={(e) => {
                                      e.currentTarget.src = "/images/product-placeholder.webp";
                                    }}
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xs font-bold text-white mb-1">
                                  {product.name}
                                </h4>
                                <p className="text-xs text-white leading-relaxed line-clamp-2">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32">
                      <p className="text-white text-sm">No featured products</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSegmentsDropdown; 