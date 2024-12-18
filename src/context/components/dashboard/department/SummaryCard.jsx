// SummaryCard.js
import React from "react";

const SummaryCard = ({ icon, text, number, bgColor }) => {
  const cardStyle = {
    display: "flex",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    width: "250px",
    margin: "10px",
  };

  const iconContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: bgColor,
    color: "white",
    fontSize: "30px",
    padding: "10px",
    width: "60px",
  };

  const textContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px 20px",
  };

  const textStyle = {
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "500",
  };

  const numberStyle = {
    color: "black",
    fontSize: "24px",
    fontWeight: "bold",
  };

  return (
    <div style={cardStyle}>
      <div style={iconContainerStyle}>{icon}</div>
      <div style={textContainerStyle}>
        <p style={textStyle}>{text}</p>
        <p style={numberStyle}>{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
