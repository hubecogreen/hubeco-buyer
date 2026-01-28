"use client";
import React, { useEffect, useState } from "react";
import useApi from "@/components/Fetcher/useAPI";
import * as getEndpoint from "../../../../network/EndPoints";
import toast from "react-hot-toast";
import { usePathname, useSearchParams } from "next/navigation";
import FilterHTML from "./FilterHTML";
import { useRouter } from "next/navigation";

interface VendorFiltersListProps {
  onCategorySelectionChange: (selectedCats: string[]) => void; // Function prop to handle selected vendors
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
  const [lastActiveParent, setLastActiveParent] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]); 

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
const router = useRouter();
console.log("expandedCategories", expandedCategories);
  useEffect(() => {
    const resetOptions = () => {
      // Reset selected categories and parent
      setSelectedParentId([]);
      setSelectedCats([]);
      setCategorySearch("");
      setLastActiveParent(null);
       setExpandedCategories([]); 
    };
    resetOptions();
  }, [pathname, searchParams, refresh]);

  const fetchCategories = async () => {
    try {
      const result = await callApi(
        getEndpoint.default.PRODUCTS_CATEGORIES,
        "GET"
      );
      if (!Array.isArray(result?.data) || result.data.length === 0) {
        throw new Error("No categories found");
      }

      // Get all subcategories from all categories (filter out empty/undefined subcategories)
      const allSubCategories = (result.data as any[]).flatMap(
        (category) => category.subCategories || []
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

   const onSelectCat = (id: string) => {
    setSelectedCats((prevCats) => {
      const isSelected = prevCats.includes(id);
      
      // Allow multiple child selections
      const updatedCats = isSelected 
        ? prevCats.filter(catId => catId !== id) // Remove if already selected
        : [...prevCats, id]; // Add to existing selections

      onCategorySelectionChange(updatedCats);
      return updatedCats;
    });
  };

 const onSelectParentCat = (id: string) => {
  setSelectedParentId((prevParents) => {
    const isSelected = prevParents.includes(id);

    if (isSelected) {
      // unselect → clear route
      // setExpandedCategories([]);
      setSelectedCats([]);
      onCategorySelectionChange([]);
      onChangeParentSelectionChange([]);

      router.push(pathname); // 🔴 remove scid from URL
      return [];
    } else {
      // select → update route
      setExpandedCategories([id]);
      setSelectedCats([]);
      onCategorySelectionChange([]);
      onChangeParentSelectionChange([id]);

      router.push(`${pathname}?scid=${id}`); // ✅ UPDATE URL
      return [id];
    }
  });
};


   // ✅ Toggle expansion without selecting (optional - for chevron button)
  const toggleExpansion = (id: string) => {
    setExpandedCategories((prevExpanded) => {
      if (prevExpanded.includes(id)) {
        return prevExpanded.filter(expId => expId !== id);
      } else {
        return [...prevExpanded, id];
      }
    });
  };


  useEffect(() => {
    fetchCategories();
  }, []); // Run once when the component mounts

  useEffect(() => {
    if (!categoriesData.length) return; // Ensure categories are loaded before proceeding.

    // If `scid` exists, select the parent category and its children
    if (scid) {
      onSelectParentCat(scid); // This will select the parent and its children
    }

    // If `ccid` exists, select the specific child category without selecting the parent
    if (ccid) {
      const parentCategory = categoriesData.find((category: any) =>
        category.childCategories?.some((child: any) => child._id === ccid)
      );

      if (parentCategory) {
        setOpenCategory(parentCategory?.name);
        onSelectCat(ccid, "direct"); // Select only the child category
      }
    }
  }, [scid, ccid, categoriesData]); // Depend on categoriesData, scid, and ccid.

  return (
    <FilterHTML
      ccid={ccid}
      catCount={catCount}
      scid={scid}
      selectedParentid={selectedParentid}
      expandedSubCats={selectedParentid}   // ✅ ADD
      toggleExpansion={toggleExpansion}
      onSelectParentCat={onSelectParentCat}
      filteredCategories={filteredCategories}
      categorySearch={categorySearch}
      handleCategorySearch={handleCategorySearch}
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
