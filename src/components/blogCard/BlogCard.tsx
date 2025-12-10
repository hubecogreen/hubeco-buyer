"use client";
import React, { useState } from "react";
import styles from "./BlogCard.module.css";
import Image from "next/image";

interface blogCardProps {
  index?: number;
  product: {
    _id: string;
    title: string;
    description: string;
    metaKeywords: string;
    metaDescriptions: string;
    content: string;
    thumbnail: string;
    status: string;
    isActive: boolean;
    author: any;
    createdAt: string;
    updatedAt: string;
    slug: string;
  };
}

const BlogCard: React.FC<blogCardProps> = ({ product, index = 0 }) => {
  const [hover, setHover] = useState(false);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  return (
    <div
      className="blog-card cursor-pointer w-[350px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => (window.location.href = `/blogs/${product.slug}`)}
    >
      <div className=" overflow-hidden ">

        {/* IMAGE fixed to 350×470 */}
        <Image
          src={`${assetURL}${product.thumbnail.includes('/admin/') ? product.thumbnail : product.thumbnail.replace('admin/', '/admin/')}`}
          alt={product.title}
          width={350}
          height={470}
          className={`w-[350px] h-[470px] object-cover transition duration-300 rounded-2xl ${hover ? 'grayscale-0' : 'grayscale'}`}
        />

        {/* Category + Date */}
        <div className="flex gap-3  mt-1 text-[12px]">
          {/* <span className="px-2 py-1 bg-[#e6f5f2] text-[#009886] rounded-full">Technology</span> */}
          <span className="text-gray-500">
            {new Date(product.createdAt).toDateString()}
          </span>
        </div>

        {/* Title */}
        <h3 className="py-4 text-[24px] font-semibold text-black leading-6 overflow-hidden line-clamp-2">
          {product.title}
        </h3>
      </div>
    </div>
  );
};

export default BlogCard;
