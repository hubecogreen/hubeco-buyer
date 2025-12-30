"use client";
import React, { useState } from "react";
import { GoArrowRight, GoBookmark, GoTrash } from "react-icons/go";
import CustomButton from "../customButton/CustomButton";
import styles from "./WishListCard.module.css";
import { toast } from "react-hot-toast";
import * as getEndpoint from "../../network/EndPoints";
import useApi from "../Fetcher/useAPI";
import useRefreshToken from "../hooks/useRefreshToken";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BsExclamationCircle } from "react-icons/bs";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { saveWishlist } from "@/reduxStore/slices/userSlice";
import { useDispatch } from "react-redux";
import { normalizePath } from "@/lib/utils";

interface ProductCardProps {
  wishlistId: string;
  product: any;
  calculateDiscountPercentage: (mrp: number, discountPrice: number) => number;
  handleWishlistClick: (slug: string) => void;
  getWishlist: () => void;
  reloadWishlist: () => void;
}

const WishListCard: React.FC<ProductCardProps> = ({
  wishlistId,
  product,
  calculateDiscountPercentage,
  handleWishlistClick,
  getWishlist,
  reloadWishlist,
}) => {
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const [loadingCartButton, setLoadingCartButton] = useState(false);
  const [loadingQuoteButton, setLoadingQuoteButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteItemLoading, setDeleteItemLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  const token = getCookie("token");

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

  const handleDeleteWishlist = async () => {
    try {
      await callApi(`${getEndpoint.default.WISHLIST}/${wishlistId}`, "DELETE");
      getWishlist();
    } catch (error) {
      return error;
    }
  };

  const addToCart = async (id?: any) => {
    const payloadData = {
      product: id,
      quantity: 1,
    };
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
        await handleDeleteWishlist();
        setCookie("CartCount", result?.data?.items.length);
        toast.success("Product Added to Cart Successfully", {
          iconTheme: {
            primary: "#439787",
            secondary: "#FFFAEE",
          },
          duration: 3000,
        });
        reloadWishlist();
        router.refresh();
        window.location.reload();
      }
    } catch (error) {
      // // console.log(error);
      handleApiError(error, id);
    } finally {
      setLoadingCartButton(false);
    }
  };

  const handleWishlistApiError = async (err: any, id: any) => {
    const result = err?.response;

    if (result?.status === 400) {
      toast.error("No Products to display");
    } else if (result?.status === 404) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message == "wishlist not found"
      ) {
        toast.error("Product Not Found");
      } else {
        toast.error("Invalid Request");
      }
    } else if (result?.status === 401) {
      await refreshTokens();
      deleteWishlist(id);
    } else {
      toast.error(result?.data?.message);
    }
  };

  const deleteWishlist = async (id: any) => {
    setDeleteItemLoading(true);
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
        setOpen(false);
        reloadWishlist();
      }
    } catch (error) {
      handleWishlistApiError(error, id);
    } finally {
      setDeleteItemLoading(false);
      setOpen(false);
    }
  };

  const taxValue = (totalCost: any, tax: any) => {
    // console.log("tbtyn", totalCost, tax, totalCost * (1 + tax / 100));
    // return totalCost * (1 + tax / 100);
    const taxValue = (totalCost * tax) / 100;

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

  const OnClickQuote = (slug: string) => {
    setLoadingQuoteButton(true);
    try {
      if (token) {
        // console.log("tokenOne");
        router.push(`/${slug}?qt=open`);
      } else {
        // console.log("tokenOneNot");
        router.push("/login");
      }
    } finally {
      setLoadingQuoteButton(false);
    }
  };

  return (
    <div
      className={`${styles.productCard} flex flex-col md:flex-row mx-auto my-2 md:my-4 hover-card w-full md:w-1/2 lg:w-full`}
    >
      <div className="product-card-body w-full">
        <Image
          onClick={() => handleWishlistClick(product?.slug)}
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
          width={300}
          height={300}
          onError={(e) => {
            e.currentTarget.src = "/images/failedToLoadImage.webp";
          }}
          loading="lazy"
          alt={product?.title}
          className={`${styles.productImage} w-full h-auto object-cover cursor-pointer`}
        />
        <div className="flex flex-row md:flex-row justify-between items-start mt-5 w-full">
          <div className=" w-[83%]">
            <h3 className="text-primary text-lg font-medium text-left product-card-title ">
              {/* { product?.productName?product?.productName:'' +" "+ product?.variantName?product?.variantName:""} */}
              {product?.productId?.isSingleProduct ? (
                <>
                  {product?.productName?.length > 30
                    ? product?.productName?.slice(0, 30) + "..."
                    : product?.productName}
                </>
              ) : (
                <>
                  {product?.variantName?.length > 30
                    ? product?.variantName?.slice(0, 30) + "..."
                    : product?.variantName}
                </>
              )}
            </h3>
          </div>
          <div className=" w-[15%]">
            <Button
              type="button"
              onClick={() => setOpen(true)}
              className="bg-transparent text-lg hover:bg-transparent  text-secondary w-full p-1 bg-secondary/15 hover:bg-secondary/15"
            >
              <GoTrash />
            </Button>
            {open ? (
              <AlertDialog open={open}>
                <AlertDialogOverlay className="z-50 pointer-events-none bg-[rgba(0,0,0,0.5)]" />

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <BsExclamationCircle
                      className="w-full flex justify-center items-center text-center mb-4"
                      color="#B90647"
                      size={45}
                    />
                    <AlertDialogTitle className="text-center pb-5 mb-5">
                      Are you sure you want to delete this item from the
                      wishlist?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex sm:justify-center justify-center w-full items-center">
                    <AlertDialogCancel
                      onClick={() => setOpen(false)}
                      className=" h-[35px] md:h-[45px] md:w-24  text-black  w-16"
                    >
                      No
                    </AlertDialogCancel>
                    <CustomButton
                      title={"Yes"}
                      className="ml-3 bg-secondary hover:bg-primary h-[35px] md:h-[45px] md:w-24  w-16 md:text-md text-sm text-white "
                      customStyles={{}}
                      onPress={() => deleteWishlist(product?._id)}
                      type="submit"
                      loading={deleteItemLoading}
                    />
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : null}
          </div>
        </div>
        {/* <p className="text-fontGray text-xs text-left mt-3 mb-5 product-card-desc">
          {product && product?.description}
        </p> */}
        <div
          className={`${styles.priceSection} mt-5 flex flex-row md:flex-row justify-between items-center hover-card w-full`}
        >
          {product?.productId.purchaseType === "QUOTE" ? (
            <CustomButton
              title={loadingQuoteButton ? "Loading..." : "Request Quote"}
              className={`${styles.addToCart} bg-primary hover:bg-secondary  w-36 p-2 h-12 md:h-10 justify-around items-center font-semibold text-xs md:text-xs text-white`}
              onPress={() => OnClickQuote(product?.slug)}
              loading={loadingQuoteButton}
            />
          ) : (
            <CustomButton
              title={
                product?.status === "PUBLISHED" ? "Add to Cart" : "Out of Stock"
              }
              className={`${styles.addToCart} bg-primary ${
                product?.status === "PUBLISHED" ? "hover:bg-primary" : ""
              } w-36 p-2 h-12 md:h-10 justify-around items-center font-semibold text-xs md:text-xs text-white`}
              hoverBgColor="#439787"
              hoverColor="#ffffff"
              rightIcon={<GoArrowRight />}
              onPress={() => addToCart(product?._id)}
              loading={loadingCartButton}
              permanentDisable={product?.status !== "PUBLISHED"}
            />
          )}
          <div className={`${styles.price} md:text-right text-left`}>
            {product?.productId.purchaseType === "QUOTE" ? (
              <></>
            ) : product?.MRP && product?.discountedPrice ? (
              <div className="flex items-center  flex-row">
                {product?.MRP == product?.discountedPrice ? (
                  <>
                    <p className="text-xl text-[#01B6A3] font-bold">
                      <span className="text-xl text-[#01B6A3] mr-1 font-normal font-monospace">
                        ₹
                      </span>

                      {formatCurrencyInIndianStyle(product?.platformPrice)}
                    </p>
                  </>
                ) : (
                  <p className="text-xl text-[#01B6A3] font-bold">
                    <span className="text-xl text-[#01B6A3] mr-1 font-normal font-monospace">
                      ₹
                    </span>

                    {formatCurrencyInIndianStyle(product?.platformPrice)}
                  </p>
                )}
                {/* <p
                  className={`${
                    product.mrp == product?.discountedPrice
                      ? "text-xl text-[#01B6A3] font-bold"
                      : "text-md  font-medium text-[#ababab] line-through ml-2"
                  }`}
                >
                  <span className="text-xl text-[#01B6A3] mr-1" style={{fontWeight:'400',fontFamily:'monospace'}}> ₹</span>{product?.platformPrice}
                </p> */}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* <div className={styles.viewButton}>
          <p className="text-black font-normal text-sm text-center">View</p>
        </div> */}
      </div>
    </div>
  );
};

export default WishListCard;
