import axios from "axios";
import { useNavigate } from "react-router-dom";

// Embedded CSS
const styles = `
  .button-container {
    display: flex;
    gap: 12px;
  }

  .button {
    padding: 8px 12px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .button:hover {
    opacity: 0.9;
  }

  .view-btn {
    background-color: #0d9488; /* Teal */
  }

  .edit-btn {
    background-color: #2563eb; /* Blue */
  }

  .credit-btn {
    background-color: #facc15; /* Yellow */
    color: black;
  }

  .leave-btn {
    background-color: #dc2626; /* Red */
  }

  .delete-btn {
    background-color: #dc2626; /* Red */
  }
`;

// Inject styles into the document head
const styleTag = document.createElement("style");
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    console.error(error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:5000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    console.error(error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/employee/${Id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response); // Debugging line to check the response
        if (response.data.success) {
          alert("Employee deleted successfully!");
          navigate("/admin-dashboard/employees"); // Redirect to the employee list after deletion
        } else {
          alert("Error: " + response.data.error);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Error deleting employee!");
      }
    }
  };

  return (
    <div className="button-container">
      <button
        className="button view-btn"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>
      <button
        className="button edit-btn"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="button credit-btn"
        onClick={() => navigate(`/admin-dashboard/employees/credit-points/${Id}`)}
      >
        Credit Points
      </button>
      <button
        className="button delete-btn"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
