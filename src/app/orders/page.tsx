// pages/wishlist/WishList.tsx
"use client";
import React, { useEffect, useState } from "react";
// import Head from "next/head";
// import WishListCard from "@/components/wishlist/WishListCard";
import * as getEndpoint from "../../network/EndPoints";
import useApi from "@/components/Fetcher/useAPI";
import toast from "react-hot-toast";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import EmptyWishlist from "./components/EmptyOrders";
import { CircularProgress } from "@chakra-ui/react";
import Sidebar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pagination/Pagination";
import OrderRow from "./components/orderRow";
// import { stat } from "fs";
// import { IoIosSearch } from "react-icons/io";
import { debounce } from "lodash";
// import SearchInput from "@/components/sharedComponents/searchInput";
import Link from "next/link";

const Orders = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [planType, setPlanType] = useState<string>("");
  const [brandCode, setBrandCode] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [isSingle, setIsSingle] = useState(false);
  const [country, setCountry] = useState("");
  const [isReturnable, setIsReturnable] = useState(false);
  const [isRefundable, setIsRefundable] = useState(false);
  const [isCancellable, setIsCancellable] = useState(false);
  const [vendorCode, setVendorCode] = useState("");
  const [returnType, setReturnType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [productId, setProductId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [orderId, setOrderId] = useState("");
  const [childOrderId, setChildOrderId] = useState("");
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const router = useRouter();

  useEffect(() => {
    getOrders(page);
  }, [status, searchTerm]);

  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else if (result?.status === 401) {
      await refreshTokens();
      getOrders(page);
    } else {
      toast.error(result?.data?.message);
    }
  };

  const buildUrl = (baseUrl: any, params: any) => {
    const queryParams = new URLSearchParams();

    // Iterate over the parameters and append only if they have a value
    Object.entries(params).forEach(([key, value]: any) => {
      if (value) {
        // Only append if value is truthy
        queryParams.append(key, value);
      }
    });

    return `${baseUrl}?${queryParams.toString()}`;
  };

  const getOrders = async (page: any) => {
    const params = {
      page: page ? page : null,
      limit: limit ? limit : null,
      searchTerm: searchTerm ? searchTerm : null,
      returnType: returnType ? returnType : null,
      startDate: startDate ? startDate : null,
      endDate: endDate ? endDate : null,
      vendorId: vendorCode ? vendorCode : null,
      buyerId: buyerId ? buyerId : null,
      orderId: orderId ? orderId : null,
      childOrderId: childOrderId ? childOrderId : null,
      productId: productId ? productId : null,
      minPrice: minPrice ? minPrice : null,
      maxPrice: maxPrice ? maxPrice : null,
      status: status ? status : null,
    };

    const apiUrl = buildUrl(getEndpoint.default.ORDERHISTORY, params);
    // console.log('ApiUrl',apiUrl,params)

    setLoading(true);
    // const url = `${getEndpoint.default.ORDERHISTORY}?limit=9&page=${page}`;
    try {
      const result = (await callApi(apiUrl, "GET")) as any;
      if (result.data == null) {
        handleApiError(result?.errorData);
      } else {
        // // console.log('cwvrbet',result?.data?.data);
        setOrders(result?.data?.data);
        setTotalPage(result.data.metadata.totalCount);
        setTotalItems(result.data.metadata.totalCount);
        setPage(result.data.metadata.currentPage);
        setMeta(result?.data?.metadata);
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (section: string) => {
    // console.log('Selected Status',section)
    setActiveSection(section);
  };

  const getOrderByStatus = async (status: string) => {
    // console.log('SelectedStatus',status)
    if (status == "all") {
      setActiveSection("all");
      setStatus("");
    } else {
      setStatus(status);
      setActiveSection(status);
    }
  };

  function calculateDiscountPercentage(
    mrp: number,
    discountedPrice: number
  ): number {
    if (mrp <= 0 || discountedPrice < 0 || discountedPrice > mrp) {
      return 0;
    }

    const discount = ((mrp - discountedPrice) / mrp) * 100;
    return Math.round(discount);
  }

  const handleWishlistClick = (slug: string) => {
    router.push(`/${slug}`);
  };

  const handleChange = (newPage: number) => {
    // console.log("same page",newPage);
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (newPage == page) {
      return;
    }
    getOrders(newPage);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const debouncedSearch = debounce(
    (value: string) => setSearchTerm(value),
    500
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value,"valuehandleInputChange");
    // setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <div className="bg-white min-h-screen">
      <head>
        <title>Home | Orders</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
      <div className="banner-section h-102">
      <div className="md:px-20 px-5 py-5 relative h-[200px] flex items-center justify-start text-white bg-cover bg-center bg-[url('/images/about/aboutBanner1.png')]">

          <Link
            href="/home"
            className="text-white flex items-center no-underline px-2.5 py-1 rounded"
          >
            Home
          </Link>

          <span className="mx-2 text-white">/</span>
          <h1 className="text-white flex items-center">Orders</h1>
        </div>
      </div>

      <div className="container mx-auto p-5 md:p-10">
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          {/* Sidebar */}
          <Sidebar
            activeSection={activeSection}
            handleSectionClick={handleSectionClick}
            setStatus={getOrderByStatus}
          />

          {/* Wishlist Section */}
          <section className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800  pl-2">
                Orders {totalItems > 0 ? `(${totalItems})` : ""}
              </h1>
              {/* <div className="relative w-full max-w-md h-[43px] border !border-gray rounded"> */}

              {/* <input
                type="text"
                placeholder="Search Quote by ID"
                value={searchTerm}
                onChange={handleInputChange}
                className="pl-2 w-full h-full rounded-sm border-borderGray"
                // className="border border-gray-300 rounded-md py-2 px-3 w-[50%] focus:outline-none focus:border-blue-500"
                />
               <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none bg-secondary p-3">
                <IoIosSearch className="h-5 w-5 text-white rounded-r" aria-hidden="true" />
            </div> */}
              {/* <SearchInput placeholder="Search Order" onChange={handleInputChange} /> */}
              {/* </div> */}
            </div>

            {/* Product Card Grid */}
            {orders?.length > 0 ? (
              <div className="w-full mb-4">
                {orders.map((order: any, index) => {
                  if (order && order?.orders && order?.orders?.length > 0)
                    return (
                      <OrderRow
                        order={order}
                        reloadPage={reloadPage}
                        //   key={index}
                        //   wishlistId={wishlist?._id}
                        //   product={wishlist.product}
                        //   calculateDiscountPercentage={calculateDiscountPercentage}
                        //   handleWishlistClick={handleWishlistClick}
                        //   getWishlist={getWishlist}
                      />
                    );
                })}
                {/* {products1.map((product, index) => (
              <WishListCard key={index} product={product} />
            ))} */}
              </div>
            ) : loading ? (
              <div className="w-full text-center">
                <CircularProgress isIndeterminate color="#a92449" />
              </div>
            ) : (
              <EmptyWishlist />
            )}
            {totalPage > 9 && (
              <Pagination
                totalItems={totalItems}
                itemsPerPage={9}
                currentPage={page}
                onPageChange={handleChange}
              />
            )}
            {/* {loading ? (
              <div className="flex justify-center items-center h-full">
                <CircularProgress isIndeterminate color="blue.500" />
              </div>
            ) : orders?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {orders.map((item, index) => (
                  <WishListCard
                    key={index}
                    item={item}
                    calculateDiscountPercentage={calculateDiscountPercentage}
                  />
                ))}
              </div>
            ) : (
              <EmptyWishlist />
            )} */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Orders;
