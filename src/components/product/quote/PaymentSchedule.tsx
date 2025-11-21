import useApi from "@/components/Fetcher/useAPI";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import dayjs from "dayjs";
import React from "react";
import toast from "react-hot-toast";
import { MdOutlineFileDownload } from "react-icons/md";
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
import useClient from "@/components/hooks/useClient";
const assetUrl = process.env.NEXT_PUBLIC_ASSET_URL;
export default function PaymentSchedule({ initialState, setIsLoading }: any) {
  const { refreshTokens } = useRefreshToken();
  const { callApi } = useApi();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedPayment, setSelectedPayment] = React.useState("");
  const isClient = useClient()

  function downloadInvoice(value: string) {
    if (value.length > 10) {
      window.open(`${assetUrl}/${value}`, "_blank");
    }
  }
  const buySubscription = async (data: any) => {
    // console.log("regToken", data);
    setIsLoading(true);
    const successPage = `${process.env.NEXT_PUBLIC_PROD_URL}/payment-success`;
    const failedPage = `${process.env.NEXT_PUBLIC_PROD_URL}/payment-failed`;

    const payloadData = {
      quoteId: data.quoteId,
      paymentId: data._id,
    };

    try {
      const result = (await callApi(
        "quotes/payQuotationAmount",
        "POST",
        payloadData
      )) as any;

      if (result.data == null) {
        handleBuyApiError(result?.errorData);
      } else {
        if (result.data == null) {
          handleBuyApiError(result?.errorData);
        } else {
          // toast.success('Redirecting you to the Payment page');
          const parser1 = new DOMParser();
          const doc1 = parser1.parseFromString(result.data, 'text/html');
          // Extract the form element
          const formElement = doc1.getElementById("payment_post") as HTMLFormElement | null;;
          if (!formElement) return
          // Get the action attribute
          const actionUrl = formElement?.action;
          // setDatas(result.data);
          // handleClose();
          // Create a new form element
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = actionUrl; // Update this with the action URL from the form in `result.data`

          // Parse the inputs from the `result.data` and append them to the form
          const parser = new DOMParser();
          const doc = parser.parseFromString(result.data, 'text/html');
          const inputs = doc.querySelectorAll('input');

          // Append all input fields to the newly created form
          inputs.forEach(input => {
            const clonedInput = document.createElement('input');
            clonedInput.type = 'hidden';
            clonedInput.name = input.name;
            clonedInput.value = input.value;
            form.appendChild(clonedInput);
          });

          // Append the form to the body
          document.body.appendChild(form);

          // Submit the form programmatically
          form.submit();
          // toast.success(
          //   "Registration Successful, redirecting you to the Payment page",
          //   {
          //     iconTheme: {
          //       primary: "#439787",
          //       secondary: "#FFFAEE",
          //     },
          //   }
          // );

          // // console.log(result.data)

          // document.open();
          // document.write(result?.data);
          // document.close();
        }
      }
    } catch (e) {
      handleBuyApiError(e);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBuyApiError = async (err: any) => {
    const result = err && err.response;
    // // console.log('errresult',err)
    if (result.status === 401) {
      await refreshTokens();
      // buySubscription()
      // toast.error('Unauthorized Request')
    } else if (result.status === 404) {
      toast.error("Invalid Request.");
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to send Reset Link"
      );
    }
  };

  function isDatePassed(dateString: string) {
    const inputDate = new Date(dateString);
    const today = new Date();

    // Set the time of today's date to midnight for accurate comparison
    today.setHours(0, 0, 0, 0);

    return inputDate < today;
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

  if (!isClient)
    return <></>

  return (
    <div className="mt-6">
      <h2 className="text-[15px] font-semibold text-[#2F2B3D] mb-3">
        Payment Schedule
      </h2>

      <div
        className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0px_2px_4px_0px_#0000001A]  overflow-y-auto scrollbar w-full"
        style={{ opacity: 1 }}
      >
        <table className="w-full border-collapse text-sm table-auto">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">Payment ID</th>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">Payment For</th>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">Note</th>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">Due Date</th>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">Amount</th>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">Status</th>
              <th className="py-3 px-4 text-left font-semibold text-[#2F2B3DB2]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {initialState.paymentsSchedule.map((payment: any, index: number) => (
              <tr key={index} className="border-b border-[#E5E7EB]">
                <td className="py-3 px-4 font-semibold text-[#2F2B3D]">
                  {payment.paymentScheduleId}
                </td>

                <td className="py-3 px-4 font-semibold text-[#2F2B3D]">
                  {payment.title}
                </td>

                <td className="py-3 px-4 text-[#6B7280] truncate max-w-[300px]">
                  {payment.notes ||
                    "Water-efficient toilet with dual flush mechanism........"}
                </td>

                <td className="py-3 px-4 font-semibold text-[#2F2B3D]">
                  {payment.due ? dayjs(payment.due).format("DD-MM-YYYY") : ""}
                </td>

                <td className="py-3 px-4 font-semibold text-[#009886]">
                  <span className="rupee">₹</span>{formatCurrencyInIndianStyle(payment.amount)}
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full
                    ${payment.paymentStatus === "COMPLETED"
                        ? "bg-[#E6F7F5] text-[#009886]"
                        : payment.paymentStatus === "AWAITING"
                          ? "bg-[#FFF4E5] text-[#F59E0B]"
                          : "bg-[#FCE7EB] text-[#B90647]"
                      }`}
                  >
                    {payment.paymentStatus === "COMPLETED"
                      ? "Paid"
                      : payment.paymentStatus === "AWAITING"
                        ? "Pending"
                        : "Failed"}
                  </span>
                </td>

                <td className="py-3 px-4">
                  {payment.paymentStatus === "COMPLETED" ? (
                    <button
                      onClick={() =>
                        downloadInvoice(
                          payment.paymentReceipt ||
                          "buyer/sample-invoice.pdf"
                        )
                      }
                      className="bg-[#B90647] text-white text-sm font-semibold px-4 py-2 rounded-[6px] hover:bg-[#9B314A] flex items-center gap-1"
                    >
                      <MdOutlineFileDownload size={18} />
                      Payment Receipt
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedPayment(payment);
                      }}
                      className="bg-[#B90647] text-white text-sm font-semibold px-4 py-2 rounded-[6px] hover:bg-[#9B314A]"
                    >
                      {payment.applicablePaymentMethod === "RTGS_NEFT"
                        ? "Click here for RTGS/NEFT Payment"
                        : "Pay Now"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={isOpen}>
        <AlertDialogContent className="max-w-md max-h-[100vh] overflow-auto">
          <AlertDialogHeader className="space-y-6">
            <AlertDialogTitle className="text-xl text-center text-[#B90647]">
              Choose your Payment Option
            </AlertDialogTitle>

            <div className="space-y-6">
              {/* Direct Bank Transfer Section */}
              <div className="space-y-4">
                <p className="text-gray-700">
                  For directly remitting to Hubeco Bank Account – please use the following bank details:
                </p>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-600">Account name</p>
                  <p className="font-semibold text-gray-900">
                    HUBECO GREEN VENTURES PRIVATE LIMITED
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-600">Account no</p>
                    <p className="font-semibold text-gray-900">99909705044055</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-600">IFSC Code</p>
                    <p className="font-semibold text-gray-900">HDFC0000317</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-full border-t border-gray-300" />
                <div className="relative px-4 bg-white">
                  <span className="text-sm text-gray-500 uppercase">or</span>
                </div>
              </div>

              {/* PayU Section */}
              <div className="space-y-4">
                <p className="text-gray-700">
                  Please use PayU Payment Gateway for initiating{" "}
                  {selectedPayment.applicablePaymentMethod === "RTGS_NEFT"
                    ? "RTGS/NEFT Transfer"
                    : "online payment methods"}
                </p>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    buySubscription(selectedPayment);
                  }}
                  className="w-full px-4 py-3 text-white bg-[#B90647] rounded-md hover:bg-[#a00539] transition-colors"
                >
                  {selectedPayment.applicablePaymentMethod === "RTGS_NEFT"
                    ? "Click here for RTGS/NEFT Payment"
                    : "Pay Now"}
                </button>
              </div>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex justify-center mt-2 underline">
            <AlertDialogCancel
              onClick={() => setIsOpen(false)}
              className="w-full h-12"
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );

}

{
  /* Payment Description */
}
{
  /* <AlertDescription className="text-xs text-blue-700 pt-4 ">
                  Payment can be directly sent to bank account or through online
                  payment methods
                </AlertDescription> */
}

// disabled={
//   isDatePassed(payment.due) ||
//   payment.paymentStatus == "COMPLETED"
// }
