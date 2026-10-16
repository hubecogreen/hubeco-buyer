// Category listing URLs, derived from the public category tree:
//   /products/{category}
//   /products/{category}/{subCategory}
//   /products/{category}/{subCategory}/{childCategory}
//   /products/{category}/{subCategory}?type=child-a,child-b   (several children)
// Legacy ?cid= / ?scid= / ?ccid= URLs are 301-redirected here by src/middleware.ts.
// Pure functions only: shared by the middleware (edge), server pages and client components.

export type CategoryNode = {
  _id: string;
  name: string;
  seoSlug: string;
  metaTitle?: string;
  metaDescription?: string;
  metaTags?: string;
  h1Tag?: string;
  subCategories?: CategoryNode[];
  childCategories?: CategoryNode[];
};

export type ResolvedCategory = {
  category?: CategoryNode;
  subCategory?: CategoryNode;
  childCategory?: CategoryNode;
};

export type CategoryTarget = {
  path: string;
  childSlugs: string[];
};

type LocatedCategory = {
  category: CategoryNode;
  subCategory?: CategoryNode;
  childCategory?: CategoryNode;
};

export const PRODUCTS_BASE_PATH = "/products";
export const CHILD_FILTER_PARAM = "type";
export const LEGACY_CATEGORY_PARAMS = ["cid", "scid", "ccid"];

const OBJECT_ID = /^[a-f0-9]{24}$/i;
const MAX_CATEGORY_DEPTH = 3;

/** Stops at the first missing slug so a child is never linked without its parents. */
export function categoryPath(...slugs: (string | null | undefined)[]): string {
  const parts: string[] = [];
  for (const slug of slugs) {
    if (!slug) break;
    parts.push(slug);
  }
  return parts.length
    ? `${PRODUCTS_BASE_PATH}/${parts.join("/")}`
    : PRODUCTS_BASE_PATH;
}

export function resolvedCategoryPath(resolved: ResolvedCategory): string {
  return categoryPath(
    resolved.category?.seoSlug,
    resolved.subCategory?.seoSlug,
    resolved.childCategory?.seoSlug
  );
}

/** Sorted and de-duplicated so every child selection has exactly one URL. */
export function normalizeChildSlugs(slugs: string[]): string[] {
  return Array.from(new Set(slugs.map((slug) => slug.trim()).filter(Boolean))).sort();
}

export function parseChildFilter(value: string | string[] | null | undefined): string[] {
  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw ? normalizeChildSlugs(raw.split(",")) : [];
}

/** Query string without the leading "?". The comma in ?type= stays literal, not %2C. */
export function categoryQuery(childSlugs: string[] = [], otherParams?: URLSearchParams): string {
  const query: string[] = [];
  const rest = otherParams?.toString();
  if (rest) query.push(rest);

  const slugs = normalizeChildSlugs(childSlugs);
  if (slugs.length) query.push(`${CHILD_FILTER_PARAM}=${slugs.join(",")}`);

  return query.join("&");
}

export function categoryHref(path: string, childSlugs: string[] = [], otherParams?: URLSearchParams): string {
  const query = categoryQuery(childSlugs, otherParams);
  return query ? `${path}?${query}` : path;
}

/** One child gets its own path; several share the subcategory path with ?type=. */
export function childSelectionTarget(
  category: CategoryNode,
  subCategory: CategoryNode,
  children: CategoryNode[]
): CategoryTarget {
  if (children.length === 1) {
    return {
      path: categoryPath(category.seoSlug, subCategory.seoSlug, children[0].seoSlug),
      childSlugs: [],
    };
  }
  return {
    path: categoryPath(category.seoSlug, subCategory.seoSlug),
    childSlugs: children.map((child) => child.seoSlug),
  };
}

/** "/products/a/b" -> ["a", "b"]; null for paths outside /products. */
export function slugsFromPathname(pathname: string | null | undefined): string[] | null {
  if (!pathname) return null;
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== PRODUCTS_BASE_PATH.slice(1)) return null;
  return segments.slice(1).map((segment) => {
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  });
}

/** Walks the tree level by level; null when any slug doesn't exist under its parent. */
export function resolveCategorySlugs(tree: CategoryNode[], slugs: string[]): ResolvedCategory | null {
  if (slugs.length > MAX_CATEGORY_DEPTH) return null;
  const [categorySlug, subCategorySlug, childCategorySlug] = slugs;
  if (!categorySlug) return {};

  const category = tree.find((node) => node.seoSlug === categorySlug);
  if (!category) return null;
  if (!subCategorySlug) return { category };

  const subCategory = category.subCategories?.find((node) => node.seoSlug === subCategorySlug);
  if (!subCategory) return null;
  if (!childCategorySlug) return { category, subCategory };

  const childCategory = subCategory.childCategories?.find((node) => node.seoSlug === childCategorySlug);
  if (!childCategory) return null;
  return { category, subCategory, childCategory };
}

