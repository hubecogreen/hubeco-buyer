"use client";

import React from "react";

import animationData from "../../../public/animations/payment-success.json";
import useApi from "../../components/Fetcher/useAPI";
import { useDispatch } from "react-redux";
// import {
//   saveRefreshToken,
//   saveToken,
//   setUser,
// } from "../../reduxStore/slices/userSlice";
import { deleteCookie, setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
// import CustomButton from "../../components/customButton/CustomButton";
// import { CircularProgress, Divider } from "@chakra-ui/react";
// import { set } from "lodash";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import * as getEndpoint from "@/network/EndPoints";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import LottieWrapper from "@/components/LottieWrapper";

const PaymentSuccessful = () => {
  const { callApi } = useApi();
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [time, setTime] = React.useState<number>(6);
  const [orderId, setOrderId] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [orderData, setOrderData] = React.useState<any>(null);
  const dispatch = useDispatch();
  const [isPendingScreen, setIsPendingScreen] = React.useState<boolean>(false);
  const router = useRouter();
  const { refreshTokens } = useRefreshToken();

  React.useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    const txnId = urlParam.get("orderId") as string;
    const intent = urlParam.get("intent") as string;
    setOrderId(txnId);
    setStatus(intent);
    getOrderDetails(txnId);
    setCookie("CartCount", 0);
    const isPending = urlParam.get("PG_TYPE");
    // NEFTRTGS-PG: PayU bank transfer; paymentStatus=pending: Cashfree not confirmed yet
    if (isPending == "NEFTRTGS-PG" || urlParam.get("paymentStatus") === "pending") {
      setIsPendingScreen(true);
    }
  }, []);

  // Count down, then take the buyer to the order they just placed; replace()
  // keeps this page out of history so Back doesn't return to it
  React.useEffect(() => {
    if (time <= 0) {
      router.replace(orderId ? `/orders/${orderId}` : "/orders");
      return;
    }
    const timer = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, router, orderId]);

  const handleApiError = async (err: any, id: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Order Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getOrderDetails(id);
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const getOrderDetails = async (orderIdV: any) => {
    setLoading(true);

    try {
      const result = (await callApi(
        `${getEndpoint.default.ORDERHISTORY}?${
          orderIdV.includes("c%3D")
            ? "childOrderId=" + orderIdV.replace("c%3D", "")
            : "orderId=" + orderIdV
        }`,
        "GET"
      )) as any;
      if (result.data == null) {
        handleApiError(result?.errorData, orderIdV);
      } else {
        if (result?.data == null) {
          handleApiError(result?.errorData, orderIdV);
        } else {
          // console.log("OrderDetails", result?.data?.data[0]);
          setOrderData(result?.data?.data[0]);
        }
      }
    } catch (e) {
      handleApiError(e, orderIdV);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  md:h-screen pb-16 bg-green-50 text-center">
      <div>
        <div className="mb-1">
          <LottieWrapper
            animationData={animationData}
            loop={true}
            className="w-64 h-64 mx-auto"
          />
          <h4 className="font-bold text-primary mb-4 md:text-3xl text-xl">
          {!isPendingScreen?"Thank you for your order!":"Thank you for you order!"}
          </h4>
          <p className="text-brown max-w-[480px] mx-auto">
           { !isPendingScreen ?"We appreciate your purchase! Your order has been successfully placed and is now being processed.":"Thank you for your purchase! Your order has been successfully placed, and payment is being processed. You’ll receive an email update shortly."}
          </p>
        </div>

        <div className=" max-w-[280px] mx-auto my-4">
          <div className="mb-2 flex  items-center max-w-[280px]">
            <p className="text-brown font-medium text-md text-left w-[150px]">
              Order ID
            </p>
            <p className="text-primary font-medium text-md text-left  w-[150px] flex justify-start items-center">
              {" "}
              {orderData?.mainOrderId ? orderData?.mainOrderId : ""}
            </p>
          </div>
          <div className="mb-2 flex  items-center max-w-[280px]">
            <p className="text-brown font-medium text-md text-left w-[150px]">
              Total Amount
            </p>
            <p className="text-primary font-medium text-md text-left flex items-center  w-[150px]">
              {" "}
              <span className="text-lg text-[#01B6A3] mr-1 font-normal font-mono">

                {" "}
                ₹
              </span>{" "}
              {orderData?.totalAmount ? orderData?.totalAmount : ""}
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            className="bg-primary !text-white hover:bg-primary px-2 font-medium "
            onClick={() => router.push(`/orders/${orderId}`)}
          >
            Track Your Order
          </Button>
        </div>
        <p className="text-brown text-sm mt-4">
          Redirecting to your order in {Math.max(time, 0)} second{time === 1 ? "" : "s"}...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
