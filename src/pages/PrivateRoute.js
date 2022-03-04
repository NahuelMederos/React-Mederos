import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function PrivateRoute({ children, loggedOnly }) {
  const { currentUser } = useAuth();
  if (loggedOnly) {
    return currentUser ? children : <Navigate to="/signin" />;
  }
  return !currentUser ? children : <Navigate to="/" />;
}

export default PrivateRoute;
