import BlogsDetails from "@/components/blogs/blogsDetails/BlogsDetails";
import type { Metadata } from "next";
import EndPoints from "@/network/EndPoints";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const res = await fetch(
      `${baseURL}/${EndPoints.GETBLOGS}/${encodeURIComponent(params.id)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return {};
    const blogData = await res.json();
    if (!blogData) return {};
    return {
      title: blogData.metaTitle,
      description: blogData.metaDescriptions,
      // keywords: blogData.metaKeywords,
      authors: blogData.author?.firstName ? [{ name: blogData.author.firstName }] : undefined,
      alternates: {
        canonical: `https://hubeco.market/blogs/${blogData.slug}`,
      },
      openGraph: {
        title: blogData.title,
        description: blogData.metaDescriptions,
        url: `https://hubeco.market/blogs/${blogData.slug}`,
        images: blogData.metaImage ? [{ url: blogData.metaImage, alt: blogData.title }] : undefined,
        siteName: "Hubeco",
      },
    };
  } catch (error) {
    return {};
  }
}

function Page({ params }: { params: { id: string } }) {
  return (
    <div className="bg-cream pt-5">
      <div className="category-section mx-auto pb-10">
        <BlogsDetails id={params.id} />
      </div>
    </div>
  );
}

export default Page;