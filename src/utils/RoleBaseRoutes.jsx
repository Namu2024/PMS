import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const RoleBaseRoutes = ({ requiredRole, children }) => {
  const { user } = useAuth();

  // If user is not logged in or their role doesn't match, redirect to login
  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleBaseRoutes;
