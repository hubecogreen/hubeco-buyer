"use client"
import styles from "./BlogsSection.module.css";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation"; // Use 'next/router' for client-side routing
import Pagination from "@/components/pagination/Pagination";
import * as Webservices from "../../../network/WebServices";
import * as getEndpoint from "../../../network/EndPoints";
import dayjs from "dayjs";
import animationData from '../../../../public/animations/nodatafound.json'
import Image from "next/image";
import LottieWrapper from "@/components/LottieWrapper";
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

const BlogsSection = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL

  useEffect(() => {
    getData();
  }, [searchTerm]);

 



  const getData = (page = 1) => {

    const url = `${getEndpoint.default.BLOGS}?searchTerm=${searchTerm}&limit=12&page=${page}`;
    Webservices.callGetApi(url, '')
      .then(
        (response: {
          data: { data: Blog[]; nextCursor: string | null; totalCount: number; metadata: { totalCount: number; currentPage: number,totalPages: number } };
        }) => {
          if (response.data && Array.isArray(response.data.data)) {
            setBlogData(response.data.data);

            setTotalPage(response?.data?.metadata?.totalPages);
            setPage(response?.data?.metadata?.currentPage);
          } else {
            // consoleerror("Unexpected response format: ", response);
          }
        }
      )
      .catch((err) => {
        // consoleerror("API call failed: ", err);
      });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

 // // console.log('totalPage',totalPage)

  const handleChange = (newPage: number) => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if(newPage ==page){
     // // console.log("same page")
      return 
    }
    getData(newPage);
  };

  const handleBlogClick = (slug: string) => {
   // // console.log('wferty',slug)
    router.push(`/blogs/${encodeURIComponent(slug)}`);
  };

  function truncateDescription(description:any, maxLength:any) {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + '...';
  }

  return (
    <div className="px-4 md:px-16 mt-8 md:mt-10">
      <div className="flex justify-between mb-6 md:mb-6">
        <h2 className="text-black font-bold text-2xl md:text-3xl">Blogs</h2>
          <div className="flex w-[75%] md:w-96 h-8 md:h-12">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="
                border border-gray-300 
                rounded-l-[5px] 
                p-2 
                w-full 
                max-w-[400px] 
                h-full 
                text-sm md:text-base
              "
            />
            <div className="
                bg-pink 
                p-2 
                h-full 
                flex 
                items-center 
                justify-center 
                rounded-r-[5px]
              "
            >
              <IoIosSearch
                className="text-white md:w-[25px] md:h-[20px] w-[15px] h-auto"
              />
            </div>
          </div>

      </div>
      {blogData.length > 0 ? (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-4 lg:gap-x-8 sm:gap-y-6 lg:gap-y-12 mb-8 lg:mb-8">
        
         { blogData.map((item:any) => 
            { 
              const wordCount = item.content.split(/\s+/).length;
              const readingTimeMinutes = Math.ceil(wordCount / 150);
              //// // console.log('fewrgthy',encodeURIComponent(item?.slug))
              
              return <div
              className={`${styles.gridItem} cursor-pointer`}
              key={item._id}
              onClick={() => handleBlogClick(item?.slug)}
            >
              <div className={styles.itemCard}>
              <Image
                    className={`${styles.itemImage} w-[400px] h-[300px] cursor-pointer`}
                    src={`${assetURL}${item.thumbnail.includes('/admin/') ? item.thumbnail : item.thumbnail.replace('admin/', '/admin/')}`}
                    alt="image"
                    width={400}
                    height={300}
                    onError={(e) => {
                      e.currentTarget.src = "/images/failedToLoadImage.webp";
                    }}
                    loading="lazy"
                  />

                <div className={styles.itemTimings}>
                  <div className="flex items-center justify-start">
                  <p className={styles.nameText}>
                      By{" "}
                      <span className={styles.nameTextColor}>
                        {/* {item.author.firstName} {item.author.lastName} */}
                        hubeco team
                      </span>
                    </p>
                  <p className={`${styles.timeText} ml-2`} >| {'  '}{readingTimeMinutes} mins reads</p>
                  </div>
                  <p className={styles.timeText}>
                    {dayjs(item.updatedAt).format("MMM DD YYYY")}
                  </p>
                </div>
                <div className={styles.itemContent}>
                  <h5 className={`${styles.itemTitle} cursor-pointer text-justify h-[45px]`} >{truncateDescription(item.title,80)}</h5>
                  <div className={styles.name}>
                    {/* <p className={styles.nameText}>
                      By{" "}
                      <span className={styles.nameTextColor}>
                        {item.author.firstName} {item.author.lastName}
                      </span>
                    </p> */}
                  </div>
                  <p className={'text-sm text-fontGray mt-3'}>{truncateDescription(item.description,250)}</p>
                </div>
              </div>
            </div>
          })
            
        }</div>
        ) : (
          <>
          <LottieWrapper
              animationData={animationData}
              loop={true}
              className="flex mx-auto justify-center items-center w-[400px] h-[400px]"
            />

          <p className="text-center text-fontGray mt-4 text-lg font-bold ">No Blogs Found.</p>
          </>
        )}
    
      {totalPage > 1 && (
        <Pagination
          totalItems={totalPage}
          itemsPerPage={12}
          currentPage={page}
          onPageChange={handleChange}
        />
      )}
    </div>
  );
};

export default BlogsSection;
