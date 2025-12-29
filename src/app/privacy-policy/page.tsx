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
// import Link from "next/link";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// // import styles from './PdfViewer.module.css';

// export default function Page() {
//   const [privacyPolicy, setprivacyPolicy] = useState<any>('');
//   const [content, setContent] = useState("");
//   const [h, setH] = useState("100");
//   const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

//   useEffect(() => {
//     getData();

//     function resizeIFrameToFitContent(iFrame: any) {
//       iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
//       iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
//     }

//     window.addEventListener("DOMContentLoaded", function (e) {
//       var iFrame = document.getElementById("iFrame1");
//       resizeIFrameToFitContent(iFrame);

//       // or, to resize all iframes:
//       var iframes = document.querySelectorAll("iframe");
//       for (var i = 0; i < iframes.length; i++) {
//         resizeIFrameToFitContent(iframes[i]);
//       }
//     });
//   }, []);

//   // useEffect(() => {
//   //   const fetchContent = async () => {
//   //     const response = await fetch('/public/policies/Privacy-and-Cookie-Policy_Hubeco.html'); // replace with your URL
//   //     const text = await response.text();
//   //     // console.log('ewbertnyrt',text)
//   //     setContent(text);
//   //   };

//   //   fetchContent();
//   // }, []);

//   const token = getCookie("token");

//   const getData = () => {
//     Webservices.callGetApi(getEndpoint.default.GETALLPOLICIES, "")
//       .then((d: any) => {
//         // console.log("data", d);
//         d?.data?.map((item: any) => {
//           // console.log("policyitem", item._id);
//           if (item?.title === "Privacy Policy") {
//             Webservices.callGetApi(
//               getEndpoint.default.POLICYBYID + "/" + item._id,
//               token
//             )
//               .then((d: any) => {
//                 // console.log("data", d);
//                 setprivacyPolicy(d?.data?.content);
//               })

//               .catch((err) => {
//                 // console.log("err", err);
//               });
//           }
//         });
//       })

//       .catch((err) => {
//         // console.log("err", err);
//       });
//   };

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

//   useEffect(() => {
//     window.addEventListener("message", function (event) {
//       // Check the origin of the message for security (optional)
//       // if (event.origin !== "https://your-domain.com") return;

//       if (event.data.type === "IframeHeight") {
//         const iframe = document.getElementById("iFrame1");
//         if (iframe) {
//           iframe.className.height = event.data.height + 150 + "px"; // Set the height of the iframe
//           // console.log("Heiegehe", iframe.className.height);
//           setH(iframe.className.height);
//         }
//       }
//     });
//   }, []);

//   return (
//     <div className="bg-white">
//       {/* <Head>
//         <title>Privacy Policy | Hubeco Buyer</title>
//       </Head> */}
//         <head>
//         <title>Privacy Policy | Hubeco</title>
//         {/* <meta name="description" content='' />
//         <meta name="keywords" content='' /> */}
//         {/* <meta name="author" content={productsData?.author.firstName} /> */}
//         {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
//       </head>
//       {/* <Header /> */}
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
//             Privacy Policy
//           </a>
//         </div>
//         {/* <div className="bg-secondaryBg w-full">
//           <div className={{height:h}} className="py-12 px-4 lg:px-20 mx-auto max-w-[100%] pt-12 text-sm font-normal text-brown tracking-wide leading-8">
//             {privacyPolicy ? (
//               // <Markdown
//               //   remarkPlugins={[remarkGfm]}
//               //   components={{
//               //     h2: ({ node, ...props }) => (
//               //       <h2 className={markdownStyles.h2} {...props} />
//               //     ),
//               //     p: ({ node, ...props }) => (
//               //       <p className={markdownStyles.p} {...props} />
//               //     ),
//               //     ul: ({ node, ...props }) => (
//               //       <ul className={markdownStyles.ul} {...props} />
//               //     ),
//               //     li: ({ node, ...props }) => (
//               //       <li className={markdownStyles.li} {...props} />
//               //     ),
//               //     strong: ({ node, ...props }) => (
//               //       <strong className={markdownStyles.strong} {...props} />
//               //     ),
//               //   }}
//               // >
//               //   {privacyPolicy}
//               // </Markdown>
//               <div className={{  }} className="h-full">

//      <iframe src={privacyPolicy} id="iFrame1" height='100%' width='100%' className="w-full !h-full text-justify "
// ></iframe>

//     </div>
//             ) : (
//               <CircularProgress isIndeterminate color="#A92449"  />
//             )}
//           </div>
//         </div> */}

//       <div className={`flex justify-center items-center   text-sm  text-brown  leading-8 `}>
//         <Worker
//           workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
//         >
//           {/* <Viewer fileUrl={privacyPolicy} /> */}
//           <Viewer fileUrl={'/images/policies/Privacy-policy.pdf'} />

//         </Worker>
//         </div>
//       </div>

//       {/* <Footer /> */}
//     </div>
//   );
// }

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
//         if (item?.title === "Online Vendor Agreement") {
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
//         <title>Vendor Agreement | Hubeco Buyer</title>
//       </Head> */}
//        <head>
//         <title>Vendor Agreement | Hubeco</title>
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
//             Vendor Agreement
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
//           <Viewer    theme={'light'} fileUrl={'/images/policies/vendor-agreement.pdf'} />

//         </Worker>
//         </div>
//           </div>
//         {/* </div> */}
//      {/* </div> */}

//      {/* <Footer /> */}
//     </div>
//   );
// }

import React from "react";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";

