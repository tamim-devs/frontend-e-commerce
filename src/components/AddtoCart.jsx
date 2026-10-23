
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ShoppingCart } from "lucide-react";

const AddtoCart = ({ product, isAvailable }) => {
  const { addToCart, cart } = useCart();
  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    if (!isAvailable || product.stock < 1) {
      setMessage("Sorry, this product is out of stock.");
      return;
    }

    const existingItem = cart.find(
      (item) => item._id === product._id
    );

    if (existingItem && existingItem.quantity >= product.stock) {
      setMessage("Maximum available stock already added.");
      return;
    }

    addToCart(product);
    setMessage("Product added to cart successfully!");
  };

  return (
    <div className="mt-9">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!isAvailable}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#244b35] px-8 py-4 font-bold text-white transition hover:bg-[#193824] disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto sm:min-w-56"
      >
        <ShoppingCart size={20} />
        {isAvailable ? "Add to Cart" : "Out of Stock"}
      </button>

      {message && (
        <p
          role="status"
          className={`mt-3 flex items-center gap-2 text-sm ${
            message.includes("successfully")
              ? "text-green-700"
              : "text-red-600"
          }`}
        >
          {message.includes("successfully") && (
            <CheckCircle2 size={18} />
          )}
          {message}
        </p>
      )}
    </div>
  );
};

export default AddtoCart;
