import BannerSection from "@/components/sharedComponents/BannerSection";
import ProductsList from "@/components/product/ProductsList";
import MetaTitleH1 from "./MetaTitleH1";

export async function generateMetadata({ params, searchParams }: {
  params: { slugs?: string[] },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const ccid = searchParams.ccid;
  const scid = searchParams.scid;
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const siteURL = process.env.NEXT_PUBLIC_PROD_URL;
  let metaData: any = {};

  try {
    let canonicalPath = `${siteURL}/products`;
    if (params.slugs && params.slugs.length > 0) {
      canonicalPath += '/' + params.slugs.join('/');
    }
    let query = '';
    if (scid && typeof scid === 'string') {
      query = `?scid=${encodeURIComponent(scid)}`;
    } else if (ccid && typeof ccid === 'string') {
      query = `?ccid=${encodeURIComponent(ccid)}`;
    }
    const canonicalUrl = canonicalPath + query;

    if (scid && typeof scid === 'string') {
      const res = await fetch(`${baseURL}/subcategories/getSubcategoryByIdPublic/${scid}`);
      if (res.ok) {
        const data = await res.json();
        metaData = {
          title: data?.metaTitle ? `${data.metaTitle} | Hubeco` : 'Products | Hubeco',
          description: data?.metaDescription || 'Marketplace for green building materials. India\'s biggest online store for green building materials...',
          keywords: data?.metaTags || 'Green building materials, sustainable building materials, eco-friendly construction, etc.',
          canonical: canonicalUrl,
          ogTitle: data?.metaTitle ? `${data.metaTitle} | Hubeco` : 'Products | Hubeco',
          ogDescription: data?.metaDescription || 'Marketplace for green building materials. India\'s biggest online store for green building materials...',
          ogImage: data?.metaImage ? (Array.isArray(data.metaImage) ? data.metaImage[0] : data.metaImage) : '/images/Admin-2.png',
        };
      }
    } else if (ccid && typeof ccid === 'string') {
      const res = await fetch(`${baseURL}/childCategories/getChildCategoryByIdPublic/${ccid}`);
      if (res.ok) {
        const data = await res.json();
        metaData = {
          title: data?.metaTitle ? `${data.metaTitle} | Hubeco` : 'Products | Hubeco',
          description: data?.metaDescription || 'Marketplace for green building materials. India\'s biggest online store for green building materials...',
          keywords: data?.metaTags || 'Green building materials, sustainable building materials, eco-friendly construction, etc.',
          canonical: canonicalUrl,
          ogTitle: data?.metaTitle ? `${data.metaTitle} | Hubeco` : 'Products | Hubeco',
          ogDescription: data?.metaDescription || 'Marketplace for green building materials. India\'s biggest online store for green building materials...',
          ogImage: data?.metaImage ? (Array.isArray(data.metaImage) ? data.metaImage[0] : data.metaImage) : '/images/Admin-2.png',
        };
      }
    } else {
      metaData.canonical = canonicalUrl;
    }
  } catch (error) {
    // fallback below
  }

  return {
    title: metaData.title || 'Products | Hubeco',
    description: metaData.description || 'Marketplace for green building materials. India\'s biggest online store for green building materials...',
    keywords: metaData.keywords || 'Green building materials, sustainable building materials, eco-friendly construction, etc.',
    alternates: {
      canonical: metaData.canonical || `${siteURL}/products`,
    },
    openGraph: {
      title: metaData.ogTitle || 'Products | Hubeco',
      description: metaData.ogDescription || 'Marketplace for green building materials. India\'s biggest online store for green building materials...',
      url: metaData.canonical || `${siteURL}/products`,
      type: "website",
      siteName: "Hubeco",
      images: [
        {
          url: metaData.ogImage || '/images/Admin-2.png',
          alt: metaData.title || 'Hubeco Product Image',
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: metaData.ogTitle || 'Products | Hubeco',
      description: metaData.ogDescription || 'Marketplace for green building materials. India\'s biggest online store for green building materials...',
      images: [metaData.ogImage || '/images/Admin-2.png']
    }
  };
}

export default function Page({
  params,
  searchParams
}: {
  params: { slugs?: string[] },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="bg-white">
      {/* Visually hidden but SEO-visible H1 using Tailwind's sr-only, always matches meta title */}
      <MetaTitleH1 />
      <BannerSection
        link1={{ name: "Home", href: "/" }}
        link2={{ name: "Featured Sustainable Products", href: "#" }}
      />
      <ProductsList />
    </div>
  );
}
