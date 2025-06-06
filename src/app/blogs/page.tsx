"use client";
import BlogsSection from "@/components/blogs/blogSection/BlogsSection";
import JoinSection from "@/components/blogs/joinus/JoinSection";

import Head from "next/head";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

export default function Blogs() {
  return (
    <div className="bg-white">
      <Head>
        <title>Blogs | Hubeco Buyer</title>
      </Head>
      
      <div
        className="relative bg-cover bg-center h-[200px] flex items-center justify-start text-white md:px-28 px-10"
        style={{
          backgroundImage: 'url("images/about/aboutBanner1.png")'
        }}
      >
        <Link
          href="/"
          className="text-white flex items-center no-underline px-2 py-1 rounded"
        >
          <AiFillHome size={16} className="text-white mr-1.5" />
          Home
        </Link>
        <span className="text-white mx-2">/</span>
        <Link
          href="/blogs"
          className="text-white no-underline px-2.5 py-1 rounded"
        >
          Blogs
        </Link>
      </div>
      
      <div className="category-section mx-auto pb-10 md:px-16 px-2">
        <BlogsSection />
      </div>

      <div className="blogs-section mx-auto">
        <JoinSection />
      </div>
    </div>
  );
}