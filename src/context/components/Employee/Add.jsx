import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';  
import "./add.css"; 

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    employeeID: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const fetchedDepartments = await fetchDepartments();
        setDepartments(fetchedDepartments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching departments:", error.response?.data || error.message);
        alert("Failed to fetch departments.");
        setLoading(false);
      }
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setEmployeeData((prevData) => ({ ...prevData, image: files[0] }));
    } else {
      setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check before submission
    if (
      !employeeData.name ||
      !employeeData.email ||
      !employeeData.employeeID ||
      !employeeData.department
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    Object.entries(employeeData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      // Retrieve token from localStorage and decode it
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);

      // Adding token to request header for authorization
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employee");
      } else {
        alert(response.data.message || "Failed to add employee.");
      }
    } catch (error) {
      console.error("Error adding employee:", error.response?.data || error.message);
      alert("An error occurred while adding the employee.");
    }
  };

  if (loading) {
    return <div>Loading departments...</div>;
  }

  return (
    <div className="container">
      <h2 className="header">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="row">
          <div className="field">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Insert Name"
              value={employeeData.name}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="field">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Insert Email"
              value={employeeData.email}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label className="label">Employee ID</label>
            <input
              type="text"
              name="employeeID"
              placeholder="Employee ID"
              value={employeeData.employeeID}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="field">
            <label className="label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={employeeData.dob}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label className="label">Gender</label>
            <select
              name="gender"
              value={employeeData.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="field">
            <label className="label">Marital Status</label>
            <select
              name="maritalStatus"
              value={employeeData.maritalStatus}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label className="label">Designation</label>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={employeeData.designation}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="field">
            <label className="label">Department</label>
            <select
              name="department"
              value={employeeData.department}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label className="label">Salary</label>
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={employeeData.salary}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={employeeData.password}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label className="label">Role</label>
            <select
              name="role"
              value={employeeData.role}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <div className="field">
            <label className="label">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
        <button type="submit" className="button">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Add;
