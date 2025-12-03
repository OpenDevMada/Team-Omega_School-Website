import axios from "axios";

// Create an axios api instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});

// Manage JWT token and set it to the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Manage backend loading
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const original = error.config;

    if (error.code === "ECONNABORTED") {
      console.warn("Backend waking up...");

      await new Promise((r) => setTimeout(r, 4000));

      return api(original);
    }

    if (error.response.status in [401, 403]) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
);
