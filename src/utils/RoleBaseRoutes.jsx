import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Import useAuth

const RoleBaseRoutes = ({ requiredRole, children }) => {
  const { user } = useAuth(); // Get the user from the auth context

  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RoleBaseRoutes;
