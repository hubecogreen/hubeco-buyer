"use client";
import React, { useEffect, useState } from "react";
import useApi from "@/components/Fetcher/useAPI";
import * as getEndpoint from "../../../../network/EndPoints";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface VendorFiltersListProps {
  onSelectAttributeSelection: (data: any) => void;
  refresh: any;
  catId: any;
  subCatId: any;
  childCatId: any;
  check: any;
}
const AttributeFilters: React.FC<VendorFiltersListProps> = ({
  onSelectAttributeSelection,
  refresh,
  catId,
  subCatId,
  childCatId,
  check
}) => {
  const { callApi } = useApi();
  const [attributes, setAttributes] = useState<any>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<any>([]);
  // console.log('check', check)
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
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [isReturnable, setIsReturnable] = useState(false);
  const [isRefundable, setIsRefundable] = useState(false);
  const [isCancellable, setIsCancellable] = useState(false);
  const [vendorCode, setVendorCode] = useState<any>([]);
  const [vendorSlug, setVendorSlug] = useState("");
  const [priceRangeObj, setPriceRangeObj] = useState<any>([]);
  const [sortBy, setSortBy] = useState("");

  // useEffect(() => {
  //   getFliters();
  // }, [catId, subCatId, check,childCatId]);

  // useEffect(() => {
  //   if (refresh) {
  //     setSelectedAttributes([]);
  //     getFliters(true);
  //   }
  // }, [refresh,check]);


  // Debounced filter fetching when category states change
  useEffect(() => {
    const timeout = setTimeout(() => {
      getFliters();
    }, 300); // wait 400ms before firing API

    return () => clearTimeout(timeout); // cancel previous timer if any dep changes again
  }, [catId, subCatId, check, childCatId]);

  // Debounced refresh handling
  useEffect(() => {
    if (refresh) {
      const timeout = setTimeout(() => {
        setSelectedAttributes([]);
        getFliters(true);
      }, 400); // debounce refresh call as well

      return () => clearTimeout(timeout);
    }
  }, [refresh, check]);


  const buildUrl = (baseUrl: string, params: Record<string, any>) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, String(value));
      }
    });
    return `${baseUrl}?${queryParams.toString()}`;
  };

  // const getFliters = async (clearParms = false) => {
  //   try {
  //     const params = {
  //       page: page || null,
  //       limit,
  //       searchTerm: searchTerm || null,
  //       planType:
  //         planType === "FREE" || planType === "PAID" ? planType : undefined,
  //       brandId: brandCode || null,
  //       purchaseType: purchaseType || null,
  //       isSingleProduct: isSingle || null,
  //       categoryId: catId || null,
  //       subCategoryId: subCatId || null,
  //       childCategories: childCatId || null,
  //       targetCustomer: buyerType || null,
  //       countryOfOrigin: country || null,
  //       status: status || null,
  //       isReturnable: isReturnable || null,
  //       isCancellable: isCancellable || null,
  //       priceRange: priceRangeObj ? priceRangeObj.join("-") : null,
  //       isRefundable: isRefundable || null,
  //       vendorIdOrSlug: vendorCode || null,
  //       PriceSort: sortBy || null,
  //       productAttributes: selectedAttributes || null,
  //     };

  //     // console.log("check in product attributefilters.tsx", selectedAttributes);
  //     // const result = (await callApi(getEndpoint.default.FLITERS, "GET")) as any;
  //     // const result = (await callApi(getEndpoint.default.FLITERS, "GET")) as any;
  //     const apiUrl = buildUrl(
  //       getEndpoint.default.FLITERS,
  //       clearParms ? {} : params
  //     );
  //     const result = (await callApi(apiUrl, "GET")) as any;
  //     if (result.data == null) {
  //       handleApiError(result.errorData);
  //     } else {
  //       setAttributes(result?.data[0]?.data);
  //     }
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  // };

  const getFliters = async (clearParms = false) => {
    setGridLoading(true);
    try {
      // If selectedAttributes is an object, we need to convert it to the expected format
      let formattedAttributes = selectedAttributes;

      // Check if selectedAttributes is an object rather than an array of strings
      if (selectedAttributes && typeof selectedAttributes === 'object' && !Array.isArray(selectedAttributes)) {
        formattedAttributes = [];
        // Convert from object format to array of strings format
        Object.entries(selectedAttributes).forEach(([key, values]) => {
          if (Array.isArray(values)) {
            values.forEach((value) => {
              formattedAttributes.push(`${key}:${value}`);
            });
          }
        });
      }

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
        productAttributes: formattedAttributes || null,
      };

      // console.log("check in product attributefilters.tsx", formattedAttributes);
      const apiUrl = buildUrl(
        getEndpoint.default.FLITERS,
        clearParms ? {} : check ?? params
      );
      const result = (await callApi(apiUrl, "GET")) as any;
      if (result.data == null) {
        handleApiError(result.errorData);
      } else {
        setAttributes(result?.data[0]?.data);
      }
    } catch (error) {
      handleApiError(error);
    }
    finally {
      setGridLoading(false);
    }
  }

  // const onSelectAttribute = (data: any, att: any) => {
  //   setSelectedAttributes((prevSelectedAttributes: any) => {
  //     // Clone the previous attributes to avoid mutation
  //     const updatedAttributes = { ...prevSelectedAttributes };
  //     const attributeKey = data._id;

  //     // If the attributeKey doesn't exist, initialize it as an empty array
  //     if (!updatedAttributes[attributeKey]) {
  //       updatedAttributes[attributeKey] = [];
  //     }

  //     // Check if the value is already selected
  //     const valueIndex = updatedAttributes[attributeKey].indexOf(att);

  //     if (valueIndex !== -1) {
  //       // If the value exists, remove it from the array
  //       updatedAttributes[attributeKey].splice(valueIndex, 1);
  //     } else {
  //       // If the value doesn't exist, add it to the array
  //       updatedAttributes[attributeKey].push(att);
  //     }

  //     // console.log("Updated Attributes:", updatedAttributes);

  //     // Pass the updated object to the callback
  //     onSelectAttributeSelection(updatedAttributes);

  //     return updatedAttributes;
  //   });
  // };

  // const onSelectAttribute = (data: any, att: any) => {
  //   setSelectedAttributes((prevSelectedAttributes: any) => {
  //     // Clone the previous attributes to avoid mutation
  //     const updatedAttributes = { ...prevSelectedAttributes };
  //     const attributeKey = data._id;

  //     // If the attributeKey doesn't exist, initialize it as an empty array
  //     if (!updatedAttributes[attributeKey]) {
  //       updatedAttributes[attributeKey] = [];
  //     }

  //     // Check if the value is already selected
  //     const valueIndex = updatedAttributes[attributeKey].indexOf(att);

  //     if (valueIndex !== -1) {
  //       // If the value exists, remove it from the array
  //       updatedAttributes[attributeKey].splice(valueIndex, 1);
  //     } else {
  //       // If the value doesn't exist, add it to the array
  //       updatedAttributes[attributeKey].push(att);
  //     }

  //     // Transform updatedAttributes into an array of "key:value" format
  //     const transformedAttributes = Object.entries(updatedAttributes).flatMap(
  //       ([key, values]) => values.map((value: any) => `${key}:${value}`)
  //     );

  //     // console.log("Updated Attributes:", transformedAttributes);

  //     // Pass the transformed attributes to the callback
  //     onSelectAttributeSelection(transformedAttributes);

  //     return transformedAttributes;
  //   });
  // };

  const onSelectAttribute = (data: any, att: any) => {
    setSelectedAttributes((prevSelectedAttributes: any) => {
      // Clone the previous attributes to avoid mutation
      const updatedAttributes = { ...prevSelectedAttributes };
      const attributeKey = data._id;

      // If the attributeKey doesn't exist, initialize it as an empty array
      if (!updatedAttributes[attributeKey]) {
        updatedAttributes[attributeKey] = [];
      }

      // Check if the value is already selected
      const valueIndex = updatedAttributes[attributeKey].indexOf(att);

      if (valueIndex !== -1) {
        // If the value exists, remove it from the array
        updatedAttributes[attributeKey].splice(valueIndex, 1);
      } else {
        // If the value doesn't exist, add it to the array
        updatedAttributes[attributeKey].push(att);
      }

      // Transform updatedAttributes into an array of "key:value" format
      const transformedAttributes = [];

      Object.entries(updatedAttributes).forEach(([key, values]) => {
        if (Array.isArray(values) && values.length > 0) {
          values.forEach((value) => {
            transformedAttributes.push(`${data._id}:${value}`);
          });
        }
      });

      // console.log("Updated Attributes:", transformedAttributes);

      // Pass the transformed attributes to the callback
      onSelectAttributeSelection(transformedAttributes);

      // Return the original structure for state management
      return updatedAttributes;
    });
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

  return (
    <>
      {attributes.map((attribute: any) => {
        return (
          <div key={attribute._id}>
            <div className="mt-2 mb-4 border-b border-primary">
              <h3 className="text-sm font-semibold mb-4 flex items-center justify-between uppercase">
                {attribute?._id}
              </h3>
              {attribute.values &&
                attribute.values.length > 0 &&
                attribute.values.map((value: any) => {
                  // const isChecked = selectedAttributes.some(
                  //   (attr: any) => attr.key === attribute._id && attr.value === value
                  // );
                  const isChecked =
                    Array.isArray(selectedAttributes[attribute._id]) &&
                    selectedAttributes[attribute._id].includes(value);
                  return (
                    <div className="relative mb-2">
                      <div key={value} className="flex items-center py-[5px]">
                        <Checkbox
                          id={value}
                          className="mr-3
                          data-[state=unchecked]:bg-cream
                          data-[state=unchecked]:border-brown 
                          data-[state=checked]:bg-brown 
                          data-[state=checked]:border-brown
                          data-[state=checked]:text-cream"
                          checked={isChecked}
                          onClick={() => onSelectAttribute(attribute, value)}
                        />
                        <label htmlFor={attribute?.id} className="text-sm">
                          {value}
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AttributeFilters;
