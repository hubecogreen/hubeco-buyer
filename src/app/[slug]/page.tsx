import ProductPreview from "@/components/product/ProductPage";
import { normalizePath } from "@/lib/utils";

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

    const title = `${(product?.variantName && product.variantName !== "Default")
      ? product.variantName
      : product?.productName} | Hubeco`;
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
              url: `${assetURL}${path}`,
              alt: product?.productName || "Hubeco Product Image",
            };
          })
        : [
            {
              url: "/images/Admin-2.png",
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

export default ProductPreview;
