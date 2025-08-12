"use client";

import BannerSection from "@/components/sharedComponents/BannerSection";
// import Meta from "@/components/sharedComponents/Meta";
import CustomTabs from "@/components/vendor-product/Tabs";
// import VendorCard from "@/components/vendor-product/VendorProducts";
// import VendorProducts from "@/components/vendor-product/VendorProducts";
import * as Webservices from "../../../network/WebServices";
import * as getEndpoint from "../../../network/EndPoints";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import React, { useEffect, useState } from "react";
// import ProductCard from "@/components/productCard/ProductCard";
import ProductGrid from "@/components/vendor-product/VendorProducts";
// import FiltersSidebar from "@/components/vendor-product/Filters/ProductsFilter";
import { CircularProgress } from "@chakra-ui/react";
import Custom404 from "@/components/404/page";
import { Skeleton } from "@/components/ui/skeleton";
import { normalizePath } from "@/lib/utils";
interface Blog {
  _id: string;
  title: string;
  description: string;
  metaKeywords: string;
  metaDescriptions: string;
  content: string;
  thumbnail: string;
  status: string;
  isActive: boolean;
  author: {
    email: string;
    firstName: string;
    lastName: string;
    userId: string;
    userType: string;
    sessionId: string;
    thumbnail: string | null;
    phoneNumber: string;
  };
  createdAt: string;
  updatedAt: string;
  slug: string;
}

// Define a dynamic page component in the `app` directory
export default function Page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = params;
  // // console.log("working", id);
  const [userValues, setUserValues] = useState<any>({});
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  // // console.log("search term");
  // // console.log("search term testing", searchTerm);
  // Fetch data or perform operations using the id, if needed

  const getData = (page = 1) => {
    setLoading(true);
    const url = `${getEndpoint.default.SLUG_USER + "/" + id}`;
    Webservices.callGetApi(url, "")
      .then(
        (response: {
          data: {
            nextCursor: string | null;
            totalCount: number;
            metadata: { totalCount: number; currentPage: number };
          };
        }) => {
          if (response.data) {
            // // console.log("data user", response.data);
            setUserValues(response.data);
            setLoading(false);
          } else {
            // consoleerror("Unexpected response format: ", response);
            setLoading(false);
          }
        }
      )
      .catch((err: any) => {
        // consoleerror("API call failed: ", err);
        if (
          err.response.data.message === "Vendor with given slug, does not exits"
        ) {
          setNotFound(true);
        }
        setLoading(false);
      });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  if (notFound) {
    return <Custom404 />;
  }

  function CompanyCardSkeleton() {
    return (
      <div className="w-full">
        {" "}
        {/* Adjusted for 4 cards per row */}
        {/* Skeleton for Company Name */}
        <Skeleton className="h-6 w-32" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white">
        {/* <Meta title="Brands" subtitle="Brands" description="" /> */}
        <head>
          <title>{userValues?.companyName} | Hubeco</title>
          {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
          {/* <meta name="author" content={productsData?.author.firstName} /> */}
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
        </head>
        <BannerSection
          link1={{ name: "Home", href: "/" }}
          link2={{ name: "Brands", href: "/brands" }}
          link3={{ name: `${userValues?.companyName}`, href: `/brands/${id}` }}
        />
        <div className="block md:flex md:justify-between py-12 px-24">
          <div className="flex items-center space-x-2">
            <Image
              src={
                userValues?.logo
                  ? normalizePath(`${assetURL}/${userValues.logo}`)
                  : "/images/product-placeholder.webp"
              }
              // src={userValues.user.displayImage ?  (assetURL+'/'+userValues.user.displayImage).includes('//admin') ? (assetURL+'/'+userValues.user.displayImage).replace('//admin', '/admin') : `${assetURL}/${userValues.user.displayImage}` : '/images/product-placeholder.webp'}

              className=" w-[100px] !h-fit"
              alt="vendor-product"
              width={60}
              height={60}
              onError={(e) => {
                e.currentTarget.src = "/images/product-placeholder.webp";
              }}
              loading="lazy"
            />
            {loading && (
              <div className="w-full h-full flex justify-center items-center mt-4">
                <CompanyCardSkeleton />
              </div>
            )}
            <h2 className="text-black font-bold text-2xl md:text-3xl">
              {userValues?.companyName}
            </h2>
          </div>
          <div className="h-12 flex w-full md:w-96 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none border border-gray-300 rounded-l-md p-2 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="bg-pink p-3 h-12 flex items-center justify-center rounded-r-md">
              <IoIosSearch className="h-5 w-6 text-white" />
            </div>
          </div>
        </div>

        {loading ? (
          // Loading screen while the data is being fetched
          <div className="flex items-center justify-center w-full h-screen">
            <CircularProgress />
            {/* You can replace this with a spinner if you want */}
          </div>
        ) : // Once the loading is complete, check if the user is a premium member or not
        userValues?.isPremiumMember ? (
          <CustomTabs id={id} searchTerm={searchTerm} />
        ) : (
          <div className="w-full px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6">
              {/* <div className="col-span-12 lg:col-span-3">
                <FiltersSidebar />
              </div> */}
              <div className="col-span-12 lg:col-span-12">
                <h2 className="text-black font-bold text-2xl md:text-3xl pb-3">
                  Sustainable Products
                </h2>
                <ProductGrid id={id} searchTerm={searchTerm} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
