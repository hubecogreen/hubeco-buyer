"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BlogCard = ({ product }: any) => {
  const assetURL = (process.env.NEXT_PUBLIC_ASSET_URL || "").replace(/\/+$/, "");

  const thumbnailPath = (product.thumbnail || "").replace(/^\/+/, "");

  const thumbnailUrl = thumbnailPath
    ? `${assetURL}/${thumbnailPath}`
    : "/images/failedToLoadImage.webp";

  return (
    <motion.div
      className="cursor-pointer w-full"
      onClick={() => (window.location.href = `/blogs/${product.slug}`)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full aspect-[560/370]">
        <Image
          src={thumbnailUrl}
          alt={product.title}
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      <div className="mt-3 md:mt-4 lg:mt-5">
        <span className="text-brown text-[10px] sm:text-xs md:text-sm border px-2 py-1 rounded-full">
          {new Date(product.createdAt).toDateString()}
        </span>

        <h3 className="mt-2 md:mt-3 text-[18px] md:text-[24px] font-medium text-brown line-clamp-2">
          {product.title}
        </h3>
      </div>
    </motion.div>
  );
};

export default BlogCard;