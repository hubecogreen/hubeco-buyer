"use client";
// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
import HeroSection from "@/components/vendor-register/VendorBanner";
import Benefits from "@/components/vendor-register/Benefits";
import Working from "@/components/vendor-register/Working";
import JoinUs from "@/components/vendor-register/JoinUs";

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
        <title>Hubeco Vendor</title>
      </Head>
      {/* <Header /> */}
      <div className="banner-section  mx-auto h-64 md:h-full" style={{}}>
        <HeroSection />
      </div>

      <div
        className="benefits-section mx-auto pb-4 pt-10 md:pt-[60px] bg-cover bg-no-repeat bg-[center_190%] h-[500px] bg-white"
        style={{
          backgroundImage: "url('/images/buyer-register/benefitsVector.webp')",
        }}
      >
        <div>
          {/* {showScrollBottom && (
            <div className="w-full flex justify-end items-center relative right-8 md:right-44  md:bottom-12 bottom-5 z-50">
              <button
                className="scroll-to-bottom flex md:w-20 w-10 bg-hoverBg hover:bg-secondary md:h-20 h-10 hover:rounded-full transition-all duration-1000"
                onClick={scrollToBottom}
                style={{
                  // backgroundColor: "#2F318D",
                  color: "#fff",
                  border: "none",
                  // width: "80px",
                  // height: "80px",
                  // display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  alignSelf: "center",
                }}
              >
                <IoIosArrowRoundDown size={32} />
              </button>
            </div>
          )} */}
        </div>
        <Benefits />
      </div>
      <div className="working-section mx-auto pb-10 md:pt-20 pt-[304px] md:max-w-full">
        <Working />
      </div>
      <div className="working-section mx-auto pb-10 md:max-w-full">
        <JoinUs />
      </div>

      {/* <Footer /> */}
    </div>
  );
}
