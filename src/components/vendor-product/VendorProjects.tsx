"use client";
import React, { useEffect, useState } from "react";
import { Building } from "lucide-react";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import Lottie from "lottie-react";
import animationData from "../../../public/animations/nodatafound.json";
import Pagination from "../pagination/Pagination";
import Meta from "../sharedComponents/Meta";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

const BuildingCard = ({
  project,
}: {
  project: {
    certificate: any;
    image: string;
    title: string;
    company: string;
    location: string;
    slug: string;
    thumbnail: any;
    images:any;
    vendor:any;
    state:any;
  };
}) => {
  const router = useRouter();
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;
  const handleBlogClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  return (
    <div
      className="bg-white border border-[#BBBBBB] rounded-sm overflow-hidden shadow-sm hover:bg-[#E8E8E8] hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => handleBlogClick(project.slug)} // Call the function here
    >
      <Image
        src={`${assetURL}/${
          project.thumbnail ? project.thumbnail : project?.images[0]
        }`}
        alt={project.title}
        className="w-full h-48 object-cover"
        width={380}
        height={360}
        onError={e => {
          e.currentTarget.src = '/images/product-placeholder.jpg'
        }}
        loading="lazy"
      />
      <div className="p-4">
      {project?.certificate?.greenCertificateNumber && project?.certificate?.organization && (
        <div className="text-xs font-semibold text-teal-500 mb-2">
          Certified Green building
        </div>
      )}
        <h3 className="text-lg font-semibold mb-2">{project?.title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Building size={16} className="mr-1" />
          <span>{project?.vendor?.companyName}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{project.state}</span>
        </div>
      </div>
    </div>
  );
};

const VendorProjects = (id: any, search: any) => {
 // // console.log("search term in projects", id);
  const searchTerm = id.searchTerm;
  const slug = id.id;
  const [projectData, setProjectData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const getData = (page = 1) => {
    setLoading(true);
    const url = `${
      getEndpoint.default.SLUG_PROJECT + "/" + slug
    }?searchTerm=${searchTerm}&limit=12&page=${page}`;
    Webservices.callGetApi(url, "")
      .then(
        (response: {
          data: {
            nextCursor: string | null;
            totalCount: number;
            metadata: { totalCount: number; currentPage: number };
            data: Blog[];
          };
        }) => {
          if (response.data && Array.isArray(response.data.data)) {
            setProjectData(response.data.data);
            setLoading(false);
            setTotalPage(response.data.metadata.totalCount);
            setPage(response.data.metadata.currentPage);
          } else {
            // consoleerror("Unexpected response format: ", response);
            setLoading(false);
          }
        }
      )
      .catch((err: any) => {
        // consoleerror("API call failed: ", err);
        setLoading(false);
      });
  };

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

  useEffect(() => {
    getData();
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4">
      {projectData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectData.map((project:any) => (
            <>
              <BuildingCard key={project._id} project={project} />
              <Meta title="Projects" subtitle="Projects" description="" />
            </>
          ))}
        </div>
      ) : (
        <>
          {!loading && (
            <>
              <Lottie
                  animationData={animationData}
                  loop={true}
                  className="mx-auto w-[200px] h-[200px]"
                />

              <p className="text-center text-fontGray mt-4 text-lg font-bold ">
                No Projects found.
              </p>
            </>
          )}
        </>
      )}
      {totalPage > 12 && (
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

export default VendorProjects;
