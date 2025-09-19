import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [userType, setUserType] = useState(() => {
    const saved = localStorage.getItem("userType");
    return saved || null;
  });
  const [sessionId, setSessionId] = useState(() => {
    const saved = localStorage.getItem("sessionId");
    return saved || null;
  });

  const login = (userData, type) => {
    const userTypeMap = {
      caregiver: "client",
      volunteer: "volunteer",
      organization: "organization",
    };

    const mappedType = userTypeMap[type] || type;

    setUser(userData);
    setUserType(mappedType);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userType", mappedType);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
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
