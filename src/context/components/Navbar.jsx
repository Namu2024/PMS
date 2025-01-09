import React from "react";
import { useAuth } from "../authContext.jsx";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div
      style={{
        width: "calc(100% - 250px)",
        height: "50px",
        backgroundColor: "teal",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        position: "fixed",
        top: 0,
        left: "250px",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ margin: "10px", fontSize: "20px", fontWeight: "bold" }}>
        Welcome Admin
      </h3>
      <button
        style={{
          backgroundColor: "#1abc9c",
          color: "white",
          padding: "10px 50px",
          border: "none",
          borderRadius: "20px",
          fontSize: "14px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          margin: "750px",
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
