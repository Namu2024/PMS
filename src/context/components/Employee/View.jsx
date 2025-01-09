import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <>
      <style>
        {`
          .container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background: linear-gradient(to bottom right, #ffffff, #f8fafc);
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: 'Arial', sans-serif;
          }
          .header {
            font-size: 1.8rem;
            font-weight: 600;
            text-align: center;
            margin-bottom: 1.5rem;
            color: #2c3e50;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          @media (min-width: 768px) {
            .grid {
              grid-template-columns: 1fr 2fr;
            }
          }
          .profile-image {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .profile-image img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid #4f46e5;
          }
          .info {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          .info-item {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }
          .label {
            font-weight: 600;
            color: #4f46e5;
            min-width: 120px;
          }
          .value {
            font-weight: 400;
            color: #333333;
          }
          .loading {
            text-align: center;
            font-size: 1.25rem;
            margin-top: 2rem;
            color: #4f46e5;
          }
        `}
      </style>

      {employee ? (
        <div className="container">
          <h2 className="header">Employee Details</h2>
          <div className="grid">
            <div className="profile-image">
              {employee.userId?.profileImage ? (
                <img
                  src={`http://localhost:5000/${employee.userId.profileImage}`}
                  alt="Profile"
                />
              ) : (
                <p>No Profile Image Available</p>
              )}
            </div>
            <div className="info">
              <div className="info-item">
                <span className="label">Name:</span>
                <span className="value">{employee.userId?.name || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="label">Employee ID:</span>
                <span className="value">{employee.employeeId || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="label">Date of Birth:</span>
                <span className="value">
                  {employee.dob
                    ? new Date(employee.dob).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Gender:</span>
                <span className="value">{employee.gender || "N/A"}</span>
              </div>
              <div className="info-item">
                <span className="label">Department:</span>
                <span className="value">
                  {employee.department?.dep_name || "N/A"}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Marital Status:</span>
                <span className="value">{employee.maritalStatus || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  );
};

export default View;
