import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'client', 'organization', 'volunteer', 'admin'
  const [sessionId, setSessionId] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedUserType = localStorage.getItem("userType");
    const savedSessionId = localStorage.getItem("sessionId");

    if (savedUser && savedUserType && savedSessionId) {
      setUser(JSON.parse(savedUser));
      setUserType(savedUserType); //testing Purpose
      setSessionId(savedSessionId);
    } else {
      // TEMPORARY: Simulate different roles for testing
      // Change the role here to test: "client", "organization", "volunteer"

      const testUsers = {
        client: {
          id: 1,
          name: "John Client",
          email: "john@client.com",
        },
        organization: {
          id: 2,
          name: "Care Center Org",
          email: "admin@carecenter.com",
        },
        volunteer: {
          id: 3,
          name: "Jane Volunteer",
          email: "jane@volunteer.com",
        },
        admin: {
          id: 4,
          name: "Admin User",
          email: "admin@brainquest.com",
        },
      };
    }
  }, []);

  const login = (userData, type) => {
    setUser(userData);
    setUserType(type);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userType", type);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.clear(); // clears all items
  };

  const value = {
    user,
    userType,
    login,
    logout,
    isAuthenticated: !!user,
    sessionId,
    setSessionId,
    setUserType,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
