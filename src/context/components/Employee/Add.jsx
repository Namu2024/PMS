import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../../utils/EmployeeHelper.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./add.css"; // Import the CSS file

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Name */}
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Insert Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Insert Email"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder="Employee ID"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label>Date of Birth</label>
            <input type="date" name="dob" onChange={handleChange} required />
          </div>

          {/* Gender */}
          <div>
            <label>Gender</label>
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label>Marital Status</label>
            <select name="maritalStatus" onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              placeholder="Designation"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label>Department</label>
            <select name="department" onChange={handleChange} required>
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div>
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder="Salary"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="******"
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div>
            <label>Role</label>
            <select name="role" onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
        </div>

        <button type="submit" className="mt-6">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Add;
