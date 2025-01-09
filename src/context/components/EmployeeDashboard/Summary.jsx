import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../authContext";  // Adjusted to correct relative path

const SummaryCard = () => {
  const { user } = useAuth(); // Assuming user object is provided via context

  return (
    <div style={{ padding: "1.5rem" }}>
      <div
        style={{
          borderRadius: "10px",
          display: "flex",
          backgroundColor: "lightgrey", // Fixed typo in color name
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            fontSize: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#008080",
            color: "white",
            padding: "1rem",
          }}
        >
          <FaUser />
        </div>
        <div style={{ paddingLeft: "1rem", paddingTop: "0.5rem" }}>
          <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>Welcome Back</p>
          <p style={{ fontSize: "1.25rem", fontWeight: 700 }}>{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
