"use server";

import { auth } from "@/lib/auth";
import { baseUrl } from "@/lib/server/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const addProducts = async (formData) => {
  try {
    const newProduct = Object.fromEntries(formData.entries());

    const modiFiedData = {
      name: newProduct.name,
      category: newProduct.category,
      unit: newProduct.unit,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      discountPrice: newProduct.discountPrice
        ? parseFloat(newProduct.discountPrice)
        : null,
      image: newProduct.image,
      isAvailable: parseInt(newProduct.stock) > 0,
    };

    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      throw new Error("Authentication required. Please log in.");
    }

    const res = await fetch(`${baseUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(modiFiedData),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.message || result.msg || "Failed to add product."
      );
    }

  
    revalidatePath("/products");
    redirect("/products");
  } catch (error) {
 
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("addProducts error:", error);
    throw error;
  }
};




export const deleteProduct = async (id) => {
  const res = await fetch(`${baseUrl}/products/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  revalidatePath("/dashboard/products");
  return data;
};

export const updateProduct = async (id, formData) => {
  console.log(id);
  const updateProduct = await Object.fromEntries(formData.entries());
   
  const modiFiedData = {
    name: updateProduct.name,
    category: updateProduct.category,
    unit: updateProduct.unit,
    description: updateProduct.description,
    price: parseFloat(updateProduct.price),
    stock: parseInt(updateProduct.stock),
    discountPrice: updateProduct.discountPrice
      ? parseFloat(updateProduct.discountPrice)
      : null,
    image: updateProduct.image,
    isAvailable: parseInt(updateProduct.stock) > 0,
  };
  
  const res = await fetch(`${baseUrl}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modiFiedData)
  });
  const data = await res.json()

  if (!res.ok) {
return data;
}
  revalidatePath("/dashboard/products");
  revalidatePath(`/products/${id}/edit`);

  return data;
};





export const createOrder = async (orderData) => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      return {
        success: false,
        message: "Please login to place your order.",
      };
    }

    const res = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        customer: {
          name: orderData.customer.name,
          phone: orderData.customer.phone,
          location: orderData.customer.location,
        },
        items: orderData.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      }),
      cache: "no-store",
    });

    const result = await res.json().catch(() => ({}));

    console.log("Order API status:", res.status);
    console.log("Order API response:", result);

    if (!res.ok) {
      return {
        success: false,
        message:
          result.message ||
          result.msg ||
          `Request failed: ${res.status}`,
      };
    }

    revalidatePath("/");

    return {
      success: true,
      message: result.message || "Order placed successfully.",
      orderId: result.orderId,
      userId: result.userId,
      totalPrice: result.totalPrice,
      status: result.status,
    };
  } catch (error) {
    console.error("Create order error:", error);

    return {
      success: false,
      message: "Something went wrong while placing your order.",
    };
  }
};





export const updateOrderStatus = async (orderId, status) => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      return {
        success: false,
        message: "Please login first.",
      };
    }

    const res = await fetch(
      `${baseUrl}/admin/orders/${encodeURIComponent(orderId)}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update order status.",
      };
    }

    return {
      success: true,
      message: result.message || "Order status updated successfully.",
      orderId: result.orderId,
      status: result.status,
    };
  } catch (error) {
    console.error("Update order status error:", error);

    return {
      success: false,
      message: "Something went wrong while updating order status.",
    };
  }
};


export const getAdminOrders = async () => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      return { success: false, message: "Please login first.", orders: [] };
    }

    const res = await fetch(`${baseUrl}/admin/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || result.msg || `Request failed: ${res.status}`,
        orders: [],
      };
    }

    return { success: true, orders: result };
  } catch (error) {
    console.error("getAdminOrders error:", error);
    return {
      success: false,
      message: "Failed to fetch orders.",
      orders: [],
    };
  }
};



export const getMyOrders = async () => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      return {
        success: false,
        message: "Please login first.",
        orders: [],
      };
    }

    const res = await fetch(`${baseUrl}/my/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json().catch(() => []);

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch your orders.",
        orders: [],
      };
    }

    return {
      success: true,
      orders: result,
    };
  } catch (error) {
    console.error("getMyOrders error:", error);

    return {
      success: false,
      message: "Something went wrong while fetching your orders.",
      orders: [],
    };
  }
};

export const deleteMyOrder = async (orderId) => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      return {
        success: false,
        message: "Please login first.",
      };
    }

    const res = await fetch(
      `${baseUrl}/my/orders/${encodeURIComponent(orderId)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to delete order.",
      };
    }

    revalidatePath("/dashboard/buyer");

    return {
      success: true,
      message: result.message || "Order deleted successfully.",
    };
  } catch (error) {
    console.error("Delete my order error:", error);

    return {
      success: false,
      message: "Something went wrong while deleting the order.",
    };
  }
};



export const sendContactEmail = async (formData) => {
  const response = await fetch(`${baseUrl}/api/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send email");
  }

  return data;
};


export const getAllAdminProducts = async () => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      throw new Error("Please log in to access admin products.");
    }

    const res = await fetch(`${baseUrl}/admin/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(
        result.message ||
          result.msg ||
          `Failed to fetch products: ${res.status}`
      );
    }

    if (Array.isArray(result)) {
      return result;
    }

    if (Array.isArray(result?.products)) {
      return result.products;
    }

    if (Array.isArray(result?.data)) {
      return result.data;
    }

    throw new Error("Unexpected products response format.");
  } catch (error) {
    console.error("getAllAdminProducts error:", error);
    throw error;
  }
};