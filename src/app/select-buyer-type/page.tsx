// pages/register.tsx

"use client";

import React, { useState } from "react";
// import Head from 'next/head';
// import Footer from "../../components/footer/MainFooter";
// import Header from "../..//components/header/MainHeader";
// import B2CMain from "../../components/register/B2CMain";
// import B2BMain from "../..//components/register/B2BMain";
import CustomerTypeSelection from "../..//components/register/Selection";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

export default function Page() {
  const [selection, setSelection] = useState<string | null>(null);
  const router = useRouter();

  const mobileNum = getCookie("encryptedMobile");
  // // console.log('numberinSlee',mobileNum)

  const handleSelection = (choice: string) => {
    setCookie("selectedbuyertype", choice);
    router.push("/register");
    setSelection(choice);
  };

  //// // console.log('rererr',selection)

  // // Render different components based on selection
  // if (getCookie('selectedbuyertype') == "B2B") {
  //   return <B2BMain mobileParam={mobileNum} />;
  // }else if(getCookie('selectedbuyertype') == "B2C"){

  //   return <B2CMain mobileParam={mobileNum} />;
  // }else{
  //  // // console.log('first')
  // }

  return (
    <div className="bg-white pt-1">
      {/* <Head>
        <title>Register</title>
      </Head> */}
      <head>
        <title>Register | Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
      {/* <Header /> */}
      <div className="px-4 md:px-30 mt-[60px] md:mt-[60px] pb-10 w-full md:w-11/12 mx-auto">
        <div className="category-section pb-10 mobile-sm:p-0 text-center text-brown bg-white shadow-[8px_4px_8px_8px_rgba(149,157,165,0.2)]">
          <CustomerTypeSelection onSelect={handleSelection} />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
