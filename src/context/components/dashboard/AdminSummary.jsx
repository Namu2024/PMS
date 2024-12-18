// AdminSummary.js
import React from "react";
import SummaryCard from "./department/SummaryCard";

import { FaUsers, FaBuilding, FaMoneyBillWave } from "react-icons/fa";

const AdminSummary = () => {
  const summaryStyle = {
    padding: "20px",
    backgroundColor: "#f9fafb",
    display: "flex", 
    flexDirection: "column",
    alignItems: "center",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const gridStyle = {
    display: "flex", 
    gap: "20px", 
    justifyContent: "center",
  };

  return (
    <div style={summaryStyle}>
      <h3 style={titleStyle}>Dashboard Overview</h3>
      <div style={gridStyle}>
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={13}
          bgColor="teal"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={5}
          bgColor="goldenrod"
        />
      </div>
    </div>
  );
};

export default AdminSummary;
