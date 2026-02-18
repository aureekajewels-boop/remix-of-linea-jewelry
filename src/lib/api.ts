import axios from "axios";

export const api = axios.create({
  baseURL: "https://aureekajewels.com/aj",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("🔐 API Request:", config.method?.toUpperCase(), config.url);
    console.log("🔐 Auth Token:", token ? "Present" : "Missing");
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.config?.url, error.response?.status);
    console.error("❌ Error Details:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);