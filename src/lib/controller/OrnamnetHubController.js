// src/services/categoryService.js

import { api } from "@/lib/api"; // assuming 'api' is your axios instance

export const fetchHomeCategories = async () => {
    try {
        // Get token if available, or use guest_id
        const token = localStorage.getItem("auth_token");
        
        // Add guest_id parameter for non-authenticated users
        const response = await api.get("/api/v1/categories", {
            params: {
                guest_id: token ? undefined : 1
            },
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        
        console.log("🔍 Controller - Full Response:", response);
        console.log("🔍 Controller - Response Data:", response.data);
        
        // The response might be nested, let's handle different structures
        const data = response.data?.data || response.data;
        console.log("🔍 Controller - Extracted Data:", data);
        
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("❌ Error fetching home categories:", error);
        console.error("❌ Error details:", error.response?.data || error.message);
        
        // Return empty array instead of throwing to prevent page crash
        return [];
    }
};