import { useNavigate } from "react-router-dom";
import axios from "axios";

export const column = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name, // Assuming the correct property is `dep_name`
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this department?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          alert("Department deleted successfully!");
          onDepartmentDelete(id); // Call the parent function to update the state
        } else {
          alert("Failed to delete department.");
        }
      } catch (error) {
        console.error("Error deleting department:", error);
        alert("Failed to delete department. Please try again later.");
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
        style={{ marginRight: "10px", background: "teal", color: "white" }}
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(_id)}
        style={{ background: "red", color: "white" }}
      >
        Delete
      </button>
    </div>
  );
};
