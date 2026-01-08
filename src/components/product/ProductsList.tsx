"use client";
import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FiltersSidebar from "./Filters/ProductsFilter";
import ProductGrid from "./ProductsGrid";
import { toast } from "react-hot-toast";
import * as getEndpoint from "../../network/EndPoints";
import useRefreshToken from "../hooks/useRefreshToken";
import useApi from "../Fetcher/useAPI";
import SearchInput from "../sharedComponents/searchInput";
import EmptyProducts from "./EmptyProducts";
import { Skeleton } from "../ui/skeleton";
import { usePathname, useSearchParams } from "next/navigation";
import BannerSection from "../sharedComponents/BannerSection";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  catSlug?: string;
  subCatSlug?: string;
  childCatSlug?: string;
  ccid?: string | string[];
  scid?: string | string[];
  initialH1Tag?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ProductsList: React.FC<Props> = ({
  catSlug,
  subCatSlug,
  childCatSlug,
  ccid,
  scid,
  initialH1Tag,
  searchParams: pageSearchParams,
}) => {
  const searchParams = useSearchParams();
  const buyerInfo = sessionStorage.getItem("buyerUserInfo") as any;
  const prefferedPlan = JSON.parse(buyerInfo ?? "{}")?.preferredPlan;
  const buyerType = JSON.parse(buyerInfo ?? "{}")?.buyerInfo?.buyerType;

  // State Management
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [productsData, setProductsData] = useState<any[]>([]);
  const [limit, setLimit] = useState(30);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gridLoading, setGridLoading] = useState(true);
  const [h1Tag, setH1Tag] = useState<string>("Featured Sustainable Products");

  // Filter States
  const [planType, setPlanType] = useState<string>(prefferedPlan || "");
  const [brandCode, setBrandCode] = useState<string>("");
  const [purchaseType, setPurchaseType] = useState<string>("");
  const [isSingle, setIsSingle] = useState(false);
  const [catId, setCatId] = useState<string | null>(null);
  const [subCatId, setSubCatId] = useState<string | null>(null);
  const [childCatId, setChildCatId] = useState<string | null>(null);
  const [country, setCountry] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isReturnable, setIsReturnable] = useState(false);
  const [isRefundable, setIsRefundable] = useState(false);
  const [isCancellable, setIsCancellable] = useState(false);
  const [vendorCode, setVendorCode] = useState<any[]>([]);
  const [vendorSlug, setVendorSlug] = useState<string>("");
  const [priceRangeObj, setPriceRangeObj] = useState<any[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  const { refreshTokens } = useRefreshToken();
  const { callApi } = useApi();
  const pathname = usePathname();

  // Update h1tag when searchParams change
  useEffect(() => {
    const currentCcid = searchParams.get('ccid');
    const currentScid = searchParams.get('scid');
    
    // If no category parameters are present, reset to default
    if (!currentCcid && !currentScid) {
      setH1Tag('Featured Sustainable Products');
      return;
    }
    
    // If we have parameters, fetch the appropriate h1tag
    fetchH1Tag();
  }, [searchParams]);

  // Function to fetch H1 tag from API
  const fetchH1Tag = async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const currentCcid = searchParams.get('ccid');
    const currentScid = searchParams.get('scid');

    try {
      if (currentCcid) {
        // Fetch from child category
        const res = await fetch(
          `${baseURL}/childCategories/getChildCategoryByIdPublic/${currentCcid}`,
          {
            cache: "no-store",
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (data?.h1Tag) {
            setH1Tag(data.h1Tag);
            return;
          }
        }
      } else if (currentScid) {
        // Fetch from subcategory
        const res = await fetch(
          `${baseURL}/subcategories/getSubcategoryByIdPublic/${currentScid}`,
          {
            cache: "no-store",
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (data?.h1Tag) {
            setH1Tag(data.h1Tag);
            return;
          }
        }
      }

      // If no H1 tag found, use initialH1Tag or default
      setH1Tag('Featured Sustainable Products');
    } catch (err) {
      console.error("Error fetching h1Tag:", err);
      setH1Tag('Featured Sustainable Products');
    }
  };

  // Set initial state from props if provided
  useEffect(() => {
    if (catSlug) setCatId(catSlug);
    if (subCatSlug) setSubCatId(subCatSlug);
    if (childCatSlug) setChildCatId(childCatSlug);
    if (scid) setSubCatId(typeof scid === "string" ? scid : scid[0]);
    if (ccid) setChildCatId(typeof ccid === "string" ? ccid : ccid[0]);
  }, [catSlug, subCatSlug, childCatSlug, ccid, scid]);



  // Reset options on path change
  useEffect(() => {
    const resetOptions = () => {
      setCatId(searchParams?.get("cid") || null);
      setSubCatId(searchParams?.get("scid") || null);
      setChildCatId(searchParams?.get("ccid") || null);
    };
    // resetOptions();
  }, [pathname, searchParams]);

  // // Fetch products when filters change
  // useEffect(() => {
  //   getProducts(1);
  // }, [
  //   // searchParams,
  //   vendorCode,
  //   catId,
  //   subCatId,
  //   childCatId,
  //   priceRangeObj,
  //   selectedAttributes,
  //   sortBy,
  // ]);

  // // Fetch products when search term changes
  // useEffect(() => {
  //   getProducts(1);
  // }, [searchTerm]);


  // Debounced API call when filters or search term change
useEffect(() => {
  const timeout = setTimeout(() => {
    getProducts(1);
  }, 300); // waits 500ms after the last change before calling API

  // cleanup if filters change again before 500ms
  return () => clearTimeout(timeout);
}, [
  vendorCode,
  catId,
  subCatId,
  childCatId,
  priceRangeObj,
  selectedAttributes,
  sortBy,
  searchTerm,
]);


  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("No Products to display");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getProducts(page);
    } else {
      toast.error(result?.data?.message);
    }
  };

  const buildUrl = (baseUrl: string, params: Record<string, any>) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) {
        queryParams.append(key, String(value));
      }
    });
    return `${baseUrl}?${queryParams.toString()}`;
  };

  const handleChange = (newPage: number) => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (newPage !== page) {
      getProducts(newPage);
    }
  };

  const getProducts = async (page?: number) => {
    // setGridLoading(true);
    try {
      const params = {
        page: page ?? null,
        limit,
        searchTerm: searchTerm || null,
        planType:
          planType === "FREE" || planType === "PAID" ? planType : undefined,
        brandId: brandCode || null,
        purchaseType: purchaseType || null,
        isSingleProduct: isSingle || null,
        categoryId: catId || null,
        subCategoryId: subCatId || null,
        childCategories: childCatId || null,
        targetCustomer: buyerType || null,
        countryOfOrigin: country || null,
        status: status || null,
        isReturnable: isReturnable || null,
        isCancellable: isCancellable || null,
        priceRange: priceRangeObj ? priceRangeObj.join("-") : null,
        isRefundable: isRefundable || null,
        vendorIdOrSlug: vendorCode || null,
        PriceSort: sortBy || null,
        productAttributes: selectedAttributes || null,
      };

      const apiUrl = buildUrl(getEndpoint.default.PRODUCTSLIST, params);
      const result = (await callApi(apiUrl, "GET")) as any;

      if (result?.data == null) {
        handleApiError(result?.data?.errorData);
      } else {
        setProductsData(result?.data?.data ?? []);
        setTotalPage(result?.data?.metadata?.totalCount ?? 0);
        setPage(result?.data?.metadata?.currentPage ?? 1);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setGridLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const trimmedValue = value.trim();

    if (trimmedValue.length > -1) {
      setSearchTerm(value);
    }
  };

  const ProductCardSkeleton = () => {
    return (
      <div className="w-full grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="border w-full rounded border-slate-300 shadow-sm justify-start text-left p-5 mb-5"
          >
            <div className="w-full">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-[314px] w-full mb-2" />
            </div>
            <div className="flex justify-between self-end mt-4 space-x-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Filter handlers
  const filterWithVendors = (vendors: string) => {
    //@ts-ignore
    setVendorCode(vendors);
  };

  const filterWithSubCategories = (subCategories: string) => {
    setSubCatId(subCategories);
  };

  const filterWithChildCategories = (childCategories: string) => {
    // console.log("params from fun", childCategories);
    setChildCatId(childCategories);
  };
  const filterWithPrice = (data: any) => {
    setPriceRangeObj(data);
  };

  const filterWithAttrs = (data: any) => {
    setSelectedAttributes(data);
  };

  const handleSelectSortBy = (value: string) => {
    setSortBy(value === "Default" ? "" : value);
  };

  return (
    <>
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: h1Tag, href: "/products" }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 md:px-24 md:pt-16 pt-6 bg-cream">
      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block col-span-3">
        <FiltersSidebar
          onVendorSelectionChange={filterWithVendors}
          onChildCategorySelectionChange={filterWithChildCategories}
          onSubCategorySelectionChange={filterWithSubCategories}
          onPirceRangeChange={filterWithPrice}
          onSelectAttributeChange={filterWithAttrs}
        />
      </div>

      {/* Mobile/Tablet Filter Button and Sheet */}
      <div className="lg:hidden fixed bottom-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="bg-primary text-cream p-3 rounded-full shadow-lg flex items-center space-x-2 hover:bg-primary/90 transition-colors"
              aria-label="Open Filters"
            >
              <Filter className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] pt-10 bg-cream">
            <FiltersSidebar
              onVendorSelectionChange={filterWithVendors}
              onChildCategorySelectionChange={filterWithChildCategories}
              onSubCategorySelectionChange={filterWithSubCategories}
              onPirceRangeChange={filterWithPrice}
              onSelectAttributeChange={filterWithAttrs}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="col-span-12 lg:col-span-9">
        <div className="block md:flex md:justify-between mb-8 px-4 items-center">
          <h1 className="text-brown font-bold text-2xl md:text-3xl mt-[20px] md:mt-0">
            {h1Tag}
          </h1>
          <div className="flex justify-end items-center">
            <div className="h-[40px] md:flex w-full md:w-56 mt-4 md:mt-0 mobile-sm:hidden">
              {/* <SearchInput
                customStyles="!top-[0px]"
                placeholder="Search Product"
                onChange={handleInputChange}
              /> */}
            </div>
            {/* <div className="h-[40px] md:flex w-full md:w-fit mt-4 md:mt-0 mobile-sm:hidden ml-3">
              <Select value={sortBy} onValueChange={handleSelectSortBy}>
                <SelectTrigger className="select-trigger h-[43px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="select-content">
                  <SelectGroup>
                    {["Default", "ASC", "DSC"].map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className={` ${
                          (sortBy == "ASC" || sortBy == "DSC") && "flex gap-2"
                        } px-2 w-full`}
                      >
                        {option === "ASC"
                          ? "Price Low to High"
                          : option === "DSC"
                          ? "Price High to Low"
                          : "Default"}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {gridLoading ? (
            <ProductCardSkeleton />
          ) : (
            <>
              {productsData.length > 0 ? (
                <ProductGrid
                  productsData={productsData}
                  totalPage={totalPage}
                  handleChangePage={handleChange}
                  page={page}
                />
              ) : (
                <EmptyProducts searchterm={searchTerm} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductsList;
