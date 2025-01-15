import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../context/components/Navbar.jsx";
import AdminSidebar from "../context/components/dashboard/AdminSidebar";

const AdminDashboard = () => {
  const layoutStyle = {
    marginLeft: "250px",
    marginTop: "60px",
    padding: "1rem",
    backgroundColor: "#f1f1f1",
    minHeight: "100vh",
  };

  return (
    <>
      <Navbar />
      <AdminSidebar />
      <main style={layoutStyle}>
        <Outlet />
      </main>
    </>
  );
};

export default AdminDashboard;
