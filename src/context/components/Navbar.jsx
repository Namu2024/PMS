import React from "react";
import { useAuth } from "../authContext.jsx";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "#16a085",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        top: 0,
        left: "250px", // Matches sidebar width
        zIndex: 1000,
      }}
    >
      <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Welcome Admin</h3>
      <button
        style={{
          backgroundColor: "#1abc9c",
          color: "white",
          padding: "8px 20px",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontSize: "14px",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#16a085")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#1abc9c")}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
