import axios from "axios";

// Create axios instance
const api = axios.create();

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear localStorage
      localStorage.removeItem("userType");
      localStorage.removeItem("user");
      localStorage.removeItem("sessionId");
      localStorage.removeItem("userId");
      localStorage.removeItem("orgData");
      localStorage.removeItem("orgId");

      // Redirect to login
      window.location.href = "/";

      // Show toast if available
      if (window.toast) {
        window.toast.error("Session expired. Please log in again.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
