"use client";
import React, { useEffect, useState } from "react";
import useApi from "@/components/Fetcher/useAPI";
import * as getEndpoint from "../../../../network/EndPoints";
import toast from "react-hot-toast";
import { usePathname, useSearchParams } from "next/navigation";
import FilterHTML from "./FilterHTML";

interface VendorFiltersListProps {
  onCategorySelectionChange: (data: { childId: string, subCategoryId: string | null }) => void; // Function prop to handle selected child and subcategory
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
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedParentid, setSelectedParentId] = useState<string[]>([]);

  const [catCount, setCatCount] = useState<any>(null);
  const [categorySearch, setCategorySearch] = useState("");
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [openCategory, setOpenCategory] = useState("Office & Commercial");
  const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(10);
  const [showMore, setShowMore] = useState<any>(false);

  const scid = searchParams?.get("scid") as any;
  const ccid = searchParams?.get("ccid") as any;

  const pathname = usePathname();

  useEffect(() => {
    const resetOptions = () => {
      // Reset selected categories and parent
      setSelectedParentId([]);
      setSelectedCats([]);
      setCategorySearch("");
    };
    resetOptions();
  }, [pathname, searchParams, refresh]);

  const fetchCategories = async () => {
    try {
      const result = await callApi(getEndpoint.default.PRODUCTS_CATEGORIES, "GET");
      if (!Array.isArray(result?.data) || result.data.length === 0) {
        throw new Error("No categories found");
      }
  
      // Get all subcategories from all categories (filter out empty/undefined subcategories)
      const allSubCategories = (result.data as any[]).flatMap(
        category => category.subCategories || []
      );
  
      setCategoriesData(allSubCategories);
      setFilteredCategories(allSubCategories);
      setCatCount(allSubCategories.length);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setCategorySearch(value);

    const filtered = categoriesData.filter((category: any) => {
      const matchesParent = category.name.toLowerCase().includes(value);
      const matchesChild = category.childCategories?.some((child: any) =>
        child.name.toLowerCase().includes(value)
      );
      if (matchesChild) {
        setOpenCategory(category.name);
      }

      return matchesParent || matchesChild;
    });
    if (filtered.length > 0) {
      setShowMore(false);
    }

    setFilteredCategories(filtered);
  };

  const handleApiError = async (err: any) => {
    const result = err?.response;
    if (result?.status === 400) {
      toast.error("Buyer Not Found");
    } else if (result?.status === 404) {
      toast.error("Invalid Request");
    } else {
      toast.error(result?.data?.message);
    }
  };

  const handleShowMoreCats = () => {
    setFilteredCategories(categoriesData);
    setShowMore(true);
    setVisibleCategoriesCount(categoriesData.length);
  };
  const handleShowLessCats = () => {
    setFilteredCategories(categoriesData.slice(0, 10));
    setShowMore(false);
    setVisibleCategoriesCount(10);
  };

  const onSelectCat = (id: string, status = "non") => {
    setSelectedCats((prevSelectedCats) => {
      const updatedCats = prevSelectedCats.includes(id)
        ? prevSelectedCats.filter((catId) => catId !== id)
        : [...prevSelectedCats, id];

      // Find the parent subcategory id for the selected child
      const parentCategory = categoriesData.find((cat: any) =>
        cat.childCategories?.some((child: any) => child._id === id)
      );
      const subCategoryId = parentCategory ? parentCategory._id : null;

      // Send both child and subcategory id to parent
      onCategorySelectionChange({ childId: id, subCategoryId });

      // Check if the parent category should be unselected if any child is unselected
      if (parentCategory) {
        const allChildrenSelected = parentCategory.childCategories?.every(
          (child: any) => updatedCats.includes(child._id)
        );

        if (!allChildrenSelected) {
          setSelectedParentId((prevParentIds) =>
            (prevParentIds || []).filter(
              (catId) => catId !== parentCategory._id
            )
          );
          setSelectedParentId((prevParentIds) => {
            const updatedParentIds = (prevParentIds || []).filter(
              (catId) => catId !== parentCategory._id
            );
            onChangeParentSelectionChange(updatedParentIds);
            return updatedParentIds;
          });
        } else {
          setSelectedParentId((prevParentIds) => {
            if (!prevParentIds.includes(parentCategory._id)) {
              return [...prevParentIds, parentCategory._id];
            }
            return prevParentIds;
          });
        }
      }

      return updatedCats;
    });
  };

  const onSelectParentCat = (id: string) => {
    const findChildCate = categoriesData.find((cat: any) => cat._id === id);

    setSelectedParentId((prevSelectedParentCats) => {
      const updatedParents = prevSelectedParentCats.includes(id)
        ? prevSelectedParentCats.filter((catId) => catId !== id)
        : [...prevSelectedParentCats, id];

      onChangeParentSelectionChange(updatedParents);

      // When selecting a parent, also select all child categories
      if (findChildCate?.childCategories) {
        const updatedCats = findChildCate.childCategories.map(
          (child: any) => child._id
        );
        setSelectedCats((prevSelectedCats) => {
          const newSelectedCats = [
            ...Array.from(new Set([...prevSelectedCats, ...updatedCats])),
          ];
          // Do NOT call onCategorySelectionChange here, as it now expects an object for single child selection only
          return newSelectedCats;
        });
      }

      // When unselecting the parent, remove all its child categories as well
      if (!updatedParents.includes(id)) {
        setSelectedCats((prevSelectedCats) => {
          const updatedCats = prevSelectedCats.filter(
            (catId) =>
              !findChildCate?.childCategories?.some(
                (child: any) => child._id === catId
              )
          );
          // Do NOT call onCategorySelectionChange here, as it now expects an object for single child selection only
          return updatedCats;
        });
      }

      return updatedParents;
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);  // Run once when the component mounts

  useEffect(() => {
    if (!categoriesData.length) return; // Ensure categories are loaded before proceeding.

    // If `scid` exists, select the parent category and its children
    if (scid) {
      onSelectParentCat(scid);  // This will select the parent and its children
    }

    // If `ccid` exists, select the specific child category without selecting the parent
    if (ccid) {
      const parentCategory = categoriesData.find((category: any) =>
        category.childCategories?.some((child: any) => child._id === ccid)
      );

      if (parentCategory) {
        setOpenCategory(parentCategory?.name);
        onSelectCat(ccid, "direct");  // Select only the child category
      }
    }
  }, [scid, ccid, categoriesData]);  // Depend on categoriesData, scid, and ccid.

  return (
    <FilterHTML
      ccid={ccid}
      catCount={catCount}
      scid={scid}
      selectedParentid={selectedParentid}
      onSelectParentCat={onSelectParentCat}
      filteredCategories={filteredCategories}
      setOpenCategory={setOpenCategory}
      categorySearch={categorySearch}
      handleCategorySearch={handleCategorySearch}
      openCategory={openCategory}
      handleShowMoreCats={handleShowMoreCats}
      onSelectCat={onSelectCat}
      showMore={showMore}
      handleShowLessCats={handleShowLessCats}
      visibleCategoriesCount={visibleCategoriesCount}
      selectedCats={selectedCats}
    />
  );
};

export default CategoryFiltersList;
