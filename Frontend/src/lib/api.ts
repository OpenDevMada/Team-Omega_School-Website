import axios from "axios";

// Create an axios api instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true
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

let accessToken: string | null = null;

export function setAccessToken(token: string) {
  accessToken = token;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        const response = await api.post("/auth/refresh");
        const newAccessToken = response.data.accessToken;

        setAccessToken(newAccessToken);

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return api.request(error.config);
      } catch (err) {
        console.error("Invalid refresh token");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
