
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import {
  getMyOrders,
  deleteMyOrder,
} from "@/lib/action/action";

const trackingSteps = [
  { status: "pending", label: "Pending", icon: Clock },
  { status: "confirmed", label: "Confirmed", icon: CheckCircle },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: Package },
];

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState(null);
  const [error, setError] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const fetchOrders = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const data = await getMyOrders();

      if (data?.success === false) {
        setError(data.message || "Failed to load orders.");
        return;
      }

      const ordersData = Array.isArray(data)
        ? data
        : Array.isArray(data?.orders)
          ? data.orders
          : [];

      setOrders(ordersData);
      setError("");
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.message || "Failed to load orders.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(true);

    const interval = setInterval(() => {
      fetchOrders(false);
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleDeleteOrder = async (order) => {
    if (String(order.status || "").toLowerCase() !== "delivered") {
      return;
    }

    const orderId = order._id || order.orderId;

    if (!orderId) {
      setDeleteMessage("Order ID পাওয়া যায়নি।");
      return;
    }

    const confirmed = window.confirm(
      "এই delivered order-টি স্থায়ীভাবে delete করতে চাও?"
    );

    if (!confirmed) return;

    try {
      setDeletingOrderId(String(orderId));
      setDeleteMessage("");

      const result = await deleteMyOrder(String(orderId));

      if (!result?.success) {
        setDeleteMessage(
          result?.message || "Order delete করা যায়নি।"
        );
        return;
      }

      setOrders((previousOrders) =>
        previousOrders.filter(
          (item) =>
            String(item._id || item.orderId) !== String(orderId)
        )
      );

      setDeleteMessage("Delivered order সফলভাবে delete হয়েছে।");
    } catch (err) {
      console.error("Delete order error:", err);
      setDeleteMessage("Order delete করার সময় সমস্যা হয়েছে।");
    } finally {
      setDeletingOrderId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-3 text-gray-500">
        <RefreshCw className="animate-spin" size={20} />
        Loading your orders...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#244b35] sm:text-3xl">
              My Orders
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              তোমার order এবং delivery status এখানে দেখো।
            </p>
          </div>

          <button
            onClick={() => fetchOrders(false)}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
            <button
              onClick={() => fetchOrders(false)}
              className="ml-3 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {deleteMessage && (
          <div
            role="status"
            className={`mb-5 rounded-xl p-4 text-sm ${
              deleteMessage.includes("সফলভাবে")
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {deleteMessage}
          </div>
        )}

        {!error && orders.length === 0 && (
          <div className="rounded-2xl border bg-white px-6 py-16 text-center">
            <Package className="mx-auto mb-4 text-gray-400" size={48} />
            <h2 className="text-lg font-semibold text-gray-800">
              No orders yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              তুমি কোনো order করলে এখানে দেখতে পাবে।
            </p>
          </div>
        )}

        <div className="space-y-6">
          {orders.map((order, orderIndex) => {
            const status = String(
              order.status || "pending"
            ).toLowerCase();

            const currentIndex = trackingSteps.findIndex(
              (step) => step.status === status
            );

            const orderId = String(
              order._id || order.orderId || orderIndex
            );

            return (
              <section
                key={orderId}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-white px-5 py-4">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                      #{order._id || order.orderId || "N/A"}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString("en-GB")
                        : "Date unavailable"}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                      status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                {/* Product Cards */}
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  {(Array.isArray(order.items) ? order.items : []).map(
                    (item, index) => (
                      <article
                        key={`${item.productId || item.name || "product"}-${index}`}
                        className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3"
                      >
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name || "Product"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Package size={32} className="text-gray-300" />
                          )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <h3 className="line-clamp-2 font-semibold text-gray-800">
                            {item.name || "Product"}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Quantity: {item.quantity ?? 0}
                          </p>

                          <p className="mt-2 font-bold text-[#244b35]">
                            ৳
                            {Number(
                              item.subtotal ??
                                Number(item.price || 0) *
                                  Number(item.quantity || 0)
                            ).toLocaleString("en-BD")}
                          </p>
                        </div>
                      </article>
                    )
                  )}
                </div>

                {/* Delivery Tracking */}
                <div className="border-t px-5 py-5">
                  <h3 className="mb-5 font-semibold text-gray-800">
                    Delivery Tracking
                  </h3>

                  {status === "cancelled" ? (
                    <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                      This order has been cancelled.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {trackingSteps.map((step, index) => {
                        const Icon = step.icon;
                        const completed =
                          currentIndex >= 0 && index <= currentIndex;

                        return (
                          <div
                            key={step.status}
                            className={`rounded-xl border p-3 ${
                              completed
                                ? "border-green-200 bg-green-50 text-green-800"
                                : "border-gray-200 bg-gray-50 text-gray-400"
                            }`}
                          >
                            <Icon size={22} className="mb-2" />
                            <p className="text-sm font-semibold">
                              {step.label}
                            </p>
                            <p className="mt-1 text-xs">
                              {completed ? "Completed" : "Waiting"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Order Total */}
                <div className="flex items-center justify-between border-t bg-gray-50 px-5 py-4">
                  <span className="text-sm font-medium text-gray-600">
                    Order Total
                  </span>
                  <span className="text-xl font-bold text-[#244b35]">
                    ৳
                    {Number(order.totalPrice || 0).toLocaleString("en-BD")}
                  </span>
                </div>

                {/* Delete only when delivered */}
                {status === "delivered" && (
                  <div className="flex justify-end border-t border-gray-100 px-5 py-4">
                    <button
                      onClick={() => handleDeleteOrder(order)}
                      disabled={deletingOrderId === orderId}
                      className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingOrderId === orderId ? (
                        <>
                          <RefreshCw
                            size={16}
                            className="animate-spin"
                          />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 size={16} />
                          Delete Order
                        </>
                      )}
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Page;
