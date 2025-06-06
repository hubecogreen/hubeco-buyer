// pages/register.tsx

"use client";

import React, { useState } from 'react';
// import Head from 'next/head';
// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
import B2CMain from "@/components/register/B2CMain";
import B2BMain from "@/components/register/B2BMain";
// import CustomerTypeSelection from '@/components/register/Selection';
// import { useRouter, useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next';



export default function Page() {
  // const [selection, setSelection] = useState<string | null>(null);


  const selection=getCookie('selectedbuyertype');
  const mobileNum=getCookie('encryptedMobile');

 // // console.log('heheheheh')



 


  


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
   
          {selection === "B2B" ? <B2BMain mobileParam={mobileNum} /> :selection === "B2C" ? <B2CMain mobileParam={mobileNum} />:<B2CMain mobileParam={mobileNum} />}
       
    </div>
  );
}

