// src/services/productService.js

import { api } from "@/lib/api";

export const fetchProductsByCategory = async (categorySlug) => {
    try {
        // Get token if available, or use guest_id
        const token = localStorage.getItem("auth_token");
        
        // Add guest_id parameter for non-authenticated users
        const response = await api.get(`/api/v1/products/category/${categorySlug}`, {
            params: {
                guest_id: token ? undefined : 1
            },
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        
        console.log("🔍 Product Service - Full Response:", response);
        console.log("🔍 Product Service - Response Data:", response.data);
        
        // The response might be nested, let's handle different structures
        const data = response.data?.data || response.data;
        console.log("🔍 Product Service - Extracted Data:", data);
        
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("❌ Error fetching products by category:", error);
        console.error("❌ Error details:", error.response?.data || error.message);
        
        // Return empty array instead of throwing to prevent page crash
        return [];
    }
};

export const fetchCategoryDetails = async (categorySlug) => {
    try {
        // Get token if available, or use guest_id
        const token = localStorage.getItem("auth_token");
        
        // Add guest_id parameter for non-authenticated users
        const response = await api.get(`/api/v1/categories/${categorySlug}`, {
            params: {
                guest_id: token ? undefined : 1
            },
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        
        console.log("🔍 Category Service - Full Response:", response);
        console.log("🔍 Category Service - Response Data:", response.data);
        
        // The response might be nested, let's handle different structures
        const data = response.data?.data || response.data;
        console.log("🔍 Category Service - Extracted Data:", data);
        
        return data || {};
    } catch (error) {
        console.error("❌ Error fetching category details:", error);
        console.error("❌ Error details:", error.response?.data || error.message);
        
        // Return empty object instead of throwing to prevent page crash
        return {};
    }
};