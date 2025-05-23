import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Auth = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");

      if (!localStorage.getItem("token")) {
        alert("Please login");
        navigate("/login");
        return;
      }
      try {
        const { exp } = jwtDecode(token);

        if (Date.now() >= exp * 1000) {
          alert("Session expired");
          navigate("/login");
          return;
        }
      } catch (error) {
        alert("invalid token!");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkToken();

    const interval = setInterval(checkToken, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Auth.Provider value={{}}>{children}</Auth.Provider>;
}

function useAuth() {
  const context = useContext(Auth);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
