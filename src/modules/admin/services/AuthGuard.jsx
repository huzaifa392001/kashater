// src/auth/AuthGuard.js
import React from "react"
import { Navigate } from "react-router-dom"
import { isAuthenticated } from "./isAuthenticated"

const AuthGuard = ({ children, requireAuth = true }) => {
  const auth = isAuthenticated()

  if (requireAuth && !auth) {
    return <Navigate to="/admin/login" replace />
  }

  if (!requireAuth && auth) {
    return <Navigate to="/admin/customerlist" replace />
  }

  return children
}

export default AuthGuard
