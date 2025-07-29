"use client";
import React, { useState } from "react";
import styles from "./BlogCard.module.css";
import Image from "next/image";

interface blogCardProps {
  imageStyle: React.CSSProperties;
  imageHoverStyle: React.CSSProperties;
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
  index = 0,
}) => {
  const [hover, setHover] = useState(false);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL

  return (
    <div
      className={"blog-card flex align-center justify-center h-full"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => window.location.href = `/blogs/${product.slug}`}
    >
      <div className={`${styles.productCard} flex flex-col h-full`}>
        <div className="hover:cursor-pointer flex-shrink-0">
          <Image
            src={`${assetURL}${product.thumbnail.includes('/admin/') ? product.thumbnail : product.thumbnail.replace('admin/', '/admin/')}`}
            alt={`${product.title} blog post`}
            width={500}
            height={350}
            priority={index < 3}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onError={e => {
              e.currentTarget.src = '/images/product-placeholder.webp';
            }}
            loading={index < 3 ? "eager" : "lazy"}
            className={`
              w-full 
              h-[250px]
              object-cover 
              filter 
              grayscale 
              transition 
              duration-300 
              ease-in-out 
              rounded-md 
              ${hover ? 'hover:filter-none' : ''}
            `}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col flex-grow justify-between p-4">
          <div className="flex-grow">
            <h3 className="hover:cursor-pointer text-white text-justify text-lg mb-4 line-clamp-2 font-semibold">
              {product && product.title}
            </h3>
            <p className="text-white text-sm font-light text-justify line-clamp-3">
              {product && product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
