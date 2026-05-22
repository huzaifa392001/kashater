// src/auth/AuthGuard.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./isAuthenticated";

const AuthGuard = ({ children, requireAuth = true }) => {
  const auth = isAuthenticated();
  const location = useLocation();
  if (requireAuth && !auth) {
    return (
      <Navigate
        to="/user/login"
        replace
        state={{ signin_navigate_redirect: location.pathname }}
      />
    );
  }

  if (!requireAuth && auth) {
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default AuthGuard;
