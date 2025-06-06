"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Slider } from "../../ui/slider";

const FiltersSidebar = () => {
  const [openCategory, setOpenCategory] = useState("Office & Commercial");
  const [showMore, setShowMore] = useState(false);

  const categories = [
    {
      name: "Office & Commercial",
      subcategories: [
        "Tilt Industrial Design",
        "Junglefy",
        "Hydrowood",
        "Hydrowood",
      ],
    },
    { name: "Public", subcategories: [] },
    { name: "Education", subcategories: [] },
    { name: "Hotel", subcategories: [] },
    { name: "Industry", subcategories: [] },
  ];

  const products = ["Bricks", "Cement", "Wood", "Sand", "PVC wall", "Paint"];

  return (
    <div className="w-full bg-[#F4F4F4] p-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">CATEGORIES</h3>
        {categories.map((category) => (
          <div key={category.name} className="mb-2">
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() =>
                setOpenCategory(
                  openCategory === category.name ? "" : category.name
                )
              }
            >
              <span>{category.name}</span>
              {openCategory === category.name ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {openCategory === category.name &&
              category.subcategories.length > 0 && (
                <ul className="ml-4 mt-1">
                  {category.subcategories.map((sub) => (
                    <li key={sub} className="text-sm text-gray-600">
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2 flex items-center justify-between">
          PRODUCTS
          <ChevronUp size={16} />
        </h3>
        <div className="relative mb-2">
          <Slider defaultValue={[33]} max={100} step={1} />
        </div>
        {products.map((product) => (
          <div key={product} className="flex items-center mb-1">
            <input type="checkbox" id={product} className="mr-2" />
            <label htmlFor={product} className="text-sm">
              {product}
            </label>
          </div>
        ))}
        <button
          className="text-sm text-blue-600 mt-1"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "38 MORE"}
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold flex items-center justify-between">
          GREEN CERTIFIED
          <ChevronDown size={16} />
        </h3>
      </div>

      <div>
        <h3 className="text-sm font-semibold flex items-center justify-between">
          AWARD WINNING
          <ChevronDown size={16} />
        </h3>
      </div>
    </div>
  );
};

export default FiltersSidebar;
