"use client";

import Footer from "@/components/footer/MainFooter";
import Header from "@/components/header/MainHeader";

import Head from "next/head";
import animationData from "../../../public/animations/welcome.json";
import CustomButton from "../customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import LottieWrapper from "../LottieWrapper";

export default function Page() {
  const router = useRouter();
  return (
    <div className="bg-white">
      <Head>
        <title>Welcome</title>
      </Head>
      {/* <Header /> */}
      <div className="px-10 pb-10 w-90% m-20">
        <div className="category-section pb-10 text-center text-black bg-white shadow-lg [box-shadow:rgba(149,157,165,0.2)_8px_4px_8px_8px]">
          <div className="container mx-auto py-10">
            <div className="flex justify-center">
              <LottieWrapper
                animationData={animationData}
                loop={true}
                className="w-[300px] h-[300px]"
              />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-5">
                Welcome to <span className="text-teal-500">hubeco</span> 👋
              </h1>
              <p className="text-base text-gray-500">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and <br />
                publishing industries for previewing layouts and visual mockups
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center pb-12 ">
            <CustomButton
              title={"Shop Now"}
              className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-48  w-30 md:text-md text-sm text-white "
              customStyles={{}}
              rightIcon={<GoArrowRight />}
              onPress={() => router.push("/products")}
            />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
