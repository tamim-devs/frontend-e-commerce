import DeleteButton from "@/components/dashboard/DeleteButton";
import EditButton from "@/components/dashboard/EditButton";
import { getAllAdminProducts } from "@/lib/action/action";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  let products = [];
  let errorMessage = "";

  try {
    const data = await getAllAdminProducts();

    // API response check
    console.log("Admin products API response:", data);

    if (Array.isArray(data)) {
      products = data;
    } else if (Array.isArray(data?.products)) {
      products = data.products;
    } else if (Array.isArray(data?.data)) {
      products = data.data;
    } else {
      errorMessage =
        data?.message ||
        "api not work";
    }
  } catch (error) {
    console.error("Admin products fetch failed:", error);
    errorMessage = "Products fetch not work";
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              View, edit and delete your products.
            </p>
          </div>

          <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium shadow-sm">
            Total: {products.length}
          </span>
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <p className="font-semibold text-gray-700">
              No products found.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border-b p-3 text-center">ID</th>
                    <th className="border-b p-3 text-left">Name</th>
                    <th className="border-b p-3 text-center">Product</th>
                    <th className="border-b p-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product._id || index}
                      className="text-center transition hover:bg-gray-50"
                    >
                      <td className="border-b p-3">{index + 1}</td>

                      <td className="border-b p-3 text-left font-medium">
                        {product.name || "Unnamed product"}
                      </td>

                      <td className="border-b p-3">
                        <div className="flex justify-center">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name || "Product"}
                              width={70}
                              height={70}
                              unoptimized
                              className="h-[70px] w-[70px] rounded-lg object-cover"
                            />
                          ) : (
                            <span className="text-sm text-gray-400">
                              No image
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="border-b p-3">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/products/${product._id}/edit`}>
                            <EditButton />
                          </Link>

                          <DeleteButton productId={product._id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;