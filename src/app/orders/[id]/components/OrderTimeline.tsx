import ViewMore from "@/components/product/quote/ViewMore";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { MdOutlineFileDownload } from "react-icons/md";
// import { reject } from "lodash";

const statusInfo = {
  payment_success: {
    label: "Payment Success",
    color: "text-[#367874]",
    hex: "#367874",
  },
  payment_pending: {
    label: "Payment in progress",
    color: "text-[#367874]",
    hex: "#367874",
  },
  confirmed: { label: "Confirmed", color: "text-[#367874]", hex: "#367874" },
  rejected: { label: "Rejected", color: "text-[#367874]", hex: "#367874" },
  shipped: { label: "Shipped", color: "text-[#367874]", hex: "#367874" },
  delivered: { label: "Delivered", color: "text-[#367874]", hex: "#367874" },
  cancelled: { label: "Cancelled", color: "text-[#367874]", hex: "#367874" },
  returned: { label: "Returned", color: "text-[#367874]", hex: "#367874" },
  return_product_received: {
    label: "Return Product Received",
    color: "text-[#367874]",
    hex: "#367874",
  },
  refund_in_progress: {
    label: "Refund in Progress",
    color: "text-[#367874]",
    hex: "#367874",
  },
  refund_completed: {
    label: "Refund Completed",
    color: "text-[#367874]",
    hex: "#367874",
  },
  refund_accepted: {
    label: "Return Accepted",
    color: "text-[#367874]",
    hex: "#367874",
  },
  replacement_order_created: {
    label: "Replacement Order Created",
    color: "text-[#367874]",
    hex: "#367874",
  },
  replacement_in_progress: {
    label: "Replacement In Progress",
    color: "text-[#367874]",
    hex: "#367874",
  },
  replacement_completed: {
    label: "Replacement Completed",
    color: "text-[#367874]",
    hex: "#367874",
  },
  cancellation_requested: {
    label: "Cancellation Requested",
    color: "text-[#367874]",
    hex: "#367874",
  },
  cancellation_rejected: {
    label: "Cancellation Rejected",
    color: "text-[#367874]",
    hex: "#367874",
  },
  return_requested: {
    label: "Return Requested",
    color: "text-[#367874]",
    hex: "#367874",
  },
  return_rejected: {
    label: "Return Rejected",
    color: "text-[#367874]",
    hex: "#367874",
  },
  ORDER_DELAYED: {
    label: "Order Delayed",
    color: "text-[#367874]",
    hex: "#367874",
  },
  order_created: {
    label: "Order Created",
    color: "text-[#367874]",
    hex: "#367874",
  },
  refund_processed: {
    label: "Refund Processed",
    color: "text-[#367874]",
    hex: "#367874",
  },
  payment_failed: {
    label: "Payment Failed",
    color: "text-[#367874]",
    hex: "#367874",
  },
  completed: { label: "Completed", color: "text-[#367874]", hex: "#367874" },
  return_initiated: {
    label: "Return Initiated",
    color: "text-[#367874]",
    hex: "#367874",
  },
} as any;

const flowSequences = {
  // default: ["payment_success", "confirmed", "shipped", "delivered"],
  order_created: ["payment_success", "confirmed", "shipped", "delivered"],
  payment_pending: [
    "payment_pending",
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
  ],
  ORDER_DELAYED: [
    "payment_success",
    "confirmed",
    "shipped",
    "ORDER_DELAYED",
    "delivered",
  ],
  cancellation_requested: ["payment_success", "cancellation_requested"],
  cancelled: ["payment_success", "cancellation_requested", "cancelled"],
  order_cancelled: ["payment_failed", "cancelled"],
  rejected: ["payment_success", "rejected"],
  refund: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "returned",
    "refund_accepted",
    "return_product_received",
    "refund_in_progress",
    "refund_completed",
  ],
  replacement: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "returned",
    "return_product_received",
    "replacement_order_created",
    "replacement_in_progress",
    "replacement_completed",
  ],
  return_requested: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "return_requested",
  ],
  return_rejected: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "return_requested",
    "return_rejected",
  ],
  payment_failed: ["payment_failed"],
  refund_accepted: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "return_requested",
    "refund_accepted",
  ],
  refund_processed_rejected: [
    "payment_success",
    "rejected",
    "refund_processed",
  ],
  refund_processed_cancelled: [
    "payment_success",
    "cancellation_requested",
    "cancelled",
    "refund_processed",
  ],
  refund_processed_return_product_received: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "return_requested",
    "return_initiated",
    "return_product_received",
    "refund_processed",
  ],
  refund_processed_refund_processed: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "return_requested",
    "return_initiated",
    "return_product_received",
    "refund_processed",
  ],
  refund_processed_return_initiated: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "return_requested",
    "return_initiated",
    "return_product_received",
    "refund_processed",
  ],
  return_product_received: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "return_requested",
    "return_initiated",
    "return_product_received",
  ],
  refund_in_progress: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "return_requested",
    "refund_accepted",
    "return_product_received",
    "refund_in_progress",
  ],
  refund_completed: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "return_requested",
    "refund_accepted",
    "return_product_received",
    "refund_in_progress",
    "refund_completed",
  ],
  shipped: ["payment_success", "confirmed", "shipped", "delivered"],
  confirmed: ["payment_success", "confirmed", "shipped", "delivered"],
  payment_success: ["payment_success", "confirmed", "shipped", "delivered"],
  completed: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "completed",
  ],
  delivered: ["payment_success", "confirmed", "shipped", "delivered"],
  return_initiated: [
    "payment_success",
    "confirmed",
    "shipped",
    "delivered",
    "return_requested",
    "return_initiated",
  ],
} as any;