export default function Page() {

  return (
    <div className="bg-white">
      <head>
        <title>Privacy Policy | Hubeco</title>
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
            className="text-white flex items-center no-underline px-2.5 py-1 rounded"
          >
            <AiFillHome size={16} className="text-white mr-1.5" />
            Home
          </Link>

          <span className="text-white mx-2">/</span>
          <Link
            href="#"
            className="text-white no-underline px-[10px] py-[5px] rounded-[5px]"
          >
            Privacy Policy
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
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  PRIVACY POLICY AS UPDATED ON November 1, 2024
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  We respect your privacy and care about how your Personal
                  Information is used. This Privacy Policy (the “
                  <strong>Policy</strong>
                  ”) outlines how
                </span>
              </span>
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Hubeco Green Ventures Private Limited (“
                  <strong>Company</strong>” or "<strong>us</strong>" or "
                  <strong>we</strong>" or "<strong>our</strong>
                  ") and its affiliates
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  collect, use, store, process, transfer, and disclose your
                  information through our Platform
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
                href="http://www.hubeco.market"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2e3191] text-[10pt] underline p-1">
                  <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                    https://www.hubeco.market
                  </span>
                </span>
              </Link>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  (the “<strong>Website</strong>
                  ”), o
                </span>
              </span>
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  ur Services
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  and any of our other websites, mobile or digital applications,
                  or any other services we offer from time to time by or in
                  connection therewith (together “<strong>Platform</strong>
                  ”)
                </span>
              </span>
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  .
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  It applies to your interactions with and usage of our
                  Platform, involving the sale and purchase of sustainable
                  building materials (the “<strong>Services</strong>
                  ”). By reviewing this Policy, you will gain a comprehensive
                  understanding of your privacy rights and choices.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:107%;margin:10.0pt 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  Your access to or utilization of our Platform and/or Services
                  operated by the Company linked to this Policy implies your
                  agreement to be governed by this Policy. By providing us with
                  your Personal Information, you expressly consent to the use
                  and disclosure of your Personal Information as outlined in
                  this Policy. This Policy, along with the
                </span>
              </span>
              <Link
                href="https://hubeco.market/terms-of-use"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2e3191] text-[10pt] underline p-1">
                  <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                    Terms of Use
                  </span>
                </span>
              </Link>
              <span className="color:#1155CC;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  <u>,</u>
                </span>
              </span>
              <Link
                href="https://hubeco.market/vendor-terms-sale"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2e3191] text-[10pt] underline p-1">
                  <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                    Terms of Sale
                  </span>
                </span>
              </Link>
              <span className="color:#1155CC;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  <u>,</u>
                </span>
              </span>
              <Link
                href="https://hubeco.market/returns-refunds-cancellations"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2e3191] text-[10pt] underline p-1">
                  <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                    Return, Refund and Cancellation
                  </span>
                </span>
              </Link>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  ,
                </span>
              </span>
              <Link
                href="https://hubeco.market/shipping-delivery"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2e3191] text-[10pt] underline p-1">
                  <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                    Delivery and Shipping Policy
                  </span>
                </span>
              </Link>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  is applicable to your use of the Services and you explicitly
                  agree and acknowledge to read the Privacy Policy in
                  conjunction with the referenced policies.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:107%;margin:10.0pt 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  The term “<strong>Personal Information</strong>” shall mean
                  any information that relates to an identified or identifiable
                  individual or entity, and can include information that you
                  provide to us and that we collect about you, such as when you
                  engage with our Services (e.g. device information, IP
                  address).
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:107%;margin:12.0pt 0in;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  By utilising the Services, engaging with the Company's
                  Platform, or furnishing your Personal Information, you
                  explicitly agree and acknowledge that you accept the terms
                  delineated in this Policy. The terms '<strong>you</strong>' or
                  '<strong>your</strong>' in the context of this Policy
                  collectively pertain to any user of our Platform or any
                  individual utilising our Services, whether for personal use or
                  on behalf of others.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:107%;margin:12.0pt 0in;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  By visiting the Platform or providing your information, you
                  expressly agree to be bound by this Privacy Policy and agree
                  to be governed by the privacy laws of India including but not
                  limited to the India Digital Personal Data Protection Act 2023
                  (DPDPA) and other relevant regulations governing data
                  protection and privacy.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:107%;margin:12.0pt 0in;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  IF YOU DO NOT CONSENT TO THE COLLECTION, USE, AND DISCLOSURE
                  OF YOUR PERSONAL INFORMATION AS SET FORTH IN THIS PRIVACY
                  POLICY, PLEASE REFRAIN FROM ACCESSING AND/OR USING OUR
                  PLATFORM.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="eb49d1c95c017375bf51d7674a360c693"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">1.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>TO WHOM DOES THIS POLICY APPLY?</strong>
                    </span>
                  </span>
                </h3>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">1.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          This Policy is inclusive and applies to all users of
                          our Platform, irrespective of their browsing intent or
                          their extent of utilising the Services offered on our
                          Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">1.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          The applicability of this Policy extends to users
                          regardless of the device type used for accessing our
                          Platform, whether it be a laptop/desktop or a
                          mobile/tablet device.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">1.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We do not knowingly collect or solicit Personal
                          Information from anyone under the age of eighteen (18)
                          or knowingly allow such persons to register for and/or
                          utilise the Services. If you are under the age of
                          eighteen (18), please do not attempt to register for
                          the Services or send any information about yourself to
                          us. No one under the age of eighteen (18) may provide
                          any Personal Information to us.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="e7117ff32de5927e5bc074c750ceddbc2"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">2.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        WHAT IS THE INFORMATION THAT WE COLLECT FROM YOU?
                      </strong>
                    </span>
                  </span>
                </h3>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">2.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          To use our Platform, you need to create an account and
                          register with us (“
                          <strong>Account</strong>
                          ”) and for this purpose, we collect certain Personal
                          Information. This may include but is not limited to
                          the following:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:74.07px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Basic Information:</u>
                              </strong>
                            </span>
                          </span>
                        </p>
                        <ol className="list-className-type:none;padding-left:21.93px;">
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">2.1.1.1.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  <strong>B2C Users</strong>: You are required
                                  to provide basic information such as your
                                  name, email, address and date of birth.
                                  Additionally, some of this information will
                                  depend on the features you use.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">2.1.1.2.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  <strong>B2B Users</strong>: You are required
                                  to provide basic information such as your
                                  name, email, address, date of birth and
                                  company information such as business address,
                                  tax details, bank details, PAN number, and
                                  other such information based on the Platform’s
                                  functionality you use.
                                </span>
                              </span>
                            </p>
                          </li>
                        </ol>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Professional Information:</u>
                              </strong>
                              such as company name, interests related to
                              sustainable construction and eco-friendly
                              practices, and user role categories such as
                              Architect, Manufacturer, Customer, Developer,
                              Interior Designer, Sustainability Consultant,
                              Educational Institution, Student, Contractor, and
                              Others.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Transaction data:</u>
                              </strong>
                              including without limitation the details of the
                              payment method
                            </span>
                          </span>
                          <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              such as credit/debit card number details and bank
                              account information
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
                          <span className="pr-2">2.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Additional Information:</u>
                              </strong>
                              includes without limitation, when you communicate
                              with our support team, or provide your address
                              and/or geolocation, or share your experience with
                              us;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.1.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Communication with us:</u>
                              </strong>
                              This can include any communication that you send
                              to us, including communications for any inquiries,
                              payments, technical support, etc;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.1.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Device Identification data:</u>
                              </strong>
                              This includes information that may assist us in
                              identifying your device, including browser type,
                              and version, your operating system, etc.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">2.1.7.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Other Data:</u>
                              </strong>
                              This can include the following, based on your
                              interaction with the Platform and/or Services-
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
            <ol className="list-className-type:lower-alpha;padding-left:236.2px;">
              <li className="pl-28">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">a.</span> Number of times you
                      access our Platform and/or Services;
                    </span>
                  </span>
                </p>
              </li>
              <li className="pl-28">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">b.</span>The length of time you
                      spent on the Platform;
                    </span>
                  </span>
                </p>
              </li>
              <li className="pl-28">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">c.</span>The period of time from
                      when you became active and have continued to be active on
                      the Platform;
                    </span>
                  </span>
                </p>
              </li>
              <li className="pl-28">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">d.</span>Your wishlists and
                      preferences;
                    </span>
                  </span>
                </p>
              </li>
              <li className="pl-28">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <span className="pr-2">e.</span>Other similar statistics
                      we may collect with the intention to improve the user
                      experience of the Platform.
                    </span>
                  </span>
                </p>
              </li>
              <ol>
                <li className="md:pl-8 pl-4">
                  <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                    <span className="pr-2">2.2.</span>
                    <span className="font-family:Poppins;font-size:6.0pt;">
                      <span
                        dir="ltr"
                        lang="EN-GB"
                        className="line-height:115%;"
                      >
                        You agree to provide us with your Personal Information
                        whenever you use our Services by performing any of the
                        following functions:
                      </span>
                    </span>
                  </p>
                </li>
                <ol className="list-className-type:none;padding-left:74.07px;">
                  <li className="md:pl-20 pl-10">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">2.2.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Accessing our Platform by means of any web browser or
                          any device.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-20 pl-10">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">2.2.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Joining our waitlist and expressing interest in our
                          Services on the Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-20 pl-10">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">2.2.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Registering for our Services on the Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-20 pl-10">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">2.2.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Inquiring about our Services through our Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-20 pl-10">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">2.2.5.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Initiating and maintaining correspondence with us.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>

                <li className="md:pl-8 pl-4">
                  <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                    <span className="pr-2">2.3.</span>
                    <span className="font-family:Poppins;font-size:6.0pt;">
                      <span
                        dir="ltr"
                        lang="EN-GB"
                        className="line-height:115%;"
                      >
                        We take extra precautions to ensure that such Personal
                        Information is kept secure and confidential, and we will
                        only retain this data for as long as necessary for the
                        purposes for which we collect it as per the permissible
                        laws of the land.
                      </span>
                    </span>
                  </p>
                </li>
                <li className="md:pl-8 pl-4">
                  <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                    <span className="pr-2">2.4.</span>
                    <span className="font-family:Poppins;font-size:6.0pt;">
                      <span
                        dir="ltr"
                        lang="EN-GB"
                        className="line-height:115%;"
                      >
                        This Policy will not apply to any unsolicited
                        information provided by you through the Platform or
                        through any other means. This includes but is not
                        limited to, information posted on any public areas of
                        the Platform. All such unsolicited information shall be
                        deemed to be non-confidential, and we will be free to
                        use and disclose such unsolicited information without
                        limitation.
                      </span>
                    </span>
                  </p>
                </li>
                <li className="md:pl-8 pl-4">
                  <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                    <span className="pr-2">2.5.</span>
                    <span className="font-family:Poppins;font-size:6.0pt;">
                      <span
                        dir="ltr"
                        lang="EN-GB"
                        className="line-height:115%;"
                      >
                        We shall not be liable for any loss or damage sustained
                        by you as a result of any disclosure (inadvertent or
                        otherwise) of any Personal Information concerning your
                        credit cards, or debit cards in the course of any online
                        transactions or payments made for any Services offered
                        through the Platform. For this purpose, we recommend
                        that you go through the terms of service of the payment
                        service providers.
                      </span>
                    </span>
                  </p>
                </li>
                <li className="md:pl-8 pl-4">
                  <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                    <span className="pr-2">2.6.</span>
                    <span className="font-family:Poppins;font-size:6.0pt;">
                      <span
                        dir="ltr"
                        lang="EN-GB"
                        className="line-height:115%;"
                      >
                        Access to your Personal Information is limited to our
                        employees, agents, partners, and third parties, who we
                        reasonably believe will need that information to enable
                        us to provide Services to you. However, we are not
                        responsible for the confidentiality, security, or
                        distribution of your own Personal Information by our
                        partners and third parties (who have their own privacy
                        policies) outside the scope of our agreement with such
                        partners and third parties.
                      </span>
                    </span>
                  </p>
                </li>
                <li className="md:pl-8 pl-4">
                  <p className="line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                    <span className="pr-2">2.7.</span>
                    <span className="font-family:Poppins;font-size:6.0pt;">
                      <span
                        dir="ltr"
                        lang="EN-GB"
                        className="line-height:115%;"
                      >
                        When you use our Platform, we collect and store your
                        information, which is provided by you from time to time.
                        In general, you can browse the Platform without telling
                        us who you are or revealing any Personal Information
                        about yourself. Once you give us your Personal
                        Information, you are not anonymous to us. Where
                        possible, we indicate which fields are required and
                        which fields are optional. You always have the option to
                        not provide information by choosing not to use a
                        particular service, product, or feature on the Platform.
                      </span>
                    </span>
                  </p>
                </li>
              </ol>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="eee436caaa645a568170644f35b6dec7a"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">3.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>HOW DO WE COLLECT THE INFORMATION?</strong>
                    </span>
                  </span>
                </h3>
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
                          The collection of Personal Information is facilitated
                          through the following ways:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:74.07px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Information you give us:</u>
                              </strong>
                              When you provide us with the information referred
                              to in Clause 2.1 through the methods outlined in
                              Clause 2.2.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Session Management:</u>
                              </strong>
                              We study session metrics to understand how users
                              interact with the Platform. This helps us learn
                              the average time users spend on the Platform and
                              when they prefer to engage. We use tools like
                              Google Analytics (or alternatives) to collect
                              anonymous data, including the number of views, how
                              long users stay, and where they're visiting from.
                              This data allows us to optimize the user
                              experience, making informed enhancements to cater
                              to user preferences and behaviours;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>User analytics:</u>
                              </strong>
                              We analyse user behaviour and preferences by
                              collecting and analysing Personal Information and
                              maintaining a track within the Platform to track
                              and ensure accuracy, promptly identify any unusual
                              behaviour, and detect fraudulent activities,
                              allowing us to take immediate corrective action.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              In addition to direct user interactions, we
                              leverage cookies and similar technologies to
                              enhance the functionality and user experience on
                              the Platform. These allow us to collect and
                              process additional information for various
                              purposes:
                            </span>
                          </span>
                        </p>
                        <ol className="list-className-type:none;padding-left:21.93px;">
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">3.1.4.1.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  <strong className="pr-2">
                                    <u>Cookies:</u>
                                  </strong>
                                  We utilize cookies, which are small text files
                                  stored on users' devices. These cookies assist
                                  in tracking user preferences, optimising the
                                  Platform’s functionality, and providing a
                                  customised experience. Users have the option
                                  to manage cookie preferences outlined through
                                  their browser settings. Below are the
                                  categories of cookies used on our Platform,
                                  along with a description of what they are used
                                  for:
                                </span>
                              </span>
                            </p>
                            <ol className="list-className-type:none;padding-left:48px;">
                              <li className="md:pl-14 pl-8">
                                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                  <span className="pr-2">3.1.4.1.1.</span>
                                  <span className="font-family:Poppins;font-size:6.0pt;">
                                    <i>
                                      <span
                                        dir="ltr"
                                        lang="EN-GB"
                                        className="line-height:115%;"
                                      >
                                        <u>Strictly Necessary Cookies:</u>
                                      </span>
                                    </i>
                                    <span
                                      dir="ltr"
                                      lang="EN-GB"
                                      className="line-height:115%;"
                                    >
                                      These cookies are needed to run our
                                      Platform, to keep it secure when you are
                                      accessing the Platform, and to obey
                                      regulations that apply to us. They also
                                      help us keep your details safe and
                                      private;
                                    </span>
                                  </span>
                                </p>
                              </li>
                              <li className="md:pl-14 pl-8">
                                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                  <span className="pr-2">3.1.4.1.2.</span>
                                  <span className="font-family:Poppins;font-size:6.0pt;">
                                    <i>
                                      <span
                                        dir="ltr"
                                        lang="EN-GB"
                                        className="line-height:115%;"
                                      >
                                        <u>Functional Cookies:</u>
                                      </span>
                                    </i>
                                    <span
                                      dir="ltr"
                                      lang="EN-GB"
                                      className="line-height:115%;"
                                    >
                                      These cookies are used for remembering
                                      things such as your region or country,
                                      your preferred language, accessibility
                                      options like large font or high-contrast
                                      pages;
                                    </span>
                                  </span>
                                </p>
                              </li>
                              <li className="md:pl-14 pl-8">
                                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                  <span className="pr-2">3.1.4.1.3.</span>
                                  <span className="font-family:Poppins;font-size:6.0pt;">
                                    <i>
                                      <span
                                        dir="ltr"
                                        lang="EN-GB"
                                        className="line-height:115%;"
                                      >
                                        <u>Performance Cookies:</u>
                                      </span>
                                    </i>
                                    <span
                                      dir="ltr"
                                      lang="EN-GB"
                                      className="line-height:115%;"
                                    >
                                      These cookies tell us how you and our
                                      other users use our Platform. We combine
                                      all this data together and study it. This
                                      helps us to improve the performance of our
                                      Services and/or the Platform;
                                    </span>
                                  </span>
                                </p>
                              </li>
                              <li className="md:pl-14 pl-8">
                                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                  <span className="pr-2">3.1.4.1.4.</span>
                                  <span className="font-family:Poppins;font-size:6.0pt;">
                                    <i>
                                      <span
                                        dir="ltr"
                                        lang="EN-GB"
                                        className="line-height:115%;"
                                      >
                                        <u>Targeting/Advertising Cookies</u>
                                      </span>
                                    </i>
                                    <span
                                      dir="ltr"
                                      lang="EN-GB"
                                      className="line-height:115%;"
                                    >
                                      : These cookies are used to deliver
                                      content more relevant to you and your
                                      interests. They may also be used to limit
                                      the number of times you see an
                                      advertisement.
                                    </span>
                                  </span>
                                </p>
                              </li>
                            </ol>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">3.1.4.2.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  <strong className="pr-2">
                                    <u>Purpose of Cookies We Use:</u>
                                  </strong>
                                  We utilise Personal Information obtained
                                  through cookies to enhance the speed and
                                  security of your interaction with us. These
                                  cookies serve various purposes:
                                </span>
                              </span>
                            </p>
                            <ol className="list-className-type:none;padding-left:48px;">
                              <li className="md:pl-14 pl-8">
                                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                  <span className="pr-2">3.1.4.2.1.</span>
                                  <span className="font-family:Poppins;font-size:6.0pt;">
                                    <i>
                                      <span
                                        dir="ltr"
                                        lang="EN-GB"
                                        className="line-height:115%;"
                                      >
                                        <u>Preferences</u>
                                      </span>
                                    </i>
                                    <span
                                      dir="ltr"
                                      lang="EN-GB"
                                      className="line-height:115%;"
                                    >
                                      : Cookies enable the Platform to remember
                                      information that alters the site’s
                                      behaviour or appearance, such as your
                                      preferred language or geographic region.
                                      By retaining your preferences, we can
                                      customise and present advertisements and
                                      other content tailored to you.
                                    </span>
                                  </span>
                                </p>
                              </li>
                              <li className="md:pl-14 pl-8">
                                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                  <span className="pr-2">3.1.4.2.2.</span>
                                  <span className="font-family:Poppins;font-size:6.0pt;">
                                    <i>
                                      <span
                                        dir="ltr"
                                        lang="EN-GB"
                                        className="line-height:115%;"
                                      >
                                        <u>Security/Optimization:</u>
                                      </span>
                                    </i>
                                    <span
                                      dir="ltr"
                                      lang="EN-GB"
                                      className="line-height:115%;"
                                    >
                                      Cookies play a crucial role in maintaining
                                      security by verifying users, preventing
                                      fraudulent use of Services, and
                                      safeguarding user data from unauthorised
                                      access. Specific types of cookies assist
                                      in blocking various types of attacks, such
                                      as attempts to pilfer content from
                                      Platform forms.
                                    </span>
                                  </span>
                                </p>
                              </li>
                              <li className="md:pl-14 pl-8">
                                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                  <span className="pr-2">3.1.4.2.3.</span>
                                  <span className="font-family:Poppins;font-size:6.0pt;">
                                    <i>
                                      <span
                                        dir="ltr"
                                        lang="EN-GB"
                                        className="line-height:115%;"
                                      >
                                        <u>Processing:</u>
                                      </span>
                                    </i>
                                    <span
                                      dir="ltr"
                                      lang="EN-GB"
                                      className="line-height:115%;"
                                    >
                                      Cookies contribute to the efficient
                                      functioning of the Platform, allowing us
                                      to deliver the Services expected by
                                      visitors and/or users. These cookies
                                      facilitate tasks like navigating web pages
                                      and accessing secure sections of the
                                      Platform.
                                    </span>
                                  </span>
                                </p>
                              </li>
                              <li className="md:pl-14 pl-8">
                                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                  <span className="pr-2">3.1.4.2.4.</span>
                                  <span className="font-family:Poppins;font-size:6.0pt;">
                                    <i>
                                      <span
                                        dir="ltr"
                                        lang="EN-GB"
                                        className="line-height:115%;"
                                      >
                                        <u>Advertising:</u>
                                      </span>
                                    </i>
                                    <span
                                      dir="ltr"
                                      lang="EN-GB"
                                      className="line-height:115%;"
                                    >
                                      We employ cookies to enhance the appeal of
                                      advertising to our users. Common uses
                                      include selecting advertisements based on
                                      relevance, improving campaign performance
                                      reporting, and avoiding the repetition of
                                      ads you may have already seen. Cookies
                                      capture information about your
                                      interactions with the Platform, including
                                      your most visited pages.
                                    </span>
                                  </span>
                                </p>
                              </li>
                              <li className="md:pl-14 pl-8">
                                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                  <span className="pr-2">3.1.4.2.5.</span>
                                  <span className="font-family:Poppins;font-size:6.0pt;">
                                    <i>
                                      <span
                                        dir="ltr"
                                        lang="EN-GB"
                                        className="line-height:115%;"
                                      >
                                        <u>Communication</u>
                                      </span>
                                    </i>
                                    <span
                                      dir="ltr"
                                      lang="EN-GB"
                                      className="line-height:115%;"
                                    >
                                      : Information collected through cookies
                                      may be utilised to communicate with you,
                                      including sending newsletters, seeking
                                      your opinions and feedback, and providing
                                      Services and promotional materials.
                                    </span>
                                  </span>
                                </p>
                              </li>
                              <li className="md:pl-14 pl-8">
                                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                                  <span className="pr-2">3.1.4.2.6.</span>
                                  <span className="font-family:Poppins;font-size:6.0pt;">
                                    <i>
                                      <span
                                        dir="ltr"
                                        lang="EN-GB"
                                        className="line-height:115%;"
                                      >
                                        <u>Analytics and Research</u>
                                      </span>
                                    </i>
                                    <span
                                      dir="ltr"
                                      lang="EN-GB"
                                      className="line-height:115%;"
                                    >
                                      : Cookies aid in comprehending how
                                      individuals utilise our Services, enabling
                                      us to enhance them for a better user
                                      experience. This data-driven insight helps
                                      us refine and improve our offerings.
                                    </span>
                                  </span>
                                </p>
                              </li>
                            </ol>
                          </li>
                        </ol>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.1.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Web Beacons, Pixel Tags, and Trackers:</u>
                              </strong>
                              We may employ web Web Beacons, Pixel tags, and
                              tracking URLs, which are tiny graphic images
                              and/or small blocks of code placed on Platform
                              pages, ads, or in our emails that allow us to
                              determine whether you performed a specific action.
                              When you access these pages or when you open an
                              email, you let us know that you have accessed the
                              web page or opened the email. These tools help us
                              measure responses to our communications and
                              improve our web pages and promotions;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.1.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Log Files:</u>
                              </strong>
                              Our servers automatically collect information sent
                              by Users' devices, known as log files. This data
                              may include IP addresses, device information,
                              browser type, and timestamps. Log files are
                              instrumental in analyzing trends, administering
                              the Platform, and diagnosing technical issues;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.1.7.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Third-Party Analytics:</u>
                              </strong>
                              We may integrate third-party analytics services to
                              further understand user behaviour. These services
                              utilise their own tracking technologies to compile
                              reports on Platform activity, aiding us in
                              improving our Services;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.1.8.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Location Data:</u>
                              </strong>
                              As part of our Services, we may also collect
                              precise geolocation data, including GPS signals,
                              device sensors, Wi-Fi access points, and cell
                              tower IDs. We collect this type of data if you
                              grant us access to your location. You can withdraw
                              your consent at any time by disabling the GPS or
                              other location-tracking functions on your device;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">3.1.9.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Information from other sources</u>
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
                              We may collect Personal Information from other
                              sources, including but not limited to:
                            </span>
                          </span>
                        </p>
                        <ol className="list-className-type:none;padding-left:21.93px;">
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">3.1.9.1.</span>
                              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  If a user or any third party submits a
                                  complaint about you, we may receive
                                  information relating to the specific complaint
                                  made in order to understand and, where
                                  relevant, address the complaint; and
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">3.1.9.2.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  To the extent permitted by applicable law, we
                                  may receive additional information about you,
                                  such as references, demographic data, and
                                  information to help detect fraud and safety
                                  issues from (i) third-party service providers,
                                  other third parties, and/or partners, or (ii)
                                  users and any other individuals, entities, and
                                  authorities, and combine it with information
                                  we have about you. For example, we may receive
                                  background check results or fraud warnings
                                  from identity verification service providers
                                  for use in our fraud prevention, security
                                  investigation, and risk assessment efforts. We
                                  may receive information about you and your
                                  activities on and off the Platform, including
                                  from users, members of the public, or
                                  governmental, public, or tax authorities, or
                                  about your experiences and interactions with
                                  and/or from our partners.
                                </span>
                              </span>
                            </p>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="e93e98ee3eac231b5d94628e57c9a1212"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">4.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>WHY DO WE COLLECT YOUR INFORMATION?</strong>
                    </span>
                  </span>
                </h3>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">4.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We shall collect your information only for lawful and
                          legally permissible purposes which are as follows:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:74.07px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Contractual Necessity:</u>
                              </strong>
                              We process your Personal Information to fulfil our
                              contractual obligations to you. This includes
                              actions such as managing orders and delivering
                              Services;
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
                              <strong className="pr-2">
                                <u>User Authentication:</u>
                              </strong>
                              We collect your information to help us identify
                              you as and when you access the Platform when you
                              register an Account with us or log in, or when you
                              utilise our Services;
                            </span>
                          </span>
                        </p>
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
                              <strong className="pr-2">
                                <u>Transactions and Payments:</u>
                              </strong>
                              To facilitate secure and efficient payment
                              processing, as well as handle transactions related
                              to Services on the Platform. Also, Personal
                              information is utilised to enable or authorise
                              payment services, including detecting and
                              preventing money laundering, fraud, abuse, and
                              security incidents, complying with legal
                              obligations, enforcing payment policies, and
                              improving payment services;
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
                              <strong className="pr-2">
                                <u>Communicate with you:</u>
                              </strong>
                              We use your Personal Information to communicate
                              with you concerning Services via different
                              channels (e.g., by phone, e-mail, chat) including
                              fulfilling your requests or providing you with
                              notices about your Account, or updating you with
                              any news or updates related to the Platform.
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
                              <strong className="pr-2">
                                <u>Fraud Prevention and Credit Risks</u>:
                              </strong>
                              We use Personal Information to prevent and detect
                              fraud and abuse to protect the security of our
                              users;
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
                              <strong className="pr-2">
                                <u>Troubleshoot Problems:</u>
                              </strong>
                              We use your Personal Information to provide
                              functionality, analyse performance, fix errors,
                              and improve the usability and effectiveness of the
                              Platform and/or Services;
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
                              <strong className="pr-2">
                                <u>Compliance with law:</u>
                              </strong>
                              To be able to perform any contractual and legal
                              obligation;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.8.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Enhancing User Experience:</u>
                              </strong>
                              To analyse user behaviour and preferences for
                              improving our Services and user experience and to
                              be able to provide location-specific services;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.9.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Recommendations and Personalizations</u>:
                              </strong>
                              We use your Personal Information to recommend
                              features, products, and Services that might be of
                              interest to you, identify your preferences, and
                              personalise your experience with the Platform
                              and/or Services;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.10.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>
                                  Enhanced Advertising and Marketing Efforts:
                                </u>
                              </strong>
                              In our efforts to provide, personalise, measure,
                              and enhance our advertising and marketing
                              endeavours, we engage in several key activities.
                              Firstly, we utilise user information to send
                              promotional and marketing messages, tailoring them
                              to suit individual preferences and interests.
                              Additionally, we strive to customise and optimise
                              advertising on various platforms to ensure
                              relevance and effectiveness. Furthermore, we
                              administer referral programs, rewards, surveys,
                              sweepstakes, contests, and other promotional
                              activities to engage users and foster community
                              participation. Through the analysis of user
                              characteristics and preferences, we aim to send
                              targeted promotional messages that resonate with
                              each user segment. Finally, we extend invitations
                              to users for events and relevant opportunities,
                              enriching their overall experience with our
                              Platform; and
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">4.1.11.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Providing alerts/notifications:</u>
                              </strong>
                              To effectively communicate with you through SMS
                              alerts and emails to notify both buyers and
                              vendors about all transactional statuses.
                              Additionally, we will inform you about any new
                              services that we may develop from time to time
                              through notifications on the Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="e55ffd18678e4f60db6615046b60cdff2"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">5.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        WHO DO WE SHARE YOUR PERSONAL INFORMATION WITH AND WHY?
                      </strong>
                    </span>
                  </span>
                </h3>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">5.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          To facilitate our Services and enhance User
                          experience, we may share Personal Information with the
                          following entities:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:74.07px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Transactions:</u>
                              </strong>
                              We may share payment gateway links with you for
                              making payments for our Services, and to
                              facilitate secure and efficient transaction
                              processing, we may share your Personal Information
                              necessary for transaction processing with such
                              payment gateway service providers;
                            </span>
                          </span>
                        </p>
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
                              <strong className="pr-2">
                                <u>Third-party Service Providers:</u>
                              </strong>
                              We engage the services of third parties to carry
                              out various functions on our behalf such as
                              payment processing, data analysis, postal and
                              email and SMS communications, hosting services,
                              customer service, and marketing assistance. These
                              service providers may access the necessary
                              Personal Information to fulfil their functions.
                              They are also bound to process Personal
                              Information in compliance with applicable laws.
                              It's important to note that we do not own or
                              control these third parties. When you interact
                              with these providers and utilise their services,
                              you are consenting to share your information
                              directly with them, and your use of their services
                              is governed by their respective privacy policies;
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
                              <strong className="pr-2">
                                <u>Affiliates</u>:
                              </strong>
                              We may share your information with our affiliates,
                              in which case we will require those affiliates to
                              honour this Privacy Policy. Affiliates may include
                              our parent company and any subsidiaries, joint
                              venture partners, or other companies that we
                              control or that are under common control with us;
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
                              <strong className="pr-2">
                                <u>Business Transfers</u>:
                              </strong>
                              If we reorganise or sell all or a portion of our
                              assets, undergo a merger, or are acquired by
                              another entity, we may transfer your information
                              to the successor entity.  If we go out of business
                              or enter bankruptcy, your information would be an
                              asset transferred or acquired by a third party. 
                              You acknowledge that such transfers may occur and
                              that the transferee may decline to honour
                              commitments we made in this Privacy Policy.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.1.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Legal Compliance</u>:
                              </strong>
                            </span>
                          </span>
                        </p>
                        <ol className="list-className-type:none;padding-left:21.93px;">
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">5.1.5.1.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  We may disclose your information to courts,
                                  law enforcement, governmental or public
                                  authorities, tax authorities, authorised third
                                  parties, or other users, if and to the extent
                                  we are required or permitted to do so by law
                                  or where disclosure is reasonably necessary
                                  to: (i) comply with our legal obligations,
                                  (ii) comply with a valid legal request, such
                                  as a subpoena or court order, or to respond to
                                  claims asserted against us, (iii) respond to a
                                  valid legal request relating to a criminal
                                  investigation to address alleged or suspected
                                  illegal activity, or to respond to or address
                                  any other activity that may expose us, you, or
                                  any other of our users to legal or regulatory
                                  liability, (iv) enforce and administer our
                                  agreements with users, including our Terms of
                                  Service, additional legal terms, and policies,
                                  (v) respond to requests for or in connection
                                  with current or prospective legal claims or
                                  legal proceedings concerning the Company
                                  and/or third parties, in accordance with
                                  applicable law, or (vi) protect the rights,
                                  property or personal safety of the Company,
                                  its employees, its user, or users of the
                                  public;
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">5.1.5.2.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  Where legally required or permissible
                                  according to applicable law, we may disclose
                                  user information to relevant tax authorities
                                  or other governmental agencies, depending on
                                  where you are based, for the purpose of the
                                  tax authorities’ determination of proper
                                  compliance with relevant tax obligations;
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                              <span className="pr-2">5.1.5.3.</span>
                              <span className="font-family:Poppins;font-size:6.0pt;">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="line-height:115%;"
                                >
                                  Where appropriate and/or legally required, we
                                  may notify the user about legal requests,
                                  unless: (i) providing notice is prohibited by
                                  the legal process itself, by court order we
                                  receive, or by applicable law, or (ii) we
                                  believe that providing notice would be futile,
                                  ineffective, create a risk of injury or bodily
                                  harm to an individual or group, or create or
                                  increase a risk of fraud upon or harm to the
                                  Company, our users, or expose the Company to a
                                  claim of obstruction of justice.
                                </span>
                              </span>
                            </p>
                          </li>
                        </ol>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.1.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Service Improvement</u>:
                              </strong>
                              We may share certain aggregated, anonymized
                              information with third parties (for example, for
                              Google Analytics) in order to assess the Platform
                              usage and information pertaining to the ease of
                              navigation;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.1.7.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Advertisements:</u>
                              </strong>
                              We use third-party advertising companies to serve
                              ads when you visit our Platform. These companies
                              may use information (not including your name,
                              address, email address, or telephone number) about
                              your visits to the Platform and other websites in
                              order to provide personalised advertisements about
                              goods and services of interest to you;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.1.8.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Collaborations:</u>
                              </strong>
                              We may share your Personal Information with
                              reputable partners to facilitate joint
                              initiatives, promotions, or integrated services;
                              and
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">5.1.9.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Growth and Expansion</u>:
                              </strong>
                              As our business evolves and expands, there may be
                              instances where sharing Personal Information with
                              new entities or parties becomes necessary for the
                              enhancement of our Services. Any such sharing will
                              be carried out with the utmost consideration for
                              user privacy and in accordance with relevant legal
                              frameworks.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">5.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We do not ever sell or rent your Personal Information
                          without your express approval.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">5.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We are not responsible for the actions of third
                          parties with whom you share personal or sensitive
                          data, and we have no authority to manage or control
                          third-party solicitations. If you no longer wish to
                          receive correspondence, emails, or other
                          communications from third parties, you are responsible
                          for contacting the third party directly.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="eefb17c822a3adf107fa68bb0534baec7"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">6.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        HOW LONG DO WE KEEP YOUR PERSONAL INFORMATION?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  In compliance with applicable laws, we retain your Personal
                  Information for a duration no longer than necessary for the
                  purpose for which it was collected or as mandated by relevant
                  laws. However, certain data related to you may be retained
                  beyond this period if we reasonably believe it is necessary to
                  prevent fraud, mitigate potential abuse, allow us to exercise
                  our legal rights, defend against legal claims, or fulfil other
                  legitimate purposes required by law or for analytical and
                  research purposes. Additionally, we may continue to retain
                  your Personal Information for the following purposes including
                  but not limited to:
                </span>
              </span>
            </p>
            <ol className="list-className-type:none;padding-left:96px;">
              <li className="md:pl-8 pl-4">
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="pr-2">6.1.</span>
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>Legitimate Business Interest:</strong>
                      We may retain your Personal Information as necessary for
                      our legitimate business interests, such as the prevention
                      of money laundering, fraud detection and prevention, and
                      enhancing safety;
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:0px;">
                  <li>
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">6.2.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>
                            Legal, Tax, Reporting, and Auditing Obligations
                          </strong>
                          : We may retain and use your Personal Information to
                          the extent necessary to comply with our legal, tax,
                          reporting, and auditing obligations;
                        </span>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">6.3.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Shared Information:</strong>
                          Information you have shared with others, such as
                          reviews and forum postings, may continue to be
                          publicly visible on the Platform, even after your
                          Platform user account is cancelled; and
                        </span>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">6.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          <strong>Residual Copies</strong>: Because we take
                          measures to protect data from accidental or malicious
                          loss and destruction, residual copies of your Personal
                          Information may not be removed from our backup systems
                          for a limited period of time.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="e7198a7eb5964a17d8a7683a2b6ef7b3d"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">7.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        HOW DO WE PROVIDE FOR THE SECURITY OF YOUR PERSONAL
                        INFORMATION WITH US?
                      </strong>
                    </span>
                  </span>
                </h3>
                <ol className="list-className-type:none;padding-left:0px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">7.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          We prioritise the security of your data, utilising
                          secure cloud servers where your Personal Information
                          is encrypted at rest, adding an extra layer of
                          protection against unauthorised access. Additionally,
                          we adhere strictly to industry best practices by
                          utilising SSL (Secure Sockets Layer) for all data
                          transfers, ensuring that your information remains
                          secure during transmission. Data gathered is also
                          encrypted at rest within the database. We implement
                          reasonable physical, electronic, and procedural
                          safeguards to ensure the confidentiality and integrity
                          of your information. Accessing your Account
                          information is facilitated through a secure server,
                          and once in our possession, your data is subject to
                          strict security guidelines to prevent unauthorised
                          access. Further, access to your information is
                          restricted to our internal team members only to
                          maintain confidentiality and security.
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
                          The safety and security of your information also
                          depends on you. Where we have given you (or where you
                          have chosen) a password for access to certain parts of
                          our Platform, you are responsible for keeping this
                          password confidential. We ask you not to share your
                          password with anyone. We urge you to be careful about
                          giving out information in public areas of the Platform
                          like message boards, as the information you share may
                          be viewed by any user of the Platform.
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
                          While we take comprehensive measures to safeguard your
                          information, users acknowledge and accept the inherent
                          security implications of data transmission over the
                          Internet and the World Wide Web. Despite our efforts,
                          complete security cannot be guaranteed, and inherent
                          risks persist. Users bear the responsibility of
                          safeguarding login and password records for their
                          Accounts. Any transmission of Personal Information is
                          at your own risk. We are not responsible for the
                          circumvention of any privacy settings or security
                          measures contained on the Platform. While
                          acknowledging these risks, we remain committed to
                          continually enhancing our security protocols to
                          address emerging threats and maintain the trust of our
                          users.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="e3fe0bdfe1abd8e20ae16d37411c5b8f7"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">8.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>WHAT ARE YOUR RIGHTS AS A DATA SUBJECT?</strong>
                    </span>
                  </span>
                </h3>
                <ol className="list-className-type:none;padding-left:0px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;">
                      <span className="pr-2">8.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You, as a data subject, have certain rights to your
                          Personal Information with us, as under:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:74.07px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">8.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Right to access:</u>
                              </strong>
                              You can accessthe information that you have
                              provided to us provided that such information has
                              been retained by us on the Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">8.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Right to withdraw consent:</u>
                              </strong>
                              The consent that you provide for the collection,
                              use, and disclosure of your Personal Information
                              will remain valid until such time it is withdrawn
                              by you in writing. If you withdraw your consent,
                              we will stop processing the relevant Personal
                              Information except to the extent that we have
                              other grounds for processing such Personal
                              Information under applicable laws. We will respond
                              to your request within a reasonable timeframe. You
                              may withdraw your consent at any time by
                              contacting us.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">8.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Right to correction:</u>
                              </strong>
                              You are responsible for maintaining the accuracy
                              of the information you submit to us, including but
                              not limited to your contact information provided
                              as part of filling out the waitlist form. If you
                              wish to make a request to correct or update any of
                              the Personal Information that we hold about you,
                              you may contact us at
                            </span>
                          </span>
                          <Link href="mailto:info@hubeco.market">
                            <span className="text-[#2e3191] text-[10pt] underline p-1">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="line-height:115%;"
                              >
                                info@hubeco.market
                              </span>
                            </span>
                          </Link>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              . For any necessary updates or corrections to your
                              Personal Information, users can easily modify
                              details using the provided dashboard
                              functionalities.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">8.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">
                                <u>Right to Nominate:</u>
                              </strong>
                              You have the right to nominate another individual
                              in case of your death and incapacity to exercise
                              your rights under this Policy on your behalf.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="e595bb4a1316618c7f6aed0588d9b37a1"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">9.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        HOW DO WE HANDLE DATA BREACHES AND SECURITY INCIDENTS?
                      </strong>
                    </span>
                  </span>
                </h3>
                <ol className="list-className-type:none;padding-left:0px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">9.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          In the event of a data breach or security incident, we
                          maintain a proactive approach to ensure swift
                          resolution and mitigate potential risks. We have
                          established a comprehensive incident response plan
                          designed to address such occurrences promptly and
                          effectively:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:74.07px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">9.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">Identification:</strong>
                              We promptly identify and acknowledge any signs of
                              a data breach or security incident within our
                              systems or infrastructure;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">9.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">Containment:</strong>
                              Immediate action is taken to contain the impact of
                              the breach, preventing further unauthorised access
                              or damage to data;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">9.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong className="pr-2">Notification:</strong>
                              We prioritise transparency by promptly notifying
                              affected parties, including users and relevant
                              stakeholders, about the breach and its potential
                              impact on their data;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">9.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>Collaboration</strong>: We collaborate
                              with relevant authorities, such as regulatory
                              bodies and law enforcement agencies, to report the
                              incident and comply with any legal obligations or
                              regulatory requirements; and
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">9.1.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>Post-Incident Assessment</strong>:
                              Following the resolution of the incident, we
                              conduct thorough assessments to evaluate the
                              effectiveness of our response measures and
                              identify areas for improvement.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="ec790194596f438ad28730ff184999d54"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">10.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        WHO IS THE DATA CONTROLLER AND DATA PROCESSOR OF YOUR
                        PERSONAL INFORMATION?
                      </strong>
                    </span>
                  </span>
                </h3>
                <ol className="list-className-type:none;padding-left:0px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">10.1.</span>
                      <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Hubeco Green Ventures Private Limited
                        </span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          will act as the data controller where we make
                          decisions on how your Personal Information is used in
                          connection with the Platform or our Services. We will
                          act as the data processor where we only use your
                          Personal Information as authorised and instructed by a
                          third party in connection with the website, or our
                          applications or services.
                        </span>
                      </span>
                    </p>
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
                          Where we are acting as the data controller, we are
                          responsible for the obligations of a data controller
                          under data protection laws in connection with the
                          processing of your Personal Information and we use
                          this Privacy Policy to provide you with information
                          about our use of your Personal Information.
                        </span>
                      </span>
                    </p>
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
                          Where we are acting as a data processor, the relevant
                          third party will be acting as a data controller and
                          will be responsible for the obligations of a data
                          controller under data protection laws in connection
                          with the processing of your Personal Information. If
                          you are accessing the Platform, or our Services
                          through a third party, you should contact them with
                          queries regarding the processing of your Personal
                          Information or compliance with data protection law.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">10.4.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You understand and acknowledge that
                        </span>
                      </span>
                      <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          Hubeco Green Ventures Private Limited
                        </span>
                      </span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          is the controller for the processing of your Personal
                          Information. Our contact information is:
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="pl-8">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Address: Plot No 20A, Filmnagar, Jubilee Hills, Shaikpet,
                  Hyderabad, Telangana, India, 500033
                </span>
              </span>
            </p>
            <p className="pl-8">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Email: info@hubeco.market
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="e3318d050826191cacab1d1afcbc71f31"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">11.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>WHAT ARE YOUR RIGHTS AS A DATA SUBJECT?</strong>
                    </span>
                  </span>
                </h3>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">11.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          You, as a data subject, may have certain rights to
                          your Personal Information with us, as under:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:74.07px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">11.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>
                                Request access to your Personal Information
                              </strong>
                              : This allows you to receive a copy of the
                              Personal Information we hold about you, and to
                              check that we are lawfully processing it;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">11.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>
                                Request the correction of your Personal
                                Information
                              </strong>
                              : This allows you to ask for any incomplete or
                              inaccurate information we hold about you to be
                              corrected;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">11.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>
                                Request the erasure of your Personal Information
                              </strong>
                              : This allows you to ask us to delete or remove
                              your Personal Information from our systems where
                              there is no good reason for us to continue
                              processing it;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">11.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>
                                Object to the processing of your Personal
                                Information
                              </strong>
                              : This allows you to object to our processing of
                              your Personal Information for a specific purpose
                              (for example, for marketing purposes);
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">11.1.5.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>
                                Request the transfer (data portability) of your
                                Personal Information
                              </strong>
                              : This allows you to request the transfer of your
                              Personal Information in a structured, commonly
                              used, machine-readable format, either to you or to
                              a third party designated by you and, if
                              technically feasible, have it transmitted to
                              another controller without any hindrance. This
                              provision is applicable provided that your
                              information is processed by automated means and
                              that the processing is based on your consent, on a
                              contract of which you are part of, or on
                              pre-contractual obligations thereof;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">11.1.6.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>Request the restriction</strong>: You have
                              the right to request the restriction of processing
                              of your Personal Information. This means we will
                              store your Personal Information but not further
                              process it, except in limited circumstances (e.g.,
                              with your consent or for legal claims);
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">11.1.7.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>
                                Request further information on the processing of
                                your Personal Information:
                              </strong>
                              You have the right to obtain further information
                              on how we process your Personal Information. This
                              includes details about the purposes of the
                              processing, the categories of Personal Information
                              involved, the recipients or categories of
                              recipients with whom the Personal Information has
                              been or will be shared, and the envisaged
                              retention period of the Personal Information.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span className="pr-2">11.1.8.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              <strong>Withdraw your Consent:</strong>
                              This right only exists where we are relying on
                              your consent to process your Personal Information.
                              If you withdraw your consent, we may not be able
                              to provide you with access to certain features of
                              our Platform. We will advise you if this is the
                              case at the time you withdraw your Consent.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="e24c69e7a9366a19557689506bddf9311"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">12.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        ARE CHILDREN ALLOWED TO USE OUR PLATFORM AND/OR
                        SERVICES?
                      </strong>
                    </span>
                  </span>
                </h3>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span className="pr-2">12.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          This Platform and/or Services are strictly prohibited
                          for use by individuals under the age of eighteen (18)
                          years old ("
                          <strong>Minors</strong>
                          "). Accessing or using the Platform and/or Services by
                          Minors constitutes a violation of our Terms of Service
                          and Privacy Policy.
                        </span>
                      </span>
                    </p>
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
                          We do not knowingly solicit, collect, or process any
                          Personal Information from Minors. We implement
                          commercially reasonable age verification measures and
                          data protection practices to prevent such unauthorised
                          collection and usage.
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
                          If you are a parent or legal guardian ("
                          <strong>Guardian</strong>
                          ") and believe your child has provided us with
                          Personal Information, we urge you to promptly contact
                          us at info@hubeco.market. Upon verification of your
                          Guardian status, we will promptly take all necessary
                          steps to remove and delete such information from our
                          records.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="e14bd6103418ca15d0d116f77422094c0"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">13.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>HOW ARE CHANGES MADE TO THIS POLICY?</strong>
                    </span>
                  </span>
                </h3>
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      This Policy may be updated at our sole discretion or due
                      to changes in the law. Such changes, unless otherwise
                      stated, will be effective from the day and date of posting
                      on the Platform. We reserve the right to update the Policy
                      without obligation to notify users. It is recommended to
                      regularly review this Policy for any changes, as your
                      continued access and use of the Platform will be
                      considered your approval and acceptance of all
                      modifications to this Policy. In cases where applicable
                      law mandates, we may notify you of updates through email.
                      If you do not agree with this Policy governing our
                      Platform, please refrain from using the Platform or the
                      Services provided by us.
                    </span>
                  </span>
                </p>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="e54e56f13cdcf2a89c86418357ee14349"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:10.0pt;margin-right:0in;margin-top:16.0pt;text-align:justify;"
                >
                  <span className="pr-2">14.</span>
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>HOW CAN YOU CONTACT US?</strong>
                    </span>
                  </span>
                </h3>
                <p className="background-color:white;line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      Should you need additional information or have any
                      questions or complaints regarding the handling of your
                      Personal Information, please reach out to us in writing
                      at:
                    </span>
                  </span>
                </p>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;text-indent:.5in;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Email:
                </span>
              </span>
              <Link href="mailto:info@hubeco.market">
                <span className="text-[#2e3191] text-[10pt] underline p-1">
                  <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                    info@hubeco.market
                  </span>
                </span>
              </Link>
              <span className="text-[#2e3191] text-[10pt] underline p-1">
                <span
                  dir="ltr"
                  lang="EN-GB"
                  className="line-height:115%;"
                ></span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 10.0pt .5in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
