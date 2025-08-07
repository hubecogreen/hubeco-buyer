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
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const isClient = useClient();

  // Rotating placeholders
  const rotatingPlaceholders = [
    "Search for Bricks...",
    "Search for Cement...",
    "Search for Steel...",
    "Search for Tiles...",
    "Search for Paint...",
    "Search for Tools...",
    "Search for Plumbing...",
    "Search for Electrical...",
  ];

  // Ref for the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Rotate placeholders with animation
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Animation triggered');
      // Start animation
      setIsAnimating(true);
      
      setTimeout(() => {
        // Always change the placeholder, regardless of external or internal
        if (placeholder && placeholder !== "Search products...") {
          // For external placeholder, the parent will handle the rotation
          // We just need to animate
        } else {
          setCurrentPlaceholderIndex((prev) => 
            (prev + 1) % rotatingPlaceholders.length
          );
        }
        setIsAnimating(false);
      }, 600); // Animation duration
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [placeholder, rotatingPlaceholders.length]);

  // Animate when placeholder changes
  useEffect(() => {
    console.log('Placeholder changed, triggering animation');
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [placeholder]);

  // Update searchQuery when value prop changes
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  // Update dropdown state when showDropdown prop changes
  useEffect(() => {
    setIsDropdownOpen(showDropdown);
  }, [showDropdown]);

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

            setProducts(products);
            setSubCategories(subCategories);
            setChildCategories(childCategories);
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

  if (!isClient) return null;

  const currentPlaceholder = placeholder && placeholder !== "Search products..." 
    ? placeholder 
    : rotatingPlaceholders[currentPlaceholderIndex];

  return (
    <div
      className={`relative flex flex-col items-center h-full w-full ${className}`}
      style={customStyles}
    >
      {/* Input Component */}
      <div className="relative w-full">
        <Input
          placeholder=""
          value={searchQuery}
          onChange={(e: any) => handleSearch(e)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`pl-3 !bg-white border-[1px] border-[#d9d9d9] border-solid md:text-base text-xs lg:text-sm w-full h-[47px] shadow-lg text-fontGray rounded-[5px] mr-[1px] ${
            isExpanded ? 'w-full' : 'w-12 h-12 rounded-lg'
          }`}
        />
        
        {/* Animated Placeholder */}
        {!searchQuery && (
          <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
            <div 
              className={`pl-3 text-gray-400 text-sm transition-all duration-1200 ease-out ${
                isAnimating ? 'transform -translate-y-6 opacity-0' : 'transform translate-y-0 opacity-100'
              }`}
            >
              {currentPlaceholder}
            </div>
          </div>
        )}
      </div>

      {/* Search Icon */}
      <span className="absolute inset-y-0 right-3 flex items-center text-fontGray">
        <Search size={16} color="#A92449" className="text-secondary" />
      </span>

      {/* Render search results grouped by type */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-14 z-50 w-full bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto"
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

                  <p className="font-semibold text-sm text-center mb-4">
                    Oops, looks like there's nothing here. Try adjusting your
                    search again!
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Products Section */}
              {products.length > 0 && (
                <div>
                  {products.map((product: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          if (onChange) onChange("");
                          if (onDropdownToggle) onDropdownToggle(false);
                          router.refresh();
                          router.push(`/${product?.slug}`);
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

              {/* Sub Categories Section */}
              {subCategories.length > 0 && (
                <div>
                  {subCategories.map((subCategory, index) => {
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          if (onChange) onChange("");
                          if (onDropdownToggle) onDropdownToggle(false);
                          router.refresh();
                          router.push(`/products/?scid=${subCategory?.id}`);
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

              {/* Vendors Section */}
              {vendors.length > 0 && (
                <div>
                  {vendors.map((vendor, index) => {
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          if (onChange) onChange("");
                          if (onDropdownToggle) onDropdownToggle(false);
                          router.refresh();
                          router.push(`/brands/${vendor?.businessInfo?.slug}`);
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
    </div>
  );
};

export default SearchBar;
