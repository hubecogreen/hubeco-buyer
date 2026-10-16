"use client";
import React, { useEffect, useMemo, useState } from "react";
import useApi from "@/components/Fetcher/useAPI";
import toast from "react-hot-toast";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import FilterHTML from "./FilterHTML";
import { getProductCategoryTree } from "@/lib/productCategoryTreeCache";
import {
  CHILD_FILTER_PARAM,
  CategoryNode,
  LEGACY_CATEGORY_PARAMS,
  categoryHref,
  childSelectionTarget,
  childrenFromFilter,
  indexCategoriesById,
  parseChildFilter,
  resolveCategorySlugs,
  resolvedCategoryPath,
  slugsFromPathname,
} from "@/lib/categoryUrls";

interface VendorFiltersListProps {
  onCategorySelectionChange: (selectedCats: string[]) => void;
  onChangeParentSelectionChange: (selectedParentid: string[]) => void;
  refresh: any;
}

const CategoryFiltersList: React.FC<VendorFiltersListProps> = ({
  onCategorySelectionChange,
  onChangeParentSelectionChange,
  refresh,
}) => {
  const { callApi } = useApi();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();


  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedParentid, setSelectedParentId] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const [categoryTree, setCategoryTree] = useState<CategoryNode[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [catCount, setCatCount] = useState<number>(0);
  const [categorySearch, setCategorySearch] = useState("");
  const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(10);
  const [showMore, setShowMore] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getProductCategoryTree(callApi);
      setCategoryTree(data);

      const allSubCategories = data.flatMap((cat: any) =>
        (cat.subCategories || []).map((subCat: any) => ({
          ...subCat,
          parentCategorySlug: cat.seoSlug,
          childCategories: (subCat.childCategories || []).map((childCat: any) => ({
            ...childCat,
            parentCategorySlug: cat.seoSlug,
            parentSubCategorySlug: subCat.seoSlug,
            parentSubCategoryId: subCat._id,
          })),
        }))
      );

      setCategoriesData(allSubCategories);
      setFilteredCategories(allSubCategories);
      setCatCount(allSubCategories.length);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  /* ============ RESET (ONLY MANUAL CLEAR) ============ */

  useEffect(() => {
    if (!refresh) return;

    setSelectedCats([]);
    setSelectedParentId([]);
    setExpandedCategories([]);
    setCategorySearch("");
  }, [refresh]);

  /* ============ URL → STATE SYNC (NO PUSH HERE) ============ */

  const categoryIndex = useMemo(() => indexCategoriesById(categoryTree), [categoryTree]);

  // The selected subcategory comes from the path; selected children from the
  // path (one child) or ?type= (several children of that subcategory)
  const { scid, ccids } = useMemo(() => {
    const slugs = slugsFromPathname(pathname);
    const resolved = slugs && categoryTree.length ? resolveCategorySlugs(categoryTree, slugs) : null;
    if (!resolved?.subCategory) return { scid: null, ccids: [] as string[] };

    const children = resolved.childCategory
      ? [resolved.childCategory]
      : childrenFromFilter(resolved.subCategory, parseChildFilter(searchParams.get(CHILD_FILTER_PARAM)));
    return { scid: resolved.subCategory._id, ccids: children.map((child) => child._id) };
  }, [pathname, searchParams, categoryTree]);
  const ccidKey = ccids.join(",");

  useEffect(() => {
    if (!categoriesData.length) return;

    if (scid) {
      setSelectedParentId([scid]);
      setExpandedCategories([scid]);
      onChangeParentSelectionChange([scid]);
    }

    setSelectedCats(ccids);
    if (ccids.length) {
      onCategorySelectionChange(ccids);
    }
  }, [scid, ccidKey, categoriesData]);

  /* ================= HANDLERS ================= */

  // Category selection lives in the path and ?type=; keep any other query params
  const preservedParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    [...LEGACY_CATEGORY_PARAMS, CHILD_FILTER_PARAM].forEach((key) => params.delete(key));
    return params;
  };

  const onSelectCat = (id: string) => {
    const updated = selectedCats.includes(id)
      ? selectedCats.filter(x => x !== id)
      : [...selectedCats, id];

    setSelectedCats(updated);
    onCategorySelectionChange(updated);

    const clicked = categoryIndex.get(id);
    if (!clicked?.subCategory) return;

    const siblings = updated
      .map(childId => categoryIndex.get(childId))
      .filter(located => located?.childCategory && located.subCategory?._id === clicked.subCategory!._id)
      .map(located => located!.childCategory!);

    const target = childSelectionTarget(clicked.category, clicked.subCategory, siblings);
    router.push(categoryHref(target.path, target.childSlugs, preservedParams()));
  };

  const onSelectParentCat = (id: string) => {
    if (selectedParentid.includes(id)) {
      setSelectedParentId([]);
      setSelectedCats([]);
      onCategorySelectionChange([]);
      onChangeParentSelectionChange([]);

      router.push("/products");
      return;
    }

    setSelectedParentId([id]);
    setExpandedCategories([id]);
    setSelectedCats([]);
    onCategorySelectionChange([]);
    onChangeParentSelectionChange([id]);

    const located = categoryIndex.get(id);
    if (located?.subCategory) {
      router.push(categoryHref(resolvedCategoryPath(located), [], preservedParams()));
    }
  };

  const toggleExpansion = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  /* ================= SEARCH ================= */

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setCategorySearch(value);

    const filtered = categoriesData.filter(cat =>
      cat.name.toLowerCase().includes(value) ||
      cat.childCategories?.some((c: any) =>
        c.name.toLowerCase().includes(value)
      )
    );

    setFilteredCategories(filtered);
    setShowMore(false);
  };

  const handleShowMoreCats = () => {
    setFilteredCategories(categoriesData);
    setVisibleCategoriesCount(categoriesData.length);
    setShowMore(true);
  };

  const handleShowLessCats = () => {
    setFilteredCategories(categoriesData.slice(0, 10));
    setVisibleCategoriesCount(10);
    setShowMore(false);
  };

  /* ================= RENDER ================= */

  return (
    <FilterHTML
      ccid={ccids[0]}
      scid={scid}
      catCount={catCount}
      selectedParentid={selectedParentid}
      expandedSubCats={expandedCategories}
      toggleExpansion={toggleExpansion}
      onSelectParentCat={onSelectParentCat}
      filteredCategories={filteredCategories}
      categorySearch={categorySearch}
      handleCategorySearch={handleCategorySearch}
      handleShowMoreCats={handleShowMoreCats}
      handleShowLessCats={handleShowLessCats}
      visibleCategoriesCount={visibleCategoriesCount}
      showMore={showMore}
      onSelectCat={onSelectCat}
      selectedCats={selectedCats}
    />
  );
};

export default CategoryFiltersList;
