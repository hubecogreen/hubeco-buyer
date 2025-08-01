"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const buyerInfo=sessionStorage.getItem('buyerUserInfo') as any;
  const prefferedPlan=JSON.parse(buyerInfo)?.preferredPlan;
  const [totalPage, setTotalPage] = useState(2);
  const [page, setPage] = useState(1);
  const [productsData, setProductsData] = useState<any>([]);
  const [limit,setLimit] = useState(9);
  const [searchTerm,setSearchTerm] = useState<string>("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const [planType,setPlanType] = useState<string>(prefferedPlan?prefferedPlan:null);
  const [brandCode,setBrandCode] = useState("");
  const [purchaseType,setPurchaseType] = useState("");
  const [isSingle,setIsSingle] = useState(false);
  const [catId,setCatId] = useState(searchParams && searchParams.get('cid')?searchParams.get('cid'):null);
  const [subCatId,setSubCatId] = useState(searchParams && searchParams.get('scid')?searchParams.get('scid'):null);
  const [childCatId,setChildCatId] = useState(searchParams && searchParams.get('ccid')?searchParams.get('ccid'):null);
  const [country,setCountry] = useState("");
  const [status,setStaus] = useState("");
  const [isReturnable,setIsReturnable] = useState(false);
  const [isRefundable,setIsRefundable] = useState(false);
  const [isCancellable,setIsCancellable] = useState(false);
  const [vendorCode,setVendorCode] = useState("");
  const [vendorSlug,setVendorSlug] = useState("");
  const [gridLoading,setGridLoading] = useState(false);
  const {callApi}=useApi();
  const router=useRouter();
   
  const { refreshTokens } = useRefreshToken();


  useEffect(() =>  {
    getProducts();
   }, [searchParams,searchTerm]); 

   const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("No Products to display");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getProducts();
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const buildUrl = (baseUrl:any, params:any) => {
    const queryParams = new URLSearchParams();

    // Iterate over the parameters and append only if they have a value
    Object.entries(params).forEach(([key, value]:any) => {
        if (value) { // Only append if value is truthy
            queryParams.append(key, value);
        }
    });

    return `${baseUrl}?${queryParams.toString()}`;
};

   const getProducts = async () => {
    setGridLoading(true);

    try {

      const params = {
        page:page?page:null,
        limit:limit?limit:null,
        searchTerm:searchTerm?searchTerm:null,
        planType: planType === 'FREE' || planType === 'PAID' ? planType : undefined,
        brandId: brandCode?brandCode:null,
        purchaseType:purchaseType?purchaseType:null,
        isSingleProduct: isSingle?isSingle:null,
        categoryId: catId?catId:null,
        subCategoryId: subCatId?subCatId:null,
        childCategories: childCatId?childCatId:null,
        countryOfOrigin: country?country:null,
        status: status?status:null,
        isReturnable: isReturnable?isReturnable:null,
        isCancellable: isCancellable?isCancellable:null,
        // returnPolicy,
        isRefundable: isRefundable?isRefundable:null,
        // refundPolicy,
        vendorIdOrSlug: vendorCode?vendorCode:null,
    };
    

    const apiUrl = buildUrl(getEndpoint.default.PRODUCTSLIST, params);

   // // console.log('buildUrlff',searchTerm,apiUrl)

  
   
      // const result = await callApi(`${getEndpoint.default.PRODUCTSLIST}?page=${page}&limit=${limit}${searchTerm ?? '&searchTerm='${searchTerm}}&planType=${planType=='FREE'?'FREE':planType=='PAID'?'PAID':''}&brandId=${brandCode}&purchaseType=${purchaseType}&isSingleProduct=${isSingle}&categoryId=${catId}&subCategoryId=${subCatId}&childCategories=${childCatId}&countryOfOrigin=${country}&status=${status}&isReturnable=${isReturnable}&isCancellable=${isCancellable}&vendorIdOrSlug=${vendorCode}`,"GET")

      const result = await callApi(apiUrl,"GET") as any;

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
  };

  return (
    <section className="relative w-full items-center justify-center bg-secondaryBg">
      <div className="md:pb-10">
        <div className="items-center justify-center px-8 text-center z-20 pt-10 md:pt-20">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-black mt-30">
            Featured Sustainable Products
          </h1>
          <p className="text-md md:text-big max-w-4xl mx-auto text-fontGray md:pt-5">
            Discover our latest eco-friendly and sustainable materials.
          </p>
        </div>
      </div>
      <div className={`${styles.gridContainer} grid md:grid-cols-3 lg:grid-cols-3  mx-auto hidden !mobile-sm:hidden md:flex`}>
        {productsData.sort(() => Math.random() - 0.5).slice(0, 6).map((product:any, index:any) => 
        {
          return(
          <ProductCard key={index} product={product} index={index} />
        )}
        )}
      </div>
      {/* <div className={`${styles.gridContainer} mx-auto hidden md:flex`}>
        {products1.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div> */}

      <div className={`${styles.gridContainer3} mx-auto !md:hidden`}>
        {/* {productsData.sort(() => Math.random() - 0.5).slice(0, 6).map((product:any, index:any) => (
          <ProductCard key={index} product={product} />
        ))} */}
          {productsData.slice(0, 6).map((product:any, index:any) => (
          <ProductCard key={index} product={product} index={index} />
        ))}
      </div>

      <div className="align-center justify-center py-10">
        <CustomButton
          title={"Shop More"}
          onPress={() => router.push("/products")}
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
