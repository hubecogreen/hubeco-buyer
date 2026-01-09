"use client";
import React from "react";
// import Footer from "@/components/footer/MainFooter";
// import Head from "next/head";
// import Header from "@/components/header/MainHeader";
// import { AiFillHome } from "react-icons/ai";
// import ProductCard from "@/components/productCard/ProductCard";
// import styles from "./Cart.module.css";
// import Lottie from "lottie-react";
// import animationData from "../../../public/animations/cart.json";
// import CustomButton from "@/components/customButton/CustomButton";
// import { GoArrowRight } from "react-icons/go";
// import WishListCard from "@/components/wishlist/WishListCard";
// import CartCard from "@/components/cart/CartCard";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
    searchterm?: string;
}

const EmptyProducts:React.FC<Props> = ({ searchterm}) => {
   // // console.log('sevwr',searchterm)
 

  const router=useRouter();

  return (

    <>
      {/* Main Content Area */}
      <div className="container mx-auto px-4">
       

        <div className=" mx-auto  bg-cream shadow-md p-4 md:mt-1 mb-5">
          <div className="flex justify-center p-10">

            <Image src="/images/wishlist/cartimage.webp" alt="Image" width={300} height={300}
            onError={e => {
              e.currentTarget.src = '/images/product-placeholder.webp'
            }}
            loading="lazy"/>
          </div>
          {searchterm ?
          <p className="font-semibold text-xl text-center">Oops, looks like there's nothing here. Try adjusting your filters or search again!</p>
          :
          <p className="font-semibold text-xl text-center">No Products Found</p>
}
          
        </div>
       

      </div>

</>

  );
};

export default EmptyProducts;
