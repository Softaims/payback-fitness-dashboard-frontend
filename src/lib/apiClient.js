import axios from "axios";
import { getValidAccessToken, clearTokens } from "./tokenUtils";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add authorization header to all requests
api.interceptors.request.use(
  async (config) => {
    const accessToken = await getValidAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // If no token, just proceed without authorization header
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const config = error.config;
    if (error.response?.status === 401) {
      clearTokens();
    }
    if (error.response?.status === 401 && config?.isProtected) {
      window.location.href = "/login";
    }
    return Promise.reject(error?.response?.data || error);
  }
);

export default api;
