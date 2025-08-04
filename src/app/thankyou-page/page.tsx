"use client"
import React, { useState } from "react";
// import Footer from "@/components/footer/MainFooter";

// import Head from "next/head";
// import Header from "@/components/header/MainHeader";
import CustomButton from "@/components/customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import animationData from '../../../public/animations/animation.json'
import LottieWrapper from "@/components/LottieWrapper";

const Thankyou = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const onPress = () => {
        setIsLoading(true)
        router.push('/contact');
        setIsLoading(false)
    };
  

  return (
    <div className="bg-white">
      {/* <Head>
        <title>Thank you</title>
      </Head> */}
       <head>
        <title>Thank You | Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
     {/* <Header /> */} 
      <div className="relative">
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: "url(images/auth/auth.webp)" }}
        >
          <div className="bg-opacity-90 h-full flex items-center justify-center py-20 md:py-20">
            <div className="text-center py-10 md:py-15 max-w-md md:max-w-lg text-white bg-white pl-30">
              <div className="flex justify-center mb-4">
              <LottieWrapper animationData={animationData} loop={true} style={{ width: 400, height: 400 }} />;
              </div>
              <h1 className="text-4xl md:text-3xl font-bold mb-4 text-black">
                Thank you !
              </h1>
              <div className="flex items-center justify-center">
                <p className="mb-2 md:mb-2 lg:mb-4 text-sm md:text-base text-black w-10/12 text-center">
                  Your enquiry has been submitted successfully
                </p>
              </div>
              <div  className="flex items-center justify-center">
              <CustomButton
                  title={"Go Back"}
                  className="ml-3 bg-secondary h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-white hover:bg-primary"
                  customStyles={{}}
                  rightIcon={<GoArrowRight />}
                  onPress={onPress}
                  loading={isLoading}
                  
                />
              </div>
            </div>
          </div>
        </div>
      </div>
     {/* <Footer /> */}
    </div>
  );
};
export default Thankyou;
