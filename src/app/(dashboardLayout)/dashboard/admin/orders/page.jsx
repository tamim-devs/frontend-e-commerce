
"use client";

import { getAdminOrders, updateOrderStatus } from "@/lib/action/action";
import { useEffect, useState, useTransition } from "react";


const statuses = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-violet-100 text-violet-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const formatPrice = (price) =>
  `৳${Number(price || 0).toLocaleString("en-BD")}`;

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getAdminOrders();

      if (!result?.success) {
        setError(result?.message || "Failed to load orders.");
        setOrders([]);
        return;
      }

      setOrders(Array.isArray(result.orders) ? result.orders : []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = (orderId, status) => {
    setError("");
    setMessage("");
    setUpdatingId(orderId);

    startTransition(async () => {
      try {
        const result = await updateOrderStatus(orderId, status);

        if (!result?.success) {
          setError(result?.message || "Failed to update status.");
          return;
        }

        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            String(order._id) === String(orderId)
              ? {
                  ...order,
                  status: result.status || status,
                  updatedAt: new Date().toISOString(),
                }
              : order
          )
        );

        setMessage("Order status updated successfully.");
      } catch (err) {
        console.error(err);
        setError("Something went wrong while updating status.");
      } finally {
        setUpdatingId("");
      }
    });
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">
              ADMIN DASHBOARD
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Orders
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage customer orders and delivery status.
            </p>
          </div>

          <button
            type="button"
            onClick={loadOrders}
            disabled={loading}
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh Orders"}
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="mt-2 text-3xl font-bold">{totalOrders}</p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {pendingOrders}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Delivered Orders</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {deliveredOrders}
            </p>
          </div>
        </div>

        {message && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border bg-white p-12 text-center">
            <p className="text-gray-500">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">No orders found</h2>
            <p className="mt-2 text-sm text-gray-500">
              Orders will appear here when customers place them.
            </p>
            <button
              type="button"
              onClick={loadOrders}
              className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {orders.map((order) => (
              <article
                key={String(order._id)}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Order ID
                    </p>
                    <p className="mt-1 break-all font-mono text-sm font-semibold">
                      {String(order._id)}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      Placed {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                      statusStyles[order.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status || "unknown"}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
                  <div>
                    <h2 className="mb-3 text-sm font-semibold">
                      Customer Information
                    </h2>
                    <p className="font-medium">
                      {order.customer?.name || "No name"}
                    </p>
                    <p className="mt-1 break-all text-sm text-gray-500">
                      {order.customer?.phone || "No phone"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {order.customer?.location || "No address"}
                    </p>
                    <p className="mt-3 break-all text-xs text-gray-400">
                      User ID: {String(order.userId || "N/A")}
                    </p>
                  </div>

                  <div>
                    <h2 className="mb-3 text-sm font-semibold">
                      Order Summary
                    </h2>

                    <div className="space-y-3">
                      {(order.items || []).map((item, index) => (
                        <div
                          key={`${item.productId || item.name}-${index}`}
                          className="flex justify-between gap-3 text-sm"
                        >
                          <div className="min-w-0">
                            <p className="break-words font-medium">
                              {item.name || "Product"}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              Qty: {item.quantity} × {formatPrice(item.price)}
                            </p>
                          </div>
                          <p className="shrink-0 font-semibold">
                            {formatPrice(
                              item.subtotal ??
                                Number(item.price || 0) *
                                  Number(item.quantity || 0)
                            )}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
                      <span className="text-sm font-semibold">Total</span>
                      <span className="text-lg font-bold">
                        {formatPrice(order.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <label
                    htmlFor={`status-${order._id}`}
                    className="text-sm font-semibold"
                  >
                    Update status
                  </label>

                  <select
                    id={`status-${order._id}`}
                    value={order.status || "pending"}
                    onChange={(e) =>
                      handleStatusChange(
                        String(order._id),
                        e.target.value
                      )
                    }
                    disabled={isPending || updatingId === String(order._id)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-52"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
