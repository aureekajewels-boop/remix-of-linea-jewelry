// src/services/brandService.js

import { api } from "@/lib/api"; // your axios instance

export const fetchHomeBrands = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await api.get("/api/v1/brands", {
      params: {
        guest_id: token ? undefined : 1,
      },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    // API returns { brands: [...] }
    const data = response.data?.brands || response.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("❌ Error fetching home brands:", error);
    console.error("❌ Error details:", error.response?.data || error.message);
    return [];
  }
};