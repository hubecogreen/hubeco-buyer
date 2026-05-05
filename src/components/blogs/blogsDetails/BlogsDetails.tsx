"use client"

import React, { CSSProperties, useEffect, useRef, useState } from "react";
import JoinBannerDetails from "../joinBannerDetails/JoinBannerDetails";
import styles from "./BlogsDetails.module.css";
// import { BiLogoLinkedin } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import * as Webservices from "../../../network/WebServices";
import * as getEndpoint from "../../../network/EndPoints";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import { getCookie } from "cookies-next";
// import { FaLinkedinIn } from "react-icons/fa6";
import animationData from '../../../../public/animations/nodatafound.json'
import { CircularProgress, Spinner, Stack } from "@chakra-ui/react";
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
}

const BlogsDetails = ({ id }: any) => {
  const swiperRef = useRef(null);
  const [blogData, setBlogData] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL

  useEffect(() => {
    const token = getCookie("token") as string;
    // // console.log('cwevrt',decodeURIComponent(id), id)

    const fetchBlogData = async () => {
      // const id = searchParams.get("id");
      setLoading(true);
      if (id) {
        // // console.log(id)

        try {
          const response = await Webservices.callGetApi(
            `${getEndpoint.default.GETBLOGS}/${encodeURIComponent(id)}`,
            token
          );
          if (response.data) {
            setBlogData(response.data);
          } else {
            // consoleerror("Unexpected response format:", response);
          }
        } catch (err) {
          // consoleerror("API call failed:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    const fetchRelatedBlogs = async () => {
      try {
        const response = await Webservices.callGetApi(
          `${getEndpoint.default.BLOGS}?limit=20`,
          token
        );
        if (response.data && Array.isArray(response.data.data)) {
          const shuffledRelatedBlogs = shuffleArray(response.data.data).splice(0, 6);
          setRelatedBlogs(shuffledRelatedBlogs);
        } else {
          // consoleerror("Unexpected response format:", response);
        }
      } catch (err) {
        // consoleerror("API call failed:", err);
      }
    };

    fetchBlogData();
    fetchRelatedBlogs();
  }, [searchParams]);

  // if (loading) return <p>BLOG NOT FOUND</p>;

  const createdDate = dayjs(blogData?.updatedAt).format("MMM DD YYYY");

  // console.log(relatedBlogs,"relatedBlogs")


  const handleBlogClick = (slug: string) => {
    router.push(`/blogs/${slug}`);
  };


  return (
    <>
      {
        loading ? <div className="flex inset-0 justify-center items-center h-full w-full">
          {/* <Stack direction='row' spacing={4}>
              <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='#A92449'
              size='xl'
            className="w-[30px]"  /> </Stack> */}
          <CircularProgress isIndeterminate color='#A92449' />
        </div> :

          <div className="px-4 md:px-28 mt-8 md:mt-10">
            {blogData ? (
              <>
                <h1 className="text-brown  text-lg md:text-3xl font-bold">
                  {blogData?.title}
                </h1>
                <div className="py-8 md:pt-10 md:pb-2">
                  <div className="block md:flex md:justify-between mb-6 md:mb-6">
                    <div className="block md:flex">
                      {/* <p className="text-sm mr-3 md:mr-3 ">By</p> */}
                      <div className="flex md:flex ">
                        <div className="mr-3 md:mr-3 ">
                          <p className="text-brown md:text-md text-xs mt-1 md:mt-1">Published On : {createdDate}</p>

                          <p className="text-brown md:text-md text-xs mt-1 md:mt-1 justify-center items-center flex whitespace-nowrap" > Published By :<h1 className=" px-2 font-semibold text-brown text-sm md:text-sm">
                            hubeco team
                          </h1></p>
                          {/* <p className="text-brown text-xs mt-1 md:mt-1">
                    Founder & CEO
                  </p> */}
                        </div>
                        {/* <div className=" h-fit align-middle bg-secondary hover:cursor-pointer hover:bg-primary  ml-4 p-1.5 rounded">
                  <FaLinkedinIn
                    className="text-white  font-semibold"
                    size={20}
                  />
                </div> */}
                      </div>
                    </div>
                    <div>
                      {/* <p className="text-brown md:text-md text-xs mt-1 md:mt-1">Published On : {createdDate}</p> */}
                    </div>
                  </div>
                  <Image
                    src={`${assetURL}${blogData.thumbnail.includes('/admin/') ? blogData.thumbnail : blogData.thumbnail.replace('admin/', '/admin/')}`}
                    alt="blog"
                    width={339.33}
                    height={300}
                    className={`${styles.image} object-cover max-h-[450px] rounded`}
                    onError={(e) => {
                      e.currentTarget.src = "/images/failedToLoadImage.webp";
                    }}
                    loading="lazy"
                  />
                </div>
                <div>

                  <div>
                    <div className={`${styles.contentWrapper} prose prose-lg [&_ul]:list-disc [&_ul]:pb-2 text-left md:text-justify text-sm lg:text-sm xl:text-sm w-full lg:pt-10 pt-5 prose prose-lg xl:prose-xl hover:prose-a:text-brand`}
                      // dangerouslySetInnerHTML={{ __html: blogData.content }}
                      dangerouslySetInnerHTML={{
                        __html: blogData.content
                          // Replace all empty tags like <p></p>, <h1></h1>, etc. with <br/>
                          .replace(/<([a-z][a-z0-9]*)><\/\1>/gi, '<br/>')
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <LottieWrapper
                  animationData={animationData}
                  loop={true}
                  className="flex mx-auto justify-center items-center w-[90%] md:w-[400px] md:h-[400px]"
                />

                <p className="flex mx-auto justify-center items-center text-brown text-xs md:text-lg mt-1 md:mt-1">No Blog Found.</p>
              </>
            )}

            <div className="p-4 md:px-0 md:p-8">
              <JoinBannerDetails />
            </div>
            {relatedBlogs.length > 2 && <div className="py-6 md:pt-8 md:pt-4">
              <h2 className={styles.blogsText}>Latest Blogs</h2>
            </div>}

            <div className="md:w-full">
              <Swiper
                ref={swiperRef}
                spaceBetween={15}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                  },
                }}
                modules={[Autoplay]}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="swiper-container w-full"
              >
                {relatedBlogs && relatedBlogs?.map((item: any, index: any) => {
                  if (item.slug == id) return
                  return (
                    <SwiperSlide
                      key={index}
                      className="w-full mr-[15px]"
                    >

                      <div className="w-full">
                        <Image
                          src={`${assetURL}${item?.thumbnail}`}
                          alt={`Thumbnail for ${item?.title}`}
                          width={339.33}
                          height={300}
                          onClick={() => handleBlogClick(item.slug)}
                          onError={(e) => {
                            e.currentTarget.src = "/images/failedToLoadImage.webp";
                          }}
                          loading="lazy"
                          className="rounded-[5px] h-[300px] w-[400px] cursor-pointer"
                        />

                        <div className="w-full text-brown">
                          <div className={styles.itemTimings}>
                            <p className={styles.timeText}>13 mins read</p>
                            <p className={styles.timeText}>
                              {dayjs(item.createdAt).format("MMM DD YYYY")}
                            </p>
                          </div>

                          <div
                            className={`${styles.itemContent} cursor-pointer`}
                            onClick={() => handleBlogClick(item.slug)}
                          >
                            <h5 className={styles.itemTitle}>{item.title}</h5>
                            <div className={styles.name}>
                              <p className={styles.nameText}>
                                By <span className={styles.nameTextColor}>hubeco team</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
      }
    </>
  );
};

export default BlogsDetails;
