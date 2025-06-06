
// components/CustomSelect.tsx
import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  name: string;
  options: SelectOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  rightIcon?: React.ReactNode;
  errorMessage?: string;
  iconStyles?: React.CSSProperties;
  iconClassnames?: string;
  errorStyle?: React.CSSProperties;
  
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  name,
  options,
  value,
  onChange,
  errorMessage,
  rightIcon,
  iconStyles,
  iconClassnames,
  errorStyle,
  placeholder = 'Select an option',
}) => {
  return (
    <div className="select-wrapper">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="custom-select"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {rightIcon && (
        <span
        className={`absolute z-10 top-1/2 transform -translate-y-1/2 ${iconClassnames}`}
        style={{ ...iconStyles }}
      >
          {rightIcon}
        </span>
      )}
      {errorMessage && (
        <p
          className="text-red text-sm mt-1 w-full"
          style={{ ...errorStyle, width: "500px" }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
