"use client";
import useApi from "@/components/Fetcher/useAPI";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as getEndpoint from "../../../network/EndPoints";
import { GoTrash } from "react-icons/go";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import CustomButton from "@/components/customButton/CustomButton";
import { BsExclamationCircle } from "react-icons/bs";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { setCookie } from "cookies-next";
import { set } from "lodash";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@chakra-ui/react";
import { FiFileText } from "react-icons/fi";
import QuoteCompo from "./QuoteCompoCart";
import { normalizePath } from "@/lib/utils";

interface CartRowProps {
  product: any;
  // refreshCart: () => void;
  cartId: string;
  shipErr: any;
  reloadCart: () => void;
  enable: any;
  address:any
  // handleChange: (e: React.ChangeEvent<HTMLInputElement>, minQty: number, maxQty: number) => void;
  // handleIncrement: () => void;
  // handleDecrement: () => void;
  // qty:any;
}
export default function CartRow({
  product,
  // refreshCart,
  cartId,
  shipErr,
  enable,
  address,

  reloadCart,
}: CartRowProps) {
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const [minQty, setMinQty] = useState(1);
  const [maxQty, setMaxQty] = useState(1);
  const [quantity, setQuantity] = useState<any>(0);

  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const buyerInfo = sessionStorage.getItem("buyerUserInfo") as any;
  const addresses = JSON.parse(buyerInfo)?.addresses;
  const [addressCart, setAddressCart] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteItemLoading, setDeleteItemLoading] = useState(false);
  const [showQtyTip, setShowQtyTip] = useState<boolean>(false);
  const [tooltipMsg, setTooltipMsg] = useState<string>("");
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();
  const [notAvailable, setNotAvailable] = useState<boolean>(false);
  const router = useRouter();
  const [quoteCond, setQuoteCond] = useState(false);
  const [isQuoteAvailable, setIsQuoteAvailable] = useState(false);
  const [loadingQuoteButton, setLoadingQuoteButton] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [unavailableMsg, setUnavailableMsg] = useState<string>("");


  //Quote states
  const [productSelectedForQuote, setProductSelectedForQuote] = useState<any>(
    []
  );
  const [quantityForQuote, setQuantityForQuote] = useState<any[]>([]);




  const calculatePercentage = (amount: any) => {
    if (isNaN(amount) || amount <= 0) {
      return 0; // Handle invalid amounts
    }
    return (amount * 25) / 100;
  };

  useEffect(() => {
    let errMsg = "";
    if (shipErr && shipErr.length > 0) {
      let there = false;
    
      shipErr.forEach((item: any) => {
        if (item?.product === product?.product?._id) {
          there = true;
          errMsg = item.message
        }
      });

      setNotAvailable(there);
      setUnavailableMsg(errMsg)
    }
    if (product?.deliveryCharges > calculatePercentage(Number(product?.totalCost-product?.deliveryCharges))) {
      setQuoteCond(true);
    } else {
      setQuoteCond(false);
    }
    if(product.product.productId.purchaseType!=="ONLINE"){
      setIsQuoteAvailable(true);
    }
  }, [product]);
  
  // console.log(product,"productproduct")
  function calculateDiscountPercentage(
    mrp: number,
    discountedPrice: number
  ): number {
    if (mrp <= 0 || discountedPrice < 0 || discountedPrice > mrp) {
      return 0; // Ensure valid values (no negative prices or discountedPrice greater than MRP)
    }

    const discount = ((mrp - discountedPrice) / mrp) * 100;
    return Math.round(discount); // Round to nearest integer
  }

  const handleIncrement = () => {
    // setQuantity(prev => prev + 1);
    UpdateCart("inc");
  };

  // Handle decrement
  const handleDecrement = () => {
    UpdateCart("dec");
  };

  // Handle manual input change

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutID);

    // Extract the input value
    const inputValue = e.target.value;

    // If input is empty, reset quantity and hide tooltip
    if (inputValue === "") {
      setQuantity("");
      setShowQtyTip(false);
      return;
    }

    // Parse the input, ensuring it's a number
    const value = parseInt(inputValue, 10);

    // Validation checks
    if (isNaN(value)) {
      // If not a number, don't update anything
      return;
    }

    // Prevent typing beyond max quantity
    if (value > maxQty) {
      // Set to max quantity and show tooltip
      setQuantity(maxQty);
      setShowQtyTip(true);
      setTooltipMsg(`Maximum purchase quantity is ${maxQty}`);

      // Trigger API update with max quantity
      const newTimeoutID = setTimeout(() => {
        UpdateCart("manual", false, maxQty);
      }, 1000);
      setTimeoutID(newTimeoutID);
      return;
    }

    // Prevent typing below min quantity
    if (value < minQty) {
      // Set to min quantity and show tooltip
      setQuantity(minQty);
      setShowQtyTip(true);
      setTooltipMsg(`Minimum purchase quantity is ${minQty}`);

      // Trigger API update with min quantity
      const newTimeoutID = setTimeout(() => {
        UpdateCart("manual", false, minQty);
      }, 1000);
      setTimeoutID(newTimeoutID);
      return;
    }

    // If within acceptable range, update quantity
    setQuantity(value);
    setShowQtyTip(false);

    // Add a timeout to reduce API calls
    const newTimeoutID = setTimeout(() => {
      // Update cart with the final quantity
      UpdateCart("manual", false, value);
    }, 1000);
    setTimeoutID(newTimeoutID);
  };

  useEffect(() => {
    // // console.log("CartRowProps", product);
    setQuantity(product?.quantity);
    setMinQty(product?.product.minBuyQty);
    setMaxQty(product?.product.maxBuyQty);

    addresses?.forEach((address: any) => {
      if (address?.isDefault) {
        setAddressCart(
          `${address?.address},${address?.city},${address?.state},${address?.state},${address?.country},${address?.postCode}`
        );
      }
    });
  }, []);

  // // console.log('dfgrwhetjyuk',product)

  const handleApiError = async (err: any, type?: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      if (result?.data?.intent == "ERROR" && result?.data?.message) {
        toast.error(result?.data?.message);
      } else if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message == "Item out of stock"
      ) {
        toast.error("Stock Not Available");
      } else if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message == "cart not found"
      ) {
        toast.error("Cart Not Found");
      } else if (result?.data?.intent == "ERROR" && result?.data?.message) {
        // // console.log("ewntrb", result?.data?.message);
        if (
          result?.data?.message[0]?.message == "address should not be empty"
        ) {
          toast.error("Please add Shipping Address");
        } else {
          toast.error("Unable to update Cart");
        }
      } else {
        toast.error("Unable to update Cart");
      }
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      UpdateCart(type);
    } else {
      toast.error(result?.data?.message);
    }
  };

  const UpdateCart = async (
    type: any,
    isRemove = false,
    manualQuantity?: number
  ) => {
    const payload = {
      product: product?.product?._id,
      quantity: isRemove
        ? 0
        : type === "manual"
        ? manualQuantity
        : type === "inc"
        ? quantity + 1
        : type === "dec"
        ? quantity - 1
        : quantity,
    };

    try {
      const result = (await callApi(
        getEndpoint.default.UPDATECART,
        "PUT",
        payload
      )) as any;

      if (result.data == null) {
        handleApiError(result?.errorData, type);
      } else {
        setQuantity(payload.quantity);
        setCookie("CartCount", result?.data?.items.length);

        // refreshCart();
        reloadCart();
      }
    } catch (e: any) {
      handleApiError(e, type);
    } finally {
      if (isRemove) setDeleteItemLoading(false);
      setOpen(false);
    }
  };

  const handleDeleteItem = () => {
    setDeleteItemLoading(true);
    UpdateCart("dec", true);
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

  const onClickImage = () => {
    if (product?.product?.slug) {
      router.push(`/${product?.product?.slug}`);
    } else {
    }
  };

  function checkAndParse(data) {
    if(data){
    // Convert the input to a string
    const dataStr = data?.toString();
  
    // Check if the string contains a decimal point
    if (dataStr.includes(".")) {
      // Split the string into the integer and decimal parts
      const [base, decimalPart] = dataStr.split(".");
  
      // Return the number with up to two decimal places
      return parseFloat(`${base}.${decimalPart.slice(0, 2)}`);
    }
  }
  
    // If there's no decimal point, return the original number
    return data;
  }
  
  // function checkAndParse(data) {
  //   // console.log('check', typeof data);
  //   if (typeof data === 'string' && data.includes(".")) {
  //     const [base, decimalPart] = data.split(".");
  //     return `${base}.${decimalPart.slice(0, 2)}`;
  //   }
  //   // Handle cases where data is not a string or doesn't include a period
  //   return data;
  // }
  

  return (
    <>
      <tr key={0} className={` border-b relative mb-10 `}>
        {enable ? (
          <>
            {" "}
            <div className="absolute z-20 h-24 max-w-[780px] w-full flex justify-center items-center bg-white/80">

              <p className="text-secondary text-md font-medium text-wrap w-[250px] bg-[#f4f4f453] text-center py-2 border uppercase border-secondary p-2 rounded">
              {(quoteCond || (enable===true) ) && isQuoteAvailable ? <span className="text-[11px] text-wrap w-[300px]">Available for quotes only in this delivery location.</span> : unavailableMsg || "Not Available"}
              </p>
            </div>
          </>
        ) : (
          <></>
        )}

        <td className=" flex flex-col items-center justify-start max-w-[90%]">
          <div className="flex flex-row items-center justify-start py-4 px-4 w-full">
            <Image
              src={normalizePath(`${assetURL}/${product?.product?.images[0]}`)}
              alt={product?.product?.title}
              className="w-16 h-16 object-contain cursor-pointer mr-4 flex justify-center items-center min-w-[70px]"
              width={200}
              height={200}
              onError={e => {
                e.currentTarget.src = '/images/product-placeholder.webp'
              }}
              loading="lazy"
              onClick={() => onClickImage()}
            />
            <div className="w-full">
              <p className="font-medium text-brown w-full">
                {/* {product?.product?.variantName} */}
                {(product?.productInfo?.productName).length > 30
                  ? (product?.productInfo?.productName).slice(0, 30) + "..."
                  : product?.productInfo?.productName}
              </p>
              <div className="flex items-center  w-fit">
                {product?.product?.attributes.map(
                  (attribute: any, index: any) => {
                    return (
                      <p
                        key={index}
                        className="text-brown text-medium text-sm uppercase"
                      >
                        {/* {attribute?.value} */}
                        {attribute?.value.length > 30
                          ? attribute?.value.slice(0, 30) + "..."
                          : attribute?.value}

                        {index == product?.product?.attributes.length - 1 ? (
                          <></>
                        ) : (
                          "-"
                        )}
                      </p>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </td>
        {/* <td className="py-4 px-4 w-[15%]">{formatCurrencyInIndianStyle(product?.product?.platformPrice - Number( product?.tax / quantity))}</td> */}
        <td className="py-4 px-4 w-[15%]">{checkAndParse(product?.productInfo?.unitPrice)}</td>
        {/* Quantity Section Start */}
        <td className="py-4 px-4 w-[20%] ">
          <div className="flex items-center  border border-borderGray w-fit">
            {product.status == "removed" ? (
              <>
                <p className="text-secondary text-md font-regular text-center py-2 px-3">
                  Out of Stock
                </p>
              </>
            ) : (
              <>
                {/* <Button
              type="button"
              onClick={handleDecrement}
              className="pl-4 pr-0 py-2 bg-transparent text-lg hover:bg-transparent  text-secondary"
              disabled={quantity === product?.product?.minBuyQty}
            >
              -
            </Button>
            <Input
              type="number"
              min={product?.product?.minBuyQty}
              max={product?.product?.maxBuyQty}
              value={quantity > 0 ? quantity : product?.quantity}
              onChange={(e: any) =>
                handleChange(
                  e,
                  product?.product?.minBuyQty,
                  product?.product?.maxBuyQty
                )
              }
              className="w-16 pl-0 text-center  custom-input"
            />
            <Button
              type="button"
              onClick={handleIncrement}
              className="pr-4 pl-0 py-2 text-lg bg-transparent hover:bg-transparent text-secondary"
              disabled={quantity === product.product.maxBuyQty}
            >
              +
            </Button> */}

                <TooltipProvider>
                  <Tooltip open={showQtyTip}>
                    <TooltipTrigger asChild className="">
                      <div className="flex items-center  border border-borderGray w-fit">
                        <Button
                          type="button"
                          onClick={handleDecrement}
                          className="pl-4 pr-0 py-2 bg-transparent text-lg hover:bg-transparent  text-secondary"
                          disabled={quantity <= minQty ? true : false}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          min={minQty}
                          max={maxQty}
                          value={quantity}
                          onChange={(e) => handleChange(e)}
                          className="w-24 pl-0 text-center custom-input"
                          onKeyDown={(e) => {
                            if (
                              e.key === "e" ||
                              e.key === "+" ||
                              e.key === "-"
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={handleIncrement}
                          className="pr-4 pl-0 py-2 text-lg bg-transparent hover:bg-transparent text-secondary"
                          disabled={quantity >= maxQty ? true : false}
                        >
                          +
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      sideOffset={5}
                      className="border-transparent  px-0 bg-black z-[22]  max-w-[270px]"
                    >
                      <TooltipArrow className="fill-black" />
                      {tooltipMsg && (
                        <p className="text-sm text-white font-medium  py-2 px-2">
                          {tooltipMsg}
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>
        </td>
        {/* Quantity Section End */}
        {/* Price Section Start */}
        <td className="py-4 px-4 w-[20%]">
          {/* {product?.product?.currentPrice} */}
          <div className="flex justify-start items-center">
            <p className="md:text-xl text-md text-brown text-normal ">
            <span className="text-brown text-xl font-normal font-mono">

                {" "}
                ₹
              </span>{" "}
              <span className="md:text-xl text-md text-brown font-semibold text-normal ">
                {formatCurrencyInIndianStyle(
                  product?.costBeforeGST
                )}
              </span>
            </p>
          </div>
          {/* {product?.product?.MRP == product?.product.discountedPrice ? (
            <></>
          ) : (
            <div className="flex justify-start items-center">
              <p className="md:text-[13px] text-md text-[#c5c5c5] line-through font-light  text-normal ">
                ₹ {product?.product?.MRP}
              </p>

              <p className="md:text-[13px] text-xs text-secondary text-normal ml-3 ">
                {calculateDiscountPercentage(
                  product?.product?.MRP,
                  product?.product?.discountedPrice
                )}
                % off
              </p>
            </div>
          )} */}
        </td>
        <td className="py-4 ">
          <Button
            type="button"
            onClick={() => setOpen(true)}
            className="bg-secondary/10 text-lg hover:bg-secondary/10  relative z-[29] text-secondary"
          >
            <GoTrash className="text-secondary" />
          </Button>
          {(quoteCond || (enable===true) ) && isQuoteAvailable && (
            <div className="flex flex-row items-center justify-start w-full mt-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                  <Button
                // disabled={loadingQuoteButton}
                variant={"outline"}
                // onClick={() => router.push(`/${product.slug}?qt=open`)}
                onClick={() => {
                  setIsOpen(true);
                }}
                className="bg-primary/10 text-lg hover:bg-primary/10 relative z-[29]  text-primary "
              >
                {/* {product.action}{" "}
            {product.action === "Add to Cart" && <ArrowRight size={16} />} */}
                {loadingQuoteButton ? (
                  <>
                    <CircularProgress color="#ffffff" size={6} />
                  </>
                ) : (
                  <>
                    {" "}
                    <FiFileText
                      // color="#A92449"
                      size={18}
                      className="text-current text-primary "
                    />
                    {/* <p className="text-secondary text-md text-medium ml-2 group-hover:text-white">
                          Request Quote
                        </p> */}
                  </>
                )}
              </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black">
                    <p className="text-white text-sm font-regular">Request Quote</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <QuoteCompo
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setQuantityForQuote={setQuantityForQuote}
              setProductSelectedForQuote={setProductSelectedForQuote}
              // combinations={combinations}
              address={address?.address?address?.address:''}
              addressId={address?.id?address?.id:''}
              pincode={address?.postCode?address?.postCode:''}
              products={[
                {
                  quantity: quantity,
                  variantId: product?.product?._id
                }
              ]}
              vendorId={product?.vendorId?product?.vendorId:""}
            />
         
            </div>
            
          )}
        </td>
        {/* Price Section End */}
        {quoteCond && isQuoteAvailable ? (
    <div className="text-xs absolute font-normal text-secondary flex whitespace-nowrap pb-10 bottom-[-36px] rounded-sm flex-row left-0 w-full mt-2">
      The shipping cost generated by the system is high. Please request the vendor for a quote for this product. <span  className="text-primary cursor-pointer hover:underline px-1" onClick={() => {
                  setIsOpen(true);
                }} > click here.</span>
    </div>
  ):<></>}
      </tr>
      {open ? (
        <AlertDialog open={open}>
          <AlertDialogOverlay className="z-30 bg-black/50" />

          <AlertDialogContent>
            <AlertDialogHeader>
              <BsExclamationCircle
                className="w-full flex justify-center items-center text-center mb-4"
                color="#B90647"
                size={45}
              />
              <AlertDialogTitle className="text-center pb-5 mb-5">
                Are you sure you want to delete this item from the cart?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex sm:justify-center justify-center w-full items-center">
              <AlertDialogCancel
                onClick={() => setOpen(false)}
                className=" h-[35px] md:h-[45px] md:w-24  text-brown  w-16"
              >
                No
              </AlertDialogCancel>
              <CustomButton
                title={"Yes"}
                className="ml-3 bg-secondary hover:bg-primary h-[35px] md:h-[45px] md:w-24  w-16 md:text-md text-sm text-white "
                customStyles={{}}
                onPress={handleDeleteItem}
                type="submit"
                loading={deleteItemLoading}
              />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </>
  );
}