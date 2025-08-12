"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
// import axios from "axios";
// import { CircularProgress } from "@chakra-ui/react";
// import Pagination from "../pagination/Pagination";
// import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import LottieWrapper from "../LottieWrapper";
import animationData from "../../../public/animations/nodatafound.json";
import styles from '../home/categories/Category.module.css';
import CustomButton from "../customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import store from "@/reduxStore";
import { toast } from "react-hot-toast";
import useApi from "../Fetcher/useAPI";
import { useDispatch } from "react-redux";
import { saveCategories, saveCatTime } from "@/reduxStore/slices/masterDataSlice";
import { normalizePath } from "@/lib/utils";

interface Category {
  id: string;
  displayImage: string;
  companyName: string;
  items: string;
}

const FALLBACK_IMAGE = "/images/product-placeholder.webp";

const CategoryList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const categories=store.getState().masterData.categories;
  const [categoriesData, setCategoriesData] = useState<any>(categories);
  const router=useRouter();
  const {callApi}=useApi();
  const dispatch=useDispatch();
 
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  useEffect(() => {
    getCategories();
  }, []);

 
  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Categories Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);

  };

  const getCategories = async () => {
    try {
      const result = (await callApi(
        getEndpoint.default.PRODUCTS_CATEGORIES,
        "GET"
      )) as any;
      if (result.data == null) {
        handleApiError(result.errorData);
      } else {
        const cuurentTime = new Date();
       // // console.log("first time", cuurentTime);

        setCategoriesData(result?.data[0]?.subCategories || []);

        dispatch(saveCategories(result?.data[0]?.subCategories || []));
        dispatch(saveCatTime(cuurentTime));
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="px-4 md:px-24 mt-8 md:mt-10">
      <div className="block md:flex md:justify-between mb-6">
        <h2 className="text-black font-bold text-2xl md:text-3xl">Categories</h2>
        <div className="h-12 flex w-full md:w-96 mt-4 md:mt-0 opacity-0 hidden">
        <input
          className="focus:outline-none border border-gray-300 rounded-l-md p-2 w-full max-w-[400px]"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e: any) => handleSearch(e)}
        />

          <div className="hidden bg-pink p-3 h-12 flex items-center justify-center rounded-r-md">
            <IoIosSearch className="h-5 w-6 text-white" onClick={() => handleSearch(searchTerm)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
        {categories.map((category:any,index:any) => 
        {
           // // console.log('vvret',category)
            return(
          <Link
          key={index}
          href={`/products?scid=${category?._id}`}
            // href={`/brands/${vendor.businessInfo?.slug}`}
            // key={vendor.businessInfo?.slug}
          >
            <div className="border rounded-md flex flex-col items-center justify-center  w-full  cursor-pointer hover:bg-slate-100 transform transition-transform duration-300 hover:scale-105">
              
            <div className="relative w-full" onClick={() => router.push(`/products`)}>
            <Image
                    // src={category?.image}
                    // src={category?.image ?  (assetURL+'/'+category?.image).includes('//admin') ? (assetURL+'/'+category?.image).replace('//admin', '/admin') : `${assetURL}/${category?.image}` : '/images/product-placeholder.webp'}
                    src={
                      category?.image
                        ? normalizePath(`${assetURL}/${category.image}`)
                        : "/images/product-placeholder.webp"
                    }
                    alt={`Slide ${index}`}
                    width={300}
                    height={300}
                    onError={e => {
                      e.currentTarget.src = '/images/product-placeholder.webp'
                    }}
                    loading="lazy"
                    
                    className={`rounded-[5px] object-cover  w-full h-[300px]  bg-black`}
                  />
                  <div className="absolute w-full inset-0 flex flex-row justify-between items-end bg-black h-[300px] opacity-40">

                  </div>
                  <div className="absolute  w-full inset-0 flex flex-row justify-between items-end justify-end text-white ">
                    <p
                      className={`${styles.cattitle} text-xl mb-6 text-white font-bold ml-5 z-20 cat-text`}
                    >
                      {category?.name}
                    </p>
                    <CustomButton
                      title={"Shop Now"}
                      onPress={() => router.push(`/products`)}
                      className={`  py-2 mr-5 mb-4 h-8 md:h-10 text-white font-semibold z-20 text-sm  hover:bg-primary`}
                      customStyles={{
                        width: "150px",
                        border: "1px solid white",
                      }}
                      rightIcon={<GoArrowRight />}
                    />
                  </div>
                </div>
            </div>
          </Link>
        )}
        )}
      </div>


      {categories.length === 0 && (
        <>
          <LottieWrapper
            animationData={animationData}
            loop={true}
            className="flex mx-auto justify-center items-center w-[400px] h-[400px]"
          />

          <p className="text-center text-fontGray mt-4 text-lg font-bold ">
            No Categories Found.
          </p>
        </>
      )}

      {error && (
        <div className="w-full h-full flex justify-center items-center mt-4">
          <p>Error loading Categories: {error}</p>
        </div>
      )}

      
    </div>
  );
};

export default CategoryList;
