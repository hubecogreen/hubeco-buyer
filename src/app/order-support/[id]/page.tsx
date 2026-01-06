// "use client";
// import ChatComponent from "@/components/contactSupportTemp/ChatComponent";
// import RefundNotification from "@/components/contactSupportTemp/RefundNotification ";
// import useApi from "@/components/Fetcher/useAPI";
// import useRefreshToken from "@/components/hooks/useRefreshToken";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import Image from "next/image";
// import * as getEndpoint from "@/network/EndPoints";
// import { IoCalendarOutline } from "react-icons/io5";
// import dayjs from "dayjs";
// import { FiPhoneCall } from "react-icons/fi";
// import OrderTimeline from "@/app/orders/[id]/components/OrderTimeline";

// export default function Page({ params }: any) {
//   const id = params?.id;
//   // console.log("check", id);
//   const [inChildOrder, setInChildOrder] = useState<boolean>(false);

//   useEffect(() => {
//     if (params?.id.includes("c%3D")) {
//       setInChildOrder(true);
//     }
//   }, []);

//   const [loading, setLoading] = useState(false);
//   const [orderData, setOrderData] = useState<any>([]);
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);

//   const router = useRouter();
//   const { refreshTokens } = useRefreshToken();
//   const { callApi } = useApi();
//   const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
//   const [cancelButtonLoading, setCancelButtonLoading] =
//     useState<boolean>(false);

//   useEffect(() => {
//     getOrderDetails();
//   }, []);

//   const handleApiError = async (err: any) => {
//     const result = err?.response;
//     if (result?.status === 400) {
//       toast.error("Order Not Found");
//     } else if (result?.status === 404) {
//       toast.error("Invalid Request");
//     } else if (result?.status === 401) {
//       await refreshTokens();
//       getOrderDetails();
//       // toast.error("Invalid Request");
//     } else {
//       toast.error(result?.data?.message);
//     }
//   };

//   const getOrderDetails = async () => {
//     setLoading(true);

//     try {
//       const result = (await callApi(
//         `${getEndpoint.default.SUPPORT_SUMMARY}/${id}`,
//         "GET"
//       )) as any;
//       if (result.data == null) {
//         handleApiError(result?.errorData);
//       } else {
//         if (result?.data == null) {
//           handleApiError(result?.errorData);
//         } else {
//           // console.log(
//             "check whether result is coming",
//             result.data.ticket.order
//           );
//           setOrderData(result?.data?.ticket?.order);
//           const orders = result?.data?.data[0]?.orders || [];
//           // console.log("check whether", orders);
//           // console.log("OrderDetails", result?.data?.data[0]);
//           // console.log("check order details", result?.data?.data[0]);
//           setSelectedOrder(result?.data?.data[0].orders[0]);
//         }
//       }
//     } catch (e) {
//       handleApiError(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <head>
//         <title>Order Support</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       </head>
//       <div className="category-section py-7 mx-auto pb-10 lg:px-24 md:px-12 px-2">
//         <div className="flex justify-between">
//           <h1 className="text-3xl font-bold py-5 mx-8 text-center md:text-left">
//             Chat Us Now
//           </h1>
//         </div>
//         <div className="flex flex-col-reverse sm:flex-col md:flex-col lg:grid lg:grid-cols-2">
//           <div className="flex flex-col gap-5 mt-3">
//             <ChatComponent />
//             <RefundNotification />
//           </div>
//           <div className="flex flex-col gap-5 md:pt-0">
//             <div className="w-full grid grid-cols-2 lg:grid-cols-2 gap-4 mt-3 md:flex md:flex-row md:justify-between md:items-start">
//               <div className="w-full shadow-md    border border-borderGray ">
//                         {/* Product Section Start */}
//                         <div className="flex justify-start items-center w-[80%]">
//                           <div
//                             className="min-w-[160px] flex justify-start items-center"
//                             onClick={() => router.push("/")}
//                           >
//                             <Image
//                               // src={`${assetURL}/${order?.orders[0]?.item?.productName}`}
//                               src={
//                                 order && order?.item?.productImage
//                                   ? (
//                                       assetURL + "/" + order &&
//                                       order?.item?.productImage
//                                     ).includes("//admin")
//                                     ? (
//                                         assetURL + "/" + order &&
//                                         order?.item?.productImage
//                                       ).replace("//admin", "/admin")
//                                     : `${assetURL}/${
//                                         order && order?.item?.productImage
//                                       }`
//                                   : "/images/product-placeholder.webp"
//                               }
//                               className="object-cover h-[135px] w-[160px] border border-borderGray"
//                               alt={"order details"}
//                               width={160}
//                               height={135}
//                             />
//                           </div>
//                           <div className="ml-3">
//                             <p className="font-medium text-primary text-sm cursor-pointer mb-3 flex justify-start items-center">
//                               #{order?.orderId}{" "}
//                               {inChildOrder ? (
//                                 <></>
//                               ) : (
//                                 <span
//                                   onClick={() =>
//                                     router.push(`/orders/c=${order?._id}`)
//                                   }
//                                   className="cursor-pointer text-sm text-secondary underline  rounded ml-5"
//                                 >
//                                   View Order
//                                 </span>
//                               )}
//                             </p>
//                             <p className="text-xl text-brown font-semibold w-full">
//                               {order?.item?.productName}
//                             </p>
//                             <p className="text-sm text-fontGray font-regular flex justify-start items-center mt-2">
//                               <IoCalendarOutline className="mr-2 text-fontGray" />

