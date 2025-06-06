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

//   const getData = () => {
//     Webservices.callGetApi(
//       getEndpoint.default.GETALLPOLICIES,
//       ''
//     )
//       .then((d: any) => {
//        // // console.log("data", d);
//         d?.data?.map((item: any) => {
//          // // console.log('policyitem',item._id)
//           if (item?.title === "Returns Refunds and cancellations") {
//               Webservices.callGetApi(
//       getEndpoint.default.POLICYBYID+'/'+item._id,
//       token
//     )
//       .then((d: any) => {
//        // // console.log("data", d);
//         setprivacyPolicy(d?.data?.content);
//       })

//       .catch((err) => {
//        // // console.log("err", err);
//       });

//           }
//         })

//       })

//       .catch((err) => {
//        // // console.log("err", err);
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
//         <title>Returns Refunds and Cancellations | Hubeco Buyer</title>
//       </Head> */}
//        <head>
//         <title>Returns, Refunds & Cancellations Policy | Hubeco</title>
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
//             backgroundImage: 'url("images/about/aboutBanner1.png")',
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
//             Returns Refunds and Cancellations
//           </a>
//         </div>
//         {/* <div className="bg-secondaryBg w-full"> */}
//           {/* <div className={{height:h}} className="py-12 px-4 lg:px-20 mx-auto max-w-[100%] pt-12 text-sm font-normal text-black tracking-wide leading-8"> */}
//             {/* {privacyPolicy ? (

//               <div className={{  }} className="h-full">

//      <iframe src={privacyPolicy} id="iFrame1" height='100%' width='100%' className="w-full !h-full text-justify "
// ></iframe>

//     </div>
//             ) : (
//               <CircularProgress isIndeterminate color="#A92449"  />
//             )} */}
//              <div className={`w-full flex justify-center items-center mx-auto max-w-[100%]  text-sm  text-black  leading-8 `} >
//         <Worker

//           workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}

//         >
//           {/* <Viewer fileUrl={privacyPolicy} /> */}
//           <Viewer    theme={'light'} fileUrl={'/images/policies/returns.pdf'} />

//         </Worker>
//         </div>
//           </div>
//         {/* </div> */}
//       {/* </div> */}

//      {/* <Footer /> */}
//     </div>
//   );
// }

import React from "react";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
// import styles from './dummyPolicy.module.css';

