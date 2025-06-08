import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const baseURL = import.meta.env.VITE_API_URL;

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

const logout = () => {
  // Clear tất cả auth data
  localStorage.removeItem("persist:auth");

  // Redirect về trang login
  window.location.href = "/auth";
};

Axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authData = localStorage.getItem("persist:auth");

    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        const user = parsedAuth?.user ? JSON.parse(parsedAuth.user) : null;
        const accessToken = user?.token;

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
        // Nếu parse lỗi thì logout
        logout();
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Không cần refresh token API

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    // Xử lý lỗi 401 (JWT hết hạn) - logout ngay
    if (error.response?.status === 401) {
      console.log("JWT expired, logging out...");
      logout();
      return Promise.reject(error);
    }

    // Xử lý các lỗi khác liên quan đến auth
    if (error.response?.status === 403) {
      console.warn("Access forbidden - user may not have permission");
    }

    // Nếu là lỗi network hoặc server không phản hồi
    if (!error.response) {
      console.error("Network error or server not responding");
    }

    return Promise.reject(error);
  }
);

export default Axios;
