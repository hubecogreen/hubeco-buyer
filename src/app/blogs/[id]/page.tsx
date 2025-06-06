"use client";
import BlogsDetails from "@/components/blogs/blogsDetails/BlogsDetails";
// import Footer from "@/components/footer/MainFooter";
// import Header from "@/components/header/MainHeader";
// import Head from "next/head";

function page({ params }: { params: { id: string } }) {
  return(
    <div className="bg-white pt-5">
      <div className="category-section mx-auto pb-10">
        <BlogsDetails id={params.id}/>
      </div>
    </div>
  ); 
}

export default page