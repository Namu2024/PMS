import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreditPoints = () => {
  const { id } = useParams(); // Get employee ID from the route
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
      } catch (err) {
        setError("Error fetching employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Credit Points</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Sales Credit Points</th>
            <th>BOQ Credit Points</th>
            <th>Total Credit Points</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.salesCreditPoints}</td>
              <td>{employee.boqCreditPoints}</td>
              <td>{employee.totalCreditPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditPoints;
