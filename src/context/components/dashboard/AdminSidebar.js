
import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBuilding, FaCoins } from "react-icons/fa";
import './AdminSidebar.css';

function AdminSidebar() {
  return (
    <div className="sidebar">
      <h3>PMS SYSTEM</h3>

      {/* Dashboard Link */}
      <NavLink 
        to="/admin-dashboard" 
        className={({ isActive }) => (isActive ? "active" : "")}
        end
      >
        <FaTachometerAlt />
        <span>Dashboard</span>
      </NavLink>

      {/* Employee Link */}
      <NavLink 
        to="/admin-dashboard/employees" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaUsers />
        <span>Employee</span>
      </NavLink>

      {/* Department Link */}
      <NavLink 
        to="/admin-dashboard/department" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaBuilding />
        <span>Department</span>
      </NavLink>

   
      
    </div>
  );
}

export default AdminSidebar;
