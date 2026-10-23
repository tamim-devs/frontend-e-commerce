"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllProducts } from "@/lib/api/api";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/search/SearchBar";
import Pagination from "@/components/pagination";
import { RefreshCw, Search } from "lucide-react";

const ProductsContent = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllProducts({
        search,
        category: category === "All Products" ? "" : category,
        page,
        limit: 6,
      });

      if (data?.success === false) {
        throw new Error(data.message || "Failed to load products.");
      }

      const productList = Array.isArray(data)
        ? data
        : Array.isArray(data?.products)
          ? data.products
          : [];

      setProducts(productList);
      setPagination(data?.pagination || null);
    } catch (err) {
      console.error("Fetch products error:", err);
      setProducts([]);
      setPagination(null);
      setError(err.message || "Could not load products.");
    } finally {
      setLoading(false);
    }
  }, [search, category, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handlePageChange = (nextPage) => {
    const totalPages = pagination?.totalPages || 1;

    if (nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }

    setPage(nextPage);
    document
      .getElementById("products-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="min-h-screen bg-[#e4dcc8]">
      <SearchBar
        search={search}
        setSearch={handleSearchChange}
        category={category}
        setCategory={handleCategoryChange}
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-[#30230e] sm:text-2xl">
            Our Products
          </h2>

          <p className="text-sm text-gray-700">
            {pagination
              ? `${pagination.totalProducts} products found`
              : `${products.length} products found`}
            {pagination?.totalPages > 0 && (
              <span> · Page {pagination.currentPage} of {pagination.totalPages}</span>
            )}
          </p>
        </div>

        <div id="products-grid">
          {loading ? (
            <div
              className="flex min-h-64 flex-col items-center justify-center gap-3 text-[#244b35]"
              role="status"
              aria-live="polite"
            >
              <RefreshCw className="animate-spin" size={28} />
              <p className="text-sm font-medium">Loading products...</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-white px-5 py-12 text-center">
              <p className="break-words text-red-600">{error}</p>
              <button
                type="button"
                onClick={fetchProducts}
                className="mt-5 rounded-xl bg-[#244b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#183a27]"
              >
                Try Again
              </button>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-7 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#d6c7a5] bg-white px-5 py-14 text-center sm:py-16">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e4dcc8] text-[#244b35]">
                <Search size={25} />
              </div>

              <h2 className="mt-4 text-lg font-bold text-[#30230e] sm:text-xl">
                No products found
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-600">
                Try a different keyword or category to find the products you need.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All Products");
                  setPage(1);
                }}
                className="mt-5 rounded-xl bg-[#244b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#183a27]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {!loading && !error && products.length > 0 && (
          <Pagination
            currentPage={pagination?.currentPage || page}
            totalPages={pagination?.totalPages || 1}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        )}
      </div>
    </section>
  );
};

export default ProductsContent;