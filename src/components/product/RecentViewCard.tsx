// import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import * as getEndpoint from "../../network/EndPoints";
import useRefreshToken from "../hooks/useRefreshToken";
import { toast } from "react-hot-toast";
import useApi from "../Fetcher/useAPI";
// import { CircularProgress } from "@chakra-ui/react";
import store from "@/reduxStore";
import { useDispatch } from "react-redux";
import { saveWishlist } from "@/reduxStore/slices/userSlice";
import { setCookie } from "cookies-next";
import { normalizePath } from "@/lib/utils";

const RecentViewCard = ({
  product,
  purchaseType,
}: {
  product: any;
  purchaseType?: any;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [addtoCartPayload, setAddtoCartPayload] = useState<any>("");
  const [loadingCartButton, setLoadingCartButton] = useState(false);
  const [minQty, setMinQty] = useState<number>(product?.minBuyQty);
  const [maxQty, setMaxQty] = useState<number>(product?.maxBuyQty);
  const [quantity, setQuantity] = useState(minQty);
  const wishlistReduxData = store.getState()?.user?.wishlistRedux;
  const dispatch = useDispatch();

  const router = useRouter();
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const { refreshTokens } = useRefreshToken();
  const { callApi } = useApi();
  const [wishlistId, setWishlistId] = useState<string>("");

  // // console.log('cewbent',product)

  useEffect(() => {
    if (wishlistReduxData && wishlistReduxData.length > 0) {
      wishlistReduxData.forEach((item: any) => {
        if (item?.product?._id === product?._id) {
          setIsClicked(true);
          setWishlistId(item?._id);
        }
      });
    }
  }, []);

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

  const handleApiError = async (err: any, id: any) => {
    const result = err?.response;

    if (result?.status === 400) {
      toast.error("No Products to display");
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

    if (result?.status === 400) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message == "Item out of stock"
      ) {
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

      if (result?.data == null) {
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
    } catch (error: any) {
      // // console.log(error);
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
        getWishlist();
        setIsClicked(true);
        setWishlistId(result?.data?._id);
      }
    } catch (error) {
      // // console.log(error);
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
        getWishlist();
        toast.success("Product Removed from Wishlist Successfully", {
          iconTheme: {
            primary: "#439787",
            secondary: "#FFFAEE",
          },
          duration: 3000,
        });
        setIsClicked(false);
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
    <div
      className={`bg-cream group border border-borderGray rounded-sm overflow-hidden shadow-sm hover:border-primary hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
    >
      <div className="relative">
        <Image
          //   src={'/images/product-placeholder.webp'}
          // src={
          //   product?.thumbnail
          //     ? (assetURL + "/" + product?.thumbnail).includes("//admin")
          //       ? (assetURL + "/" + product?.thumbnail).replace(
          //           "//admin",
          //           "/admin"
          //         )
          //       : `${assetURL}/${product?.thumbnail}`
          //     : "/images/product-placeholder.webp"
          // }
          src={
            product?.thumbnail
              ? normalizePath(`${assetURL}/${product?.thumbnail}`)
              : "/images/product-placeholder.webp"
          }
          alt={product?.productName}
          className="w-full h-[314px] object-contain px-4 pt-10"
          height={100}
          width={100}
          quality={100}
          onError={(e) => {
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
          loading="lazy"
          onClick={() => router.push(`/${product.slug}`)}
        />
        <div className="flex">
          {/* {product?.MRP == product?.discountedPrice ? null : (
            <div className="absolute top-2 left-4 bg-white text-[#388E3C] text-xs font-bold px-2 py-1 shadow-xl  ">
              {calculateDiscountPercentage(
                product?.MRP,
                product?.discountedPrice
              )}
              % off
            </div>
          )} */}
          <div className="absolute top-2 right-4    ">
            <div
              // onClick={handleClick}
              className={` hover:cursor-pointer group `}
            >
              {isClicked ? (
                <>
                  <IoBookmark
                    color="#109989" // Change stroke color on click
                    className="group-hover:text-white cursor-pointer z-50"
                    size={25}
                    onClick={() => deleteWishlist(product?._id)}
                    // onClick={() => router.push("/coming-soon")}
                  />
                </>
              ) : (
                <>
                  <CiBookmark
                    color="#109989" // Change stroke color on click
                    className="group-hover:text-white cursor-pointer z-50"
                    size={25}
                    onClick={() => addToWishlist(product?._id)}
                    // onClick={() => router.push("/coming-soon")}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <h3
            onClick={() => router.push(`/${product?.slug}`)}
            className="text-[17px] font-medium text-[#01B6A3]  h-[50px] flex items-start max-w-[75%]"
          >
            {product?.productName == "N/A" ? (
              <>
                {product?.variantName?.length > 30
                  ? product?.variantName?.slice(0, 30) + "..."
                  : product?.variantName}
              </>
            ) : (
              <>
                {product?.productName?.length > 30
                  ? product?.productName?.slice(0, 30) + "..."
                  : product?.productName}
              </>
            )}
          </h3>

          {/* <div className="flex justify-between items-center">
            {purchaseType === "QUOTE" ? (
              <></>
            ) : product?.platformPrice ? (
              
              <p className="text-xl text-[#01B6A3] font-bold">
                <span className="text-xl text-[#01B6A3] mr-1 font-mono font-normal">
                  ₹
                </span>
                {formatCurrencyInIndianStyle(product?.platformPrice.toFixed(2))}
              </p>
            ) : (
              <></>
            )}
          </div> */}
        </div>
        {/* <p className="text-sm text-brown mb-2">{product.description}</p> */}
        {/* <div className="flex items-center justify-between space-x-3 mt-2 ">
          <Button
            disabled={loadingCartButton}
 
            onClick={() => router.push("/coming-soon")}
            className="z-10 w-[50%] bg-[#BCBCBC] text-white py-2 px-4 rounded group-hover:bg-secondary hover:bg-primary transition duration-300 flex items-center justify-center gap-2"
          >
      
            {loadingCartButton ? (
              <>
                <CircularProgress isIndeterminate color="inherit" size={20} />
              </>
            ) : (
              <> Add to Cart</>
            )}
          </Button>

          <div className="flex justify-between items-center">
            {product?.MRP && product?.discountedPrice ? (
              <div className="flex items-center  flex-row">
                {product?.MRP == product?.discountedPrice ? (
                  <></>
                ) : (
                  <span className="text-xl text-[#01B6A3] font-bold">
                    ₹{product?.discountedPrice}
                  </span>
                )}
                <span
                  className={`${
                    product.MRP == product?.discountedPrice
                      ? "text-xl text-[#01B6A3] font-bold"
                      : "text-md  font-medium text-[#ababab] line-through ml-2"
                  }`}
                >
                  ₹{product?.MRP}
                </span>
              </div>
            ) : (
              <div className="text-sm font-bold">Price on request</div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RecentViewCard;
