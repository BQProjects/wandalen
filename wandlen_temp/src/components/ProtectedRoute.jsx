import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userType } = useContext(AuthContext);
  const location = useLocation();

  const getRedirectTo = (pathname) => {
    if (pathname.startsWith("/client")) return "/client/login";
    if (pathname.startsWith("/organization")) return "/organization/login";
    if (pathname.startsWith("/volunteer")) return "/volunteer/login";
    if (pathname.startsWith("/admin")) return "/admin/login";
    return "/";
  };

  const redirectTo = getRedirectTo(location.pathname);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

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
