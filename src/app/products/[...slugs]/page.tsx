import ProductsList from "@/components/product/ProductsList";
import MetaTitleH1 from "./MetaTitleH1";
import BreadCrumb, { BreadcrumbItem } from "@/components/sharedComponents/BreadCrumb";
import BannerSection from "@/components/sharedComponents/BannerSection";

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
          ogImage: data?.metaImage ? (Array.isArray(data.metaImage) ? data.metaImage[0] : data.metaImage) : '/images/Admin-2.webp',
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
          ogImage: data?.metaImage ? (Array.isArray(data.metaImage) ? data.metaImage[0] : data.metaImage) : '/images/Admin-2.webp',
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
      canonical: metaData.canonical,
    },
    openGraph: {
      title: metaData.ogTitle || 'Products | Hubeco',
      description: metaData.ogDescription || 'Marketplace for green building materials. India\'s biggest online store for green building materials...',
      url: metaData.canonical ,
      type: "website",
      siteName: "Hubeco",
      images: [
        {
          url: metaData.ogImage || '/images/Admin-2.webp',
          alt: metaData.title || 'Hubeco Product Image',
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: metaData.ogTitle || 'Products | Hubeco',
      description: metaData.ogDescription || 'Marketplace for green building materials. India\'s biggest online store for green building materials...',
      images: [metaData.ogImage || '/images/Admin-2.webp']
    }
  };
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

async function getH1Tag(params: { slugs?: string[] }, searchParams: { [key: string]: string | string[] | undefined }) {
  const ccid = searchParams.ccid;
  const scid = searchParams.scid;
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!ccid && !scid) {
    return 'Featured Sustainable Products';
  }
  
  try {
    if (scid && typeof scid === 'string') {
      const res = await fetch(`${baseURL}/subcategories/getSubcategoryByIdPublic/${scid}`);
      if (res.ok) {
        const data = await res.json();
        return data?.h1Tag || 'Featured Sustainable Products';
      }
    } else if (ccid && typeof ccid === 'string') {
      const res = await fetch(`${baseURL}/childCategories/getChildCategoryByIdPublic/${ccid}`);
      if (res.ok) {
        const data = await res.json();
        return data?.h1Tag || 'Featured Sustainable Products';
      }
    }
  } catch (error) {
    console.error('Error fetching h1tag:', error);
  }
  
  return 'Featured Sustainable Products';
}

export default async function Page({
  params,
  searchParams
}: {
  params: { slugs?: string[] },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", href: "/" },
  ];

  // Add all slugs as breadcrumb segments, only first letter capitalized
  if (params.slugs && params.slugs.length > 0) {
    let path = "/products";
    params.slugs.forEach((slug) => {
      path += `/${slug}`;
      breadcrumbs.push({
        name: capitalizeFirstLetter(slug.replace(/-/g, ' ')),
        href: path
      });
    });
  }

  // Fetch h1tag from API
  const h1tag = await getH1Tag(params, searchParams);

  console.log(h1tag, "h1tag");
  // Do NOT add ccid or scid as breadcrumbs

  return (
    <div className="bg-white">
      {/* <MetaTitleH1 params={params} searchParams={searchParams} /> */}
      {/* <BreadCrumb breadcrumbs={breadcrumbs} /> */}
      <ProductsList 
        initialH1Tag={h1tag}
        searchParams={searchParams}
      />
    </div>
  );
}
