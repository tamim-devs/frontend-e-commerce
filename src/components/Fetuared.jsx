import ProductCard from "@/components/ProductCard";
import { getFeturedProducts } from "@/lib/api/api";

const Fetuared = async () => {
  const products = await getFeturedProducts();

  return (
    <section className="w-full min-w-0 overflow-x-clip bg-[#e4dcc8] px-3 py-8 sm:px-5 sm:py-10 md:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid min-w-0 grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-3 xl:gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {(!products || products.length === 0) && (
          <p className="py-10 text-center text-sm text-[#52634e] sm:text-base">
            No featured products available.
          </p>
        )}
      </div>
    </section>
  );
};

export default Fetuared;