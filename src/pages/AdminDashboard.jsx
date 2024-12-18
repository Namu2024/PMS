import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../context/components/dashboard/AdminSidebar";
import Navbar from "../context/components/Navbar";

const AdminDashboard = () => {
  return (
    <div>
      <AdminSidebar />
      <div className="main-content">
        <Navbar />
        <div style={{ marginTop: "60px" }}>
          {/* Adjusted margin to prevent overlap */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
