// "use client";

// import React, { CSSProperties, useEffect, useState } from "react";
// import Footer from "@/components/footer/MainFooter";
// import Markdown from "react-markdown";
// import Header from "@/components/header/MainHeader";
// import * as Webservices from "../../network/WebServices";
// import remarkGfm from "remark-gfm";
// import * as getEndpoint from "../../network/EndPoints";
// import { AiFillHome } from "react-icons/ai";
// import Head from "next/head";
// import { CircularProgress } from "@chakra-ui/react";
// import { getCookie } from "cookies-next";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";

// export default function Page() {
//   const [privacyPolicy, setprivacyPolicy] = useState<string | undefined>();
//   const [content, setContent] = useState('');
//   const [h, setH] = useState('100')

//   useEffect(() => {
//     getData();

//     function resizeIFrameToFitContent( iFrame:any ) {

//       iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
//       iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
//   }

//   window.addEventListener('DOMContentLoaded', function(e) {

//       var iFrame = document.getElementById( 'iFrame1' );
//       resizeIFrameToFitContent( iFrame );

//       // or, to resize all iframes:
//       var iframes = document.querySelectorAll("iframe");
//       for( var i = 0; i < iframes.length; i++) {
//           resizeIFrameToFitContent( iframes[i] );
//       }
//   } );

//   }, []);

//   // useEffect(() => {
//   //   const fetchContent = async () => {
//   //     const response = await fetch('/public/policies/Privacy-and-Cookie-Policy_Hubeco.html'); // replace with your URL
//   //     const text = await response.text();
//   //    // // console.log('ewbertnyrt',text)
//   //     setContent(text);
//   //   };

//   //   fetchContent();
//   // }, []);

// const token=getCookie('token')

// const getData = () => {
//   Webservices.callGetApi(
//     getEndpoint.default.GETALLPOLICIES,
//     ''
//   )
//     .then((d: any) => {
//      // // console.log("data", d);
//       d?.data?.map((item: any) => {
//        // // console.log('policyitem',item._id)
//         if (item?.title === "Terms of Sale") {
//             Webservices.callGetApi(
//     getEndpoint.default.POLICYBYID+'/'+item._id,
//     token
//   )
//     .then((d: any) => {
//      // // console.log("data", d);
//       setprivacyPolicy(d?.data?.content);
//     })

//     .catch((err) => {
//      // // console.log("err", err);
//     });

//         }
//       })

//     })

//     .catch((err) => {
//      // // console.log("err", err);
//     });
// };

//   const markdownStyles: { [key: string]: CSSProperties } = {
//     h2: {
//       fontSize: "1.1rem",
//       fontWeight: "bold",
//       marginTop: "1rem",
//       marginBottom: "1rem",
//     },
//     p: {
//       marginBottom: "1rem",
//     },
//     ul: {
//       listStyleType: "disc",
//       marginLeft: "1.5rem",
//     },
//     li: {
//       marginBottom: "0.5rem",
//     },
//     strong: {
//       fontWeight: "bold",
//     },
//   };

//   useEffect(()=>{

//     window.addEventListener('message', function (event) {
//       // Check the origin of the message for security (optional)
//       // if (event.origin !== "https://your-domain.com") return;

//       if (event.data.type === 'IframeHeight') {
//         const iframe = document.getElementById('iFrame1');
//         if (iframe) {
//           iframe.className.height = event.data.height+150 + 'px'; // Set the height of the iframe
//          // // console.log('Heiegehe',iframe.className.height)
//           setH(iframe.className.height)
//         }
//       }
//     });
//   },[])

//   return (
//     <div className="bg-white">
//       {/* <Head>
//         <title>Vendor Terms of Sale | Hubeco Buyer</title>
//       </Head> */}
//        <head>
//         <title>Terms Of Sale | Hubeco</title>
//         {/* <meta name="description" content='' />
//         <meta name="keywords" content='' /> */}
//         {/* <meta name="author" content={productsData?.author.firstName} /> */}
//         {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
//       </head>
//      {/* <Header /> */}
//       <div className="banner-section h-[100%] overflow-y-scroll">
//         <div
//           className="md:px-20 px-10"
//           className={{
//             position: "relative",
//             backgroundImage: 'url("images/about/aboutBanner1.webp")',
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             height: "200px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "flex-start",
//             color: "#fff",

//             // padding: "0 80px",
//           }}
//         >
//           <a
//             href="/"
//             className="text-white flex items-center "
//             className={{
//               textDecoration: "none",
//               padding: "5px 10px",
//               borderRadius: "5px",
//             }}
//           >
//             <AiFillHome size={16} className="text-white mr-1.5" />
//             Home
//           </a>
//           <span className="text-white mx-2">/</span>
//           <a
//             href="#"
//             className="text-white"
//             className={{
//               textDecoration: "none",
//               padding: "5px 10px",
//               borderRadius: "5px",
//             }}
//           >
//             Vendor Terms of Sale
//           </a>
//         </div>
//         {/* <div className="bg-secondaryBg w-full"> */}
//           {/* <div className={{height:h}} className="py-12 px-4 lg:px-20 mx-auto max-w-[100%] pt-12 text-sm font-normal text-brown tracking-wide leading-8"> */}
//             {/* {privacyPolicy ? (

//               <div className={{  }} className="h-full">

//      <iframe src={privacyPolicy} id="iFrame1" height='100%' width='100%' className="w-full !h-full text-justify "
// ></iframe>

//     </div>
//             ) : (
//               <CircularProgress isIndeterminate color="#A92449"  />
//             )} */}
//              <div className={`w-full flex justify-center items-center mx-auto max-w-[100%]  text-sm  text-brown  leading-8 `} >
//         <Worker

//           workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}

//         >
//           {/* <Viewer fileUrl={privacyPolicy} /> */}
//           <Viewer    theme={'light'} fileUrl={'/images/policies/terms-of-sale.pdf'} />

//         </Worker>
//         </div>
//           </div>
//         {/* </div> */}
//        {/* </div> */}

//      {/* <Footer /> */}
//     </div>
//   );
// }

