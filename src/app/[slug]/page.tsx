import ProductPreview from "@/components/product/ProductPage";
import { normalizePath } from "@/lib/utils";
import React from "react";

// Breadcrumb Schema component
function BreadcrumbSchema({
  breadcrumbs,
}: {
  breadcrumbs: { name: string; url: string }[];
}): JSX.Element {
  const itemListElements = breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    item: item.url,
  }));
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item:
          typeof window !== "undefined"
            ? window.location.origin
            : "https://hubeco.market",
      },
      ...itemListElements,
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

function ProductSchema({ product }: { product: any }) {
  if (!product) return null;
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL || "";
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.productName || product.variantName,
    image: Array.isArray(product.images)
      ? product.images.map((img: string) => assetURL + "/" + img)
      : [],
    description: product.description || product.meta?.description || "",
    sku: product.variantSku,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.platformPrice || product.discountedPrice || product.price,
      url: typeof window !== "undefined" ? window.location.href : "",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/shop/${params.slug}`,
      { cache: "force-cache" }
    );

    if (!res.ok) throw new Error("Product not found");

    const productData = await res.json();
    const product =
      productData?.selectedVariant || productData?.product?.variants[0];
    const assetURL = process.env.NEXT_PUBLIC_ASSET_URL || "";
    const metaImages = product?.meta?.metaImage || [];

    const title = `${
      product?.meta?.metaTitle ||
      (product?.variantName && product.variantName !== "Default"
        ? product.variantName
        : product?.productName)
    } | Hubeco`;
    const description =
      product?.meta?.description ||
      product?.description ||
      "Marketplace for green building materials. India's biggest online store for green building materials...";

    const keywords =
      product?.meta?.metaKeywords ||
      product?.meta?.metaWords ||
      "Green building materials, sustainable building materials, eco-friendly construction, etc.";

    const canonicalUrl = `https://hubeco.market/${params.slug}`;

    const images =
      metaImages.length > 0
        ? metaImages.map((img: string) => {
            const path = normalizePath(img);
            return {
              url: `${assetURL}/${path}`,
              alt: product?.productName || "Hubeco Product Image",
            };
          })
        : [
            {
              url: "/images/Admin-2.webp",
              alt: "Hubeco Logo",
            },
          ];

    return {
      title,
      description,
      keywords,
      metadataBase: new URL("https://hubeco.market"),
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
        },
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: "article",
        siteName: "Hubeco",
        images,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: images.map((img: { url: any }) => img.url),
      },
      other: {
        "theme-color": "#ffffff",
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

// Fetch product data for schema in the page component
async function getProductData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/shop/${slug}`,
    { cache: "force-cache" }
  );
  if (!res.ok) return null;
  const productData = await res.json();
  return productData?.selectedVariant || productData?.product?.variants[0];
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductData(params.slug);
  // Example breadcrumbs for a product page
  const breadcrumbs = [
    { name: "Products", url: `https://hubeco.market/products` },
    // You can add more dynamic segments here if you have category/subcategory info
    {
      name: product?.productName || product?.variantName || params.slug,
      url: `https://hubeco.market/${params.slug}`,
    },
  ];
  return (
    <>
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <ProductSchema product={product} />
      <ProductPreview {...params} />
    </>
  );
};

export default Page;
