import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../context/components/EmployeeDashboard/Navbar";
import Sidebar from "../context/components/EmployeeDashboard/Sidebar";
// import Summary from "../context/components/EmployeeDashboard/Summary"; // Correct path

const EmployeeDashboard = () => {
  const layoutStyle = {
    marginLeft: "250px",
    marginTop: "60px",
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      {/* <Summary /> */}
      <main style={layoutStyle}>
        <Outlet />
      </main>
    </>
  );
};

export default EmployeeDashboard;
