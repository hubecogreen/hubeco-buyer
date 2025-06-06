// import ProductPreview from "@/components/product/ProductPage";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/shop/${params.slug}`,
//     { cache: "force-cache" }
//   );

//   const productData = await res.json();
//   const product =
//     productData?.selectedVariant || productData?.product?.variants[0];
//   const assetURL = process.env.NEXT_PUBLIC_ASSET_URL || "";
//   const metaImages = product?.meta?.metaImage || [];

//   const title = `${product?.variantName || product?.productName} | Hubeco`;
//   const description =
//     product?.meta?.description ||
//     product?.description ||
//     "Marketplace for green building materials. India's biggest online store for green building materials, bricks, cement, steel, plumbing, electrical, façade, building envelope, waterproofing, waste water, lighting, flooring, acoustics, dry walls, false ceiling, glazing, façade panels, plaster, construction blocks, construction aggregates, cooling towers, doors & windows, furniture, indoor air quality, insulation, paints& coatings, ready mix concrete, solar photo voltaic module,hybrid thermal panels,STP, oxygen optimizers, AAC, ready mix plaster, adhesives, WPC doors & Frames and more! Find the largest selection from all brands at the lowest prices in India.";

//   const keywords =
//     product?.meta?.metaKeywords ||
//     product?.meta?.metaWords ||
//     "Green building materials, sustainable building materials, green construction materials, construction materials, sustainable materials, marketplace for green building materials, online shopping for building materials, online shopping for green building materials, online shopping for sustainable building materials, eco-friendly construction, green building materials, sustainable construction, buy eco materials, B2B construction marketplace, green construction solutions, carbon-neutral materials, environmentally friendly building supplies. bio-digesters, waste management solutions, eco-friendly sanitation, sustainable water treatment, green sewage systems, organic waste recycling, sustainable wastewater management, recycled construction materials. energy-efficient building materials, thermal insulation, solar roofing, smart glass, eco-friendly insulation, cool roof technology, sustainable energy solutions, passive cooling materials. low-carbon cement, green concrete, sustainable construction materials, eco-friendly cement, carbon-neutral concrete, geopolymer concrete, high-performance sustainable cement. sustainable wood, bamboo building materials, reclaimed wood, engineered wood, eco-friendly timber, FSC-certified wood, sustainable forestry materials, wooden green building solutions. recycled building materials, upcycled construction materials, plastic bricks, reclaimed metal, crushed glass aggregates, sustainable raw materials, green building waste solutions";
//   const canonicalUrl = `https://hubeco.market/products/${params.slug}`;

//   const images =
//     metaImages.length > 0
//       ? metaImages.map((img: string) => {
//           const path = img.includes("//admin")
//             ? img.replace("//admin", "/admin")
//             : img;
//           return {
//             url: `${assetURL}${path}`,
//             alt: product?.productName || "Hubeco Product Image",
//           };
//         })
//       : [
//           {
//             url: "/images/Admin-2.png",
//             alt: "Hubeco Logo",
//           },
//         ];

//   return {
//     title,
//     description,
//     keywords,
//     metadataBase: new URL("https://hubeco.market"),
//     alternates: {
//       canonical: canonicalUrl,
//     },
//     robots: {
//       index: true,
//       follow: true,
//       nocache: false,
//       googleBot: {
//         index: true,
//         follow: true,
//         noimageindex: false,
//       },
//     },
//     openGraph: {
//       title,
//       description,
//       url: canonicalUrl,
//       type: "article",
//       siteName: "Hubeco",
//       images,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: images.map((img: { url: any }) => img.url),
//     },
//     other: {
//       "theme-color": "#ffffff",
//     },
//   };
// }

// export default ProductPreview;
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

    const canonicalUrl = `https://hubeco.market/products/${params.slug}`;

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
