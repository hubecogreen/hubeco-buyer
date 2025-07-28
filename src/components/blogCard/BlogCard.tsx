"use client";
import React, { useState } from "react";
import styles from "./BlogCard.module.css";
import Image from "next/image";
import { normalizePath, getSafeImageUrl } from "@/lib/utils";

interface blogCardProps {
  imageStyle: React.CSSProperties;
  imageHoverStyle: React.CSSProperties;
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
  };
}

const BlogCard: React.FC<blogCardProps> = ({
  product,
  imageHoverStyle,
  imageStyle,
}) => {
  const [hover, setHover] = useState(false);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL || '';

  // Fix the thumbnail URL construction
  const getImageUrl = (thumbnail: string) => {
    if (!thumbnail) return '/images/product-placeholder.webp';
    
    // Use normalizePath to handle the URL properly
    return normalizePath(`${assetURL}/${thumbnail}`);
  };

  return (
    <div
      className={"blog-card flex align-center justify-center "}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => window.location.href = `/blogs/${product.slug}`}
    >
      <div className={styles.productCard}>
        {/* <div className={styles.discountBadge}>{product.metaKeywords.split(",")[0].split(" ")[0]}</div> */}
        <div className="hover:cursor-pointer">
          <Image
            {...getSafeImageUrl(product.thumbnail, assetURL)}
            alt={product.title}
            width={390}
            height={250}
            onError={e => {
              e.currentTarget.src = '/images/product-placeholder.webp';
            }}
            loading="lazy"
            className={`
              w-[390px] 
              h-[250px] 
              object-cover 
              filter 
              grayscale 
              transition 
              duration-300 
              ease-in-out 
              rounded-md 
              max-h-[300px]
              ${hover ? 'hover:filter-none' : ''}
            `}
          />
        </div>

        <h3 className="hover:cursor-pointer text-white text-justify text-lg mt-5 mb-4 line-clamp-2">
          {product && product.title}
        </h3>
        <p className="text-white text-sm font-light text-justify mb-5 ">
          {product && product.description}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
