import axios from "axios";

// إعداد axios
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://iskanjson-production.up.railway.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // يمكن إضافة token هنا لو محتاج
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // إدارة الأخطاء العامة
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      // window.location.href = '/super-secret-login-983274';
    }

    if (error.response?.status >= 500) {
      // Server error
    }

    return Promise.reject(error);
  }
);

export default api;
