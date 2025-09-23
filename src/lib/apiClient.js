import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const config = error.config;
    if (error.response?.status === 401 && config?.isProtected) {
      window.location.href = "/login";
    }
    return Promise.reject(error?.response?.data || error);
  }
);

export default api;
