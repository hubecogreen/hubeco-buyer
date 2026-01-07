"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BlogCard = ({ product }: any) => {
  const [hover, setHover] = useState(false);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  return (
    <motion.div
      className="cursor-pointer w-full md:w-[350px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => (window.location.href = `/blogs/${product.slug}`)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={`${assetURL}${product.thumbnail.replace("admin/", "/admin/")}`}
        alt={product.title}
        width={350}
        height={256}
        
        className="w-full h-[300px] md:h-[256px] object-fill rounded-2xl"
      />

      <div className="mt-3">
        <span className="text-brown text-xs border px-2 py-1 rounded-full">
          {new Date(product.createdAt).toDateString()}
        </span>

        <h3 className="mt-2 text-[18px] md:text-[24px] font-medium text-brown line-clamp-2">
          {product.title}
        </h3>
      </div>
    </motion.div>
  );
};

export default BlogCard;
