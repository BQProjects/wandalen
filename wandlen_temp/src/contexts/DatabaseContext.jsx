import { createContext, useState, useEffect } from "react";

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  //const DATABASE_URL = "https://wandalen.vercel.app"; //Production
  const DATABASE_URL = "https://wandalen-backend.vercel.app/"; //Production New
  // const DATABASE_URL = "http://localhost:9090"; //Local
  const [isConnected, setIsConnected] = useState(false);
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);

  // Simulate database connection
  // useEffect(() => {
  //   // Initialize database connection
  //   const connectToDatabase = async () => {
  //     try {
  //       // Simulate API call or database connection
  //       setTimeout(() => {
  //         setIsConnected(true);
  //         console.log("Database connected");
  //       }, 1000);
  //     } catch (error) {
  //       console.error("Database connection failed:", error);
  //     }
  //   };

  //   connectToDatabase();
  // }, []);

  // const fetchVideos = async () => {
  //   // Simulate fetching videos from database
  //   try {
  //     const response = await fetch("/api/videos");
  //     const data = await response.json();
  //     setVideos(data);
  //   } catch (error) {
  //     console.error("Error fetching videos:", error);
  //   }
  // };

  // const fetchUsers = async () => {
  //   // Simulate fetching users from database
  //   try {
  //     const response = await fetch("/api/users");
  //     const data = await response.json();
  //     setUsers(data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

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
