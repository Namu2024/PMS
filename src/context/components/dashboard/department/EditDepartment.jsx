import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [depName, setDepName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDepartment = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/department/${id}`);
        if (response.data.success) {
          const { dep_name, description } = response.data.department;
          setDepName(dep_name);
          setDescription(description);
        } else {
          setMessage("Failed to fetch department details.");
        }
      } catch (error) {
        console.error("Error fetching department details:", error);
        setMessage("Failed to fetch department details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleSave = async () => {
    setMessage("");
    try {
      const response = await axios.put(`http://localhost:5000/api/department/${id}`, {
        dep_name: depName,
        description,
      });
      if (response.data.success) {
        setMessage("Department updated successfully!");
        setTimeout(() => navigate("/admin-dashboard/department"), 2000);
      } else {
        setMessage("Failed to update department.");
      }
    } catch (error) {
      console.error("Error updating department:", error);
      setMessage("Failed to update department.");
    }
  };

  if (loading) {
    return <p style={styles.loadingText}>Loading department details...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Edit Department</h2>
      <input
        type="text"
        placeholder="Department Name"
        value={depName}
        onChange={(e) => setDepName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSave} style={styles.button}>
        Save
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f9f9f9",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "500px",
    margin: "0 auto",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  message: {
    textAlign: "center",
    color: "#f44336",
    marginTop: "10px",
    fontSize: "14px",
  },
  loadingText: {
    textAlign: "center",
    fontSize: "18px",
    color: "#333",
  },
};

export default EditDepartment;
