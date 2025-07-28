"use client";
import React, { useEffect, useState } from "react";
// import { GoArrowRight, GoBookmark } from "react-icons/go";
// import CustomButton from "../customButton/CustomButton";
// import { BsCart3 } from "react-icons/bs";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import * as getEndpoint from "../../network/EndPoints";
import toast from "react-hot-toast";
import useRefreshToken from "../hooks/useRefreshToken";
import useApi from "../Fetcher/useAPI";
import { useDispatch } from "react-redux";
import store from "@/reduxStore";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { CircularProgress } from "@chakra-ui/react";
import { getCookie, setCookie } from "cookies-next";
import { saveWishlist } from "@/reduxStore/slices/userSlice";
import { normalizePath } from "@/lib/utils";

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // // console.log('ewrtyu',product)
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const { refreshTokens } = useRefreshToken();
  const { callApi } = useApi();
  const [isClicked, setIsClicked] = useState(false);
  const [addtoCartPayload, setAddtoCartPayload] = useState<any>("");
  const [loadingCartButton, setLoadingCartButton] = useState(false);
  const [loadingQuoteButton, setLoadingQuoteButton] = useState(false);
  const [minQty, setMinQty] = useState<number>(product?.minBuyQty);
  const [maxQty, setMaxQty] = useState<number>(product?.maxBuyQty);
  const [quantity, setQuantity] = useState(minQty);

  const wishlistReduxData = store.getState()?.user?.wishlistRedux;
  const dispatch = useDispatch();
  const router = useRouter();
  const [wishlistId, setWishlistId] = useState<string>("");
  const token = getCookie("token");

  useEffect(() => {
    if (wishlistReduxData && wishlistReduxData.length > 0) {
      wishlistReduxData.forEach((item: any) => {
        if (item?.product?._id === product?.variantId) {
          // // console.log('abntemy',item?.product?._id,product?.variantId)
        }
        if (item?.product?._id === product?.variantId) {
          setIsClicked(true);
          setWishlistId(item?._id);
        }
      });
    }
  }, [isClicked]);

  const handleApiError = async (err: any, id: any) => {
    const result = err?.response;

    if (result?.status === 400) {
      if (
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
        router.refresh();
      }
    } catch (e: any) {
      handlegetWApiError(e);
    } finally {
    }
  };

  const handleWishlistApiError = async (err: any, id: any) => {
    const result = err?.response;

    if (result?.status === 400) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message[0]?.message ==
          "productVariantId must be a mongodb id"
      ) {
        toast.error("Invalid Product");
      } else {
        toast.error("Invalid Request");
      }
    } else if (result?.status === 404) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.messag == "wishlist not found"
      ) {
        toast.error("Wishlist Not Found");
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
        getWishlist();
        toast.success("Product Added to Wishlist Successfully", {
          iconTheme: {
            primary: "#439787",
            secondary: "#FFFAEE",
          },
          duration: 3000,
        });
        setIsClicked(true);
        setWishlistId(result?.data?._id);
      }
    } catch (error) {
      // // console.log(error);
      handleWishlistApiError(error, id);
    }
  };

  const deleteWishlist = async (id: any) => {
    // // console.log('cbentrymu',id)
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
        router.refresh();
      }
    } catch (error) {
      handleWishlistApiError(error, id);
    }
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

  const OnClickQuote = (slug: any) => {
    if (token) {
      // console.log("tokenOne");
      router.push(`/${slug}?qt=open`);
    } else {
      // console.log("tokenOneNot");
      router.push("/login");
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

  return (
    <div
      className={`${styles.productCard} md:flex md:mx-auto my-2 md:mt-2 md:mb-0 hover-card w-1/2 md:w-full`}
    >
      <div className="product-card-body w-full">
        <div className="flex justify-between w-full top-row items-center">
          {/* {product?.mrp == product?.discountedPrice ? null : ( */}
          <div
            className={`${styles.discountBadge} ${
              product?.mrp == product?.discountedPrice
                ? "opacity-0"
                : "opacity-100"
            }`}
          >
            {calculateDiscountPercentage(
              product?.mrp,
              product?.discountedPrice
            )}
            % off
          </div>
          {/* )} */}
          <div
            className={` w-6 h-6 align-center items-center justify-center flex rounded `}
          >
            {/* <BsCart3 color="white" size={16} className="align-center" /> */}
            {/* <GoBookmark color="white" size={16} className="align-center " /> */}
            {isClicked ? (
              <>
                <IoBookmark
                  color="#A92449" // Change stroke color on click
                  className="group-hover:text-white cursor-pointer z-10"
                  size={25}
                  onClick={() => deleteWishlist(product?.variantId)}
                />
              </>
            ) : (
              <>
                <CiBookmark
                  color="#A92449" // Change stroke color on click
                  className="group-hover:text-white cursor-pointer z-10"
                  size={25}
                  onClick={() => addToWishlist(product?.variantId)}
                />
              </>
            )}
          </div>
        </div>
        <Image
          // src={product && product.image}
          // src={
          //   product?.image
          //     ? (assetURL + "/" + product?.image).includes("//admin")
          //       ? (assetURL + "/" + product?.image).replace("//admin", "/admin")
          //       : `${assetURL}/${product?.image}`
          //     : "/images/product-placeholder.webp"
          // }
          src={
            product?.image
              ? normalizePath(`${assetURL}/${product?.image}`)
              : "/images/product-placeholder.webp"
          }
          alt='Product Image'
          className={styles.productImage}
          width={320}
          height={320}
          onError={(e) => {
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
          loading="lazy"
        />
        {/* <div
          className="block md:flex justify-start md:justify-between items-center mt-5"
          style={{}}
        >
          <div>
            <h3 className="text-primary text-lg font-semibold text-left product-card-title">
              {product && product.productName && product?.productName?.length > 45
              ? product?.productName.slice(0, 45) + "..."
              : product.productName}
            </h3>
          </div>
          <div className={`${styles.price} md:text-right text-left`}>
            <span className="font-bold text-base text-primary">
              {product && product.currentPrice}
            </span>
            <span className={styles.originalPrice}>
              {product && product.originalPrice}
            </span>
          </div>
        </div>
        <p className="text-fontGray md:text-base text-xs text-left mt-3 mb-5 product-card-desc">
          {product && product.description}
        </p>
        <div
          className={`${styles.priceSection} block md:flex justify-start md:justify-between items-center hover-card w-1/2 md:w-full`}
        >
          <CustomButton
            title={"Add to Cart"}
            className={`${styles.addToCart} z-50 lg:px-2 bg-bgGray  hover:bg-primary md:w-32 w-32 md:p-md p-0.5 h-8 md:h-12 justify-around md:justify-between items-center font-semibold text-tiny md:text-xs text-white  hover:bg-secondary`}
            customStyles={
              {
                // width: "130px",
                // alignSelf: "flex-start",
                // justifySelf: "flex-start",
                // backgroundColor: "#A92449",
              }
            }
            onPress={() => addToCart(product?.variantId)}
 
            hoverBgColor="#439787" // Hover background color
            hoverColor="#ffffff" // Hover text color
            // clickedColor="#2F318D" // Clicked background color
            rightIcon={<GoArrowRight />}
          />
          <CustomButton
            title={"Request Quote"}
            onPress={() => router.push(`/${product.slug}`)}
  
            className={`${styles.addToCart} lg:px-2 z-50 bg-bgGray md:mt-0 mt-2  hover:bg-primary  md:w-36  w-32  md:p-md p-0.5 h-8 md:h-12 justify-center md:justify-between items-center   font-semibold  text-tiny md:text-xs text-white  hover:bg-secondary`}
            customStyles={
              {
                // width: "140px",
                // alignSelf: "flex-start",
                // justifySelf: "flex-start",
                // backgroundColor: "#bcbcbc",
              }
            }
            hoverBgColor="#439787" // Hover background color
            hoverColor="#ffffff" // Hover text color
            // clickedColor="#2F318D" // Clicked background color
            rightIcon={<GoArrowRight />}
          />
        </div> */}
        <div className="p-4 ">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3
              onClick={() => router.push(`/${product.slug}`)}
              className="text-lg font-medium text-[#01B6A3] mb-1 h-14 flex items-start w-full text-left overflow-hidden"
            >
              <span className="line-clamp-2">{product.productName}</span>
            </h3>

            <div className="flex justify-between items-center">
              {/* {product?.purchaseType === "QUOTE" ? ( */}
              {product?.purchaseType === "QUOTE" ? (
                <></>
              ) : product?.mrp && product?.discountedPrice ? (
                <div className="flex items-center flex-row">
                  {product?.mrp == product?.discountedPrice ? (
                    <></>
                  ) : (
                    <p className="text-xl text-[#01B6A3] font-bold">
                      <span className="text-xl text-[#01B6A3] mr-1 font-mono font-normal">
                        ₹
                      </span>

                      {formatCurrencyInIndianStyle(product?.platformPrice)}
                    </p>
                  )}
                  <p
                    className={`${
                      product.mrp == product?.discountedPrice
                        ? "text-xl text-[#01B6A3] font-bold"
                        : "text-md font-medium text-[#ababab] line-through ml-2"
                    }`}
                  >
                    <span className="text-xl text-[#01B6A3] mr-1 font-mono font-normal">
                      ₹
                    </span>

                    {formatCurrencyInIndianStyle(product?.platformPrice)}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* <p className="text-sm text-gray-600 mb-2">{product.description}</p> */}
          <div className="flex items-center justify-between gap-6 mt-2 ">
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
                className="z-10 w-[50%] bg-secondary hover:text-white text-white py-2 px-4 rounded group-hover:bg-secondary hover:bg-primary transition duration-300 flex items-center justify-center gap-2"
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
                  // onClick={() => router.push("/coming-soon")}
                  onClick={() => OnClickQuote(product?.slug)}
                  className="z-10 w-[50%] hover:bg-white !hover:text-secondary !hover:border-white  !text-secondary border-secondary py-2 px-4 rounded  transition duration-300 flex items-center justify-center gap-2"
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
        <div
          className={styles.viewButton}
          onClick={() => router.push(`/${product.slug}`)}
        >
          <p className="text-black font-normal text-sm text-center">View</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
