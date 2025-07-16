"use client";
import React, { memo, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import useApi from "@/components/Fetcher/useAPI";
import * as getEndpoint from "../../../network/EndPoints";
import toast from "react-hot-toast";
import { PriceRangeSlider } from "./RangeSlider";
// import { useDispatch } from "react-redux";
// import store from "@/reduxStore";
import VendorFiltersList from "./productfilters/VendorFiltersList";
// import { Input } from "@/components/ui/input";
import CategoryFiltersList from "./productfilters/CategoryFiltersList";
import AttributeFilters from "./productfilters/AttributeFilters";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface FilterProps {
  onVendorSelectionChange: (data: any) => void; // Function prop to handle selected vendors
  onChildCategorySelectionChange: (data: any) => void;
  onSubCategorySelectionChange: (data: any) => void;
  onPirceRangeChange: (data: any) => void;
  onSelectAttributeChange: (data: any) => void;
}

const FiltersSidebar: React.FC<FilterProps> = ({
  onVendorSelectionChange,
  onChildCategorySelectionChange,
  onSubCategorySelectionChange,
  onPirceRangeChange,
  onSelectAttributeChange,
}) => {
  const [minPrice, setMinPrice] = useState<any>(null);
  const [maxPrice, setMaxPrice] = useState<any>(null);
  const [priceRange, setPriceRange] = useState<any>([0, 98432432]);
  const [selectedFilters, setSelectedFilters] = useState<any>({
    vendors: [],
    categories: [],
    childCats: [],
    attributes: [],
    priceRange: [],
  });
  const router = useRouter();
  const [refreshp, setRefreshp] = useState<any>(0);
  const [refresht, setRefresht] = useState<any>(0);

  // State Management
  const buyerInfo = sessionStorage.getItem("buyerUserInfo") as any;
  const prefferedPlan = JSON.parse(buyerInfo)?.preferredPlan;
  const buyerType = JSON.parse(buyerInfo)?.buyerInfo?.buyerType;
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [productsData, setProductsData] = useState<any>([]);
  const [limit, setLimit] = useState(12);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gridLoading, setGridLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter States
  const [planType, setPlanType] = useState<string>(prefferedPlan || null);
  const [brandCode, setBrandCode] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [isSingle, setIsSingle] = useState(false);
  const [catId, setCatId] = useState<any>(null);
  const [subCatId, setSubCatId] = useState<any>(null);
  const [childCatId, setChildCatId] = useState<any>(null);
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [isReturnable, setIsReturnable] = useState(false);
  const [isRefundable, setIsRefundable] = useState(false);
  const [isCancellable, setIsCancellable] = useState(false);
  const [vendorCode, setVendorCode] = useState<any>([]);
  const [vendorSlug, setVendorSlug] = useState("");
  const [priceRangeObj, setPriceRangeObj] = useState<any>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<any>([]);
  const [sortBy, setSortBy] = useState("");
  const [filter, setFilter] = useState();
  const [paramsObj , setParamsObj] = useState()

  const { callApi } = useApi();

  useEffect(() => {
    getFliters();
  }, [
    catId,
    subCatId,
    childCatId,
    selectedAttributes,
    // priceRangeObj,
    // vendorCode,
  ]);

  // useEffect(() => {
  //   // Update price range whenever minPrice or maxPrice changes
  //   setPriceRange([minPrice, maxPrice]);
  // }, [minPrice, maxPrice]);

  const buildUrl = (baseUrl: string, params: Record<string, any>) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, String(value));
      }
    });
    return `${baseUrl}?${queryParams.toString()}`;
  };

  const getFliters = async () => {
    setGridLoading(true);
    try {
      // Debug log for subCatId and childCatId
      console.log('DEBUG getFliters', { subCatId, childCatId });
      const params = {
        page: page || null,
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
      // const result = (await callApi(getEndpoint.default.FLITERS, "GET")) as any;
      // console.log("check in product productfilter.tsx", selectedAttributes);
      const apiUrl = buildUrl(getEndpoint.default.FLITERS, params);
      const result = (await callApi(apiUrl, "GET")) as any;
      setFilter(params);

      if (result.data == null) {
        handleApiError(result.errorData);
      } else {
        setMaxPrice(result?.data[1]?.data[0]?.highestAmount);
        setMinPrice(result?.data[1]?.data[0]?.lowestAmount);
        setPriceRange([
          result?.data[1]?.data[0]?.lowestAmount,
          result?.data[1]?.data[0]?.highestAmount,
        ]);
      }
    } catch (error) {
      handleApiError(error);
    }
    finally{
      setGridLoading(false);
    }
  };

  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  // Handle Price Change
  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    onPirceRangeChange(newRange);
    setSelectedFilters((prev: any) => ({ ...prev, priceRange: newRange }));
    setPriceRangeObj(newRange);
  };

  const filterWithVendors = (vendors: any) => {
    onVendorSelectionChange(vendors);
    setSelectedFilters((prev: any) => ({ ...prev, vendors }));
    setVendorCode(vendors);
    const params = {
      page: page || null,
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
      vendorIdOrSlug: vendors || null,
      PriceSort: sortBy || null,
      productAttributes: selectedAttributes || null,
    };
    setParamsObj(params)
  };

  const filterWithChildCategories = (data: { childId: any, subCategoryId: any }) => {
    onChildCategorySelectionChange(data.childId);
    setSelectedFilters((prev: any) => ({ ...prev, childCats: [data.childId] }));
    setChildCatId(data.childId);
    setSubCatId(data.subCategoryId);
  };

  const filterWithCategories = (categories: any) => {
    onSubCategorySelectionChange(categories);
    setSelectedFilters((prev: any) => ({ ...prev, categories }));
    setSubCatId(categories);
  };

  // const filterWithAttrs = (attributes: any) => {
  //   // console.log('Original Attributes:', attributes);

  //   // Create a new object to hold the transformed attributes
  //   const transformedAttributes: any = {};

  //   // Iterate through each key in the attributes object
  //   Object.keys(attributes).forEach((key) => {

  //     const values = attributes[key];

  //     // If the value is an array, split into separate entries
  //     if (Array.isArray(values)) {
  //       values.forEach((value) => {
  //         // console.log('cevwrbte',key,value)
  //         if (!transformedAttributes[key]) {
  //           transformedAttributes[key] = [value];
  //         } else {
  //           transformedAttributes[key] = [value];
  //         }
  //       });
  //     } else {
  //       // If it's not an array, copy as-is
  //       transformedAttributes[key] = values;
  //     }
  //   });

  //   // console.log('Transformed Attributes:', transformedAttributes);
  //   onSelectAttributeChange(transformedAttributes);
  //   setSelectedFilters((prev: any) => ({ ...prev, attributes: transformedAttributes }));

  // };

  const filterWithAttrs = (attributes: any) => {

    // console.log('check waht are coming before', attributes)
    // const transformedAttributes = [] as any;

    // // Iterate over each key in the attributes object
    // Object.keys(attributes).forEach((key) => {
    //   const values = attributes[key];

    //   if (Array.isArray(values)) {
    //     values.forEach((value) => {
    //       transformedAttributes.push(`${key}:${value}`);
    //     });
    //   } else {
    //     transformedAttributes.push(`${key}:${values}`);
    //   }
    // });
    onSelectAttributeChange(attributes);
    setSelectedFilters((prev: any) => ({
      ...prev,
      attributes: attributes,
    }));
    setSelectedAttributes(attributes)
  };

  // const filterWithAttrs = (data: any) => {
  //   setSelectedAttributes(data);
  // };

  // alert(`'current value of refreshp: ${refreshp}`)

  const handleClearAll = () => {
    setSelectedFilters({
      vendors: [],
      categories: [],
      childCats: [],
      attributes: [],
      priceRange: [],
    });
    onVendorSelectionChange([]);
    onChildCategorySelectionChange([]);
    onSubCategorySelectionChange([]);
    onPirceRangeChange([]);
    onSelectAttributeChange([]);
    setRefresht((refresht: any) => refresht + 1);
    setRefreshp((refreshp: any) => refreshp + 1);

    const url = window.location.href;

    // Find the index of the '?'
    const queryIndex = url.indexOf("?");

    // If there are query parameters, remove them
    if (queryIndex !== -1) {
      const newUrl = url.substring(0, queryIndex); // Keep only the part before '?'
      window.history.replaceState(null, "", newUrl); // Update the URL without reloading the page
    }
    // window.location.href()
  };

  return (
    <div className="w-full bg-[#F4F4F4] p-4 opacity-90 cursor-pointer">
      <div className="flex items-center justify-between mb-4 border-b border-borderGray pb-2">
        <h2 className="text-xl font-medium  ">Filters</h2>
        {Object.entries(selectedFilters).some(([key, filter]) => {
          return (
            key !== "priceRange" && Array.isArray(filter) && filter.length > 0
          );
        }) && (
          <button
            onClick={handleClearAll}
            className="flex items-center cursor-pointer text-sm font-medium text-secondary bg-secondary/10 p-2 rounded h-[35px]"
          >
            <IoClose className="mr-2 text-secondary" />
            Clear All
          </button>
        )}
      </div>
      <div className="max-h-[1030px] overflow-y-scroll no-scrollbar">
        {/* CATEGORIES FILTER */}
        <CategoryFiltersList
          onCategorySelectionChange={filterWithChildCategories}
          onChangeParentSelectionChange={filterWithCategories}
          refresh={refreshp}
        />

        {/* PRICE RANGE FILTER */}
        <div className="mt-2 mb-4 border-b border-borderGray">
          <h3 className="text-sm font-semibold mb-8 flex items-center justify-between">
            PRICE RANGE
          </h3>
          <div className="relative mb-4">
            <PriceRangeSlider
              min={minPrice}
              max={maxPrice}
              step={1}
              value={priceRange}
              onValueChange={handlePriceChange}
              refresh={refresht}
            />
          </div>
        </div>

        {/* VENDORS FILTER */}
        <VendorFiltersList
          onVendorSelectionChange={filterWithVendors}
          vendors={[]}
          refresh={refreshp}
          filter={filter}
        />

        {/* ATTRIBUTES FILTER */}

        <AttributeFilters
          onSelectAttributeSelection={filterWithAttrs}
          refresh={refreshp}
          catId={catId}
          subCatId={subCatId}
          childCatId={childCatId}
          check={paramsObj}
        />
      </div>
    </div>
  );
};

export default FiltersSidebar;
