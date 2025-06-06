import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";

const AttributeDisplay = ({ attributes, currentAttributes }: any) => {
  const router = useRouter();
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});

  // Parse attributes dynamically
  // const parsedAttributes = Object.entries(attributes).reduce(
  //   (acc: any, [key, value]) => {
  //     const parts = key.split(".");
  //     const slugKey = parts.join(".");

  //     for (let i = 0; i < parts.length; i += 2) {
  //       const attributeName = parts[i];
  //       const attributeValue = parts[i + 1];

  //       if (attributeName && attributeValue) {
  //         if (!acc[attributeName]) {
  //           acc[attributeName] = new Set();
  //         }
  //         acc[attributeName].add(attributeValue);
  //       }
  //     }

  //     // Map the joined attribute values to slugs
  //     if (!acc.slugs) {
  //       acc.slugs = {};
  //     }
  //     acc.slugs[slugKey] = value;

  //     return acc;
  //   },
  //   {}
  // );
  const parsedAttributes = Object.entries(attributes).reduce(
    (acc: any, [key, value]) => {
      // Split key only on the first occurrence of `.`
      const parts = key.split(/(?<!\.\d)~~/);  // Ensure we don't split within decimal numbers
      const slugKey = parts.join(".");
  
      for (let i = 0; i < parts.length; i += 2) {
        const attributeName = parts[i];
        const attributeValue = parts[i + 1];
  
        if (attributeName && attributeValue) {
          if (!acc[attributeName]) {
            acc[attributeName] = new Set();
          }
          acc[attributeName].add(attributeValue);
        }
      }
  
      // Map the joined attribute values to slugs
      if (!acc.slugs) {
        acc.slugs = {};
      }
      acc.slugs[slugKey] = value;
  
      return acc;
    },
    {}
  );
  

  useEffect(() => {
    const initialSelected = currentAttributes?.reduce(
      (acc: any, attr: any) => {
        acc[attr.name] = attr.value;
        return acc;
      },
      {}
    );

    setSelectedAttributes(initialSelected);
  }, [currentAttributes]);

  const handleSearchChange = (attributeName: string, searchValue: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [attributeName]: searchValue,
    }));
  };

  const onClickVariant = (attributeName: string, value: string) => {
    const updatedSelected = {
      ...selectedAttributes,
      [attributeName]: value,
    };
    setSelectedAttributes(updatedSelected);

    // Construct the slug key dynamically
    const selectedValues = Object.entries(updatedSelected)
      .map(([key, val]) => `${key}.${val}`)
      .join(".");

    const slug = parsedAttributes?.slugs[selectedValues];
    if (slug) {
      router.push(`/${slug}`);
    } else {
      // consolewarn("No slug found for selected attributes:", selectedValues);
    }
  };


  return (
    <div>
      {Object.entries(parsedAttributes).map(([attributeName, values]: any) => {
        if (attributeName === "slugs") return null;

        const searchTerm = searchTerms[attributeName] || "";
        const filteredValues = [...values].filter((value: string) =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
          <div key={attributeName} className="mt-6 mb-3">
            <p className="text-md text-fontGray text-normal mb-2 capitalize">
              {attributeName}
            </p>
            <Select
              onValueChange={(value) => onClickVariant(attributeName, value)}
              value={selectedAttributes && selectedAttributes[attributeName] || ""}
            >
              <SelectTrigger className="border border-secondary px-4 py-2 rounded bg-white !w-[50%] !text-secondary">
                <SelectValue
                  placeholder={`Select ${attributeName}`}
                  className={`text-sm ${
                    selectedAttributes && selectedAttributes[attributeName]
                      ? "text-secondary"
                      : "text-fontGray"
                  }`}
                />
              </SelectTrigger>
              <SelectContent className="w-fit">
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) =>
                    handleSearchChange(attributeName, e.target.value)
                  }
                  placeholder="Search..."
                  className="mb-2 p-2 border max-w-[95%] mx-auto h-[35px] mt-2 border-borderGray rounded"
                />

                {filteredValues.length > 0 ? (
                  filteredValues.map((value: string) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className={`text-sm ${
                       selectedAttributes &&  selectedAttributes[attributeName] === value
                          ? "text-secondary bg-gray-200 hover:bg-gray-200 hover:text-secondary focus:bg-gray-200 focus:text-secondary"
                          : "text-black"
                      }`}
                    >
                      {value}
                    </SelectItem>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 pl-3">No results found</p>
                )}
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </div>
  );
};

export default AttributeDisplay;
