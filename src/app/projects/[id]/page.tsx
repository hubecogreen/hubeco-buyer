
import ProjectDetails from "@/components/projects/ProjectDetails";
import type { Metadata } from "next";
import EndPoints from "@/network/EndPoints";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const res = await fetch(
      `${baseURL}/${EndPoints.GETPROJECTS}/${encodeURIComponent(params.id)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return {};
    const projectData = await res.json();
    if (!projectData) return {};
    return {
      title: projectData.title,
      description: projectData.meta?.metaDescription,
      keywords: projectData.meta?.metaKeywords,
      alternates: {
        canonical: `https://hubeco.market/projects/${projectData.slug}`,
      },
      openGraph: {
        title: projectData.title,
        description: projectData.meta?.metaDescription,
        url: `https://hubeco.market/projects/${projectData.slug}`,
        images: projectData.meta?.metaImage ? [{ url: projectData.meta.metaImage, alt: projectData.title }] : undefined,
        siteName: "Hubeco",
      },
    };
  } catch (error) {
    return {};
  }
}

function Page({ params }: { params: { id: string } }) {
  return (
    <div className="bg-white">
      <div className="category-section mx-auto pb-10">
        <ProjectDetails id={params.id} />
      </div>
    </div>
  );
}

export default Page;
