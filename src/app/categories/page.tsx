"use client";
import CategoryList from "@/components/categories/CategoryList";
import BannerSection from "@/components/sharedComponents/BannerSection";
// import Meta from "@/components/sharedComponents/Meta";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div className="bg-white">
      {/* <Meta title="Categories" subtitle="Categories" description="" /> */}
      <head>
        <title>Categories | Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "Categories", href: "#" }}
      />
      <CategoryList />
    </div>
  );
}

export default page;
