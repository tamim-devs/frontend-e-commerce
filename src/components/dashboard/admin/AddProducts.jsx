"use client";

import React, { useState } from "react";
import {
  PackagePlus,
  ImagePlus,
  Tag,
  Boxes,
  Upload,
  X,
  CheckCircle,
  LoaderCircle,
} from "lucide-react";
import { addProducts } from "@/lib/action/action";
import { imageUpload } from "@/utils/imgUpload";

const AddProducts = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setSelectedFile(null);
    setImageUrl("");
    setUploadError("");
    setUploadSuccess("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image size must be less than 10 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleImageUpload = async () => {
    if (!selectedFile || uploading) return;

    try {
      setUploading(true);
      setUploadError("");
      setUploadSuccess("");
      setImageUrl("");

      const uploadedUrl = await imageUpload(selectedFile);

      if (!uploadedUrl) {
        throw new Error("No image URL was returned.");
      }

      setImageUrl(uploadedUrl);
      setUploadSuccess("Image uploaded successfully!");
    } catch (error) {
      console.error("Product image upload failed:", error);
      setUploadError(
        error.message || "Image upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImageUrl("");
    setUploading(false);
    setUploadError("");
    setUploadSuccess("");
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <form
          action={addProducts}
          onReset={handleReset}
          className="space-y-7 rounded-3xl border border-[#eee8d9] bg-white p-5 shadow-sm sm:p-8 lg:p-10"
        >
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
                <label
                  htmlFor="product-name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Product Name *
                </label>
                <input
                  id="product-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Pure Sundarban Honey"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#fffdf8] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#244b35] focus:ring-2 focus:ring-[#244b35]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="product-category"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Category *
                </label>
                <select
                  id="product-category"
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
                <label
                  htmlFor="product-unit"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Unit *
                </label>
                <select
                  id="product-unit"
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
                <label
                  htmlFor="product-description"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Product Description *
                </label>
                <textarea
                  id="product-description"
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
                <label
                  htmlFor="product-price"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Regular Price (৳) *
                </label>
                <input
                  id="product-price"
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
                <label
                  htmlFor="product-discount"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Discount Price (৳)
                </label>
                <input
                  id="product-discount"
                  name="discountPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="750"
                  className="w-full rounded-xl border border-gray-200 bg-[#fffdf8] px-4 py-3 outline-none focus:border-[#244b35] focus:ring-2 focus:ring-[#244b35]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="product-stock"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Stock Quantity *
                </label>
                <input
                  id="product-stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  required
                  placeholder="45"
                  className="w-full rounded-xl border border-gray-200 bg-[#fffdf8] px-4 py-3 outline-none focus:border-[#244b35] focus:ring-2 focus:ring-[#244b35]/10"
                />
              </div>
            </div>
          </section>

          {/* Product Image Upload */}
          <section>
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
              <ImagePlus className="text-[#244b35]" size={22} />
              <div>
                <h2 className="text-lg font-bold text-[#30230e]">
                  Product Image
                </h2>
                <p className="text-sm text-gray-500">
                  Select, compress and upload your product image.
                </p>
              </div>
            </div>

            <label
              htmlFor="product-image"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Choose Product Image *
            </label>

            <input
              id="product-image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              disabled={uploading}
              className="w-full rounded-xl border border-gray-200 bg-[#fffdf8] p-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[#244b35] file:px-4 file:py-2 file:font-semibold file:text-white"
            />

            {selectedFile && (
              <p className="mt-2 break-all text-sm text-gray-500">
                Selected: {selectedFile.name}
              </p>
            )}

            <button
              type="button"
              onClick={handleImageUpload}
              disabled={!selectedFile || uploading || Boolean(imageUrl)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#244b35] px-6 py-3 font-semibold text-white transition hover:bg-[#193824] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : imageUrl ? (
                <CheckCircle size={18} />
              ) : (
                <Upload size={18} />
              )}
              {uploading
                ? "Uploading..."
                : imageUrl
                  ? "Image Uploaded"
                  : "Upload Image"}
            </button>

            {uploadError && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {uploadError}
              </p>
            )}

            {uploadSuccess && (
              <p className="mt-3 flex items-center gap-2 text-sm text-green-700">
                <CheckCircle size={17} />
                {uploadSuccess}
              </p>
            )}

            {imageUrl && (
              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-700">
                    Uploaded Image Preview
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setImageUrl("");
                      setUploadSuccess("");
                      setUploadError("");
                      const input = document.getElementById("product-image");
                      if (input) input.value = "";
                    }}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <X size={16} />
                    Remove
                  </button>
                </div>

                <img
                  src={imageUrl}
                  alt="Uploaded product preview"
                  className="h-40 w-40 rounded-xl border border-gray-200 bg-white object-cover"
                />

                <p className="mt-3 break-all text-xs text-gray-500">
                  {imageUrl}
                </p>
              </div>
            )}

            <input type="hidden" name="image" value={imageUrl} />

            <p className="mt-2 text-xs text-gray-400">
              Supported formats: JPG, PNG, WebP and GIF. Maximum file size: 10 MB.
            </p>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="reset"
              disabled={uploading}
              className="rounded-full border border-gray-200 px-7 py-3 font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Reset Form
            </button>

            <button
              type="submit"
              disabled={!imageUrl || uploading}
              className="flex items-center justify-center gap-2 rounded-full bg-[#244b35] px-8 py-3 font-bold text-white shadow-sm transition hover:bg-[#193824] disabled:cursor-not-allowed disabled:opacity-50"
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