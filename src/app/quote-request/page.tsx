"use client";
import React, { useEffect, useState, useCallback } from "react";
// import Head from "next/head";
import Sidebar from "@/components/SideBar";
import useApi from "@/components/Fetcher/useAPI";
import useRefreshToken from "@/components/hooks/useRefreshToken";
import Pagination from "@/components/pagination/Pagination";
import { Loader } from "lucide-react";
import { debounce } from "lodash";
import dayjs from "dayjs";
// import SearchInput from "@/components/sharedComponents/searchInput";
import animationData from "../../../public/animations/nodatafound.json";
import { IoIosSearch } from "react-icons/io";
// import { Button } from "@/components/ui/button";
import Image from "next/image"
import BannerSection from "@/components/sharedComponents/BannerSection";
import Link from "next/link";
import { normalizePath } from "@/lib/utils";
import LottieWrapper from "@/components/LottieWrapper";
const assetUrl = process.env.NEXT_PUBLIC_ASSET_URL;

const QuoteRequest = () => {
  const [activeSection, setActiveSection] = useState("quote");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { callApi } = useApi();
  const { refreshTokens } = useRefreshToken();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (page = 1, limit = 10, searchTerm = "") => {
    try {
      setLoading(true);
      // const res = null
      const res = (await callApi(
        `quotes/getMyQuotes?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        "GET"
      )) as any;

      if (res.data !== null) {
        setData(res.data.data);
        setTotalPages(res.data.metadata.totalCount);
        setPage(res.data.metadata.currentPage);
        setLimit(res.data.metadata.limit);
      } else {
        setData([]);
        if (res.error.includes("401")) {
          await refreshTokens();
          window.location.reload();
        }
      }
    } catch (e: any) {
      // console.log(e, "saSJH");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, limit, searchTerm);
  }, []);

  const handleChangePage = (page: number) => {
    fetchData(page, limit, searchTerm);
  };

  const debouncedSearch = debounce(
    (value: string) => fetchData(page, limit, value),
    500
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value, "valuehandleInputChange");
    setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  // if (loading) {
  //   return (
  //     <div className="w-full flex justify-center h-[80vh] items-center">
  //       <Loader className="text-[#439787] spin-in-180 animate-spin" />
  //     </div>
  //   );
  // }
  const getStatusStyles = (status: string) => {
    const statusStyles = [
      {
        statuses: ["completed"],
        textColor: "text-white",
        bgColor: "text-[#009886]",
      },
      {
        statuses: ["closed"],
        textColor: "text-white",
        bgColor: "text-[#009886]",
      },
      {
        statuses: ["pending"],
        textColor: "text-brown",
        bgColor: "text-[#fdba74]",
      },
      {
        statuses: ["requested"],
        textColor: "text-white",
        bgColor: "text-[#009886]",
      },
      {
        statuses: ["quotation_sent"],
        textColor: "text-white",
        bgColor: "text-[#009886]",
      },
      {
        statuses: ["quotation_rejected"],
        textColor: "text-white",
        bgColor: "text-[#A92449]",
      },
      {
        statuses: ["quotation_approved"],
        textColor: "text-white",
        bgColor: "text-[#439787]",
      },
      {
        statuses: ["partial_payment_made"],
        textColor: "text-brown",
        bgColor: "text-[#fdba74]",
      },
      {
        statuses: ["payment_scheduled"],
        textColor: "text-white",
        bgColor: "text-[#439787]",
      },
      {
        statuses: ["payment_cleared"],
        textColor: "text-white",
        bgColor: "text-[#009886]",
      },
      {
        statuses: ["processing_orders"],
        textColor: "text-white",
        bgColor: "text-[#009886]",
      },
    ];

    const defaultStyles = { textColor: "text-brown", bgColor: "bg-gray-300" };

    // Find the matching style based on the status
    const style = statusStyles.find((item) =>
      item.statuses.includes(status.toLowerCase())
    );

    return style
      ? ` ${style.bgColor}`
      : `${defaultStyles.textColor} ${defaultStyles.bgColor}`;
  };

  function getStatus(status: string) {
    const data = {
      completed: "Payment Completed",
      closed: "Closed",
      pending: "Pending",
      requested: "Requested",
      quotation_sent: "Quotation received",
      quotation_rejected: "Quotation rejected",
      quotation_approved: "Quotation approved",
      partial_payment_made: "Part payment made",
      payment_scheduled: "Payment scheduled",
      payment_cleared: "Payment cleared",
      submission_delayed: "Submission delayed",
      processing_orders: "Processing orders",
    };
    return data[status as keyof typeof data];
  }

  return (
    <div className="  bg-cream min-h-screen">
      <head>
        <title>Hubeco | Quote Requests</title>
      </head>
      {/* <div className="banner-section h-102">
        <div
          className="md:px-20 px-5 py-5"
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
          <a href="/" className="text-white flex items-center">
            Home
          </a>
          <span className="mx-2 text-white">/</span>
          <h1 className="text-white">Quote Requests</h1>
        </div>
      </div> */}
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "Quote Request", href: "/quote-request" }}
      />

      <div className="container mx-auto p-5 md:p-10">
        <div className="flex flex-col lg:flex-row gap-5 md:gap-10">
          <Sidebar
            activeSection={activeSection}
            handleSectionClick={setActiveSection}
          />
          <section className="flex-1">
            <div className="flex gap-3 items-start justify-between">
              <h1 className="whitespace-nowrap text-3xl font-bold text-gray-800  border-b border-gray-300 pb-10">
                Quote Requests
              </h1>
              <div className="relative w-full max-w-md h-[43px] border !border-gray rounded-md">
                <input
                  type="text"
                  placeholder="Search Quote by ID"
                  value={searchTerm}
                  onChange={handleInputChange}
                  className="pl-2 w-full h-full rounded-sm"
                  // className="border border-gray-300 rounded-md py-2 px-3 w-[50%] focus:outline-none focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none bg-secondary p-3">
                  <IoIosSearch
                    className="h-5 w-5 text-white rounded-r"
                    aria-hidden="true"
                  />
                </div>
              </div>
              {/* <SearchInput placeholder="Search Product" onChange={handleInputChange} /> */}
            </div>
            {loading ? (
              <div className="w-full flex justify-center h-[80vh] items-center">
                <Loader className="text-[#439787] spin-in-180 animate-spin" />
              </div>
            ) : (
              <>
                {" "}
                {data.length > 0 ? (
                  data.map((quote, index) => (
                    <div key={index} className="mb-6 bg-gray-100 rounded-md">
                      <div className="flex justify-between items-center mb-4 bg-cream border border-primary  p-5">
                        <div className="flex flex-col">
                          <div className="flex">
                            {" "}
                            <button
                              className={` ${getStatusStyles(
                                quote.status
                              )}  cursor-default rounded mb-2 `}
                            >
                              <span
                                className={`font-semibold text-sm capitalize   `}
                              >
                                {getStatus(quote.status)
                                  ? getStatus(quote.status)
                                  : quote.status.split("_").join(" ")}
                              </span>
                            </button>
                          </div>
                          <div className="flex">
                            <h2 className="font-normal text-lg text-gray-600">
                              Quote Requested On :
                            </h2>
                            <span className="font-bold px-3">
                              {dayjs(quote.submissionDate).format("DD-MM-YYYY")}
                            </span>
                          </div>
                          <div className="flex ">
                            {/* <h2 className="font-normal text-lg text-gray-600">
                              Quote Created On :
                            </h2>
                            <span className="px-3 font-bold">
                              {dayjs(quote.createdAt).format("DD-MM-YYYY")}
                            </span> */}
                          </div>
                        </div>
                        <div className="text-right">
                          <h2 className="font-bold text-pink-600 text-lg pt-2">
                            {quote.quoteId}
                          </h2>
                          <div className="flex gap-3 pt-3">
                            <Link
                              href={`/quote-request/${quote._id}`}
                              className="text-[#B90647] font-bold"
                            >
                              View Quote Detail
                            </Link>
                          </div>
                        </div>
                      </div>
                      {quote?.products?.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between py-4 border-b border-gray-300"
                        >
                          <div className="flex">
                            <Image
                              src={normalizePath(`${assetUrl}/${item?.variantId?.thumbnail}`)}
                              alt={item?.name}
                              className="w-16 h-16 object-cover rounded mr-4"
                              width={16}
                              height={16}
                              onError={e => {
                                e.currentTarget.src = '/images/product-placeholder.webp'
                              }}
                              loading="lazy"
                            />
                            <div className="flex flex-col w-44">
                              <h3 className="font-semibold text-[#2F2B3DE5] line-clamp-3">
                                {item?.variantId?.variantName === "Default"
                                  ? item?.variantId?.productId?.name
                                  : `${item?.variantId?.variantName}`}
                              </h3>
                            </div>
                            <div className="flex space-x-8 text-[#2F2B3DB2] text-sm ml-10">
                              {/* {Array.isArray(item?.variantId?.attributes) &&
                                item?.variantId?.attributes.map(
                                  (attribute: any) => (
                                    <div className="flex flex-col">
                                      <p className="text-sm pt-1 whitespace-nowrap">
                                        {attribute.name}
                                      </p>
                                      <p className="text-sm pt-1  whitespace-nowrap">
                                        {attribute.value}
                                      </p>
                                    </div>
                                  )
                                )} */}
                              <div className="max-w-md"></div>
                              <div>
                                <p className="font-light">Quantity</p>
                                <p className="font-medium text-[#2F2B3DE5] pb-2">
                                  {item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <>
                    <LottieWrapper
                      animationData={animationData}
                      loop={true}
                      className="flex mx-auto justify-center items-center w-[400px] h-[400px]"
                    />

                    <p className="text-center text-fontGray mt-4 text-lg font-bold">
                      No quote found.
                    </p>
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mb-4 items-center border-t border-t-transparent mt-8">
          <Pagination
            totalItems={totalPages}
            itemsPerPage={limit}
            currentPage={page}
            onPageChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default QuoteRequest;
