"use client";
import BannerSection from "@/components/sharedComponents/BannerSection";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
// import { FaCircle } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCalendarOutline } from "react-icons/io5";
import dayjs from "dayjs";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import useApi from "@/components/Fetcher/useAPI";
import toast from "react-hot-toast";
import * as getEndpoint from "@/network/EndPoints";
import { FiPhoneCall } from "react-icons/fi";
// import CustomButton from "@/components/customButton/CustomButton";
// import CustomInput from "@/components/customInput/CustomTextField";
import OrderTimeline from "./components/OrderTimeline";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import CancellationHistory from "./components/CancellationHistory";
import EmptyOrders from "../components/EmptyOrders";
import CustomTicketPopup from "@/components/support/CustomPopup";
import RenderButton from "@/components/orderCompo/RenderButton";
import { MdOutlineFileDownload } from "react-icons/md";
import ViewMore from "@/components/product/quote/ViewMore";
import QuotePaymentH from "./components/QuotePayment";
import useClient from "@/components/hooks/useClient";
import useGetBuyer from "@/components/hooks/useGetBuyer";
import { normalizePath } from "@/lib/utils";

export default function OrdersPage({ params }: any) {
  const id = params?.id;
  const [inChildOrder, setInChildOrder] = useState<boolean>(false);
  const [childOrderId, setChildOrderId] = useState<string>("");
  const [openPopup, setOpenPopup] = useState(false);
  const isClient = useClient();

  useEffect(() => {
    if (params?.id.includes("c%3D")) {
      setInChildOrder(true);
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>([]);
  const [openCancel, setOpenCancel] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [cancelReasonError, setCancelReasonError] = useState<string>("");
  const [openReturn, setOpenReturn] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderType, setOrderType] = useState<string>("");

  const router = useRouter();
  const { refreshTokens } = useRefreshToken();
  const { callApi } = useApi();
  const { getBuyer } = useGetBuyer();
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const [returnReason, setReturnReason] = useState<string>("");
  const [returnReasonError, setReturnReasonError] = useState<string>("");
  const [returnType, setReturnType] = useState<string>("");
  const [cancelButtonLoading, setCancelButtonLoading] =
    useState<boolean>(false);
  const [orderNotFound, setOrderNotFound] = useState<boolean>(false);

  useEffect(() => {
    getOrderDetails();
  }, []);

  useEffect(() => {
    getBuyer();
  }, []);

  const buyerUserInfo = sessionStorage.getItem("buyerUserInfo");
  const buyer = buyerUserInfo ? JSON.parse(buyerUserInfo) : null;
  console.log("check data", buyer?.buyerInfo?.buyerType);

  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Order Not Found");
      setOrderNotFound(true);
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getOrderDetails();
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const getOrderDetails = async () => {
    setLoading(true);

    try {
      const result = (await callApi(
        `${getEndpoint.default.ORDERHISTORY}?${
          id.includes("c%3D")
            ? "childOrderId=" + id.replace("c%3D", "")
            : "orderId=" + id
        }`,
        "GET"
      )) as any;
      if (result.data == null) {
        handleApiError(result?.errorData);
      } else {
        if (result?.data == null) {
          handleApiError(result?.errorData);
        } else {
          // console.log("OrderDetails", result?.data?.data[0]);
          setOrderData(result?.data?.data[0]);

          // console.log("check order details", result?.data?.data[0]);
          setSelectedOrder(result?.data?.data[0].orders[0]);
        }
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      setLoading(false);
    }
  };

  // // console.log("check details", orderData?._id);

  const handleCancelApiError = async (err: any, id: any) => {
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
      // toast.error("Order Not Found");
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
      handleSubmit(id);
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const handleSubmit = async (orderId: any) => {
    setCancelButtonLoading(true);
    var now = dayjs();
    const payload = {
      orderId: orderId,
      reason: cancelReason,
      timeStamp: now,
    };
    // console.log("dvdsvsdf", payload);
    try {
      const result = (await callApi(
        getEndpoint.default.CANCELORDER,
        "POST",
        payload
      )) as any;
      if (result.data == null) {
        handleCancelApiError(result?.errorData, orderId);
      } else {
        toast.success("Order Cancelled Successfully");
        // reloadPage();
      }
    } catch (e: any) {
      handleCancelApiError(e, orderId);
    } finally {
      setCancelButtonLoading(false);
      setOpenCancel(false);
      setCancelReason("");
    }
  };

  const handleDownload = async (url: string, customFileName: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
  
      const blob = await response.blob();
  
      // Use provided custom file name
      const fileName = customFileName || url.split("/").pop() || "downloaded-file";
  
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(blobUrl);
    } catch (error: any) {
      // As fallback, open in a new tab
      window.open(url, "_blank");
      // console.error("Download failed:", error?.message);
    }
  };

  const handleTicketOpenPopup = () => setOpenPopup(true);
  const handleTicketClosePopup = () => setOpenPopup(false);
  const onClickImage = (slug: any) => {
    if (slug) {
      router.push(`/${slug}`);
    } else {
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
    return new Intl.NumberFormat("en-IN", options).format(roundedAmount);
  }

  // console.log("neww orders and all", selectedOrder);

  if (!isClient) return <></>;

  return (
    <div className="bg-white min-h-screen">
      <head>
        <title>Order Details : {orderData?.mainOrderId}</title>
        {/* <meta name="description" content={blogData?.metaDescriptions} />
        <meta name="keywords" content={blogData?.metaKeywords} />
        <meta name="author" content={blogData?.author.firstName} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "My Orders", href: "/orders" }}
        link3={{ name: orderData?.mainOrderId, href: "" }}
      />
      {orderNotFound ? (
        <>
          <EmptyOrders />
        </>
      ) : (
        <div className="container mx-auto p-5 md:p-10">
          {/* Order Id Section Start */}
          <div className="block w-full md:flex justify-between items-center ">
            <div className="md:w-[60%] w-full flex justify-between items-center ">
              <p className="text-brown font-bold text-2xl">
                Order No. {orderData?.mainOrderId}
              </p>
              {/* <p className="text-secondary font-bold text-md pr-2">
              <span className="text-brown font-medium text-md mr-2">Payment Mode :</span> PayU */}
              {/* {orderData?.orders[0]?.payment==='Pay U payment gateway'?'PayU':orderData?.orders[0]?.payment} */}
              {/* </p> */}
            </div>
            <div>
              {/* <Button
              variant={"outline"}
              className="text-secondary font-medium text-lg border-secondary rounded-none"
            >
              Return Order
            </Button> */}
              <p className="text-secondary font-bold text-md pr-2">
                <span className="text-brown font-medium text-md mr-2">
                  Payment Mode :
                </span>{" "}
                PayU
                {/* {orderData?.orders[0]?.payment==='Pay U payment gateway'?'PayU':orderData?.orders[0]?.payment} */}
              </p>
            </div>
          </div>
          {/* Order Id Section End */}
          {/* Order Details Grid Start */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3 lg:flex lg:flex-row lg:justify-between lg:items-start">
            <div className=" lg:w-[60%] w-full">
              <div className="w-full shadow-md    border border-borderGray   ">
                {orderData &&
                  orderData?.orders &&
                  orderData?.orders.length > 0 &&
                  orderData?.orders.map((order: any, index: any) => {
                    // console.log("wqfwegrt", order);
                    const status = order?.status;

                    if (inChildOrder) {
                      if (id.replace("c%3D", "") === order?._id) {
                        // console.log(
                        //   "InChildOrder",
                        //   order,
                        //   id.replace("c%3D", "")
                        // );

                        return (
                          <div
                            key={index}
                            className={`${
                              orderData?.orders.length > 0 &&
                              "border-b border-borderGray"
                            } ${
                              selectedOrder?._id === order?._id
                                ? "bg-secondaryBg"
                                : ""
                            } p-4 w-full flex justify-start items-center  `}
                            onClick={() => {
                              setSelectedOrder(order);
                            }}
                          >
                            {/* Product Section Start */}
                            <div className="flex justify-start items-center w-[75%]">
                              <div
                                className="min-w-[160px] flex justify-start items-center"
                                onClick={() =>
                                  onClickImage(
                                    order?.originalProduct?.variants[0]?.slug
                                  )
                                }
                              >
                                <Image
                                  // src={`${assetURL}/${order?.orders[0]?.item?.productName}`}
                                  // src={
                                  //   order && order?.item?.productImage
                                  //     ? (
                                  //         assetURL + "/" + order &&
                                  //         order?.item?.productImage
                                  //       ).includes("//admin")
                                  //       ? (
                                  //           assetURL + "/" + order &&
                                  //           order?.item?.productImage
                                  //         ).replace("//admin", "/admin")
                                  //       : `${assetURL}/${
                                  //           order && order?.item?.productImage
                                  //         }`
                                  //     : "/images/product-placeholder.webp"
                                  // }
                                  src={
                                    order?.item?.productImage
                                      ? normalizePath(`${assetURL}/${order.item.productImage}`)
                                      : "/images/product-placeholder.webp"
                                  }
                                  className="object-cover h-[135px] w-[160px] border border-borderGray cursor-pointer"
                                  alt={"order details"}
                                  width={160}
                                  height={135}
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/images/failedToLoadImage.webp";
                                  }}
                                  loading="lazy"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="flex flex-row justify-start items-center mb-2 ">
                                  <p className="font-medium text-primary text-sm cursor-pointer flex justify-start items-center">
                                    {order?.orderId}{" "}
                                    {inChildOrder ? (
                                      <></>
                                    ) : (
                                      <span
                                        onClick={() =>
                                          router.push(`/orders/c=${order?._id}`)
                                        }
                                        className="text-sm text-secondary underline  rounded ml-5"
                                      >
                                        View Order
                                      </span>
                                    )}
                                  </p>
                                  {/* {order?.buyerInvoiceLink && (
                                <Button variant={'outline'} className="ml-3 !py-0 w-fit !h-[35px] !px-2 border-secondary text-secondary rounded-none bg:white hover:bg-white" ><MdOutlineFileDownload color="#9B314A" /> Download Invoice</Button>
                              )} */}
                                </div>
                                <p className="text-xl text-brown font-semibold w-full">
                                  {/* {order?.order?.item?.productName} */}
                                  {order?.item?.productName}
                                </p>
                                <p className="text-sm text-fontGray font-regular flex justify-start items-center mt-2">
                                  <IoCalendarOutline className="mr-2 text-fontGray" />

                                  {dayjs(order?.order?.createdAt).format(
                                    "DD MMMM YYYY"
                                  )}
                                </p>
                                {order?.buyerInvoiceLink && (
                                  <Button
                                    onClick={() =>
                                      // window.open(`${assetURL}/${order?.buyerInvoiceLink}`, "_blank")
                                      handleDownload(
                                        `${assetURL}/${order?.buyerInvoiceLink}`, `Hubeco Invoice_${order?.orderId}`
                                      )
                                    }
                                    variant={"outline"}
                                    className="mt-2 !py-0 w-fit !h-[35px] !px-2 border-secondary text-secondary rounded-none bg:white hover:bg-white hover:text-secondary"
                                  >
                                    <MdOutlineFileDownload color="#9B314A" />{" "}
                                    Download Invoice
                                  </Button>
                                )}
                              </div>
                            </div>
                            {/* Product Section End */}
                            {/* Price Section Start */}

                            <div className="flex flex-col justify-end items-end w-[25%]">
                              {order?.isRFQOrder ? (
                                <></>
                              ) : (
                                <>
                                  <p className="text-xl text-brown font-semibold pt-7">
                                    <span className="text-brown text-xl font-normal font-mono">
                                      {" "}
                                      ₹
                                    </span>{" "}
                                    {formatCurrencyInIndianStyle(
                                      order?.item?.totalPrice
                                    )}{" "}
                                    /-
                                    {/* {order?.totalAmount}  */}
                                  </p>
                                </>
                              )}
                              <p className="text-sm text-fontGray font-regular flex justify-start items-center mt-3">
                                Quantity : {order?.item?.quantity}
                              </p>
                              {order?.creditNoteInfo?.creditNoteLink && (
                                <div className="flex md:justify-start mobile-sm:justify-center mt-2">
                                  <Button
                                    onClick={() =>
                                      // window.open(`${assetURL}/${order?.buyerInvoiceLink}`, "_blank")
                                      handleDownload(
                                        `${assetURL}/${order?.creditNoteInfo?.creditNoteLink}`, `Hubeco Credit Note_${order?.creditNoteInfo?.creditNoteNumber}`
                                      )
                                    }
                                    variant={"outline"}
                                    className="mt-2 !py-0 w-fit !h-[35px] !px-2 border-secondary text-secondary rounded-none bg:white hover:bg-white hover:text-secondary "
                                  >
                                    <MdOutlineFileDownload color="#9B314A" />{" "}
                                    Download Credit Note
                                  </Button>
                                </div>
                              )}
                              <div
                                className={`mt-2 w-full flex justify-end items-center `}
                              >
                                <RenderButton
                                  orderId={order?._id}
                                  order={order}
                                />
                              </div>
                            </div>
                            {/* Price Section End */}
                          </div>
                        );
                      } else {
                        return null;
                      }
                    } else {
                      return (
                        <div
                          key={index}
                          className={`${
                            orderData?.orders.length > 0 &&
                            "border-b border-borderGray"
                          } ${
                            selectedOrder?._id === order?._id
                              ? "bg-secondaryBg"
                              : ""
                          } p-4 w-full md:flex block justify-start items-center  `}
                          onClick={() => {
                            setSelectedOrder(order);
                          }}
                        >
                          {/* Product Section Start */}
                          <div className="block md:flex md:justify-start justify-center items-center md:w-[80%] w-full">
                            <div
                              className="min-w-[160px] flex md:justify-start justify-center items-center"
                              // onClick={() => router.push("/")}
                              onClick={() =>
                                router.push(
                                  `/${order?.originalProduct?.variants[0]?.slug}`
                                )
                              }
                            >
                              <Image
                                // src={`${assetURL}/${order?.orders[0]?.item?.productName}`}
                                // src={
                                //   order && order?.item?.productImage
                                //     ? (
                                //         assetURL + "/" + order &&
                                //         order?.item?.productImage
                                //       ).includes("//admin")
                                //       ? (
                                //           assetURL + "/" + order &&
                                //           order?.item?.productImage
                                //         ).replace("//admin", "/admin")
                                //       : `${assetURL}/${
                                //           order && order?.item?.productImage
                                //         }`
                                //     : "/images/product-placeholder.webp"
                                // }
                                src={
                                  order?.item?.productImage
                                    ? normalizePath(`${assetURL}/${order.item.productImage}`)
                                    : "/images/product-placeholder.webp"
                                }
                                className="object-cover h-[135px] w-[160px] border border-borderGray cursor-pointer"
                                alt={"order details"}
                                width={160}
                                height={135}
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/images/failedToLoadImage.webp";
                                }}
                                loading="lazy"
                              />
                            </div>
                            <div className="ml-3">
                              <p className="font-medium text-primary text-sm cursor-pointer mb-3 flex md:justify-start justify-center items-center">
                                {order?.orderId}{" "}
                                {inChildOrder ? (
                                  <></>
                                ) : (
                                  <span
                                    onClick={() =>
                                      router.push(`/orders/c=${order?._id}`)
                                    }
                                    className="cursor-pointer text-sm text-secondary underline  rounded ml-5"
                                  >
                                    View Order
                                  </span>
                                )}
                              </p>
                              <p className="text-xl text-brown font-semibold w-full flex md:justify-start justify-center items-center ">
                                {/* {order?.order?.item?.productName} */}
                                {order?.item?.productName}
                              </p>
                              <p className="text-sm text-fontGray font-regular flex md:justify-start justify-center items-center mt-2">
                                <IoCalendarOutline className="mr-2 text-fontGray" />

                                {dayjs(order?.order?.createdAt).format(
                                  "DD MMMM YYYY"
                                )}
                              </p>
                              {order?.buyerInvoiceLink && (
                                <div className="flex md:justify-start mobile-sm:justify-center">
                                  <Button
                                    onClick={() =>
                                      // window.open(`${assetURL}/${order?.buyerInvoiceLink}`, "_blank")
                                      handleDownload(
                                        `${assetURL}/${order?.buyerInvoiceLink}`, `Hubeco Invoice_${order?.orderId}`
                                      )
                                    }
                                    variant={"outline"}
                                    className="mt-2 !py-0 w-fit !h-[35px] !px-2 border-secondary text-secondary rounded-none bg:white hover:bg-white hover:text-secondary "
                                  >
                                    <MdOutlineFileDownload color="#9B314A" />{" "}
                                    Download Invoice
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Product Section End */}
                          {/* Price Section Start */}
                          <div className="md:flex block flex-col justify-end items-end md:w-[25%]">
                            {order?.isRFQOrder ? (
                              <></>
                            ) : (
                              <>
                                <p className="text-xl text-brown font-semibold  flex md:justify-start justify-center pt-7">
                                  <span className="text-brown text-xl font-normal font-mono">
                                    {" "}
                                    ₹
                                  </span>{" "}
                                  {formatCurrencyInIndianStyle(
                                    order?.item?.totalPrice
                                  )}{" "}
                                  /-
                                  {/* {order?.totalAmount}  */}
                                </p>
                              </>
                            )}
                            <p className="text-sm text-fontGray font-regular flex md:justify-start justify-center items-center md:mt-3">
                              Quantity: {order?.item?.quantity}
                            </p>
                            {order?.creditNoteInfo?.creditNoteLink && (
                              <div className="flex md:justify-start mobile-sm:justify-center mt-2">
                                <Button
                                  onClick={() =>
                                    // window.open(`${assetURL}/${order?.buyerInvoiceLink}`, "_blank")
                                    handleDownload(
                                      `${assetURL}/${order?.creditNoteInfo?.creditNoteLink}`, `Hubeco Credit Note_${order?.creditNoteInfo?.creditNoteNumber}`
                                    )
                                  }
                                  variant={"outline"}
                                  className="mt-2 !py-0 w-fit !h-[35px] !px-2 border-secondary text-secondary rounded-none bg:white hover:bg-white hover:text-secondary "
                                >
                                  <MdOutlineFileDownload color="#9B314A" />{" "}
                                  Download Credit Note
                                </Button>
                              </div>
                            )}
                            <div className="mt-2 w-full justify-end">
                              <RenderButton
                                orderId={order?._id}
                                order={order}
                                justify="end"
                              />
                            </div>
                          </div>
                          {/* Price Section End */}
                        </div>
                      );
                    }
                  })}

                {/* Address Section Start */}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3 md:flex md:flex-row md:justify-between md:items-start p-3 mb-6">
                  <div
                    className={`${
                      selectedOrder?.isRFQOrder === true
                        ? "w-full"
                        : "md:w-[50%] w-full"
                    }`}
                  >
                    <p className="text-md text-brown font-semibold mb-2">
                      Delivery To
                    </p>
                    <div className="flex flex-col justify-start items-start">
                      <p className="text-[14px] text-brown font-normal mb-2 ruby">
                        <span className="text-[14px] text-brown font-semibold">
                          <ViewMore text={orderData?.name} length={35} />
                        </span>
                        {/* ,{" "} */}
                        {orderData?.cartId?.actualAddress
                          ? orderData?.cartId?.actualAddress
                          : orderData?.orders?.[0].shippingAddress.includes("|")
                          ? orderData?.orders?.[0].shippingAddress?.replaceAll(
                              "|",
                              ", "
                            )
                          : orderData?.orders?.[0].shippingAddress}
                      </p>
                    </div>

                    <div className="flex flex-col justify-start items-start">
                      <p className="text-[14px] text-brown font-regular mb-2">
                        <span className="text-[14px] text-brown font-semibold">
                          {" "}
                          Billing Address :
                        </span>{" "}
                        {orderData?.cartId?.billingAddress
                          ? orderData?.cartId?.billingAddress?.includes("|")
                            ? orderData?.cartId?.billingAddress?.replaceAll(
                                "|",
                                ", "
                              )
                            : orderData?.cartId?.billingAddress
                          : orderData?.orders?.[0].billingAddress.includes("|")
                          ? orderData?.orders?.[0].billingAddress?.replaceAll(
                              "|",
                              ", "
                            )
                          : orderData?.orders?.[0].billingAddress}
                      </p>
                    </div>
                    <p
                      className="text-[14px] text-brown font-regular flex justify-start items-center mt-2 w-full cursor-pointer"
                      onClick={() =>
                        router.push(`tel:${orderData?.phoneNumber}`)
                      }
                    >
                      <FiPhoneCall size={15} className="text-secondary mr-3" />{" "}
                      {orderData?.phoneNumber}
                    </p>
                    {orderData?.alternateNumber !== orderData?.phoneNumber && (
                      <p
                        className="text-[14px] text-brown font-regular flex justify-start items-center mt-2 w-full cursor-pointer"
                        onClick={() =>
                          router.push(`tel:${orderData?.alternateNumber}`)
                        }
                      >
                        <FiPhoneCall
                          size={15}
                          className="text-secondary mr-3 "
                        />{" "}
                        {orderData?.alternateNumber}
                      </p>
                    )}
                    <div className="w-fit flex justify-center items-center">
                      {" "}
                      {selectedOrder?.purchaseOrder && (
                        <Button
                          onClick={() =>
                            // window.open(`${assetURL}/${order?.buyerInvoiceLink}`, "_blank")
                            handleDownload(
                              `${assetURL}/${selectedOrder?.purchaseOrder}`,buyer?.buyerInfo?.buyerType === 'B2B' ? `Purchase Order ${selectedOrder?.purchaseOrderNumber}` : `Order ${selectedOrder?.purchaseOrderNumber}`
                            )
                          }
                          variant={"outline"}
                          className="mt-2 !py-0 w-fit !h-[35px] !px-2 border-secondary text-secondary rounded-none bg:white hover:bg-white hover:text-secondary"
                        >
                          {buyer?.buyerInfo?.buyerType === "B2C" ? (
                            <>
                              <MdOutlineFileDownload color="#9B314A" />
                              Download Order
                            </>
                          ) : (
                            <>
                              <MdOutlineFileDownload color="#9B314A" />
                              Download Purchase Order
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  {inChildOrder ? (
                    <>
                      {" "}
                      <div
                        className={`${
                          selectedOrder?.isRFQOrder === true
                            ? "hidden"
                            : "md:w-[40%] w-full"
                        }`}
                      >
                        <p className="text-md text-brown font-semibold  mb-2">
                          Total Order Summary
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-md text-brown font-regular">
                            SubTotal
                          </p>
                          <p className="text-md text-brown font-regular">
                            <span className="text-brown text-lg font-mono font-normal">
                              {" "}
                              ₹
                            </span>{" "}
                            {formatCurrencyInIndianStyle(
                              Number(
                                selectedOrder?.item?.buyerTaxes
                                  ?.applicableUnitPrice
                              ) * Number(selectedOrder?.item?.quantity)
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-md text-brown font-regular">
                            Tax Amount
                          </p>
                          <p className="text-md text-brown font-normal ruby">
                            <span className="text-brown text-lg font-mono font-normal">
                              {" "}
                              ₹
                            </span>{" "}
                            {formatCurrencyInIndianStyle(
                              selectedOrder?.item?.tax
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-md text-brown font-regular">
                            Delivery Charges
                          </p>
                          <p className="text-md text-brown font-normal ruby">
                            <span className="text-brown text-lg font-normal font-mono">
                              {" "}
                              ₹
                            </span>{" "}
                            {formatCurrencyInIndianStyle(
                              selectedOrder?.item?.deliveryCharges
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-md text-brown font-regular">
                            Total
                          </p>
                          <p className="text-md text-secondary font-semibold ">
                            <span className="text-secondary text-lg font-normal font-mono">
                              {" "}
                              ₹
                            </span>{" "}
                            {formatCurrencyInIndianStyle(
                              selectedOrder?.item?.totalPrice
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`${
                          selectedOrder?.isRFQOrder === true
                            ? "hidden"
                            : "md:w-[40%] w-full"
                        }`}
                      >
                        <p className="text-md text-brown font-semibold  mb-2">
                          Total Order Summary
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-md text-brown font-regular">
                            SubTotal
                          </p>
                          <p className="text-md text-brown font-regular">
                            <span className="text-brown text-lg font-normal font-mono">
                              {" "}
                              ₹
                            </span>{" "}
                            {formatCurrencyInIndianStyle(
                              orderData?.cartId?.cost?.price -
                                orderData?.cartId?.cost?.taxes
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-md text-brown font-regular">
                            Tax Amount
                          </p>
                          <p className="text-md text-brown font-normal ruby">
                            <span className="text-brown text-lg font-normal font-monospace">
                              {" "}
                              ₹
                            </span>{" "}
                            {formatCurrencyInIndianStyle(
                              orderData?.cartId?.cost?.taxes
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-md text-brown font-regular">
                            Delivery Charges
                          </p>
                          <p className="text-md text-brown font-normal ruby">
                            <span className="text-brown text-lg font-mono font-normal">
                              {" "}
                              ₹
                            </span>{" "}
                            {formatCurrencyInIndianStyle(
                              orderData?.cartId?.cost?.deliveryCharges
                            )}
                          </p>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-md text-brown font-regular">
                              Total
                            </p>
                            <p className="text-md text-secondary font-semibold ">
                              <span className="text-secondary text-lg font-mono font-normal">
                                {" "}
                                ₹
                              </span>{" "}
                              {formatCurrencyInIndianStyle(
                                orderData?.cartId?.cost?.totalCost
                              )}
                            </p>
                          </div>
                          {orderData?.cartId?.cost?.roundedValue !== 0 && (
                            <p className="text-brown w-full text-start text-xs font-regular">
                              {" "}
                              Amount rounded off to{" "}
                              <span className="text-brown text-xs font-mono font-normal mr-0">
                                ₹
                              </span>
                              <span>
                                {orderData?.cartId?.cost?.roundedValue}*
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {/* <div className={`${selectedOrder?.isRFQOrder===true ?'hidden': 'w-[40%]'}`}>
                  <p className="text-md text-brown font-semibold  mb-2">
                    Total Order Summary
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-md text-brown font-regular">SubTotal</p>
                    <p className="text-md text-brown font-regular">
                      
                        {" "}
                        ₹
                      </span>{" "}
                      {formatCurrencyInIndianStyle(orderData?.cartId?.cost?.price)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-md text-brown font-regular">
                      Delivery Charges
                    </p>
                   
                        {" "}
                        ₹
                      </span>{" "}
                      {formatCurrencyInIndianStyle(orderData?.cartId?.cost?.deliveryCharges)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-md text-brown font-regular">Total</p>
                    <p className="text-md text-secondary font-semibold ">
                      
                        {" "}
                        ₹
                      </span>{" "}
                      {formatCurrencyInIndianStyle(orderData?.cartId?.cost?.totalCost)}
                    </p>
                  </div>
                </div> */}
                </div>
                {/* Address Section End */}
                {/* Order Instructions Start */}
                {orderData?.cartId?.orderInstructions && (
                  <div className="w-full my-4 p-3">
                    <p className="text-md text-brown font-semibold">
                      Order Instructions
                    </p>
                    <p className="text-md text-brown font-regular">
                      {orderData?.cartId?.orderInstructions}
                    </p>
                  </div>
                )}

                {/* Order Instructions End */}

                {/* Contact Support Policy Section Start */}
                <div className="flex justify-between">
                  <div className="w-fit flex justify-center items-center bg-secondaryBg my-4 ml-3 p-3 rounded">
                    <p className="flex justify-start items-center text-md text-brown">
                      Have an issue with this order?{" "}
                      <span
                        className="ml-2 text-secondary font-medium cursor-pointer"
                        onClick={handleTicketOpenPopup}
                      >
                        {" "}
                        Contact Support
                      </span>
                      <CustomTicketPopup
                        open={openPopup}
                        onClose={handleTicketClosePopup}
                        // onSubmit={handleTicketClosePopup}
                        submitLoading={false}
                        orderData={orderData}
                      />
                    </p>
                  </div>
                </div>

                {/* Contact Support Policy Section End */}
              </div>

              {/* Refund Intitae  Section Start */}
              {selectedOrder && selectedOrder?.refundDetails && (
                <div className="w-full my-4 p-3 bg-[#F4F4F4] py-8 px-4 rounded ">
                  <p className="text-md text-[#EDA740] font-semibold">
                    Refund Processed
                    <span className="ml-2 text-brown font-medium cursor-pointer">
                      (Refund ID :{" "}
                      {selectedOrder?.refundDetails?.mihpayid
                        ? `${selectedOrder?.refundDetails?.mihpayid}`
                        : selectedOrder?.refundDetails?.txnNumber
                        ? `${selectedOrder?.refundDetails?.txnNumber}`
                        : ""}{" "}
                      )
                    </span>
                  </p>
                  <p className="text-sm text-brown font-regular mt-4">
                    Your refund is being processed. It should reflect in your
                    bank account within 4-7 business days (excluding bank
                    holidays)
                  </p>
                </div>
              )}

              {/* Refund Intitae  Section End */}
            </div>
            <div className=" lg:w-[38%] w-full">
              <div className="w-full    p-3  border border-borderGray shadow-md">
                <p className="text-lg text-brown font-semibold pl-3 mb-3">
                  Shipping Activity
                </p>
                <OrderTimeline
                  history={selectedOrder && selectedOrder?.history}
                  cancelHistory={
                    selectedOrder && selectedOrder?.cancellationHistory
                  }
                  orderType={selectedOrder && selectedOrder?.status}
                  order={selectedOrder}
                />
              </div>
            </div>
          </div>
          {/* Quote Payment List Start */}
          {orderData?.orderType == "RFQ" && (
            <div className="w-full my-4 p-3">
              <QuotePaymentH id={orderData?.quote} />
            </div>
          )}
          {/* Quote Payment List End */}
          {/* Order Details Grid End */}
        </div>
      )}
    </div>
  );
}
