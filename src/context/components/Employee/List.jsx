import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../../utils/EmployeeHelper.jsx"; // Adjusted path
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || "N/A",
            name: emp.userId?.name || "N/A",
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:5000/${
                  emp.userId?.profileImage || "default.jpg"
                }`}
                alt="Profile"
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error.message);
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchValue)
    );
    setFilteredEmployees(records);
  };

  if (empLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* CSS Styles */}
      <style>
        {`
                      .employee-container {
                          padding: 1.5rem;
                      }

                      .employee-title {
                          text-align: center;
                          font-size: 1.5rem;
                          font-weight: bold;
                      }

                      .employee-actions {
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          margin-top: 1rem;
                      }

                      .employee-actions input {
                          padding: 0.5rem 1rem;
                          border: 1px solid #ddd;
                          font-size: 1rem;
                          width: 250px;
                      }

                      .employee-actions .add-employee-btn {
                          padding: 0.5rem 1rem;
                          background-color: #008080;
                          color: white;
                          border-radius: 0.375rem;
                          font-weight: bold;
                          text-decoration: none;
                      }

                      .employee-actions .add-employee-btn:hover {
                          background-color: #006f6f;
                      }

                      .employee-table {
                          margin-top: 1.5rem;
                      }

                      .employee-table img {
                          width: 40px;
                          border-radius: 50%;
                      }

                      .employee-table th, .employee-table td {
                          padding: 0.75rem;
                          text-align: left;
                      }
                  `}
      </style>

      <div className="employee-container">
        <div className="employee-title">
          <h3>Manage Employee</h3>
        </div>
        <div className="employee-actions">
          <input
            type="text"
            placeholder="Search By Name"
            onChange={handleFilter}
          />
          <Link to="/admin-dashboard/add-employee" className="add-employee-btn">
            Add New Employee
          </Link>
        </div>
        <div className="employee-table mt-6">
          <DataTable columns={columns} data={filteredEmployees} pagination />
        </div>
      </div>
    </div>
  );
};

export default List;
