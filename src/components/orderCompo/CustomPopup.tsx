"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import useApi from "@/components/Fetcher/useAPI";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import toast from "react-hot-toast";
import CustomInput from "@/components/customInput/CustomTextField";

const CustomPopup = (orderNum: any, order: any) => {
  // console.log("OrderNum", orderNum);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const router = useRouter();
  const orderLength = order?.orders?.length;
  const [openCancel, setOpenCancel] = useState<boolean>(false);
  const [openReturn, setOpenReturn] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<any>("");
  const [cancelReasonError, setCancelReasonError] = useState<string>("");
  const [returnReason, setReturnReason] = useState<string>("");
  const [returnReasonError, setReturnReasonError] = useState<string>("");
  const [returnType, setReturnType] = useState<string>("");
  const [cancelButtonLoading, setCancelButtonLoading] =
    useState<boolean>(false);
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message[0].message == "reason must be a string"
      ) {
        toast.error("Please Enter Valid Reason");
      } else {
        toast.error("Cancel Order Failed");
      }
      // toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message == "Order not found"
      ) {
        toast.error("Order not found");
      } else {
        toast.error("Cancel Order Failed");
      }
      // toast.error("Invalid Request");
    } else if (result?.status === 409) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message ==
          "Product can't be cancelled as per vendor policy"
      ) {
        toast.error("Product can't be cancelled as per vendor policy");
      } else if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message == "Product can't be cancelled as time elapsed"
      ) {
        toast.error("Product can't be cancelled as time elapsed");
      } else {
        toast.error("Cancel Order Failed");
      }
      //
    } else if (result?.status === 401) {
      await refreshTokens();
      handleSubmit();
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const handleSubmit = async () => {
    setCancelButtonLoading(true);
    var now = dayjs();
    const payload = {
      orderId: order?.order?._id,
      reason: cancelReason,
      timeStamp: now,
    };
    // console.log("Cancelpayload", payload);
    // try {
    //   const result = (await callApi(
    //     getEndpoint.default.CANCELORDER,
    //     "POST",
    //     payload
    //   )) as any;
    //   if (result.data == null) {
    //     handleApiError(result?.errorData);
    //   } else {
    //     toast.success("Order Cancelled Successfully");
    //     reloadPage();
    //   }
    // } catch (e: any) {
    //   handleApiError(e);
    // } finally {
    //   setCancelButtonLoading(false);
    //   setOpenCancel(false);
    //   setCancelReason("");
    // }
  };

  const onEnterReason = (e: any) => {
    const value = e.trim();
    setCancelReason(value);
    // console.log("ReasonValue", e, value);
    // if(value.length > 2){
    //   setCancelReason(value)
    //   setCancelReasonError('')
    // }else{
    //   setCancelReasonError("Please Enter Valid Reason")
    // }
  };

  if (!open) return null; // Don't render if the popup is closed

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={() => setOpenCancel(false)}
      ></div>

      {/* Popup Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white sm:max-w-[425px] p-6 rounded shadow-lg border border-borderGray relative">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/public/images/wishlist/CancelS.svg"
              alt="cancel order"
              width={70}
              height={70}
              className="mb-8"
            />
          </div>

          <p className="text-center text-lg text-black mt-4">
            Are you sure you want to cancel the order?
          </p>

          <div className="mt-8">
            <label
              htmlFor="cancelReason"
              className="block text-sm font-regular text-left mb-2"
            >
              Reason for Cancel
            </label>

            <CustomInput
              placeholder="Enter Reason"
              value={cancelReason}
              onChange={onEnterReason}
              extraClassnames="w-full p-2 border border-gray-300 rounded resize-none"
              isTextArea={true}
              // errorMessage={cancelReasonError}
            />
            {cancelReasonError ? (
              <span className="text-red text-sm text-left w-full">
                {cancelReasonError}
              </span>
            ) : (
              <></>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end items-center mt-6">
            <Button
              type="button"
              className="py-2 px-4 bg-secondaryBg text-gray-700 rounded hover:bg-secondaryBg ml-6"
              onClick={() => setOpenCancel(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="py-2 px-6 bg-secondary text-white rounded hover:bg-secondary ml-4"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
