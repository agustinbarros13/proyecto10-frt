import React from "react";
import { Navigate } from "react-router-dom";

// envuelve rutas que deben estar protegidas por login
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Si no hay token redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token permite el acceso
  return children;
}

export default ProtectedRoute;
