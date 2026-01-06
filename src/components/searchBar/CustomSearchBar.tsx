"use client";
import React, { useState, useRef, useEffect } from "react";
import useApi from "../Fetcher/useAPI";
import useRefreshToken from "../hooks/useRefreshToken";
import * as getEndpoint from "../../network/EndPoints";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import animationData from "../../../public/animations/nodatafound.json";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import useClient from "../hooks/useClient";
import { normalizePath } from "@/lib/utils";
import LottieWrapper from "../LottieWrapper";

interface CustomSearchBarProps {
  customStyles?: React.CSSProperties;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isExpanded?: boolean;
  showDropdown?: boolean;
  onDropdownToggle?: (show: boolean) => void;
}

const SearchBar: React.FC<CustomSearchBarProps> = ({
  customStyles,
  placeholder = "Search products...",
  className = "",
  value = "",
  onChange,
  onFocus,
  onBlur,
  isExpanded = false,
  showDropdown = false,
  onDropdownToggle,
}) => {
  const [searchQuery, setSearchQuery] = useState(value);
  const [errorMessage, setErrorMessage] = useState("");
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const [isDropdownOpen, setIsDropdownOpen] = useState(showDropdown);
  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [childCategories, setChildCategories] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [noSearch, setNoSearch] = useState(false);
  const [targetedCustomer, setTargetedCustomer] = useState<string>("not_set");
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const isClient = useClient();

  // Dynamic rotating placeholders - fetch from API or use defaults
  const [rotatingPlaceholders, setRotatingPlaceholders] = useState([
    "Search for categories...",
    "Search for products...",
    "Search for vendors...",
  ]);

  // Ref for the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [clickedResult, setClickedResult] = useState(false);

  // Rotate placeholders with animation
useEffect(() => {
  const interval = setInterval(() => {

    // 1️⃣ Change category first
    setCurrentPlaceholderIndex((prev) =>
      (prev + 1) % rotatingPlaceholders.length
    );

    // 2️⃣ Immediately start roll animation for NEW text
    setIsAnimating(true);

    // Stop animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // match CSS duration

  }, 2000); // change every 2 seconds

  return () => clearInterval(interval);
}, [rotatingPlaceholders.length]);

  // Trigger initial animation after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 1000); // Start first animation after 1 second
    return () => clearTimeout(timer);
  }, []);

  // Update searchQuery when value prop changes
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  // Update dropdown state when showDropdown prop changes
  useEffect(() => {
    setIsDropdownOpen(showDropdown);
  }, [showDropdown]);

  // Fetch dynamic placeholders and categories from API on component mount
  useEffect(() => {
    getDynamicPlaceholders();
    getCategories();
  }, []);

  // Function to fetch categories for enhancing subcategory data
  const getCategories = async () => {
    try {
      const result = (await callApi(
        getEndpoint.default.PRODUCTS_CATEGORIES,
        "GET"
      )) as any;
      if (result?.data && result.data.length > 0) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to fetch dynamic placeholders from categories
  const getDynamicPlaceholders = async () => {
    try {
      const result = (await callApi(
        getEndpoint.default.PRODUCTS_CATEGORIES,
        "GET"
      )) as any;
      if (result?.data && result.data.length > 0) {
        const placeholders: string[] = [];
        
        // Collect category names (main categories, subcategories, and child categories)
        result.data.forEach((category: any) => {
          // Add main category name
          if (category.name && category.name !== "N/A") {
            const truncatedName = category.name.length > 20 
              ? category.name.substring(0, 20) + '...' 
              : category.name;
            placeholders.push(`Search for ${truncatedName}...`);
          }
          
          // Add subcategory names
          if (category.subCategories && category.subCategories.length > 0) {
            category.subCategories.forEach((subCat: any) => {
              if (subCat.name && subCat.name !== "N/A") {
                const truncatedName = subCat.name.length > 20 
                  ? subCat.name.substring(0, 20) + '...' 
                  : subCat.name;
                placeholders.push(`Search for ${truncatedName}...`);
              }
              
              // Add child category names
              if (subCat.childCategories && subCat.childCategories.length > 0) {
                subCat.childCategories.forEach((childCat: any) => {
                  if (childCat.name && childCat.name !== "N/A") {
                    const truncatedName = childCat.name.length > 20 
                      ? childCat.name.substring(0, 20) + '...' 
                      : childCat.name;
                    placeholders.push(`Search for ${truncatedName}...`);
                  }
                });
              }
            });
          }
        });
        
        // Remove duplicates and limit to first 8 placeholders to avoid too many
        const uniquePlaceholders = [...new Set(placeholders)].slice(0, 8);
        
        // If we got placeholders from API, use them
        if (uniquePlaceholders.length > 0) {
          setRotatingPlaceholders(uniquePlaceholders);
        }
      }
    } catch (error) {
      console.log("Error fetching dynamic placeholders:", error);
      // Keep default placeholders if API fails
    }
  };

  const handleApiError = async (err: any, value: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      handleSearch(value);
    } else {
      if (result?.data?.message) {
        toast.error(result?.data?.message);
      }
    }
  };

  const handleSearch = async (e: any) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    if (onChange) {
      onChange(value);
    }
    
    const searVal = value.trim();
    
    if (searVal.length > 0) {
      try {
        const result = (await callApi(
          `${getEndpoint.default.SEARCH}?searchTerm=${value}`,
          "GET"
        )) as any;
        if (result?.data == null) {
          handleApiError(result?.errorData, value);
        } else {
          setNoSearch(false);
          const shouldShowDropdown = true;
          setIsDropdownOpen(shouldShowDropdown);
          if (onDropdownToggle) {
            onDropdownToggle(shouldShowDropdown);
          }
          
          if (result && result?.data && result?.data?.length > 0) {
            const maxResults = 25;
            const keys = {
              production: [
                "prod_products",
                "prod_subcategory",
                "prod_child_category",
                "prod_vendors",
              ],
              uat: [
                "uat_products",
                "uat_subcategory",
                "uat_child_category",
                "uat_vendors",
              ],
              dev: [
                "dev_products",
                "dev_subcategory",
                "dev_child_category",
                "dev_vendors",
              ],
            };
            let myKeys =
              keys[
                assetURL?.includes("uat")
                  ? "uat"
                  : assetURL?.includes("dev")
                  ? "dev"
                  : "production"
              ];
            
            const products = result?.data.filter(
              (item: any) =>
                item.type === myKeys[0] &&
                (item.targetCustomer ===
                  (targetedCustomer === "not_set" ? "ALL" : targetedCustomer) ||
                  item.targetCustomer === "ALL")
            );
            const subCategories = result?.data.filter(
              (item: any) => item.type === myKeys[1]
            );
            const childCategories = result?.data.filter(
              (item: any) => item.type === myKeys[2]
            );
            const vendors = result?.data.filter(
              (item: any) => item.type === myKeys[3]
            );

            // Enhance subcategories with parent category information if available
            const enhancedSubCategories = subCategories.map((subCat: any) => {
              // Try to find the parent category from the categories data
              const parentCategory = categories.find((cat: any) => 
                cat.subCategories?.some((sub: any) => sub._id === subCat.id)
              );
              
              if (parentCategory) {
                return {
                  ...subCat,
                  parentCategoryName: parentCategory.name,
                  parentCategorySlug: parentCategory.seoSlug
                };
              }
              return subCat;
            });

            // Enhance child categories with parent category and subcategory information
            const enhancedChildCategories = childCategories.map((childCat: any) => {
              // Find the parent subcategory and its parent category
              let parentSubCategory = null;
              let parentCategory = null;
              
              for (const cat of categories) {
                if (cat.subCategories) {
                  for (const subCat of cat.subCategories) {
                    if (subCat.childCategories?.some((child: any) => child._id === childCat.id)) {
                      parentSubCategory = subCat;
                      parentCategory = cat;
                      break;
                    }
                  }
                  if (parentSubCategory && parentCategory) break;
                }
              }
              
              if (parentCategory && parentSubCategory) {
                return {
                  ...childCat,
                  parentCategoryName: parentCategory.name,
                  parentCategorySlug: parentCategory.seoSlug,
                  parentSubCategoryName: parentSubCategory.name,
                  parentSubCategorySlug: parentSubCategory.seoSlug
                };
              }
              return childCat;
            });

            setProducts(products);
            setSubCategories(enhancedSubCategories);
            setChildCategories(enhancedChildCategories);
            setVendors(vendors);
          } else {
            setNoSearch(true);
          }
        }
      } catch (e) {
        handleApiError(e, value);
      }
    } else {
      clearSearchResults();
    }
  };

  const clearSearchResults = () => {
    setProducts([]);
    setCategories([]);
    setSubCategories([]);
    setChildCategories([]);
    setVendors([]);
    setBrands([]);
    const shouldHideDropdown = false;
    setIsDropdownOpen(shouldHideDropdown);
    if (onDropdownToggle) {
      onDropdownToggle(shouldHideDropdown);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        const shouldHideDropdown = false;
        setIsDropdownOpen(shouldHideDropdown);
        if (onDropdownToggle) {
          onDropdownToggle(shouldHideDropdown);
        }
      }
    };

    if (window) {
      const buyerInfo = window.sessionStorage.getItem("buyerUserInfo");
      if (buyerInfo !== null) {
        const buyer = JSON.parse(buyerInfo);
        if (buyer) {
          if (buyer?.buyerInfo?.buyerType) {
            setTargetedCustomer(buyer?.buyerInfo?.buyerType);
          } else {
            setTargetedCustomer("not_set");
          }
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onDropdownToggle]);

  // Cleanup loading state when component unmounts
  useEffect(() => {
    return () => {
      setIsNavigating(false);
    };
  }, []);

  if (!isClient) return null;

  const currentPlaceholder = placeholder && placeholder !== "Search products..." 
    ? placeholder 
    : rotatingPlaceholders[currentPlaceholderIndex];

  return (
    <div
      className={`relative flex flex-col items-center h-full w-full ${className}`}
      style={customStyles}
    >
      {/* Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B90647]"></div>
            <p className="text-gray-700 font-medium">Redirecting...</p>
          </div>
        </div>
      )}

      {/* Input Component */}
      <div className="relative w-full ">
        <Input
          placeholder=""
          value={searchQuery}
          onChange={(e: any) => handleSearch(e)}
          onFocus={onFocus}
          onBlur={(e) => {
            // Don't trigger blur if we just clicked a search result
            if (!clickedResult) {
              onBlur?.();
            }
            // Reset the flag after a short delay
            setTimeout(() => setClickedResult(false), 100);
          }}
          className={`pl-3 bg-cream  border-[1px] border-[#E8E3C5] border-solid md:text-base text-xs lg:text-sm w-full h-[47px] shadow-lg text-fontGray rounded-[5px] mr-[1px] ${
            isExpanded ? 'w-full' : 'w-12 h-12 rounded-lg'
          }`}
        />
        
        {/* Animated Placeholder */}
        {!searchQuery && (
          <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
            <div className="pl-3 text-gray-400 text-sm">
              <div 
                className={`${isAnimating ? 'slide-up-continuous' : ''} transition-all duration-1000 ease-in-out`}
              >
                {currentPlaceholder}
              </div>
            </div>
          </div>
        )}
         <span className="absolute inset-y-0 right-3 top-[6px] flex items-center text-fontGray bg-primary w-[34px] h-[34px] rounded-md justify-center  ">
        <Search size={18} color="#ffffff"  />
      </span>
      </div>

      {/* Search Icon */}
      <div>
     
      </div>

      {/* Render search results grouped by type */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-14 z-50 w-full bg-cream shadow-lg rounded-lg max-h-96 overflow-y-auto"
        >
          {noSearch ? (
            <>
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col items-center">
                  <LottieWrapper
                    animationData={animationData}
                    loop={true}
                    className="w-[200px] h-[200px]"
                  />

                  <p className="font-semibold text-sm text-center mb-4 ">
                    Oops, looks like there's nothing here. Try adjusting your
                    search again!
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Child Categories Section - Priority 1 */}
              {childCategories.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold p-2 mt-1 text-[#B90647]">
                    Child Categories
                  </h3>
                  {childCategories.map((childCategory, index) => {
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        onClick={() => {
                          setClickedResult(true);
                          setIsNavigating(true);
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          if (onChange) onChange("");
                          if (onDropdownToggle) onDropdownToggle(false);
                          
                          setTimeout(() => {
                            // Build the full hierarchy URL for child categories
                            if (childCategory?.parentCategorySlug && childCategory?.parentSubCategorySlug && childCategory?.seoSlug) {
                              const url = `/products/${childCategory.parentCategorySlug}/${childCategory.parentSubCategorySlug}/${childCategory.seoSlug}?ccid=${childCategory?.id}`;
                              console.log('Child category URL:', url);
                              window.location.href = url;
                            } else {
                              // Fallback to original structure if hierarchy data is not available
                              router.refresh();
                              router.push(`/products/?ccid=${childCategory?.id}`);
                            }
                            setIsNavigating(false);
                          }, 100);
                        }}
                      >
                        <div className="flex justify-start items-center">
                          {childCategory && childCategory?.image && (
                            <Image
                              src={
                                childCategory && childCategory?.image
                                  ? (
                                      assetURL +
                                      "/" +
                                      childCategory?.image
                                    ).includes("//admin")
                                    ? (
                                        assetURL +
                                        "/" +
                                        childCategory?.image
                                      ).replace("//admin", "/admin")
                                    : `${assetURL}/${childCategory?.image}`
                                  : "/images/product-placeholder.webp"
                              }
                              alt={childCategory?.name}
                              width={30}
                              height={30}
                              className="w-[30px] h-[30px] rounded"
                            />
                          )}
                          <div>
                            <p className=" ml-2 text-fontGray group-hover:text-secondary group-hover:font-medium text-normal text-sm">
                              {childCategory?.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Sub Categories Section - Priority 2 */}
              {subCategories.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold p-2 mt-1 text-[#B90647]">
                    Sub Categories
                  </h3>
                  {subCategories.map((subCategory, index) => {
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        onClick={() => {
                          setClickedResult(true);
                          setIsNavigating(true);
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          if (onChange) onChange("");
                          if (onDropdownToggle) onDropdownToggle(false);
                          
                          // Use window.location for more reliable navigation
                          setTimeout(() => {
                            // For search results, we may not have parent category info
                            // Use the enhanced URL structure if available, otherwise fallback
                            if (subCategory?.parentCategorySlug && subCategory?.seoSlug) {
                              const url = `/products/${subCategory.parentCategorySlug}/${subCategory.seoSlug}?scid=${subCategory?.id}`;
                              console.log('Enhanced URL:', url);
                              window.location.href = url;
                            } else {
                              // Fallback to original structure for search results
                              const url = `/products/${subCategory?.seoSlug}?scid=${subCategory?.id}`;
                              console.log('Fallback URL:', url);
                              window.location.href = url;
                            }
                            setIsNavigating(false);
                          }, 100);
                        }}
                      >
                        <div className="flex justify-start items-center">
                          {subCategory && subCategory?.image && (
                            <Image
                              src={
                                subCategory?.image
                                  ? normalizePath(
                                      `${assetURL}/${subCategory?.image}`
                                    )
                                  : "/images/product-placeholder.webp"
                              }
                              alt={subCategory?.name}
                              width={30}
                              height={30}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/images/product-placeholder.webp";
                              }}
                              loading="lazy"
                              className="w-[30px] h-[30px] rounded"
                            />
                          )}
                          <div>
                            <p className=" ml-2 text-fontGray group-hover:text-secondary group-hover:font-medium text-normal text-sm">
                              {subCategory?.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Products Section - Priority 3 */}
              {products.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold p-2 mt-1 text-[#B90647]">
                    Products
                  </h3>
                  {products.map((product: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        onClick={() => {
                          setClickedResult(true);
                          setIsNavigating(true);
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          if (onChange) onChange("");
                          if (onDropdownToggle) onDropdownToggle(false);
                          
                          // Try different navigation approaches
                          setTimeout(() => {
                            try {
                              // First try Next.js router
                              router.push(`/${product?.slug}`);
                           
                              
                              // If router fails, fallback to window.location
                              setTimeout(() => {
                                if (window.location.pathname !== `/${product?.slug}`) {
                                  console.log('Router failed, using window.location');
                                  window.location.href = `/${product?.slug}`;
                                  setIsNavigating(false);
                                }
                              }, 500);
                            } catch (error) {
                              console.error('Navigation error:', error);
                              window.location.href = `/${product?.slug}`;
                            }finally{
                              setIsNavigating(false);
                            }
                          }, 100);
                        }}
                      >
                        <div className="flex justify-start items-center">
                          <Image
                            src={
                              product && product?.image
                                ? (assetURL + "/" + product?.image).includes(
                                    "//admin"
                                  )
                                  ? (assetURL + "/" + product?.image).replace(
                                      "//admin",
                                      "/admin"
                                    )
                                  : `${assetURL}/${product?.image}`
                                : "/images/product-placeholder.webp"
                            }
                            alt={product?.name}
                            width={30}
                            height={30}
                            onError={(e) => {
                              e.currentTarget.src =
                                "/images/product-placeholder.webp";
                            }}
                            loading="lazy"
                            className="w-[30px] h-[30px] rounded"
                          />
                          <div>
                            <p className=" ml-2 text-fontGray group-hover:text-secondary group-hover:font-medium text-normal text-sm">
                              {product?.productName == "N/A"
                                ? product?.name
                                : product?.productName}
                            </p>
                            <p className=" ml-2 text-fontGray group-hover:text-secondary group-hover:font-medium text-normal text-[10px]">
                              SKU : {product?.variantSku}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Main Categories Section - Priority 4 */}
              {categories.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold p-2 mt-1 text-[#B90647]">
                    Main Categories
                  </h3>
                  {categories.map((category, index) => {
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        onClick={() => {
                          setClickedResult(true);
                          setIsNavigating(true);
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          if (onChange) onChange("");
                          if (onDropdownToggle) onDropdownToggle(false);
                          
                          setTimeout(() => {
                            window.location.href = `/products/${category?.seoSlug}?cid=${category?._id}`;
                            setIsNavigating(false);
                          }, 100);
                        }}
                      >
                        <div className="flex justify-start items-center">
                          {category && category?.image && (
                            <Image
                              src={
                                category?.image
                                  ? normalizePath(
                                      `${assetURL}/${category?.image}`
                                    )
                                  : "/images/product-placeholder.webp"
                              }
                              alt={category?.name}
                              width={30}
                              height={30}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/images/product-placeholder.webp";
                              }}
                              loading="lazy"
                              className="w-[30px] h-[30px] rounded"
                            />
                          )}
                          <div>
                            <p className=" ml-2 text-fontGray group-hover:text-secondary group-hover:font-medium text-normal text-sm">
                              {category?.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Vendors Section - Priority 5 */}
              {vendors.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold p-2 mt-1 text-[#B90647]">
                    Vendors
                  </h3>
                  {vendors.map((vendor, index) => {
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        onClick={() => {
                          setClickedResult(true);
                          setIsNavigating(true);
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          if (onChange) onChange("");
                          if (onDropdownToggle) onDropdownToggle(false);
                          
                          // Use window.location for more reliable navigation
                          setTimeout(() => {
                            window.location.href = `/brands/${vendor?.businessInfo?.slug}`;
                            setIsNavigating(false);
                          }, 100);
                        }}
                      >
                        <div className="flex justify-start items-center">
                          {vendor &&
                            vendor?.businessInfo &&
                            vendor?.businessInfo?.logo && (
                              <Image
                                src={
                                  vendor?.businessInfo?.logo
                                    ? normalizePath(
                                        `${assetURL}/${vendor?.businessInfo?.logo}`
                                      )
                                    : "/images/product-placeholder.webp"
                                }
                                alt={vendor?.businessInfo?.companyName}
                                width={30}
                                height={30}
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/images/product-placeholder.webp";
                                }}
                                loading="lazy"
                                className="w-[30px] h-[30px] rounded"
                              />
                            )}
                          <div>
                            <p className=" ml-2 text-fontGray group-hover:text-secondary group-hover:font-medium text-normal text-sm">
                              {vendor?.businessInfo?.companyName}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {/* CSS Animation for continuous sliding from bottom */}
      <style jsx>{`
        @keyframes slideUpFromBottom {
          0% {
            transform: translateY(32px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .slide-up-continuous {
          animation: slideUpFromBottom 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
