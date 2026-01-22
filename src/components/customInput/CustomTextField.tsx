
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface CustomInputProps {
  label?: string;
  value?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder: string;
  errorMessage?: string;
  multiline?: boolean;
  numberOfLines?: number;
  onChange?: (value: string) => void;
  containerStyle?: React.CSSProperties;
  textInputStyle?: React.CSSProperties;
  outlineStyle?: React.CSSProperties;
  secureTextEntry?: boolean;
  keyboardType?: string;
  onEndEditing?: (data: any) => void;
  errorStyle?: React.CSSProperties;
  editable?: boolean;
  focus?: () => void;
  blur?: () => void;
  customStyles?: React.CSSProperties;
  extraClassnames?: string;
  iconClassnames?: string;
  isTextArea?: boolean;
  rows?: number;
  prefix?: string;
  maxLength?: number;
  isMobileInput?: boolean;
  inputClassNames?: string;
  iconStyles?: React.CSSProperties;
  type?: string,
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value = "",
  disabled = false,
  leftIcon,
  rightIcon,
  placeholder,
  errorMessage,
  multiline = false,
  numberOfLines = 3,
  onChange,
  containerStyle,
  textInputStyle,
  outlineStyle,
  secureTextEntry = false,
  keyboardType = "default",
  onEndEditing,
  errorStyle,
  editable = true,
  focus,
  blur,
  customStyles,
  extraClassnames,
  isTextArea = false,
  rows = 3,
  prefix = "",
  maxLength,
  isMobileInput = false,
  iconClassnames,
  inputClassNames,
  iconStyles,
  type,
  required

}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    if (isMobileInput && !/^\d{0,10}$/.test(newValue)) {
      return;
    }
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div
      className={`relative  w-full ${extraClassnames}`}
      style={containerStyle}
    >
      {label && <label className="block mb-2">{label}</label>}
      {leftIcon && (
        <span
          className={`absolute z-10  'top-1/2' transform -translate-y-1/2 ${iconClassnames}`}
          style={{ ...iconStyles }}
        >
          {leftIcon}
        </span>
      )}
      <div className="relative h-full w-full">
        {prefix && (
          <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-inputColor`}>
            {prefix}
          </span>
        )}
        {isTextArea ? (
          <textarea
            className={`py-2 h-full w-full focus:outline-none bg-cream rounded-lg text-inputColor border border-primary rounded-md
            ${disabled ? "opacity-50" : ""} 
            ${inputClassNames} placeholder-custom`}
            placeholder={placeholder}
            value={inputValue ? inputValue : ''}
            onChange={handleInputChange}
            onFocus={() => {
              setIsFocused(true);
              if (focus) focus();
            }}
            onBlur={() => {
              setIsFocused(false);
              if (blur) blur();
              if (onEndEditing) onEndEditing();
            }}
            rows={numberOfLines}
            maxLength={isMobileInput ? 10 : undefined} // Apply maxLength only if isMobileInput is true
            style={{
              ...customStyles,
              ...textInputStyle,
              paddingLeft: prefix ? "3rem" : "0.75rem", // Adjust padding based on prefix
              ...outlineStyle,
            }}
            disabled={disabled}
            readOnly={!editable}
          />
        ) : (
          <input
            className={`py-2 w-full h-full focus:outline-none text-inputColor border border-primary rounded-md
            bg-cream focus:bg-cream
            ${disabled ? "opacity-50" : ""} 
            ${inputClassNames} placeholder-custom`}

            type={showPassword ? 'text' : type}
            placeholder={placeholder}
            value={inputValue ? inputValue : ''}
            onChange={handleInputChange}
            required={required}
            onFocus={() => {
              setIsFocused(true);
              if (focus) focus();
            }}
            onKeyUp={onEndEditing}
            onBlur={() => {
              setIsFocused(false);
              if (blur) blur();
              if (onEndEditing) onEndEditing();
            }}
            maxLength={isMobileInput ? 10 : undefined} // Apply maxLength only if isMobileInput is true
            style={{
              ...customStyles,
              ...textInputStyle,
              paddingLeft: prefix ? "3rem" : leftIcon ? "2.5rem" : "0.75rem", // Adjust padding based on prefix
              ...outlineStyle,
            }}
            disabled={disabled}
            readOnly={!editable}
          />
        )}

      </div>
      {type === 'password' ? (
        <span
          onClick={handleTogglePassword}
          className={`absolute right-3 ${errorMessage ? 'top-1/3' : 'top-1/2'} transform -translate-y-1/2 cursor-pointer text-brown`}
        >
          {showPassword ? <FaEyeSlash className={'text-brown w-4 h-4'} /> : <FaEye className={'text-brown w-4 h-4 text-brown'} />}
        </span>
      ) : (
        <></>
      )}

      {rightIcon && (
        <span
          className={`absolute z-10  ${errorMessage ? 'top-1/3' : 'top-1/2'} transform -translate-y-1/2 ${iconClassnames}`}
          style={{ ...iconStyles }}
        >
          {rightIcon}
        </span>
      )}
      {errorMessage && (
        <p
          className="w-full text-sm mt-1 text-left"
          style={{ ...errorStyle, color: '#d22525' }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
