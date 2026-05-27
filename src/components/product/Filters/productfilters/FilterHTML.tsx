"use client";
import React, { } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
const FilterHTML = ({
  ccid,
  catCount,
  scid,
  selectedParentid,
  expandedSubCats,
  onSelectParentCat,
  filteredCategories,
  categorySearch,
  handleCategorySearch,
  handleShowMoreCats,
  onSelectCat,
  showMore,
  handleShowLessCats,
  visibleCategoriesCount,
  selectedCats,
}: any) => {
  return (
    <>
      {catCount > 0 ? (
        <>
          <div className="mt-2 mb-4 border-b border-primary">
            <h3 className="text-sm text-brown  font-semibold mb-4">
              CATEGORIES
            </h3>

            <div className="relative flex flex-row items-center">
              {/* Search Icon */}
              <span className="absolute  inset-y-0 left-3 flex items-center text-white  h-[40px] ">
                <Search size={16} color="#4d4d4d" className="text-brown" />
              </span>
              <Input
                placeholder="Search"
                value={categorySearch || ""}
                onChange={(e: any) => handleCategorySearch(e)}
                className="border border-brown pl-[35px] bg-cream md:text-md text-sm w-full h-[40px] shadow-md text-brown mr-[1px] mb-4 rounded-[5px]"
              />

            </div>
            {filteredCategories
              .sort((a: any, b: any) => {
                // Prioritize ccid or scid match
                const isCCID_A = a._id === ccid ? -1 : 0;
                const isCCID_B = b._id === ccid ? -1 : 0;

                const isSCID_A = a._id === scid ? -1 : 0;
                const isSCID_B = b._id === scid ? -1 : 0;

                // Combine conditions for sorting
                if (isCCID_A !== isCCID_B) return isCCID_A - isCCID_B;
                if (isSCID_A !== isSCID_B) return isSCID_A - isSCID_B;

                // Maintain selected categories on top
                const isSelectedA = selectedParentid.includes(a?._id) ? -1 : 1;
                const isSelectedB = selectedParentid.includes(b?._id) ? -1 : 1;

                return isSelectedA - isSelectedB;
              })
              .slice(0, visibleCategoriesCount)
              .filter((category: any) => {
                // If a parent is selected, only show that one
                if (selectedParentid.length > 0) {
                  return selectedParentid.includes(category._id);
                }
                // Otherwise show all
                return true;
              })
              .map((category: any) => {
                return (
                  <div key={category.name} className="mb-2">
                    <div
                      key={category?._id}
                      className="flex items-center py-[5px]"
                    >
                      <Checkbox
                        id={category?._id}
                        className="mr-3 border-brown 
                        data-[state=unchecked]:bg-cream
                        data-[state=unchecked]:border-brown 
                        data-[state=checked]:bg-brown 
                        data-[state=checked]:border-brown
                        data-[state=checked]:text-cream"
                        checked={selectedParentid.includes(category?._id)}
                        onClick={() => {
                          onSelectParentCat(category?._id);

                          //   setOpenCategory(
                          //     openCategory === category.name ? "" : category.name
                          //   );
                        }}
                      />
                      <button
                        className={`flex items-center justify-between w-full text-left text-md ${selectedParentid.includes(category?._id)
                          ? "text-secondary"
                          : "text-brown "
                          }`}
                      // onClick={() => {
                      //   setOpenCategory(
                      //     openCategory === category.name ? "" : category.name
                      //   );
                      // }}
                      >
                        <span
                          onClick={() => onSelectParentCat(category._id)}
                          className={`text-[14px] text-brown font-normal ${selectedParentid.includes(category?._id)
                            ? "text-brown"
                            : "text-brown "
                            }`}
                        >
                          {category.name}
                        </span>
                        {/* <div
                          onClick={() => {
                            setOpenCategory(
                              openCategory === category.name
                                ? ""
                                : category.name
                            );
                          }}
                        >
                          {openCategory === category.name ? (
                            <ChevronUp size={16} className="text-white" />
                          ) : (
                            <ChevronDown size={16} className="text-white" />
                          )}
                        </div> */}
                      </button>
                    </div>
                    {expandedSubCats.includes(category._id) &&
                      category?.childCategories?.length > 0 && (
                        <ul className="ml-4 my-1">
                          {category.childCategories.map((childCat: any) => {
                            return (
                              <div
                                key={childCat?._id}
                                className="flex items-center py-[5px]"
                              >
                                <Checkbox
                                  id={childCat?._id}
                                  className="mr-3
    data-[state=unchecked]:bg-cream
    data-[state=unchecked]:border-brown
    data-[state=checked]:bg-brown
    data-[state=checked]:border-brown
    data-[state=checked]:text-cream"
                                  checked={selectedCats.includes(childCat?._id)}
                                  onClick={() => onSelectCat(childCat?._id)}
                                />

                                <li
                                  key={childCat.name}
                                  className={`text-[14px]  font-normal py-[5px] ${selectedCats.includes(childCat?._id)
                                    ? "text-brown font-medium"
                                    : "text-brown"
                                    } `}
                                  onClick={() => onSelectCat(childCat?._id)}
                                >
                                  {childCat.name}
                                </li>
                              </div>
                            );
                          })}
                        </ul>
                      )}
                  </div>
                );
              })}
            {filteredCategories && filteredCategories.length > 10 && (
              <>
                {showMore && catCount === filteredCategories.length ? (
                  <div className="flex items-center flex-row mt-3 mb-4">
                    <MdKeyboardDoubleArrowLeft color={"#A92449"} size={18} />
                    <button
                      className="text-sm text-secondary "
                      onClick={handleShowLessCats}
                    >
                      Show Less
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center flex-row mt-3 mb-4">
                    <button
                      className="text-sm text-secondary "
                      onClick={handleShowMoreCats}
                    >
                      Show More
                    </button>
                    <MdKeyboardDoubleArrowRight color={"#A92449"} size={18} />
                  </div>
                )}
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default FilterHTML;