//                               {dayjs(order?.order?.createdAt).format(
//                                 "DD MMMM YYYY"
//                               )}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex flex-col justify-center items-center w-[20%]">
//                           <p className="text-xl text-brown font-semibold">
//                             <span
//                               className="text-brown text-xl"
//                               
//                             >
//                               {" "}
//                               ₹
//                             </span>{" "}
//                             {order?.item?.totalPrice} /-
//                           </p>
//                           <p className="text-sm text-fontGray font-regular flex justify-start items-center mt-2">
//                             Quantity : {order?.item?.quantity}
//                           </p>
//                           <div className="mt-2 w-full"></div>
//                         </div>
//                       </div>
//                 <div className="grid grid-cols-2 gap-3 md:flex md:flex-row md:justify-between md:items-start p-3 mb-6">
//                   <div className="w-[50%]">
//                     <p className="text-md text-brown font-semibold mb-2">
//                       Delivery To
//                     </p>
//                     <div className="flex flex-col justify-start items-center">
//                       <p className="text-[14px] text-brown font-regular mb-2">
//                         <span className="text-[14px] text-brown font-semibold">
//                           {" "}
//                           {orderData?.name}
//                         </span>
//                         ,{" "}
//                         {orderData?.cartId?.actualAddress
//                           ? orderData?.cartId?.actualAddress
//                           : orderData?.shippingAddress}
//                       </p>
//                       <p className="text-[14px] text-brown font-regular flex justify-start items-center mt-2 w-full">
//                         <FiPhoneCall
//                           size={15}
//                           className="text-secondary mr-3"
//                         />{" "}
//                         {orderData?.phoneNumber}
//                       </p>
//                       {orderData?.alternateNumber && (
//                         <p className="text-[14px] text-brown font-regular flex justify-start items-center mt-2 w-full">
//                           <FiPhoneCall
//                             size={15}
//                             className="text-secondary mr-3 "
//                           />{" "}
//                           {orderData?.alternateNumber}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="w-[40%]">
//                     <p className="text-md text-brown font-semibold  mb-2">
//                       Cost Summary
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <p className="text-md text-brown font-regular">
//                         SubTotal
//                       </p>
//                       <p className="text-md text-brown font-regular">
//
//                           {" "}
//                           ₹
//                         </span>{" "}
//                         {orderData?.cartId?.cost?.price}
//                       </p>
//                     </div>
//                     <div className="flex justify-between items-center mt-2">
//                       <p className="text-md text-brown font-regular">
//                         Delivery Charges
//                       </p>
//                       <p className="text-md text-brown font-regular">
//                         <span
//                           className="text-brown text-lg"
//                           style={{ fontWeight: "400", fontFamily: "monospace" }}
//                         >
//                           {" "}
//                           ₹
//                         </span>{" "}
//                         {orderData?.cartId?.cost?.deliveryCharges}
//                       </p>
//                     </div>
//                     <div className="flex justify-between items-center mt-2">
//                       <p className="text-md text-brown font-regular">Total</p>
//                       <p className="text-md text-secondary font-semibold ">
//                         <span
//                           className="text-secondary text-lg"
//                           style={{ fontWeight: "400", fontFamily: "monospace" }}
//                         >
//                           {" "}
//                           ₹
//                         </span>{" "}
//                         {orderData?.cartId?.cost?.totalCost}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-full my-4 p-3">
//                   <p className="text-md text-brown font-semibold">
//                     Order Instructions
//                   </p>
//                   <p className="text-md text-brown font-regular">
//                     {orderData?.cartId?.orderInstructions}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full p-3  border border-borderGray shadow-md">
//               <p className="text-lg text-brown font-semibold pl-3 mb-3">
//                 Shipping Activity
//               </p>
//               <OrderTimeline
//                 history={selectedOrder && selectedOrder?.history}
//                 cancelHistory={
//                   selectedOrder && selectedOrder?.cancellationHistory
//                 }
//                 orderType={selectedOrder && selectedOrder?.status}
//               />
//             </div>
//           </div>
//         </div>
//   );
// }

