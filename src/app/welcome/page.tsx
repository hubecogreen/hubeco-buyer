"use client";

// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
import Image from "next/image";
// import Head from "next/head";
// import Lottie from "lottie-react";
// import animationData from '../../../public/animations/welcome.json'
import CustomButton from "@/components/customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import * as Webservices from "../../network/WebServices";
// import * as getEndpoint from "../../network/EndPoints";
import store from "@/reduxStore";
import { useDispatch } from "react-redux";
// import { saveRefreshToken, saveToken, setUser } from "@/reduxStore/slices/userSlice";


export default function Page() {
  const router=useRouter();
  const token=store.getState().user.token;
  const dispatch=useDispatch();



  useEffect(()=>{
  
  },[])
  return (
    <div className="bg-white mt-20">
      {/* <Head>
        <title>Welcome</title>
      </Head> */}
       <head>
        <title>Welcome| Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
     {/* <Header /> */} 
    <div className="px-10 pb-10 w-90% mt-20">
    <div className="category-section pb-10 text-center text-brown bg-white shadow-[8px_4px_8px_8px_rgba(149,157,165,0.2)]">
        <div className="container mx-auto py-10">
        <div className="flex justify-center">

         <Image 
         src='/gif/Hubeco.gif' 
         alt="Welcome" 
         width={300} 
         height={300}
         onError={e => {
          e.currentTarget.src = '/images/product-placeholder.webp'
        }}
        loading="lazy"
         />
        </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-5">Welcome to <span className="text-teal-500">hubeco</span> 👋</h1>
            <p className="text-base text-gray-500">We connect you with top-quality eco-friendly and certified building materials for sustainable construction.</p>
          </div>
        </div>
        <div className="flex items-center justify-center pb-12 ">
            <CustomButton
              title={"Shop Now"}
              className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-white "
              customStyles={{}}
              rightIcon={<GoArrowRight />}
              onPress={()=>{router.push('/products')}}
            />
          </div>
      </div>
      </div>
     {/* <Footer /> */}
    </div>
  );
}