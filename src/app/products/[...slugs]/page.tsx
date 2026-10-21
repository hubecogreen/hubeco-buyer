import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductsList from "@/components/product/ProductsList";
import { loadCategoryPage } from "@/lib/categoryTreeServer";
import {
  CHILD_FILTER_PARAM,
  ResolvedCategory,
  categoryPath,
  childrenFromFilter,
  parseChildFilter,
  resolvedCategoryPath,
} from "@/lib/categoryUrls";

type PageProps = {
  params: { slugs?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

const DEFAULT_TITLE = "Products | Hubeco";
const DEFAULT_DESCRIPTION =
  "Marketplace for green building materials. India's biggest online store for green building materials...";
const DEFAULT_KEYWORDS =
  "Green building materials, sustainable building materials, eco-friendly construction, etc.";
const DEFAULT_IMAGE = "/images/Admin-2.webp";
const DEFAULT_H1 = "Featured Sustainable Products";

function slugsKey(params: PageProps["params"]) {
  return (params.slugs ?? []).join("/");
}

function deepestCategory(resolved: ResolvedCategory) {
  return resolved.childCategory ?? resolved.subCategory ?? resolved.category;
}

function categoryBreadcrumbs(resolved: ResolvedCategory) {
  const { category, subCategory, childCategory } = resolved;
  return [
    category && { name: category.name, href: categoryPath(category.seoSlug) },
    subCategory && { name: subCategory.name, href: categoryPath(category?.seoSlug, subCategory.seoSlug) },
    childCategory && {
      name: childCategory.name,
      href: categoryPath(category?.seoSlug, subCategory?.seoSlug, childCategory.seoSlug),
    },
  ].filter((crumb): crumb is { name: string; href: string } => !!crumb);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const siteURL = process.env.NEXT_PUBLIC_PROD_URL;
  const page = await loadCategoryPage(slugsKey(params));

  // The 404 status itself is set by src/middleware.ts; this keeps the page out of the index
  // if a request ever reaches here unresolved
  if (page.status === "not-found") {
    return { title: "Page not found | Hubeco", robots: { index: false, follow: true } };
  }

  // ?type= filtered views canonicalise to their subcategory, so the query is never included
  const path =
    page.status === "ok" ? resolvedCategoryPath(page.resolved) : categoryPath(...(params.slugs ?? []));
  const canonical = `${siteURL}${path}`;

  const node = page.status === "ok" ? deepestCategory(page.resolved) : undefined;
  const title = node?.metaTitle
    ? `${node.metaTitle} | Hubeco`
    : node?.name
      ? `${node.name} | Hubeco`
      : DEFAULT_TITLE;
  const description = node?.metaDescription || DEFAULT_DESCRIPTION;

  return {
    title,
    description,
    keywords: node?.metaTags || DEFAULT_KEYWORDS,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Hubeco",
      images: [{ url: DEFAULT_IMAGE, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_IMAGE],
    },
  };
}

function BreadcrumbSchema({ breadcrumbs }: { breadcrumbs: { name: string; href: string }[] }) {
  const siteURL = process.env.NEXT_PUBLIC_PROD_URL;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", href: "/" }, ...breadcrumbs].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteURL}${crumb.href === "/" ? "" : crumb.href}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function Page({ params, searchParams }: PageProps) {
  const page = await loadCategoryPage(slugsKey(params));
  if (page.status === "not-found") notFound();

  const resolved = page.status === "ok" ? page.resolved : {};
  const { category, subCategory, childCategory } = resolved;

  const selectedChildren = childCategory
    ? [childCategory]
    : subCategory
      ? childrenFromFilter(subCategory, parseChildFilter(searchParams[CHILD_FILTER_PARAM]))
      : [];

  const node = deepestCategory(resolved);
  const breadcrumbs = categoryBreadcrumbs(resolved);

  return (
    <div className="bg-white">
      {breadcrumbs.length > 0 && <BreadcrumbSchema breadcrumbs={breadcrumbs} />}
      <ProductsList
        initialH1Tag={node?.h1Tag || node?.name || DEFAULT_H1}
        categoryId={category?._id}
        subCategoryId={subCategory?._id}
        childCategoryIds={selectedChildren.map((child) => child._id)}
        breadcrumbs={breadcrumbs}
      />
    </div>
  );
}
