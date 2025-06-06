"use client";
import BannerSection from "@/components/sharedComponents/BannerSection";
// import Meta from "@/components/sharedComponents/Meta";
import ProductsList from "@/components/product/ProductsList";
import React from "react";
import { useSearchParams } from "next/navigation";

type Props = {};

function page(params:any) {

  const paramsS=useSearchParams();

  

  return (
    <div className="bg-white">
       <head>
        <title>Products</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
      {/* <Meta title="Products" subtitle="Products" description="" /> */}
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "Featured Sustainable Products", href: "#" }}

      />
      <ProductsList />
    </div>
  );
}

export default page;
