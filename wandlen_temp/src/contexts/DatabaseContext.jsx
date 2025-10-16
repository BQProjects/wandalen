import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
 //const DATABASE_URL = "https://virtueelwandelen.nl/api"; //Production
  //const DATABASE_URL = "https://wandalen-backend.vercel.app"; //Production New
  const DATABASE_URL = "http://localhost:9090"; //Local
  const [isConnected, setIsConnected] = useState(false);
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);

  // Add axios response interceptor for 401 handling
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
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

          // Show toast if react-hot-toast is available
          if (window.toast) {
            window.toast.error("Session expired. Please log in again.");
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const value = {
    isConnected,
    videos,
    users,
    DATABASE_URL,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export { DatabaseContext };
