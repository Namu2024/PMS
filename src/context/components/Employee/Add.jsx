import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        console.error("Error fetching departments:", error);
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
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employee");
      } else {
        alert(response.data.message || "Failed to add employee.");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("An error occurred while adding the employee.");
    }
  };

  if (loading) {
    return <div>Loading departments...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add New Employee</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Insert Name"
              value={employeeData.name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Insert Email"
              value={employeeData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Employee ID</label>
            <input
              type="text"
              name="employeeID"
              placeholder="Employee ID"
              value={employeeData.employeeID}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={employeeData.dob}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Gender</label>
            <select
              name="gender"
              value={employeeData.gender}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Marital Status</label>
            <select
              name="maritalStatus"
              value={employeeData.maritalStatus}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Designation</label>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={employeeData.designation}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Department</label>
            <select
              name="department"
              value={employeeData.department}
              onChange={handleChange}
              style={styles.input}
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
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Salary</label>
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={employeeData.salary}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={employeeData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Role</label>
            <select
              name="role"
              value={employeeData.role}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>
        <button type="submit" style={styles.button}>
          Add Employee
        </button>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: {
    backgroundColor: "#f9f9f9",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "800px",
    margin: "20px auto",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
  },
  field: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    textAlign: "center",
    marginTop: "10px",
  },
};

export default Add;
