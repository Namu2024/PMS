import React from "react";
import { useAuth } from "../../authContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navbarStyle = {
    backgroundColor: "#319795",
    height: "60px",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    color: "white",
  };

  const welcomeStyle = {
    flex: 1, // To occupy available space
    textAlign: "left", 
    fontSize: "22px", 
    fontWeight: "bold", // Bold font
    marginLeft: "20px", 
    whiteSpace: "nowrap", 
    textOverflow: "ellipsis", 
  };

  const logoutButtonStyle = {
    backgroundColor: "teal",
    color: "white",
    padding: "10px 40px",
    border: "none",
    borderRadius: "20px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    margin: "900px",
  };

  const logoutButtonHoverStyle = {
    backgroundColor: "#1a202c",
  };

  const handleLogout = () => {
    logout(); // Trigger the logout function from your auth context
  };

  return (
    <div style={navbarStyle}>
      <div style={{ flex: 0.1 }} /> {/* Spacer for alignment */}
      <span style={welcomeStyle}>Welcome {user?.name || "User"}</span>
      <button
        style={logoutButtonStyle}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor =
            logoutButtonHoverStyle.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = logoutButtonStyle.backgroundColor)
        }
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
