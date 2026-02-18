// src/lib/controller/WishlistController.js

import { api } from "@/lib/api";

export const fetchWishlist = async () => {
    try {
        // Get token if available, or use guest_id
        const token = localStorage.getItem("auth_token");

        // Add guest_id parameter for non-authenticated users
        const response = await api.get("/api/v1/customer/wish-list", {
            params: {
                guest_id: token ? undefined : 1
            }
            // No need to manually add headers - the interceptor handles it
        });

        console.log("🔍 Wishlist Controller - Full Response:", response);
        console.log("🔍 Wishlist Controller - Response Data:", response.data);

        // The response might be nested, let's handle different structures
        const data = response.data?.data || response.data;
        console.log("🔍 Wishlist Controller - Extracted Data:", data);

        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("❌ Error fetching wishlist:", error);
        console.error("❌ Error details:", error.response?.data || error.message);

        // Return empty array instead of throwing to prevent page crash
        return [];
    }
};

export const addToWishlist = async (productId) => {
    try {
        const token = localStorage.getItem("auth_token");

        // Use POST with product_id as query parameter (body should be null or empty object)
        const response = await api.post(
            "/api/v1/customer/wish-list/add",
            {}, // Empty body
            {
                params: {
                    product_id: productId,
                    guest_id: token ? undefined : 1
                }
                // No need to manually add headers - the interceptor handles it
            }
        );

        console.log("✅ Added to wishlist:", response.data);
        // Return standardized format for the hook
        return { success: true, data: response.data, message: response.data?.message };
    } catch (error) {
        console.error("❌ Error adding to wishlist:", error);
        console.error("❌ Error details:", error.response?.data || error.message);
        // Return error format instead of throwing
        return { success: false, error: error.response?.data?.message || "Failed to add to wishlist" };
    }
};


export const removeFromWishlist = async (productId) => {
    try {
        const token = localStorage.getItem("auth_token");

        // Use GET with product_id as query parameter
        const response = await api.get("/api/v1/customer/wish-list/remove", {
            params: {
                product_id: productId,
                guest_id: token ? undefined : 1
            }
            // No need to manually add headers - the interceptor handles it
        });

        console.log("✅ Removed from wishlist:", response.data);
        // Return standardized format for the hook
        return { success: true, data: response.data, message: response.data?.message };
    } catch (error) {
        console.error("❌ Error removing from wishlist:", error);
        console.error("❌ Error details:", error.response?.data || error.message);
        // Return error format instead of throwing
        return { success: false, error: error.response?.data?.message || "Failed to remove from wishlist" };
    }
};