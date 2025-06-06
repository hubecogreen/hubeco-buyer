'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useRefreshToken from '../hooks/useRefreshToken';
import * as getEndpoint from "../../network/EndPoints";
import useApi from '../Fetcher/useAPI';
import { CircularProgress } from '@chakra-ui/react';
import ProductCard from './Card';
import { setCookie } from "cookies-next";

interface SimilarProductsProps {  
  childIds:any;
  currentId:any
}

export default function SimilarProducts({ childIds,currentId }: SimilarProductsProps) {
    const {refreshTokens} = useRefreshToken();
    const {callApi} = useApi();
    const buyerInfo=sessionStorage.getItem('buyerUserInfo') as any;
    const prefferedPlan=JSON.parse(buyerInfo)?.preferredPlan;
    const [loadingCartButton, setLoadingCartButton] = useState(false);
    const [addtoCartPayload, setAddtoCartPayload] = useState<any>("");
    const [minQty, setMinQty] = useState<number>(1);
    const [maxQty, setMaxQty] = useState<number>(1);
    const [quantity, setQuantity] = useState(minQty);
    const [gridLoading,setGridLoading] = useState(false);
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
    const [catId,setCatId] = useState();
    const [subCatId,setSubCatId] = useState<any>();
    const [childCatIds,setChildCatIds] = useState<any>();
    const [country,setCountry] = useState("");
    const [status,setStaus] = useState("");
    const [isReturnable,setIsReturnable] = useState(false);
    const [isRefundable,setIsRefundable] = useState(false);
    const [isCancellable,setIsCancellable] = useState(false);
    const [vendorCode,setVendorCode] = useState("");
    const [vendorSlug,setVendorSlug] = useState("");
    const router=useRouter()

    // console.log('vewqbtn',childIds)

    useEffect(() => {
        getProducts();
    },[])

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
      const buildUrl = (baseUrl: any, params: any) => {
        const queryParams = new URLSearchParams();
    
        // Iterate over the parameters and handle array values
        Object.entries(params).forEach(([key, value]: any) => {
            if (Array.isArray(value)) {
                // Append each item in the array as a separate query parameter
                value.forEach((item) => {
                    if (item) queryParams.append(key, item);
                });
            } else if (value) {
                // Append single non-array values
                queryParams.append(key, value);
            }
        });
    
        return `${baseUrl}?${queryParams.toString()}`;
    };

    const getProducts = async () => {
      setGridLoading(true);

      const ccids = childIds.map((child:any) => child._id).join(',');
      setChildCatIds(ccids);
      // // console.log('cwvrbt',ccids)

      try {
          const params = {
              page: page || null,
              limit: limit || null,
              searchTerm: searchTerm || null,
              planType: planType === 'FREE' || planType === 'PAID' ? planType : undefined,
              brandId: brandCode || null,
              purchaseType: purchaseType || null,
              isSingleProduct: isSingle || null,
              categoryId: catId || null,
              subCategoryId: subCatId || [], // Pass subCatId as an array
              childCategories: ccids?ccids:childCatIds?childCatIds:[], // Pass childId array directly
              countryOfOrigin: country || null,
              status: status || null,
              isReturnable: isReturnable || null,
              isCancellable: isCancellable || null,
              isRefundable: isRefundable || null,
              vendorIdOrSlug: vendorCode || null,
          };
  
          const apiUrl = buildUrl(getEndpoint.default.PRODUCTSLIST, params);
          // console.log('Generated API URL:', apiUrl);
  
          const result = await callApi(apiUrl, "GET") as any;
  
          if (result?.data == null) {
              handleApiError(result?.data?.errorData);
          } else {
            const fetchedProducts = result?.data?.data;
            // Filter out the product with the currentId
            const filteredProducts = fetchedProducts.filter(
                (product: any) => product.productId !== currentId
            );
            setProductsData(filteredProducts);
            setTotalPage(result?.data?.metadata?.totalPages);
          }
      } catch (err) {
          handleApiError(err);
      } finally {
          setGridLoading(false);
      }
      };


  const handleCartApiError = async (err: any, id: any) => {
    const result = err?.response;

    if (result?.status === 400) {
      if(result?.data?.message=='Item out of stock'){
          toast.error('Out of Stock');
      }
      
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      addToCart(id);
    } else {
      toast.error(result?.data?.message);
    }
  };

      const addToCart = async (id?: any) => {
        const payloadData = {
          product: id,
          quantity: quantity,
        };
        setAddtoCartPayload(id);
        setLoadingCartButton(true);
    
        try {
          const result = await callApi(
            getEndpoint.default.ADDTOCART,
            "POST",
            payloadData
          ) as any;
    
          if (result?.data == null) {
            handleCartApiError(result?.errorData, id);
          } else {
            setCookie('CartCount',result?.data?.items.length)
            toast.success("Product Added to Cart Successfully",{
              iconTheme: {
                primary: "#439787",
                secondary: "#FFFAEE",
              },
              duration: 3000
            });
            router.refresh()
          }
        } catch (error:any) {
         // // console.log(error);
          handleCartApiError(error, id);
        } finally {
          setLoadingCartButton(false);
        }
      };

      // console.log('productsData',productsData)
    
   
  return (
    <>
     {productsData && productsData.length>0 &&
       (
    <div className="bg-white  block w-full md:px-20 md:py-12 py-8 px-4 ">
      
            <p className="md:text-[30px] text-black font-bold text-md mb-4">
              Similar Products{" "}
            </p>
      
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {productsData && productsData?.slice(0, 4).map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
           )}
          </>
  )

}

