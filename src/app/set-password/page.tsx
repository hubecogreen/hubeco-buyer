// "use client";
import React from "react";
import SetPassword from "../../components/authFlow/SetPassword";

import { Metadata } from "next";

// import Head from "next/head";
// import { useSearchParams } from "next/navigation";


export const metadata: Metadata = {
  title: 'Set Password',
  description: 'Reset Password to your account'
}

function page({ params }: { params: { slug: string } }) {
 // // console.log(params)

  const token = params.slug

 // // console.log(token, 'tokentoken')
  return (
    <div className="bg-white ">
      <head>
        <title>Set Password | Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
     {/* <Header /> */} 

     <div className="category-section mx-auto">

       
        <SetPassword token={token}  /> 
 
      </div>

     {/* <Footer /> */}
    </div>
  );
}

export default page
