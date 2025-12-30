import axios from "axios";

export const api = axios.create({
  baseURL: "https://aureekajewels.com",
  headers: {
    "Content-Type": "application/json",
  },
});
