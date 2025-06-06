// "use client";
// import AuthData from "@/components/authFlow/AuthData";
import ResetPassword from "@/components/authFlow/ResetPassword";
// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
import { Metadata } from "next";

// import Head from "next/head";
// import { useSearchParams } from "next/navigation";

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset Password to your account'
}

function page({ params }: { params: { id: string } }) {
 // // console.log('vwelihvr',params)

  const token = params.id

 // // console.log(token, 'tokentoken')
  return (
    <div className="bg-white ">
      {/* <Head>
        <title>Reset Password</title>
      </Head> */}
       <head>
        <title>Reset Password | Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
     {/* <Header /> */} 

      <div className="category-section  mx-auto" style={{}}>
     
       
        <ResetPassword token={token}  /> 
 
      </div>

     {/* <Footer /> */}
    </div>
  );
}

export default page