/** Children of a subcategory named in ?type=, in tree order; unknown slugs are ignored. */
export function childrenFromFilter(subCategory: CategoryNode, childSlugs: string[]): CategoryNode[] {
  if (!childSlugs.length) return [];
  return (subCategory.childCategories ?? []).filter((child) => childSlugs.includes(child.seoSlug));
}

export function indexCategoriesById(tree: CategoryNode[]): Map<string, LocatedCategory> {
  const index = new Map<string, LocatedCategory>();
  for (const category of tree) {
    index.set(category._id, { category });
    for (const subCategory of category.subCategories ?? []) {
      index.set(subCategory._id, { category, subCategory });
      for (const childCategory of subCategory.childCategories ?? []) {
        index.set(childCategory._id, { category, subCategory, childCategory });
      }
    }
  }
  return index;
}

/** Clean path for any category/subcategory/child id, or null if the id is unknown. */
export function categoryPathById(tree: CategoryNode[], id: string | null | undefined): string | null {
  if (!id) return null;
  const located = indexCategoriesById(tree).get(id);
  return located ? resolvedCategoryPath(located) : null;
}

/**
 * Where a legacy ?cid= / ?scid= / ?ccid= URL lives now. Ids win over the slugs in the
 * path, so old URLs with outdated slugs still land on the right page. Returns null when
 * neither the ids nor the path resolve, so the caller can let the page 404.
 */
export function resolveLegacyCategoryUrl(
  tree: CategoryNode[],
  slugs: string[],
  params: { cid?: string | null; scid?: string | null; ccid?: string | null }
): CategoryTarget | null {
  const index = indexCategoriesById(tree);
  const lookup = (id: string) => (OBJECT_ID.test(id) ? index.get(id) : undefined);

  const children = (params.ccid ?? "")
    .split(",")
    .map((id) => lookup(id.trim()))
    .filter((located): located is LocatedCategory => !!located?.childCategory);

  const scidMatch = params.scid ? lookup(params.scid.trim()) : undefined;
  const subCategoryMatch = scidMatch?.subCategory && !scidMatch.childCategory ? scidMatch : undefined;

  if (children.length) {
    // Children can only be combined within one subcategory: prefer the one named by
    // scid, otherwise the parent of the first child.
    const anchorId =
      subCategoryMatch &&
      children.some((child) => child.subCategory!._id === subCategoryMatch.subCategory!._id)
        ? subCategoryMatch.subCategory!._id
        : children[0].subCategory!._id;
    const siblings = children.filter((child) => child.subCategory!._id === anchorId);
    const { category, subCategory } = siblings[0];
    return childSelectionTarget(
      category,
      subCategory!,
      siblings.map((sibling) => sibling.childCategory!)
    );
  }

  if (subCategoryMatch) {
    return { path: resolvedCategoryPath(subCategoryMatch), childSlugs: [] };
  }

  const cidMatch = params.cid ? lookup(params.cid.trim()) : undefined;
  if (cidMatch && !cidMatch.subCategory) {
    return { path: resolvedCategoryPath(cidMatch), childSlugs: [] };
  }

  const resolved = resolveCategorySlugs(tree, slugs);
  return resolved ? { path: resolvedCategoryPath(resolved), childSlugs: [] } : null;
}

/** Canonical form of a ?type= URL: valid children only, sorted, single child as a path. */
export function normalizeChildFilterUrl(
  tree: CategoryNode[],
  slugs: string[],
  childFilter: string | null
): CategoryTarget | null {
  const resolved = resolveCategorySlugs(tree, slugs);
  if (!resolved) return null;

  // ?type= only means something on a subcategory page
  if (!resolved.category || !resolved.subCategory || resolved.childCategory) {
    return { path: resolvedCategoryPath(resolved), childSlugs: [] };
  }

  const children = childrenFromFilter(resolved.subCategory, parseChildFilter(childFilter));
  if (!children.length) {
    return { path: resolvedCategoryPath(resolved), childSlugs: [] };
  }
  return childSelectionTarget(resolved.category, resolved.subCategory, children);
}
