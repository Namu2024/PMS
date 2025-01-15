import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../authContext"; // Adjust the path as per your project

const SummaryCard = () => {
  const { user } = useAuth(); // Assuming user object is provided via context

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "flex-start", // Aligns with the content layout
        marginLeft: "250px", // Ensures it respects sidebar width
        marginTop: "1rem", // Adds spacing below the navbar
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "400px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        }}
      >
        {/* Icon Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#008080",
            color: "white",
            fontSize: "2rem",
            padding: "1rem",
            borderRadius: "50%",
          }}
        >
          <FaUser />
        </div>

        {/* Text Section */}
        <div>
          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              margin: "0",
              color: "#333",
            }}
          >
            Welcome Back
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              margin: "0.5rem 0 0 0",
              color: "#555",
            }}
          >
            {user?.name || "User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
