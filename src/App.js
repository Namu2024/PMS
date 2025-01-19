import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AddDepartment from "./context/components/dashboard/department/AddDepartment";
import AdminSummary from "./context/components/dashboard/AdminSummary";
import DepartmentList from "./context/components/dashboard/department/DepartmentList";
import EditDepartment from "./context/components/dashboard/department/EditDepartment";
import List from "./context/components/Employee/List";
import Add from "./context/components/Employee/Add";
import View from "./context/components/Employee/View";
import Edit from "./context/components/Employee/Edit";
import CreditPoints from "./context/components/Employee/CreditPoints";
import CustomerForm from "./context/components/EmployeeDashboard/CustomerForm";
import Boq from "./context/components/EmployeeDashboard/Boq";
import Summary from "./context/components/EmployeeDashboard/Summary";

const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>404</h1>
    <p>Page Not Found</p>
  </div>
);

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            user.role === "admin" ? (
              <Navigate to="/admin-dashboard" />
            ) : (
              <Navigate to="/employee-dashboard" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login />} />

      {/* Admin Dashboard Routes */}
      <Route
        path="/admin-dashboard/*"
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
        <Route path="employees" element={<List />} />
        <Route path="add-employee" element={<Add />} />
        <Route path="employees/:id" element={<View />} />
        <Route path="employees/CreditPoints/:id" element={<CreditPoints />} />
        <Route path="employees/edit/:id" element={<Edit />} />
      </Route>

      {/* Employee Dashboard Routes */}
      <Route
        path="/employee-dashboard/*"
        element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }
      >
        <Route path="summary" element={<Summary />} />
        <Route path="customer-contact-form" element={<CustomerForm />} />
        <Route path="boq-form" element={<Boq />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
