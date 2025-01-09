import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filterDepartments, setFilterDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const data = response.data.departments.map((dep, index) => ({
            _id: dep._id,
            sno: index + 1,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButtons
                id={dep._id}
                onDeleteSuccess={() =>
                  setDepartments((prev) =>
                    prev.filter((d) => d._id !== dep._id)
                  )
                }
              />
            ),
          }));
          setDepartments(data);
          setFilterDepartments(data);
        } else {
          alert(response.data.error);
        }
      } catch (error) {
        alert("Failed to fetch departments. Check console for details.");
        console.error("Error fetching departments:", error);
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartmentsList = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(query)
    );
    setFilterDepartments(filtered);
  };

  const columns = [
    { name: "S No", selector: (row) => row.sno },
    { name: "Department Name", selector: (row) => row.dep_name },
    { name: "Action", selector: (row) => row.action },
  ];

  return (
    <div>
      <h3>Manage Department</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search by Department Name"
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          onChange={filterDepartmentsList}
        />
        <Link
          to="/admin-dashboard/add-department"
          style={{
            backgroundColor: "#16a085",
            color: "white",
            padding: "8px 15px",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Add New Department
        </Link>
      </div>
      {depLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={filterDepartments} />
      )}
    </div>
  );
};

const DepartmentButtons = ({ id, onDeleteSuccess }) => {
  const handleEdit = () => {
    window.location.href = `/admin-dashboard/department/${id}`;
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          alert("Department deleted successfully.");
          if (onDeleteSuccess) onDeleteSuccess();
        } else {
          alert("Failed to delete department: " + response.data.error);
        }
      } catch (error) {
        alert("Failed to delete department. Check console for details.");
        console.error("Error deleting department:", error);
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleEdit}
        style={{ marginRight: "10px", backgroundColor: "teal", color: "white" }}
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Delete
      </button>
    </div>
  );
};

export default DepartmentList;
