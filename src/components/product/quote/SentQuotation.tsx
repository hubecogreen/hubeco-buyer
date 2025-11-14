import React, { useState } from "react";
import Image from "next/image";
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

import toast from "react-hot-toast";

import useApi from "@/components/Fetcher/useAPI";

import useRefreshToken from "@/components/hooks/useRefreshToken";

import ViewMore from "./ViewMore";

import Link from "next/link";

import dayjs from "dayjs";

import { LuEye } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";

export default function SentQuotation({
  initialState,

  setSelectedQuote,

  setQuoteOpen,

  setSelectedView,
}: any) {
  const [errorOnRemark, setErrorOnRemark] = useState<string>("");

  const [remarks, setRemarks] = useState<string>("");

  const [loadingOnAction, setLoadingOnAction] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<string>("");

  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  const { callApi } = useApi();

  const { refreshTokens } = useRefreshToken();

  async function handleQuoteAction() {
    if (errorOnRemark.length > 1) {
      return;
    }

    if (remarks.length === 0) {
      setErrorOnRemark("Please enter remarks");

      return;
    } else {
      setErrorOnRemark("");
    }

    try {
      setLoadingOnAction(true);

      const payload = {
        id: window.location.href.split("quote-request/")[1],

        reason: remarks,

        action: isOpen,
      };

      const res = (await callApi(
        "quotes/handleQuoteAction",

        "POST",

        payload
      )) as any;

      if (res.data !== null) {
        toast.success(
          `Quotation ${isOpen == "reject" ? "Rejected" : "Accepted"
          } successfully`
        );

        setRemarks("");

        setErrorOnRemark("");

        setSelectedQuote(null);

        window.location.reload();
      } else {
        toast.error(
          `${isOpen == "reject" ? "Rejection" : "Acceptance"} failed`
        );
      }
    } catch (err: any) {
      toast.error(`${isOpen == "reject" ? "Rejection" : "Acceptance"} failed`);
    } finally {
      setLoadingOnAction(false);

      setIsOpen("");
    }
  }

  function formatCurrencyInIndianStyle(amount: number): string {
    // Round to two decimal places
    const roundedAmount = Math.round(amount * 100) / 100;

    // Determine whether to show decimals
    const options: Intl.NumberFormatOptions =
      roundedAmount % 1 === 0
        ? {} // No decimals if the number is whole
        : { minimumFractionDigits: 2, maximumFractionDigits: 2 };

    // Format in Indian numbering style
    return new Intl.NumberFormat("en-IN", options).format(roundedAmount);
  }

  const reducePrice = (quote: any) => {
    const finalOne = quote.products.reduce(
      (total: any, product: { unitPrice: any }) =>
        total + product.unitPrice * product.quantity,
      0
    );
    return formatCurrencyInIndianStyle(finalOne);
  };

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

  return (
    <div className="mb-8 mt-6">
      <h2 className="text-[15px] font-semibold text-[#2F2B3D] mb-3">
        Delivery Terms & Conditions
      </h2>

      <div
        className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0px_2px_4px_0px_#0000001A] overflow-y-auto scrollbar w-full "
        style={{ opacity: 1 }}
      >
        <table className="w-full border-collapse text-sm table-auto">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">
                Quotation ID
              </th>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">
                Product Name
              </th>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">
                Delivery Terms
              </th>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">
                Other Terms
              </th>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">
                Quote Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {initialState.quotations.map((quote: any, index: any) => {
              const firstProduct = quote.products?.[0];
              return (
                <tr key={index} className="border-b border-[#E5E7EB]">
                  <td className="py-3 px-4 text-[#2F2B3D] font-medium">
                    {quote.quotationId}
                  </td>

                  <td className="py-3 px-4 text-[#2F2B3D] font-semibold">
                    {firstProduct?.variantId?.variantName === "Default"
                      ? firstProduct?.variantId?.productName
                      : firstProduct?.variantId?.variantName}
                  </td>

                  <td className="py-3 px-4 text-[#6B7280] max-w-[400px] truncate">
                    {quote.deliveryTerms ||
                      "No delivery terms provided"}
                  </td>
                  <td className="py-3 px-4 text-[#6B7280] max-w-[400px] truncate">
                    {quote.otherTerms || "No other terms provided"}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() =>
                          handleDownload(
                            `${assetURL}/${initialState?.quoteDetailsInvoice?.pdfUrl}`,
                            `Hubeco_${initialState?.quoteId}`
                          )
                        }
                        className="bg-[#B90647] text-white text-sm font-semibold px-4 py-2 rounded-[6px] hover:bg-[#9B314A]"
                      >
                        Download Quote
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="border border-[#B90647] text-[#B90647] text-sm font-semibold px-4 py-2 rounded-[6px] hover:bg-[#FFF1F4]"
                      >
                        <Link
                          href={`/quote-request/${initialState._id}/view-quote?id=${quote.quotationId}`}
                          onClick={() => {
                            setSelectedView(quote);
                            setQuoteOpen(true);
                          }}
                        >
                          View Quote
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

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
                onPress={() => {
                  handleQuoteAction();
                }}
              />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );

}
