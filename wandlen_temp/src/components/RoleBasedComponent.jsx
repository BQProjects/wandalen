import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const RoleBasedComponent = ({
  children,
  allowedRoles = [],
  fallback = null,
}) => {
  const { userType, isAuthenticated } = useContext(AuthContext);

  // If no authentication required, show to everyone
  if (allowedRoles.length === 0) {
    return children;
  }

  // If user is not authenticated and roles are required
  if (!isAuthenticated) {
    return fallback;
  }

  // Check if user has required role
  if (allowedRoles.includes(userType)) {
    return children;
  }

  // User doesn't have required role
  return fallback;
};

export default RoleBasedComponent;
