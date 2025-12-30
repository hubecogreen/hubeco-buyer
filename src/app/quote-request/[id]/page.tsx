"use client";

import React, { useEffect, useState } from "react";

import BannerSection from "@/components/sharedComponents/BannerSection";

// import { MdOutlineFileDownload } from "react-icons/md";

import ChatBox from "../components/ChatBox";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import CustomButton from "@/components/customButton/CustomButton";

import { BsExclamationCircle } from "react-icons/bs";

import CustomInput from "@/components/customInput/CustomTextField";

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

import toast from "react-hot-toast";

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
import { relative } from "path";
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

        textColor: "text-brown",

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

        textColor: "text-brown",

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

    const defaultStyles = { textColor: "text-brown", bgColor: "bg-gray-300" };

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
      completed: "Quotation Approved",
      closed: "Closed",
      pending: "Pending",
      requested: "Requested",
      quotation_sent: "Quotation Received",
      quotation_rejected: "Quotation rejected",
      quotation_approved: "Quotation Approved",
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
      const fileName =
        customFileName || url.split("/").pop() || "downloaded-file";

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

  const handleQuoteAction = async () => {
    if (errorOnRemark.length > 1) return;
    if (remarks.length === 0) {
      setErrorOnRemark("Please enter remarks");
      return;
    } else {
      setErrorOnRemark("");
    }

    try {
      setLoadingOnAction(true);
      const quoteId = window.location.href.split("quote-request/")[1];
      const id = quoteId.split("/view-quote")[0] || quoteId.split("/")[0];
      const payload = {
        id: id,
        reason: remarks,
        action: isOpen,
      };
      const res = (await callApi("quotes/handleQuoteAction", "POST", payload)) as any;

      if (res.data !== null) {
        toast.success(
          `Quotation ${isOpen === "reject" ? "Rejected" : "Accepted"} successfully`
        );
        setRemarks("");
        setErrorOnRemark("");
        window.location.reload();
      } else {
        toast.error(`${isOpen === "reject" ? "Rejection" : "Acceptance"} failed`);
      }
    } catch (err: any) {
      toast.error(`${isOpen === "reject" ? "Rejection" : "Acceptance"} failed`);
    } finally {
      setLoadingOnAction(false);
      setIsOpen("");
    }
  };




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

      <div className="max-w-[1440px] mx-auto px-[40px] mt-0 bg-cream">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center  mb-8  border-b border-primary shadow-[0px_1px_2px_0px_#0000000D] px-4 md:px-[40px] py-4 md:py-[20px] w-full max-w-[1440px] mx-auto rounded-none">
          {/* Left side — Quote ID and Status inline */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <h1 className="text-lg md:text-[22px] font-bold text-[#2F2B3D] leading-[26px] md:leading-[28px] tracking-[0.2px] break-words">
              {initialState.quoteId}
            </h1>

            <span className="text-xs md:text-sm font-semibold text-[#009886] border border-[#009886] px-2 md:px-3 py-[2px] md:py-1 rounded-md whitespace-nowrap">
              {getStatus(initialState.status)
                ? getStatus(initialState.status)
                : initialState.status.includes("_")
                  ? initialState.status.split("_").join(" ")
                  : initialState.status}
            </span>
          </div>

          {/* Right side — Download button */}
          {initialState?.purchaseOrder && (
            <Button
              onClick={() =>
                handleDownload(
                  `${assetUrl}/${initialState?.purchaseOrder}`,
                  buyer?.buyerInfo?.buyerType === "B2B"
                    ? `Purchase Order ${initialState?.purchaseOrderNumber}`
                    : `Order ${initialState?.purchaseOrderNumber}`
                )
              }
              className="flex items-center justify-center gap-1 md:gap-2 bg-[#009886] text-white hover:bg-[#007c6d] font-semibold rounded-md px-3 md:px-4 py-2 mt-3 md:mt-0 text-sm md:text-base w-full sm:w-auto"
            >
              {buyer?.buyerInfo?.buyerType === "B2B"
                ? "Download Purchase Order"
                : "Download Order"}
              <MdOutlineFileDownload size={18} />
            </Button>
          )}
        </div>

        {/* Product Details + Cost Breakdown + ChatBox layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch mb-8">
          <div className="overflow-visible">
            {/* LEFT SECTION: Product, Cost, and Payment stacked */}
            <div className="flex flex-col gap-5 flex-1">
              {/* Top Row: Product + Cost Breakdown side by side */}
              <div className="flex flex-col sm:flex-row lg:flex-nowrap gap-5 w-full">
                {/* Product Details Card */}
                <div className="w-full lg:w-auto">
                  <div
                    className="bg-cream border border-[#E5E7EB] rounded-[10px] shadow-[0px_2px_4px_0px_#0000001A] p-5 flex flex-col gap-3 w-full sm:w-[526px] min-h-[424.56px]"
                  >

                    {initialState.products.map((product: any) => (
                      <div key={product._id} className="flex flex-col gap-3">
                        {/* Product Image */}
                        <div className="overflow-hidden border border-primary rounded-[10px] w-full h-[219px]">
                          <Image
                            src={
                              product.variantId.thumbnail
                                ? normalizePath(
                                  `${assetUrl}/${product.variantId.thumbnail}`
                                )
                                : "/images/product-placeholder.webp"
                            }
                            alt={product.variantId.variantName}
                            className="object-cover w-full h-full"
                            width={486}
                            height={219}
                            onError={(e) => {
                              e.currentTarget.src =
                                "/images/product-placeholder.webp";
                            }}
                            loading="lazy"
                          />
                        </div>

                        {/* Product Title */}
                        <div className="flex flex-wrap items-center gap-2 pb-[15x]">
                          <h2 className="text-base md:text-lg font-bold text-[#2F2B3D]">
                            Product Details:
                          </h2><br/>
                          <p className="font-semibold text-[#2F2B3D] text-base break-words">
                            {product.variantId.variantName === "Default"
                              ? product.variantId.productName
                              : product.variantId.variantName}
                          </p>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-sm text-[#2F2B3D]">
                          <div>
                            <p className="text-gray-500 font-medium">Quote ID</p>
                            <p className="font-semibold break-all">
                              {initialState.quoteId}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 font-medium">
                              Quote Requested by
                            </p>
                            <p className="font-semibold break-words">
                              {initialState?.vendorInformation?.companyName ||
                                "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 font-medium">
                              Quote Requested on
                            </p>
                            <p className="font-semibold">
                              {dayjs(initialState.submissionDate).format(
                                "DD - MM - YYYY"
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 font-medium">
                              Quote Created on
                            </p>
                            <p className="font-semibold">
                              {dayjs(initialState.createdAt).format(
                                "DD - MM - YYYY"
                              )}
                            </p>
                          </div>

                          {/* Dynamic Unit Price fix */}
                          <div>
                            <p className="text-gray-500 font-medium">
                              Unit Price
                            </p>
                            <p className="font-semibold">
                              <span className="rupee">₹</span>
                              {(() => {
                                const quote = initialState?.quotations?.[0];
                                if (
                                  quote &&
                                  Array.isArray(quote.products) &&
                                  quote.products.length > 0
                                ) {
                                  const match = quote.products.find(
                                    (qProd: any) =>
                                      qProd.variantId?._id ===
                                      product.variantId?._id ||
                                      qProd.productId === product._id
                                  );
                                  if (match?.unitPrice) {
                                    return new Intl.NumberFormat("en-IN").format(
                                      match.unitPrice
                                    );
                                  }
                                }
                                return product.variantId?.price
                                  ? new Intl.NumberFormat("en-IN").format(
                                    product.variantId.price
                                  )
                                  : "N/A";
                              })()}
                            </p>
                          </div>

                          {/* Quantity */}
                          <div>
                            <p className="text-gray-500 font-medium">Quantity</p>
                            <p className="font-semibold">
                              {(() => {
                                const quote = initialState?.quotations?.[0];
                                if (
                                  quote &&
                                  Array.isArray(quote.products) &&
                                  quote.products.length > 0
                                ) {
                                  const match = quote.products.find(
                                    (qProd: any) =>
                                      qProd.variantId?._id ===
                                      product.variantId?._id ||
                                      qProd.productId === product._id
                                  );
                                  if (match?.quantity) return match.quantity;
                                }
                                return product.quantity || "N/A";
                              })()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle Section: Cost Breakdown */}
                <div className="flex flex-col gap-5 flex-shrink-0 w-full sm:w-[350px]">
                  <div
                    className="bg-cream rounded-[8px] border border-[#E5E7EB] shadow-[0px_2px_4px_0px_#0000001A] p-[15px] w-full sm:w-[350px] min-h-[424.56px]"
                  >
                    {/* --- Cost Breakdown header + Approve/Reject section --- */}
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-semibold text-[#2F2B3D]">
                        Cost Breakdown
                      </h2>
                      {/* ✅ Right (Accept) & Wrong (Reject) buttons OR Status label */}
                      {initialState?.quotations?.[0]?.status === "Pending" ? (
                        <div className="flex items-center gap-2">
                          {/* ❌ Reject Button */}
                          <Image
                            src="/images/Button.svg"
                            alt="Reject"
                            width={36}
                            height={36}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedQuote(initialState.quotations[0]);
                              setIsOpen("reject");
                            }}
                          />

                          {/* ✅ Accept Button */}
                          <Image
                            src="/images/Button.webp"
                            alt="Accept"
                            width={36}
                            height={36}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedQuote(initialState.quotations[0]);
                              setIsOpen("accept");
                            }}
                          />
                        </div>
                      ) : (
                        <>
                          {/* HIDE STATUS BADGE — KEEP FOR FUTURE USE */}
                          {false && (
                            <button
                              className={`font-semibold px-3 py-1 rounded-md ${initialState?.quotations?.[0]?.status === "Rejected"
                                ? "bg-[#B9064729] text-[#B90647]"
                                : "bg-[#00988629] text-[#009886]"
                                }`}
                            >
                              {initialState?.quotations?.[0]?.status === "Approved"
                                ? "Accepted"
                                : "Rejected"}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    {(() => {
                      const quote = initialState?.quotations?.[0];

                      if (!quote || !Array.isArray(quote.products) || quote.products.length === 0) {
                        return (
                          <div className="flex flex-col items-center justify-center text-center h-full">
                            <div>
                              <h2 className="text-base font-semibold text-[#2F2B3D] mb-3">
                                Cost Breakdown
                              </h2>
                              <Clock className="text-[#B90647] mb-3 w-8 h-8 animate-pulse mx-auto" />
                              <p className="text-sm text-[#2F2B3DB2] font-medium leading-relaxed">
                                Quotation Received and <br /> under review
                              </p>
                            </div>
                          </div>
                        );
                      }
                      const formatCurrency = (amount: number): string => {
                        const rounded = Math.round(amount * 100) / 100;
                        const options: Intl.NumberFormatOptions =
                          rounded % 1 === 0
                            ? {}
                            : {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            };
                        return new Intl.NumberFormat("en-IN", options).format(
                          rounded
                        );
                      };
                      const unitPrice = quote.products.reduce(
                        (total: number, item: any) =>
                          total + Number(item.unitPrice || 0),
                        0
                      );
                      const quantity = quote.products.reduce(
                        (total: number, item: any) =>
                          total + Number(item.quantity || 0),
                        0
                      );
                      const taxable = quote.products.reduce(
                        (total: number, item: any) =>
                          total +
                          Number(item.unitPrice || 0) *
                          Number(item.quantity || 0),
                        0
                      );
                      const gst = quote.products.reduce(
                        (total: number, item: any) =>
                          total + Number(item.taxableAmount || 0),
                        0
                      );
                      const shipping = quote.products.reduce(
                        (total: number, item: any) =>
                          total + Number(item.shippingCost || 0),
                        0
                      );
                      const other = quote.products.reduce(
                        (total: number, item: any) =>
                          total + Number(item.otherCost || 0),
                        0
                      );
                      const grandTotal =
                        Number(quote.grandTotal) ||
                        taxable + gst + shipping + other;

                      return (
                        <div className="flex flex-col gap-4 text-sm text-[#2F2B3D] leading-relaxed">
                          <div className="flex justify-between">
                            <p className="text-[#2F2B3DB2]">Unit Price</p>
                            <p className="font-semibold">
                              <span className="rupee">₹</span>{formatCurrency(unitPrice)}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-[#2F2B3DB2]">Quantity</p>
                            <p className="font-semibold">
                              {formatCurrency(quantity)}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-[#2F2B3DB2]">Shipping Cost</p>
                            <p className="font-semibold">
                              <span className="rupee">₹</span>{formatCurrency(shipping)}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-[#2F2B3DB2]">Other Cost</p>
                            <p className="font-semibold">
                              <span className="rupee">₹</span>{formatCurrency(other)}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-[#2F2B3DB2]">Total Amount</p>
                            <p className="font-semibold">
                              <span className="rupee">₹</span>{formatCurrency(taxable)}
                            </p>
                          </div>
                          {/* ✅ Fixed Tax Section (keeps height same for IGST-only or CGST+SGST) */}
                          <div className="flex flex-col gap-2 min-h-[70px]">
                            {Array.isArray(quote.products) &&
                              quote.products.map((product: any, index: number) => (
                                <React.Fragment key={index}>
                                  {product.cgst !== -1 && (
                                    <div className="flex justify-between text-sm">
                                      <p className="text-[#2F2B3DB2]">CGST ({product.cgst}%)</p>
                                      <p className="font-semibold">
                                        <span className="rupee">₹</span>
                                        {formatCurrency(
                                          (product.unitPrice * product.quantity * (product.cgst || 0)) /
                                          100
                                        )}
                                      </p>
                                    </div>
                                  )}

                                  {product.sgst !== -1 && (
                                    <div className="flex justify-between text-sm">
                                      <p className="text-[#2F2B3DB2]">SGST ({product.sgst}%)</p>
                                      <p className="font-semibold">
                                        <span className="rupee">₹</span>
                                        {formatCurrency(
                                          (product.unitPrice * product.quantity * (product.sgst || 0)) /
                                          100
                                        )}
                                      </p>
                                    </div>
                                  )}

                                  {product.igst !== -1 && (
                                    <div className="flex justify-between text-sm">
                                      <p className="pb-2 text-[#2F2B3DB2]">IGST ({product.igst}%)</p>
                                      <p className="font-semibold">
                                        <span className="rupee">₹</span>
                                        {formatCurrency(
                                          (product.unitPrice * product.quantity * (product.igst || 0)) /
                                          100
                                        )}
                                      </p>
                                    </div>
                                  )}
                                </React.Fragment>
                              ))}
                          </div>
                          <hr className="border-[#E5E7EB]" />
                          <div className="flex justify-between text-base font-bold text-[#2F2B3D] pb-0">
                            <p>Grand Total</p>
                            <p>₹{formatCurrency(grandTotal)}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>


            {/* ChatBox beside Product + Cost Breakdown */}
            {/* <div
            className="w-full sm:w-[439px] flex flex-col justify-between bg-white border border-[#E5E7EB] rounded-[8px] shadow-[0px_4px_6px_0px_#0000001A,0px_10px_15px_0px_#0000001A] flex-1 self-stretch"
            style={{
              height: "424.56px",
              position: "relative",
            }}
          >
            </div> */}


          </div>
          {/* ✅ Payment Schedule BELOW both Product + Cost */}
          <div
            className="w-full sm:w-[439px] lg:h-[424.56px] sm:h-[200px] flex flex-col justify-between bg-white border border-[#E5E7EB] rounded-[8px]  flex-1 self-stretch"
            style={{
              height: "424.56px",
              position: "relative",
            }}
          >
            <ChatBox
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
              height="64"
            />
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            {initialState.quotations && initialState.quotations.length > 0 ? (
              <SentQuotation
                initialState={initialState}
                setSelectedQuote={setSelectedQuote}
                setQuoteOpen={setQuoteOpen}
                setSelectedView={setSelectedView}
              />
            ) : (
              <div className="flex justify-center items-center h-28 w-full">
                <WaitingCard line="Waiting for vendor to send the quotation request." />
              </div>
            )}
          </div>
        </div>
        <div className="bg-cream pb-16">
        <div className="w-full overflow-x-auto mt-4 ">
          <div className="min-w-[600px]">
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
        </div>
        </div>


        <AlertDialog open={isOpen !== ""}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center pb-5 text-[#B90647]">
                Are you sure you want to {isOpen} this quotation?
              </AlertDialogTitle>
              <BsExclamationCircle
                className="w-full flex justify-center items-center text-center mb-8"
                color="#B90647"
                size={45}
              />
              <AlertDialogDescription className="text-center pt-4">
                {isOpen !== "reject"
                  ? ""
                  : "Rejecting this quotation will notify the vendor that you are not interested in the quoted price. You may provide a reason for the rejection."}
              </AlertDialogDescription>

              <CustomInput
                placeholder="Remarks"
                required
                isTextArea={true}
                customStyles={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                onChange={(e) => {
                  if (e.length > 10000) {
                    setErrorOnRemark("Remarks should be less than 10000 characters");
                  } else if (e.length < 3) {
                    setErrorOnRemark("Remarks should be at least 3 characters");
                  } else {
                    setErrorOnRemark("");
                  }
                  setRemarks(e);
                }}
              />
              {errorOnRemark && <p className="text-red text-sm">{errorOnRemark}</p>}
            </AlertDialogHeader>

            <AlertDialogFooter className="flex sm:justify-center justify-center w-full items-center">
              <AlertDialogCancel
                onClick={() => {
                  setIsOpen("");
                  setRemarks("");
                  setErrorOnRemark("");
                }}
                className="md:h-12 h-8 md:w-24"
              >
                No
              </AlertDialogCancel>

              <CustomButton
                title={"Yes"}
                className="ml-3 bg-secondary hover:bg-primary h-12 md:h-12 md:w-24 w-24 md:text-md text-sm text-white"
                onPress={handleQuoteAction}
              />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