export default function Page() {
  return (
    <div className="bg-white">
      <head>
        <title>Return, Refund and Cancellation Policy | Hubeco</title>
      </head>
      {/* <Header /> */}
      <div className="banner-section h-[100%]">
        <div
          className="md:px-20 px-10"
          style={{
            position: "relative",
            backgroundImage: 'url("images/about/aboutBanner1.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            color: "#fff",

            // padding: "0 80px",
          }}
        >
          <Link
            href="/"
            className="text-white flex items-center no-underline px-2.5 py-1.5 rounded"
          >
            <AiFillHome size={16} className="text-white mr-1.5" />
            Home
          </Link>
          <span className="text-white mx-2">/</span>
          <Link
            href="#"
            className="text-white no-underline px-2.5 py-1.5 rounded"
          >
            Return, Refund and Cancellation Policy
          </Link>
        </div>

        <div
          className={`w-full flex justify-center items-center mx-auto max-w-[100%]  text-sm  text-black  leading-8 `}
        >
          <div className="p-10 md:leading-loose text-justify">
            <p
              data-placeholder="Type or paste your content here!"
              className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;"
            >
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Thank you for shopping at Hubeco!
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  We value the trust you
                </span>
              </span>
              <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  (“
                  <strong>you</strong>" or “<strong>your</strong>
                  ”)
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  place in Hubeco Green Ventures Private Limited ("
                  <strong>Company "</strong>
                  or
                  <strong>"us"</strong>
                  or
                  <strong>"we"</strong>
                  or
                  <strong>"our"</strong>) by accessing and using our Platform
                </span>
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
                  (“
                  <strong>Website</strong>
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
                  ”). Our goal is to provide you with good quality products and
                  services that exceed your expectations. Sometimes, however,
                  when your order arrives, you may realize that the product
                  isn’t exactly what you expected. Understanding the
                  significance of fair returns, refunds, and cancellations, this
                  Return, Refund, and Cancellation Policy ("
                  <strong>Policy</strong>
                  ") is designed to streamline the process for product returns
                  and cancellations on our Platform.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Please note that this Policy applies exclusively to products
                  purchased from our Platform and should be subject to the terms
                  and conditions outlined in the
                </span>
              </span>
              <Link
                href="https://hubeco.market/terms-of-use"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2e3191] text-[10pt] underline p-1">
                  <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                    Terms of Use
                  </span>
                </span>
              </Link>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  ,
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
                href="https://hubeco.market/vendor-terms-sale"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2e3191] text-[10pt] underline p-1">
                  <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                    Terms of Sale
                  </span>
                </span>
              </Link>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  and
                </span>
              </span>
              <Link
                href="https://hubeco.market/shipping-delivery"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2e3191] text-[10pt] underline p-1">
                  <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                    Delivery and Shipping Policy
                  </span>
                </span>
              </Link>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  .
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <h1
              id="efd020132beeb4f0e11aeddb86f341664"
              className="break-after:avoid;font-weight:normal;line-height:115%;margin:24.0pt 0in 6pt;text-align:justify;"
            >
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>RETURNS:</strong>
                </span>
              </span>
            </h1>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="ec182fa528e1541cd8d6f5b80991f3959"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">1.</span>What can I return?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  Items which are explicitly marked as "returnable" on the
                  product detail page and fall within the specified 'return
                  window' period are eligible for return.
                </span>
              </span>
            </p>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  All our products go through intense quality checks before they
                  are shipped. However, there might be instances where a product
                  is damaged during transit. If you have received a damaged,
                  defective, or wrong product, you can return the eligible
                  items. Items that are physically damaged, defective, have
                  missing parts, or differ from their description on the product
                  details page can be returned.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  The refund policy for any
                  <strong> defective and damaged orders </strong>
                  will also be guided by the respective vendor’s specific refund
                  policy and buyers are encouraged to refer to the vendor's
                  policies for detailed terms and procedures regarding these
                  options.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="e1d0b74e0ebdd77cf2e703e2ae0caa70e"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:.0001pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">2.</span>What are the items that
                        cannot be returned or replaced?
                      </strong>
                    </span>
                  </span>
                </h3>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span>2.1.</span>
                      <span className="font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:115%;"
                        >
                          The following items shall not be eligible for
                          return/replacement:
                        </span>
                      </span>
                    </p>
                    <ol className="list-className-type:none;padding-left:48px;">
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span>2.1.1.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Any item which is damaged or broken;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span>2.1.2.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Any item which has been used already;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span>2.1.3.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Any damage/defect that is not covered under the
                              vendor's warranty; and/or
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="line-height:115%;margin-bottom:8.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                          <span>2.1.4.</span>
                          <span className="font-family:Poppins;font-size:6.0pt;">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="line-height:115%;"
                            >
                              Any product that is returned without all original
                              packaging and accessories, including the box,
                              vendor's packaging if any, and all other items
                              originally included with the products delivered.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="eb3935bf0d16b5de1ff33c4301de7fc62"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">3.</span> What qualifies as a
                        damaged/defective/wrong product?
                      </strong>
                    </span>
                  </span>
                </h3>
                <p className="line-height:107%;margin-bottom:8.0pt;margin-right:0in;margin-top:0in;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                      Products shall be considered to be damaged / defective /
                      wrong in the following cases:
                    </span>
                  </span>
                </p>
                <ol className="list-className-type:none;padding-left:48px;">
                  <li className="md:pl-8 pl-4">
                    <p className="background-color:white;line-height:107%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span>3.1.</span>
                      <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:107%;"
                        >
                          The product seal is broken and/or there is a leakage;
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="background-color:white;line-height:107%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span>3.2.</span>
                      <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:107%;"
                        >
                          The product arrived with missing components or
                          specifications;
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="background-color:white;line-height:107%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span>3.3.</span>
                      <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:107%;"
                        >
                          The product arrived in a different quantity / size
                          than what was ordered;
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="background-color:white;line-height:107%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span>3.4.</span>
                      <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:107%;"
                        >
                          The product arrived in a different material than what
                          was ordered;
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="background-color:white;line-height:107%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span>3.5.</span>
                      <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:107%;"
                        >
                          The item does not match the product description;
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="background-color:white;line-height:107%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span>3.6.</span>
                      <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:107%;"
                        >
                          The entire product is missing from the box even if the
                          box is not tampered with;
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="background-color:white;line-height:107%;margin-bottom:11.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                      <span>3.7.</span>
                      <span className="color:#0F1111;font-family:Poppins;font-size:6.0pt;">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:107%;"
                        >
                          The shipping box is damaged or tampered with.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h3
                  id="e6024e160928611b3fbad3cf0c19808d3"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        {" "}
                        <span className="pr-2">4.</span>Who is eligible for
                        Returns and Refunds?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Return is a facility provided by respective vendors directly
                  under this Policy in terms of which the option of exchange,
                  replacement and/or refund is offered to the buyer.
                </span>
                <i>
                  <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                    One small caveat: all products or items listed on the
                    Platform may not have the same return policy.
                  </span>
                </i>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Buyers should be aware that the payment facility may not be
                  fully available for certain product categories, services, or
                  transactions. In such cases, you may not be eligible for a
                  refund. Refunds, when applicable, are conditional and may be
                  subject to recourse by the vendor in case of misuse by the
                  buyer. Additional verification documents may be requested for
                  processing of returns and refunds.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  If the vendor’s policies allow for returns and refunds, buyers
                  can request returns through our Platform, following the
                  process as outlined in this Policy.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="eb42c995192c8aafee0d478264630d5a8"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        {" "}
                        <span className="pr-2">5.</span>How can I return the
                        item?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Products received from the Platform may be returned, subject
                  to the specific return policies of the respective vendor from
                  whom you made the purchase. When you return an item, you may
                  see different return options depending on the vendor, item, or
                  reason for return.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  To initiate the return process for eligible items you've
                  purchased from our Platform:
                </span>
              </span>
            </p>
            <ul className="padding-left:48px;">
              <li>
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      Visit the [My Orders] section on our Platform to view your
                      recent purchases.
                    </span>
                  </span>
                </p>
              </li>
              <li>
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      Select the specific order and choose the option for
                      <strong> Return or Replace Items</strong>.
                    </span>
                  </span>
                </p>
              </li>
              <li>
                <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      Pick the item you wish to return and indicate the reason
                      for the return from the provided menu.
                    </span>
                  </span>
                </p>
              </li>
              <li>
                <p className="line-height:115%;margin-bottom:8.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      Decide on your preferred return method. If applicable,
                      specify whether you prefer a refund or replacement. For
                      items sold by third-party vendors, you may need to
                      <strong> submit a return request </strong>, which is
                      subject to review by the vendor.
                    </span>
                  </span>
                </p>
              </li>
            </ul>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  If you have chosen to replace the items, a replacement order
                  will be created. The replacement order may be shipped only
                  after the vendor receives the original item(s) in the exact
                  condition it was sent to you. This Policy applies as long as
                  the items are unused, undamaged, and with all original tags
                  &amp; packaging intact. In the event that the vendor offers
                  returns, the vendor shall notify you about the expected
                  pick-up date of the product that you wish to return. Each
                  return label is assigned to a specific return. To receive the
                  correct refund, don't include items from multiple orders or
                  shipments in the same box.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Additionally, buyers may only be eligible for a one-time
                  replacement under this Policy, subject to the terms provided
                  herein.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Some return-eligible items sold on our Platform may have a
                  free or paid return option, depending on the item, the
                  vendor’s policies and subject to the terms set out in this
                  Policy.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="e81a1962b7329bc34e769044df95a0f13"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">6.</span> What is the timeframe
                        or return window within which I can request a return or
                        replacement for an item?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  The return window or timeframe within which you can request a
                  return or replacement for an item may vary and depends on the
                  vendor’s return policy which is provided alongside the product
                  details for online purchases. For offline orders, the return
                  and replacement terms will be specified by the vendor. It is
                  important to review the concerned vendor’s return policies to
                  understand the applicable return timeframe and conditions.
                  Failure to initiate a return or replacement request within the
                  timeframe specified by the respective vendor will be deemed as
                  acceptance of the delivered order.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  However, please note that different products may have varying
                  timelines for returns, and some items may be non-returnable.
                  Always check the product details at the time of making a
                  purchase.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="eb993b9c1cda7809435f5aeb17de55332"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">7.</span>Can I request the
                        replacement of the product to a different address?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  Replacement cannot be delivered to a different address. We
                  recommend returning the item for a refund and placing a new
                  order with the new address.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="e31183c6a353ceb2234528468d4f6334e"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        {" "}
                        <span className="pr-2">8.</span>What if my return is not
                        processed?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  You must report an unprocessed return to the vendor within
                  <strong> seven (07) days </strong>. In case there is no
                  response or update on your return request from the vendor, you
                  can contact us through the Platform functionality that may be
                  through available communication windows, or utilizing
                  communication windows, or through our admin support staff to
                  ensure the issue is resolved promptly.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <h1
              id="eb907a6c580efdc7382ca12034d54f7dc"
              className="break-after:avoid;font-weight:normal;line-height:115%;margin:24.0pt 0in 6pt;text-align:justify;"
            >
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>REFUNDS:</strong>
                </span>
              </span>
            </h1>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="ef97c0f9a9010e5cffec52374a1d56cda"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        {" "}
                        <span className="pr-2">9.</span>When will I receive my
                        refund?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  Once the vendor receives the returned product, the vendor will
                  inspect the returned product to determine the state of the
                  product and eligibility for a refund or replacement. After
                  inspection, the vendor will approve the return or replacement
                  request and the request will be initiated for your order.
                  Usually, the refund is processed within five (05) working days
                  of receipt of the returned product. The paid amount shall be
                  returned to the same source from which the original payment
                  had been made. However, the actual refund timeline may vary
                  depending on your payment method and banking institution.
                </span>
              </span>
            </p>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  <strong>
                    <u>Note:</u>
                  </strong>
                </span>
              </span>
            </p>
            <ul className="pl-8">
              <li className="list-disc">
                <p className="line-height:107%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                      Please note that a
                    </span>
                  </span>
                  <span className="background-color:white;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                      refund within 5 working days indicates that you must wait
                      until the end of the 5th working day for a refund update.
                    </span>
                  </span>
                </p>
              </li>
              <li className="list-disc">
                <p className="line-height:107%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                      If the refund is issued to your credit card account, your
                      card provider may take additional time to update the
                      statement. Please check your latest bank account statement
                      to confirm the refund, it will be visible in the 'Unbilled
                      Transactions' section in your credit card statement. If
                      you do not see the 'Unbilled Transactions' section in your
                      credit card statement, please contact your card provider
                      for the refund confirmation.
                    </span>
                  </span>
                </p>
              </li>
              <li className="list-disc">
                <p className="line-height:107%;margin-bottom:8.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                      Make sure to add/update the correct bank account details
                      in your account for refunds to be successfully processed.
                    </span>
                  </span>
                </p>
              </li>
            </ul>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="eb0f7311c0c7b64fa78148db4bccfd058"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">10.</span>What if my refund is
                        not processed by the vendor within a specified
                        timeframe?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  If your refund is not processed by the vendor within a
                  specified timeframe, we shall issue a refund directly to you
                  upon the vendor’s confirmation that they have received the
                  returned product in its original state and is not defective.
                  There is a window for processing vendor's invoices which
                  aligns with your return window. Post the return window, you
                  cannot return the products. We ensure that you are not
                  returning the products prior to the processing of vendor
                  invoices. Once there is a confirmation from you about order
                  fulfilment, the vendor's invoices are processed.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <h1
              id="e326b077a7d8b26d3c61edcae7ff9b3e1"
              className="break-after:avoid;font-weight:normal;line-height:115%;margin:24.0pt 0in 6pt;text-align:justify;"
            >
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>CANCELLATIONS:</strong>
                </span>
              </span>
            </h1>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  This section will guide you on rules and guidelines for
                  cancelling orders placed on the Platform. The Platform holds
                  the right to accept order cancellations and may, at its
                  discretion, modify time windows or waive cancellation fees.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="ecff554c4c8829c6e408c25de29147d20"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        {" "}
                        <span className="pr-2">11.</span>Can I cancel my order?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  You may cancel your order if it is allowed by the concerned
                  vendor as order cancellation policies vary from vendor to
                  vendor. Some vendors may not accept cancellations once an
                  order has been placed. Generally, you can cancel your order
                  before we send the dispatch confirmation email relating to
                  that order. No order can be cancelled once it’s out for
                  delivery. However, the time window for cancellation varies
                  based on different product categories and vendor’s
                  cancellation policy. It's important to check and initiate
                  cancellations within the specified timeframe. The order cannot
                  be cancelled once the specified time has passed. To cancel
                  your order, go to the [My Orders] section and select the order
                  to cancel by selecting the [Cancel Order] option.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="eb940e413efe567c66ebd72322f17c68b"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        {" "}
                        <span className="pr-2">12.</span>What happens when I
                        cancel my order?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  A "<strong>Cancellation Fee</strong>" may be imposed on you
                  for cancelling orders on the Platform if the cancellation
                  occurs after the expiry of the cancellation period applicable
                  to the concerned product after the order placement, but before
                  the dispatch confirmation email has been sent to you.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  The Cancellation Fee shall be deducted from the amount paid by
                  you for the said cancelled order. The Company reserves the
                  right to modify/waive the Cancellation fee from time to time
                  upon confirmation from the concerned vendor and in accordance
                  with the cancellation policy (if any) applicable to such
                  order. The Cancellation fee shall be quoted in Indian Rupees.
                  You shall be solely responsible for compliance with all
                  applicable laws for making payments to the Platform or the
                  vendors (as the case may be) on account of any cancellation of
                  orders from your end.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="e6dbd9bfd61b17458f007dd279358dfcf"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        {" "}
                        <span className="pr-2">13.</span>Can the vendor cancel
                        my order?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:14.0pt 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Yes, the vendor retains the right to cancel orders at its sole
                  discretion. The vendor retains the right to cancel any order
                  placed by the buyer on the Platform at its sole discretion and
                  the buyer shall be intimated of the same by us and/or the
                  vendor by way of an email / SMS. The vendor may cancel an
                  order wherein the quantities exceed the typical individual
                  consumption, depending on the sole discretion of the
                  respective vendor.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <i>
                  <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                    <strong>
                      In case of such cancellation by the vendor, any
                      transaction price paid by the buyer shall be refunded to
                      the buyer by the Company.
                    </strong>
                  </span>
                </i>
              </span>
            </p>
            <p className="line-height:115%;margin:14.0pt 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Further, the vendor may cancel and block orders and buyers for
                  fraudulent transactions. If an order is considered suspicious
                  due to multiple quantities across various orders under the
                  same buyer details, we or the vendor reserve the right to
                  cancel or reject such orders, initiate refunds, and
                  permanently block buyers from future transactions without
                  notice. Additionally, any fraudulent activities, such as
                  returning fake/old/damaged products, may result in restricting
                  the buyer's future transactions or permanent blocking without
                  notice and liability.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-className-type:none;padding-left:48px;">
              <li>
                <h3
                  id="ee2651edb5e5ab38a1a298001d05f15b3"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">14.</span>What are the types of
                        orders that cannot be cancelled?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Where the vendor’s policy indicates that cancellation shall
                  not be available for a specific product, the order for such
                  products cannot be cancelled.
                </span>
              </span>
            </p>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;">
              <br data-cke-filler="true" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
