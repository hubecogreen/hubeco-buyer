"use client"
import styles from "./PortfolioSection.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use 'next/router' for client-side routing
import Pagination from "@/components/pagination/Pagination";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
// import dayjs from "dayjs";
import animationData from "../../../public/animations/nodatafound.json";
import { IoIosSearch } from "react-icons/io";
import { PiMapPinLineLight } from "react-icons/pi";
// import CustomInput from "../customInput/CustomTextField";
// import { CircularProgress } from "@chakra-ui/react";
import Meta from "../sharedComponents/Meta";
import { Skeleton } from "../ui/skeleton";
import LottieWrapper from "../LottieWrapper";
interface Blog {
  _id: string;
  title: string;
  description: string;
  metaKeywords: string;
  metaDescriptions: string;
  content: string;
  thumbnail: string;
  status: string;
  isActive: boolean;
  author: {
    email: string;
    firstName: string;
    lastName: string;
    userId: string;
    userType: string;
    sessionId: string;
    thumbnail: string | null;
    phoneNumber: string;
  };
  createdAt: string;
  updatedAt: string;
  slug: string;
}

const PortfolioCard = () => {
  const router = useRouter();
  const [projectData, setProjectData] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL

  useEffect(() => {
    getData(page);
  }, [debouncedSearchTerm, page]); 

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 100); // Debounce time (e.g., 500ms)

    return () => {
      clearTimeout(handler); // Clear the timeout on cleanup
    };
  }, [searchTerm]);

  const getData = (page:number) => {
    if (debouncedSearchTerm === "" && page === 1) {
      setLoading(true);
    }
    const url = `${getEndpoint.default.PROJECTS}?searchTerm=${searchTerm}&limit=12&page=${page}`;
    Webservices.callGetApi(url, "")
      .then(
        (response: {
          data: {
            data: Blog[];
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (newPage: number) => {
    setPage(newPage)
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setPage(newPage)
    // console.log('check page', newPage)
    if (newPage == page) {
      // console.log('check page page coming same page')
      return;
    }
    setPage(newPage)
  };

  // console.log('check page page coming', page)

  const handleBlogClick = (_id: string) => {
    router.push(`/projects/${_id}`);
  };

  function truncateDescription(description: any, maxLength: any) {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + "...";
  }

  
  function ProductCardSkeleton() {
    return (
      <div className="w-full grid grid-cols-3 gap-4"> {/* Adjust grid layout for 3 cards */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="border w-full rounded-md border-slate-300 shadow-md p-4"
          >
            <Skeleton className="h-48 w-full mb-4" /> {/* Adjust height for image */}
  
            <Skeleton className="h-6 w-40 mb-3" /> {/* Adjust width for the tag */}
  
            <Skeleton className="h-6 w-3/4 mb-2" /> {/* Adjust width for title */}
  
            <Skeleton className="h-6 w-1/2 mb-2" /> {/* Adjust width for subtext */}
  
            <div className="flex items-center space-x-3 mb-2">
              <Skeleton className="h-8 w-8 rounded-full" /> 

              <Skeleton className="h-6 w-1/3" />
            </div>
  
            {/* Skeleton for Location */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6" /> {/* Icon skeleton */}
              <Skeleton className="h-6 w-1/3" /> {/* Location text */}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <>
      {/* <Meta title="Projects" subtitle="Projects" description="" /> */}
      <head>
        <title>Projects</title>
      </head>
      <div className="max-w-full px-0">
        <div className="block md:flex md:justify-between mb-6 md:mb-6">
          <h2 className="text-brown font-bold text-2xl md:text-3xl">
            Projects
          </h2>
          <div className="h-12 block flex md:w-96 ">
          <input
              className="w-full max-w-[400px] p-2 border border-gray-300 rounded-[5px] rounded-tr-none rounded-br-none focus:outline-none"
              type="text"
              placeholder="Search with Project Title or State"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div
              className="bg-pink p-3 h-12 rounded-md rounded-tl-none rounded-bl-none flex items-center justify-center"
            >

            <IoIosSearch className="h-[20px] w-[25px] text-white" />

            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            {/* Circular Progress Loader */}
            {/* <CircularProgress /> */}
            <ProductCardSkeleton/>
          </div>
        ) : projectData.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-x-4 md:gap-x-8 sm:gap-y-6 md:gap-y-12 mb-8">
            {projectData.map((item: any) => {
              return (
                <div key={item._id}>
                  <Meta title="Projects" subtitle="Projects" description="" />
                  <div
                    className={`bg-white group border border-borderGray rounded-sm overflow-hidden shadow-sm hover:bg-[#FAFAFF] hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
                    onClick={() => handleBlogClick(item.slug)}
                  >
                    <div className={styles.itemCard}>
                      <Image
                        className={styles.itemImage}
                        src={item?.thumbnail ?  (assetURL+'/'+item?.thumbnail).includes('//admin') ? (assetURL+'/'+item?.thumbnail).replace('//admin', '/admin') : `${assetURL}/${item?.thumbnail}` : '/images/product-placeholder.webp'}

                        alt="image"
                        height={259}
                        width={380}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.webp'
                        }}
                        loading="lazy"
                        style={{
                          height: "259px",
                          width: "380px",
                          cursor: "pointer",
                        }}
                      />
                      <div className={styles.itemTimings}>
                      {item?.certificate?.greenCertificateNumber && item?.certificate?.organization ? (
                        <div
                        className="flex items-center justify-center rounded px-3 pb-2 bg-[#0098861A]"
                      >
                      
                          <p className={styles.nameText}>
                            {"Certified Green building"}
                          </p>
                        </div>
                          ) : (
                            <div className='mb-2 mt-1 h-6'></div> // Empty placeholder
                          )}
                      </div>

                      <div className={styles.itemContent}>
                        {/* <h5
                          className={`${styles.itemTitle} cursor-pointer text-justify h-[30px]`}
                        >
                          {truncateDescription(item.title, 80)}
                        </h5> */}
                        <h5
                        className={`${styles.itemTitle} cursor-pointer text-justify h-[30px]`}
                      >
                        {item?.title.length > 33
                          ? item?.title.slice(0, 33) + "..."
                          : item.title}
                      </h5>
                      </div>
                      <div className={styles.companyMain}>
                        {item.vendor?.user?.displayImage ? (
                          <Image
                          src={item.vendor?.user?.displayImage
                            ? (assetURL + '/' + item.vendor?.user?.displayImage).includes('//admin')
                              ? (assetURL + '/' + item.vendor?.user?.displayImage).replace('//admin', '/admin')
                              : `${assetURL}/${item.vendor?.user?.displayImage}`
                            : '/images/product-placeholder.webp'}
                          alt="image"
                          className="h-[40px] w-[40px] rounded-full"
                          height={40}
                          width={40}
                          onError={e => {
                            e.currentTarget.src = '/images/product-placeholder.webp';
                          }}
                          loading="lazy"
                        />
                        
                        ) : (
                          <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#B906471A] text-[#B90647] text-xl rounded-full uppercase">
                            {item?.vendor?.companyName.split(" ").length > 1
                              ? item?.vendor?.companyName
                                  .split(" ")
                                  .map((word:any) => word[0])
                                  .slice(0, 2)
                                  .join("")
                              : item?.vendor?.companyName.slice(0, 2)}{" "}
                          </div>
                        )}
                        <p className={styles.companyTitle}>
                          {item?.vendor?.companyName}
                        </p>
                      </div>
                      <div className={styles.locationMain}>
                        <PiMapPinLineLight />
                        <p className={styles.locationTitle}>{item.state}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <LottieWrapper
  animationData={animationData}
  loop={true}
  className="flex mx-auto justify-center items-center w-[400px] h-[400px]"
/>

            <p className="text-center text-fontGray mt-4 text-lg font-bold">
              No Projects Found.
            </p>
          </>
        )}

        {totalPage > 12 && !loading && (
          <Pagination
            totalItems={totalPage}
            itemsPerPage={12}
            currentPage={page}
            onPageChange={handleChange}
          />
        )}
      </div>
    </>
  );
};

export default PortfolioCard;
