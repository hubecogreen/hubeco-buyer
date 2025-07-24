"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ProjectDetails.module.css";
import {
  CircularProgress,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import CustomButton from "../customButton/CustomButton";
// import { AiFillHome } from "react-icons/ai";
// import Head from "next/head";
import BannerSection from "../sharedComponents/BannerSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
// import { IoCloseCircleSharp } from "react-icons/io5";
import Image from "next/image";
// import Link from "next/link";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import PreviewLink from "../PreviewLink";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "../../../public/animations/nodatafound.json";
import Custom404 from "@/app/[...not-found]/page";
import useClient from "../hooks/useClient";
// import Meta from "../sharedComponents/Meta";

interface Blog {
  _id: string;
  title: string;
  location: string;
  clientName: string;
  certificate: string;
  organization: string;
  logo: string;
  images: any;
  slug: string;
  vendor: string;
  keyFeatures: string;
  projectImpact: string;
  description: string;
  firstName: string;
  lastName: string;
  name: string;
}

interface ProjectDetailsProps {
  id: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ id }) => {
  //// // console.log('id',id)
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const swiperRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<any>(null);
  const router = useRouter();
  const [notFound, setNotFound] = useState(false);
  const isClient = useClient()

  const openDialogWithImage = (index: any) => {
    setSelectedImage(projectData.images[index]);
    setSwiperIndex(index);
  };

  const fetchProjectData = async () => {
    setLoading(true);
    if (id) {
      try {
        const response = await Webservices.callGetApi(
          `${getEndpoint.default.GETPROJECTS}/${id}`,
          ""
        );
        if (response.data) {
          setProjectData(response.data);
          // // console.log("Data getting", response.data);
        } else {
          // consoleerror("Unexpected response format:", response);
        }
      } catch (err: any) {
        // consoleerror("API call failed:", err);
        if (
          err?.response &&
          err?.response?.data.message &&
          err.response.data.message.includes("Project with ID")
        ) {
          // // console.log('err', err);
          setNotFound(true); // Set notFound state to true for the specific error
          return; // Exit the function
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchProjectData();
    }
  }, [id]);

  const handleClick = (image: string) => {
    setSelectedImage(image);
    // setSwiperIndex(index);
  };

  // const handleProductClick = (productSlug: any) => {
  //   if (productSlug) {
  //     router.push(`/${productSlug}`);
  //   }
  // };

  const handleProductClick = (productSlug: any) => {
    if (productSlug) {
      window.open(`/${productSlug}`, "_blank");
    }
  };

  if (notFound) {
    return <Custom404 />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if(!isClient)
    return <></>

  return (
    <div className="bg-white">
      <head>
        <title>{projectData?.title}</title>
        <meta name="description" content={projectData?.meta?.metaDescription} />
        <meta name="keywords" content={projectData?.meta?.metaKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "Projects", href: "/projects" }}
        link3={{
          name: `${projectData?.title}`,
          href: `/projects/${projectData?.slug}`,
        }}
      />

      <div className="px-4 md:px-28 mt-8 md:mt-10">
        <div className="py-8 md:pt-10 md:pb-2">
          <div className="block md:flex md:justify-between mb-2 md:mb-4">
            <div className="block md:flex">
              <h1 className="text-black  text-2xl md:text-2xl font-bold">
                {projectData?.title}
              </h1>
            </div>
            <div className="block md:flex gap-1">

              {projectData?.certificate?.greenCertificateNumber &&
                projectData?.certificate?.organization && (
                  <CustomButton
                    title={"Certified"}
                    className="text-white bg-primary hover:bg-secondary font-semibold h-12 w-full md:w-40 text-sm md:text-md"
                    customStyles={{
                      border: "1px solid #FFFFFF",
                      color: "#FFFFFF",
                      minWidth: "80px",
                    }}
                  />
                )}
            </div>
          </div>
        </div>
        <div className="py-8 md:pt-4 md:pb-3">
          <Image
            src={
              projectData?.thumbnail
                ? `${assetURL}/${projectData.thumbnail}` // Use thumbnail if available
                : projectData?.images?.length > 0 // Check if images array exists and has elements
                  ? `${assetURL}/${projectData.images[0]}` // Use first image if thumbnail is absent
                  : "/images/failedToLoadImage.webp"
            }
            alt="blog"
            className={`${styles.image}  rounded`}
            width={430}
            height={330}
            onError={(e) => {
              e.currentTarget.src = "/images/failedToLoadImage.webp"; // Error handler for failed image load
            }}
            loading="lazy"
          />
        </div>
        <div className="md:w-full sm:gap-y-6 md:gap-y-12 mb-8 md:mb-8 ">
          <Swiper
            ref={swiperRef}
            spaceBetween={15}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 2000 }}
            loop={true}
            className="swiper-container w-full"
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
          >
            {projectData?.images?.map(
              (item: any, index: React.Key | null | undefined) => (
                <SwiperSlide
                  key={index}
                  className="!w-full !mr-[15px]"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => openDialogWithImage(index)}
                  >
                    <Image
                      src={`${assetURL}/${item}`}
                      alt="Thumbnail"
                      className="rounded object-cover w-[430px] h-[300px]"
                      width={430}
                      height={300}
                      onError={(e) => {
                        e.currentTarget.src = "/images/failedToLoadImage.webp";
                      }}
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>

              )
            )}
            <div
              className="swiper-button-next bg-[#F4F4F4] p-8 rounded-full h-4 w-4"
              style={{ color: "#B90647", opacity: 0.5 }}
            ></div>
            <div
              className="swiper-button-prev bg-[#F4F4F4] p-8 rounded-full h-4 w-4"
              style={{ color: "#B90647", opacity: 0.5 }}
            ></div>
          </Swiper>
          <Dialog
            open={!!selectedImage}
            onOpenChange={() => {
              setSelectedImage(null);
              setSwiperIndex(0);
            }}
          >
            <DialogTrigger asChild>
              <button style={{ display: "none" }} />
            </DialogTrigger>
            <DialogContent className="w-fit fixed h-fit">
              <DialogClose />
              {/* <DialogClose className="absolute top-3 right-3 flex justify-end w-fit !focus:outline-none !focus:ring-none !focus:ring-offset-0">
                <IoCloseCircleSharp size={30} />
              </DialogClose> */}

              <div className="h-fit w-fit">
                {/* Swiper inside the dialog with the initialSlide set to swiperIndex */}
                <Swiper
                  spaceBetween={15}
                  slidesPerView={1}
                  initialSlide={swiperIndex}
                  loop={true}
                  className="swiper-container max-h-[300px] max-w-[500px] w-full"
                >

                  {projectData?.images?.map((item: any, index: any) => (
                    <SwiperSlide
                      key={index}
                      className="w-full mr-[1px]"
                    >

                      <div className="rounded overflow-hidden">
                        <Image
                          src={`${assetURL}/${item}`}
                          alt="Image"
                          className="!h-full !w-full object-cover"
                          width={700}
                          height={300}
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/failedToLoadImage.webp";
                          }}
                          loading="lazy"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-[#f4f4f4] rounded-lg shadow-md p-6 overflow-x-auto">
          <div className="flex  flex-col gap-4 text-[#000] ">
            <Tabs position="relative" variant="unstyled">
              <TabList className="flex justify-center space-x-4">
                <Tab
                  _selected={{
                    borderBottom: "2px solid #B90647",
                    color: "#0A080A",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                  className="py-2 px-4 transition-all text-[#0A080A] text-lg"
                >
                  Project Details
                </Tab>
                <Tab
                  _selected={{
                    borderBottom: "2px solid #B90647",
                    color: "#0A080A",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                  className="py-2 px-4 transition-all text-lg"
                >
                  Products Used
                </Tab>
                <Tab
                  _selected={{
                    borderBottom: "2px solid #B90647",
                    color: "#0A080A",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                  className="py-2 px-4 transition-all text-lg"
                >
                  Description
                </Tab>
                <Tab
                  _selected={{
                    borderBottom: "2px solid #B90647",
                    color: "#0A080A",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                  className="py-2 px-4 transition-all text-lg"
                >
                  Attachments
                </Tab>
                <Tab
                  _selected={{
                    borderBottom: "2px solid #B90647",
                    color: "#0A080A",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                  className="py-2 px-4 transition-all text-lg"
                >
                  Green Certificate
                </Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="#B90647"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel className="mt-10">
                  <div className="flex text-[#0A080A] leading-5 mb-4">
                    <strong className=" font-bold">Project ID: </strong>
                    <p className="ml-2 font-normal ">{projectData?.projectId}</p>
                  </div>
                  <div className="flex text-[#0A080A] leading-5 mb-4">
                    <strong className=" font-bold">Project Location: </strong>
                    <p className="ml-2 font-normal ">{projectData?.location}</p>
                  </div>
                  <div className="flex text-[#0A080A] leading-5 mb-4">
                    <strong className=" font-bold">Pincode: </strong>
                    <p className="ml-2 font-normal ">{projectData?.pincode}</p>
                  </div>
                  <div className="flex text-[#0A080A] leading-5 mb-4">
                    <strong className=" font-bold">State: </strong>
                    <p className="ml-2 font-normal ">{projectData?.state}</p>
                  </div>
                  <div className="flex text-[#0A080A] leading-5 mb-4">
                    <strong className=" font-bold">City: </strong>
                    <p className="ml-2 font-normal ">{projectData?.city}</p>
                  </div>
                  <div className="flex text-[#0A080A] leading-5 mb-4">
                    <strong className=" font-bold">Client Name: </strong>
                    <p className="ml-2 font-normal ">
                      {projectData?.clientName}
                    </p>
                  </div>
                  <div className="flex text-[#0A080A] leading-5 mb-4">
                    <strong className=" font-bold">Manufacture Name: </strong>
                    <p className="ml-2 font-normal">
                      {projectData?.vendor?.user?.firstName}{" "}
                      {projectData?.vendor?.user?.lastName}
                    </p>
                  </div>
                  <div className="flex text-[#0A080A] leading-5 mb-4">
                    <strong className=" font-bold">Company Name: </strong>
                    <p className="ml-2 font-normal ">
                      {projectData?.vendor?.companyName}
                    </p>
                  </div>
                  <div>
                    <div className=" flex text-[#0A080A] leading-5 mb-2">
                      {" "}
                      <strong>Key Features: </strong>
                    </div>
                    <div className="pb-2">
                      {" "}
                      <p className="font-normal ">
                        {projectData?.keyFeatures || "-"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className=" flex text-[#0A080A] leading-5 mb-2">
                      {" "}
                      <strong>Project Impact: </strong>
                    </div>
                    <div>
                      {" "}
                      <p className="font-normal ">
                        {projectData?.projectImpact || "-"}
                      </p>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="mt-10">
                  {projectData?.productUsed?.length ? ( // Check if there are products used
                    projectData.productUsed.map((item: any) => {
                      return (
                        <div key={item.slug}>
                          {" "}
                          {/* Added key for each mapped item */}
                          <div className="flex text-[#0A080A] leading-5 mb-4">
                            <strong className="font-bold">
                              Product Name:{" "}
                            </strong>
                            <p className="ml-2 font-normal">
                              {item.productDetails?.name}
                            </p>
                          </div>
                          <div className="flex text-[#0A080A] leading-5 mb-4">
                            <strong className="font-bold">
                              Product Details:{" "}
                            </strong>
                            <button
                              onClick={() => handleProductClick(item.slug)} // Trigger the navigation
                              className="cursor-pointer pl-2 font-bold bg-transparent border-none"
                              style={{ color: "#B90647" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "#019583")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "#B90647")
                              }
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    // Render this if there are no products used
                    <>
                      <Lottie
                        animationData={animationData}
                        loop={true}
                        className="flex justify-center items-center mx-auto w-[200px] h-[200px]"
                      />
                      <p className="text-center text-fontGray mt-4 text-lg font-bold ">
                        No Products Used.
                      </p>
                    </>
                  )}
                </TabPanel>
                <TabPanel>
                  <div>
                    {projectData?.description ? (
                      <p
                        className="pb-4 text-justify leading-[1.7]"
                        dangerouslySetInnerHTML={{
                          __html: projectData.description,
                        }}
                      />

                    ) : (
                      <>
                        <Lottie
                          animationData={animationData}
                          loop={true}
                          className="flex justify-center items-center mx-auto w-[200px] h-[200px]"
                        />

                        <p className="text-center text-fontGray mt-4 text-lg font-bold ">
                          No Description found.
                        </p>
                      </>
                    )}
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="flex flex-wrap justify-center">
                    {projectData?.attachments?.map((item: any) => {
                      return (
                        <div
                          key={item.key}
                          className="flex flex-col w-[175px] h-[200px] border-2 md:m-8 items-center md:p-2 md:px-3"
                        >
                          <div className="block md:flex items-center pt-7 pb-2">
                            <Image
                              src={`${assetURL}/${item.value}`}
                              alt="project"
                              className={`h-[75px] w-[100px] cover rounded pb-2`}
                              width={75}
                              height={75}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/images/projects/document.webp";
                                e.currentTarget.style.width = "75px"; // Set the width you want
                                e.currentTarget.style.height = "75px"; // Set the height you want
                              }}
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <p className="md:ml-2">
                              {item.key.includes("award")
                                ? "Award"
                                : item.key.includes("other")
                                  ? "Others"
                                  : item.key}
                            </p>
                          </div>

                          <div className="pt-2">
                            <PreviewLink url={`${assetURL}/${item.value}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabPanel>

                {projectData?.certificate?.organization?.authorityName ===
                  "Others" ? (
                  <TabPanel>
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex flex-col justify-between w-[175px] h-[200px] border-2 md:m-8 items-center md:p-2 md:px-3">
                        <div className="block md:flex items-center pt-7 pb-2">
                          <Image
                            src={`${assetURL}/${projectData?.certificate?.certificateImg}`}
                            alt="project"
                            className={`${styles.imageLogo} max-h-[100px] max-w-[100px] rounded`}
                            height={60}
                            width={75}

                            onError={(e) => {
                              e.currentTarget.src =
                                "/images/projects/document.webp";
                              e.currentTarget.style.width = "75px"; // Set the width you want
                              e.currentTarget.style.height = "60px"; // Set the height you want
                            }}
                            loading='lazy'
                          />
                        </div>
                        <div>
                          <p className="md:ml-2 pt-4">Green Certificate</p>
                        </div>
                        <div className="pt-2 pb-5">
                          <PreviewLink
                            url={`${assetURL}/${projectData?.certificate.certificateImg}`}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex text-[#0A080A] leading-5 mb-4">
                          <strong className=" font-bold">
                            Organization Name:{" "}
                          </strong>
                          <p className="ml-2 font-normal">
                            {
                              projectData?.certificate?.organization
                                ?.authorityName
                            }
                            {projectData?.certificate?.preferredTitle && (
                              <>
                                {" "}
                                -({projectData?.certificate?.preferredTitle})
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                ) : (
                  <TabPanel>
                    <div className="flex justify-center">
                      <div className="flex flex-col justify-between w-[175px] h-[200px] border-2 md:m-8 items-center md:p-2 md:px-3">
                        <div className="block md:flex items-center pt-7 pb-2">
                          <Image
                            src={`${assetURL}/${projectData?.certificate?.certificateImg}`}
                            alt="project"
                            className={`${styles.imageLogo} max-h-[100px] max-w-[100px] rounded`}
                            height={60}
                            width={75}

                            onError={(e) => {
                              e.currentTarget.src =
                                "/images/projects/document.webp";
                              e.currentTarget.style.width = "75px"; // Set the width you want
                              e.currentTarget.style.height = "60px"; // Set the height you want
                            }}
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <p className="md:ml-2 pt-4">Green Certificate</p>
                        </div>
                        <div className="pt-2 pb-5">
                          {projectData?.certificate.certificateImg && (
                            <PreviewLink
                              url={`${assetURL}/${projectData?.certificate.certificateImg}`}
                            />
                          )}
                        </div>
                      </div>
                      <div className="pt-20">
                        <div className="flex text-[#0A080A] leading-5 mb-4">
                          <strong className=" font-bold">
                            Organization Name:{" "}
                          </strong>
                          <p className="ml-2 font-normal">
                            {projectData?.certificate?.organization || "-"}
                          </p>
                        </div>
                        <div className="flex text-[#0A080A] leading-5 mb-4">
                          <strong className="font-bold">
                            Certificate Number:{" "}
                          </strong>
                          <p className="ml-2 font-normal">
                            {projectData?.certificate?.greenCertificateNumber ||
                              "-"}
                          </p>
                        </div>
                        <div className="flex text-[#0A080A] leading-5 mb-4">
                          <strong className="font-bold">
                            Certificate Validity:{" "}
                          </strong>
                          <p className="ml-2 font-normal">
                            {projectData?.certificate?.validity
                              ? new Date(projectData.certificate.validity)
                                .toLocaleDateString("en-GB") // Converts to 'dd/mm/yyyy' format
                                .replace(/\//g, "-") // Replaces '/' with '-'
                              : "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
