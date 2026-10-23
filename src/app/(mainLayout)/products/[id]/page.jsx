import { getProductDetails } from "@/lib/api/api";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import AddtoCart from "@/components/AddtoCart";

const Page = async ({ params }) => {
  const { id } = await params;
  const product = await getProductDetails(id);

  if (!product || !product._id) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#fffaf0] px-3 py-10 sm:px-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold leading-tight text-[#30230e] sm:text-3xl">
            Product Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            Sorry, we couldn't find this product.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-[#244b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#193824] sm:px-6 sm:text-base"
          >
            <ArrowLeft size={18} className="shrink-0" />
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const hasDiscount =
    product.discountPrice != null &&
    product.discountPrice < product.price;

  const currentPrice = hasDiscount
    ? product.discountPrice
    : product.price ?? 0;

  const isAvailable =
    product.isAvailable !== false && product.stock > 0;

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#fffaf0] px-3 py-5 sm:px-5 sm:py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-7xl">
        {/* Back Navigation */}
        <Link
          href="/products"
          className="mb-5 inline-flex max-w-full items-center gap-2 text-sm font-semibold text-[#244b35] transition hover:gap-3 sm:mb-7 sm:text-base"
        >
          <ArrowLeft size={18} className="shrink-0" />
          Back to Products
        </Link>

        {/* Product Layout */}
        <div className="grid min-w-0 grid-cols-1 items-start gap-5 overflow-hidden rounded-2xl border border-[#eee8da] bg-white p-3 shadow-sm sm:gap-7 sm:rounded-3xl sm:p-5 md:p-7 lg:grid-cols-2 lg:items-center lg:gap-8 lg:p-8 xl:gap-12 xl:p-10 2xl:gap-14 2xl:p-12">
          {/* Product Image */}
          <div className="relative min-w-0 overflow-hidden rounded-xl bg-[#f5f1e6] p-3 sm:rounded-2xl sm:p-5">
            {hasDiscount && (
              <span className="absolute left-3 top-3 z-10 max-w-[85%] rounded-full bg-[#e5ae2f] px-3 py-1.5 text-xs font-bold text-[#30230e] sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-sm">
                Special Offer
              </span>
            )}

            {product.image ? (
              <div className="relative aspect-square w-full">
                <Image
                  src={product.image}
                  alt={product.name || "Product image"}
                  fill
                  priority
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 90vw, (max-width: 1279px) 45vw, 600px"
                  className="object-contain transition-transform duration-500 sm:hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex aspect-square w-full items-center justify-center text-sm text-gray-400">
                No image available
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex min-w-0 flex-col py-1 sm:py-2 lg:py-3">
            {/* Category */}
            <span className="w-fit max-w-full break-words rounded-full bg-[#eaf1e8] px-3 py-1.5 text-xs font-semibold text-[#244b35] sm:px-4 sm:py-2 sm:text-sm">
              {product.category || "Natural Product"}
            </span>

            {/* Product Name */}
            <h1 className="mt-4 break-words text-2xl font-extrabold leading-tight tracking-tight text-[#30230e] sm:mt-5 sm:text-3xl md:text-4xl xl:text-5xl">
              {product.name}
            </h1>

            {/* Rating and Stock */}
            <div className="mt-4 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 sm:mt-5 sm:gap-x-4">
              {product.rating != null && (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#30230e]">
                  <Star
                    size={17}
                    className="shrink-0 fill-[#e5ae2f] text-[#e5ae2f]"
                  />
                  {product.rating}
                </span>
              )}

              {product.reviews != null && (
                <span className="break-words text-xs text-gray-500 sm:text-sm">
                  ({product.reviews} reviews)
                </span>
              )}

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {isAvailable ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1 sm:mt-7">
              <span className="break-words text-3xl font-extrabold leading-tight text-[#244b35] sm:text-4xl">
                ৳{Number(currentPrice).toLocaleString("en-BD")}
              </span>

              {hasDiscount && (
                <span className="text-base text-gray-400 line-through sm:text-xl">
                  ৳{Number(product.price).toLocaleString("en-BD")}
                </span>
              )}

              {product.unit && (
                <span className="break-words text-xs text-gray-500 sm:text-sm">
                  / {product.unit}
                </span>
              )}
            </div>

            <div className="my-5 h-px w-full bg-gray-100 sm:my-7" />

            {/* Description */}
            <h2 className="text-base font-bold text-[#30230e] sm:text-lg">
              Product Description
            </h2>

            <p className="mt-2 break-words text-sm leading-6 text-gray-600 sm:mt-3 sm:text-base sm:leading-7">
              {product.description ||
                "Discover the natural goodness and quality of this PureNature product."}
            </p>

            {/* Product Benefits */}
            <div className="mt-5 space-y-3 sm:mt-7 sm:space-y-4">
              <div className="flex min-w-0 items-start gap-2.5 text-sm leading-6 text-gray-600 sm:gap-3">
                <ShieldCheck
                  className="mt-0.5 shrink-0 text-[#244b35]"
                  size={20}
                />
                <span>Quality you can trust</span>
              </div>

              <div className="flex min-w-0 items-start gap-2.5 text-sm leading-6 text-gray-600 sm:gap-3">
                <Truck
                  className="mt-0.5 shrink-0 text-[#244b35]"
                  size={20}
                />
                <span>Convenient home delivery</span>
              </div>

              <div className="flex min-w-0 items-start gap-2.5 text-sm leading-6 text-gray-600 sm:gap-3">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-[#244b35]"
                  size={20}
                />
                <span>Carefully selected products</span>
              </div>
            </div>

            {/* Stock Information */}
            <div className="mt-5 w-fit max-w-full rounded-xl bg-[#f7f4eb] px-4 py-2.5 text-sm text-[#52634e] sm:mt-6">
              <span className="font-semibold">Available stock:</span>{" "}
              <span>{product.stock ?? 0}</span>
            </div>

            {/* Add to Cart */}
            <div className="mt-5 w-full min-w-0 sm:mt-7">
              <AddtoCart
                product={{
                  ...product,
                  price: currentPrice,
                }}
                isAvailable={isAvailable}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;