interface TimelineProps {
  history: any[];
  orderType: string;
  cancelHistory: any[];
  order?: any;
}

const OrderTimeline: React.FC<TimelineProps> = ({
  history = [],
  orderType,
  cancelHistory = [],
  order,
}) => {
  if (orderType === "cancelled") {
    if (cancelHistory && cancelHistory?.length > 0) {
      orderType = "cancelled";
    } else {
      orderType = "order_cancelled";
    }
  }
  if (
    orderType == "refund_processed" &&
    Array.isArray(cancelHistory) &&
    cancelHistory[cancelHistory.length - 1]?.status == "refund_processed"
  ) {
    // console.log("coming here");
    orderType = `${orderType}_cancelled`;
  } else if (orderType == "refund_processed") {
    console.log("coming here 2");
    orderType = `${orderType}_${history[history.length - 1]?.currentStatus}`;
  }
  const flow = flowSequences[orderType] || (flowSequences.default as any);

  return (
    <div className="relative flex flex-col pl-4 py-4">
      {/* Left vertical line spanning the entire timeline */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>

      {flow &&
        flow.map((statusKey: any, index: any) => {
          const status =
            history?.find((s: any) => s.currentStatus === statusKey) || {};

          const isCompleted = history?.some(
            (s: any) =>
              s.currentStatus === statusKey || orderType.includes(statusKey)
          );
          const { label, color, hex } = statusInfo[statusKey] || {
            label: "Unknown Status",
            color: "text-gray-500",
          };

          const cancelData =
            cancelHistory?.find((s: any) => s.status === statusKey) || {};
          const cancelledData =
            cancelHistory?.find(
              (s: any) => s.status === "cancellation_rejected"
            ) || {};

          // console.log("vsbrn64j7n5u", cancelData, statusKey);

          return (
            <div key={statusKey} className="relative flex items-start min-h-20">
              {/* Status Icon and Connector Line */}
              <div className="relative flex flex-col items-center">
                {/* Dot for each status */}
                <div
                  style={{ backgroundColor: isCompleted ? hex : "#D1D5DB" }}
                  className={`w-4 h-4 rounded-full mt-1  ${
                    isCompleted ? "bg-[" + hex + "]" : "bg-gray-300"
                  }`}
                />

                {/* Line connecting the dots (if not the last item) */}
                {index < flow.length - 1 && (
                  <div
                    style={{ backgroundColor: isCompleted ? hex : "#D1D5DB" }}
                    className={`mt-[12px] absolute top-4 left-1/2 w-px ${statusKey} ${
                      statusKey == "cancellation_requested"
                        ? "h-24"
                        : status.previousStatus == "cancellation_requested" &&
                          status.currentStatus == "confirmed"
                        ? "h-28"
                        : "h-12"
                    } ${isCompleted ? "bg-[" + hex + "]" : "bg-gray-300"}`}
                  />
                )}
              </div>

              {/* Status Details */}
              <div className="ml-3 pb-3">
                <p
                  className={`font-medium  ${
                    isCompleted ? color : "text-black opacity-50"
                  }`}
                >
                  {label}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {/* {status.timestamp ? dayjs(status.timestamp).format("dddd, MMM D, hh:mm A") : ""} */}

                  {/* {status?.reason ? status?.reason : ""} {status?.reason && status?.timestamp && (<span className="lowercase">on</span>)} {status.timestamp ? dayjs(status.timestamp).format("dddd, MMM D, hh:mm A") : ""} */}
                  {status?.reason ? status?.reason : ""}
                  {status?.reason &&
                    (status?.actualTimeStamp || status?.timestamp) && (
                      <span className="lowercase"> on </span>
                    )}
                  {status?.actualTimeStamp
                    ? dayjs(status.actualTimeStamp).format("DD MMMM YYYY")
                    : status?.timestamp
                    ? dayjs(status.timestamp).format("DD MMMM YYYY")
                    : ""}
                </p>
                {statusKey == "cancellation_requested" && (
                  <p className="text-sm text-gray-500 capitalize bg-[#f7f7f7] p-3 rounded h-full mt-1">
                    {/* {status.timestamp ? dayjs(status.timestamp).format("dddd, MMM D, hh:mm A") : ""} */}

                    <span className="text-sm font-medium text-black">
                      Reason :{" "}
                    </span>
                    <ViewMore
                      text={cancelData?.reason}
                      length={40}
                      className="md:w-full "
                    />
                  </p>
                )}
                {status.previousStatus == "cancellation_requested" &&
                  status.currentStatus == "confirmed" && (
                    <p className="text-sm text-gray-500 capitalize bg-[#f7f7f7] p-3 rounded h-full mt-1">
                      <span className="text-sm font-medium text-black">
                        Reason :{" "}
                      </span>
                      <ViewMore
                        text={cancelledData?.reason}
                        length={40}
                        className="md:w-full "
                      />
                    </p>
                  )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrderTimeline;
