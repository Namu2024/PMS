import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <>
      <style>
        {`
          .sidebar {
            background-color: #2d3748;
            color: white;
            height: 100vh;
            width: 250px;
            position: fixed;
            top: 60px;
            left: 0;
            padding: 1rem 0;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          }
          .sidebar-header {
            text-align: center;
            font-weight: bold;
            font-size: 1.25rem;
            margin-bottom: 1rem;
          }
          .sidebar-link {
            display: flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            color: white;
            text-decoration: none;
            font-size: 1rem;
            transition: background-color 0.3s ease;
          }
          .sidebar-link:hover {
            background-color: teal;
          }
          .sidebar-link.active {
            background-color: rgb(12, 89, 88);
            font-weight: bold;
          }
          .sidebar-icon {
            margin-right: 1rem;
          }
        `}
      </style>
      <div className="sidebar">
        <div className="sidebar-header">Employee PMS System</div>
        <NavLink
          to="/employee-dashboard/summary"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaTachometerAlt className="sidebar-icon" />
          Dashboard
        </NavLink>
        <NavLink
          to="/employee-dashboard/customer-contact-form"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaUsers className="sidebar-icon" />
          Customer Contact Forms
        </NavLink>
        <NavLink
          to="/employee-dashboard/boq-form"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaBuilding className="sidebar-icon" />
          BOQ Form
        </NavLink>
        <NavLink
          to="/employee-dashboard/lead-lifecycle"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaCalendarAlt className="sidebar-icon" />
          Lead Lifecycle
        </NavLink>
        <NavLink
          to="/employee-dashboard/total-credit-points"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FaCogs className="sidebar-icon" />
          Total Credit Points
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
