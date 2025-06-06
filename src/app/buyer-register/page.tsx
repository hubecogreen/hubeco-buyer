"use client";
// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
import ImageSlider from "@/components/buyer-register/BuyerBanner";
import BuyerBenefits from "@/components/buyer-register/BuyerBenefits";
import BuyerWorking from "@/components/buyer-register/BuyerWorking";
import BuyerJoinUs from "@/components/buyer-register/BuyerJoinUs";

import Head from "next/head";
// import { IoIosArrowRoundDown } from "react-icons/io";
import { useEffect, useState } from "react";
import useClient from "@/components/hooks/useClient";

export default function Home() {
  const [showScrollBottom, setShowScrollBottom] = useState(true);
  const isClient = useClient()

  const handleScroll = () => {
    if (
      window.scrollY <
      window.innerHeight *
        (document.documentElement.scrollHeight / window.innerHeight - 1)
    ) {
      setShowScrollBottom(true);
    } else {
      setShowScrollBottom(false);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight - window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if(!isClient)
    return <></>

  return (
    <div className="bg-white">
      <Head>
        <title>Hubeco Buyer</title>
      </Head>
      {/* <Header /> */}
      <div className="banner-section mx-auto h-64 md:h-full">

        <ImageSlider />
      </div>
      <div
        className="benefits-section pt-10 mx-auto pb-10 bg-cover bg-no-repeat bg-[center_190%] h-[500px] bg-white"
        style={{
          backgroundImage: "url('/images/buyer-register/benefitsVector.png')",
        }}
      >
        <BuyerBenefits />
      </div>
      <div className="working-section  mx-auto pb-10 pt-76 md:pt-20 md:m-w-full">
        <BuyerWorking />
      </div>
      <div className="join-section mx-auto pb-10 md:max-w-full">
        <BuyerJoinUs />
      </div>

      {/* <Footer /> */}
    </div>
  );
}
