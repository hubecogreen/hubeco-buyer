import React, { useState } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
interface CustomButtonProps {
  title: React.ReactNode; // Content inside the button
  leftIcon?: React.ReactNode; // Left icon component
  rightIcon?: React.ReactNode; // Right icon component
  onPress?: () => void; // OnPress event handler
  className?: string; // Custom class names
  customStyles?: React.CSSProperties; // Custom styles object
  hoverColor?: string; // Custom hover text color
  hoverText?: React.ReactNode; // Custom hover text
  hoverBgColor?: string; // Custom hover background color
  clickedColor?: string; // Custom clicked background color
  loading?: boolean; // Loading state
  loaderStyles?: string;
  type?:string;
  permanentDisable?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  leftIcon,
  rightIcon,
  onPress,
  className,
  customStyles,
  hoverColor,
  hoverText,
  hoverBgColor,
  clickedColor,
  loading = false, // Default value for loading state
  loaderStyles,
  type="button",
  permanentDisable = false, // disable button permanently
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    if (onPress) {
      onPress();
    }
    setTimeout(() => setIsClicked(false), 200); // Reset clicked state after 200ms
  };

  return (
    <button
  type={type}
  disabled={loading || permanentDisable}
  onClick={handleClick}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  className={`
    flex items-center justify-center 
    px-1 py-1 rounded 
    xl:px-2 lg:px-1 md:px-2 md:py-2 
    ${isClicked && clickedColor ? `bg-[${clickedColor}]` : ''}
    ${!isClicked && isHovered && hoverBgColor ? `bg-[${hoverBgColor}]` : ''}
    ${isHovered && hoverColor ? `text-[${hoverColor}]` : ''}
    ${className}
  `}
  style={customStyles}
>
  {loading ? (
    <span>
      <CircularProgress
        className={`${loaderStyles}`}
        isIndeterminate
        color="white"
        size="20px"
      />
    </span>
  ) : (
    <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {isHovered && hoverText ? hoverText : title}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  )}
</button>

  );
};

export default CustomButton;
