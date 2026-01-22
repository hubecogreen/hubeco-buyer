"use client";
// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { Button } from "../ui/button";
import * as Webservices from "../../network/WebServices";
import * as getEndpoint from "../../network/EndPoints";
import animationData from "../../../public/animations/nodatafound.json";
// import { CircularProgress } from "@chakra-ui/react";
import Pagination from "../pagination/Pagination";
import Meta from "../sharedComponents/Meta";
// import {useRouter} from 'next/navigation'
// import { Skeleton } from "../ui/skeleton";
import ProductCard from "../productCard/ProductCard";
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
  discountedPrice:any
}

// const ProductCard = ({
//   product,
// }: {
//   product: {
//     image: string;
//     productName: string | null; // Adjusted to handle potential null
//     discount: number;
//     description: string;
//     price: number | null;
//     mrp: number; // Assuming `mrp` is the original price
//     action: string;
//     discountedPrice: number;
//     slug: string;
//     platformPrice:any
//   };
// }) => {
//   // If product name is missing, don't render the card
//   if (!product.productName) {
//     return null;
//   }

//   function calculateDiscountPercentage(
//     mrp: number,
//     discountedPrice: number
//   ): number {
//     if (mrp <= 0 || discountedPrice < 0 || discountedPrice > mrp) {
//       return 0; // Ensure valid values (no negative prices or discountedPrice greater than MRP)
//     }

//     const discount = ((mrp - discountedPrice) / mrp) * 100;
//    // // console.log('testing',mrp,discountedPrice)
//     return Math.round(discount); // Round to nearest integer
//   }

//   const router=useRouter()

// //   const discount = product.mrp - product.discountedPrice;
// // const discountPercentage = (discount / product.mrp) * 100;

//   // // console.log("testt", discountPercentage);
//   // // // console.log("testt", discountedPrice);
//   // // console.log("testt", product.mrp);

//   function ProductCardSkeleton() {
//     return (
//       <div className="w-full grid grid-cols-3 gap-2">
//       {Array.from({ length: 3 }).map((_, index) => (
//         <div
//           key={index}
//           className="border w-full  rounded border-slate-300 shadow-sm justify-start text-left p-5 mb-5"
//         >
//           <div className="w-full">
//             <Skeleton className="h-6 w-full mb-2" />
//             <Skeleton className="h-[314px] w-full mb-2" />
      
       
//           </div>
//           <div className="flex justify-between self-end mt-4 space-x-4">
//             <Skeleton className="h-8 w-32" />
//             <Skeleton className="h-8 w-32" />
//           </div>
//         </div>
//       ))}
//     </div>
    
//     );
//   }

// const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

//   //// // console.log("testt", discountPercentage);
//   // //// // console.log("testt", discountedPrice);
//   //// // console.log("testt", product.mrp);
//   return (
//     <div className="bg-white border border-[#BBBBBB] rounded-sm overflow-hidden shadow-sm hover:bg-[#E8E8E8] hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => {router.push(`/${product?.slug}`)}}>
//       <div className="relative">
//         <Image
//           // src={`https://assets.hubeco.market/${product.image}`}
//           src={product.image ?  (assetURL+'/'+product.image).includes('//admin') ? (assetURL+'/'+product.image).replace('//admin', '/admin') : `${assetURL}/${product.image}` : '/images/product-placeholder.webp'}

//           alt={product.productName}
//           className="w-full h-[314px] object-cover px-4 pt-10"
//           height={100}
//           width={100}
//           quality={100}
//         />
        
