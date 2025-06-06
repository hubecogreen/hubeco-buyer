"use client";
import AuthData from "@/components/authFlow/AuthData";
// import ForgotPassword from "@/components/authFlow/ForgotPassword";
// import Login from "@/components/authFlow/Login";
// import ResetPassword from "@/components/authFlow/ResetPassword";
// import VerifyNumber from "@/components/authFlow/VerifyNumber";
// import BlogsDetails from "@/components/blogs/blogsDetails/BlogsDetails";

// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";

// import Head from "next/head";
// import { AiFillHome } from "react-icons/ai";

export default function Page() {
  return (
    <div className="bg-white ">
      {/* <Head>
        <title>Home | Blogs</title>
      </Head> */}
       <head>
        <title>Login | Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
     {/* <Header /> */} 

     <div className="category-section mx-auto">

        {/* <VerifyNumber mobileNumber={"9621363477"}/> */}
        {/* <Login/> */}
        <AuthData/>
        {/* <ResetPassword/> */}
        {/* <ForgotPassword/> */}
      </div>

     {/* <Footer /> */}
    </div>
  );
}
