"use client";
import React, { useEffect, useState } from "react";
import useApi from "@/components/Fetcher/useAPI";
import * as getEndpoint from "../../../../network/EndPoints";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";

interface Vendor {
  id: string;
  name: string;
}

interface VendorFiltersListProps {
  vendors: Vendor[]; // Array of vendors to display
  onVendorSelectionChange: (selectedVendors: string[]) => void; // Function prop to handle selected vendors
  refresh: any;
  filter:any
}
const VendorFiltersList: React.FC<VendorFiltersListProps> = ({
  vendors,
  onVendorSelectionChange,
  refresh,
  filter
}) => {
  const { callApi } = useApi();
  const searchParams = useSearchParams();
  const [vendorsData, setVendorsData] = useState<any>([]);

  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalVendors, setTotalVendors] = useState(0);
  const [vendorSearch, setVendorSearch] = useState<string>("");
  const [vendorCount, setVendorCount] = useState<any>(null);
  const [totalPages, setTotalPages] = useState<any>(null);
  const [selectedVendorsList, setSelectedVendorsList] = useState<any>([]);

  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  useEffect(() => {
    getVendors(1); // Initial fetch
  }, [refresh,filter]);

  useEffect(() => {
    if (refresh) {
      // console.log("Sleelel");
      setSelectedVendorsList([]);
      setSelectedVendors([]);
      setVendorSearch("")
    }
  }, [refresh]);

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

  const getVendors = async (page: number, searchVal?: string) => {
    const params = {
      ...filter,
      page: page ? page : null,
      limit: 10,
      searchTerm: searchVal?.toLowerCase() ? searchVal?.toLowerCase() : null,
    };
    const apiUrl = buildUrl(getEndpoint.default.VENDORS, params);

    try {
      const result = (await callApi(apiUrl, "GET")) as any;
      if (result.data == null) {
        handleApiError(result.errorData);
      } else {
        setVendorCount(result?.data?.meta?.totalItems);
        setTotalPages(result?.data?.meta?.totalPages);
        const newVendors = result?.data?.items || [];
        setTotalVendors(result?.data?.total || 0); // Assuming API returns total vendor count

        // Clear the list when searching, otherwise append for "Show More"
        if (searchVal) {
          setVendorsData(newVendors);
        } else if (page === 1) {
          setVendorsData(newVendors);
        } else {
          setVendorsData((prev: any) => [...prev, ...newVendors]);
        }
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleShowMoreVendors = () => {
    setVendorSearch(""); // Reset search term when showing more vendors
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getVendors(nextPage);
  };
  const handleShowLessVendors = () => {
    const nextPage = currentPage - 1;
    setCurrentPage(nextPage);
    getVendors(nextPage);
  };

  const debouncedSearch = debounce(
    (value: string) => getVendors(currentPage, value),
    300
  );

  const handleVendorSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVendorSearch(value);
    setCurrentPage(1); // Reset to the first page for new search
    debouncedSearch(value); // Trigger the search
  };

  const onSelectVendor = (id: any) => {
    setSelectedVendors((prevSelectedVendors) => {
      if (prevSelectedVendors.includes(id?.id)) {
        // Remove the ID if it exists
        onVendorSelectionChange(
          prevSelectedVendors.filter((vendorId) => vendorId !== id?.id)
        );
        return prevSelectedVendors.filter((vendorId) => vendorId !== id?.id);
      } else {
        // Add the ID if it doesn't exist
        onVendorSelectionChange([...prevSelectedVendors, id?.id]);
        return [...prevSelectedVendors, id?.id];
      }
    });
    setSelectedVendorsList((prevSelectedVendors: any[]) => {
      // Check if the vendor already exists in the list by comparing the id
      const vendorExists = prevSelectedVendors.some(
        (vendor: any) => vendor.id === id
      );
      // console.log("cvrebtyru", vendorExists);

      if (vendorExists) {
        // Vendor exists, remove it from the selected vendors list

        return prevSelectedVendors.filter((vendor: any) => vendor.id !== id);
      } else {
        // Vendor doesn't exist, add it to the selected vendors list

        return [...prevSelectedVendors, { id }];
      }
    });
  };

  return (
    <>
      <div className="mt-2 mb-4 border-b border-borderGray ">
        <>
          <h3 className="text-sm font-semibold mb-4">VENDORS</h3>
          {/* <input
              type="text"
              placeholder="Search Vendors"
              value={vendorSearch}
              onChange={handleVendorSearch}
              className="mb-4 p-2 border rounded w-full h-[45px]"
            /> */}
          <div className="relative flex flex-row items-center">
            {/* Search Icon */}
            <span className="absolute inset-y-0 left-3 flex items-center text-fontGray h-[40px] ">
              <Search size={16} color="#4d4d4d" className="text-fontGray" />
            </span>
            <Input
              placeholder="Search"
              value={vendorSearch || ""}
              onChange={(e: any) => handleVendorSearch(e)}
              className="pl-[35px] bg-cream md:text-md text-sm h-[40px] shadow-md text-fontGray mr-[1px] mb-4 rounded-[5px] w-full"
            />

          </div>
        </>

        {vendorCount > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 my-4">
              {selectedVendorsList.map((vendor: any) => {
                return (
                  vendor && (
                    <div
                      key={vendor?.id?.id}
                      className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded text-sm"
                    >
                      {vendor?.id?.businessInfo?.companyName}{" "}
                      {/* Display vendor name here */}
                      <IoClose
                        className="ml-2 cursor-pointer"
                        onClick={() => onSelectVendor(vendor?.id)} // Use vendor.id for removal
                      />
                    </div>
                  )
                );
              })}
            </div>
            <div className="max-h-96 overflow-y-auto scrollbar">
              {vendorsData.map((vendor: any) => (
                <div key={vendor?.id} className="flex items-center py-[5px]">
                  <Checkbox
                    id={vendor?.id}
                    className="mr-3"
                    checked={selectedVendors.includes(vendor?.id)}
                    onClick={() => {
                      onSelectVendor(vendor);
                    }}
                  />
                  <label htmlFor={vendor?.id} className="text-sm">
                    {vendor?.businessInfo?.companyName}
                  </label>
                </div>
              ))}
            </div>
            {vendorCount > 10 ? (
              <>
                {currentPage < totalPages ? (
                  <>
                    {currentPage > 1 ? (
                      <>
                        <div className="w-full flex justify-between items-center">
                          <div className="flex items-center flex-row mt-3 mb-4">
                            <MdKeyboardDoubleArrowLeft
                              color={"white"}
                              size={18}
                            />
                            <button
                              className="text-sm text-cream "
                              onClick={handleShowLessVendors}
                            >
                              Show Less
                            </button>
                          </div>
                          <div className="flex items-center flex-row mt-3 mb-4">
                            <button
                              className="text-sm text-cream "
                              onClick={handleShowMoreVendors}
                            >
                              Show More
                            </button>
                            <MdKeyboardDoubleArrowRight
                              color={"white"}
                              size={18}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center flex-row mt-3 mb-4">
                        <button
                          className="text-sm text-cream "
                          onClick={handleShowMoreVendors}
                        >
                          Show More
                        </button>
                        <MdKeyboardDoubleArrowRight
                          color={"white"}
                          size={18}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center flex-row mt-3 mb-4">
                    <MdKeyboardDoubleArrowLeft color={"white"} size={18} />
                    <button
                      className="text-sm text-cream "
                      onClick={handleShowLessVendors}
                    >
                      Show Less
                    </button>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div className="w-full justify-start items-center ">
              <p className="text-brown text-sm font-medium py-2">
                No vendors found.Try adjusting your search.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VendorFiltersList;
