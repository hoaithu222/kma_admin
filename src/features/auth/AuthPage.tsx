// import React from "react";

import { useSelector } from "react-redux";
import LoginPage from "./components/LoginPage";
import { selectIsAuthenticated } from "./slice/auth.selector";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      window.location.reload();
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="container flex justify-center items-center mx-auto h-screen">
      <LoginPage />
    </div>
  );
};

export default AuthPage;
