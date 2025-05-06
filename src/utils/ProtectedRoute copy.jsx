import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getEnvFromURL, getPathSegment } from "../hooks/converterFunctions";
import useSessionTimeout from "../hooks/useSessionTimeout";

const ProtectedRoute = ({ children }) => {
  const loginStatus = useSelector(
    (state) => state.persistedReducer.auth.loginStatus
  );
  const { remainingTime } = useSessionTimeout(() => {});
  // Optional: Handle loading state if loginStatus is being fetched asynchronously
  if (loginStatus === undefined) {
    // Show a loading spinner or some other loading indicator
    return <div>Loading...</div>;
  }

  // If not logged in, redirect to homepage
  if (loginStatus === false) {
    return <Navigate to={`/login?env=${getEnvFromURL()}`} />;
  }

  // Otherwise, render the protected children
  return children;
};

export default ProtectedRoute;
