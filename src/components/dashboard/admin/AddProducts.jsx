"use client";

import React from "react";
import {
  PackagePlus,
  ImagePlus,
  Tag,
  Boxes,
  FileText,
  Star,
} from "lucide-react";
import { addProducts } from "@/lib/action/action";
import { useRouter } from "next/navigation";

const AddProducts = () => {
  const router = useRouter();
 


  return (
    <div className="min-h-screen bg-[#fffaf0] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
    

        {/* Form */}
        <form action={addProducts} className="space-y-7 rounded-3xl border border-[#eee8d9] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          {/* Basic Information */}
          <section>
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
              <Tag className="text-[#244b35]" size={22} />
              <div>
                <h2 className="text-lg font-bold text-[#30230e]">
                    Add New Product
                </h2>
                <p className="text-sm text-gray-500">
                   Add a new product to your PureNature collection.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Name *
                </label>
                <input
                 name="name"
                  type="text"
                  placeholder="e.g. Pure Sundarban Honey"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#fffdf8] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#244b35] focus:ring-2 focus:ring-[#244b35]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category *
                </label>
                <select
                name="category"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-gray-200 bg-[#fffdf8] px-4 py-3 outline-none focus:border-[#244b35] focus:ring-2 focus:ring-[#244b35]/10"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Honey">Honey</option>
                  <option value="Milk">Khati Cow Milk</option>
                  <option value="Fresh Fish">Fresh Fish</option>
                  <option value="Fishery Products">Fishery Products</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Unit *
                </label>
                <select
                  name="unit"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-gray-200 bg-[#fffdf8] px-4 py-3 outline-none focus:border-[#244b35] focus:ring-2 focus:ring-[#244b35]/10"
                >
                  <option value="" disabled>
                    Select unit
                  </option>
                  <option value="250g">250g</option>
                  <option value="500g">500g</option>
                  <option value="1kg">1kg</option>
                  <option value="250ml">250ml</option>
                  <option value="500ml">500ml</option>
                  <option value="1L">1L</option>
                  <option value="1 piece">1 piece</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Description *
                </label>
                <textarea
                name="description"
                  rows={5}
                  required
                  placeholder="Describe your product, its quality and benefits..."
                  className="w-full resize-y rounded-xl border border-gray-200 bg-[#fffdf8] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#244b35] focus:ring-2 focus:ring-[#244b35]/10"
                />
              </div>
            </div>
          </section>

          {/* Pricing and Inventory */}
          <section>
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
              <Boxes className="text-[#244b35]" size={22} />
              <div>
                <h2 className="text-lg font-bold text-[#30230e]">
                  Pricing & Inventory
                </h2>
                <p className="text-sm text-gray-500">
                  Set product prices and available stock.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Regular Price (৳) *
                </label>
                <input
                name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="850"
                  className="w-full rounded-xl border border-gray-200 bg-[#fffdf8] px-4 py-3 outline-none focus:border-[#244b35] focus:ring-2 focus:ring-[#244b35]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Discount Price (৳)
                </label>
                <input
                name="discountPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="750"
                  className="w-full rounded-xl border border-gray-200 bg-[#fffdf8] px-4 py-3 outline-none focus:border-[#244b35] focus:ring-2 focus:ring-[#244b35]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Stock Quantity *
                </label>
                <input
                name="stock"
                  type="number"
                  min="0"
                  required
                  placeholder="45"
                  className="w-full rounded-xl border border-gray-200 bg-[#fffdf8] px-4 py-3 outline-none focus:border-[#244b35] focus:ring-2 focus:ring-[#244b35]/10"
                />
              </div>
            </div>
          </section>

          {/* Product Image */}
          <section>
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
              <ImagePlus className="text-[#244b35]" size={22} />
              <div>
                <h2 className="text-lg font-bold text-[#30230e]">
                  Product Image
                </h2>
                <p className="text-sm text-gray-500">
                  Add a URL for your product image.
                </p>
              </div>
            </div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Image URL *
            </label>
            <input
            name="image"
              type="url"
              required
              placeholder="https://example.com/product-image.jpg"
              className="w-full rounded-xl border border-gray-200 bg-[#fffdf8] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#244b35] focus:ring-2 focus:ring-[#244b35]/10"
            />
            <p className="mt-2 text-xs text-gray-400">
              Paste a publicly accessible image URL.
            </p>
          </section>

      

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="reset"
              className="rounded-full border border-gray-200 px-7 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Reset Form
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-[#244b35] px-8 py-3 font-bold text-white shadow-sm transition hover:bg-[#193824]"
            >
              <PackagePlus size={19} />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;