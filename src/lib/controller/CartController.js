// src/lib/controller/CartController.js

import { api } from "@/lib/api";

export const fetchCart = async () => {
    try {
        const token = localStorage.getItem("auth_token");

        const response = await api.get("/api/v1/customer/cart", {
            params: {
                guest_id: token ? undefined : 1
            }
        });

        console.log("🔍 Cart Controller - Full Response:", response);
        console.log("🔍 Cart Controller - Response Data:", response.data);

        const data = response.data?.data || response.data;
        console.log("🔍 Cart Controller - Extracted Data:", data);

        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("❌ Error fetching cart:", error);
        console.error("❌ Error details:", error.response?.data || error.message);
        return [];
    }
};

export const addToCart = async (productId, quantity = 1) => {
    try {
        const token = localStorage.getItem("auth_token");

        const response = await api.post(
            "/api/v1/customer/cart/add",
            {}, // Empty body
            {
                params: {
                    product_id: productId,
                    quantity: quantity,
                    guest_id: token ? undefined : 1
                }
            }
        );

        console.log("✅ Added to cart:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error adding to cart:", error);
        throw error;
    }
};

export const updateCartItem = async (productId, quantity) => {
    try {
        const token = localStorage.getItem("auth_token");

        const response = await api.put(
            "/api/v1/customer/cart/update",
            {}, // Empty body
            {
                params: {
                    product_id: productId,
                    quantity: quantity,
                    guest_id: token ? undefined : 1
                }
            }
        );

        console.log("✅ Updated cart item:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating cart item:", error);
        throw error;
    }
};

export const removeFromCart = async (productId) => {
    try {
        const token = localStorage.getItem("auth_token");

        const response = await api.delete("/api/v1/customer/cart/remove", {
            params: {
                product_id: productId,
                guest_id: token ? undefined : 1
            }
        });

        console.log("✅ Removed from cart:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error removing from cart:", error);
        throw error;
    }
};