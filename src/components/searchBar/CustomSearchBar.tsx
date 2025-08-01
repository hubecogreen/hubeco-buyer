"use client";
import React, { useState, useRef, useEffect } from "react";
// import { IoMdSearch } from "react-icons/io";
// import CustomInput from "../customInput/CustomTextField";
import useApi from "../Fetcher/useAPI";
import useRefreshToken from "../hooks/useRefreshToken";
import * as getEndpoint from "../../network/EndPoints";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { set } from "lodash";
import Lottie from "lottie-react";
import animationData from "../../../public/animations/nodatafound.json";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import useClient from "../hooks/useClient";
import { normalizePath } from "@/lib/utils";

interface CustomSearchBarProps {
  customStyles?: React.CSSProperties; // Custom styles object
  placeholder: string;
}

const SearchBar: React.FC<CustomSearchBarProps> = ({
  customStyles,
  placeholder,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [childCategories, setChildCategories] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [noSearch, setNoSearch] = useState(false);
  const [targetedCustomer, setTargetedCustomer] = useState<string>("not_set");
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const isClient = useClient();

  // Ref for the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

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
    const searVal = value.trim();
    // if(searVal.length>2)
    // {
    //   setIsDropdownOpen(true);
    // }else{
    //   setIsDropdownOpen(false);
    // }
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
          setIsDropdownOpen(true); // Show dropdown if there are results
          if (result && result?.data && result?.data?.length > 0) {
            // Prioritize results to fit within a limit of 25
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
            // Filter data by type
            const products = result?.data.filter(
              (item: any) =>
                item.type === myKeys[0] &&
                (item.targetCustomer ===
                  (targetedCustomer === "not_set" ? "ALL" : targetedCustomer) ||
                  item.targetCustomer === "ALL")
            );
            // const categories = result?.data.filter(
            //   (item: any) => item.type === "dev_category"
            // );
            const subCategories = result?.data.filter(
              (item: any) => item.type === myKeys[1]
            );
            const childCategories = result?.data.filter(
              (item: any) => item.type === myKeys[2]
            );
            // const brands = result?.data.filter(
            //   (item: any) => item.type === "dev_brands"
            // );
            const vendors = result?.data.filter(
              (item: any) => item.type === myKeys[3]
            );

            // Calculate maximum results to display for each type
            const productCount = Math.min(products.length, maxResults);
            const categoryCount = Math.min(
              categories.length,
              maxResults - productCount
            );
            const subCategoryCount = Math.min(
              subCategories.length,
              maxResults - productCount - categoryCount
            );
            const childCategoryCount = Math.min(
              childCategories.length,
              maxResults - productCount - categoryCount - subCategoryCount
            );
            const brandCount = Math.min(
              brands.length,
              maxResults -
                productCount -
                categoryCount -
                subCategoryCount -
                childCategoryCount
            );
            const vendorCount = Math.min(
              vendors.length,
              maxResults -
                productCount -
                categoryCount -
                subCategoryCount -
                childCategoryCount -
                brandCount
            );

            // Update states with limited results
            // setProducts(products.slice(0, productCount));
            // setCategories(categories.slice(0, categoryCount));
            // setSubCategories(subCategories.slice(0, subCategoryCount));
            // setChildCategories(childCategories.slice(0, childCategoryCount));
            // setBrands(brands.slice(0, brandCount));
            // setVendors(vendors.slice(0, vendorCount));

            setProducts(products);
            // setCategories(categories);
            setSubCategories(subCategories);
            setChildCategories(childCategories);
            // setBrands(brands);
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
    setIsDropdownOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
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
          // console.log("targetedCustomer", buyer?.buyerInfo?.buyerType);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="relative flex flex-col items-center h-full w-full"
      style={customStyles}
    >
      {/* Input Component */}
      <Input
        placeholder={placeholder}
        value={searchQuery ? searchQuery : ""}
        onChange={(e: any) => handleSearch(e)}
        className="pl-3 !bg-white border-[1px] border-[#d9d9d9] border-solid md:text-base text-xs lg:text-sm w-full h-[47px] shadow-lg text-fontGray rounded-[5px] mr-[1px]"
      />

      {/* Search Icon */}
      <span className="absolute inset-y-0 right-3 flex items-center text-fontGray ">
        <Search size={16} color="#A92449" className="text-secondary" />
      </span>
      {/* <Input
        placeholder={placeholder}
        value={searchQuery?searchQuery:''}
        onChange={(e:any)=>handleSearch(e)}
        style={{borderRadius:"5px"}}
        className="pl-3 !bg-white border-1 border-[#d9d9d9] border-solid md:text-base text-sm  w-full h-12 shadow-lg text-sm text-fontGray rounded-lg bg-black h-[47px] mr-[1px]"
      /> */}

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
                  <Lottie
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
                  {/* <h3 className="text-md font-semibold p-2 mt-1">Products</h3> */}
                  {products.map((product: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setSearchQuery("");
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
                  {/* <h3 className="text-md font-semibold p-2 mt-1">
                    Sub Categories
                  </h3> */}
                  {subCategories.map((subCategory, index) => {
                    // console.log("SearchsubCategory", subCategory);
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        // onClick={() => handleResultClick(subCategory)}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          router.refresh();
                          router.push(`/products/?scid=${subCategory?.id}`);
                        }}
                      >
                        <div className="flex justify-start items-center">
                          {subCategory && subCategory?.image && (
                            <Image
                              // src={
                              //   subCategory && subCategory?.image
                              //     ? (
                              //         assetURL +
                              //         "/" +
                              //         subCategory?.image
                              //       ).includes("//admin")
                              //       ? (
                              //           assetURL +
                              //           "/" +
                              //           subCategory?.image
                              //         ).replace("//admin", "/admin")
                              //       : `${assetURL}/${subCategory?.image}`
                              //     : "/images/product-placeholder.webp"
                              // }
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

              {/* Child Categories Section */}
              {/* {childCategories.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold p-2 mt-1">
                    Child Categories
                  </h3>
                  {childCategories.map((childCategory, index) => {
                    // console.log("SearchchildCategory", childCategory);
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        // onClick={() => handleResultClick(childCategory)}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          router.refresh();
                          router.push(`/products/?ccid=${childCategory?.id}`);
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
              )} */}

              {/* Vendors Section */}
              {vendors.length > 0 && (
                <div>
                  {/* <h3 className="text-md font-semibold p-2 mt-1">Vendors</h3> */}
                  {vendors.map((vendor, index) => {
                    // console.log("Searchvendor", vendor?.businessInfo?.logo);
                    return (
                      <div
                        key={index}
                        className="px-[10px] py-[10px] group hover:bg-gray-200 cursor-pointer border-b border-[#f4f4f4]"
                        // onClick={() => handleResultClick(vendor)}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                          router.refresh();
                          router.push(`/vendors/${vendor?.businessInfo?.slug}`);
                        }}
                      >
                        <div className="flex justify-start items-center">
                          {vendor &&
                            vendor?.businessInfo &&
                            vendor?.businessInfo?.logo && (
                              <Image
                                // src={
                                //   vendor &&
                                //   vendor?.businessInfo &&
                                //   vendor?.businessInfo?.logo
                                //     ? (
                                //         assetURL +
                                //         "/" +
                                //         vendor?.businessInfo?.logo
                                //       ).includes("//admin")
                                //       ? (
                                //           assetURL +
                                //           "/" +
                                //           vendor?.businessInfo?.logo
                                //         ).replace("//admin", "/admin")
                                //       : `${assetURL}/${vendor?.businessInfo?.logo}`
                                //     : "/images/product-placeholder.webp"
                                // }
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
        // <div className="absolute top-14 z-50 w-full bg-white shadow-lg rounded-lg max-h-64 overflow-y-auto">
        //   <p className="text-black text-md py-2 px-2 font-medium">Coming Soon</p>
        // </div>
      )}
    </div>
  );
};

export default SearchBar;
