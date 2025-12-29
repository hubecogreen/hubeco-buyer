"use client";
import React, { useEffect, useState } from "react";
// import Head from "next/head";
import { AiFillHome } from "react-icons/ai";
import CustomButton from "@/components/customButton/CustomButton";
import { GoArrowRight } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CustomInput from "@/components/customInput/CustomTextField";
import useApi from "@/components/Fetcher/useAPI";
import { toast } from "react-hot-toast";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import * as getEndpoint from "../../network/EndPoints";
import CartRow from "./components/CartRow";
import EmptyCart from "./components/EmptyCart";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BsExclamationCircle } from "react-icons/bs";
// import CustomLoader from "@/components/sharedComponents/loader";
import { Input } from "@/components/ui/input";
import RecentlyViewed from "@/components/product/RecentlyViewed";
// import { CircularProgress } from "@chakra-ui/react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { saveCart, saveCartCount } from "@/reduxStore/slices/userSlice";
// import { get } from "lodash";
// import SkeletonLoader from "./components/summarySkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import CartLoadingSkeleton from "./components/CartLoadingSkeleton.";

const Cart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const [cartData, setCartData] = useState<any>([]);
  const [cost, setCost] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [clearCartLoading, setClearCartLoading] = useState(false);
  const [addresses, setAddresses] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>("");
  const [deliveryCharges, setDeliveryCharges] = useState<string>("");
  const [openShipping, setOpenShipping] = useState(true);
  const [totalCart, setTotalCart] = useState<any>([]);
  const [enableCheckout, setEnableCheckout] = useState(true);
  const [orderInstructions, setOrderInstructions] = useState<string>("");
  const [instErrMssg, setInstErrMssg] = useState<string>("");
  const [refresh, setRefresh] = useState(0);
  const [showStockMssg, setShowStockMssg] = useState(false);
  const [shipErrors, setShipErrors] = useState<any>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedAddressId, setSelectedAddressId] = useState<any>("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [quoteCond, setQuoteCond] = useState(false);

  const handleCartApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      setCartData([]);
      setCost({});
      dispatch(saveCart([]));
      dispatch(saveCartCount([]));
      setCookie("CartCount", "");
    } else if (result?.status === 401) {
      await refreshTokens();
      getCart();
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getCart();
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };
  // useEffect(() => {
  //  getCart();
  // }, [refresh]);

  const getCart = async () => {
    setLoading(true);

    try {
      const result = (await callApi(getEndpoint.default.CART, "GET")) as any;
      // // console.log("productproductproduct", result);

      if (result.data == null) {
        handleCartApiError(result?.errorData);
      } else {
        setCartData(result?.data?.items);
        // // console.log("productproductproduct", result?.data?.items);
        setCookie("CartCount", result?.data?.items?.length);
        setCost(result?.data?.cost);
        setTotalCart(result?.data);
        result?.data?.items?.map((item: any) => {
          if (item?.status != "available") {
            toast.error("Please remove Out of Stock Products from Cart");
            setShowStockMssg(true);
          }
        });
      }
    } catch (e) {
      handleCartApiError(e);
    } finally {
      setLoading(false);
      setSummaryLoading(false);
    }
  };

  const refreshCart = async () => {
    // // console.log("Refreshing cart");
    getCart();
  };

  const handleClearCart = async () => {
    setClearCartLoading(true);
    try {
      const result = await callApi(getEndpoint.default.CLEARCART, "DELETE");
      if (result.data == null) {
        handleApiError(result?.errorData);
      } else {
        toast.success("Cart deleted successfully");
        dispatch(saveCart([]));
        dispatch(saveCartCount([]));
        setOpen(false);
        refreshCart();
        setCookie("CartCount", 0);
        router.refresh();
        // setRefresh(refresh + 1);
        // window.location.reload();
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      setClearCartLoading(false);
    }
  };

  const handleShippingApiError = async (err: any, address?: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      if (
        result?.data?.intent == " CART_NOT_FOUND" &&
        result?.data?.message == "Cart is empty or not found"
      ) {
        // toast.error("No Cart Found");
        dispatch(saveCart([]));
        dispatch(saveCartCount([]));
      } else if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message[1]?.message == "address should not be empty"
      ) {
        toast.error("Please Select Shipping Address to calculate shipping");
      } else {
        toast.error(result?.data?.message || "Unable to Calculate Shipping");
      }
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      handleCalculateShipping(address);
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const calculatePercentage = (amount: any) => {
    if (isNaN(amount) || amount <= 0) {
      return 0; // Handle invalid amounts
    }
    return (amount * 25) / 100;
  };

  const handleCalculateShipping = async (address: any) => {
    setSelectedAddress(address);
    setSummaryLoading(true);
    setCookie("selectedCheckoutAddress", address.id);
    const payload = {
      address: address?.id,
    };
    try {
      const result = (await callApi(
        getEndpoint.default.CALCULATESHIPPING,
        "POST",
        payload
      )) as any;
      // // console.log("testing shipping", payload);
      if (result.data == null) {
        handleShippingApiError(result?.errorData, address);
      } else {
        // setOpen(false);
        // refreshCart();
        // // console.log("cwvrbtn", result?.data);
        setShipErrors(result?.data?.errors);
        if (result?.data?.errors?.length > 0) {
          toast.success("Please remove products which are not available.", {
            iconTheme: {
              primary: "#439787",
              secondary: "#FFFAEE",
            },
          });
          setEnableCheckout(false);
        } else {
          setEnableCheckout(true);
        }
        setDeliveryCharges(result?.cart?.cost);
        setCost(result?.data?.cart?.cost);
        // // console.log('dqfwghjy',result?.data?.cart?.cost?.deliveryCharges, calculatePercentage(result?.data?.cart?.cost?.totalCost))

        if (
          result?.data?.cart?.cost?.deliveryCharges >
          calculatePercentage(result?.data?.cart?.cost?.total)
        ) {
          setQuoteCond(true);
        } else {
          setQuoteCond(false);
        }

        // setEnableCheckout(true);
      }
    } catch (e: any) {
      handleShippingApiError(e, address);
    } finally {
      setSummaryLoading(false);
      getCart();
    }
  };

  useEffect(() => {
    // handleCalculateShipping();
  }, [selectedAddress]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = (await callApi(
          getEndpoint.default.ADDRESSES,
          "GET"
        )) as any;
        if (response?.data) {
          setAddresses(response?.data); 
          if (response?.data?.length > 0) {
            const addId =
              response &&
              response?.data.forEach((element: any) => {
                if (element?.isDefault == true) {
                  handleCalculateShipping(element);
                }
              });
          } else {
            setEnableCheckout(false);
            setOpenShipping(true);
            toast.error("Please add delivery address to proceed with checkout", {
              duration: 4000
            });
          }
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        getCart();
      }
    };

    fetchAddresses();
  }, []);

  const handleOnClickCheckout = () => {
    sessionStorage.setItem("currentcheckout", JSON.stringify(totalCart));
    router.push("/checkout");
  };

  const reloadCart = () => {
    router.refresh();

    handleCalculateShipping(selectedAddress);
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

  return (
    <div className="bg-cream min-h-screen">
      <head>
        <title>My Cart | Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>

      {/* Breadcrumb */}
      <div className="banner-section h-102">
        <div
          className="md:px-20 px-10"
          style={{
            position: "relative",
            backgroundImage: 'url("images/about/aboutBanner1.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            color: "#fff",
          }}
        >
          <Link
            href="/"
            className="text-white flex items-center"
            style={{
              textDecoration: "none",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            <AiFillHome size={16} className="text-white mr-1.5" />
            Home
          </Link>
          <span className="text-white mx-2">/</span>
          <Link
            href="/cart"
            className="text-white"
            style={{
              textDecoration: "none",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            My Cart
          </Link>
        </div>
      </div>


      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-brown">My Cart</h1>
          {cartData && cartData.length > 0 ? (
            <CustomButton
              title={"Clear Cart"}
              className={
                "lg:px-2 bg-secondary hover:bg-secondary md:w-32 w-32 md:p-md p-0.5 h-8 md:h-12 justify-around items-center font-semibold text-tiny md:text-sm text-white pl-5"
              }
              hoverBgColor="#439787" // Hover background color
              hoverColor="#ffffff" // Hover text color
              rightIcon={<GoArrowRight />}
              onPress={() => {
                setOpen(true);
              }}
            />
          ) : (
            <></>
          )}
        </div>
        {open ? (
          <AlertDialog open={open}>
            {/* <AlertDialogOverlay className="" style={{ backgroundCoslor: 'rgba(0, 0, 0, 0.5)' }} /> */}
            <AlertDialogContent>
              <AlertDialogHeader>
                <BsExclamationCircle
                  className="w-full flex justify-center items-center text-center mb-4"
                  color="#B90647"
                  size={45}
                />
                <AlertDialogTitle className="text-center pb-5 mb-5">
                  Are you sure you want to clear all items from the cart?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex sm:justify-center justify-center w-full items-center">
                <AlertDialogCancel
                  onClick={() => setOpen(false)}
                  className="h-[35px] md:h-[45px] md:w-24  w-16"
                >
                  No
                </AlertDialogCancel>
                <CustomButton
                  title={"Yes"}
                  className="ml-3 bg-secondary hover:bg-primary  h-[35px] md:h-[45px] md:w-24  w-16 md:text-md text-sm text-white "
                  customStyles={{}}
                  onPress={handleClearCart}
                  type="submit"
                  loading={clearCartLoading}
                />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
        {loading ? (
          <>
            <CartLoadingSkeleton />
          </>
        ) : (
          <>
            {cartData && cartData.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white shadow rounded-lg p-4 sm:py-6 sm:px-4 max-w-2/3">
                    <div className="sm:block">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-[#F4F4F4]">
                            <tr className="border-b">
                              <th className="py-4 pl-2 pr-4 max-w-[45%]">
                                Product
                              </th>
                              <th className="py-4 px-4 max-w-1/6">
                                Unit Price
                              </th>
                              <th className="py-4 px-4 max-w-1/6">Quantity</th>
                              <th className="py-4 px-4 max-w-1/6">Total</th>
                              <th className="py-4 max-w-1/6"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartData &&
                              cartData.map((product: any, index: any) => {
                                let isThere = false;
                                if (product?.product) {
                                  if (shipErrors && shipErrors.length > 0) {
                                    let there = false;
                                    shipErrors.forEach((item: any) => {
                                      if (
                                        item?.product === product?.product?._id
                                      ) {
                                        there = true;
                                      }
                                    });
                                    isThere = there;
                                  }
                                  return (
                                    <CartRow
                                      key={index}
                                      product={product}
                                      shipErr={shipErrors}
                                      enable={isThere}
                                      cartId={product?._id}
                                      reloadCart={reloadCart}
                                      address={selectedAddress}
                                    />
                                  );
                                } else {
                                  return null;
                                }
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white shadow rounded-lg p-6">
                    <div
                      className="flex justify-between bg-[#F4F4F4] items-center py-3 px-4 cursor-pointer"
                      onClick={() => setOpenShipping(!openShipping)}
                    >
                      <h2 className="flex justify-between items-center font-semibold text-lg">
                        Calculate Shipping
                      </h2>
                      <div className="transition-all duration-300">
                        {openShipping ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </div>
                    </div>
                    {openShipping ? (
                      <div className="py-4 px-4 animate__animated animate__fadeIn">
                        {addresses.length > 0 ? (
                          addresses.map((address: any, index: any) => (
                            <label
                              key={index}
                              className="flex items-center space-x-3 mb-2"
                            >
                              <Input
                                type="radio"
                                name="address"
                                value={address?.address}
                                onChange={() =>
                                  handleCalculateShipping(address)
                                }
                                checked={selectedAddress?.id === address.id}
                                className="form-radio h-4 w-4 text-indigo-600 accent-[#B90647]"
                              />

                              <p className="text-sm text-gray-700 ">
                                {address?.address}, {address?.city},{" "}
                                {address?.state}, {address?.country},{" "}
                                {address?.postCode}
                              </p>
                            </label>
                          ))
                        ) : (
                          <>
                            <p className="text-[14px] text-brown">
                              No addresses available.
                              <span
                                className="text-[14px] text-secondary hover:underline font-medium cursor-pointer"
                                onClick={() =>
                                  router.push(
                                    "/profile?tab=address&redirect=quote"
                                  )
                                }
                              >
                                Click here to Add
                              </span>
                            </p>
                          </>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}

                    {/* Total */}

                    {summaryLoading ? (
                      <>
                        {" "}
                        <div className="mt-4">
                          <div className="w-full h-[30px] mb-4 flex justify-between items-center">
                            <Skeleton className="h-[30px] w-[180px] mb-4" />
                            <Skeleton className="h-[30px] w-[130px] mb-4" />
                          </div>
                          <div className="w-full h-[30px] mb-4 flex justify-between items-center">
                            <Skeleton className="h-[30px] w-[180px] mb-4" />
                            <Skeleton className="h-[30px] w-[130px] mb-4" />
                          </div>
                          <div className="w-full h-[30px] mb-4 flex justify-between items-center">
                            <Skeleton className="h-[30px] w-[180px] mb-4" />
                            <Skeleton className="h-[30px] w-[130px] mb-4" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 border-t-2">
                          <div className="flex justify-between items-center mb-4">
                            <p>Subtotal </p>
                            {Number(cost?.price - cost?.taxes) ? (
                              <p className="text-brown font-regular text-md">
                                <span className="text-brown text-lg font-normal font-mono mr-[5px]">
  {/* Content here */}


                                  {" "}
                                  ₹
                                </span>{" "}
                                {formatCurrencyInIndianStyle(
                                  Number(cost?.price - cost?.taxes)
                                )}
                              </p>
                            ) : (
                              "-"
                            )}
                          </div>
                          {cost?.discount > 0 && (
                            <div className="flex justify-between items-center mb-4">
                              <p>Discount</p>
                              <p className="text-[#009886] font-regular text-md">
                                -{" "}
                                <span
                                  className="text-brown text-lg font-normal font-mono mr-[5px]"

                                >
                                  {" "}
                                  ₹
                                </span>{" "}
                                {cost?.discount || 0}
                              </p>
                            </div>
                          )}

                          <div className="flex justify-between items-center mb-4">
                            <p>Delivery Charges</p>
                            <p>
                              {addresses.length > 0 ? (
                                cost?.deliveryCharges > 0 ? (
                                  <span className="">
                                    <span
                                     className="text-brown text-lg font-normal font-mono mr-[5px]"
                                    >
                                      ₹
                                    </span>
                                    {formatCurrencyInIndianStyle(
                                      cost?.deliveryCharges
                                    )}
                                  </span>
                                ) : (
                                  <span className="text-[#009886]">Free</span>
                                )
                              ) : (
                                <span className="text-gray-500">Not Available</span>
                              )}
                            </p>
                          </div>
                          <div className="flex justify-between items-center mb-1">
                            <p>Taxes</p>
                            {Number(cost?.taxes) ? (
                              <p>
                                {cost?.taxes > 0 ? (
                                  <span className="text-brown font-regular text-md">
                                    <span
                                      className="text-brown text-lg font-normal font-mono mr-[5px]"

                                    >
                                      ₹
                                    </span>
                                    {formatCurrencyInIndianStyle(
                                      Number(cost?.taxes)
                                    )}
                                  </span>
                                ) : (
                                  <span className="text-[#009886]">NA</span>
                                )}
                              </p>
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center font-semibold text-lg mt-0 py-3 px-4 bg-secondaryBg ">
                            <p>Total</p>
                            <p className="text-brown font-semibold text-md">
                              {summaryLoading ? (
                                <Skeleton className="h-[10px] w-[180px] mb-4" />
                              ) : (
                                <>
                                  {" "}
                                  <span
                                   className="text-brown text-lg font-normal font-mono mr-[5px]"

                                  >
                                    ₹
                                  </span>
                                  {formatCurrencyInIndianStyle(cost?.totalCost)}
                                </>
                              )}
                            </p>
                          </div>
                          {cost?.roundedValue !== 0 && (
                            <p className="text-brown w-full text-start px-2 text-xs font-regular">
                              {" "}
                              Amount rounded off to{" "}
                              <span
                                className="text-brown text-xs font-normal font-mono mr-0"

                              >
                                ₹
                              </span>
                              <span>{cost?.roundedValue}*</span>
                            </p>
                          )}
                        </div>
                      </>
                    )}
                    {/* {quoteCond && (
                      <p className="text-secondary text-md font-regular">Note : You can request for a quote for this order.</p>
                    )} */}

                    {/* Remarks */}
                    <div className="mt-6">
                      <label
                        htmlFor="remarks"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Order Instructions
                      </label>
                      <CustomInput
                        placeholder="Remarks"
                        isTextArea={true}
                        customStyles={{
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          color: "black",
                        }}
                        onChange={(e: any) => {
                          setCookie("CheckoutReason", e);
                          setOrderInstructions(e);
                          if (e.length < 3) {
                            setInstErrMssg(
                              "Order Instruction must minimum of 3 characters"
                            );
                          } else {
                            setInstErrMssg("");
                          }
                        }}
                      />
                      {instErrMssg && (
                        <p className="text-[#d22525] text-sm font-regular">
                          {instErrMssg}
                        </p>
                      )}
                    </div>

                    {/* Checkout Button */}
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 mb-4 my-3">
                        Price includes tax.
                        <span className="text-[#009886]">
                          {" "}
                          Shipping costs{" "}
                        </span>{" "}
                        will be calculated at checkout.
                      </p>
                      <Button
                        disabled={
                          enableCheckout == true && !showStockMssg
                            ? false
                            : true
                        }
                        onClick={handleOnClickCheckout}
                        className={`${
                          enableCheckout ? "opacity-100" : "opacity-50"
                        } my-3 bg-secondary hover:bg-primary   h-12 md:h-12 md:w-full w-full md:text-md text-sm text-white`}
                      >
                        Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyCart />
            )}
          </>
        )}

        <div>
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
};

export default Cart;