import React from "react";
import { AiFillHome } from "react-icons/ai";
import { getCookie } from "cookies-next";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-cream">
      <head>
        <title>Terms of Sale | Hubeco</title>
      </head>
      {/* <Header /> */}
      <div className="banner-section h-[100%]">
        <div
          className="md:px-20 px-10 relative bg-cover bg-center h-[200px] flex items-center justify-start text-white"
          style={{
            backgroundImage: 'url("images/about/aboutBanner1.webp")',
          }}
        >
          <Link
            href="/"
            className="text-white flex items-center px-2.5 py-1.5 rounded"
          >
            <AiFillHome size={16} className="text-white mr-1.5" />
            Home
          </Link>

          <span className="text-white mx-2">/</span>
          <Link
            href="#"
            className="text-white px-2.5 py-1.5 rounded no-underline"
          >
            Terms of Sale
          </Link>
        </div>

        <div
          className={`w-full flex justify-center items-center mx-auto max-w-[100%]  text-sm  text-brown  leading-8 `}
        >
          <div className="p-10 leading-loose text-justify">
            <p
              data-placeholder="Type or paste your content here!"
              className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;"
            >
              <span className="font-family:Poppins;font-size:6.0pt;">
                <i>
                  <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                    Effective from:
                  </span>
                </i>
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  November 1, 2024
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:115%;margin:0in 0in 10.0pt;text-align:justify;">
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>Welcome to Hubeco!!</strong>
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:115%;margin:0in 0in 10.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  We're delighted to have you here. These Terms of Sale are
                  designed to help you understand the guidelines and rules that
                  govern your use of our Platform. Please read them carefully,
                  as they set out your rights and responsibilities when using
                  our Services. By accessing or using Hubeco, you agree to
                  comply with these Terms.
                </span>
              </span>
            </p>
            <p className="background-color:white;line-height:115%;margin:11.0pt 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  This document is an electronic record in terms of the
                  Information Technology Act, 2000 and rules there under as
                  applicable and the amended provisions pertaining to electronic
                  records in various statutes as amended by the Information
                  Technology Act, 2000. This electronic record is generated by a
                  computer system and does not require any physical or digital
                  signatures.
                </span>
              </span>
            </p>
            <p className="background-color:white;line-height:115%;margin:11.0pt 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  This document is published in accordance with the provisions
                  of Rule 3 (1) of the Information Technology (Intermediaries
                  guidelines) Rules, 2011 that require publishing the rules and
                  regulations, Privacy Policy, and Terms of Sale for access or
                  usage of domain name
                </span>
              </span>
              <span className="text-[#2e3191] text-[10pt] underline p-1">
                <span
                  dir="ltr"
                  lang="EN-GB"
                  className="line-height:115%;"
                ></span>
              </span>
              <Link
                href="https://hubeco.market/"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
              >
                https://hubeco.market
              </Link>

              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  (the “<strong>Website</strong>
                  ”).
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <h2
              id="e6d34b12398bf5515c719ef89f68d8d0b"
              className="break-after:avoid;font-weight:normal;line-height:115%;margin:0.25in 0in 10.0pt;text-align:justify;"
            >
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>Your Service Provider:</strong>
                </span>
              </span>
            </h2>
            <p className="line-height:115%;margin:0in 0in 10.0pt;text-align:justify;">
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  These Terms of Sale (the “<strong>Terms</strong>
                  ”) constitute a legally binding agreement between
                </span>
              </span>
              <span className="background-color:#FAFAFA;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Hubeco Green Ventures Private Limited,
                </span>
              </span>
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span
                  dir="ltr"
                  lang="EN-GB"
                  className="line-height:115%;"
                ></span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  its subsidiaries, and affiliates
                </span>
              </span>
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  ("
                  <strong>Company</strong>
                  ," "<strong>we</strong>
                  ," "<strong>our</strong>
                  ," or "<strong>us</strong>
                  ") and Vendor (“
                  <strong>you</strong>
                  ”, or “<strong>your</strong>
                  ”). These Terms will be effective upon your acceptance of the
                  same (directly or indirectly in electronic form or by means of
                  an electronic record) and will govern the relationship between
                  us and you for the use of our Website
                </span>
              </span>
              <Link
                href="https://hubeco.market/"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
              >
                https://hubeco.market
              </Link>

              <span className="background-color:white;color:#3C78D8;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  ,
                </span>
              </span>
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  our Services
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  and any of our other websites, mobile or digital applications,
                  or any other services we offer from time to time by or in
                  connection therewith (together referred to as the “
                  <strong>Platform” or “Hubeco”</strong>)
                </span>
              </span>
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  .
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  The Platform is owned and operated by
                </span>
              </span>
              <span className="background-color:#FAFAFA;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Hubeco Green Ventures Private Limited
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  having its registered office at H No: 8-2-293/F-II/A/20A,
                  Filmnagar, Jubilee Hills, Shaikpet, Hyderabad, Telangana,
                  India, 500033.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 10.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  For the purpose of these Terms, wherever the context so
                  requires "<strong>you</strong>" or "<strong>your</strong>"
                  refers to any natural or legal person who has agreed to become
                  the Vendor (including their authorised users) on the Platform
                  by registering with us through their device or any other
                  individual or entity who accesses or interacts with the
                  Platform. For avoidance of doubt, the term “
                  <strong>User</strong>” shall collectively refer to the Buyer
                  and the Vendor. The applicability of these Terms extends to
                  users regardless of the device type used for accessing our
                  Platform, whether it be a laptop/desktop or a mobile/tablet
                  device.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <h2
              id="e901751ed0cb2eeda91e6a057464352df"
              className="break-after:avoid;font-weight:normal;line-height:115%;margin:0.25in 0in 10.0pt;text-align:justify;"
            >
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>About the Platform:</strong>
                </span>
              </span>
            </h2>
            <p className="line-height:115%;margin:0in 0in 10.0pt;text-align:justify;">
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  The following constitutes the
                  <strong>“Services”</strong>:
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 10.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Hubeco is an innovative e-commerce platform dedicated to
                  connecting B2C and B2B customers (the “<strong>Buyers</strong>
                  ”) and Vendors (the “<strong>Vendors</strong>
                  ”) within the sustainable construction and related sectors.
                  The Platform facilitates the sale and procurement of
                  eco-friendly building materials and/or related services. The
                  Platform ensures that all listed products meet green
                  certification standards, providing peace of mind regarding the
                  environmental impact and reliability of the products.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 10.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  By providing a comprehensive online marketplace, the Platform
                  enables Vendors to reach a larger customer base and sell their
                  Products online. Vendors have the flexibility to propose all
                  commercial and contractual terms, including but not limited to
                  Product pricing, applicable return and cancellation terms, and
                  shipping methods.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <h2
              id="ec3767ae572261e25ce367ea8d7afac3f"
              className="break-after:avoid;font-weight:normal;line-height:115%;margin:0.25in 0in 10.0pt;text-align:justify;"
            >
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>Acceptance of Terms:</strong>
                </span>
              </span>
            </h2>
            <p className="line-height:115%;margin:12.0pt 0in;text-align:justify;">
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Our role under these Terms is limited to administration and
                  managing the Platform, including any Services made available
                  to you on the Platform.
                </span>
              </span>
            </p>
            <p className="background-color:white;line-height:115%;margin:11.0pt 0in 0.0001pt;text-align:justify;">
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  ACCESSING, BROWSING, OR OTHERWISE USING THE PLATFORM INDICATES
                  YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE
                  TERMS, SO PLEASE READ THE TERMS CAREFULLY BEFORE PROCEEDING.
                </span>
              </span>
            </p>
            <p className="background-color:white;line-height:115%;margin:11.0pt 0in 0.0001pt;text-align:justify;">
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  By impliedly or expressly accepting these Terms, you also
                  accept and agree to be bound by our Privacy Policy as amended
                  from time to time
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  .
                </span>
              </span>
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  We encourage you to read the,
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span
                  dir="ltr"
                  lang="EN-GB"
                  className="line-height:115%;"
                ></span>
              </span>
              <Link
                href="https://hubeco.market/privacy-policy"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
              >
                Privacy Policy
              </Link>

              <span className="text-[#2e3191] text-[10pt] underline p-1">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  ,
                </span>
              </span>
              <Link
                href="https://hubeco.market/shipping-delivery"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
              >
                Delivery &amp; Shipping Policy
              </Link>

              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  and
                </span>
              </span>
              <Link
                href="https://hubeco.market/returns-refunds-cancellations"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
              >
                Return, Refund and Cancellation Policy
              </Link>

              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  in conjunction with these Terms to better understand how you
                  can update, manage, export, and delete your information.
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>
                    If you do not agree with anything provided herein, please do
                    not use or access our Platform and/or Services.
                  </strong>
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:115%;margin:12.0pt 0in;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  We reserve the unilateral right to change the particulars
                  contained in these Terms from time to time, without notice to
                  you and in our sole discretion. If we make any such revision
                  in these Terms, we will update the effective date above and
                  the revised Terms shall be effective from such date. You are
                  required to frequently check these Terms and their effective
                  date to understand the terms and conditions that apply to your
                  use of our Services. Your continued use of the Platform and/or
                  Services following such modification constitutes your
                  acceptance of the modified Terms of Sale, whether or not you
                  have read them.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:12.0pt 0in;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Further, we may change, suspend, and/or discontinue the
                  Services at any time, including the availability of any
                  feature, database, and content on the Platform. We may also
                  restrict your access to parts and/or all of the Platform
                  without notice in the event of technical disruptions or other
                  similar events and we shall not be liable to you in such
                  cases.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">1.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>VENDOR’S ELIGIBILITY</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                      <span className="pr-2">1.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We welcome individuals and entities to utilise our
                          Services, subject to adherence to these Terms of Sale.
                          To ensure clarity, Vendors, who use our Platform and
                          Services to list and sell their eco-friendly building
                          materials, must:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">1.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              be at least 18 years old and capable of forming a
                              legally binding agreement;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">1.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              have the authority to enter into agreements and
                              comply with the terms outlined in this Terms on
                              behalf of the entity, if applicable;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">1.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              have all necessary licences, permits,
                              certifications and authorizations for listing and
                              selling on the Platform;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">1.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              demonstrate the intention and capacity to utilise
                              the Services effectively.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                      <span className="pr-2">1.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Prohibited Individuals:</strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">1.2.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>Individuals under 18 years old</strong>:
                              Minors under the age of 18 are not eligible to use
                              our Services. If you are under 18, please refrain
                              from using our Platform without appropriate
                              parental or guardian consent.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">1.2.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>
                                Individuals barred from using the Services
                              </strong>
                              : Individuals who have been previously suspended
                              or prohibited from accessing our Services by us or
                              any competent authority are not allowed to use our
                              Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">1.2.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>
                                Individuals engaging in Illegal Activities
                              </strong>
                              : Individuals or entities engaged in or intending
                              to engage in any activity that is illegal under
                              applicable law, including but not limited to
                              fraud, money laundering, and terrorism financing.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">1.2.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>
                                Individuals with Conflicting Interests:
                              </strong>
                              Individuals or entities that have conflicts of
                              interest that would prevent them from complying
                              with these Terms or that would pose a risk to the
                              integrity of the Platform and its users.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">1.2.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>
                                Individuals from Sanctioned Territories
                              </strong>
                              :
                            </span>
                          </span>
                          <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You are prohibited from using our Platform if you
                              or the business entity you represent is domiciled,
                              registered, or conducts business in any country or
                              territory subject to financial and economic
                              sanctions, trade embargoes, or similar
                              restrictions imposed by Government of India,
                              including but not limited to Pakistan, North
                              Korea, and Syria. This also applies if you are
                              listed as a prohibited, sanctioned, debarred, or
                              denied party by the Directorate General of Foreign
                              Trade (DGFT) of India, the Reserve Bank of India
                              (RBI), the Ministry of External Affairs (MEA), or
                              any other relevant Indian authority. This Clause
                              shall also apply if you or the business entity you
                              represent is domiciled, registered, or conducts
                              business in any country or territory subject to
                              financial and economic sanctions, trade embargoes
                            </span>
                          </span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              United Nations, UN Security Council or any other
                              relevant UN agency.
                            </span>
                          </span>
                          <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You must obtain any required licence or government
                              authorization before accessing our services if you
                              fall under any of these categories.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                      <span className="pr-2">1.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Compliance with Laws:</strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">1.3.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You must comply with applicable laws, regulations,
                              and policies when using our Platform and/or
                              Services. It is your responsibility to ensure that
                              your use of the Platform does not violate any laws
                              or regulations in your jurisdiction.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">2.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>ACCESS OUR PLATFORM AND SERVICES</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <h2
                      id="e8eb2922dfb93650aa979547d50810921"
                      className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;"
                    >
                      <span className="pr-2">2.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Account Registration:</strong>
                        </span>
                      </span>
                    </h2>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              To utilise the Service, you must register with us
                              by setting up a Vendor Account (the “
                              <strong>Account</strong>
                              ”). At the time of the sign-up process, you must
                              furnish accurate, current, and complete
                              information, including but not limited to full
                              name, address, contact number, and email address.
                              If you are registering as an entity or a
                              corporation, it is obligatory to furnish the
                              details asked hereinabove in respect of the
                              company.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <h2
                      id="edc035b87548befdb05a84223a23fc761"
                      className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;"
                    >
                      <span className="pr-2">2.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Vendor Onboarding</strong>:
                        </span>
                      </span>
                    </h2>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.2.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              To ensure the integrity and reliability of
                              transactions on the Platform, all Vendors must
                              complete a comprehensive onboarding process. This
                              includes submitting a detailed questionnaire that
                              covers government-issued identifiers, bank account
                              details, cancelled cheques, tax compliance
                              credentials, product specifications, types,
                              features, relevant certifications and
                              accreditations (including quality and green
                              certifications), annual turnover, and market
                              presence, as well as any other information
                              required by the Platform. Following this, Vendors
                              must undergo a Know Your Customer (KYC) process
                              where the submitted information is reviewed and
                              approved by us.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.2.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Upon successful KYC approval, Vendors shall
                              receive credentials to access the Platform. Each
                              registered Vendor is assigned a dedicated Vendor
                              Module (“
                              <strong>Vendor Module</strong>
                              ”). In such Module, Vendors may list their
                              Products, which involves providing detailed
                              product information, quality certificates, product
                              validity, and all required company and tax
                              information. You must ensure that all information
                              provided is true, accurate, current, and complete.
                              The Platform reserves the right to suspend,
                              terminate, or indefinitely block any Vendor's
                              Account if the information provided is found to be
                              false, inaccurate, outdated, incomplete, or
                              otherwise discrepant.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.2.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You are responsible for maintaining the
                              confidentiality of your Account credentials and
                              are liable for all activities conducted under your
                              Account. If you have previously registered, you
                              should log in/sign in to your Account using the
                              same credentials provided during the registration
                              process.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <h2
                      id="e39a3a9f93c39e5aa430ebaf8a19b5126"
                      className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;"
                    >
                      <span className="pr-2">2.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Account Security and Update</strong>:
                        </span>
                      </span>
                    </h2>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.3.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You are responsible for safeguarding your Account
                              credentials and preventing unauthorised access to
                              your Account. Any unauthorised use of an Account
                              must be reported to the Company immediately for
                              investigation.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.3.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              If you suspect that unauthorised access has been
                              made to your Account, you must notify us
                              immediately by email at
                            </span>
                          </span>
                          <Link
                            href="mailto:info@hubeco.market"
                            className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
                          >
                            info@hubeco.market
                          </Link>

                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              . We will investigate any alleged unauthorised
                              Account activity. Notwithstanding any other terms
                              pertaining to our right to disable or block access
                              to your Account, we reserve the right to disable
                              or block your Account at any time when it is
                              suspected that unauthorised access has been made
                              to your Account.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.3.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              If you share or allow others to have access to
                              your Account, you assume exclusive liability and
                              responsibility for all activities conducted on
                              your Account, as well as any resulting
                              consequences.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.3.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You acknowledge and agree that we shall not bear
                              any liability or responsibility for the activities
                              or consequences arising from the use or misuse of
                              any information under your Account.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <h2
                      id="e24330ba1b19ddfdd4a8f1a791a6aeaa7"
                      className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;"
                    >
                      <span className="pr-2">2.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Vendor Responsibilities:</strong>
                        </span>
                      </span>
                    </h2>
                    <p className="pl-14">
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You agree:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              that your country of residence and/or your
                              company’s country of incorporation is the same as
                              the country specified in the contact and/or
                              billing address you provide us;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              to fully comply with all applicable laws and any
                              other contractual terms that govern your use of
                              the Platform (and any related interaction or
                              transaction), including those specific laws
                              applicable to you or your end users in any of your
                              geographical locations;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              to regularly and autonomously ensure the
                              preservation and backup of all your Content and
                              processed information concerning your Account and
                              Vendor Module and any application features,
                              services, or third-party services utilised,
                              connected, presented, or developed by you;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              to provide your Account information accurately and
                              failure to maintain such accurate information,
                              including having an invalid or expired payment
                              method, may result in the inability to access and
                              use the Services;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              to maintain the confidentiality of your password
                              and take responsibility for all activities
                              associated with your Account and Module. We retain
                              the right, at our sole discretion, to revoke,
                              reclaim, or modify a username (or first/last name)
                              you choose if we deem, in our judgement, that such
                              username is inappropriate, obscene, or otherwise
                              objectionable;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              to notify us in writing immediately if you become
                              aware of any disclosure of your password. You are
                              responsible for any activity on our Platform
                              arising out of any failure to keep your password
                              confidential and may be held liable for any losses
                              arising out of such a failure;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.7.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              to not create an Account on behalf of anyone other
                              than yourself without their permission.
                              Additionally, using a username with the intent to
                              impersonate another person, or using a username
                              Account that is subject to the rights of someone
                              else without proper authorization, is not allowed;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.8.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              to not assign or transfer your Account to any
                              other person or entity;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.9.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              to provide proof of identity to access or use the
                              Services in certain cases. Refusal to provide
                              proof of identity may result in denial of access
                              to or use of the Services;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.10.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              that we shall not bear any liability or
                              responsibility for the activities or consequences
                              arising from the use or misuse of any information
                              under your Account, including without limitation,
                              situations where you have neglected to update your
                              mobile phone number and/or email address on the
                              Platform;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.11.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              that in the event of a suspected security breach
                              or misuse of your Account, we reserve the right to
                              request a password change or suspend your Account,
                              without incurring any liability to the Company,
                              for a duration deemed appropriate in the
                              circumstances. We disclaim any responsibility for
                              any loss or damage resulting from your
                              non-compliance with this provision;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.12.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              that we do not provide any legal advice or any
                              recommendation with respect to any laws or
                              requirements applicable to your use or any of your
                              Subusers, or your compliance therewith; and
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.4.13.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              to comply with all applicable laws and use the
                              Services only for lawful purposes.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <h2
                      id="e67b107b36e3ddacab7f6d080361b0f71"
                      className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;"
                    >
                      <span className="pr-2">2.5.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Account Suspension and/or Deletion:</strong>
                        </span>
                      </span>
                    </h2>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.5.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You agree to (a) diligently log out from your
                              Account at the conclusion of each session, and (b)
                              promptly inform us of any unauthorised use of your
                              Account. In the event of a suspected security
                              breach or misuse of your Account, we reserve the
                              right to request a password change or suspend your
                              Account, without incurring any liability to the
                              Company, for a duration deemed appropriate in the
                              circumstances. We disclaim any responsibility for
                              any loss or damage resulting from your
                              non-compliance with this provision.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.5.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You shall be solely responsible for the accuracy
                              and correctness of all such details/information
                              given by you during Account setup. If we have
                              reason to doubt the correctness of any
                              details/information furnished by you or in case
                              any information furnished by you is found
                              incorrect, false, or misleading, we reserve the
                              right to cancel or suspend your registration
                              permanently or for such period as we deem fit.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">3.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>CONTENT GUIDELINES</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">3.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          In utilising the Platform and/or Services, you may
                          upload, post, provide, publish, display, link to, or
                          otherwise share information essential for the Services
                          through the Platform. This will include all the
                          information, images, and details regarding your
                          Products, and any logos, names, trademarks of your
                          corporation etc. (collectively referred to as "
                          <strong>Content</strong>
                          "). By doing so, you provide us with a worldwide,
                          irrevocable, non-exclusive, royalty-free licence to
                          employ, reproduce, store, adapt, publish, translate,
                          and distribute Content within the operational scope of
                          the Platform's functionalities. This includes but is
                          not limited to, promotional and advertising purposes
                          across any media now known or hereafter devised. You
                          acknowledge that we may utilise any Content you
                          consistent with our
                        </span>
                      </span>
                      <Link
                        href="https://hubeco.market/privacy-policy"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
                      >
                        Privacy Policy
                      </Link>

                      <span className="text-[#2e3191] text-[10pt] underline p-1">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        ></span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          on the Platform and you shall not be entitled to any
                          payment or other compensation for such use. It’s your
                          responsibility to ensure that your Content abides by
                          applicable laws and any agreement entered into. We
                          aren’t responsible for any harm resulting from
                          anyone’s access, use, purchase, or downloading of your
                          Content, or for any harm resulting from third-party
                          websites. You’re responsible for taking the necessary
                          precautions to protect yourself and your computer
                          systems from viruses, worms, Trojan horses, and other
                          harmful or destructive content.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">3.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          The Content must comply with the Content Standards set
                          out in this Clause. The Content must not-
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.2.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              contain any material that is defamatory, obscene,
                              indecent, abusive, offensive, harassing, violent,
                              hateful, inflammatory, or otherwise objectionable.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.2.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              promote sexually explicit or pornographic
                              material, violence, or discrimination based on
                              race, sex, religion, nationality, disability,
                              sexual orientation, or age.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.2.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              infringe any patent, trademark, trade secret,
                              copyright, or other intellectual property or other
                              rights of any other person.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.2.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              violate the legal rights (including the rights of
                              publicity and privacy) of others or contain any
                              material that could give rise to any civil or
                              criminal liability under applicable laws or
                              regulations or that otherwise may be in conflict
                              with these Terms of Sale, or our Privacy Policy.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.2.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              be likely to deceive any person.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.2.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              promote any illegal activity, or advocate,
                              promote, or assist any unlawful act.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.2.7.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              cause annoyance, inconvenience, or needless
                              anxiety or be likely to upset, embarrass, alarm,
                              or annoy any other person.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.2.8.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              impersonate any person, or misrepresent your
                              identity or affiliation with any person or
                              organisation.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.2.9.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              involve commercial activities or sales, such as
                              contests, sweepstakes, and other sales promotions,
                              barter, or advertising.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.2.10.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              give the impression that they emanate from or are
                              endorsed by us or any other person or entity if
                              this is not the case.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">3.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Your Content must not be misleading or unlawful, and
                          must not violate any of
                        </span>
                      </span>
                      <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          these Terms
                        </span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          , applicable laws, and regulations, or infringe or
                          misappropriate any rights of any person or entity.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">3.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You confirm that you possess and will continue to
                          maintain the complete authority, ownership, licences,
                          consents, and permissions necessary to authorise
                          Platform to access the Platform or any part thereof.
                          This authorization allows for the importing,
                          exporting, copying, displaying, uploading, publishing,
                          transmitting, and/or any other utilisation of your
                          Content.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">3.5.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You acknowledge that we may or may not pre-screen all
                          or any part of the Content. However, we retain the
                          right (but are not obligated) to pre-screen, refuse,
                          or remove any Content and/or Products from the
                          Platform at any time, for any reason. This includes,
                          but is not limited to, instances where we receive
                          claims, allegations, or complaints from third parties
                          and/or authorities related to such Content, or for no
                          reason at all. However, we do not endorse or guarantee
                          the accuracy, completeness, or reliability of any
                          Content.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">3.6.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You agree that you have obtained all consents and
                          permissions required under all applicable laws,
                          regarding the processing, storing, collection,
                          posting, transmission, and publication of any personal
                          information and/or image or likeness of any person,
                          entity, or property which is part of the Content, and
                          you will adhere to all laws applicable thereto.
                          Further, your Content is (and will continue to be)
                          true, current, accurate, non-harmful, non-infringing
                          upon any third party rights, and in no way unlawful
                          for you to upload, import, export, copy, possess,
                          post, publish, transmit, display or otherwise use, in
                          the country in which you or your Platform’s visitors
                          reside.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">3.7.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Feedback and Reviews</strong>: The following
                          terms constitute “<strong>Feedback Policy</strong>
                          ”:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.7.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              In order to improve customer experience, the
                              Platform implements a mechanism to rate and
                              provide reviews regarding the Vendors and the
                              Products on the Platform and such information
                              shall be available publicly on the Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.7.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              The Buyers may leave ratings and reviews on your
                              Products and services. The Company shall not bear
                              any responsibility for any adverse comment or
                              rating of the Products on the Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.7.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              If you provide us with any suggestions, comments
                              or other feedback relating to our Services and/or
                              Platform, which may or may not be subject to any
                              Intellectual Property rights (“
                              <strong>Feedback</strong>
                              ”), such Feedback shall be exclusively owned by
                              our Company. By providing such Feedback to us, you
                              acknowledge and agree that it may be used by us in
                              order to: (i) further develop, customise, and
                              improve our Services and/or Platform, (ii) provide
                              ongoing assistance and technical support, (iii)
                              contact you with general or personalised
                              platform-related notices and/or interview requests
                              based on your feedback or otherwise, (iv)
                              facilitate, sponsor, and offer certain promotions,
                              and monitor performance, (v) create aggregated
                              statistical data and other aggregated and/or
                              inferred information, which we may use to provide
                              and improve our Services, (vi) enhance our data
                              security and fraud prevention capabilities, and
                              (vii) comply with any applicable laws and
                              regulations.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.7.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              If you submit any Feedback, Hubeco may use such
                              Feedback for any purpose without any compensation
                              or obligation to you. We reserve the right to
                              remove any Feedback posted in our public forums
                              for any reason at our sole discretion.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.7.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              In addition, you (1) represent and warrant that
                              such Feedback are accurate, complete, and do not
                              infringe on any third-party rights; (2)
                              irrevocably assign to us any right, title, and
                              interest you may have in such Feedback and (3)
                              explicitly and irrevocably waive any and all
                              claims relating to any past, present, or future
                              moral rights, artists’ rights, or any other
                              similar rights worldwide in or to such Feedback.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:3.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">4.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>PRODUCT INFORMATION</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <h2
                      id="efca52d844dea7a76d00bb03d24de4c7b"
                      className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;"
                    >
                      <span className="pr-2">4.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Information Regarding Products:</strong>
                        </span>
                      </span>
                    </h2>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You understand that the Platform seeks to
                              encourage the use of sustainable and eco-friendly
                              materials, products (the “
                              <strong>Products</strong>
                              ”) and related services. Therefore, all the
                              Products listed on the Platform meet strict
                              quality and green certification standards.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              The Vendors shall provide comprehensive and
                              up-to-date information about each Product to be
                              listed on the Platform, to ensure transparency and
                              reliability for facilitating informed decisions
                              for the Buyers and smooth transactions. This
                              information includes, but is not limited to, the
                              following:
                            </span>
                          </span>
                        </p>
                        <ol className="list-className-type:none;padding-left:48px;">
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">4.1.2.1.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    Description
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  : A detailed description of the Vendor of that
                                  Product;
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">4.1.2.2.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    Product Specifications
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  : A thorough and accurate description of the
                                  Products such as product dimensions, weight,
                                  and a delimited list of technical
                                  specifications.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">4.1.2.3.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    Brand and Model
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  : Information about the brand and model of the
                                  Products.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">4.1.2.4.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    Images
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  : Digitised images accurately depicting the
                                  Product without additional logos, text, or
                                  markings.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">4.1.2.5.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    Pricing
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  : Listing price, including any tiered pricing
                                  options.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">4.1.2.6.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    Order Requirements
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  : Minimum order quantity.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">4.1.2.7.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    Legal Content
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  : Text, disclaimers, warnings, notices,
                                  labels, green certifications, LCA, EPD’s and
                                  other content required by applicable law for
                                  the offer, merchandising, advertising, or sale
                                  of the Product.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">4.1.2.8.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    Accessory Information
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  : Identifying information for accessories
                                  related to the Product, if available.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">4.1.2.9.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    Ratings and Reviews
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  : Ratings and reviews of the Product,
                                  providing feedback and insights from previous
                                  Buyers.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">4.1.2.10.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    Similar Products
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  : Listings of other Vendors offering similar
                                  Products, allowing Buyers to compare options
                                  and make informed purchasing decisions.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">4.1.2.11.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    Additional Information
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  : Any other information required by applicable
                                  law.
                                </span>
                              </span>
                            </p>
                          </li>
                        </ol>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You acknowledge and agree that you shall be solely
                              responsible for providing accurate and complete
                              information of your Products. It is your
                              responsibility to upload and maintain such
                              information when listing your Products on the
                              Platform. The Platform shall not be liable for any
                              inaccuracies, omissions, or misrepresentations in
                              the information provided by you.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You shall also be responsible for updating the
                              information about the Products or the information
                              about yourself as and when required, especially
                              regarding the availability of the Products or
                              otherwise.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              As a Vendor on this Platform, you are solely
                              responsible for providing accurate and up-to-date
                              product descriptions, including any claims related
                              to green certifications or environmental
                              attributes. This includes, but is not limited to,
                              certifications such as Life Cycle Assessment
                              (LCA), Environmental Product Declaration (EPD),
                              and other relevant certifications issued by
                              recognized third-party authorities or
                              organizations. You warrant that all information
                              provided about your Products is truthful,
                              complete, and not misleading.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You understand and agree that the Company does not
                              verify, validate, or endorse any green
                              certifications or environmental claims made by
                              Vendors. The Company expressly disclaims any
                              responsibility for the accuracy, authenticity, or
                              validity of any green certification or
                              environmental claim presented by you. Furthermore,
                              you shall indemnify and hold the Company harmless
                              from any claims, damages, or liabilities arising
                              from inaccuracies, misrepresentations, or errors
                              in the product descriptions or green
                              certifications provided by you.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.7.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              In the event that the Company becomes aware of any
                              discrepancies or misrepresentations in your
                              product descriptions or green certifications,
                              including those related to LCA or EPD claims, the
                              Company reserves the right to suspend or remove
                              your Products from the Platform without prior
                              notice.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">5.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>PLATFORM CHARGES</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <h2
                      id="e36db2344a6865622a56c477e82cf63a0"
                      className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:10.0pt;text-align:justify;"
                    >
                      <span className="pr-2">5.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Subscription Plans:</strong>
                        </span>
                      </span>
                    </h2>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              We offer monthly subscription plans for our
                              Services on our Platform to the Vendors, including
                              Freemium and Premium:
                            </span>
                          </span>
                        </p>
                        <ol className="list-className-type:none;padding-left:48px;">
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">5.1.1.1.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  <strong>Freemium Plan:</strong>
                                  As the name suggests, for Freemium Plan there
                                  is no monthly fee and is free of cost. This
                                  plan is designed specifically for small
                                  businesses and new Vendors. The Freemium Plan
                                  allows Vendors to list up to 5 Products on the
                                  Platform through their Module(s). In addition
                                  to Product listings, Vendors will have access
                                  to essential features such as order management
                                  and the ability to receive reviews and ratings
                                  from Buyers for their Products. Support for
                                  the Freemium Plan is provided through both
                                  email and phone channels, ensuring Vendors can
                                  get assistance when needed. This plan is
                                  intended to help new and small Vendors
                                  establish their presence on the Platform
                                  without incurring any initial costs.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">5.1.1.2.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  <strong>Premium Plan:</strong>
                                  For Vendors opting for the Premium Plan, which
                                  is perfect for established businesses seeking
                                  maximum exposure and sales growth, the monthly
                                  fee is Rs 5000/- exclusive of GST. This plan
                                  offers unlimited Product listings, allowing
                                  Vendors to showcase their full range of
                                  Products. Premium Plan subscribers will
                                  benefit from a dedicated account manager,
                                  providing personalised support and assistance
                                  from Hubeco. Additional features include
                                  without limitation comprehensive order
                                  management, the ability to receive product
                                  reviews and ratings and enhanced marketing
                                  support. Vendors will also gain access to
                                  sales and revenue analytics, as well as
                                  listings of projects, where their Products are
                                  deployed and/or their Buyers list on their
                                  Module, all aimed at maximising visibility and
                                  driving business growth.
                                </span>
                              </span>
                            </p>
                          </li>
                        </ol>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You need to select a subscription plan at the time
                              of registration that aligns with your requirements
                              and is suitable for the size of your business. The
                              detailed features and pricing of all Vendor
                              subscription plans are available at
                            </span>
                          </span>
                          <Link
                            href="https://hubeco.market/plans"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
                          >
                            Plans
                          </Link>

                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              .
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You shall have the option to choose between
                              starting with the Freemium plan or opting directly
                              for the Premium plan upon onboarding. This
                              flexibility allows you to select the plan that
                              best suits your immediate business needs and
                              growth objectives from the outset of your
                              engagement with our Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              The Company shall issue invoices to you for each
                              subscription purchased or renewed on the Platform.
                              The Company will generate and provide the invoice
                              to the Vendor within two (2) business days
                              following the purchase or renewal of the
                              subscription. It is the Vendor's responsibility to
                              ensure timely renewal of their subscription for
                              continued utilisation of the Platform and
                              services. Failure to renew the subscription may
                              result in the Vendor’s account being downgraded
                              from a Premium subscription to a Freemium
                              subscription. As a result, access to premium
                              features and functionalities will cease, and any
                              Premium features associated with the subscription
                              will no longer be available. For example, if the
                              Vendor is using Premium features that allow the
                              listing of six Products and they fail to renew,
                              the number of visible Products may be reduced in
                              accordance with the Freemium plan. You agree to
                              ensure that all information provided during the
                              subscription process is accurate and up-to-date.
                              The Company shall not be liable for any delays or
                              errors in the invoice issuance resulting from
                              inaccurate or incomplete information provided by
                              the Vendor.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <h2
                      id="e2db1bbcd1049bab1df7c9740e2efa56f"
                      className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:10.0pt;text-align:justify;"
                    >
                      <span className="pr-2">5.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Payment Terms:</strong>
                        </span>
                      </span>
                    </h2>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You are authorised to use valid credit/debit
                              cards, or any other accepted payment methods,
                              including online banking facilities, for the
                              purpose of purchasing the subscription plans on
                              our Platform. You are required to provide accurate
                              and complete details of your credit/debit cards,
                              Unified Payment Interface (UPI) details (if
                              applicable) or online banking accounts. It is your
                              responsibility to ensure the correctness of the
                              information provided, and any incurred costs,
                              expenses, losses, or damages resulting from the
                              submission of incorrect details are solely your
                              responsibility.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              We disclaim any responsibility and liability for
                              any loss or damage incurred by you during the
                              utilisation of available payment methods on the
                              Platform. This includes but is not limited to,
                              instances such as:
                            </span>
                          </span>
                        </p>
                        <ol className="list-className-type:none;padding-left:48px;">
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">5.2.2.1.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  Lack of authorization for a transaction;
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">5.2.2.2.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  Exceeding the mutually agreed preset limit
                                  between you and the respective bank;
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">5.2.2.3.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  Payment issues arising from the transaction;
                                  and/or
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">5.2.2.4.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  Transaction being declined due to any other
                                  reasons.
                                </span>
                              </span>
                            </p>
                          </li>
                        </ol>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              All payments made against the purchases on the
                              Platform by you shall be compulsorily in{" "}
                              <strong>Indian Rupee (INR)</strong>.
                            </span>
                          </span>
                          <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              The Platform will not facilitate transactions
                              concerning any other form of currency with respect
                              to the purchases made on the Platform. If you
                              choose to pay using a different currency, the
                              applicable conversion rate will apply, and any
                              conversion costs will be borne by you alone.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              We use PayU as a provider of payment gateway
                              services (“
                              <strong>Payment Processor</strong>
                              ”) on the Platform. You acknowledge and agree that
                              any payment made on the Platform shall also be
                              subject to the terms and conditions of PayU which
                              can be found
                            </span>
                          </span>
                          <span className="text-[#2e3191] text-[10pt] underline p-1">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            ></span>
                          </span>
                          <Link
                            href="https://payu.in/payu-terms-and-conditions/?utm_campaign=Search-Brand-PayU-Desktop&utm_medium=cpc&utm_source=google&utm_term=payu"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
                          >
                            here
                          </Link>

                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              .
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              By accepting these Terms, you expressly authorise
                              us and the Payment Processor to electronically
                              collect, process, facilitate, and remit payments,
                              including the subscription amount, through
                              electronic means on the Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You acknowledge, understand, and agree that the
                              payment facility provided by us constitutes
                              neither a banking nor financial service. Instead,
                              we function as a facilitator, offering an
                              electronic, automated online payment, and
                              remittance facility for transactions on the
                              Platform through the existing authorised banking
                              infrastructure and credit card payment gateway
                              networks. It is imperative to clarify that, in
                              providing the payment facility, we assume neither
                              the role of a trustee nor engage in a fiduciary
                              capacity concerning the transaction, thereby
                              absolving itself from such responsibilities.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.7.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              We affirm that the information provided by you in
                              this regard will be treated as confidential and
                              will not be divulged to any third party, except as
                              necessitated by the applicable laws, regulations,
                              and/or processes of any government authority,
                              and/or in connection with any judicial proceedings
                              pertaining to legal actions, suits, and/or
                              proceedings arising from or related to these
                              Terms.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.8.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              We diligently report and pursue both confirmed and
                              suspected instances of credit/debit card fraud. We
                              may request additional authorization from you and
                              the decision to seek further authorization rests
                              solely with us. We retain the right to annul,
                              postpone, decline delivery, or retract any
                              transaction in case of suspected fraud. We shall
                              not be held liable to you for any losses arising
                              from such cancellation.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.9.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              During the transaction process, we collect
                              specific information such as user ID, time, date,
                              IP address, and other relevant details aimed at
                              identifying individuals involved in fraudulent
                              activities. In cases where a transaction is
                              suspected to be fraudulent, all records will be
                              provided, with or without a notice, to law
                              enforcement agencies and the credit/debit card
                              company for a thorough fraud investigation. We are
                              committed to collaborating with authorities to
                              ensure the prosecution of offenders to the maximum
                              extent permitted by law.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.10.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You can manage your payment settings through your
                              Accounts. Payments are processed securely through
                              the Platform's designated payment gateway.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.11.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              We reserve the right to periodically review and
                              adjust pricing terms to adapt to market dynamics
                              and service enhancements. You will receive timely
                              notifications regarding any changes, and updates
                              will be accessible through the Platform, but this
                              will not affect payment for Services that have
                              been previously paid.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.2.12.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              The Platform will utilise the Payment Processor
                              for all chargebacks, including Vendor’s
                              Chargebacks and Buyer’s Chargebacks. If a
                              chargeback is approved by the Company, the refund
                              will be processed to the original source of
                              payment, with transaction charges deducted.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">6.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>CHARGEBACK POLICY</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <h2
                      id="e3844b6b38b6d458f092d96f6876bdc04"
                      className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:10.0pt;text-align:justify;"
                    >
                      <span className="pr-2">6.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>
                            Chargeback by Vendor for Subscription Plans
                          </strong>
                          :
                        </span>
                      </span>
                    </h2>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              If at any time, we record a decline, chargeback,
                              or other rejection of a charge for any payable
                              fees due directly to our Platform, on your Account
                              (“
                              <strong>Vendor’sChargeback</strong>
                              ”), this will be considered a breach of your
                              payment obligations hereunder. Consequently, your
                              Account will be automatically reverted to our
                              Freemium plan.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              When you are reverted to the Freemium plan, in the
                              event that plan’s limits, including features that
                              are offered, are exceeded, any data exceeding the
                              plan's allocated limits will be retained for a
                              period of one (01) month. If you fail to pay the
                              necessary subscription fee for the Premium Plan
                              and these limits continue to be exceeded after
                              this period, the excess data will be permanently
                              deleted after one one-month retention period as
                              specified in this Clause.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You agree that if a Vendor’s Chargeback is
                              initiated and determined to be unjustified or
                              fraudulent, we reserve the right to impose such
                              fees to cover administrative costs incurred. You
                              will be liable to pay within seven (7) days
                              following the date of our written request:
                            </span>
                          </span>
                        </p>
                        <ol className="list-className-type:none;padding-left:48px;">
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">6.1.3.1.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  An amount equal to the amount of the Vendor’s
                                  Chargeback;
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">6.1.3.2.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  All third-party expenses incurred by us in
                                  relation to the Vendor’s Chargeback, including
                                  charges made by our or your bank or payment
                                  processor or card issuer;
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">6.1.3.3.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  An administration fee in addition to taxes;
                                  and
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">6.1.3.4.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  All our reasonable costs, losses, and expenses
                                  incurred in recovering the amounts, including
                                  without limitation legal fees and debt
                                  collection fees.
                                </span>
                              </span>
                            </p>
                          </li>
                        </ol>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              If you have any inquiries or concerns regarding a
                              payment made to our Platform, we strongly
                              recommend reaching out to us at
                            </span>
                          </span>
                          <Link
                            href="mailto:info@hubeco.market"
                            className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
                          >
                            info@hubeco.market
                          </Link>

                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              before initiating a Vendor’s Chargeback or
                              reversing the payment. This proactive step ensures
                              that your subscription is not downgraded to the
                              free plan. Additionally, it helps avoid
                              unwarranted or erroneous Vendor’s Chargebacks,
                              which could result in downgrading your
                              subscription plan.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.1.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              We retain the right to dispute any Vendor’s
                              Chargeback received. This may involve providing
                              the relevant credit card company or financial
                              institution with pertinent information and
                              documentation demonstrating that you authorised
                              the transaction and received or utilised the
                              rendered services.  In such cases, you may be
                              required to repay all fees associated with the
                              Services purchased and subsequently charged back.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <h2
                      id="ea7bb4e8ff9c4ea525f6f2aab75a83e16"
                      className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;text-align:justify;"
                    >
                      <span className="pr-2">6.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Chargeback by Buyer:</strong>
                        </span>
                      </span>
                    </h2>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.2.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              A chargeback by Buyers (“
                              <strong>Buyer's Chargeback</strong>
                              ”) is a request initiated by Buyers to reverse a
                              transaction due to specific issues, as outlined in
                              the clause 6.2.3.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.2.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You acknowledge that any Buyer’s Chargeback must
                              be initiated within 7 days from the transaction
                              date. The requests for Buyer’s Chargeback can be
                              submitted by contacting Hubeco customer service.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.2.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Upon receiving a Buyer’s Chargeback request, our
                              support team will determine whether such request
                              is eligible or not. To determine the eligibility,
                              following factors (including but not limited to)
                              are taken into consideration-
                            </span>
                          </span>
                        </p>
                        <ol className="list-className-type:none;padding-left:48px;">
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">6.2.3.1.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  If the Buyer purchased a Product and it is not
                                  delivered by you within the estimated delivery
                                  date;
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">6.2.3.2.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  If the Product delivered by you is different
                                  from the description of the Product that was
                                  ordered by the Buyer; and/or
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">6.2.3.3.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  If you fail to meet the quality standards of
                                  the product and the Buyer is not satisfied.
                                </span>
                              </span>
                            </p>
                          </li>
                        </ol>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.2.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Further, Hubeco's support team will conduct a
                              thorough review of the provided evidence and may
                              contact you for additional information. You may be
                              required to provide evidence to substantiate your
                              claim, which may include photographs, payment
                              records, or any other relevant documentation.
                              Optionally, we may require the Buyers to furnish
                              such required information and documents to support
                              their claim. The review process will be completed
                              within 14 days of receiving the Buyer’s Chargeback
                              request.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.2.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              If Buyer’s Chargeback request is approved, the
                              Buyer will receive a full refund within 7 business
                              days from the Vendors. If the request is denied, a
                              detailed explanation will be provided to the
                              Buyer, and the transaction will remain unchanged.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.2.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              In the event of a disagreement, Buyers and Vendors
                              are encouraged to resolve the issue amicably
                              through our dispute resolution process. If the
                              dispute is not resolved, Hubeco will render a
                              final decision based on the available evidence.
                              This decision will be binding on both parties.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.2.7.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              To minimise Buyer’s Chargebacks, you need to
                              provide accurate product descriptions, ensure
                              timely delivery, and maintain high-quality
                              standards. You are required to respond promptly to
                              Buyer’s Chargeback inquiries and cooperate with
                              Hubeco during the investigation process. Repeated
                              Chargebacks against you may result in penalties or
                              suspension from the Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">6.2.8.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Any costs incurred by Hubeco in this process, will
                              be adjusted in the payments made by you.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="pr-2">7.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>CANCELLATION OF YOUR SUBSCRIPTION PLAN</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">7.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You may cancel your subscription plans at any time by
                          accessing your Account settings on the Platform. It
                          should be noted that subsequent subscription payments
                          for the Premium Plan are due and payable 30 days after
                          the initial subscription date. Please note, that due
                          to the monthly subscription nature, refunds are not
                          available if the subscription is terminated before the
                          end of the monthly billing cycle.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">7.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Please note that if you fail to renew your Premium
                          plan or fail to pay the Premium subscription fee, you
                          shall be automatically reverted to the Freemium Plan.
                          In such cases, any features that are offered to
                          Premium subscribers will no longer be accessible. You
                          will be limited to listing only 5 Products in the
                          Freemium plan.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">7.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          If you are dissatisfied with the quality of our
                          Services, please promptly contact us to express your
                          concerns. We will address your complaints as soon as
                          possible. To terminate your agreement, you must
                          clearly inform us of your decision to withdraw from
                          the agreement by email at
                        </span>
                      </span>
                      <Link
                        href="mailto:info@hubeco.market"
                        className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
                      >
                        info@hubeco.market
                      </Link>

                      <span className="text-[#2e3191] text-[10pt] underline p-1">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        ></span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          before the 30-day notice period. We will acknowledge
                          receipt of your cancellation promptly.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">7.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Plan Apportionment:</strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">7.4.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Please note that changing/switching your
                              subscription plan in the middle of a current
                              subscription period, will be subject to the
                              following conditions:
                            </span>
                          </span>
                        </p>
                        <ol className="list-className-type:none;padding-left:48px;">
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">7.4.1.1.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  If you upgrade your plan from Freemium to
                                  Premium at any time, the fee shall be charged
                                  and payable from such date, and the new
                                  subscription period will start from the date
                                  of the upgrade.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">7.4.1.2.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  If you downgrade your plan from Premium to
                                  Freemium at any time, the fees for the
                                  remaining subscription period shall not be
                                  refunded. The new subscription period will
                                  start from the date of the downgrade.
                                </span>
                              </span>
                            </p>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">7.5.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Loss of Data, Content, and Capacity:</strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">7.5.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              If your Account or any Services or third-party
                              services related to your Account are cancelled
                              (whether at your request or at Platform’s
                              discretion), it may cause or result in the loss of
                              certain content, features, or capacity of your
                              Account, including your Content, any analysis,
                              lists of projects or Buyers or other usage data
                              retained therein (“
                              <strong>Capacity Loss</strong>
                              ”). We shall not be liable in any way for such
                              Capacity Loss, or for saving a backup of your
                              Account, Content, or such other data. Please also
                              note that additional fees may apply to the
                              re-activation of your Account and/or any Services
                              following their cancellation, as determined by the
                              Platform in its sole discretion.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">7.5.2.</span>
                          <span className='font-family:"Times New Roman",serif;font-size:6.0pt;'>
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              ​
                            </span>
                          </span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Following the termination of your Account, we
                              reserve the right to delete all data in the normal
                              course of operation. Data cannot be recovered once
                              your Account or access to our Services is
                              terminated.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">8.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>LICENCE FOR PLATFORM ACCESS</strong>
                    </span>
                  </span>
                </p>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Subject to your compliance with these Terms and the payment of
                  applicable fees, if any, we provide you with a limited licence
                  to access and make personal use of this Platform. However, you
                  are not authorised to download any content (other than page
                  caching) or modify the Platform, or any portion of it, except
                  with our express written consent. This licence explicitly
                  excludes any resale or commercial use of this Platform or its
                  contents, the collection and use of any product listings,
                  descriptions, or prices, any derivative use of this Platform
                  or its contents, any downloading or copying of Account
                  information for the benefit of another seller, or any use of
                  data mining, robots, or similar data gathering and extraction
                  tools.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h1
                  id="e7e4056e613966a7b504d0d03a0c73c26"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:10.0pt;text-align:justify;"
                >
                  <span className="pr-2">9.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>CONFIDENTIALITY</strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">9.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          For purposes of these Terms, “
                          <strong>Confidential  Information”</strong>
                          means any information or materials disclosed by or on
                          behalf of the Company or the Vendor to the other party
                          before, on or after the Effective Date that: (a) if
                          disclosed in writing or in the form of tangible
                          materials, is marked “confidential” or “proprietary”
                          or with a similar designation at the time of such
                          disclosure; (b) if disclosed orally or presented
                          visually, is identified as “confidential” or 
                          “proprietary” at the time of such disclosure, and is
                          summarised in writing sent by the Disclosing Party to
                          the Receiving Party within thirty (30) days after any
                          such disclosure; or (c) due to its nature or the
                          circumstances of its disclosure, a person exercising
                          reasonable business judgement would understand to be
                          confidential or proprietary. The existence of these
                          Terms, the Services and payment terms, and the fact
                          that the parties are engaged in discussions with
                          respect thereto will be deemed Confidential
                          Information of each party.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
            <ol className="list-className-type:none;padding-left:96px;">
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:6.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="pr-2">9.2.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      For the purposes of this clause, the “
                      <strong>Disclosing Party</strong>” shall mean the party
                      who has disclosed its Confidential Information to the
                      other party in furtherance of the fulfilment of the
                      purposes of this Agreement, and “
                      <strong>Receiving Party</strong>” shall mean the party who
                      has come into the possession of or with whom the
                      Confidential Information has been shared by the Disclosing
                      Party. Both Disclosing Party and Receiving Party shall be
                      collectively referred to as “<strong>Parties</strong>
                      ”.
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:0px;">
                  <li>
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">9.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          The Parties agree and acknowledge that the
                          Confidential Information shall not include information
                          that: (a) is or becomes a part of the public domain
                          through no act or omission of the Receiving Party; (b)
                          was in the Receiving Party’s lawful possession prior
                          to the disclosure and had not been obtained by the
                          either party either directly or indirectly from the
                          Disclosing Party; (c) is lawfully disclosed to the
                          Receiving Party by a third party without restriction
                          on the disclosure; (d) needs to be disclosed pursuant
                          to an order of a court, administrative agency or other
                          government body; or (e) is independently developed by
                          the Receiving Party.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
            <ol className="list-className-type:none;padding-left:96px;">
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:6.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="pr-2">9.4.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      The Parties agree and undertake as follows:
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-14 pl-8">
                    <p className="line-height:115%;margin-bottom:6.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">9.4.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          that the Receiving Party shall not, without the prior
                          written permission of the Disclosing Party, directly
                          or indirectly disclose or cause to be disclosed any
                          Confidential Information to any third party;
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:0px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:6.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">9.4.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              that the Receiving Party shall take all steps as
                              may be reasonably necessary to protect the
                              integrity of the Confidential Information and to
                              ensure avoiding any unauthorized disclosure
                              thereof;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:6.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">9.4.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              that the Receiving Party shall promptly inform the
                              Disclosing Party of any accidental disclosure of
                              Confidential Information and shall take all steps,
                              together with the Disclosing Party, to retrieve
                              and protect the Confidential Information;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:6.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">9.4.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              that the Receiving Party shall use the
                              Confidential Information only for the purpose for
                              which it was provided and shall not use it for
                              personal benefit or profit from the same in any
                              unauthorized manner; and
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:6.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">9.4.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              upon request by the Disclosing Party, the
                              Receiving Party shall hand over possession of all
                              Confidential Information furnished pursuant to
                              this Agreement.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p className="line-height:115%;margin-bottom:6.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">9.5.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          For the sake of clarity, the restrictions placed on
                          Confidential Information under this Clause shall
                          remain in force indefinitely.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                <span className="pr-2">10.</span>
                <span className="font-family:Poppins;font-size:6.0pt;">
                  <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                    <strong>INTELLECTUAL PROPERTY RIGHTS</strong>
                  </span>
                </span>
              </p>
              <ol className="list-className-type:none;padding-left:0px;">
                <li className="md:pl-8 pl-4">
                  <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                    <span className="pr-2">10.1.</span>
                    <span className="font-family:Poppins;font-size:6.0pt;">
                      <span
                        dir="ltr"
                        lang="EN-GB"
                        className="line-height:115%;"
                      >
                        <strong>Ownership Rights</strong>:
                      </span>
                    </span>
                  </p>
                  <ol className="list-className-type:none;padding-left:48px;">
                    <li className="md:pl-14 pl-8">
                      <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                        <span className="pr-2">10.1.1.</span>
                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            You acknowledge that no ownership of the Platform is
                            being transferred. All rights, Intellectual
                            Property, and interests in the Platform remain the
                            exclusive property of the Company, its affiliates,
                            or its licensors.
                          </span>
                        </span>
                      </p>
                    </li>
                  </ol>
                </li>
                <li className="md:pl-8 pl-4">
                  <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                    <span className="pr-2">10.2.</span>
                    <span className="font-family:Poppins;font-size:6.0pt;">
                      <span
                        dir="ltr"
                        lang="EN-GB"
                        className="line-height:115%;"
                      >
                        <strong>Intellectual Property Rights:</strong>
                      </span>
                    </span>
                  </p>
                  <ol className="list-className-type:none;padding-left:48px;">
                    <li className="md:pl-14 pl-8">
                      <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                        <span className="pr-2">10.2.1.</span>
                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            All rights, title, and interest in and to the
                            Platform, including any and all copyrightable
                            materials or any other content thereof which is or
                            may be subject to any intellectual property rights
                            under any applicable law (including any artwork,
                            graphics, images, website templates, and widgets,
                            literary work, source, and object code, computer
                            code (including HTML), applications, audio, music,
                            video and other media, designs, animations,
                            interfaces, documentation, derivatives and versions
                            thereof, the “look and feel” of the Platform
                            Services, methods, products, algorithms, data,
                            interactive features and objects, advertising and
                            acquisition tools and methods, inventions, trade
                            secrets, logos, domains, customised URLs,
                            trademarks, service marks, trade names and other
                            proprietary identifiers, whether or not registered
                            and/or capable of being registered (collectively, “
                            <strong>Intellectual Property</strong>
                            ”), and any derivations thereof, are owned by and/or
                            licensed to the Company.
                          </span>
                        </span>
                      </p>
                    </li>
                    <li className="md:pl-14 pl-8">
                      <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                        <span className="pr-2">10.2.2.</span>
                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            Subject to the provisions of these Terms, we grant
                            you a limited, non-exclusive, non-transferable
                            licence to access and use our Platform strictly for
                            its intended purposes. This licence explicitly does
                            not confer any ownership rights to you, and any
                            unauthorised use constitutes a material breach of
                            these Terms.
                          </span>
                        </span>
                      </p>
                    </li>
                    <li className="md:pl-14 pl-8">
                      <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                        <span className="pr-2">10.2.3.</span>
                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            All copyright and other intellectual property rights
                            in the material on our Platform are reserved.
                          </span>
                        </span>
                      </p>
                    </li>
                    <li className="md:pl-14 pl-8">
                      <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                        <span className="pr-2">10.2.4.</span>
                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            All intellectual property rights discovered,
                            developed, or otherwise coming into existence as a
                            result of, for the purposes of, or in connection
                            with, the Platform or the provision of any Services
                            will automatically vest in and are assigned to us,
                            including any enhancements, improvements and
                            modifications to the Intellectual Property. You must
                            not represent to anyone or in any manner whatsoever
                            that you are the proprietor of the Platform and/or
                            Intellectual Property.
                          </span>
                        </span>
                      </p>
                    </li>
                    <li className="md:pl-14 pl-8">
                      <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                        <span className="pr-2">10.2.5.</span>
                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            We respect the intellectual property rights of
                            others, and you are expected to do the same.
                            Uploading, posting, or otherwise transmitting any
                            content that infringes on the Company's or any third
                            party’s intellectual property rights is strictly
                            prohibited. We reserve the right to promptly remove
                            any infringing content.
                          </span>
                        </span>
                      </p>
                    </li>
                    <li className="md:pl-14 pl-8">
                      <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                        <span className="pr-2">10.2.6.</span>
                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            These Terms of Sale permit you to use the Platform
                            for your personal use only. This means you are not
                            permitted to resell or give away any of the content
                            you view or download. You are not permitted to
                            reproduce, modify, create derivative works of,
                            publicly display, publicly perform, or republish any
                            of the material on our Platform, except as follows:
                          </span>
                        </span>
                      </p>
                      <ol className="list-className-type:none;padding-left:48px;">
                        <li className="md:pl-20 pl-10">
                          <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                            <span className="pr-2">10.2.6.1.</span>
                            <span className="font-family:Poppins;font-size:6.0pt;">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                Your computer may store copies of such materials
                                in RAM incidental to your accessing and viewing
                                those materials.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li className="md:pl-20 pl-10">
                          <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                            <span className="pr-2">10.2.6.2.</span>
                            <span className="font-family:Poppins;font-size:6.0pt;">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                You may store files that are automatically
                                cached by your Web browser for display
                                enhancement purposes.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li className="md:pl-20 pl-10">
                          <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                            <span className="pr-2">10.2.6.3.</span>
                            <span className="font-family:Poppins;font-size:6.0pt;">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                You may print or download a reasonable number of
                                pages of the Platform for your own personal use
                                and not for further reproduction, publication,
                                or distribution.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li className="md:pl-20 pl-10">
                          <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                            <span className="pr-2">10.2.6.4.</span>
                            <span className="font-family:Poppins;font-size:6.0pt;">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                If we provide desktop, mobile, or other
                                applications for download, you may download a
                                single copy to your computer or mobile device
                                solely for your own personal, non-commercial
                                use, provided you agree to be bound by our end
                                user licence agreement, if any, for such
                                applications.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li className="md:pl-20 pl-10">
                          <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                            <span className="pr-2">10.2.6.5.</span>
                            <span className="font-family:Poppins;font-size:6.0pt;">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                If we provide social media features with certain
                                content, you may take such actions as are
                                enabled by such features.
                              </span>
                            </span>
                          </p>
                        </li>
                      </ol>
                    </li>
                    <li className="md:pl-14 pl-8">
                      <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                        <span className="pr-2">10.2.7.</span>
                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            You must not:
                          </span>
                        </span>
                      </p>
                      <ol className="list-className-type:none;padding-left:48px;">
                        <li className="md:pl-20 pl-10">
                          <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                            <span className="pr-2">10.2.7.1.</span>
                            <span className="font-family:Poppins;font-size:6.0pt;">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                Modify copies of any materials from this
                                Platform.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li className="md:pl-20 pl-10">
                          <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                            <span className="pr-2">10.2.7.2.</span>
                            <span className="font-family:Poppins;font-size:6.0pt;">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                Use any illustrations, photographs, video or
                                audio sequences, or any graphics separately from
                                the accompanying text.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li className="md:pl-20 pl-10">
                          <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                            <span className="pr-2">10.2.7.3.</span>
                            <span className="font-family:Poppins;font-size:6.0pt;">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                Delete or alter any copyright, trademark, or
                                other proprietary rights notices from copies of
                                materials from this Platform.
                              </span>
                            </span>
                          </p>
                        </li>
                      </ol>
                    </li>
                    <li className="md:pl-14 pl-8">
                      <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                        <span className="pr-2">10.2.8.</span>
                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            These Terms do not convey any right or interest in
                            or to the Company’s Intellectual Property (or any
                            part thereof), except only for the limited licence
                            expressly granted above. Nothing in these Terms
                            constitutes an assignment or waiver of the Company’s
                            Intellectual Property rights under any law.
                          </span>
                        </span>
                      </p>
                    </li>
                  </ol>
                </li>
                <li className="md:pl-8 pl-4">
                  <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                    <span className="pr-2">10.3.</span>
                    <span className="font-family:Poppins;font-size:6.0pt;">
                      <span
                        dir="ltr"
                        lang="EN-GB"
                        className="line-height:115%;"
                      >
                        <strong>Use of Your Intellectual Property:</strong>
                      </span>
                    </span>
                  </p>
                  <ol className="list-className-type:none;padding-left:48px;">
                    <li className="md:pl-14 pl-8">
                      <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                        <span className="pr-2">10.3.1.</span>
                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            You retain ownership rights to your Content. By
                            providing us with the Content, you grant us a
                            worldwide, royalty-free, perpetual, irrevocable, and
                            sublicensable right to use, reproduce, modify,
                            adapt, publish, translate, distribute, perform, and
                            display such Content. To the extent that your
                            Content includes personal information of you or
                            third parties, it will be handled in accordance with
                            our
                          </span>
                        </span>
                        <Link
                          href="https://hubeco.market/privacy-policy"
                          rel="noopener noreferrer"
                          target="_blank"
                          className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
                        >
                          Privacy Policy
                        </Link>

                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            .
                          </span>
                        </span>
                      </p>
                    </li>
                    <li className="md:pl-14 pl-8">
                      <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                        <span className="pr-2">10.3.2.</span>
                        <span className="font-family:Poppins;font-size:6.0pt;">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="line-height:115%;"
                          >
                            You acknowledge and agree that:
                          </span>
                        </span>
                      </p>
                      <ol className="list-className-type:none;padding-left:48px;">
                        <li className="md:pl-20 pl-10">
                          <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                            <span className="pr-2">10.3.2.1.</span>
                            <span className="font-family:Poppins;font-size:6.0pt;">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                if you elect to upload any information or any
                                Content to the Platform you:
                              </span>
                            </span>
                          </p>
                          <ol className="list-className-type:none;padding-left:48px;">
                            <li className="md:pl-24 pl-12">
                              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                <span className="pr-2">10.3.2.1.1.</span>
                                <span className="font-family:Poppins;font-size:6.0pt;">
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    represent and warrant that you either have
                                    the rights in that information or Content or
                                    have the necessary permission to upload,
                                    post, transmit or otherwise make available
                                    that information or Content via the
                                    Platform;
                                  </span>
                                </span>
                              </p>
                            </li>
                            <li className="md:pl-24 pl-12">
                              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                <span className="pr-2">10.3.2.1.2.</span>
                                <span className="font-family:Poppins;font-size:6.0pt;">
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    are solely responsible for that information
                                    or your Content and that we will not be
                                    liable for any loss, expenses, liabilities,
                                    costs, or damages that are caused by the
                                    information you provide on the Platform; and
                                  </span>
                                </span>
                              </p>
                            </li>
                            <li className="md:pl-24 pl-12">
                              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                <span className="pr-2">10.3.2.1.3.</span>
                                <span className="font-family:Poppins;font-size:6.0pt;">
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="line-height:115%;"
                                  >
                                    you have procured all necessary rights from
                                    third parties, which are from time to time
                                    required in order for us to be able to
                                    provide the Platform or the Services to you.
                                  </span>
                                </span>
                              </p>
                            </li>
                          </ol>
                        </li>
                        <li className="md:pl-20 pl-10">
                          <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                            <span className="pr-2">10.3.2.2.</span>
                            <span className="font-family:Poppins;font-size:6.0pt;">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                For the avoidance of doubt, and in accordance
                                with all applicable privacy laws, it is your
                                responsibility to ensure that you have received
                                prior consent from the third party required for
                                you to provide to us their information for use
                                under these Terms.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li className="md:pl-20 pl-10">
                          <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                            <span className="pr-2">10.3.2.3.</span>
                            <span className="font-family:Poppins;font-size:6.0pt;">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                You agree that we may refer to you, your
                                business name, publish your logo and/or
                                trademark and make reference to you as a
                                customer of ours in any communications or
                                publications for the purposes of marketing or
                                promoting our business provided that any
                                proposed communication or reference is approved
                                in writing in advance by you.
                              </span>
                            </span>
                          </p>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="pr-2">11.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>REPORT COPYRIGHT INFRINGEMENTS</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:0px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">11.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You agree not to upload or transmit any communications
                          or your Content that infringe or violate the rights of
                          any party while using the Platform. We do not permit
                          infringing materials to remain on the Platform and
                          encourage users to promptly notify us if they believe
                          any materials on the Platform, including
                          advertisements or linked Content, infringe third-party
                          copyrights.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">11.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Upon receipt of a proper notice of claimed
                          infringement under the Copyright Act,1957 (the “
                          <strong>Act</strong>
                          ”), we will respond promptly to remove or disable
                          access to the allegedly infringing material. We will
                          follow the procedures specified in the Act to resolve
                          the claim between the notifying party and the alleged
                          infringer responsible for the Content.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">11.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          To report copyright infringement issues, please reach
                          out to us at
                        </span>
                      </span>
                      <Link
                        href="mailto:info@hubeco.market"
                        className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
                      >
                        info@hubeco.market
                      </Link>

                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          .
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">11.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We reserve a right to terminate contractual
                          relationships with third parties who repeatedly
                          infringe the copyrights of others.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">11.5.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          In the event that we receive notice regarding a
                          copyright infringement, we may cancel your Account, or
                          remove the Content in our sole discretion, with or
                          without prior notice to you. Any notices filed
                          pursuant to this, may be deemed accepted, applicable,
                          and compliant with the Act, or not, at our sole
                          reasonable discretion. We reserve the right to notify
                          the person or entity providing the infringement notice
                          of such an action and provide any details included
                          therein.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">11.6.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          The Company has no obligation to monitor or enforce
                          any intellectual property rights that may be
                          associated with the Content you provide to us, but the
                          Company does have the right to enforce such rights
                          through any means it sees fit.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">12.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>ACCEPTABLE AND PROHIBITED USES</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:0px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">12.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Subject to your compliance with
                        </span>
                      </span>
                      <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          these Terms
                        </span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          , including the '<strong>Prohibited Uses</strong>'
                          defined in Clause 12.6 below, we grant you a
                          non-exclusive, non-transferable, revocable licence to:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              access the Services; and
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              download any portion of the Content for utilising
                              our Services.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">12.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Subject to compliance with
                        </span>
                      </span>
                      <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          these Terms
                        </span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          , we may offer to provide the Services, as more
                          comprehensively described on the Platform. These
                          Services, selected by you, are intended solely for
                          your own use and are not to be used or exploited for
                          the benefit of any third party.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">12.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          The provision of Services will be carried out on a
                          best-efforts basis. We do not provide any warranties
                          for the continuous availability or the accuracy of any
                          content on the Platform or Content
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">12.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You agree to be polite and respectful when you
                          communicate or interact with others on the Platform or
                          otherwise as a result of accessing our Services.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">12.5.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You agree to not encourage others to create an
                          Account, leave a review, or otherwise interact with a
                          third-party website, application, or service unless
                          authorised by us.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">12.6.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Prohibited Uses:</strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              While using the Platform and/or Services, you
                              consent to abstain from activities that contravene
                            </span>
                          </span>
                          <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              these Terms
                            </span>
                          </span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              , encompassing fraudulent acts, spamming, hacking,
                              and any actions that could disrupt the operations
                              of the Platform and/or Services;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You are strictly prohibited from using any Buyer's
                              contact or delivery information obtained through
                              the Platform to circumvent the Platform and
                              conduct offline business. This includes but is not
                              limited to, contacting Buyers directly to arrange
                              sales or transactions outside of the Platform,
                              using Buyer information for marketing purposes not
                              approved by the Platform, and sharing Buyer
                              information with third parties without the
                              explicit consent of the Buyer and the Platform.
                              Any violation of this clause will be considered a
                              breach of these Terms and may result in penalties,
                              including suspension or termination of your
                              Account.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You agree not to directly or indirectly,
                              circumvent, avoid, bypass, obviate, or negotiate
                              with any other user (either registered with the
                              Platform, initially communicated through the
                              Platform, without the prior written consent of the
                              Company. You acknowledge that any breach of this
                              non-circumvention obligation will result in
                              significant harm to the Company and agree to
                              indemnify the Company for any losses incurred as a
                              result of such breach.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              While using the Platform and/or Services, you are
                              strictly prohibited from assuming the identity of
                              others, utilising counterfeit accounts, or
                              indulging in any conduct that may falsely
                              represent their identity;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You shall not edit or otherwise modify any
                              material on our Platform unless you own or control
                              the relevant rights in the material;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You are prohibited from probing, scanning, or
                              testing the vulnerability of our Platform and/or
                              Services without our permission;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.7.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You are prohibited from copying, modifying,
                              creating derivative works of, downloading,
                              adapting, reverse engineering, emulating,
                              migrating to another service, translating,
                              compiling, decompiling, or disassembling the
                              Platform, the Services (or any part thereof),
                              Vendor Module or any content offered by Platform
                              or third party services for use and/or any part
                              thereof in any way, or publicly display, perform,
                              transmit or distribute any of the foregoing
                              without our prior written and specific consent
                              and/or as expressly permitted under
                            </span>
                          </span>
                          <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              these Terms
                            </span>
                          </span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              ;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.8.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You agree not to submit, transmit, or display or
                              use the Content in a context, that may be deemed
                              as defamatory, libellous, obscene, harassing,
                              threatening, incendiary, abusive, racist,
                              offensive, deceptive, or fraudulent, encouraging
                              criminal or harmful conduct, or which otherwise
                              violates the rights of the Platform or any third
                              party (including any intellectual property rights,
                              privacy rights, contractual or fiduciary rights),
                              or otherwise shows any person, entity or brand in
                              a bad or disparaging light, without their prior
                              explicit approval;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.9.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You agree not to publish and/or make any use of
                              the Platform and/or Services on any website,
                              media, network, or system other than those
                              provided by the Company, and/or frame, “deep
                              link”, “page-scrape”, mirror and/or create a
                              browser or border environment around any of the
                              Services and/or Platform (or any part thereof),
                              except as expressly permitted by the Company, in
                              advance and in writing;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.10.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You are prohibited from using our Platform and/or
                              Services to copy, store, host, transmit, send,
                              use, publish, or distribute any material that
                              consists of or is linked to any spyware, computer
                              virus, Trojan horse, worm, keystroke logger,
                              rootkit, or other malicious computer software;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.11.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You are prohibited from decrypting or deciphering
                              any communications sent by or to our Platform
                              without our permission;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.12.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You agree not to purchase search engine or other
                              pay-per-click keywords (such as Google AdWords),
                              or domain names that use Company or Company’s
                              marks and/or variations and misspellings thereof;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.13.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You shall not conduct any systematic or automated
                              data collection activities, which include without
                              limitation scraping, data mining, data extraction,
                              and data harvesting on or in relation to our
                              Platform without our express written consent;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.14.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You shall not use our Platform except by means of
                              our public interfaces;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.15.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You shall not use data collected from our Platform
                              for any direct marketing activity, including
                              without limitation email marketing, SMS marketing,
                              telemarketing, and direct mailing;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.16.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You agree not to remove or alter any copyright
                              notices, watermarks, restrictions; and signs
                              indicating proprietary rights of any of our
                              licensors, including copyright mark [©], creative
                              commons [(cc)] indicators, or trademarks [® or ™]
                              contained in or accompanying the Services;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.17.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You must not do anything that interferes with the
                              normal use of our Platform and/or Services;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.18.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Systematically retrieve data or other content from
                              the Services to create or compile, directly or
                              indirectly, a collection, compilation, database,
                              or directory without written permission from us;
                              and
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">12.6.19.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Engage in any automated use of the system, such as
                              using scripts to send comments or messages, or
                              using any data mining, robots, or similar data
                              gathering and extraction tools.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
            <p className="line-height:115%;margin:10.0pt 0in;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>Additional activities that are prohibited</strong>
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 10.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  You may not access or use the Platform and/or our Services for
                  any purpose other than that for which we make the Services
                  available. The Services may not be used in connection with any
                  commercial endeavours except those that are specifically
                  endorsed or approved by us.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 10.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  You agree not to:
                </span>
              </span>
            </p>
            <ol className="list-className-type:lower-alpha;padding-left:96px;">
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">a.</span>Trick, defraud, or mislead
                      us and other users, especially in any attempt to learn
                      sensitive account information such as user passwords.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">b.</span>Circumvent, disable, or
                      otherwise interfere with security-related features of the
                      Platform, including features that prevent or restrict the
                      use or copying of any content or enforce limitations on
                      the use of the Platform and Services and/or the content
                      contained therein.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">c.</span>Disparage, tarnish, or
                      otherwise harm, in our opinion, us and/or the Services.
                      Use any information obtained from the Platform in order to
                      harass, abuse, or harm another person.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">d.</span>Make improper use of our
                      Platform and/or Services or submit false reports of abuse
                      or misconduct.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">e.</span>Use the Services in a
                      manner inconsistent with any applicable laws or
                      regulations.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">f.</span>Engage in unauthorised
                      framing of or linking to the Services.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">g.</span> Upload or transmit (or
                      attempt to upload or to transmit) viruses, Trojan horses,
                      or other material, including excessive use of capital
                      letters and spamming (continuous posting of repetitive
                      text), that interferes with any party’s uninterrupted use
                      and enjoyment of the Platform and/or Services or modifies,
                      impairs, disrupts, alters, or interferes with the use,
                      features, functions, operation, or maintenance of the
                      Platform and/or Services.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">h.</span>Attempt to impersonate
                      another user or person or use the username of another
                      user.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">i.</span> Upload or transmit (or
                      attempt to upload or to transmit) any material that acts
                      as a passive or active information collection or
                      transmission mechanism, including without limitation,
                      clear graphics interchange formats ('gifs'), 1×1 pixels,
                      web bugs, cookies, or other similar devices (sometimes
                      referred to as 'spyware' or 'passive collection
                      mechanisms' or 'pcms').
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">j.</span> Interfere with, disrupt,
                      or create an undue burden on the Platform or the networks
                      or services connected to the Platform.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">k.</span> Harass, annoy,
                      intimidate, or threaten any of our employees or agents
                      engaged in providing any portion of the Services to you.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">l.</span> Attempt to bypass any
                      measures of the Platform and/or Services designed to
                      prevent or restrict access to the Platform and/or
                      Services, or any portion of the Platform and/or Services.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">m.</span>Copy or adapt the
                      Software, including but not limited to Flash, PHP, HTML,
                      JavaScript, or other code.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">n.</span>Except as permitted by
                      applicable law, decipher, decompile, disassemble, or
                      reverse engineer any of the software comprising or in any
                      way making up a part of the Platform and Services.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">o.</span>Except as may be the
                      result of the standard search engine or Internet browser
                      usage, use, launch, develop, or distribute any automated
                      system, including without limitation, any spider, robot,
                      cheat utility, scraper, or offline reader that accesses
                      the Platform, or use or launch any unauthorised script or
                      other software.
                    </span>
                  </span>
                </p>
              </li>
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">p.</span> Make any unauthorised use
                      of the Platform and/or Services, including collecting
                      usernames and/or email addresses of users by electronic or
                      other means for the purpose of sending unsolicited emails,
                      or creating Account(s) by automated means or under false
                      pretences.
                    </span>
                  </span>
                </p>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  You acknowledge and agree that your failure to abide by any of
                  the foregoing or any misrepresentation made by you herein may
                  result in the immediate termination of your Account and/or any
                  Services provided to you – with or without further notice to
                  you, and without any refund of amounts paid on account of any
                  such Services.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">13.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>PROFANITY POLICY</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">13.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We strictly prohibit the use of racist, hateful,
                          sexual, or obscene language in any public area on the
                          Platform. This policy encompasses text within
                          listings, Dashboards, reviews, customer support and
                          all other sections of the Platform that may be viewed
                          by other users. You are encouraged to report any
                          violations of this policy for prompt review, including
                          without limitation:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">13.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              offensive display names; and/or
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">13.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              offensive language in a listing or otherwise.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">13.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          If any feedback comment, communication between users
                          on the Platform, or email exchange related to
                          transactions conducted on the Platform includes
                          profanity, you are encouraged to submit a formal
                          request at
                        </span>
                      </span>
                      <span className="text-[#2e3191] text-[10pt] underline p-1">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        ></span>
                      </span>
                      <Link
                        href="mailto:info@hubeco.market"
                        className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
                      >
                        info@hubeco.market
                      </Link>

                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          .
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">13.3.</span>
                      <span className="background-color:white;color:#212121;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Disciplinary action may result in the indefinite
                          suspension of your Account, temporary suspension, or a
                          formal warning
                        </span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          .
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:3.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">14.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>EMAIL ABUSE AND THREAT POLICY</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">14.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Private communication, including email correspondence
                          and chat support, conducted by you is not directly
                          regulated by us. We strongly encourage you to maintain
                          a professional, courteous, and respectful tone when
                          communicating. While we generally do not intervene in
                          private communications, we will thoroughly investigate
                          and take appropriate action against certain types of
                          unwanted emails and communications that violate any or
                          all of our policies.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">14.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          One such violation includes without limitation, spoof
                          (fake) emails. It is essential to note that we will
                          never request sensitive information from you through
                          email. If you ever receive a spoof email claiming to
                          be from us and asking for sensitive information, we
                          urge you to promptly report it to us on
                        </span>
                      </span>
                      <Link
                        href="mailto:info@hubeco.market"
                        className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
                      >
                        info@hubeco.market
                      </Link>

                      <span className="text-[#2e3191] text-[10pt] underline p-1">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        ></span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          for further investigation and necessary action.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:3.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">15.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>FAIR USAGE POLICY</strong>
                    </span>
                  </span>
                </p>
              </li>
            </ol>
            <p className="line-height:115%;margin:12.0pt 0in;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  As part of our commitment to maintaining a high-quality user
                  experience, we monitor Vendor activities on our Platform. This
                  includes keeping records of Vendor transaction history and
                  other pertinent details related to Platform usage. These
                  practices are in place to ensure that all Vendors engage with
                  our services responsibly and in accordance with our policies.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:12.0pt 0in;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  In cases where there is evidence of misuse of our Platform or
                  a breach of these Terms, such as excessive order cancellations
                  or unjustified refusal to fulfil orders that are not incorrect
                  or defective, we reserve the right to cease providing our
                  Services to the Vendor.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">16.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>CLAIMS AGAINST OBJECTIONABLE CONTENT</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">16.1.</span>
                      <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          While you have the responsibility to ensure that the
                          Product specification page on the Platform includes
                          accurate and compliant details, including but not
                          limited to:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">16.1.1.</span>
                          <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              The total price in a single figure for any goods
                              or services, along with the breakup of the price,
                              displaying all mandatory and voluntary charges
                              such as delivery charges and applicable taxes, as
                              applicable. These details will also be available
                              on the invoice issued to the Buyer;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">16.1.2.</span>
                          <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Mandatory notices and information mandated by
                              applicable laws;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">16.1.3.</span>
                          <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Products and services offered by the Vendor,
                              including the place of origin, which is essential
                              for enabling the Buyer to make an informed
                              decision at the pre-purchase stage; and/or
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">16.1.4.</span>
                          <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Importer information and guarantees related to the
                              authenticity or genuineness of the imported
                              Products;
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  If you encounter objectionable content, including content that
                  falls within any provision of these terms, please contact us
                  at
                </span>
              </span>
              <span className="text-[#2e3191] text-[10pt] underline p-1">
                <span
                  dir="ltr"
                  lang="EN-GB"
                  className="line-height:115%;"
                ></span>
              </span>
              <Link
                href="mailto:info@hubeco.market"
                className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
              >
                info@hubeco.market
              </Link>

              <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  .
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">17.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>VENDOR REPRESENTATIONS</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">17.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          By using the Platform, you represent and warrant that:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">17.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              All the information you submit will be true,
                              accurate, current, and complete;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">17.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You will maintain the accuracy of such information
                              and promptly update such information as necessary;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">17.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You have the legal capacity and you agree to
                              comply with
                            </span>
                          </span>
                          <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              these Terms
                            </span>
                          </span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              ;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">17.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You will cooperate with the Platform for any
                              reasonable requests including requests for
                              information regarding the Products and related
                              services.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">17.1.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You shall not, directly or indirectly, engage,
                              participate, or negotiate in any transaction with
                              a third party introduced or identified by the
                              Company, without the express written consent of
                              the Company. This includes but is not limited to
                              placing and accepting orders, entering into
                              contracts, or engaging in business transactions
                              with such third parties outside of the Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">17.1.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Your use of the Platform shall be solely for your
                              own purposes;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">17.1.7.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              If you register on our Platform as the
                              representative of any entity, you represent that
                              you are authorised to act on behalf of such entity
                              and that such entity shall be bound to comply with
                            </span>
                          </span>
                          <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              these Terms
                            </span>
                          </span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              upon your acceptance of
                            </span>
                          </span>
                          <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              these Terms
                            </span>
                          </span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              ;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">17.1.8.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You are not a minor in the jurisdiction in which
                              you reside and you are responsible for adhering to
                              your country's laws when accessing our Platform
                              and utilising our Services, given that the Company
                              is located in India;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">17.1.9.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You will not access the Platform through automated
                              or non-human means, whether through a bot, script,
                              or otherwise;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">17.1.10.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You will not use the Platform for any illegal or
                              unauthorised purpose; and
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">17.1.11.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Your use of the Services and/or Platform will
                              comply with all applicable laws and regulations
                              (including, without limitation, all applicable
                              laws regarding online conduct and acceptable
                              content, licensing, privacy, data protection, the
                              transmission of technical data exported from India
                              or the country in which you reside, the use or
                              provision of financial services, notification and
                              consumer protection, unfair competition, and false
                              advertising).
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">18.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>LINKS TO THE THIRD-PARTY WEBSITES</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">18.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We may provide
                        </span>
                      </span>
                      <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          links to third-party sites on our Platform as a
                          convenience to you. Y
                        </span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          ou hereby acknowledge that when you access third-party
                          sites, you do so at your own risk.
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">18.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You understand that external sites are beyond our
                              control, and we are not accountable for the
                              content, functionality, accuracy, legality,
                              appropriateness, or any other aspect of such
                              external websites or resources. The inclusion of
                              any link does not imply endorsement or sponsorship
                              by us or any association with its operators.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">18.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              We may provide access to services from external or
                              third-party service providers, seamlessly
                              integrated into our Platform. You acknowledge and
                              agree that any issues or non-performance of such
                              services will be addressed on a best-effort basis,
                              subject to the pass-through obligations as agreed
                              with the external/third-party service providers.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">18.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You are advised to exercise caution when
                              navigating external sites and using integrated
                              services and carefully review the terms and
                              conditions and privacy policies of all off-website
                              pages and other websites that you visit.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">18.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              We reserve the right to modify or remove links to
                              third-party sites and services at any time without
                              notice. Continued use of our Platform constitutes
                              acceptance of any modifications to the links
                              provided.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">18.1.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You acknowledge that we collaborate with external
                              or third-party service providers to enhance the
                              user experience. Any collaborative efforts aim to
                              improve services but are subject to the terms and
                              conditions agreed upon with the respective service
                              providers.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">18.1.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              You may be notified when you are leaving our
                              Platform and redirected to access a third-party
                              site or service. Additionally, we are not
                              responsible for any content, advertisements,
                              products, or other materials available on external
                              sites or through integrated services.
                            </span>
                          </span>
                        </p>
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <br data-cke-filler="true" />
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">19.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>PLATFORM AVAILABILITY</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">19.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          While we do our best to keep the Platform and Services
                          up and running all the time, we can't promise it will
                          always be perfect. Sometimes, there might be
                          interruptions, delays, or errors, or the Platform
                          might not be free of viruses. If there are any
                          problems, we'll try our best to fix them as soon as
                          possible.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">19.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You need the internet to use the Platform, and you'll
                          have to cover the costs for that. We won't be
                          responsible for those costs.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">19.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          The Platform might not work with every device or
                          software out there, and sometimes we'll need to update
                          it, which might make some parts temporarily
                          unavailable.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">19.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We're not liable for any business losses or other
                          indirect losses you might experience while using the
                          Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">19.5.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You're responsible for having the proper internet
                          connection and devices to use our Services. If you use
                          wireless devices, you might have to pay extra fees to
                          your mobile network. And while we try to make sure our
                          Services work on most devices, we can't guarantee
                          they'll work perfectly on every single one.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="pr-2">20.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>SECURITY OF YOUR INFORMATION</strong>
                    </span>
                  </span>
                </p>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 10.0pt;text-align:justify;">
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Please take a moment to review our Privacy Policy which
                  governs not only your visit to the Platform but also details
                  the terms related to the collection of information from you,
                  security measures, access to your data, and the transfer of
                  your information. Rest assured, any personal information or
                  data you share with us while using the Platform is treated
                  with the utmost confidentiality and is strictly handled in
                  accordance with our
                </span>
              </span>
              <Link
                href="https://hubeco.market/privacy-policy"
                rel="noopener noreferrer"
                target="_blank"
                className="bg-white text-[#2E3191] font-[Poppins] text-[6pt] leading-[115%]"
              >
                Privacy Policy
              </Link>

              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  , as well as applicable laws and regulations. If you have any
                  objections to the transfer or use of your information, we
                  kindly advise against using the Platform. Your privacy and
                  trust are of utmost importance to us, and we strive to
                  maintain the highest standards of data protection and
                  security.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">21.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>TERMINATION</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">21.1.</span>
                      <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          These Terms
                        </span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          shall remain in full force and effect while you use
                          the Platform and/or Services. WITHOUT LIMITING ANY
                          OTHER PROVISION OF THESE TERMS, WE RESERVE THE RIGHT
                          TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR
                          LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES
                          AND/OR PLATFORM (INCLUDING BLOCKING CERTAIN IP
                          ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO
                          REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY
                          REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN
                          THESE TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE
                          MAY TERMINATE YOUR USE OR PARTICIPATION IN THE
                          SERVICES AND ANY CONTENT OR INFORMATION THAT YOU
                          POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE
                          DISCRETION.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">21.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          If we terminate or suspend your Account for any
                          reason, you are prohibited from registering and
                          creating a new Account under your name, a fake or
                          borrowed name, or the name of any third party, even if
                          you may be acting on behalf of the third party. In
                          addition to terminating or suspending your Account, we
                          reserve the right to take appropriate legal action,
                          including without limitation pursuing civil, criminal,
                          and injunctive redress.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="background-color:white;line-height:115%;margin-bottom:12.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                      <span className="pr-2">21.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We reserve the right to immediately suspend or
                          terminate your access to our Platform and/or Services
                          in the event you breach or default on any obligation
                          that is incapable of being cured. If the default is
                          capable of cure but remains uncured within fifteen
                          (15) business days after receiving notice of such
                          default, the Company reserves the right to suspend or
                          terminate your access. For the purposes of this
                          provision, a material breach shall include, but is not
                          limited to, any violation of the clauses outlined in
                          these Terms.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">21.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We may terminate the access to our Platform and/or
                          Services by providing written notice to you if:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">21.4.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              you fail to remedy a material breach of these
                              Terms within two (02) days of being notified of
                              the breach;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">21.4.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              you become bankrupt, enter a voluntary
                              arrangement, are in liquidation or receivership,
                              cease business, threaten to cease business, or are
                              otherwise insolvent.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">21.5.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You have the liberty to terminate your Accounts
                          whenever you wish by adhering to the instructions that
                          are clearly outlined on the Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">21.6.</span>
                      <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Clauses including Indemnity, Disclaimer, and
                          Limitation of Liability shall survive termination of
                          these Terms.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">22.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>MODIFICATIONS AND INTERRUPTIONS</strong>
                    </span>
                  </span>
                </p>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  We reserve the right to change, modify, or remove the contents
                  of the Platform and/or Services at any time or for any reason
                  at our sole discretion without notice. However, we have no
                  obligation to update any information on our Platform. We
                  cannot guarantee that the Services will be available at all
                  times. We may experience hardware, software, or other problems
                  or need to perform maintenance related to the Platform,
                  resulting in interruptions, delays, or errors. We reserve the
                  right to change, revise, update, suspend, discontinue, or
                  otherwise modify the Services at any time or for any reason
                  without notice to you. You agree that we have no liability
                  whatsoever for any loss, damage, or inconvenience caused by
                  your inability to access or use the Platform during any
                  downtime or discontinuance of the Platform. Nothing in
                </span>
              </span>
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  these Terms
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  will be construed to obligate us to maintain and support the
                  Platform or to supply any corrections, updates, or releases in
                  connection therewith.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">23.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>WARRANTIES AND DISCLAIMERS</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">23.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE
                          BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE
                          AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY
                          LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
                          IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF,
                          INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES
                          OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                          AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR
                          REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF
                          THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES
                          OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE
                          WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1)
                          ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND
                          MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF
                          ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO
                          AND USE OF THE SERVICES, (3) ANY UNAUTHORISED ACCESS
                          TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL
                          INFORMATION AND/OR FINANCIAL INFORMATION STORED
                          THEREIN, (4) ANY INTERRUPTION OR CESSATION OF
                          TRANSMISSION TO OR FROM THE SERVICES, AND (5) ANY
                          BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE
                          TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD
                          PARTY. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE
                          RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU
                          AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
                          AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH
                          ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR
                          BEST JUDGEMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">23.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You acknowledge that the Company will undertake no
                          liability in the event there is any discrepancy or
                          mismatch in Product information with the actual
                          Product that may lead to a diluted customer experience
                          which can lead to unnecessary returns and refunds
                          impacting your performance ratings in future as well
                          as the final payment remittance to you.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">23.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You acknowledge that you are solely responsible for
                          ensuring the accuracy, validity, and timeliness of any
                          green certifications associated with the Products
                          listed by you on the Platform. You are further
                          responsible for monitoring the expiration dates of any
                          certifications and must promptly update or remove
                          expired certifications. Any reliance on third-party
                          authorities for the issuance of green certifications
                          is at your own risk, and the Company disclaims any
                          responsibility for verifying or validating these
                          certifications. The Company shall not be held liable
                          for the actions, conduct, or credibility of any
                          third-party certifying authority.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">23.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You warrant that all representations regarding green
                          certifications or environmental attributes are
                          truthful and not misleading. The Company reserves the
                          right to request documentation to verify the accuracy
                          of any certification claims made by you.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">23.5.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You understand that any contract for the sale of any
                          Product or services shall be a strictly bipartite
                          contract between the Vendor and the Buyer. The
                          Platform maintains control and involvement in the
                          negotiation or acceptance of these terms at its
                          discretion, reserving the right to determine or
                          provide guidance on such terms.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">23.6.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You expressly agree not to accept orders directly once
                          connected through the Platform. All orders, without
                          exception, must be processed exclusively through the
                          Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">23.7.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Except as provided in
                        </span>
                      </span>
                      <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          these Terms
                        </span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          , no further warranty, condition, undertaking, or
                          term, express or implied, statutory or otherwise as to
                          the condition, quality, performance, or fitness for
                          the purpose of the Services provided in accordance
                          with
                        </span>
                      </span>
                      <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          these Terms
                        </span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          is given by us, other than as required by law. All
                          implied warranties are hereby excluded.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">23.8.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We do not recommend the use of the Services for
                          hosting personal content and shall not bear any
                          security or integrity obligations or risks regarding
                          breach or damage to any such content.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt 21.25pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="pr-2">24.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>LIMITATION OF LIABILITY</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">24.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We bear no responsibility for any secondary,
                          resultant, or incidental harm that may occur due to
                          the utilisation or inability to utilise the Platform
                          and/or Services.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">24.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          In no event will we or our directors, employees, or
                          agents be liable to you or any third party for any
                          direct, indirect, consequential, exemplary,
                          incidental, special, or punitive damages, including
                          lost profit, lost revenue, loss of data, or other
                          damages arising from your use of the Platform and/or
                          Services, even if we have been advised of the
                          possibility of such damages.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">24.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We shall not be liable for:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">24.3.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Unsuccessful transactions, delays, or financial
                              losses due to events beyond our control or
                              third-party services;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">24.3.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              The Platform not meeting individual requirements,
                              containing defects, or causing damage due to cyber
                              attacks or other breaches beyond our control;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">24.3.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Internet transmissions not being entirely private
                              or secure; messages may be read by others; and/or
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">24.3.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Under various legal theories, we shall not be
                              liable for loss of profits, revenue, goodwill, or
                              any indirect or consequential damages arising from
                              the use of the Platform and/or Services. You
                              should be aware of potential risks in internet
                              transmissions.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">24.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Furthermore, we shall not be liable for any harmful
                          effects, including physical injury or property damage,
                          resulting from the use of Products purchased through
                          the Platform. The Vendor is solely responsible for
                          ensuring that all Products meet specified quality
                          standards, certifications, and safety requirements.
                          The Buyer acknowledges that the Vendor is obligated to
                          maintain quality as per the stipulated specifications
                          and certifications, and any deviation from these
                          standards is the sole responsibility of the Vendor.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">24.5.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You acknowledge and agree that these limitations of
                          liability are agreed allocations of risk constituting
                          in part the consideration for our Services to you, and
                          such limitations will apply even if we have been
                          advised of the possibility of such liabilities.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">25.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>INDEMNIFICATION</strong>
                    </span>
                  </span>
                </p>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  You are solely and exclusively responsible for your use of the
                  Services:
                </span>
              </span>
            </p>
            <ol className="list-className-type:none;padding-left:96px;">
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="pr-2">25.1.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      You agree to defend, indemnify, and hold us harmless,
                      including our subsidiaries, affiliates, and all of our
                      respective officers, agents, partners, and employees, from
                      and against any loss, damage, liability, claim, or demand
                      received or suffered by us, including reasonable
                      attorneys' fees and expenses, made by any third party due
                      to or arising out of (1) your contributions; (2) your use
                      of the Platform, Services, Platform, and/or the Content;
                      (3) the non-performance or harmful effects of Products
                      that are not in line with the specified requirements; (4)
                      breach of
                    </span>
                  </span>
                  <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      these Terms
                    </span>
                  </span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      ; (5) any breach of your representations and warranties
                      set forth in
                    </span>
                  </span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      these Terms (6) your violation of the rights of a third
                      party, including but not limited to intellectual property
                      rights; (7) any overt harmful act toward any other user of
                      the Platform with whom you connected via the Platform; or
                      (8) any inaccuracies or errors in the results provided by
                      the Platform. Notwithstanding the foregoing, we reserve
                      the right, at your expense, to assume the exclusive
                      defence and control of any matter for which you are
                      required to indemnify us, and you agree to cooperate, at
                      your expense, with our defence of such claims. We will use
                      reasonable efforts to notify you of any such claim,
                      action, or proceeding that is subject to this
                      indemnification upon becoming aware of it.
                    </span>
                  </span>
                </p>
              </li>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:10.0pt;text-align:justify;">
                  <span className="pr-2">26.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>DISPUTE RESOLUTION AND GOVERNING LAW</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:0px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">26.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You expressly acknowledge and agree that we shall have
                          the right to enforce these Terms against you.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">26.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          These Terms shall be construed in accordance with the
                          applicable laws of Hyderabad, Telangana, India.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">26.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          If any dispute or claim arises from or in connection
                          with (i) these Terms, and/or (ii) your access to or
                          use of our Platform and/or Services, the relevant
                          parties shall resolve the dispute through amicable
                          negotiations but in case the conflict continues the
                          parties will resort for the dispute resolution
                          procedure set out herein.
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">26.3.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>Mediation:</strong>
                              In the event that the parties are unable to agree
                              to a mutually agreeable decision and a dispute or
                              difference arises in connection with the
                              interpretation or implementation of these Terms,
                              the parties agree that they will submit to a
                              binding confidential mediation that will be held
                              in Hyderabad, Telangana, India and in accordance
                              with the applicable laws of India.  The mediation
                              shall be conducted in English by a mediator that
                              is mutually agreed upon by the Parties, as far as
                              possible. The costs of the mediation shall be
                              borne equally by all parties. The parties hereby
                              waive any and all right to have these Terms of
                              Sale adjudicated by a court or jury. The mediation
                              proceedings shall be carried out in Hyderabad,
                              Telangana, India. In accordance with the
                              applicable laws of India. The mediator shall issue
                              a final decision within sixty (60) days from the
                              commencement of mediation proceedings.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">26.3.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>Arbitration:</strong>
                              In the event that the mediation fails to resolve
                              the dispute within the sixty (60) day period, the
                              parties agree to submit the dispute to binding
                              arbitration. The arbitration shall be conducted in
                              Hyderabad, Telangana and in accordance with the
                              applicable laws of India. The arbitration shall be
                              conducted in English by a sole arbitrator
                              appointed jointly by the parties, as far as
                              possible. The arbitrator must be independent. The
                              arbitrator must issue a final decision within one
                              (1) month from the commencement of arbitration
                              proceedings. The place of arbitration shall be
                              Hyderabad, Telangana, India. The award of the
                              arbitration proceedings will be final and binding
                              on both parties of these Terms.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="pr-2">27.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>MISCELLANEOUS</strong>
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">27.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You understand that we will not be liable to you if we
                          are prevented from, or delayed in, providing the
                          Services due to acts, events, omissions, or accidents
                          beyond our reasonable control (“
                          <strong>Unavoidable Events</strong>
                          ”). Where an Unavoidable Event occurs, we will attempt
                          to recommence the provision of the Services as soon as
                          reasonably practicable.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">27.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We may assign any or all of our rights and obligations
                          to any person or affiliate entity at any time. If any
                          provision or part of a provision of these Terms is
                          determined to be unlawful, void, or unenforceable,
                          that provision or part of the provision is deemed
                          severable from the Terms and does not affect the
                          validity and enforceability of any remaining
                          provisions.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">27.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You acknowledge that there is no joint venture,
                          partnership, employment, or agency relationship
                          created between you and us as a result of these Terms
                          or use of the Services.
                        </span>
                      </span>
                    </p>
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <br data-cke-filler="true" />
                    </p>
                  </li>
                </ol>
              </li>
              <li>
                <p className="break-after:avoid;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="pr-2">28.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>CONTACT</strong>
                    </span>
                  </span>
                </p>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  If you require further information or have any inquiries or
                  concerns regarding the Terms of Sale, please do not hesitate
                  to contact us in writing at:
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Email:
                </span>
              </span>
              <Link
                href="mailto:info@hubeco.market"
                className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]"
              >
                info@hubeco.market
              </Link>

              <span className="text-[#2e3191] text-[10pt] underline p-1">
                <span
                  dir="ltr"
                  lang="EN-GB"
                  className="line-height:115%;"
                ></span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
