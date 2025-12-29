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

// const getData = () => {
//   Webservices.callGetApi(
//     getEndpoint.default.GETALLPOLICIES,
//     ''
//   )
//     .then((d: any) => {
//      // // console.log("data", d);
//       d?.data?.map((item: any) => {
//        // // console.log('policyitem',item._id)
//         if (item?.title === "Delivery and Shipping Policy") {
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
//         <title>Delivery and Shipping Policy | Hubeco Buyer</title>
//       </Head> */}
//        <head>
//         <title>Delivery & Shipping Policy | Hubeco</title>
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
//             Delivery and Shipping Policy
//           </a>
//         </div>
//         <div className={`flex justify-center items-center   text-sm  text-brown  leading-8 `}>
//         <Worker
//           workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
//         >
//           {/* <Viewer fileUrl={privacyPolicy} /> */}
//           <Viewer fileUrl={'/images/policies/shipping.pdf'} />

//         </Worker>
//         </div>
//       </div>

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
        <title>Delivery and Shipping Policy | Hubeco</title>
      </head>
      {/* <Header /> */}
      <div className="banner-section h-[100%]">
        <div
          className="md:px-20 px-10 relative h-[200px] flex items-center justify-start text-white"
          style={{
            backgroundImage: 'url("images/about/aboutBanner1.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
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
            Delivery and Shipping Policy
          </Link>
        </div>

        <div
          className={`w-full flex justify-center items-center mx-auto max-w-[100%]  text-sm  text-brown  leading-8 `}
        >
          <div className="p-10 leading-loose text-justify">
            <p
              data-placeholder="Type or paste your content here!"
              className="line-height:115%;margin:0in 0in 8.0pt;"
            >
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Thank you for shopping at Hubeco!
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
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
                  <strong>"our"</strong>) by accessing and using our
                </span>
              </span>
              <Link
                href="http://www.hubeco.market"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]">
                  https://www.hubeco.market
                </span>
              </Link>

              <span className="text-[#2e3191] text-[10pt] underline p-1">
                <span
                  dir="ltr"
                  lang="EN-GB"
                  className="line-height:115%;"
                ></span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  (“
                  <strong>Website</strong>
                  ”)
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
                  connection therewith (together “<strong>Platform</strong>
                  ”). We always try our best to provide you with satisfactory
                  products that exceed your expectations. Once you place an
                  order on our Platform, our team works diligently to ensure
                  your products are packed securely and dispatched in a timely
                  manner. This Shipping Policy ("
                  <strong>Policy</strong>
                  ") is designed to outline the process and terms for the
                  shipping of products purchased on our
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
                <span className="text-[#2e3191] text-[10pt] underline p-1 leading-[115%]">
                  https://www.hubeco.market
                </span>
              </Link>

              <span className="color:#1155CC;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <u></u>
                </span>
              </span>
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  website.
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
                  and
                </span>
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
              <span className="color:#1155CC;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  .
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="e3de10f9d428bf45a1897e9c11e1a264c"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">1.</span> How long does it take
                        to process and prepare my order for shipment?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  Orders are typically processed within 3-7 business days. Once
                  your order is confirmed, the packing process is initiated to
                  ensure your items are prepared securely for shipment. Please
                  note that for each vendor, the delivery timelines may vary.
                  You should refer to the delivery timelines specified on the
                  product details page for accurate information.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="e8c37364ec8cdad3277e86d3002e87cf5"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">2.</span> Are there any delivery
                        charges for shipping my order?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Delivery charges are determined by each vendor and are in
                  accordance with their specific shipping policies. We recommend
                  that buyers review the order summary to understand the
                  delivery charges associated with items ordered.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="e006e7c8cd00715ed9cd6df8d0080e56c"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">3.</span> How are delivery
                        charges/shipping costs determined?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Shipping costs are determined and set by the vendors during
                  the onboarding of their products. In case of online orders,
                  the calculated shipping fees will be displayed at checkout
                  before you complete your purchase, ensuring you have full
                  transparency of the costs associated with your order. For
                  offline orders, the vendors will specify the delivery
                  timelines and shipping costs in the quotations they send to
                  you.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="ec95b194d8c7e1a6698c1d15822788070"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">4.</span>What shipping methods
                        are available to buyers?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  We currently offer standard shipping. This method ensures that
                  your order is delivered efficiently and securely within the
                  estimated delivery time frame.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="e8211f1230aa7eecb3d1add5b18842242"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">5.</span>Do shipping options vary
                        based on the type, size, or destination of the product?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
              <p className="line-height:115%;margin:0in 0in 0.0001pt;text-align:justify;">
                <span className="font-family:Poppins;font-size:6.0pt;">
                  <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                    Yes, shipping options vary based on the product type, size,
                    and destination. Some products may require truck transport,
                    while others can be shipped using regular methods through
                    courier agencies. Additionally, certain items may need to be
                    shipped via cargo. The appropriate shipping method will be
                    selected to ensure the safe and efficient delivery of your
                    order.
                  </span>
                </span>
              </p>
              <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                <br data-cke-filler="true" />
              </p>
              <li className="line-height:107%;margin-bottom:8.0pt;margin-right:0in;margin-top:0in;">
                <p className="text-align:justify;">
                  <span className="color:windowtext;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                      <strong>
                        <span className="pr-2">6.</span> Which shipping carriers
                        or providers facilitate the delivery of my order?
                      </strong>
                    </span>
                  </span>
                </p>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  The choice of shipping carriers and providers may vary
                  depending on the vendor. Each vendor selects their preferred
                  shipping partner based on factors such as location, shipping
                  requirements, and product type to ensure efficient and
                  reliable delivery.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="e27657bb0dc5f582d3172308fd8faf825"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        {" "}
                        <span className="pr-2">7.</span>What is the expected
                        delivery time?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  The estimated delivery time is contingent on various factors
                  and may differ from one vendor to another. Typically, vendors
                  dispatch items within the stipulated time frames mentioned on
                  the product page. The delivery timeline is influenced by the
                  following factors:
                </span>
              </span>
            </p>
            <ul className="pl-8">
              <li className="list-disc ">
                <p className="line-height:107%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                      The vendor’s terms;
                    </span>
                  </span>
                </p>
              </li>
              <li className="list-disc ">
                <p className="line-height:107%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                      Availability of the product with the vendor; and/or
                    </span>
                  </span>
                </p>
              </li>
              <li className="list-disc ">
                <p className="line-height:107%;margin-bottom:8.0pt;margin-right:0in;margin-top:0in;text-align:justify;">
                  <span className="font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                      The delivery address of the buyer.
                    </span>
                  </span>
                </p>
              </li>
            </ul>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  If a vendor does not deliver to your area, you will be
                  notified when entering the address during the order placement.
                  In such instances, we recommend choosing a vendor that ships
                  to your location to prevent any inconvenience.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="ebada02e6c8472269ad2bec5d0279097b"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">8.</span>Can I track my order?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  Yes, you will receive order tracking information. It is
                  provided through the buyer module and messaging service. When
                  you log in to your account, you can view the tracking status
                  of your orders. Vendors update the status of each order
                  through the vendor module, ensuring that you have up-to-date
                  information on your shipments.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="e3b4139ac426f2cf0ef16ed2e770eaa45"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">9.</span>What should I do if my
                        tracking information is not updating?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  In rare cases, tracking information may not be updated
                  immediately. If there's a prolonged lack of updates, please
                  contact our customer support, and we'll investigate the issue
                  promptly.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="e8471ab9331b0a5e3e9156817c706cb41"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">10.</span>What if I provided the
                        wrong address for the delivery of my order?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Any issues arising from an incorrect address are the sole
                  responsibility of the buyer. If the delivery is unsuccessful
                  due to an incorrect address provided by you, the order will be
                  returned to the vendor. The vendor will be eligible for
                  payment upon confirming the fulfilment of the required
                  timelines. If you do not respond within the specified return
                  window or the package is refused due to the incorrect address
                  (varies from vendor to vendor), no refund will be issued.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="ee25b1632d76f1b93bd0b98d558672229"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">11.</span> Can I change the
                        delivery address while the order is in transit?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Unfortunately, we cannot change the delivery address once the
                  order is in transit. Please ensure the accuracy of your
                  address during the checkout process.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="efb9aa0f7aebceaf64acf646f9c56eea1"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">12.</span>What happens if I am
                        not available to receive my order during delivery?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  If you're unavailable during the delivery, please note that
                  leaving the package in a secure location or the option of
                  subsequent delivery may not be feasible as vendors do not have
                  warehouses in every city and typically your order is shipped
                  directly from their manufacturing premises. However, some
                  vendors may have the ability to manage this, so the approach
                  can vary based on the vendor's delivery policy.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="e99f627fd3ef2d9b57b8afa2f895ddcc0"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">13.</span>What happens if I
                        refuse to accept the delivery of the order?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 0.0001pt;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  If you refuse to accept the delivery of the order, the order
                  will be returned to the vendor. Upon confirmation that the
                  vendor has fulfilled the required timelines and you have not
                  responded within the return window or refused delivery (that
                  may vary from vendor to vendor), you shall get no refund for
                  the same.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="edc4462241c641d77c2f5ee2b7c724c30"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">14.</span>How do you handle lost,
                        damaged, or delayed shipments?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  Vendors are responsible for managing all shipments through
                  their logistics partners. We support vendors and buyers by
                  maintaining frequent communication to resolve any issues that
                  arise.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="ea40f718a5457e151350b1cede76956f1"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">15.</span>Who is responsible for
                        any damage to the orders after dispatch or once
                        delivered?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Prior to the delivery of the product, the responsibility for
                  any damage shall lie with the vendor. Once delivered, the
                  buyer shall be responsible for any damage. We do not assume
                  liability in this regard.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <i>
                  <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                    <strong>
                      Buyers are strongly encouraged to conduct a thorough
                      inspection of the products upon receipt to address any
                      concerns promptly.
                    </strong>
                  </span>
                </i>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="ec6a48f232fd6e4f4c4cfb99077650127"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">16.</span> What if the delivery
                        of my order is delayed?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  We strive to ensure timely delivery for all our orders.
                  However, there may be instances where orders arrive after the
                  estimated delivery date. If you experience a delay, we
                  recommend taking the following steps:
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>Track your package:</strong>
                  Confirm the estimated delivery date in the [My Orders] section
                  by tracking your package.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>Verify your shipping address:</strong>
                  To prevent delivery issues, ensure your address information is
                  accurate and up to date in your profile and in the [My Orders]
                  section. You can also add delivery instructions to your
                  addresses.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>Check payment processing:</strong>
                  Review the payment processing status in the [My Orders]
                  section to ensure there are no issues.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  <strong>Wait 48 hours:</strong>
                  Allow for an additional 48 hours to account for any unexpected
                  delays.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  Taking these actions will help you stay informed and address
                  any potential issues related to the delivery of your order.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="ea4bf095e9cb41cc26049246132707b9d"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">17.</span>How can I report the
                        delayed shipment?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  In case you do not receive the delivery within 5 (five) days
                  of the estimated delivery date, please contact our customer
                  support with your order and tracking details. We will
                  investigate the issue and provide assistance.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="e0dc47728543b7af6b015694cb31cdbb9"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">18.</span>What should I do if my
                        order arrives damaged?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  If your order arrives damaged, please take photos of the
                  damaged items and packaging. Contact our customer support with
                  the images, and your order details, and we will assist you
                  with the next steps.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="ec15567ea9e0402bbc285c248c061f6bc"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">19.</span> What happens if my
                        order is marked as delivered but I haven't received it?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <h3
              id="e762b151562833b1a5e929b394e6078b8"
              className="break-after:avoid;font-weight:normal;line-height:115%;margin:14.0pt 0in 4pt;text-align:justify;"
            >
              <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  If your order is marked as delivered but you haven't received
                  it, please check with neighbours or building managers to see
                  if they have accepted the order on your behalf. If the issue
                  persists, please reach out to our customer support team for
                  assistance.
                </span>
              </span>
            </h3>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="e08f07f1f0d01f9dab3d24b962584315e"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">20.</span>How to report any other
                        issues I have regarding the shipment of my order?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  You can report your concerns and issues with your shipments by
                  emailing us at
                </span>
              </span>
              <span className="text-[#2e3191] text-[10pt] underline p-1">
                <span
                  dir="ltr"
                  lang="EN-GB"
                  className="line-height:107%;"
                ></span>
              </span>
              <Link href="#">
                <span className="text-[#2e3191] text-[10pt] underline p-1 leading-[107%]">
                  info@hubeco.market
                </span>
              </Link>

              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  or calling the support contacts provided by us on our website.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="ea2470261295e963effff9edfe3f4c31f"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">21.</span>Are there any
                        international shipping options available?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:115%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                  As of now, we don’t deliver items internationally. Please
                  ensure the delivery address is in India.
                </span>
              </span>
            </p>
            <p className="line-height:115%;margin-bottom:0.0001pt;margin-right:0in;margin-top:0in;text-align:justify;">
              <br data-cke-filler="true" />
            </p>
            <ol className="padding-left:48px;">
              <li>
                <h3
                  id="ee9c7692e5374257d9ac2a114ee9f1184"
                  className="break-after:avoid;font-weight:normal;line-height:115%;margin-bottom:4.0pt;margin-right:0in;margin-top:14.0pt;text-align:justify;"
                >
                  <span className="color:black;font-family:Poppins;font-size:6.0pt;">
                    <span dir="ltr" lang="EN-GB" className="line-height:115%;">
                      <strong>
                        <span className="pr-2">22.</span> Can I request
                        expedited shipping for my order?
                      </strong>
                    </span>
                  </span>
                </h3>
              </li>
            </ol>
            <p className="line-height:107%;margin:0in 0in 8.0pt;text-align:justify;">
              <span className="font-family:Poppins;font-size:6.0pt;">
                <span dir="ltr" lang="EN-GB" className="line-height:107%;">
                  Yes, you may have the option to select expedited shipping
                  during the checkout process. Please note that accepting the
                  request for expedited shipping shall depend on the respective
                  vendor and such additional charges may apply for expedited
                  shipping.
                </span>
              </span>
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
