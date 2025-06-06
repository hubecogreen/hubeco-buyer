import dayjs from "dayjs";

const statusInfo = {
  payment_success: {
    label: "Payment Success",
    color: "text-[#367874]",
    hex: "#367874",
  },
  confirmed: { label: "Confirmed", color: "text-[#367874]", hex: "#367874" },
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
} as any;

const flowSequences = {
  default: ["payment_success", "confirmed", "shipped", "delivered"],
  cancelled: ["payment_success", "cancellation_requested", "cancelled"],
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
} as any;

interface TimelineProps {
  history: any[];
  orderType: string;
}

const CancellationHistory: React.FC<TimelineProps> = ({
  history = [],
  orderType,
}) => {
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
            (s: any) => s.currentStatus === statusKey
          );
          const { label, color, hex } = statusInfo[statusKey] || {
            label: "Unknown Status",
            color: "text-gray-500",
          };

          // console.log('vsbrn64j7n5u',status)

          return (
            <div key={statusKey} className="relative flex items-start h-20">
              {/* Status Icon and Connector Line */}
              <div className="relative flex flex-col items-center">
                {/* Dot for each status */}
                <div
                  className={`w-4 h-4 rounded-full mt-1 ${
                    isCompleted ? `bg-[${hex}]` : "bg-gray-300"
                  }`}
                />

                {/* Line connecting the dots (if not the last item) */}
                {index < flow.length - 1 && (
                  <div
                    className={`mt-[12px] absolute top-4 left-1/2 w-px h-12 ${
                      isCompleted ? `bg-[${hex}]` : "bg-gray-300"
                    }`}
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
                  {status?.reason ? status?.reason : ""}{" "}
                  {status?.reason && status?.timestamp && (
                    <span className="loawercase">on</span>
                  )}{" "}
                  {status.timestamp
                    ? dayjs(status.timestamp).format("dddd, MMM D, hh:mm A")
                    : ""}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CancellationHistory;
