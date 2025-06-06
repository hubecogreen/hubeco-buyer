"use client";
import useApi from "@/components/Fetcher/useAPI";
import useRefreshToken from "@/components/hooks/useRefreshToken";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { Box, Flex, Text, Image, Link } from "@chakra-ui/react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
// import { IoCloseCircleSharp } from "react-icons/io5";
import NotFoundPage from "../../../../components/404/page";
import BannerSection from "@/components/sharedComponents/BannerSection";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BsExclamationCircle } from "react-icons/bs";
import CustomInput from "@/components/customInput/CustomTextField";
import CustomButton from "@/components/customButton/CustomButton";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { normalizePath } from "@/lib/utils";
const assetUrl = process.env.NEXT_PUBLIC_ASSET_URL;

export default function QuoteDetailsDialog() {
  const [selectedView, setSelectedView] = useState<any>();
  const [initialState, setInitialValues] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const [isOpen, setIsOpen] = useState<string>("");
  const [errorOnRemark, setErrorOnRemark] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [loadingOnAction, setLoadingOnAction] = useState<boolean>(false);
  const getQuoteDetailsById = async (id: string) => {
    const quote = (await callApi(`quotes/getQuote/${id}`, "GET")) as any;
    if (quote.data !== null) {
      setInitialValues(quote.data);
      const currentQuoteId = window.location.href.split("id=")[1];
      quote.data.quotations.find((quote: any) => {
        if (quote.quotationId == currentQuoteId) {
          setSelectedView(quote);
        }
      });
    } else {
      setInitialValues("not_found");
      if (quote?.errorData?.response?.data?.message?.includes("admin")) {
        // setAdminApprovalFailed(true)
      } else if (quote.error.includes("authentication")) {
        await refreshTokens();
      }
    }
    setLoading(false);
  };

  async function handleQuoteAction() {
    if (errorOnRemark.length > 1) {
      return;
    }
    if (remarks.length === 0) {
      setErrorOnRemark("Please enter remarks");
      return;
    } else {
      setErrorOnRemark("");
    }
    try {
      setLoadingOnAction(true);
      const quoteId = window.location.href.split("quote-request/")[1];
      const id = quoteId.split("/view-quote")[0];
      const payload = {
        id: id,
        reason: remarks,
        action: isOpen,
      };
      const res = (await callApi(
        "quotes/handleQuoteAction",
        "POST",
        payload
      )) as any;
      if (res.data !== null) {
        toast.success(
          `Quotation ${
            isOpen == "reject" ? "Rejected" : "Accepted"
          } successfully`
        );
        setRemarks("");
        setErrorOnRemark("");
        // setSelectedQuote(null);
        window.location.reload();
      } else {
        toast.error(
          `${isOpen == "reject" ? "Rejection" : "Acceptance"} failed`
        );
      }
    } catch (err: any) {
      toast.error(`${isOpen == "reject" ? "Rejection" : "Acceptance"} failed`);
    } finally {
      setLoadingOnAction(false);
      setIsOpen("");
    }
  }

  function getTheVals() {
    const vals: any[] = [];
    selectedView?.products.map((product: any, index: number) => {
      const ids = selectedView?.products.map((p: any) => p.variantId);
      const stats = initialState.products.filter((p: any) =>
        ids.includes(p.variantId._id)
      );

      vals.push(...stats);
    });
    return vals;
  }

  useEffect(() => {
    const quoteId = window.location.href.split("quote-request/")[1];
    const id = quoteId.split("/view-quote")[0];
    if (id) {
      getQuoteDetailsById(id);
    }
  }, []);

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

  if (loading) {
    return (
      <div className="w-full flex justify-center h-[80vh] items-center bg-white">
        <Loader className="text-[#439787] spin-in-180 animate-spin" />
      </div>
    );
  }

  if (initialState == "not_found" || !selectedView) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <head>
        <title>Hubeco | Quote Details</title>
      </head>
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "Quote Request", href: "/quote-request" }}
        link3={{
          name: `${initialState.quoteId}`,
          href: `/quote-request/${initialState._id}`,
        }}
      />

      <div className="px-4 md:px-28 py-8 md:py-10">
        <div className=" bg-[#80808023] flex justify-between items-center rounded-lg shadow-sm p-6 mb-8">
          {/* <h1 className="text-3xl font-bold text-gray-800">
            Quote {selectedView.quotationId}
          </h1> */}
          <div className="flex gap-3 md:w-32 justify-start">
            {selectedView.status !== "Pending" ? (
              <button
                className={`font-semibold cursor-default px-4 py-2 md:w-32 ${
                  selectedView.status === "Rejected"
                    ? "bg-[#B9064729] text-[#B90647]"
                    : "bg-[#00988629] text-[#009886]"
                }`}
              >
                {selectedView.status == "Approved"
                  ? "Accepted"
                  : selectedView.status}
              </button>
            ) : (
              <>
                <div className="flex gap-3 cursor-default md:w-32 justify-start">
                  <Image
                    src="/images/Button.svg"
                    alt=""
                    className="cursor-pointer"
                    width={10}
                    height={10}
                    onError={(e) => {
                      e.currentTarget.src = "/images/product-placeholder.jpg";
                    }}
                    loading="lazy"
                    onClick={() => {
                      //   setSelectedQuote(quote);
                      setIsOpen("reject");
                    }}
                  />
                  <Image
                    src="/images/Button.png"
                    alt=""
                    className="cursor-pointer"
                    width={10}
                    height={10}
                    onError={(e) => {
                      e.currentTarget.src = "/images/product-placeholder.jpg";
                    }}
                    loading="lazy"
                    onClick={() => {
                      //   setSelectedQuote(quote);
                      setIsOpen("accept");
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-6 mb-12">
          {getTheVals().map((product: any, index: number) => {
            if (Boolean(selectedView?.products[index]?.unitPrice) == false)
              return null;

            return (
              <div
                key={product._id}
                className=" bg-[#80808023] rounded-lg shadow-sm"
              >
                <div className="p-6">
                  <Flex alignItems="center" className="mb-6">
                    <Image
                      // src={product.variantId.thumbnail ? `${assetUrl}/${product.variantId.thumbnail}` : ""}
                      // src={
                      //   product.variantId.thumbnail
                      //     ? (
                      //         assetUrl +
                      //         "/" +
                      //         product.variantId.thumbnail
                      //       ).includes("//admin")
                      //       ? (
                      //           assetUrl +
                      //           "/" +
                      //           product.variantId.thumbnail
                      //         ).replace("//admin", "/admin")
                      //       : `${assetUrl}/${product.variantId.thumbnail}`
                      //     : "/images/product-placeholder.jpg"
                      // }
                      src={
                        product.variantId.thumbnail
                          ? normalizePath(
                              `${assetUrl}/${product.variantId.thumbnail}`
                            )
                          : "/images/product-placeholder.jpg"
                      }
                      alt={product.variantId.variantName}
                      // boxSize="24"
                      // objectFit="cover"
                      // rounded="lg"
                      mr={6}
                      className="border border-gray-200 w-16 h-16 object-cover rounded mr-4"
                      onError={(e) => {
                        e.currentTarget.src = "/images/product-placeholder.jpg";
                      }}
                      loading="lazy"
                    />
                    <h3 className="text-xl font-bold text-gray-800">
                      {product.variantId.variantName === "Default"
                        ? product.variantId.productId.name
                        : `${product.variantId.variantName}`}
                    </h3>
                  </Flex>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* {Array.isArray(product?.variantId?.attributes) &&
                      product?.variantId?.attributes.map((attribute: any) => (
                        <div key={attribute.name} className="bg-white p-4 rounded-lg">
                          <Text className="text-gray-600 text-sm font-medium mb-1">
                            {attribute.name}
                          </Text>
                          <Text className="text-gray-900 font-semibold">
                            {attribute.value}
                          </Text>
                        </div>
                      ))} */}
                    <div className="bg-white p-4 rounded-lg">
                      <Text className="text-gray-600 text-sm font-medium mb-1">
                        Quantity
                      </Text>
                      <Text className="text-gray-900 font-semibold">
                        {selectedView?.products[index]?.quantity}
                      </Text>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <Text className="text-gray-600 text-sm font-medium mb-1">
                        Unit Price
                      </Text>
                      <Text className="text-gray-900 font-semibold">
                        <span className="text-xl font-normal font-mono">₹</span>
                        {selectedView?.products[index]?.unitPrice}
                      </Text>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <Text className="text-gray-600 text-sm font-medium mb-1">
                        Delivery Date
                      </Text>
                      <Text className="text-gray-900 font-semibold">
                        {dayjs(
                          selectedView?.products[index]?.deliveryDate
                        ).format("DD-MM-YYYY")}
                      </Text>
                    </div>
                    {selectedView?.products[index]?.cgst == -1 ? null : (
                      <div className="bg-white p-4 rounded-lg">
                        <Text className="text-gray-600 text-sm font-medium mb-1">
                          CGST
                        </Text>
                        <Text className="text-gray-900 font-semibold">
                          {selectedView?.products[index]?.cgst}%
                        </Text>
                      </div>
                    )}
                    {selectedView?.products[index]?.sgst == -1 ? null : (
                      <div className="bg-white p-4 rounded-lg">
                        <Text className="text-gray-600 text-sm font-medium mb-1">
                          SGST
                        </Text>
                        <Text className="text-gray-900 font-semibold">
                          {selectedView?.products[index]?.sgst}%
                        </Text>
                      </div>
                    )}
                    {selectedView?.products[index]?.igst == -1 ? null : (
                      <div className="bg-white p-4 rounded-lg">
                        <Text className="text-gray-600 text-sm font-medium mb-1">
                          IGST
                        </Text>
                        <Text className="text-gray-900 font-semibold">
                          {selectedView?.products[index]?.igst}%
                        </Text>
                      </div>
                    )}
                    <div className="bg-white p-4 rounded-lg">
                      <Text className="text-gray-600 text-sm font-medium mb-1">
                        Shipping Cost
                      </Text>
                      <Text className="text-gray-900 font-semibold">
                        <span className="text-xl font-normal font-mono">₹</span>
                        {selectedView?.products[index]?.shippingCost}
                      </Text>
                    </div>{" "}
                    <div className="bg-white p-4 rounded-lg">
                      <Text className="text-gray-600 text-sm font-medium mb-1">
                        Other Cost
                      </Text>
                      <Text className="text-gray-900 font-semibold">
                        <span className="text-xl font-normal font-mono">₹</span>
                        {selectedView?.products[index]?.otherCost}
                      </Text>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <Text className="text-gray-600 text-sm font-medium mb-1">
                        Taxable Amount
                      </Text>
                      <Text className="text-gray-900 font-semibold">
                        <span className="text-xl font-normal font-mono">₹</span>
                        {formatCurrencyInIndianStyle(
                          selectedView?.products[index]?.unitPrice *
                            selectedView?.products[index]?.quantity
                        )}
                      </Text>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <Text className="text-gray-600 text-sm font-medium mb-1">
                        Tax Amount (
                        {selectedView?.products[index]?.sgst == -1
                          ? "IGST"
                          : "CGST + SGST"}
                        )
                      </Text>
                      <Text className="text-gray-900 font-semibold">
                        <span className="text-xl font-normal font-mono">₹</span>
                        {selectedView?.products[index]?.taxableAmount}
                      </Text>
                    </div>
                    {/* <div className="bg-white p-4 rounded-lg">
                      <Text className="text-gray-600 text-sm font-medium mb-1">
                        Product Cost
                      </Text>
                      <Text className="text-gray-900 font-semibold">
                      <span
                      className="text-xl "
                      style={{ fontWeight: "400", fontFamily: "monospace" }}
                    >
                      {" "}
                      ₹
                    </span>{(selectedView?.products[index]?.unitPrice)}
                      </Text>
                    </div> */}
                    <div className="bg-white p-4 rounded-lg">
                      <Text className="text-gray-600 text-sm font-medium mb-1">
                        Total Amount
                      </Text>
                      <Text className="text-gray-900 font-semibold">
                        <span className="text-xl font-normal font-mono">₹</span>
                        {selectedView?.products[index]?.totalAmount}
                      </Text>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {selectedView?.products[index]?.notes && (
                      <div className="bg-white p-4 rounded-lg">
                        <Text className="text-gray-600 text-sm font-medium mb-1">
                          Notes
                        </Text>
                        <Text className="text-gray-900">
                          {selectedView?.products[index]?.notes}
                        </Text>
                      </div>
                    )}

                    {selectedView?.products[index]?.warranty && (
                      <div className="bg-white p-4 rounded-lg">
                        <Text className="text-gray-600 text-sm font-medium mb-1">
                          Warranty
                        </Text>
                        <Text className="text-gray-900">
                          {selectedView?.products[index]?.warranty}
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Requirements Section */}
        <div className="space-y-6  bg-[#80808023] bg-gray-200 rounded-lg shadow-sm">
          <h5 className="text-xl font-semibold text-gray-800   p-6 pb-0 rounded-lg">
            Grand Total
          </h5>
          <div className=" rounded-lg gap-5 flex  p-6 py-2">
            {/* <div className="bg-white p-4 rounded-lg w-full">
                <p className="text-gray-600 text-sm font-medium mb-1">Shipping/Delivery Cost </p>
                <p className="text-gray-900 font-semibold"> <span
                      className="text-xl "
                      style={{ fontWeight: "400", fontFamily: "monospace" }}
                    >
                      {" "}
                      ₹
                    </span>{selectedView?.shippingCost}</p>
              </div>
              <div className="bg-white p-4 rounded-lg w-full">
                <p className="text-gray-600 text-sm font-medium mb-1">Other Cost</p>
                <p className="text-gray-900 font-semibold"> <span
                      className="text-xl "
                      style={{ fontWeight: "400", fontFamily: "monospace" }}
                    >
                      {" "}
                      ₹
                    </span>{selectedView?.otherCost}</p>
              </div> */}
            <div className="bg-white p-4 rounded-lg w-full">
              <p className="text-gray-600 text-sm font-medium mb-1">
                Grand Total
              </p>
              <p className="text-gray-900 font-semibold">
                {" "}
                <span className="text-xl font-normal font-mono">₹</span>
                {selectedView?.grandTotal}
              </p>
              {Array.isArray(selectedView.products) &&
                selectedView.products.some(
                  (elem: { roundValue: number }) => elem.roundValue !== 0
                ) && (
                  <div className="justify-start gap-2 items-center flex">
                    <div className="inline text-xs font-medium">
                      Amount rounded off to
                    </div>
                    <div className="block">
                      <span className="font-mono mr-0 inline">₹</span>

                      <span
                        className={`text-xs inline w-full flex-col items-start`}
                      >
                        {selectedView.products
                          .reduce(
                            (total: number, elem: { roundValue: number }) =>
                              Number(total) + Number(elem.roundValue),
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
            </div>
          </div>
          <h5 className="text-xl font-semibold text-gray-800   px-6 pb-0 rounded-lg">
            Terms and Conditions
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-0 p-6">
            <div className="  rounded-lg bg-white p-4  w-full">
              <h3 className=" text-gray-600 text-sm font-medium mb-1">
                Delivery Terms
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap break-words text-wrap line-clamp-6">
                {selectedView?.deliveryTerms || "-"}
              </p>
            </div>

            <div className="  rounded-lg bg-white  w-full  p-6">
              <h3 className=" text-gray-600 text-sm font-medium mb-1">
                Payment Terms
              </h3>
              <p className="text-gray-700  whitespace-pre-wrap break-words text-wrap line-clamp-6">
                {selectedView?.paymentTerms || "-"}
              </p>
            </div>

            <div className="  rounded-lg bg-white p-6  w-full  md:col-span-2">
              <h3 className=" text-gray-600 text-sm font-medium mb-1">
                Other Terms and Conditions
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap break-words text-wrap line-clamp-6">
                {selectedView?.otherTerms || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Quote Validity */}
        <div className="mt-8 bg-[#80808023] p-6 rounded-lg shadow-sm ">
          <Text className="text-red-600 font-semibold text-[#B90647] text-lg">
            Quote Validity{" "}
            <span className="text-primary-700 font-bold">
              {dayjs(selectedView?.quoteValidity).format("DD-MM-YYYY")}
            </span>
          </Text>
        </div>
      </div>
      <AlertDialog open={isOpen !== ""}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center pb-5 text-[#B90647]">
              Are you sure you want to {isOpen} this quotation?
            </AlertDialogTitle>
            <BsExclamationCircle
              className="w-full flex justify-center items-center text-center mb-8"
              color="#B90647"
              size={45}
            />
            <AlertDialogDescription className="text-center pt-4">
              {isOpen !== "reject"
                ? ""
                : "Rejecting this quotation will notify the vendor that you are not interested in the quoted price. You may provide a reason for the rejection."}
            </AlertDialogDescription>
            <CustomInput
              placeholder="Remarks"
              required
              isTextArea={true}
              customStyles={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                color: "black",
              }}
              onChange={(e) => {
                if (e.length > 10000) {
                  setErrorOnRemark(
                    "Remarks should be less than 10000 characters"
                  );
                } else if (e.length < 3) {
                  setErrorOnRemark("Remarks should be at least 3 characters");
                } else {
                  setErrorOnRemark("");
                }
                setRemarks(e);
              }}
            />
            {errorOnRemark && (
              <p className="text-red text-sm">{errorOnRemark}</p>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter className="flex sm:justify-center justify-center w-full items-center">
            <AlertDialogCancel
              onClick={() => {
                setIsOpen("");
                setRemarks("");
                setErrorOnRemark("");
              }}
              className="md:h-12 h-8 md:w-24"
            >
              No
            </AlertDialogCancel>
            <CustomButton
              title={"Yes"}
              className="ml-3 bg-secondary hover:bg-primary  h-12 md:h-12 md:w-24  w-24 md:text-md text-sm text-white "
              customStyles={{}}
              // onPress={() => deleteAddress(address.id)}
              type="submit"
              onPress={() => {
                handleQuoteAction();
              }}
              //  loading={isLoading}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

{
  /* <div className=" bg-[#80808023] rounded-lg shadow-sm p-6 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Certification Required</h3>
              <Flex
                alignItems="center"
                justify="space-between"
                className="bg-white rounded-lg p-4"
              > */
}
{
  /* <Flex alignItems="center">
                  <Image
                    src={
                      selectedView.products[0].certificate.endsWith(".pdf")
                        ? "/images/pdflogo.png"
                        : selectedView.products[0].certificate
                        ? `${assetUrl}/${selectedView.products[0].certificate}`
                        : "/images/product-placeholder.jpg"
                    }
                    boxSize="70px"
                    rounded="md"
                    mr={8}
                    className="border border-gray-200"
                  />
                  <Text className="text-lg font-medium text-gray-800">
                    Certificate provided
                  </Text>
                </Flex> */
}

{
  /* {selectedView.products[0].certificate.endsWith(".pdf") ? (
                  <Link
                    href={`${assetUrl}/${selectedView.products[0].certificate}`}
                    target="_blank"
                    className="text-secondary hover:text-secondary-dark font-medium px-4 py-2  bg-[#80808023] rounded-lg hover:bg-white transition-all"
                  >
                    View
                  </Link>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Link
                        href="#"
                        className="text-secondary hover:text-secondary-dark font-medium px-4 py-2  bg-[#80808023] rounded-lg hover:bg-white transition-all"
                      >
                        View
                      </Link>
                    </DialogTrigger>
                    <DialogContent className="w-[98%] fixed h-[98%] lg:w-full">
                      <DialogClose className="absolute z-50 right-4 top-4">
                        <IoCloseCircleSharp color="white" size={30} />
                      </DialogClose>
                      <div className="h-full w-full">
                        <Image
                          src={`${assetUrl}/${selectedView.products[0].certificate}`}
                          className="p-[10px] rounded"
                          objectFit="cover"
                          alt={selectedView.products[0].certificate}
                          //@ts-ignore
                          fill={true}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                )} */
}
{
  /* </Flex>
            </div> */
}
