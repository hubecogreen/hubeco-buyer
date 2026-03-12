"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircularProgress } from "@chakra-ui/react";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsCartPlus, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { FiFileText } from "react-icons/fi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";
import { TbMapPin2 } from "react-icons/tb";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import * as getEndpoint from "../../network/EndPoints";
import NotFoundPage from "../404/page";
import useApi from "../Fetcher/useAPI";
import useRefreshToken from "../hooks/useRefreshToken";
import BannerSection from "../sharedComponents/BannerSection";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import ReactImageMagnify from "react-image-magnify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import store from "@/reduxStore";
import {
  saveRecentProducts,
  saveWishlist,
} from "@/reduxStore/slices/userSlice";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { getCookie, setCookie } from "cookies-next";
import LottieWrapper from "../LottieWrapper";
import { useDispatch } from "react-redux";
import animationData from "../../../public/animations/nodatafound.json";
import AttributeDisplay from "./AttributeDisplay";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import QuoteCompo from "./QuoteCompo";
import RecentlyViewed from "./RecentlyViewed";
import SimilarProducts from "./SimilarProducts";
import useClient from "../hooks/useClient";
import Custom404 from "../404/page";
import { normalizePath } from "@/lib/utils";
import SubmitEnquiryModal from "../modals/SubmitEnquiryModal";

interface ProductProps {
  slug: string;
}

// const MAGNIFIER_SIZE = 620;
// const ZOOM_LEVEL = 3;
const ZOOM_LEVEL = 1.5;
const assetPath = process.env.NEXT_PUBLIC_ASSET_URL;
const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

