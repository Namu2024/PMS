import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Verify the token with the backend
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setUser(response.data.user);
          } else {
            console.warn("Verification failed:", response.data.message);
            setUser(null);
          }
        } else {
          console.warn("No token found in local storage.");
          setUser(null);
        }
      } catch (error) {
        // Log errors for debugging
        console.error("Error during verification:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
        }
        setUser(null);
      } finally {
        // Stop loading after verification attempt
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  // Login function
  const login = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(userContext);

export default AuthContext;
