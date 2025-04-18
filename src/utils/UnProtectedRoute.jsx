import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../reduxStore/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const loginStatus = useSelector(
    (state) => state.persistedReducer.auth.loginStatus
  );
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const isAuthenticated = () => {
    return loginStatus === true;
  };
  return isAuthenticated() ? <Navigate to="/backend/home" replace /> : children;
};

export default ProtectedRoute;
