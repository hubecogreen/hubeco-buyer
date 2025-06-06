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
//           iframe.style.height = event.data.height+150 + 'px'; // Set the height of the iframe
//          // // console.log('Heiegehe',iframe.style.height)
//           setH(iframe.style.height)
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
//           style={{
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
//             style={{
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
//             style={{
//               textDecoration: "none",
//               padding: "5px 10px",
//               borderRadius: "5px",
//             }}
//           >
//             Vendor Agreement
//           </a>
//         </div>
//         {/* <div className="bg-secondaryBg w-full"> */}
//           {/* <div style={{height:h}} className="py-12 px-4 lg:px-20 mx-auto max-w-[100%] pt-12 text-sm font-normal text-black tracking-wide leading-8"> */}
//             {/* {privacyPolicy ? (

//               <div style={{  }} className="h-full">

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
import { getCookie } from "cookies-next";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-white">
      <head>
        <title>Vendor Agreement | Hubeco</title>
      </head>
      {/* <Header /> */}
      <div className="banner-section h-[100%]">
        <div
          className="md:px-20 px-10 relative bg-cover bg-center h-[200px] flex items-center justify-start text-white"
          style={{
            backgroundImage: 'url("images/about/aboutBanner1.png")',
          }}
        >
          <Link
            href="/"
            className="text-white flex items-center no-underline px-2 py-1 rounded"
          >
            <AiFillHome size={16} className="text-white mr-1.5" />
            Home
          </Link>

          <span className="text-white mx-2">/</span>
          <Link href="#" className="text-white no-underline px-2 py-1 rounded">
            Vendor Agreement
          </Link>
        </div>

        <div
          className={`w-full flex justify-center items-center mx-auto max-w-[100%]  text-sm  text-black  leading-8 `}
        >
          <div className="p-10 leading-loose text-justify">
            <p className="leading-loose m-0 text-justify">
              <span className="text-[10pt]">
                <span dir="ltr" lang="EN-GB" className="leading-loose">
                  <strong className="pr-1">IMPORTANT!</strong>
                </span>
                <i>
                  <span dir="ltr" lang="EN-GB" className="leading-loose"></span>
                </i>
                <span dir="ltr" lang="EN-GB" className="leading-loose">
                  PLEASE READ THIS AGREEMENT CAREFULLY. YOU ACKNOWLEDGE THAT YOU
                  HAVE READ, UNDERSTOOD, AND CONSENT TO BE BOUND BY THE TERMS OF
                  THIS AGREEMENT. YOUR USE OF THE PLATFORM IS CONDITIONED UPON
                  YOUR ACCEPTANCE OF THIS AGREEMENT. IF YOU DO NOT AGREE WITH
                  ANY PART OF THIS AGREEMENT, YOU MUST NOT USE OR ACCESS THE
                  PLATFORM.
                </span>
              </span>
            </p>
            <p className="leading-loose m-0 -mr-[13.85pt] mb-[6pt] text-justify">
              <span className="text-[10pt]">
                <span dir="ltr" lang="EN-GB" className="leading-loose">
                  This Vendor Agreement ("
                  <strong className="p-1">Agreement</strong>
                  ") is made and entered into as of the date of electronic
                  acceptance ("
                  <strong className="p-1">Effective Date</strong>
                  "). This Agreement constitutes a binding agreement between you
                  (the " <strong className="p-1">you</strong>" or “{" "}
                  <strong className="p-1">your</strong>
                  ”, or “ <strong className="p-1">Vendor</strong>
                  ”) and
                  <strong className="p-1">
                    Hubeco Green Ventures Private Limited
                  </strong>
                  (CIN: U47521TS2024PTC185431) (the “{" "}
                  <strong className="p-1">Company</strong>
                  ”) incorporated under the Companies Act of 2013, having its
                  registered address at H NO: 8-2-293/F-II/A/20A, Filmnagar,
                  Jubilee Hills, Shaikpet, Hyderabad, Telangana, India, 500033.
                </span>
              </span>
            </p>
            <ol className="list-none">
              <li>
                <h1
                  id="eac78f799d1f3d46cf1be5eeced8e3a66"
                  className="break-after-avoid font-normal leading-loose mb-[6pt] -mr-[13.85pt] mt-[20pt] text-justify"
                >
                  <span className="pr-2">1.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">PURPOSE</strong>
                    </span>
                  </span>
                </h1>
              </li>
            </ol>
            <p className="leading-loose m-0 text-justify">
              <span className="text-[10pt]">
                <span dir="ltr" lang="EN-GB" className="leading-loose">
                  The purpose of this Agreement is to establish the terms under
                  which the Company provides you with access to an e-commerce
                  platform named ‘
                </span>
                <i>
                  <span dir="ltr" lang="EN-GB" className="leading-loose">
                    Hubeco Marketplace
                  </span>
                </i>
                <span dir="ltr" lang="EN-GB" className="leading-loose">
                  ’ accessible at (
                </span>
              </span>
              <Link
                href="http://www.hubeco.market"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2e3191] text-[10pt] underline p-1">
                  <span dir="ltr" lang="EN-GB" className="leading-loose">
                    www.hubeco.market
                  </span>
                </span>
              </Link>
              <span className="text-[10pt]">
                <span dir="ltr" lang="EN-GB" className="leading-loose">
                  ) (the “ <strong className="p-1">Platform</strong>
                  ”) for the listing and sale of eco-friendly building materials
                  and related services. This Agreement aims to ensure that all
                  transactions align with the Company’s sustainability
                  standards, outline the rights and obligations of both the
                  Company and the Vendor, and promote a transparent, lawful, and
                  mutually beneficial relationship in the facilitation of
                  sustainable commerce.
                </span>
              </span>
            </p>
            <ol className="list-outside">
              <li>
                <h1
                  id="e90517ac0e86685741b6bf37dc7120407"
                  className="break-after-avoid font-normal leading-loose mb-[6pt] -mr-[13.85pt] mt-[20pt] text-justify"
                >
                  <span className="pr-2">2.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        ELECTRONIC RECORD AND EXECUTION
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-outside">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose">
                      <span className="pr-2">2.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          You understand and agree that this document is an
                          electronic record in terms of the Information
                          Technology Act, 2000, and rules there under as
                          applicable and the amended provisions pertaining to
                          electronic records in various statutes as amended by
                          the Information Technology Act, 2000. This electronic
                          record is generated by a computer system and does not
                          require any physical or digital signatures.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">2.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Additionally, this document is published in accordance
                          with the provisions of Rule 3 (1) of the Information
                          Technology (Intermediaries guidelines) Rules, 2011
                          that require publishing the rules and regulations,
                          Privacy Policy, and Terms of Sale for access or usage
                          of Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">2.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          You acknowledge that by
                        </span>
                      </span>
                      <span className="background-color:#fff;text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          impliedly or expressly accepting the terms outlined in
                          this Agreement, you also accept and agree to be bound
                          by all of our other policies applicable to you
                          including but not limited to
                        </span>
                      </span>
                      <Link
                        href="https://hubeco.market/privacy-policy"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[#2e3191] text-[10pt] underline p-1">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            Privacy Policy
                          </span>
                        </span>
                        <span className="background-color:#fff;color:#15c;text-[10pt]">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          ></span>
                        </span>
                      </Link>
                      <span className="background-color:#fff;text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          and
                        </span>
                      </span>
                      <Link
                        href="https://hubeco.market/vendor-terms-sale"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[#2e3191] text-[10pt] underline p-1">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            Terms of Sale
                          </span>
                        </span>
                      </Link>
                      <span className="background-color:#fff;text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          , as amended, from time to time.
                        </span>
                      </span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            If you do not agree with anything provided herein,
                            please do not use or access our Platform.
                          </strong>
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <li>
                <h1
                  id="e2890aabe2151991e73ffc3cb031b8c7d"
                  className="break-after-avoid font-normal leading-loose mb-[6pt] -mr-[13.85pt] mt-[20pt] text-justify"
                >
                  <span className="pr-2">3.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        DEFINITIONS AND INTERPRETATION
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">3.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            <u>Definitions</u>
                          </strong>
                          : In this Agreement, the following words, expressions,
                          and abbreviations shall have the following meanings
                          unless the context otherwise requires:
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.1.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">“Applicable Law”</strong>
                              shall mean any statute, law, regulation,
                              ordinance, rule, judgement, notification, rule of
                              common law, Order, decree, bye-law, government
                              approval, directive, guideline, requirement or
                              other governmental restriction, or any similar
                              form of decision of, or determination by, or any
                              interpretation, policy or administration, having
                              the force of law of any of the foregoing, by any
                              Authority having jurisdiction, whether in effect
                              as of the Effective Date or thereafter;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.1.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">“Business Days”</strong>
                              means a day, not being a Saturday or Sunday or a
                              public holiday, on which banks are open for
                              business in India in the context of a payment
                              being made to or from a scheduled commercial bank
                              in a place other than India, in such other place;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.1.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">
                                “Buyer” or “Buyers”
                              </strong>
                              shall mean an individual or entity engaging in the
                              purchase of goods and/or services available on the
                              Platform. The term specifically refers to the
                              buyer, the individual, or entity initiating a
                              transaction by selecting and acquiring products or
                              services being offered by the Vendors through the
                              Platform. For the avoidance of doubt, the term
                              “Buyer” encompasses both B2B
                              (Business-to-Business) and B2C
                              (Business-to-Consumer) buyers;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.1.4.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              “{" "}
                              <strong className="p-1">
                                Intellectual Property
                              </strong>
                              shall mean any and all trademarks and services
                              marks (whether or not registered), copyrights,
                              design rights (whether or not registered), moral
                              rights, patents (whether or not registered),
                              performance rights, database rights and other new
                              media rights, names, logos and codes, publicity
                              rights, and any and all other intellectual
                              property and proprietary rights of any nature
                              whatsoever that subsist, or may subsist, or be
                              capable of registration, or any part thereof and
                              which exist, or may exist, in any jurisdiction,
                              and the term
                              <strong className="p-1">
                                Intellectual Property Rights
                              </strong>
                              shall accordingly be construed as rights to
                              <strong className="p-1">
                                Intellectual Property
                              </strong>
                              ;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.1.5.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">
                                “Objectionable Content”
                              </strong>
                              means information or content that (a) belongs to
                              another person and to which the user does not have
                              any right; (b) is grossly harmful, harassing,
                              blasphemous defamatory, obscene, pornographic,
                              paedophilic, libellous, invasive of another's
                              privacy, hateful, or racially, ethnically
                              objectionable, disparaging, relating or
                              encouraging money laundering or gambling, or
                              otherwise unlawful in any manner whatever; (c)
                              harms minors in any way; (d) infringes any patent,
                              trademark, copyright or other proprietary rights;
                              (e) violates any law for the time being in force;
                              (f) deceives or misleads the addressee about the
                              origin of such messages or communicates any
                              information which is grossly offensive or menacing
                              in nature; (g) impersonates another person; (h)
                              contains software viruses or any other computer
                              code, files or programs designed to interrupt,
                              destroy or limit the functionality of any computer
                              resource; (i) threatens the unity, integrity,
                              defence, security or sovereignty of India,
                              friendly relations with foreign states, or public
                              order or causes incitement to the commission of
                              any cognisable offence or prevents investigation
                              of any offence or is insulting any other nation.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.1.6.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">
                                “Product Information”
                              </strong>
                              means, with respect to each of the Products, the
                              following (including to the extent expressly
                              required under the Company Policies): (i)
                              description; (ii) Stock Keeping Unit (SKU) and
                              other identifying information(like images/videos)
                              as the Company may reasonably request; (iii)
                              information regarding in-stock status and
                              availability, shipping limitations or
                              requirements, and Shipment Information (in each
                              case, in accordance with any categorisations
                              prescribed by the Company from time to time); (iv)
                              categorisation within each Company product
                              category as prescribed from time to time; (v)
                              digitized image that accurately depicts only the
                              Product and does not include any additional logos,
                              text or other markings; (vi) listing price
                              including tiered listing price; (viii) any text,
                              disclaimers, warning, notices, labels, or other
                              Content required by Applicable Law to be displayed
                              in connection with the offer, merchandising,
                              advertising or sale of the Product; (ix) brand;
                              (x) model; (xi) product dimension; (xii) weight;
                              (xiii) a delimited list of technical
                              specifications; (xiv) any other identifying
                              information as the Company may reasonably request
                              for accessories related to the Product that are
                              available with the Product; (xv) minimum order
                              quantity; and (xvi) any other information
                              requested by the Company or required by Applicable
                              Law.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.1.7.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">“Product(s)”</strong>
                              shall mean and include all items, including
                              eco-friendly products having green certification
                              by various agencies, to be provided and offered by
                              the Vendor on the Platform, as well as any
                              additional services requested by the Platform in
                              writing, subject to the terms of this Agreement.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.1.8.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              “
                              <strong className="p-1">
                                Return, Refund and Cancellation Policy
                              </strong>
                              ” shall refer to the policy available
                            </span>
                          </span>
                          <Link
                            href="https://hubeco.market/returns-refunds-cancellations"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <span className="text-[#2e3191] text-[10pt] underline p-1">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                here
                              </span>
                            </span>
                          </Link>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              .
                            </span>
                          </span>
                        </p>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <br data-cke-filler="true" />
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">3.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            <u>Interpretation:</u>
                          </strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.2.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Heading and bold typeface are only for convenience
                              and shall be ignored for the purpose of
                              interpretation.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.2.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Other terms may be defined elsewhere in the text
                              of this Agreement and, unless otherwise indicated,
                              shall have such meaning throughout this Agreement.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.2.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              References to this Agreement shall be deemed to
                              include any amendments or modifications to this
                              Agreement, as the case may be.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">3.2.4.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Unless the context of this Agreement otherwise
                              requires:
                            </span>
                          </span>
                        </p>
                        <ol>
                          <li className="md:pl-20 pl-10">
                            <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                              <span className="pr-2">3.2.4.1.</span>
                              <span className="text-[10pt]">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  the terms “hereof", “herein”, “hereby”,
                                  “hereto” and derivative or similar words refer
                                  to this entire Agreement or specified Clauses
                                  of this Agreement, as the case may be;
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                              <span className="pr-2">3.2.4.2.</span>
                              <span className="text-[10pt]">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  references to a particular section, clause,
                                  paragraph, sub-paragraph or schedule, exhibit
                                  or annexure shall be a reference to that
                                  section, clause, paragraph, sub-paragraph or
                                  schedule, exhibit or annexure in or to this
                                  Agreement;
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                              <span className="pr-2">3.2.4.3.</span>
                              <span className="text-[10pt]">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  reference to any legislation or law or to any
                                  provision thereof shall include references to
                                  any such law as it may, after the date hereof,
                                  from time to time, be amended, supplemented or
                                  re-enacted, and any reference to statutory
                                  provision shall include any subordinate
                                  legislation made from time to time under that
                                  provision;
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                              <span className="pr-2">3.2.4.4.</span>
                              <span className="text-[10pt]">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  references in the singular shall include
                                  references in the plural and vice versa
                                  references to one gender shall include
                                  references to other genders; and
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                              <span className="pr-2">3.2.4.5.</span>
                              <span className="text-[10pt]">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  references to the word “include” shall be
                                  construed without limitation.
                                </span>
                              </span>
                            </p>
                            <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                              <br data-cke-filler="true" />
                            </p>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                <h1
                  id="efe0e65336620bd16d912a60ad78828bb"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify"
                >
                  <span className="pr-2">4.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        VENDOR REPRESENTATIONS AND WARRANTIES
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">4.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          You hereby represent and warrant to the Company that:
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">4.1.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Subject to
                            </span>
                          </span>
                          <Link
                            href="https://hubeco.market/vendor-terms-sale"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <span className="text-[#2e3191] text-[10pt] underline p-1">
                              <i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  Clause 1 of the Terms of Sale
                                </span>
                              </i>
                            </span>
                          </Link>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              , you have the legal capacity to enter into a
                              binding contract under the Indian Contract Act, of
                              1872, and other Applicable Laws and you are not ‘
                            </span>
                            <i>
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                incompetent to contract
                              </span>
                            </i>
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              ’ within the meaning of Indian Contract Act, 1872,
                              including minors, un-discharged solvents, etc. The
                              Company reserves the right to terminate your
                              registration and deny access to the Platform if it
                              becomes aware or discovers that you are under the
                              age of 18 years.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">4.1.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              You (if registered as a business entity) affirm
                              that you are duly authorized to carry on the
                              business and hold all the requisite registrations,
                              certifications, permissions, authorities,
                              approvals, and sanctions to conduct your business
                              and to enter into the present Agreement.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">4.1.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              You are fully equipped to provide the Products
                              agreed upon in this Agreement to the satisfaction
                              of the Company.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">4.1.4.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              You have all necessary licenses, permits,
                              certifications, and authorizations for listing and
                              selling on the Platform as required by all
                              Applicable Laws and regulations pursuant to this
                              Agreement.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">4.1.5.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Your listed Products do not infringe upon the
                              Intellectual Property, trade secret, or other
                              proprietary rights or rights of publicity or
                              privacy rights of third parties.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">4.1.6.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              You have the full right and authority to digitally
                              execute and accept the terms of this Agreement.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">4.1.7.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              there are no proceedings pending against you,
                              which may have a material adverse effect on your
                              ability to perform and meet the obligations under
                              this Agreement.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">4.1.8.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              You hold the requisite government-issued
                              identifiers, tax compliance credentials, and
                              licenses for your operations and for the purpose
                              of this Agreement.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">4.1.9.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              the execution, delivery, and performance of this
                              Agreement by you have been duly authorized by all
                              requisite corporate action;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">4.1.10.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              this Agreement constitutes your legal, valid, and
                              binding obligation, enforceable against you in
                              accordance with the terms hereof; and the
                              execution, delivery, and performance of this
                              Agreement by you will not violate or conflict with
                              any other agreement or instrument to which you are
                              a party.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="eba9a8cd7a9bd9d5c1c3182b0b47cdeaf"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:6pt;margin-right:0;margin-top:20pt;text-align:justify"
                >
                  <span className="pr-2">5.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        PROVISION OF ONLINE MARKETPLACE
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">5.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          You acknowledge that subject to the terms of this
                          Agreement, in reliance of your representations and
                          warranties, and on your digital acceptance of this
                          Agreement, we hereby permit you to list your Products
                          for sale on the Platform at the listing price
                          determined by you or any person authorized by you.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">5.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          You also understand that we shall carry out the
                          required processing for the purpose of listing the
                          Products on the Platform. We may, in our absolute and
                          sole discretion, disallow the listing of specific
                          Products which do not align with our Platform business
                          objectives or pursuant to the Applicable Law and you
                          agree to accept and comply with our decision in this
                          regard unconditionally.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">5.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          We shall provide you with the dedicated dashboard and
                          necessary login IDs and passwords required for the
                          purpose of listing your Products on the Platform (“
                          <strong className="p-1">Vendor Module</strong>
                          ”). In the event that you cannot list the Products by
                          yourself, we may, for an agreed fee, secure the
                          necessary details from you and on the basis of the
                          information provided by you, list your Products on the
                          Platform. Further, where the support is provided by us
                          to list your Products, you shall check and ensure that
                          the information listed by us is accurate. We shall not
                          bear any responsibility for any incorrect information
                          about the Products presented on the Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">5.4.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          You agree and acknowledge that you shall be solely
                          responsible for the Product Information, related
                          content, your own information, and your offer and sale
                          of the Products on the Platform. You shall also be
                          responsible for updating the information about the
                          Products or the information about yourself as and when
                          required, especially regarding the availability of the
                          Products or otherwise.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">5.5.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          You further acknowledge that the Company will
                          undertake no liability in the event there is any
                          discrepancy or mismatch in Product Information with
                          the actual Product that may lead to a diluted Buyer
                          experience which can lead to unnecessary returns and
                          refunds impacting your performance ratings in the
                          future as well as the final payment remittance to you.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">5.6.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Any change in the listing price of a Product should be
                          communicated to the Company via such means as may be
                          agreed. The Company shall not accept the information
                          relating to the change in listing price through any
                          other mode of communication other than the agreed
                          means.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">5.7.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          You undertake that any information or presentation of
                          the materials, Products (including their packaging) or
                          any details placed or requested to be placed by the
                          Vendor on the Platform (i) shall not contain any
                          Objectionable Content or any other content that is not
                          expressly permitted by the Company to be listed on the
                          Platform; and (ii) shall not infringe upon the
                          Intellectual Property Rights of any third party.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">5.8.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          In order to improve the Buyer's experience, the
                          Company may implement a mechanism to rate and provide
                          feedback regarding the Vendor and the presentation of
                          the Products on the Platform and such information
                          shall be available publicly on the Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">5.9.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          You understand and agree that the Company shall not
                          bear any responsibility for any adverse comment or
                          rating of the Products on the Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">5.10.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          You further agree that any breach of the provisions of
                          this Agreement,
                        </span>
                      </span>
                      <Link
                        href="https://hubeco.market/vendor-terms-sale"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[#2e3191] text-[10pt] underline p-1">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            Terms of Sale
                          </span>
                        </span>
                      </Link>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          , or any standard policies provided by the Company to
                          you may lead to the suspension of the listing of your
                          Products from the Platform in the absolute discretion
                          of the Company.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="e6df531fb56ea45c2b4afba1c1371b6ab"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:10pt;margin-right:0;margin-top:20pt;text-align:justify"
                >
                  <span className="pr-2">6.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        ROLES AND RESPONSIBILITIES OF THE PLATFORM
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">6.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor understands that the Platform is only a
                          facilitating medium that can be utilized by you to
                          reach a larger Buyer base to sell Products. The
                          Platform serves as a medium for independent
                          transactions and communication between the Vendor and
                          Buyers and therefore, all commercial and contractual
                          terms, encompassing price, shipping costs, payment
                          methods, delivery details, and warranties, are
                          proposed by the Vendor and exclusively agreed upon
                          between the Vendor and the Buyers. Any contract for
                          the sale of any products or services shall be a
                          strictly bipartite contract between the Vendor and the
                          Buyer. The Platform maintains control and involvement
                          in the negotiation or acceptance of these terms at its
                          discretion, reserving the right to determine or
                          provide guidance on such terms.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">6.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Resolving disputes between Vendors and Buyers:
                          </strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">6.2.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              In the event of any conflict arising between a
                              Vendor and a Buyer, the Company will facilitate
                              resolution through a structured procedure. Upon
                              notification from the involved parties, the
                              Company’s support staff will promptly investigate
                              the conflict, meticulously reviewing the terms and
                              conditions stipulated on the Platform and outlined
                              in agreements with the Vendor and the Buyer.
                              Acting as a mediator, the Company will strive to
                              foster constructive dialogue between the parties
                              with the goal of reaching a mutually agreeable
                              resolution that aligns with Platform policies and
                              contractual obligations.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">6.2.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              If mediation efforts prove successful, the Company
                              will assist in implementing the agreed-upon
                              solution. In cases where resolution cannot be
                              achieved through mediation, the Company may
                              propose alternative courses of action or escalate
                              the matter as needed. Throughout the process, both
                              the Vendor and the Buyer commit to cooperating
                              fully with the Company and adhering to any
                              decisions or resolutions reached in accordance
                              with Platform terms and contractual agreements.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">6.2.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              In instances where disputes persist unresolved
                              despite mediation and alternative efforts, the
                              Company retains the authority to make a final
                              determination based on the information gathered
                              during the investigation.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">6.2.4.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Company shall not be held responsible for
                              non-performance or breaches of contracts between
                              the Vendor and the Buyers. However, in the event a
                              conflict arises between the Vendor and Buyers, the
                              Company shall play a facilitating role by
                              providing pertinent information to both parties.
                              It is important to note that the Platform's
                              involvement is strictly as a facilitator, and
                              there is no obligation to actively participate or
                              be bound by any proceedings. The primary aim of
                              this facilitation shall be to assist the parties
                              in achieving an amicable resolution.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">6.2.5.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor shall be responsible for verifying the
                              bona fides of any Buyer and the Company is not
                              responsible for guaranteeing Buyer specifics, such
                              as legal title, creditworthiness, or identity.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="e543ce74cca0ac64eb07727b971718913"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify"
                >
                  <span className="pr-2">7.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">VENDOR ONBOARDING</strong>
                    </span>
                  </span>
                </h1>
              </li>
            </ol>
            <ol className="list-style-type:none;padding-left:9.4px">
              <li className="md:pl-8 pl-4">
                <p className="background-color:#fff;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:5pt;text-align:justify">
                  <span className="pr-2">7.1.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">Account Registration:</strong>
                      The Vendor shall furnish their details and information as
                      requested on the Platform from time to time, including,
                      but not limited to, the following information to register
                      as a Vendor:
                    </span>
                  </span>
                </p>
                <ol className="list-style-type:none;padding-left:56.73px">
                  <li className="md:pl-14 pl-8">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">7.1.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Basic Information:</strong>
                          complete name, address, email, mobile number,
                          government-issued identifiers, digital signature, and
                          tax compliance credentials. registered address
                          (principal geographic address of its headquarters and
                          all branches);
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:0">
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.1.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">Transaction Data:</strong>
                              bank account holder details, branch name, IFSC,
                              cancelled cheque, etc;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.1.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">Onboarding Form:</strong>a
                              detailed structured form requiring basic
                              information, product specifications, types,
                              features, relevant certifications and
                              accreditations (including quality and green
                              certifications), annual turnover and market
                              presence (geographical and market reach), payment
                              terms, and any other information as required by
                              the Company;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.1.4.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">
                                Know Your Customer (KYC) process:
                              </strong>
                              Once all the information is provided by the
                              Vendor, information will be reviewed by the
                              Company. Upon approval of the KYC information by
                              the Company, the Vendor is provided with the
                              dedicated Vendor Module to list their Products;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.1.5.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">
                                Product Onboarding:
                              </strong>
                              Once the Vendor Module is assigned, the Vendor may
                              begin onboarding their Products onto the Platform
                              by furnishing the following information-
                            </span>
                          </span>
                        </p>
                        <ol className="list-style-type:none;padding-left:125.87px">
                          <li className="md:pl-20 pl-10">
                            <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                              <span className="pr-2">7.1.5.1.</span>
                              <span className="text-[10pt]">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="leading-loose"
                                  >
                                    Product Description
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  : This includes providing detailed Product
                                  Information (
                                </span>
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="leading-loose"
                                  >
                                    defined in Clause 3.1.6
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  ) along with uploading images, brochures and
                                  other relevant details as requested by the
                                  Company from time to time. Additionally, the
                                  Vendor shall be required to provide details of
                                  green certification details applicable to
                                  their Product(s) such as certification number,
                                  validity, and the concerned authority that
                                  issued such certification.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                              <span className="pr-2">7.1.5.2.</span>
                              <span className="text-[10pt]">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="leading-loose"
                                  >
                                    Product Pricing Information
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  : The Vendors are also required to provide the
                                  base price of each Product, along with the
                                  discounted price and GST rate. The Vendor is
                                  encouraged to specify the Unit of Measure
                                  (UOM).
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                              <span className="pr-2">7.1.5.3.</span>
                              <span className="text-[10pt]">
                                <i>
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="leading-loose"
                                  >
                                    Return, Refund and Cancellation
                                  </span>
                                </i>
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  : As part of the Product onboarding process,
                                  the Vendor is required to furnish detailed
                                  information regarding the return and
                                  cancellation terms for each Product listed on
                                  the Platform. Specifically, the Vendor must
                                  clearly indicate the following details for
                                  each Product: (i) whether the Product is
                                  returnable or not; (ii) the specific timeframe
                                  within which Buyers are permitted to return
                                  the Product or cancel their orders; and/or
                                  (iii) any other details as requested by the
                                  Company from time to time. It is important to
                                  note that while the Vendor provides the return
                                  and cancellation details for each Product, any
                                  refund processes related to returns or
                                  cancellations will be governed strictly by the
                                  Platform's established
                                </span>
                              </span>
                              <Link
                                href="https://hubeco.market/returns-refunds-cancellations"
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                <span className="text-[#2e3191] text-[10pt] underline p-1">
                                  <span
                                    dir="ltr"
                                    lang="EN-GB"
                                    className="leading-loose"
                                  >
                                    Refund Policy
                                  </span>
                                </span>
                              </Link>
                              <span className="text-[10pt]">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  .
                                </span>
                              </span>
                            </p>
                          </li>
                        </ol>
                      </li>
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.1.6.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">Platform Fee</strong>:
                              Vendor hereby agrees and acknowledges that subject
                              to Clause 13 of this Agreement, the Platform shall
                              charge a predetermined fee (“
                              <strong className="p-1">Platform Fee</strong>
                              ”) from the Vendor. This Platform Fee is agreed
                              upon in advance between the Vendor and the
                              Company. During the Vendor onboarding process, the
                              predetermined Platform Fee will be clearly
                              indicated. The Vendor will be required to review
                              and confirm the Platform Fee details as part of
                              completing the onboarding process. Certain Vendors
                              may be onboarded under a partner pricing model.
                              For these Vendors, the specified Vendor price will
                              be clearly indicated during the onboarding
                              process. The Vendor is required to review and
                              formally confirm the Vendor price as a condition
                              of completing the onboarding process.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.1.7.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Upon successful onboarding, the Vendor can
                              thereafter manage their Products and associated
                              activities through their Vendor Module on the
                              Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.1.8.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              In the event that the information pertaining to
                              the Products or otherwise provided is untrue,
                              inaccurate, outdated, or incomplete, or consists
                              of any discrepancies, the Vendor acknowledges that
                              the Company reserves the right to suspend,
                              terminate or indefinitely block the Vendor’s
                              Account on the Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.1.9.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">
                                Ongoing Compliance:
                              </strong>
                              The Vendor must ensure that all information and
                              documentation submitted during the KYC process and
                              product onboarding remain accurate and up-to-date,
                              and must promptly update any changes in
                              information and/or documentation.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">7.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Vendor's Platform Usage Responsibilities:
                          </strong>
                          Pursuant to
                        </span>
                      </span>
                      <span className="text-[#2e3191] text-[10pt] underline p-1">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="leading-loose"
                        ></span>
                      </span>
                      <Link
                        href="https://hubeco.market/vendor-terms-sale"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[#2e3191] text-[10pt] underline p-1">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            Clause 2 of the Terms of Sale
                          </span>
                        </span>
                      </Link>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          , the Vendor agrees to adhere to the policies and
                          procedures for listing the Products on the Platform,
                          including but not limited to the following:
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:0">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.2.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor shall be responsible for ensuring the
                              confidentiality of their information, including
                              login credentials and password of their Account
                              and Vendor Module.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.2.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor shall empower and authorise the Company
                              to address Buyer grievances on their behalf in
                              respect of Products sold by the Vendor.  This
                              authority shall include performing incidental acts
                              that are specifically required to be carried out
                              and perform the specific authority granted herein.
                              The Vendor shall also provide consent to populate
                              their details, including, but not limited to, the
                              Vendor address, provided by the Vendor at the time
                              of registration, on the Products listed by the
                              Vendor on the Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">7.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Listings on the Platform:
                          </strong>
                          To ensure the integrity of listings on the Platform,
                          the Vendor agrees to the following guidelines:
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:0">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.3.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The listings by the Vendor on the Platform may
                              only include text descriptions, graphics,
                              pictures, or videos that describe the Product for
                              sale;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.3.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              All items must be listed in an appropriate
                              category and subcategory on the Platform. All
                              listed items must be kept in stock for the
                              successful fulfilment of sales;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.3.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The listing description of the Product must not be
                              misleading and must describe the actual state of
                              the Product. If the Product description does not
                              match the actual condition of the Product, the
                              Vendor agrees to refund any amount that the Vendor
                              may have received from the Company; and
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">7.3.4.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor shall not list a single Product in
                              multiple quantities across various categories on
                              the Platform. The Platform may delete multiple
                              listings of the same product listed in various
                              categories.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">7.4.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Payments and Taxes:</strong>
                          The Vendor shall be responsible for clearly displaying
                          the final listing prices of their Products to Buyers,
                          including a clear breakdown of pricing components
                          including without limitation the base price,
                          discounted price, if applicable and the applicable
                          taxes such as GST.
                          <strong className="p-1"></strong>
                          Further, the Vendor agrees that
                          <strong className="p-1"></strong>
                          all payments on the Platform shall be securely made
                          via the Company's designated payment gateway partner.
                          The Company will facilitate payments to Vendors
                          subject to Clause 13 of this Agreement.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
            <p className="leading-loose;margin:0 0 10pt;text-align:justify">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-style-type:none">
              <li>
                <h1
                  id="e791052a24d714b80a411ac846e60ee10"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify"
                >
                  <span className="pr-2">8.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        SPECIFICATIONS AND QUALITY STANDARDS
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor hereby agrees and acknowledges that the
                          Vendor is obligated to adhere to the quality standards
                          and specifications provided for their respective
                          Products, as well as any green certifications
                          provided. These standards must align with those
                          outlined in the product page on the Platform. The
                          Vendor warrants that all Products will be of
                          merchantable quality, fit for their intended purpose,
                          and free from defects in material and workmanship.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor acknowledges that all Products offered on
                          the Platform must comply with the applicable
                          environmental and technical standards, including, but
                          not limited to, green certifications where required.
                          Further, the Vendor is responsible for ensuring the
                          timely renewal of all required quality certifications
                          for the Products offered on the Platform by the
                          Vendor. The Company’s system will issue automated
                          alerts to the Vendor one (1) month prior to the
                          certification’s expiry, prompting the Vendor to upload
                          the renewed certification. Additionally, the Vendor
                          agrees to provide copies of renewed certifications to
                          the Company promptly upon receipt of the updated
                          documents. Failure to renew applicable certifications
                          in a timely manner may result in a breach of this
                          Agreement, at the discretion of the Company.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          In cases where a Vendor does not possess a green
                          certification but instead holds internationally
                          recognized declarations, such as a Life Cycle
                          Assessment (LCA) or Environmental Product Declaration
                          (EPD), the Vendor shall maintain the accuracy and
                          validity of these declarations throughout the term of
                          this Agreement. The absence of time-bound
                          certifications shall not constitute a breach provided
                          that the Vendor has submitted valid LCAs, EPDs, or
                          other equivalent environmental declarations in lieu of
                          green certifications.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.4.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Company reserves the right to request verification
                          of any environmental credentials, certifications, or
                          declarations at any time. Vendors are required to
                          comply with such requests promptly to ensure ongoing
                          compliance with this Agreement.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.5.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor acknowledges and agrees that they are
                          solely responsible for all actions, conduct, and
                          decisions of any third-party authority that issues
                          green certifications for the Products listed on the
                          Platform. The Company does not verify, authenticate,
                          or validate the certifications or the credibility of
                          the certifying authorities. Any reliance on such
                          third-party authorities is at the Vendor’s own
                          discretion and risk. The Vendor assumes full
                          responsibility for ensuring the validity and accuracy
                          of the certifications provided. The Company shall bear
                          no liability for any consequences arising from the
                          actions, decisions, or misrepresentations of the
                          certification issuing authorities.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.6.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor acknowledges that maintaining accurate and
                          valid green certifications or equivalent environmental
                          declarations is essential for compliance with this
                          Agreement. In case of any inaccuracies or
                          misrepresentations regarding these certifications or
                          declarations made by Vendors on their Products listed
                          on this Platform, Vendors shall indemnify and hold
                          harmless both Buyers and Company from any claims
                          arising from such inaccuracies or misrepresentations.
                          This includes legal fees incurred in defending against
                          such claims. The Company reserves all rights to
                          suspend or remove any Product listings until such
                          inaccuracies are resolved satisfactorily.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.7.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor agrees and acknowledges that they may
                          conduct their own quality verification upon receiving
                          the Products and the Company shall not be responsible
                          for performing these quality measures. The Vendor
                          acknowledges that they shall adhere to all claims and
                          ensure compliance.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.8.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor understands and acknowledges that
                          maintaining current and valid certifications is
                          essential to meeting the quality standards required by
                          the Company and its Buyers and that the Vendor is
                          responsible for conducting thorough quality checks
                          before dispatching Products to Buyers on the Platform.
                          The parameters for these quality checks, if any, will
                          be defined by the Platform and must be strictly
                          followed by the Vendor. By accepting and agreeing to
                          the terms of this Agreement, the Vendor acknowledges
                          and agrees to comply with these quality control
                          measures to ensure the consistent delivery of Products
                          meeting the specified standards.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.9.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor acknowledges that the Company acts solely
                          as an intermediary facilitating the sale of products
                          between the Vendor and the Buyer through the Platform.
                          The Company does not manufacture, inspect, or control
                          the quality of the products provided by the Vendor.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.10.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor agrees to maintain robust quality assurance
                          processes and comply with all applicable industry
                          standards and regulations. The Vendor must promptly
                          address and resolve any quality issues reported by
                          Buyers. The Company shall not be liable for any
                          claims, damages, losses, or expenses arising from or
                          related to the quality of the Products provided by the
                          Vendor. This includes but is not limited to, any
                          instances where Products are found to be substandard,
                          defective, or not as described.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.11.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          In the event of any Buyer complaints regarding Product
                          quality, the Vendor is responsible for handling and
                          resolving such complaints. The Company may facilitate
                          communication between the Buyer and the Vendor but
                          will not be held accountable for the resolution of
                          such complaints.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.12.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor understands and agrees that the Company
                          makes no representations or warranties, express or
                          implied, regarding the quality, safety, or legality of
                          the Products listed by the Vendor on the Platform. All
                          warranties, if any, related to the Products are
                          provided solely by the Vendor.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.13.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor agrees to allow the Company, upon
                          reasonable notice, to inspect the Vendor’s facilities
                          and quality control processes to ensure compliance
                          with the terms of this Agreement. However, the Vendor
                          understands that such inspections do not create any
                          liability or responsibility on the part of the Company
                          for the quality of the Products.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">8.14.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor agrees to indemnify and hold the Company
                          harmless from any claims, damages, losses, or expenses
                          arising from or related to the quality of the Products
                          listed on the Platform. This includes legal fees and
                          costs associated with defending against such claims.
                        </span>
                      </span>
                    </p>
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <br data-cke-filler="true" />
                    </p>
                  </li>
                </ol>
              </li>
              <li>
                <h1
                  id="ef3d73aae793175c152e74e580ccbb7d1"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify"
                >
                  <span className="pr-2">9.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        VENDOR’S OBLIGATIONS AND RESPONSIBILITIES
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;page-break-after:avoid;text-align:justify">
                      <span className="pr-2">9.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Failure to Meet Obligations:
                          </strong>
                          In the event that the Vendor fails to fulfill their
                          obligations and meet the satisfaction criteria of the
                          Buyers and the Platform, the Vendor will be notified
                          in writing by the Company detailing the specific
                          defaults. The Vendor shall have 30 days from the date
                          of receipt of the notice to rectify the identified
                          defaults and fulfil their obligations. Failure to do
                          so may be deemed as a breach of this Agreement and the
                          Company reserves the right to terminate and/or remove
                          the Vendor’s Account on the Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">9.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Out-of-Scope Work:</strong>
                          The Vendor shall not proceed with any out-of-scope
                          work without obtaining prior written approval from the
                          Company. Any unauthorized work undertaken by the
                          Vendor may result in penalties.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">9.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Direct Order Acceptance:
                          </strong>
                          The Vendor expressly agrees not to accept orders
                          directly from Buyers once connected through the
                          Platform. The Vendor shall not engage with Buyers
                          independently without prior notification to the
                          Platform. All orders, without exception, must be
                          processed exclusively through the Platform's
                          designated website.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">9.4.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Change in pricing of Products:
                          </strong>
                          The Vendor has the flexibility to change the pricing
                          of their Products at any time through the Vendor
                          Module provided by the Company. Any changes made by
                          the Vendor will be automatically reflected online for
                          Buyers. It is the Vendor's responsibility to ensure
                          that the updated prices are accurate and comply with
                          any Applicable Laws and regulations. The Company will
                          not be liable for any discrepancies or issues arising
                          from the Vendor's pricing changes.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">9.5.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Maintenance of adequate stock level:
                          </strong>
                          The Vendor understands and acknowledges that they are
                          responsible for maintaining adequate stock levels and
                          ensuring that their production capacities are aligned
                          with the volume of orders received from the Platform.
                          The Vendor must ensure that their supply chain and
                          logistics operations are fully compliant with the
                          delivery timelines specified during the onboarding of
                          their Products onto the Platform. This includes but is
                          not limited to, timely procurement of raw materials,
                          efficient production processes, and reliable
                          transportation arrangements.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">9.6.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Delay by the Vendor:</strong>
                          In the event that there is a delay in the delivery of
                          the Product on account of reasons attributable to the
                          Vendor such as unresponsiveness of the Vendor or the
                          unavailability of sufficient stock, the Platform
                          reserves the right to impose penalties, cancel orders,
                          or apply any other appropriate punitive measures.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">9.7.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Financial Transparency and Organizational Changes:
                          </strong>
                          The Vendor shall keep its books, records, and accounts
                          with sufficient detail and precision to clearly
                          reflect its transactions and the use or disposition of
                          its resources or assets. The Vendor agrees that the
                          Company has the right to audit the transactions
                          related to the Vendor’s execution of its obligations
                          under this Agreement at any time and upon reasonable
                          notice. If for any cause or reason, the Vendor
                          proposes to transfer control of the Vendor to a third
                          party or a third party assumes control of the Vendor,
                          the Vendor must notify the Company in writing of the
                          change at least thirty (30) days in advance of such
                          change, or within three (3) business days of obtaining
                          knowledge of the change.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">9.8.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Timely Grievance:</strong>
                          The Vendor hereby agrees to promptly address any
                          grievances concerning its Products, ensuring
                          resolution within a period not exceeding seven (7)
                          days from the date of receipt of the complaint. The
                          Company, through its support staff, will endeavour to
                          resolve conflicts in the best interest of both the
                          Vendor and the Buyer, in compliance with the terms and
                          conditions mentioned on the Platform and in the
                          Agreement with the Vendor and the Buyer. The Vendor
                          agrees to cooperate fully with the Company's support
                          staff to achieve swift and satisfactory resolutions to
                          any issues that arise.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
            <p className="leading-loose m-0 text-justify">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-style-type:none">
              <li>
                <h1
                  id="e5fda96335e8d616ddc8001337e5ab5d1"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify"
                >
                  <span className="pr-2">10.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">COMPLIANCE WITH LAWS</strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0">
                      <span className="pr-2">10.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            <u>Tax and Regulatory Compliance by Vendor:</u>
                          </strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">10.1.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor shall ensure full compliance with the
                              provisions of Integrated Goods and Services Tax
                              (IGST), Central Goods and Services Tax (CGST), and
                              Union Territory Goods and Services Tax (UTGST) or
                              State Goods and Services Tax (SGST) in respect of
                              the Products supplied by the Vendor. It is the
                              Vendor’s responsibility to charge appropriate
                              taxes on the supplies affected and remittance of
                              the same to the Government. The Platform shall not
                              be responsible for any deficiency and/or omission
                              on your part. Further, you shall be required to
                              provide the corresponding Harmonised System
                              Nomenclature (HSN) code number for every Product
                              listing. You shall also be required to provide
                              GSTIN, without which the Platform will not be able
                              to raise an invoice for you. In the event that you
                              do not provide your GSTIN number, transactions on
                              your Account will be blocked and orders will not
                              be processed on your Vendor Module. In the event
                              you provide any Input Service Distributor (ISD)
                              Registration Number, the Platform will issue an
                              invoice to the ISD, a GST registration number as
                              furnished by you. It shall be your responsibility
                              to undertake the necessary compliance required in
                              respect of the said ISD registration number.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">10.1.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Additionally, the Vendor shall take appropriate
                              transit insurance for their Products supplied to
                              ensure coverage against any potential loss or
                              damage during transit. The Company shall not be
                              liable for any loss or damage to the Products
                              during transit.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">10.1.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Further, the Vendor shall obtain all necessary
                              waybills, e-way bills, and any other governmental
                              permissions required to transport Products from
                              one state to another. The Vendor shall ensure
                              compliance with all applicable laws and
                              regulations related to the transportation of
                              goods.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">10.1.4.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              In the event of any non-compliance with the
                              above-mentioned requirements or failure to meet
                              these operational requirements, including but not
                              limited to failure to provide GSTIN, obtain
                              necessary transit insurance, or secure required
                              waybills and permissions, it may be considered as
                              a breach of the Agreement and the Platform
                              reserves the right to take appropriate corrective
                              actions, including but not limited to, block
                              transactions on the Vendor’s Account and halt
                              order processing on the Vendor Module, suspension
                              or termination of the Vendor's Account on the
                              Platform. The Vendor shall be solely responsible
                              for any legal or financial repercussions arising
                              from such non-compliance.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">10.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            <u>
                              Compliances by Vendor under The Consumer
                              Protection (E-commerce) Rules, 2020 as amended and
                              if substituted from time to time:
                            </u>
                          </strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">10.2.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor should not mislead and misguide the
                              Buyer by posting false reviews for their Product’s
                              quality and features pretending to be a Buyer on
                              the Platform;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="background-color:#fff;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">10.2.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              If in case the Vendor’s Products are defective,
                              deficient, adulterated, or spurious, or if the
                              Products are not of the features as advertised or
                              as agreed to or delivered late from the stated
                              delivery schedule, they shall provide benefits of
                              refund, return/ replacement, exchange, warranty
                              and guarantee, withdrawal and cancellation for the
                              Products listed on the Platform;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">10.2.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Products offered on the Platform should be
                              consistent with the actual quality and features of
                              the Products as shown on the Platform;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">10.2.4.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor shall ensure full compliance with all
                              Applicable Laws in displaying accurate
                              product/service details on the Platform, including
                              but not limited to total pricing with a breakdown
                              of all charges and taxes, manufacturing/packaging
                              and expiry dates, and the country of origin to
                              facilitate informed Buyer decisions. The Vendor
                              must provide complete importer details for any
                              imported products, and guarantee the authenticity
                              and genuineness of all listed Products.
                              Additionally, the Vendor is responsible for
                              providing shipment and delivery updates, as well
                              as clearly stating and honouring any applicable
                              guarantees or warranties associated with their
                              Products; and
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="background-color:#fff;leading-loose;margin-bottom:11pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">10.2.5.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor shall provide updates on the shipment
                              and delivery of Products that are shipped from the
                              Vendor’s premises.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">10.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            <u>
                              Compliance with Anti-Money Laundering, Sanctions,
                              and Regulatory Requirements:
                            </u>
                          </strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">10.3.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Vendor will fully comply with all applicable laws
                              and regulations including but not limited to
                              anti-money laundering (including know your
                              customer and customer due diligence) and sanctions
                              (economic and trade) enforced by the United
                              Nations, the Republic of India, U.S. Department of
                              Treasury’s Office of Foreign Assets Control
                              (OFAC). Neither the Company nor the Vendor will
                              engage in a transaction pursuant to this Agreement
                              that will cause the other party to violate such
                              laws and regulations.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">10.3.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor shall ensure that no Products are
                              sourced or used in the manufacturing or in the
                              provision of services that originate wholly or in
                              part, from any of the prohibited countries stated
                              in the ‘OFAC Regulations and Other Applicable
                              Sanctions Regulations.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="e953a27ef463458e7e0dde0ec32216c31"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify"
                >
                  <span className="pr-2">11.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        ORDER, SALE, AND FULFILMENT
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">11.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Placing Orders</strong>:
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.1.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor agrees and understands that as and when
                              the Buyer places an order and makes the payment on
                              the Platform, it constitutes a confirmed purchase.
                              Upon receipt of the order and payment, the
                              confirmed order details will be sent to the Vendor
                              for processing.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.1.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              In the case of online orders, the total amount of
                              the order should include shipment charges and
                              applicable taxes and such costs will be detailed
                              in the order summary before finalisation. For
                              offline orders, the Buyer requests a quote from
                              the Vendor, and once the Vendor sends the quote
                              with payment terms, the Buyer must approve the
                              quote before making the payment. The Vendor is
                              then responsible for fulfilling the order as per
                              the agreed terms.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h2
                      id="e1150dbd2bba39da60cfbef8b0da936f9"
                      className="pl-8 break-after:avoid;font-weight:400;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify"
                    >
                      <span className="pr-2">11.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Fulfilment of Orders</strong>:
                        </span>
                      </span>
                    </h2>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-20 pl-10">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.2.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor agrees that the fulfilment of orders
                              placed on the Platform is their sole
                              responsibility. The Platform acts merely as an
                              aggregator, providing a service to Vendors and
                              Buyers, ensuring the security of payment, and
                              assisting in the delivery of such orders.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-20 pl-10">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.2.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor agrees and understands that the
                              Platform shall not be liable for undertaking any
                              insurance(s) for Products sold by any Vendor on
                              the Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-20 pl-10">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.2.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Platform shall not be responsible regarding
                              the accuracy of Product specifications upon
                              dispatch and delivery. Any guarantee or warranty
                              associated with the Products is the Vendor’s sole
                              responsibility and must be provided directly to
                              the Buyers.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-20 pl-10">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.2.4.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Company shall not be liable for any claims,
                              damages, losses, or expenses arising from or
                              related to the fulfilment of orders by the Vendor.
                              All terms, including price, shipping costs,
                              delivery details, and warranties, are proposed by
                              the Vendor and agreed upon by the related parties.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h2
                      id="e1878739244a19a2fdead14e0ac65583f"
                      className="pl-8 break-after:avoid;font-weight:400;leading-loose;margin-bottom:6pt;margin-right:0;margin-top:0;text-align:justify"
                    >
                      <span className="pr-2">11.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Coupons and Discounts:
                          </strong>
                        </span>
                      </span>
                    </h2>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-20 pl-10">
                        <p className="leading-loose;margin-bottom:12pt;margin-right:0;margin-top:12pt;text-align:justify">
                          <span className="pr-2">11.3.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              As a Vendor on the Platform, you have the option
                              to offer promotional discounts and coupon codes to
                              Buyers during the checkout process. These
                              discounts and codes are intended to incentivize
                              frequent purchases and are governed by specific
                              terms and conditions that include details on
                              usage, limitations, applicability, restrictions,
                              and validity. The Buyers may also benefit from
                              bulk discount pricing directly set by Vendors.
                              Please note that the Company reserves the right to
                              update these terms periodically based on factors
                              such as usage patterns, regulatory requirements,
                              and other considerations. Any changes to these
                              terms will be communicated to Vendors and Buyers
                              without prior notice.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:12pt;margin-right:0;margin-top:12pt;text-align:justify">
                      <span className="pr-2">11.4.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Terms for Sale:</strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="background-color:#fff;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:6pt;text-align:justify">
                          <span className="pr-2">11.4.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              When Buyers place an order to purchase Product(s)
                              on the Platform, the Company will send a
                              system-generated email confirming the receipt of
                              the order and providing order details. This order
                              confirmation email acknowledges that the Vendor
                              has received the order. Vendors will update the
                              status of such orders through their Vendor
                              Modules, and system-generated emails from the
                              Company will be sent to the Buyer.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="background-color:#fff;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.4.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Another email will be sent to the Buyer upon
                              dispatch. If an order is dispatched in multiple
                              packages, separate dispatch confirmation emails
                              may be sent for each package.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="background-color:#fff;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.4.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              In the event that the Vendor and the Buyer need to
                              communicate off the Platform with each other for
                              purposes including but not limited to sharing
                              technical documents or files (
                            </span>
                            <i>
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                see
                              </span>
                            </i>
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            ></span>
                            <i>
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                Clause 11.6.2 of this Agreement
                              </span>
                            </i>
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              ), they may do so adhering to the requirement of
                              keeping the Company informed about the nature of
                              their off-Platform communications and ensure
                              compliance with the terms outlined in Clause 11.6
                              of this Agreement. Please note that this
                              off-Platform communication shall not take place
                              unless the Buyer makes the partial/advance payment
                              as the case may be.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="background-color:#fff;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.4.4.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor understands that the prices of the
                              Products displayed on the Platform shall include
                              applicable taxes. It shall be the Vendor’s
                              responsibility to incorporate the required taxes
                              and any other charges when listing the Product(s).
                              The Company disclaims any liability for the
                              accuracy or completeness of tax calculations and
                              charges applied by the Vendor.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
            <div className="background-color:#fff;border-bottom-color:#000;border-bottom-width:1pt;border-style:none;margin-left:31.6pt;margin-right:0;padding:0 0 6pt">
              <ol className="list-style-type:none;padding-left:24px">
                <li className="pl-[85px]">
                  <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                    <span className="pr-2">11.4.5</span>
                    <span className="text-[10pt]">
                      <span dir="ltr" lang="EN-GB" className="leading-loose">
                        The Company does not make any representation or warranty
                        as to specifics of the Products proposed to be sold or
                        offered to be sold or purchased on the Platform. The
                        Company does not implicitly or explicitly support or
                        endorse the sale or purchase of any Product on the
                        Platform. Further, we accept no liability for any errors
                        or omissions, whether on behalf of the Vendor or other
                        third parties.
                      </span>
                    </span>
                  </p>
                  <ol className="list-style-type:none;padding-left:0">
                    <li>
                      <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                        <span className="pr-2">11.4.6</span>
                        <span className="text-[10pt]">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            The Company is not responsible for any
                            non-performance or breach of duty related to the
                            transactions concerning order placement and delivery
                            entered into between Buyers and Vendors. The Company
                            is not liable for any failure by Buyers or Vendors
                            to fulfill their respective duties or
                            responsibilities under such transactions. The
                            Company cannot and does not guarantee that the
                            concerned Buyers and/or Vendors will perform any
                            transaction concluded on the Platform.
                          </span>
                        </span>
                      </p>
                      <ol className="list-style-type:none;padding-left:0">
                        <li>
                          <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                            <span className="pr-2">11.4.7.</span>
                            <span className="text-[10pt]">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                The Company does not at any point of time during
                                any transaction between Buyer and Vendor, come
                                into or take possession of any of the Products
                                or services offered by the Vendor nor does the
                                Company at any point gain title to or have any
                                rights or claims over the Products or services
                                offered by the Vendor to the Buyer.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                            <span className="pr-2">11.4.8.</span>
                            <span className="text-[10pt]">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                The Vendor shall be solely responsible for
                                ensuring the manufacturing and availability of
                                sufficient stock of the Products to enable the
                                delivery of the Products within the time
                                specified.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                            <span className="pr-2">11.4.9.</span>
                            <span className="text-[10pt]">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                The Vendor acknowledges and agrees that any
                                non-availability or delay in the manufacturing
                                and shipment of the Products may negatively
                                impact the Buyer experience which, in turn, can
                                negatively impact the Vendor’s ratings and
                                consequently, the business generated by the
                                Vendor on the Platform. If there are more than
                                ten instances of inability to deliver the
                                Products on time, the Company may proceed to
                                ensure the delisting of the Vendor from the
                                Platform.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                            <span className="pr-2">11.4.10.</span>
                            <span className="text-[10pt]">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                The Vendor takes full responsibility for the
                                contents of the Products delivered to the Buyer
                                and agrees that the Company shall not be
                                responsible or liable in any manner whatsoever
                                for such contents.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                            <span className="pr-2">11.4.11.</span>
                            <span className="text-[10pt]">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                The Vendor agrees that the Company does not
                                provide logistics service providers to
                                facilitate the delivery of orders and Products.
                                The Vendor shall dispatch the Products using
                                only an approved delivery channel that provides
                                appropriate ‘proof of dispatch’ &amp; ‘proof of
                                delivery’ (PoDs) documentation. Such PoD
                                documentation relating to delivery should be
                                maintained by a Vendor for a period of 3 (three)
                                years from the date of dispatch. The PoDs should
                                be furnished to the Platform on demand within
                                the time frame as notified from time to time.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                            <span className="pr-2">11.4.12.</span>
                            <span className="text-[10pt]">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                The Vendor shall ensure that the Products
                                dispatched are of the same specifications
                                ordered and there is no variation whatsoever.
                                The necessary guarantee/warranty, if any, shall
                                be provided by the Vendor to the Buyer. The
                                Vendor shall not include any of its marketing,
                                or promotional materials, any other
                                solicitations or any communications to Buyers
                                including emails confirming orders in the
                                package without prior written approval by the
                                Company.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                            <span className="pr-2">11.4.13.</span>
                            <span className="text-[10pt]">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                Further, the Vendor shall solely be responsible
                                for undertaking transit insurance for Products
                                sold by the Vendor on the Platform. For the
                                avoidance of doubt, the Platform will not be
                                responsible for undertaking any insurance(s) for
                                Products sold by Vendor on the Platform.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                            <span className="pr-2">11.4.14.</span>
                            <span className="text-[10pt]">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                The Vendor agrees and acknowledges that the
                                Vendor will be solely responsible for any sale
                                of Products to the Buyer that is not in
                                accordance with the order of the Buyer or the
                                Company Policies. The Vendor further warrants to
                                resolve all Buyer service issues in connection
                                with such sale or delivery of Products.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                            <span className="pr-2">11.4.15.</span>
                            <span className="text-[10pt]">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                The Vendor undertakes and agrees that it shall
                                not collude with a Buyer or other Vendors or
                                users of the Platform, for drawing benefits from
                                various promotional offers including but not
                                limited to discount or cashback through false or
                                fraudulent transactions. If the Vendor is found
                                involved in any such activity, the Vendor
                                acknowledges and agrees that the Company
                                reserves its right to impose a penalty on the
                                Vendor and recover the money amounting to twice
                                the benefits so drawn or twice the maximum
                                retail price; whichever is higher.
                              </span>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p className="background-color:#fff;border-style:none;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;padding:0;text-align:justify">
                            <span className="pr-2">11.4.16.</span>
                            <span className="text-[10pt]">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                In the event of delays by the Vendor to deliver
                                the Products, the Vendor must promptly
                                communicate the delay to the Buyer. If the Buyer
                                agrees to wait, the order will proceed as
                                planned. If the Buyer opts to cancel the order
                                due to the delay, they may do so in accordance
                                with the terms and conditions as may be
                                applicable to such order. The Vendor
                                acknowledges that repeated delays may affect
                                their standing with the Company and could lead
                                to further actions as deemed necessary by the
                                Company.
                              </span>
                            </span>
                          </p>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
            <ol className="list-style-type:none;padding-left:9.4px">
              <li className="md:pl-8 pl-4">
                <h2
                  id="e10fa5e34785b04277904900da8653d5a"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:6pt;margin-right:0;margin-top:.25in;text-align:justify"
                >
                  <span className="pr-2">11.5.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">Availability and delays:</strong>
                    </span>
                  </span>
                </h2>
                <ol className="list-style-type:none;padding-left:56.73px">
                  <li className="md:pl-14 pl-8">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">11.5.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor acknowledges and agrees that the Vendor
                          shall be solely responsible for maintaining the
                          availability of their Products and for providing
                          accurate and up-to-date information regarding the
                          availability of the Products or any other relevant
                          details. It is Vendor’s obligation to ensure that such
                          information is promptly uploaded and maintained on
                          their respective Vendor Module when listing Products
                          on the Platform. The Platform shall not be liable for
                          any inaccuracies, omissions, or misrepresentations
                          related to the availability of the Products provided
                          by you.
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:0">
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.5.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              In the event of delays by the Vendor to deliver
                              the Products, the Vendor must promptly communicate
                              the delay to the Buyers. If the Buyers agree to
                              wait, the order will proceed as planned. If they
                              opt to cancel the order due to the delay, they may
                              do so in accordance with the terms and conditions
                              enumerated in our
                            </span>
                          </span>
                          <Link
                            href="https://hubeco.market/shipping-delivery"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <span className="text-[#2e3191] text-[10pt] underline p-1">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                Delivery &amp; Shipping Policy
                              </span>
                            </span>
                          </Link>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              and the Vendor’s
                            </span>
                          </span>
                          <Link
                            href="https://hubeco.market/returns-refunds-cancellations"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <span className="text-[#2e3191] text-[10pt] underline p-1">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                Return and Cancellation
                              </span>
                            </span>
                          </Link>
                          <span className="color:#15c;text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            ></span>
                          </span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              policy.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.5.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Vendor agrees and acknowledges that in the
                              event that there is a delay in the delivery of the
                              Products on account of reasons attributable to
                              insufficient stock maintained by the Vendor, the
                              Platform reserves the right to impose penalties,
                              cancel orders, or apply any other appropriate
                              punitive measures.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">11.6.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Buyer Offline Order Enquiry and Sale
                          </strong>
                          : The Platform allows Buyers to request offline quotes
                          for Products by adding items to their cart and
                          selecting the "Request for Offline Quote" option. Once
                          the request is submitted, it is sent directly to the
                          Vendor. If the Vendor requires clarification on the
                          Buyer’s request, the Platform’s chat support
                          functionality will be enabled, allowing both parties
                          to communicate and resolve queries related to the
                          quote.
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:0">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">11.6.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              All communication regarding the offline quote,
                              including pricing and specifications, must take
                              place within the chat support function until the
                              payment process is completed. During this period,
                              the identities of the Buyer and the Vendor remain
                              anonymous to ensure privacy and security. The chat
                              support is specifically designed to facilitate the
                              procurement process and will not be used for
                              general product inquiries, which should be
                              directed to the designated support email provided
                              on the Platform.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">11.6.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              If, during the process, certain documents such as
                              CAD drawings or technical files are required by
                              the Vendor but cannot be uploaded or exchanged
                              through the Platform, the Buyer may send these
                              documents outside the Platform. However, this
                              off-Platform exchange of documents is only
                              permitted after the Buyer has made an advance
                              payment or completed a milestone payment as part
                              of the quote process. Until such a point, all
                              document exchanges, including PDFs, should occur
                              within the chat functionality of the Platform.
                              Further, the Vendor acknowledges that any
                              off-Platform document exchanges must include the
                              Platform administrator in all email communications
                              to ensure proper oversight and compliance with the
                              terms of this Agreement.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">11.6.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              At any point if the Buyer and Vendor choose to
                              communicate off the Platform, in such cases, the
                              Company explicitly disclaims all responsibility
                              for the content, outcomes, and any agreements made
                              during off-Platform communications. Despite
                              off-Platform communication, the Vendor and Buyer
                              must ensure that the Company is kept informed and
                              in the loop regarding the nature and outcomes of
                              such communications. The Vendor and Buyer must
                              ensure that any off-Platform interactions comply
                              with the terms of this Agreement and applicable
                              laws.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">11.6.4.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Additionally, all chats and communications between
                              the Buyer and Vendor will be subject to monitoring
                              by the Platform. Until the transaction is
                              finalized through the Platform, sharing personal
                              or contact information is strictly prohibited.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">11.6.5.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Upon mutual agreement between the Vendor and Buyer
                              regarding Product specifications, pricing, and
                              other terms, the Buyer is required to confirm the
                              order exclusively through the Platform. All
                              offline conversations shall be documented, and the
                              Company shall be kept informed to ensure
                              transparency and proper handling of Buyer
                              inquiries and sales transactions.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">11.6.6.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Platform acts solely as a facilitator for the
                              communication between Buyers and Vendors. While
                              the Platform provides this chat support
                              functionality, it does not monitor, verify, or
                              endorse the content of these communications. The
                              Company shall not be liable for any issues,
                              misunderstandings, or disputes arising from these
                              direct communications.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">11.6.7.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Failure to comply with the terms outlined in this
                              Clause may result in the Company taking
                              appropriate actions, including but not limited to
                              monitoring and enforcement measures, imposition of
                              account penalties, and pursuit of legal remedies
                              for breaches of these terms in accordance with
                              Clause 25.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
                <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                  <br data-cke-filler="true" />
                </p>
              </li>
              <li>
                <h1
                  id="e829359cc95035513264f8de1057bac7e"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify"
                >
                  <span className="pr-2">12.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        INVOICE GENERATION AND PROCESSING
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none;padding-left:0">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">12.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor acknowledges and agrees that the Platform
                          facilitates an auto-invoicing system to assist in
                          generating invoices on behalf of the Vendor. The
                          digital signature uploaded by the Vendor during the
                          onboarding process shall be utilized by the Platform
                          for inclusion on automatically generated invoices
                          issued to Buyers for transactions facilitated through
                          the Platform. The Vendor is solely responsible for
                          ensuring the accuracy, legality, and ongoing validity
                          of the uploaded digital signature, and further agrees
                          that the use of this signature on invoices shall carry
                          the same legal effect as a handwritten signature.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">12.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor acknowledges that the auto-generated
                          invoices provided by the Platform will not include an
                          invoice date or invoice number. It is the Vendor's
                          sole responsibility to accurately complete these
                          mandatory fields. Once the Vendor has filled in the
                          required invoice date and invoice number, the
                          completed invoice will be made accessible to the
                          respective Buyer in their Account under the "Orders"
                          section on the Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">12.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Further, it is also the Vendor's responsibility to
                          ensure that a printed or digital copy of the invoice
                          is attached to the order at the time of delivery.
                          Despite the Company’s assistance, the Vendor will
                          retain full responsibility for the accuracy and
                          completeness of all invoices. Any discrepancies or
                          issues with the invoices that result in liability from
                          taxation authorities will be the Vendor’s sole
                          responsibility.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">12.4.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor acknowledges that in cases where the
                          fulfilment of an order requires an advance or partial
                          payment from the Buyer, the Company shall issue a
                          receipt to the Buyer for any advance or partial
                          payments made on the Platform. This receipt shall
                          acknowledge the payment received but shall not
                          constitute an invoice. Upon receipt of the full
                          payment from the Buyer, it shall be the sole
                          responsibility of the Vendor to ensure that the final
                          invoice generated by the Platform is reflecting the
                          total amount paid. The Vendor must ensure that this
                          final invoice accurately details the whole
                          transaction.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">12.5.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Further, the Vendor understands that they may access
                          and manage invoices through the Vendor Module under
                          the “Invoices” section.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">12.6.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor agrees to comply with all Applicable Laws,
                          regulations, and tax requirements related to the
                          issuance and management of invoices. The Company shall
                          not be liable for any errors, omissions, or
                          non-compliance by the Vendor in this regard.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="e1e3de9baa4eac5a837937a7a3162c922"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify"
                >
                  <span className="pr-2">13.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">PAYMENT TERMS</strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none;padding-left:0">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">13.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor agrees and acknowledges that the Company
                          shall charge a predetermined Platform Fee from the
                          Vendor, which may vary based on the Product category,
                          material, and other criteria specified by the Company
                          during the negotiations stage and prior to Vendor
                          onboarding.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">13.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor further agrees and acknowledges that the
                          payment terms including the Platform Fee  agreed upon
                          in advance will be reflected during the Vendor
                          onboarding phase via electronic means. This electronic
                          onboarding form will include all agreed-upon payment
                          terms and is created and maintained in accordance with
                          the Information Technology Act, 2000. By agreeing to
                          these terms, the Vendor acknowledges that the
                          electronic records of the payment terms are legally
                          enforceable, valid, and binding.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">13.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor understands that the Vendor shall not be
                          required to submit invoices to the Company, as all
                          payments made by Buyers are processed through the
                          Platform. The Company will retain the agreed-upon
                          Platform Fee from the Buyer’s payment and issue an
                          invoice to the Vendor for the Platform Fee amount.
                          This invoice does not require action or clearance from
                          the Vendor, as the Company will automatically deduct
                          the Platform Fee from the total payment before
                          remitting the balance to the Vendor. Any discrepancies
                          regarding the Platform Fee invoice must be raised by
                          the Vendor within seven (7) days from the date the
                          invoice is issued by the Company. Failure to do so
                          will be deemed acceptance of the invoice and the
                          Platform Fee deduction.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">13.4.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Platform Fee payable to the Company by the Vendor
                          for each successful order shall be calculated as a
                          percentage of the total order value, including
                          applicable taxes and shipping charges and the
                          percentage of Platform Fee shall be calculated and
                          determined between the Company and the Vendor during
                          the negotiations before the onboarding process. For
                          Vendors operating under the partner pricing model, the
                          Platform Fee shall be calculated based on the
                          differential amount between the total order value and
                          the order value determined by the Vendor's established
                          pricing.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">13.5.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor agrees that the Platform Fee shall be
                          deducted by the Platform from the transaction proceeds
                          before remittance to the Vendor. Payments to Vendors
                          shall be processed as agreed upon between the Company
                          and the Vendor before the onboarding process.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">13.6.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Company reserves the right to modify or correct
                          any errors or omissions in invoices at any time. If
                          such modifications or corrections are made, the
                          Company will provide the Vendor with a revised
                          invoice. The Vendor agrees to accept such corrections
                          and promptly address any outstanding payments or
                          refunds resulting from these corrections.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">13.7.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Account Deactivation/Termination
                          </strong>
                          : Subject to
                        </span>
                      </span>
                      <Link
                        href="https://hubeco.market/vendor-terms-sale"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[#2e3191] text-[10pt] underline p-1">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            Terms of Sale
                          </span>
                        </span>
                      </Link>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          , if a Vendor requests for a closure of the Account or
                          the Company terminates this Agreement, the Company
                          will perform a final settlement of all pending
                          amounts. Any outstanding payments due to the Vendor,
                          including invoices not yet processed, will be settled
                          by the Company within thirty (30) days of Account
                          deactivation or termination, subject to due
                          certification and verification of all relevant
                          details. No further claims for payments or amounts
                          will be entertained after this final settlement.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
                <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                  <br data-cke-filler="true" />
                </p>
              </li>
              <li>
                <h1
                  id="eced02bbe84b89fa5421479ee1f3dec36"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify"
                >
                  <span className="pr-2">14.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        RETURN, REFUND, AND CANCELLATION
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none;padding-left:0">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">14.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Subject to the terms and conditions outlined in our
                          Return, Refund, and Cancellation Policy (
                        </span>
                        <i>
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            defined above
                          </span>
                        </i>
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          ), the Vendor hereby understands and agrees that the
                          return and cancellation terms for each Product listed
                          on the Platform may vary depending on the specific
                          details provided by the Vendor at the time of
                          onboarding. During the onboarding process, the Vendor
                          is required to submit detailed information regarding
                          the applicable return and cancellation terms as
                          outlined in Clause 7 of this Agreement.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">14.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Vendor understands and acknowledges that these return
                          and cancellation terms will be captured via an online
                          onboarding form, which is created and maintained in
                          accordance with the Information Technology Act, 2000
                          on the Platform. By completing the onboarding process,
                          the Vendor acknowledges and agrees that the terms
                          recorded electronically are legally enforceable,
                          valid, and binding. The Vendor also agrees that these
                          terms, once submitted, will govern all transactions
                          related to the Products listed on the Platform unless
                          otherwise modified by mutual consent, and such
                          modifications are also captured electronically in the
                          same manner.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">14.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor further acknowledges that the Company
                          reserves the right to enforce the return and
                          cancellation policies as provided by the Vendor, but
                          the Company shall not be held liable for any
                          discrepancies, misunderstandings, or disputes arising
                          from the Vendor’s provided information. It is the sole
                          responsibility of the Vendor to ensure that the
                          information regarding returns and cancellations is
                          accurate, up-to-date, and reflective of the Vendor’s
                          policies.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">14.4.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor understands that any changes or updates to
                          the return and cancellation terms must be communicated
                          in writing to the Company and submitted through the
                          Platform’s electronic systems. Such changes will only
                          take effect once they have been electronically
                          captured and acknowledged by both parties.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">14.5.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor confirms that all return and cancellation
                          terms provided during onboarding comply with
                          applicable laws and regulations. The Vendor is
                          responsible for ensuring that their policies do not
                          violate any consumer protection laws, and the Company
                          reserves the right to require modifications if any
                          terms are found to be non-compliant.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="line-height:107%;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">14.6.</span>
                      <span className="text-[10pt]">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="line-height:107%"
                        >
                          The Vendor understands that if the
                          <strong className="p-1"></strong>
                          Buyer’s refund is not processed by the Vendor within a
                          specified timeframe, we shall issue a refund directly
                          to the Buyer upon the Vendor’s confirmation that the
                          Vendor has received the returned Product in its
                          original state and is not defective. Any refund issued
                          by the Company directly to the Buyer shall be offset
                          against any payments owed to the Company.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
            <p className="leading-loose;margin:0 0 .0001pt">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-style-type:none">
              <li>
                <h1
                  id="edea5fc2ab1f1be21a64d02b389ebd262"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify"
                >
                  <span className="pr-2">15.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        INTELLECTUAL PROPERTY RIGHTS
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:1.85pt;margin-top:0;text-align:justify">
                      <span className="pr-2">15.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Intellectual property rights and any proprietary
                          materials utilized or created by the Company in
                          relation to the Platform are subject to the provisions
                          outlined in
                        </span>
                      </span>
                      <Link
                        href="https://hubeco.market/vendor-terms-sale"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[#2e3191] text-[10pt] underline p-1">
                          <i>
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Clause 10 of the Terms of Sale
                            </span>
                          </i>
                        </span>
                      </Link>
                      <span className="text-[#2e3191] text-[10pt] underline p-1">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          .
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
            <p className="leading-loose;margin:0 0 .0001pt 1in;text-align:justify">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-style-type:none">
              <li>
                <h1
                  id="e77e71f5ca236aa60f52a5bba4bec1079"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify"
                >
                  <span className="pr-2">16.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">TERM AND TERMINATION</strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0">
                      <span className="pr-2">16.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Term</strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">16.1.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              This Agreement shall commence upon the Effective
                              Date and, unless terminated earlier, shall
                              continue in effect until terminated as provided
                              herein (the “{" "}
                              <strong className="p-1">Term</strong>
                              ”). The Company reserves the right to update this
                              Agreement as needed (hereinafter referred to as “
                              <strong className="p-1">Term</strong>
                              ”).
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
            <ol className="list-style-type:none;padding-left:9.4px">
              <li className="p-8">
                <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0">
                  <span className="pr-2">16.2.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        Termination by either party:
                      </strong>
                    </span>
                  </span>
                </p>
                <ol className="list-style-type:none;padding-left:56.73px">
                  <li className="md:pl-14 pl-8">
                    <p className="leading-loose;margin-bottom:8pt;margin-right:1.85pt;margin-top:0;text-align:justify">
                      <span className="pr-2">16.2.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Either the Company or the Vendor may terminate this
                          Agreement with a minimum of thirty (30) days prior
                          written notice to the other party, which will become
                          effective upon the expiry of the notice period. The
                          Company may, in good faith, agree to waive or reduce
                          the notice period from thirty (30) days if an
                          alternative is found to the satisfaction of the
                          Company. Both the Company and the Vendor are free to
                          waive off notice periods only when specifically, and
                          clearly indicated in writing and mutually agreed upon
                          between them.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="background-color:#fff;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">16.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Termination without notice:
                          </strong>
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:0">
                      <li className="md:pl-14 pl-8">
                        <p className="background-color:#fff;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">16.3.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              The Company may terminate this Agreement in its
                              entirety, without any notice if the Vendor
                              breaches or commits a default of any obligation
                              which default is incapable of cure. If the default
                              is capable of cure but has not been cured within
                              fifteen (15) Business Days after receipt of notice
                              of such default, the Company has a right to
                              terminate the Agreement. A material breach under
                              this Agreement may take place upon:
                            </span>
                          </span>
                        </p>
                        <ol className="list-style-type:none;padding-left:125.87px">
                          <li className="md:pl-20 pl-10">
                            <p className="background-color:#fff;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify">
                              <span className="pr-2">16.3.1.1.</span>
                              <span className="text-[10pt]">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  Failure by the Vendor to deliver Products of
                                  the specified quality and specification or
                                  consistent delays in delivery of Products.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="background-color:#fff;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify">
                              <span className="pr-2">16.3.1.2.</span>
                              <span className="text-[10pt]">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  Attempting or directly engaging in the sale of
                                  any Products to the Buyer without involving
                                  the Platform.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                              <span className="pr-2">16.3.1.3.</span>
                              <span className="text-[10pt]">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  Receiving consistently bad reviews from Buyers
                                  regarding the quality of Products or materials
                                  shipped. Specifically, any review ratings of
                                  one (1) star consistently over a period of
                                  three (3) months.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                              <span className="pr-2">16.3.1.4.</span>
                              <span className="text-[10pt]">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  Failure to extend or renew quality
                                  certifications and non-compliance with quality
                                  standards as mentioned in the product
                                  specifications and certificates.
                                </span>
                              </span>
                            </p>
                          </li>
                          <li className="md:pl-20 pl-10">
                            <p className="leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify">
                              <span className="pr-2">16.3.1.5.</span>
                              <span className="text-[10pt]">
                                <span
                                  dir="ltr"
                                  lang="EN-GB"
                                  className="leading-loose"
                                >
                                  Any breach of the terms and conditions as
                                  outlined in the Agreement.
                                </span>
                              </span>
                            </p>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">16.4.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Subject to
                        </span>
                      </span>
                      <Link
                        href="https://hubeco.market/vendor-terms-sale"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[#2e3191] text-[10pt] underline p-1">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            Clause 21 of Terms of Sale
                          </span>
                        </span>
                      </Link>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          , the Company has the right to terminate this
                          Agreement otherwise than on account of the breach,
                          without any prior notice to the Vendor and the
                          termination shall become effective immediately.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
            <ol className="list-style-type:none;padding-left:9.4px">
              <li className="md:pl-8 pl-4">
                <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0">
                  <span className="pr-2">16.5</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        Consequences of Termination
                      </strong>
                    </span>
                  </span>
                </p>
                <ol className="list-style-type:none;padding-left:56.73px">
                  <li className="md:pl-14 pl-8">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">16.5.1</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Upon the termination of this Agreement, both the
                          Company and the Vendor shall be released from all
                          their obligations and liabilities occurring or arising
                          after the date of such termination, except that any
                          termination of this Agreement shall not relieve either
                          party of their delivery and payment obligations for
                          orders which have been already processed on the
                          Platform or any obligations under Clauses 13, 14, 15,
                          16, 17, 18, and 19 hereof, nor shall any such
                          termination relieve the parties from any liability
                          arising from any breach of this Agreement.
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:0">
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">16.5.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Further, upon the termination of this Agreement,
                              each Party shall, within fifteen (15) Business
                              Days of a written request, return and destroy all
                              originals, copies, reproductions and summaries of
                              Confidential Information provided to the other
                              party as Confidential Information or originating
                              from its activities for either party. Furthermore,
                              each party must immediately and permanently cease
                              to use and remove from its place of business and
                              from its Internet Platforms, any Intellectual
                              Property of the other party, including the other
                              party’s content, trademarks, and any other
                              identifying characteristics, including any signs,
                              fixtures, materials, stationery, supplies, forms
                              or other articles that display any content,
                              trademarks or any trade dress or other distinctive
                              features that create an impression of continued
                              association between the Company and the Vendor.
                              Each party shall certify to the other party in
                              writing that it has satisfied its obligations
                              under this paragraph.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">16.5.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Upon termination of this Agreement, any invoices
                              due to the Vendor will be processed and paid
                              within thirty (30) Business Days after the
                              termination date, contingent upon due
                              certification of the invoices. The certification
                              process will ensure that all goods and services
                              invoiced meet the quality standards and
                              specifications as per the agreement. Any
                              discrepancies found during the certification
                              process may result in adjustments to the payable
                              amounts. The Vendor agrees to provide all
                              necessary documentation to facilitate the
                              certification and payment process.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="e463910fd83a3633ae33dd5a95b61bf37"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify"
                >
                  <span className="pr-2">17.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">NON-SOLICITATION</strong>
                    </span>
                  </span>
                </h1>
              </li>
            </ol>
            <ol className="list-style-type:none;padding-left:9.4px">
              <li className="md:pl-8 pl-4">
                <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                  <span className="pr-2">17.1.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      The Vendor shall not:
                    </span>
                  </span>
                </p>
                <ol className="list-style-type:none;padding-left:56.73px">
                  <li className="md:pl-14 pl-8">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">17.1.1</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          solicit, encourage, induce or attempt to solicit,
                          encourage, or induce any or prospective employees,
                          marketing agents or consultants of the Company to
                          terminate his employment, agency or consultancy with
                          the Company.
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:0">
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">17.1.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Induce or attempt to induce any Buyer to terminate
                              its relationship with the Company or not use the
                              Company’s Platform;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li>
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">17.1.3.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              Induce any potential Buyer not to establish a
                              relationship with the Company.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
            <p className="leading-loose m-0 text-justify">
              <br data-cke-filler="true" />
            </p>
            <ol className="list-style-type:none">
              <li>
                <h1
                  id="e23bbe1da100773113f17513ce064eaa0"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify"
                >
                  <span className="pr-2">18.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">NON-DISPARAGEMENT</strong>
                    </span>
                  </span>
                </h1>
              </li>
            </ol>
            <ol className="list-style-type:none;padding-left:9.4px">
              <li className="md:pl-8 pl-4">
                <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                  <span className="pr-2">18.1.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      During the Term of this Agreement and at all times
                      thereafter, the Vendor shall not, directly or through any
                      other person, make any public or private statements
                      (whether orally, in writing, via electronic transmission,
                      or otherwise) that disparages, denigrates or maligns any
                      of the Company’s respective businesses, products,
                      services, activities, operations, affairs, reputations or
                      prospects; or any of the Company’s respective officers,
                      employees, directors, partners, agents, members or
                      shareholders. For purposes of clarification, and not
                      limitation, a statement shall be deemed to disparage,
                      denigrate or malign the other party if such statement
                      could be reasonably construed to adversely affect the
                      opinion that any other person may have or form of such
                      first person.
                    </span>
                  </span>
                </p>
                <ol className="list-style-type:none;padding-left:0">
                  <li>
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">18.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The foregoing limitations shall not be violated by
                          truthful statements made by the Vendor: (i) to any
                          governmental authority or (ii) which are in response
                          to legal process, required governmental testimony or
                          filings, or administrative or arbitral proceedings
                          (including, without limitation, depositions in
                          connection with such proceedings).
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="e5a39bc1c7ea895b45088bdcd73b6b34b"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify"
                >
                  <span className="pr-2">19.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">NON-CIRCUMVENTION</strong>
                    </span>
                  </span>
                </h1>
              </li>
            </ol>
            <ol className="list-style-type:none;padding-left:9.4px">
              <li className="md:pl-8 pl-4">
                <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                  <span className="pr-2">19.1.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      The Vendor understands and hereby agrees not to directly
                      or indirectly, circumvent, avoid, bypass, obviate,
                      negotiate or enter into any contract with any Buyers
                      registered with the Platform, initially communicated
                      through the Platform, without the prior written consent of
                      the Company. The Vendor acknowledges that any breach of
                      this non-circumvention obligation will result in
                      significant harm to the Company and agrees to indemnify
                      the Company for any losses incurred as a result of such
                      breach. This non-circumvention obligation shall remain in
                      effect during the term of this Agreement and for a period
                      of three (3) years following the termination or expiration
                      of this Agreement.
                    </span>
                  </span>
                </p>
                <ol className="list-style-type:none;padding-left:0">
                  <li>
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">19.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          The Vendor shall not, directly or indirectly, engage,
                          participate, or negotiate in any transaction with a
                          third party introduced or identified by the Company,
                          without the express written consent of the Company.
                          This includes but is not limited to accepting orders,
                          entering into contracts, or engaging in business
                          transactions with such third parties outside of the
                          Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">19.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          In the event of a breach or threatened breach of this
                          Clause 19, the Company shall be entitled to seek
                          injunctive relief, specific performance, and any other
                          equitable relief, in addition to any other rights or
                          remedies available at law or in equity, to prevent or
                          remedy such breach.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="e68536870d7f63c943002a5364ada9740"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:20pt;text-align:justify"
                >
                  <span className="pr-2">20.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        RELATIONSHIP BETWEEN THE COMPANY AND THE VENDOR
                      </strong>
                    </span>
                  </span>
                </h1>
              </li>
            </ol>
            <ol className="list-style-type:none;padding-left:9.4px">
              <li className="md:pl-8 pl-4">
                <p className="leading-loose;margin-bottom:10pt;margin-right:0;margin-top:0;text-align:justify">
                  <span className="pr-2">20.1</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      Notwithstanding any provision herein to the contrary or
                      any course of conduct between the Company and the Vendor,
                      both the Company and the Vendor hereto are independent
                      contractors, and nothing contained in this Agreement or in
                      any services shall be construed to place them in the
                      relationship of partners, principal and agent, employer
                      and employee, or joint-venturers. Each party agrees that
                      it shall have no power or right to bind or obligate the
                      other; neither party shall hold itself out as having such
                      authority. The Vendor will comply with the Platform’s
                      policies, dependent upon the type of service provided and
                      as directed by the Company, including but not limited to,
                      any training, training documentation, reading of Standard
                      Operating Procedures, performance assessments, and
                      requirements for departure when the Agreement has expired
                      (or is terminated).
                    </span>
                  </span>
                </p>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="ea0a1bc500fe006ffd9ff49aeb1fc0114"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:6pt;margin-right:0;margin-top:10pt;text-align:justify"
                >
                  <span className="pr-2">21.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">INDEMNIFICATION</strong>
                    </span>
                  </span>
                </h1>
              </li>
            </ol>
            <ol className="list-style-type:none;padding-left:9.4px">
              <li className="md:pl-8 pl-4">
                <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                  <span className="pr-2">21.1.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      Subject to
                    </span>
                  </span>
                  <Link
                    href="https://hubeco.market/vendor-terms-sale"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="text-[#2e3191] text-[10pt] underline p-1">
                      <span dir="ltr" lang="EN-GB" className="leading-loose">
                        Clause 25 of the Terms of Sale
                      </span>
                    </span>
                  </Link>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      , the Vendor agrees to indemnify and hold harmless, the
                      Company, including its officers, directors, employees, and
                      agents from any claims, losses, damages, liabilities,
                      costs, and expenses, (including reasonable attorney's
                      fees, related to the pet's transportation, (together
                      “Claims”).
                    </span>
                  </span>
                </p>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="e00748faf5e359f1b9a4e0323fe9372bc"
                  className="break-after:avoid;font-weight:400;leading-loose;margin-bottom:10pt;margin-right:0;margin-top:20pt;text-align:justify"
                >
                  <span className="pr-2">22.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">LIMITATION OF LIABILITY</strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none;padding-left:0">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">22.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Pursuant to
                        </span>
                      </span>
                      <Link
                        href="https://hubeco.market/vendor-terms-sale"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[#2e3191] text-[10pt] underline p-1">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            Clause 24 of Terms of Sale
                          </span>
                        </span>
                      </Link>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          , in no event shall the Company be liable to the
                          Vendor or any party related to the Vendor for any
                          indirect, incidental, consequential, special,
                          exemplary, or punitive damages (including, without
                          limitation, business interruption, loss of business
                          information, loss of data or other such pecuniary
                          loss), whether under a theory of contract, warranty,
                          tort (including negligence), products liability, or
                          otherwise. In no event will the Company’s total
                          aggregate and cumulative liability to the Vendor for
                          any and all claims of any kind arising hereunder
                          exceed the amount of the Platform Fee received by the
                          Company from such Vendor.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="e1857e06b55fcaa12b920a884e300d5bb"
                  className="background-color:#fff;break-after:avoid;font-weight:400;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify"
                >
                  <span className="pr-2">23.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">FORCE MAJEURE</strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none;padding-left:0">
                  <li className="md:pl-8 pl-4">
                    <p className="background-color:#fff;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">23.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          For the purpose of this Agreement, a “
                          <strong className="p-1">Force Majeure Event</strong>”
                          means anything outside the reasonable control of a
                          party, including fire, explosion, power blackout,
                          earthquake, flood, strike, embargo, labour disputes,
                          civil disorder, riot, act of civil or military
                          authority, act of public enemy, terrorist threat or
                          activity, war (declared or undeclared), unavailability
                          or shortage of materials, act of god, delays in
                          transportation, unforeseen site conditions, acts or
                          omissions of subcontractors, acts or omission of
                          carriers or suppliers, restriction of law, regulation,
                          order or other acts of regulatory or governmental
                          agency(ies), interruption or failure of
                          telecommunication or digital transmission link,
                          internet failure or delay, disruptions in the supply
                          chain of construction materials, significant price
                          fluctuations in raw materials, transport strikes or
                          disruptions, equipment breakdowns, environmental
                          restrictions or disasters (such as landslides or soil
                          contamination), and any other unforeseen events that
                          prevent the procurement, production, or delivery of
                          construction building materials.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="background-color:#fff;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">23.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          Neither the Company nor the Vendor shall be liable to
                          the other nor shall be deemed in default for any
                          delay, failure in performance, loss or damage due to a
                          Force Majeure Event, provided that such delay,
                          failure, loss or damage:
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                          <span className="pr-2">23.2.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              could not have been prevented by commercially
                              reasonable precautions and;
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:3pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">23.2.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              cannot reasonably be circumvented by the
                              non-performing party through the use of
                              commercially reasonable alternate sources,
                              work-around plans or other means.
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="background-color:#fff;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">23.3.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          If the performance of the obligations is delayed or
                          impacted by a Force Majeure Event, the Vendor shall
                          immediately notify the Company of the occurrence of
                          such event and describe its nature in writing with
                          reasonable details.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="ebb7c1a7d61b09141b2d415b5f0eeb954"
                  className="background-color:#fff;break-after:avoid;font-weight:400;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify"
                >
                  <span className="pr-2">24.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">
                        GOVERNING LAW AND JURISDICTION
                      </strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none;padding-left:0">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">24.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          This Agreement shall be governed by and construed in
                          accordance with the laws of India without regard to
                          its conflict of law principles. The parties hereby
                          irrevocably submit to the exclusive jurisdiction of
                          the courts located in Hyderabad, Telangana, India, for
                          any legal suit, action, or proceeding arising out of
                          or related to this Agreement. Each Party waives any
                          objection which it may have now or hereafter to the
                          laying of the venue of any such proceeding in such
                          courts and agrees not to plead or claim in any such
                          court that such proceeding has been brought in an
                          inconvenient forum.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="e11cc89bd2fc006205fe987ce85fa541a"
                  className="background-color:#fff;break-after:avoid;font-weight:400;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify"
                >
                  <span className="pr-2">25.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">DISPUTE RESOLUTION</strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none;padding-left:0">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">25.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          This Agreement shall be construed in accordance with
                          the applicable laws of Hyderabad, Telangana, India.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                      <span className="pr-2">25.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          If any dispute or claim arises from or in connection
                          with (i) this Agreement, (ii)
                        </span>
                      </span>
                      <Link
                        href="https://hubeco.market/vendor-terms-sale"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[#2e3191] text-[10pt] underline p-1">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            Terms of Sale
                          </span>
                        </span>
                      </Link>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          ; and/or (iii) your access to or use of our Platform
                          and/or Services, the relevant parties shall resolve
                          the dispute through amicable negotiations but in case
                          the conflict continues the parties will resort for the
                          dispute resolution procedure set out herein.
                        </span>
                      </span>
                    </p>
                    <ol className="list-style-type:none;padding-left:56.73px">
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">25.2.1.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">Mediation:</strong>
                              In the event that the parties are unable to agree
                              to a mutually agreeable decision and a dispute or
                              difference arises in connection with the
                              interpretation or implementation of this Agreement
                              or Vendor Terms of Sale, the parties agree that
                              they will submit to a binding confidential
                              mediation that will be held in Hyderabad,
                              Telangana, India and in accordance with the
                              applicable laws of India.  The mediation shall be
                              conducted in English by a mediator that is
                              mutually agreed upon by the Parties, as far as
                              possible. The costs of the mediation shall be
                              borne equally by all parties. The parties hereby
                              waive any and all right to have this Agreement or
                              Vendor Terms of Sale adjudicated by a court or
                              jury. The mediation proceedings shall be carried
                              out in Hyderabad, Telangana, India. In accordance
                              with the applicable laws of India. The mediator
                              shall issue a final decision within sixty (60)
                              days from the commencement of mediation
                              proceedings.
                            </span>
                          </span>
                        </p>
                      </li>
                      <li className="md:pl-14 pl-8">
                        <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                          <span className="pr-2">25.2.2.</span>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              <strong className="p-1">Arbitration:</strong>
                              In the event that the mediation fails to resolve
                              the dispute within the sixty (60) day period, the
                              parties agree to submit the dispute to binding
                              arbitration.  The arbitration shall be conducted
                              in Hyderabad, Telangana and in accordance with the
                              applicable laws of India. The arbitration shall be
                              conducted in English by a sole arbitrator
                              appointed jointly by the parties, as far as
                              possible. The arbitrator must be independent. The
                              arbitrator must issue a final decision within one
                              (1) month from the commencement of arbitration
                              proceedings. The place of arbitration shall be
                              Hyderabad, Telangana, India. The award of the
                              arbitration proceedings will be final and binding
                              on both parties to this Agreement or
                            </span>
                          </span>
                          <Link
                            href="https://hubeco.market/vendor-terms-sale"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <span className="text-[#2e3191] text-[10pt] underline p-1">
                              <span
                                dir="ltr"
                                lang="EN-GB"
                                className="leading-loose"
                              >
                                Terms of Sale
                              </span>
                            </span>
                          </Link>
                          <span className="text-[10pt]">
                            <span
                              dir="ltr"
                              lang="EN-GB"
                              className="leading-loose"
                            >
                              .
                            </span>
                          </span>
                        </p>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                <br data-cke-filler="true" />
              </p>
              <li>
                <h1
                  id="e620d4b47a3d2af52a1558a6a601aa663"
                  className="background-color:#fff;break-after:avoid;font-weight:400;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify"
                >
                  <span className="pr-2">26.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">MISCELLANEOUS</strong>
                    </span>
                  </span>
                </h1>
                <ol className="list-style-type:none;padding-left:0">
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">26.1.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Assignment:</strong>
                          The Vendor shall not be entitled to transfer or assign
                          the rights or obligations under this Agreement or any
                          part thereof except with the prior written approval of
                          the Company.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li className="md:pl-8 pl-4">
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">26.2.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">
                            Terms of Sale and Privacy Policy
                          </strong>
                          : The Vendor hereby agrees to read this Agreement in
                          conjunction with the
                        </span>
                      </span>
                      <Link
                        href="https://hubeco.market/vendor-terms-sale"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[#2e3191] text-[10pt] underline p-1">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            Terms of Sale
                          </span>
                        </span>
                      </Link>
                      <span className="text-[#2e3191] text-[10pt] underline p-1">
                        <span
                          dir="ltr"
                          lang="EN-GB"
                          className="leading-loose"
                        ></span>
                      </span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          and
                        </span>
                      </span>
                      <Link
                        href="https://hubeco.market/privacy-policy"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[#2e3191] text-[10pt] underline p-1">
                          <span
                            dir="ltr"
                            lang="EN-GB"
                            className="leading-loose"
                          >
                            Privacy Policy
                          </span>
                        </span>
                      </Link>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          governing the use of the Platform.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
            <ol className="list-style-type:none;padding-left:9.4px">
              <li className="md:pl-8 pl-4">
                <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:0;text-align:justify">
                  <span className="pr-2">26.3.</span>
                  <span className="text-[10pt]">
                    <span dir="ltr" lang="EN-GB" className="leading-loose">
                      <strong className="p-1">Non-exclusivity:</strong>
                      The Company does not mandate that any of the Vendor’s
                      Products should be sold exclusively on the Platform. For
                      the sake of clarity, the Company unilaterally waives any
                      obligation on the Vendor to sell exclusively on the
                      Platform. Any written or oral arrangements to the contrary
                      shall stand unilaterally waived.
                    </span>
                  </span>
                </p>
                <ol className="list-style-type:none;padding-left:0">
                  <li>
                    <p className="leading-loose;margin-bottom:.0001pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">26.4.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Counterparts</strong>: This
                          Agreement may be executed in any number of
                          counterparts, each of which shall be enforceable
                          against the Vendor actually executing such
                          counterparts, and all of which together shall
                          constitute one instrument.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="background-color:#fff;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">26.5.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Severability:</strong>
                          To the extent that any provision of this Agreement is
                          found by any court or competent authority to be
                          invalid, unlawful or unenforceable in any
                          jurisdiction, that provision shall be deemed not to be
                          a part of this Agreement, and such finding shall not
                          affect the enforceability of the remainder of this
                          Agreement nor shall it affect the validity, lawfulness
                          or enforceability of that provision in any other
                          jurisdiction.
                        </span>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="background-color:#fff;leading-loose;margin-bottom:12pt;margin-right:0;margin-top:10pt;text-align:justify">
                      <span className="pr-2">26.6.</span>
                      <span className="text-[10pt]">
                        <span dir="ltr" lang="EN-GB" className="leading-loose">
                          <strong className="p-1">Entire Agreement:</strong>
                          This Agreement sets out the entire understanding of
                          the Company and the Vendor hereto and supersedes all
                          prior negotiations and all prior agreements, written
                          or verbal, and may not be modified except in writing
                          and signed by both the Company and the Vendor.
                        </span>
                      </span>
                    </p>
                  </li>
                </ol>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
