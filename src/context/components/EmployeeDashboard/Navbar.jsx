import React from "react";
import { useAuth } from "../../authContext"; // Adjust path if needed

const Navbar = () => {
  const { user } = useAuth();

  const navbarStyle = {
    backgroundColor: "#319795",
    height: "60px",
    width: "100%",
    position: "fixed", // Fixed position for the navbar
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
    textAlign: "left", // Center-align the welcome message
    fontSize: "22px", // Increased font size
    fontWeight: "bold", // Bold font
    merginLeft: "20px", // Added margin for spacing
    whiteSpace: "nowrap", // Prevent text wrapping
    textOverflow: "ellipsis", // Add ellipsis if text overflows
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
    console.log("Logout clicked");
  };

  return (
    <div style={navbarStyle}>
      <div style={{ flex: 0.1 }} /> {/* Spacer for alignment */}
      <span style={welcomeStyle}>Welcome {user?.name || "User"}</span>
      <button
        style={logoutButtonStyle}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = logoutButtonHoverStyle.backgroundColor)
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