const ProductDetails: React.FC<ProductProps> = ({ slug }: any) => {
  const [productsData, setProductsData] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [images2, setImages2] = useState<any>([]);
  const [minQty, setMinQty] = useState<number>(1);
  const [maxQty, setMaxQty] = useState<number>(1);
  const [quantity, setQuantity] = useState<any>(minQty);
  const [specificationData, setSpecificationData] = useState<any>([]);
  const [sustainability, setSustainability] = useState<any>([]);
  const [attachments, setAttachments] = useState<any>([]);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isSingle, setIsSingle] = useState<boolean>(false);
  const [isReturnable, setIsReturnable] = useState<boolean>(false);
  const [isRefundable, setIsRefundable] = useState<boolean>(false);
  const [isCancellable, setIsCancellable] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>([]);
  const [totalProduct, setTotalProduct] = useState<any>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [fourPage, setFourPage] = useState(false);
  const [productLoading, setProductLoading] = useState<boolean>(false);
  const [loadingCartButton, setLoadingCartButton] = useState(false);
  const [addtoCartPayload, setAddtoCartPayload] = useState<any>("");
  const [combinations, setCombinations] = useState<any>([]);
  const thumbnailRef = React.useRef<HTMLDivElement>(null);
  const [myAddress, setMyAddress] = useState<any>([]);
  const [submissionInstruction, setSubmissionInstruction] = useState<any>("");
  const [notes, setNotes] = useState<any>("");
  const [quoteDueDate, setQuoteDueDate] = useState<any>();
  const [productSelectedForQuote, setProductSelectedForQuote] = useState<any>(
    []
  );
  const [quantityForQuote, setQuantityForQuote] = useState<any[]>([]);
  const [minQuantityForQuote, setMinQuantityForQuote] = useState<any[]>([]);

  const [productListForTheQuote, setProductListForTheQuote] = useState<any>();
  // const [filteredAddress , setFilteredAddress] = useState<any>([]);
  const [addressError, setAddressError] = useState<string>("");
  const [dueDateError, setDueDateError] = useState<string>("");
  const [submissionInstructionError, setSubmissionInstructionError] =
    useState<string>("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [clickedOnSubmitQuote, setClickedOnSubmitQuote] = useState(false);
  const [notesError, setNotesError] = useState<string>("");
  const wishlistReduxData = store.getState()?.user?.wishlistRedux;
  const dispatch = useDispatch();
  const recentProducts = store.getState()?.user?.recentProducts;
  const recentPurchaseTypes = store.getState()?.user?.recentPurchaseTyes;
  const router = useRouter();
  const [showQtyTip, setShowQtyTip] = useState<boolean>(false);
  const [tooltipMsg, setTooltipMsg] = useState<string>("");
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();
  const [targetedCustomer, setTargetedCustomer] = useState<string>("not_set");

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const [newSelectedVariant, setNewSelectedVariant] = useState<any>("");
  const [addLoading, setAddLoading] = useState<boolean>(false);
  // const [zoomable, setZoomable] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  // const [position, setPosition] = useState<any>({
  //   x: 100,
  //   y: 100,
  //   mouseX: 0,
  //   mouseY: 200,
  // });

  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const token = getCookie("token");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [doneOpen, setDoneOpen] = useState<boolean>(false);
  const [pincode, setPincode] = useState("");
  const [deliveyAvailable, setDeliveyAvailable] = useState<any>(false);
  const [showMssg, setShowMssg] = useState<any>(false);
  const [availableStockVal, setAvailableStockVal] = useState<any>(null);
  const [vendorInfo, setvendorInfo] = useState<any>([]);
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});
  const [wishlistId, setWishlistId] = useState<string>("");
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [openEnquiryFlow, setOpenEnquiryFlow] = useState(false);
  const displayName = isSingle ? totalProduct?.name : productData?.variantName;
  const isLongVariant =
    (displayName && displayName.length > 17); // tweak threshold as you like

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);


  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(2);  // mobile
      } else {
        setVisibleCount(3);  // desktop
      }
    };

    updateVisibleCount(); // run on first load
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  //Scroll Props

  const secondSectionRef = useRef(null);
  const rightDivRef = useRef(null);

  const isClient = useClient();

  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [isRightDivFullyScrolled, setIsRightDivFullyScrolled] = useState(false);

  const countriesData = store.getState().masterData.countries;
  // console.log(countriesData, "countriesData");
  function fetchCountryNameFromData(code: string) {
    const country = countriesData.find((c: any) => c.code === code) as any;
    return country ? country.name : null;
  }
  const getCertificateHref = (totalProduct: any) => {
    const certificateImg = totalProduct?.certificate?.certificateImg;

    if (!certificateImg) {
      return "#";
    }

    const certificateUrl = `${assetURL}/${certificateImg}`;

    // Normalize the URL for both //admin and //staff
    if (certificateUrl.includes("//admin")) {
      return certificateUrl.replace("//admin", "/admin");
    }

    if (certificateUrl.includes("//staff")) {
      return certificateUrl.replace("//staff", "/staff");
    }

    return certificateUrl;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      const secondSection = secondSectionRef.current as HTMLElement | null;
      const rightDiv = rightDivRef.current as HTMLElement | null;

      if (!secondSection || !rightDiv) return;

      const secondSectionRect = secondSection.getBoundingClientRect();
      const secondSectionTop = secondSectionRect.top;

      if (
        secondSectionTop < 128 &&
        secondSectionTop > 0 &&
        !isRightDivFullyScrolled
      ) {
        document.body.classList.add("no-scroll");
        setIsScrollLocked(true);
      } else if (isRightDivFullyScrolled || secondSectionTop > 128) {
        document.body.classList.remove("no-scroll");
        setIsScrollLocked(false);
      }
    };

    const handleRightDivScroll = () => {
      const rightDiv = rightDivRef.current as HTMLElement | null;
      if (!rightDiv) return;
      if (
        rightDiv?.scrollTop + rightDiv?.clientHeight >=
        rightDiv?.scrollHeight
      ) {
        // Right div fully scrolled, allow moving to next section
        setIsRightDivFullyScrolled(true);
        document.body.classList.remove("no-scroll");
        setIsScrollLocked(false);
      } else {
        setIsRightDivFullyScrolled(false);
      }
    };

    const handleKeyDown = (e: any) => {
      if (!isScrollLocked) return;

      const rightDiv = rightDivRef.current as HTMLElement | null;
      if (!rightDiv) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        rightDiv.scrollTop += 40; // Adjust the speed as needed
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        rightDiv.scrollTop -= 40; // Adjust the speed as needed
      }

      handleRightDivScroll();
    };

    if (isScrollLocked) {
      rightDivRef.current?.addEventListener("scroll", handleRightDivScroll);
      document.addEventListener("keydown", handleKeyDown);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("scroll", handleScroll);
      rightDivRef.current?.removeEventListener("scroll", handleRightDivScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isScrollLocked, isRightDivFullyScrolled]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoomable, setZoomable] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setZoomable(true);
    updatePosition(e);
  };

  const handleMouseLeave = () => {
    setZoomable(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    updatePosition(e);
  };

  const updatePosition = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  useEffect(() => {
    getProductDetails();
    if (window) {
      const userInfo = JSON.parse(
        sessionStorage.getItem("buyerUserInfo") as string
      );
      if (userInfo) {
        setMyAddress(userInfo.addresses);
        // // console.log(userInfo.addresses, "sdhsagvdvas");
      }
      if (window) {
        const qt = window.location.href.split("?qt=")[1];
        if (qt && qt == "open" && checkBuyerLogin()) {
          setIsOpen((prev) => !prev);
        }
      }
    }
  }, [slug]);

  const handleApiError = async (err: any) => {
    const result = err && err.response;

    if (result?.status == 400) {
      toast.error("Buyer Not Found");
    } else if (result?.status == 401) {
      refreshTokens();
      getProductDetails();

      // toast.error('Unauthorized Request')
    } else if (result?.status == 404) {
      if (
        result?.data?.intent == "ERROR" &&
        result?.data?.message == "Product not found"
      ) {
        // toast.error("Product Not Found");
        setNotFound(true);
      } else {
        setFourPage(true);
      }
    } else if (result?.status == 500) {
      setNotFound(true);
      toast.error("Invalid Request");
    } else if (result?.status == 409) {
      toast.error("Something went wrong");
    } else {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Something went wrong"
      );
    }
  };

  const getProductDetails = async () => {
    setProductLoading(true);
    try {
      const result2 = (await callApi(
        `${getEndpoint.default.GETPRODUCTWITHSLUG}/${slug}`,
        "GET"
      )) as any;
      if (result2.data == null) {
        handleApiError(result2?.errorData);
      } else {
        const result = result2.data as any;
        // console.log("skdhflskjdf", result.product.targetCustomer);
        if (window) {
          const buyerInfo = window.sessionStorage.getItem("buyerUserInfo");
          if (buyerInfo !== null) {
            const buyer = JSON.parse(buyerInfo);
            if (buyer) {
              if (
                buyer?.buyerInfo?.buyerType !== result.product.targetCustomer &&
                result.product.targetCustomer !== "ALL"
              ) {
                handleApiError(result);
                setNotFound(true);
                return;
              }
            }
          }
        }
        result.product.certificateLink = getCertificateHref(result?.product);
        setTotalProduct(result?.product);
        setAvailableStockVal(result?.stockInformation);
        setvendorInfo(result?.vendorInfo);
        // setProductData(result.data)

        setAttachments(result?.product?.attachments);
        setIsSingle(result.product?.isSingleProduct);
        setIsCancellable(result.product?.isCancellable);
        setIsReturnable(result?.product?.isReturnable);
        setIsRefundable(result?.product?.isRefundable);

        if (result?.product?.isSingleProduct === true) {
          // dispatch(saveRecentProducts([result?.product]));

          setSpecificationData(result.product?.variants[0]?.specifications);
          setSustainability(result?.product?.variants[0]?.sustainability);
          AddtoRecent(result?.product?.variants[0]);
          setProductData(result.product?.variants[0]);
          setImages2(result.product?.variants[0]?.images);
          setMinQty(result.product?.variants[0]?.minBuyQty);
          setMaxQty(result.product?.variants[0]?.maxBuyQty);
          setQuantity(result.product?.variants[0]?.minBuyQty);
          setProductListForTheQuote(result?.product?.variants[0]);
          // console.log(
          //   "quantityForQuote",
          //   result?.product?.variants[0].minBuyQty
          // );
          setQuantityForQuote([result?.product?.variants[0]?.minBuyQty]);
          setMinQuantityForQuote([result?.product?.variants[0]?.minBuyQty]);
          setProductSelectedForQuote([result?.product?.variants[0]]);
        } else {
          // const groupedAttributes =groupAttributes(result.data?.variants);
          AddtoRecent(result?.selectedVariant);
          setProductData(result?.selectedVariant);
          setImages2(result?.selectedVariant?.images);
          setMinQty(result?.selectedVariant?.minBuyQty);
          setMaxQty(result?.selectedVariant?.maxBuyQty);
          setQuantity(result?.selectedVariant?.minBuyQty);
          setCombinations(result?.combinations);
          setSpecificationData(result.selectedVariant?.specifications);
          setSustainability(result?.selectedVariant?.sustainability);

          const selectedProduct = result.product.variants.filter(
            (elem: any, index: number) => {
              // console.log(elem, "elemelelel");
              if (elem._id === result?.selectedVariant?._id) {
                return elem;
              }
            }
          );
          const filterAllProduct = result.product.variants.filter(
            (elem: any, index: number) => {
              if (elem._id !== result?.selectedVariant?._id) {
                return elem;
              }
            }
          );
          // console.log(
          //   [selectedProduct, filterAllProduct].flat(),
          //   "filterAllProduct"
          // );
          setProductListForTheQuote([selectedProduct, filterAllProduct].flat());
          setQuantityForQuote([selectedProduct[0]?.minBuyQty]);
          setMinQuantityForQuote([selectedProduct[0]?.minBuyQty]);
          setProductSelectedForQuote([selectedProduct].flat());
        }
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      // setLoading(false)
      setProductLoading(false);
    }
  };

  const AddtoRecent = (product: any) => {
    // // console.log("ewbn", recentProducts);
    // Check if recentProducts exists and has items
    if (recentProducts && recentProducts?.length > 0) {
      const isAlreadyPresent = recentProducts.some(
        (item: any) => item?.HSN === product?.HSN
      );

      // If product is not already in the recent list
      if (!isAlreadyPresent) {
        // // console.log("Adding product to Recent Products array");

        // If recentProducts length is less than 4, add new product
        if (recentProducts.length < 4) {
          dispatch(saveRecentProducts([...recentProducts, product]));
        } else {
          // If recentProducts length is 4, remove the first item and add the new product
          dispatch(saveRecentProducts([...recentProducts.slice(1), product]));
        }
      } else {
        // // console.log("Product already in Recent Products, no need to add");
      }
    } else {
      // If recentProducts is empty, add the first product
      // // console.log("Added to Recent Products");
      dispatch(saveRecentProducts([product]));
    }
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images2?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex: any) =>
      prevIndex === 0 ? images2?.length - 1 : prevIndex - 1
    );
  };

  const handleIncrement = () => {
    setQuantity((prev: any) => prev + 1);
  };

  // Handle decrement
  const handleDecrement = () => {
    setQuantity((prev: any) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  // Handle manual input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutID);
    const value =
      e.target.value === "" ? "" : (parseInt(e.target.value, 10) as any);

    if (value === "") {
      setQuantity("");
      setShowQtyTip(false); // Hide tooltip while user is editing
    } else if (!isNaN(value) && value > 0) {
      setQuantity(value);
      if (value < minQty) {
        setShowQtyTip(value < minQty);
        setTooltipMsg(
          value < minQty ? `Minimum purchase quantity is ${minQty}` : ""
        );
      } else if (value > maxQty) {
        setShowQtyTip(value > maxQty);
        setTooltipMsg(
          value > maxQty ? `Maximum purchase quantity is ${maxQty}` : ""
        );
      } else {
      }

      // Delay to reset quantity if left empty or below minBuyQty
      setTimeoutID(
        setTimeout(() => {
          if (value === "" || (value < minQty && value !== "")) {
            setQuantity(minQty);
            setTooltipMsg("");
            setShowQtyTip(false);
          } else if (value === "" || (value > maxQty && value !== "")) {
            setQuantity(maxQty);
            setTooltipMsg("");
            setShowQtyTip(false);
          } else {
            setShowQtyTip(false);
            setQuantity(value);
          }
        }, 1000)
      );
    }
  };

  const [selectedAddress, setSelectedAddress] = useState<any>("");

  useEffect(() => {
    // console.log("Came for Refere", wishlistReduxData);
    if (wishlistReduxData && wishlistReduxData.length > 0) {
      wishlistReduxData.forEach((item: any) => {
        if (item && item?.product?._id && productData && productData?._id) {
          if (item?.product?._id == productData?._id) {
            // // console.log("isWishlisted", item?.product?._id, productData?._id);
            setIsClicked(true);
            setWishlistId(item?._id);
          }
        }
      });
    }
  }, [productData, wishlistReduxData, isClicked]);

  useEffect(() => {
    if (selectedImageIndex < startIndex) {
      setStartIndex(selectedImageIndex);
    }

    if (selectedImageIndex >= startIndex + visibleCount) {
      setStartIndex(selectedImageIndex - visibleCount + 1);
    }
  }, [selectedImageIndex, visibleCount]);



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

  const fetchAndOpenPdf = async (url: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Open the Blob URL in a new tab
      window.open(blobUrl, "_blank", "noopener,noreferrer");

      // Revoke the Blob URL after some time to free memory
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000); // Revoke after 1 minute
    } catch (error) {
      // consoleerror("Error fetching or opening the PDF:", error);
      toast.error("Failed to load the certificate.");
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
        setIsClicked(false);

        dispatch(saveWishlist(result?.data?.data));
        // router.refresh();
      }
    } catch (e: any) {
      handlegetWApiError(e);
    } finally {
    }
  };

  const handleCartApiError = async (err: any, id: any) => {
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

    if (result?.status === 400) {
      toast.error("No Products to display");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
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

      if (result?.data == null) {
        handleCartApiError(result?.errorData, id);
      } else {
        // // console.log('vewrhy',result?.data)
        setCookie("CartCount", result?.data?.items.length);
        toast.success("Product Added to Cart Successfully", {
          iconTheme: {
            primary: "#439787",
            secondary: "#FFFAEE",
          },
          duration: 3000,
        });
        // router.push('/cart')
        router.refresh();
        // window.location.reload();
      }
    } catch (error) {
      // // console.log(error);
      handleCartApiError(error, id);
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
        toast.success("Product Added to Wishlist Successfully", {
          iconTheme: {
            primary: "#439787",
            secondary: "#FFFAEE",
          },
          duration: 3000,
        });
        setIsClicked(true);
        setWishlistId(result?.data?._id);
        getWishlist();
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
        toast.success("Product Removed from Wishlist Successfully", {
          iconTheme: {
            primary: "#439787",
            secondary: "#FFFAEE",
          },
          duration: 3000,
        });
        setIsClicked(false);
        await getWishlist();
      }
    } catch (error) {
      handleWishlistApiError(error, id);
    }
  };

  const calculateShippingDate = (numberOfDays: any) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + parseInt(numberOfDays, 10));
    const formattedDate = dayjs(futureDate).format("DD MMM YYYY");
    // setResultDate(formattedDate);
    return formattedDate;
  };

  function checkErrorsForQuote(call: string) {
    let status = false;

    if (call == "mainSubmit") {
      if (selectedAddress == "" || selectedAddress == null) {
        setAddressError("Please select an address");
        status = true;
      } else {
        setAddressError("");
      }

      if (quoteDueDate == "" || quoteDueDate == null) {
        setDueDateError("Please select a due date");
        status = true;
      } else {
        setDueDateError("");
      }

      if (submissionInstruction == "" || submissionInstruction == null) {
        setSubmissionInstructionError("Please enter a submission instruction");
        status = true;
      } else {
        setSubmissionInstructionError("");
      }

      // if (notes == "" || notes == null) {
      //   setNotesError("Please enter a note");
      //   status = true;
      // } else {
      //   setNotesError("");
      // }
    } else if (call == "fromEffect" && clickedOnSubmitQuote) {
      if (selectedAddress == "" || selectedAddress == null) {
        setAddressError("Please select an address");
        status = true;
      } else {
        setAddressError("");
      }

      if (quoteDueDate == "" || quoteDueDate == null) {
        setDueDateError("Please select a due date");
        status = true;
      } else {
        setDueDateError("");
      }

      if (submissionInstruction == "" || submissionInstruction == null) {
        setSubmissionInstructionError("Please enter a submission instruction");
        status = true;
      } else {
        setSubmissionInstructionError("");
      }

      // if (notes == "" || notes == null) {
      //   setNotesError("Please enter a note");
      //   status = true;
      // } else {
      //   setNotesError("");
      // }
    }
    // // console.log("handleQuoteSubmit", selectedAddress === "");

    return status;
  }

  useEffect(() => {
    checkErrorsForQuote("fromEffect");
  }, [selectedAddress, quoteDueDate, submissionInstruction, notes]);

  const CheckDelivery = async (pincode: any) => {
    if (pincode > 0 && pincode.length !== 6) {
      setShowMssg(false);
      setDeliveyAvailable(false);
      return;
    }

    if (pincode > 0 && pincode.length === 6) {
      const res = (await callApi(`pincodeInfo/${pincode}`, "GET")) as any;

      setShowMssg(true);
      setDeliveyAvailable(false);

      if (res?.data?.length > 0) {
        const components = res.data[0]?.address_components || [];

        let state = "";
        let locality = "";
        let level2 = "";
        let level3 = "";

        for (const component of components) {
          const types = component.types || [];

          if (types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }

          if (types.includes("locality")) {
            locality = component.long_name;
          }

          if (types.includes("administrative_area_level_2")) {
            level2 = component.long_name;
          }

          if (types.includes("administrative_area_level_3")) {
            level3 = component.long_name;
          }
        }

        const cityZones = totalProduct?.deliveryZonesCities || [];
        const stateZones = totalProduct?.deliveryZones || [];

        let isDeliveryAvailable = false;

        // Check by priority: locality → level2 → level3
        if (cityZones.length > 0) {
          if (locality && cityZones.includes(locality)) {
            isDeliveryAvailable = true;
          } else if (level2 && cityZones.includes(level2)) {
            isDeliveryAvailable = true;
          } else if (level3 && cityZones.includes(level3)) {
            isDeliveryAvailable = true;
          }
        }

        // Fallback to state if no cities defined
        if (!isDeliveryAvailable && cityZones.length === 0) {
          if (state && stateZones.includes(state)) {
            isDeliveryAvailable = true;
          }
        }

        setDeliveyAvailable(isDeliveryAvailable);
      }
    } else {
      setShowMssg(false);
      setDeliveyAvailable(false);
    }
  };




  // function checkBuyerLogin() {
  //   const buyer = sessionStorage.getItem("buyerUserInfo");
  //   if (buyer == null) {
  //     window.location.href = "/login";
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  function checkBuyerLogin() {
    const buyer = sessionStorage.getItem("buyerUserInfo");
    return !!buyer;
  }


  // console.log(totalProduct, "totalProducttotalProduct");

  if (notFound) {
    return <NotFoundPage />;
  }

  if (fourPage) {
    return <Custom404 />;
  }

  const taxValue = (totalCost: any, tax: any) => {
    const taxValue = (totalCost * tax) / 100;
    const totalCostAfterTax = totalCost + taxValue;
    return taxValue;
  };

  const OnClickQuote = (slug: any) => {
    if (token || token !== "" || token !== null || token !== undefined) {
      router.push(`/${slug}?qt=open`);
    } else {
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
  // console.log(productsData, "productsData", totalProduct);

  function getMeta(str: "metaDescription" | "metaKeywords", data: any) {
    // console.log(data, "getMeta", !data || !data.variants);

    if (!data || !data.variants) return;

    if (str === "metaDescription") {
      if (isSingle) {
        return data.variants[0].meta?.metaDescription;
      } else {
        const foundItem = data.variants.find((item: any) => item.slug === slug);
        return foundItem ? foundItem.meta?.description : undefined;
      }
    } else if (str === "metaKeywords") {
      if (isSingle) {
        return data.variants[0].meta?.metaKeywords;
      } else {
        const foundItem = data.variants.find((item: any) => item.slug === slug);
        return foundItem ? foundItem.meta?.metaKeywords : undefined;
      }
    }
  }
  if (!isClient) return <></>;

  const enquiryInitialQty =
    quantity ??
    newSelectedVariant?.minBuyQty ??
    1;

  // console.log(getMeta("metaDescription", totalProduct),"getMeta");
  return (
    <div className=" ">
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{
          name: `${totalProduct?.categoryId?.name || ""}`,
          href: "/products",
        }}
        link3={{
          name: `${totalProduct?.subCategoryId && Array.isArray(totalProduct.subCategoryId) && totalProduct.subCategoryId.length > 0 ? totalProduct.subCategoryId[0]?.name || "" : ""}`,
          href: totalProduct?.subCategoryId && Array.isArray(totalProduct.subCategoryId) && totalProduct.subCategoryId.length > 0
            ? `/products/${totalProduct?.categoryId?.seoSlug}/${totalProduct.subCategoryId[0]?.seoSlug || ""}?scid=${totalProduct.subCategoryId[0]?._id || ""}`
            : "/products",
        }}
        link4={{
          name: `${totalProduct?.childCategories && Array.isArray(totalProduct.childCategories) && totalProduct.childCategories.length > 0 ? totalProduct.childCategories[0]?.name || "" : ""}`,
          href: totalProduct?.subCategoryId && Array.isArray(totalProduct.subCategoryId) && totalProduct.subCategoryId.length > 0 &&
            totalProduct?.childCategories && Array.isArray(totalProduct.childCategories) && totalProduct.childCategories.length > 0
            ? `/products/${totalProduct.categoryId?.seoSlug || ""}/${totalProduct.subCategoryId[0]?.seoSlug || ""}/${totalProduct.childCategories[0]?.seoSlug || ""}?ccid=${totalProduct.childCategories[0]?._id || ""}`
            : "/products",
        }}
        link5={{
          name: `${isSingle ? totalProduct?.name : productData?.variantName}`,
          href: `/${isSingle ? totalProduct?.slug : productData?.slug}`,
        }}
      />
      {productLoading ? (
        <div className="md:flex block w-full md:px-24 md:py-12 py-8 px-4">
          <ProductDetailsSkeleton />
        </div>
      ) : (
        <>
          <div
            ref={secondSectionRef}
            className={`relative  w-full px-4 pt-8 pb-4 md:px-24 md:pt-12 md:block lg:flex ${isScrollLocked ? "no-scroll overscroll-none" : ""
              }`}
          >
            <div className={`lg:w-1/2 md:w-[606px] lg:sticky top-0  pr-[10px] `}>
              <div className="  lg:sticky top-0">


                {/* Main Image with Slider */}
                <div className="relative">

                  {/* Main Image */}
                  <div
                    className={`
    relative overflow-hidden 
    h-[384px] 
    ${images2?.length === 1 ? "md:h-[618px]" : "md:h-[384px]"}
  `}
                  >

                    <div
                      ref={secondSectionRef}
                      className={`relative w-full h-full p-[15px] md:p-[85px] border border-borderGray rounded-lg ${zoomable ? "overflow-hidden" : ""
                        }`}
                      style={{
                        backgroundImage: zoomable
                          ? `url(${images2 && images2[selectedImageIndex]
                            ? (() => {
                              const imageUrl = `${assetURL}/${images2[selectedImageIndex]}`;
                              if (imageUrl.includes("//admin")) return imageUrl.replace("//admin", "/admin");
                              if (imageUrl.includes("//staff")) return imageUrl.replace("//staff", "/staff");
                              return imageUrl;
                            })()
                            : "/images/product-placeholder.webp"
                          })`
                          : "none",
                        backgroundSize: `${ZOOM_LEVEL * 100}% ${ZOOM_LEVEL * 100}%`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                        transition: "background-position 0.1s ease-out",
                      }}
                    >
                      {/* Main Image */}
                      <Image
                        src={
                          images2 && images2[selectedImageIndex]
                            ? (() => {
                              const imageUrl = `${assetURL}/${images2[selectedImageIndex]}`;
                              if (imageUrl.includes("//admin")) return imageUrl.replace("//admin", "/admin");
                              if (imageUrl.includes("//staff")) return imageUrl.replace("//staff", "/staff");
                              return imageUrl;
                            })()
                            : "/images/product-placeholder.webp"
                        }
                        alt={`Main Image ${selectedImageIndex + 1}`}
                        fill
                        className={`${zoomable ? "opacity-0" : "opacity-100"} object-contain w-full h-full`}
                        onError={(e) => (e.currentTarget.src = "images/failedToLoadImage.webp")}
                        loading="lazy"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                      />

                      {/* Arrows only if >1 image */}
                      {/* {!zoomable && images2?.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="flex absolute w-8 h-8 items-center justify-center bg-white border border-secondary rounded-full shadow-2xl top-1/2 left-2 transform -translate-y-1/2"
                          >
                            <BsChevronLeft color="#A92449" />
                          </button>

                          <button
                            onClick={nextImage}
                            className="flex absolute w-8 h-8 items-center justify-center bg-white border border-secondary rounded-full shadow-2xl top-1/2 right-2 transform -translate-y-1/2"
                          >
                            <BsChevronRight color="#A92449" />
                          </button>
                        </>
                      )} */}
                    </div>
                  </div>

                  {/* Thumbnails only if >1 */}
                  {images2?.length > 1 && (
                    <div className="flex items-center gap-1 mt-4 h-auto md:h-[218px]">

                      {/* PREV BUTTON */}
                      {images2?.length > 3 && (
                        <button
                          onClick={prevImage}
                          className="flex w-6 h-6 items-center justify-center bg-white border border-secondary rounded-full shadow"
                        >
                          <BsChevronLeft color="#A92449" />
                        </button>
                      )}

                      {/* FIXED-BOX FOR 3 THUMBNAILS (NO SCROLLBAR) */}
                      <div className="overflow-hidden w-full md:w-[600px] h-[120px]  md:h-[218px]">
                        {/* SLIDING TRACK */}
                        <div
                          className="flex gap-4 transition-transform duration-300"
                          style={{
                            transform: `translateX(-${startIndex * (isMobile ? (100 + 16) : (187 + 16))}px)`// 187px + 16px gap
                          }}
                        >
                          {images2.map((image, index) => (
                            <button
                              key={index}
                              className={`border 
  w-[100px] h-[120px]        // MOBILE → fits 3 perfectly
  md:w-[187px] md:h-[218px]  // DESKTOP
  flex-shrink-0 
  rounded-lg
  ${selectedImageIndex === index ? "border-secondary" : "border-borderGray"}`}

                              onClick={() => {
                                handleThumbnailClick(index);

                                // auto adjust view if clicked item is outside visible 3
                                if (index < startIndex) {
                                  setStartIndex(index);
                                } else if (index >= startIndex + visibleCount) {
                                  setStartIndex(index - visibleCount + 1);
                                }
                              }}
                            >
                              <Image
                                src={image ? normalizePath(`${assetPath}/${image}`) : "/images/product-placeholder.webp"}
                                alt={`Thumbnail ${index + 1}`}
                                width={187}
                                height={218}
                                className="object-contain"
                                loading="lazy"
                                onError={(e) => (e.currentTarget.src = "images/failedToLoadImage.webp")}
                              />
                            </button>
                          ))}
                        </div>

                      </div>

                      {/* NEXT BUTTON */}
                      {images2?.length > 3 && (
                        <button
                          onClick={nextImage}
                          className="flex w-6 h-6 items-center justify-center bg-white border border-secondary rounded-full shadow"
                        >
                          <BsChevronRight color="#A92449" />
                        </button>
                      )}


                    </div>
                  )}

                </div>
              </div>
            </div>

            <div
              ref={rightDivRef}
              className="lg:w-1/2 w-full lg:mt-0 md:mt-8 mt-4 md:pl-[10px] no-scrollbar overflow-y-hidden h-fit"
            >

              <div className="md:h-[384px]">
                {/* TITLE + WISHLIST */}


              <div className="flex items-start gap-16 w-auto">
  <div className="">
    <h1 className="md:text-[30px] text-[24px] font-semibold text-md text-brown text-normal pr-[10px] sr-only">
      {productData?.meta?.metaTitle}
    </h1>

    <h2 className="md:text-[30px] text-[24px] font-semibold text-md text-secondary pr-[10px] -mt-2 break-words">
      {displayName}
    </h2>
  </div>

  {productData?.status === "PUBLISHED" &&
    productData?.deletedAt == null &&
    productData?.isActive && (
      <div
        className={`p-[10px] mt-[1px] border border-secondary hover:cursor-pointer group shrink-0
        ${isClicked ? "bg-secondary" : "bg-cream"}`}
      >
        {isClicked ? (
          <CiBookmark
            color="#ffffff"
            className="group-hover:text-cream cursor-pointer z-50"
            size={25}
            onClick={() => deleteWishlist(productData?._id)}
          />
        ) : (
          <CiBookmark
            color="#A92449"
            className="group-hover:text-cream cursor-pointer z-50"
            size={25}
            onClick={() => addToWishlist(productData?._id)}
          />
        )}
      </div>
    )}
</div>

                {/* STATUS + SKU WRAPPER */}
                <div className={`flex flex-row items-center  gap-4 ${totalProduct?.purchaseType === "QUOTE" ? "my-4" : "my-2"}`}>

                  {/* STATUS */}
                  {productData?.status == "PUBLISHED" &&
                    productData?.deletedAt == null &&
                    productData?.isActive ? (
                    <p
                      className={`${availableStockVal > minQty ? "text-primary" : "text-secondary"
                        } text-[14px] rounded-full px-3 py-2 w-fit`}
                      style={{
                        backgroundColor: availableStockVal > minQty ? "#DCFCE7" : "#FEE2E2",

                      }}
                    >
                      {availableStockVal > minQty ? "In Stock" : "Out of Stock"}
                    </p>

                  ) : (
                    <p className="text-secondary text-md text-normal border border-secondary w-fit p-2 rounded">
                      Not Available
                    </p>
                  )}

                  {/* SKU */}
                  <p className="text-[14px] text-brown font-normal w-fit px-2 py-2">
                    SKU: {productData?.variantSku}
                  </p>
                </div>


                {/* Price Section Start*/}
                <div className="mt-3">
                  {/* {totalProduct?.purchaseType === "QUOTE" ? ( */}
                  {totalProduct?.purchaseType === "QUOTE" ? (
                    <></>
                  ) : productData?.MRP && productData?.discountedPrice ? (
                    <div className="block justify-start items-center">
                      {productData?.MRP === productData?.discountedPrice ? (
                        <p className="md:text-3xl text-2xl text-brown font-semibold text-normal flex justify-start items-center ">
                          <span className="md:text-3xl text-2xl text-brown mr-1 font-normal font-mono">
                            ₹
                          </span>{" "}
                          {formatCurrencyInIndianStyle(
                            productData?.platformPrice
                          )}
                          <span className="text-[18px] font-regular text-brown ml-2">
                            /{productData?.unitOfMeasure}
                          </span>
                          <span className="text-[18px] font-regular text-brown ml-2">
                            MRP
                          </span>
                        </p>
                      ) : (
                        <>
                          <div className="flex justify-start items-center">
                            <p className="md:text-[20px] text-md text-[#c5c5c5] line-through font-light  text-normal flex justify-start items-center">
                              <span className="text-xl text-[#01B6A3] mr-1 font-normal font-mono">
                                ₹
                              </span>{" "}
                              {productData?.MRP +
                                taxValue(
                                  productData?.MRP,
                                  productData?.tax?.igst
                                )}
                              {"  "}
                              <span className="text-[18px] font-regular text-[#c5c5c5] ">
                                {"     "}/{productData?.unitOfMeasure} MRP
                              </span>
                            </p>
                            {calculateDiscountPercentage(
                              productData?.MRP,
                              productData?.discountedPrice
                            ) > 0 && (
                                <p className="md:text-xl text-md text-primary text-normal ml-3 ">
                                  ({" "}
                                  {calculateDiscountPercentage(
                                    productData?.MRP,
                                    productData?.discountedPrice
                                  )}
                                  % OFF)
                                </p>
                              )}
                          </div>
                          <p className="md:text-3xl text-2xl text-brown text-normal mt-2 flex justify-start items-center">
                            ₹{" "}
                            <span className="md:text-3xl text-2xl text-brown font-semibold text-normal flex justify-start items-center">
                              {productData?.platformPrice
                                ? formatCurrencyInIndianStyle(
                                  productData?.platformPrice
                                )
                                : productData?.discountedPrice +
                                taxValue(
                                  productData?.MRP,
                                  productData?.tax?.igst
                                ).toFixed(2)}
                              <span className="text-[18px] font-regular text-brown ml-2">
                                /{productData?.unitOfMeasure} MRP
                              </span>
                            </span>
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {totalProduct?.purchaseType !== "QUOTE" && (
                  <p className="text-[13px] text-brown text-normal mt-2">
                    Inclusive of all taxes
                  </p>
                )}
                {/* Price Section End*/}




                {/* MATERIAL + QUANTITY SECTION (GREY BOX WRAPPER) */}
                <div
                  className={` rounded-xl  ${totalProduct?.purchaseType !== "QUOTE"
                    ? "py-[10px] mt-3 md:px-[0px] px-[0px]"
                    : "md:py-[24px] p-[0px] mt-2"
                    }`}
                >
                  {/* QUANTITY + VARIATIONS ROW */}
                  {productData?.status == "PUBLISHED" &&
                    productData?.deletedAt == null &&
                    productData?.isActive && (
                      <div className="flex  w-full  md:gap-4 gap-2 md:pb-4 pb-2">
                        {/* QUANTITY - LEFT SIDE (50%) */}
                        <div className="md:w-[210px] w-1/2">
                          <p className="text-md text-brown font-semibold mb-3">Quantity</p>

                          <TooltipProvider>
                            <Tooltip open={showQtyTip}>
                              <TooltipTrigger asChild>
                                <div className="flex items-center justify-between border border-primary w-full bg-cream rounded-lg">
                                  <Button
                                    type="button"
                                    onClick={handleDecrement}
                                    className="pl-4 pr-0 py-2 bg-cream text-lg hover:bg-cream text-secondary"
                                    disabled={quantity <= minQty}
                                  >
                                    -
                                  </Button>

                                  <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => handleChange(e)}
                                    className="bg-cream w-24 pl-0 text-center text-brown custom-input"
                                  />

                                  <Button
                                    type="button"
                                    onClick={handleIncrement}
                                    className="pr-4 pl-0 py-2 text-lg bg-cream hover:bg-cream text-secondary"
                                    disabled={quantity >= maxQty}
                                  >
                                    +
                                  </Button>
                                </div>
                              </TooltipTrigger>

                              <TooltipContent
                                side="bottom"
                                sideOffset={5}
                                className="border-transparent px-0 bg-black z-20 max-w-[270px]"
                              >
                                <TooltipArrow className="fill-black" />
                                {tooltipMsg && (
                                  <p className="text-sm text-cream font-medium py-2 px-2">
                                    {tooltipMsg}
                                  </p>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        {/* VARIATIONS - RIGHT SIDE (50%) */}
                        <div className="md:w-[210px] w-1/2">
                          {!isSingle &&
                            totalProduct?.productAttributes &&
                            combinations && (
                              <AttributeDisplay
                                attributes={combinations}
                                currentAttributes={productData?.attributes}
                              />
                            )}
                        </div>
                      </div>
                    )}

                  {/* BUTTONS BELOW */}
                  <div className="flex gap-2 md:gap-4 mt-6 ">
                    {/* REQUEST QUOTE BUTTON */}
                    {(totalProduct?.purchaseType == "MULTI" ||
                      totalProduct?.purchaseType == "QUOTE") &&
                      productData?.status == "PUBLISHED" &&
                      productData?.deletedAt == null &&
                      productData?.isActive && (
                        <Button
                          className="bg-primary rounded shadow-xs group py-[15px] md:w-[210px] w-1/2"
                          onClick={() => {
                            if (checkBuyerLogin()) {
                              setIsOpen(true);
                            }
                            else {
                              setOpenEnquiryFlow(true); // NOT logged in → open shared flow
                            }
                          }}
                        >
                          <p className="text-cream text-md text-medium ml-1">Request for Pricing</p>
                        </Button>
                      )}

                    {/* ADD TO CART BUTTON */}
                    {(totalProduct?.purchaseType == "MULTI" ||
                      totalProduct?.purchaseType == "ONLINE") &&
                      productData?.status == "PUBLISHED" &&
                      productData?.deletedAt == null &&
                      productData?.isActive && (
                        <Button
                          disabled={loadingCartButton}
                          onClick={() => addToCart(productData?._id)}
                          className={`bg-secondary rounded shadow-xs group py-[15px] hover:bg-secondary bg-opacity-100 hover:bg-opacity-85 transition ${
                            totalProduct?.purchaseType === "ONLINE"
                              ? "md:w-[210px] w-full"
                              : "md:w-[210px] w-1/2"
                            }`}
                        >
                          {loadingCartButton ? (
                            <CircularProgress color="#ffffff" size={6} />
                          ) : (
                            <>
                              <BsCartPlus color="#fff" size={18} />
                              <p className="text-cream text-md text-medium ml-3">Add to Cart</p>
                            </>
                          )}
                        </Button>
                      )}
                  </div>
                </div>



              </div>

              {/* SELLER DETAILS */}
              <div className="">
                <p className="text-md text-brown font-semibold  text-normal mt-3 mb-0 md:mb-2">Seller Details</p>

                <div className="flex flex-row md:flex-row justify-between md:justify-start md:items-center items-center gap-4">
                  <div className="flex justify-start items-center md:mr-2 md:max-w-[60%]">
                    <div>
                      <p className="text-[15px] capitalize text-brown">
                        {vendorInfo?.companyName}
                      </p>
                      <p className="text-[13px] font-normal text-brown">
                        Vendor ID : {vendorInfo?.vendorCode}
                      </p>
                    </div>
                  </div>

                  {/* CERTIFICATION */}
                 <div className="flex justify-end items-center md:w-[40%] md:mt-0 mobile-sm:mt-2 my-2">

  <div className="relative flex items-center">

    {/* CERTIFIED BUTTON */}
    {totalProduct?.certificate?.certificateImg.endsWith(".pdf") ? (
      <Button
        onClick={() => window.open(totalProduct?.certificateLink, "_blank")}
        className="text-cream bg-primary hover:bg-secondary font-semibold h-[45px]
        pl-12 pr-4 md:w-40
        text-sm md:text-md flex items-center justify-center"
      >
        <p className="text-cream font-semibold text-md">Certified</p>
      </Button>
    ) : (
      <Dialog>
        <DialogTrigger asChild>
          <Link
            href="#"
            className="text-cream bg-primary hover:bg-secondary font-semibold h-[45px]
            pl-12 pr-4 md:w-40
            text-sm md:text-md flex items-center justify-center rounded-md"
          >
            <p className="text-cream font-semibold text-md">Certified</p>
          </Link>
        </DialogTrigger>

        <DialogContent className="w-[98%] fixed h-[98%] lg:w-full">
          <DialogClose className="flex justify-end absolute z-50 right-[15px] top-[15px]">
            <IoCloseCircleSharp
              color="white"
              className="bg-bgGray rounded-full"
              size={30}
            />
          </DialogClose>

          <div className="h-full w-full">
            <Image
              src={
                totalProduct?.certificate?.certificateImg
                  ? normalizePath(`${assetURL}/${totalProduct.certificate.certificateImg}`)
                  : "/images/product-placeholder.webp"
              }
              className="p-[10px] rounded"
              onError={(e) =>
                (e.currentTarget.src = "images/failedToLoadImage.webp")
              }
              loading="lazy"
              fill
              objectFit="contain"
              alt="certificate"
            />
          </div>
        </DialogContent>
      </Dialog>
    )}

    {/* CERTIFICATE LOGO (ABSOLUTE) */}
    {totalProduct?.certificate?.organization?.logo &&
      totalProduct?.certificate?.organization?.authorityName !== "Others" && (
        <div className="absolute -left-4">
          <Image
            src={
              totalProduct?.certificate?.organization?.logo
                ? totalProduct.certificate.organization.logo.includes("https://")
                  ? "/images/product-placeholder.webp"
                  : normalizePath(`${assetURL}/${totalProduct.certificate.organization.logo}`)
                : "/images/product-placeholder.webp"
            }
            alt="Vendor Name"
            width={60}
            height={60}
            onError={(e) =>
              (e.currentTarget.src = "/images/product-placeholder.webp")
            }
            loading="lazy"
            className="w-[60px] h-[60px] rounded-full border border-[#f0f0f0] bg-white object-contain"
          />
        </div>
      )}

  </div>
</div>
</div>

                {/* COUNTRY & DELIVERY */}
                <div className="flex justify-start md:items-center items-start md:gap-8 gap-2 md:flex-row flex-col">
                  <p className="text-md text-brown md:mt-4 mt-1">
                    Country Of Origin :
                    <span className="text-secondary font-medium uppercase ml-1">
                      {totalProduct?.countryOfOrigin == "In"
                        ? "India"
                        : fetchCountryNameFromData(totalProduct?.countryOfOrigin)}
                    </span>
                  </p>


                  {/* Pincode Check Start */}
                  {totalProduct?.allIndiaDelivery == true ? (
                    <p className="text-md text-primary flex items-center justify-start text-normal font-semibold md:mt-3 mt-0 ">
                      <TbMapPin2 className="mr-2 text-primary" size={26} />
                      All India Delivery
                    </p>
                  ) : (
                    <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:mt-4 mt-2 md:gap-3 ">
                      <p className="text-md text-brown flex items-center justify-start text-normal font-normal  ">
                        Delivery:

                      </p>
                      <div className="relative w-[250px] md:w-[250px]">
                        <Input
                          placeholder="Enter Pincode"
                          onChange={(e: any) => {
                            if (e.target.value.length === 6) {
                              setPincode(e.target.value);
                              setShowMssg(false);
                            } else {
                              setPincode(e.target.value);
                            }
                          }}
                          className="border border-primary bg-cream text-[16px] text-brown h-10 pr-16 rounded-none"
                        />

                        <Button
                          variant="link"
                          disabled={pincode.length !== 6}
                          onClick={() => CheckDelivery(pincode)}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 text-secondary 
      ${pincode.length === 6 ? "opacity-100" : "opacity-50"}`}
                        >
                          Check
                        </Button>
                      </div>

                      {pincode &&
                        pincode.length > 0 &&
                        pincode.length == 6 &&
                        showMssg ? (
                        <>
                          {deliveyAvailable ? (
                            <span className="text-primary text-md font-semibold ml-2">
                              Available
                            </span>
                          ) : (
                            <span className="ml-2 text-primary text-md font-semibold ml-2">
                              Not Available
                            </span>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </div>
                {/* Pincode Check End */}
                {/* Shipping Date Start */}
                {deliveyAvailable ? (
                  <>
                    <p className="text-md text-secondary flex items-center justify-start text-normal font-semibold mt-6 md:pb-[40px] ">
                      <MdOutlineLocalShipping
                        className="mr-2 text-secondary"
                        size={26}
                      />{" "}
                      Expected Shipping By :{" "}
                      <span className="text-brown text-normal font-semibold ml-2">
                        {calculateShippingDate(
                          productData?.readyForShippingInDay
                        )}
                      </span>
                    </p>
                  </>
                ) : (
                  <></>
                )}
                {/* Shipping Date End */}

                {/* POLICIES */}
                <div className=" md:flex gap-6">

                  {/* Polcies Date Start */}
                  <div className="md:flex grid grid-cols-2   block  mt-3 h-fit md:justify-start justify-between items-center md:gap-6 ">
                    {totalProduct?.isCancellable == true ? (
                      <>
                        {totalProduct?.cancellationPolicy &&
                          // totalProduct?.cancellationPolicy?.cancellationPolicyDoc &&
                          totalProduct?.cancellationPolicy?.isActive == true ? (
                          <div className="justify-start items-center py-3 flex flex-row items-center  ">
                            <Image
                              width={45}
                              height={45}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "images/failedToLoadImage.webp";
                              }}
                              loading="lazy"
                              className="w-[45px] h-[45px]"
                              alt="cancelOrder"
                              src={"/images/CancelS.svg"}
                            />
                            <div className="flex flex-col pl-3 h-[45px] justify-center items-center">
                              {totalProduct?.cancellationPolicy
                                ?.cancellationPolicyDoc ? (
                                <p className="text-sm text-brown text-normal h-[45px] max-w-[95px]">
                                  {totalProduct?.cancellationPolicy?.cancellationPolicyDoc.endsWith(
                                    ".pdf"
                                  ) ? (
                                    <Link
                                      target="_blank"
                                      href={`${assetURL}/${totalProduct?.cancellationPolicy?.cancellationPolicyDoc}`}
                                      className="text-secondary text-sm font-normal"
                                    >
                                      Cancellation{" "}
                                      <span className="text-brown text-sm font-normal">
                                        Available.
                                      </span>
                                    </Link>
                                  ) : (
                                    <>
                                      <Dialog>
                                        <DialogTrigger
                                          asChild
                                          className="max-w-[90%]"
                                        >
                                          {/* <Button variant="outline">View</Button> */}
                                          <Link href="#" className="mr-3">
                                            <p className="text-secondary text-sm font-normal">
                                              Cancellation{" "}
                                              <span className="text-brown text-sm font-normal cursor-default">
                                                Available
                                              </span>
                                            </p>
                                          </Link>
                                        </DialogTrigger>
                                        <DialogContent className="w-[98%] fixed  h-[98%] lg:w-full ">
                                          <DialogClose className="flex justify-end absolute z-50 right-[15px] top-[15px] w-full shadow-2xl">
                                            <IoCloseCircleSharp
                                              color="white"
                                              size={30}
                                            />
                                          </DialogClose>
                                          <div className="h-full w-full ">
                                            <Image
                                              // src={`${assetURL}/${totalProduct?.cancellationPolicy?.cancellationPolicyDoc}`}
                                              // src={
                                              //   totalProduct?.cancellationPolicy
                                              //     ?.cancellationPolicyDoc
                                              //     ? (
                                              //         assetURL +
                                              //         "/" +
                                              //         totalProduct
                                              //           ?.cancellationPolicy
                                              //           ?.cancellationPolicyDoc
                                              //       ).includes("//admin")
                                              //       ? (
                                              //           assetURL +
                                              //           "/" +
                                              //           totalProduct
                                              //             ?.cancellationPolicy
                                              //             ?.cancellationPolicyDoc
                                              //         ).replace("//admin", "/admin")
                                              //       : `${assetURL}/${totalProduct?.cancellationPolicy?.cancellationPolicyDoc}`
                                              //     : "/images/product-placeholder.webp"
                                              // }
                                              src={
                                                totalProduct?.cancellationPolicy
                                                  ?.cancellationPolicyDoc
                                                  ? normalizePath(
                                                    `${assetURL}/${totalProduct.cancellationPolicy.cancellationPolicyDoc}`
                                                  )
                                                  : "/images/product-placeholder.webp"
                                              }
                                              className="p-[10px] rounded "
                                              onError={(e) => {
                                                e.currentTarget.src =
                                                  "images/failedToLoadImage.webp";
                                              }}
                                              loading="lazy"
                                              objectFit="cover"
                                              alt={"cancelCertificate"}
                                              fill={true}
                                              width={200}
                                              height={200}
                                            />
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </>
                                  )}
                                </p>
                              ) : (
                                <p className="text-sm text-brown text-normal h-[45px] max-w-[95px]">
                                  <div
                                    // target="_blank"
                                    // href={`https://docs.google.com/viewer?url=${assetURL}/${totalProduct?.cancellationPolicy?.cancellationPolicyDoc}`}
                                    className="text-secondary text-sm font-normal"
                                  >
                                    Cancellation{" "}
                                    <span className="text-brown text-sm font-normal">
                                      Available.
                                    </span>
                                  </div>
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <> </>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="justify-start items-center py-3 flex flex-row items-center  ">
                          <Image
                            width={40}
                            height={40}
                            onError={(e) => {
                              e.currentTarget.src = "images/failedToLoadImage.webp";
                            }}
                            loading="lazy"
                            className="w-[40px] h-[40px]"
                            alt="cancelOrder"
                            src={"/images/CancelS.svg"}
                          />
                          {/* <p className="text-sm text-primary text-normal   flex items-center justify-start uppercase">
                        {" "}
                        Cancellation
                      </p> */}
                          <div className="flex flex-col pl-3 h-[45px] justify-center items-center">
                            <p className="text-sm text-brown text-normal h-[45px]  max-w-[140px] ">
                              Cancellation <br></br> Not Available
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    {totalProduct?.isReturnable == true ? (
                      <>
                        {totalProduct?.returnPolicy &&
                          // totalProduct?.returnPolicy?.returnPolicyDoc &&
                          totalProduct?.returnPolicy?.allowReturn == true ? (
                          <div className="justify-start items-center py-3 flex flex-row   ">
                            <Image
                              width={45}
                              height={45}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "images/failedToLoadImage.webp";
                              }}
                              loading="lazy"
                              className="w-[45px] h-[45px]"
                              alt="cancelOrder"
                              src={"/images/ReturnS.svg"}
                            />
                            <div className="flex flex-col pl-3 h-[45px] justify-center items-center">
                              {totalProduct?.returnPolicy?.returnPolicyDoc ? (
                                <p className="text-sm text-brown text-normal h-[45px] max-w-[100px]">
                                  {/* {totalProduct?.returnPolicy?.durationInDays} days{" "}
                            <Link
                              target="_blank"
                             // href={`https://docs.google.com/viewer?url=${assetURL}/${totalProduct?.returnPolicy?.returnPolicyDoc}`}
                              className="text-secondary text-sm font-normal"
                            >
                              Return Policy.
                            </Link> */}

                                  {totalProduct?.returnPolicy?.returnPolicyDoc.endsWith(
                                    ".pdf"
                                  ) ? (
                                    <Link
                                      target="_blank"
                                      href={`${assetURL}/${totalProduct?.returnPolicy?.returnPolicyDoc}`}
                                      className="text-brown text-sm font-normal "
                                    >
                                      {totalProduct?.returnPolicy?.durationInDays}{" "}
                                      days{" "}
                                      <span className="text-secondary text-sm font-normal !cursor-pointer">
                                        Return Policy
                                      </span>
                                      .
                                    </Link>
                                  ) : (
                                    <>
                                      <Dialog>
                                        <DialogTrigger
                                          asChild
                                          className="max-w-[90%]"
                                        >
                                          {/* <Button variant="outline">View</Button> */}
                                          <Link href="#" className=" md:mr-3">
                                            <p className="text-brown text-sm font-normal cursor-default">
                                              {
                                                totalProduct?.returnPolicy
                                                  ?.durationInDays
                                              }{" "}
                                              days{" "}
                                              <span className="text-secondary text-sm font-normal !cursor-pointer">
                                                Return Policy.
                                              </span>
                                            </p>
                                          </Link>
                                        </DialogTrigger>
                                        <DialogContent className="w-[98%] fixed  h-[98%] lg:w-full ">
                                          <DialogClose className="flex justify-end absolute z-50 right-[15px] top-[15px] w-full shadow-2xl">
                                            <IoCloseCircleSharp
                                              color="white"
                                              size={30}
                                            />
                                          </DialogClose>
                                          <div className="h-full w-full ">
                                            <Image
                                              // src={`${assetURL}/${totalProduct?.returnPolicy?.returnPolicyDoc}`}
                                              // src={
                                              //   totalProduct?.returnPolicy
                                              //     ?.returnPolicyDoc
                                              //     ? (
                                              //         assetURL +
                                              //         "/" +
                                              //         totalProduct?.returnPolicy
                                              //           ?.returnPolicyDoc
                                              //       ).includes("//admin")
                                              //       ? (
                                              //           assetURL +
                                              //           "/" +
                                              //           totalProduct?.returnPolicy
                                              //             ?.returnPolicyDoc
                                              //         ).replace("//admin", "/admin")
                                              //       : `${assetURL}/${totalProduct?.returnPolicy?.returnPolicyDoc}`
                                              //     : "/images/product-placeholder.webp"
                                              // }
                                              src={
                                                totalProduct?.returnPolicy
                                                  ?.returnPolicyDoc
                                                  ? normalizePath(
                                                    `${assetURL}/${totalProduct.returnPolicy.returnPolicyDoc}`
                                                  )
                                                  : "/images/product-placeholder.webp"
                                              }
                                              className="p-[10px] rounded "
                                              onError={(e) => {
                                                e.currentTarget.src =
                                                  "images/failedToLoadImage.webp";
                                              }}
                                              loading="lazy"
                                              objectFit="cover"
                                              alt={"cancelCertificate"}
                                              fill={true}
                                              width={200}
                                              height={200}
                                            />
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </>
                                  )}
                                </p>
                              ) : (
                                <p className="text-sm text-brown text-normal h-[45px] max-w-[100px]">
                                  <div
                                    // target="_blank"
                                    // href={`https://docs.google.com/viewer?url=${assetURL}/${totalProduct?.returnPolicy?.returnPolicyDoc}`}
                                    className="text-brown text-sm font-normal "
                                  >
                                    {totalProduct?.returnPolicy?.durationInDays}{" "}
                                    days{" "}
                                    <span className="text-secondary text-sm font-normal">
                                      Return Policy
                                    </span>
                                    .
                                  </div>
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <> </>
                        )}
                      </>
                    ) : (
                      <>
                        <div className=" justify-start items-center py-3 flex flex-row items-center  ">
                          <Image
                            width={45}
                            height={45}
                            onError={(e) => {
                              e.currentTarget.src = "images/failedToLoadImage.webp";
                            }}
                            loading="lazy"
                            className="w-[45px] h-[45px]"
                            alt="cancelOrder"
                            src={"/images/ReturnS.svg"}
                          />
                          <div className="flex flex-col pl-3 h-[45px] justify-center items-center">
                            <p className="text-sm text-brown text-normal h-[45px]  max-w-[140px] ">
                              Return<br></br> Not Available
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {(totalProduct?.isReturnable == true ||
                      totalProduct?.isCancellable == true ||
                      totalProduct?.isRefundable == true) &&
                      totalProduct?.isRefundable == true ? (
                      <>
                        {totalProduct?.refundPolicy &&
                          // totalProduct?.refundPolicy?.refundPolicyDoc &&
                          totalProduct?.refundPolicy?.isActive == true ? (
                          <div className="justify-start items-center py-3 flex flex-row items-center  ">
                            <Image
                              width={45}
                              height={45}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "images/failedToLoadImage.webp";
                              }}
                              loading="lazy"
                              className="w-[45px] h-[45px]"
                              alt="cancelOrder"
                              src={"/images/RefundS.svg"}
                            />
                            <div className="flex flex-col pl-3 h-[45px] justify-center items-center">
                              {totalProduct?.refundPolicy?.refundPolicyDoc ? (
                                <p className="text-sm text-brown text-normal h-[45px] max-w-[100px]">
                                  {totalProduct?.refundPolicy?.refundPolicyDoc.endsWith(
                                    ".pdf"
                                  ) ? (
                                    <Link
                                      target="_blank"
                                      href={`${assetURL}/${totalProduct?.refundPolicy?.refundPolicyDoc}`}
                                      className="text-brown text-sm font-normal cursor-default"
                                    >
                                      {totalProduct?.refundPolicy?.durationInDays}{" "}
                                      days{" "}
                                      <span className="text-secondary text-sm font-normal !cursor-pointer">
                                        {" "}
                                        Refund Policy.
                                      </span>
                                    </Link>
                                  ) : (
                                    <>
                                      <Dialog>
                                        <DialogTrigger
                                          asChild
                                          className="max-w-[90%]"
                                        >
                                          <Link href="#" className=" md:mr-3">
                                            <p className="text-brown text-sm font-normal cursor-default">
                                              {
                                                totalProduct?.refundPolicy
                                                  ?.durationInDays
                                              }{" "}
                                              days{" "}
                                              <span className="text-secondary text-sm font-normal !cursor-pointer">
                                                Refund Policy.
                                              </span>
                                            </p>
                                          </Link>
                                        </DialogTrigger>
                                        <DialogContent className="w-[98%] fixed  h-[98%] lg:w-full ">
                                          <DialogClose className="flex justify-end absolute z-50 right-[15px] top-[15px] w-full shadow-2xl">
                                            <IoCloseCircleSharp
                                              color="white"
                                              size={30}
                                            />
                                          </DialogClose>
                                          <div className="h-full w-full ">
                                            <Image
                                              // src={
                                              //   totalProduct?.refundPolicy
                                              //     ?.refundPolicyDoc
                                              //     ? (
                                              //         assetURL +
                                              //         "/" +
                                              //         totalProduct?.refundPolicy
                                              //           ?.refundPolicyDoc
                                              //       ).includes("//admin")
                                              //       ? (
                                              //           assetURL +
                                              //           "/" +
                                              //           totalProduct?.refundPolicy
                                              //             ?.refundPolicyDoc
                                              //         ).replace("//admin", "/admin")
                                              //       : `${assetURL}/${totalProduct?.refundPolicy?.refundPolicyDoc}`
                                              //     : "/images/product-placeholder.webp"
                                              // }
                                              src={
                                                totalProduct?.refundPolicy
                                                  ?.refundPolicyDoc
                                                  ? normalizePath(
                                                    `${assetURL}/${totalProduct.refundPolicy.refundPolicyDoc}`
                                                  )
                                                  : "/images/product-placeholder.webp"
                                              }
                                              className="p-[10px] rounded "
                                              onError={(e) => {
                                                e.currentTarget.src =
                                                  "images/failedToLoadImage.webp";
                                              }}
                                              loading="lazy"
                                              objectFit="cover"
                                              alt={"cancelCertificate"}
                                              fill={true}
                                              width={200}
                                              height={200}
                                            />
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </>
                                  )}
                                </p>
                              ) : (
                                <p className="text-sm text-brown text-normal h-[45px] max-w-[100px]">
                                  <div
                                    //  target="_blank"
                                    //  href={`https://docs.google.com/viewer?url=${assetURL}/${totalProduct?.refundPolicy?.refundPolicyDoc}`}
                                    className="text-brown text-sm font-normal cursor-default"
                                  >
                                    {totalProduct?.refundPolicy?.durationInDays}{" "}
                                    days{" "}
                                    <span className="text-secondary text-sm font-normal">
                                      {" "}
                                      Refund Policy.
                                    </span>
                                  </div>
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <> </>
                        )}
                      </>
                    ) : (
                      <>
                        {/* {" "}
                    {(totalProduct?.isReturnable == true ||
                      totalProduct?.isCancellable == true) &&
                      totalProduct?.isRefundable == false && (
                        <>
                          <div className="justify-start items-center py-3 flex flex-row items-center  ">
                            <Image
                              width={45}
                              height={45}
                              className="w-[45px] h-[45px]"
                              alt="cancelOrder"
                              src={"/images/RefundS.svg"}
                            />
                            <div className="flex flex-col pl-3 h-[45px] justify-center items-center">
                              <p className="text-sm text-brown text-normal h-[45px]  max-w-[140px] ">
                                Refund <br></br> Not Available
                              </p>
                            </div>
                          </div>
                        </>
                      )} */}
                      </>
                    )}
                  </div>

                  {/* Policies Date End */}

                </div>
              </div>
            </div>
          </div>

          <div className="bg-cream border border-primary md:flex block w-full md:mx-auto  md:max-w-[87.5%] md:py-6 md:justify-center md:items-center py-8 px-4 rounded-lg">
            <Tabs defaultValue="account" className="w-full">
              <div className="   top-[128px] overflow-x-scroll no-scrollbar">
                <TabsList className="border-b border-transparent h-[45px] w-full rounded-none flex justify-start items-center  pb-0 mb-6 overflow-x-scroll no-scrollbar">
                  <TabsTrigger
                    value="account"
                    className="px-4 text-md bg-transparent text-brown border-b-2 border-transparent rounded-none data-[state=active]:border-primary data-[state=active]:text-primary  data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="specifications"
                    className="px-4 text-md bg-transparent text-brown border-b-2 border-transparent rounded-none data-[state=active]:border-primary  data-[state=active]:text-primary  data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
                  >
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="sustainability"
                    className="px-4 text-md bg-transparent text-brown border-b-2 border-transparent rounded-none data-[state=active]:border-primary  data-[state=active]:text-primary  data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
                  >
                    Sustainability
                  </TabsTrigger>
                  {attachments && attachments?.length !== 0 && (
                    <TabsTrigger
                      value="attachments"
                      className="px-4 text-md bg-transparent text-brown border-b-2 border-transparent rounded-none data-[state=active]:border-primary data-[state=active]:text-primary  data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
                    >
                      Attachments
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>
              <TabsContent value="account" className="md:pl-4 md:pr-0 px-[10px] text-brown">
                {/* {specificationData.map((specification:any)=>(
              <div
                className="text-sm"
                style={{ width: "100% !important", maxWidth: "100%" }}
                dangerouslySetInnerHTML={{ __html: specification }}
              ></div>
            ))} */}
                <div
                  className="text-sm w-full max-w-full text-justify-start"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(productData?.description),
                  }}
                ></div>
              </TabsContent>
              <TabsContent
                value="specifications"
                className="md:pl-4 md:pr-0 px-[10px] text-brown"
              >
                {specificationData &&
                  specificationData?.map((specification: any) => {
                    return (
                      <div
                        className="text-sm w-full max-w-full text-justify"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(specification),
                        }}
                      ></div>
                    );
                  })}
              </TabsContent>
              {/* <TabsContent
                value="sustainability"
                className="md:px-[50px] px-[10px]"
              >
                {sustainability &&
                  sustainability?.map((sustainability: any) => (
                    <div
                      className="text-sm"
                      style={{
                        width: "100% !important",
                        maxWidth: "100%",
                        textAlign: "justify",
                      }}
                      dangerouslySetInnerHTML={{ __html: sustainability }}
                    ></div>
                  ))}
              </TabsContent> */}
              <TabsContent
                value="sustainability"
                className="md:pl-4 md:pr-0 px-[10px] text-brown"
              >
                {sustainability &&
                  sustainability?.map((sustainability: any) => (
                    <div
                      className="text-sm w-full max-w-full text-justify !w-full"
                      dangerouslySetInnerHTML={{ __html: sustainability }}
                    ></div>
                  ))}
              </TabsContent>
              {/* {attachments.length === 0 ?
          
          <TabsContent value="attachments" className="md:px-[50px] px-[10px] w-full">
            <p className="text-brown text-lg md:ml-8 ml-1 font-medium">No Attachments Found</p>
            </TabsContent>
          : */}
              {attachments && attachments?.length !== 0 && (
                <TabsContent
                  value="attachments"
                  className="md:px-0 px-[10px] w-full text-brown"
                >
                  {attachments && attachments?.length === 0 ? (
                    <>
                      <LottieWrapper
                        animationData={animationData}
                        loop={true}
                        className="flex mx-auto justify-center items-center md:w-[400px] md:h-[400px] w-[90%]"
                      />

                      <p className="text-brown text-lg md:ml-8 ml-1 font- w-full flex items-center justify-center">
                        No Attachments Found
                      </p>
                    </>
                  ) : (
                    <>
                      {attachments.map((attachment: any) => {
                        // console.log(
                        //   "vewrtn",
                        //   `${assetURL}/${attachment?.value}`
                        // );
                        return (
                          <div className="flex items-center justify-between w-full px-[15px] py-[10px]">
                            <div className="flex items-center">
                              <Image
                                // src={`${assetURL}/${attachment?.value}`}
                                // src={
                                //   attachment?.value.endsWith(".pdf")
                                //     ? "/images/pdflogo.webp"
                                //     : attachment?.value
                                //     ? (
                                //         assetURL +
                                //         "/" +
                                //         attachment?.value
                                //       ).includes("//admin")
                                //       ? (
                                //           assetURL +
                                //           "/" +
                                //           attachment?.value
                                //         ).replace("//admin", "/admin")
                                //       : `${assetURL}/${attachment?.value}`
                                //     : "/images/product-placeholder.webp"
                                // }
                                src={
                                  attachment?.value?.endsWith(".pdf")
                                    ? "/images/pdflogo.webp"
                                    : attachment?.value
                                      ? normalizePath(
                                        `${assetURL}/${attachment.value}`
                                      )
                                      : "/images/product-placeholder.webp"
                                }
                                className="w-[70px] h-[70px] rounded"
                                alt={attachment?.key}
                                width={70}
                                height={70}
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "images/failedToLoadImage.webp";
                                }}
                                loading="lazy"
                              />
                              <p className="text-brown text-lg md:ml-8 ml-1 font-medium">
                                {attachment?.key}
                              </p>
                            </div>
                            {attachment?.value.endsWith(".pdf") ? (
                              // <Button
                              //   variant="outline"
                              //   onClick={() => {
                              //     const urr =
                              //       assetURL + "/" + attachment?.value;
                              //     if (urr.includes("//admin")) {
                              //       window.open(
                              //         // "https://docs.google.com/viewer?url=" +
                              //         urr.replace("//admin", "/admin"),
                              //         "_blank"
                              //       );
                              //     } else {
                              //       window.open(
                              //         // "https://docs.google.com/viewer?url=" +
                              //         assetURL + "/" + attachment?.value,
                              //         "_blank"
                              //       );
                              //     }
                              //     window.open(
                              //       totalProduct?.certificateLink,
                              //       "_blank"
                              //     );
                              //   }}
                              //   // target="_blank"
                              //   className=" md:mr-5 bg-transparent !border !border-secondary  text-secondary hover:shadow-none"
                              //   // onClick={() =>{window.open(`${assetURL}/${attachment?.value}`)}}
                              // >
                              //   <p className="text-secondary text-lg font-medium">
                              //     View
                              //   </p>
                              // </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  const url = normalizePath(
                                    `${assetURL}/${attachment?.value}`
                                  );
                                  window.open(url, "_blank");

                                  if (totalProduct?.certificateLink) {
                                    window.open(
                                      totalProduct.certificateLink,
                                      "_blank"
                                    );
                                  }
                                }}
                                className="md:mr-5 bg-transparent !border !border-secondary text-secondary hover:shadow-none"
                              >
                                <p className="text-secondary text-lg font-medium">
                                  View
                                </p>
                              </Button>
                            ) : (
                              <Dialog>
                                <DialogTrigger asChild className="max-w-[90%]">
                                  {/* <Button variant="outline">View</Button> */}
                                  <Link href="#" className=" md:mr-5">
                                    <p className="text-secondary text-lg font-medium">
                                      View
                                    </p>
                                  </Link>
                                </DialogTrigger>
                                <DialogContent className="w-[98%] fixed  h-[98%] lg:w-full ">
                                  <DialogClose className="flex justify-end absolute z-50 right-[15px] top-[15px] w-full shadow-2xl">
                                    <IoCloseCircleSharp
                                      color="white"
                                      size={30}
                                    />
                                  </DialogClose>
                                  <div className="h-full w-full ">
                                    <Image
                                      // src={
                                      //   (
                                      //     assetURL +
                                      //     "/" +
                                      //     attachment?.value
                                      //   ).includes("//admin")
                                      //     ? (
                                      //         assetURL +
                                      //         "/" +
                                      //         attachment?.value
                                      //       ).replace("//admin", "/admin")
                                      //     : `${assetURL}/${attachment?.value}`
                                      // }
                                      src={normalizePath(
                                        `${assetURL}/${attachment?.value}`
                                      )}
                                      className="p-[10px] rounded "
                                      onError={(e) => {
                                        e.currentTarget.src =
                                          "images/failedToLoadImage.webp";
                                      }}
                                      loading="lazy"
                                      objectFit="cover"
                                      alt={attachment?.key}
                                      fill={true}
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </TabsContent>
              )}

              {/* } */}
            </Tabs>
          </div>

          {/* Similar Products Start */}
          {totalProduct?.childCategories &&
            totalProduct?.childCategories.length > 0 && (
              <SimilarProducts
                childIds={totalProduct?.childCategories}
                currentId={totalProduct?._id}
              />
            )}

          {/* Similar Products End */}




          {/* Recently Viewed Products Start */}
          {recentProducts?.length > 0 && (
            <div className="md:px-20">
              <RecentlyViewed />
            </div>
          )}

          {/* Recently Viewed Products End */}
        </>
      )}

      <QuoteCompo
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        quantity={quantity}
        totalProduct={totalProduct}
        productSelectedForQuote={productSelectedForQuote}
        setQuantityForQuote={setQuantityForQuote}
        setMinQuantityForQuote={setMinQuantityForQuote}
        minQuantityForQuote={minQuantityForQuote}
        quantityForQuote={quantityForQuote}
        setProductSelectedForQuote={setProductSelectedForQuote}
        combinations={combinations}
        productData={productData}
      />
      <SubmitEnquiryModal
        open={openEnquiryFlow}
        onClose={() => setOpenEnquiryFlow(false)}
        product={productData}
        mode="proceed"
        initialQuantity={enquiryInitialQty}
      />
    </div>
  );
};

export default ProductDetails;



//In mobile we can show request quote and add to cart button side by side even the product in scrolled
//  {/* </div> */}
//   <div className=" md:hidden mobile-sm:flex">
//     {(totalProduct?.purchaseType == "MULTI" ||
//       totalProduct?.purchaseType == "QUOTE") &&
//       productData?.status == "PUBLISHED" &&
//       productData?.deletedAt == null &&
//       productData?.isActive ? (
//       <>
//         <Button
//           className="flex bg-[#F5E7EC] w-[45%] md:w-full rounded hover:bg-primary shadow-xs group"
//           onClick={() => {
//             if (!checkBuyerLogin()) {
//               return;
//             }
//             setIsOpen(true);
//             let productForQuote = totalProduct;
//             // productForQuote.variants.slice(0, 1)
//             productForQuote.variants;
//             // setProductSelectedForQuote(productForQuote);
//           }}
//         >
//           <FiFileText
//             // color="#A92449"
//             size={18}
//             className="text-current text-secondary group-hover:text-cream"
//           />
//           <p className="text-secondary text-md text-medium ml-3 group-hover:text-cream">
//             Request Quote
//           </p>
//         </Button>
//         <QuoteCompo
//           isOpen={isOpen}
//           setIsOpen={setIsOpen}
//           quantity={quantity}
//           totalProduct={totalProduct}
//           productSelectedForQuote={productSelectedForQuote}
//           setQuantityForQuote={setQuantityForQuote}
//           setMinQuantityForQuote={setMinQuantityForQuote}
//           minQuantityForQuote={minQuantityForQuote}
//           quantityForQuote={quantityForQuote}
//           setProductSelectedForQuote={setProductSelectedForQuote}
//           combinations={combinations}
//           productData={productData}
//         />
//       </>
//     ) : (
//       <></>
//     )}
//     {(totalProduct?.purchaseType == "MULTI" ||
//       totalProduct?.purchaseType == "ONLINE") &&
//       productData?.status == "PUBLISHED" &&
//       productData?.deletedAt == null &&
//       productData?.isActive ? (
//       <Button
//         disabled={loadingCartButton}
//         onClick={() => addToCart(productData?._id)}
//         className="flex w-[45%] md:w-full bg-secondary rounded hover:bg-primary shadow-xs group"
//       >
//         {loadingCartButton ? (
//           <>
//             <CircularProgress
//               // isIndeterminate
//               color="#ffffff"
//               size={6}
//             />
//           </>
//         ) : (
//           <>
//             {" "}
//             <BsCartPlus
//               color="#fff"
//               size={18}
//               className="text-current group-hover:text-cream"
//             />
//             <p className="text-cream text-md text-medium ml-3 group-hover:text-cream">
//               Add to Cart
//             </p>
//           </>
//         )}
//       </Button>
//     ) : (
//       ""
//     )}
//     {/* </div>  */}
//   </div>


