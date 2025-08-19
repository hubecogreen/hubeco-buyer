// pages/wishlist/WishList.tsx
"use client";
import React, { useEffect, useState } from "react";
// import Head from "next/head";
import WishListCard from "@/components/wishlist/WishListCard";
import * as getEndpoint from "../../network/EndPoints";
import useApi from "@/components/Fetcher/useAPI";
import toast from "react-hot-toast";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import EmptyWishlist from "./components/emptyWishlist";
import { CircularProgress } from "@chakra-ui/react";
import Sidebar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pagination/Pagination";
import Link from "next/link";

const WishList = () => {
  const [activeSection, setActiveSection] = useState("saved");
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const router = useRouter();

  useEffect(() => {
    getWishlist();
  }, []);

  const handleApiError = async (err: any) => {
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

  const getWishlist = async (page = 1) => {
    setLoading(true);
    const url = `${getEndpoint.default.WISHLIST}?limit=12&page=${page}`;
    try {
      const result = (await callApi(url, "GET")) as any;
      if (result.data == null) {
        handleApiError(result?.errorData);
      } else {
        setWishlistData(result?.data?.data);
        setTotalPage(result.data.metadata.totalCount);
        setTotalItems(result.data.metadata.totalCount);
        setPage(result.data.metadata.currentPage);
      }
    } catch (e) {
      handleApiError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
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
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (newPage == page) {
      // // console.log("same page");
      return;
    }
    getWishlist(newPage);
  };

  const reloadWish = () => {
    // console.log('Rlelelel')
    router.refresh();
    window.location.reload();
  };

  return (
    <div className="bg-white min-h-screen">
      <head>
        <title>Wishlist | Hubeco</title>
        {/* <meta name="description" content='' />
        <meta name="keywords" content='' /> */}
        {/* <meta name="author" content={productsData?.author.firstName} /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
      <div className="banner-section h-102">
        <div
          className="md:px-20 px-5 py-5 relative bg-cover bg-center h-[200px] flex items-center justify-start text-white"
          style={{
            backgroundImage: 'url("images/about/aboutBanner1.webp")',
          }}
        >
          <Link href="/" className="text-white flex items-center">
            Home
          </Link>
          <span className="mx-2 text-white">/</span>
          <h1 className="text-white flex items-center">Wishlist</h1>
        </div>
      </div>

      <div className="container mx-auto p-5 md:p-10">
        <div className="flex flex-col lg:flex-row gap-5 md:gap-10">
          {/* Sidebar */}
          <Sidebar
            activeSection={activeSection}
            handleSectionClick={handleSectionClick}
            setStatus={() => {}}
          />

          {/* Wishlist Section */}
          <section className="flex-1">
            {wishlistData.length > 0 && (
              <h1 className="text-3xl font-bold text-gray-800 mb-4 pl-2">
                Wishlist (
                {wishlistData.length ? `${wishlistData?.length}` : null})
              </h1>
            )}

            {/* Product Card Grid */}
            {wishlistData?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistData.map((wishlist: any, index) => {
                  if (wishlist?.product)
                    return (
                      <WishListCard
                        key={index}
                        wishlistId={wishlist?._id}
                        product={wishlist.product}
                        calculateDiscountPercentage={
                          calculateDiscountPercentage
                        }
                        handleWishlistClick={handleWishlistClick}
                        getWishlist={getWishlist}
                        reloadWishlist={reloadWish}
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
                itemsPerPage={12}
                currentPage={page}
                onPageChange={handleChange}
              />
            )}
            {/* {loading ? (
              <div className="flex justify-center items-center h-full">
                <CircularProgress isIndeterminate color="blue.500" />
              </div>
            ) : wishlistData?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {wishlistData.map((item, index) => (
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

export default WishList;
