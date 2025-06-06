"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import useApi from "@/components/Fetcher/useAPI";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import toast from "react-hot-toast";
import CustomInput from "@/components/customInput/CustomTextField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import CustomReturnPopup from "./CustomReturnPopup";
import * as getEndpoint from "../../network/EndPoints";
import { last } from "lodash";

const RenderButton = ({ orderId, order, justify = "center" }: any) => {
  const status = order?.status as any;
  const [openCancel, setOpenCancel] = useState<boolean>(false);
  const [openReturn, setOpenReturn] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<any>("");
  const [cancelReasonError, setCancelReasonError] = useState<string>("");
  const [returnReason, setReturnReason] = useState<string>("");

  const [cancelButtonLoading, setCancelButtonLoading] =
    useState<boolean>(false);
  const handleOpenPopup = () => {
    setOpenCancel(true);
  };

  const handleOpenReturn = () => {
    setOpenReturn(true);
  };

  const handleClosePopup = () => {
    setOpenCancel(false);
  };

  const handleCloseReturn = () => {
    setOpenReturn(false);
  };

  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  // console.log("orderuniq", orderId);
  let showCancelButton = false;
  let showReturnButton = false;
  let showRefundButton = false;
  const [orderIds, setOrderIds] = useState<any>(null);

  const history = order?.history;

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
      handleSubmit(orderId);
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const handleSubmit = async (orderID: any) => {
    if (cancelReasonError.length > 0) {
      return;
    }
    setCancelReasonError("");

    setCancelButtonLoading(true);
    var now = dayjs();
    const payload = {
      orderId,
      reason: cancelReason,
      timeStamp: now,
    };
    try {
      const result = (await callApi(
        getEndpoint.default.CANCELORDER,
        "POST",
        payload
      )) as any;
      if (result.data == null) {
        handleApiError(result?.errorData);
      } else {
        toast.success("Order Cancelled Successfully");
        //   reloadPage();
        window.location.reload();
      }
    } catch (e: any) {
      handleApiError(e);
    } finally {
      setCancelButtonLoading(false);
      setOpenCancel(false);
      setCancelReason("");
    }
  };

  const onEnterReason = (e: any) => {
    const value = e.trim();
    setCancelReason(value);
    // console.log("ReasonValue", e, value);
    if (value.length < 3) {
      setCancelReasonError("Reason should be more than 3 characters");
    } else {
      setCancelReasonError("");
    }
    setCancelReason(value);
  };

  // Check if cancellation is allowed within the cancellation period
  if (
    history &&
    order?.createdAt &&
    order?.cancellationDuration &&
    order?.isCancellationAllowed
  ) {
    const createdAt = new Date(order?.createdAt);
    const cancellationDeadline = new Date(createdAt);
    cancellationDeadline.setDate(
      createdAt.getDate() + order?.cancellationDuration
    );
    const currentDate = new Date();

    // Get the last history object
    const lastStatus = history[history.length - 1];

    // console.log(
    //   "Cancelpayload",
    //   lastStatus.previousStatus,
    //   lastStatus.currentStatus,
    //   currentDate < cancellationDeadline
    // );

    // Check if within cancellation deadline and if last status matches criteria
    if (
      currentDate <= cancellationDeadline &&
      ((lastStatus.previousStatus === "pending" &&
        lastStatus.currentStatus === "payment_success") ||
        (lastStatus.previousStatus === "order_created" &&
          lastStatus.currentStatus === "payment_success") ||
        (lastStatus.previousStatus === "payment_success" &&
          lastStatus.currentStatus === "confirmed"))
    ) {
      showCancelButton = true;
    }
  }

  // Check if return is allowed within the return period
  if (
    order?.createdAt &&
    order?.returnDuration &&
    order?.isReturnAllowed &&
    order?.isRefundAllowed
  ) {
    const createdAt = new Date(order?.deliveredAt);
    const returnDeadline = new Date(createdAt);
    returnDeadline.setDate(createdAt.getDate() + order?.returnDuration);
    const currentDate = new Date();
    const lastStatus1 = history[history.length - 1];
    // // console.log("vwebrtny return dead lin", returnDeadline);
    // // console.log("vwebrtny current date", currentDate);
    // // console.log("vwebrtny last statsu", lastStatus1.previousStatus);
    // // console.log("vwebrtny current statsu", lastStatus1.currentStatus);
    if (
      (currentDate <= returnDeadline &&
        lastStatus1.previousStatus === "shipped") ||
      (lastStatus1.previousStatus === "ORDER_DELAYED" &&
        lastStatus1.currentStatus === "delivered")
    ) {
      // console.log("vwebrtny return dead lin", returnDeadline);
      // console.log("vwebrtny current date", currentDate);
      // console.log("vwebrtny last statsu", lastStatus1.previousStatus);
      // console.log("vwebrtny current statsu", lastStatus1.currentStatus);
      showReturnButton = true;
    }
  }

  // Check if refund is allowed within the refund period
  if (order?.createdAt && order?.refundDuration && order?.isRefundAllowed) {
    const createdAt = new Date(order?.createdAt);
    const refundDeadline = new Date(createdAt);
    refundDeadline.setDate(createdAt.getDate() + order?.refundDuration);
    const currentDate = new Date();
    showRefundButton = currentDate <= refundDeadline;
  }
  // useEffect(() => {
  //   // console.log("Cancelpayload1", status);
  // }, [orderIds]);

  // Render based on current status
  switch (status) {
    case "payment_success":
    case "confirmed":
      return (
        <div className={`flex items-center justify-${justify} `}>
          {showCancelButton && (
            <>
              <Dialog open={openCancel} onOpenChange={setOpenCancel}>
                {/* <DialogTrigger> */}
                <Button
                  variant="outline"
                  className="border-secondary hover:bg-white rounded-none text-secondary hover:text-secondary"
                  color="secondary"
                  onClick={(e: any) => {
                    // console.log("Cancelpayload", orderId);
                    if (document) {
                      document
                        .getElementById("openCancel")
                        ?.setAttribute("data-cy", orderId);
                    }
                    e.stopPropagation();
                    setOrderIds(orderId);
                    setOpenCancel(true);
                  }}
                >
                  Cancel Order
                </Button>
                {/* </DialogTrigger> */}
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogDescription>
                      <div
                        className={`w-full flex justify-center items-center`}
                      >
                        <Image
                          src="/images/wishlist/CancelS.png"
                          alt="cancel order"
                          width={70}
                          height={70}
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/product-placeholder.jpg";
                          }}
                          loading="lazy"
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
                      <div
                        className={`flex justify-${justify} items-center mt-6`}
                      >
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
                          onClick={() => handleSubmit(orderId)}
                        >
                          Submit
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      );

    case "delivered":
      return (
        <div className={`flex items-center justify-${justify}`}>
          {showReturnButton && (
            <>
              <Button
                variant="outline"
                className="!h-[35px] border-secondary text-secondary rounded-none hover:bg-white bg-white"
                color="orange"
                onClick={handleOpenReturn}
              >
                Request Return/Refund
              </Button>
              <CustomReturnPopup
                open={openReturn}
                onClose={handleCloseReturn}
                orderId={orderId}
              />
            </>
          )}
        </div>
      );

    default:
      return null;
  }
};

export default RenderButton;
