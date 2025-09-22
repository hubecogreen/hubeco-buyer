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
          `Quotation ${
            isOpen == "reject" ? "Rejected" : "Accepted"
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
    <div className="mb-8 mt-10">
      <h2 className="text-lg font-bold mb-3">Recently Sent Quotations</h2>
      <div className="bg-gray-100 rounded-md pt-4 overflow-y-auto scrollbar w-full">
        <table className="w-full table-auto border-collapse ">
          <thead className="bg-secondaryBg  text-left ">
            <tr>
              <th className="p-4 whitespace-nowrap text-left">Quotation</th>
              <th className="p-4 whitespace-nowrap text-left">Unit Price</th>
              <th className="p-4 whitespace-nowrap text-left">
                Offered Quantity
              </th>
              <th className="p-4 whitespace-nowrap text-left">
                Tax Percentage
              </th>
              <th className="p-4 whitespace-nowrap text-left">
                Delivery Terms
              </th>
              <th className="p-4 whitespace-nowrap text-left">
                Other Terms and Conditions
              </th>
              <th className="p-4 whitespace-nowrap text-left">Grand Total</th>
              <th className="p-4 whitespace-nowrap text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {initialState.quotations.map((quote: any, index: any) => (
              <tr key={index} className="border-b">
                <td className="p-4">
                  <Link
                    href={`/quote-request/${initialState._id}/view-quote?id=${quote.quotationId}`}
                    className="text-blue-500 font-bold cursor-pointer text-[#009886]"
                    onClick={() => {
                      setSelectedView(quote);
                      setQuoteOpen(true);
                    }}
                  >
                    {/* {quote.quotationId} */}
                    <div className="flex justify-start items-center cursor-pointer">
                      <p className="font-medium">View Quote</p>
                    </div>
                  </Link>
                  <p className="text-xs text-gray-500 pt-2">
                    {dayjs(quote.createdAt).format("DD-MM-YYYY")}
                  </p>
                  {initialState?.quoteDetailsInvoice?.pdfUrl && (
                    <Button
                      onClick={() =>
                        // window.open(`${assetURL}/${order?.buyerInvoiceLink}`, "_blank")
                        handleDownload(
                          `${assetURL}/${initialState?.quoteDetailsInvoice?.pdfUrl}`,
                          `Quote_Request_${quote?.quotationId}`
                        )
                      }
                      variant={"outline"}
                      className="mt-2 !py-0 w-fit !h-[35px] !px-2 border-secondary text-secondary rounded-none bg:white hover:bg-white hover:text-secondary"
                    >
                      <MdOutlineFileDownload color="#9B314A" /> Download Quote
                    </Button>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    {Array.isArray(quote.products) &&
                    quote.products.length > 0 ? (
                      quote.products.map((elem: any, index: number) => (
                        <div
                          key={elem.id}
                          className={`flex items-start ${
                            index === quote.products.length - 1
                              ? ""
                              : "border-b border-gray-200 pb-2"
                          }`}
                        >
                          <span>
                            {elem?.unitPrice ? `${elem.unitPrice}` : "N/A"}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No products available.
                      </p>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    {Array.isArray(quote.products) &&
                    quote.products.length > 0 ? (
                      quote.products.map((elem: any, index: number) => (
                        <div
                          key={elem.id}
                          className={`flex items-start ${
                            index === quote.products.length - 1
                              ? ""
                              : "border-b border-gray-200 pb-2"
                          }`}
                        >
                          <span>
                            {elem?.quantity ? `${elem.quantity}` : "N/A"}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No products available.
                      </p>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col  space-y-2">
                    {Array.isArray(quote.products) &&
                    quote.products.length > 0 ? (
                      quote.products.map((elem: any, index: number) => (
                        <div
                          key={elem.id}
                          className={`flex flex-col ${
                            index === quote.products.length - 1
                              ? ""
                              : "border-b border-gray-200 pb-2"
                          }`}
                        >
                          {elem.cgst !== -1 && (
                            <p className=" flex justify-start text-sm gap-3">
                              <span>CGST:</span>
                              <span>
                                {elem?.cgst ? `${elem.cgst}%` : "N/A"}
                              </span>
                            </p>
                          )}
                          {elem.sgst !== -1 && (
                            <p className=" flex justify-start text-sm gap-3">
                              <span>SGST:</span>
                              <span>
                                {elem?.sgst ? `${elem.sgst}%` : "N/A"}
                              </span>
                            </p>
                          )}
                          {elem?.igst !== -1 && (
                            <p className=" flex justify-start text-sm gap-3">
                              <span>IGST:</span>
                              <span>
                                {elem?.igst ? `${elem.igst}%` : "N/A"}
                              </span>
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No products available.
                      </p>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <ViewMore
                    text={quote.deliveryTerms || "-"}
                    length={60}
                    className="w-full"
                  />
                </td>
                <td className="p-4">
                  <ViewMore
                    text={quote.otherTerms || "-"}
                    length={60}
                    className="w-full"
                  />
                </td>
                <td className="p-4 min-w-[220px]">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 pr-3">
                        Taxable Amount:
                      </span>
                      <span className="font-medium">
                        <span className="text-xl font-normal font-mono">₹</span>
                        {Array.isArray(quote.products) && reducePrice(quote)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        GST (
                        {quote.products[0].cgst === -1 ? "IGST" : "CGST + SGST"}
                        ):
                      </span>
                      <span className="font-medium">
                        <span className="text-xl font-normal font-mono">₹</span>

                        {Array.isArray(quote.products) &&
                          formatCurrencyInIndianStyle(
                            quote.products.reduce(
                              (total: any, product: { totalAmount: any }) =>
                                total + product.taxableAmount,
                              0
                            )
                          )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping Cost:</span>
                      <span className="font-medium">
                        <span className="text-xl font-normal font-mono">₹</span>

                        {Array.isArray(quote.products) &&
                          formatCurrencyInIndianStyle(
                            quote.products.reduce(
                              (total: any, product: { shippingCost: any }) =>
                                total + product.shippingCost,
                              0
                            )
                          )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Other Cost:</span>
                      <span className="font-medium">
                        <span className="text-xl font-normal font-mono">₹</span>
                        {Array.isArray(quote.products) &&
                          formatCurrencyInIndianStyle(
                            quote.products.reduce(
                              (total: any, product: { otherCost: any }) =>
                                total + product.otherCost,
                              0
                            )
                          )}
                      </span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="font-semibold">Grand Total:</span>
                      <span className="font-bold">
                        <span className="text-xl font-normal font-mono">₹</span>

                        {formatCurrencyInIndianStyle(quote.grandTotal)}
                      </span>
                    </div>
                    {Array.isArray(quote.products) &&
                      quote.products.some((elem) => elem.roundValue !== 0) && (
                        <div className="justify-between items-center flex">
                          <div className="inline text-xs font-medium">
                            Amount rounded off to
                          </div>
                          <div className="flex flex-row">
                            <span className="font-mono mr-0 inline">₹</span>
                            <span className="inline-flex flex-col text-xs items-start w-full pt-[2px]">
                              {quote.products
                                .reduce(
                                  (total: any, product: { roundValue: any }) =>
                                    Number(total) + Number(product.roundValue),
                                  0
                                )
                                .toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                </td>
                <td className="p-4">
                  {quote.status !== "Pending" ? (
                    <button
                      className={`font-semibold cursor-default px-4 py-2 w-full ${
                        quote.status === "Rejected"
                          ? "bg-[#B9064729] text-[#B90647]"
                          : "bg-[#00988629] text-[#009886]"
                      }`}
                    >
                      {quote.status === "Approved" ? "Accepted" : quote.status}
                    </button>
                  ) : (
                    <div className="flex gap-3 justify-center">
                      <Image
                        src="/images/Button.svg"
                        alt=""
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedQuote(quote);
                          setIsOpen("reject");
                        }}
                        width={40}
                        height={40}
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/product-placeholder.webp";
                        }}
                        loading="lazy"
                      />
                      <Image
                        src="/images/Button.webp"
                        alt=""
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedQuote(quote);
                          setIsOpen("accept");
                        }}
                        width={40}
                        height={40}
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/product-placeholder.webp";
                        }}
                        loading="lazy"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AlertDialog open={isOpen !== ""}>
          {/* <AlertDialogOverlay className="" style={{ backgroundCoslor: 'rgba(0, 0, 0, 0.5)' }} /> */}
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
                    setErrorOnRemark(
                      "Remarks should be less than 10000 characters"
                    );
                  } else if (e.length < 3) {
                    setErrorOnRemark("Remarks should be at least 3 characters");
                  } else {
                    setErrorOnRemark("");
                  }
                  setRemarks(e);
                }}
              />
              {errorOnRemark && (
                <p className="text-red text-sm">{errorOnRemark}</p>
              )}
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
                className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-24  w-24 md:text-md text-sm text-white "
                customStyles={{}}
                // onPress={() => deleteAddress(address.id)}
                type="submit"
                onPress={() => {
                  handleQuoteAction();
                }}
                //  loading={isLoading}
              />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
