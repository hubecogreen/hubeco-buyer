"use client";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CustomButton from "@/components/customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import ProductCard from "@/components/productCard/ProductCard";
import styles from "./FeaturedProducts.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import useApi from "@/components/Fetcher/useAPI";
import * as getEndpoint from "../../../network/EndPoints";

const FeaturedProducts = () => {
  const searchParams = useSearchParams();
  const buyerInfo = sessionStorage.getItem('buyerUserInfo') as any;
  const prefferedPlan = JSON.parse(buyerInfo)?.preferredPlan;
  const [totalPage, setTotalPage] = useState(2);
  const [page, setPage] = useState(1);
  const [productsData, setProductsData] = useState<any>([]);
  const [limit, setLimit] = useState(9);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const [planType, setPlanType] = useState<string>(prefferedPlan ? prefferedPlan : null);
  const [brandCode, setBrandCode] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [isSingle, setIsSingle] = useState(false);
  const [catId, setCatId] = useState(searchParams && searchParams.get('cid') ? searchParams.get('cid') : null);
  const [subCatId, setSubCatId] = useState(searchParams && searchParams.get('scid') ? searchParams.get('scid') : null);
  const [childCatId, setChildCatId] = useState(searchParams && searchParams.get('ccid') ? searchParams.get('ccid') : null);
  const [country, setCountry] = useState("");
  const [status, setStaus] = useState("");
  const [isReturnable, setIsReturnable] = useState(false);
  const [isRefundable, setIsRefundable] = useState(false);
  const [isCancellable, setIsCancellable] = useState(false);
  const [vendorCode, setVendorCode] = useState("");
  const [vendorSlug, setVendorSlug] = useState("");
  const [gridLoading, setGridLoading] = useState(false);
  const { callApi } = useApi();
  const router = useRouter();
  const hasCalledApi = useRef(false);

  const { refreshTokens } = useRefreshToken();

  // Memoize API error handler
  const handleApiError = useCallback(async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("No Products to display");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getProducts();
    } else {
      toast.error(result?.data?.message);
    }
  }, [refreshTokens]);

  // Memoize URL builder function
  const buildUrl = useCallback((baseUrl: any, params: any) => {
    const queryParams = new URLSearchParams();

    // Iterate over the parameters and append only if they have a value
    Object.entries(params).forEach(([key, value]: any) => {
      if (value) { // Only append if value is truthy
        queryParams.append(key, value);
      }
    });

    return `${baseUrl}?${queryParams.toString()}`;
  }, []);

  // Memoize API parameters
  const apiParams = useMemo(() => ({
    page: page ? page : null,
    limit: limit ? limit : null,
    searchTerm: searchTerm ? searchTerm : null,
    planType: planType === 'FREE' || planType === 'PAID' ? planType : undefined,
    brandId: brandCode ? brandCode : null,
    purchaseType: purchaseType ? purchaseType : null,
    isSingleProduct: isSingle ? isSingle : null,
    categoryId: catId ? catId : null,
    subCategoryId: subCatId ? subCatId : null,
    childCategories: childCatId ? childCatId : null,
    countryOfOrigin: country ? country : null,
    status: status ? status : null,
    isReturnable: isReturnable ? isReturnable : null,
    isCancellable: isCancellable ? isCancellable : null,
    isRefundable: isRefundable ? isRefundable : null,
    vendorIdOrSlug: vendorCode ? vendorCode : null,
  }), [page, limit, searchTerm, planType, brandCode, purchaseType, isSingle, catId, subCatId, childCatId, country, status, isReturnable, isCancellable, isRefundable, vendorCode]);

  // Memoize products fetching
  const getProducts = useCallback(async () => {
    if (hasCalledApi.current) return;
    
    setGridLoading(true);
    hasCalledApi.current = true;

    try {
      const apiUrl = buildUrl(getEndpoint.default.PRODUCTSLIST, apiParams);

      const result = await callApi(apiUrl, "GET") as any;

      if (result?.data == null) {
        handleApiError(result?.data?.errorData);
      } else {
        setProductsData(result?.data?.data);
        setTotalPage(result?.data?.metadata?.totalPages);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setGridLoading(false);
    }
  }, [buildUrl, apiParams]);

  // Memoize navigation handler
  const handleShopMoreClick = useCallback(() => {
    router.push("/products");
  }, [router]);

  // Memoize sorted and sliced products for better performance
  const displayProducts = useMemo(() => {
    return productsData.sort(() => Math.random() - 0.5).slice(0, 6);
  }, [productsData]);

  const mobileDisplayProducts = useMemo(() => {
    return productsData.slice(0, 6);
  }, [productsData]);

  useEffect(() => {
    hasCalledApi.current = false;
    getProducts();
  }, [searchParams, searchTerm, getProducts]);

  return (
    <section className="relative w-full items-center justify-center bg-secondaryBg">
      <div className="md:pb-10">
        <div className="items-center justify-center px-8 text-center z-20 pt-10 md:pt-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-black mt-30">
            Featured Sustainable Products
          </h2>
          <p className="text-md md:text-big max-w-4xl mx-auto text-fontGray md:pt-5">
            Discover our latest eco-friendly and sustainable materials.
          </p>
        </div>
      </div>
      <div className={`${styles.gridContainer} grid md:grid-cols-3 lg:grid-cols-3  mx-auto hidden !mobile-sm:hidden md:flex`}>
        {displayProducts.map((product: any, index: any) => (
          <ProductCard key={`${product._id || index}`} product={product} index={index} />
        ))}
      </div>

      <div className={`${styles.gridContainer3} mx-auto !md:hidden`}>
        {mobileDisplayProducts.map((product: any, index: any) => (
          <ProductCard key={`mobile-${product._id || index}`} product={product} index={index} />
        ))}
      </div>

      <div className="align-center justify-center py-10">
        <CustomButton
          title={"Shop More"}
          onPress={handleShopMoreClick}
          className="px-3 py-3 mx-auto h-12 md:h-12 font-semibold text-white text-sm bg-secondary w-72  hover:bg-primary"
          customStyles={{
            width: "150px",
            alignSelf: "center",
            justifySelf: "center",
            border: "1px solid white",
          }}
          rightIcon={<GoArrowRight />}
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;