//         {/* <div className="absolute top-2 left-4 bg-white text-[#388E3C] text-xs font-bold px-2 py-1 shadow-xl">
//           {Number.isInteger(discountPercentage)
//             ? discountPercentage
//             : discountPercentage.toFixed(2)}
//           % off
//         </div> */}
//         {calculateDiscountPercentage(product.mrp, product.discountedPrice) && calculateDiscountPercentage(product.mrp, product.discountedPrice) > 0 ? (
//             <div className="absolute top-2 left-4 bg-white text-[#388E3C] text-xs font-bold px-2 py-1 shadow-xl">
//               {calculateDiscountPercentage(
//                 product.mrp,
//                 product.discountedPrice
//               )}
//               % off
//             </div>
//           ) : null}
//       </div>
//       <div className="p-4">
//         {/* <h3 className="text-lg font-semibold text-[#01B6A3] mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
//           {product?.productName}
//         </h3> */}
//          <h3
//             onClick={() => router.push(`/${product?.slug}`)}
//             className="text-[17px] font-medium text-[#01B6A3] mb-1 h-[70px] flex items-center"
//           >
//             {product?.productName.length > 30
//               ? product?.productName.slice(0, 30) + "..."
//               : product.productName}
//           </h3>
//         <div className="flex items-center justify-between space-x-3">
//           <Button className="w-[70%] bg-[#BCBCBC] text-white py-2 px-4 rounded hover:bg-[#B90647] transition duration-300 flex items-center justify-center gap-2">
//             Add to Cart
//             <ArrowRight size={16} />
//           </Button>
//           <div className="flex justify-between items-center">
//             {product.price !== null ? (
//               <div className="flex items-center flex-row">
//                 <span className="text-lg text-[#01B6A3] font-bold">
//                   {/* ₹{discountedPrice.toFixed(2)} Show discounted price */}
//                   <span className="text-xl text-[#01B6A3] mr-1" style={{fontWeight:'400',fontFamily:'monospace'}}> ₹</span>{product?.platformPrice}
//                 </span>
//                 {/* <span className="text-sm font-bold line-through ml-2">
//                   ₹{product?.mrp} 
//                 </span> */}
//               </div>
//             ) : (
//               <div className="text-sm font-bold">Price on request</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const ProductGrid = (id: any, search:any) => {

  const searchTerm= id.searchTerm
 // // console.log("searchTerm in products", searchTerm);
  const slug = id.id;
 // // console.log("check id slug", slug);
  const [projectData, setProjectData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const getData = (page = 1) => {
    setLoading(true)
    const url = `${
      getEndpoint.default.PRODUCTSLIST + "?vendorIdOrSlug=" + slug
    }&searchTerm=${searchTerm}&limit=12&page=${page}`;
    Webservices.callGetApi(url, "")
      .then(
        (response: {
          data: {
            nextCursor: string | null;
            totalCount: number;
            metadata: { totalCount: number; currentPage: number };
            data:any
          };
        }) => {
          if (response.data && Array.isArray(response?.data?.data)) {
           // // console.log("data projects", response?.data);
            setProjectData(response?.data?.data);
            setTotalPage(response.data.metadata.totalCount);
            setPage(response.data.metadata.currentPage);
            setLoading(false)
          } else {
            // consoleerror("Unexpected response format: ", response);
            setLoading(false)
          }
        }
      )
      .catch((err: any) => {
        // consoleerror("API call failed: ", err.response.data.message);
        // if(err.response.data.message==='Vendor with given slug, does not exits'){
        //   setNotFound
        // }
        setLoading(false)
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


  // if(loading){
  //   return(
  //     <div className="w-full h-full flex justify-center items-center mt-4">
  //         <CustomLoader />
  //     </div>
  //   )
  // }

  return (
    // <div className="container mx-auto px-4">
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
    //     {projectData.map((product) => (
    //       <ProductCard key={product.id} product={product} />
    //     ))}
    //   </div>
    // </div>
    <div className="">
      {/* {loading && (
        <div className="w-full h-full flex justify-center items-center mt-4">
          <CustomLoader />
        </div>
      )} */}
      
      {projectData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
          {projectData.map((product:any) => (
            <>
            <ProductCard key={product._id} product={product} />
            <Meta title="Products" subtitle="Products" description="" />
            </>
          ))}
        </div>
      ) : (
        <>
           {!loading && (
          <>
            <LottieWrapper
                  animationData={animationData}
                  loop={true}
                  className="flex justify-center items-center mx-auto w-[200px] h-[200px]"
                />

            <p className="text-center text-brown mt-4 text-lg font-bold ">
              No Products found.
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

export default ProductGrid;