"use client";
// import ChatComponent from "@/components/contactSupportTemp/ChatComponent";
import useApi from "@/components/Fetcher/useAPI";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import * as getEndpoint from "@/network/EndPoints";
import { IoCalendarOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { FiPhoneCall } from "react-icons/fi";
import { CircularProgress } from "@chakra-ui/react";
import ViewMore from "@/components/product/quote/ViewMore";
import ChatBox from "@/app/quote-request/components/ChatBox";
import { normalizePath } from "@/lib/utils";

export default function Page({ params }: any) {
  const id = params?.id;
  const [inChildOrder, setInChildOrder] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>([]);
  const [transactionData, setTransactionData] = useState<any>([]);
  const [ticketData, setTicketData] = useState<any>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const router = useRouter();
  const { refreshTokens } = useRefreshToken();
  const { callApi } = useApi();
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const [cancelButtonLoading, setCancelButtonLoading] =
    useState<boolean>(false);

  useEffect(() => {
    if (params?.id.includes("c%3D")) {
      setInChildOrder(true);
    }
  }, [params?.id]);

  useEffect(() => {
    getOrderDetails();
  }, []);

  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Order Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getOrderDetails();
    } else {
      // toast.error(result?.data?.message);
    }
  };

  const getOrderDetails = async () => {
    setLoading(true);

    try {
      const result = (await callApi(
        `${getEndpoint.default.SUPPORT_SUMMARY}/${id}`,
        "GET"
      )) as any;
      if (result?.data == null) {
        handleApiError(result?.errorData);
      } else {
        setOrderData(result?.data?.ticket?.order);
        // console.log('chechhh',result?.data?.ticket?.transactions)
        setTransactionData(result?.data?.ticket?.transactions)
        setTicketData(result?.data?.ticket);
        const orders = result?.data?.data[0]?.orders || [];
        setSelectedOrder(orders[0]);
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      setLoading(false);
    }
  };

  function formatCurrencyInIndianStyle(amount: number): string {
    // Round to two decimal places
    const roundedAmount = Math.round(amount * 100) / 100;

    // Determine whether to show decimals
    const options: Intl.NumberFormatOptions =
      roundedAmount % 1 === 0
        ? {} // No decimals if the number is whole
        : { minimumFractionDigits: 2, maximumFractionDigits: 2 };

    // Format in Indian numbering style
    return new Intl.NumberFormat('en-IN', options).format(roundedAmount);
  }

  function isCompleted(data: any) {
    // console.log('data is completed', data)
    if (data == "CLOSED") {
      return false
    }
    return true
  }

  if (loading) {
    return (
      <div className="w-full text-center flex items-center justify-center">
        <CircularProgress
          isIndeterminate
          color="#A92449"
          className="text-secondary"
          size={30}
        />
      </div>
    );
  }

  return (
    <>
      <head>
        <title>Order Support</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <div className="bg-cream category-section py-7 mx-auto pb-10 lg:px-24 md:px-12 px-2">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold py-5 mx-8 text-center md:text-left">
            Chat with us now
          </h1>
        </div>
        <div className="flex flex-col-reverse sm:flex-col md:flex-col lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-5 mt-1">
            {/* <div
              className="absolute inset-0 bg-gray-600 bg-opacity-60 flex items-center justify-center text-primary text-xl font-semibold"
             
            >
              Coming Soon
            </div> */}
            <ChatBox
              transactionList={transactionData}
              sender={{ name: "User1", displayImage: "" }}
              receiver={{ name: "Hubeco - Support", displayImage: "/images/Admin-2.webp" }}
              chatEndPoint="customerSupport/getCSChats"
              roomEndPoint="customerSupport/getOrCreateRoom"
              refer="Support"
              width="[640px]"
              canChat={isCompleted(ticketData?.status)}
              closeText="You will no longer be able to chat once the ticket is closed"
              height="96"
            />
            {/* <RefundNotification /> */}
          </div>
          <div className="flex flex-col gap-1 md:mt-3 border border-primary">
            <div className="w-full shadow-md border border-borderGray">
              <div className="md:flex  block justify-between bg-cream">
                <div className="md:flex block md:justify-start justify-center items-center md:w-[80%] w-full">
                  <div
                    className="min-w-[160px] md:flex block md:justify-start justify-center ml-[6rem] md:ml-0 items-center"
                  // onClick={() => router.push("/")}
                  >
                    <Image
                      // src={
                      //   orderData?.item?.productImage
                      //     ? (
                      //       assetURL +
                      //       "/" +
                      //       orderData?.item?.productImage
                      //     ).includes("//admin")
                      //       ? (
                      //         assetURL +
                      //         "/" +
                      //         orderData?.item?.productImage
                      //       ).replace("//admin", "/admin")
                      //       : `${assetURL}/${orderData?.item?.productImage}`
                      //     : "/images/product-placeholder.webp"
                      // }
                      src={
                        orderData?.item?.productImage
                          ? normalizePath(`${assetURL}/${orderData.item.productImage}`)
                          : "/images/product-placeholder.webp"
                      }
                      className="object-cover h-[135px] w-[160px] border border-borderGray"
                      alt={"order details"}
                      width={160}
                      height={135}
                      onError={e => {
                        e.currentTarget.src = '/images/product-placeholder.webp'
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-primary text-sm cursor-pointer mb-3 flex md:justify-start justify-center items-center">
                      {orderData?.orderId}{" "}
                      {!inChildOrder && (
                        <span
                          onClick={() =>
                            router.push(`/orders/c=${orderData?._id}`)
                          }
                          className="cursor-pointer text-sm text-secondary underline rounded ml-5"
                        >
                          View Order
                        </span>
                      )}
                    </p>
                    <p className="text-xl text-brown font-semibold w-full flex md:justify-start justify-center">
                      {orderData?.item?.productName}
                    </p>
                    <p className="text-sm text-fontGray font-regular flex md:justify-start justify-center items-center mt-2">
                      <IoCalendarOutline className="mr-2 text-fontGray" />
                      {dayjs(orderData?.order?.createdAt).format(
                        "DD MMMM YYYY"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center md:w-[20%] w-full">
                  <p className="text-xl text-brown font-semibold flex md:justify-start justify-center">
                  <span className="text-brown text-xl font-normal font-mono">

                      ₹
                    </span>{" "}
                    {formatCurrencyInIndianStyle(orderData?.item?.totalPrice)} /-
                  </p>
                  <p className="text-sm text-fontGray font-regular flex md:justify-start justify-center items-center mt-2">
                    Quantity: {orderData?.item?.quantity}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 md:flex md:justify-between md:items-start p-3 mb-6">
              <div className="md:w-[50%] w-full">
                <p className="text-md text-brown font-semibold mb-2">
                  Delivery To
                </p>
                <div className="flex flex-col justify-start items-center">
                  <p className="text-[14px] text-brown font-regular mb-2">
                    <span className="text-[14px] text-brown font-semibold">
                      <ViewMore text={orderData?.name} length={35} />
                    </span>
                    {" "}
                    {orderData?.cartId?.actualAddress
                      ? orderData?.cartId?.actualAddress
                      : orderData?.shippingAddress}
                  </p>
                  <p className="text-[14px] text-brown font-regular flex justify-start items-center mt-2 w-full">
                    <FiPhoneCall size={15} className="text-secondary mr-3" />{" "}
                    {orderData?.phoneNumber}
                  </p>
                  {/* {orderData?.alternateNumber && (
                    <p className="text-[14px] text-brown font-regular flex justify-start items-center mt-2 w-full">
                      <FiPhoneCall size={15} className="text-secondary mr-3" />{" "}
                      {orderData?.alternateNumber}
                    </p>
                  )} */}
                </div>
              </div>
              <div className="md:w-[40%] w-full">
                <p className="text-md text-brown font-semibold mb-2">
                  Cost Summary
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-md text-brown font-regular">SubTotal</p>
                  <p className="text-md text-brown font-regular">
                  <span className="text-brown text-lg font-normal font-mono">

                      ₹
                    </span>{" "}
                    {formatCurrencyInIndianStyle(orderData?.item?.unitPrice * orderData?.item?.quantity)}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-md text-brown font-regular">
                    Delivery Charges
                  </p>
                  <p className="text-md text-brown font-regular">
                  <span className="text-brown text-lg font-normal font-mono">

                      ₹
                    </span>{" "}
                    {orderData?.item?.deliveryCharges || 0}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-md text-brown font-regular">Total Price</p>
                  <p className="text-md text-brown font-regular">
                  <span className="text-brown text-lg font-normal font-mono">

                      ₹
                    </span>{" "}
                    {formatCurrencyInIndianStyle(orderData?.item?.totalPrice || 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full p-3">
              <p className="text-md text-brown font-semibold">
                Order Instructions
              </p>
              <p className="text-md text-brown font-regular">
                {orderData?.orderInstructions || "No instructions Provided"}
              </p>
            </div>
            <div className="w-full p-3">
              <p className="text-md text-brown font-semibold pb-2">
                Ticket Information
              </p>
              <p className="text-sm text-brown font-regular pb-1">
                <strong>Ticket ID:</strong> {ticketData?.ticketId || "-"}
              </p>
              <p className="text-sm text-brown font-regular pb-1">
                <strong>Status:</strong> {ticketData?.status?.replace(/_/g, ' ') || "-"}
              </p>
              <p className="text-sm text-brown font-regular pb-1">
                <strong>Description:</strong> {ticketData?.description || "-"}
              </p>
            </div>
            {/* <OrderTimeline /> */}
          </div>
          {/* <div className="w-full md:w-[600px] md:ml-[30px] mx-4 my-4">
              <div className="w-full    p-3  border border-borderGray shadow-md">
                <p className="text-lg text-brown font-semibold pl-3 mb-3">
                  Shipping Activity
                </p>
                <OrderTimeline
                  history={orderData && orderData?.history}
                  cancelHistory={
                    orderData && orderData?.cancellationHistory
                  }
                  orderType={orderData && orderData?.status}
                />
              </div>
            </div> */}
        </div>
      </div>
    </>
  );
}
