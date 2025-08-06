"use client";
import BannerSection from "@/components/sharedComponents/BannerSection";
// import Meta from "@/components/sharedComponents/Meta";
import VendorsList from "@/components/vendor-product/VendorsList";
// import Head from "next/head";
import React from "react";
// import { AiFillHome } from "react-icons/ai";

type Props = {};

function page({}: Props) {
  return (
    <div className="bg-white">
      {/* <Meta title="Brands" subtitle="Brands" description="" /> */}
      <head>
        <title>Brands | Hubeco Buyer</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "Brands", href: "#" }}
      />
      <VendorsList />
    </div>
  );
}

export default page;
