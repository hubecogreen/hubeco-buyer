"use client";
import BannerSection from "@/components/sharedComponents/BannerSection";
import React, { useState, useEffect, useCallback } from "react";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import { getCookie } from "cookies-next";
// import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import animationData from "../../../public/animations/nodatafound.json";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pagination/Pagination";
import ViewMore from "@/components/product/quote/ViewMore";

interface Ticket {
  id: string;
  description: string;
  priority: string;
  status: string;
  ticketNature: string;
  ticketType: string;
  ticketId: string;
  createdAt: string;
  userType: string;
}

const Tickets: React.FC = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState<Ticket[]>([]);
  const [projectData, setProjectData] = useState<any>();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 5,
  });
  const token = getCookie("token");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const getData = (page: number) => {
    // if (debouncedSearchTerm === "" && page === 1) {
    //   setLoading(true);
    // }
    const url = `${getEndpoint.default.SUPPORT_LISTING}?searchTerm=${searchTerm}&limit=10&page=${page}`;
    Webservices.callGetApi(url, token)
      .then(
        (response: {
          data: {
            data: any;
            nextCursor: string | null;
            totalCount: number;
            metadata: { totalCount: number; currentPage: number };
          };
        }) => {
          if (response.data && Array.isArray(response.data.data)) {
            setLoading(false);
            // // console.log("image", response.data.data);
            setProjectData(response.data.data);
            setTotalPage(response.data.metadata.totalCount);
            setPage(response.data.metadata.currentPage);

            const data = response.data.data;
            const meta = response.data;

            setTableData(
              data.map((item: any) => ({
                id: item._id,
                description: item.description,
                priority: item.priority,
                status: item.status,
                ticketNature: item.ticketNature,
                ticketType: item.ticketType,
                ticketId: item.ticketId,
                createdAt: item.createdAt,
                userType: item.userType,
              }))
            );
          } else {
            setLoading(false);
            // consoleerror("Unexpected response format: ", response);
          }
        }
      )
      .catch((err) => {
        setLoading(false);
        // consoleerror("API call failed: ", err);
      });
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  const handleChange = (newPage: number) => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (newPage == page) {
      // // console.log("same page");
      return;
    }
    getData(newPage);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase(); // Get short month name and capitalize
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 becomes 12)

    return `${day} ${month} ${year}, ${hours}:${minutes} ${amPm}`;
  };

  //   const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
  //     fetchData(page);
  //   };

  return (
    <>
      <head>
        <title>Tickets</title>
      </head>
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "Tickets", href: "#" }}
      />
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-full mx-auto md:mx-10 mt-10">
          {/* <h1 className="text-xl font-bold text-center mb-4">Tickets</h1> */}
          <h1 className="text-2xl font-bold mb-4">Tickets</h1>
          {/* Tickets Table */}
          <div className="bg-gray-50 shadow-md rounded-md overflow-hidden">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : tableData.length > 0 ? (
              <div className="sm:block">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-secondaryBg">
                      <tr>
                        <th className="py-6 px-4 text-sm font-semibold">
                          Date
                        </th>
                        <th className="py-2 px-4 text-sm font-semibold">
                          Ticket ID
                        </th>
                        <th className="py-2 px-4 text-sm font-semibold">
                          Description
                        </th>
                        <th className="py-2 px-4 text-sm font-semibold">
                          Ticket Type
                        </th>
                        <th className="py-2 px-4 text-sm font-semibold">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <>
                      <tbody>
                        {tableData.map((ticket) => (
                          <tr key={ticket.id} className="border-b">
                            <td className="py-6 px-4 text-sm">
                              {formatDateTime(ticket.createdAt)}
                            </td>
                            <td className="py-2 px-4 text-sm">
                              <div className="flex">
                                {ticket.ticketId} -
                                <h6
                                  className="pl-3 hover:underline cursor-pointer text-[#B90647]"
                                  onClick={() =>
                                    router.push(`/order-support/${ticket.id}`)
                                  }
                                >
                                  View Ticket
                                </h6>
                              </div>
                            </td>
                            <td className="py-2 px-4 text-sm md:w-[600px]">
                              {/* {ticket.description} */}
                              <ViewMore
                                text={ticket.description}
                                length={65}
                                className="md:w-full "
                              />
                            </td>
                            <td className="py-2 px-4 text-sm">
                              {ticket.ticketType === "QUALITY_INQUIRY"
                                ? "Quality Inquiry"
                                : ticket.ticketType === "ORDER_INQUIRY"
                                ? "Order Inquiry"
                                : ticket.ticketType === "CANCELLATION_INQUIRY"
                                ? "Cancellation Inquiry"
                                : ticket.ticketType === "REFUND_INQUIRY"
                                ? "Refund Inquiry"
                                : ticket.ticketType}
                            </td>

                            <td className="py-2 px-4 text-sm">
                              <div
                                className={`border w-fit px-2 rounded-lg ${
                                  ticket.status === "OPEN"
                                    ? "bg-[#EEFFFD] text-[#009886] border-[#EEFFFD]"
                                    : ticket.status.includes("PENDING")
                                    ? "bg-[#FF9F4329] text-[#FF9F43] border-[#FF9F4329]"
                                    : ticket.status === "ESCALATED"
                                    ? "bg-[#FFE9EA] text-[#FF4C51] border-[#FFE9EA]"
                                    : ticket.status === "IN_PROGRESS"
                                    ? "bg-[#00BAD129] text-[#00BAD1] border-[#00BAD129]"
                                    : ticket.status === "CLOSED" ||
                                      ticket.status === "RESOLVED"
                                    ? "bg-[#28C76F29] text-[#28C76F] border-[#28C76F29]"
                                    : //   ? "bg-[#00BAD129] text-[#00BAD1] border-[#00BAD129]"
                                      "bg-gray-500" // Default color if no match
                                }`}
                              >
                                {ticket.status.replace(/_/g, " ")}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center w-full mx-auto max-w-[40%] py-4">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="flex mx-auto justify-center items-center w-full h-[200px]"
                />

                <p className="text-center text-fontGray mt-4 text-lg font-bold ">
                  No Tickets found.
                </p>
              </div>
            )}
          </div>

          {totalPage > 10 && (
            <div className="w-full flex justify-center items-center mt-4">
              <Pagination
                totalItems={totalPage}
                itemsPerPage={10}
                currentPage={page}
                onPageChange={handleChange}
              />
            </div>
          )}

          {/* Pagination */}
          {/* <div className="flex justify-end mt-4">
          <Pagination
            count={paginationInfo.lastPage}
            page={paginationInfo.currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Tickets;
