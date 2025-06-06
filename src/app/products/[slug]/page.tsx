"use client";
import Head from "next/head";
import animationData from '../../../../public/animations/nodatafound.json'
import Lottie from "lottie-react";
import BannerSection from "@/components/sharedComponents/BannerSection";
import Meta from "@/components/sharedComponents/Meta";
import ProductsList from "@/components/product/ProductsList";

export default function Page({ params }: { params: { slug: string } }) {

 // // console.log('productsSlug',params.slug)
  return (
    // <div className="bg-white ">
    //   <Head>
    //     <title>Home | Products</title>
    //   </Head>

    //   <div className="category-section  mx-auto" style={{}}>
    //   <Lottie animationData={animationData} loop={true} className="flex mx-auto justify-center items-center" style={{ width: 400, height: 400 }} />
    //   <p className="text-center text-fontGray mt-4 text-lg font-bold ">No Products Found.</p>

    //   </div>
    // </div>
    <div className="bg-white">
      <Meta title="Products" subtitle="Products" description="" />
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "Featured Sustainable Products", href: "#" }}

      />
      <ProductsList catSlug={params.slug} />
    </div>
  );
}
