import React from "react";

const RefundNotification = () => {
  return (
    <div className="w-full sm:w-[100%] lg:w-[90%] bg-purple-50 p-4 rounded-lg my-5 mx-auto">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-[#F9A31A] text-lg sm:text-xl font-semibold">
            Refund Processed
          </span>
          <span className="text-brown text-sm sm:text-xl font-semibold py-2 sm:py-5">
            (Refund ID: 121029944548654748172)
          </span>
        </div>

        <p className="text-[#2E2E2EB8] text-xs sm:text-sm">
          Your refund is being processed. It should reflect{" "}
          <span className="text-brown">
            in your bank account within 3-5 business days
          </span>{" "}
          (excluding bank holidays)
        </p>
      </div>
    </div>
  );
};

export default RefundNotification;
