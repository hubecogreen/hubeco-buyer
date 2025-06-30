"use client";
// import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import * as getEndpoint from "../../network/EndPoints";
import useRefreshToken from "../hooks/useRefreshToken";
import { toast } from "react-hot-toast";
import useApi from "../Fetcher/useAPI";
import { CircularProgress } from "@chakra-ui/react";
import store from "@/reduxStore";
import { useDispatch } from "react-redux";
import {
  saveCart,
  saveCartCount,
  saveWishlist,
} from "@/reduxStore/slices/userSlice";
import { setCookie, getCookie } from "cookies-next";
import { normalizePath } from "@/lib/utils";

const ProductCard = ({
  product,
}: {
  product: {
    brand: string;
    brandId: string;
    category: string;
    categoryId: string;
    childCategories: string[];
    discountedPrice: number;
    image: string;
    mrp: number;
    productName: string;
    productId: string;
    slug: string;
    variantId: string;
    subcategory: string[];
    vendor: string;
    minBuyQty: number;
    maxBuyQty: number;
    platformPrice: any;
    purchaseType: any;
  };
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [addtoCartPayload, setAddtoCartPayload] = useState<any>("");
  const [loadingCartButton, setLoadingCartButton] = useState(false);
  const [loadingQuoteButton, setLoadingQuoteButton] = useState(false);
  const [minQty, setMinQty] = useState<number>(product?.minBuyQty);
  const [maxQty, setMaxQty] = useState<number>(product?.maxBuyQty);
  const [quantity, setQuantity] = useState(minQty);
  const [wishlistId, setWIshlistId] = useState("");
  const wishlistReduxData = store.getState()?.user?.wishlistRedux;
  const dispatch = useDispatch();
  const token = getCookie("token");

  const router = useRouter();
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const { refreshTokens } = useRefreshToken();
  const { callApi } = useApi();

  const handleCartApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      // toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      dispatch(saveCart([]));
      dispatch(saveCartCount([]));
      setCookie("CartCount", "");
      // toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getCart();
      // toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const getCart = async () => {
    try {
      const result = (await callApi(getEndpoint.default.CART, "GET")) as any;
      if (result.data == null) {
        handleCartApiError(result?.errorData);
      } else {
        dispatch(saveCart(result?.data?.items || []));
        dispatch(saveCartCount(result?.data?.items?.length || 0));
        setCookie("CartCount", result?.data?.items?.length);
      }
    } catch (e: any) {
      handleCartApiError(e);
    } finally {
    }
  };

  useEffect(() => {
    if (token && wishlistReduxData && wishlistReduxData.length > 0) {
      wishlistReduxData.forEach((item: any) => {
        if (item?.product?._id === product?.variantId) {
          setIsClicked(true);
          setWIshlistId(item?._id);
        }
      });
    }
  }, []);

  const handleApiError = async (err: any, id: any) => {
    const result = err?.response;

    if (result?.status === 400) {
      if (result?.data?.message == "Item out of stock") {
        toast.error("Out of Stock");
      }
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      addToCart(id);
    } else {
      toast.error(result?.data?.message);
    }
  };

  const handleWishlistApiError = async (err: any, id: any) => {
    const result = err?.response;
    // console.log("ComingHandleWish", result);

    if (result?.status === 400) {
      toast.error("No Products to display");
    } else if (result?.status === 404) {
      if (
        result?.data?.message == "Product not found" &&
        result?.data?.intent == "ERROR"
      ) {
        toast.error("Product Not Found");
      } else {
        toast.error("Invalid Request");
      }
    } else if (result?.status === 401) {
      await refreshTokens();
      addToWishlist(id);
    } else {
      toast.error(result?.data?.message);
    }
  };

  const handlegetWApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getWishlist();
    } else {
      toast.error(result?.data?.message);
    }
  };

  const getWishlist = async () => {
    try {
      const result = (await callApi(
        getEndpoint.default.WISHLIST,
        "GET"
      )) as any;
      if (result.data == null) {
        handlegetWApiError(result?.errorData);
      } else {
        dispatch(saveWishlist(result?.data?.data));
      }
    } catch (e: any) {
      handlegetWApiError(e);
    } finally {
    }
  };

  const addToCart = async (id?: any) => {
    const payloadData = {
      product: id,
      quantity: quantity,
    };
    setAddtoCartPayload(id);
    setLoadingCartButton(true);

    try {
      const result = (await callApi(
        getEndpoint.default.ADDTOCART,
        "POST",
        payloadData
      )) as any;

      if (result?.data === null) {
        handleApiError(result?.errorData, id);
      } else {
        setCookie("CartCount", result?.data?.items.length);
        toast.success("Product Added to Cart Successfully", {
          iconTheme: {
            primary: "#439787",
            secondary: "#FFFAEE",
          },
          duration: 3000,
        });
        router.refresh();
      }
    } catch (error) {
      handleApiError(error, id);
    } finally {
      setLoadingCartButton(false);
    }
  };

  const addToWishlist = async (id: any) => {
    const payloadData = {
      productVariantId: id,
      quantity: 1,
    };
    try {
      const result = (await callApi(
        getEndpoint.default.ADDTOWISHLIST,
        "POST",
        payloadData
      )) as any;

      if (result?.data == null) {
        handleWishlistApiError(result?.errorData, id);
      } else {
        // // console.log('wishshshs',result?.data)
        toast.success("Product Added to Wishlist Successfully", {
          iconTheme: {
            primary: "#439787",
            secondary: "#FFFAEE",
          },
          duration: 3000,
        });
        setIsClicked(true);
        setWIshlistId(result?.data?._id);
        getWishlist();
      }
    } catch (error: any) {
      handleWishlistApiError(error, id);
    }
  };

  const deleteWishlist = async (id: any) => {
    try {
      const result = await callApi(
        `${getEndpoint.default.WISHLIST}/${wishlistId}`,
        "DELETE"
      );
      if (result?.data == null) {
        handleWishlistApiError(result?.errorData, id);
      } else {
        toast.success("Product Removed from Wishlist Successfully", {
          iconTheme: {
            primary: "#439787",
            secondary: "#FFFAEE",
          },
          duration: 3000,
        });
        setIsClicked(false);
        getWishlist();
      }
    } catch (error) {
      handleWishlistApiError(error, id);
    }
  };

  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle the background color on click
  };

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

  const taxValue = (totalCost: any, tax: any) => {
    // console.log("tbtyn", totalCost, tax, totalCost * (1 + tax / 100));
    // return totalCost * (1 + tax / 100);
    const taxValue = (totalCost * tax) / 100;
    const totalCostAfterTax = totalCost + taxValue;
    return taxValue;
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

  const OnClickQuote = (slug: any) => {
    if (token) {
      // console.log("tokenOne");
      router.push(`/${slug}?qt=open`);
    } else {
      // console.log("tokenOneNot");
      router.push("/login");
    }
  };

  return (
    <div
      className={`bg-white group border border-borderGray rounded-sm overflow-hidden shadow-sm hover:bg-[#E8E8E8] hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
    >
      <div className="relative">
        <Image
          //   src={'/images/product-placeholder.jpg'}
          // src={
          //   product?.image
          //     ? (assetURL + "/" + product?.image).includes("//admin")
          //       ? (assetURL + "/" + product?.image).replace("//admin", "/admin")
          //       : `${assetURL}/${product?.image}`
          //     : "/images/product-placeholder.jpg"
          // }
          src={
            product?.image
              ? normalizePath(`${assetURL}/${product?.image}`)
              : "/images/product-placeholder.jpg"
          }
          alt={product?.productName}
          className="w-full h-[314px] object-contain px-4 pt-10"
          height={100}
          width={100}
          onError={(e) => {
            e.currentTarget.src = "/images/failedToLoadImage.jpg";
          }}
          loading="lazy"
          quality={100}
          onClick={() => router.push(`/${product.slug}`)}
        />
        <div className="flex">
          {/* {product?.mrp == product?.discountedPrice ? null : (
            <>
              {calculateDiscountPercentage(
                product?.mrp,
                product?.discountedPrice
              ) > 0 ? (
                <div className="absolute top-2 left-4 bg-white text-[#388E3C] text-xs font-bold px-2 py-1 shadow-xl  ">
                  {calculateDiscountPercentage(
                    product?.mrp,
                    product?.discountedPrice
                  )}
                  % off
                </div>
              ) : (
                <></>
              )}
            </>
          )} */}
          <div className="absolute top-2 right-4    ">
            <div
              // onClick={handleClick}
              className={` hover:cursor-pointer group `}
            >
              {isClicked ? (
                <>
                  <IoBookmark
                    color="#A92449" // Change stroke color on click
                    className="group-hover:text-white cursor-pointer z-50"
                    size={25}
                    onClick={() => deleteWishlist(product?.variantId)}
                    // onClick={() => router.push("/coming-soon")}
                  />
                </>
              ) : (
                <>
                  <CiBookmark
                    color="#A92449" // Change stroke color on click
                    className="group-hover:text-white cursor-pointer z-50"
                    size={25}
                    onClick={() => addToWishlist(product?.variantId)}
                    // onClick={() => router.push("/coming-soon")}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 ">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3
            onClick={() => router.push(`/${product.slug}`)}
            className="text-lg font-medium text-[#01B6A3] mb-1 h-14 flex items-start w-full text-left overflow-hidden"
          >
            <span className="line-clamp-2">{product.productName}</span>
          </h3>

          {/* <div className="flex justify-between items-center">
            {false ? (
              <></>
            ) : product?.mrp && product?.discountedPrice ? (
              <div className="flex items-center flex-row">
                {product?.mrp == product?.discountedPrice ? (
                  <>
                    <p className="text-xl text-[#01B6A3] font-bold">
                      <span className="text-xl text-[#01B6A3] mr-1 font-normal font-mono">
                        ₹
                      </span>

                      {formatCurrencyInIndianStyle(product?.platformPrice)}
                    </p>
                  </>
                ) : (
                  <p className="text-xl text-[#01B6A3] font-bold">
                    <span className="text-xl text-[#01B6A3] mr-1 font-normal font-mono">
                      ₹
                    </span>

                    {formatCurrencyInIndianStyle(product?.platformPrice)}
                  </p>
                )}
              </div>
            ) : (
              <></>
            )}
          </div> */}
          <div className="flex justify-between items-center">
            {product?.purchaseType !== "QUOTE" &&
              product?.mrp &&
              product?.discountedPrice && (
                <div className="flex items-center flex-row">
                  <p className="text-xl text-[#01B6A3] font-bold">
                    <span className="text-xl text-[#01B6A3] mr-1 font-normal font-mono">
                      ₹
                    </span>
                    {formatCurrencyInIndianStyle(product?.platformPrice)}
                  </p>
                </div>
              )}
          </div>
        </div>
        {/* <p className="text-sm text-gray-600 mb-2">{product.description}</p> */}
        <div className="flex items-center justify-between md:gap-6 gap-2 mt-2 ">
          {product?.purchaseType == "ONLINE" ? (
            <Button
              disabled={loadingCartButton}
              onClick={() => addToCart(product?.variantId)}
              // onClick={() => router.push("/coming-soon")}
              className="z-10 w-[50%] bg-secondary text-white py-2 px-4 rounded group-hover:bg-secondary hover:bg-primary transition duration-300 flex items-center justify-center gap-2"
            >
              {/* {product.action}{" "}
             {product.action === "Add to Cart" && <ArrowRight size={16} />} */}
              {loadingCartButton ? (
                <>
                  <CircularProgress color="#ffffff" size={6} />
                </>
              ) : (
                <> Add to Cart</>
              )}
            </Button>
          ) : product?.purchaseType == "QUOTE" ? (
            <Button
              disabled={loadingQuoteButton}
              variant={"outline"}
              // onClick={() => router.push(`/${product.slug}?qt=open`)}
              onClick={() => OnClickQuote(product?.slug)}
              className="z-10 w-[50%] bg-secondary text-white hover:text-white py-2 px-4 rounded group-hover:bg-secondary hover:bg-primary transition duration-300 flex items-center justify-center gap-2 md:text-[12px]"
            >
              {/* {product.action}{" "}
            {product.action === "Add to Cart" && <ArrowRight size={16} />} */}
              {loadingQuoteButton ? (
                <>
                  <CircularProgress color="#ffffff" size={6} />
                </>
              ) : (
                <> Request Quote</>
              )}
            </Button>
          ) : product?.purchaseType == "MULTI" ? (
            <>
              <Button
                disabled={loadingCartButton}
                onClick={() => addToCart(product?.variantId)}
                // onClick={() => router.push("/coming-soon")}
                className="z-10 w-[50%] bg-secondary text-white py-2 px-4 rounded group-hover:bg-secondary hover:bg-primary transition duration-300 flex items-center justify-center gap-2"
              >
                {/* {product.action}{" "}
             {product.action === "Add to Cart" && <ArrowRight size={16} />} */}
                {loadingCartButton ? (
                  <>
                    <CircularProgress color="#ffffff" size={6} />
                  </>
                ) : (
                  <> Add to Cart</>
                )}
              </Button>
              <Button
                disabled={loadingQuoteButton}
                variant={"outline"}
                // onClick={() => router.push(`/${product.slug}?qt=open`)}
                onClick={() => OnClickQuote(product?.slug)}
                className="z-10 w-[50%] hover:bg-white hover:text-secondary  text-secondary border-secondary py-2 px-4 rounded  transition duration-300 flex items-center justify-center gap-2"
              >
                {/* {product.action}{" "}
            {product.action === "Add to Cart" && <ArrowRight size={16} />} */}
                {loadingQuoteButton ? (
                  <>
                    <CircularProgress color="#ffffff" size={6} />
                  </>
                ) : (
                  <> Request Quote</>
                )}
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
