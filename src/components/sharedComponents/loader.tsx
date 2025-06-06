import React from "react";

// Props for customizing loader color, size, and additional styles
interface LoaderProps {
  size?: number;  // Size of the loader (default: 40px)
  color?: string; // Color of the loader (default: '#A92449')
  className?: string; // Any additional class for custom styling
}

const CustomLoader: React.FC<LoaderProps> = ({
  size = 40,
  color = "#A92449",
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }} // size is dynamic, so Tailwind can't fully replace this
    >
      <svg
        className="animate-spin w-[size] h-[size]" // Add arbitrary values here
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{ width: size, height: size }} // size is dynamic, so still needed here
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill={color}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
  
};

export default CustomLoader;
