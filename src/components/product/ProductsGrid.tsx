// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
// import * as getEndpoint from "../../network/EndPoints";
// import useRefreshToken from "../hooks/useRefreshToken";
// import { toast } from "react-hot-toast";
// import useApi from "../Fetcher/useAPI";
import ProductCard from "./Card";

interface ProductProps {
  productsData: any;
  totalPage: number;
  handleChangePage: (page: number) => void;
  page: number;
}


const ProductGrid:React.FC<ProductProps> = ({productsData, totalPage, handleChangePage,page}) => {




  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsData.map((product: any) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      {totalPage > 12 && (
      <div className="flex justify-end mb-4 items-center border-t border-t-borderGray mt-8">
       
          <Pagination
            totalItems={totalPage}
            itemsPerPage={30}
            currentPage={page}
            onPageChange={handleChangePage}
          />
      
      </div>
        )}
    </div>
  );
};

export default ProductGrid;
