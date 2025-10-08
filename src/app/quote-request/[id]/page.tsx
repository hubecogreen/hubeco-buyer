"use client";

import React, { useEffect, useState } from "react";

import BannerSection from "@/components/sharedComponents/BannerSection";

// import { MdOutlineFileDownload } from "react-icons/md";

import ChatBox from "../components/ChatBox";

// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// import CustomButton from "@/components/customButton/CustomButton";

// import { BsExclamationCircle } from "react-icons/bs";

// import CustomInput from "@/components/customInput/CustomTextField";

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Alert, AlertDescription } from "@chakra-ui/react";
// import { Info, InfoIcon } from "lucide-react";
// import { IoIosClose } from "react-icons/io";

import useApi from "@/components/Fetcher/useAPI";

import useRefreshToken from "@/components/hooks/useRefreshToken";

// import toast from "react-hot-toast";

import NotFoundPage from "../../../components/404/page";

import { Clock, Loader } from "lucide-react";

import Image from "next/image";

// import Link from "next/link";

// import { IoCloseCircleSharp } from "react-icons/io5";

// import QuoteDetailsDialog from "@/components/product/quote/QuoteDetailsDialog";

import PaymentSchedule from "@/components/product/quote/PaymentSchedule";

import SentQuotation from "@/components/product/quote/SentQuotation";

import dayjs from "dayjs";

import WaitingCard from "@/components/product/quote/WaitingCard";
import { MdOutlineFileDownload } from "react-icons/md";
import { Button } from "@/components/ui/button";
import useGetBuyer from "@/components/hooks/useGetBuyer";
import { normalizePath } from "@/lib/utils";
// import {
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
//   Tooltip
// } from "@radix-ui/react-tooltip";
// Dummy data for products, quotations, and payment schedule

const assetUrl = process.env.NEXT_PUBLIC_ASSET_URL;

