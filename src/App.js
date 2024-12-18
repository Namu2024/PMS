import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AddDepartment from "./context/components/dashboard/department/AddDepartment";
import AdminSummary from "./context/components/dashboard/AdminSummary";
import DepartmentList from "./context/components/dashboard/department/DepartmentList";
import EditDepartment from "./context/components/dashboard/department/EditDepartment";
import List from "./context/components/Employee/List.jsx"
import Add from "./context/components/Employee/Add.jsx"

const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>404</h1>
    <p>Page Not Found</p>
  </div>
);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          localStorage.getItem("role") === "admin" ? (
            <Navigate to="/admin-dashboard" />
          ) : (
            <Navigate to="/employee-dashboard" />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }
      >
        <Route index element={<AdminSummary />} />
        <Route path="department" element={<DepartmentList />} />
        <Route path="add-department" element={<AddDepartment />} />
        <Route path="department/:id" element={<EditDepartment />} />

        <Route path="employees" element={<List/>} />
        <Route path="add-employee" element={<Add />} />
      </Route>
      <Route
        path="/employee-dashboard"
        element={
          <PrivateRoutes>
            <EmployeeDashboard />
          </PrivateRoutes>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
