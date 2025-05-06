import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getEnvFromURL, getPathSegment } from "../hooks/converterFunctions";
import useSessionTimeout from "../hooks/useSessionTimeout";

const UnProtectedRoute = ({ children }) => {
  const loginStatus = useSelector(
    (state) => state.persistedReducer.auth.loginStatus
  );

  const { remainingTime } = useSessionTimeout(() => {});
  // Optional: handle loading state
  if (loginStatus === undefined) {
    // Show a loading spinner or some other loading indicator
    return <div>Loading...</div>;
  }

  // If the user is logged in, redirect to the home page
  if (loginStatus === true) {
    return <Navigate to={`/flight?env=${getEnvFromURL()}`} />;
  }

  // If the user is not logged in, render the children (i.e., the route content)
  return children;
};

export default UnProtectedRoute;