const QuoteDetails = ({ id }: any) => {
  const [isOpen, setIsOpen] = useState<string>("");

  const [quoteOpen, setQuoteOpen] = useState<boolean>(false);

  const [remarks, setRemarks] = useState<string>("");

  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  const [errorOnRemark, setErrorOnRemark] = useState<string>("");

  const [selectedView, setSelectedView] = useState<any>();

  const [loadingOnAction, setLoadingOnAction] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [initialState, setInitialValues] = useState<any>({});

  const [loading, setLoading] = useState<boolean>(true);

  const { callApi } = useApi();

  const { refreshTokens } = useRefreshToken();

  const { getBuyer } = useGetBuyer();

  const getQuoteDetailsById = async (id: string) => {
    const quote = (await callApi(`quotes/getQuote/${id}`, "GET")) as any;

    if (quote.data !== null) {
      setInitialValues(quote.data);
      // console.log("checkk jjsdj jhjhd", quote.data);
    } else {
      setInitialValues("not_found");

      // console.log(quote?.errorData, "sadsa");

      if (quote?.errorData?.response?.data?.message?.includes("admin")) {
        // setAdminApprovalFailed(true)
      } else if (quote.error.includes("authentication")) {
        // setCount(prev => prev + 1)

        await refreshTokens();
      }
    }

    setLoading(false);
  };

  const getStatusStyles = (status: string) => {
    const statusStyles = [
      {
        statuses: ["completed"],

        textColor: "text-white",

        bgColor: "text-[#009886]",
      },

      {
        statuses: ["closed"],

        textColor: "text-white",

        bgColor: "text-[#009886]",
      },

      {
        statuses: ["pending"],

        textColor: "text-black",

        bgColor: "text-[#fdba74]",
      },

      {
        statuses: ["requested"],

        textColor: "text-white",

        bgColor: "text-[#009886]",
      },

      {
        statuses: ["quotation_sent"],

        textColor: "text-white",

        bgColor: "text-[#009886]",
      },

      {
        statuses: ["quotation_rejected"],

        textColor: "text-white",

        bgColor: "text-[#A92449]",
      },

      {
        statuses: ["quotation_approved"],

        textColor: "text-white",

        bgColor: "text-[#439787]",
      },

      {
        statuses: ["partial_payment_made"],

        textColor: "text-black",

        bgColor: "text-[#fdba74]",
      },

      {
        statuses: ["payment_scheduled"],

        textColor: "text-white",

        bgColor: "text-[#439787]",
      },

      {
        statuses: ["payment_cleared"],
        textColor: "text-white",
        bgColor: "text-[#009886]",
      },
      {
        statuses: ["processing_orders"],
        textColor: "text-white",
        bgColor: "text-[#009886]",
      },
    ];

    const defaultStyles = { textColor: "text-black", bgColor: "bg-gray-300" };

    // Find the matching style based on the status

    const style = statusStyles.find((item) =>
      item.statuses.includes(status.toLowerCase())
    );

    return style
      ? ` ${style.bgColor}`
      : `${defaultStyles.textColor} ${defaultStyles.bgColor}`;
  };

  function getStatus(status: string) {
    const data = {
      completed: "Completed",
      closed: "Closed",
      pending: "Pending",
      requested: "Requested",
      quotation_sent: "Quotation received",
      quotation_rejected: "Quotation rejected",
      quotation_approved: "Quotation approved",
      partial_payment_made: "Partial payment made",
      payment_scheduled: "Payment scheduled",
      payment_cleared: "Payment cleared",
      submission_delayed: "Submission delayed",
      processing_orders: "Processing orders",
    };
    return data[status];
  }
  useEffect(() => {
    // Extract the `id` from the URL

    const quoteId = window.location.href.split("quote-request/")[1];

    if (quoteId) {
      getQuoteDetailsById(quoteId);
    }
  }, []);

  
  useEffect(() => {
    getBuyer();
  }, []);

  function IfAtLeastOnePaymentDone(payment: any[]) {
    const val =
      payment
        .map((item: any) => {
          if (item.paymentStatus == "COMPLETED") {
            return true;
          }
        })
        .filter(Boolean).length > 0;
    return val;
  }

  const handleDownload = async (url: string, customFileName: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
  
      const blob = await response.blob();
  
      // Use provided custom file name
      const fileName = customFileName || url.split("/").pop() || "downloaded-file";
  
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(blobUrl);
    } catch (error: any) {
      // As fallback, open in a new tab
      window.open(url, "_blank");
      // console.error("Download failed:", error?.message);
    }
  };
  

  if (loading) {
    return (
      <div className="w-full flex justify-center h-[80vh] items-center">
        <Loader className="text-[#439787] spin-in-180 animate-spin" />
      </div>
    );
  }

  if (initialState == "not_found") {
    return <NotFoundPage />;
  }


  const buyerUserInfo = sessionStorage.getItem("buyerUserInfo");
  const buyer = buyerUserInfo ? JSON.parse(buyerUserInfo) : null;

  return (
    <>
      <head>
        <title>Hubeco | Quote View</title>
      </head>

      {/* Banner Section */}

      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "Quote Request", href: "/quote-request" }}
        link3={{
          name: `${initialState.quoteId}`,

          href: `/quote-request/${initialState._id}`,
        }}
      />

      <div className="px-4 md:px-6 mt-8 md:mt-10">
        {/* Header Section */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold pb-3">
              {initialState.quoteId}
            </h1>

            <span
              className={`font-semibold text-lg capitalize ${getStatusStyles(
                initialState.status
              )}`}
            >
              {getStatus(initialState.status)
                ? getStatus(initialState.status)
                : initialState.status.includes("_")
                ? initialState.status.split("_").join(" ")
                : initialState.status}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex gap-5 lg:flex-nowrap flex-wrap">
          <div className="w-full lg:w-5/5 shadow-lg">
            <div className="bg-gray-100 rounded-md mb-8 h-full">
              <div className="h-[10%]">
                <h2 className="text-lg font-medium py-3 pl-4 mb-2 sm:gap-0 gap-2">
                  Product Details
                </h2>
              </div>
              <div className=" bg-secondaryBg">
                <div className="flex h-[15%] flex-wrap justify-between bg-secondaryBg  mb-6  p-4">
                  <div>
                    <h2 className="text-lg font-bold">
                      {initialState.quoteId}
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-normal text-gray-500 whitespace-nowrap">
                          Quote Requested By :
                        </p>
                      </div>

                      <div>
                        <p className="px-3 font-semibold text-gray-500 whitespace-nowrap">
                          {dayjs(initialState.submissionDate).format(
                            "DD-MM-YYYY"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-normal text-gray-500 whitespace-nowrap">
                          Quote Created On :
                        </p>
                      </div>

                      <div>
                        <p className="px-3 font-semibold text-gray-500 whitespace-nowrap">
                          {dayjs(initialState.createdAt).format("DD-MM-YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 overflow-x-auto scrollbar pt-[40px] md:pt-0 min-h-[70%] pl-5">
                {initialState.products.map((product: any) => (
                  <div key={product._id} className="flex items-start ">
                    <Image
                      // src={
                      //   product.variantId.thumbnail
                      //     ? (
                      //         assetUrl +
                      //         "/" +
                      //         product.variantId.thumbnail
                      //       ).includes("//admin")
                      //       ? (
                      //           assetUrl +
                      //           "/" +
                      //           product.variantId.thumbnail
                      //         ).replace("//admin", "/admin")
                      //       : `${assetUrl}/${product.variantId.thumbnail}`
                      //     : "/images/product-placeholder.webp"
                      // }
                      src={
                        product.variantId.thumbnail
                          ? normalizePath(`${assetUrl}/${product.variantId.thumbnail}`)
                          : "/images/product-placeholder.webp"
                      }
                      alt={product.variantId.variantName}
                      className="w-16 h-16 object-cover rounded mr-4"
                      height={16}
                      width={16}
                      onError={(e) => {
                        e.currentTarget.src = "/images/product-placeholder.webp";
                      }}
                      loading="lazy"
                    />

                    <div className="flex">
                      <div className="flex flex-col">
                        <h3 className="font-bold line-clamp-3 whitespace-pre-wrap text-wrap w-[250px] truncate">
                          {product.variantId.variantName == "Default"
                            ? product.variantId.productName
                            : `${product.variantId.variantName}`}
                        </h3>
                      </div>

                      <div className="flex space-x-8 text-[#2F2B3DB2] text-sm md:ml-[20rem]">
                        <div className="max-w-md"></div>

                        <div>
                          <p className="font-light">Quantity</p>

                          <p className="font-medium text-[#2F2B3DE5] pb-2">
                            {product.quantity}
                          </p>
                        </div>
                        {initialState?.purchaseOrder &&(
                        <div>
                          <Button
                            onClick={() =>
                              handleDownload(
                                `${assetUrl}/${initialState?.purchaseOrder}`,buyer?.buyerInfo?.buyerType === 'B2B' ? `Purchase Order ${initialState?.purchaseOrderNumber}` : `Order ${initialState?.purchaseOrderNumber}`
                              )
                            }
                            variant={"outline"}
                            className="mt-2 !py-0 w-fit !h-[35px] !px-2 border-secondary text-secondary rounded-none bg:white hover:bg-white hover:text-secondary"
                          >
                              {buyer?.buyerInfo?.buyerType === "B2C" ? (
                            <>
                              <MdOutlineFileDownload color="#9B314A" />
                              Download Order
                            </>
                          ) : (
                            <>
                              <MdOutlineFileDownload color="#9B314A" />
                              Download Purchase Order
                            </>
                          )}
                          </Button>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:mt-24 lg:mt-0 lg:w-2/5">
            <ChatBox
              // canChat={IfAtLeastOnePaymentDone(initialState?.paymentsSchedule)}
              canChat={true}
              sender={{ name: "User1", displayImage: "" }}
              receiver={{
                name: `${initialState?.vendorInformation?.companyName}`,
                displayImage: `${assetUrl}/${initialState.vendorInformation?.logo}`,
              }}
              roomEndPoint="quotes/getOrCreateRoom"
              chatEndPoint="quotes/getQuoteChats"
              refer="Quote"
              width="md"
              closeText="At least one payment should be completed to access chat with vendor"
            />
          </div>
        </div>

        {/* Recently Sent Quotation */}

        {initialState.quotations && initialState.quotations.length > 0 ? (
          <SentQuotation
            initialState={initialState}
            setSelectedQuote={setSelectedQuote}
            setQuoteOpen={setQuoteOpen}
            setSelectedView={setSelectedView}
          />
        ) : (
          <div className="flex justify-center items-center h-28 w-full">
            {" "}
            <WaitingCard line="Waiting for vendor to send the quotation request." />
          </div>
        )}

        {/* Payment Schedule */}

        {initialState.paymentsSchedule?.length > 0 ? (
          <PaymentSchedule
            initialState={initialState}
            setIsLoading={setIsLoading}
          />
        ) : initialState.quotations?.length > 0 ? (
          <div className="flex justify-center items-center h-28 w-full">
            <WaitingCard line="After accepting the quotation request, the vendor will provide the payment schedule here." />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default QuoteDetails;

// {initialState.paymentsSchedule?.length > 0 &&     <Alert className="w-full max-w-md  p-6 space-y-6 rounded-lg !bg-secondaryBg shadow-sm">
//   <div className="flex items-start gap-4">
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Info className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0 cursor-help" />
//         </TooltipTrigger>
//         <TooltipContent>
//           <p className="text-xs flex items-center  border border-borderGray w-fit px-2 py-1 bg-black rounded-md text-white font-medium"> Payment can be directly sent to bank account or through online
//           payment methods</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//     {/* <Info className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" /> */}

//     <div className="space-y-2 flex-1">
//       {/* Account Name Section */}
//       <div className="space-y-1.5">
//         <p className="text-sm font-medium text-blue-600">
//           Account name
//         </p>
//         <p className="font-semibold text-gray-900 text-base">
//           HUBECO GREEN VENTURES PRIVATE LIMITED
//         </p>
//       </div>

//       {/* Account Details Grid */}
//       <div className="grid grid-cols-2 gap-6">
//         <div className="space-y-1.5">
//           <p className="text-sm font-medium text-blue-600">
//             Account no
//           </p>
//           <p className="font-semibold text-gray-900 border-0 ">
//             99909705044055
//           </p>
//         </div>

//         <div className="space-y-1.5">
//           <p className="text-sm font-medium text-blue-600 border-0">
//             IFSC Code
//           </p>
//           <p className="font-semibold text-gray-900 border-0">
//             HDFC0000317
//           </p>
//         </div>
//       </div>

//       {/* Payment Description */}
//       {/* <AlertDescription className="text-xs text-blue-700 pt-4 ">
//         Payment can be directly sent to bank account or through online
//         payment methods
//       </AlertDescription> */}
//     </div>
//   </div>
// </Alert>}
