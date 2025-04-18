import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { logout } from "../reduxStore/slices/authSlice";

const ProtectedRoute = () => {
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
  return isAuthenticated() ? (
    <>
    <button className="btn btn-link" onClick={handleLogout}>Logout</button>
      <Outlet />
    </>
  ) : (
    <Navigate to="/backend/login" replace />
  );
};

export default ProtectedRoute;
