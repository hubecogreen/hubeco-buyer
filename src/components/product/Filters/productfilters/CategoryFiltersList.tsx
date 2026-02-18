"use client";
import React, { useEffect, useState } from "react";
import useApi from "@/components/Fetcher/useAPI";
import toast from "react-hot-toast";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import FilterHTML from "./FilterHTML";
import { getProductCategoryTree } from "@/lib/productCategoryTreeCache";

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

  const scid = searchParams.get("scid");
  const ccid = searchParams.get("ccid");

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedParentid, setSelectedParentId] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

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

      const allSubCategories = data.flatMap(
        (cat: any) => cat.subCategories || []
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

  useEffect(() => {
    if (!categoriesData.length) return;

    if (scid) {
      setSelectedParentId([scid]);
      setExpandedCategories([scid]);
      onChangeParentSelectionChange([scid]);
    }

    if (ccid) {
      const ccids = ccid.split(",");
      setSelectedCats(ccids);
      onCategorySelectionChange(ccids);
    }
  }, [scid, ccid, categoriesData]);

  /* ================= HANDLERS ================= */

  const onSelectCat = (id: string) => {
    setSelectedCats(prev => {
      const updated = prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id];

      onCategorySelectionChange(updated);

      const params = new URLSearchParams(searchParams.toString());
      updated.length
        ? params.set("ccid", updated.join(","))
        : params.delete("ccid");

      router.push(`${pathname}?${params.toString()}`);
      return updated;
    });
  };

  const onSelectParentCat = (id: string) => {
    setSelectedParentId(prev => {
      const isSelected = prev.includes(id);

      const params = new URLSearchParams(searchParams.toString());

      if (isSelected) {
        params.delete("scid");
        params.delete("ccid");

        setSelectedCats([]);
        onCategorySelectionChange([]);
        onChangeParentSelectionChange([]);

        router.push(pathname);
        return [];
      }

      params.set("scid", id);
      params.delete("ccid");

      setExpandedCategories([id]);
      setSelectedCats([]);
      onCategorySelectionChange([]);
      onChangeParentSelectionChange([id]);

      router.push(`${pathname}?${params.toString()}`);
      return [id];
    });
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
      ccid={ccid}
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
