import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    category,
    price,
    discountPrice,
    unit,
    stock,
    image,
    rating,
    reviews,
    isAvailable,
  } = product;

  const hasDiscount =
    discountPrice != null &&
    price != null &&
    discountPrice < price;

  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const inStock = isAvailable && stock > 0;
  const currentPrice = hasDiscount ? discountPrice : price ?? 0;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#eee8da] bg-white transition-all duration-300 sm:rounded-3xl sm:hover:-translate-y-1 sm:hover:shadow-xl sm:hover:shadow-[#244b35]/10">
      {/* Product Image */}
      <div className="relative m-2.5 mb-0 overflow-hidden rounded-xl bg-[#f7f4eb] sm:m-3 sm:mb-0 sm:rounded-2xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-[4/3]">
          {image ? (
            <Image
              src={image}
              alt={name || "Product"}
              fill
              sizes="(max-width: 360px) 100vw, (max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 300px"
              className="object-cover transition-transform duration-500 sm:group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No image available
            </div>
          )}
        </div>

        {/* Category */}
        <span className="absolute left-2 top-2 max-w-[65%] truncate rounded-full bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-[#244b35] shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
          {category}
        </span>

        {/* Discount */}
        {hasDiscount && (
          <span className="absolute right-2 top-2 rounded-full bg-[#e5ae2f] px-2 py-1.5 text-[10px] font-bold text-[#30230e] sm:right-3 sm:top-3 sm:px-3 sm:text-xs">
            {discountPercentage}% OFF
          </span>
        )}

        {/* Stock Status */}
        <span
          className={`absolute bottom-2 left-2 max-w-[90%] rounded-full px-2.5 py-1.5 text-[10px] font-semibold sm:bottom-3 sm:left-3 sm:px-3 sm:text-xs ${
            inStock
              ? "bg-white/95 text-[#244b35]"
              : "bg-red-50 text-red-600"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Product Information */}
      <div className="flex min-w-0 flex-1 flex-col p-3 pt-3.5 sm:p-4 sm:pt-4 md:p-5 md:pt-4">
        {/* Rating */}
        <div className="mb-2 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 sm:mb-3">
          <Star
            size={15}
            className="shrink-0 fill-[#e5ae2f] text-[#e5ae2f] sm:size-4"
          />

          <span className="text-xs font-bold text-[#30230e] sm:text-sm">
            {rating ?? "New"}
          </span>

          <span className="break-words text-[11px] text-gray-400 sm:text-sm">
            ({reviews ?? 0} reviews)
          </span>
        </div>

        {/* Name */}
        <h3
          title={name}
          className="line-clamp-2 min-h-[2.75rem] break-words text-base font-bold leading-snug text-[#30230e] transition-colors group-hover:text-[#47734e] sm:min-h-[3.5rem] sm:text-lg"
        >
          {name}
        </h3>

        {/* Unit */}
        <p className="mt-1 break-words text-xs leading-5 text-gray-500 sm:text-sm">
          Net weight: {unit}
        </p>

        {/* Price */}
        <div className="mt-3 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 sm:mt-4">
          <span className="break-words text-xl font-extrabold leading-tight text-[#244b35] sm:text-2xl">
            ৳{Number(currentPrice).toLocaleString("en-BD")}
          </span>

          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through sm:text-sm">
              ৳{Number(price).toLocaleString("en-BD")}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_40px] gap-2 sm:mt-5 sm:grid-cols-[minmax(0,1fr)_44px]">
          {inStock ? (
            <Link
              href={`/products/${_id}`}
              className="flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-lg bg-[#244b35] px-2 py-2.5 text-xs font-semibold leading-tight text-white transition hover:bg-[#183a27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#47734e] sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:text-sm"
            >
              <ShoppingBag size={16} className="shrink-0" />
              <span className="truncate">View Details</span>
            </Link>
          ) : (
            <span className="flex min-h-10 min-w-0 cursor-not-allowed items-center justify-center rounded-lg bg-gray-200 px-2 py-2.5 text-xs font-semibold leading-tight text-gray-500 sm:min-h-11 sm:rounded-xl sm:text-sm">
              <span className="truncate">Out of Stock</span>
            </span>
          )}

          <Link
            href={`/products/${_id}`}
            aria-label={`View ${name}`}
            className="flex min-h-10 min-w-0 items-center justify-center rounded-lg border border-[#e5e9df] text-[#244b35] transition hover:bg-[#f2f5ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#47734e] sm:min-h-11 sm:rounded-xl"
          >
            <ArrowUpRight size={19} />
          </Link>
        </div>

        {/* Authenticity */}
        <div className="mt-auto flex min-w-0 items-start gap-1.5 border-t border-[#f0eee6] pt-3 mt-4 text-[11px] leading-5 text-gray-500 sm:gap-2 sm:text-xs">
          <CheckCircle2
            size={15}
            className="mt-0.5 shrink-0 text-[#47734e]"
          />
          <span className="min-w-0 break-words">
            Carefully sourced, quality products
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;