import { NextRequest, NextResponse } from "next/server";
import {
  CHILD_FILTER_PARAM,
  CategoryNode,
  LEGACY_CATEGORY_PARAMS,
  categoryQuery,
  normalizeChildFilterUrl,
  resolveCategorySlugs,
  resolveLegacyCategoryUrl,
  slugsFromPathname,
} from "@/lib/categoryUrls";

// Category listing URLs (/products/...):
//  - legacy ?cid= / ?scid= / ?ccid= URLs 301 straight to their clean path (one hop)
//  - ?type= filters are normalised (valid slugs, sorted; a single child becomes a path)
//  - paths that match no category get a real 404 status. The page's notFound() can't
//    do this: by the time it throws, the 200 has already been sent.

const CATEGORY_TREE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getProductCategoryTree`;
const CATEGORY_TREE_TTL_MS = 5 * 60 * 1000;
// Before 404ing, re-fetch a tree older than this so new or renamed categories resolve
const CATEGORY_TREE_MIN_REFRESH_MS = 30 * 1000;
const CATEGORY_TREE_TIMEOUT_MS = 3000;
// Not a real route: rendered by the app's catch-all not-found page
const NOT_FOUND_PATH = "/category-not-found";

let cachedTree: { tree: CategoryNode[]; fetchedAt: number } | null = null;

async function getCategoryTree(maxAgeMs = CATEGORY_TREE_TTL_MS): Promise<CategoryNode[] | null> {
  if (cachedTree && Date.now() - cachedTree.fetchedAt < maxAgeMs) {
    return cachedTree.tree;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CATEGORY_TREE_TIMEOUT_MS);
  try {
    const res = await fetch(CATEGORY_TREE_URL, { signal: controller.signal, cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        cachedTree = { tree: data, fetchedAt: Date.now() };
        return data;
      }
    }
  } catch {
    // fall through to the stale tree
  } finally {
    clearTimeout(timeout);
  }

  // A stale tree still resolves correctly; with none, let the page handle the request
  return cachedTree?.tree ?? null;
}

function notFound(request: NextRequest) {
  return NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url), { status: 404 });
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams, search } = request.nextUrl;

  const slugs = slugsFromPathname(pathname);
  if (!slugs) return NextResponse.next();

  const hasLegacyParams = LEGACY_CATEGORY_PARAMS.some((param) => searchParams.has(param));
  const childFilter = searchParams.get(CHILD_FILTER_PARAM);
  const isPlainPath = !hasLegacyParams && childFilter === null;

  // /products itself: nothing to resolve
  if (isPlainPath && !slugs.length) return NextResponse.next();

  const tree = await getCategoryTree();
  if (!tree) return NextResponse.next();

  if (isPlainPath) {
    if (resolveCategorySlugs(tree, slugs)) return NextResponse.next();
    const freshTree = await getCategoryTree(CATEGORY_TREE_MIN_REFRESH_MS);
    if (freshTree && resolveCategorySlugs(freshTree, slugs)) return NextResponse.next();
    return notFound(request);
  }

  const target = hasLegacyParams
    ? resolveLegacyCategoryUrl(tree, slugs, {
        cid: searchParams.get("cid"),
        scid: searchParams.get("scid"),
        ccid: searchParams.get("ccid"),
      })
    : normalizeChildFilterUrl(tree, slugs, childFilter);

  // Neither the ids nor the path resolve
  if (!target) return notFound(request);

  // Keep unrelated params (utm_*, gclid, ...)
  const otherParams = new URLSearchParams(searchParams);
  [...LEGACY_CATEGORY_PARAMS, CHILD_FILTER_PARAM].forEach((param) => otherParams.delete(param));
  const query = categoryQuery(target.childSlugs, otherParams);

  // Compare decoded params: nextUrl.search re-encodes the ?type= comma as %2C,
  // and both spellings are the same URL to crawlers
  const sameQuery =
    new URLSearchParams(query).toString() === new URLSearchParams(search).toString();
  if (target.path === pathname && sameQuery) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname = target.path;
  destination.search = query;
  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: ["/products", "/products/:path*"],
};
