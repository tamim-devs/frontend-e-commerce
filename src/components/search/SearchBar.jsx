"use client";

import React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

const categories = [
  "All Products",
  "Honey",
  "Milk",
  "Fresh Fish",
  "Fishery Products",
];

const SearchBar = ({
  search,
  setSearch,
  category,
  setCategory,
}) => {
  const clearFilters = () => {
    setSearch("");
    setCategory("All Products");
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-[#eee8da] bg-white p-4 shadow-sm sm:p-6">
        {/* Search Input */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={21}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#47734e]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search honey, milk, fresh fish..."
              className="w-full rounded-2xl border border-[#e8e3d7] bg-[#fffdf8] py-4 pl-12 pr-11 text-sm text-[#30230e] outline-none transition placeholder:text-gray-400 focus:border-[#47734e] focus:ring-4 focus:ring-[#47734e]/10 sm:text-base"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#244b35]"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Category Select - Mobile */}
          <div className="relative lg:hidden">
            <SlidersHorizontal
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#47734e]"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-[#e8e3d7] bg-[#fffdf8] py-4 pl-11 pr-4 text-sm font-medium text-[#30230e] outline-none focus:border-[#47734e]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Buttons - Desktop */}
        <div className="mt-5 hidden flex-wrap items-center gap-3 lg:flex">
          <span className="mr-1 text-sm font-semibold text-[#716957]">
            Categories:
          </span>

          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-[#244b35] text-white shadow-md shadow-[#244b35]/15"
                  : "border border-[#e8e3d7] bg-[#fffdf8] text-[#52634e] hover:border-[#47734e] hover:bg-[#f4f7ef]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Active Filters */}
        {(search || category !== "All Products") && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0eee6] pt-4">
            <p className="text-sm text-gray-500">
              Showing filters for{" "}
              <span className="font-semibold text-[#244b35]">
                {search ? `"${search}"` : category}
              </span>
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#47734e] hover:text-[#244b35]"
            >
              <X size={16} />
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchBar;