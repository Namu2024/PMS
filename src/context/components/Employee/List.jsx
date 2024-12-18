import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departments, setDepartments] = useState([
  
  ]);

  const filterDepartmentsList = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Manage Employee</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignContent: "center" }}>
        <input
          type="text"
          placeholder="Search by Department Name"
          style={{ padding: "8px", width: "300px", borderRadius: "5px", border: "1px solid #ccc" }}
          value={searchTerm}
          onChange={filterDepartmentsList}
        />
        <Link
          to="/admin-dashboard/add-employee"
          style={{
            backgroundColor: "#16a085",
            color: "white",
            padding: "8px 15px",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Add New Employee
        </Link>
      </div>
      
      {/* Display filtered department list */}
      <ul>
        {filteredDepartments.map((department) => (
          <li key={department.id}>{department.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
