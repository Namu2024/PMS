import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../context/components/EmployeeDashboard/Navbar.jsx";
import Sidebar from "../context/components/EmployeeDashboard/Sidebar.jsx";
import Summary from "../context/components/EmployeeDashboard/Summary"; // Import your SummaryCard

const EmployeeDashboard = () => {
  const layoutStyle = {
    marginLeft: "250px", // Sidebar width
    marginTop: "60px", // Navbar height
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={layoutStyle}>
        {/* Add your SummaryCard component here */}
        <Summary />
        <Outlet />
      </main>
    </>
  );
};

export default EmployeeDashboard;
