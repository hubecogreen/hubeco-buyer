import React from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";

interface paginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<paginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleFirstPage = () => {
    onPageChange(1); // Go to the first page
  };

  const handleLastPage = () => {
    onPageChange(totalPages); // Go to the last page
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Adjust start and end if the range is less than 5 pages
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (currentPage < totalPages / 2) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    // Add first page and ellipsis if necessary
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handleClick(1)}
          className={`flex items-center justify-center px-3 py-1 rounded bg-graylight text-brown h-8 w-8 text-base ${
            currentPage === 1 ? "bg-pink text-white" : "bg-lightGray text-brown"
          }`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`flex items-center justify-center px-3 py-1 rounded bg-graylight text-brown h-8 w-8 text-base ${
            currentPage === i ? "bg-pink text-white" : "bg-lightGray text-brown"
          }`}
        >
          {i}
        </button>
      );
    }

    // Add last page and ellipsis if necessary
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handleClick(totalPages)}
          className={`flex items-center justify-center px-3 py-1 rounded bg-graylight text-brown h-8 w-8 text-base ${
            currentPage === totalPages
              ? "bg-pink text-white"
              : "bg-lightGray text-brown"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={handleFirstPage}
        className="flex items-center justify-center px-1 py-1 rounded bg-lightGray text-brown  h-8 w-8 "
        disabled={currentPage === 1}
      >
        <MdKeyboardDoubleArrowLeft size={18} />
      </button>
      <button
        onClick={() => handleClick(currentPage - 1)}
        className="flex items-center justify-center px-1 py-1 rounded bg-lightGray text-brown  h-8 w-8 "
        disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft size={18} />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handleClick(currentPage + 1)}
        className="flex items-center justify-center px-1 py-1 rounded bg-lightGray text-brown  h-8 w-8 "
        disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight size={18} />
      </button>
      <button
        onClick={handleLastPage}
        className="flex items-center justify-center px-1 py-1 rounded bg-lightGray text-brown h-8 w-8 "
        disabled={currentPage === totalPages}
      >
        <MdKeyboardDoubleArrowRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
