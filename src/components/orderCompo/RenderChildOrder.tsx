"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import useApi from "@/components/Fetcher/useAPI";
// import useRefreshToken from "@/components/hooks/useRefreshToken";
import RenderButton from "./RenderButton";
import { normalizePath } from "@/lib/utils";

const statusInfo = {
  pending: { label: "Pending", color: "text-gray-500" },
  payment_success: { label: "Payment Success", color: "text-green-500" },
  payment_failed: { label: "Payment Failed", color: "text-red-500" },
  confirmed: { label: "Confirmed", color: "text-emerald-500" },
  rejected: { label: "Rejected", color: "text-red" },
  on_hold: { label: "On Hold", color: "text-yellow-500" },
  shipped: { label: "Shipped", color: "text-blue-400" },
  delivered: { label: "Delivered", color: "text-green-600" },
  cancelled: { label: "Cancelled", color: "text-gray-400" },
  return_requested: { label: "Return Requested", color: "text-orange-500" },
  return_rejected: { label: "Return Rejected", color: "text-red-500" },
  return_product_received: {
    label: "Return Product Received",
    color: "text-green-500",
  },
  returned: { label: "Returned", color: "text-green-500" },
  cancellation_requested: {
    label: "Cancellation Requested",
    color: "text-yellow-400",
  },
  cancellation_rejected: {
    label: "Cancellation Rejected",
    color: "text-red-500",
  },
  replacement_in_progress: {
    label: "Replacement in Progress",
    color: "text-yellow-500",
  },
  replacement_order_created: {
    label: "Replacement Order Created",
    color: "text-blue-500",
  },
  replacement_completed: {
    label: "Replacement Completed",
    color: "text-green-500",
  },
  refund_in_progress: {
    label: "Refund in Progress",
    color: "text-yellow-500",
  },
  refund_completed: { label: "Refund Completed", color: "text-green-500" },
  refund_accepted: { label: "Return Accepted", color: "text-green-500" },
  fulfilled: { label: "Fulfilled", color: "text-green-600" },
  ORDER_DELAYED: { label: "Order Delayed", color: "text-yellow-500" },
} as any;

const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

const RenderChildOrder = (order: any, orderLength: any) => {
  const [openCancel, setOpenCancel] = useState<boolean>(false);
  const [openReturn, setOpenReturn] = useState<boolean>(false);
  const { callApi } = useApi();
  const router = useRouter();

  const status = order?.order?.status as any;
  const { label, color } = statusInfo[status] || {
    label: status,
    color: "text-gray-500",
  };

  const calculateShippingDate = (numberOfDays: any) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + parseInt(numberOfDays, 10));
    return dayjs(futureDate).format("DD MMM YYYY");
  };

  const renderInfo = (data: any) => {
    if (data?.status === "payment_success" && data.shippingInDays) {
      return (
        <p className="text-sm text-black my-2 text-center w-full capitalize">
          Expected Shipping by {calculateShippingDate(data?.shippingInDays)}
        </p>
      );
    }
    if (data?.status === "shipped" && data?.shippingInfo) {
      return (
        <p className="text-sm text-black my-2 text-center w-full capitalize">
          {data?.shippingInfo} on {dayjs(data?.updatedAt).format("DD MMM YYYY")}
        </p>
      );
    }
    return null;
  };

  return (
    <div
      className={`flex flex-wrap sm:flex-nowrap justify-start items-center w-full pb-4 ${
        orderLength > 1 ? "border-b mb-6 border-borderGray pb-4" : ""
      }`}
    >
      {/* Product Section */}
      <div className="flex w-full sm:w-[45%] justify-start items-center">
        <div
          className={`min-w-[120px] flex justify-start items-center ${
            order?.order?.originalProduct?.slug ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={() =>
            order?.order?.originalProduct?.slug &&
            router.push(`/${order?.order?.originalProduct?.slug}`)
          }
        >
          <Image
            src={
              order?.order?.item?.productImage
                ? normalizePath(`${assetURL}/${order?.order?.item?.productImage}`)
                : "/images/product-placeholder.jpg"
            }
            className="object-cover h-[120px] w-[120px]"
            alt={order?.order?.item?.productName}
            width={120}
            height={120}
            onError={e => {
              e.currentTarget.src = '/images/product-placeholder.jpg'
            }}
            loading="lazy"
          />
        </div>
        <div className="ml-3">
          <p
            className="font-medium text-primary text-sm cursor-pointer mb-2"
            onClick={() => router.push(`/orders/c=${order?.order?._id}`)}
          >
            {order?.order?.orderId}
          </p>
          <p className="text-base text-black font-semibold w-full">
            {order?.order?.item?.productName}
          </p>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex flex-col w-full sm:w-[30%] justify-center items-start sm:items-center mt-4 sm:mt-0">
        {!order?.order?.isRFQOrder && (
          <p className="text-xl text-black font-semibold">
            ₹ {order?.order?.item?.totalPrice.toLocaleString("en-IN")} /-
          </p>
        )}
        <p className="text-sm text-fontGray mt-2">
          Quantity: {order?.order?.item?.quantity}
        </p>
      </div>

      {/* Status Section */}
      <div className="flex flex-col w-full sm:w-[25%] justify-center items-start sm:items-center mt-4 sm:mt-0">
        <div className="flex flex-row items-center mb-2">
          <FaCircle className={`text-xl ${color} mr-2`} size={10} />
          <p className={`text-md ${color} capitalize`}>
            {label.includes("_") ? label.split("_").join(" ") : label}
          </p>
        </div>
        {renderInfo(order?.order)}
        <div className="mt-2 w-full">
          <RenderButton orderId={order?.order?._id} order={order?.order} />
        </div>
      </div>
    </div>
  );
};

export default RenderChildOrder;
