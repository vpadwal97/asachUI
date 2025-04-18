import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SESSION_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds

const useSessionTimeout = (logoutFunction) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const loginStatus = useSelector(
    (state) => state.persistedReducer.auth.loginStatus
  );
  const location = useLocation();

  const startSession = useCallback(() => {
    const existingExpiry = sessionStorage.getItem("sessionExpiry");

    if (!existingExpiry) {
      const sessionExpiry = Date.now() + SESSION_DURATION;
      sessionStorage.setItem("sessionExpiry", sessionExpiry);
      setIsSessionActive(true);
      setRemainingTime(SESSION_DURATION);
    }
  }, []);

  // Function to clear session (Call this on logout or session expiration)
  const cleanSession = useCallback(() => {
    if (isSessionActive) {
      sessionStorage.removeItem("sessionExpiry");
      setIsSessionActive(false);
      setRemainingTime(0);
    }
  }, [isSessionActive]);

  // Logout function (Call this on logout)
  const handleLogout = useCallback(() => {
    cleanSession();
    logoutFunction();
  }, [cleanSession, logoutFunction]);

  // Start or clean session based on login status and page location
  useEffect(() => {
    const sessionExpiry = sessionStorage.getItem("sessionExpiry");

    if (loginStatus && location.pathname === "/flight/summary") {
      if (!sessionExpiry) {
        startSession();
      } else {
        setIsSessionActive(true);
        setRemainingTime(Math.max(0, sessionExpiry - Date.now()));
      }
    } else {
      cleanSession();
    }
  }, [loginStatus, location.pathname, startSession, cleanSession]);

  // Track session expiry and update remaining time
  useEffect(() => {
    if (!isSessionActive) return;

    const updateRemainingTime = () => {
      const storedExpiry = parseInt(
        sessionStorage.getItem("sessionExpiry"),
        10
      );
      if (!storedExpiry) return;

      const timeLeft = storedExpiry - Date.now();
      setRemainingTime(timeLeft > 0 ? timeLeft : 0);

      if (timeLeft <= 0) {
        handleLogout();
      }
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [isSessionActive, handleLogout]);

  return { remainingTime, startSession, handleLogout };
};

export default useSessionTimeout;
