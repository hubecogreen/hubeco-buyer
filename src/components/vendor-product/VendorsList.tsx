"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
// import axios from "axios";
// import { CircularProgress } from "@chakra-ui/react";
import Pagination from "../pagination/Pagination";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import animationData from "../../../public/animations/nodatafound.json";
import { Skeleton } from "../ui/skeleton";
import { normalizePath } from "@/lib/utils";
import LottieWrapper from "../LottieWrapper";

interface Vendor {
  id: string;
  displayImage: string;
  companyName: string;
  items: string;
}

const FALLBACK_IMAGE = "/images/product-placeholder.webp";

const VendorsList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  const getData = (page = 1) => {
    setLoading(true);

    const url = `${getEndpoint.default.VENDORS}?searchTerm=${searchTerm}&limit=16&page=${page}`;
    Webservices.callGetApi(url, "")
      .then(
        (response: {
          data: {
            data: Vendor[];
            nextCursor: string | null;
            totalCount: number;
            meta: { totalItems: number; currentPage: number };
            items: any;
          };
        }) => {
          setLoading(false);
          if (response.data && Array.isArray(response.data.items)) {
            // // console.log("Data", response.data.items);
            // // console.log("metadata", response.data.meta.totalItems);
            setVendors(response.data.items);
            setTotalPage(response.data.meta.totalItems);
            setPage(response.data.meta.currentPage);
          } else {
            // consoleerror("Unexpected response format: ", response);
          }
        }
      )
      .catch((err) => {
        setLoading(false);
        // consoleerror("API call failed: ", err);
      });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (newPage: number) => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (newPage == page) {
      // // console.log("same page");
      return;
    }
    getData(newPage);
  };

  useEffect(() => {
    getData();
  }, [searchTerm]);

  function CompanyCardSkeleton() {
    return (
      <div className="w-full grid grid-cols-4 gap-4">
        {" "}
        {/* Adjusted for 4 cards per row */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-md flex flex-col items-center justify-center p-6 w-full h-64 sm:h-52 lg:h-64 cursor-pointer hover:bg-slate-100 transform transition-transform duration-300 hover:scale-105"
          >
            {/* Circle Skeleton for Initials */}
            <div className="w-20 h-20 mb-4">
              <Skeleton className="w-full h-full rounded-full" />
            </div>

            {/* Skeleton for Company Name */}
            <Skeleton className="h-6 w-32" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 md:px-24 mt-8 md:mt-10">
      <div className="block md:flex md:justify-between mb-6">
        <h2 className="text-black font-bold text-2xl md:text-3xl">Brands</h2>
        <div className="h-12 flex w-full md:w-96 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="
                bg-cream
                focus:outline-none
                border border-gray-300
                rounded-[5px] rounded-tr-none rounded-br-none
                p-2
                w-full max-w-[400px]
              "
          />

          <div className="bg-primary p-3 h-12 flex items-center justify-center rounded-r-md">
            <IoIosSearch className="h-5 w-6 text-white" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {vendors.map((vendor: any) => (
          <Link
            href={`/brands/${vendor.businessInfo?.slug}`}
            key={vendor.businessInfo?.slug}
          >
            <div className="border rounded-md flex flex-col items-center justify-center p-6 w-full h-64 sm:h-52 lg:h-64 cursor-pointer hover:bg-slate-100 transform transition-transform duration-300 hover:scale-105">
              {/* {vendor.displayImage ? (
                <Image
                  src={
                    vendor.displayImage
                      ? `https://assets.hubeco.market/${vendor.displayImage}`
                      : FALLBACK_IMAGE
                  }
                  alt={vendor.businessInfo.companyName}
                  width={200}
                  height={200}
                  className="object-contain h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-[175px] h-full bg-[#B906471A] text-[#B90647] text-6xl rounded-full uppercase w-[175px] h-[250px]">
                  {vendor.businessInfo.companyName.charAt(0)}
                </div>
              )} */}
              <div className="flex items-center justify-center w-[150px] h-[150px]">
                {vendor?.businessInfo?.logo ? (
                  <Image
                    // src={`https://assets.hubeco.market/${vendor.displayImage}`}
                    // src={vendor?.businessInfo?.logo ?  (assetURL+'/'+vendor?.businessInfo?.logo).includes('//admin') ? (assetURL+'/'+vendor?.businessInfo?.logo).replace('//admin', '/admin') : `${assetURL}/${vendor?.businessInfo?.logo}` : '/images/product-placeholder.webp'}

                    src={
                      vendor?.businessInfo?.logo
                        ? normalizePath(
                            `${assetURL}/${vendor?.businessInfo?.logo}`
                          )
                        : "/images/product-placeholder.webp"
                    }
                    alt={vendor.businessInfo.companyName}
                    width={150}
                    height={150}
                    onError={(e) => {
                      e.currentTarget.src = "/images/product-placeholder.webp";
                    }}
                    loading="lazy"
                    className="  object-contain h-full "
                  />
                ) : (
                  <div className="flex items-center justify-center w-[150px] h-[150px] bg-[#B906471A] text-[#B90647] text-6xl rounded-full uppercase">
                    {vendor.businessInfo.companyName.split(" ").length > 1
                      ? vendor.businessInfo.companyName
                          .split(" ")
                          .map((word: any) => word[0])
                          .slice(0, 2)
                          .join("") // Get first letter of two words
                      : vendor.businessInfo.companyName.slice(0, 2)}{" "}
                    {/* Get first two letters if only one word */}
                  </div>
                )}
              </div>

              {/* <div className="w-[250px] h-[250px]">
                {vendor.displayImage ? (
                 <Image
                 src={vendor.displayImage ? `https://assets.hubeco.market/${vendor.displayImage}` : FALLBACK_IMAGE}
                 alt={vendor.businessInfo.companyName}
                 width={200}
                 height={200}
                 className="object-contain h-full"
               />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-[#B906471A] text-[#B90647] text-6xl rounded-full uppercase w-[175px] h-[250px]">
                    {vendor.businessInfo.companyName.charAt(0)}
                  </div>
                )}
              </div> */}

              <h3 className="text-lg font-semibold mb-2 mt-2">
                {vendor?.businessInfo?.companyName}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {loading && (
        <div className="w-full h-full flex justify-center items-center mt-4">
          <CompanyCardSkeleton />
        </div>
      )}

      {!loading && vendors.length === 0 && (
        <>
          <LottieWrapper
            animationData={animationData}
            loop={true}
            className="mx-auto w-[400px] h-[400px]"
          />

          <p className="text-center text-brown mt-4 text-lg font-bold ">
            No Brands Found.
          </p>
        </>
      )}

      {error && (
        <div className="w-full h-full flex justify-center items-center mt-4">
          <p>Error loading Brands: {error}</p>
        </div>
      )}

      {totalPage > 16 && (
        <div className="w-full flex justify-center items-center mt-4">
          <Pagination
            totalItems={totalPage}
            itemsPerPage={16}
            currentPage={page}
            onPageChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default VendorsList;
