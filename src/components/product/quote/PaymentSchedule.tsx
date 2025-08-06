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

  if(!isClient)
    return <></>

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-lg font-bold mb-4">Payment Schedule</h2>
        {/* <div className="flex flex-col space-y-1 p-3 rounded-md m-3 !bg-secondaryBg">
          <div>
            <p className="text-sm font-medium text-blue-600">Account name</p>
            <p className="font-semibold text-gray-900 text-base">
              HUBECO GREEN VENTURES PRIVATE LIMITED
            </p>
          </div>

          <div className="flex space-x-6">
            <div>
              <p className="text-sm font-medium text-blue-600">Account no</p>
              <p className="font-semibold text-gray-900">99909705044055</p>
            </div>

            <div>
              <p className="text-sm font-medium text-blue-600">IFSC Code</p>
              <p className="font-semibold text-gray-900">HDFC0000317</p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="bg-gray-100 rounded-md overflow-y-auto scrollbar w-full">
        <table className="w-full table-auto">
          <thead className=" bg-secondaryBg  text-left">
            <tr>
              <th className="p-6">Payment ID</th>
              <th className="p-2">Payment For</th>
              <th className="p-2">Note</th>
              <th className="p-2">Payment Due Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Payment Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {initialState.paymentsSchedule.map(
              (payment: any, index: React.Key | null | undefined) => (
                <tr key={index} className="border-t">
                  <td className="p-5 pl-5 font-bold w-44">
                    {payment.paymentScheduleId}
                  </td>
                  <td className="p-2 font-semibold w-60">{payment.title}</td>
                  <td className="p-2 font-semibold w-60">{payment.notes}</td>
                  <td className="p-2 font-semibold w-60">
                    {(payment.due && dayjs(payment.due).format("DD-MM-YYYY")) ||
                      ""}
                  </td>
                  <td className="p-2 font-semibold w-44">
                    {" "}
                    <span className="text-xl font-normal font-mono">

                      {" "}
                      ₹
                    </span>
                    {formatCurrencyInIndianStyle(payment.amount)}
                  </td>
                  <td
                    className={`p-2 font-semibold capitalize w-44 ${
                      payment.paymentStatus == "AWAITING"
                        ? "text-yellow-500"
                        : payment.paymentStatus == "COMPLETED"
                        ? "text-[#009886]"
                        : payment.paymentStatus == "INITIATED"
                        ? "text-yellow-700"
                        : "text-[#B90647]"
                    }`}
                  >
                    {payment.paymentStatus == "AWAITING"
                      ? "Pending"
                      : payment.paymentStatus == "COMPLETED"
                      ? "Paid"
                      : payment.paymentStatus == "INITIATED"
                      ? "Initiated"
                      : "Failed"}
                  </td>
                  <td className="p-2 w-44">
                    {payment.paymentStatus == "COMPLETED" ? (
                      <>
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col">
                            {/* <span className="text-[#009886]">Paid</span> */}
                            <ul className="text-xs text-[#2E2E2EB8]">
                              {/** Apply grid to each list item */}
                              <li className="whitespace-nowrap font-bold">
                                Transaction Id:{" "}
                                <span className="whitespace-pre-wrap font-normal">
                                  {" "}
                                  {payment.transactionId}
                                </span>
                              </li>
                              <li className="whitespace-nowrap font-bold">
                                Payment Mode:{" "}
                                <span className="whitespace-pre-wrap font-normal">
                                  {" "}
                                  {payment.paymentMode}
                                </span>
                              </li>
                              <li className="whitespace-nowrap font-bold">
                                Payment Date:{" "}
                                <span className="whitespace-pre-wrap font-normal">
                                  {dayjs(payment.completedAt).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="w-full h-8 border-2 border-[#b90647] flex items-center justify-center cursor-pointer">
                            <button
                              onClick={() =>
                                downloadInvoice(
                                  payment.paymentReceipt ||
                                    "buyer/ab53b5a7-80b2-4bbb-b44c-7439e6f938d5/invoice-d7311495-7fb4-4114-a333-43e7b98eda17-quote-order"
                                )
                              }
                              className="flex items-center justify-center"
                            >
                              <MdOutlineFileDownload
                                className="text-[#b90647]"
                                size={20}
                              />
                              <span className="flex px-2 text-[13px] text-secondary">
                                Payment Receipt
                              </span>
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* <div>
                          <p className="whitespace-nowrap"> Account name</p>
                          <p className="whitespace-nowrap font-semibold">
                            HUBECO GREEN VENTURES PRIVATE LIMITED
                          </p>
                          <p className="whitespace-nowrap"> Account no: </p>
                          <p className="whitespace-nowrap font-semibold">
                            99909705044055
                          </p>
                          <p className="whitespace-nowrap"> IFSC Code: </p>
                          <p className="whitespace-nowrap font-semibold">
                            HDFC0000317
                          </p>
                        </div> */}
                        <button
                          onClick={() => {
                            setIsOpen(true);
                            setSelectedPayment(payment);
                            // buySubscription(payment);
                          }}
                          // disabled={
                          //   isDatePassed(payment.due) ||
                          //   payment.paymentStatus == "COMPLETED"
                          // }
                          className={`bg-[#B90647] w-full text-xs text-white px-4 py-2 `}
                        >
                         {payment.applicablePaymentMethod  =="RTGS_NEFT"  ? <p> Click here for RTGS/NEFT Payment </p> : <p>
                          Pay Now</p>}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-md max-h-[100vh] overflow-auto">
        <AlertDialogHeader className="space-y-6">
          <AlertDialogTitle className="text-xl text-center text-[#B90647] ">
          Choose your Payment Option
          </AlertDialogTitle>
          
          <div className="space-y-6">
            {/* Direct Bank Transfer Section */}
            <div className="space-y-4">
              <p className="text-gray-700">For directly remitting to Hubeco Bank Account – please use the following bank details:</p>
              
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
              <p className="text-gray-700">Please use PayU Payment Gateway for initiating  {selectedPayment.applicablePaymentMethod  =="RTGS_NEFT" ?`RTGS/NEFT Transfer` : `online payment methods`  }</p>
              
              <button
                onClick={() => {
                  setIsOpen(true);
                  buySubscription(selectedPayment);
                }}
                className={`w-full px-4 py-3 text-white bg-[#B90647] rounded-md hover:bg-[#a00539] transition-colors
                  ${false ? "opacity-50 cursor-not-allowed" : ""}`}
                
              >
                 {selectedPayment.applicablePaymentMethod  =="RTGS_NEFT"  ? <p> Click here for RTGS/NEFT Payment </p> : <p>
                  Pay Now</p>}
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
