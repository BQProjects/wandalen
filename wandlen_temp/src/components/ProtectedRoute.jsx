import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = "/" }) => {
  const { isAuthenticated, userType } = useContext(AuthContext);
  const location = useLocation();

  // If specific roles are required and user doesn't have the right role
  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    // Redirect based on user type
    const roleRedirects = {
      client: "/client",
      organization: "/organization",
      volunteer: "/volunteer",
      admin: "/admin",
    };

    return <Navigate to={roleRedirects[userType] || "/"} replace />;
  }

  return children;
};

export default ProtectedRoute;
