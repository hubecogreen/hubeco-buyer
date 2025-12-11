"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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

const BlogCard: React.FC<blogCardProps> = ({ product }) => {
  const [hover, setHover] = useState(false);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  return (
    <motion.div
      className="blog-card cursor-pointer w-[350px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => (window.location.href = `/blogs/${product.slug}`)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="overflow-hidden">
        <Image
          src={`${assetURL}${
            product.thumbnail.includes("/admin/")
              ? product.thumbnail
              : product.thumbnail.replace("admin/", "/admin/")
          }`}
          alt={product.title}
          width={350}
          height={470}
          className={`w-[350px] h-[470px] object-cover transition duration-300 rounded-2xl ${
            hover ? "grayscale-10" : "grayscale-23"
          }`}
        />

        {/* Date */}
        <div className="flex gap-3 mt-2 text-[12px]">
          <span className="text-gray-500 border-2 border-gray-500 px-2 py-1 rounded-full">
            {new Date(product.createdAt).toDateString()}
          </span>
        </div>

        {/* Title */}
     <div className="block">
  <h3
    className="
      py-2 text-[24px] font-medium text-black leading-6
      overflow-hidden line-clamp-2 block break-words
    "
  >
    {product.title}
  </h3>
</div>



      </div>
    </motion.div>
  );
};

export default BlogCard;
