import React from "react";
import { handleToken } from "../../utils/verifyRequest";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  try {
    const decoded = handleToken();
    if (decoded.role !== "admin") {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;
