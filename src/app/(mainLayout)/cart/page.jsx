"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { createOrder } from "@/lib/action/action";
import { useRouter } from "next/navigation";

const Page = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    isLoaded,
    clearCart,
  } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };


const handleCheckout = async (e) => {
  e.preventDefault();

  if (isSubmitting) return;

  const newErrors = {};
  const phone = customer.phone.trim();

  if (!customer.name.trim()) {
    newErrors.name = "Customer name is required.";
  }

  if (!phone) {
    newErrors.phone = "Phone number is required.";
  } 
  if (!customer.location.trim()) {
    newErrors.location = "Delivery address is required.";
  }

  if (!cart.length) {
    newErrors.cart = "Your cart is empty.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsSubmitting(true);
  setErrors({});

  try {
    const orderData = {
      customer: {
        name: customer.name.trim(),
        phone,
        location: customer.location.trim(),
      },
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    };

    console.log("Checkout submitted:", orderData);

    const result = await createOrder(orderData);

    console.log("Create order result:", result);

    if (!result?.success || !result?.orderId) {
      setErrors({
        submit: result?.message || "Failed to place order.",
      });
      return;
    }

    clearCart();
    router.push('/dashboard/buyer')
   
  } catch (error) {
    console.error("Checkout error:", error);

    setErrors({
      submit: "Something went wrong. Please try again.",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  if (!isLoaded) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <p>Loading your cart...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <h2 className="mb-3 text-xl font-semibold">
            Your cart is empty
          </h2>

          <p className="mb-6 text-gray-500">
            Add some products to your cart to get started.
          </p>

          <Link
            href="/products"
            className="inline-block rounded-lg bg-black px-6 py-3 text-white"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((product, index) => (
              <div
                key={product._id ?? `${product.name}-${index}`}
                className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    ৳{Number(product.price).toLocaleString("en-BD")} each
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(product._id)}
                    className="mt-3 text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        product._id,
                        product.quantity - 1
                      )
                    }
                    disabled={product.quantity <= 1 || isSubmitting}
                    aria-label={`Decrease quantity of ${product.name}`}
                    className="h-9 w-9 rounded-lg border disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="min-w-6 text-center">
                    {product.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        product._id,
                        product.quantity + 1
                      )
                    }
                    disabled={
                      product.quantity >= product.stock ||
                      isSubmitting
                    }
                    aria-label={`Increase quantity of ${product.name}`}
                    className="h-9 w-9 rounded-lg border disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold sm:min-w-24 sm:text-right">
                  ৳
                  {(
                    Number(product.price) * product.quantity
                  ).toLocaleString("en-BD")}
                </p>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-xl border p-6">
            <h2 className="mb-5 text-xl font-bold">
              Order Summary
            </h2>

            <div className="flex justify-between gap-4">
              <span>
                Items (
                {cart.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
                )
              </span>

              <span>
                ৳{totalPrice.toLocaleString("en-BD")}
              </span>
            </div>

            <div className="my-4 border-t" />

            <div className="flex justify-between gap-4 text-lg font-bold">
              <span>Total</span>
              <span>
                ৳{totalPrice.toLocaleString("en-BD")}
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Delivery charges, if applicable, are calculated at checkout.
            </p>

            <form
              onSubmit={handleCheckout}
              className="mt-6 space-y-4"
            >
              <h3 className="text-lg font-bold">
                Delivery Information
              </h3>

              <div>
                <label
                  htmlFor="customer-name"
                  className="mb-1 block text-sm font-medium"
                >
                  Full Name <span className="text-red-600">*</span>
                </label>

                <input
                  id="customer-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={customer.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Enter your full name"
                  aria-invalid={Boolean(errors.name)}
                  className="w-full rounded-lg border px-3 py-3 outline-none focus:border-black disabled:opacity-60"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="customer-phone"
                  className="mb-1 block text-sm font-medium"
                >
                  Phone Number <span className="text-red-600">*</span>
                </label>

                <input
                  id="customer-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={customer.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="01XXXXXXXXX"
                  aria-invalid={Boolean(errors.phone)}
                  className="w-full rounded-lg border px-3 py-3 outline-none focus:border-black disabled:opacity-60"
                />

                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="customer-location"
                  className="mb-1 block text-sm font-medium"
                >
                  Delivery Address / Location{" "}
                  <span className="text-red-600">*</span>
                </label>

                <textarea
                  id="customer-location"
                  name="location"
                  value={customer.location}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={3}
                  autoComplete="street-address"
                  placeholder="House, road, area, city, district"
                  aria-invalid={Boolean(errors.location)}
                  className="w-full rounded-lg border px-3 py-3 outline-none focus:border-black disabled:opacity-60"
                />

                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.location}
                  </p>
                )}
              </div>

              {errors.cart && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.cart}
                </p>
              )}

              {errors.submit && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.submit}
                </p>
              )}

         <button
  type="submit"
  disabled={isSubmitting}
  className="w-full rounded-lg bg-black px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
>
  {isSubmitting ? "Placing Order..." : "Place Order"}
</button>
            </form>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                clearCart();
                setErrors({});
              }}
              className="mt-3 w-full rounded-lg border px-5 py-3 hover:bg-gray-50 disabled:opacity-50"
            >
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </main>
  );
};

export default Page;