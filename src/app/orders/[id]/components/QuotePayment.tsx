"use client";
import React, { useEffect, useState } from "react";
import useApi from "@/components/Fetcher/useAPI";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import WaitingCard from "@/components/product/quote/WaitingCard";
import PaymentSchedule from "@/components/product/quote/PaymentSchedule";
import SentQuotation from "@/components/product/quote/SentQuotation";
// Dummy data for products, quotations, and payment schedule
const assetUrl = process.env.NEXT_PUBLIC_ASSET_URL;

interface QuotePaymentProps{
    id:any
}

const QuotePayment:React.FC<QuotePaymentProps> = ({id}) => {
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


  const getQuoteDetailsById = async (id: string) => {
    const quote = (await callApi(`quotes/getQuote/${id}`, "GET")) as any;
    if (quote.data !== null) {
      setInitialValues(quote.data);
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
  useEffect(() => {
    // Extract the `id` from the URL
    // const quoteId = window.location.href.split("quote-request/")[1];
    if (id) {
      getQuoteDetailsById(id);
    }
  }, [id]);



return(
<>
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
</>
)

}



export default QuotePayment;