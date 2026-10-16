import { cache } from "react";
import { CategoryNode, ResolvedCategory, resolveCategorySlugs } from "./categoryUrls";

const CATEGORY_TREE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getProductCategoryTree`;
const CATEGORY_TREE_REVALIDATE_SECONDS = 300;

export type CategoryPage =
  | { status: "ok"; resolved: ResolvedCategory }
  | { status: "not-found" }
  // The tree couldn't be loaded: render the listing unfiltered rather than 404 a valid URL
  | { status: "unavailable" };

async function fetchCategoryTree(fresh: boolean): Promise<CategoryNode[] | null> {
  try {
    const res = await fetch(
      CATEGORY_TREE_URL,
      fresh ? { cache: "no-store" } : { next: { revalidate: CATEGORY_TREE_REVALIDATE_SECONDS } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

/** Shared by generateMetadata and the page within one request. */
export const loadCategoryPage = cache(async (slugsKey: string): Promise<CategoryPage> => {
  const slugs = slugsKey ? slugsKey.split("/") : [];

  const cachedTree = await fetchCategoryTree(false);
  const cachedMatch = cachedTree && resolveCategorySlugs(cachedTree, slugs);
  if (cachedMatch) return { status: "ok", resolved: cachedMatch };

  // Miss on the cached tree: re-check against a fresh one before 404ing, so a
  // category added or renamed in the last few minutes still resolves.
  const freshTree = await fetchCategoryTree(true);
  if (!freshTree) return cachedTree ? { status: "not-found" } : { status: "unavailable" };

  const freshMatch = resolveCategorySlugs(freshTree, slugs);
  return freshMatch ? { status: "ok", resolved: freshMatch } : { status: "not-found" };
});
