"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  disabled = false,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = new Set([
      1,
      totalPages,
      currentPage - 1,
      currentPage,
      currentPage + 1,
    ]);

    return [...pages]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);
  };

  const pages = getPages();

  const baseButton =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:min-w-11";

  return (
    <nav
      aria-label="Product pagination"
      className="mt-10 flex w-full flex-wrap items-center justify-center gap-2 sm:mt-12 sm:gap-2.5"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage <= 1}
        aria-label="Go to previous page"
        className={`${baseButton} gap-1 border-[#c8b995] bg-white px-3 text-[#30230e] hover:bg-[#f4eddf]`}
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {pages.map((pageNumber, index) => {
        const previousPage = pages[index - 1];
        const showEllipsis =
          index > 0 && pageNumber - previousPage > 1;

        return (
          <React.Fragment key={pageNumber}>
            {showEllipsis && (
              <span
                className="flex h-10 min-w-5 items-center justify-center text-[#66573d] sm:h-11"
                aria-hidden="true"
              >
                <MoreHorizontal size={18} />
              </span>
            )}

            <button
              type="button"
              onClick={() => onPageChange(pageNumber)}
              disabled={disabled}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
              className={`${baseButton} ${
                currentPage === pageNumber
                  ? "border-[#244b35] bg-[#244b35] text-white shadow-sm"
                  : "border-[#c8b995] bg-white text-[#30230e] hover:bg-[#f4eddf]"
              }`}
            >
              {pageNumber}
            </button>
          </React.Fragment>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage >= totalPages}
        aria-label="Go to next page"
        className={`${baseButton} gap-1 border-[#c8b995] bg-white px-3 text-[#30230e] hover:bg-[#f4eddf]`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />
      </button>
    </nav>
  );
};

export default Pagination;