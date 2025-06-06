import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";

interface Props {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  customStyles?: string;
}

export default function SearchInput({
  placeholder,
  onChange,
  value,
  customStyles,
}: Props) {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onChange) {
        onChange({
          target: { value: inputValue },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }, 300); // Set debounce time as per requirement

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Allow only letters and numbers
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;

    if (alphanumericRegex.test(value)) {
      setInputValue(value);
    }
  };

  const handleOnclickSearch = (value: any) => {
    // console.log("crevtgrh", value);
    // Allow only letters and numbers
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;

    if (alphanumericRegex.test(value)) {
      setInputValue(value);
    }
  };

    return (
        <div className="relative w-full max-w-md h-[43px] border !border-borderGray rounded">
            <Input
                type="text"
                className="pl-2 rounded"
                placeholder={placeholder || "Search..."}
                value={inputValue}
                onChange={handleInputChange}
            />
            <div className={`absolute inset-y-0 right-[-1px] top-[-1px] flex items-center cursor-pointer  bg-secondary p-3 rounded-r h-full ${customStyles}`}>
                <IoIosSearch className="h-5 w-5 text-white rounded-r" aria-hidden="true" />
            </div>
        </div>
    );
}
