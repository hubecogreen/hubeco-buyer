"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { IoCalendarOutline } from "react-icons/io5";
import useApi from "@/components/Fetcher/useAPI";
import useRefreshToken from "@/components/hooks/useRefreshToken";
// import toast from "react-hot-toast";
// import * as getEndpoint from "../../../network/EndPoints";
import RenderChildOrder from "@/components/orderCompo/RenderChildOrder";

interface OrderProps {
  order: any;
  reloadPage: () => void;
}

export default function OrderRow({ order, reloadPage }: OrderProps) {
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const router = useRouter();
  const orderLength = order?.orders?.length;
  const [cancelButtonLoading, setCancelButtonLoading] = useState<boolean>(false);
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();

  const onClickView = () => {
    router.push(`/orders/${order?._id}`);
  };

  function formatCurrencyInIndianStyle(amount: number): string {
    const roundedAmount = Math.round(amount * 100) / 100;
    const options: Intl.NumberFormatOptions =
      roundedAmount % 1 === 0
        ? {}
        : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    return new Intl.NumberFormat("en-IN", options).format(roundedAmount);
  }

  return (
    <div className="border border-primary w-full mb-2 rounded bg-cream">
      <div className="w-full flex flex-wrap md:flex-nowrap justify-start items-center mb-4 bg-cream border  p-3 rounded">
        {/* Product Section Start */}
        <div className="w-full md:w-[50%] flex flex-col md:flex-row justify-between items-center">
          <div className={`${order?.orderType == "RFQ" ? "w-[60%]" : "w-full"} mb-4 md:mb-0`}>
            <p className="font-medium text-primary text-sm flex items-center justify-start">
              <span className="text-brown text-sm font-medium mr-2">ORDER:</span>
              {order?.mainOrderId}
              <span
                onClick={onClickView}
                className="cursor-pointer text-sm text-secondary underline rounded ml-5"
              >
                View Order
              </span>
            </p>
            <p className="text-sm text-fontGray flex justify-start items-center mt-2">
              <IoCalendarOutline className="mr-2 text-fontGray" />
              {dayjs(order?.updatedAt).format("DD MMMM YYYY")}
            </p>
          </div>
          {order?.orderType == "RFQ" && (
            <div className="w-full md:w-[40%] flex justify-start items-center">
              <p className="font-medium text-primary text-sm flex items-center">
                <span className="text-brown text-sm font-medium mr-2">ORDER TYPE:</span>
                <span className="text-sm text-primary rounded ml-2">{order?.orderType}</span>
              </p>
            </div>
          )}
        </div>
        {/* Product Section End */}

        {/* Price Section Start */}
        <div className="w-full md:w-[45%] flex flex-col md:flex-row justify-between lg:items-center">
          <p className="text-sm text-brown font-medium mb-2 md:mb-0">
            <span className="text-sm font-regular mr-2">Payment Mode:</span>
            {order?.orders[0]?.payment === "Pay U payment gateway" ? "PayU" : order?.orders[0]?.payment}
          </p>
          <p className="text-lg text-brown font-semibold">
            <span className="text-sm font-medium mr-2">Total Amount:</span>  <span className="text-brown text-lg font-normal font-monospace mr-1">

                        {" "}
                        ₹
                      </span>{" "}
            {formatCurrencyInIndianStyle(order?.totalAmount)}
          </p>
        </div>
        {/* Price Section End */}
      </div>

      {/* Order Items Start */}
      {order && order.orders.length > 0 && (
        <div className={`w-full ${orderLength > 1 ? "px-4 pt-4" : "p-4"}`}>
          {order?.orders?.map((item: any, index: number) => (
            <RenderChildOrder key={index} order={item} orderLength={orderLength} />
          ))}
        </div>
      )}
      {/* Order Items End */}
    </div>
  );
}
