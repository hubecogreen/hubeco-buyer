'use client'
import React, { useState } from 'react'
// import { Button } from '../ui/button';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useRefreshToken from '../hooks/useRefreshToken';
import * as getEndpoint from "../../network/EndPoints";
import useApi from '../Fetcher/useAPI';
// import { CircularProgress } from '@chakra-ui/react';
import store from '@/reduxStore';
import ProductCard from './RecentViewCard';
import { setCookie } from "cookies-next";



export default function RecentlyViewed() {
    const {refreshTokens} = useRefreshToken();
    const {callApi} = useApi();
    const [loadingCartButton, setLoadingCartButton] = useState(false);
    const [addtoCartPayload, setAddtoCartPayload] = useState<any>("");
    const [minQty, setMinQty] = useState<number>(1);
    const [maxQty, setMaxQty] = useState<number>(1);
    const [quantity, setQuantity] = useState(minQty);
    const recentProducts=store.getState().user.recentProducts;


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
          }
        } catch (error) {
         // // console.log(error);
          handleCartApiError(error, id);
        } finally {
          setLoadingCartButton(false);
        }
      };

    return (
    <div className="bg-white  block w-full  md:py-12 py-8 px-4 ">
            <p className="md:text-[30px] text-black font-bold text-md mb-4">
              Recently Viewed{" "}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentProducts && recentProducts?.map((product: any) => (
                <ProductCard key={product?.id} product={product}/>
              ))}
            </div>
          </div>
  )
}


